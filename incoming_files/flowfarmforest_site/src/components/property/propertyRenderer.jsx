const esc = (value = '') =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const renderResidenceAction = (action) => {
  const variantClass = action.style === 'solid' ? 'ff-btn-solid' : 'ff-btn-outline';
  return `
    <a class="ff-btn ${variantClass}" href="${esc(action.href)}" target="_blank" rel="noopener">
      ${esc(action.label)}
    </a>
  `;
};

const renderMediaAnchor = ({
  image,
  group,
  className,
  badgeText = 'Open gallery ↗',
  ariaLabel
}) => `
  <a
    class="${className}"
    href="${esc(image.src)}"
    data-ff-lightbox="${esc(group)}"
    data-ff-caption="${esc(image.caption || image.alt || '')}"
    aria-label="${esc(ariaLabel || image.caption || 'Open gallery')}"
  >
    <img
      src="${esc(image.src)}"
      alt="${esc(image.alt || '')}"
      loading="lazy"
      decoding="async"
    >
    ${badgeText ? `<span class="ff-media-badge">${esc(badgeText)}</span>` : ''}
  </a>
`;

const renderThumbGrid = (gallery, group) => `
  <div class="ff-thumbgrid">
    ${gallery.map((img) => `
      <a
        class="ff-thumb"
        href="${esc(img.src)}"
        data-ff-lightbox="${esc(group)}"
        data-ff-caption="${esc(img.caption || img.alt || '')}"
        aria-label="${esc(img.caption || img.alt || 'Open image')}"
      >
        <img
          src="${esc(img.src)}"
          alt="${esc(img.alt || '')}"
          loading="lazy"
          decoding="async"
        >
      </a>
    `).join('')}
  </div>
`;

const renderRoom = (room) => {
  const primaryImage = room.gallery[0];
  const hasMultiImagePreview = room.gallery.length > 1;

  return `
    <article id="${esc(room.id)}" class="ff-room">
      <div class="ff-room-head">
        <div class="ff-room-kicker">${esc(room.kicker)}</div>
        <div class="ff-room-sub">${esc(room.sub)}</div>
      </div>

      ${renderMediaAnchor({
        image: primaryImage,
        group: room.group,
        className: 'ff-room-media',
        badgeText: room.gallery.length > 1 ? 'Open gallery ↗' : 'Open photo ↗',
        ariaLabel: `Open ${room.kicker} gallery`
      })}

      <div class="ff-room-body">
        <p class="ff-room-text">${room.text}</p>

        ${
          hasMultiImagePreview
            ? `
              <details class="ff-dd">
                <summary class="ff-pill ff-pill-outline">${esc(room.previewLabel || 'Preview Gallery')}</summary>
                <div class="ff-dd-content">
                  ${renderThumbGrid(room.gallery, room.group)}
                  <div class="ff-dd-note">Click any photo to open the lightbox gallery.</div>
                </div>
              </details>
            `
            : `
              <div class="ff-room-actions">
                <button class="ff-btn ff-btn-outline ff-btn-small" type="button" data-ff-open-gallery="${esc(room.group)}">
                  ${esc(room.openLabel || 'Open Photo')}
                </button>
              </div>
            `
        }
      </div>
    </article>
  `;
};

const renderFeaturedTile = (image, index, group, total) => {
  const isLarge = index === 0;
  const isLast = index === total - 1;

  return `
    <a
      class="ff-mh-tile ${isLarge ? 'ff-mh-tile-large' : ''}"
      href="${esc(image.src)}"
      data-ff-lightbox="${esc(group)}"
      data-ff-caption="${esc(image.caption || image.alt || '')}"
      aria-label="${esc(image.caption || image.alt || 'Open gallery image')}"
    >
      <span class="ff-mh-tile-bg" style="background-image:url('${esc(image.src)}');"></span>

      ${
        isLarge
          ? `
            <span class="ff-mh-tile-copy">
              <span class="ff-glass-chip ff-glass-chip-static">Main House Highlights <span>↗</span></span>
            </span>
          `
          : ''
      }

      ${
        isLast
          ? `
            <span class="ff-mh-tile-copy ff-mh-tile-copy-bottom">
              <span class="ff-mh-tile-title">View Full Gallery</span>
              <span class="ff-mh-tile-sub">Main House Photos ↗</span>
            </span>
          `
          : ''
      }
    </a>
  `;
};

const renderMainHouseCta = (cta) => {
  const classes = `ff-mh-btn ${cta.style === 'secondary' ? 'ff-mh-btn-secondary' : ''}`;

  if (cta.kind === 'gallery') {
    return `
      <button type="button" class="${classes}" data-ff-open-gallery="${esc(cta.gallery)}">
        ${esc(cta.label)} <span>↗</span>
      </button>
    `;
  }

  return `
    <a href="${esc(cta.href)}" target="_blank" rel="noopener" class="${classes}">
      ${esc(cta.label)} <span>↗</span>
    </a>
  `;
};

const renderResidence = (data) => `
  <section id="ff-residence" class="ff-section">
    <div class="ff-panel ff-panel-white">
      <div class="ff-wrap">
        <div class="ff-card">

          <div class="ff-kicker">${esc(data.kicker)}</div>
          <h2 class="ff-title">${esc(data.title)}</h2>
          <div class="ff-rule"></div>

          <div class="ff-chiprow">
            ${data.chips.map((chip) => `
              <a class="ff-chip" href="${esc(chip.href)}">${esc(chip.label)}</a>
            `).join('')}
          </div>

          <div class="ff-split">
            <div>
              ${renderMediaAnchor({
                image: data.hero.image,
                group: data.hero.group,
                className: 'ff-split-media',
                badgeText: 'Open gallery ↗',
                ariaLabel: 'Open grand living room gallery'
              })}
              <div class="ff-caption">${esc(data.hero.image.caption)}</div>
            </div>

            <div class="ff-split-aside">
              <div class="ff-statgrid">
                ${data.stats.map((stat) => `
                  <div class="ff-stat">
                    <div class="ff-stat-k">${esc(stat.key)}</div>
                    <div class="ff-stat-v">${esc(stat.value)}</div>
                    <div class="ff-stat-s">${esc(stat.sub)}</div>
                  </div>
                `).join('')}
              </div>

              <div class="ff-actions ff-actions-tight">
                ${data.actions.map(renderResidenceAction).join('')}
              </div>

              <div class="ff-note">${esc(data.note)}</div>
            </div>
          </div>

          ${data.body.map((paragraph) => `
            <p class="ff-body">${paragraph}</p>
          `).join('')}

          <div class="ff-callout">
            <div class="ff-callout-kicker">${esc(data.smartHome.kicker)}</div>
            <div class="ff-callout-title">${esc(data.smartHome.title)}</div>
            <p class="ff-callout-body">${data.smartHome.body}</p>

            <div class="ff-chiprow ff-chiprow-dark">
              ${data.smartHome.tags.map((tag) => `
                <span class="ff-chip ff-chip-dark">${esc(tag)}</span>
              `).join('')}
            </div>
          </div>

          <div class="ff-mini-grid">
            ${data.miniGrid.map((item) => `
              <div class="ff-mini">
                <div class="ff-mini-title">${esc(item.title)}</div>
                <div class="ff-mini-text">${esc(item.text)}</div>
              </div>
            `).join('')}
          </div>

          <div class="ff-portfolio">
            <div class="ff-kicker">Interior Portfolio</div>
            <h3 class="ff-h3">A room-by-room visual walkthrough.</h3>
            <div class="ff-rule"></div>

            <div class="ff-roomgrid">
              ${data.rooms.map(renderRoom).join('')}
            </div>

            <p class="ff-tagline">${esc(data.tagline)}</p>
          </div>

        </div>
      </div>
    </div>
  </section>
`;

const renderMainHouse = (data) => `
  <section id="flowfarm-mainhouse" class="ff-mainhouse">
    <div class="ff-wrap">
      <div class="ff-mainhouse-grid">

        <article class="ff-mh-hero">
          <div class="ff-mh-hero-media" style="background-image:url('${esc(data.hero.image)}');"></div>

          <div class="ff-mh-hero-overlay">
            <div class="ff-mh-topbar">
              <button
                type="button"
                class="ff-glass-chip"
                data-ff-open-gallery="${esc(data.hero.gallery)}"
                aria-label="Open main house highlights gallery"
              >
                Open Gallery <span>↗</span>
              </button>

              <div class="ff-mh-eyebrow">Explore the residence</div>
            </div>

            <div>
              <h3 class="ff-mh-title">${esc(data.hero.title)}</h3>
              <p class="ff-mh-copy">${esc(data.hero.copy)}</p>
            </div>
          </div>
        </article>

        <div class="ff-mh-side">
          <article class="ff-mh-card">
            <div class="ff-mh-head">
              <div class="ff-mh-label">At a glance</div>
              <div class="ff-mh-subtle">NC guidelines</div>
            </div>

            <div class="ff-mh-statgrid">
              ${data.stats.map((stat) => `
                <div class="ff-mh-stat">
                  <div class="ff-mh-stat-k">${esc(stat.key)}</div>
                  <div class="ff-mh-stat-v">${esc(stat.value)}</div>
                  <div class="ff-mh-stat-s">${esc(stat.sub)}</div>
                </div>
              `).join('')}
            </div>

            <div class="ff-mh-note">${esc(data.note)}</div>
          </article>

          <article class="ff-mh-card">
            <div class="ff-mh-label ff-mh-label-bottom">Signature spaces</div>
            <ul class="ff-mh-list">
              ${data.signatureSpaces.map((item) => `<li>${item}</li>`).join('')}
            </ul>
          </article>
        </div>
      </div>

      <article class="ff-mh-featured">
        <div class="ff-mh-sectionhead">
          <div>
            <div class="ff-mh-label">Featured images</div>
            <div class="ff-mh-sectioncopy">${esc(data.featured.intro)}</div>
          </div>

          <button
            type="button"
            class="ff-mh-btn"
            data-ff-open-gallery="${esc(data.featured.group)}"
          >
            View More Photos <span>↗</span>
          </button>
        </div>

        <div class="ff-mh-featured-grid">
          ${data.featured.images.map((image, index, arr) =>
            renderFeaturedTile(image, index, data.featured.group, arr.length)
          ).join('')}
        </div>
      </article>

      <div class="ff-mh-strip">
        ${data.strip.map((item) => `
          <article class="ff-mh-strip-card">
            <div class="ff-mh-label">${esc(item.label)}</div>
            <div class="ff-mh-strip-title">${esc(item.title)}</div>
            <div class="ff-mh-strip-copy">${esc(item.copy)}</div>
          </article>
        `).join('')}
      </div>

      <div class="ff-mh-ctas">
        ${data.ctas.map(renderMainHouseCta).join('')}
      </div>
    </div>
  </section>
`;

const renderLightbox = () => `
  <div class="ff-lightbox" id="ff-lightbox" hidden aria-hidden="true">
    <div class="ff-lightbox-panel" role="dialog" aria-modal="true" aria-label="Image gallery">
      <button class="ff-lightbox-close" type="button" aria-label="Close gallery" data-ff-close-lightbox>×</button>
      <button class="ff-lightbox-nav ff-lightbox-prev" type="button" aria-label="Previous image">‹</button>

      <figure class="ff-lightbox-figure">
        <img class="ff-lightbox-image" src="" alt="">
        <figcaption class="ff-lightbox-meta">
          <span class="ff-lightbox-caption"></span>
          <span class="ff-lightbox-count"></span>
        </figcaption>
      </figure>

      <button class="ff-lightbox-nav ff-lightbox-next" type="button" aria-label="Next image">›</button>
    </div>
  </div>
`;

export const renderPropertyExperience = (data) => `
  ${renderResidence(data.residence)}
  ${renderMainHouse(data.mainHouse)}
  ${renderLightbox()}
`;