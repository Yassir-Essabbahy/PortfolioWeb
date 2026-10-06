/**
 * ============================================================================
 * JAVASCRIPT CONTROLLER — Yassir ESSABAHY Portfolio
 * Inspired by Dylan Archer (dylan-archer-dev.com)
 * Yellow x Creamy White theme, category filters, Dylan-style cards, and modal
 * ============================================================================
 */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // STATE MANAGEMENT
  // --------------------------------------------------------------------------
  const state = {
    currentModalProject: null,
    currentSlideIndex: 0,
    modalSlides: []
  };

  // --------------------------------------------------------------------------
  // DOM SELECTORS
  // --------------------------------------------------------------------------
  const DOM = {
    root: document.documentElement,
    themeToggle: document.querySelector('.theme-toggle'),
    themeToggleLabel: document.querySelector('.theme-toggle-label'),
    backToTop: document.querySelector('.back-to-top'),
    navToggle: document.querySelector('.nav-toggle'),
    navLinks: document.getElementById('site-nav-links'),

    // Work Grids (Linear Sub-Sections)
    gamesGrid: document.getElementById('games-grid'),
    systemsGrid: document.getElementById('systems-grid'),
    threeDGrid: document.getElementById('3d-grid'),

    // Modal Dialog
    modal: document.getElementById('project-modal'),
    modalCloseBtn: document.getElementById('modal-close-btn'),
    modalSlideContainer: document.getElementById('modal-slide-container'),
    modalPrevBtn: document.getElementById('modal-prev-btn'),
    modalNextBtn: document.getElementById('modal-next-btn'),
    modalCounter: document.getElementById('modal-counter'),
    modalTitle: document.getElementById('modal-title'),
    modalCategory: document.getElementById('modal-category'),
    modalYear: document.getElementById('modal-year'),
    modalSummary: document.getElementById('modal-summary'),
    modalDesc: document.getElementById('modal-desc'),
    modalFeaturesWrap: document.getElementById('modal-features-wrap'),
    modalFeatures: document.getElementById('modal-features'),
    modalTags: document.getElementById('modal-tags'),
    modalLinks: document.getElementById('modal-links')
  };

  // --------------------------------------------------------------------------
  // INITIALIZATION
  // --------------------------------------------------------------------------
  function init() {
    initTheme();
    initBackToTop();
    initNavigation();

    if (window.PROJECTS && Array.isArray(window.PROJECTS)) {
      renderAllProjects();
      initModalEvents();
    }
  }

  // --------------------------------------------------------------------------
  // 1. THEME SWITCHER (Dark / Light Yellow x Creamy White)
  // --------------------------------------------------------------------------
  function initTheme() {
    const media = window.matchMedia('(prefers-color-scheme: dark)');

    function currentTheme() {
      return DOM.root.dataset.theme || (media.matches ? 'dark' : 'light');
    }

    function updateToggleUI() {
      const isDark = currentTheme() === 'dark';
      if (DOM.themeToggle) {
        DOM.themeToggle.setAttribute('aria-pressed', String(!isDark));
      }
      if (DOM.themeToggleLabel) {
        DOM.themeToggleLabel.textContent = isDark ? 'Dark' : 'Light';
      }
    }

    if (DOM.themeToggle) {
      DOM.themeToggle.addEventListener('click', () => {
        const next = currentTheme() === 'dark' ? 'light' : 'dark';
        DOM.root.dataset.theme = next;
        try {
          localStorage.setItem('theme', next);
        } catch (e) {}
        updateToggleUI();
      });
    }

    media.addEventListener('change', () => {
      if (!localStorage.getItem('theme')) {
        updateToggleUI();
      }
    });

    updateToggleUI();
  }

  // --------------------------------------------------------------------------
  // 2. BACK TO TOP BUTTON (Dylan Archer Style)
  // --------------------------------------------------------------------------
  function initBackToTop() {
    if (!DOM.backToTop) return;

    function updateVisibility() {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const threshold = Math.max(scrollable * 0.25, 260);
      DOM.backToTop.classList.toggle('is-visible', window.scrollY >= threshold);
    }

    DOM.backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', updateVisibility, { passive: true });
    window.addEventListener('resize', updateVisibility);
    updateVisibility();
  }

  // --------------------------------------------------------------------------
  // 3. NAVIGATION DRAWER
  // --------------------------------------------------------------------------
  function initNavigation() {
    // Mobile Drawer Toggle
    if (DOM.navToggle && DOM.navLinks) {
      DOM.navToggle.addEventListener('click', () => {
        const isOpen = DOM.navLinks.classList.toggle('is-open');
        DOM.navToggle.setAttribute('aria-expanded', String(isOpen));
      });

      // Close when clicking any nav link
      DOM.navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          DOM.navLinks.classList.remove('is-open');
          DOM.navToggle.setAttribute('aria-expanded', 'false');
        });
      });
    }
  }

  // --------------------------------------------------------------------------
  // 4. CREATE PROJECT CARD (Dylan Archer Style Compact Card)
  // --------------------------------------------------------------------------
  function createProjectCard(project) {
    const card = document.createElement('article');
    card.className = `project-card ${project.featured ? 'is-featured' : ''}`;
    card.setAttribute('data-id', project.id);
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `View details for ${escapeHTML(project.title)}`);

    const tagsHtml = project.tags.slice(0, 3).map(t => `<span>${escapeHTML(t)}</span>`).join('');
    const mediaBadge = project.video
      ? `<span class="project-media-badge"><i class="fa-solid fa-play" aria-hidden="true"></i> Video Reel</span>`
      : '';
    const featuredBadge = project.featured
      ? `<span class="project-featured-badge"><i class="fa-solid fa-star" aria-hidden="true"></i> Featured</span>`
      : '';

    card.innerHTML = `
      <div class="project-card-media">
        <img src="${project.thumbnail}" alt="${escapeHTML(project.title)}" loading="lazy">
        ${featuredBadge}
        ${mediaBadge}
      </div>
      <div class="project-card-body">
        <div class="project-card-heading">
          <h4 class="project-title">${escapeHTML(project.title)}</h4>
          <span class="project-year-badge">${escapeHTML(project.year)}</span>
        </div>
        <p class="project-summary">${escapeHTML(project.summary)}</p>
        <div class="project-tags" role="group" aria-label="Project tags">
          ${tagsHtml}
        </div>
        <span class="project-learn-more">
          View Project <i class="fa-solid fa-arrow-right-long" aria-hidden="true"></i>
        </span>
      </div>
    `;

    card.addEventListener('click', () => openModal(project.id));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(project.id);
      }
    });

    return card;
  }

  // --------------------------------------------------------------------------
  // 5. RENDER ALL PROJECTS (Sequential Sub-Sections: Games -> Systems -> 3D)
  // --------------------------------------------------------------------------
  function renderAllProjects() {
    // 1. Games: sort so featured games appear first
    if (DOM.gamesGrid) {
      DOM.gamesGrid.innerHTML = '';
      const games = window.PROJECTS.filter(p => p.category === 'game');
      const sortedGames = [...games].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
      sortedGames.forEach(project => {
        DOM.gamesGrid.appendChild(createProjectCard(project));
      });
    }

    // 2. Gameplay Systems & Prototypes
    if (DOM.systemsGrid) {
      DOM.systemsGrid.innerHTML = '';
      const systems = window.PROJECTS.filter(p => p.category === 'system');
      systems.forEach(project => {
        DOM.systemsGrid.appendChild(createProjectCard(project));
      });
    }

    // 3. 3D Modelling & Animation
    if (DOM.threeDGrid) {
      DOM.threeDGrid.innerHTML = '';
      const threeD = window.PROJECTS.filter(p => p.category === '3d');
      threeD.forEach(project => {
        DOM.threeDGrid.appendChild(createProjectCard(project));
      });
    }
  }

  // --------------------------------------------------------------------------
  // 7. DETAIL MODAL DIALOG
  // --------------------------------------------------------------------------
  function openModal(projectId) {
    const project = window.PROJECTS.find(p => p.id === projectId);
    if (!project || !DOM.modal) return;

    state.currentModalProject = project;
    state.currentSlideIndex = 0;

    // Collect slides: video first (if present), then images array, fallback to thumbnail
    state.modalSlides = [];
    if (project.video) {
      state.modalSlides.push({ type: 'video', src: project.video, caption: `${project.title} Video Reel` });
    }
    if (Array.isArray(project.images) && project.images.length > 0) {
      project.images.forEach(img => {
        state.modalSlides.push({ type: 'image', src: img, caption: project.title });
      });
    }
    if (state.modalSlides.length === 0 && project.thumbnail) {
      state.modalSlides.push({ type: 'image', src: project.thumbnail, caption: project.title });
    }

    // Populate Text Details
    if (DOM.modalTitle) DOM.modalTitle.textContent = project.title;
    if (DOM.modalCategory) DOM.modalCategory.textContent = formatCategory(project.category);
    if (DOM.modalYear) DOM.modalYear.textContent = project.year;
    if (DOM.modalSummary) DOM.modalSummary.textContent = project.summary;
    if (DOM.modalDesc) DOM.modalDesc.textContent = project.description;

    // Key Features (Max 4)
    if (DOM.modalFeatures && DOM.modalFeaturesWrap) {
      if (Array.isArray(project.features) && project.features.length > 0) {
        DOM.modalFeaturesWrap.style.display = 'block';
        DOM.modalFeatures.innerHTML = project.features
          .slice(0, 4)
          .map(f => `<li>${escapeHTML(f)}</li>`)
          .join('');
      } else {
        DOM.modalFeaturesWrap.style.display = 'none';
      }
    }

    // Tech Chips
    if (DOM.modalTags) {
      DOM.modalTags.innerHTML = project.tags.map(t => `<span class="chip">${escapeHTML(t)}</span>`).join('');
    }

    // Links Action Buttons
    if (DOM.modalLinks) {
      if (Array.isArray(project.links) && project.links.length > 0) {
        DOM.modalLinks.innerHTML = project.links.map(link => {
          const btnClass = link.isPrimary ? 'btn btn-primary btn-sm' : 'btn btn-secondary btn-sm';
          return `<a href="${link.url}" target="_blank" rel="noopener noreferrer" class="${btnClass}">${escapeHTML(link.label)} <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a>`;
        }).join('');
      } else {
        DOM.modalLinks.innerHTML = '';
      }
    }

    renderModalSlide();

    // Show Dialog
    DOM.modal.classList.add('is-open');
    DOM.modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
      DOM.modalCloseBtn?.focus();
    }, 50);
  }

  function closeModal() {
    if (!DOM.modal) return;
    pauseModalVideo();
    DOM.modal.classList.remove('is-open');
    DOM.modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    state.currentModalProject = null;
  }

  function pauseModalVideo() {
    if (!DOM.modalSlideContainer) return;
    const v = DOM.modalSlideContainer.querySelector('video');
    if (v) v.pause();
  }

  function renderModalSlide() {
    if (!DOM.modalSlideContainer || state.modalSlides.length === 0) return;
    pauseModalVideo();

    const slide = state.modalSlides[state.currentSlideIndex];
    if (slide.type === 'video') {
      DOM.modalSlideContainer.innerHTML = `
        <video src="${slide.src}" controls autoplay playsinline loop preload="metadata" aria-label="${escapeHTML(slide.caption)}"></video>
      `;
    } else {
      DOM.modalSlideContainer.innerHTML = `
        <img src="${slide.src}" alt="${escapeHTML(slide.caption)}" loading="eager">
      `;
    }

    const total = state.modalSlides.length;
    if (DOM.modalCounter) {
      DOM.modalCounter.textContent = `${state.currentSlideIndex + 1} / ${total}`;
      DOM.modalCounter.style.display = total > 1 ? 'block' : 'none';
    }

    const showNav = total > 1;
    if (DOM.modalPrevBtn) DOM.modalPrevBtn.style.display = showNav ? 'flex' : 'none';
    if (DOM.modalNextBtn) DOM.modalNextBtn.style.display = showNav ? 'flex' : 'none';
  }

  function nextModalSlide() {
    if (state.modalSlides.length <= 1) return;
    state.currentSlideIndex = (state.currentSlideIndex + 1) % state.modalSlides.length;
    renderModalSlide();
  }

  function prevModalSlide() {
    if (state.modalSlides.length <= 1) return;
    state.currentSlideIndex = (state.currentSlideIndex - 1 + state.modalSlides.length) % state.modalSlides.length;
    renderModalSlide();
  }

  function initModalEvents() {
    if (!DOM.modal) return;

    DOM.modalCloseBtn?.addEventListener('click', closeModal);
    DOM.modalNextBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      nextModalSlide();
    });
    DOM.modalPrevBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      prevModalSlide();
    });

    DOM.modal.addEventListener('click', (e) => {
      if (e.target === DOM.modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (!DOM.modal.classList.contains('is-open')) return;
      if (e.key === 'Escape') closeModal();
      else if (e.key === 'ArrowRight') nextModalSlide();
      else if (e.key === 'ArrowLeft') prevModalSlide();
    });
  }

  // --------------------------------------------------------------------------
  // HELPERS
  // --------------------------------------------------------------------------
  function formatCategory(cat) {
    switch (cat) {
      case 'game': return 'Game';
      case 'system': return 'System';
      case '3d': return '3D Art';
      case 'vrar': return 'VR / AR';
      default: return cat;
    }
  }

  function escapeHTML(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Boot on ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();