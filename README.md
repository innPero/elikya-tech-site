# ELIKYA TECH — Site vitrine

Site statique HTML, CSS et JavaScript, sans framework, sans compilation et sans clé API.

## Structure

- `index.html` : page d'accueil et contenu
- `css/style.css` : design et responsive
- `js/main.js` : navigation, simulation, onglets, formulaire local
- `js/config.js` : coordonnées à renseigner
- `assets/` : logo officiel ELIKYA TECH et photos de l'équipe
- `.nojekyll` : compatibilité GitHub Pages

## Mettre en ligne sur GitHub Pages

1. Sur GitHub, créez un dépôt public appelé `elikya-tech-site` (ou un autre nom de votre choix).
2. Envoyez **tout le contenu** de ce dossier à la racine du dépôt, y compris `index.html`, `css/`, `js/` et `assets/`.
3. Dans le dépôt, ouvrez **Settings → Pages → Build and deployment**.
4. Choisissez **Deploy from a branch**, puis `main` et `/ (root)`, et enregistrez.
5. Attendez le déploiement puis ouvrez `https://VOTRE-PSEUDO.github.io/elikya-tech-site/`.

Le site utilise des chemins relatifs ; il fonctionne à la racine d'un dépôt GitHub Pages.

## Personnalisation

Dans `js/config.js`, renseignez les liens officiels Facebook, LinkedIn, l'adresse e-mail et le numéro WhatsApp.
Les coordonnées laissées vides ne s'affichent pas : aucun lien fictif.

Modifiez les noms et fonctions de l'équipe dans `index.html` lorsque ceux-ci sont confirmés.

## À savoir

- Le bouton **Simuler une alerte** lance seulement une simulation visuelle. Il n'utilise pas de caméra réelle.
- Les capacités du produit sont présentées comme un projet en cours de développement ; le site ne promet pas d'intégration opérationnelle garantie.
- Le formulaire prépare le texte du message côté navigateur et ne transmet **aucune donnée à un serveur**.
- La copie fonctionne en HTTPS. Si elle n'est pas disponible, le texte est sélectionné pour copie manuelle.
- Le site ne nécessite aucune installation, base de données, service tiers ou bibliothèque.
