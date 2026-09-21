/* =============================================================
   Basse Immo — simulateur de budget complet
   ============================================================= */
(function () {
  'use strict';
  var BI = window.BI;
  if (!BI || !BI.estimer) return;
  var $ = BI.$, $$ = BI.$$;

  var etat = {
    type: 'r1', surface: 180, finition: 'standard', zone: 'mermoz',
    aTerrain: true, parcelle: 200, options: ['cloture'],
    apport: 30, taux: 8, annees: 12
  };

  /* Pré-remplissage depuis l'URL (liens venant de l'accueil ou d'une fiche). */
  function lireUrl() {
    var p = new URLSearchParams(location.search);
    var num = function (cle, min, max) {
      var v = Number(p.get(cle));
      return isFinite(v) && v >= min && v <= max ? v : null;
    };
    var existe = function (liste, v) { return liste.some(function (x) { return x.id === v; }); };
    if (existe(BI.typesProjet, p.get('type'))) etat.type = p.get('type');
    if (existe(BI.finitions, p.get('finition'))) etat.finition = p.get('finition');
    if (existe(BI.zones, p.get('zone'))) etat.zone = p.get('zone');
    var s = num('surface', 40, 900); if (s) etat.surface = s;
    var pa = num('parcelle', 60, 2000);
    if (pa) { etat.parcelle = pa; }
  }

  function groupeZones(selection) {
    var groupes = {};
    BI.zones.forEach(function (z) { (groupes[z.region] = groupes[z.region] || []).push(z); });
    return Object.keys(groupes).map(function (region) {
      return '<optgroup label="' + region + '">' +
        groupes[region].map(function (z) {
          return '<option value="' + z.id + '"' + (z.id === selection ? ' selected' : '') + '>' + BI.escape(z.nom) + '</option>';
        }).join('') + '</optgroup>';
    }).join('');
  }

  function dessinerPanneau() {
    return '' +
    '<div class="sim__panel">' +

      '<div class="sim__group">' +
        '<h3>' + BI.icone('home') + ' Votre projet</h3>' +
        '<div class="field">' +
          '<span class="field-label" id="lbl-type">Type de construction</span>' +
          '<div class="choices choices--3" role="radiogroup" aria-labelledby="lbl-type">' +
            BI.typesProjet.map(function (t) {
              return '<label class="choice">' +
                '<input type="radio" name="type" value="' + t.id + '"' + (t.id === etat.type ? ' checked' : '') + '>' +
                BI.icone(t.icone) +
                '<span class="choice__label">' + BI.escape(t.nom) + '<small>' + BI.escape(t.detail) + '</small></span>' +
              '</label>';
            }).join('') +
          '</div>' +
        '</div>' +

        '<div class="field">' +
          '<div class="range-head">' +
            '<label for="sim-surface">Surface habitable</label>' +
            '<span class="range-value"><span id="sim-surface-val">' + etat.surface + '</span><small>m²</small></span>' +
          '</div>' +
          '<input type="range" id="sim-surface" min="40" max="900" step="5" value="' + etat.surface + '">' +
          '<div class="range-scale"><span>40 m²</span><span>900 m²</span></div>' +
          '<p class="field__hint">Surface construite, tous niveaux confondus. Terrasses non couvertes non comprises.</p>' +
        '</div>' +

        '<div class="field" style="margin-bottom:0">' +
          '<span class="field-label" id="lbl-fin">Niveau de finition</span>' +
          '<div class="choices choices--2" role="radiogroup" aria-labelledby="lbl-fin">' +
            BI.finitions.map(function (f) {
              return '<label class="choice">' +
                '<input type="radio" name="finition" value="' + f.id + '"' + (f.id === etat.finition ? ' checked' : '') + '>' +
                BI.icone(f.icone) +
                '<span class="choice__label">' + BI.escape(f.nom) + '<small>' + BI.fmt(f.min) + ' – ' + BI.fmt(f.max) + ' FCFA/m²</small></span>' +
              '</label>';
            }).join('') +
          '</div>' +
          '<p class="field__hint" id="fin-detail"></p>' +
        '</div>' +
      '</div>' +

      '<div class="sim__group">' +
        '<h3>' + BI.icone('map-pin') + ' Le terrain</h3>' +
        '<div class="field">' +
          '<label for="sim-zone">Où allez-vous construire&nbsp;?</label>' +
          '<select class="select" id="sim-zone">' + groupeZones(etat.zone) + '</select>' +
          '<p class="field__hint" id="zone-detail"></p>' +
        '</div>' +
        '<div class="field">' +
          '<span class="field-label" id="lbl-terrain">Avez-vous déjà le terrain&nbsp;?</span>' +
          '<div class="choices choices--2" role="radiogroup" aria-labelledby="lbl-terrain">' +
            '<label class="choice"><input type="radio" name="terrain" value="oui"' + (etat.aTerrain ? ' checked' : '') + '>' +
              BI.icone('check-circle') + '<span class="choice__label">Oui, je l\'ai déjà<small>Le terrain n\'entre pas dans le calcul</small></span></label>' +
            '<label class="choice"><input type="radio" name="terrain" value="non"' + (!etat.aTerrain ? ' checked' : '') + '>' +
              BI.icone('search') + '<span class="choice__label">Pas encore<small>On estime aussi le prix du terrain</small></span></label>' +
          '</div>' +
        '</div>' +
        '<div class="field" id="champ-parcelle" style="margin-bottom:0">' +
          '<div class="range-head">' +
            '<label for="sim-parcelle">Surface de la parcelle</label>' +
            '<span class="range-value"><span id="sim-parcelle-val">' + etat.parcelle + '</span><small>m²</small></span>' +
          '</div>' +
          '<input type="range" id="sim-parcelle" min="80" max="1200" step="10" value="' + etat.parcelle + '">' +
          '<div class="range-scale"><span>80 m²</span><span>1 200 m²</span></div>' +
        '</div>' +
      '</div>' +

      '<div class="sim__group">' +
        '<h3>' + BI.icone('sliders') + ' Les options</h3>' +
        '<p class="field__hint" style="margin-bottom:.8rem">Ce sont les postes que les devis oublient le plus souvent. Cochez ce dont vous avez besoin.</p>' +
        '<div class="choices choices--2">' +
          BI.options.map(function (o) {
            return '<label class="choice">' +
              '<input type="checkbox" name="option" value="' + o.id + '"' + (etat.options.indexOf(o.id) >= 0 ? ' checked' : '') + '>' +
              BI.icone(o.icone) +
              '<span class="choice__label">' + BI.escape(o.nom) + '<small>' + BI.fcfaCourt(o.cout) + ' · ' + BI.escape(o.unite) + '</small></span>' +
            '</label>';
          }).join('') +
        '</div>' +
      '</div>' +

      '<div class="sim__group">' +
        '<h3>' + BI.icone('bank') + ' Le financement</h3>' +
        '<p class="field__hint" style="margin-bottom:1rem">Simulation indicative d\'un crédit habitat. Les conditions réelles dépendent de votre banque et de votre dossier.</p>' +
        '<div class="cols cols--2" style="gap:0 20px">' +
          '<div class="field">' +
            '<div class="range-head"><label for="sim-apport">Apport personnel</label>' +
              '<span class="range-value"><span id="sim-apport-val">' + etat.apport + '</span><small>%</small></span></div>' +
            '<input type="range" id="sim-apport" min="0" max="100" step="5" value="' + etat.apport + '">' +
          '</div>' +
          '<div class="field">' +
            '<div class="range-head"><label for="sim-annees">Durée du prêt</label>' +
              '<span class="range-value"><span id="sim-annees-val">' + etat.annees + '</span><small>ans</small></span></div>' +
            '<input type="range" id="sim-annees" min="3" max="20" step="1" value="' + etat.annees + '">' +
          '</div>' +
        '</div>' +
        '<div class="field" style="margin-bottom:0">' +
          '<div class="range-head"><label for="sim-taux">Taux annuel</label>' +
            '<span class="range-value"><span id="sim-taux-val">' + String(etat.taux).replace('.', ',') + '</span><small>%</small></span></div>' +
          '<input type="range" id="sim-taux" min="4" max="14" step="0.25" value="' + etat.taux + '">' +
        '</div>' +
      '</div>' +

    '</div>' +

    '<div class="sim__result" id="sim-resultat"></div>';
  }

  function dessinerResultat(r) {
    var mensualite = null;
    var aFinancer = r.moyen * (1 - etat.apport / 100);
    if (aFinancer > 0 && etat.apport < 100) mensualite = BI.mensualite(aFinancer, etat.taux, etat.annees);

    var barres = r.postes.map(function (p) {
      return '<div class="brk">' +
        '<div class="brk__row"><span>' + BI.escape(p.nom) + '</span><b>' + BI.fcfaCourt(p.montant) + '</b></div>' +
        '<div class="brk__bar"><i style="width:' + (p.part * 100).toFixed(1) + '%"></i></div>' +
      '</div>';
    }).join('');

    var blocTerrain = '';
    if (r.terrain) {
      blocTerrain =
        '<div class="sim__extra">' +
          '<p class="label">Terrain estimé en plus</p>' +
          '<p class="sim__figure">' + BI.fourchette(r.terrain.min, r.terrain.max) + '</p>' +
          '<p class="fine">' + etat.parcelle + ' m² à ' +
            BI.fmt(r.terrain.m2Min) + ' – ' + BI.fmt(r.terrain.m2Max) + ' FCFA/m² · hors frais de mutation</p>' +
          '<p class="sim__sum">Tout compris : ' + BI.fourchette(r.min + r.terrain.min, r.max + r.terrain.max) + '</p>' +
        '</div>';
    }

    var blocCredit = '';
    if (mensualite) {
      blocCredit =
        '<div class="sim__extra">' +
          '<p class="label">Mensualité estimée</p>' +
          '<p class="sim__figure">' + BI.fcfa(Math.round(mensualite)) + '<small> / mois</small></p>' +
          '<p class="fine">Apport de ' + BI.fcfaCourt(r.moyen * etat.apport / 100) +
            ', emprunt de ' + BI.fcfaCourt(aFinancer) + ' sur ' + etat.annees + ' ans à ' + String(etat.taux).replace('.', ',') + ' %</p>' +
        '</div>';
    }

    return '' +
      '<p class="label" style="margin-bottom:.4rem">Budget construction</p>' +
      '<p class="sim__total">' + BI.fourchette(r.min, r.max) + '</p>' +
      '<p class="sim__total-sub">' + r.surface + ' m² · ' + BI.fmt(Math.round(r.m2Min / 1000) * 1000) + ' à ' +
        BI.fmt(Math.round(r.m2Max / 1000) * 1000) + ' FCFA le m² · chantier estimé à ' + r.duree + ' mois</p>' +
      '<div class="sim__fx">' +
        ['EUR', 'USD', 'CAD'].map(function (d) {
          return '<span class="tag">' + BI.enDevise(r.min, d) + ' – ' + BI.enDevise(r.max, d) + '</span>';
        }).join('') +
      '</div>' +
      '<div class="sim__breakdown">' + barres + '</div>' +
      blocTerrain +
      blocCredit +
      '<div class="stack" style="margin-top:1.8rem">' +
        '<a class="btn btn--accent btn--block" id="sim-wa" href="#">' + BI.icone('whatsapp') + ' Envoyer cette estimation</a>' +
        '<a class="btn btn--line btn--block" href="contact.html">Demander un devis détaillé ' + BI.icone('arrow-right') + '</a>' +
      '</div>' +
      '<div class="sim__note">' + BI.icone('info') +
        '<span>Estimation indicative fondée sur des prix de marché observés au Sénégal. Elle ne vaut pas devis. Rien n\'est enregistré ni transmis.</span>' +
      '</div>';
  }

  function messageWhatsapp(r) {
    var l = [];
    l.push('Bonjour Basse Immo, voici mon estimation faite sur votre simulateur :');
    l.push('');
    l.push('• Projet : ' + r.type.nom);
    l.push('• Surface : ' + r.surface + ' m²');
    l.push('• Finition : ' + r.finition.nom);
    l.push('• Zone : ' + r.zone.nom);
    if (r.optionsDetail.length) {
      l.push('• Options : ' + r.optionsDetail.map(function (o) { return o.nom; }).join(', '));
    }
    l.push('');
    l.push('Budget construction estimé : ' + BI.fourchette(r.min, r.max));
    if (r.terrain) l.push('Terrain (' + etat.parcelle + ' m²) : ' + BI.fourchette(r.terrain.min, r.terrain.max));
    l.push('Durée estimée : ' + r.duree + ' mois');
    l.push('');
    l.push('Pouvez-vous me rappeler pour un devis détaillé ?');
    return l.join('\n');
  }

  function echeancierHtml(r) {
    return '<div class="card" style="margin-top:20px">' +
      '<p class="label label--accent" style="margin-bottom:.9rem">Échéancier</p>' +
      '<h3 style="max-width:20ch">Comment vous paierez</h3>' +
      '<p style="color:var(--ink-soft);font-size:.96rem;max-width:58ch">Chaque tranche n\'est appelée qu\'après constat d\'avancement sur site. Aucun paiement à l\'avance, aucun paiement au calendrier seul.</p>' +
      '<div style="margin-top:1.2rem">' +
        r.echeancier.map(function (e, i) {
          return '<div class="sched-row">' +
            '<span class="sched-row__dot">' + (i + 1) + '</span>' +
            '<span>' + BI.escape(e.etape) + '<small>' + Math.round(e.part * 100) + ' % du marché</small></span>' +
            '<strong>' + BI.fcfaCourt(e.montant) + '</strong>' +
          '</div>';
        }).join('') +
      '</div></div>';
  }

  function calculer() {
    var r = BI.estimer({
      type: etat.type, surface: etat.surface, finition: etat.finition, zone: etat.zone,
      options: etat.options, parcelle: etat.aTerrain ? 0 : etat.parcelle
    });

    $('#sim-resultat').innerHTML = dessinerResultat(r);
    var wa = $('#sim-wa');
    if (wa) { wa.href = BI.waLink(messageWhatsapp(r)); wa.target = '_blank'; wa.rel = 'noopener'; }

    var bloc = $('#bloc-echeancier');
    if (bloc) bloc.innerHTML = echeancierHtml(r);

    var fin = BI.trouver(BI.finitions, etat.finition);
    var detFin = $('#fin-detail');
    if (detFin) detFin.textContent = fin.detail;

    var z = BI.trouver(BI.zones, etat.zone);
    var detZone = $('#zone-detail');
    if (detZone) {
      var ecart = Math.round((z.coef - 1) * 100);
      detZone.textContent = ecart === 0
        ? 'Coût de construction de référence.'
        : (ecart > 0 ? 'Construire ici revient environ ' + ecart + ' % plus cher (transport des matériaux, déplacement des équipes).'
                     : 'Construire ici revient environ ' + Math.abs(ecart) + ' % moins cher qu\'à Dakar.');
    }

    // La clôture dépend de la parcelle : on garde le champ visible même si le terrain est acquis.
    var champ = $('#champ-parcelle');
    if (champ) {
      var libelle = champ.querySelector('label');
      if (libelle) libelle.textContent = etat.aTerrain ? 'Surface de votre parcelle' : 'Surface de la parcelle recherchée';
    }
  }

  function brancher() {
    $$('input[name="type"]').forEach(function (i) {
      i.addEventListener('change', function () { etat.type = i.value; calculer(); });
    });
    $$('input[name="finition"]').forEach(function (i) {
      i.addEventListener('change', function () { etat.finition = i.value; calculer(); });
    });
    $$('input[name="terrain"]').forEach(function (i) {
      i.addEventListener('change', function () { etat.aTerrain = i.value === 'oui'; calculer(); });
    });
    $$('input[name="option"]').forEach(function (i) {
      i.addEventListener('change', function () {
        var k = etat.options.indexOf(i.value);
        if (i.checked && k < 0) etat.options.push(i.value);
        if (!i.checked && k >= 0) etat.options.splice(k, 1);
        calculer();
      });
    });
    $('#sim-zone').addEventListener('change', function (e) { etat.zone = e.target.value; calculer(); });

    [['surface', 'surface'], ['parcelle', 'parcelle'], ['apport', 'apport'], ['annees', 'annees'], ['taux', 'taux']]
      .forEach(function (paire) {
        var champ = $('#sim-' + paire[0]);
        if (!champ) return;
        champ.addEventListener('input', function (e) {
          etat[paire[1]] = Number(e.target.value);
          $('#sim-' + paire[0] + '-val').textContent = String(e.target.value).replace('.', ',');
          calculer();
        });
      });
  }

  function explications() {
    var hote = $('#explications');
    if (!hote) return;
    var cartes = [
      ['layers', 'Le type de construction',
       'Un R+2 coûte plus cher au mètre carré qu\'un plain-pied : structure renforcée, escaliers, réseaux verticaux, échafaudages. À l\'inverse, une rénovation part d\'un bâti existant et revient nettement moins cher.'],
      ['maximize', 'La surface',
       'Le coût au mètre carré baisse légèrement quand la surface augmente : certains postes, comme le raccordement ou l\'installation de chantier, sont fixes. Mais le total, lui, monte vite.'],
      ['sparkles', 'Le niveau de finition',
       'C\'est le paramètre le plus élastique. Entre une finition économique et du haut standing, le prix au mètre carré peut tripler alors que la structure, elle, reste la même.'],
      ['map-pin', 'La zone',
       'Construire à Ziguinchor ou à Kédougou coûte plus cher qu\'à Thiès : les matériaux voyagent plus loin et les équipes doivent être hébergées. L\'écart atteint couramment 15 %.']
    ];
    hote.innerHTML = '<div class="entries" style="grid-column:1/-1">' + cartes.map(function (c, i) {
      return '<div class="entry" data-reveal>' +
        '<span class="entry__idx">' + ('0' + (i + 1)).slice(-2) + '</span>' +
        '<h3 class="entry__title">' + c[1] + '</h3>' +
        '<p class="entry__desc">' + c[2] + '</p>' +
        '<span></span>' +
      '</div>';
    }).join('') + '</div>';
  }

  document.addEventListener('bi:ready', function () {
    var hote = $('#simulateur');
    if (!hote) return;
    lireUrl();
    hote.innerHTML = dessinerPanneau();

    var conteneur = document.createElement('div');
    conteneur.id = 'bloc-echeancier';
    hote.parentNode.insertBefore(conteneur, hote.nextSibling);

    brancher();
    calculer();
    explications();
  });
})();
