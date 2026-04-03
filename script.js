const siteContent = window.siteContent;

if (!siteContent) {
  throw new Error("siteContent is not available. Check content.js.");
}

const iconMap = {
  research: `
    <svg class="inline-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M8 3v5l-4 7a4 4 0 0 0 3.5 6h9A4 4 0 0 0 20 15l-4-7V3" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M8 8h8" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>
      <path d="M8.5 14h7" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>
    </svg>
  `,
  quality: `
    <svg class="inline-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M9 3.5h6l5 3v6.5c0 3.7-2.2 7.1-5.7 8.6L12 22l-2.3-.4C6.2 20.1 4 16.7 4 13V6.5l5-3Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>
      <path d="m8.5 12.5 2.2 2.2 4.8-5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `,
  leadership: `
    <svg class="inline-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="m12 2 2.3 5 5.4.7-4 3.8 1 5.5L12 14.5 7.3 17l1-5.5-4-3.8L9.7 7 12 2Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>
    </svg>
  `,
  writing: `
    <svg class="inline-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 4.5h9.5L19.5 8v11.5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-14a1 1 0 0 1 1-1Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>
      <path d="M15.5 4.5V8h4" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>
      <path d="M8.5 11.5h7M8.5 15h7" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>
    </svg>
  `,
  spark: `
    <svg class="inline-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="m12 3 1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>
      <path d="m18.5 15 .8 2.3 2.2.7-2.2.8-.8 2.2-.7-2.2-2.3-.8 2.3-.7.7-2.3ZM5.5 14.5l.8 2.3 2.2.7-2.2.8-.8 2.2-.7-2.2-2.3-.8 2.3-.7.7-2.3Z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/>
    </svg>
  `,
  pin: `
    <svg class="inline-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 21s6-5.3 6-11a6 6 0 1 0-12 0c0 5.7 6 11 6 11Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>
      <circle cx="12" cy="10" r="2.5" stroke="currentColor" stroke-width="1.7"/>
    </svg>
  `
};

function $(selector) {
  return document.querySelector(selector);
}

function setText(selector, value) {
  const node = $(selector);
  if (node) {
    node.textContent = value;
  }
}

function renderMarkup(selector, markup) {
  const node = $(selector);
  if (node) {
    node.innerHTML = markup;
  }
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function linkAttributes(link) {
  return link.external ? 'target="_blank" rel="noreferrer"' : "";
}

function renderButton(link, className) {
  return `
    <a class="${className}" href="${link.href}" ${linkAttributes(link)}>
      ${escapeHtml(link.label)}
    </a>
  `;
}

function renderHero() {
  const { profile, hero } = siteContent;

  setText("#availability-pill", hero.availability);
  setText("#hero-kicker", profile.headline);
  setText("#hero-title", profile.heroTitle);
  setText("#hero-copy", profile.heroSummary);
  setText("#portrait-caption", profile.portraitCaption);

  const portrait = $("#hero-portrait");
  if (portrait) {
    portrait.src = profile.portrait.src;
    portrait.alt = profile.portrait.alt;
  }

  renderMarkup(
    "#hero-actions",
    hero.actions
      .map((link, index) =>
        renderButton(link, index === 0 ? "button button-primary" : "button button-secondary")
      )
      .join("")
  );

  renderMarkup(
    "#hero-badges",
    hero.badges
      .map(
        (badge) => `
          <span class="hero-badge">${escapeHtml(badge)}</span>
        `
      )
      .join("")
  );

  renderMarkup(
    "#hero-stats",
    hero.stats
      .map(
        (item) => `
          <article class="stat-card">
            <span>${iconMap[item.icon] || ""}${escapeHtml(item.label)}</span>
            <strong>${escapeHtml(item.value)}</strong>
          </article>
        `
      )
      .join("")
  );

  renderMarkup(
    "#current-focus-list",
    hero.focus.map((item) => `<li>${escapeHtml(item)}</li>`).join("")
  );

  renderMarkup(
    "#hero-note",
    `
      <p class="card-label">${escapeHtml(hero.note.label)}</p>
      <h3>${escapeHtml(hero.note.title)}</h3>
      <p>${escapeHtml(hero.note.body)}</p>
    `
  );

  renderMarkup(
    "#affiliation-list",
    hero.affiliations
      .map((item) => `<span class="orbit-pill">${escapeHtml(item)}</span>`)
      .join("")
  );
}

function renderAbout() {
  const { about } = siteContent;

  setText("#pull-quote", about.quote);

  renderMarkup(
    "#about-copy",
    about.paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")
  );

  renderMarkup(
    "#quick-facts",
    about.quickFacts
      .map(
        (fact) => `
          <article class="fact-card">
            <span>${escapeHtml(fact.label)}</span>
            <strong>${escapeHtml(fact.value)}</strong>
          </article>
        `
      )
      .join("")
  );

  renderMarkup(
    "#achievement-strip",
    about.achievements
      .map(
        (item) => `
          <article class="achievement-item">
            <span>${escapeHtml(item.label)}</span>
            <strong>${escapeHtml(item.title)}</strong>
            <p>${escapeHtml(item.body)}</p>
          </article>
        `
      )
      .join("")
  );
}

function renderJourney() {
  const { journey } = siteContent;

  renderMarkup(
    "#education-card",
    `
      <p class="card-label">${escapeHtml(journey.education.label)}</p>
      <h3>${escapeHtml(journey.education.school)}</h3>
      <p>${escapeHtml(journey.education.program)}</p>
      <div class="education-meta">
        ${journey.education.details
          .map((detail) => `<span>${escapeHtml(detail)}</span>`)
          .join("")}
      </div>
    `
  );

  renderMarkup(
    "#career-interest-list",
    journey.interests.map((item) => `<li>${escapeHtml(item)}</li>`).join("")
  );

  renderMarkup(
    "#experience-list",
    journey.experience
      .map(
        (item) => `
          <article class="timeline-item" data-reveal>
            <div class="timeline-inner">
              <div>
                <span class="timeline-period">${escapeHtml(item.period)}</span>
              </div>
              <div>
                <div class="timeline-title-row">
                  <h3>${escapeHtml(item.role)}</h3>
                  <span class="timeline-company">${escapeHtml(item.company)}</span>
                </div>
                <p class="timeline-summary">${escapeHtml(item.summary)}</p>
                <ul class="timeline-points">
                  ${item.points.map((point) => `<li>${escapeHtml(point)}</li>`).join("")}
                </ul>
              </div>
            </div>
          </article>
        `
      )
      .join("")
  );
}

function renderHighlightMedia(item) {
  if (item.media.kind === "image") {
    return `
      <div class="highlight-media">
        <img
          src="${item.media.src}"
          alt="${escapeHtml(item.media.alt)}"
          loading="lazy"
          decoding="async"
        />
      </div>
    `;
  }

  return `
    <div class="highlight-media highlight-art highlight-art--${escapeHtml(item.media.theme)}">
      <div class="highlight-icon-shell">${iconMap[item.media.icon] || ""}</div>
      <p>${escapeHtml(item.media.label)}</p>
      <span>${escapeHtml(item.media.note)}</span>
    </div>
  `;
}

function renderHighlights() {
  renderMarkup(
    "#highlight-list",
    siteContent.highlights
      .map(
        (item) => `
          <article class="highlight-card ${item.featured ? "highlight-card--feature" : ""}" data-reveal>
            ${renderHighlightMedia(item)}
            <div class="highlight-body">
              <div class="highlight-topline">
                <span class="highlight-tag">${escapeHtml(item.tag)}</span>
              </div>
              <h3>${escapeHtml(item.title)}</h3>
              <p>${escapeHtml(item.summary)}</p>
              <ul class="metric-list">
                ${item.metrics.map((metric) => `<li>${escapeHtml(metric)}</li>`).join("")}
              </ul>
              <p class="highlight-note">${escapeHtml(item.note)}</p>
            </div>
          </article>
        `
      )
      .join("")
  );
}

function renderSkills() {
  renderMarkup(
    "#skill-group-list",
    siteContent.skills
      .map(
        (group) => `
          <article class="skill-card panel" data-reveal>
            <div class="skill-card-header">
              <div class="skill-icon">${iconMap[group.icon] || ""}</div>
              <div>
                <h3>${escapeHtml(group.title)}</h3>
              </div>
            </div>
            <p>${escapeHtml(group.summary)}</p>
            <div class="skill-list">
              ${group.items
                .map((item) => `<span class="skill-chip">${escapeHtml(item)}</span>`)
                .join("")}
            </div>
          </article>
        `
      )
      .join("")
  );
}

function renderWriting() {
  const { writing } = siteContent;

  renderMarkup(
    "#featured-note",
    `
      <div class="featured-note-media">
        <img
          src="${writing.featured.image.src}"
          alt="${escapeHtml(writing.featured.image.alt)}"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div class="featured-content">
        <p class="card-label">${escapeHtml(writing.featured.label)}</p>
        <h3>${escapeHtml(writing.featured.title)}</h3>
        <p>${escapeHtml(writing.featured.summary)}</p>
        <div class="featured-meta">
          ${writing.featured.meta.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}
        </div>
      </div>
    `
  );

  renderMarkup(
    "#writing-topic-list",
    writing.topics.map((item) => `<li>${escapeHtml(item)}</li>`).join("")
  );

  renderMarkup(
    "#writing-list",
    writing.entries
      .map(
        (entry) => `
          <article class="note-card panel" data-reveal>
            <div class="note-topline">
              <span class="note-type">${escapeHtml(entry.type)}</span>
              <span class="note-status">${escapeHtml(entry.status)}</span>
            </div>
            <h4>${escapeHtml(entry.title)}</h4>
            <p>${escapeHtml(entry.body)}</p>
          </article>
        `
      )
      .join("")
  );
}

function renderResumeAndContact() {
  const { resume, contact } = siteContent;

  setText("#resume-summary", resume.summary);

  renderMarkup(
    "#resume-skill-list",
    resume.skillPills
      .map((item) => `<span class="resume-skill-pill">${escapeHtml(item)}</span>`)
      .join("")
  );

  renderMarkup(
    "#contact-links",
    contact.links
      .map(
        (link) => `
          <a class="link-card" href="${link.href}" ${linkAttributes(link)}>
            <span>${escapeHtml(link.label)}</span>
          </a>
        `
      )
      .join("")
  );

  setText("#footer-copy", contact.summary);

  renderMarkup(
    "#footer-actions",
    contact.footerActions
      .map((link) =>
        renderButton(
          link,
          link.style === "primary"
            ? "footer-button footer-button-primary"
            : "footer-button footer-button-secondary"
        )
      )
      .join("")
  );
}

function revealOnScroll() {
  const nodes = document.querySelectorAll("[data-reveal]");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion) {
    nodes.forEach((node) => node.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.14,
      rootMargin: "0px 0px -8% 0px"
    }
  );

  nodes.forEach((node) => observer.observe(node));
}

renderHero();
renderAbout();
renderJourney();
renderHighlights();
renderSkills();
renderWriting();
renderResumeAndContact();
revealOnScroll();
