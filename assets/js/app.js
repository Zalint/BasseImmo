/* =============================================================
   Basse Immo — comportements communs à toutes les pages
   ============================================================= */
(function () {
  'use strict';

  var BI = window.BI = window.BI || {};

  /* ---------- petits utilitaires ---------- */
  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  BI.$ = $; BI.$$ = $$;

  // Espace insécable. L'espace fine (U+202F) est si étroite dans la police du site
  // qu'elle disparaît dans les titres resserrés : « 67,9MFCFA ».
  var NBSP = '\u00A0';

  BI.fmt = function (n) {
    if (!isFinite(n)) return '—';
    return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, NBSP);
  };

  BI.fcfa = function (n) { return BI.fmt(n) + NBSP + 'FCFA'; };

  /** Montants longs : « 52,4 M FCFA » reste plus lisible qu'une file de chiffres. */
  BI.fcfaCourt = function (n) {
    if (!isFinite(n)) return '—';
    if (n >= 1e9) return (n / 1e9).toFixed(n >= 1e10 ? 0 : 1).replace('.', ',') + NBSP + 'Md' + NBSP + 'FCFA';
    if (n >= 1e6) return (n / 1e6).toFixed(n >= 1e8 ? 0 : 1).replace('.', ',') + NBSP + 'M' + NBSP + 'FCFA';
    if (n >= 1e3) return Math.round(n / 1e3) + NBSP + 'k' + NBSP + 'FCFA';
    return BI.fcfa(n);
  };

  /** Fourchette avec une seule mention de l'unité : « 44,8 – 58,2 M FCFA ». */
  BI.fourchette = function (min, max) {
    var unite = function (n) {
      if (n >= 1e9) return ['Md', 1e9];
      if (n >= 1e6) return ['M', 1e6];
      if (n >= 1e3) return ['k', 1e3];
      return ['', 1];
    };
    var a = unite(min), b = unite(max);
    if (a[0] !== b[0]) return BI.fcfaCourt(min) + ' – ' + BI.fcfaCourt(max);
    var entiers = max / b[1] >= 100;
    var f = function (n) {
      var v = n / a[1];
      return (entiers ? String(Math.round(v)) : v.toFixed(1).replace('.', ',')).replace(/,0$/, '');
    };
    return f(min) + ' – ' + f(max) + NBSP + (a[0] ? a[0] + NBSP : '') + 'FCFA';
  };

  BI.enDevise = function (montantFcfa, code) {
    var d = (BI.devises || {})[code];
    if (!d) return '';
    var v = montantFcfa / d.taux;
    var arrondi = v >= 100000 ? Math.round(v / 1000) * 1000 : Math.round(v / 100) * 100;
    return BI.fmt(arrondi) + NBSP + d.libelle;
  };

  BI.icone = function (nom, classe) {
    return '<svg class="ico ' + (classe || '') + '" aria-hidden="true"><use href="#i-' + nom + '"></use></svg>';
  };

  BI.escape = function (s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };

  /* Le stockage local peut être bloqué (navigation privée, cookies refusés). */
  BI.store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) { /* sans effet */ } }
  };

  /* ---------- thème : clair par défaut, sombre seulement sur demande ---------- */
  function initTheme() {
    var barre = $('meta[name="theme-color"]');
    var boutons = $$('[data-theme-toggle]');
    function appliquer(theme) {
      document.documentElement.setAttribute('data-theme', theme);
      if (barre) barre.setAttribute('content', theme === 'dark' ? '#070B17' : '#FFFFFF');
      boutons.forEach(function (btn) { btn.setAttribute('aria-pressed', String(theme === 'dark')); });
    }
    // Les réglages du système sont ignorés : seul un choix fait ici active le thème sombre.
    appliquer(BI.store.get('bi-theme') === 'dark' ? 'dark' : 'light');
    boutons.forEach(function (btn) {
      btn.setAttribute('aria-label', 'Thème sombre');
      btn.addEventListener('click', function () {
        var suivant = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        appliquer(suivant);
        BI.store.set('bi-theme', suivant);
      });
    });
  }

  /* ---------- menu mobile ---------- */
  function initNav() {
    var burger = $('[data-burger]');
    var nav = $('#nav-principal');
    if (!burger || !nav) return;

    function estOuvert() { return nav.classList.contains('is-open'); }
    function fermer() {
      nav.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
      burger.setAttribute('aria-label', 'Ouvrir le menu');
      burger.innerHTML = BI.icone('menu');
    }
    burger.addEventListener('click', function () {
      var ouvert = nav.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', String(ouvert));
      burger.setAttribute('aria-label', ouvert ? 'Fermer le menu' : 'Ouvrir le menu');
      burger.innerHTML = BI.icone(ouvert ? 'close' : 'menu');
    });
    nav.addEventListener('click', function (e) { if (e.target.closest('a')) fermer(); });
    // Un clic hors du panneau le referme, comme une feuille d'application.
    document.addEventListener('click', function (e) {
      if (estOuvert() && !nav.contains(e.target) && !burger.contains(e.target)) fermer();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && estOuvert()) { fermer(); burger.focus(); }
    });
    window.addEventListener('resize', function () { if (window.innerWidth > 940) fermer(); });
  }

  /* ---------- typographie française ----------
     Une espace ordinaire avant « : ; ? ! % » ou après « laisse le navigateur couper
     la ligne au mauvais endroit (« délibération / : ce que… »). On la rend insécable,
     y compris dans le contenu dessiné plus tard par les scripts de page. */
  var AVANT_PONCTUATION = / ([:;?!»%])/g;
  function typographierTexte(n) {
    var t = n.nodeValue;
    if (t.indexOf(' ') < 0) return;
    var v = t.replace(AVANT_PONCTUATION, NBSP + '$1').replace(/« /g, '«' + NBSP);
    if (v !== t) n.nodeValue = v;
  }
  function typographier(racine) {
    if (racine.nodeType === 3) { typographierTexte(racine); return; }
    if (racine.nodeType !== 1 || /^(SCRIPT|STYLE|TEXTAREA)$/.test(racine.nodeName)) return;
    var marcheur = document.createTreeWalker(racine, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        return /^(SCRIPT|STYLE|TEXTAREA)$/.test(n.parentNode.nodeName) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
      }
    });
    var n;
    while ((n = marcheur.nextNode())) typographierTexte(n);
  }
  function initTypo() {
    typographier(document.body);
    if (!('MutationObserver' in window)) return;
    new MutationObserver(function (changements) {
      changements.forEach(function (c) {
        Array.prototype.forEach.call(c.addedNodes, function (n) { typographier(n); });
      });
    }).observe(document.body, { childList: true, subtree: true });
  }

  /* ---------- curseurs : la partie parcourue se colore ---------- */
  function remplirCurseur(el) {
    var min = Number(el.min) || 0, max = Number(el.max) || 100;
    var p = max > min ? (Number(el.value) - min) / (max - min) * 100 : 0;
    el.style.setProperty('--p', p.toFixed(2) + '%');
  }
  BI.remplirCurseurs = function (racine) {
    $$('input[type="range"]', racine || document).forEach(remplirCurseur);
  };
  document.addEventListener('input', function (e) {
    if (e.target.matches && e.target.matches('input[type="range"]')) remplirCurseur(e.target);
  });

  /* ---------- en-tête collant ---------- */
  function initHeader() {
    var header = $('.header');
    if (!header) return;
    var tick = false;
    function maj() {
      header.classList.toggle('is-stuck', window.scrollY > 8);
      tick = false;
    }
    window.addEventListener('scroll', function () {
      if (!tick) { tick = true; window.requestAnimationFrame(maj); }
    }, { passive: true });
    maj();
  }

  /* ---------- apparition au défilement ---------- */
  function initReveal() {
    var cibles = $$('[data-reveal]');
    if (!cibles.length) return;
    if (!('IntersectionObserver' in window) ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      cibles.forEach(function (el) { el.classList.add('is-in'); });
      return;
    }
    var io = new IntersectionObserver(function (entrees) {
      // Les éléments qui entrent ensemble apparaissent en cascade, 60 ms d'écart.
      var rang = 0;
      entrees.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.style.setProperty('--reveal-delay', Math.min(rang++, 6) * 60 + 'ms');
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    cibles.forEach(function (el) { io.observe(el); });
  }

  /* ---------- accordéons ---------- */
  BI.initAccordion = function (racine) {
    $$('.acc-btn', racine || document).forEach(function (btn) {
      if (btn.dataset.bound) return;
      btn.dataset.bound = '1';
      btn.addEventListener('click', function () {
        var item = btn.closest('.acc-item');
        var ouvert = item.classList.toggle('is-open');
        btn.setAttribute('aria-expanded', String(ouvert));
      });
    });
  };

  /* ---------- notification passagère ---------- */
  var toastEl, toastTimer;
  BI.toast = function (message) {
    if (!toastEl) {
      toastEl = document.createElement('div');
      toastEl.className = 'toast';
      toastEl.setAttribute('role', 'status');
      toastEl.setAttribute('aria-live', 'polite');
      document.body.appendChild(toastEl);
    }
    toastEl.innerHTML = BI.icone('check-circle') + '<span>' + BI.escape(message) + '</span>';
    toastEl.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove('is-visible'); }, 3800);
  };

  /* ---------- coordonnées injectées depuis data.js ---------- */
  function initContactSlots() {
    if (!BI.contact) return;
    var c = BI.contact;
    $$('[data-bi]').forEach(function (el) {
      var cle = el.getAttribute('data-bi');
      var valeurs = {
        tel: c.telephone, email: c.email, adresse: c.adresse,
        horaires: c.horaires, whatsapp: c.whatsappAffiche, annee: new Date().getFullYear()
      };
      if (cle in valeurs) el.textContent = valeurs[cle];
    });
    $$('[data-href="tel"]').forEach(function (a) { a.href = c.telephoneHref; });
    $$('[data-href="email"]').forEach(function (a) { a.href = 'mailto:' + c.email; });
    $$('[data-wa]').forEach(function (a) {
      a.href = BI.waLink(a.getAttribute('data-wa') || '');
      a.target = '_blank';
      a.rel = 'noopener';
    });
    var res = c.reseaux || {};
    $$('[data-social]').forEach(function (a) {
      var k = a.getAttribute('data-social');
      if (res[k]) { a.href = res[k]; a.target = '_blank'; a.rel = 'noopener'; }
    });
  }

  /* ---------- lien de navigation courant ---------- */
  function initCurrentNav() {
    var page = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    $$('.nav__link').forEach(function (a) {
      var href = (a.getAttribute('href') || '').split('#')[0].toLowerCase();
      if (!href) return;
      if (href === page || (page === '' && href === 'index.html')) {
        a.setAttribute('aria-current', 'page');
      }
      // la fiche d'un modèle reste rattachée au catalogue
      if (page === 'modele.html' && href === 'modeles.html') {
        a.setAttribute('aria-current', 'page');
      }
      if (page === 'article.html' && href === 'guide.html') {
        a.setAttribute('aria-current', 'page');
      }
    });
  }

  /* ---------- démarrage ---------- */
  function demarrer() {
    initTheme();
    initNav();
    initHeader();
    initContactSlots();
    initCurrentNav();
    BI.initAccordion();
    document.dispatchEvent(new CustomEvent('bi:ready'));
    // Après les scripts de page : ils ont pu ajouter du texte, des curseurs et des blocs animés.
    initTypo();
    BI.remplirCurseurs();
    initReveal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', demarrer);
  } else {
    demarrer();
  }
})();
