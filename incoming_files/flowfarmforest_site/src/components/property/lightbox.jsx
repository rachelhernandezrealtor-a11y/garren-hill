export function initLightbox(root) {
  const lightbox = root.querySelector('#ff-lightbox');
  if (!lightbox) return;

  const panel = lightbox.querySelector('.ff-lightbox-panel');
  const image = lightbox.querySelector('.ff-lightbox-image');
  const caption = lightbox.querySelector('.ff-lightbox-caption');
  const count = lightbox.querySelector('.ff-lightbox-count');
  const prevBtn = lightbox.querySelector('.ff-lightbox-prev');
  const nextBtn = lightbox.querySelector('.ff-lightbox-next');
  const closeBtn = lightbox.querySelector('.ff-lightbox-close');

  const galleries = new Map();

  let activeGroup = null;
  let activeIndex = 0;
  let lastTrigger = null;

  const focusableSelector = [
    'button:not([disabled])',
    '[href]',
    '[tabindex]:not([tabindex="-1"])'
  ].join(',');

  const normalizeItem = (el) => {
    const img = el.querySelector('img');
    return {
      src: el.getAttribute('href') || el.dataset.src || img?.currentSrc || img?.src || '',
      alt: img?.alt || el.dataset.ffAlt || '',
      caption: el.dataset.ffCaption || img?.alt || ''
    };
  };

  const registerGalleries = () => {
    root.querySelectorAll('[data-ff-lightbox]').forEach((el) => {
      const group = el.dataset.ffLightbox;
      if (!group) return;

      if (!galleries.has(group)) galleries.set(group, []);

      const items = galleries.get(group);
      const item = normalizeItem(el);

      if (!item.src) return;

      const existingIndex = items.findIndex((entry) => entry.src === item.src);
      const index = existingIndex > -1 ? existingIndex : items.push(item) - 1;

      el.dataset.ffIndex = String(index);
    });
  };

  const preloadNeighbors = () => {
    const items = galleries.get(activeGroup) || [];
    if (items.length < 2) return;

    const nextIndex = (activeIndex + 1) % items.length;
    const prevIndex = (activeIndex - 1 + items.length) % items.length;

    const nextImg = new Image();
    const prevImg = new Image();
    nextImg.src = items[nextIndex].src;
    prevImg.src = items[prevIndex].src;
  };

  const render = () => {
    const items = galleries.get(activeGroup) || [];
    const item = items[activeIndex];
    if (!item) return;

    image.src = item.src;
    image.alt = item.alt || '';
    caption.textContent = item.caption || item.alt || 'Gallery image';
    count.textContent = `${activeIndex + 1} / ${items.length}`;

    const disableNav = items.length < 2;
    prevBtn.disabled = disableNav;
    nextBtn.disabled = disableNav;

    preloadNeighbors();
  };

  const openLightbox = (group, index = 0, trigger = null) => {
    const items = galleries.get(group) || [];
    if (!items.length) return;

    activeGroup = group;
    activeIndex = ((index % items.length) + items.length) % items.length;
    lastTrigger = trigger;

    render();

    lightbox.hidden = false;
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('ff-lightbox-open');
    closeBtn.focus();
  };

  const closeLightbox = () => {
    lightbox.hidden = true;
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('ff-lightbox-open');
    image.removeAttribute('src');

    if (lastTrigger && typeof lastTrigger.focus === 'function') {
      lastTrigger.focus();
    }
  };

  const step = (delta) => {
    const items = galleries.get(activeGroup) || [];
    if (!items.length) return;

    activeIndex = (activeIndex + delta + items.length) % items.length;
    render();
  };

  const trapFocus = (event) => {
    if (lightbox.hidden || event.key !== 'Tab') return;

    const focusables = [...panel.querySelectorAll(focusableSelector)];
    if (!focusables.length) return;

    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  registerGalleries();

  root.addEventListener('click', (event) => {
    const thumbOrMedia = event.target.closest('[data-ff-lightbox]');
    if (thumbOrMedia && root.contains(thumbOrMedia)) {
      event.preventDefault();
      openLightbox(
        thumbOrMedia.dataset.ffLightbox,
        Number(thumbOrMedia.dataset.ffIndex || 0),
        thumbOrMedia
      );
      return;
    }

    const openGalleryButton = event.target.closest('[data-ff-open-gallery]');
    if (openGalleryButton && root.contains(openGalleryButton)) {
      event.preventDefault();
      openLightbox(
        openGalleryButton.dataset.ffOpenGallery,
        Number(openGalleryButton.dataset.ffStart || 0),
        openGalleryButton
      );
      return;
    }

    if (event.target.closest('[data-ff-close-lightbox]')) {
      event.preventDefault();
      closeLightbox();
    }
  });

  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  panel.addEventListener('click', (event) => {
    event.stopPropagation();
  });

  prevBtn.addEventListener('click', () => step(-1));
  nextBtn.addEventListener('click', () => step(1));
  closeBtn.addEventListener('click', closeLightbox);

  document.addEventListener('keydown', (event) => {
    if (lightbox.hidden) return;

    if (event.key === 'Escape') {
      closeLightbox();
      return;
    }

    if (event.key === 'ArrowLeft') {
      step(-1);
      return;
    }

    if (event.key === 'ArrowRight') {
      step(1);
      return;
    }

    trapFocus(event);
  });
}