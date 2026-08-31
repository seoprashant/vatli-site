/* Vatli marketing site — mobile nav + floating WhatsApp widget.
 *
 * Both are injected here rather than pasted into six static pages, so
 * the number, the greeting, and the markup have exactly one home.
 * No dependencies, no build step — matching the rest of this site. */
(function () {
  'use strict';

  var WA_NUMBER = '919508076440'; // +91 95080 76440
  var WA_PREFILL =
    "Hi Vatli! I'd like to know more about running my business on WhatsApp.";

  // Inlined so the widget renders even if an icon font or CDN fails.
  var WA_GLYPH =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.15.16-.29.18-.54.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.44.13-.15.17-.25.25-.41.09-.17.04-.31-.02-.44-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.47c-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.02 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.14-1.18-.06-.11-.22-.17-.47-.29Z"/></svg>';

  /* ---------------- mobile nav ---------------- */
  function mobileNav() {
    var header = document.querySelector('header');
    var nav = header && header.querySelector('.nav');
    var links = nav && nav.querySelector('.links');
    if (!header || !nav || !links) return;

    var toggle = document.createElement('button');
    toggle.className = 'navtoggle';
    toggle.setAttribute('aria-label', 'Open menu');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.innerHTML = '<i></i><i></i><i></i>';

    var panel = document.createElement('div');
    panel.className = 'mobnav';
    // Reuse the page's own nav links so this never drifts from the
    // desktop menu, then append the CTA the header shows separately.
    panel.innerHTML =
      links.innerHTML +
      '<a class="btn btn-primary" href="https://app.vatli.co/login">Start Free Trial</a>';

    nav.appendChild(toggle);
    header.appendChild(panel);

    function close() {
      panel.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open menu');
    }

    toggle.addEventListener('click', function () {
      var open = panel.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });

    // Tapping a link navigates (often to an in-page anchor, which
    // wouldn't reload) — close so the panel doesn't cover the target.
    panel.addEventListener('click', function (e) {
      if (e.target.closest('a')) close();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') close();
    });
  }

  /* ---------------- WhatsApp widget ---------------- */
  function whatsappWidget() {
    var href =
      'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(WA_PREFILL);

    var now = new Date();
    var time = now.toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit',
    });

    var w = document.createElement('div');
    w.className = 'wa-w';
    w.innerHTML =
      '<div class="wa-panel" hidden>' +
      '<div class="wa-head">' +
      '<span class="wa-av">' + WA_GLYPH + '</span>' +
      '<span class="wa-who"><span class="wa-name">Vatli Support</span>' +
      '<span class="wa-status"><i></i> Typically replies in a few minutes</span></span>' +
      '<button class="wa-x" aria-label="Close chat">&times;</button>' +
      '</div>' +
      '<div class="wa-body">' +
      '<div class="wa-bubble">Hi there! 👋<br>Questions about <b>pricing</b>, ' +
      'getting your number connected, or what Vatli can automate for you? ' +
      'Message us here — a real person replies.</div>' +
      '<div class="wa-time">' + time + '</div>' +
      '</div>' +
      '<div class="wa-foot">' +
      '<a class="wa-cta" href="' + href + '" target="_blank" rel="noopener">' +
      WA_GLYPH + 'Start chat on WhatsApp</a>' +
      '<div class="wa-note">Opens WhatsApp · we never send marketing spam</div>' +
      '</div>' +
      '</div>' +
      '<button class="wa-fab" aria-label="Chat with us on WhatsApp" aria-expanded="false">' +
      WA_GLYPH +
      '</button>';

    document.body.appendChild(w);

    var fab = w.querySelector('.wa-fab');
    var panel = w.querySelector('.wa-panel');
    var closeBtn = w.querySelector('.wa-x');

    function setOpen(open) {
      panel.hidden = !open;
      fab.setAttribute('aria-expanded', open ? 'true' : 'false');
    }

    fab.addEventListener('click', function () {
      setOpen(panel.hidden);
    });
    closeBtn.addEventListener('click', function () {
      setOpen(false);
      fab.focus();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !panel.hidden) {
        setOpen(false);
        fab.focus();
      }
    });
    // Clicking anywhere else dismisses it, so the panel never sits on
    // top of the page content the visitor was trying to read.
    document.addEventListener('click', function (e) {
      if (!panel.hidden && !w.contains(e.target)) setOpen(false);
    });
  }

  /* ---------------- FAQ accordion ---------------- */
  function faqAccordion() {
    var items = document.querySelectorAll('.faq .qa');
    if (!items.length) return;
    items.forEach(function (qa) {
      var h = qa.querySelector('h4');
      var p = qa.querySelector('p');
      if (!h || !p) return;
      qa.classList.add('acc');
      h.setAttribute('tabindex', '0');
      h.setAttribute('role', 'button');
      h.setAttribute('aria-expanded', 'false');
      function toggle() {
        var open = qa.classList.toggle('open');
        h.setAttribute('aria-expanded', open ? 'true' : 'false');
      }
      h.addEventListener('click', toggle);
      h.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggle();
        }
      });
    });
  }

  function init() {
    mobileNav();
    whatsappWidget();
    faqAccordion();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
