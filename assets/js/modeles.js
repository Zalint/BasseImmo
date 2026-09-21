/* =============================================================
   Basse Immo — catalogue des modèles
   ============================================================= */
(function () {
  'use strict';
  var BI = window.BI;
  if (!BI || !BI.modeles) return;
  var $ = BI.$, $$ = BI.$$;

  var GROUPES = [
    {
      cle: 'usage', label: 'À quoi sert la maison',
      choix: [
        { id: 'tous',     label: 'Peu importe' },
        { id: 'familial', label: 'Pour ma famille',   icone: 'users' },
        { id: 'mixte',    label: 'Habiter et louer',  icone: 'coins' },
        { id: 'locatif',  label: 'Investissement',    icone: 'trending-up' }
      ]
    },
    {
      cle: 'budget', label: 'Budget de construction',
      choix: [
        { id: 'tous',  label: 'Tous' },
        { id: 'a',     label: 'Moins de 35 M' },
        { id: 'b',     label: '35 à 70 M' },
        { id: 'c',     label: '70 à 130 M' },
        { id: 'd',     label: 'Plus de 130 M' }
      ]
    },
    {
      cle: 'niveaux', label: 'Nombre de niveaux',
      choix: [
        { id: 'tous',      label: 'Tous' },
        { id: 'plainpied', label: 'Plain-pied', icone: 'villa' },
        { id: 'r1',        label: 'R+1',        icone: 'home' },
        { id: 'r2',        label: 'R+2',        icone: 'building' },
        { id: 'immeuble',  label: 'Immeuble',   icone: 'layers' }
      ]
    },
    {
      cle: 'chambres', label: 'Chambres',
      choix: [
        { id: 'tous', label: 'Peu importe' },
        { id: '2',    label: '2 et plus' },
        { id: '3',    label: '3 et plus' },
        { id: '4',    label: '4 et plus' },
        { id: '5',    label: '5 et plus' }
      ]
    }
  ];

  var etat = { usage: 'tous', budget: 'tous', niveaux: 'tous', chambres: 'tous', tri: 'budget-asc' };

  var TRANCHES = {
    a: function (b) { return b.min < 35e6; },
    b: function (b) { return b.min >= 35e6 && b.min < 70e6; },
    c: function (b) { return b.min >= 70e6 && b.min < 130e6; },
    d: function (b) { return b.min >= 130e6; }
  };

  function correspond(m) {
    var b = BI.budgetModele(m);
    if (etat.usage !== 'tous' && m.usage !== etat.usage) return false;
    if (etat.budget !== 'tous' && !TRANCHES[etat.budget](b)) return false;
    if (etat.niveaux !== 'tous' && m.type !== etat.niveaux) return false;
    if (etat.chambres !== 'tous' && m.chambres < Number(etat.chambres)) return false;
    return true;
  }

  function trier(liste) {
    var copie = liste.slice();
    var val = function (m) { return BI.budgetModele(m).min; };
    var tris = {
      'budget-asc':  function (a, b) { return val(a) - val(b); },
      'budget-desc': function (a, b) { return val(b) - val(a); },
      'surface-asc': function (a, b) { return a.surface - b.surface; },
      'surface-desc':function (a, b) { return b.surface - a.surface; },
      'duree-asc':   function (a, b) { return BI.budgetModele(a).duree - BI.budgetModele(b).duree; }
    };
    return copie.sort(tris[etat.tri] || tris['budget-asc']);
  }

  function dessinerFiltres() {
    var hote = $('#filtres');
    if (!hote) return;
    hote.innerHTML = GROUPES.map(function (g) {
      return '<fieldset class="filters__group" style="border:0;padding:0;margin:0">' +
        '<legend class="label filters__legend" style="padding:0">' + g.label + '</legend>' +
        '<div class="chips" role="group">' +
          g.choix.map(function (c) {
            return '<button class="chip" type="button" data-groupe="' + g.cle + '" data-valeur="' + c.id + '"' +
              ' aria-pressed="' + (etat[g.cle] === c.id) + '">' + c.label + '</button>';
          }).join('') +
        '</div>' +
      '</fieldset>';
    }).join('') +
    '<div class="filters__group"><button class="chip" type="button" id="reinit" style="border-style:dashed">' +
      BI.icone('refresh') + ' Réinitialiser</button></div>';

    hote.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-groupe]');
      if (btn) {
        var g = btn.getAttribute('data-groupe');
        etat[g] = btn.getAttribute('data-valeur');
        $$('[data-groupe="' + g + '"]', hote).forEach(function (b) {
          b.setAttribute('aria-pressed', String(b.getAttribute('data-valeur') === etat[g]));
        });
        rendre();
        return;
      }
      if (e.target.closest('#reinit')) {
        etat.usage = etat.budget = etat.niveaux = etat.chambres = 'tous';
        $$('[data-groupe]', hote).forEach(function (b) {
          b.setAttribute('aria-pressed', String(b.getAttribute('data-valeur') === 'tous'));
        });
        rendre();
      }
    });
  }

  function rendre() {
    var grille = $('#grille-modeles');
    var compteur = $('#compteur');
    if (!grille) return;
    var liste = trier(BI.modeles.filter(correspond));

    compteur.textContent = liste.length === 0 ? 'Aucun modèle ne correspond'
      : (liste.length === 1 ? '1 modèle correspond' : liste.length + ' modèles correspondent');

    grille.innerHTML = liste.length
      ? liste.map(BI.carteModele).join('')
      : '<div class="empty-state" style="grid-column:1/-1">' + BI.icone('search') +
        '<p><strong>Rien ne correspond à cette combinaison.</strong><br>Élargissez un critère, ou parlons directement de votre projet.</p>' +
        '<a class="btn btn--sm" style="margin-top:1rem" href="contact.html">Décrire mon projet</a></div>';
  }

  document.addEventListener('bi:ready', function () {
    dessinerFiltres();
    var tri = $('#tri');
    if (tri) tri.addEventListener('change', function (e) { etat.tri = e.target.value; rendre(); });
    rendre();
  });
})();
