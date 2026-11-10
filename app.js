'use strict';

(() => {
  const projects = window.portfolioProjects || [];
  const art = window.projectArtwork || {};
  const grid = document.querySelector('#project-grid');
  const archive = document.querySelector('#project-archive');
  const dialog = document.querySelector('#project-dialog');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const safe = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const number = n => String(n + 1).padStart(2, '0');

  const observer = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {threshold: 0.07}) : null;

  function reveal() {
    if (!reducedMotion.matches && observer) {
      document.documentElement.classList.add('js-motion');
      document.querySelectorAll('.reveal:not(.visible)').forEach(el => observer.observe(el));
    } else document.documentElement.classList.remove('js-motion');
  }

  function renderProjects(filter = 'all') {
    const filtered = projects.filter(p => filter === 'all' || p.category === filter);
    grid.innerHTML = filtered.filter(p => p.featured).map(p => {
      const i = projects.indexOf(p);
      return `<article class="project-card reveal">
        <button class="project-open" data-project="${p.id}" aria-label="Read about ${safe(p.title)}">
          <div class="project-visual art-${p.id}"><span class="project-number">PROJECT / ${number(i)}</span>${art[p.id]}<span class="art-meta">CONCEPT / SYSTEM STUDY</span><span class="visual-link" aria-hidden="true">↗</span></div>
          <div class="project-info"><h3>${safe(p.title)}</h3><span class="project-type">${safe(p.categoryLabel.toUpperCase())}</span></div>
          <p class="project-summary">${safe(p.summary)}</p>
          <div class="project-tags">${p.tags.map(t => `<span>${safe(t)}</span>`).join('')}</div>
          <div class="project-outcome"><span>${safe(p.outcome)}</span><span aria-hidden="true">↗</span></div>
        </button>
      </article>`;
    }).join('');
    archive.innerHTML = filtered.filter(p => !p.featured).map(p => `<button class="archive-row reveal" data-project="${p.id}" aria-label="Read about ${safe(p.title)}"><span class="archive-index">${number(projects.indexOf(p))}</span><span class="archive-title">${safe(p.title)}</span><span class="archive-category">${safe(p.categoryLabel.toUpperCase())}</span><span class="archive-arrow" aria-hidden="true">↗</span></button>`).join('');
    document.querySelector('#project-count').textContent = `${filtered.length} PROJECTS`;
    document.querySelector('.archive-heading').hidden = !filtered.some(p => !p.featured);
    reveal();
    document.dispatchEvent(new Event('portfolio:projects'));
  }

  let lastTrigger = null;
  function openProject(id, trigger) {
    const project = projects.find(p => p.id === id);
    if (!project) return;
    lastTrigger = trigger;
    const imageId = art[id] ? id : project.category === 'ml' ? 'airis' : 'research';
    document.querySelector('#dialog-content').innerHTML = `${art[id] ? `<div class="dialog-visual art-${imageId}">${art[imageId]}</div>` : ''}
      <p class="dialog-category">${safe(project.categoryLabel)}</p>
      <h2 id="dialog-title" class="dialog-title">${safe(project.title)}</h2>
      <p class="dialog-description">${safe(project.summary)}</p>
      <h3 class="dialog-detail-heading">INSIDE THE PROJECT</h3>
      <ul class="dialog-details">${project.details.map(d => `<li>${safe(d)}</li>`).join('')}</ul>
      <div class="dialog-tags">${project.stack.map(t => `<span>${safe(t)}</span>`).join('')}</div>
      <div class="dialog-footer"><p>${safe(project.note)}</p>${project.github ? `<a class="button button-dark" href="${safe(project.github)}" target="_blank" rel="noopener noreferrer">View on GitHub <span aria-hidden="true">↗</span></a>` : '<a class="text-link" href="mailto:varshneynishant686@gmail.com">Ask me about this project ↗</a>'}</div>`;
    dialog.showModal();
    document.body.classList.add('modal-open');
    dialog.scrollTop = 0;
    dialog.querySelector('.dialog-close').focus({preventScroll:true});
  }

  document.addEventListener('click', event => {
    const trigger = event.target.closest('[data-project]');
    if (trigger) openProject(trigger.dataset.project, trigger);
  });
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    const rect = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('modal-open');
    lastTrigger?.focus({preventScroll:true});
  });
  document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach(b => {
      b.classList.toggle('active', b === button);
      b.setAttribute('aria-pressed', String(b === button));
    });
    renderProjects(button.dataset.filter);
  }));

  const menuButton = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('#mobile-nav');
  function closeMenu() { mobileNav.hidden = true; menuButton.setAttribute('aria-expanded', 'false'); }
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(open));
    mobileNav.hidden = !open;
  });
  mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
  document.addEventListener('click', event => { if (!event.target.closest('.site-header')) closeMenu(); });
  matchMedia('(min-width:761px)').addEventListener('change', closeMenu);

  const header = document.querySelector('.site-header');
  let scrollFrame = false;
  window.addEventListener('scroll', () => {
    if (!scrollFrame) requestAnimationFrame(() => {
      header.classList.toggle('scrolled', scrollY > 20);
      scrollFrame = false;
    });
    scrollFrame = true;
  }, {passive:true});

  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) document.querySelectorAll('.desktop-nav a').forEach(a => {
        if (a.hash === '#' + entry.target.id) a.setAttribute('aria-current', 'location');
        else a.removeAttribute('aria-current');
      });
    }), {rootMargin: '-15% 0px -65% 0px'});
    document.querySelectorAll('main section').forEach(section => sectionObserver.observe(section));
  }

  function updateTime() {
    document.querySelector('#delhi-time').textContent = new Intl.DateTimeFormat('en-GB', {timeZone:'Asia/Kolkata', hour:'2-digit', minute:'2-digit', hour12:false}).format(new Date()) + ' IST';
  }
  updateTime();
  setInterval(updateTime, 60000);
  document.querySelector('#year').textContent = new Intl.DateTimeFormat('en', {timeZone:'Asia/Kolkata', year:'numeric'}).format(new Date());

  let toastTimer;
  function toast(message) {
    const el = document.querySelector('#toast');
    el.textContent = message;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), 3500);
  }
  document.querySelector('.copy-email').addEventListener('click', async () => {
    const email = 'varshneynishant686@gmail.com';
    try {
      if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(email);
      else {
        const input = document.createElement('textarea');
        input.value = email;
        input.style.cssText = 'position:fixed;left:-9999px;top:0';
        document.body.append(input);
        input.select();
        const copied = document.execCommand('copy');
        input.remove();
        if (!copied) throw new Error('Clipboard unavailable');
      }
      toast('Email copied. Let’s make something happen.');
    } catch { toast('Select the email address to copy it, or click it to write to me.'); }
  });

  reducedMotion.addEventListener('change', reveal);
  renderProjects();
  reveal();
})();
