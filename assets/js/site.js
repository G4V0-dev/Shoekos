/* ==========================================================================
   Shoekos — interacciones del sitio
   Sin dependencias. El carrito es de demostración: vive en memoria y no
   persiste entre páginas (GitHub Pages, sin backend).
   ========================================================================== */

(function () {
  'use strict';

  var money = new Intl.NumberFormat('es-CO', { maximumFractionDigits: 0 });

  function formatUSD(value) {
    return money.format(value) + ' USD';
  }

  /* ---------- Tema claro / oscuro ---------- */
  var THEME_KEY = 'shoekos-theme';
  var root = document.documentElement;

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    document.querySelectorAll('[data-theme-toggle]').forEach(function (btn) {
      btn.setAttribute('aria-label', theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro');
      btn.setAttribute('aria-pressed', theme === 'light' ? 'true' : 'false');
    });
  }

  function initTheme() {
    var stored = null;
    try {
      stored = localStorage.getItem(THEME_KEY);
    } catch (e) {}
    var prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    applyTheme(stored || (prefersLight ? 'light' : 'dark'));

    document.querySelectorAll('[data-theme-toggle]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        applyTheme(next);
        try {
          localStorage.setItem(THEME_KEY, next);
        } catch (e) {}
      });
    });
  }

  /* ---------- Menú móvil y buscador ---------- */
  function initNav() {
    var toggle = document.querySelector('[data-nav-toggle]');
    var links = document.querySelector('[data-nav-links]');
    if (toggle && links) {
      toggle.addEventListener('click', function () {
        var open = links.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    }

    var searchBtn = document.querySelector('[data-search-toggle]');
    var searchBar = document.querySelector('[data-search-bar]');
    var searchInput = document.querySelector('[data-search-input]');
    if (searchBtn && searchBar && searchInput) {
      searchBtn.addEventListener('click', function () {
        var isHidden = searchBar.hasAttribute('hidden');
        if (isHidden) {
          searchBar.removeAttribute('hidden');
          searchInput.focus();
        } else {
          searchBar.setAttribute('hidden', '');
          searchInput.value = '';
          applyFilters();
        }
        searchBtn.setAttribute('aria-expanded', isHidden ? 'true' : 'false');
      });

      searchInput.addEventListener('input', applyFilters);
      searchInput.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
          searchBar.setAttribute('hidden', '');
          searchBtn.setAttribute('aria-expanded', 'false');
          searchInput.value = '';
          applyFilters();
          searchBtn.focus();
        }
      });
    }
  }

  /* ---------- Filtros de catálogo ---------- */
  var activeFilter = 'todos';

  function applyFilters() {
    var cards = Array.prototype.slice.call(document.querySelectorAll('[data-product-card]'));
    if (!cards.length) return;

    var searchInput = document.querySelector('[data-search-input]');
    var term = searchInput ? searchInput.value.trim().toLowerCase() : '';
    var visible = 0;

    cards.forEach(function (card) {
      var type = (card.getAttribute('data-type') || '').toLowerCase();
      var name = (card.getAttribute('data-name') || '').toLowerCase();
      var matchesFilter = activeFilter === 'todos' || type === activeFilter;
      var matchesTerm = !term || name.indexOf(term) !== -1;
      var show = matchesFilter && matchesTerm;
      card.hidden = !show;
      if (show) visible++;
    });

    var count = document.querySelector('[data-product-count]');
    if (count) count.textContent = visible;

    var empty = document.querySelector('[data-filter-empty]');
    if (empty) empty.hidden = visible !== 0;
  }

  function initFilters() {
    var chips = document.querySelectorAll('[data-filter]');
    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        activeFilter = chip.getAttribute('data-filter');
        chips.forEach(function (other) {
          other.setAttribute('aria-pressed', other === chip ? 'true' : 'false');
        });
        applyFilters();
      });
    });

    var sort = document.querySelector('[data-sort]');
    var grid = document.querySelector('[data-product-grid]');
    if (sort && grid) {
      sort.addEventListener('change', function () {
        var cards = Array.prototype.slice.call(grid.querySelectorAll('[data-product-card]'));
        var mode = sort.value;

        cards.sort(function (a, b) {
          if (mode === 'precio-asc') return Number(a.dataset.price) - Number(b.dataset.price);
          if (mode === 'precio-desc') return Number(b.dataset.price) - Number(a.dataset.price);
          if (mode === 'anio') return Number(a.dataset.year) - Number(b.dataset.year);
          return Number(a.dataset.order) - Number(b.dataset.order);
        });

        cards.forEach(function (card) {
          grid.appendChild(card);
        });
      });
    }
  }

  /* ---------- Carrito de demostración ---------- */
  var cartCount = 0;

  function setCartCount(value) {
    if (typeof value === 'number') cartCount = value;
    document.querySelectorAll('[data-cart-count]').forEach(function (el) {
      el.textContent = String(cartCount);
      el.hidden = cartCount === 0;
    });
  }

  function showToast(message) {
    var toast = document.querySelector('[data-toast]');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('is-visible');
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(function () {
      toast.classList.remove('is-visible');
    }, 2600);
  }

  function initAddToCart() {
    document.querySelectorAll('[data-add-to-cart]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        cartCount++;
        setCartCount();
        var name = btn.getAttribute('data-add-to-cart');
        showToast(name + ' añadido al carrito');
        btn.textContent = 'Añadido';
        window.setTimeout(function () {
          btn.textContent = 'Añadir';
        }, 1600);
      });
    });
  }

  function initFavorites() {
    document.querySelectorAll('[data-fav]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var pressed = btn.getAttribute('aria-pressed') === 'true';
        btn.setAttribute('aria-pressed', pressed ? 'false' : 'true');
      });
    });
  }

  /* ---------- Página de carrito ---------- */
  function recalcCart() {
    var rows = document.querySelectorAll('[data-cart-row]');
    var subtotal = 0;
    var units = 0;

    rows.forEach(function (row) {
      var price = Number(row.getAttribute('data-price')) || 0;
      var qtyEl = row.querySelector('[data-qty]');
      var qty = qtyEl ? Number(qtyEl.textContent) || 1 : 1;
      subtotal += price * qty;
      units += qty;
    });

    document.querySelectorAll('[data-subtotal]').forEach(function (el) {
      el.textContent = formatUSD(subtotal);
    });
    document.querySelectorAll('[data-total]').forEach(function (el) {
      el.textContent = formatUSD(subtotal);
    });
    document.querySelectorAll('[data-pieces]').forEach(function (el) {
      el.textContent = String(units);
    });
    setCartCount(units);

    var empty = document.querySelector('[data-cart-empty]');
    var content = document.querySelector('[data-cart-content]');
    if (empty && content) {
      var isEmpty = rows.length === 0;
      empty.hidden = !isEmpty;
      content.hidden = isEmpty;
      document.body.classList.toggle('has-cart-bar', !isEmpty);
    }
  }

  function initCartPage() {
    var list = document.querySelector('[data-cart-items]');
    if (!list) return;

    list.addEventListener('click', function (event) {
      var btn = event.target.closest('button');
      if (!btn) return;

      var row = btn.closest('[data-cart-row]');

      if (btn.hasAttribute('data-qty-plus') || btn.hasAttribute('data-qty-minus')) {
        if (!row) return;
        var qtyEl = row.querySelector('[data-qty]');
        var qty = Number(qtyEl.textContent) || 1;
        qty = btn.hasAttribute('data-qty-plus') ? qty + 1 : Math.max(1, qty - 1);
        qtyEl.textContent = String(qty);
        recalcCart();
        return;
      }

      if (btn.hasAttribute('data-remove') && row) {
        row.remove();
        recalcCart();
      }
    });

    recalcCart();
  }

  /* ---------- Formularios (demo, sin envío) ---------- */
  function markError(field, message) {
    var wrapper = field.closest('.field') || field.parentElement;
    wrapper.classList.add('field-error');
    var hint = wrapper.querySelector('.hint');
    if (!hint) {
      hint = document.createElement('span');
      hint.className = 'hint';
      wrapper.appendChild(hint);
    }
    hint.textContent = message;
  }

  function clearError(field) {
    var wrapper = field.closest('.field') || field.parentElement;
    wrapper.classList.remove('field-error');
    var hint = wrapper.querySelector('.hint');
    if (hint) hint.textContent = '';
  }

  function initContactForm() {
    var form = document.querySelector('[data-contact-form]');
    if (!form) return;

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var valid = true;
      var errors = 0;

      var fields = form.querySelectorAll('[required]');
      fields.forEach(function (field) {
        clearError(field);
        var value = field.value.trim();

        if (!value) {
          markError(field, 'Campo obligatorio');
          errors++;
          return;
        }

        if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
          markError(field, 'Correo no válido');
          errors++;
          return;
        }

        if (field.type === 'checkbox' && !field.checked) {
          markError(field, 'Debes aceptar la política de datos');
          errors++;
        }
      });

      valid = errors === 0;

      var status = form.querySelector('[data-form-status]');
      if (!valid) {
        if (status) {
          status.textContent = 'Revisa los campos marcados.';
          status.hidden = false;
        }
        return;
      }

      if (status) {
        status.textContent =
          'Mensaje validado. Este demo no envía correos: conecta un servicio como Formspree para recibirlo.';
        status.hidden = false;
      }
      form.reset();
    });

    form.querySelectorAll('input, textarea, select').forEach(function (field) {
      field.addEventListener('input', function () {
        clearError(field);
      });
    });
  }

  function initNewsletter() {
    var form = document.querySelector('[data-newsletter]');
    if (!form) return;

    var status = document.querySelector('[data-newsletter-status]');

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var email = form.querySelector('input[type="email"]');
      if (!email || !status) return;

      var value = email.value.trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
        status.textContent = 'Introduce un correo válido.';
        status.hidden = false;
        return;
      }

      status.textContent = 'Listo. Te avisaremos en el próximo drop. (demo)';
      status.hidden = false;
      form.reset();
    });
  }

  /* ---------- Arranque ---------- */
  function initCheckout() {
    document.querySelectorAll('[data-checkout]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        showToast('Demo: aquí se conectaría la pasarela de pago');
      });
    });
  }

  function init() {
    initTheme();
    initNav();
    initFilters();
    initAddToCart();
    initFavorites();
    initCartPage();
    initContactForm();
    initNewsletter();
    initCheckout();
    setCartCount();
    applyFilters();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
