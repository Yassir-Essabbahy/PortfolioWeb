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

// ========================================
// Project Media Carousels
// ========================================
// Each [data-carousel] supports any number of slides (images and/or muted
// looping videos). Controls (arrows + dots) are generated only when there is
// more than one slide, so single-image carousels look identical to before.
// Videos autoplay only while their carousel is on screen and active.

document.querySelectorAll('[data-carousel]').forEach(initCarousel);

function initCarousel(root) {
  const slides = Array.from(root.querySelectorAll('.carousel-slide'));
  if (slides.length <= 1) return;

  let index = 0;
  let inView = false;

  const dotsWrap = document.createElement('div');
  dotsWrap.className = 'carousel-dots';
  const dots = slides.map((_, n) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'carousel-dot' + (n === 0 ? ' is-active' : '');
    dot.setAttribute('aria-label', `Show media ${n + 1} of ${slides.length}`);
    dot.addEventListener('click', () => goTo(n));
    dotsWrap.appendChild(dot);
    return dot;
  });

  const prevBtn = document.createElement('button');
  prevBtn.type = 'button';
  prevBtn.className = 'carousel-btn prev';
  prevBtn.setAttribute('aria-label', 'Previous media');
  prevBtn.textContent = '‹';
  prevBtn.addEventListener('click', () => goTo((index - 1 + slides.length) % slides.length));

  const nextBtn = document.createElement('button');
  nextBtn.type = 'button';
  nextBtn.className = 'carousel-btn next';
  nextBtn.setAttribute('aria-label', 'Next media');
  nextBtn.textContent = '›';
  nextBtn.addEventListener('click', () => goTo((index + 1) % slides.length));

  root.append(prevBtn, nextBtn, dotsWrap);

  function goTo(n) {
    index = n;
    slides.forEach((slide, i) => slide.classList.toggle('is-active', i === index));
    dots.forEach((dot, i) => dot.classList.toggle('is-active', i === index));
    syncVideos();
  }

  function syncVideos() {
    slides.forEach((slide, i) => {
      const video = slide.querySelector('video');
      if (!video) return;
      if (i === index && inView) {
        video.play().catch(() => {}); // autoplay can still be blocked; muted makes this rare
      } else {
        video.pause();
      }
    });
  }

  // Play/pause videos based on whether the card is on screen at all
  new IntersectionObserver(entries => {
    inView = entries[0].isIntersecting;
    syncVideos();
  }, { threshold: 0.25 }).observe(root);
}