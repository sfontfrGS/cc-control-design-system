/**
 * Design System — shared interactions
 * Handles: HTML includes (data-include), nav rail, tabs, toggle switches, modals, kebab menus
 *
 * IMPORTANT: fetch() requires an HTTP server. Open files via:
 *   npx serve "/path/to/Design System"
 *   or VS Code Live Server extension
 *   or GitHub Pages (hosted)
 *
 * On file:// protocol, includes are skipped and a warning banner is shown.
 */

(async function () {

  /* ── 0. file:// guard ──────────────────────────────────────────────── */
  if (location.protocol === 'file:') {
    const warn = document.createElement('div');
    warn.style.cssText = 'position:fixed;bottom:0;left:0;right:0;background:#fffaeb;border-top:2px solid #ffd45c;padding:10px 16px;font-size:13px;font-family:sans-serif;z-index:9999;color:#a04406;';
    warn.innerHTML = '<strong>Design System:</strong> HTML includes require a local HTTP server. Run <code style="background:#fff3cd;padding:1px 5px;border-radius:3px;">npx serve .</code> from the Design System folder, or use VS Code Live Server.';
    document.body.appendChild(warn);
    return;
  }

  /* ── 1. HTML includes (data-include="path/to/fragment.html") ──────── */
  const includePlaceholders = document.querySelectorAll('[data-include]');
  await Promise.all(Array.from(includePlaceholders).map(async el => {
    const url = el.dataset.include;
    try {
      const html = await fetch(url).then(r => {
        if (!r.ok) throw new Error(r.status);
        return r.text();
      });
      const tmp = document.createElement('div');
      tmp.innerHTML = html;
      el.replaceWith(...tmp.childNodes);
    } catch (err) {
      console.warn('[design-system] include failed:', url, err);
    }
  }));

  /* ── 2. Rail active state — set via data-active-item on <body> ─────── */
  const activeItem = document.body.dataset.activeItem;
  if (activeItem) {
    const match = document.querySelector(`.icon-rail__item[title="${activeItem}"]`);
    if (match) match.classList.add('active');
  }

  /* ── 3. Rail click → toggle nav panel ─────────────────────────────── */
  document.querySelectorAll('.icon-rail__item').forEach(item => {
    if (item === item.closest('.icon-rail__logo')) return; // skip logo
    item.addEventListener('click', () => {
      const wasActive = item.classList.contains('active');
      document.querySelectorAll('.icon-rail__item').forEach(i => i.classList.remove('active'));
      const panel = document.querySelector('.nav-panel');
      if (panel) {
        if (wasActive) {
          panel.classList.toggle('is-hidden');
        } else {
          item.classList.add('active');
          panel.classList.remove('is-hidden');
        }
      } else {
        if (!wasActive) item.classList.add('active');
      }
    });
  });

  /* ── 4. Tab switching ──────────────────────────────────────────────── */
  document.addEventListener('click', e => {
    const tab = e.target.closest('.tab');
    if (!tab) return;
    const tabsEl = tab.closest('.tabs');
    if (!tabsEl) return;
    tabsEl.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const targetId = tab.dataset.target;
    if (targetId) {
      document.querySelectorAll('.tab-panel').forEach(p => { p.hidden = true; });
      const panel = document.getElementById(targetId);
      if (panel) panel.hidden = false;
    }
  });

  /* ── 5. Toggle switch ──────────────────────────────────────────────── */
  document.addEventListener('click', e => {
    const sw = e.target.closest('.switch');
    if (!sw) return;
    const isOn = sw.classList.contains('is-on');
    sw.classList.toggle('is-on', !isOn);
    sw.classList.toggle('is-off', isOn);
  });

  /* ── 6. Modal open / close ─────────────────────────────────────────── */
  document.addEventListener('click', e => {
    // Open
    const openTrigger = e.target.closest('[data-modal-open]');
    if (openTrigger) {
      const overlay = document.getElementById(openTrigger.dataset.modalOpen);
      if (overlay) overlay.removeAttribute('hidden');
      return;
    }
    // Close via X button or data-modal-close
    const closeTrigger = e.target.closest('[data-modal-close], .modal__close');
    if (closeTrigger) {
      const overlay = closeTrigger.closest('.modal-overlay');
      if (overlay) overlay.setAttribute('hidden', '');
      return;
    }
    // Click on overlay backdrop (not modal itself)
    if (e.target.classList.contains('modal-overlay')) {
      e.target.setAttribute('hidden', '');
    }
  });

  /* ── 7. Kebab / dropdown menus ─────────────────────────────────────── */
  document.addEventListener('click', e => {
    const trigger = e.target.closest('.kebab-menu__trigger');
    if (trigger) {
      e.stopPropagation();
      const menu = trigger.closest('.kebab-menu');
      const list = menu?.querySelector('.kebab-menu__list');
      if (!list) return;
      const isOpen = list.classList.contains('is-open');
      // close all first
      document.querySelectorAll('.kebab-menu__list.is-open').forEach(m => m.classList.remove('is-open'));
      if (!isOpen) list.classList.add('is-open');
      return;
    }
    // outside click closes all
    document.querySelectorAll('.kebab-menu__list.is-open').forEach(m => m.classList.remove('is-open'));
  });

})();
