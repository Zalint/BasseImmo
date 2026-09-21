# Basse Immo — site de construction de maisons au Sénégal

Site vitrine statique pour un atelier de conception et de construction de
maisons au Sénégal : catalogue de plans chiffrés, simulateur de budget en francs
CFA, guide pratique et espace de suivi de chantier destiné à la diaspora.

La direction artistique est celle d'une interface claire et moderne : cartes
arrondies, bleu océan pour l'action, dessins au trait, aucune photographie.

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

## Mettre en ligne sur Render

Le dépôt contient un `render.yaml` prêt à l'emploi. `index.html` est à la racine,
et rien n'a besoin d'être compilé.

**Par Blueprint, le plus simple.** Sur Render : *New* → *Blueprint*, choisir ce
dépôt. Render lit `render.yaml` et crée le site avec les bons réglages.

**À la main, si vous préférez.** *New* → *Static Site*, choisir le dépôt, puis :

| Réglage | Valeur |
|---|---|
| Branch | `claude/senegal-website-keuryi-style-jak2rk` (c'est la branche par défaut du dépôt) |
| Build Command | laisser vide |
| Publish Directory | `.` |

Le HTTPS et le certificat sont automatiques. Chaque push sur la branche
redéploie le site.

### Après le premier déploiement

**1. Corriger le domaine.** Les liens canoniques, les balises Open Graph, le
sitemap et `robots.txt` pointent vers `https://basseimmo.sn`. Tant que le site
vit sur une adresse `.onrender.com`, ces liens désignent un domaine qui
n'existe pas, ce qui gêne l'indexation. Un script s'en charge :

```bash
./tools/domaine.sh https://basseimmo.onrender.com   # adresse Render
./tools/domaine.sh https://basseimmo.sn             # le jour où le domaine est branché
```

Puis committer et pousser. À refaire une seule fois, quand vous branchez le
vrai domaine.

**2. Vérifier la page 404.** Render sert `404.html` depuis la racine du dossier
publié. Ouvrez une adresse inexistante (`/nimportequoi`) et vérifiez que la page
d'erreur du site s'affiche bien. Si ce n'est pas le cas, le réglage se trouve
dans *Settings* → *Redirects and Rewrites*.

**3. Brancher le domaine.** *Settings* → *Custom Domains*, ajouter
`basseimmo.sn` et `www.basseimmo.sn`, puis créer chez votre registrar les
enregistrements DNS que Render affiche.

### Autres hébergeurs

Le dépôt fonctionne tel quel sur GitHub Pages (le fichier `.nojekyll` est déjà
présent), Netlify, Vercel ou n'importe quel hébergement mutualisé : il suffit de
déposer le contenu du dossier à la racine du site.

### Renforcer la sécurité, en option

`render.yaml` pose déjà `X-Content-Type-Options`, `Referrer-Policy`,
`X-Frame-Options` et `Permissions-Policy`. Vous pouvez ajouter une politique de
sécurité de contenu :

```yaml
      - path: /*
        name: Content-Security-Policy
        value: >-
          default-src 'self';
          script-src 'self' 'sha256-gx85Z8Eh0ZdE7GdffsWVnKflge+TEaybGk/mIPaTq34=';
          style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
          font-src https://fonts.gstatic.com;
          img-src 'self' data:;
          base-uri 'self'; form-action 'self'; frame-ancestors 'self'
```

Le haché correspond au petit script en ligne présent dans chaque page, celui qui
applique le thème enregistré avant le premier rendu. **Si vous modifiez ce
script, le haché change** et le thème se remettra à clignoter au chargement.
Dans ce cas, recalculez-le :

```bash
python3 -c "import re,hashlib,base64,io; \
c=re.search(r'<script>\n(.*?)\n</script>', io.open('index.html',encoding='utf-8').read(), re.S).group(1); \
print('sha256-'+base64.b64encode(hashlib.sha256(c.encode()).digest()).decode())"
```

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

render.yaml           configuration de déploiement Render
tools/domaine.sh      change le domaine dans les liens canoniques et le sitemap

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

Une interface claire et moderne, pensée pour inspirer confiance à une famille de
Dakar comme à un client de la diaspora qui découvre le site sur son téléphone :
grille de cartes de tailles variées, coins arrondis, ombres douces, beaucoup
d'air.

**Thème** : clair par défaut. Le thème sombre s'active seulement si le visiteur
le choisit avec le bouton de l'en-tête, et ce choix est mémorisé dans le
navigateur. Les réglages du système sont ignorés.

**Couleurs** : un bleu océan (`#2450E0`) pour les actions et les liens, un jaune
soleil (`#FFB938`) pour les repères (fanions, étape en cours), des neutres
gris-bleu, et le vert WhatsApp réservé aux boutons de contact. Les bandeaux
sombres (méthode, résultat du simulateur, pied de page) sont bleu nuit. Toutes
les couleurs sont des jetons définis en tête de `style.css`. Chaque bandeau
redéfinit localement ses rôles de texte (`--ink`, `--ink-soft`, `--line`,
`--brand-text`), si bien qu'un composant posé dessus reste lisible sans règle
dédiée.

**Typographie** : Figtree, une seule famille, de la graisse 400 à 800. Elle a
été retenue face à Plus Jakarta Sans parce que ses virgules et ses points
restent collés aux mots dans les grands titres. Les montants utilisent des
chiffres tabulaires.

**Formes** : cartes arrondies à 24 px, boutons en pilule, en-tête vitré qui
reste net au défilement, bandeaux sombres posés comme des cartes.

**Dessins** : pas de photographie. Chaque modèle a un plan du rez-de-chaussée
coté et une axonométrie au trait, recolorés dans la palette du site (traits bleu
nuit, vitrages bleus, portes jaune soleil). En thème sombre, ils sont inversés
pour garder un trait clair sur fond nuit. Les deux séries restent modifiables
dans `assets/img/plans/` et `assets/img/axo/`, et les emplacements sont prêts à
recevoir de vraies photos le jour où vous en aurez.

**Icônes** : 103 icônes SVG au trait, injectées en une fois par `icons.js`.
Aucune requête réseau, aucune bibliothèque externe.

**Accessibilité** : contrastes vérifiés au niveau AA sur toutes les pages et
dans les deux thèmes, zones de clic d'au moins 44 px, aucun texte sous 12 px,
hiérarchie de titres continue, champs de formulaire tous étiquetés, navigation
au clavier, lien d'évitement et respect de `prefers-reduced-motion`. Les espaces
placées avant « : ; ? ! % » deviennent insécables, ce qui évite les retours à la
ligne fautifs.

**Mouvement** : les blocs apparaissent en cascade au défilement, les survols
durent de 150 à 220 ms. Sans JavaScript, tout le contenu reste visible.

**Performance** : pas de framework, pas de bibliothèque, images en SVG
(quelques kilo-octets chacune), chargement différé des dessins. Pensé pour
tenir sur une connexion mobile moyenne.

**Image de partage** : `assets/img/og.png` (1200 × 630) reprend le héros de
l'accueil. C'est elle qui s'affiche dans l'aperçu d'un lien envoyé sur WhatsApp.
