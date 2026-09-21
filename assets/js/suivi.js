/* =============================================================
   Basse Immo — espace de suivi de chantier
   ============================================================= */
(function () {
  'use strict';
  var BI = window.BI;
  if (!BI || !BI.chantiers) return;
  var $ = BI.$, $$ = BI.$$;

  var VIGNETTES = ['chantier-1', 'chantier-2', 'chantier-3', 'chantier-4', 'chantier-5', 'chantier-6'];

  function dateFr(iso) {
    var d = new Date(iso + 'T00:00:00');
    if (isNaN(d)) return iso;
    return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
  }

  function joursRestants(iso) {
    var d = new Date(iso + 'T00:00:00');
    return Math.round((d - new Date()) / 86400000);
  }

  function rendre(c) {
    var restants = joursRestants(c.livraisonPrevue);
    var partBudget = Math.round(c.engage / c.budget * 100);

    var phases = c.phases.map(function (p) {
      var cls = p.etat === 'fait' ? 'is-done' : (p.etat === 'encours' ? 'is-active' : '');
      var quand = p.etat === 'fait' ? 'Terminé le ' + dateFr(p.date)
        : (p.etat === 'encours' ? 'En cours · ' + p.pct + ' % · échéance ' + dateFr(p.date)
                                : 'Prévu pour le ' + dateFr(p.date));
      return '<div class="tl-item ' + cls + '">' +
        '<h4>' + BI.escape(p.nom) + '</h4>' +
        (p.note ? '<p>' + BI.escape(p.note) + '</p>' : '') +
        '<time>' + quand + '</time>' +
        (p.etat === 'encours' ? '<div class="progress" style="margin-top:.7rem;max-width:220px"><i style="width:' + p.pct + '%"></i></div>' : '') +
      '</div>';
    }).join('');

    var photos = c.photos.map(function (ph, i) {
      return '<figure>' +
        '<img src="assets/img/chantier/' + VIGNETTES[i % VIGNETTES.length] + '.svg" width="600" height="450" loading="lazy" alt="' + BI.escape(ph.legende) + '">' +
        '<figcaption><strong>' + BI.escape(ph.legende) + '</strong>' + BI.escape(ph.date) + '</figcaption>' +
      '</figure>';
    }).join('');

    var rapports = c.rapports.map(function (r) {
      return '<div style="padding:1.2rem 0;border-bottom:1px solid var(--hair)">' +
        '<p class="label" style="margin-bottom:.5rem">' + BI.escape(r.date) + ' · ' + BI.escape(c.conducteur) + '</p>' +
        '<p style="margin:0;color:var(--ink-soft);font-size:.95rem">' + BI.escape(r.texte) + '</p>' +
      '</div>';
    }).join('');

    var tuile = function (valeur, libelle) {
      return '<div class="tile"><b>' + valeur + '</b><span>' + libelle + '</span></div>';
    };

    return '' +
    '<div style="margin-top:3rem;border-top:1px solid var(--hair);padding-top:2rem">' +
      '<div class="row row--between" style="align-items:flex-start;margin-bottom:1.6rem">' +
        '<div>' +
          '<p class="label label--accent" style="margin-bottom:.5rem">Chantier ' + BI.escape(c.code) + '</p>' +
          '<h2 style="margin-bottom:.3rem">' + BI.escape(c.modele) + '</h2>' +
          '<p class="mono" style="font-size:.74rem;letter-spacing:.08em;text-transform:uppercase;color:var(--ink-mute)">' +
            BI.escape(c.client) + ' · ' + BI.escape(c.lieu) + ' · ' + c.surface + ' m²</p>' +
        '</div>' +
        '<button class="btn btn--line btn--sm" type="button" id="fermer">' + BI.icone('close') + ' Fermer</button>' +
      '</div>' +

      '<div class="row row--between" style="align-items:baseline;margin-bottom:.6rem">' +
        '<span class="label">Avancement global</span>' +
        '<span class="mono" style="font-size:2.4rem;font-weight:500;letter-spacing:-.05em;color:var(--accent)">' + c.avancement + '&nbsp;%</span>' +
      '</div>' +
      '<div class="progress" role="img" aria-label="Avancement global : ' + c.avancement + ' pour cent"><i style="width:' + c.avancement + '%"></i></div>' +

      '<div class="tiles" style="margin-top:1.8rem">' +
        tuile(dateFr(c.debut).replace(/ \d{4}$/, ''), 'Ouverture du chantier') +
        tuile(dateFr(c.livraisonPrevue).replace(/ \d{4}$/, ''), restants > 0 ? 'Livraison · dans ' + restants + ' jours' : 'Livraison prévue') +
        tuile(BI.fcfaCourt(c.engage), partBudget + ' % du budget de ' + BI.fcfaCourt(c.budget)) +
        tuile(BI.escape(c.conducteur.split(' ')[0]), 'Conducteur de travaux') +
      '</div>' +

      '<div class="note" style="margin-top:1.6rem">' + BI.icone('wind') + '<p>' + BI.escape(c.meteo) + '</p></div>' +

      '<div class="grid12" style="margin-top:2.5rem">' +
        '<div class="c6">' +
          '<h3 class="label label--accent" style="margin-bottom:1.2rem">Les phases</h3>' +
          '<div class="timeline">' + phases + '</div>' +
        '</div>' +
        '<div class="c6">' +
          '<h3 class="label label--accent" style="margin-bottom:1.2rem">Photos de la semaine</h3>' +
          '<div class="photo-grid">' + photos + '</div>' +
          '<p class="mono" style="font-size:.68rem;color:var(--ink-mute);margin-top:.9rem;line-height:1.6">Démonstration : ces vignettes sont des illustrations. Sur un vrai chantier, ce sont les photos horodatées du conducteur de travaux.</p>' +

          '<h3 class="label label--accent" style="margin:2.4rem 0 .6rem">Rapports hebdomadaires</h3>' +
          '<div style="border-top:1px solid var(--hair)">' + rapports + '</div>' +

          '<h3 class="label label--accent" style="margin:2.4rem 0 .8rem">Visiter le chantier en visio</h3>' +
          '<p style="color:var(--ink-soft);font-size:.95rem">Le conducteur de travaux se rend sur site avec vous en visioconférence, sur rendez-vous, du lundi au samedi.</p>' +
          '<a class="btn btn--wa btn--block" style="margin-top:1.1rem" data-wa="Bonjour, je souhaite programmer une visite du chantier ' + BI.escape(c.code) + ' en visioconférence." href="#">' +
            BI.icone('whatsapp') + ' Prendre rendez-vous</a>' +
        '</div>' +
      '</div>' +
    '</div>';
  }

  function ouvrir(code) {
    var c = BI.chantiers[code];
    var hote = $('#tableau-bord');
    if (!c || !hote) return false;

    hote.innerHTML = rendre(c);
    hote.hidden = false;

    $$('[data-wa]', hote).forEach(function (a) {
      a.href = BI.waLink(a.getAttribute('data-wa'));
      a.target = '_blank'; a.rel = 'noopener';
    });
    $('#fermer').addEventListener('click', function () {
      hote.hidden = true;
      hote.innerHTML = '';
      $('#code').focus();
    });

    hote.scrollIntoView({ behavior: 'smooth', block: 'start' });
    return true;
  }

  document.addEventListener('bi:ready', function () {
    var form = $('#form-code');
    if (!form) return;
    var erreur = $('#code-erreur');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var code = $('#code').value.trim().toUpperCase();
      if (!code) {
        erreur.textContent = 'Entrez le code figurant sur votre contrat.';
        erreur.style.display = 'block';
        return;
      }
      if (ouvrir(code)) {
        erreur.style.display = 'none';
        BI.toast('Espace du chantier ' + code + ' ouvert');
      } else {
        erreur.textContent = 'Code inconnu. Vérifiez la saisie ou essayez une démonstration ci-dessous.';
        erreur.style.display = 'block';
      }
    });

    $$('[data-demo]').forEach(function (b) {
      b.addEventListener('click', function () {
        var code = b.getAttribute('data-demo');
        $('#code').value = code;
        erreur.style.display = 'none';
        ouvrir(code);
      });
    });

    var pre = new URLSearchParams(location.search).get('code');
    if (pre) { $('#code').value = pre.toUpperCase(); ouvrir(pre.toUpperCase()); }
  });
})();
