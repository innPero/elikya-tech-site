'use strict';

// La navigation utilise de vrais fichiers HTML et un menu details natif.
const mobileMenu = document.querySelector('.mobile-menu');
if (mobileMenu) {
  document.addEventListener('click', (event) => {
    if (!mobileMenu.contains(event.target)) mobileMenu.open = false;
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && mobileMenu.open) {
      mobileMenu.open = false;
      mobileMenu.querySelector('summary').focus();
    }
  });
}

// Préparation locale : aucun envoi, aucune collecte, aucun stockage.
const form = document.getElementById('message-form');
if (form) {
  const result = document.getElementById('message-result');
  const prepared = document.getElementById('ready-message');
  const status = document.getElementById('copy-status');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const name = form.elements.name.value.trim();
    const subject = form.elements.subject.value;
    const message = form.elements.message.value.trim();
    if (!name || !message) return;
    prepared.value = `Bonjour ELIKYA TECH,\n\nJe vous contacte pour : ${subject.toLowerCase()}.\n\n${message}\n\n${name}`;
    result.hidden = false;
    status.textContent = 'Copiez ce message, puis envoyez-le à notre page Facebook.';
    result.scrollIntoView({ behavior: 'auto', block: 'nearest' });
  });
  document.getElementById('copy-message').addEventListener('click', async () => {
    try {
      if (!window.isSecureContext || !navigator.clipboard) throw new Error('manual-copy');
      await navigator.clipboard.writeText(prepared.value);
      status.textContent = 'Message copié. Vous pouvez le coller dans Facebook.';
    } catch {
      prepared.focus();
      prepared.select();
      status.textContent = 'Le message est sélectionné. Utilisez Copier sur votre appareil.';
    }
  });
}
