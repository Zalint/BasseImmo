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

  function tuile(icone, valeur, libelle, couleur) {
    return '<div class="stat-tile">' +
      '<span class="icon-badge ' + (couleur || '') + '" style="width:40px;height:40px;border-radius:12px;margin-bottom:.7rem">' + BI.icone(icone) + '</span>' +
      '<b>' + valeur + '</b><span>' + libelle + '</span>' +
    '</div>';
  }

  function rendre(c) {
    var restants = joursRestants(c.livraisonPrevue);
    var partBudget = Math.round(c.engage / c.budget * 100);

    var phases = c.phases.map(function (p) {
      var cls = p.etat === 'fait' ? 'is-done' : (p.etat === 'encours' ? 'is-active' : '');
      var etiquette = p.etat === 'fait' ? 'Terminé le ' + dateFr(p.date)
        : (p.etat === 'encours' ? 'En cours — ' + p.pct + ' % · échéance ' + dateFr(p.date)
                                : 'Prévu pour le ' + dateFr(p.date));
      var badge = p.etat === 'fait' ? '<span class="badge badge--leaf">' + BI.icone('check') + ' Fait</span>'
        : (p.etat === 'encours' ? '<span class="badge badge--accent">' + BI.icone('hard-hat') + ' En cours</span>'
                                : '<span class="badge">' + BI.icone('clock') + ' À venir</span>');
      return '<div class="tl-item ' + cls + '">' +
        '<div class="cluster" style="gap:.6rem;margin-bottom:.25rem"><h4 style="margin:0">' + BI.escape(p.nom) + '</h4>' + badge + '</div>' +
        (p.note ? '<p>' + BI.escape(p.note) + '</p>' : '') +
        '<time>' + etiquette + '</time>' +
        (p.etat === 'encours' ? '<div class="progress" style="margin-top:.6rem;max-width:240px"><i style="width:' + p.pct + '%"></i></div>' : '') +
      '</div>';
    }).join('');

    var photos = c.photos.map(function (ph, i) {
      return '<figure>' +
        '<img src="assets/img/chantier/' + VIGNETTES[i % VIGNETTES.length] + '.svg" width="600" height="450" loading="lazy" alt="' + BI.escape(ph.legende) + '">' +
        '<figcaption><strong style="display:block;color:var(--text)">' + BI.escape(ph.legende) + '</strong>' + BI.escape(ph.date) + '</figcaption>' +
      '</figure>';
    }).join('');

    var rapports = c.rapports.map(function (r) {
      return '<div style="padding:1.1rem 0;border-bottom:1px dashed var(--border)">' +
        '<div class="cluster" style="gap:.6rem;margin-bottom:.5rem">' +
          '<span class="badge">' + BI.icone('file-text') + ' ' + BI.escape(r.date) + '</span>' +
          '<span style="font-size:.85rem;color:var(--text-mute)">par ' + BI.escape(c.conducteur) + '</span>' +
        '</div>' +
        '<p style="margin:0;color:var(--text-soft);font-size:.94rem">' + BI.escape(r.texte) + '</p>' +
      '</div>';
    }).join('');

    return '' +
    '<div class="card" style="margin-top:2rem;padding:clamp(1.3rem,3vw,2rem)">' +
      '<div class="cluster" style="justify-content:space-between;margin-bottom:1.4rem">' +
        '<div>' +
          '<p class="eyebrow" style="margin-bottom:.3rem">Chantier ' + BI.escape(c.code) + '</p>' +
          '<h2 style="margin:0">' + BI.escape(c.modele) + '</h2>' +
          '<p style="color:var(--text-mute);font-size:.92rem;margin-top:.3rem">' +
            BI.escape(c.client) + ' · ' + BI.escape(c.lieu) + ' · ' + c.surface + ' m²</p>' +
        '</div>' +
        '<button class="btn btn--sm btn--ghost" type="button" id="fermer">' + BI.icone('close') + ' Fermer</button>' +
      '</div>' +

      '<div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:.5rem">' +
        '<strong>Avancement global</strong>' +
        '<span style="font-family:var(--font-display);font-size:1.8rem;font-weight:700;color:var(--accent)">' + c.avancement + '&nbsp;%</span>' +
      '</div>' +
      '<div class="progress" role="img" aria-label="Avancement global : ' + c.avancement + ' pour cent"><i style="width:' + c.avancement + '%"></i></div>' +

      '<div class="grid grid--4" style="margin-top:1.6rem">' +
        tuile('calendar', dateFr(c.debut).replace(/ \d{4}$/, ''), 'Ouverture du chantier') +
        tuile('key', dateFr(c.livraisonPrevue).replace(/ \d{4}$/, ''), restants > 0 ? 'Livraison — dans ' + restants + ' jours' : 'Livraison prévue', 'icon-badge--gold') +
        tuile('wallet', BI.fcfaCourt(c.engage), partBudget + ' % du budget de ' + BI.fcfaCourt(c.budget), 'icon-badge--leaf') +
        tuile('hard-hat', BI.escape(c.conducteur.split(' ')[0]), 'Conducteur de travaux', 'icon-badge--brick') +
      '</div>' +

      '<div class="callout" style="margin-top:1.4rem">' + BI.icone('wind') +
        '<p>' + BI.escape(c.meteo) + '</p></div>' +
    '</div>' +

    '<div class="grid" style="grid-template-columns:1fr;gap:24px;margin-top:24px" id="grille-suivi">' +
      '<div class="card">' +
        '<h3 style="display:flex;align-items:center;gap:.5rem"><span style="color:var(--accent);display:flex">' +
          BI.icone('list') + '</span> Les phases</h3>' +
        '<div class="timeline" style="margin-top:1.4rem">' + phases + '</div>' +
      '</div>' +
      '<div class="stack">' +
        '<div class="card">' +
          '<h3 style="display:flex;align-items:center;gap:.5rem"><span style="color:var(--accent);display:flex">' +
            BI.icone('camera') + '</span> Photos de la semaine</h3>' +
          '<div class="photo-grid" style="margin-top:1.2rem">' + photos + '</div>' +
          '<p style="font-size:.8rem;color:var(--text-mute);margin-top:1rem">Démonstration : ces vignettes sont des illustrations. Sur un vrai chantier, ce sont les photos horodatées du conducteur de travaux.</p>' +
        '</div>' +
        '<div class="card">' +
          '<h3 style="display:flex;align-items:center;gap:.5rem"><span style="color:var(--accent);display:flex">' +
            BI.icone('file-text') + '</span> Rapports hebdomadaires</h3>' +
          '<div style="margin-top:.6rem">' + rapports + '</div>' +
        '</div>' +
        '<div class="card">' +
          '<h3 style="display:flex;align-items:center;gap:.5rem"><span style="color:var(--accent);display:flex">' +
            BI.icone('video') + '</span> Visiter le chantier en visio</h3>' +
          '<p style="margin-top:.5rem">Le conducteur de travaux se rend sur site avec vous en visioconférence, sur rendez-vous, du lundi au samedi.</p>' +
          '<a class="btn btn--wa btn--block" style="margin-top:1rem" data-wa="Bonjour, je souhaite programmer une visite du chantier ' + BI.escape(c.code) + ' en visioconférence." href="#">' +
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

    var grille = $('#grille-suivi');
    var appliquer = function () {
      grille.style.gridTemplateColumns = window.innerWidth >= 1000 ? '1fr 1fr' : '1fr';
    };
    appliquer();
    window.addEventListener('resize', appliquer);

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
