/* =============================================================
   Basse Immo — affichage d'un article du guide
   ============================================================= */
(function () {
  'use strict';
  var BI = window.BI;
  if (!BI || !BI.guide) return;
  var $ = BI.$;

  function introuvable() {
    $('#article').innerHTML =
      '<section class="page-head"><div class="container">' +
        '<h1>Article introuvable</h1><p>Ce guide n\'existe pas ou a été renommé.</p>' +
        '<a class="btn" style="margin-top:1rem" href="guide.html">' + BI.icone('arrow-left') + ' Revenir au guide</a>' +
      '</div></section>';
  }

  function rendre(a) {
    document.title = a.titre + ' | Guide Basse Immo';
    var meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', a.resume);

    var sections = a.contenu.map(function (s) {
      return '<h2>' + BI.escape(s[0]) + '</h2><p>' + BI.escape(s[1]) + '</p>';
    }).join('');

    var sommaire = a.contenu.map(function (s, i) {
      return '<li><a href="#s' + i + '">' + BI.escape(s[0]) + '</a></li>';
    }).join('');

    var autres = BI.guide.filter(function (x) { return x.id !== a.id; }).slice(0, 3).map(function (x) {
      return '<a class="card card--hover" href="article.html?id=' + x.id + '">' +
        '<div class="cluster" style="gap:8px">' +
          '<span class="badge badge--accent">' + BI.icone(x.icone) + ' ' + BI.escape(x.categorie) + '</span>' +
          '<span class="badge">' + BI.icone('clock') + ' ' + x.minutes + ' min</span>' +
        '</div>' +
        '<h3 style="margin-top:1rem;font-size:1.12rem">' + BI.escape(x.titre) + '</h3>' +
        '<p>' + BI.escape(x.resume) + '</p>' +
      '</a>';
    }).join('');

    $('#article').innerHTML =
    '<section class="page-head"><div class="container container--narrow">' +
      '<ol class="crumbs">' +
        '<li><a href="index.html">Accueil</a></li>' +
        '<li><a href="guide.html">Guide</a></li>' +
        '<li aria-current="page">' + BI.escape(a.categorie) + '</li>' +
      '</ol>' +
      '<div class="cluster" style="margin-bottom:1rem">' +
        '<span class="badge badge--accent">' + BI.icone(a.icone) + ' ' + BI.escape(a.categorie) + '</span>' +
        '<span class="badge">' + BI.icone('clock') + ' ' + a.minutes + ' min de lecture</span>' +
      '</div>' +
      '<h1>' + BI.escape(a.titre) + '</h1>' +
      '<p>' + BI.escape(a.resume) + '</p>' +
    '</div></section>' +

    '<section class="section section--tight"><div class="container container--narrow">' +
      '<nav class="card" aria-label="Sommaire de l\'article" style="padding:1.2rem 1.4rem;margin-bottom:2.2rem">' +
        '<p class="field-label" style="margin-bottom:.6rem">' + BI.icone('list') + ' Dans cet article</p>' +
        '<ol style="margin:0;padding-left:1.2rem;color:var(--text-soft)">' + sommaire + '</ol>' +
      '</nav>' +
      '<div class="prose" id="corps">' + sections + '</div>' +

      '<div class="callout" style="margin-top:2.5rem">' + BI.icone('info') +
        '<p><strong>Ces informations sont données à titre général.</strong> Les procédures et les prix évoluent, et chaque situation a ses particularités. Pour un cas précis, parlons-en&nbsp;: <a href="contact.html">poser ma question</a>.</p>' +
      '</div>' +

      '<div class="cluster" style="margin-top:2rem">' +
        '<a class="btn" href="simulateur.html">' + BI.icone('calculator') + ' Chiffrer mon projet</a>' +
        '<a class="btn btn--ghost" href="guide.html">' + BI.icone('arrow-left') + ' Tous les articles</a>' +
      '</div>' +
    '</div></section>' +

    '<section class="section section--alt"><div class="container">' +
      '<div class="section-head"><p class="eyebrow">À lire ensuite</p><h2>Les autres guides</h2></div>' +
      '<div class="grid grid--3">' + autres + '</div>' +
    '</div></section>';

    // Ancres du sommaire
    BI.$$('#corps h2').forEach(function (h, i) { h.id = 's' + i; });
  }

  document.addEventListener('bi:ready', function () {
    var id = new URLSearchParams(location.search).get('id');
    var a = BI.guide.filter(function (x) { return x.id === id; })[0];
    if (!a) { introuvable(); return; }
    rendre(a);
  });
})();
