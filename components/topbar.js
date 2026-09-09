/**
 * Topbar — CC Design System
 * Injects the topbar header into any page that includes this script.
 * Replaces any <div data-include="../shell/topbar.html"> elements.
 */
(function () {
  'use strict';

  var HTML = '<header class="topbar">'
    + '<div class="topbar__greeting">Good afternoon, User!</div>'
    + '<div class="topbar__actions">'
    + '<svg width="18" height="18" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" aria-hidden="true"><path d="M12 2a4 4 0 00-4 4v3.5L6 12v2h12v-2l-2-2.5V6a4 4 0 00-4-4z"/><path d="M10 18a2 2 0 004 0"/></svg>'
    + '<div class="avatar">S</div>'
    + '</div>'
    + '</header>';

  function init() {
    // Replace data-include placeholders if the include loader hasn't run
    var includes = document.querySelectorAll('[data-include*="topbar"]');
    includes.forEach(function (el) {
      var wrapper = document.createElement('div');
      wrapper.innerHTML = HTML;
      el.parentNode.replaceChild(wrapper.firstChild, el);
    });

    // If no placeholder found, inject before first element of .main
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
