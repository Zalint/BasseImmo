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

    var sections = a.contenu.map(function (s, i) {
      return '<h2 id="s' + i + '">' + BI.escape(s[0]) + '</h2><p>' + BI.escape(s[1]) + '</p>';
    }).join('');

    var sommaire = a.contenu.map(function (s, i) {
      return '<li><a href="#s' + i + '">' + BI.escape(s[0]) + '</a></li>';
    }).join('');

    var autres = BI.guide.filter(function (x) { return x.id !== a.id; }).slice(0, 3).map(function (x, i) {
      return '<a class="entry" href="article.html?id=' + x.id + '">' +
        '<span class="entry__idx">' + ('0' + (i + 1)).slice(-2) + '</span>' +
        '<h3 class="entry__title">' + BI.escape(x.titre) + '</h3>' +
        '<p class="entry__desc">' + BI.escape(x.resume) + '</p>' +
        '<span class="entry__go">' + BI.icone('arrow-right') + '</span>' +
      '</a>';
    }).join('');

    $('#article').innerHTML =
    '<section class="page-head"><div class="container">' +
      '<ol class="crumbs">' +
        '<li><a href="index.html">Accueil</a></li>' +
        '<li><a href="guide.html">Guide</a></li>' +
        '<li aria-current="page">' + BI.escape(a.categorie) + '</li>' +
      '</ol>' +
      '<p class="label label--accent" style="margin-bottom:1rem">' + BI.escape(a.categorie) + ' · ' + a.minutes + ' min de lecture</p>' +
      '<h1 style="max-width:16ch">' + BI.escape(a.titre) + '</h1>' +
      '<p>' + BI.escape(a.resume) + '</p>' +
    '</div></section>' +

    '<section class="section section--tight"><div class="container">' +
      '<div class="grid12">' +
        '<nav class="c3" aria-label="Sommaire de l\'article">' +
          '<div style="position:sticky;top:calc(var(--header-h) + 24px)">' +
            '<p class="label" style="margin-bottom:.8rem">Sommaire</p>' +
            '<ol class="mono" style="margin:0;padding-left:1.2rem;font-size:.82rem;line-height:1.7;color:var(--ink-soft)">' + sommaire + '</ol>' +
          '</div>' +
        '</nav>' +
        '<div class="c8 start5">' +
          '<div class="prose" id="corps">' + sections + '</div>' +
          '<div class="note" style="margin-top:3rem">' + BI.icone('info') +
            '<p><strong>Ces informations sont données à titre général.</strong> Les procédures et les prix évoluent, et chaque situation a ses particularités. Pour un cas précis, parlons-en : <a href="contact.html">poser ma question</a>.</p>' +
          '</div>' +
          '<div class="row" style="margin-top:2.2rem">' +
            '<a class="btn" href="simulateur.html">Chiffrer mon projet ' + BI.icone('arrow-right') + '</a>' +
            '<a class="btn btn--line" href="guide.html">Tous les articles</a>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div></section>' +

    '<section class="section section--paper2"><div class="container">' +
      '<div class="shead"><div class="shead__top"><span class="idx">—</span><span class="label">À lire ensuite</span></div>' +
      '<h2>Les autres guides</h2></div>' +
      '<div class="entries">' + autres + '</div>' +
    '</div></section>';
  }

  document.addEventListener('bi:ready', function () {
    var id = new URLSearchParams(location.search).get('id');
    var a = BI.guide.filter(function (x) { return x.id === id; })[0];
    if (!a) { introuvable(); return; }
    rendre(a);
  });
})();
