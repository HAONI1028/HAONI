// ===================================================================
// RHYTHM DC — A Rhythm Plus-style rhythm game
// 4-key gameplay (D/F/J/K), falling notes, hit windows, combo, accuracy
// Supports: procedural synth audio, MP3 upload, and YouTube IFrame API
// ===================================================================

(() => {
    'use strict';

    // ============ CONSTANTS ============
    const LANES = 4;
    const KEYS = ['KeyD', 'KeyF', 'KeyJ', 'KeyK'];
    const LANE_COLORS = ['#ff2e8a', '#00f0ff', '#00f0ff', '#ff2e8a'];

    const PERFECT_WINDOW = 60;
    const GOOD_WINDOW = 130;
    const MISS_WINDOW = 200;

    // Note travel time (top -> hit line). Controlled by user's speed setting.
    // 1 = slow & easy to read, 10 = blink-and-you-die.
    const SPEED_TO_TRAVEL_MS = { 1: 2400, 2: 2100, 3: 1850, 4: 1650, 5: 1500, 6: 1350, 7: 1200, 8: 1050, 9: 880, 10: 700 };

    const SCORE_PERFECT = 300;
    const SCORE_GOOD = 100;
    const COMBO_MULTIPLIER_MAX = 4;

    // Hold-note release tolerance — releasing within this window of the tail
    // end counts as a successful hold. Releasing earlier breaks combo.
    const HOLD_RELEASE_WINDOW = 120;
    const HOLD_BONUS = 200; // score awarded for successfully completing a hold

    // Difficulty presets (shared by synth & YouTube tracks)
    // holdChance — probability that an on-beat note becomes a hold note
    const DIFFICULTY_PRESETS = {
        easy:    { density: 0.45, doubleChance: 0.04, triplet: 0,    laneRepeatChance: 0.3, holdChance: 0.08 },
        medium:  { density: 0.60, doubleChance: 0.10, triplet: 0.02, laneRepeatChance: 0.3, holdChance: 0.12 },
        hard:    { density: 0.75, doubleChance: 0.20, triplet: 0.06, laneRepeatChance: 0.35, holdChance: 0.16 },
        extreme: { density: 0.88, doubleChance: 0.32, triplet: 0.15, laneRepeatChance: 0.4, holdChance: 0.18 },
        insane:  { density: 1.00, doubleChance: 0.55, triplet: 0.30, laneRepeatChance: 0.5, holdChance: 0.22 },
    };

    // ============ SONG LIBRARIES ============
    // Procedural synth tracks — no external audio
    const SYNTH_SONGS = {
        neon:       { name: 'Neon Pulse',     bpm: 120, duration: 75,  difficulty: 'easy',
                      tone: { baseFreq: 110,    scale: [0, 3, 5, 7, 10] } },
        storm:      { name: 'Electric Storm', bpm: 140, duration: 80,  difficulty: 'medium',
                      tone: { baseFreq: 146.83, scale: [0, 2, 3, 5, 7, 8, 10] } },
        fury:       { name: 'Chrome Fury',    bpm: 160, duration: 90,  difficulty: 'hard',
                      tone: { baseFreq: 164.81, scale: [0, 2, 3, 7, 8, 10] } },
        hyperdrive: { name: 'Hyperdrive',     bpm: 180, duration: 95,  difficulty: 'extreme',
                      tone: { baseFreq: 196,    scale: [0, 2, 3, 5, 7, 10] } },
        apocalypse: { name: 'Apocalypse',     bpm: 200, duration: 110, difficulty: 'insane',
                      tone: { baseFreq: 220,    scale: [0, 1, 3, 6, 7, 10] } },
    };

    // YouTube preset tracks. Music streams from YouTube — we don't host any
    // audio. These are NoCopyrightSounds / royalty-free releases that are
    // designed to be embedded freely; major-label tracks usually return error
    // 150 ("embedding disabled by uploader") and won't play, so we avoid them.
    // BPM is hand-tuned. Add/edit freely — and paste your own URLs in the menu.
    const YT_SONGS = [
        { id: 'bM7SZ5SBzyY', title: 'Faded',             artist: 'Alan Walker (NCS-style)', bpm: 90,  difficulty: 'medium',  duration: 212 },
        { id: 'EP625xQIGzs', title: 'Hope',              artist: 'Tobu [NCS]',              bpm: 128, difficulty: 'medium',  duration: 233 },
        { id: 'J2X5mJ3HDYE', title: 'Invincible',        artist: 'DEAF KEV [NCS]',          bpm: 175, difficulty: 'hard',    duration: 263 },
        { id: '2cZ_EFAmj08', title: 'Nekozilla',         artist: 'Different Heaven [NCS]',  bpm: 110, difficulty: 'hard',    duration: 230 },
        { id: '3nQNiWdeH2Q', title: 'Heroes Tonight',    artist: 'Janji [NCS]',             bpm: 128, difficulty: 'medium',  duration: 252 },
        { id: 'IIrCDAV3EgI', title: 'Candyland',         artist: 'Tobu [NCS]',              bpm: 128, difficulty: 'medium',  duration: 266 },
        { id: 'fGlap4i_Aa4', title: 'Cradles',           artist: 'Sub Urban',               bpm: 128, difficulty: 'extreme', duration: 207 },
        { id: 'K4DyBUG242c', title: 'Cradles (Bg Mix)',  artist: 'Various',                 bpm: 128, difficulty: 'insane',  duration: 207 },
    ];

    // Map of YT IFrame error codes → human messages
    const YT_ERROR_MESSAGES = {
        2:   'Invalid video ID. Check the URL and try again.',
        5:   'The YouTube player ran into an HTML5 issue. Try refreshing the page.',
        100: 'This video has been removed or marked private.',
        101: 'The video owner does not allow it to be played in embedded players.',
        150: 'The video owner does not allow it to be played in embedded players.',
    };

    // ============ SETTINGS (persisted) ============
    const DEFAULTS = { noteSpeed: 5, offset: 0, showVideo: true };
    function loadSettings() {
        try {
            const s = JSON.parse(localStorage.getItem('rhythmDcSettings') || '{}');
            return { ...DEFAULTS, ...s };
        } catch { return { ...DEFAULTS }; }
    }
    function saveSettings(s) {
        try { localStorage.setItem('rhythmDcSettings', JSON.stringify(s)); }
        catch (e) { /* localStorage unavailable — ignore */ }
    }
    const settings = loadSettings();
    function getTravelMs() { return SPEED_TO_TRAVEL_MS[settings.noteSpeed] || 1500; }

    // ============ STATE ============
    const state = {
        screen: 'splash',
        currentTrack: null,
        notes: [],
        startTime: 0,
        paused: false,
        pausedAt: 0,
        score: 0,
        combo: 0,
        maxCombo: 0,
        counts: { perfect: 0, good: 0, miss: 0 },
        totalNotes: 0,
        keyPressed: [false, false, false, false],
        audio: { ctx: null, source: null, scheduledOscs: [] },
        ytPlayer: null,
        ytReady: false,
        useYtClock: false,
        lastMp3Buffer: null, // kept so retry works for uploaded files
    };

    // ============ DOM ============
    const $ = (id) => document.getElementById(id);
    const screens = { splash: $('splash'), menu: $('menu'), game: $('game'), results: $('results') };
    const canvas = $('game-canvas');
    const ctx = canvas.getContext('2d');

    function showScreen(name) {
        for (const k in screens) screens[k].classList.toggle('active', k === name);
        state.screen = name;
    }

    // ============ BEATMAP GENERATION ============
    function mulberry32(seed) {
        return function () {
            seed |= 0;
            seed = (seed + 0x6D2B79F5) | 0;
            let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
            t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
            return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
        };
    }

    function makeNote(time, lane, duration) {
        // duration > 0 -> hold note. headJudged is set when the keydown is
        // judged; for tap notes that immediately = full judged. For holds,
        // .judged is only set when the tail completes (or release breaks it).
        return {
            time, lane,
            duration: duration || 0,
            judged: false,        // fully resolved (head + tail done)
            headJudged: false,    // head was hit / missed
            holding: false,       // currently being held
        };
    }

    function generateBeatmap(opts, seed) {
        const rand = mulberry32(seed);
        const diff = DIFFICULTY_PRESETS[opts.difficulty] || DIFFICULTY_PRESETS.medium;
        const subdivisions = (opts.difficulty === 'insane' || opts.difficulty === 'extreme') ? 4 : 2;
        const beatMs = 60000 / opts.bpm;
        const stepMs = beatMs / subdivisions;
        const leadIn = opts.leadIn ?? 2500;
        const usableDur = opts.duration * 1000 - leadIn - 1500;
        const totalSteps = Math.max(0, Math.floor(usableDur / stepMs));

        const notes = [];
        let lastLane = -1;
        const halfSub = Math.max(1, Math.floor(subdivisions / 2));

        // Track when each lane is next free (so a hold note doesn't overlap
        // with new notes spawning in the same lane while it's still held)
        const laneBusyUntil = [0, 0, 0, 0];

        for (let i = 4; i < totalSteps; i++) {
            const time = leadIn + i * stepMs;
            const onBeat = i % subdivisions === 0;
            const onHalfBeat = i % halfSub === 0;
            const threshold = onBeat ? diff.density
                               : onHalfBeat ? diff.density * 0.6
                               : diff.density * 0.35;

            if (rand() < threshold) {
                let lane, tries = 0;
                do {
                    lane = Math.floor(rand() * LANES);
                    tries++;
                } while (
                    (lane === lastLane && rand() > diff.laneRepeatChance && tries < 6) ||
                    laneBusyUntil[lane] > time
                );
                if (laneBusyUntil[lane] > time) continue; // all lanes busy — skip step

                // Decide if this is a hold note. Holds only spawn on strong
                // beats and need room (don't make one right before song ends).
                let dur = 0;
                if (onBeat && rand() < diff.holdChance) {
                    // 1–2 beats long, randomly
                    const beats = rand() < 0.6 ? 1 : 2;
                    dur = beatMs * beats;
                    // Don't extend past the song
                    if (time + dur > opts.duration * 1000 - 1000) dur = 0;
                }

                notes.push(makeNote(time, lane, dur));
                if (dur > 0) laneBusyUntil[lane] = time + dur + 100;
                lastLane = lane;

                if (onBeat && rand() < diff.doubleChance) {
                    let lane2;
                    do { lane2 = Math.floor(rand() * LANES); }
                    while (lane2 === lane || laneBusyUntil[lane2] > time);
                    if (laneBusyUntil[lane2] <= time) {
                        notes.push(makeNote(time, lane2, 0)); // doubles are always taps
                    }
                }
                if (onBeat && rand() < diff.triplet) {
                    const used = new Set([lane]);
                    let lane3, t3 = 0;
                    do {
                        lane3 = Math.floor(rand() * LANES);
                        t3++;
                    } while ((used.has(lane3) || laneBusyUntil[lane3] > time) && t3 < 8);
                    if (!used.has(lane3) && laneBusyUntil[lane3] <= time) {
                        notes.push(makeNote(time, lane3, 0));
                    }
                }
            }
        }
        return notes;
    }

    // ============ AUDIO ENGINE (procedural) ============
    function getAudioCtx() {
        if (!state.audio.ctx) {
            const AC = window.AudioContext || window.webkitAudioContext;
            state.audio.ctx = new AC();
        }
        return state.audio.ctx;
    }

    function stopProceduralAudio() {
        state.audio.scheduledOscs.forEach((o) => { try { o.stop(); } catch (e) {} });
        state.audio.scheduledOscs = [];
        if (state.audio.source) {
            try { state.audio.source.stop(); } catch (e) {}
            state.audio.source = null;
        }
    }

    function scheduleProceduralSong(song, startAtAudioTime) {
        const ac = getAudioCtx();
        const beatSec = 60 / song.bpm;
        const totalBeats = Math.floor(song.duration / beatSec);

        const master = ac.createGain();
        master.gain.value = 0;
        master.gain.linearRampToValueAtTime(0.3, startAtAudioTime + 0.5);
        master.gain.setValueAtTime(0.3, startAtAudioTime + song.duration - 1);
        master.gain.linearRampToValueAtTime(0, startAtAudioTime + song.duration);
        master.connect(ac.destination);

        const scale = song.tone.scale;
        const base = song.tone.baseFreq;

        for (let b = 0; b < totalBeats; b++) {
            const t = startAtAudioTime + b * beatSec;
            if (b % 4 === 0 || b % 4 === 2) scheduleKick(ac, master, t);
            if (b % 4 === 1 || b % 4 === 3) scheduleSnare(ac, master, t);
            scheduleHat(ac, master, t);
            scheduleHat(ac, master, t + beatSec / 2);
            if (b % 2 === 0) {
                const noteIdx = scale[Math.floor((b * 7919) % scale.length)];
                scheduleBass(ac, master, t, base * Math.pow(2, noteIdx / 12), beatSec * 0.9);
            }
            if ((b * 13 % 7) < 3) {
                const noteIdx = scale[Math.floor((b * 1597) % scale.length)];
                scheduleLead(ac, master, t, base * 4 * Math.pow(2, noteIdx / 12), beatSec * 0.4);
            }
        }
    }

    function scheduleKick(ac, dest, t) {
        const o = ac.createOscillator(), g = ac.createGain();
        o.frequency.setValueAtTime(150, t);
        o.frequency.exponentialRampToValueAtTime(40, t + 0.15);
        g.gain.setValueAtTime(0.9, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.18);
        o.connect(g).connect(dest); o.start(t); o.stop(t + 0.2);
        state.audio.scheduledOscs.push(o);
    }
    function scheduleSnare(ac, dest, t) {
        const noise = ac.createBufferSource();
        const buf = ac.createBuffer(1, ac.sampleRate * 0.2, ac.sampleRate);
        const d = buf.getChannelData(0);
        for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
        noise.buffer = buf;
        const f = ac.createBiquadFilter(); f.type = 'highpass'; f.frequency.value = 1500;
        const g = ac.createGain();
        g.gain.setValueAtTime(0.5, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
        noise.connect(f).connect(g).connect(dest); noise.start(t); noise.stop(t + 0.2);
        state.audio.scheduledOscs.push(noise);
    }
    function scheduleHat(ac, dest, t) {
        const noise = ac.createBufferSource();
        const buf = ac.createBuffer(1, ac.sampleRate * 0.05, ac.sampleRate);
        const d = buf.getChannelData(0);
        for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
        noise.buffer = buf;
        const f = ac.createBiquadFilter(); f.type = 'highpass'; f.frequency.value = 7000;
        const g = ac.createGain();
        g.gain.setValueAtTime(0.12, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.04);
        noise.connect(f).connect(g).connect(dest); noise.start(t); noise.stop(t + 0.06);
        state.audio.scheduledOscs.push(noise);
    }
    function scheduleBass(ac, dest, t, freq, dur) {
        const o = ac.createOscillator(); o.type = 'sawtooth'; o.frequency.value = freq;
        const f = ac.createBiquadFilter(); f.type = 'lowpass';
        f.frequency.setValueAtTime(800, t);
        f.frequency.exponentialRampToValueAtTime(200, t + dur);
        const g = ac.createGain();
        g.gain.setValueAtTime(0.18, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + dur);
        o.connect(f).connect(g).connect(dest); o.start(t); o.stop(t + dur + 0.05);
        state.audio.scheduledOscs.push(o);
    }
    function scheduleLead(ac, dest, t, freq, dur) {
        const o = ac.createOscillator(); o.type = 'square'; o.frequency.value = freq;
        const g = ac.createGain();
        g.gain.setValueAtTime(0, t);
        g.gain.linearRampToValueAtTime(0.1, t + 0.02);
        g.gain.exponentialRampToValueAtTime(0.001, t + dur);
        o.connect(g).connect(dest); o.start(t); o.stop(t + dur + 0.05);
        state.audio.scheduledOscs.push(o);
    }

    function playCustomAudio(buffer, startAtAudioTime) {
        const ac = getAudioCtx();
        const src = ac.createBufferSource();
        src.buffer = buffer;
        const g = ac.createGain(); g.gain.value = 0.7;
        src.connect(g).connect(ac.destination);
        src.start(startAtAudioTime);
        state.audio.source = src;
    }

    function playHitSound(type) {
        // Skip when YT is playing — keeps the music clean
        if (state.useYtClock) return;
        const ac = getAudioCtx();
        const now = ac.currentTime;
        const o = ac.createOscillator(), g = ac.createGain();
        o.frequency.value = type === 'perfect' ? 1200 : type === 'good' ? 800 : 200;
        o.type = type === 'miss' ? 'sawtooth' : 'sine';
        g.gain.setValueAtTime(0.15, now);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        o.connect(g).connect(ac.destination);
        o.start(now); o.stop(now + 0.1);
    }

    // ============ YOUTUBE IFRAME PLAYER ============
    // Approach copied from Rhythm Plus (henryzt/Rhythm-Plus-Music-Game):
    // Use the YT IFrame Player API to play a video, poll getCurrentTime() as
    // the master clock for note timing. Audio is streamed from YouTube — we
    // never host or download it, so no copyright issues.
    let ytApiLoadingPromise = null;
    function loadYouTubeAPI() {
        if (window.YT && window.YT.Player) return Promise.resolve();
        if (ytApiLoadingPromise) return ytApiLoadingPromise;
        ytApiLoadingPromise = new Promise((resolve) => {
            const prev = window.onYouTubeIframeAPIReady;
            window.onYouTubeIframeAPIReady = () => {
                if (typeof prev === 'function') prev();
                resolve();
            };
            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';
            document.head.appendChild(tag);
        });
        return ytApiLoadingPromise;
    }

    function createYouTubePlayer(videoId, onReady, onEnd) {
        if (state.ytPlayer) {
            try { state.ytPlayer.destroy(); } catch (e) {}
            state.ytPlayer = null;
        }
        state.ytReady = false;

        // The element gets replaced by the iframe — recreate the div
        const wrap = $('yt-player-wrap');
        wrap.innerHTML = '<div id="yt-player"></div>';

        state.ytPlayer = new YT.Player('yt-player', {
            videoId,
            playerVars: {
                controls: 0, disablekb: 1, modestbranding: 1,
                playsinline: 1, rel: 0, fs: 0, iv_load_policy: 3, autoplay: 0,
            },
            events: {
                onReady: () => { state.ytReady = true; onReady(); },
                onStateChange: (e) => {
                    if (e.data === YT.PlayerState.ENDED) onEnd();
                },
                onError: (e) => {
                    showYouTubeError(e.data);
                },
            },
        });
    }

    function showYouTubeError(code) {
        // Tear down the failed player, hide overlays, then show error modal
        if (state.ytPlayer) {
            try { state.ytPlayer.destroy(); } catch (e) {}
            state.ytPlayer = null;
        }
        state.ytReady = false;
        state.useYtClock = false;
        $('loading-overlay').classList.add('hidden');
        $('yt-player-wrap').classList.add('hidden');

        const msg = YT_ERROR_MESSAGES[code] || ('Unknown YouTube error (code ' + code + ').');
        $('yt-error-text').textContent = msg + ' (Error ' + code + ')';
        $('yt-error-modal').classList.remove('hidden');
    }

    function parseYouTubeId(url) {
        if (/^[a-zA-Z0-9_-]{11}$/.test(url)) return url;
        const patterns = [
            /[?&]v=([a-zA-Z0-9_-]{11})/,
            /youtu\.be\/([a-zA-Z0-9_-]{11})/,
            /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
            /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
        ];
        for (const p of patterns) {
            const m = url.match(p);
            if (m) return m[1];
        }
        return null;
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
        const w = canvas.clientWidth, h = canvas.clientHeight;
        ctx.clearRect(0, 0, w, h);
        const hitY = h - 80;
        const travelMs = getTravelMs();

        // Lane dividers
        for (let i = 0; i <= LANES; i++) {
            const r = i < LANES ? getLaneRect(i, w) : getLaneRect(LANES - 1, w);
            const x = i < LANES ? r.x : r.x + r.w;
            ctx.strokeStyle = 'rgba(255,255,255,0.05)';
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
        }

        const firstLane = getLaneRect(0, w), lastLane = getLaneRect(LANES - 1, w);
        const playLeft = firstLane.x, playRight = lastLane.x + lastLane.w;

        // Hit line + glow
        const grad = ctx.createLinearGradient(0, hitY - 2, 0, hitY + 2);
        grad.addColorStop(0, 'rgba(255, 215, 0, 0)');
        grad.addColorStop(0.5, 'rgba(255, 215, 0, 1)');
        grad.addColorStop(1, 'rgba(255, 215, 0, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(playLeft, hitY - 2, playRight - playLeft, 4);

        const glowGrad = ctx.createLinearGradient(0, hitY, 0, h);
        glowGrad.addColorStop(0, 'rgba(255, 215, 0, 0.3)');
        glowGrad.addColorStop(1, 'rgba(255, 215, 0, 0)');
        ctx.fillStyle = glowGrad;
        ctx.fillRect(playLeft, hitY, playRight - playLeft, h - hitY);

        // Notes — taps first, then holds get a tail
        const pxPerMs = hitY / travelMs;

        for (const note of state.notes) {
            if (note.judged) continue;
            const dt = note.time - elapsedMs;

            // Skip notes far in future
            if (dt > travelMs + 100) continue;
            // Skip notes far in past (but for holds, the tail may still be visible)
            const tailEndDt = dt + note.duration;
            if (tailEndDt < -MISS_WINDOW - 50) continue;

            const lane = getLaneRect(note.lane, w);
            const noteH = 24, padding = 8;
            const x = lane.x + padding, noteW = lane.w - padding * 2;
            const color = LANE_COLORS[note.lane];

            // Head Y (where the head currently is, or would be)
            let headY = hitY * (1 - dt / travelMs);
            // If we're holding the note and head has passed the hit line,
            // clamp the visual head to the hit line so it doesn't slide off.
            if (note.holding && headY > hitY) headY = hitY;

            // ---- Hold tail ----
            if (note.duration > 0) {
                // Tail end Y (Y when the END of the hold reaches the hit line)
                const tailY = hitY * (1 - tailEndDt / travelMs);
                // Tail runs from tailY (top) to headY (bottom). While holding,
                // headY is clamped to hitY so the tail visually shrinks down
                // as it's being held.
                const tailTop = Math.min(headY, tailY);
                const tailBot = note.holding ? hitY : headY;
                const tailH = tailBot - tailTop;
                if (tailH > 0) {
                    const tailX = x + 6;
                    const tailW = noteW - 12;
                    // Gradient tail
                    ctx.globalAlpha = note.headJudged ? 0.85 : 0.6;
                    const tailGrad = ctx.createLinearGradient(0, tailTop, 0, tailBot);
                    tailGrad.addColorStop(0, color + '00');
                    tailGrad.addColorStop(0.2, color + 'cc');
                    tailGrad.addColorStop(1, color + 'ff');
                    ctx.fillStyle = tailGrad;
                    ctx.shadowBlur = 12;
                    ctx.shadowColor = color;
                    roundRect(ctx, tailX, tailTop, tailW, tailH, 4); ctx.fill();
                    ctx.globalAlpha = 1;
                    ctx.shadowBlur = 0;
                }
            }

            // ---- Head ----
            // Hide the head once it's been hit on a hold (we keep the tail rendering)
            if (!(note.duration > 0 && note.headJudged)) {
                ctx.shadowBlur = 20;
                ctx.shadowColor = color;
                ctx.fillStyle = color;
                roundRect(ctx, x, headY - noteH / 2, noteW, noteH, 6); ctx.fill();

                ctx.shadowBlur = 0;
                const innerGrad = ctx.createLinearGradient(x, headY - noteH / 2, x, headY + noteH / 2);
                innerGrad.addColorStop(0, 'rgba(255,255,255,0.6)');
                innerGrad.addColorStop(0.5, 'rgba(255,255,255,0.2)');
                innerGrad.addColorStop(1, 'rgba(255,255,255,0)');
                ctx.fillStyle = innerGrad;
                roundRect(ctx, x + 2, headY - noteH / 2 + 2, noteW - 4, noteH - 4, 4); ctx.fill();
            }
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
    function getElapsedMs() {
        // YouTube tracks: poll the player's currentTime as the master clock.
        // This is the Rhythm Plus pattern — keeps notes synced even if the
        // player buffers, skips, or has a hiccup.
        if (state.useYtClock && state.ytPlayer && state.ytReady) {
            const sec = state.ytPlayer.getCurrentTime();
            return sec * 1000 + (settings.offset || 0);
        }
        return performance.now() - state.startTime + (settings.offset || 0);
    }

    function gameLoop() {
        if (state.screen !== 'game') return;
        if (state.paused) { requestAnimationFrame(gameLoop); return; }

        const elapsed = getElapsedMs();

        for (const note of state.notes) {
            if (note.judged) continue;

            // Tap note missed
            if (note.duration === 0 && !note.headJudged && elapsed > note.time + MISS_WINDOW) {
                note.headJudged = true;
                note.judged = true;
                registerJudgment('miss');
                continue;
            }

            // Hold note: head missed entirely (never pressed)
            if (note.duration > 0 && !note.headJudged && elapsed > note.time + MISS_WINDOW) {
                note.headJudged = true;
                note.judged = true;
                registerJudgment('miss');
                continue;
            }

            // Hold note: successfully held to the end
            if (note.duration > 0 && note.holding && elapsed >= note.time + note.duration) {
                note.holding = false;
                note.judged = true;
                state.score += HOLD_BONUS;
                $('score').textContent = state.score;
                registerJudgment('perfect');
            }
        }

        const dur = state.currentTrack.duration * 1000 + 2000;
        const pct = Math.min(1, Math.max(0, elapsed / dur));
        $('progress-fill').style.width = (pct * 100) + '%';

        draw(elapsed);

        if (elapsed > dur) { finishSong(); return; }
        requestAnimationFrame(gameLoop);
    }

    // ============ INPUT ============
    function onKeyDown(e) {
        // Splash screen: any key dismisses
        if (state.screen === 'splash') {
            dismissSplash();
            return;
        }
        if (e.code === 'Escape' && state.screen === 'game') {
            togglePause(); return;
        }
        const lane = KEYS.indexOf(e.code);
        if (lane === -1 || state.screen !== 'game' || state.paused) return;
        if (state.keyPressed[lane]) return;
        state.keyPressed[lane] = true;
        document.querySelector('.lane[data-lane="' + lane + '"]')?.classList.add('pressed');
        tryHit(lane);
    }

    let splashDismissing = false;
    function dismissSplash() {
        if (splashDismissing) return;
        splashDismissing = true;
        // Unlock audio context on first user gesture (browser autoplay policy)
        try { getAudioCtx().resume(); } catch (e) { /* ignore */ }

        const splash = screens.splash;
        splash.classList.add('leaving');
        setTimeout(() => {
            splash.classList.remove('leaving');
            showScreen('menu');
        }, 500);
    }
    function onKeyUp(e) {
        const lane = KEYS.indexOf(e.code);
        if (lane === -1) return;
        state.keyPressed[lane] = false;
        document.querySelector('.lane[data-lane="' + lane + '"]')?.classList.remove('pressed');
        if (state.screen === 'game' && !state.paused) {
            tryRelease(lane);
        }
    }

    function tryHit(lane) {
        const elapsed = getElapsedMs();
        let best = null, bestDist = Infinity;
        for (const note of state.notes) {
            if (note.judged || note.headJudged || note.lane !== lane) continue;
            const dist = Math.abs(note.time - elapsed);
            if (dist < bestDist && dist <= MISS_WINDOW) {
                bestDist = dist; best = note;
            }
        }
        if (!best) return;

        const judgment = bestDist <= PERFECT_WINDOW ? 'perfect'
                       : bestDist <= GOOD_WINDOW   ? 'good'
                       : 'miss';

        best.headJudged = true;
        if (best.duration > 0 && judgment !== 'miss') {
            // Hold note: head is hit, now tracking the hold
            best.holding = true;
            // Don't set judged=true yet — the tail still needs to be held
            registerJudgment(judgment);
        } else {
            best.judged = true;
            registerJudgment(judgment);
        }
    }

    function tryRelease(lane) {
        // Find the active hold note in this lane (if any)
        const elapsed = getElapsedMs();
        for (const note of state.notes) {
            if (note.lane !== lane || !note.holding) continue;
            const expectedRelease = note.time + note.duration;
            // If released within tolerance window of the end, count as success
            if (elapsed >= expectedRelease - HOLD_RELEASE_WINDOW) {
                note.holding = false;
                note.judged = true;
                state.score += HOLD_BONUS;
                $('score').textContent = state.score;
                registerJudgment('perfect');
            } else {
                // Released too early -> break combo, count as miss
                note.holding = false;
                note.judged = true;
                registerJudgment('miss');
            }
            return; // only one hold per lane at a time
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

        $('score').textContent = state.score;

        const comboEl = $('combo');
        const comboDisplay = $('combo-display');
        comboEl.textContent = state.combo;
        // Show combo only when there's an active streak
        if (state.combo > 1) {
            comboDisplay.classList.add('visible');
        } else {
            comboDisplay.classList.remove('visible');
        }
        comboDisplay.classList.remove('bump');
        void comboDisplay.offsetWidth;
        if (type !== 'miss') comboDisplay.classList.add('bump');

        const judged = state.counts.perfect + state.counts.good + state.counts.miss;
        const acc = judged === 0 ? 100 :
            ((state.counts.perfect + state.counts.good * 0.5) / judged) * 100;
        $('accuracy').textContent = acc.toFixed(1) + '%';

        const j = $('judgment');
        j.textContent = type.toUpperCase();
        j.className = 'judgment ' + type;
        void j.offsetWidth;
        j.classList.add('show');
    }

    // ============ TRACK STARTING ============
    function startSynthTrack(key) {
        const song = SYNTH_SONGS[key];
        if (!song) return;

        const track = { source: 'synth', key, name: song.name, duration: song.duration };

        // Notes use leadIn=2500 so the first note hits at the audio downbeat
        const notes = generateBeatmap({
            bpm: song.bpm, duration: song.duration,
            difficulty: song.difficulty, leadIn: 2500,
        }, hashCode(song.name + key));

        beginTrack(track, notes);

        const ac = getAudioCtx();
        if (ac.state === 'suspended') ac.resume();
        // performance.now() == startTime when elapsed == 0, audio downbeat
        // is scheduled +2.55s into the future (matching leadIn=2500ms).
        state.startTime = performance.now();
        state.useYtClock = false;
        scheduleProceduralSong(song, ac.currentTime + 2.55);

        $('yt-player-wrap').classList.add('hidden');
        requestAnimationFrame(gameLoop);
    }

    function startMp3Track(buffer) {
        const track = {
            source: 'mp3', name: 'Custom Track', duration: buffer.duration,
        };
        const notes = generateBeatmap({
            bpm: 128, duration: buffer.duration,
            difficulty: 'medium', leadIn: 2500,
        }, hashCode('custom-' + buffer.duration));

        beginTrack(track, notes);

        const ac = getAudioCtx();
        if (ac.state === 'suspended') ac.resume();
        state.startTime = performance.now();
        state.useYtClock = false;
        playCustomAudio(buffer, ac.currentTime + 2.55);

        $('yt-player-wrap').classList.add('hidden');
        requestAnimationFrame(gameLoop);
    }

    async function startYouTubeTrack(videoId, opts) {
        // opts = { title, artist, bpm, difficulty, duration }
        const track = {
            source: 'youtube',
            videoId,
            name: opts.title + (opts.artist ? ' — ' + opts.artist : ''),
            duration: opts.duration,
            bpm: opts.bpm,
            difficulty: opts.difficulty,
        };

        // YouTube's clock starts at 0 when the video plays. Give a short
        // lead-in so the first notes don't appear right at video start.
        const ytLeadIn = 2000;
        const notes = generateBeatmap({
            bpm: opts.bpm, duration: opts.duration,
            difficulty: opts.difficulty, leadIn: ytLeadIn,
        }, hashCode(videoId + opts.difficulty));

        beginTrack(track, notes);
        showScreen('game');
        resizeCanvas();
        $('loading-overlay').classList.remove('hidden');
        $('loading-text').textContent = 'Loading YouTube video…';

        const wrap = $('yt-player-wrap');
        wrap.classList.remove('hidden');
        wrap.classList.toggle('dim', !settings.showVideo);

        await loadYouTubeAPI();
        createYouTubePlayer(videoId,
            () => {
                $('loading-overlay').classList.add('hidden');
                state.useYtClock = true;
                state.startTime = performance.now();
                try {
                    state.ytPlayer.unMute();
                    state.ytPlayer.setVolume(80);
                    state.ytPlayer.playVideo();
                } catch (e) { /* */ }
                requestAnimationFrame(gameLoop);
            },
            () => { finishSong(); }
        );
    }

    function beginTrack(track, notes) {
        state.currentTrack = track;
        state.notes = notes;
        state.totalNotes = notes.length;
        state.score = 0;
        state.combo = 0;
        state.maxCombo = 0;
        state.counts = { perfect: 0, good: 0, miss: 0 };
        state.paused = false;

        $('track-name').textContent = track.name;
        $('score').textContent = '0';
        $('combo').textContent = '0';
        $('combo-display').classList.remove('visible', 'bump');
        $('accuracy').textContent = '100%';
        $('progress-fill').style.width = '0%';
        const j = $('judgment'); j.className = 'judgment'; j.textContent = '';

        if (track.source !== 'youtube') {
            showScreen('game');
            resizeCanvas();
        }
    }

    function hashCode(str) {
        let h = 0;
        for (let i = 0; i < str.length; i++) {
            h = (h << 5) - h + str.charCodeAt(i);
            h |= 0;
        }
        return Math.abs(h) || 1;
    }

    function finishSong() {
        stopProceduralAudio();
        if (state.ytPlayer) { try { state.ytPlayer.pauseVideo(); } catch (e) {} }
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
        $('result-track').textContent = state.currentTrack.name + ' — Cleared!';
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
            if (state.audio.ctx) state.audio.ctx.suspend();
            if (state.ytPlayer) { try { state.ytPlayer.pauseVideo(); } catch (e) {} }
        } else {
            pm.classList.add('hidden');
            const pauseDur = performance.now() - state.pausedAt;
            if (!state.useYtClock) state.startTime += pauseDur;
            if (state.audio.ctx) state.audio.ctx.resume();
            if (state.ytPlayer) { try { state.ytPlayer.playVideo(); } catch (e) {} }
            requestAnimationFrame(gameLoop);
        }
    }

    function quitToMenu() {
        stopProceduralAudio();
        if (state.ytPlayer) { try { state.ytPlayer.stopVideo(); } catch (e) {} }
        state.paused = false;
        $('pause-menu').classList.add('hidden');
        $('loading-overlay').classList.add('hidden');
        $('yt-player-wrap').classList.add('hidden');
        state.useYtClock = false;
        showScreen('menu');
    }

    function restartCurrent() {
        const t = state.currentTrack;
        if (!t) return;
        stopProceduralAudio();
        if (state.ytPlayer) { try { state.ytPlayer.stopVideo(); } catch (e) {} }
        state.paused = false;
        $('pause-menu').classList.add('hidden');

        if (t.source === 'synth') {
            startSynthTrack(t.key);
        } else if (t.source === 'youtube') {
            startYouTubeTrack(t.videoId, {
                title: t.name.split(' — ')[0],
                artist: t.name.split(' — ')[1] || '',
                bpm: t.bpm,
                difficulty: t.difficulty || 'medium',
                duration: t.duration,
            });
        } else if (t.source === 'mp3') {
            if (state.lastMp3Buffer) startMp3Track(state.lastMp3Buffer);
            else showScreen('menu');
        }
    }

    // ============ MENU RENDERING ============
    function renderYouTubeSongs() {
        const container = $('yt-songs');
        container.innerHTML = '';
        YT_SONGS.forEach((song) => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'song-card';

            const art = document.createElement('div');
            art.className = 'song-art yt-art';
            art.style.backgroundImage = 'url(https://i.ytimg.com/vi/' + song.id + '/mqdefault.jpg)';

            const meta = document.createElement('div');
            meta.className = 'song-meta';
            const min = Math.floor(song.duration / 60);
            const sec = (song.duration % 60).toString().padStart(2, '0');
            meta.innerHTML =
                '<div class="song-title">' + escapeHtml(song.title) + '</div>' +
                '<div class="song-artist">' + escapeHtml(song.artist) + ' // ' + song.bpm + ' BPM // ' + min + ':' + sec + '</div>' +
                '<div class="song-diff ' + song.difficulty + '">' + song.difficulty.toUpperCase() + '</div>';

            btn.appendChild(art);
            btn.appendChild(meta);
            btn.addEventListener('click', () => {
                startYouTubeTrack(song.id, {
                    title: song.title, artist: song.artist,
                    bpm: song.bpm, difficulty: song.difficulty, duration: song.duration,
                });
            });
            container.appendChild(btn);
        });
    }

    function escapeHtml(s) {
        return String(s).replace(/[&<>"']/g, (c) =>
            ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
    }

    // ============ SETTINGS UI ============
    // The menu settings modal and the pause menu both expose the same
    // controls — `syncSettingsUI` keeps both views in sync.
    function syncSettingsUI() {
        const speedTxt = settings.noteSpeed + '×';
        const offsetTxt = settings.offset + ' ms';
        $('note-speed').value = settings.noteSpeed;
        $('note-speed-value').textContent = speedTxt;
        $('offset').value = settings.offset;
        $('offset-value').textContent = offsetTxt;
        $('show-video').checked = settings.showVideo;
        $('pause-note-speed').value = settings.noteSpeed;
        $('pause-note-speed-value').textContent = speedTxt;
        $('pause-offset').value = settings.offset;
        $('pause-offset-value').textContent = offsetTxt;
        $('pause-show-video').checked = settings.showVideo;
    }

    function applyShowVideo() {
        const wrap = $('yt-player-wrap');
        if (wrap && !wrap.classList.contains('hidden')) {
            wrap.classList.toggle('dim', !settings.showVideo);
        }
    }

    function initSettingsUI() {
        syncSettingsUI();

        // Helper to wire a slider/toggle pair (menu + pause) to a setting
        const onNoteSpeed = (e) => {
            settings.noteSpeed = parseInt(e.target.value, 10);
            saveSettings(settings); syncSettingsUI();
        };
        const onOffset = (e) => {
            settings.offset = parseInt(e.target.value, 10);
            saveSettings(settings); syncSettingsUI();
        };
        const onShowVideo = (e) => {
            settings.showVideo = e.target.checked;
            saveSettings(settings); syncSettingsUI(); applyShowVideo();
        };

        $('note-speed').addEventListener('input', onNoteSpeed);
        $('pause-note-speed').addEventListener('input', onNoteSpeed);
        $('offset').addEventListener('input', onOffset);
        $('pause-offset').addEventListener('input', onOffset);
        $('show-video').addEventListener('change', onShowVideo);
        $('pause-show-video').addEventListener('change', onShowVideo);

        $('settings-btn').addEventListener('click', () => {
            $('settings-modal').classList.remove('hidden');
        });
        $('settings-close').addEventListener('click', () => {
            $('settings-modal').classList.add('hidden');
        });
    }

    // ============ EVENT WIRING ============
    function init() {
        document.querySelectorAll('.song-card[data-song]').forEach((card) => {
            card.addEventListener('click', () => startSynthTrack(card.getAttribute('data-song')));
        });

        $('audio-upload').addEventListener('change', async (e) => {
            const file = e.target.files[0];
            if (!file) return;
            try {
                const buf = await file.arrayBuffer();
                const ac = getAudioCtx();
                const decoded = await ac.decodeAudioData(buf);
                state.lastMp3Buffer = decoded;
                startMp3Track(decoded);
            } catch (err) {
                alert('Could not decode audio file: ' + err.message);
            }
        });

        renderYouTubeSongs();

        $('yt-play').addEventListener('click', () => {
            const url = $('yt-url').value.trim();
            const id = parseYouTubeId(url);
            if (!id) { alert('Could not parse a YouTube video ID from that URL.'); return; }
            const bpm = parseInt($('yt-bpm').value, 10) || 128;
            const difficulty = $('yt-diff').value;
            startYouTubeTrack(id, {
                title: 'Custom YouTube Track', artist: '',
                bpm, difficulty, duration: 240, // YT will end the track via onStateChange
            });
        });

        window.addEventListener('keydown', onKeyDown);
        window.addEventListener('keyup', onKeyUp);

        // Splash: click or touch to dismiss
        screens.splash.addEventListener('click', dismissSplash);
        screens.splash.addEventListener('touchstart', dismissSplash, { passive: true });

        $('pause-btn').addEventListener('click', togglePause);
        $('resume-btn').addEventListener('click', togglePause);
        $('restart-btn').addEventListener('click', restartCurrent);
        $('quit-btn').addEventListener('click', quitToMenu);
        $('retry-btn').addEventListener('click', restartCurrent);
        $('menu-btn').addEventListener('click', () => showScreen('menu'));

        $('yt-error-close').addEventListener('click', () => {
            $('yt-error-modal').classList.add('hidden');
            quitToMenu();
        });

        window.addEventListener('resize', resizeCanvas);

        initSettingsUI();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
