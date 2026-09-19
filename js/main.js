(function () {
  'use strict';

  const WHATSAPP_NUMBER = '254797563436';

  // Site Loader
  const siteLoader = document.getElementById('site-loader');
  if (siteLoader) {
    const hideLoader = () => {
      siteLoader.classList.add('hidden');
      siteLoader.setAttribute('aria-hidden', 'true');
      setTimeout(() => {
        siteLoader.style.display = 'none';
      }, 550);
    };

    if (document.readyState === 'complete') {
      setTimeout(hideLoader, 600);
    } else {
      window.addEventListener('load', () => setTimeout(hideLoader, 600));
      // Fallback in case external resources delay
      setTimeout(hideLoader, 2000);
    }
  }

  // Mobile nav drawer & backdrop
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navClose = document.getElementById('nav-close');
  const navBackdrop = document.getElementById('nav-backdrop');

  function openNav() {
    if (!navLinks) return;
    navLinks.classList.add('open');
    if (navToggle) {
      navToggle.classList.add('open');
      navToggle.setAttribute('aria-expanded', 'true');
    }
    if (navBackdrop) {
      navBackdrop.classList.add('show');
      navBackdrop.setAttribute('aria-hidden', 'false');
    }
    document.body.classList.add('nav-open');
  }

  function closeNav() {
    if (!navLinks) return;
    navLinks.classList.remove('open');
    if (navToggle) {
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
    if (navBackdrop) {
      navBackdrop.classList.remove('show');
      navBackdrop.setAttribute('aria-hidden', 'true');
    }
    document.body.classList.remove('nav-open');
  }

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      if (navLinks.classList.contains('open')) {
        closeNav();
      } else {
        openNav();
      }
    });

    if (navClose) {
      navClose.addEventListener('click', closeNav);
    }

    if (navBackdrop) {
      navBackdrop.addEventListener('click', closeNav);
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) {
        closeNav();
      }
    });

    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeNav);
    });
  }

  // Copy to clipboard
  const toast = document.getElementById('toast');

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
  }

  document.querySelectorAll('.btn-copy').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const value = btn.dataset.copy;
      const label = btn.dataset.label || 'Number';
      const originalHTML = btn.innerHTML;

      const triggerCopiedState = () => {
        btn.innerHTML = '✓ Copied!';
        btn.style.borderColor = '#10b981';
        btn.style.color = '#34d399';
        setTimeout(() => {
          btn.innerHTML = originalHTML;
          btn.style.borderColor = '';
          btn.style.color = '';
        }, 2000);
      };

      try {
        await navigator.clipboard.writeText(value);
        showToast(`${label} copied: ${value}`);
        triggerCopiedState();
      } catch {
        const textarea = document.createElement('textarea');
        textarea.value = value;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast(`${label} copied: ${value}`);
        triggerCopiedState();
      }
    });
  });

  // Book form → WhatsApp
  const bookForm = document.getElementById('book-form');

  if (bookForm) {
    bookForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(bookForm);
      const name = formData.get('name');
      const phone = formData.get('phone');
      const service = formData.get('service');
      const details = formData.get('details');

      const message = [
        `Hi Ninnah! I'd like to request a service.`,
        ``,
        `Name: ${name}`,
        `Phone: ${phone}`,
        `Service: ${service}`,
        `Details: ${details}`,
      ].join('\n');

      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
      window.open(url, '_blank', 'noopener');
    });
  }

  // Header shadow on scroll
  const header = document.querySelector('.site-header');

  window.addEventListener('scroll', () => {
    if (!header) return;
    header.style.boxShadow = window.scrollY > 50
      ? '0 4px 24px rgba(0,0,0,0.3)'
      : 'none';
  });

  // Dynamic footer year
  var year = new Date().getFullYear();
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = year;
  }
})();
