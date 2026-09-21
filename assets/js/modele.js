/* =============================================================
   Basse Immo — fiche détaillée d'un modèle
   ============================================================= */
(function () {
  'use strict';
  var BI = window.BI;
  if (!BI || !BI.modeles) return;
  var $ = BI.$;

  var COMPRIS = [
    'Plans d\'exécution, façades, coupes et vue 3D',
    'Étude de structure par un ingénieur',
    'Dossier et dépôt du permis de construire',
    'Gros œuvre, dalles et étanchéité de la toiture-terrasse',
    'Plomberie, électricité et menuiseries',
    'Carrelage, faïence, peinture et sanitaires',
    'Conduite de travaux et espace de suivi en ligne',
    'Réception assistée et levée des réserves'
  ];
  var NON_COMPRIS = [
    'Le terrain et les frais de mutation',
    'Le mur de clôture et le portail',
    'Le forage, le kit solaire et le groupe électrogène',
    'La climatisation et la cuisine équipée',
    'Le raccordement définitif Senelec et SEN\'EAU',
    'Le mobilier et la décoration'
  ];

  function specLigne(icone, label, valeur) {
    return '<div style="display:flex;align-items:center;gap:.7rem;padding:.7rem 0;border-bottom:1px dashed var(--border)">' +
      '<span style="color:var(--accent);display:flex">' + BI.icone(icone) + '</span>' +
      '<span style="color:var(--text-soft);font-size:.9rem">' + label + '</span>' +
      '<strong style="margin-left:auto;font-size:.95rem">' + valeur + '</strong>' +
    '</div>';
  }

  function introuvable() {
    $('#fiche').innerHTML =
      '<section class="page-head"><div class="container">' +
        '<h1>Modèle introuvable</h1>' +
        '<p>Ce modèle n\'existe pas ou a été renommé.</p>' +
        '<a class="btn" style="margin-top:1rem" href="modeles.html">' + BI.icone('arrow-left') + ' Voir les douze modèles</a>' +
      '</div></section>';
  }

  function rendre(m) {
    var b = BI.budgetModele(m);
    var usageLabel = { familial: 'Résidence familiale', mixte: 'Habiter et louer', locatif: 'Investissement locatif' }[m.usage];
    var finition = BI.trouver(BI.finitions, m.standing);

    document.title = 'Modèle ' + m.nom + ' — ' + m.sousTitre + ' | Basse Immo';
    var meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', m.accroche + ' ' + m.surface + ' m², ' + m.niveaux + ', budget ' + BI.fourchette(b.min, b.max) + '.');

    var atouts = m.atouts.map(function (a) {
      return '<li>' + BI.icone('check-circle') + ' ' + BI.escape(a) + '</li>';
    }).join('');

    var pieces = m.pieces.map(function (p) {
      return '<li>' + BI.icone('chevron-right') + ' ' + BI.escape(p) + '</li>';
    }).join('');

    var echeancier = BI.echeancier.map(function (e, i) {
      var montant = e.part * ((b.min + b.max) / 2);
      return '<div class="sched-row">' +
        '<span class="sched-row__dot">' + (i + 1) + '</span>' +
        '<span>' + BI.escape(e.etape) + '<small>' + Math.round(e.part * 100) + ' % du marché</small></span>' +
        '<strong>' + BI.fcfaCourt(montant) + '</strong>' +
      '</div>';
    }).join('');

    var blocLocatif = '';
    if (m.locatif > 0) {
      var annuel = m.locatif * 12;
      var rendement = (annuel / ((b.min + b.max) / 2) * 100);
      blocLocatif =
        '<div class="callout callout--leaf" style="margin-top:2rem">' + BI.icone('trending-up') +
          '<p><strong>Ce modèle produit un revenu.</strong> Environ ' + BI.fcfa(m.locatif) + ' de loyer par mois, soit ' +
          BI.fcfaCourt(annuel) + ' par an, ce qui représente un rendement brut de l\'ordre de ' +
          rendement.toFixed(1).replace('.', ',') + ' % sur le coût de construction. Loyers observés à Dakar et en proche banlieue, hors charges et hors vacance locative.</p>' +
        '</div>';
    }

    var similaires = BI.modeles.filter(function (x) {
      if (x.id === m.id) return false;
      var bx = BI.budgetModele(x);
      return Math.abs(bx.min - b.min) < 45e6;
    }).slice(0, 3);

    $('#fiche').innerHTML =
    '<section class="page-head">' +
      '<div class="container">' +
        '<ol class="crumbs">' +
          '<li><a href="index.html">Accueil</a></li>' +
          '<li><a href="modeles.html">Modèles</a></li>' +
          '<li aria-current="page">' + BI.escape(m.nom) + '</li>' +
        '</ol>' +
        '<p class="eyebrow">' + BI.escape(m.sousTitre) + '</p>' +
        '<h1>Modèle ' + BI.escape(m.nom) + '</h1>' +
        '<p>' + BI.escape(m.accroche) + '</p>' +
      '</div>' +
    '</section>' +

    '<section class="section section--tight">' +
      '<div class="container">' +
        '<div class="grid" style="grid-template-columns:1fr;gap:28px" id="fiche-grille">' +

          '<div>' +
            '<img src="assets/img/modeles/' + m.id + '.svg" width="800" height="600" alt="Illustration du modèle ' + BI.escape(m.nom) + '"' +
              ' style="width:100%;border-radius:var(--r-lg);border:1px solid var(--border);box-shadow:var(--shadow-md)">' +

            '<div class="prose" style="margin-top:2rem;max-width:none">' +
              '<h2>Le projet</h2>' +
              '<p>' + BI.escape(m.description) + '</p>' +

              '<h3>Ce qui fait la différence</h3>' +
              '<ul class="checklist">' + atouts + '</ul>' +

              '<h3>Les pièces</h3>' +
              '<ul class="checklist" style="gap:.4rem">' + pieces + '</ul>' +
            '</div>' +

            blocLocatif +

            '<div class="grid grid--2" style="margin-top:2rem">' +
              '<div class="card">' +
                '<h3 style="font-size:1.05rem;display:flex;align-items:center;gap:.5rem">' +
                  '<span style="color:var(--leaf-500);display:flex">' + BI.icone('check-circle') + '</span> Compris dans le prix</h3>' +
                '<ul class="checklist" style="margin-top:.8rem;font-size:.9rem">' +
                  COMPRIS.map(function (c) { return '<li>' + BI.icone('check') + ' ' + c + '</li>'; }).join('') +
                '</ul>' +
              '</div>' +
              '<div class="card">' +
                '<h3 style="font-size:1.05rem;display:flex;align-items:center;gap:.5rem">' +
                  '<span style="color:var(--brick-500);display:flex">' + BI.icone('info') + '</span> À prévoir en plus</h3>' +
                '<ul class="checklist" style="margin-top:.8rem;font-size:.9rem">' +
                  NON_COMPRIS.map(function (c) {
                    return '<li><span style="color:var(--text-mute);display:flex">' + BI.icone('plus') + '</span> ' + c + '</li>';
                  }).join('') +
                '</ul>' +
                '<p style="font-size:.85rem;color:var(--text-mute);margin-top:1rem">Le simulateur chiffre chacun de ces postes.</p>' +
              '</div>' +
            '</div>' +

            '<div class="card" style="margin-top:2rem">' +
              '<h3 style="font-size:1.1rem;display:flex;align-items:center;gap:.5rem">' +
                '<span style="color:var(--accent);display:flex">' + BI.icone('calendar') + '</span> Échéancier de paiement</h3>' +
              '<p style="font-size:.9rem;color:var(--text-soft);margin-top:.4rem">Calculé sur le milieu de la fourchette. Chaque tranche n\'est appelée qu\'après constat d\'avancement.</p>' +
              '<div class="schedule" style="margin-top:1rem">' + echeancier + '</div>' +
            '</div>' +
          '</div>' +

          '<aside>' +
            '<div class="card" id="carte-budget" style="position:sticky;top:calc(var(--header-h) + 16px)">' +
              '<p class="eyebrow" style="margin-bottom:.4rem">Budget construction</p>' +
              '<p style="font-family:var(--font-display);font-size:1.75rem;font-weight:700;line-height:1.1;color:var(--accent);margin-bottom:.2rem">' +
                BI.fourchette(b.min, b.max) + '</p>' +
              '<p style="font-size:.84rem;color:var(--text-mute);margin-bottom:1.2rem">Hors terrain · ' +
                BI.fmt(Math.round(b.min / m.surface / 1000) * 1000) + ' à ' + BI.fmt(Math.round(b.max / m.surface / 1000) * 1000) + ' FCFA le m²</p>' +
              '<div class="sim__fx" style="margin-bottom:1.2rem">' +
                ['EUR', 'USD'].map(function (d) {
                  return '<span class="badge">≈ ' + BI.enDevise(b.min, d) + ' – ' + BI.enDevise(b.max, d) + '</span>';
                }).join('') +
              '</div>' +
              specLigne('maximize', 'Surface habitable', m.surface + ' m²') +
              specLigne('layers', 'Niveaux', BI.escape(m.niveaux)) +
              (m.chambres ? specLigne('bed', 'Chambres', m.chambres) : '') +
              (m.sdb ? specLigne('bath', 'Salles d\'eau', m.sdb) : '') +
              specLigne('map-pin', 'Parcelle minimale', m.parcelle + ' m²') +
              specLigne('clock', 'Durée du chantier', b.duree + ' mois') +
              specLigne('sparkles', 'Finition', BI.escape(finition.nom)) +
              specLigne('target', 'Usage', usageLabel) +
              '<div class="stack" style="margin-top:1.4rem">' +
                '<a class="btn btn--block" href="contact.html?modele=' + m.id + '">' + BI.icone('send') + ' Demander le dossier</a>' +
                '<a class="btn btn--block btn--wa" data-wa="Bonjour Basse Immo, je suis intéressé par le modèle ' + m.nom + ' (' + m.surface + ' m²). Pouvez-vous m\'envoyer le dossier complet ?" href="#">' + BI.icone('whatsapp') + ' En parler sur WhatsApp</a>' +
                '<a class="btn btn--block btn--ghost" href="simulateur.html?type=' + m.type + '&surface=' + m.surface + '&finition=' + m.standing + '&parcelle=' + m.parcelle + '">' + BI.icone('calculator') + ' Adapter le budget</a>' +
              '</div>' +
              '<p style="font-size:.8rem;color:var(--text-mute);margin-top:1rem;text-align:center">Estimation indicative. Le devis définitif tient compte de votre parcelle.</p>' +
            '</div>' +
          '</aside>' +

        '</div>' +
      '</div>' +
    '</section>' +

    (similaires.length ?
    '<section class="section section--alt">' +
      '<div class="container">' +
        '<div class="section-head"><p class="eyebrow">Dans le même budget</p><h2>Ces modèles aussi</h2></div>' +
        '<div class="grid grid--3">' + similaires.map(BI.carteModele).join('') + '</div>' +
      '</div>' +
    '</section>' : '') +

    '<section class="section">' +
      '<div class="container">' +
        '<div class="cta-band">' +
          '<h2>Ce modèle sur votre parcelle</h2>' +
          '<p>Envoyez-nous les dimensions et l\'adresse de votre terrain. Nous vérifions que le modèle s\'y implante, puis nous l\'adaptons.</p>' +
          '<div class="cluster cluster--center">' +
            '<a class="btn btn--lg" href="contact.html?modele=' + m.id + '">' + BI.icone('send') + ' Demander une étude</a>' +
            '<a class="btn btn--lg btn--wa" data-wa="Bonjour, j\'ai un terrain et je souhaite savoir si le modèle ' + m.nom + ' peut s\'y implanter." href="#">' + BI.icone('whatsapp') + ' WhatsApp</a>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</section>';

    // Deux colonnes seulement à partir du grand écran.
    var grille = $('#fiche-grille');
    var appliquer = function () {
      grille.style.gridTemplateColumns = window.innerWidth >= 1000 ? '1.6fr .9fr' : '1fr';
    };
    appliquer();
    window.addEventListener('resize', appliquer);

    // Les liens WhatsApp viennent d'être créés : on les recâble.
    BI.$$('[data-wa]', $('#fiche')).forEach(function (a) {
      a.href = BI.waLink(a.getAttribute('data-wa'));
      a.target = '_blank'; a.rel = 'noopener';
    });
  }

  document.addEventListener('bi:ready', function () {
    var id = new URLSearchParams(location.search).get('id');
    var m = BI.modeles.filter(function (x) { return x.id === id; })[0];
    if (!m) { introuvable(); return; }
    rendre(m);
  });
})();
