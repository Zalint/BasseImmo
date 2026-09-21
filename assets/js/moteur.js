/* =============================================================
   Basse Immo — moteur d'estimation
   Partagé par l'estimation express de l'accueil et le simulateur complet.
   Toutes les valeurs sortent en francs CFA.
   ============================================================= */
(function () {
  'use strict';
  var BI = window.BI = window.BI || {};

  function trouver(liste, id) {
    for (var i = 0; i < liste.length; i++) { if (liste[i].id === id) return liste[i]; }
    return liste[0];
  }
  BI.trouver = trouver;

  /**
   * @param {object} p
   *   type      identifiant de BI.typesProjet
   *   surface   surface habitable en m²
   *   finition  identifiant de BI.finitions
   *   zone      identifiant de BI.zones
   *   options   tableau d'identifiants de BI.options
   *   parcelle  surface du terrain en m² (0 si déjà possédé)
   */
  BI.estimer = function (p) {
    var type = trouver(BI.typesProjet, p.type);
    var fin = trouver(BI.finitions, p.finition);
    var zone = trouver(BI.zones, p.zone);
    var surface = Math.max(20, Number(p.surface) || 100);
    var ids = p.options || [];

    var coef = type.coef * zone.coef;
    var m2Min = fin.min * coef;
    var m2Max = fin.max * coef;

    var travauxMin = surface * m2Min;
    var travauxMax = surface * m2Max;
    var travauxMoyen = (travauxMin + travauxMax) / 2;

    var optionsDetail = [];
    var optionsTotal = 0;
    ids.forEach(function (id) {
      var o = BI.options.filter(function (x) { return x.id === id; })[0];
      if (!o) return;
      // Le mur de clôture suit la taille de la parcelle ; le reste est forfaitaire.
      var cout = o.cout;
      if (o.id === 'cloture' && p.parcelle > 0) {
        cout = Math.round(o.cout * Math.sqrt(Math.max(100, p.parcelle) / 200));
      }
      optionsDetail.push({ id: o.id, nom: o.nom, icone: o.icone, cout: cout });
      optionsTotal += cout;
    });

    var totalMin = travauxMin + optionsTotal;
    var totalMax = travauxMax + optionsTotal;
    var totalMoyen = (totalMin + totalMax) / 2;

    // Répartition par poste, calculée sur la part « travaux ».
    var postes = BI.postes.map(function (poste) {
      return {
        id: poste.id, nom: poste.nom, icone: poste.icone, detail: poste.detail,
        part: poste.part * (travauxMoyen / totalMoyen),
        montant: poste.part * travauxMoyen
      };
    });
    if (optionsTotal > 0) {
      postes.push({
        id: 'options', nom: 'Options et équipements', icone: 'sliders',
        detail: 'Postes choisis en supplément de la construction.',
        part: optionsTotal / totalMoyen, montant: optionsTotal
      });
    }

    var echeancier = BI.echeancier.map(function (e) {
      return { etape: e.etape, part: e.part, montant: e.part * totalMoyen };
    });

    // Durée : base du type, majorée par la surface et par le niveau de finition.
    var bonusFinition = { economique: 0, standard: 0, confort: 1, premium: 2 }[fin.id] || 0;
    var duree = Math.round(type.dureeBase + Math.max(0, surface - 120) / 100 * 2 + bonusFinition);

    // Terrain : fourchette indicative, hors frais de mutation.
    var terrain = null;
    if (p.parcelle > 0) {
      terrain = {
        min: p.parcelle * zone.terrainMin,
        max: p.parcelle * zone.terrainMax,
        m2Min: zone.terrainMin,
        m2Max: zone.terrainMax
      };
    }

    return {
      type: type, finition: fin, zone: zone, surface: surface,
      m2Min: m2Min, m2Max: m2Max,
      travauxMin: travauxMin, travauxMax: travauxMax,
      optionsTotal: optionsTotal, optionsDetail: optionsDetail,
      min: totalMin, max: totalMax, moyen: totalMoyen,
      postes: postes, echeancier: echeancier,
      duree: duree, terrain: terrain
    };
  };

  /** Mensualité d'un prêt classique, pour la simulation de financement. */
  BI.mensualite = function (capital, tauxAnnuel, annees) {
    var i = tauxAnnuel / 100 / 12;
    var n = annees * 12;
    if (i <= 0) return capital / n;
    return capital * i / (1 - Math.pow(1 + i, -n));
  };
})();

/* -------------------------------------------------------------
   Budget affiché pour un modèle du catalogue.
   Calculé par le même moteur que le simulateur : les deux chiffres
   ne peuvent donc pas diverger. Référence : zone Dakar, coefficient 1,00.
   ------------------------------------------------------------- */
(function () {
  'use strict';
  var BI = window.BI;
  BI.budgetModele = function (m) {
    var r = BI.estimer({
      type: m.type, surface: m.surface, finition: m.standing,
      zone: 'mermoz', options: m.optionsIncluses || [], parcelle: 0
    });
    return { min: r.min, max: r.max, duree: m.duree || r.duree, options: m.optionsIncluses || [] };
  };
})();

/* -------------------------------------------------------------
   Carte d'un modèle — utilisée par l'accueil et par le catalogue.
   ------------------------------------------------------------- */
(function () {
  'use strict';
  var BI = window.BI;
  BI.carteModele = function (m) {
    var b = BI.budgetModele(m);
    var tags = [];
    if (m.usage === 'locatif') tags.push('<span class="badge">' + BI.icone('trending-up') + ' Investissement</span>');
    if (m.usage === 'mixte') tags.push('<span class="badge">' + BI.icone('coins') + ' Habiter + louer</span>');
    if (m.standing === 'economique') tags.push('<span class="badge">' + BI.icone('wallet') + ' Petit budget</span>');
    if (m.standing === 'premium') tags.push('<span class="badge">' + BI.icone('award') + ' Haut standing</span>');
    if (m.id === 'casamance') tags.push('<span class="badge">' + BI.icone('leaf') + ' Bioclimatique</span>');

    var specs = [
      '<span>' + BI.icone('maximize') + ' ' + m.surface + ' m²</span>',
      '<span>' + BI.icone('layers') + ' ' + BI.escape(m.niveaux) + '</span>'
    ];
    if (m.chambres > 0) specs.push('<span>' + BI.icone('bed') + ' ' + m.chambres + ' ch.</span>');
    if (m.sdb > 0) specs.push('<span>' + BI.icone('bath') + ' ' + m.sdb + ' sdb</span>');
    specs.push('<span>' + BI.icone('map-pin') + ' parcelle ' + m.parcelle + ' m²</span>');

    return '<article class="model-card" data-modele="' + m.id + '">' +
      '<div class="model-card__media">' +
        '<img src="assets/img/modeles/' + m.id + '.svg" width="800" height="600" loading="lazy" alt="Illustration du modèle ' + BI.escape(m.nom) + '">' +
        (tags.length ? '<div class="model-card__tags">' + tags.join('') + '</div>' : '') +
      '</div>' +
      '<div class="model-card__body">' +
        '<h3 class="model-card__title"><a href="modele.html?id=' + m.id + '">' + BI.escape(m.nom) + '</a></h3>' +
        '<p class="model-card__sub">' + BI.escape(m.sousTitre) + ' · ' + BI.escape(m.accroche) + '</p>' +
        '<div class="model-card__specs">' + specs.join('') + '</div>' +
        '<div class="model-card__price">' +
          '<span><b>' + BI.fourchette(b.min, b.max) + '</b><br><small>hors terrain · ' + b.duree + ' mois de chantier</small></span>' +
          '<a class="btn btn--sm btn--ghost" href="modele.html?id=' + m.id + '" aria-label="Voir la fiche du modèle ' + BI.escape(m.nom) + '">Voir</a>' +
        '</div>' +
      '</div>' +
    '</article>';
  };

})();
