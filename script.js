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

  // Hover scale effects with delegation so dynamic carousel & lightbox buttons scale cursor
  document.addEventListener('mouseover', e => {
    if (e.target.closest('a, button, .hero-profile, .project-card, .system-card, .skill-group, .edu-card, .cert-badge, .btn-cv, .carousel-slide, .art3d-card, .art3d-subcard')) {
      cursorScale = 2; ringScale = 1.5; ring.style.opacity = '1';
      cursor.style.transform =
        `translate3d(${mx - CURSOR_HALF}px,${my - CURSOR_HALF}px,0) scale(${cursorScale})`;
    }
  });

  document.addEventListener('mouseout', e => {
    if (e.target.closest('a, button, .hero-profile, .project-card, .system-card, .skill-group, .edu-card, .cert-badge, .btn-cv, .carousel-slide, .art3d-card, .art3d-subcard')) {
      cursorScale = 1; ringScale = 1; ring.style.opacity = '0.5';
      cursor.style.transform =
        `translate3d(${mx - CURSOR_HALF}px,${my - CURSOR_HALF}px,0) scale(${cursorScale})`;
    }
  });

} else {
  cursor?.remove();
  ring?.remove();
}

// ========================================
// Intersection Observer — scroll reveals
// ========================================
const TRANSITION_DURATION = 750; // ms — match longest CSS transition

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const el = entry.target;
    el.style.willChange = 'opacity, transform';

    requestAnimationFrame(() => {
      el.classList.add('visible');

      // Animate skill bars with stagger
      el.querySelectorAll('.skill-bar[data-w]').forEach((bar, i) => {
        setTimeout(() => {
          bar.style.transform = `scaleX(${bar.dataset.w})`;
          bar.classList.add('animated');
        }, i * 100 + 200);
      });

      setTimeout(() => {
        el.style.willChange = 'auto';
      }, TRANSITION_DURATION + 50);
    });

    observer.unobserve(el);
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal, .timeline-item, .skill-group, .art3d-card, .art3d-subcard')
  .forEach(el => observer.observe(el));

// ========================================
// Project Media Carousels (Auto Slideshow & Gallery)
// ========================================
document.querySelectorAll('[data-carousel]').forEach(initCarousel);

function initCarousel(root) {
  const slides = Array.from(root.querySelectorAll('.carousel-slide'));
  const title = root.dataset.title || root.closest('.project-card')?.querySelector('.project-name')?.textContent || 'Game';

  // Allow clicking slides to open fullscreen lightbox (ignore clicks directly on video or buttons)
  slides.forEach((slide, idx) => {
    slide.addEventListener('click', (e) => {
      if (e.target.tagName === 'VIDEO' || e.target.closest('video') || e.target.closest('button')) {
        return;
      }
      openLightbox(slides, idx, title);
    });

    const v = slide.querySelector('video');
    if (v) {
      v.addEventListener('play', stopAutoplay);
      v.addEventListener('pause', () => {
        if (inView) startAutoplay();
      });
      v.addEventListener('ended', () => {
        goTo((index + 1) % slides.length);
        if (inView) startAutoplay();
      });
    }
  });

  if (slides.length <= 1) return;

  let index = 0;
  let inView = false;
  let autoplayTimer = null;
  const AUTOPLAY_DELAY = 3800; // 3.8s per slide

  // Slide Counter Badge (e.g. 1 / 4)
  const counter = document.createElement('div');
  counter.className = 'carousel-counter';
  counter.setAttribute('aria-live', 'polite');
  counter.textContent = `${index + 1} / ${slides.length}`;
  root.appendChild(counter);

  // Expand / Fullscreen Button
  const expandBtn = document.createElement('button');
  expandBtn.type = 'button';
  expandBtn.className = 'carousel-expand-btn';
  expandBtn.setAttribute('aria-label', `Enlarge ${title} media`);
  expandBtn.setAttribute('title', 'View Fullscreen');
  expandBtn.innerHTML = `<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>`;
  expandBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    openLightbox(slides, index, title);
  });
  root.appendChild(expandBtn);

  // Pagination Dots
  const dotsWrap = document.createElement('div');
  dotsWrap.className = 'carousel-dots';
  const dots = slides.map((_, n) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'carousel-dot' + (n === 0 ? ' is-active' : '');
    dot.setAttribute('aria-label', `Show slide ${n + 1} of ${slides.length}`);
    dot.addEventListener('click', (e) => {
      e.stopPropagation();
      goTo(n);
    });
    dotsWrap.appendChild(dot);
    return dot;
  });

  // Prev / Next Arrow Buttons
  const prevBtn = document.createElement('button');
  prevBtn.type = 'button';
  prevBtn.className = 'carousel-btn prev';
  prevBtn.setAttribute('aria-label', 'Previous slide');
  prevBtn.textContent = '‹';
  prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    goTo((index - 1 + slides.length) % slides.length);
  });

  const nextBtn = document.createElement('button');
  nextBtn.type = 'button';
  nextBtn.className = 'carousel-btn next';
  nextBtn.setAttribute('aria-label', 'Next slide');
  nextBtn.textContent = '›';
  nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    goTo((index + 1) % slides.length);
  });

  root.append(prevBtn, nextBtn, dotsWrap);

  function goTo(n) {
    index = n;
    slides.forEach((slide, i) => slide.classList.toggle('is-active', i === index));
    dots.forEach((dot, i) => dot.classList.toggle('is-active', i === index));
    counter.textContent = `${index + 1} / ${slides.length}`;
    syncVideos();
  }

  function syncVideos() {
    slides.forEach((slide, i) => {
      const video = slide.querySelector('video');
      if (!video) return;
      if (i === index && inView) {
        if (video.hasAttribute('autoplay')) {
          video.play().catch(() => {});
        }
      } else {
        video.pause();
      }
    });
  }

  // Automatic Slideshow rotation
  function startAutoplay() {
    if (autoplayTimer || !inView) return;
    autoplayTimer = setInterval(() => {
      const currentSlide = slides[index];
      const video = currentSlide?.querySelector('video');
      // If a video is actively playing on the current slide, don't interrupt it
      if (video && !video.paused && !video.ended) {
        return;
      }
      goTo((index + 1) % slides.length);
    }, AUTOPLAY_DELAY);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  root.addEventListener('mouseenter', stopAutoplay);
  root.addEventListener('mouseleave', () => {
    if (inView) startAutoplay();
  });

  // Touch swipe support (mobile/tablet)
  let touchStartX = 0;
  let touchStartY = 0;
  root.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
  }, { passive: true });

  root.addEventListener('touchend', (e) => {
    const diffX = e.changedTouches[0].screenX - touchStartX;
    const diffY = e.changedTouches[0].screenY - touchStartY;
    if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX < 0) {
        goTo((index + 1) % slides.length);
      } else {
        goTo((index - 1 + slides.length) % slides.length);
      }
    }
  }, { passive: true });

  // Play/pause based on screen intersection
  new IntersectionObserver(entries => {
    inView = entries[0].isIntersecting;
    if (inView) {
      startAutoplay();
    } else {
      stopAutoplay();
    }
    syncVideos();
  }, { threshold: 0.25 }).observe(root);
}

// ========================================
// Fullscreen Media Lightbox Modal (Images & Videos)
// ========================================
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lightbox-img');
const lbVideo = document.getElementById('lightbox-video');
const lbTitle = document.getElementById('lightbox-title');
const lbCounter = document.getElementById('lightbox-counter');
const lbCaption = document.getElementById('lightbox-caption');
const lbClose = document.querySelector('.lightbox-close');
const lbPrev = document.querySelector('.lightbox-prev');
const lbNext = document.querySelector('.lightbox-next');

let lbSlides = [];
let lbIndex = 0;
let lbGameTitle = '';

function openLightbox(slides, initialIdx, gameTitle) {
  if (!lightbox || !slides.length) return;
  lbSlides = slides;
  lbIndex = initialIdx;
  lbGameTitle = gameTitle || 'Media';
  updateLightboxSlide();
  lightbox.classList.add('is-open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  if (!lightbox) return;
  if (lbVideo) {
    lbVideo.pause();
    lbVideo.removeAttribute('src');
    lbVideo.load();
    lbVideo.style.display = 'none';
  }
  lightbox.classList.remove('is-open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function updateLightboxSlide() {
  if (!lbSlides.length) return;
  const currentSlide = lbSlides[lbIndex];
  const img = currentSlide.querySelector('img');
  const video = currentSlide.querySelector('video');
  const caption = currentSlide.dataset.caption || (img ? img.alt : '') || (video ? video.getAttribute('aria-label') : '') || '';

  if (video) {
    if (lbImg) {
      lbImg.style.display = 'none';
      lbImg.src = '';
    }
    if (lbVideo) {
      lbVideo.style.display = 'block';
      lbVideo.src = video.currentSrc || video.src;
      lbVideo.currentTime = video.currentTime || 0;
      lbVideo.play().catch(() => {});
    }
  } else if (img) {
    if (lbVideo) {
      lbVideo.pause();
      lbVideo.style.display = 'none';
      lbVideo.removeAttribute('src');
    }
    if (lbImg) {
      lbImg.style.display = 'block';
      lbImg.src = img.src;
      lbImg.alt = img.alt || lbGameTitle;
    }
  }

  if (lbCaption) lbCaption.textContent = caption;
  if (lbTitle) lbTitle.textContent = lbGameTitle;
  if (lbCounter) lbCounter.textContent = `${lbIndex + 1} / ${lbSlides.length}`;
}

function lbGoPrev() {
  if (!lbSlides.length) return;
  lbIndex = (lbIndex - 1 + lbSlides.length) % lbSlides.length;
  updateLightboxSlide();
}

function lbGoNext() {
  if (!lbSlides.length) return;
  lbIndex = (lbIndex + 1) % lbSlides.length;
  updateLightboxSlide();
}

if (lightbox) {
  lbClose?.addEventListener('click', closeLightbox);
  lbPrev?.addEventListener('click', (e) => { e.stopPropagation(); lbGoPrev(); });
  lbNext?.addEventListener('click', (e) => { e.stopPropagation(); lbGoNext(); });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') lbGoPrev();
    if (e.key === 'ArrowRight') lbGoNext();
  });
}