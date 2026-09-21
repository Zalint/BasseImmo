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

    var ligne = function (dt, dd) {
      return '<div><dt>' + dt + '</dt><dd>' + dd + '</dd></div>';
    };

    var specs = ligne('Surface habitable', m.surface + ' m²') +
                ligne('Niveaux', BI.escape(m.niveaux)) +
                (m.chambres ? ligne('Chambres', m.chambres) : '') +
                (m.sdb ? ligne('Salles d\'eau', m.sdb) : '') +
                ligne('Parcelle minimale', m.parcelle + ' m²') +
                ligne('Durée du chantier', b.duree + ' mois') +
                ligne('Finition', BI.escape(finition.nom)) +
                ligne('Usage', usageLabel);

    var atouts = m.atouts.map(function (a) {
      return '<li>' + BI.icone('check') + ' ' + BI.escape(a) + '</li>';
    }).join('');

    var pieces = m.pieces.map(function (p) {
      return '<li>' + BI.icone('chevron-right') + ' ' + BI.escape(p) + '</li>';
    }).join('');

    var echeancier = BI.echeancier.map(function (e, i) {
      return '<div class="sched-row">' +
        '<span class="sched-row__dot">' + ('0' + (i + 1)).slice(-2) + '</span>' +
        '<span>' + BI.escape(e.etape) + '<small>' + Math.round(e.part * 100) + ' % du marché</small></span>' +
        '<strong>' + BI.fcfaCourt(e.part * ((b.min + b.max) / 2)) + '</strong>' +
      '</div>';
    }).join('');

    var blocLocatif = '';
    if (m.locatif > 0) {
      var rendement = (m.locatif * 12 / ((b.min + b.max) / 2) * 100);
      blocLocatif = '<div class="note" style="margin-top:2.5rem">' + BI.icone('trending-up') +
        '<p><strong>Ce modèle produit un revenu.</strong> Environ ' + BI.fcfa(m.locatif) + ' de loyer par mois, soit ' +
        BI.fcfaCourt(m.locatif * 12) + ' par an, ce qui représente un rendement brut de l\'ordre de ' +
        rendement.toFixed(1).replace('.', ',') + ' % sur le coût de construction. Loyers observés à Dakar et en proche banlieue, hors charges et hors vacance locative.</p></div>';
    }

    var similaires = BI.modeles.filter(function (x) {
      if (x.id === m.id) return false;
      return Math.abs(BI.budgetModele(x).min - b.min) < 45e6;
    }).slice(0, 3);

    $('#fiche').innerHTML =
    '<section class="page-head">' +
      '<div class="container">' +
        '<ol class="crumbs">' +
          '<li><a href="index.html">Accueil</a></li>' +
          '<li><a href="modeles.html">Modèles</a></li>' +
          '<li aria-current="page">' + BI.escape(m.nom) + '</li>' +
        '</ol>' +
        '<p class="label label--accent" style="margin-bottom:1rem">' + BI.escape(m.sousTitre) + '</p>' +
        '<h1>' + BI.escape(m.nom) + '</h1>' +
        '<p>' + BI.escape(m.accroche) + '</p>' +
      '</div>' +
    '</section>' +

    '<section class="section section--tight">' +
      '<div class="container">' +
        '<div class="grid12">' +
          '<div class="c8">' +
            '<figure class="figure" style="margin:0">' +
              '<img src="assets/img/axo/' + m.id + '.svg" width="900" height="700" alt="Axonométrie du modèle ' + BI.escape(m.nom) + '">' +
              '<figcaption>Axonométrie · ' + BI.escape(m.niveaux) + ' · ' + m.surface + ' m² habitables</figcaption>' +
            '</figure>' +
          '</div>' +
          '<aside class="c4">' +
            '<div style="position:sticky;top:calc(var(--header-h) + 20px)">' +
              '<p class="label" style="margin-bottom:.6rem">Budget construction</p>' +
              '<p class="bigprice">' + BI.fourchette(b.min, b.max) + '</p>' +
              '<p class="mono" style="font-size:.74rem;color:var(--ink-mute);margin:.6rem 0 1rem;letter-spacing:.04em">' +
                'HORS TERRAIN · ' + BI.fmt(Math.round(b.min / m.surface / 1000) * 1000) + ' À ' +
                BI.fmt(Math.round(b.max / m.surface / 1000) * 1000) + ' FCFA/M²</p>' +
              '<div class="sim__fx" style="margin-bottom:1.6rem">' +
                ['EUR', 'USD'].map(function (d) {
                  return '<span class="tag">' + BI.enDevise(b.min, d) + ' – ' + BI.enDevise(b.max, d) + '</span>';
                }).join('') +
              '</div>' +
              '<dl class="specs">' + specs + '</dl>' +
              '<div class="stack" style="margin-top:1.6rem">' +
                '<a class="btn btn--block" href="contact.html?modele=' + m.id + '">Demander le dossier ' + BI.icone('arrow-right') + '</a>' +
                '<a class="btn btn--wa btn--block" data-wa="Bonjour Basse Immo, je suis intéressé par le modèle ' + m.nom + ' (' + m.surface + ' m²). Pouvez-vous m\'envoyer le dossier complet ?" href="#">' + BI.icone('whatsapp') + ' En parler sur WhatsApp</a>' +
                '<a class="btn btn--line btn--block" href="simulateur.html?type=' + m.type + '&surface=' + m.surface + '&finition=' + m.standing + '&parcelle=' + m.parcelle + '">Adapter le budget</a>' +
              '</div>' +
              '<p class="mono" style="font-size:.68rem;color:var(--ink-mute);margin-top:1rem;line-height:1.6">Estimation indicative. Le devis définitif tient compte de votre parcelle.</p>' +
            '</div>' +
          '</aside>' +
        '</div>' +
      '</div>' +
    '</section>' +

    '<section class="section section--paper2">' +
      '<div class="container">' +
        '<div class="grid12">' +
          '<div class="c5">' +
            '<p class="label label--accent" style="margin-bottom:1rem">Le projet</p>' +
            '<h2 style="font-size:clamp(1.6rem,2.8vw,2.2rem)">' + BI.escape(m.sousTitre) + '</h2>' +
            '<p style="color:var(--ink-soft)">' + BI.escape(m.description) + '</p>' +
            '<h3 style="margin-top:2.2rem">Ce qui fait la différence</h3>' +
            '<ul class="checklist" style="margin-top:1rem">' + atouts + '</ul>' +
          '</div>' +
          '<div class="c7">' +
            '<figure class="figure" style="margin:0">' +
              '<img src="assets/img/plans/' + m.id + '.svg" width="800" height="600" alt="Plan du rez-de-chaussée du modèle ' + BI.escape(m.nom) + '">' +
              '<figcaption>Plan du rez-de-chaussée · échelle 1:100</figcaption>' +
            '</figure>' +
            '<h3 style="margin-top:2rem">Les pièces</h3>' +
            '<ul class="checklist" style="margin-top:1rem">' + pieces + '</ul>' +
          '</div>' +
        '</div>' +
        blocLocatif +
      '</div>' +
    '</section>' +

    '<section class="section">' +
      '<div class="container">' +
        '<div class="split">' +
          '<div>' +
            '<p class="label label--accent" style="margin-bottom:.9rem">Compris dans le prix</p>' +
            '<ul class="checklist">' + COMPRIS.map(function (c) { return '<li>' + BI.icone('check') + ' ' + c + '</li>'; }).join('') + '</ul>' +
          '</div>' +
          '<div>' +
            '<p class="label" style="margin-bottom:.9rem">À prévoir en plus</p>' +
            '<ul class="checklist">' + NON_COMPRIS.map(function (c) {
              return '<li><span style="color:var(--ink-mute);display:flex">' + BI.icone('plus') + '</span> ' + c + '</li>';
            }).join('') + '</ul>' +
            '<p class="mono" style="font-size:.72rem;color:var(--ink-mute);margin-top:1.2rem;line-height:1.6">Le simulateur chiffre chacun de ces postes.</p>' +
          '</div>' +
        '</div>' +

        '<div style="margin-top:3.5rem;border-top:1px solid var(--hair);padding-top:2.2rem">' +
          '<p class="label label--accent" style="margin-bottom:.9rem">Échéancier</p>' +
          '<h3 style="max-width:20ch">Comment vous paierez</h3>' +
          '<p style="color:var(--ink-soft);font-size:.96rem;max-width:58ch">Calculé sur le milieu de la fourchette. Chaque tranche n\'est appelée qu\'après constat d\'avancement sur site.</p>' +
          '<div style="margin-top:1.4rem;border-top:1px solid var(--hair)">' + echeancier + '</div>' +
        '</div>' +
      '</div>' +
    '</section>' +

    (similaires.length ?
    '<section class="section section--paper2">' +
      '<div class="container">' +
        '<div class="shead"><div class="shead__top"><span class="idx">—</span><span class="label">Dans le même budget</span></div>' +
        '<h2>Ces modèles aussi</h2></div>' +
        '<div class="plans">' + similaires.map(BI.carteModele).join('') + '</div>' +
      '</div>' +
    '</section>' : '') +

    '<section class="section plate plate--clay">' +
      '<div class="container">' +
        '<div class="shead shead--split" style="margin-bottom:0">' +
          '<div class="shead__top"><span class="label">Prochaine étape</span></div>' +
          '<div><h2>Ce modèle sur votre parcelle</h2></div>' +
          '<div>' +
            '<p class="shead__lead" style="margin-bottom:1.8rem">Envoyez-nous les dimensions et l\'adresse de votre terrain. Nous vérifions que le modèle s\'y implante, puis nous l\'adaptons.</p>' +
            '<div class="row">' +
              '<a class="btn" href="contact.html?modele=' + m.id + '">Demander une étude ' + BI.icone('arrow-right') + '</a>' +
              '<a class="btn btn--line" data-wa="Bonjour, j\'ai un terrain et je souhaite savoir si le modèle ' + m.nom + ' peut s\'y implanter." href="#">' + BI.icone('whatsapp') + ' WhatsApp</a>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</section>';

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
