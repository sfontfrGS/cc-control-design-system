/**
 * Topbar — CC Design System
 * Injects the topbar header into any page. Replaces <div data-include="../shell/topbar.html">.
 * Spec: Figma node 14413-34642 — 48px, white bg, 1px #D5D9DE border-bottom, 40px padding.
 */
(function () {
  'use strict';

  var HTML = '<header class="topbar">'
    + '<div class="topbar__greeting">Good afternoon, User! ☀️</div>'
    + '<div class="topbar__actions">'
    // Community icon (network/nodes)
    + '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="18" cy="5" r="2"/><circle cx="6" cy="12" r="2"/><circle cx="18" cy="19" r="2"/><line x1="8" y1="11" x2="16" y2="6"/><line x1="8" y1="13" x2="16" y2="18"/></svg>'
    // Team overview icon (person + connections)
    + '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>'
    // Private message icon (chat bubble)
    + '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>'
    // Avatar circle
    + '<div class="avatar">S</div>'
    + '</div>'
    + '</header>';

  function init() {
    var includes = document.querySelectorAll('[data-include*="topbar"]');
    includes.forEach(function (el) {
      var wrapper = document.createElement('div');
      wrapper.innerHTML = HTML;
      el.parentNode.replaceChild(wrapper.firstChild, el);
    });

    if (!includes.length) {
      var main = document.querySelector('.main');
      if (main && !main.querySelector('.topbar')) {
        var wrapper = document.createElement('div');
        wrapper.innerHTML = HTML;
        main.insertBefore(wrapper.firstChild, main.firstChild);
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
