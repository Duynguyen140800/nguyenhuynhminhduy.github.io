/* Progressive enhancement: the full English portfolio works without JavaScript. */
(() => {
  'use strict';
  const root = document.documentElement;
  const text = window.PORTFOLIO_TEXT;
  if (!text) return;
  root.classList.add('js');
  const nav = document.querySelector('.site-nav');
  const menu = document.querySelector('.menu-toggle');
  const languageButtons = [...document.querySelectorAll('[data-language]')];
  const copyButton = document.querySelector('.copy-email');
  const copyStatus = document.querySelector('.copy-status');
  const email = 'minhduyajt@gmail.com';
  let language = 'en';
  let copyReset;

  // The one-file preview uses local PDF blobs; the hosted site uses PDF files.
  if (window.PORTFOLIO_CV) {
    try {
      const localPdfs = {};
      Object.entries(window.PORTFOLIO_CV).forEach(([key, uri]) => {
        const decoded = atob(uri.split(',')[1]);
        const bytes = Uint8Array.from(decoded, character => character.charCodeAt(0));
        localPdfs[key] = URL.createObjectURL(new Blob([bytes], { type: 'application/pdf' }));
      });
      window.PORTFOLIO_CV = localPdfs;
      document.querySelectorAll('a[data-cv-language]').forEach(link => {
        link.href = localPdfs[link.dataset.cvLanguage];
      });
    } catch (_) { /* The original data links remain a usable fallback. */ }
  }

  function closeMenu(returnFocus = false) {
    nav.classList.remove('is-open');
    menu.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-label', text[language].menuOpen);
    if (returnFocus) menu.focus();
  }

  function setLanguage(next, remember = true) {
    if (!text[next]) next = 'en';
    language = next;
    root.lang = next;
    document.title = text[next].pageTitle;
    document.querySelector('meta[name="description"]').content = text[next].pageDescription;
    document.querySelector('meta[property="og:title"]').content = text[next].pageTitle;
    document.querySelector('meta[property="og:description"]').content = text[next].pageDescription;
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const value = text[next][element.dataset.i18n];
      if (typeof value === 'string') element.textContent = value;
    });
    document.querySelectorAll('[data-i18n-alt]').forEach(element => {
      element.alt = text[next][element.dataset.i18nAlt];
    });
    languageButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.language === next)));
    nav.setAttribute('aria-label', text[next].navLabel);
    document.querySelector('.language-switch').setAttribute('aria-label', text[next].languageLabel);
    menu.setAttribute('aria-label', menu.getAttribute('aria-expanded') === 'true' ? text[next].menuClose : text[next].menuOpen);
    document.querySelectorAll('.resume-link').forEach(link => {
      link.href = window.PORTFOLIO_CV ? window.PORTFOLIO_CV[next] : `assets/documents/minh-duy-resume-${next}.pdf?v=20261002-cv3`;
      link.download = `minh-duy-resume-${next}.pdf`;
      link.dataset.cvLanguage = next;
    });
    copyStatus.textContent = '';
    clearTimeout(copyReset);
    if (remember) {
      try { localStorage.setItem('minh-duy-portfolio-language', next); } catch (_) { /* Device preferences can be unavailable. */ }
    }
  }

  let saved;
  try { saved = localStorage.getItem('minh-duy-portfolio-language'); } catch (_) {}
  setLanguage(saved === 'vi' ? 'vi' : 'en', false);
  languageButtons.forEach(button => button.addEventListener('click', () => setLanguage(button.dataset.language)));
  menu.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    nav.classList.toggle('is-open', open);
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? text[language].menuClose : text[language].menuOpen);
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    closeMenu();
    const target = document.querySelector(link.hash);
    const heading = target && target.querySelector('h2');
    if (heading) {
      heading.tabIndex = -1;
      requestAnimationFrame(() => heading.focus({ preventScroll: true }));
    }
  }));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') closeMenu(true);
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('.site-header') && menu.getAttribute('aria-expanded') === 'true') closeMenu();
  });
  const mobileWidth = matchMedia('(max-width: 900px)');
  mobileWidth.addEventListener('change', () => closeMenu());

  copyButton.addEventListener('click', async () => {
    let copied = false;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(email);
        copied = true;
      } else {
        const field = document.createElement('textarea');
        field.value = email;
        field.style.cssText = 'position:fixed;left:-9999px;top:0';
        document.body.append(field);
        field.select();
        copied = document.execCommand('copy');
        field.remove();
        copyButton.focus();
      }
    } catch (_) { copied = false; }
    copyStatus.textContent = copied ? text[language].copySuccess : text[language].copyFallback;
    clearTimeout(copyReset);
    copyReset = setTimeout(() => { copyStatus.textContent = ''; }, 6500);
  });

  document.querySelector('#current-year').textContent = new Date().getFullYear();
  // Keyboard users should never focus content while it is visually hidden.
  document.addEventListener('focusin', event => {
    const reveal = event.target.closest('.reveal');
    if (reveal) {
      reveal.classList.remove('is-pending');
      reveal.classList.add('is-visible');
    }
  });
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  if ('IntersectionObserver' in window) {
    const reveals = [...document.querySelectorAll('.reveal')];
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('is-pending');
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.07, rootMargin: '0px 0px -24px 0px' });
    if (!reducedMotion.matches) {
      reveals.forEach(element => {
        if (element.getBoundingClientRect().top > window.innerHeight - 32) {
          element.classList.add('is-pending');
          observer.observe(element);
        }
      });
    }
    reducedMotion.addEventListener('change', () => {
      if (reducedMotion.matches) {
        observer.disconnect();
        reveals.forEach(element => element.classList.remove('is-pending'));
      }
    });
    const sectionLinks = [...nav.querySelectorAll('a')];
    const sections = sectionLinks.map(link => document.querySelector(link.hash));
    const trackSection = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          sectionLinks.forEach(link => {
            if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
            else link.removeAttribute('aria-current');
          });
        }
      });
    }, { rootMargin: '-12% 0px -70% 0px', threshold: 0 });
    sections.forEach(section => { if (section) trackSection.observe(section); });
  }
})();

