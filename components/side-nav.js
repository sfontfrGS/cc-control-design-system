/**
 * Side Navigation — CC Design System
 * Usage: add <script src="../components/side-nav.js"></script> to any page.
 * Set active section via:  <body data-section="users">
 * Set active item via:     <body data-section="users" data-active-item="Users Overview">
 *
 * The script removes any existing .icon-rail + .nav-panel and injects the
 * unified .side-nav component at the start of <body>.
 */
(function () {
  'use strict';

  /* ── Section data ───────────────────────────────────────────── */
  var SECTIONS = [
    { key: 'create',        label: 'Create',        icon: 'plus-circle',    groups: [{ items: ['New Article','New Events','New Product Updates','New Conversation','New Question'] }] },
    { key: 'home',          label: 'Home',          icon: 'home',           groups: [] },
    { key: 'content',       label: 'Content',       icon: 'file-text',      groups: [
        { heading: 'Moderation',    items: ['Overview','Pending','Reported','Spam (0)','Trash Can'] },
        { heading: 'Content Types', items: ['Articles','Drafts','Ideas','Events','Product Updates'] }
    ]},
    { key: 'email',         label: 'Email',         icon: 'mail',           groups: [{ items: ['Email Campaigns','System Emails'] }] },
    { key: 'users',         label: 'Users',         icon: 'users',          groups: [{ items: ['Users Overview','Segments'] }] },
    { key: 'analytics',     label: 'Analytics',     icon: 'bar-chart',      groups: [
        { heading: 'Dashboards', items: ['Content','User','Q&A','Audience','Engagement','Self-service','Product Feedback'] },
        { heading: 'Export',     items: ['Content','User','Q&A','Audience','Engagement','Self-service','Product Feedback'] }
    ]},
    { key: 'platform',      label: 'Platform',      icon: 'grid',           groups: [{ items: ['Knowledge Base','Community','Ideation','Groups','Events','Product Updates','Custom Pages'] }] },
    { key: 'gamification',  label: 'Gamification',  icon: 'gamepad',        groups: [{ items: ['Ranks','Badges','Point System'] }] },
    { key: 'customization', label: 'Customization', icon: 'pen-tool',       groups: [{ items: ['Header','Footer','Sidebar','Phrases','Third-party Scripts','Self-service'] }] },
    { key: 'integrations',  label: 'Integrations',  icon: 'git-merge',      groups: [
        { heading: 'Integrations',      items: ['Apps','API'] },
        { heading: 'SSO',               items: ['End Users','Control Users','Content Configuration'] },
        { heading: 'Embeddable Widget', items: ['Setup','Customization','Content Configuration','Installation'] },
        { heading: 'Developer Studio',  items: ['Sources','Connectors','Secrets and Variables','CLI Access'] }
    ]},
    { key: 'ai',            label: 'AI',            icon: 'sparkles',       groups: [{ items: ['AI Settings','Moderation AI Agent','AI Answers for Search','AI Translations'] }] },
    { key: 'settings',      label: 'Settings',      icon: 'settings',       groups: [
        { heading: 'Super Admin', items: ['Modules','Community Information','Destination URL','Advanced Configurations','AI Playground','Unified Login','Platform Sources','Hub Connection'] },
        { heading: 'Super Admin', items: ['Event Types','Event Settings','Ideation Status','Bug Status','Product Areas','Languages','Platform Visibility','Open Betas','AI'] },
        { heading: 'User',        items: ['User Roles','User Profile Fields','Registration Rules','Attachment Permissions'] },
        { heading: 'Topic',       items: ['Public Tags','Content Helpfulness','Moderation Labels','Post Fields'] },
        { heading: 'Moderation',  items: ['Automation Rules','Pre-moderation Rules','Moderation Notifications','Spam Prevention','Webmaster Email'] },
        { heading: 'SEO',         items: ['Robots.txt'] }
    ]}
  ];

  /* ── SVG icons ──────────────────────────────────────────────── */
  function icon(name) {
    var icons = {
      'plus-circle': '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>',
      'home':        '<path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
      'file-text':   '<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>',
      'mail':        '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>',
      'users':       '<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>',
      'bar-chart':   '<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/>',
      'grid':        '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>',
      'gamepad':     '<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/>',
      'pen-tool':    '<path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/>',
      'git-merge':   '<circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M13 6h3a2 2 0 012 2v7"/><line x1="6" y1="9" x2="6" y2="21"/>',
      'sparkles':    '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
      'settings':    '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/>'
    };
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (icons[name] || '') + '</svg>';
  }

  /* ── Build HTML ─────────────────────────────────────────────── */
  function buildHTML(activeSection, activeItem) {
    var rail = '<nav class="side-nav__rail" aria-label="Main navigation">'
      + '<div class="side-nav__logo" title="Customer Communities">'
      + '<svg viewBox="0 0 28 16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">'
      + '<text x="0" y="13" font-family="sans-serif" font-size="14" font-weight="700" fill="#E91E8C">CC</text>'
      + '</svg></div>';

    SECTIONS.forEach(function (s) {
      var isActive = s.key === activeSection;
      rail += '<button class="side-nav__icon-btn' + (isActive ? ' active' : '') + '" data-section="' + s.key + '" title="' + s.label + '" aria-label="' + s.label + '">'
            + icon(s.icon)
            + '</button>';
    });
    rail += '</nav>';

    var drawer = '<div class="side-nav__drawer"><div class="side-nav__drawer-inner">';
    SECTIONS.forEach(function (s) {
      var isActive = s.key === activeSection;
      if (s.groups.length === 0) {
        drawer += '<div class="side-nav__panel' + (isActive ? ' active' : '') + '" data-panel="' + s.key + '">'
                + '<h2 class="side-nav__section-title">' + s.label + '</h2></div>';
        return;
      }
      drawer += '<div class="side-nav__panel' + (isActive ? ' active' : '') + '" data-panel="' + s.key + '">'
              + '<h2 class="side-nav__section-title">' + s.label + '</h2>';
      s.groups.forEach(function (g) {
        drawer += '<div class="side-nav__group">';
        if (g.heading) drawer += '<div class="side-nav__group-heading">' + g.heading + '</div>';
        drawer += '<div class="side-nav__group-items">';
        g.items.forEach(function (item) {
          var ia = item === activeItem;
          drawer += '<button class="side-nav__item' + (ia ? ' active' : '') + '" data-item="' + item + '">' + item + '</button>';
        });
        drawer += '</div></div>';
      });
      drawer += '</div>';
    });
    drawer += '</div></div>';

    return '<div class="side-nav">' + rail + drawer + '</div>';
  }

  /* ── Inject CSS if not already linked ──────────────────────── */
  function ensureCSS() {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      if (links[i].href.indexOf('components.css') !== -1) return;
    }
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    var scriptSrc = (document.currentScript || {}).src || '';
    link.href = scriptSrc.replace('side-nav.js', 'components.css');
    document.head.appendChild(link);
  }

  /* ── Init ───────────────────────────────────────────────────── */
  function init() {
    ensureCSS();

    var body = document.body;
    var activeSection = body.getAttribute('data-section') || 'create';
    var activeItem    = body.getAttribute('data-active-item') || '';

    // Remove legacy nav elements if present
    var old = body.querySelectorAll('.icon-rail, .nav-panel');
    old.forEach(function (el) { el.parentNode.removeChild(el); });

    // Inject side nav as first child of body
    var wrapper = document.createElement('div');
    wrapper.innerHTML = buildHTML(activeSection, activeItem);
    body.insertBefore(wrapper.firstChild, body.firstChild);

    // Wire up interactions
    var sideNav = body.querySelector('.side-nav');

    sideNav.querySelector('.side-nav__rail').addEventListener('click', function (e) {
      var btn = e.target.closest('.side-nav__icon-btn');
      if (!btn) return;
      var key = btn.dataset.section;

      sideNav.querySelectorAll('.side-nav__icon-btn').forEach(function (b) {
        b.classList.toggle('active', b.dataset.section === key);
      });
      sideNav.querySelectorAll('.side-nav__panel').forEach(function (p) {
        p.classList.toggle('active', p.dataset.panel === key);
      });
      var drawerEl = sideNav.querySelector('.side-nav__drawer');
      drawerEl.style.display = key === 'home' ? 'none' : '';
    });

    sideNav.querySelector('.side-nav__drawer-inner').addEventListener('click', function (e) {
      var item = e.target.closest('.side-nav__item');
      if (!item) return;
      var panel = item.closest('.side-nav__panel');
      if (panel) panel.querySelectorAll('.side-nav__item').forEach(function (i) { i.classList.remove('active'); });
      item.classList.add('active');
    });

    // Hide drawer if starting on home
    if (activeSection === 'home') {
      var drawerEl = sideNav.querySelector('.side-nav__drawer');
      if (drawerEl) drawerEl.style.display = 'none';
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
