/* ══════════════════════════════════════════════
   FinanceHub · Renderer Script v1.1
══════════════════════════════════════════════ */

'use strict';

// ── Site config ──────────────────────────────
const SITES = {
  marketwatch: { url: 'https://www.marketwatch.com',   display: 'marketwatch.com',   badgeText: 'MW',  badgeClass: 'marketwatch' },
  tradingview: { url: 'https://www.tradingview.com',   display: 'tradingview.com',   badgeText: '▲',   badgeClass: 'tradingview' },
  investing:   { url: 'https://www.investing.com',     display: 'investing.com',     badgeText: 'i',   badgeClass: 'investing'   },
  yahoo:       { url: 'https://finance.yahoo.com',     display: 'finance.yahoo.com', badgeText: 'Y!',  badgeClass: 'yahoo'       },
  macrotrends: { url: 'https://www.macrotrends.net',        display: 'macrotrends.net', badgeText: 'MT',  badgeClass: 'macrotrends' },
  reuters:     { url: 'https://www.reuters.com/markets',   display: 'reuters.com',   badgeText: 'R',   badgeClass: 'reuters'     },
  cnbc:        { url: 'https://www.cnbc.com/markets',      display: 'cnbc.com',      badgeText: 'C',   badgeClass: 'cnbc'        },
  finviz:      { url: 'https://finviz.com/map.ashx',       display: 'finviz.com',    badgeText: 'FV',  badgeClass: 'finviz'      },
};

// ── Ticker symbols (title bar) ────────────────
const ALL_SYMBOLS = [
  { id: 'sp500',  symbol: '^GSPC',    label: 'S&P 500',   fmt: 'int'   },
  { id: 'nasdaq', symbol: '^IXIC',    label: 'NASDAQ',    fmt: 'int'   },
  { id: 'dji',    symbol: '^DJI',     label: 'Dow Jones', fmt: 'int'   },
  { id: 'ftse',   symbol: '^FTSE',    label: 'FTSE 100',  fmt: 'int'   },
  { id: 'n225',   symbol: '^N225',    label: 'Nikkei',    fmt: 'int'   },
  { id: 'dax',    symbol: '^GDAXI',   label: 'DAX',       fmt: 'int'   },
  { id: 'bist',   symbol: 'XU100.IS', label: 'BIST 100',  fmt: 'int'   },
  { id: 'btc',    symbol: 'BTC-USD',  label: 'BTC/USD',   fmt: 'crypto'},
  { id: 'eth',    symbol: 'ETH-USD',  label: 'ETH/USD',   fmt: 'crypto'},
  { id: 'eur',    symbol: 'EURUSD=X', label: 'EUR/USD',   fmt: 'forex' },
  { id: 'gold',   symbol: 'GC=F',     label: 'Gold',      fmt: 'dec'   },
  { id: 'oil',    symbol: 'CL=F',     label: 'WTI Oil',   fmt: 'dec'   },
];

// ── Home panel — categorised symbols ─────────
const HOME_CATEGORIES = [
  {
    id: 'indices', label: 'INDICES',
    symbols: [
      { id: 'sp500',  symbol: '^GSPC',    label: 'S&P 500',    fmt: 'int' },
      { id: 'nasdaq', symbol: '^IXIC',    label: 'NASDAQ',     fmt: 'int' },
      { id: 'dji',    symbol: '^DJI',     label: 'Dow Jones',  fmt: 'int' },
      { id: 'bist',   symbol: 'XU100.IS', label: 'BIST 100',   fmt: 'int' },
      { id: 'dax',    symbol: '^GDAXI',   label: 'DAX',        fmt: 'int' },
      { id: 'ftse',   symbol: '^FTSE',    label: 'FTSE 100',   fmt: 'int' },
      { id: 'n225',   symbol: '^N225',    label: 'Nikkei 225', fmt: 'int' },
      { id: 'hsi',    symbol: '^HSI',     label: 'Hang Seng',  fmt: 'int' },
    ],
  },
  {
    id: 'crypto', label: 'CRYPTO',
    symbols: [
      { id: 'btc', symbol: 'BTC-USD', label: 'Bitcoin',  fmt: 'crypto' },
      { id: 'eth', symbol: 'ETH-USD', label: 'Ethereum', fmt: 'crypto' },
      { id: 'bnb', symbol: 'BNB-USD', label: 'BNB',      fmt: 'crypto' },
      { id: 'sol', symbol: 'SOL-USD', label: 'Solana',   fmt: 'crypto' },
      { id: 'xrp', symbol: 'XRP-USD', label: 'XRP',      fmt: 'dec'   },
      { id: 'ada', symbol: 'ADA-USD', label: 'Cardano',  fmt: 'dec'   },
    ],
  },
  {
    id: 'forex', label: 'FOREX',
    symbols: [
      { id: 'usdtry', symbol: 'USDTRY=X', label: 'USD / TRY', fmt: 'dec'   },
      { id: 'eurtry', symbol: 'EURTRY=X', label: 'EUR / TRY', fmt: 'dec'   },
      { id: 'eurusd', symbol: 'EURUSD=X', label: 'EUR / USD', fmt: 'forex' },
      { id: 'gbpusd', symbol: 'GBPUSD=X', label: 'GBP / USD', fmt: 'forex' },
      { id: 'usdjpy', symbol: 'USDJPY=X', label: 'USD / JPY', fmt: 'dec'   },
      { id: 'usdcny', symbol: 'USDCNY=X', label: 'USD / CNY', fmt: 'dec'   },
    ],
  },
  {
    id: 'commodities', label: 'COMMODITIES',
    symbols: [
      { id: 'gold',   symbol: 'GC=F', label: 'Gold',     fmt: 'dec' },
      { id: 'silver', symbol: 'SI=F', label: 'Silver',   fmt: 'dec' },
      { id: 'oil',    symbol: 'CL=F', label: 'WTI Oil',  fmt: 'dec' },
      { id: 'brent',  symbol: 'BZ=F', label: 'Brent',    fmt: 'dec' },
      { id: 'gas',    symbol: 'NG=F', label: 'Nat. Gas', fmt: 'dec' },
    ],
  },
];

// Flat list derived from categories — used for API calls
const ALL_HOME_SYMBOLS = HOME_CATEGORIES.flatMap(c => c.symbols);

const DEFAULT_IDS  = ['sp500', 'nasdaq', 'bist', 'btc'];
const MAX_TICKERS  = 4;

// Simulation fallback prices (updated Feb 2026)
const SIM_BASES = {
  sp500: 5983, nasdaq: 19400, dji: 43400, ftse: 8620, n225: 38700,
  dax: 22000, bist: 10500, btc: 95800, eth: 2720, eur: 1.0480, gold: 2930, oil: 72.0,
};
const HOME_SIM_BASES = {
  // indices
  sp500: 5983, nasdaq: 19400, dji: 43400, bist: 10500, dax: 22000, ftse: 8620, n225: 38700, hsi: 21200,
  // crypto
  btc: 95800, eth: 2720, bnb: 630, sol: 165, xrp: 2.45, ada: 0.72,
  // forex
  usdtry: 36.2, eurtry: 37.9, eurusd: 1.0480, gbpusd: 1.2580, usdjpy: 151.2, usdcny: 7.28,
  // commodities
  gold: 2930, silver: 32.5, oil: 72.0, brent: 76.1, gas: 3.85,
};

// ── State ─────────────────────────────────────
let currentSite   = 'overview';
let loadedSites   = new Set();
let zoomFactors   = { marketwatch: 1, tradingview: 1, investing: 1, yahoo: 1, macrotrends: 1, reuters: 1, cnbc: 1, finviz: 1 };
let activeIds     = loadActiveIds();
let prevPositive  = {};
let newsHeadlines = [];
let newsIndex     = 0;
let activeCatId   = 'all';
const lastKnownPrices = {};

// ── Persistence ───────────────────────────────
function loadActiveIds() {
  try {
    const s = localStorage.getItem('fh-ticker-symbols');
    if (s) {
      const arr = JSON.parse(s);
      if (Array.isArray(arr) && arr.length) return arr.slice(0, MAX_TICKERS);
    }
  } catch {}
  return [...DEFAULT_IDS];
}

function saveActiveIds() {
  localStorage.setItem('fh-ticker-symbols', JSON.stringify(activeIds));
}

function getActiveSymbols() {
  return activeIds.map(id => ALL_SYMBOLS.find(s => s.id === id)).filter(Boolean);
}

// ── Number formatting ─────────────────────────
function fmtPrice(price, fmt) {
  if (fmt === 'int')    return price.toLocaleString('en-US', { maximumFractionDigits: 0 });
  if (fmt === 'crypto') return price >= 1000 ? price.toLocaleString('en-US', { maximumFractionDigits: 0 }) : price.toFixed(2);
  if (fmt === 'forex')  return price.toFixed(4);
  return price.toFixed(2);
}

// ── DOM refs ──────────────────────────────────
const navBtns         = document.querySelectorAll('.nav-btn');
const webviews        = document.querySelectorAll('.wv');
const homePanel       = document.getElementById('home-panel');
const loadOverlay     = document.getElementById('loading-overlay');
const loadingDot      = document.getElementById('loading-dot');
const urlBar          = document.querySelector('.url-bar');
const urlBadgeText    = document.getElementById('url-badge-text');
const urlText         = document.getElementById('url-text');
const zoomLabel       = document.getElementById('zoom-label');
const tickerContainer = document.getElementById('market-ticker');

const btnBack          = document.getElementById('btn-back');
const btnForward       = document.getElementById('btn-forward');
const btnRefresh       = document.getElementById('btn-refresh');
const btnHome          = document.getElementById('btn-home');
const btnMin           = document.getElementById('btn-min');
const btnMax           = document.getElementById('btn-max');
const btnClose         = document.getElementById('btn-close');
const btnZoomIn        = document.getElementById('btn-zoom-in');
const btnZoomOut       = document.getElementById('btn-zoom-out');

const sidebar          = document.getElementById('sidebar');
const btnSidebarToggle = document.getElementById('btn-sidebar-toggle');
const settingsPanel    = document.getElementById('settings-panel');
const btnSettings      = document.getElementById('btn-settings');
const btnSettingsClose = document.getElementById('btn-settings-close');
const settingsSymbols  = document.getElementById('settings-symbols');
const settingsNote     = document.getElementById('settings-note');
const newsText         = document.getElementById('news-text');

// ══════════════════════════════════════════════
// SIDEBAR TOGGLE
// ══════════════════════════════════════════════
(function initSidebarToggle() {
  const collapsed = localStorage.getItem('fh-sidebar-collapsed') === 'true';
  if (collapsed) sidebar.classList.add('collapsed');
  updateToggleChevron(collapsed);
})();

function updateToggleChevron(collapsed) {
  const poly = btnSidebarToggle.querySelector('polyline');
  if (poly) poly.setAttribute('points', collapsed ? '6,4 10,8 6,12' : '10,4 6,8 10,12');
}

btnSidebarToggle.addEventListener('click', () => {
  const isCollapsed = sidebar.classList.toggle('collapsed');
  localStorage.setItem('fh-sidebar-collapsed', isCollapsed);
  updateToggleChevron(isCollapsed);
  if (settingsPanel.classList.contains('open')) settingsPanel.classList.remove('open');
});

// ══════════════════════════════════════════════
// SETTINGS PANEL
// ══════════════════════════════════════════════
function buildSettingsPanel() {
  settingsSymbols.innerHTML = '';
  ALL_SYMBOLS.forEach(sym => {
    const checked = activeIds.includes(sym.id);
    const label = document.createElement('label');
    label.className = 'sym-row';
    label.innerHTML = `
      <input type="checkbox" class="sym-check" data-id="${sym.id}" ${checked ? 'checked' : ''}>
      <span class="sym-name">${sym.label}</span>
      <span class="sym-code">${sym.symbol}</span>
    `;
    settingsSymbols.appendChild(label);
  });
  refreshSettingsState();
}

function refreshSettingsState() {
  const count = activeIds.length;
  settingsSymbols.querySelectorAll('.sym-check').forEach(cb => {
    cb.disabled = !cb.checked && count >= MAX_TICKERS;
  });
  const rem = MAX_TICKERS - count;
  settingsNote.textContent = rem <= 0
    ? `Maximum ${MAX_TICKERS} selected`
    : `Select up to ${MAX_TICKERS} (${rem} remaining)`;
  settingsNote.style.color = rem <= 0 ? 'var(--purple)' : '';
}

settingsSymbols.addEventListener('change', (e) => {
  if (!e.target.classList.contains('sym-check')) return;
  const id = e.target.dataset.id;
  if (e.target.checked) {
    if (activeIds.length < MAX_TICKERS) {
      activeIds.push(id);
    } else {
      e.target.checked = false;
      return;
    }
  } else {
    if (activeIds.length <= 1) { e.target.checked = true; return; }
    activeIds = activeIds.filter(i => i !== id);
  }
  saveActiveIds();
  buildTickerDOM();
  fetchAndUpdateTickers();
  refreshSettingsState();
});

btnSettings.addEventListener('click', (e) => {
  e.stopPropagation();
  buildSettingsPanel();
  settingsPanel.classList.add('open');
});

btnSettingsClose.addEventListener('click', () => settingsPanel.classList.remove('open'));

// ══════════════════════════════════════════════
// TICKER DOM (title bar — scrolling marquee)
// ══════════════════════════════════════════════
function buildTickerDOM() {
  tickerContainer.innerHTML = '';

  const track = document.createElement('div');
  track.className = 'ticker-track';
  track.id = 'ticker-track';

  // Build one set of items; suffix distinguishes original vs duplicate clone
  function makeItems(suffix) {
    ALL_SYMBOLS.forEach(sym => {
      const item = document.createElement('div');
      item.className = 'ticker-item';
      item.innerHTML =
        `<span class="ticker-label">${sym.label}</span>` +
        `<span class="ticker-value neutral" id="tv${suffix}-${sym.id}">–</span>`;
      track.appendChild(item);
    });
  }

  makeItems('');   // primary   — ids: tv-sp500,  tv-nasdaq,  …
  makeItems('2');  // duplicate — ids: tv2-sp500, tv2-nasdaq, … (seamless loop)

  tickerContainer.appendChild(track);
}

function updateTickerValue(sym, price, change, pct) {
  const isPositive = change >= 0;
  const sign       = isPositive ? '+' : '';
  const newText    = `${fmtPrice(price, sym.fmt)} (${sign}${pct.toFixed(2)}%)`;
  const cls        = isPositive ? 'positive' : 'negative';

  // Update both primary and duplicate elements
  ['', '2'].forEach(suffix => {
    const el = document.getElementById(`tv${suffix}-${sym.id}`);
    if (!el) return;
    el.textContent = newText;
    el.classList.remove('flash-up', 'flash-down', 'positive', 'negative', 'neutral');
    el.classList.add(cls);
  });

  // Flash animation only on the primary (visible) element
  const primary = document.getElementById(`tv-${sym.id}`);
  if (primary && prevPositive[sym.id] !== undefined) {
    void primary.offsetWidth; // reflow to restart animation
    primary.classList.add(isPositive ? 'flash-up' : 'flash-down');
    setTimeout(() => primary.classList.remove('flash-up', 'flash-down'), 700);
  }

  prevPositive[sym.id] = isPositive;
}

// ══════════════════════════════════════════════
// TICKER DATA — Yahoo Finance (all 12 symbols)
// ══════════════════════════════════════════════
const lastKnownTickerPrices = {};

async function fetchAndUpdateTickers() {
  const syms = ALL_SYMBOLS;
  const symbolStr = syms.map(s => s.symbol).join(',');
  const fields = 'regularMarketPrice,regularMarketChange,regularMarketChangePercent';

  // Try query1 first, then query2 as fallback
  const urls = [
    `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${encodeURIComponent(symbolStr)}&fields=${fields}`,
    `https://query2.finance.yahoo.com/v7/finance/quote?symbols=${encodeURIComponent(symbolStr)}&fields=${fields}`,
  ];

  for (const url of urls) {
    try {
      const result = await window.electronAPI.fetchJson(url);
      if (!result.ok) continue;
      const data = JSON.parse(result.text);
      const quotes = data?.quoteResponse?.result || [];
      if (!quotes.length) continue;

      syms.forEach(sym => {
        const q = quotes.find(r => r.symbol === sym.symbol);
        if (!q || q.regularMarketPrice == null) return;
        lastKnownTickerPrices[sym.id] = {
          price: q.regularMarketPrice,
          change: q.regularMarketChange,
          pct: q.regularMarketChangePercent,
        };
        updateTickerValue(sym, q.regularMarketPrice, q.regularMarketChange, q.regularMarketChangePercent);
      });
      return; // success — stop trying fallbacks
    } catch (err) {
      console.warn(`[Ticker] ${url.includes('query1') ? 'query1' : 'query2'} failed:`, err.message);
    }
  }

  // Both failed — only simulate symbols we have no real data for
  console.warn('[Ticker] All endpoints failed, using simulation for missing symbols');
  simulateTickers();
}

function simulateTickers() {
  ALL_SYMBOLS.forEach(sym => {
    if (lastKnownTickerPrices[sym.id]) return; // never overwrite real data
    const base   = SIM_BASES[sym.id] || 100;
    const change = (Math.random() - 0.48) * base * 0.005;
    updateTickerValue(sym, base + change, change, (change / base) * 100);
  });
}

// ══════════════════════════════════════════════
// MARKET STATUS — NYSE, BIST, LSE, Crypto
// ══════════════════════════════════════════════
function getTime(offsetHours) {
  const now = new Date();
  return new Date(now.getTime() + now.getTimezoneOffset() * 60000 + offsetHours * 3600000);
}

const MARKET_DEFS = [
  { id: 'nyse',   isOpen: () => { const t = getTime(-5); const d = t.getDay(), m = t.getHours()*60+t.getMinutes(); return d>=1&&d<=5&&m>=570&&m<960;  } },
  { id: 'bist',   isOpen: () => { const t = getTime(3);  const d = t.getDay(), m = t.getHours()*60+t.getMinutes(); return d>=1&&d<=5&&m>=600&&m<1080; } },
  { id: 'lse',    isOpen: () => { const t = getTime(0);  const d = t.getDay(), m = t.getHours()*60+t.getMinutes(); return d>=1&&d<=5&&m>=480&&m<1010; } },
  { id: 'crypto', isOpen: () => true },
];

function updateAllMarkets() {
  MARKET_DEFS.forEach(mkt => {
    const row = document.getElementById(`mkt-${mkt.id}`);
    if (!row) return;
    const dot = row.querySelector('.mkt-dot');
    const txt = row.querySelector('.mkt-status-text');
    const open = mkt.isOpen();

    row.classList.toggle('open',   open);
    row.classList.toggle('closed', !open);

    if (dot && !dot.classList.contains('mkt-dot-crypto')) {
      dot.classList.toggle('open',   open);
      dot.classList.toggle('closed', !open);
    }

    if (txt && mkt.id !== 'crypto') {
      txt.textContent = open ? 'Open' : 'Closed';
    }
  });
}

// ── Countdown to next market open / close ─────
function getCountdown(mktId) {
  if (mktId === 'crypto') return { open: true, text: '24 / 7' };

  const CFG = {
    nyse: { offset: -5, o: 570,  c: 960  },  // 9:30–16:00 ET
    bist: { offset:  3, o: 600,  c: 1080 },  // 10:00–18:00 TRT
    lse:  { offset:  0, o: 480,  c: 1010 },  // 8:00–16:50 GMT
  };
  const cfg = CFG[mktId];
  if (!cfg) return { open: false, text: '–' };

  const t   = getTime(cfg.offset);
  const day = t.getDay();
  const min = t.getHours() * 60 + t.getMinutes();
  const wd  = day >= 1 && day <= 5;

  // Currently open
  if (wd && min >= cfg.o && min < cfg.c) {
    const d = cfg.c - min;
    return { open: true, text: `${Math.floor(d/60)}h ${d%60}m left` };
  }

  // Before open today (same weekday)
  if (wd && min < cfg.o) {
    const d = cfg.o - min;
    return { open: false, text: `Opens in ${Math.floor(d/60)}h ${d%60}m` };
  }

  // After close or weekend — find next weekday
  let daysUntil = 1;
  for (let i = 1; i <= 7; i++) {
    const nd = (day + i) % 7;
    if (nd >= 1 && nd <= 5) { daysUntil = i; break; }
  }

  if (daysUntil === 1) {
    // Next calendar day is a weekday (after close → tomorrow)
    const total = (24 * 60 - min) + cfg.o;
    return { open: false, text: `Opens in ${Math.floor(total/60)}h ${total%60}m` };
  }

  const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return { open: false, text: `Opens ${DAY_NAMES[(day + daysUntil) % 7]}` };
}

// ══════════════════════════════════════════════
// NEWS
// ══════════════════════════════════════════════

// newsHeadlines: array of { title, link, time, source }
function timeAgo(dateStr) {
  if (!dateStr) return '';
  const diff = Date.now() - new Date(dateStr).getTime();
  if (isNaN(diff) || diff < 0) return '';
  const m = Math.floor(diff / 60_000);
  if (m < 1)  return 'just now';
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

function newsSource(link) {
  try {
    const host = new URL(link).hostname.replace('www.', '');
    if (host.includes('yahoo'))    return 'YAHOO FIN.';
    if (host.includes('reuters'))  return 'REUTERS';
    if (host.includes('bloomberg'))return 'BLOOMBERG';
    if (host.includes('wsj'))      return 'WSJ';
    if (host.includes('cnbc'))     return 'CNBC';
    if (host.includes('ft.com'))   return 'FT';
    return host.split('.')[0].toUpperCase().slice(0, 10);
  } catch { return ''; }
}

async function fetchNews() {
  try {
    const url = 'https://feeds.finance.yahoo.com/rss/2.0/headline?s=%5EGSPC&region=US&lang=en-US';
    const result = await window.electronAPI.fetchJson(url);
    if (!result.ok) return;

    const xml   = new DOMParser().parseFromString(result.text, 'text/xml');
    const items = Array.from(xml.querySelectorAll('item')).slice(0, 14);

    const parsed = items.map(i => {
      const title = i.querySelector('title')?.textContent?.trim() || '';
      // <link> in RSS XML is a text node sibling of the tag — use nextSibling trick
      const linkEl = i.getElementsByTagName('link')[0];
      const link   = linkEl?.nextSibling?.nodeValue?.trim()
                  || linkEl?.textContent?.trim() || '';
      const time   = i.querySelector('pubDate')?.textContent?.trim() || '';
      return { title, link, time, source: newsSource(link) };
    }).filter(n => n.title);

    if (parsed.length) {
      newsHeadlines = parsed;
      newsIndex = 0;
      if (newsText) newsText.textContent = parsed[0].title;
      renderNewsPanel();
    }
  } catch (err) {
    console.warn('[News] Fetch failed:', err.message);
  }
}

function renderNewsPanel() {
  const list = document.getElementById('news-list');
  if (!list) return;

  if (!newsHeadlines.length) {
    list.innerHTML = '<div class="news-empty">No headlines available</div>';
    return;
  }

  list.innerHTML = newsHeadlines.map(n => `
    <div class="news-item" data-url="${n.link}">
      <div class="news-item-meta">
        <span class="news-item-time">${timeAgo(n.time) || '–'}</span>
        ${n.source ? `<span class="news-item-dot"></span><span class="news-item-source">${n.source}</span>` : ''}
      </div>
      <div class="news-item-title">${n.title}</div>
    </div>
  `).join('');

  list.querySelectorAll('.news-item').forEach(item => {
    item.addEventListener('click', () => {
      const url = item.dataset.url;
      if (url) window.open(url, '_blank');
    });
  });
}

function rotateNews() {
  if (!newsHeadlines.length || !newsText) return;
  newsText.classList.add('news-fade');
  setTimeout(() => {
    newsIndex = (newsIndex + 1) % newsHeadlines.length;
    const item = newsHeadlines[newsIndex];
    newsText.textContent = item.title || item; // backward compat
    newsText.classList.remove('news-fade');
  }, 350);
}

// ══════════════════════════════════════════════
// HOME / OVERVIEW PANEL
// ══════════════════════════════════════════════
// ══════════════════════════════════════════════
// HOME PANEL — Chart Dashboard
// ══════════════════════════════════════════════

// ── Chart state ──────────────────────────────
let selectedChartSym = HOME_CATEGORIES[0].symbols[0]; // S&P 500 default
let mainTf           = { range: '1mo', interval: '1d' };
const chartDataCache = {};
let mainChartData    = null;
let mainHoverX       = -1;

// ── Yahoo Finance Chart API ───────────────────
async function fetchChartData(symbol, range, interval) {
  const key = `${symbol}|${range}|${interval}`;
  if (chartDataCache[key]) return chartDataCache[key];

  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?interval=${interval}&range=${range}`;
  try {
    const result = await window.electronAPI.fetchJson(url);
    if (!result.ok) throw new Error('HTTP ' + result.status);
    const json = JSON.parse(result.text);
    const res  = json?.chart?.result?.[0];
    if (!res)  throw new Error('No result');

    const stamps = res.timestamp || [];
    const q      = res.indicators.quote[0];
    const parsed = stamps.map((t, i) => ({
      time:  t * 1000,
      open:  q.open?.[i]  ?? null,
      high:  q.high?.[i]  ?? null,
      low:   q.low?.[i]   ?? null,
      close: q.close?.[i] ?? null,
    })).filter(d => d.close !== null && !isNaN(d.close));

    chartDataCache[key] = parsed;
    return parsed;
  } catch (err) {
    console.warn('[Chart]', symbol, err.message);
    return null;
  }
}

// ── Canvas helper ─────────────────────────────
function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);      ctx.quadraticCurveTo(x + w, y,     x + w, y + r);
  ctx.lineTo(x + w, y + h - r);  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);      ctx.quadraticCurveTo(x, y + h,     x, y + h - r);
  ctx.lineTo(x, y + r);          ctx.quadraticCurveTo(x, y,         x + r, y);
  ctx.closePath();
}

// ── Sparkline (mini card chart) ───────────────
function drawSparkline(canvas, data, isUp) {
  if (!canvas) return;
  const prices = (data || []).map(d => d.close).filter(p => p != null && !isNaN(p));
  if (prices.length < 2) return;

  const dpr = window.devicePixelRatio || 1;
  canvas.width  = canvas.offsetWidth  * dpr;
  canvas.height = canvas.offsetHeight * dpr;
  const W = canvas.width, H = canvas.height;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, W, H);

  const pad = H * 0.1;
  const min = Math.min(...prices), max = Math.max(...prices);
  const rng = max - min || 1;
  const toX = i => (i / (prices.length - 1)) * W;
  const toY = p => H - pad - ((p - min) / rng) * (H - 2 * pad);

  const color = isUp ? '#10b981' : '#ef4444';

  const buildPath = () => {
    ctx.moveTo(toX(0), toY(prices[0]));
    for (let i = 1; i < prices.length; i++) {
      const xm = (toX(i - 1) + toX(i)) / 2;
      const ym = (toY(prices[i - 1]) + toY(prices[i])) / 2;
      ctx.quadraticCurveTo(toX(i - 1), toY(prices[i - 1]), xm, ym);
    }
    ctx.lineTo(toX(prices.length - 1), toY(prices[prices.length - 1]));
  };

  // Gradient fill
  const grad = ctx.createLinearGradient(0, 0, 0, H);
  grad.addColorStop(0,   isUp ? 'rgba(16,185,129,0.38)' : 'rgba(239,68,68,0.32)');
  grad.addColorStop(0.6, isUp ? 'rgba(16,185,129,0.07)' : 'rgba(239,68,68,0.05)');
  grad.addColorStop(1,   'rgba(0,0,0,0)');
  ctx.beginPath(); buildPath();
  ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.closePath();
  ctx.fillStyle = grad; ctx.fill();

  // Line
  ctx.beginPath(); buildPath();
  ctx.strokeStyle = color;
  ctx.lineWidth   = 1.5 * dpr;
  ctx.lineJoin    = 'round';
  ctx.stroke();
}

// ── Main chart (full size, crosshair + tooltip) ──
function drawMainChart(canvas, data, sym) {
  if (!canvas || !data || data.length < 2) return;

  const dpr = window.devicePixelRatio || 1;
  canvas.width  = canvas.offsetWidth  * dpr;
  canvas.height = canvas.offsetHeight * dpr;
  const W = canvas.width, H = canvas.height;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, W, H);

  const pL = 60 * dpr, pR = 14 * dpr, pT = 10 * dpr, pB = 26 * dpr;
  const cW = W - pL - pR, cH = H - pT - pB;

  const prices = data.map(d => d.close);
  const isUp   = prices[prices.length - 1] >= prices[0];
  const color  = isUp ? '#10b981' : '#ef4444';

  const min = Math.min(...prices), max = Math.max(...prices);
  const rng = max - min || 1;
  const aMin = min - rng * 0.05, aMax = max + rng * 0.05, aRng = aMax - aMin;

  const toX = i => pL + (i / (prices.length - 1)) * cW;
  const toY = p => pT + cH - ((p - aMin) / aRng) * cH;

  // Grid lines + price labels
  const gridN = 5;
  for (let i = 0; i <= gridN; i++) {
    const y = pT + (cH / gridN) * i;
    const p = aMax - (aRng / gridN) * i;
    ctx.strokeStyle = 'rgba(255,255,255,0.04)';
    ctx.lineWidth = 1; ctx.setLineDash([]);
    ctx.beginPath(); ctx.moveTo(pL, y); ctx.lineTo(W - pR, y); ctx.stroke();
    ctx.fillStyle = 'rgba(148,163,184,0.5)';
    ctx.font = `${9.5 * dpr}px "Segoe UI Variable", sans-serif`;
    ctx.textAlign = 'right';
    ctx.fillText(fmtPrice(p, sym.fmt), pL - 5 * dpr, y + 3.5 * dpr);
  }

  const buildPath = () => {
    ctx.moveTo(toX(0), toY(prices[0]));
    for (let i = 1; i < prices.length; i++) {
      const xm = (toX(i - 1) + toX(i)) / 2;
      const ym = (toY(prices[i - 1]) + toY(prices[i])) / 2;
      ctx.quadraticCurveTo(toX(i - 1), toY(prices[i - 1]), xm, ym);
    }
    ctx.lineTo(toX(prices.length - 1), toY(prices[prices.length - 1]));
  };

  // Gradient fill
  const grad = ctx.createLinearGradient(0, pT, 0, pT + cH);
  grad.addColorStop(0,   isUp ? 'rgba(16,185,129,0.22)' : 'rgba(239,68,68,0.20)');
  grad.addColorStop(0.7, isUp ? 'rgba(16,185,129,0.03)' : 'rgba(239,68,68,0.02)');
  grad.addColorStop(1,   'rgba(0,0,0,0)');
  ctx.beginPath(); buildPath();
  ctx.lineTo(toX(prices.length - 1), pT + cH);
  ctx.lineTo(toX(0), pT + cH); ctx.closePath();
  ctx.fillStyle = grad; ctx.fill();

  // Price line
  ctx.beginPath(); buildPath();
  ctx.strokeStyle = color; ctx.lineWidth = 2 * dpr;
  ctx.lineJoin = 'round'; ctx.setLineDash([]); ctx.stroke();

  // Time labels
  const step = Math.max(1, Math.floor(prices.length / 6));
  ctx.fillStyle = 'rgba(148,163,184,0.45)';
  ctx.font = `${8.5 * dpr}px "Segoe UI Variable", sans-serif`;
  ctx.textAlign = 'center';
  for (let i = 0; i < prices.length; i += step) {
    const d = new Date(data[i].time);
    ctx.fillText(
      d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      toX(i), H - 7 * dpr
    );
  }

  // Crosshair + tooltip
  if (mainHoverX >= 0) {
    const mx = mainHoverX * dpr;
    let ni = 0, md = Infinity;
    for (let i = 0; i < prices.length; i++) {
      const d = Math.abs(toX(i) - mx);
      if (d < md) { md = d; ni = i; }
    }
    const cx = toX(ni), cy = toY(prices[ni]);

    ctx.strokeStyle = 'rgba(255,255,255,0.12)';
    ctx.lineWidth = 1; ctx.setLineDash([3 * dpr, 3 * dpr]);
    ctx.beginPath(); ctx.moveTo(cx, pT); ctx.lineTo(cx, pT + cH); ctx.stroke();
    ctx.setLineDash([]);

    ctx.beginPath(); ctx.arc(cx, cy, 4 * dpr, 0, Math.PI * 2);
    ctx.fillStyle = color; ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.75)'; ctx.lineWidth = 1.5 * dpr; ctx.stroke();

    const tp  = fmtPrice(prices[ni], sym.fmt);
    const td  = new Date(data[ni].time).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const txt = `${tp}   ${td}`;
    ctx.font = `bold ${10 * dpr}px "Segoe UI Variable", sans-serif`;
    const tw = ctx.measureText(txt).width;
    const xp = 8 * dpr, th = 22 * dpr;
    let tx = cx + 12 * dpr;
    if (tx + tw + xp * 2 > W - pR) tx = cx - tw - xp * 2 - 12 * dpr;
    roundRect(ctx, tx, cy - th / 2, tw + xp * 2, th, 4 * dpr);
    ctx.fillStyle = 'rgba(22,22,32,0.93)'; ctx.fill();
    ctx.fillStyle = '#f1f5f9'; ctx.textAlign = 'left';
    ctx.fillText(txt, tx + xp, cy + 3.5 * dpr);
  }
}

// ── Build Symbol Strip ────────────────────────
function buildSymbolStrip(catId) {
  const strip = document.getElementById('home-symbol-strip');
  if (!strip) return;

  let syms;
  if (catId === 'all') {
    syms = ALL_HOME_SYMBOLS;
  } else {
    const cat = HOME_CATEGORIES.find(c => c.id === catId);
    syms = cat ? cat.symbols : ALL_HOME_SYMBOLS;
  }

  strip.innerHTML = syms.map(s => {
    const known     = lastKnownPrices[s.id];
    const priceStr  = known ? fmtPrice(known.price, s.fmt) : '–';
    const isPos     = known ? known.change >= 0 : null;
    const changeStr = known ? `${isPos ? '+' : ''}${known.pct.toFixed(2)}%` : '–';
    const changeCls = known ? (isPos ? 'positive' : 'negative') : 'neutral';
    const isActive  = s.id === selectedChartSym.id;
    return `
      <div class="sym-chip${isActive ? ' active' : ''}" id="chip-${s.id}" data-sym-id="${s.id}">
        <span class="chip-label">${s.label}</span>
        <span class="chip-price" id="sprice-${s.id}">${priceStr}</span>
        <span class="chip-change ${changeCls}" id="schange-${s.id}">${changeStr}</span>
      </div>`;
  }).join('');

  strip.querySelectorAll('.sym-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const sym = ALL_HOME_SYMBOLS.find(s => s.id === chip.dataset.symId);
      if (sym) selectMainChartSym(sym);
    });
  });
}

// ── Build Home Panel HTML ─────────────────────
function buildHomePanel() {
  const ALL_CATS = [
    { id: 'all',         label: 'ALL' },
    { id: 'indices',     label: 'INDICES' },
    { id: 'crypto',      label: 'CRYPTO' },
    { id: 'forex',       label: 'FOREX' },
    { id: 'commodities', label: 'COMMODITIES' },
  ];

  homePanel.innerHTML = `
    <div class="home-tab-bar" id="home-tab-bar">
      ${ALL_CATS.map(c =>
        `<button class="cat-tab${c.id === activeCatId ? ' active' : ''}" data-cat="${c.id}">${c.label}</button>`
      ).join('')}
      <div class="home-search-wrap">
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"
             stroke-linecap="round" stroke-linejoin="round">
          <circle cx="6.5" cy="6.5" r="4"/>
          <line x1="9.5" y1="9.5" x2="13" y2="13"/>
        </svg>
        <input type="text" class="home-search-input" id="symbol-search"
          placeholder="Search — AAPL, BTC-USD, EURUSD=X ...">
      </div>
    </div>

    <div class="home-symbol-strip" id="home-symbol-strip"></div>

    <div class="home-chart-section">

      <div class="home-chart-main">
        <div class="home-chart-header">
          <div class="chart-symbol-info">
            <span class="chart-sym-name"  id="main-name">S&amp;P 500</span>
            <span class="chart-sym-price" id="main-price">–</span>
            <span class="chart-sym-chg neutral" id="main-chg">–</span>
          </div>
          <div class="tf-tabs" id="main-tf-tabs">
            <button class="tf-btn" data-range="5d"  data-interval="30m">1D</button>
            <button class="tf-btn active" data-range="1mo" data-interval="1d">1M</button>
            <button class="tf-btn" data-range="3mo" data-interval="1d">3M</button>
            <button class="tf-btn" data-range="1y"  data-interval="1d">1Y</button>
            <button class="tf-btn" data-range="5y"  data-interval="1wk">5Y</button>
          </div>
        </div>
        <div class="home-chart-canvas-wrap">
          <canvas id="main-chart-canvas"></canvas>
        </div>
      </div>

      <div class="news-panel" id="news-panel">
        <div class="news-panel-hdr">
          <span class="news-panel-title">Market News</span>
          <span class="news-live-dot"></span>
        </div>
        <div class="news-list" id="news-list">
          <div class="news-empty">Loading...</div>
        </div>
      </div>

    </div>
  `;

  // Populate symbol strip
  buildSymbolStrip(activeCatId);

  // Category tab clicks
  homePanel.querySelectorAll('.cat-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      homePanel.querySelectorAll('.cat-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCatId = btn.dataset.cat;
      buildSymbolStrip(activeCatId);
    });
  });

  // Main chart timeframe selector
  homePanel.querySelectorAll('#main-tf-tabs .tf-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      homePanel.querySelectorAll('#main-tf-tabs .tf-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      mainTf = { range: btn.dataset.range, interval: btn.dataset.interval };
      loadMainChart();
    });
  });

  // Crosshair on main chart
  const mainCanvas = document.getElementById('main-chart-canvas');
  if (mainCanvas) {
    mainCanvas.addEventListener('mousemove', e => {
      mainHoverX = e.clientX - mainCanvas.getBoundingClientRect().left;
      if (mainChartData) drawMainChart(mainCanvas, mainChartData, selectedChartSym);
    });
    mainCanvas.addEventListener('mouseleave', () => {
      mainHoverX = -1;
      if (mainChartData) drawMainChart(mainCanvas, mainChartData, selectedChartSym);
    });
  }

  // Symbol search
  const searchEl = document.getElementById('symbol-search');
  if (searchEl) {
    let searchTimer;
    searchEl.addEventListener('keydown', e => {
      if (e.key === 'Enter') { clearTimeout(searchTimer); searchSymbol(searchEl.value.trim()); }
    });
    searchEl.addEventListener('input', () => {
      clearTimeout(searchTimer);
      searchTimer = setTimeout(() => {
        const v = searchEl.value.trim();
        if (v.length >= 2) searchSymbol(v);
      }, 700);
    });
  }
}

// ── Symbol search ─────────────────────────────
function searchSymbol(query) {
  const q = query.toUpperCase();
  const known = ALL_HOME_SYMBOLS.find(
    s => s.symbol.toUpperCase() === q || s.label.toUpperCase().includes(q)
  );
  if (known) { selectMainChartSym(known); return; }
  // Unknown — try to load directly from Yahoo Finance
  const tmp = { id: '_search', symbol: query, label: query, fmt: 'dec' };
  selectedChartSym = tmp;
  const el = document.getElementById('main-name');
  if (el) el.textContent = query.toUpperCase();
  loadMainChart();
}

// ── Select chart symbol ───────────────────────
function selectMainChartSym(sym) {
  homePanel.querySelectorAll('.sym-chip').forEach(c => c.classList.remove('active'));
  const chip = document.getElementById(`chip-${sym.id}`);
  if (chip) {
    chip.classList.add('active');
    chip.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'smooth' });
  }
  selectedChartSym = sym;
  const nameEl = document.getElementById('main-name');
  if (nameEl) nameEl.textContent = sym.label;
  loadMainChart();
}

// ── Load main chart ───────────────────────────
async function loadMainChart() {
  const canvas = document.getElementById('main-chart-canvas');
  if (!canvas) return;

  const data = await fetchChartData(selectedChartSym.symbol, mainTf.range, mainTf.interval);
  if (data && data.length > 0) {
    mainChartData = data;
    const last   = data[data.length - 1].close;
    const first  = data[0].close;
    const change = last - first;
    const pct    = (change / first) * 100;
    const isUp   = change >= 0;
    const sign   = isUp ? '+' : '';

    const priceEl = document.getElementById('main-price');
    const chgEl   = document.getElementById('main-chg');
    if (priceEl) priceEl.textContent = fmtPrice(last, selectedChartSym.fmt);
    if (chgEl) {
      const absChg = Math.abs(change);
      const chgStr = absChg >= 1000
        ? fmtPrice(absChg, selectedChartSym.fmt)
        : absChg.toFixed(absChg < 1 ? 4 : 2);
      chgEl.textContent = `${sign}${chgStr} (${sign}${pct.toFixed(2)}%)`;
      chgEl.className   = `chart-sym-chg ${isUp ? 'positive' : 'negative'}`;
    }
    drawMainChart(canvas, data, selectedChartSym);
  } else {
    simulateMainChart(canvas);
  }
}

function simulateMainChart(canvas) {
  const base = HOME_SIM_BASES[selectedChartSym.id] || 100;
  const sim  = Array.from({ length: 30 }, (_, i) => ({
    time:  Date.now() - (29 - i) * 86_400_000,
    close: base * (1 + (Math.random() - 0.49) * 0.008 * (i + 1)),
  }));
  mainChartData = sim;
  drawMainChart(canvas, sim, selectedChartSym);
}


// ── Live price data (chip prices) ────────────
async function fetchHomeData() {
  const symbolStr = ALL_HOME_SYMBOLS.map(s => s.symbol).join(',');
  const fields = 'regularMarketPrice,regularMarketChange,regularMarketChangePercent';
  const urls = [
    `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${encodeURIComponent(symbolStr)}&fields=${fields}`,
    `https://query2.finance.yahoo.com/v7/finance/quote?symbols=${encodeURIComponent(symbolStr)}&fields=${fields}`,
  ];

  for (const url of urls) {
    try {
      const result = await window.electronAPI.fetchJson(url);
      if (!result.ok) continue;
      const data   = JSON.parse(result.text);
      const quotes = data?.quoteResponse?.result || [];
      if (!quotes.length) continue;
      ALL_HOME_SYMBOLS.forEach(sym => {
        const q = quotes.find(r => r.symbol === sym.symbol);
        if (q && q.regularMarketPrice != null) {
          updateHomeCard(sym, q.regularMarketPrice, q.regularMarketChange, q.regularMarketChangePercent);
        }
      });
      return; // success
    } catch (err) {
      console.warn('[HomeData] endpoint failed:', err.message);
    }
  }

  // Both endpoints failed — only simulate on very first load
  if (Object.keys(lastKnownPrices).length === 0) simulateHomeCards();
  else console.warn('[HomeData] All endpoints failed, keeping last known prices');
}

function updateHomeCard(sym, price, change, pct) {
  // Cache the latest real price — survives refresh failures
  lastKnownPrices[sym.id] = { price, change, pct };

  const priceEl  = document.getElementById(`sprice-${sym.id}`);
  const changeEl = document.getElementById(`schange-${sym.id}`);
  if (!priceEl || !changeEl) return;
  const isPos = change >= 0;
  const sign  = isPos ? '+' : '';
  priceEl.textContent  = fmtPrice(price, sym.fmt);
  changeEl.textContent = `${sign}${pct.toFixed(2)}%`;
  changeEl.className   = `chip-change ${isPos ? 'positive' : 'negative'}`;
}

function simulateHomeCards() {
  ALL_HOME_SYMBOLS.forEach(sym => {
    if (lastKnownPrices[sym.id]) return; // never overwrite real data with simulation
    const base   = HOME_SIM_BASES[sym.id] || 100;
    const change = (Math.random() - 0.48) * base * 0.005;
    updateHomeCard(sym, base + change, change, (change / base) * 100);
  });
}

// ══════════════════════════════════════════════
// WEBVIEW / NAVIGATION HELPERS
// ══════════════════════════════════════════════
function getWV(siteId) { return document.getElementById(`wv-${siteId}`); }

function showLoading() {
  loadOverlay.classList.remove('hidden');
  loadingDot.classList.add('active');
}

function hideLoading() {
  loadOverlay.classList.add('hidden');
  loadingDot.classList.remove('active');
}

function updateURLBar(siteId, url) {
  const cfg = SITES[siteId];
  urlBar.dataset.site = siteId;
  urlBadgeText.textContent = cfg.badgeText;
  try {
    const parsed = new URL(url || cfg.url);
    urlText.textContent = parsed.hostname + (parsed.pathname !== '/' ? parsed.pathname.slice(0, 40) : '');
  } catch {
    urlText.textContent = cfg.display;
  }
}

function updateZoomLabel(siteId) {
  zoomLabel.textContent = Math.round(zoomFactors[siteId] * 100) + '%';
}

// ── Switch site ───────────────────────────────
function switchSite(siteId) {
  if (siteId === currentSite) return;
  currentSite = siteId;

  navBtns.forEach(btn => btn.classList.toggle('active', btn.dataset.site === siteId));

  if (siteId === 'overview') {
    webviews.forEach(wv => wv.classList.remove('active'));
    homePanel.classList.add('active');
    urlBar.dataset.site = 'overview';
    urlBadgeText.textContent = '⊞';
    urlText.textContent = 'Market Overview';
    zoomLabel.textContent = '100%';
    hideLoading();
    return;
  }

  homePanel.classList.remove('active');
  webviews.forEach(wv => wv.classList.toggle('active', wv.id === `wv-${siteId}`));

  const wv = getWV(siteId);
  updateURLBar(siteId, loadedSites.has(siteId) ? wv.getURL() : null);
  updateZoomLabel(siteId);

  if (!loadedSites.has(siteId)) {
    loadedSites.add(siteId);
    showLoading();
    wv.src = SITES[siteId].url;
  }
}

// ── Webview events ────────────────────────────
function bindWebviewEvents(wv, siteId) {
  wv.addEventListener('did-start-loading',    () => { if (currentSite === siteId) loadingDot.classList.add('active'); });
  wv.addEventListener('did-stop-loading',     () => { if (currentSite === siteId) { hideLoading(); loadingDot.classList.remove('active'); updateURLBar(siteId, wv.getURL()); } });
  wv.addEventListener('did-fail-load',   (e)  => { if (currentSite === siteId && e.errorCode !== -3) { hideLoading(); loadingDot.classList.remove('active'); } });
  wv.addEventListener('did-navigate',    (e)  => { if (currentSite === siteId) updateURLBar(siteId, e.url); });
  wv.addEventListener('did-navigate-in-page', (e) => { if (currentSite === siteId && e.isMainFrame) updateURLBar(siteId, e.url); });
}

// ── Window controls ───────────────────────────
btnMin.addEventListener('click',   () => window.electronAPI.minimize());
btnMax.addEventListener('click',   () => window.electronAPI.maximize());
btnClose.addEventListener('click', () => window.electronAPI.close());

document.querySelector('.titlebar').addEventListener('dblclick', (e) => {
  if (!e.target.closest('.wctrl') && !e.target.closest('.brand')) window.electronAPI.maximize();
});

window.electronAPI.onWindowState((state) => {
  const icon = btnMax.querySelector('svg');
  if (state === 'maximized') {
    icon.innerHTML = '<path d="M2 2h6v6H2zM8 8h6v6H8z" stroke="currentColor" stroke-width="1.2" fill="none"/>';
  } else {
    icon.innerHTML = '<rect x="0.6" y="0.6" width="8.8" height="8.8" rx="1.5" stroke="currentColor" stroke-width="1.2" fill="none"/>';
  }
});

// ── Browser navigation ────────────────────────
btnBack.addEventListener('click', () => {
  if (currentSite === 'overview') return;
  const wv = getWV(currentSite);
  if (wv && wv.canGoBack()) wv.goBack();
});

btnForward.addEventListener('click', () => {
  if (currentSite === 'overview') return;
  const wv = getWV(currentSite);
  if (wv && wv.canGoForward()) wv.goForward();
});

btnRefresh.addEventListener('click', () => {
  if (currentSite === 'overview') { fetchHomeData(); return; }
  showLoading();
  getWV(currentSite).reload();
});

btnHome.addEventListener('click', () => {
  if (currentSite === 'overview') return;
  showLoading();
  getWV(currentSite).loadURL(SITES[currentSite].url);
});

// ── Zoom ──────────────────────────────────────
const ZOOM_STEP = 0.1, ZOOM_MIN = 0.5, ZOOM_MAX = 2.0;

function applyZoom(siteId) {
  try { getWV(siteId).setZoomFactor(zoomFactors[siteId]); } catch {}
  if (siteId === currentSite) updateZoomLabel(siteId);
}

btnZoomIn.addEventListener('click', () => {
  if (currentSite === 'overview') return;
  zoomFactors[currentSite] = parseFloat(Math.min(ZOOM_MAX, zoomFactors[currentSite] + ZOOM_STEP).toFixed(1));
  applyZoom(currentSite);
});

btnZoomOut.addEventListener('click', () => {
  if (currentSite === 'overview') return;
  zoomFactors[currentSite] = parseFloat(Math.max(ZOOM_MIN, zoomFactors[currentSite] - ZOOM_STEP).toFixed(1));
  applyZoom(currentSite);
});

// ── Keyboard shortcuts ────────────────────────
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && !e.shiftKey && !e.altKey) {
    const siteMap = { '1': 'marketwatch', '2': 'tradingview', '3': 'investing', '4': 'yahoo', '5': 'macrotrends', '6': 'reuters', '7': 'cnbc', '8': 'finviz' };
    if (siteMap[e.key]) { e.preventDefault(); switchSite(siteMap[e.key]); return; }
    if (e.key === '=' || e.key === '+') { if (currentSite !== 'overview') btnZoomIn.click();  return; }
    if (e.key === '-')                  { if (currentSite !== 'overview') btnZoomOut.click(); return; }
    if (e.key === '0') {
      if (currentSite !== 'overview') { zoomFactors[currentSite] = 1; applyZoom(currentSite); }
      return;
    }
    if (e.key === 'r' || e.key === 'R') { btnRefresh.click(); return; }
    if (e.key === 'b' || e.key === 'B') { btnSidebarToggle.click(); return; }
  }
  if (e.key === 'F5') btnRefresh.click();
  if (e.altKey && e.key === 'ArrowLeft')  btnBack.click();
  if (e.altKey && e.key === 'ArrowRight') btnForward.click();
  if (e.key === 'Escape' && settingsPanel.classList.contains('open')) settingsPanel.classList.remove('open');
});

// ══════════════════════════════════════════════
// INIT
// ══════════════════════════════════════════════
(function init() {
  // Build home panel structure first
  buildHomePanel();

  // Build title bar ticker
  buildTickerDOM();

  // Nav button click handlers
  navBtns.forEach(btn => btn.addEventListener('click', () => switchSite(btn.dataset.site)));

  // Webview events
  webviews.forEach(wv => bindWebviewEvents(wv, wv.id.replace('wv-', '')));

  // Initial state — Overview is the default landing screen
  homePanel.classList.add('active');
  urlBar.dataset.site = 'overview';
  urlBadgeText.textContent = '⊞';
  urlText.textContent = 'Market Overview';
  zoomLabel.textContent = '100%';
  hideLoading();

  // Market status (sidebar dots)
  updateAllMarkets();
  setInterval(updateAllMarkets, 60_000);

  // Title bar ticker — real data every 30 s
  fetchAndUpdateTickers();
  setInterval(fetchAndUpdateTickers, 30_000);

  // Home card prices — real data every 30 s
  fetchHomeData();
  setInterval(fetchHomeData, 30_000);

  // Charts — load main chart on start
  loadMainChart();

  // News strip — rotate every 7 s, refresh every 5 min
  fetchNews();
  setInterval(rotateNews, 7_000);
  setInterval(fetchNews, 5 * 60 * 1000);
})();
