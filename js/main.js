/* Interactions autonomes, sans tracking ni bibliothèque externe. */
(() => {
  'use strict';
  const get = id => document.getElementById(id);
  const config = window.ELIKYA_CONFIG || {};
  const year = get('year');
  if (year) year.textContent = String(new Date().getFullYear());

  // Navigation mobile
  const menuToggle = get('menu-toggle');
  const mobileNav = get('mobile-nav');
  function closeMenu() {
    if (!menuToggle || !mobileNav) return;
    mobileNav.hidden = true;
    menuToggle.setAttribute('aria-expanded','false');
    menuToggle.setAttribute('aria-label','Ouvrir le menu');
    document.body.classList.remove('menu-open');
  }
  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
      const open = mobileNav.hidden;
      mobileNav.hidden = !open;
      menuToggle.setAttribute('aria-expanded', String(open));
      menuToggle.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
      document.body.classList.toggle('menu-open', open);
    });
    mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', ev => { if (ev.key === 'Escape') closeMenu(); });
    window.addEventListener('resize', () => { if (window.innerWidth > 850) closeMenu(); });
  }

  // Micro-démo de la chaîne de détection. Démonstration illustrative, pas une analyse vidéo réelle.
  const demo = get('demo-button');
  const videoFrame = get('video-frame');
  const detectTitle = get('detection-title');
  const statusTitle = get('demo-status-title');
  const statusDetail = get('demo-status-detail');
  const timestamp = get('demo-timestamp');
  let demoTimer = null;
  let alertActive = false;
  if (demo && videoFrame && detectTitle && statusTitle && statusDetail) {
    demo.addEventListener('click', () => {
      window.clearTimeout(demoTimer);
      alertActive = !alertActive;
      videoFrame.classList.toggle('is-alert', alertActive);
      detectTitle.textContent = alertActive ? 'Situation inhabituelle simulée' : 'Analyse de la zone active';
      statusTitle.textContent = alertActive ? 'Alerte simulée générée' : 'Surveillance intelligente';
      statusDetail.textContent = alertActive ? 'Notification fictive : accès à vérifier.' : 'La caméra transmet un flux à l’analyse IA.';
      if (timestamp) timestamp.textContent = alertActive ? 'SIMULATION — ÉVÉNEMENT' : 'APERÇU CONCEPTUEL';
      demo.childNodes.forEach(node => {if (node.nodeType === Node.TEXT_NODE) node.textContent = alertActive ? 'Réinitialiser ' : 'Simuler une alerte '; });
      if (alertActive) {
        demoTimer = window.setTimeout(() => {
          alertActive = false;
          videoFrame.classList.remove('is-alert');
          detectTitle.textContent = 'Analyse de la zone active';
          statusTitle.textContent = 'Surveillance intelligente';
          statusDetail.textContent = 'La caméra transmet un flux à l’analyse IA.';
          if (timestamp) timestamp.textContent = 'APERÇU CONCEPTUEL';
          demo.childNodes.forEach(node => {if (node.nodeType === Node.TEXT_NODE) node.textContent = 'Simuler une alerte ';});
        }, 12000);
      }
    });
  }

  // Fiches interactives des domaines d'application.
  const sectors = {
    habitat: {
      icon: 'icon-house',
      title: 'Une maison sous une meilleure vigilance.',
      description: "Surveiller les accès d'une résidence et être averti d'une activité inhabituelle, sans rester continuellement devant les écrans.",
      items: ["Détection d’activité autour des accès", "Alertes contextualisées", "Consultation simplifiée des événements"]
    },
    entreprise: {
      icon: 'icon-building',
      title: 'Une surveillance qui accompagne votre activité.',
      description: 'Protéger les zones sensibles et faciliter la supervision des bâtiments, commerces et hôtels grâce à une analyse événementielle ciblée.',
      items: ['Contrôle des accès importants', 'Détection d’événements définis', 'Notifications aux personnes habilitées']
    },
    public: {
      icon: 'icon-globe',
      title: 'Des outils adaptés aux enjeux collectifs.',
      description: 'Étudier des solutions d’observation et d’alerte pour les institutions, dans le respect de la protection des données et des règles applicables.',
      items: ['Supervision de sites autorisés', 'Tableaux de bord opérationnels', 'Traitement responsable des images']
    }
  };
  const tabs = [...document.querySelectorAll('[role="tab"][data-sector]')];
  const sectorPanel = get('panel-sector');
  function selectSector(key, moveFocus = false) {
    const item = sectors[key];
    if (!item || !sectorPanel) return;
    tabs.forEach(tab => {
      const selected = tab.dataset.sector === key;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      if (selected && moveFocus) tab.focus();
      if (selected) sectorPanel.setAttribute('aria-labelledby', tab.id);
    });
    const icon = get('sector-icon');
    if (icon) {
      const use = icon.querySelector('use');
      if (use) use.setAttribute('href', '#' + item.icon);
    }
    get('sector-title').textContent = item.title;
    get('sector-description').textContent = item.description;
    const list = get('sector-list');
    if (list) {
      list.replaceChildren(...item.items.map(text => {
        const li = document.createElement('li');
        const svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
        const use = document.createElementNS('http://www.w3.org/2000/svg','use');
        use.setAttribute('href','#icon-check');
        svg.append(use);
        li.append(svg, document.createTextNode(text));
        return li;
      }));
    }
  }
  tabs.forEach((tab,index) => {
    tab.addEventListener('click', () => selectSector(tab.dataset.sector));
    tab.addEventListener('keydown', event => {
      if (!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home','End'].includes(event.key)) return;
      event.preventDefault();
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 :
        (index + (['ArrowRight','ArrowDown'].includes(event.key) ? 1 : -1) + tabs.length) % tabs.length;
      selectSector(tabs[next].dataset.sector, true);
    });
  });

  // Coordonnées : ne jamais afficher de liens fictifs.
  const sanitizeUrl = value => {
    const input = String(value || '').trim();
    if (!input) return '';
    try { const u = new URL(input); return (u.protocol === 'https:' || u.protocol === 'http:') ? u.href : ''; }
    catch { return ''; }
  };
  const email = typeof config.email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(config.email.trim()) ? config.email.trim() : '';
  const wa = String(config.whatsapp || '').replace(/\D/g,'').slice(0,18);
  const facebook = sanitizeUrl(config.facebook);
  const linkedin = sanitizeUrl(config.linkedin);
  const links = get('contact-links');
  function appendAnchor(container, label, href) {
    if (!container || !href) return;
    const a = document.createElement('a');
    a.textContent = label;
    a.href = href;
    if (/^https?:/.test(href)) {a.target = '_blank'; a.rel = 'noopener noreferrer';}
    container.append(a);
  }
  if (links) {
    appendAnchor(links,'Facebook — ELIKYA TECH',facebook);
    appendAnchor(links,'LinkedIn — ELIKYA TECH',linkedin);
    appendAnchor(links,'E-mail — ' + email, email ? 'mailto:' + email : '');
    appendAnchor(links,'WhatsApp — Discuter avec notre équipe',wa ? 'https://wa.me/' + wa : '');
    if (!links.children.length) {
      const p = document.createElement('p');
      p.textContent = 'Coordonnées officielles à venir. Vous pouvez préparer votre message avec le formulaire.';
      links.append(p);
    }
  }
  const footerSocial = get('footer-social');
  appendAnchor(footerSocial,'Facebook',facebook);
  appendAnchor(footerSocial,'LinkedIn',linkedin);
  appendAnchor(footerSocial,'WhatsApp',wa ? 'https://wa.me/' + wa : '');

  // Formulaire local : aucun envoi réseau ni stockage.
  const form = get('contact-form');
  if (form) {
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const name = get('contact-name').value.trim().slice(0,80);
      const reply = get('contact-email').value.trim().slice(0,150);
      const interest = get('contact-interest').value;
      const message = get('contact-message').value.trim().slice(0,1600);
      if (!name || !message) return;
      const body = `Bonjour ELIKYA TECH,\n\n${message}\n\nObjet : ${interest}\nNom : ${name}\nE-mail de réponse : ${reply}`;
      get('prepared-message').value = body;
      get('message-result').hidden = false;
      const sendEmail = get('send-email');
      const sendWhatsApp = get('send-whatsapp');
      if (sendEmail) {
        sendEmail.hidden = !email;
        if (email) sendEmail.href = `mailto:${email}?subject=${encodeURIComponent('ELIKYA TECH — '+interest)}&body=${encodeURIComponent(body)}`;
      }
      if (sendWhatsApp) {
        sendWhatsApp.hidden = !wa;
        if (wa) { sendWhatsApp.href = `https://wa.me/${wa}?text=${encodeURIComponent(body)}`; sendWhatsApp.target = '_blank'; sendWhatsApp.rel = 'noopener noreferrer';}
      }
      get('message-result').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'nearest'});
    });
  }
  const copy = get('copy-message');
  if (copy) copy.addEventListener('click', async () => {
    const box = get('prepared-message');
    try {
      if (!navigator.clipboard || !window.isSecureContext) throw new Error('manual');
      await navigator.clipboard.writeText(box.value);
      copy.textContent = 'Message copié ✓';
      window.setTimeout(() => { copy.textContent = 'Copier le message'; }, 2600);
    } catch {
      box.focus(); box.select();
      get('message-result-info').textContent = 'Sélectionnez et copiez le texte (Ctrl+C ou Copier sur mobile).';
    }
  });
})();
