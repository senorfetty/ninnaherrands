(function () {
  'use strict';

  const WHATSAPP_NUMBER = '254797563436';

  // Mobile nav toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
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

      try {
        await navigator.clipboard.writeText(value);
        showToast(`${label} copied: ${value}`);
      } catch {
        const textarea = document.createElement('textarea');
        textarea.value = value;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast(`${label} copied: ${value}`);
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
})();
