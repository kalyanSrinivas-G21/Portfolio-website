import { useEffect, useRef } from 'react';

/**
 * Single small, detailed ASCII fish swimming on a fine character grid.
 *
 * Smoothness notes:
 *  - time-based (dt) updates, so it looks identical at 60 / 120 / 144 Hz
 *  - heading is steered by a spring-damped turn rate with a hard cap,
 *    never snapped to a new angle
 *  - wandering comes from slow overlapping sine curves (no random re-targeting)
 *  - walls and cursor are soft, continuous forces blended into the heading
 *  - body is a fixed-length chain; the tail wave is applied only when drawing
 */

const CELL_W = 6;
const CELL_H = 8;
const RAMP = ['.', ':', 't', '%', 'S', 'X', '8', '@'];
const AMBIENT = ['-', '-', '-', "'", ',', '.', '`'];
const ACCENTS = ['#2dd4bf', '#a78bfa', '#f87171', '#fbbf24', '#60a5fa', '#34d399'];

// Body half-widths from snout to caudal peduncle (px), interpolated along the spine
const PROFILE = [3.0, 5.6, 7.4, 8.6, 9.0, 8.8, 8.2, 7.3, 6.3, 5.3, 4.4, 3.6, 3.0, 2.6, 2.3, 2.2, 2.2, 2.4];
const SEG_COUNT = 24;
const SEG_DIST = 3.7;

const hash = (a, b, c = 0) => {
  const s = Math.sin(a * 127.1 + b * 311.7 + c * 74.7) * 43758.5453;
  return s - Math.floor(s);
};
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const smooth = (t) => t * t * (3 - 2 * t);
const profileAt = (u) => {
  const f = clamp(u, 0, 1) * (PROFILE.length - 1);
  const i = Math.floor(f);
  const j = Math.min(PROFILE.length - 1, i + 1);
  return PROFILE[i] + (PROFILE[j] - PROFILE[i]) * (f - i);
};

export default function PixelFishCanvas({
  className = '',
  interactive = true,
  height = 280,
  isFooter = false,
  theme = 'dark'
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const checkIsLight = () => theme === 'light' || document.documentElement.getAttribute('data-theme') === 'light';

    let width = 0;
    let ch = 0;
    let cols = 0;
    let rows = 0;
    let dens = new Float32Array(0);
    let gridLayer = null;
    let ambient = [];
    let animId;

    // Keep the fish in the upper water so it never crosses the bio text below
    const bounds = () => ({
      minY: 28,
      maxY: isFooter ? ch - 28 : Math.max(110, Math.min(ch * 0.74, 200)),
      minX: 40,
      maxX: width - 40,
    });

    // ---------------------------------------------------------
    // The fish
    // ---------------------------------------------------------
    const fish = {
      x: 0, y: 0,
      angle: 0,
      angVel: 0,
      speed: 0.5,
      baseSpeed: 0.55,
      tailPhase: 0,
      finPhase: 0,
      segs: [],
    };

    const initFish = () => {
      const b = bounds();
      fish.x = width * 0.5;
      fish.y = (b.minY + b.maxY) / 2;
      fish.angle = -0.15;
      fish.segs = Array.from({ length: SEG_COUNT }, (_, i) => ({
        x: fish.x - Math.cos(fish.angle) * i * SEG_DIST,
        y: fish.y - Math.sin(fish.angle) * i * SEG_DIST,
      }));
    };

    const bubbles = [];
    const ripples = [];

    // ---------------------------------------------------------
    // Layout
    // ---------------------------------------------------------
    const layout = () => {
      const parent = canvas.parentElement;
      width = parent?.clientWidth || window.innerWidth || 800;
      ch = parent?.clientHeight || height;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(ch * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${ch}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cols = Math.ceil(width / CELL_W);
      rows = Math.ceil(ch / CELL_H);
      dens = new Float32Array(cols * rows);

      gridLayer = document.createElement('canvas');
      gridLayer.width = Math.floor(width * dpr);
      gridLayer.height = Math.floor(ch * dpr);
      const g = gridLayer.getContext('2d');
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
      const isLight = checkIsLight();
      g.strokeStyle = isLight ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.03)';
      g.lineWidth = 1;
      g.beginPath();
      for (let c = 0; c <= cols; c++) {
        g.moveTo(c * CELL_W + 0.5, 0);
        g.lineTo(c * CELL_W + 0.5, ch);
      }
      for (let r = 0; r <= rows; r++) {
        g.moveTo(0, r * CELL_H + 0.5);
        g.lineTo(width, r * CELL_H + 0.5);
      }
      g.stroke();

      const ambientCount = Math.floor((cols * rows) / 130);
      ambient = Array.from({ length: ambientCount }, (_, i) => ({
        c: hash(i, 1) * cols,
        r: Math.floor(hash(i, 2) * rows),
        v: (0.003 + hash(i, 3) * 0.012) * (hash(i, 4) < 0.5 ? -1 : 1),
        ch: AMBIENT[Math.floor(hash(i, 5) * AMBIENT.length)],
        phase: hash(i, 6) * 6.28,
        a: 0.25 + hash(i, 8) * 0.5,
      }));

      ctx.font = `700 8px "JetBrains Mono", "Fira Code", ui-monospace, Menlo, Consolas, monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      if (fish.segs.length === 0) {
        initFish();
      } else {
        const b = bounds();
        fish.x = clamp(fish.x, b.minX, b.maxX);
        fish.y = clamp(fish.y, b.minY, b.maxY);
      }
    };

    layout();
    window.addEventListener('resize', layout);

    // ---------------------------------------------------------
    // Mouse
    // ---------------------------------------------------------
    const mouse = { x: -2000, y: -2000, vx: 0, vy: 0, active: false };
    let lastMX = -2000;
    let lastMY = -2000;

    const onMouseMove = (e) => {
      if (!interactive) return;
      const rect = canvas.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      mouse.vx = cx - lastMX;
      mouse.vy = cy - lastMY;
      lastMX = mouse.x = cx;
      lastMY = mouse.y = cy;
      mouse.active = cx >= 0 && cx <= width && cy >= 0 && cy <= ch;
    };
    const onMouseLeave = () => {
      mouse.active = false;
      mouse.x = mouse.y = -2000;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseleave', onMouseLeave, { passive: true });

    // ---------------------------------------------------------
    // Raster helpers
    // ---------------------------------------------------------
    const stamp = (px, py, r, intensity) => {
      const c0 = Math.max(0, Math.floor((px - r) / CELL_W));
      const c1 = Math.min(cols - 1, Math.floor((px + r) / CELL_W));
      const r0 = Math.max(0, Math.floor((py - r) / CELL_H));
      const r1 = Math.min(rows - 1, Math.floor((py + r) / CELL_H));
      for (let rr = r0; rr <= r1; rr++) {
        const cy = rr * CELL_H + CELL_H / 2;
        for (let cc = c0; cc <= c1; cc++) {
          const cx = cc * CELL_W + CELL_W / 2;
          const d = Math.hypot(cx - px, cy - py);
          if (d < r) {
            const v = (1 - Math.pow(d / r, 1.8)) * intensity;
            const idx = rr * cols + cc;
            if (v > dens[idx]) dens[idx] = v;
          }
        }
      }
    };

    // ---------------------------------------------------------
    // Motion
    // ---------------------------------------------------------
    const updateFish = (k, time) => {
      const b = bounds();

      // 1) Forward vector bent by slow, overlapping sine "wander" curves
      const wander =
        Math.sin(time * 0.37) * 0.55 +
        Math.sin(time * 0.21 + 1.7) * 0.45 +
        Math.sin(time * 0.83 + 4.0) * 0.1;
      let dx = Math.cos(fish.angle + wander * 0.7);
      let dy = Math.sin(fish.angle + wander * 0.7);

      // 2) Soft wall forces (continuous, eased) + weak pull toward the middle
      const margin = 110;
      const wl = smooth(clamp((b.minX + margin - fish.x) / margin, 0, 1));
      const wr = smooth(clamp((fish.x - (b.maxX - margin)) / margin, 0, 1));
      const wt = smooth(clamp((b.minY + 55 - fish.y) / 55, 0, 1));
      const wb = smooth(clamp((fish.y - (b.maxY - 55)) / 55, 0, 1));
      dx += (wl - wr) * 2.2;
      dy += (wt - wb) * 2.2;
      const wall = Math.max(wl, wr, wt, wb);
      if (wall > 0) {
        const cx = (b.minX + b.maxX) / 2 - fish.x;
        const cy = (b.minY + b.maxY) / 2 - fish.y;
        const cl = Math.hypot(cx, cy) || 1;
        dx += (cx / cl) * wall * 0.9;
        dy += (cy / cl) * wall * 0.9;
      }

      // 3) Gentle cursor avoidance, fades in and out smoothly
      let boost = 0;
      if (mouse.active) {
        const mx = fish.x - mouse.x;
        const my = fish.y - mouse.y;
        const md = Math.hypot(mx, my);
        const R = 150;
        if (md < R && md > 1) {
          const f = smooth(1 - md / R);
          dx += (mx / md) * f * 2.4;
          dy += (my / md) * f * 2.4;
          boost = f;
        }
      }

      // 4) Turn toward the desired heading with a capped, damped turn rate
      const desired = Math.atan2(dy, dx);
      let diff = desired - fish.angle;
      while (diff < -Math.PI) diff += Math.PI * 2;
      while (diff > Math.PI) diff -= Math.PI * 2;

      const targetAngVel = clamp(diff * 0.05, -0.028, 0.028);
      fish.angVel += (targetAngVel - fish.angVel) * Math.min(1, 0.06 * k);
      fish.angle += fish.angVel * k;

      // 5) Smooth speed changes (faster when startled, slower while turning hard)
      const turnDrag = 1 - Math.min(0.3, Math.abs(fish.angVel) * 8);
      const targetSpeed = (fish.baseSpeed + boost * 0.9) * turnDrag;
      fish.speed += (targetSpeed - fish.speed) * Math.min(1, 0.04 * k);

      fish.x += Math.cos(fish.angle) * fish.speed * k;
      fish.y += Math.sin(fish.angle) * fish.speed * k;
      fish.x = clamp(fish.x, 16, width - 16);
      fish.y = clamp(fish.y, b.minY - 10, b.maxY + 10);

      // Tail beat frequency follows speed smoothly
      const beat = reduceMotion ? 0.04 : 0.075 + fish.speed * 0.1;
      fish.tailPhase += beat * k;
      fish.finPhase += 0.05 * k;

      // Fixed-length follow-the-leader chain
      const head = fish.segs[0];
      head.x = fish.x;
      head.y = fish.y;
      for (let i = 1; i < SEG_COUNT; i++) {
        const p = fish.segs[i - 1];
        const c = fish.segs[i];
        const ex = p.x - c.x;
        const ey = p.y - c.y;
        const d = Math.hypot(ex, ey) || 1;
        c.x = p.x - (ex / d) * SEG_DIST;
        c.y = p.y - (ey / d) * SEG_DIST;
      }

      // Occasional bubble from the snout
      if (Math.random() < 0.012 * k) {
        bubbles.push({
          x: head.x + Math.cos(fish.angle) * 6,
          y: head.y + Math.sin(fish.angle) * 6,
          life: 1,
          drift: (Math.random() - 0.5) * 0.1,
        });
      }
    };

    // Spine with the swimming wave applied (used for drawing only)
    const wavySpine = () => {
      const pts = [];
      for (let i = 0; i < SEG_COUNT; i++) {
        const a = fish.segs[Math.max(0, i - 1)];
        const c = fish.segs[i];
        const n = fish.segs[Math.min(SEG_COUNT - 1, i + 1)];
        let tx = a.x - n.x;
        let ty = a.y - n.y;
        const tl = Math.hypot(tx, ty) || 1;
        tx /= tl;
        ty /= tl;
        const u = i / (SEG_COUNT - 1);
        const amp = (0.25 + Math.pow(u, 1.6) * 3.2) * (0.6 + fish.speed * 0.5);
        const sway = Math.sin(fish.tailPhase - u * 4.2) * amp;
        pts.push({ x: c.x - ty * sway, y: c.y + tx * sway, tx, ty });
      }
      return pts;
    };

    const rasterFish = (spine, eyes) => {
      // Body
      for (let i = 0; i < SEG_COUNT - 1; i++) {
        const a = spine[i];
        const b = spine[i + 1];
        const u0 = i / (SEG_COUNT - 1);
        const u1 = (i + 1) / (SEG_COUNT - 1);
        for (let s = 0; s < 3; s++) {
          const t = s / 3;
          const px = a.x + (b.x - a.x) * t;
          const py = a.y + (b.y - a.y) * t;
          const r = profileAt(u0 + (u1 - u0) * t);
          stamp(px, py, r, 0.92);
          // brighter dorsal ridge
          stamp(px, py, Math.max(2, r * 0.38), 1.1);
        }
      }

      // Pectoral fins (behind the gills), smooth flutter
      const root = spine[5];
      const flutter = Math.sin(fish.finPhase) * 0.12;
      [-1, 1].forEach((side) => {
        const base = Math.atan2(root.ty, root.tx);
        // fins sweep backwards and outwards
        const ang = base + Math.PI + side * (0.95 + flutter * side);
        const ox = root.x - root.ty * side * -6;
        const oy = root.y + root.tx * side * -6;
        for (let d = 0; d < 16; d += 2.2) {
          const taper = 1 - d / 18;
          const curve = Math.sin(fish.finPhase - d * 0.15) * 0.08 * side;
          stamp(
            ox + Math.cos(ang + curve) * d,
            oy + Math.sin(ang + curve) * d,
            2.9 * taper + 0.9,
            0.62 * taper + 0.18
          );
        }
      });

      // Pelvic fins
      const pr = spine[11];
      [-1, 1].forEach((side) => {
        const base = Math.atan2(pr.ty, pr.tx);
        const ang = base + Math.PI + side * 1.0;
        for (let d = 0; d < 8; d += 2) {
          stamp(
            pr.x + Math.cos(ang) * d - pr.ty * side * -4,
            pr.y + Math.sin(ang) * d + pr.tx * side * -4,
            1.8 - d * 0.1,
            0.5
          );
        }
      });

      // Caudal fin: fan of rays with a little extra lag for a soft, flowing tail
      const tail = spine[SEG_COUNT - 1];
      const tailAng = Math.atan2(-tail.ty, -tail.tx);
      for (let ray = -4; ray <= 4; ray++) {
        const spread = ray * 0.115;
        const lag = Math.sin(fish.tailPhase - 4.2 - Math.abs(ray) * 0.12) * 0.1;
        const len = 15 - Math.abs(ray) * 0.9;
        for (let d = 2; d < len; d += 2.2) {
          const bend = lag * (d / len);
          const ax = tail.x + Math.cos(tailAng + spread + bend) * d;
          const ay = tail.y + Math.sin(tailAng + spread + bend) * d;
          stamp(ax, ay, 1.7, 0.7 - (d / len) * 0.4);
        }
      }

      // Eyes (sit at the head, either side of the snout)
      const h = spine[1];
      const hr = profileAt(1 / (SEG_COUNT - 1)) * 0.7 + 1.5;
      eyes.push({ x: h.x - h.ty * hr, y: h.y + h.tx * hr });
      eyes.push({ x: h.x + h.ty * hr, y: h.y - h.tx * hr });
    };

    // ---------------------------------------------------------
    // Render loop
    // ---------------------------------------------------------
    let lastNow = 0;
    let time = 0;

    const render = (now) => {
      animId = requestAnimationFrame(render);
      const dtMs = lastNow ? Math.min(50, now - lastNow) : 16.67;
      lastNow = now;
      const k = dtMs / 16.67; // 1.0 at 60fps
      time += dtMs / 1000;
      const flick = Math.floor(time * 1.2);

      ctx.clearRect(0, 0, width, ch);
      if (gridLayer) ctx.drawImage(gridLayer, 0, 0, width, ch);

      if (mouse.active && Math.hypot(mouse.vx, mouse.vy) > 1.5 && Math.random() < 0.18 * k) {
        ripples.push({ x: mouse.x, y: mouse.y, r: 4, a: 0.9 });
      }

      // Ambient dashes
      const isLight = checkIsLight();
      for (let i = 0; i < ambient.length; i++) {
        const p = ambient[i];
        p.c += p.v * k;
        if (p.c < 0) p.c += cols;
        if (p.c >= cols) p.c -= cols;
        const a = p.a * (0.5 + 0.5 * Math.sin(time * 0.8 + p.phase));
        if (a < 0.08) continue;
        ctx.fillStyle = isLight
          ? `rgba(0,0,0,${(a * 0.35).toFixed(3)})`
          : `rgba(255,255,255,${(a * 0.5).toFixed(3)})`;
        ctx.fillText(p.ch, Math.floor(p.c) * CELL_W + CELL_W / 2, p.r * CELL_H + CELL_H / 2);
      }

      // Fish -> density field
      dens.fill(0);
      updateFish(k, time);
      const spine = wavySpine();
      const eyes = [];
      rasterFish(spine, eyes);

      // Draw density as glyph cells
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          let d = dens[r * cols + c];
          if (d < 0.1) continue;

          // Fine scale texture + very slow glyph shimmer (no fast flicker)
          const scale = ((c + r) & 1) === 0 ? 1 : 0.9;
          d = Math.min(1, d * scale * (0.92 + hash(c, r, flick) * 0.16));
          if (d < 0.12) continue;

          const x = c * CELL_W;
          const y = r * CELL_H;
          const level = Math.min(RAMP.length - 1, Math.floor(d * RAMP.length));
          const glyph = RAMP[level];
          const pick = hash(c, r, 99);

          let bg;
          let fg;
          if (isLight) {
            if (d > 0.84 && pick < 0.2) {
              bg = `rgba(30,41,59,${(0.5 + d * 0.35).toFixed(2)})`;
              fg = '#f8fafc';
            } else if (pick > 0.972) {
              const col = ACCENTS[Math.floor(hash(c, r, 5) * ACCENTS.length)];
              bg = col + '33';
              fg = col;
            } else {
              const g = Math.floor(180 - d * 155);
              bg = `rgba(15,23,42,${(0.04 + d * 0.16).toFixed(3)})`;
              fg = `rgb(${g},${g},${g + 6})`;
            }
          } else {
            if (d > 0.84 && pick < 0.2) {
              bg = `rgba(205,220,255,${(0.5 + d * 0.35).toFixed(2)})`;
              fg = '#0b1020';
            } else if (pick > 0.972) {
              const col = ACCENTS[Math.floor(hash(c, r, 5) * ACCENTS.length)];
              bg = col + '55';
              fg = col;
            } else {
              const g = Math.floor(100 + d * 135);
              bg = `rgba(255,255,255,${(0.05 + d * 0.14).toFixed(3)})`;
              fg = `rgb(${g},${g},${Math.min(255, g + 8)})`;
            }
          }

          ctx.fillStyle = bg;
          ctx.fillRect(x + 0.5, y + 0.5, CELL_W - 1, CELL_H - 1);
          ctx.fillStyle = fg;
          ctx.fillText(glyph, x + CELL_W / 2, y + CELL_H / 2 + 0.5);
        }
      }

      // Eyes: bright cell with a dark pupil glyph
      eyes.forEach((e) => {
        const c = Math.floor(e.x / CELL_W);
        const r = Math.floor(e.y / CELL_H);
        if (isLight) {
          ctx.fillStyle = '#0f172a';
          ctx.fillRect(c * CELL_W + 0.5, r * CELL_H + 0.5, CELL_W - 1, CELL_H - 1);
          ctx.fillStyle = '#f8fafc';
          ctx.fillText('o', c * CELL_W + CELL_W / 2, r * CELL_H + CELL_H / 2 + 0.5);
        } else {
          ctx.fillStyle = '#f4f7ff';
          ctx.fillRect(c * CELL_W + 0.5, r * CELL_H + 0.5, CELL_W - 1, CELL_H - 1);
          ctx.fillStyle = '#05070d';
          ctx.fillText('o', c * CELL_W + CELL_W / 2, r * CELL_H + CELL_H / 2 + 0.5);
        }
      });

      // Bubbles
      for (let i = bubbles.length - 1; i >= 0; i--) {
        const bb = bubbles[i];
        bb.life -= 0.006 * k;
        bb.y -= 0.1 * k;
        bb.x += bb.drift * k;
        if (bb.life <= 0) {
          bubbles.splice(i, 1);
          continue;
        }
        ctx.fillStyle = isLight
          ? `rgba(71,85,105,${(bb.life * 0.6).toFixed(2)})`
          : `rgba(220,225,240,${(bb.life * 0.7).toFixed(2)})`;
        ctx.fillText(
          bb.life > 0.5 ? 'o' : '.',
          Math.floor(bb.x / CELL_W) * CELL_W + CELL_W / 2,
          Math.floor(bb.y / CELL_H) * CELL_H + CELL_H / 2
        );
      }

      // Cursor ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rp = ripples[i];
        rp.r += 0.7 * k;
        rp.a -= 0.01 * k;
        if (rp.a <= 0) {
          ripples.splice(i, 1);
          continue;
        }
        const points = Math.max(8, Math.floor((Math.PI * 2 * rp.r) / CELL_W));
        ctx.fillStyle = isLight
          ? `rgba(0,0,0,${(rp.a * 0.35).toFixed(2)})`
          : `rgba(255,255,255,${(rp.a * 0.55).toFixed(2)})`;
        for (let p = 0; p < points; p++) {
          const ang = (p / points) * Math.PI * 2;
          const px = rp.x + Math.cos(ang) * rp.r;
          const py = rp.y + Math.sin(ang) * rp.r * 0.8;
          ctx.fillText(
            Math.abs(Math.cos(ang)) > 0.7 ? '(' : Math.abs(Math.sin(ang)) > 0.7 ? '-' : 'o',
            Math.floor(px / CELL_W) * CELL_W + CELL_W / 2,
            Math.floor(py / CELL_H) * CELL_H + CELL_H / 2
          );
        }
      }
    };

    animId = requestAnimationFrame(render);

    const onThemeChange = () => {
      layout();
    };
    window.addEventListener('theme-change', onThemeChange);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', layout);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('theme-change', onThemeChange);
    };
  }, [interactive, height, isFooter, theme]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full block select-none pointer-events-none ${className}`}
    />
  );
}
