/* Sarana Visual Kreasi — rental equipment. Vanilla JS, tanpa dependensi. */
(() => {
  'use strict';

  const DATA = window.SVK_DATA;
  const CFG = window.SVK_CONFIG || {};
  const PH = window.SVK_PHOTOS || { types: {}, items: {} };
  const PAGE = 48;
  const MAX_QTY = 99;
  const MAX_DAYS = Math.max(1, CFG.maxDays || 60);
  const LS_KEY = 'svk.rental.v1';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const nf = new Intl.NumberFormat('id-ID');
  const fmt = n => nf.format(n);
  const rp = n => 'Rp ' + nf.format(n);
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  /* ------------------------------------------------------------ icons */
  const ICONS = {
    camera: '<rect x="3" y="7" width="13" height="10" rx="2"/><path d="M16 10.5l5-3v9l-5-3"/><circle cx="8.5" cy="12" r="2.2"/>',
    router: '<rect x="3" y="12" width="18" height="7" rx="2"/><path d="M7 15.5h.01M11 15.5h.01M8 12V8M16 12V8M12 12V5"/>',
    multicam: '<rect x="3" y="4" width="8" height="7" rx="1.2"/><rect x="13" y="4" width="8" height="7" rx="1.2"/><rect x="3" y="13" width="8" height="7" rx="1.2"/><rect x="13" y="13" width="8" height="7" rx="1.2"/>',
    light: '<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2V16h5v-.1c0-.8.4-1.5 1-2A6 6 0 0 0 12 3z"/>',
    audio: '<rect x="6" y="3" width="12" height="18" rx="2"/><circle cx="12" cy="14.5" r="3"/><circle cx="12" cy="7.5" r=".6"/>',
    monitor: '<rect x="3" y="4" width="18" height="12" rx="1.6"/><path d="M8 20h8M12 16v4"/>',
    truss: '<path d="M3 6h18M3 18h18M3 6l4.5 12L12 6l4.5 12L21 6"/>',
    stream: '<circle cx="12" cy="12" r="1.8"/><path d="M7.8 7.8a6 6 0 0 0 0 8.4M16.2 7.8a6 6 0 0 1 0 8.4M4.9 4.9a10 10 0 0 0 0 14.2M19.1 4.9a10 10 0 0 1 0 14.2"/>',
    power: '<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M13 8.5l-3 4h4l-3 3.5"/>',
    all: '<path d="M4 6h16M4 12h16M4 18h10"/>'
  };
  const icon = (name, cls = '') => `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true">${ICONS[name] || ICONS.all}</svg>`;

  /* ------------------------------------------------------------- data */
  const cats = DATA.categories;
  const catById = Object.fromEntries(cats.map(c => [c.id, c]));
  const items = DATA.items;
  const byId = new Map();
  items.forEach((it, i) => {
    it._i = i;
    it._cat = catById[it.cat].label;
    it._h = [it.name, it.brand, it._cat, it.sub, it.pkg || ''].join(' ').toLowerCase();
    it._s = it._h.replace(/[^a-z0-9]/g, '');
    byId.set(it.id, it);
  });

  /* ------------------------------------------------------------ state */
  const S = {
    cat: 'all', sub: 'all', q: '', sort: 'catalog', shown: PAGE,
    cart: {}, start: '', days: 1, name: '', event: '', note: ''
  };
  let view = [];            // hasil filter saat ini (terurut)

  function todayStr() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }

  function load() {
    try {
      const raw = JSON.parse(localStorage.getItem(LS_KEY) || 'null');
      if (!raw) return;
      Object.keys(raw.cart || {}).forEach(id => {
        const q = Math.min(MAX_QTY, parseInt(raw.cart[id], 10));
        if (byId.has(id) && q > 0) S.cart[id] = q;
      });
      S.days = Math.min(MAX_DAYS, Math.max(1, parseInt(raw.days, 10) || 1));
      S.start = typeof raw.start === 'string' && raw.start >= todayStr() ? raw.start : '';
      ['name', 'event', 'note'].forEach(k => { if (typeof raw[k] === 'string') S[k] = raw[k].slice(0, 500); });
    } catch (_) { /* storage tidak tersedia: abaikan */ }
  }
  function save() {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify({
        cart: S.cart, days: S.days, start: S.start, name: S.name, event: S.event, note: S.note
      }));
    } catch (_) { /* abaikan */ }
  }

  /* ---------------------------------------------------------- helpers */
  function unitLabel(it) {
    if (it.mode === 'beli') return '/pcs · beli';
    if (it.unit === 'meter') return '/meter/hari';
    if (it.unit === '10 jam') return '/10 jam';
    return '/hari';
  }
  const qtyWord = it => (it.unit === 'meter' ? 'm' : it.mode === 'beli' ? 'pcs' : 'unit');
  const lineTotal = (it, q) => it.price * q * (it.mode === 'beli' ? 1 : S.days);

  function calc() {
    let total = 0, count = 0, units = 0;
    for (const id in S.cart) {
      const it = byId.get(id), q = S.cart[id];
      count++; units += q; total += lineTotal(it, q);
    }
    return { total, count, units };
  }

  function fmtDate(str) {
    const d = new Date(str + 'T00:00:00');
    return new Intl.DateTimeFormat('id-ID', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' }).format(d);
  }
  function endDate(str, days) {
    const d = new Date(str + 'T00:00:00');
    d.setDate(d.getDate() + days - 1);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }

  function waURL(text) {
    const n = String(CFG.whatsapp || '').replace(/\D/g, '').replace(/^0/, '62');
    return `https://wa.me/${n}?text=${encodeURIComponent(text)}`;
  }

  let toastTimer;
  function toast(msg) {
    const t = $('#toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), 2400);
  }

  /* -------------------------------------------------------- filtering */
  function tokens(q) {
    return q.toLowerCase().split(/\s+/).filter(Boolean).map(t => ({ t, s: t.replace(/[^a-z0-9]/g, '') }));
  }
  const pass = (it, toks) => toks.every(k => it._h.includes(k.t) || (k.s && it._s.includes(k.s)));

  function compute() {
    const toks = tokens(S.q);
    const base = toks.length ? items.filter(it => pass(it, toks)) : items;
    const byCat = {}, bySub = {};
    base.forEach(it => {
      byCat[it.cat] = (byCat[it.cat] || 0) + 1;
      if (S.cat === it.cat) bySub[it.sub] = (bySub[it.sub] || 0) + 1;
    });
    let list = base;
    if (S.cat !== 'all') list = list.filter(it => it.cat === S.cat);
    if (S.sub !== 'all') list = list.filter(it => it.sub === S.sub);
    list = list.slice();
    if (S.sort === 'price-asc') list.sort((a, b) => a.price - b.price || a._i - b._i);
    else if (S.sort === 'price-desc') list.sort((a, b) => b.price - a.price || a._i - b._i);
    else if (S.sort === 'name') list.sort((a, b) => a.name.localeCompare(b.name, 'id', { sensitivity: 'base' }));
    view = list;
    return { total: base.length, byCat, bySub };
  }

  /* ----------------------------------------------------------- render */
  const grid = $('#grid');

  function actHTML(id) {
    const q = S.cart[id] || 0;
    if (!q) {
      return `<button class="add" type="button" data-action="add" data-id="${id}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>Tambah</button>`;
    }
    return `<div class="qty qty--new" role="group" aria-label="Jumlah"><button type="button" data-action="dec" data-id="${id}" aria-label="Kurangi jumlah">−</button><output>${q}</output><button type="button" data-action="inc" data-id="${id}" aria-label="Tambah jumlah">+</button></div>`;
  }

  function priceHTML(it) {
    return `<p class="price"><span class="price__row"><span class="price__cur">Rp</span><span class="price__num">${fmt(it.price)}</span></span><span class="price__unit">${unitLabel(it)}</span></p>`;
  }

  function cardHTML(it, i) {
    const inCart = S.cart[it.id] ? ' is-in' : '';
    const brand = it.brand
      ? `<span class="card__brand">${esc(it.brand)}</span>`
      : `<span class="card__brand is-cat">${esc(it._cat)}</span>`;
    const side = it.mode === 'beli' ? '<span class="badge">Pembelian</span>'
      : it.pkg ? '<span class="badge">Paket</span>'
      : `<span class="card__sub">${esc(it.sub || '')}</span>`;
    return `<article class="card enter${inCart}" style="--i:${Math.min(i, 11)}">
      ${photoHTML(it)}
      <div class="card__body">
        <div class="card__main">
          <div class="card__top">${brand}${side}</div>
          <h3 class="card__title">${esc(it.title)}</h3>
        </div>
        <div class="card__bot">${priceHTML(it)}<div class="act" data-act="${it.id}">${actHTML(it.id)}</div></div>
      </div>
    </article>`;
  }

  /* foto: per item (SVK_PHOTOS.items[id]) atau per jenis alat (SVK_PHOTOS.types[art]) */
  function photoOf(it) {
    const own = PH.items && PH.items[it.id];
    if (own) return { file: typeof own === 'string' ? own : own.file, product: true };
    const p = PH.types && PH.types[it.art];
    return p ? { file: typeof p === 'string' ? p : p.file, product: false } : null;
  }
  function photoHTML(it) {
    const ph = photoOf(it);
    if (!ph || !ph.file) {
      return `<div class="card__img is-empty" aria-hidden="true">${icon(catById[it.cat].icon)}</div>`;
    }
    return `<div class="card__img${ph.product ? ' is-product' : ''}" aria-hidden="true"><img src="${esc(ph.file)}" alt="" width="640" height="400" loading="lazy" decoding="async"></div>`;
  }

  /* layar sentuh tidak punya hover: kartu yang sedang di tengah layar ikut berwarna */
  const touchOnly = window.matchMedia('(hover: none)').matches;
  const litIO = touchOnly && 'IntersectionObserver' in window
    ? new IntersectionObserver(es => es.forEach(e => e.target.classList.toggle('is-lit', e.isIntersecting)),
      { rootMargin: '-38% 0px -38% 0px' })
    : null;
  function watchLit(root) { if (litIO) $$('.card, .pk', root).forEach(c => litIO.observe(c)); }

  function renderGrid() {
    const slice = view.slice(0, S.shown);
    grid.innerHTML = slice.map(cardHTML).join('');
    watchLit(grid);
    const empty = view.length === 0;
    $('#noResults').hidden = !empty;
    if (empty) {
      $('#noResultsText').textContent = S.q
        ? `Tidak ada equipment untuk “${S.q}”. Coba kata kunci lain, atau tanyakan, mungkin kami punya.`
        : 'Tidak ada equipment di filter ini.';
      $('#requestLink').href = waURL(`Halo ${CFG.brand || ''}, saya mencari equipment${S.q ? `: “${S.q}”` : ''}. Apakah tersedia?`);
    }
    updateMore();
  }

  function updateMore() {
    const btn = $('#moreBtn');
    const left = view.length - S.shown;
    btn.hidden = left <= 0;
    if (left > 0) btn.textContent = `Tampilkan lebih banyak (${left} lagi)`;
  }

  function appendMore() {
    const from = S.shown;
    S.shown += PAGE;
    grid.insertAdjacentHTML('beforeend', view.slice(from, S.shown).map((it, i) => cardHTML(it, i)).join(''));
    watchLit(grid);
    updateMore();
  }

  function buildChips() {
    const mk = (id, label, ic) =>
      `<button class="chip" type="button" data-action="cat" data-cat="${id}" aria-pressed="false">${icon(ic)}<span>${esc(label)}</span><b data-n></b></button>`;
    $('#catChips').innerHTML = mk('all', 'Semua', 'all') + cats.map(c => mk(c.id, c.label, c.icon)).join('');
  }

  function updateChips(counts) {
    $$('#catChips .chip').forEach(ch => {
      const id = ch.dataset.cat;
      const n = id === 'all' ? counts.total : (counts.byCat[id] || 0);
      ch.querySelector('[data-n]').textContent = n;
      ch.setAttribute('aria-pressed', String(S.cat === id));
      ch.classList.toggle('is-zero', n === 0 && S.cat !== id);
    });
  }

  function renderSubs(counts) {
    const el = $('#subChips');
    const c = catById[S.cat];
    const show = c && c.subs.length >= 2 && items.filter(i => i.cat === c.id).length >= 12;
    el.hidden = !show;
    if (!show) { el.innerHTML = ''; return; }
    const total = counts.byCat[c.id] || 0;
    const mk = (val, label, n) =>
      `<button class="subchip" type="button" data-action="sub" data-sub="${esc(val)}" aria-pressed="${S.sub === val}">${esc(label)}<b>${n}</b></button>`;
    el.innerHTML = mk('all', 'Semua jenis', total) +
      c.subs.filter(s => counts.bySub[s] || S.sub === s).map(s => mk(s, s, counts.bySub[s] || 0)).join('');
  }

  function renderMeta(counts) {
    const filtered = S.q || S.cat !== 'all' || S.sub !== 'all';
    const el = $('#resultCount');
    el.innerHTML = filtered
      ? `<b>${view.length}</b> dari ${items.length} equipment`
      : `<b>${items.length}</b> equipment`;
    $('#resetBtn').hidden = !filtered;
    $('#qClear').hidden = !S.q;
  }

  function syncURL() {
    try {
      const p = new URLSearchParams(location.search);   // pertahankan parameter lain (mis. utm_*)
      ['k', 'j', 'q'].forEach(k => p.delete(k));
      if (S.cat !== 'all') p.set('k', S.cat);
      if (S.sub !== 'all') p.set('j', S.sub);
      if (S.q) p.set('q', S.q);
      const qs = p.toString();
      history.replaceState(null, '', location.pathname + (qs ? '?' + qs : '') + location.hash);
    } catch (_) { /* file:// atau sandbox: abaikan */ }
  }

  function apply({ scroll = false } = {}) {
    S.shown = PAGE;
    const counts = compute();
    updateChips(counts);
    renderSubs(counts);
    renderMeta(counts);
    renderGrid();
    syncURL();
    if (scroll) keepInView();
  }

  function keepInView() {
    const tb = $('#toolbar');
    const metaTop = $('.meta').getBoundingClientRect().top + window.scrollY;
    const target = metaTop - tb.offsetHeight - 70;
    if (window.scrollY > target) window.scrollTo({ top: Math.max(0, target) });
  }

  function goCatalog() {
    $('#katalog').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  }

  /* ------------------------------------------------------ kategori UI */
  function buildTiles() {
    $('#catTiles').innerHTML = cats.map(c => {
      const n = items.filter(i => i.cat === c.id).length;
      return `<li class="reveal"><button class="tile" type="button" data-action="goto-cat" data-cat="${c.id}">
        ${icon(c.icon)}
        <svg class="tile__arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8"/></svg>
        <span><span class="tile__name">${esc(c.label)}</span><span class="tile__count">${n} item</span></span>
      </button></li>`;
    }).join('');
  }

  function buildRail() {
    const pk = items.filter(i => i.pkg);
    $('#paketRail').innerHTML = pk.map(it => {
      const m = it.title.match(/^(.*?)\s*\((.*)\)\s*$/);
      const big = m ? m[1] : it.title;
      const small = m ? `<small>${esc(m[2])}</small>` : '';
      return `<article class="pk${S.cart[it.id] ? ' is-in' : ''}">
        ${photoHTML(it)}
        <div class="pk__body">
          <div><p class="pk__tag">${esc(it.pkg)}</p><h3 class="pk__title">${esc(big)}${small}</h3></div>
          <div class="card__bot">${priceHTML(it)}<div class="act" data-act="${it.id}">${actHTML(it.id)}</div></div>
        </div>
      </article>`;
    }).join('');
    watchLit($('#paketRail'));
  }

  /* kredit foto: foto stok (CC BY / CC BY-SA wajib dikreditkan) + ringkasan merek foto produk resmi */
  function buildCredits() {
    const list = $('#creditList');
    if (!list) return;
    const seen = new Set(), rows = [];
    Object.keys(PH.types || {}).forEach(k => {
      const p = PH.types[k];
      if (!p || typeof p === 'string' || !p.credit || seen.has(p.file)) return;
      seen.add(p.file);
      rows.push(`<li>${p.url ? `<a href="${esc(p.url)}" target="_blank" rel="noopener">${esc(p.title || 'Foto')}</a>` : esc(p.title || 'Foto')} · ${esc(p.credit)}</li>`);
    });
    const brands = Array.from(new Set(Object.keys(PH.items || {}).map(k => PH.items[k].brand).filter(Boolean))).sort();
    if (brands.length) {
      rows.unshift(`<li><b>Foto produk</b> bersumber dari situs resmi pabrikan (${brands.map(esc).join(', ')}); hak cipta dimiliki masing-masing pemilik merek.</li>`);
    }
    list.innerHTML = rows.join('');
    const box = $('#credits');
    if (box) box.hidden = rows.length === 0;
  }

  /* ------------------------------------------------------- cart logic */
  function setQty(id, q) {
    const before = S.cart[id] || 0;
    q = Math.max(0, Math.min(MAX_QTY, q));
    if (q === before) return;
    if (q === 0) delete S.cart[id]; else S.cart[id] = q;
    save();
    refreshItemUI(id, before);
    renderCart();
    updateBars(q > before);
  }

  function refreshItemUI(id, before) {
    const now = S.cart[id] || 0;
    $$(`[data-act="${id}"]`).forEach(box => {
      const host = box.closest('.card, .pk');
      if (host) host.classList.toggle('is-in', now > 0);
      if (before > 0 && now > 0) {
        box.querySelector('output').textContent = now;
      } else {
        box.innerHTML = actHTML(id);
        if (now > 0 && before > 0) box.querySelector('.qty').classList.remove('qty--new');
      }
    });
  }

  function updateBars(bump = false) {
    const c = calc();
    $$('[data-cart-count]').forEach(el => {
      el.textContent = c.count;
      if (bump) { el.classList.remove('bump'); void el.offsetWidth; el.classList.add('bump'); }
    });
    $('.cartbtn').classList.toggle('has-items', c.count > 0);
    const bar = $('#bar');
    bar.hidden = c.count === 0;
    $('#barSub').textContent = `${rp(c.total)} · ${S.days} hari`;
  }

  /* ----------------------------------------------------------- drawer */
  const drawer = $('#drawer'), scrim = $('#scrim');
  let lastFocus = null, closeTimer;

  function lineHTML(id) {
    const it = byId.get(id), q = S.cart[id];
    const calcTxt = it.mode === 'beli'
      ? `${rp(it.price)} × ${q} pcs (pembelian)`
      : `${rp(it.price)} × ${q} ${qtyWord(it)} × ${S.days} hari`;
    return `<li class="cline">
      <div class="line__main">
        ${it.brand ? `<p class="line__brand">${esc(it.brand)}</p>` : ''}
        <p class="line__title">${esc(it.title)}</p>
        <p class="line__calc">${calcTxt}</p>
      </div>
      <strong class="line__total">${rp(lineTotal(it, q))}</strong>
      <div class="line__ctrl">
        <div class="qty qty--sm" role="group" aria-label="Jumlah ${esc(it.title)}">
          <button type="button" data-action="dec" data-id="${id}" aria-label="Kurangi jumlah">−</button>
          <output>${q}</output>
          <button type="button" data-action="inc" data-id="${id}" aria-label="Tambah jumlah">+</button>
        </div>
        <button class="line__rm" type="button" data-action="remove" data-id="${id}">Hapus</button>
      </div>
    </li>`;
  }

  function renderCart() {
    const c = calc();
    const empty = c.count === 0;
    $('#cartEmpty').hidden = !empty;
    $('#cartFilled').hidden = empty;
    $('#cartFoot').hidden = empty;

    // jaga fokus saat list dirender ulang
    const ae = document.activeElement;
    const keep = ae && drawer.contains(ae) && ae.dataset && ae.dataset.action && ae.dataset.id
      ? `[data-action="${ae.dataset.action}"][data-id="${ae.dataset.id}"]` : null;

    $('#cartLines').innerHTML = Object.keys(S.cart).map(lineHTML).join('');
    if (keep) { const n = $('#cartLines ' + keep); if (n) n.focus(); }

    $('#linesCount').textContent = `${c.count} item · ${c.units} unit`;
    $('#daysOut').textContent = `${S.days} hari`;
    $('[data-action="days-dec"]').disabled = S.days <= 1;
    $('[data-action="days-inc"]').disabled = S.days >= MAX_DAYS;
    const hint = $('#rangeHint');
    hint.textContent = S.start
      ? `${fmtDate(S.start)} → ${fmtDate(endDate(S.start, S.days))}`
      : 'Tanggal mulai boleh dikosongkan, bisa dibahas dengan tim kami.';
    $('#sumTotal').textContent = rp(c.total);
    $('#sumMeta').textContent = `${c.count} item · ${S.days} hari`;
  }

  function focusables() {
    return $$('button, [href], input, select, textarea', drawer).filter(el => !el.disabled && el.offsetParent !== null);
  }

  function openCart() {
    clearTimeout(closeTimer);
    lastFocus = document.activeElement;
    renderCart();
    drawer.hidden = false; scrim.hidden = false;
    void drawer.offsetWidth;
    drawer.classList.add('is-open'); scrim.classList.add('is-open');
    document.body.classList.add('lock');
    drawer.tabIndex = -1;
    setTimeout(() => drawer.focus({ preventScroll: true }), 60);
  }

  function closeCart() {
    drawer.classList.remove('is-open'); scrim.classList.remove('is-open');
    document.body.classList.remove('lock');
    closeTimer = setTimeout(() => { drawer.hidden = true; scrim.hidden = true; }, reduceMotion ? 0 : 460);
    if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
  }

  /* --------------------------------------------------------- messages */
  function buildMessage() {
    const c = calc();
    const L = [];
    L.push(`Halo ${CFG.brand || ''}, saya ingin menyewa equipment berikut:`);
    L.push('');
    if (S.name.trim()) L.push(`Nama: ${S.name.trim()}`);
    if (S.event.trim()) L.push(`Acara/lokasi: ${S.event.trim()}`);
    L.push(S.start
      ? `Tanggal: ${fmtDate(S.start)} s/d ${fmtDate(endDate(S.start, S.days))} (${S.days} hari)`
      : `Lama sewa: ${S.days} hari`);
    L.push('');
    Object.keys(S.cart).forEach((id, i) => {
      const it = byId.get(id), q = S.cart[id];
      const how = it.mode === 'beli'
        ? `${q} pcs × ${rp(it.price)} (pembelian)`
        : `${q} ${qtyWord(it)} × ${rp(it.price)} × ${S.days} hari`;
      L.push(`${i + 1}. ${it.name}`);
      L.push(`   ${how} = ${rp(lineTotal(it, q))}`);
    });
    L.push('');
    L.push(`Estimasi total: ${rp(c.total)}`);
    if (S.note.trim()) { L.push(''); L.push(`Catatan: ${S.note.trim()}`); }
    L.push('');
    L.push('Mohon konfirmasi ketersediaan dan total akhirnya. Terima kasih.');
    return L.join('\n');
  }

  async function copyText(t) {
    try { await navigator.clipboard.writeText(t); return true; }
    catch (_) {
      const ta = document.createElement('textarea');
      ta.value = t; ta.style.cssText = 'position:fixed;opacity:0;top:0;left:0';
      document.body.appendChild(ta); ta.select();
      let ok = false;
      try { ok = document.execCommand('copy'); } catch (__) { /* abaikan */ }
      ta.remove();
      return ok;
    }
  }

  function printQuote() {
    const c = calc();
    const rows = Object.keys(S.cart).map((id, i) => {
      const it = byId.get(id), q = S.cart[id];
      return `<tr><td>${i + 1}</td><td>${esc(it.name)}</td><td class="num">${q} ${qtyWord(it)}</td>
        <td class="num">${rp(it.price)}</td><td class="num">${it.mode === 'beli' ? '—' : S.days}</td>
        <td class="num">${rp(lineTotal(it, q))}</td></tr>`;
    }).join('');
    const info = [
      ['Nama', S.name.trim()], ['Acara/lokasi', S.event.trim()],
      ['Jadwal', S.start ? `${fmtDate(S.start)} s/d ${fmtDate(endDate(S.start, S.days))} (${S.days} hari)` : `${S.days} hari`],
      ['Catatan', S.note.trim()]
    ].filter(r => r[1]).map(r => `<dt>${r[0]}</dt><dd>${esc(r[1])}</dd>`).join('');
    $('#printSheet').innerHTML = `
      <img class="ps-logo" src="img/brand/logo-light.webp" alt="${esc(CFG.brand || 'Rental Equipment')}">
      <p class="ps-sub">Daftar sewa equipment · dibuat ${new Intl.DateTimeFormat('id-ID', { dateStyle: 'long' }).format(new Date())}</p>
      <dl>${info}</dl>
      <table><thead><tr><th>No</th><th>Equipment</th><th class="num">Jumlah</th><th class="num">Harga</th><th class="num">Hari</th><th class="num">Subtotal</th></tr></thead><tbody>${rows}</tbody></table>
      <div class="ps-total"><span>Estimasi total</span><span>${rp(c.total)}</span></div>
      <p class="ps-fine">Ini estimasi harga. Ketersediaan dan total akhir dikonfirmasi oleh tim ${esc(CFG.brand || 'kami')}.</p>`;
    window.print();
  }

  /* ---------------------------------------------------------- events */
  let clearTimer;
  document.addEventListener('click', e => {
    const el = e.target.closest('[data-action]');
    if (!el) return;
    const a = el.dataset.action, id = el.dataset.id;
    switch (a) {
      case 'add': setQty(id, 1); break;
      case 'inc': setQty(id, (S.cart[id] || 0) + 1); break;
      case 'dec': setQty(id, (S.cart[id] || 0) - 1); break;
      case 'remove': setQty(id, 0); break;
      case 'open-cart': openCart(); break;
      case 'close-cart':
        closeCart();
        if (el.dataset.goto) setTimeout(goCatalog, 120);
        break;
      case 'cat': S.cat = el.dataset.cat; S.sub = 'all'; apply({ scroll: true }); break;
      case 'sub': S.sub = el.dataset.sub; apply({ scroll: true }); break;
      case 'goto-cat': S.cat = el.dataset.cat; S.sub = 'all'; apply(); goCatalog(); break;
      case 'reset': resetFilters(); break;
      case 'days-inc': S.days = Math.min(MAX_DAYS, S.days + 1); save(); renderCart(); updateBars(); break;
      case 'days-dec': S.days = Math.max(1, S.days - 1); save(); renderCart(); updateBars(); break;
      case 'send-wa': {
        if (!calc().count) return;
        window.open(waURL(buildMessage()), '_blank', 'noopener');
        if (!String(CFG.whatsapp || '').replace(/\D/g, '')) toast('Pilih kontak tujuan di WhatsApp');
        break;
      }
      case 'copy': copyText(buildMessage()).then(ok => toast(ok ? 'Ringkasan tersalin' : 'Gagal menyalin, coba lagi')); break;
      case 'print': printQuote(); break;
      case 'clear':
        if (el.dataset.armed) {
          clearTimeout(clearTimer); delete el.dataset.armed; el.textContent = 'Kosongkan';
          const ids = Object.keys(S.cart);
          S.cart = {}; save();
          ids.forEach(i => refreshItemUI(i, 1));
          renderCart(); updateBars();
        } else {
          el.dataset.armed = '1'; el.textContent = 'Yakin? Ketuk lagi';
          clearTimer = setTimeout(() => { delete el.dataset.armed; el.textContent = 'Kosongkan'; }, 3000);
        }
        break;
      default: break;
    }
  });

  document.addEventListener('keydown', e => {
    if (drawer.hidden) return;
    if (e.key === 'Escape') { closeCart(); return; }
    if (e.key === 'Tab') {
      const f = focusables();
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  scrim.addEventListener('click', closeCart);

  /* pencarian */
  const qInput = $('#q');
  let qTimer;
  qInput.addEventListener('input', () => {
    clearTimeout(qTimer);
    qTimer = setTimeout(() => { S.q = qInput.value.trim(); S.sub = 'all'; apply({ scroll: true }); }, 120);
    $('#qClear').hidden = !qInput.value;
  });
  $('#qClear').addEventListener('click', () => { qInput.value = ''; S.q = ''; apply({ scroll: true }); qInput.focus(); });
  $('#sort').addEventListener('change', e => { S.sort = e.target.value; apply(); });
  $('#moreBtn').addEventListener('click', appendMore);
  $('#resetBtn').addEventListener('click', resetFilters);

  function setQuery(q) {
    S.q = q.trim(); S.cat = 'all'; S.sub = 'all';
    qInput.value = S.q;
    apply();
    goCatalog();
  }
  $('#heroSearch').addEventListener('submit', e => { e.preventDefault(); setQuery($('#heroQ').value); });
  $$('[data-quick]').forEach(b => b.addEventListener('click', () => { $('#heroQ').value = b.dataset.quick; setQuery(b.dataset.quick); }));

  function resetFilters() {
    S.q = ''; S.cat = 'all'; S.sub = 'all'; S.sort = 'catalog';
    qInput.value = ''; $('#sort').value = 'catalog'; $('#heroQ').value = '';
    apply({ scroll: true });
  }

  /* form daftar sewa */
  const fStart = $('#fStart'), fName = $('#fName'), fEvent = $('#fEvent'), fNote = $('#fNote');
  fStart.min = todayStr();
  fStart.addEventListener('change', () => { S.start = fStart.value && fStart.value >= todayStr() ? fStart.value : ''; if (!S.start) fStart.value = ''; save(); renderCart(); });
  fName.addEventListener('input', () => { S.name = fName.value; save(); });
  fEvent.addEventListener('input', () => { S.event = fEvent.value; save(); });
  fNote.addEventListener('input', () => { S.note = fNote.value; save(); });

  /* ----------------------------------------------------- hero & footer */
  function setupBrand() {
    const brand = CFG.brand || 'Sarana Visual Kreasi';
    const parts = brand.trim().split(/\s+/);
    $('[data-brand-1]').textContent = parts[0];              // "Sarana" (tebal)
    $('[data-brand-2]').textContent = parts.slice(1).join(' ');   // "Visual Kreasi" (renggang)
    $$('[data-brand]').forEach(el => { el.textContent = brand; });
    $$('[data-tagline]').forEach(el => { el.textContent = CFG.tagline || ''; });
    $('#year').textContent = new Date().getFullYear();
    document.title = `${brand} — Rental Equipment Video, Broadcast & Event`;

    $$('[data-stat="items"]').forEach(el => { el.textContent = items.length; });

    $('#footWa').href = waURL(`Halo ${brand}, saya ingin bertanya tentang equipment untuk produksi saya.`);

    const rows = [];
    const wa = String(CFG.whatsapp || '').replace(/\D/g, '');
    if (wa) rows.push(['WhatsApp', `<a href="https://wa.me/${wa.replace(/^0/, '62')}" target="_blank" rel="noopener">+${esc(wa.replace(/^0/, '62'))}</a>`]);
    if (CFG.phone) rows.push(['Telepon', `<a href="tel:${esc(CFG.phone.replace(/[^\d+]/g, ''))}">${esc(CFG.phone)}</a>`]);
    if (CFG.email) rows.push(['Email', `<a href="mailto:${esc(CFG.email)}">${esc(CFG.email)}</a>`]);
    if (CFG.instagram) rows.push(['Instagram', `<a href="https://instagram.com/${esc(CFG.instagram.replace(/^@/, ''))}" target="_blank" rel="noopener">@${esc(CFG.instagram.replace(/^@/, ''))}</a>`]);
    if (CFG.address) rows.push(['Alamat', `<p>${esc(CFG.address)}</p>`]);
    if (CFG.hours) rows.push(['Jam kerja', `<p>${esc(CFG.hours)}</p>`]);
    $('#contactList').innerHTML = rows.length
      ? rows.map(r => `<li><span>${r[0]}</span>${r[1]}</li>`).join('')
      : '<li><span>Kontak</span><p>Kirim daftar sewa atau pertanyaan Anda lewat WhatsApp.</p></li>';
  }

  function setupReveal() {
    const els = $$('.reveal');
    if (!('IntersectionObserver' in window) || reduceMotion) { els.forEach(el => el.classList.add('in')); return; }
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: .12, rootMargin: '0px 0px -40px 0px' });
    els.forEach((el, i) => { el.style.transitionDelay = `${(i % 4) * 60}ms`; io.observe(el); });
  }

  function readURL() {
    try {
      const p = new URLSearchParams(location.search);
      const k = p.get('k');
      if (k && catById[k]) {
        S.cat = k;
        const j = p.get('j');
        if (j && catById[k].subs.includes(j)) S.sub = j;
      }
      const q = p.get('q');
      if (q) { S.q = q.slice(0, 80); qInput.value = S.q; }
    } catch (_) { /* abaikan */ }
  }

  /* -------------------------------------------------------------- init */
  function init() {
    load();
    setupBrand();
    buildTiles();
    buildChips();
    buildRail();
    buildCredits();
    readURL();
    fName.value = S.name; fEvent.value = S.event; fNote.value = S.note; fStart.value = S.start;
    apply();
    updateBars();
    renderCart();
    setupReveal();
  }
  init();
})();
