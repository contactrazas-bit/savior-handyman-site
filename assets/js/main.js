(() => {
  'use strict';
  document.documentElement.classList.add('js');

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const header = document.querySelector('[data-header]');
  const progress = document.querySelector('.scroll-progress span');
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.primary-nav');

  const closeMenu = () => {
    if (!menuButton || !nav) return;
    menuButton.setAttribute('aria-expanded', 'false');
    nav.classList.remove('is-open');
    document.body.classList.remove('menu-open');
    menuButton.querySelector('.sr-only').textContent = 'Open navigation';
  };

  menuButton?.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!open));
    nav.classList.toggle('is-open', !open);
    document.body.classList.toggle('menu-open', !open);
    menuButton.querySelector('.sr-only').textContent = open ? 'Open navigation' : 'Close navigation';
  });
  nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });

  const updateScroll = () => {
    const y = window.scrollY;
    header?.classList.toggle('is-sticky', y > 42);
    const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    if (progress) progress.style.width = `${Math.min(100, (y / max) * 100)}%`;
  };
  updateScroll();
  window.addEventListener('scroll', updateScroll, { passive: true });

  const revealItems = document.querySelectorAll('.reveal, .image-reveal, .process');
  if ('IntersectionObserver' in window && !reducedMotion) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    revealItems.forEach(item => revealObserver.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add('is-visible'));
  }

  const countElements = document.querySelectorAll('[data-count]');
  const animateCount = element => {
    const target = Number(element.dataset.count);
    if (!Number.isFinite(target) || reducedMotion) return;
    const decimals = String(target).includes('.') ? 1 : 0;
    const start = performance.now();
    const duration = 900;
    const step = now => {
      const pct = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - pct, 3);
      element.textContent = (target * eased).toFixed(decimals);
      if (pct < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if ('IntersectionObserver' in window) {
    const countObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          countObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.7 });
    countElements.forEach(el => countObserver.observe(el));
  }

  const spyLinks = [...document.querySelectorAll('.primary-nav a[href^="#"]')];
  const spySections = spyLinks.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
  if ('IntersectionObserver' in window) {
    const spyObserver = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      spyLinks.forEach(link => link.classList.toggle('is-active', link.getAttribute('href') === `#${visible.target.id}`));
    }, { rootMargin: '-35% 0px -55% 0px', threshold: [0, .2, .5] });
    spySections.forEach(section => spyObserver.observe(section));
  }

  const problemSelector = document.querySelector('[data-problem-selector]');
  if (problemSelector) {
    const output = problemSelector.querySelector('.problem-output');
    problemSelector.querySelectorAll('button[data-problem]').forEach(button => {
      button.addEventListener('click', () => {
        problemSelector.querySelectorAll('button').forEach(btn => btn.classList.remove('is-active'));
        button.classList.add('is-active');
        output.textContent = `When you call, say: “${button.dataset.problem}.” Add the location and any useful equipment or fixture details.`;
      });
    });
  }

  const filters = document.querySelectorAll('[data-filter]');
  const galleryItems = [...document.querySelectorAll('.gallery-item')];
  filters.forEach(button => {
    button.addEventListener('click', () => {
      filters.forEach(btn => btn.classList.remove('is-active'));
      button.classList.add('is-active');
      const filter = button.dataset.filter;
      galleryItems.forEach(item => {
        const show = filter === 'all' || item.dataset.category === filter;
        item.classList.toggle('is-hidden', !show);
        item.setAttribute('aria-hidden', String(!show));
      });
    });
  });

  const lightbox = document.querySelector('.lightbox');
  const lightboxImage = lightbox?.querySelector('figure img');
  const lightboxCaption = lightbox?.querySelector('figcaption');
  let lightboxIndex = 0;
  let visibleGalleryItems = galleryItems;

  const refreshVisible = () => { visibleGalleryItems = galleryItems.filter(item => !item.classList.contains('is-hidden')); };
  const showLightboxItem = index => {
    refreshVisible();
    if (!visibleGalleryItems.length || !lightboxImage || !lightboxCaption) return;
    lightboxIndex = (index + visibleGalleryItems.length) % visibleGalleryItems.length;
    const item = visibleGalleryItems[lightboxIndex];
    lightboxImage.src = item.dataset.full;
    lightboxImage.alt = item.dataset.alt || '';
    lightboxCaption.textContent = item.dataset.caption || '';
  };
  galleryItems.forEach(item => item.addEventListener('click', () => {
    refreshVisible();
    showLightboxItem(visibleGalleryItems.indexOf(item));
    if (typeof lightbox?.showModal === 'function') lightbox.showModal();
  }));
  lightbox?.querySelector('.lightbox__close')?.addEventListener('click', () => lightbox.close());
  lightbox?.querySelector('.lightbox__prev')?.addEventListener('click', () => showLightboxItem(lightboxIndex - 1));
  lightbox?.querySelector('.lightbox__next')?.addEventListener('click', () => showLightboxItem(lightboxIndex + 1));
  lightbox?.addEventListener('click', event => { if (event.target === lightbox) lightbox.close(); });
  lightbox?.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') showLightboxItem(lightboxIndex - 1);
    if (event.key === 'ArrowRight') showLightboxItem(lightboxIndex + 1);
  });
  let lightboxTouchStart = 0;
  lightbox?.addEventListener('touchstart', event => { lightboxTouchStart = event.changedTouches[0].clientX; }, { passive: true });
  lightbox?.addEventListener('touchend', event => {
    const distance = event.changedTouches[0].clientX - lightboxTouchStart;
    if (Math.abs(distance) > 45) showLightboxItem(lightboxIndex + (distance < 0 ? 1 : -1));
  }, { passive: true });

  const reviewTrack = document.querySelector('[data-review-track]');
  const reviewCards = [...document.querySelectorAll('.review-card')];
  const reviewCurrent = document.querySelector('[data-review-current]');
  let reviewIndex = 0;
  const updateReviews = () => {
    if (!reviewTrack || !reviewCards.length) return;
    const cardWidth = reviewCards[0].getBoundingClientRect().width + 18;
    reviewTrack.style.transform = `translateX(${-reviewIndex * cardWidth}px)`;
    reviewCards.forEach((card, index) => {
      const active = index === reviewIndex;
      card.classList.toggle('is-active', active);
      card.setAttribute('aria-hidden', String(!active));
    });
    if (reviewCurrent) reviewCurrent.textContent = String(reviewIndex + 1).padStart(2, '0');
  };
  const moveReview = direction => {
    reviewIndex = (reviewIndex + direction + reviewCards.length) % reviewCards.length;
    updateReviews();
  };
  document.querySelector('[data-review-prev]')?.addEventListener('click', () => moveReview(-1));
  document.querySelector('[data-review-next]')?.addEventListener('click', () => moveReview(1));
  let reviewTouchStart = 0;
  reviewTrack?.addEventListener('touchstart', event => { reviewTouchStart = event.changedTouches[0].clientX; }, { passive: true });
  reviewTrack?.addEventListener('touchend', event => {
    const distance = event.changedTouches[0].clientX - reviewTouchStart;
    if (Math.abs(distance) > 45) moveReview(distance < 0 ? 1 : -1);
  }, { passive: true });
  reviewTrack?.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') moveReview(-1);
    if (event.key === 'ArrowRight') moveReview(1);
  });
  window.addEventListener('resize', updateReviews);
  updateReviews();

  document.querySelectorAll('.faq-list details').forEach(detail => {
    detail.addEventListener('toggle', () => {
      if (!detail.open) return;
      document.querySelectorAll('.faq-list details').forEach(other => { if (other !== detail) other.open = false; });
    });
  });

  if (!reducedMotion && window.matchMedia('(pointer:fine)').matches) {
    const glow = document.querySelector('.cursor-glow');
    window.addEventListener('pointermove', event => {
      if (!glow) return;
      glow.style.left = `${event.clientX}px`;
      glow.style.top = `${event.clientY}px`;
      glow.classList.add('is-active');
    }, { passive: true });
    document.querySelectorAll('.magnetic').forEach(button => {
      button.addEventListener('pointermove', event => {
        const rect = button.getBoundingClientRect();
        button.style.transform = `translate(${(event.clientX - rect.left - rect.width / 2) * .08}px, ${(event.clientY - rect.top - rect.height / 2) * .08}px)`;
      });
      button.addEventListener('pointerleave', () => { button.style.transform = ''; });
    });
  }

  document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });
})();
