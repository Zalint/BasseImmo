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

  var NBSP = ' '; // espace fine insécable

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

  /* ---------- thème clair / sombre ---------- */
  function initTheme() {
    var saved = BI.store.get('bi-theme');
    if (saved === 'dark' || saved === 'light') {
      document.documentElement.setAttribute('data-theme', saved);
    }
    $$('[data-theme-toggle]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var courant = document.documentElement.getAttribute('data-theme');
        if (!courant) {
          courant = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        var suivant = courant === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', suivant);
        BI.store.set('bi-theme', suivant);
        btn.setAttribute('aria-label', suivant === 'dark' ? 'Passer en thème clair' : 'Passer en thème sombre');
      });
    });
  }

  /* ---------- menu mobile ---------- */
  function initNav() {
    var burger = $('[data-burger]');
    var nav = $('#nav-principal');
    if (!burger || !nav) return;

    function fermer() {
      nav.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
      burger.innerHTML = BI.icone('menu');
    }
    burger.addEventListener('click', function () {
      var ouvert = nav.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', String(ouvert));
      burger.innerHTML = BI.icone(ouvert ? 'close' : 'menu');
    });
    nav.addEventListener('click', function (e) { if (e.target.closest('a')) fermer(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') fermer(); });
    window.addEventListener('resize', function () { if (window.innerWidth > 900) fermer(); });
  }

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
      entrees.forEach(function (e) {
        if (!e.isIntersecting) return;
        var i = parseInt(e.target.getAttribute('data-reveal-delay') || '0', 10);
        setTimeout(function () { e.target.classList.add('is-in'); }, i);
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
    initReveal();
    document.dispatchEvent(new CustomEvent('bi:ready'));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', demarrer);
  } else {
    demarrer();
  }
})();
