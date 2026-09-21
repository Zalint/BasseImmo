/* =============================================================
   Basse Immo — page d'accueil
   ============================================================= */
(function () {
  'use strict';
  var BI = window.BI;
  if (!BI || !BI.modeles) return;
  var $ = BI.$, $$ = BI.$$;

  /* ---------------------------------------------------------
     1. Estimation express
     --------------------------------------------------------- */
  var etat = { type: 'r1', surface: 180, finition: 'standard', zone: 'mermoz' };

  function optionsZones() {
    var groupes = {};
    BI.zones.forEach(function (z) { (groupes[z.region] = groupes[z.region] || []).push(z); });
    return Object.keys(groupes).map(function (region) {
      return '<optgroup label="' + region + '">' +
        groupes[region].map(function (z) {
          return '<option value="' + z.id + '"' + (z.id === etat.zone ? ' selected' : '') + '>' + BI.escape(z.nom) + '</option>';
        }).join('') + '</optgroup>';
    }).join('');
  }

  function miniSim() {
    var hote = $('#mini-sim');
    if (!hote) return;

    hote.innerHTML =
      '<div class="sim__panel">' +
        '<div class="field">' +
          '<div class="range-head">' +
            '<label for="ms-surface">Surface habitable</label>' +
            '<span class="range-value"><span id="ms-surface-val">' + etat.surface + '</span><small>m²</small></span>' +
          '</div>' +
          '<input type="range" id="ms-surface" min="60" max="450" step="5" value="' + etat.surface + '">' +
          '<div class="range-scale"><span>60 m²</span><span>450 m²</span></div>' +
        '</div>' +
        '<div class="field">' +
          '<label for="ms-type">Type de projet</label>' +
          '<select class="select" id="ms-type">' +
            BI.typesProjet.map(function (t) {
              return '<option value="' + t.id + '"' + (t.id === etat.type ? ' selected' : '') + '>' + BI.escape(t.nom) + '</option>';
            }).join('') +
          '</select>' +
        '</div>' +
        '<div class="field">' +
          '<label for="ms-finition">Niveau de finition</label>' +
          '<select class="select" id="ms-finition">' +
            BI.finitions.map(function (f) {
              return '<option value="' + f.id + '"' + (f.id === etat.finition ? ' selected' : '') + '>' + BI.escape(f.nom) + ' — ' + BI.escape(f.resume) + '</option>';
            }).join('') +
          '</select>' +
        '</div>' +
        '<div class="field" style="margin-bottom:0">' +
          '<label for="ms-zone">Où construisez-vous&nbsp;?</label>' +
          '<select class="select" id="ms-zone">' + optionsZones() + '</select>' +
        '</div>' +
      '</div>' +
      '<div class="sim__result" style="position:static">' +
        '<p class="label" style="margin-bottom:.4rem">Budget construction</p>' +
        '<p class="sim__total" id="ms-total">—</p>' +
        '<p class="sim__total-sub" id="ms-sub"></p>' +
        '<div class="sim__fx" id="ms-fx"></div>' +
        '<div class="sim__note">' + BI.icone('info') +
          '<span>Estimation hors terrain, hors clôture et hors options. Le simulateur complet détaille chaque poste.</span>' +
        '</div>' +
        '<a class="btn btn--line btn--block" style="margin-top:1.4rem" id="ms-lien" href="simulateur.html">' +
          'Affiner mon estimation ' + BI.icone('arrow-right') + '</a>' +
      '</div>';

    function calculer() {
      var r = BI.estimer({
        type: etat.type, surface: etat.surface, finition: etat.finition,
        zone: etat.zone, options: [], parcelle: 0
      });
      $('#ms-total').textContent = BI.fourchette(r.min, r.max);
      $('#ms-sub').textContent = 'Soit ' + BI.fmt(Math.round(r.m2Min / 1000) * 1000) + ' à '
        + BI.fmt(Math.round(r.m2Max / 1000) * 1000) + ' FCFA le m² · chantier estimé à ' + r.duree + ' mois';
      $('#ms-fx').innerHTML = ['EUR', 'USD'].map(function (d) {
        return '<span class="tag">≈ ' + BI.enDevise(r.min, d) + ' – ' + BI.enDevise(r.max, d) + '</span>';
      }).join('');
      $('#ms-lien').href = 'simulateur.html?type=' + etat.type + '&surface=' + etat.surface
        + '&finition=' + etat.finition + '&zone=' + etat.zone;
    }

    $('#ms-surface').addEventListener('input', function (e) {
      etat.surface = Number(e.target.value);
      $('#ms-surface-val').textContent = etat.surface;
      calculer();
    });
    ['type', 'finition', 'zone'].forEach(function (cle) {
      $('#ms-' + cle).addEventListener('change', function (e) { etat[cle] = e.target.value; calculer(); });
    });
    calculer();
  }

  /* ---------------------------------------------------------
     2. Modèles mis en avant, filtrés par budget
     --------------------------------------------------------- */
  var FILTRES = [
    { id: 'tous',  label: 'Tous les budgets', test: function () { return true; } },
    { id: 'petit', label: 'Moins de 35 M',    test: function (b) { return b.min < 35e6; } },
    { id: 'moyen', label: '35 à 70 M',        test: function (b) { return b.min >= 35e6 && b.min < 70e6; } },
    { id: 'grand', label: '70 à 130 M',       test: function (b) { return b.min >= 70e6 && b.min < 130e6; } },
    { id: 'max',   label: 'Plus de 130 M',    test: function (b) { return b.min >= 130e6; } }
  ];
  var filtreActif = 'tous';

  function modelesAccueil() {
    var grille = $('#home-modeles');
    var barre = $('#home-filtres');
    if (!grille || !barre) return;

    barre.innerHTML = FILTRES.map(function (f) {
      return '<button class="chip" type="button" data-filtre="' + f.id + '" aria-pressed="' + (f.id === filtreActif) + '">' + f.label + '</button>';
    }).join('');

    function rendre() {
      var f = FILTRES.filter(function (x) { return x.id === filtreActif; })[0];
      var liste = BI.modeles.filter(function (m) { return f.test(BI.budgetModele(m)); }).slice(0, 6);
      grille.innerHTML = liste.length
        ? liste.map(BI.carteModele).join('')
        : '<div class="empty-state" style="grid-column:1/-1">' + BI.icone('search') +
          '<p>Aucun modèle dans cette tranche. <a href="contact.html">Parlons de votre projet sur mesure.</a></p></div>';
    }

    barre.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-filtre]');
      if (!btn) return;
      filtreActif = btn.getAttribute('data-filtre');
      $$('[data-filtre]', barre).forEach(function (b) {
        b.setAttribute('aria-pressed', String(b.getAttribute('data-filtre') === filtreActif));
      });
      rendre();
    });
    rendre();
  }

  /* ---------------------------------------------------------
     3. Tableau des zones
     --------------------------------------------------------- */
  function tableauZones() {
    var corps = $('#table-zones tbody');
    if (!corps) return;
    corps.innerHTML = BI.zones.map(function (z) {
      return '<tr>' +
        '<th scope="row">' + BI.escape(z.nom) + '</th>' +
        '<td>' + BI.escape(z.region) + '</td>' +
        '<td class="num">' + BI.fmt(z.terrainMin) + ' – ' + BI.fmt(z.terrainMax) + '</td>' +
        '<td class="num">' + BI.fourchette(z.terrainMin * 200, z.terrainMax * 200) + '</td>' +
      '</tr>';
    }).join('');
  }

  /* ---------------------------------------------------------
     4. Aperçu du suivi de chantier
     --------------------------------------------------------- */
  function apercuSuivi() {
    var hote = $('#apercu-suivi');
    if (!hote) return;
    var c = BI.chantiers['BI-2026-014'];

    hote.innerHTML =
      '<div class="widget__head">' +
        '<span><span class="label">Chantier ' + BI.escape(c.code) + '</span>' +
        '<b class="widget__title">' + BI.escape(c.modele) + ' \u00b7 ' + BI.escape(c.lieu) + '</b></span>' +
        '<span class="widget__pct">' + c.avancement + '&nbsp;%</span>' +
      '</div>' +
      '<div class="progress" role="img" aria-label="Avancement : ' + c.avancement + ' pour cent">' +
        '<i style="width:' + c.avancement + '%"></i></div>' +
      '<div class="timeline" style="margin-top:1.6rem">' +
        c.phases.slice(2, 6).map(function (p) {
          var cls = p.etat === 'fait' ? 'is-done' : (p.etat === 'encours' ? 'is-active' : '');
          var etat = p.etat === 'fait' ? 'Termin\u00e9' : (p.etat === 'encours' ? p.pct + ' % \u00b7 en cours' : '\u00c0 venir');
          return '<div class="tl-item ' + cls + '">' +
            '<p class="tl-title">' + BI.escape(p.nom) + '</p>' +
            '<time>' + etat + '</time></div>';
        }).join('') +
      '</div>';
  }

  /* ---------------------------------------------------------
     5. Cartes flottantes du héros
     Les montants viennent du moteur et des données, jamais écrits en dur.
     --------------------------------------------------------- */
  function heroApercu() {
    var hote = $('#hero-visuel');
    if (!hote) return;
    var m = BI.modeles.filter(function (x) { return x.id === 'teranga'; })[0];
    var c = BI.chantiers['BI-2026-014'];
    var html = '';
    if (m) {
      var b = BI.budgetModele(m);
      html += '<a class="float float--budget" href="modele.html?id=' + m.id + '">' +
        '<span>Villa ' + BI.escape(m.nom) + ' · budget estimé</span>' +
        '<b>' + BI.fourchette(b.min, b.max) + '</b></a>';
    }
    if (c) {
      html += '<a class="float float--suivi" href="suivi.html?code=' + encodeURIComponent(c.code) + '">' +
        '<span>Chantier ' + BI.escape(c.code) + ' · ' + BI.escape(c.lieu) + '</span>' +
        '<b>' + c.avancement + '&nbsp;% réalisés</b>' +
        '<span class="progress" aria-hidden="true"><i style="width:' + c.avancement + '%"></i></span></a>';
    }
    hote.insertAdjacentHTML('beforeend', html);
  }

  document.addEventListener('bi:ready', function () {
    heroApercu();
    miniSim();
    modelesAccueil();
    tableauZones();
    apercuSuivi();
  });
})();
