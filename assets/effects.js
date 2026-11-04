/* =====================================================================
   Visual effects for the profile page:
   - background particles (stars, snow, fireflies, rain, constellation)
   - cursor effects (sparkles, glow, comet trail) — mouse/trackpad only
   - 3D card tilt — mouse/trackpad only
   Everything respects "reduce motion": particles freeze into a still
   picture and cursor/tilt effects switch off.
   ===================================================================== */
(function () {
  "use strict";

  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const finePointer = matchMedia("(pointer: fine)");
  const TAU = Math.PI * 2;
  const rand = (a, b) => a + Math.random() * (b - a);
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  /* ---------- colours (read from CSS variables --fx and --accent) ---------- */
  const colors = { fx: [255, 255, 255], accent: [123, 0, 255] };
  const rgba = (c, a) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;
  function readColor(name, fallback) {
    const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    const m = /^#([0-9a-f]{6})$/i.exec(v);
    if (!m) return fallback;
    const n = parseInt(m[1], 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  let glowSprite = null;
  function makeGlowSprite() {
    const c = document.createElement("canvas");
    c.width = c.height = 64;
    const g = c.getContext("2d");
    const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, rgba(colors.accent, 0.9));
    grad.addColorStop(0.25, rgba(colors.accent, 0.45));
    grad.addColorStop(1, rgba(colors.accent, 0));
    g.fillStyle = grad;
    g.fillRect(0, 0, 64, 64);
    glowSprite = c;
  }
  function refreshColors() {
    colors.fx = readColor("--fx", [255, 255, 255]);
    colors.accent = readColor("--accent", [123, 0, 255]);
    makeGlowSprite();
    if (bg.effect && !bg.raf) drawStill();
  }

  /* ---------- shared pointer position ---------- */
  const pointer = { x: -9999, y: -9999, inside: false };
  addEventListener("pointermove", (e) => {
    if (e.pointerType !== "mouse" && e.pointerType !== "pen") return;
    pointer.x = e.clientX; pointer.y = e.clientY; pointer.inside = true;
    onCursorMove();
  }, { passive: true });
  document.documentElement.addEventListener("mouseleave", () => { pointer.inside = false; kickCursor(); });

  /* =====================================================================
     BACKGROUND PARTICLES
     Each effect: init(w, h) -> particles, frame(ctx, parts, dt, t, w, h)
     ===================================================================== */
  const EFFECTS = {
    stars: {
      init(w, h) {
        const n = clamp(Math.round(w * h / 7000), 40, 320);
        return { list: Array.from({ length: n }, () => ({
          x: rand(0, w), y: rand(0, h), r: rand(0.3, 1.4), tw: rand(0.4, 1.6), ph: rand(0, TAU), vy: rand(1, 6),
        })), shoot: null, nextShoot: rand(3, 8) };
      },
      frame(ctx, P, dt, t, w, h) {
        for (const p of P.list) {
          p.y -= p.vy * dt;
          if (p.y < -2) { p.y = h + 2; p.x = rand(0, w); }
          const a = 0.2 + 0.8 * (0.5 + 0.5 * Math.sin(t * p.tw * 2 + p.ph));
          ctx.fillStyle = rgba(colors.fx, a * 0.85);
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, TAU); ctx.fill();
        }
        // occasional shooting star
        if (dt) {
          P.nextShoot -= dt;
          if (!P.shoot && P.nextShoot <= 0) {
            P.shoot = { x: rand(w * 0.1, w * 0.9), y: rand(0, h * 0.4), vx: rand(-520, -380), vy: rand(160, 260), life: 1 };
            P.nextShoot = rand(5, 11);
          }
          const s = P.shoot;
          if (s) {
            s.x += s.vx * dt; s.y += s.vy * dt; s.life -= dt * 1.1;
            const g = ctx.createLinearGradient(s.x, s.y, s.x - s.vx * 0.18, s.y - s.vy * 0.18);
            g.addColorStop(0, rgba(colors.fx, 0.9 * Math.max(0, s.life)));
            g.addColorStop(1, rgba(colors.fx, 0));
            ctx.strokeStyle = g; ctx.lineWidth = 1.6; ctx.lineCap = "round";
            ctx.beginPath(); ctx.moveTo(s.x, s.y); ctx.lineTo(s.x - s.vx * 0.18, s.y - s.vy * 0.18); ctx.stroke();
            if (s.life <= 0) P.shoot = null;
          }
        }
      },
    },

    snow: {
      init(w, h) {
        const n = clamp(Math.round(w * h / 9000), 30, 260);
        return { list: Array.from({ length: n }, () => this.flake(w, h, true)) };
      },
      flake(w, h, anywhere) {
        return { x: rand(0, w), y: anywhere ? rand(0, h) : rand(-20, -5), r: rand(1, 3.4), vy: rand(18, 50), sway: rand(0.5, 1.6), ph: rand(0, TAU), a: rand(0.4, 0.95) };
      },
      frame(ctx, P, dt, t, w, h) {
        for (const p of P.list) {
          p.y += p.vy * dt * (p.r / 2.2);
          p.x += Math.sin(t * p.sway + p.ph) * 18 * dt;
          if (p.y > h + 5) Object.assign(p, this.flake(w, h, false));
          if (p.x > w + 5) p.x = -5; else if (p.x < -5) p.x = w + 5;
          ctx.fillStyle = rgba(colors.fx, p.a);
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, TAU); ctx.fill();
        }
      },
    },

    fireflies: {
      init(w, h) {
        const n = clamp(Math.round(w * h / 26000), 14, 70);
        return { list: Array.from({ length: n }, () => ({
          x: rand(0, w), y: rand(0, h), vx: rand(-15, 15), vy: rand(-15, 15), s: rand(0.6, 1.3), ph: rand(0, TAU), sp: rand(0.6, 1.4),
        })) };
      },
      frame(ctx, P, dt, t, w, h) {
        for (const p of P.list) {
          p.vx += rand(-40, 40) * dt; p.vy += rand(-40, 40) * dt;
          const m = Math.hypot(p.vx, p.vy);
          if (m > 24) { p.vx *= 24 / m; p.vy *= 24 / m; }
          p.x += p.vx * dt; p.y += p.vy * dt;
          if (p.x < -20) p.x = w + 20; else if (p.x > w + 20) p.x = -20;
          if (p.y < -20) p.y = h + 20; else if (p.y > h + 20) p.y = -20;
          const a = 0.25 + 0.75 * (0.5 + 0.5 * Math.sin(t * p.sp * 1.8 + p.ph));
          const size = 34 * p.s;
          ctx.globalAlpha = a;
          ctx.drawImage(glowSprite, p.x - size / 2, p.y - size / 2, size, size);
          ctx.globalAlpha = 1;
          ctx.fillStyle = rgba([255, 255, 240], a * 0.9);
          ctx.beginPath(); ctx.arc(p.x, p.y, 1.3 * p.s, 0, TAU); ctx.fill();
        }
      },
    },

    rain: {
      init(w, h) {
        const n = clamp(Math.round(w * h / 6000), 40, 360);
        return { list: Array.from({ length: n }, () => this.drop(w, h, true)) };
      },
      drop(w, h, anywhere) {
        return { x: rand(-60, w), y: anywhere ? rand(0, h) : rand(-h * 0.3, -10), len: rand(10, 24), v: rand(520, 820), a: rand(0.15, 0.45) };
      },
      frame(ctx, P, dt, t, w, h) {
        ctx.lineWidth = 1; ctx.lineCap = "round";
        for (const p of P.list) {
          p.y += p.v * dt; p.x += p.v * 0.12 * dt;
          if (p.y > h + 30) Object.assign(p, this.drop(w, h, false));
          ctx.strokeStyle = rgba(colors.fx, p.a);
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p.x - p.len * 0.12, p.y - p.len); ctx.stroke();
        }
      },
    },

    network: {
      init(w, h) {
        const n = clamp(Math.round(w * h / 15000), 24, 110);
        return { list: Array.from({ length: n }, () => ({ x: rand(0, w), y: rand(0, h), vx: rand(-14, 14), vy: rand(-14, 14), r: rand(1, 2) })) };
      },
      frame(ctx, P, dt, t, w, h) {
        const L = P.list, D = 130;
        for (const p of L) {
          p.x += p.vx * dt; p.y += p.vy * dt;
          if (p.x < 0 || p.x > w) p.vx *= -1;
          if (p.y < 0 || p.y > h) p.vy *= -1;
        }
        ctx.lineWidth = 1;
        for (let i = 0; i < L.length; i++) {
          const a = L[i];
          for (let j = i + 1; j < L.length; j++) {
            const b = L[j], dx = a.x - b.x, dy = a.y - b.y, d2 = dx * dx + dy * dy;
            if (d2 < D * D) {
              ctx.strokeStyle = rgba(colors.accent, (1 - Math.sqrt(d2) / D) * 0.5);
              ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
            }
          }
          if (pointer.inside) {
            const dx = a.x - pointer.x, dy = a.y - pointer.y, d = Math.hypot(dx, dy);
            if (d < 170) {
              ctx.strokeStyle = rgba(colors.accent, (1 - d / 170) * 0.7);
              ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(pointer.x, pointer.y); ctx.stroke();
            }
          }
        }
        for (const p of L) {
          ctx.fillStyle = rgba(colors.fx, 0.8);
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, TAU); ctx.fill();
        }
      },
    },
  };

  const bg = { canvas: null, ctx: null, name: "none", effect: null, parts: null, w: 0, h: 0, raf: 0, last: 0 };

  function makeCanvas(cls) {
    const c = document.createElement("canvas");
    c.className = cls;
    c.setAttribute("aria-hidden", "true");
    return c;
  }
  function sizeCanvas(o) {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    o.w = innerWidth; o.h = innerHeight;
    o.canvas.width = Math.round(o.w * dpr);
    o.canvas.height = Math.round(o.h * dpr);
    o.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function drawStill() {
    if (!bg.effect) return;
    bg.ctx.clearRect(0, 0, bg.w, bg.h);
    bg.effect.frame(bg.ctx, bg.parts, 0, 1.3, bg.w, bg.h);
  }
  function bgLoop(now) {
    const t = now / 1000;
    const dt = bg.last ? Math.min(0.05, t - bg.last) : 0;
    bg.last = t;
    bg.ctx.clearRect(0, 0, bg.w, bg.h);
    bg.effect.frame(bg.ctx, bg.parts, dt, t, bg.w, bg.h);
    bg.raf = requestAnimationFrame(bgLoop);
  }

  let lastW = 0, lastH = 0;
  addEventListener("resize", () => {
    if (bg.canvas && bg.effect) {
      sizeCanvas(bg);
      // re-scatter only on real size changes (not the mobile address bar sliding)
      if (Math.abs(bg.w - lastW) > 40 || Math.abs(bg.h - lastH) > 160) {
        bg.parts = bg.effect.init(bg.w, bg.h);
        lastW = bg.w; lastH = bg.h;
      }
      if (!bg.raf) drawStill();
    }
    if (cur.canvas && !cur.canvas.hidden) sizeCanvas(cur);
  });

  function setParticles(name) {
    if (name === bg.name) return;
    bg.name = name;
    cancelAnimationFrame(bg.raf); bg.raf = 0; bg.last = 0;
    const eff = EFFECTS[name];
    if (!eff) {
      bg.effect = null;
      if (bg.canvas) bg.canvas.hidden = true;
      return;
    }
    if (!bg.canvas) {
      bg.canvas = makeCanvas("fx-bg");
      bg.ctx = bg.canvas.getContext("2d");
      document.body.prepend(bg.canvas);
    }
    bg.canvas.hidden = false;
    sizeCanvas(bg);
    lastW = bg.w; lastH = bg.h;
    bg.effect = eff;
    bg.parts = eff.init(bg.w, bg.h);
    refreshColors();
    if (reduced.matches) drawStill();
    else bg.raf = requestAnimationFrame(bgLoop);
  }

  /* =====================================================================
     CURSOR EFFECTS (drawn on a see-through layer above the page)
     ===================================================================== */
  const cur = { canvas: null, ctx: null, name: "none", on: false, sparks: [], trail: [], gx: -9999, gy: -9999, ga: 0, raf: 0, last: 0 };

  function setCursor(name, force) {
    const on = name !== "none" && finePointer.matches && !reduced.matches;
    if (!force && name === cur.name && on === cur.on) return;
    cur.name = name;
    cur.on = on;
    cur.sparks = []; cur.trail = []; cur.ga = 0;
    if (!cur.on) {
      cancelAnimationFrame(cur.raf); cur.raf = 0;
      if (cur.canvas) { cur.ctx.clearRect(0, 0, cur.w, cur.h); cur.canvas.hidden = true; }
      return;
    }
    if (!cur.canvas) {
      cur.canvas = makeCanvas("fx-cursor");
      cur.ctx = cur.canvas.getContext("2d");
      document.body.append(cur.canvas);
    }
    cur.canvas.hidden = false;
    sizeCanvas(cur);
    cur.gx = pointer.x; cur.gy = pointer.y;
    kickCursor();
  }

  function onCursorMove() {
    if (!cur.on) return;
    if (cur.name === "sparkles") {
      for (let i = 0; i < 2; i++) {
        cur.sparks.push({
          x: pointer.x + rand(-4, 4), y: pointer.y + rand(-4, 4),
          vx: rand(-60, 60), vy: rand(-80, 20), r: rand(2.5, 5.5), rot: rand(0, TAU), vr: rand(-4, 4),
          life: 1, decay: rand(1.1, 1.8), c: Math.random() < 0.5 ? "accent" : "fx",
        });
      }
      if (cur.sparks.length > 160) cur.sparks.splice(0, cur.sparks.length - 160);
    } else if (cur.name === "trail") {
      cur.trail.push({ x: pointer.x, y: pointer.y, t: performance.now() });
    }
    kickCursor();
  }

  function kickCursor() {
    if (cur.on && !cur.raf) { cur.last = 0; cur.raf = requestAnimationFrame(cursorLoop); }
  }

  function sparkle(ctx, x, y, r, rot) {
    ctx.save();
    ctx.translate(x, y); ctx.rotate(rot);
    ctx.beginPath();
    for (let i = 0; i < 8; i++) {
      const rr = i % 2 ? r * 0.36 : r, a = (i * Math.PI) / 4;
      ctx.lineTo(Math.cos(a) * rr, Math.sin(a) * rr);
    }
    ctx.closePath(); ctx.fill();
    ctx.restore();
  }

  function cursorLoop(now) {
    const t = now / 1000;
    const dt = cur.last ? Math.min(0.05, t - cur.last) : 0.016;
    cur.last = t;
    const ctx = cur.ctx;
    ctx.clearRect(0, 0, cur.w, cur.h);
    let busy = false;

    if (cur.name === "sparkles") {
      cur.sparks = cur.sparks.filter(s => (s.life -= dt * s.decay) > 0);
      for (const s of cur.sparks) {
        s.vy += 140 * dt; s.x += s.vx * dt; s.y += s.vy * dt; s.rot += s.vr * dt;
        ctx.fillStyle = rgba(s.c === "accent" ? colors.accent : colors.fx, Math.min(1, s.life * 1.2));
        sparkle(ctx, s.x, s.y, s.r * (0.5 + s.life * 0.5), s.rot);
      }
      busy = cur.sparks.length > 0;
    } else if (cur.name === "glow") {
      const k = 1 - Math.exp(-dt * 14);
      if (cur.gx < -9000) { cur.gx = pointer.x; cur.gy = pointer.y; }
      cur.gx += (pointer.x - cur.gx) * k;
      cur.gy += (pointer.y - cur.gy) * k;
      const target = pointer.inside ? 1 : 0;
      cur.ga += (target - cur.ga) * (1 - Math.exp(-dt * 8));
      if (cur.ga > 0.01) {
        const g = ctx.createRadialGradient(cur.gx, cur.gy, 0, cur.gx, cur.gy, 170);
        g.addColorStop(0, rgba(colors.accent, 0.28 * cur.ga));
        g.addColorStop(1, rgba(colors.accent, 0));
        ctx.fillStyle = g;
        ctx.fillRect(cur.gx - 170, cur.gy - 170, 340, 340);
      }
      busy = Math.abs(pointer.x - cur.gx) + Math.abs(pointer.y - cur.gy) > 0.5 || Math.abs(target - cur.ga) > 0.01;
    } else if (cur.name === "trail") {
      const life = 260, nowMs = performance.now();
      cur.trail = cur.trail.filter(p => nowMs - p.t < life);
      const T = cur.trail;
      ctx.lineCap = "round";
      for (let i = 1; i < T.length; i++) {
        const f = i / T.length;
        ctx.strokeStyle = rgba(colors.accent, f * 0.85);
        ctx.lineWidth = 1 + f * 7;
        ctx.beginPath(); ctx.moveTo(T[i - 1].x, T[i - 1].y); ctx.lineTo(T[i].x, T[i].y); ctx.stroke();
      }
      busy = T.length > 0;
    }
    cur.raf = busy ? requestAnimationFrame(cursorLoop) : 0;
  }

  /* =====================================================================
     CARD TILT
     ===================================================================== */
  const tilt = { el: null, on: false };
  function tiltMove(e) {
    const el = tilt.el, r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1200px) rotateX(${(-py * 6).toFixed(2)}deg) rotateY(${(px * 8).toFixed(2)}deg)`;
  }
  function tiltReset() { if (tilt.el) tilt.el.style.transform = ""; }
  function setTilt(el, want) {
    const on = !!want && finePointer.matches && !reduced.matches;
    if (tilt.el && (tilt.el !== el || !on)) {
      tilt.el.removeEventListener("pointermove", tiltMove);
      tilt.el.removeEventListener("pointerleave", tiltReset);
      tilt.el.classList.remove("tilt");
      tiltReset();
      tilt.el = null;
    }
    if (on && !tilt.el) {
      tilt.el = el;
      el.classList.add("tilt");
      el.addEventListener("pointermove", tiltMove);
      el.addEventListener("pointerleave", tiltReset);
    }
    tilt.on = on;
  }

  /* re-apply everything if the visitor changes their motion setting */
  const settingsMemo = { particles: "none", cursor: "none", tiltEl: null, tilt: false };
  reduced.addEventListener("change", () => {
    const p = bg.name; bg.name = ""; setParticles(p);
    setCursor(cur.name, true);
    setTilt(settingsMemo.tiltEl, settingsMemo.tilt);
  });

  window.SiteEffects = {
    setParticles,
    setCursor,
    setTilt(el, on) { settingsMemo.tiltEl = el; settingsMemo.tilt = on; setTilt(el, on); },
    refreshColors,
  };
})();
