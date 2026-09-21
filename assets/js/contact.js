/* =============================================================
   Basse Immo — formulaire de contact
   Le site est statique : le formulaire compose un message
   WhatsApp ou un e-mail déjà rédigé. Rien n'est envoyé ni stocké ici.
   ============================================================= */
(function () {
  'use strict';
  var BI = window.BI;
  if (!BI || !BI.modeles) return;
  var $ = BI.$;

  var PROJETS = [
    'Construction d\'une maison', 'Construction d\'un immeuble locatif',
    'Vérification d\'un terrain', 'Plans et permis de construire',
    'Rénovation ou surélévation', 'Je ne sais pas encore'
  ];

  function remplirListes() {
    $('#f-projet').innerHTML = PROJETS.map(function (p) {
      return '<option>' + BI.escape(p) + '</option>';
    }).join('');

    $('#f-modele').innerHTML = '<option value="">Aucun / sur mesure</option>' +
      BI.modeles.map(function (m) {
        return '<option value="' + m.id + '">' + BI.escape(m.nom) + ' — ' + m.surface + ' m², ' + BI.escape(m.niveaux) + '</option>';
      }).join('');

    var groupes = {};
    BI.zones.forEach(function (z) { (groupes[z.region] = groupes[z.region] || []).push(z); });
    $('#f-zone').innerHTML = '<option value="">Je ne sais pas encore</option>' +
      Object.keys(groupes).map(function (r) {
        return '<optgroup label="' + r + '">' + groupes[r].map(function (z) {
          return '<option value="' + BI.escape(z.nom) + '">' + BI.escape(z.nom) + '</option>';
        }).join('') + '</optgroup>';
      }).join('');

    // Pré-sélection depuis une fiche modèle : contact.html?modele=teranga
    var pre = new URLSearchParams(location.search).get('modele');
    if (pre && BI.modeles.some(function (m) { return m.id === pre; })) {
      $('#f-modele').value = pre;
      $('#f-projet').value = 'Construction d\'une maison';
    }
  }

  function lire() {
    var val = function (id) { var e = $(id); return e ? e.value.trim() : ''; };
    var terrain = document.querySelector('input[name="terrain"]:checked');
    var modeleSel = $('#f-modele');
    return {
      nom: val('#f-nom'), tel: val('#f-tel'), email: val('#f-email'), pays: val('#f-pays'),
      projet: val('#f-projet'),
      modele: modeleSel.value ? modeleSel.options[modeleSel.selectedIndex].text : '',
      zone: val('#f-zone'), budget: val('#f-budget'),
      terrain: terrain ? terrain.value : '',
      message: val('#f-message')
    };
  }

  function valider(d) {
    if (!d.nom) return { champ: '#f-nom', texte: 'Merci d\'indiquer votre nom.' };
    if (!d.tel) return { champ: '#f-tel', texte: 'Un numéro de téléphone ou WhatsApp est nécessaire pour vous répondre.' };
    if (d.tel.replace(/[^0-9]/g, '').length < 8) return { champ: '#f-tel', texte: 'Ce numéro semble incomplet.' };
    if (d.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email)) {
      return { champ: '#f-email', texte: 'Cette adresse e-mail ne semble pas valide.' };
    }
    return null;
  }

  function composer(d) {
    var l = ['Bonjour Basse Immo,', ''];
    l.push('Je suis ' + d.nom + '.');
    if (d.pays) l.push('Je vis à ' + d.pays + '.');
    l.push('');
    l.push('• Projet : ' + d.projet);
    if (d.modele) l.push('• Modèle qui m\'intéresse : ' + d.modele);
    if (d.zone) l.push('• Zone : ' + d.zone);
    if (d.budget) l.push('• Budget envisagé : ' + d.budget);
    if (d.terrain) l.push('• Terrain : ' + d.terrain);
    l.push('• Me joindre : ' + d.tel + (d.email ? ' / ' + d.email : ''));
    if (d.message) { l.push(''); l.push(d.message); }
    l.push('');
    l.push('Merci de me recontacter.');
    return l.join('\n');
  }

  function erreur(e) {
    var bloc = $('#form-erreur');
    if (!e) { bloc.style.display = 'none'; return false; }
    bloc.textContent = e.texte;
    bloc.style.display = 'block';
    var champ = $(e.champ);
    if (champ) { champ.focus(); champ.setAttribute('aria-invalid', 'true'); }
    return true;
  }

  document.addEventListener('bi:ready', function () {
    var form = $('#form-contact');
    if (!form) return;
    remplirListes();

    form.addEventListener('input', function (e) {
      if (e.target.hasAttribute('aria-invalid')) e.target.removeAttribute('aria-invalid');
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var d = lire();
      if (erreur(valider(d))) return;
      erreur(null);
      window.open(BI.waLink(composer(d)), '_blank', 'noopener');
      BI.toast('Votre message est prêt dans WhatsApp');
    });

    $('#envoi-mail').addEventListener('click', function () {
      var d = lire();
      if (erreur(valider(d))) return;
      erreur(null);
      var sujet = 'Demande de devis — ' + d.projet + (d.modele ? ' (' + d.modele + ')' : '');
      location.href = 'mailto:' + BI.contact.email +
        '?subject=' + encodeURIComponent(sujet) +
        '&body=' + encodeURIComponent(composer(d));
      BI.toast('Votre message est prêt dans votre messagerie');
    });
  });
})();
