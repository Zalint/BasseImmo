# Basse Immo — site de construction de maisons au Sénégal

Site vitrine statique pour un atelier de conception et de construction de
maisons au Sénégal : catalogue de plans chiffrés, simulateur de budget en francs
CFA, guide pratique et espace de suivi de chantier destiné à la diaspora.

La direction artistique est celle d'un studio d'architecture : dessin technique
au trait, typographie large, aucune photographie.

Aucune dépendance, aucune étape de compilation, aucun serveur applicatif :
ce sont des fichiers HTML, CSS et JavaScript que l'on peut héberger tels quels.

---

## Lancer le site en local

```bash
# n'importe quel serveur statique fait l'affaire
npx http-server -p 8080 -c-1
# puis ouvrir http://localhost:8080
```

Ouvrir directement `index.html` avec le navigateur fonctionne aussi, mais un
serveur local reste plus fidèle au comportement réel.

## Mettre en ligne

Le dépôt est prêt pour GitHub Pages (le fichier `.nojekyll` est présent),
Netlify, Vercel, ou n'importe quel hébergement mutualisé : il suffit de déposer
le contenu du dossier à la racine du site.

---

## ⚠️ À personnaliser avant la mise en ligne

Tout ce qui suit est du contenu de démonstration. Il faut le remplacer.

| Quoi | Où |
|---|---|
| Téléphone, WhatsApp, e-mail, adresse, horaires, réseaux sociaux | `assets/js/data.js` → objet `BI.contact`, en haut du fichier |
| Nom de domaine (liens canoniques, sitemap, robots) | `robots.txt`, `sitemap.xml`, balises `<link rel="canonical">` et `og:url` des pages |
| Avis clients (noms et témoignages fictifs) | `assets/js/data.js` → `BI.avis`, et la section « Ce qu'en disent les propriétaires » dans `index.html` |
| Chiffres mis en avant (180 maisons, 9,4/10, etc.) | `index.html`, `a-propos.html`, `assets/js/data.js` → `BI.chiffres` |
| Chantiers de démonstration (codes `BI-2026-014` et `BI-2026-031`) | `assets/js/data.js` → `BI.chantiers` |
| Dessins des modèles et vignettes de chantier | `assets/img/plans/`, `assets/img/axo/`, `assets/img/chantier/` — les plans et axonométries sont des dessins génériques, à remplacer par les vôtres |
| Taux de change du dollar et du dollar canadien | `assets/js/data.js` → `BI.devises` (l'euro est fixe, arrimé au franc CFA) |
| Prix indicatifs des terrains et coûts au m² | `assets/js/data.js` → `BI.zones` et `BI.finitions` |

Le formulaire de contact n'envoie rien à un serveur : il compose un message
WhatsApp ou un e-mail déjà rédigé que le visiteur n'a plus qu'à envoyer. C'est
volontaire — cela évite d'avoir à héberger un back-end, et WhatsApp reste le
canal le plus utilisé au Sénégal. Pour un envoi direct, brancher un service
comme Formspree ou Netlify Forms dans `assets/js/contact.js`.

---

## Organisation des fichiers

```
index.html            accueil
modeles.html          catalogue filtrable
modele.html?id=…      fiche d'un modèle
simulateur.html       simulateur de budget complet
services.html         les six prestations
suivi.html            espace de suivi de chantier (démonstration)
guide.html            liste des guides pratiques
article.html?id=…     un article du guide
a-propos.html         présentation de l'entreprise
contact.html          formulaire et coordonnées
404.html              page d'erreur

assets/css/style.css  design system complet (jetons, composants, thème sombre)
assets/img/plans/     plans du rez-de-chaussée des 12 modèles (SVG)
assets/img/axo/       axonométries au trait des 12 modèles (SVG)
assets/img/chantier/  vignettes de chantier pour la démonstration du suivi
assets/js/
  icons.js            103 icônes SVG injectées dans la page
  data.js             TOUT le contenu éditorial et tous les chiffres
  moteur.js           calcul des budgets + fabrique des cartes de modèle
  app.js              thème, menu, accordéons, formats de montants
  home.js             accueil (estimation express, modèles, tableau des zones)
  modeles.js          filtres du catalogue
  modele.js           fiche modèle
  simulateur.js       simulateur complet
  suivi.js            espace de suivi
  article.js          affichage d'un article
  contact.js          formulaire
```

### Une seule source de vérité pour les chiffres

`assets/js/data.js` contient le contenu, `assets/js/moteur.js` contient le
calcul. Les budgets affichés dans le catalogue ne sont **pas** écrits en dur :
`BI.budgetModele()` les recalcule avec le même moteur que le simulateur. Un
modèle et le simulateur ne peuvent donc pas annoncer deux montants différents
pour un même projet.

Le calcul enchaîne : coût au m² du niveau de finition × coefficient du type de
construction × coefficient de la zone × surface, puis ajoute les options
forfaitaires. La répartition par poste et l'échéancier de paiement en découlent.

### Modifier le contenu

Ajouter un modèle, une zone, une option ou un article se fait uniquement dans
`data.js` : le reste du site se met à jour tout seul. Les seules duplications
volontaires sont l'en-tête et le pied de page, écrits en dur dans chaque page
pour que le site reste lisible sans JavaScript et correctement indexé.

---

## Direction artistique

Le parti pris est celui d'un atelier d'architecture : papier blanc cassé,
typographie large, dessin technique plutôt que photographie, filets d'un pixel
plutôt qu'ombres portées.

**Couleurs** — un papier blanc cassé en base, une encre presque noire, une
terre cuite en accent, et deux matières utilisées en bandeaux pleine largeur :
le sable et le brun profond. Chaque bandeau redéfinit localement ses rôles de
texte (`--ink-soft`, `--ink-mute`, `--hair`, `--accent`), si bien qu'un
composant posé dessus reste lisible sans règle dédiée.

**Thème sombre** — suit les réglages du système, avec un bouton de bascule
mémorisé dans le navigateur.

**Typographie** — Inter Tight pour les titres et le texte, IBM Plex Mono pour
les libellés, les cotes, les chiffres et les index de section. Ce couple
grotesque plus monospace est la langue des agences d'architecture, et il donne
au site sa lecture technique.

**Dessins** — pas de photographie. Chaque modèle est représenté par un plan du
rez-de-chaussée coté (murs, portes avec leur débattement, fenêtres, surfaces,
cotes, orientation) et par une axonométrie au trait. Les deux séries sont
générées et restent modifiables dans `assets/img/plans/` et `assets/img/axo/`.
Les emplacements sont prêts à recevoir de vraies photos le jour où vous en
aurez.

**Icônes** — 103 icônes SVG au trait, injectées en une fois par `icons.js`,
utilisées avec parcimonie. Aucune requête réseau, aucune bibliothèque externe.

**Accessibilité** — contrastes vérifiés au niveau AA sur toutes les pages et
dans les deux thèmes, hiérarchie de titres continue, champs de formulaire tous
étiquetés, navigation au clavier, lien d'évitement, et respect de
`prefers-reduced-motion`.

**Performance** — pas de framework, pas de bibliothèque, images en SVG
(quelques kilo-octets chacune), chargement différé des dessins. Pensé pour
tenir sur une connexion mobile moyenne.
