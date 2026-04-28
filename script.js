// ========================================
// Custom Cursor
// ========================================
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursor-ring');
const hasFinePointer = window.matchMedia('(pointer: fine)').matches;

// ========================================
// Mobile Navigation
// ========================================
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
  const closeMenu = () => {
    navToggle.classList.remove('is-open');
    navLinks.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open navigation');
  };

  navToggle.addEventListener('click', () => {
    const isOpen = navToggle.classList.toggle('is-open');
    navLinks.classList.toggle('is-open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) closeMenu();
  }, { passive: true });
}

if (hasFinePointer && cursor && ring) {
  const CURSOR_HALF = 6;   // 12px / 2
  const RING_HALF   = 18;  // 36px / 2

  let mx = 0, my = 0;
  let rx = 0, ry = 0;
  let cursorScale = 1;
  let ringScale   = 1;

  // transform3d → GPU compositor only, zero layout/paint cost.
  // passive:true → browser doesn't block scroll waiting for this handler.
  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.transform =
      `translate3d(${mx - CURSOR_HALF}px,${my - CURSOR_HALF}px,0) scale(${cursorScale})`;
  }, { passive: true });

  // Single rAF loop — only the lagging ring needs per-frame updates
  (function animRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.transform =
      `translate3d(${rx - RING_HALF}px,${ry - RING_HALF}px,0) scale(${ringScale})`;
    requestAnimationFrame(animRing);
  })();

  // Hover scale effects
  document.querySelectorAll('a, button, .hero-profile, .project-card, .system-card, .skill-group, .edu-card, .cert-badge, .btn-cv')
    .forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorScale = 2; ringScale = 1.5; ring.style.opacity = '1';
        cursor.style.transform =
          `translate3d(${mx - CURSOR_HALF}px,${my - CURSOR_HALF}px,0) scale(${cursorScale})`;
      });
      el.addEventListener('mouseleave', () => {
        cursorScale = 1; ringScale = 1; ring.style.opacity = '0.5';
        cursor.style.transform =
          `translate3d(${mx - CURSOR_HALF}px,${my - CURSOR_HALF}px,0) scale(${cursorScale})`;
      });
    });

} else {
  cursor?.remove();
  ring?.remove();
}

// ========================================
// Intersection Observer — scroll reveals
// ========================================
// KEY FIX: will-change is applied HERE, right before the animation fires,
// then removed after the transition ends. Putting will-change on the CSS
// class itself means the browser allocates GPU layers for every single
// reveal element at page load — 15+ layers all at once, which causes the
// exact scroll lag you're seeing.

const TRANSITION_DURATION = 750; // ms — match your longest CSS transition

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const el = entry.target;

    // Step 1: hint the browser ONE element at a time, right before it animates
    el.style.willChange = 'opacity, transform';

    // Step 2: trigger the animation on the next frame so the browser
    // actually has time to act on the will-change hint
    requestAnimationFrame(() => {
      el.classList.add('visible');

      // Animate skill bars with stagger
      el.querySelectorAll('.skill-bar[data-w]').forEach((bar, i) => {
        setTimeout(() => {
          bar.style.transform = `scaleX(${bar.dataset.w})`;
          bar.classList.add('animated');
        }, i * 100 + 200);
      });

      // Step 3: clean up will-change after transition finishes —
      // holding it forever wastes GPU memory
      setTimeout(() => {
        el.style.willChange = 'auto';
      }, TRANSITION_DURATION + 50);
    });

    // Stop observing — elements don't un-reveal
    observer.unobserve(el);
  });
}, { threshold: 0.12 });

// Single querySelectorAll — one observer handles everything
document.querySelectorAll('.reveal, .timeline-item, .skill-group')
  .forEach(el => observer.observe(el));