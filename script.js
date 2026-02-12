/* ═══════════════════════════════════════════════════════
   Keenan McConkey — Portfolio JS
   Scroll reveals, cursor, nav, hero grid
   ═══════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── Page Loader ──────────────────────────────────────── */
  window.addEventListener('load', () => {
    setTimeout(() => {
      document.getElementById('loader').classList.add('done');
    }, 500);
  });

  /* ── Nav: scroll state ────────────────────────────────── */
  const nav = document.getElementById('nav');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 30);
    lastScroll = window.scrollY;
  }, { passive: true });

  /* ── Nav: mobile toggle ───────────────────────────────── */
  const toggle = document.getElementById('navToggle');
  const links  = document.getElementById('navLinks');

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    links.classList.toggle('open');
  });

  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      toggle.classList.remove('open');
      links.classList.remove('open');
    });
  });

  /* ── Smooth scroll (anchor links) ─────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ── Scroll Reveal (Intersection Observer) ────────────── */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  /* ── Custom Cursor (desktop only) ─────────────────────── */
  const cursor = document.getElementById('cursor');
  let cx = -100, cy = -100, tx = -100, ty = -100;

  if (window.matchMedia('(hover: hover)').matches) {
    document.addEventListener('mousemove', e => {
      tx = e.clientX - 4;
      ty = e.clientY - 4;
    });

    (function loop() {
      cx += (tx - cx) * 0.12;
      cy += (ty - cy) * 0.12;
      cursor.style.transform = 'translate(' + cx + 'px,' + cy + 'px)';
      requestAnimationFrame(loop);
    })();
  }

  /* ── Hero Grid — generate cells with staggered animation ─ */
  const grid = document.getElementById('heroGrid');
  if (grid) {
    const total = 100;               // 10 x 10
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < total; i++) {
      const span = document.createElement('span');
      // Stagger each cell with a unique animation
      const delay = (Math.random() * 4).toFixed(2);
      const dur   = (3 + Math.random() * 4).toFixed(2);
      span.style.animation = 'gridPulse ' + dur + 's ease-in-out ' + delay + 's infinite';
      fragment.appendChild(span);
    }

    grid.appendChild(fragment);
  }

  /* ── Inject grid pulse keyframes ──────────────────────── */
  const style = document.createElement('style');
  style.textContent = '@keyframes gridPulse { 0%, 100% { opacity: 0.15; } 50% { opacity: 1; } }';
  document.head.appendChild(style);

})();
