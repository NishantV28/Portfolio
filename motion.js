'use strict';

(() => {
  const root = document.documentElement;
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  const listeners = new Set();
  let paused = preference.matches;
  const motion = window.portfolioMotion = {
    get paused() { return paused; },
    setPaused(value) {
      paused = Boolean(value);
      root.classList.toggle('motion-paused', paused);
      document.querySelectorAll('[data-motion-toggle]').forEach(button => {
        button.setAttribute('aria-pressed', String(paused));
        button.title = paused ? 'Play all animation' : 'Pause all animation';
        button.querySelector('.motion-label').textContent = paused ? 'Play motion' : 'Pause motion';
        button.querySelector('.pause-icon').textContent = paused ? '▷' : 'Ⅱ';
      });
      listeners.forEach(listener => listener(paused));
    },
    subscribe(listener) { listeners.add(listener); listener(paused); return () => listeners.delete(listener); }
  };
  document.querySelectorAll('[data-motion-toggle]').forEach(button => {
    button.addEventListener('click', () => motion.setPaused(!paused));
  });
  preference.addEventListener('change', event => motion.setPaused(event.matches));
  motion.setPaused(paused);

  const canvas = document.querySelector('#ambient-canvas');
  let context;
  try { context = canvas.getContext('2d', {alpha: true}); } catch { context = null; }
  let width = innerWidth, height = innerHeight, frame = 0, lastPaint = 0, clock = 0;
  let pointerX = 0, pointerY = 0, smoothX = 0, smoothY = 0, fieldScroll = scrollY;
  let visible = !document.hidden;

  function resizeCanvas() {
    width = innerWidth; height = innerHeight;
    if (!context) return;
    const ratio = Math.min(devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    drawContours();
  }

  // Two slowly turning contour studies keep detail toward the page edges.
  function contour(cx, cy, radius, phase, count, opacity) {
    const segments = width < 600 ? 64 : 94;
    for (let ring = 0; ring < count; ring++) {
      const size = radius * (.45 + ring * .047);
      context.beginPath();
      for (let step = 0; step <= segments; step++) {
        const angle = step / segments * Math.PI * 2;
        const wave = Math.sin(angle * 3 + phase + ring * .12) * size * .075;
        const wave2 = Math.cos(angle * 2 - phase * .65) * size * .045;
        const x = cx + Math.cos(angle) * (size + wave) + Math.sin(angle) * size * .22;
        const y = cy + Math.sin(angle) * (size * .8 + wave2);
        if (step === 0) context.moveTo(x, y); else context.lineTo(x, y);
      }
      context.closePath();
      context.strokeStyle = `rgba(181,93,49,${opacity})`;
      context.lineWidth = ring % 5 === 0 ? 1.05 : .65;
      context.stroke();
    }
  }

  function drawContours() {
    if (!context || !width || !height) return;
    context.clearRect(0, 0, width, height);
    const compact = width < 760;
    const phase = clock * .00016 + fieldScroll * .00018;
    contour(width * 1.05 + smoothX, height * .43 + smoothY, Math.min(width * .46, 580), phase, compact ? 12 : 21, compact ? .105 : .14);
    contour(-width * .16 - smoothX, height * .86 - smoothY, Math.min(width * .42, 520), -phase + 1.3, compact ? 10 : 16, .09);
    // Moving registration marks echo the diagrams in the project cards.
    const x = width * .945 + Math.sin(phase) * 14;
    const y = height * .78 + Math.cos(phase) * 20;
    context.strokeStyle = 'rgba(185,78,40,.28)';
    context.lineWidth = 1;
    context.beginPath();
    context.moveTo(x - 6, y); context.lineTo(x + 6, y);
    context.moveTo(x, y - 6); context.lineTo(x, y + 6);
    context.stroke();
  }

  function animate(time) {
    frame = 0;
    if (paused || !visible || document.body.classList.contains('modal-open')) return;
    if (!lastPaint || time - lastPaint >= 32) {
      const elapsed = lastPaint ? Math.min(time - lastPaint, 80) : 32;
      clock += elapsed;
      fieldScroll = scrollY;
      smoothX += (pointerX - smoothX) * .035;
      smoothY += (pointerY - smoothY) * .035;
      drawContours();
      lastPaint = time;
    }
    frame = requestAnimationFrame(animate);
  }
  function start() {
    if (!frame && context && !paused && visible && !document.body.classList.contains('modal-open')) {
      lastPaint = 0;
      frame = requestAnimationFrame(animate);
    }
  }
  function stop() { if (frame) cancelAnimationFrame(frame); frame = 0; }
  document.addEventListener('pointermove', event => {
    if (paused || event.pointerType !== 'mouse') return;
    pointerX = (event.clientX / width - .5) * 30;
    pointerY = (event.clientY / height - .5) * 24;
  }, {passive:true});
  document.addEventListener('visibilitychange', () => {
    visible = !document.hidden;
    if (visible) start(); else stop();
  });
  new MutationObserver(() => {
    if (document.body.classList.contains('modal-open')) stop(); else start();
  }).observe(document.body, {attributes:true, attributeFilter:['class']});

  const progress = document.querySelector('#scroll-progress');
  const hero = document.querySelector('.hero');
  const heroArt = document.querySelector('.hero-art');
  const orbits = [...document.querySelectorAll('.section-orbit')];
  let visuals = [];
  let scrollFrame = 0;
  const clamp = (value, low, high) => Math.min(high, Math.max(low, value));
  function updateScroll() {
    scrollFrame = 0;
    const total = root.scrollHeight - innerHeight;
    progress.style.transform = `scaleX(${total > 0 ? clamp(scrollY / total, 0, 1) : 0})`;
    const canMove = !paused && !preference.matches;
    const heroRect = hero.getBoundingClientRect();
    const heroProgress = clamp(-heroRect.top / Math.max(heroRect.height, 1), 0, 1);
    heroArt.style.setProperty('--hero-shift', `${canMove ? heroProgress * 35 : 0}px`);
    heroArt.style.setProperty('--hero-turn', `${canMove ? heroProgress * -2.4 : 0}deg`);
    for (const orbit of orbits) {
      const rect = orbit.parentElement.getBoundingClientRect();
      const position = clamp((innerHeight * .5 - rect.top) / (innerHeight + rect.height), -.5, .8);
      orbit.style.setProperty('--orbit-y', `${canMove ? position * -65 : 0}px`);
      orbit.style.setProperty('--orbit-turn', `${canMove ? position * 28 : 0}deg`);
    }
    for (const visual of visuals) {
      const rect = visual.getBoundingClientRect();
      if (rect.bottom < -100 || rect.top > innerHeight + 100) continue;
      const position = clamp((innerHeight * .5 - rect.top - rect.height * .5) / innerHeight, -.6, .6);
      visual.style.setProperty('--art-shift', `${canMove ? position * 48 : 0}px`);
    }
    if (paused) drawContours();
  }
  function scheduleScroll() { if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScroll); }
  window.addEventListener('scroll', scheduleScroll, {passive:true});
  window.addEventListener('resize', () => { resizeCanvas(); scheduleScroll(); }, {passive:true});
  if ('ResizeObserver' in window) new ResizeObserver(scheduleScroll).observe(document.querySelector('main'));

  function connectProjects() {
    visuals = [...document.querySelectorAll('.project-visual')];
    for (const visual of visuals) {
      visual.addEventListener('pointermove', event => {
        if (paused || preference.matches || event.pointerType !== 'mouse') return;
        const rect = visual.getBoundingClientRect();
        visual.style.setProperty('--tilt-x', `${(event.clientY - rect.top) / rect.height * -6 + 3}deg`);
        visual.style.setProperty('--tilt-y', `${(event.clientX - rect.left) / rect.width * 7 - 3.5}deg`);
      }, {passive:true});
      visual.addEventListener('pointerleave', () => {
        visual.style.setProperty('--tilt-x', '0deg');
        visual.style.setProperty('--tilt-y', '0deg');
      });
    }
    scheduleScroll();
  }
  document.addEventListener('portfolio:projects', connectProjects);
  connectProjects();
  resizeCanvas();
  motion.subscribe(isPaused => {
    if (isPaused) {
      stop();
      visuals.forEach(visual => {
        visual.style.setProperty('--tilt-x', '0deg');
        visual.style.setProperty('--tilt-y', '0deg');
        visual.style.setProperty('--art-shift', '0px');
      });
    } else start();
    scheduleScroll();
  });
})();
