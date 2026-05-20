// ===================================================================
// RHYTHM DC — A Rhythm Plus-style rhythm game
// 4-key gameplay (D/F/J/K), falling notes, hit windows, combo, accuracy
// ===================================================================

(() => {
    'use strict';

    // ============ CONSTANTS ============
    const LANES = 4;
    const KEYS = ['KeyD', 'KeyF', 'KeyJ', 'KeyK'];
    const LANE_COLORS = ['#ff2e8a', '#00f0ff', '#00f0ff', '#ff2e8a'];

    // Timing windows in milliseconds (how close to perfect line)
    const PERFECT_WINDOW = 60;
    const GOOD_WINDOW = 130;
    const MISS_WINDOW = 200; // beyond this and the note is past

    // Note travel time from spawn (top) to hit line (bottom)
    const NOTE_TRAVEL_MS = 1500;

    // Scoring
    const SCORE_PERFECT = 300;
    const SCORE_GOOD = 100;
    const COMBO_MULTIPLIER_MAX = 4; // score *= 1 + min(combo/50, MAX)

    // Built-in song definitions (procedural beats — no external audio needed)
    const SONGS = {
        neon: {
            name: 'Neon Pulse',
            bpm: 120,
            duration: 75, // seconds
            difficulty: 0.55, // chance a beat gets a note
            doubleChance: 0.08,
            tone: { baseFreq: 110, scale: [0, 3, 5, 7, 10] },
        },
        storm: {
            name: 'Electric Storm',
            bpm: 140,
            duration: 80,
            difficulty: 0.7,
            doubleChance: 0.18,
            tone: { baseFreq: 146.83, scale: [0, 2, 3, 5, 7, 8, 10] },
        },
        fury: {
            name: 'Chrome Fury',
            bpm: 160,
            duration: 90,
            difficulty: 0.85,
            doubleChance: 0.3,
            tone: { baseFreq: 164.81, scale: [0, 2, 3, 7, 8, 10] },
        },
    };

    // ============ STATE ============
    const state = {
        screen: 'menu',
        currentSong: null,
        notes: [],          // upcoming notes { time, lane, hit }
        startTime: 0,       // performance.now() of song start
        pauseTime: 0,
        pausedAt: 0,
        paused: false,
        score: 0,
        combo: 0,
        maxCombo: 0,
        counts: { perfect: 0, good: 0, miss: 0 },
        totalNotes: 0,
        keyPressed: [false, false, false, false],
        audio: { ctx: null, source: null, buffer: null, scheduledOscs: [] },
        useCustomAudio: false,
        customAudioBuffer: null,
    };

    // ============ DOM ============
    const $ = (id) => document.getElementById(id);
    const screens = {
        menu: $('menu'),
        game: $('game'),
        results: $('results'),
    };
    const canvas = $('game-canvas');
    const ctx = canvas.getContext('2d');

    // ============ SCREEN MANAGEMENT ============
    function showScreen(name) {
        for (const k in screens) screens[k].classList.toggle('active', k === name);
        state.screen = name;
    }

    // ============ BEATMAP GENERATION ============
    // Deterministic pseudo-random so the chart is the same each play
    function mulberry32(seed) {
        return function () {
            seed |= 0;
            seed = (seed + 0x6D2B79F5) | 0;
            let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
            t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
            return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
        };
    }

    function generateBeatmap(song, seed = 42) {
        const rand = mulberry32(seed);
        const beatMs = 60000 / song.bpm;
        const subdivisions = 2; // 8th notes
        const stepMs = beatMs / subdivisions;
        const totalSteps = Math.floor((song.duration * 1000) / stepMs);

        const notes = [];
        let lastLane = -1;
        const leadIn = 2500; // 2.5s lead-in before first note

        for (let i = 4; i < totalSteps; i++) {
            const time = leadIn + i * stepMs;
            // Stronger beats more likely on whole beats
            const onBeat = i % subdivisions === 0;
            const threshold = onBeat ? song.difficulty : song.difficulty * 0.45;

            if (rand() < threshold) {
                let lane;
                do {
                    lane = Math.floor(rand() * LANES);
                } while (lane === lastLane && rand() > 0.4);
                notes.push({ time, lane, hit: false, judged: false });
                lastLane = lane;

                // Chance of double-note (chord) — second note in different lane
                if (onBeat && rand() < song.doubleChance) {
                    let lane2;
                    do {
                        lane2 = Math.floor(rand() * LANES);
                    } while (lane2 === lane);
                    notes.push({ time, lane: lane2, hit: false, judged: false });
                }
            }
        }
        return notes;
    }

    // ============ AUDIO ENGINE ============
    function getAudioCtx() {
        if (!state.audio.ctx) {
            const AC = window.AudioContext || window.webkitAudioContext;
            state.audio.ctx = new AC();
        }
        return state.audio.ctx;
    }

    function stopAllAudio() {
        const ac = state.audio.ctx;
        if (!ac) return;
        state.audio.scheduledOscs.forEach((o) => {
            try { o.stop(); } catch (e) { /* already stopped */ }
        });
        state.audio.scheduledOscs = [];
        if (state.audio.source) {
            try { state.audio.source.stop(); } catch (e) { /* */ }
            state.audio.source = null;
        }
    }

    // Procedurally generate the song's audio by scheduling oscillator notes
    // at beat intervals based on BPM and the song's tone settings.
    function scheduleProceduralSong(song, startAtAudioTime) {
        const ac = getAudioCtx();
        const beatSec = 60 / song.bpm;
        const totalBeats = Math.floor(song.duration / beatSec);

        // Master gain so we can fade out at the end
        const master = ac.createGain();
        master.gain.value = 0.0;
        master.gain.linearRampToValueAtTime(0.3, startAtAudioTime + 0.5);
        master.gain.setValueAtTime(0.3, startAtAudioTime + song.duration - 1);
        master.gain.linearRampToValueAtTime(0, startAtAudioTime + song.duration);
        master.connect(ac.destination);

        const scale = song.tone.scale;
        const base = song.tone.baseFreq;

        for (let b = 0; b < totalBeats; b++) {
            const t = startAtAudioTime + b * beatSec;
            // Kick on beats 0, 2 (in 4/4)
            if (b % 4 === 0 || b % 4 === 2) {
                scheduleKick(ac, master, t);
            }
            // Snare on beats 1, 3
            if (b % 4 === 1 || b % 4 === 3) {
                scheduleSnare(ac, master, t);
            }
            // Hi-hat on every 8th note
            scheduleHat(ac, master, t);
            scheduleHat(ac, master, t + beatSec / 2);

            // Bass note every 2 beats
            if (b % 2 === 0) {
                const noteIdx = scale[Math.floor((b * 7919) % scale.length)];
                const freq = base * Math.pow(2, noteIdx / 12);
                scheduleBass(ac, master, t, freq, beatSec * 0.9);
            }

            // Melody every 4 beats
            if (b % 1 === 0 && (b * 13 % 7) < 3) {
                const noteIdx = scale[Math.floor((b * 1597) % scale.length)];
                const freq = base * 4 * Math.pow(2, noteIdx / 12);
                scheduleLead(ac, master, t, freq, beatSec * 0.4);
            }
        }
    }

    function scheduleKick(ac, dest, t) {
        const o = ac.createOscillator();
        const g = ac.createGain();
        o.frequency.setValueAtTime(150, t);
        o.frequency.exponentialRampToValueAtTime(40, t + 0.15);
        g.gain.setValueAtTime(0.9, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.18);
        o.connect(g).connect(dest);
        o.start(t);
        o.stop(t + 0.2);
        state.audio.scheduledOscs.push(o);
    }

    function scheduleSnare(ac, dest, t) {
        const noise = ac.createBufferSource();
        const buffer = ac.createBuffer(1, ac.sampleRate * 0.2, ac.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
        noise.buffer = buffer;
        const filter = ac.createBiquadFilter();
        filter.type = 'highpass';
        filter.frequency.value = 1500;
        const g = ac.createGain();
        g.gain.setValueAtTime(0.5, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
        noise.connect(filter).connect(g).connect(dest);
        noise.start(t);
        noise.stop(t + 0.2);
        state.audio.scheduledOscs.push(noise);
    }

    function scheduleHat(ac, dest, t) {
        const noise = ac.createBufferSource();
        const buffer = ac.createBuffer(1, ac.sampleRate * 0.05, ac.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
        noise.buffer = buffer;
        const filter = ac.createBiquadFilter();
        filter.type = 'highpass';
        filter.frequency.value = 7000;
        const g = ac.createGain();
        g.gain.setValueAtTime(0.12, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.04);
        noise.connect(filter).connect(g).connect(dest);
        noise.start(t);
        noise.stop(t + 0.06);
        state.audio.scheduledOscs.push(noise);
    }

    function scheduleBass(ac, dest, t, freq, dur) {
        const o = ac.createOscillator();
        o.type = 'sawtooth';
        o.frequency.value = freq;
        const filter = ac.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(800, t);
        filter.frequency.exponentialRampToValueAtTime(200, t + dur);
        const g = ac.createGain();
        g.gain.setValueAtTime(0.18, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + dur);
        o.connect(filter).connect(g).connect(dest);
        o.start(t);
        o.stop(t + dur + 0.05);
        state.audio.scheduledOscs.push(o);
    }

    function scheduleLead(ac, dest, t, freq, dur) {
        const o = ac.createOscillator();
        o.type = 'square';
        o.frequency.value = freq;
        const g = ac.createGain();
        g.gain.setValueAtTime(0.0, t);
        g.gain.linearRampToValueAtTime(0.1, t + 0.02);
        g.gain.exponentialRampToValueAtTime(0.001, t + dur);
        o.connect(g).connect(dest);
        o.start(t);
        o.stop(t + dur + 0.05);
        state.audio.scheduledOscs.push(o);
    }

    function playCustomAudio(buffer, startAtAudioTime) {
        const ac = getAudioCtx();
        const src = ac.createBufferSource();
        src.buffer = buffer;
        const g = ac.createGain();
        g.gain.value = 0.7;
        src.connect(g).connect(ac.destination);
        src.start(startAtAudioTime);
        state.audio.source = src;
    }

    // ============ HIT SOUND ============
    function playHitSound(type) {
        const ac = getAudioCtx();
        const now = ac.currentTime;
        const o = ac.createOscillator();
        const g = ac.createGain();
        const freq = type === 'perfect' ? 1200 : type === 'good' ? 800 : 200;
        o.frequency.value = freq;
        o.type = type === 'miss' ? 'sawtooth' : 'sine';
        g.gain.setValueAtTime(0.15, now);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        o.connect(g).connect(ac.destination);
        o.start(now);
        o.stop(now + 0.1);
    }

    // ============ CANVAS RENDERING ============
    function resizeCanvas() {
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function getLaneRect(lane, w) {
        const playW = Math.min(600, w);
        const offsetX = (w - playW) / 2;
        const laneW = playW / LANES;
        return { x: offsetX + lane * laneW, w: laneW };
    }

    function draw(elapsedMs) {
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        ctx.clearRect(0, 0, w, h);

        // Hit line position (where notes need to be tapped)
        const hitY = h - 80;
        const spawnY = 0;

        // Draw lane background lines (perspective effect)
        for (let i = 0; i <= LANES; i++) {
            const { x } = getLaneRect(i, w);
            const x0 = i < LANES ? x : getLaneRect(LANES - 1, w).x + getLaneRect(LANES - 1, w).w;
            ctx.strokeStyle = 'rgba(255,255,255,0.05)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(x0, 0);
            ctx.lineTo(x0, h);
            ctx.stroke();
        }

        // Hit line
        const grad = ctx.createLinearGradient(0, hitY - 2, 0, hitY + 2);
        grad.addColorStop(0, 'rgba(255, 215, 0, 0)');
        grad.addColorStop(0.5, 'rgba(255, 215, 0, 1)');
        grad.addColorStop(1, 'rgba(255, 215, 0, 0)');
        ctx.fillStyle = grad;
        const firstLane = getLaneRect(0, w);
        const lastLane = getLaneRect(LANES - 1, w);
        ctx.fillRect(firstLane.x, hitY - 2, lastLane.x + lastLane.w - firstLane.x, 4);

        // Glow under hit line
        const glowGrad = ctx.createLinearGradient(0, hitY, 0, h);
        glowGrad.addColorStop(0, 'rgba(255, 215, 0, 0.3)');
        glowGrad.addColorStop(1, 'rgba(255, 215, 0, 0)');
        ctx.fillStyle = glowGrad;
        ctx.fillRect(firstLane.x, hitY, lastLane.x + lastLane.w - firstLane.x, h - hitY);

        // Draw notes
        for (const note of state.notes) {
            if (note.judged) continue;
            const dt = note.time - elapsedMs;
            // Cull notes outside the window
            if (dt > NOTE_TRAVEL_MS + 100) continue;
            if (dt < -MISS_WINDOW - 50) continue;

            // Position interpolation: dt = NOTE_TRAVEL_MS -> y = spawnY, dt = 0 -> y = hitY
            const progress = 1 - dt / NOTE_TRAVEL_MS;
            const y = spawnY + (hitY - spawnY) * progress;

            const lane = getLaneRect(note.lane, w);
            const noteH = 24;
            const padding = 8;
            const x = lane.x + padding;
            const noteW = lane.w - padding * 2;

            // Note glow
            ctx.shadowBlur = 20;
            ctx.shadowColor = LANE_COLORS[note.lane];
            ctx.fillStyle = LANE_COLORS[note.lane];
            roundRect(ctx, x, y - noteH / 2, noteW, noteH, 6);
            ctx.fill();

            // Inner highlight
            ctx.shadowBlur = 0;
            const innerGrad = ctx.createLinearGradient(x, y - noteH / 2, x, y + noteH / 2);
            innerGrad.addColorStop(0, 'rgba(255,255,255,0.6)');
            innerGrad.addColorStop(0.5, 'rgba(255,255,255,0.2)');
            innerGrad.addColorStop(1, 'rgba(255,255,255,0)');
            ctx.fillStyle = innerGrad;
            roundRect(ctx, x + 2, y - noteH / 2 + 2, noteW - 4, noteH - 4, 4);
            ctx.fill();
        }

        ctx.shadowBlur = 0;
    }

    function roundRect(ctx, x, y, w, h, r) {
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.arcTo(x + w, y, x + w, y + h, r);
        ctx.arcTo(x + w, y + h, x, y + h, r);
        ctx.arcTo(x, y + h, x, y, r);
        ctx.arcTo(x, y, x + w, y, r);
        ctx.closePath();
    }

    // ============ GAME LOOP ============
    function gameLoop() {
        if (state.screen !== 'game') return;
        if (state.paused) {
            requestAnimationFrame(gameLoop);
            return;
        }

        const now = performance.now();
        const elapsed = now - state.startTime;

        // Auto-miss notes that pass beyond MISS_WINDOW
        for (const note of state.notes) {
            if (!note.judged && elapsed > note.time + MISS_WINDOW) {
                note.judged = true;
                registerJudgment('miss');
            }
        }

        // Update HUD progress
        const dur = state.currentSong.duration * 1000 + 3000;
        const pct = Math.min(1, elapsed / dur);
        $('progress-fill').style.width = (pct * 100) + '%';

        draw(elapsed);

        // Check end-of-song
        if (elapsed > dur) {
            finishSong();
            return;
        }

        requestAnimationFrame(gameLoop);
    }

    // ============ INPUT ============
    function onKeyDown(e) {
        // Pause toggle
        if (e.code === 'Escape' && state.screen === 'game') {
            togglePause();
            return;
        }

        const lane = KEYS.indexOf(e.code);
        if (lane === -1 || state.screen !== 'game' || state.paused) return;
        if (state.keyPressed[lane]) return; // ignore key repeat
        state.keyPressed[lane] = true;

        // Visual press feedback
        const laneEl = document.querySelector(`.lane[data-lane="${lane}"]`);
        if (laneEl) laneEl.classList.add('pressed');

        // Try to hit a note in this lane
        tryHit(lane);
    }

    function onKeyUp(e) {
        const lane = KEYS.indexOf(e.code);
        if (lane === -1) return;
        state.keyPressed[lane] = false;
        const laneEl = document.querySelector(`.lane[data-lane="${lane}"]`);
        if (laneEl) laneEl.classList.remove('pressed');
    }

    function tryHit(lane) {
        const elapsed = performance.now() - state.startTime;
        // Find closest un-judged note in this lane within MISS_WINDOW
        let best = null;
        let bestDist = Infinity;
        for (const note of state.notes) {
            if (note.judged || note.lane !== lane) continue;
            const dist = Math.abs(note.time - elapsed);
            if (dist < bestDist && dist <= MISS_WINDOW) {
                bestDist = dist;
                best = note;
            }
        }
        if (!best) return; // no note to hit — silent (don't penalize wrong-time presses)

        best.judged = true;
        if (bestDist <= PERFECT_WINDOW) {
            registerJudgment('perfect');
        } else if (bestDist <= GOOD_WINDOW) {
            registerJudgment('good');
        } else {
            registerJudgment('miss');
        }
    }

    function registerJudgment(type) {
        state.counts[type]++;
        if (type === 'miss') {
            state.combo = 0;
        } else {
            state.combo++;
            if (state.combo > state.maxCombo) state.maxCombo = state.combo;
            const base = type === 'perfect' ? SCORE_PERFECT : SCORE_GOOD;
            const mult = 1 + Math.min(state.combo / 50, COMBO_MULTIPLIER_MAX);
            state.score += Math.round(base * mult);
        }
        playHitSound(type);

        // Update HUD
        $('score').textContent = state.score;
        const comboEl = $('combo');
        comboEl.textContent = state.combo;
        comboEl.classList.remove('bump');
        void comboEl.offsetWidth;
        comboEl.classList.add('bump');

        const judged = state.counts.perfect + state.counts.good + state.counts.miss;
        const acc = judged === 0 ? 100 :
            ((state.counts.perfect + state.counts.good * 0.5) / judged) * 100;
        $('accuracy').textContent = acc.toFixed(1) + '%';

        // Show judgment text
        const j = $('judgment');
        j.textContent = type.toUpperCase();
        j.className = 'judgment ' + type;
        void j.offsetWidth;
        j.classList.add('show');
    }

    // ============ START / END ============
    function startSong(songKey, useCustom) {
        const song = useCustom
            ? { ...SONGS.storm, name: 'Custom Track', duration: state.customAudioBuffer.duration }
            : SONGS[songKey];
        if (!song) return;

        state.currentSong = song;
        state.notes = generateBeatmap(song, hashCode(song.name));
        state.totalNotes = state.notes.length;
        state.score = 0;
        state.combo = 0;
        state.maxCombo = 0;
        state.counts = { perfect: 0, good: 0, miss: 0 };
        state.paused = false;

        $('track-name').textContent = song.name;
        $('score').textContent = '0';
        $('combo').textContent = '0';
        $('accuracy').textContent = '100%';

        showScreen('game');
        resizeCanvas();

        // Resume audio context if suspended (autoplay policy)
        const ac = getAudioCtx();
        if (ac.state === 'suspended') ac.resume();

        state.startTime = performance.now();
        const audioStart = ac.currentTime + 0.05;

        if (useCustom && state.customAudioBuffer) {
            playCustomAudio(state.customAudioBuffer, audioStart);
        } else {
            scheduleProceduralSong(song, audioStart);
        }

        requestAnimationFrame(gameLoop);
    }

    function hashCode(str) {
        let h = 0;
        for (let i = 0; i < str.length; i++) {
            h = (h << 5) - h + str.charCodeAt(i);
            h |= 0;
        }
        return Math.abs(h);
    }

    function finishSong() {
        stopAllAudio();
        showResults();
    }

    function showResults() {
        const judged = state.counts.perfect + state.counts.good + state.counts.miss;
        const acc = judged === 0 ? 0 :
            ((state.counts.perfect + state.counts.good * 0.5) / judged) * 100;

        let grade = 'F';
        if (acc >= 95) grade = 'S';
        else if (acc >= 88) grade = 'A';
        else if (acc >= 78) grade = 'B';
        else if (acc >= 65) grade = 'C';
        else if (acc >= 50) grade = 'D';

        $('grade').textContent = grade;
        $('result-track').textContent = `${state.currentSong.name} — Cleared!`;
        $('final-score').textContent = state.score;
        $('max-combo').textContent = state.maxCombo;
        $('final-accuracy').textContent = acc.toFixed(2) + '%';
        $('count-perfect').textContent = state.counts.perfect;
        $('count-good').textContent = state.counts.good;
        $('count-miss').textContent = state.counts.miss;

        showScreen('results');
    }

    function togglePause() {
        state.paused = !state.paused;
        const pm = $('pause-menu');
        if (state.paused) {
            pm.classList.remove('hidden');
            state.pausedAt = performance.now();
            // Quick & dirty: stop audio when paused (resuming continues without re-syncing)
            if (state.audio.ctx) state.audio.ctx.suspend();
        } else {
            pm.classList.add('hidden');
            const pauseDuration = performance.now() - state.pausedAt;
            state.startTime += pauseDuration;
            if (state.audio.ctx) state.audio.ctx.resume();
            requestAnimationFrame(gameLoop);
        }
    }

    function quitToMenu() {
        stopAllAudio();
        state.paused = false;
        $('pause-menu').classList.add('hidden');
        showScreen('menu');
    }

    // ============ EVENT WIRING ============
    function init() {
        // Song cards
        document.querySelectorAll('.song-card[data-song]').forEach((card) => {
            card.addEventListener('click', () => {
                const key = card.getAttribute('data-song');
                state.useCustomAudio = false;
                startSong(key, false);
            });
        });

        // Custom audio upload
        $('audio-upload').addEventListener('change', async (e) => {
            const file = e.target.files[0];
            if (!file) return;
            try {
                const arrayBuf = await file.arrayBuffer();
                const ac = getAudioCtx();
                const decoded = await ac.decodeAudioData(arrayBuf);
                state.customAudioBuffer = decoded;
                state.useCustomAudio = true;
                // Pick the "storm" map difficulty for custom tracks
                startSong('storm', true);
            } catch (err) {
                alert('Could not decode audio file: ' + err.message);
            }
        });

        // Keyboard
        window.addEventListener('keydown', onKeyDown);
        window.addEventListener('keyup', onKeyUp);

        // Pause menu
        $('pause-btn').addEventListener('click', togglePause);
        $('resume-btn').addEventListener('click', togglePause);
        $('restart-btn').addEventListener('click', () => {
            state.paused = false;
            $('pause-menu').classList.add('hidden');
            stopAllAudio();
            startSong(getCurrentSongKey(), state.useCustomAudio);
        });
        $('quit-btn').addEventListener('click', quitToMenu);

        // Results buttons
        $('retry-btn').addEventListener('click', () => {
            startSong(getCurrentSongKey(), state.useCustomAudio);
        });
        $('menu-btn').addEventListener('click', () => showScreen('menu'));

        // Canvas sizing
        window.addEventListener('resize', resizeCanvas);
    }

    function getCurrentSongKey() {
        // Find which built-in song matches current; default to 'neon'
        for (const k in SONGS) {
            if (SONGS[k].name === state.currentSong?.name) return k;
        }
        return 'neon';
    }

    // Boot
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
