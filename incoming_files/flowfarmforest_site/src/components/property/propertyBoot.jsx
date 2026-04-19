import { propertyData } from './propertyData.js';
import { renderPropertyExperience } from './propertyRenderer.js';
import { initLightbox } from './lightbox.js';

function initSmoothScroll(root) {
  root.querySelectorAll('a[href^="#ff-room-"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const target = root.querySelector(link.getAttribute('href'));
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  });
}

function boot() {
  const mount = document.getElementById('ff-property-experience');
  if (!mount) return;

  mount.innerHTML = renderPropertyExperience(propertyData);
  initSmoothScroll(mount);
  initLightbox(mount);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}