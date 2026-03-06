/* ══════════════════════════════════════════════
   FinanceHub · Renderer Script v2.88
   28/02/2026 — Full Bloomberg Terminal rebuild:
   Fear & Greed, Macro Dashboard, Yield Curve, Market Breadth,
   Earnings Calendar, WSB Sentiment, Correlation Matrix,
   World Markets Globe, Daily Brief Hero, Insider Flows,
   Command Palette, Fibonacci, Macro Events, Top Movers Tab,
   EMA/BB/RSI/MACD/VWAP/Volume Indicators, Watchlist P&L,
   Pre/Post Market Chip Row, Volume Spike Annotations,
   TA Signal Scanner, Crypto Fear & Greed, FRED Sparklines,
   Market Countdown, Options P/C Ratio + Max Pain, Earnings Beat Streak,
   Last Price Reference Line, Dividend Yield, Historical Volatility HV20,
   Candle Pattern Detection, My Space Daily Stats, Insider Cluster Badge,
   ADX Indicator Panel, Chart Copy to Clipboard,
   ATR14 Stat, OBV Sub-Panel, Stochastic Oscillator Sub-Panel,
   RSI Divergence, Pivot Points Overlay, Alert Price Lines,
   Keltner Channels, BB Squeeze Badge, ROC 14 Sub-Panel,
   Williams Percent R, CCI Oscillator, Quick Watch Button,
   Parabolic SAR, Supertrend Overlay, EMA Cross Signal Arrows,
   Ichimoku Cloud, Donchian Channels, MACD Histogram Divergence,
   Linear Regression Channel, Chart Pattern Detection, CMF Oscillator,
   Heikin-Ashi Chart Type, Stochastic RSI Sub-Panel, TRIX Oscillator,
   Hull Moving Average, DEMA, TEMA,
   MFI, DPO, Elder Ray Bull/Bear Power,
   Vortex Indicator, Aroon Oscillator, Awesome Oscillator,
   MACD Zero-Line Crossovers, Auto S/R Levels, Stochastic Crossover Signals,
   PSAR Crossover Signals, VWMACD Sub-Panel, Price Action Patterns,
   Finnhub News Sentiment Badges, GeoPulse Composite Score, News Chart Annotations,
   News Heatmap Panel, Daily Challenge Gamification System,
   Bar Replay Mode, Watchlist Profiles, S/R Break Alerts,
   Market Regime Detector, Portfolio Attribution Chart, Multi-TF Alignment Scanner,
   Heat Calendar, Divergence Alert Badges, Sector Rotation Chart,
   Smart Summary Bar, Correlation Network Graph, External ntfy.sh Price Alerts,
   Watchlist Price Bands, Symbol Notes Quick Float, Economic Calendar Ticker,
   Mini Chart Hover Thumbnails, Breadth Thrust Detector, Alert Snooze,
   Watchlist Sort & Filter Bar, Price Target Ring, Volume Heatmap,
   Symbol Scanner with Screener Filters, Chart Regime Overlay, Card Mini-Heatmap
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
  { id: 'cac40',  symbol: '^FCHI',    label: 'CAC 40',    fmt: 'int'   },
  { id: 'bist',   symbol: 'XU100.IS', label: 'BIST 100',  fmt: 'int'   },
  { id: 'btc',    symbol: 'BTC-USD',  label: 'BTC/USD',   fmt: 'crypto'},
  { id: 'eth',    symbol: 'ETH-USD',  label: 'ETH/USD',   fmt: 'crypto'},
  { id: 'avax',   symbol: 'AVAX-USD', label: 'AVAX/USD',  fmt: 'dec'   },
  { id: 'eur',    symbol: 'EURUSD=X', label: 'EUR/USD',   fmt: 'forex' },
  { id: 'usdtry', symbol: 'USDTRY=X', label: 'USD/TRY',   fmt: 'dec'   },
  { id: 'gold',   symbol: 'GC=F',     label: 'Gold',      fmt: 'dec'   },
  { id: 'oil',    symbol: 'CL=F',     label: 'WTI Oil',   fmt: 'dec'   },
  { id: 'copper', symbol: 'HG=F',     label: 'Copper',    fmt: 'dec'   },
];

// ── Home panel — categorised symbols ─────────
const HOME_CATEGORIES = [
  {
    id: 'indices', label: 'INDICES',
    symbols: [
      { id: 'sp500',  symbol: '^GSPC',    label: 'S&P 500',    fmt: 'int' },
      { id: 'nasdaq', symbol: '^IXIC',    label: 'NASDAQ',     fmt: 'int' },
      { id: 'dji',    symbol: '^DJI',     label: 'Dow Jones',  fmt: 'int' },
      { id: 'rut',    symbol: '^RUT',     label: 'Russell 2K', fmt: 'int' },
      { id: 'bist',   symbol: 'XU100.IS', label: 'BIST 100',   fmt: 'int' },
      { id: 'dax',    symbol: '^GDAXI',   label: 'DAX',        fmt: 'int' },
      { id: 'cac40',  symbol: '^FCHI',    label: 'CAC 40',     fmt: 'int' },
      { id: 'ftse',   symbol: '^FTSE',    label: 'FTSE 100',   fmt: 'int' },
      { id: 'n225',   symbol: '^N225',    label: 'Nikkei 225', fmt: 'int' },
      { id: 'hsi',    symbol: '^HSI',     label: 'Hang Seng',  fmt: 'int' },
      { id: 'kospi',  symbol: '^KS11',    label: 'KOSPI',      fmt: 'int' },
      { id: 'asx',    symbol: '^AXJO',    label: 'ASX 200',    fmt: 'int' },
    ],
  },
  {
    id: 'crypto', label: 'CRYPTO',
    symbols: [
      { id: 'btc',  symbol: 'BTC-USD',  label: 'Bitcoin',   fmt: 'crypto' },
      { id: 'eth',  symbol: 'ETH-USD',  label: 'Ethereum',  fmt: 'crypto' },
      { id: 'bnb',  symbol: 'BNB-USD',  label: 'BNB',       fmt: 'crypto' },
      { id: 'sol',  symbol: 'SOL-USD',  label: 'Solana',    fmt: 'dec'   },
      { id: 'avax', symbol: 'AVAX-USD', label: 'Avalanche', fmt: 'dec'   },
      { id: 'xrp',  symbol: 'XRP-USD',  label: 'XRP',       fmt: 'dec'   },
      { id: 'ada',  symbol: 'ADA-USD',  label: 'Cardano',   fmt: 'dec'   },
      { id: 'doge', symbol: 'DOGE-USD', label: 'Dogecoin',  fmt: 'dec'   },
      { id: 'link', symbol: 'LINK-USD', label: 'Chainlink', fmt: 'dec'   },
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
      { id: 'usdchf', symbol: 'USDCHF=X', label: 'USD / CHF', fmt: 'forex' },
      { id: 'audusd', symbol: 'AUDUSD=X', label: 'AUD / USD', fmt: 'forex' },
    ],
  },
  {
    id: 'commodities', label: 'COMMODITIES',
    symbols: [
      { id: 'gold',     symbol: 'GC=F',  label: 'Gold',      fmt: 'dec' },
      { id: 'silver',   symbol: 'SI=F',  label: 'Silver',    fmt: 'dec' },
      { id: 'platinum', symbol: 'PL=F',  label: 'Platinum',  fmt: 'dec' },
      { id: 'copper',   symbol: 'HG=F',  label: 'Copper',    fmt: 'dec' },
      { id: 'oil',      symbol: 'CL=F',  label: 'WTI Oil',   fmt: 'dec' },
      { id: 'brent',    symbol: 'BZ=F',  label: 'Brent',     fmt: 'dec' },
      { id: 'gas',      symbol: 'NG=F',  label: 'Nat. Gas',  fmt: 'dec' },
      { id: 'wheat',    symbol: 'ZW=F',  label: 'Wheat',     fmt: 'dec' },
    ],
  },
];

// Flat list derived from categories — used for API calls
const ALL_HOME_SYMBOLS = HOME_CATEGORIES.flatMap(c => c.symbols);

// ── Risk tracking symbols (fetched silently for Risk Meter) ──────────────
const RISK_SYMBOLS = [
  { id: 'vix', symbol: '^VIX',     label: 'VIX', fmt: 'dec' },
  { id: 'dxy', symbol: 'DX-Y.NYB', label: 'DXY', fmt: 'dec' },
];
const riskPrices = {};  // { vix: { price, change, pct }, dxy: … }

async function fetchRiskData() {
  await Promise.allSettled(
    RISK_SYMBOLS.map(sym =>
      fetchPriceV8(sym).then(d => { if (d) riskPrices[sym.id] = d; })
    )
  );
  updateMarketBriefing();
  // Refresh narrative feed after risk data updates
  if (typeof refreshNarrativeFeed === 'function') refreshNarrativeFeed();
}

function calcRiskScore() {
  let score = 0;
  const sp  = lastKnownPrices['sp500'];
  const vix = riskPrices['vix'];
  const dxy = riskPrices['dxy'];
  if (sp)  { if (sp.pct  >  0.5) score++; else if (sp.pct  < -0.5) score--; }
  if (vix) {
    if (vix.price < 15) score++;       // calm — risk-on
    else if (vix.price > 25) score--;  // elevated fear — risk-off
    if (vix.pct >  5) score--;         // VIX spiking = fear
    else if (vix.pct < -5) score++;    // VIX falling  = calm
  }
  if (dxy) { if (dxy.pct > 0.3) score--; else if (dxy.pct < -0.3) score++; }
  return score;
}

const DEFAULT_IDS  = ['sp500', 'nasdaq', 'bist', 'btc'];
const MAX_TICKERS  = 4;

// Simulation fallback prices (updated Feb 2026)
const SIM_BASES = {
  sp500: 5983, nasdaq: 19400, dji: 43400, ftse: 8620, n225: 38700,
  dax: 22000, cac40: 8160, bist: 10500,
  btc: 95800, eth: 2720, avax: 28.5,
  eur: 1.0480, usdtry: 36.2,
  gold: 2930, oil: 72.0, copper: 4.68,
};
const HOME_SIM_BASES = {
  // indices
  sp500: 5983, nasdaq: 19400, dji: 43400, rut: 2250,
  bist: 10500, dax: 22000, cac40: 8160, ftse: 8620,
  n225: 38700, hsi: 21200, kospi: 2520, asx: 8340,
  // crypto
  btc: 95800, eth: 2720, bnb: 630, sol: 165,
  avax: 28.5, xrp: 2.45, ada: 0.72, doge: 0.185, link: 14.8,
  // forex
  usdtry: 36.2, eurtry: 37.9, eurusd: 1.0480, gbpusd: 1.2580,
  usdjpy: 151.2, usdcny: 7.28, usdchf: 0.9045, audusd: 0.6285,
  // commodities
  gold: 2930, silver: 32.5, platinum: 968, copper: 4.68,
  oil: 72.0, brent: 76.1, gas: 3.85, wheat: 538,
};

// ── State ─────────────────────────────────────
let currentSite   = 'overview';
let loadedSites   = new Set();
let zoomFactors   = { marketwatch: 1, tradingview: 1, investing: 1, yahoo: 1, macrotrends: 1, reuters: 1, cnbc: 1, finviz: 1 };
let activeIds     = loadActiveIds();
let prevPositive  = {};
let newsHeadlines = [];
let newsIndex     = 0;
let activeCatId       = 'all';
let currentNewsFilter = null; // active symbol news filter
let _newsSearchQuery = '';    // v2.61 news panel keyword search
let catOrder = (() => { try { return JSON.parse(localStorage.getItem('fh_cat_order')) || null; } catch { return null; } })() || ['all','movers','indices','crypto','forex','commodities'];
const lastKnownPrices    = {};
const lastPriceFetchTime = {};   // { symbolId: timestamp } — cache freshness tracking
const _priceVelocityHistory = {};  // { symId: number[] } — last 6 prices for velocity arrows (v2.58)
const _intradayBreach = {};        // { symId: 'high'|'low'|null } — intraday breach tracking (v2.66)

// ── Chart annotation state (S/R lines) ────────
let chartAnnotations = (() => { try { return JSON.parse(localStorage.getItem('fh-annotations')) || {}; } catch(_) { return {}; } })();
let _mainChartMeta   = null; // last draw meta for coordinate mapping
let _showFib         = false; // Fibonacci retracement overlay toggle (F key)
let _lastRegime      = 'ranging'; // 'trending' | 'volatile' | 'ranging' — used for chart bg tint (v2.41)
let _rulerMode       = false; // Chart Time Ruler mode (T key, v2.42)
let _rulerClicks     = [];   // [{dataIdx, time, price}] — up to 2 points

function saveAnnotations() {
  try { localStorage.setItem('fh-annotations', JSON.stringify(chartAnnotations)); } catch(_) {}
}

// ── Earnings date marks (populated by loadFundamentalsBar) ─────────────
const _earningsDateMarks = {}; // { symbol: [{ date, actualEarningResult, estimatedEarning }] }

// ── Analyst consensus price targets (v2.53) ─────────────────────────────
const _analystTargets = {}; // { symbol: targetConsensusPrice }

// ── Per-symbol chart notes ─────────────────────
let chartNotes = (() => { try { return JSON.parse(localStorage.getItem('fh-chart-notes')) || {}; } catch(_) { return {}; } })();
function saveChartNotes() { try { localStorage.setItem('fh-chart-notes', JSON.stringify(chartNotes)); } catch(_) {} }

// ── Watchlist tag filter ───────────────────────
let activeWlTag = 'all';

// ── Alert history log ─────────────────────────
const alertHistory = []; // [{ symbol, label, price, target, isAbove, time }]

// -- External API keys
const FMP_KEY     = 'F5bckPDaxAwmvi8qMCzKCyJQ41nQq5Ir';
const FINNHUB_KEY = 'd6gb3k9r01qt49328ic0d6gb3k9r01qt49328icg';
const FRED_KEY    = 'eb8d5e3732bf2faba0091c49c441524c';

const _extCache = {};
function _extCacheGet(key) { const c = _extCache[key]; return (c && Date.now() - c.ts < 86_400_000) ? c.data : null; }
function _extCacheSet(key, data) { _extCache[key] = { data, ts: Date.now() }; }

async function fetchFmpProfile(symbol) {
  const key = `fmp_profile_${symbol}`;
  const cached = _extCacheGet(key); if (cached) return cached;
  try {
    const res = await window.electronAPI.fetchJson(`https://financialmodelingprep.com/api/v3/profile/${encodeURIComponent(symbol)}?apikey=${FMP_KEY}`);
    if (!res.ok) return null;
    const data = JSON.parse(res.text)?.[0] || null;
    if (data) _extCacheSet(key, data); return data;
  } catch { return null; }
}

async function fetchFmpTarget(symbol) {
  const key = `fmp_target_${symbol}`;
  const cached = _extCacheGet(key); if (cached) return cached;
  try {
    const res = await window.electronAPI.fetchJson(`https://financialmodelingprep.com/api/v3/price-target-consensus/${encodeURIComponent(symbol)}?apikey=${FMP_KEY}`);
    if (!res.ok) return null;
    const data = JSON.parse(res.text)?.[0] || null;
    if (data) _extCacheSet(key, data); return data;
  } catch { return null; }
}

async function fetchFinnhubRec(symbol) {
  const key = `fh_rec_${symbol}`;
  const cached = _extCacheGet(key); if (cached) return cached;
  try {
    const res = await window.electronAPI.fetchJson(`https://finnhub.io/api/v1/recommendation?symbol=${encodeURIComponent(symbol)}&token=${FINNHUB_KEY}`);
    if (!res.ok) return null;
    const arr = JSON.parse(res.text);
    const data = Array.isArray(arr) && arr.length ? arr[0] : null;
    if (data) _extCacheSet(key, data); return data;
  } catch { return null; }
}

async function fetchFredSeries(seriesId) {
  const key = `fred_${seriesId}`;
  const cached = _extCacheGet(key); if (cached) return cached;
  try {
    const res = await window.electronAPI.fetchJson(`https://api.stlouisfed.org/fred/series/observations?series_id=${seriesId}&api_key=${FRED_KEY}&file_type=json&limit=2&sort_order=desc`);
    if (!res.ok) return null;
    const obs = JSON.parse(res.text)?.observations;
    if (!Array.isArray(obs) || !obs.length) return null;
    const latest = obs.find(o => o.value !== '.');
    const prev   = obs.find((o, i) => i > 0 && o.value !== '.');
    const data = { value: latest ? parseFloat(latest.value) : null, prev: prev ? parseFloat(prev.value) : null, date: latest?.date || null };
    _extCacheSet(key, data); return data;
  } catch { return null; }
}

// Fetch last N observations for sparkline trend (ascending order, newest last)
async function fetchFredHistory(seriesId, limit = 12) {
  const key = `fred_hist_${seriesId}_${limit}`;
  const cached = _extCacheGet(key); if (cached) return cached;
  try {
    const res = await window.electronAPI.fetchJson(`https://api.stlouisfed.org/fred/series/observations?series_id=${seriesId}&api_key=${FRED_KEY}&file_type=json&limit=${limit}&sort_order=asc`);
    if (!res.ok) return null;
    const obs = JSON.parse(res.text)?.observations;
    if (!Array.isArray(obs) || !obs.length) return null;
    const vals = obs.filter(o => o.value !== '.').map(o => parseFloat(o.value));
    if (!vals.length) return null;
    _extCacheSet(key, vals); return vals;
  } catch { return null; }
}

// Draw a tiny sparkline trend onto a canvas element
function drawFredSparkline(canvas, values) {
  if (!canvas || !values || values.length < 2) return;
  const dpr = window.devicePixelRatio || 1;
  canvas.width  = canvas.offsetWidth  * dpr;
  canvas.height = canvas.offsetHeight * dpr;
  const W = canvas.width, H = canvas.height;
  if (W === 0 || H === 0) return;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, W, H);

  const pad = 2 * dpr;
  const cW = W - pad * 2, cH = H - pad * 2;
  const min = Math.min(...values), max = Math.max(...values);
  const rng = max - min || 1;
  const n   = values.length;

  const toX = i => pad + (i / (n - 1)) * cW;
  const toY = v => pad + cH - ((v - min) / rng) * cH;

  const isUp = values[n - 1] >= values[0];
  const lineColor = isUp ? 'rgba(16,185,129,0.8)' : 'rgba(239,68,68,0.8)';

  ctx.beginPath();
  ctx.moveTo(toX(0), toY(values[0]));
  for (let i = 1; i < n; i++) ctx.lineTo(toX(i), toY(values[i]));
  ctx.strokeStyle  = lineColor;
  ctx.lineWidth    = 1.5 * dpr;
  ctx.lineJoin     = 'round';
  ctx.lineCap      = 'round';
  ctx.stroke();

  // Dot at end
  ctx.beginPath();
  ctx.arc(toX(n - 1), toY(values[n - 1]), 2.5 * dpr, 0, Math.PI * 2);
  ctx.fillStyle = lineColor;
  ctx.fill();
}

async function loadFundamentalsBar(sym) {
  const bar = document.getElementById('fundamentals-bar'); if (!bar) return;
  const s = sym.symbol;
  const isEquity = !s.startsWith('^') && !s.endsWith('=X') && !s.endsWith('=F') && !s.endsWith('-USD') && !s.endsWith('.IS');
  if (!isEquity) { bar.style.display = 'none'; return; }
  bar.style.display = 'flex';
  bar.innerHTML = '<span class="fund-loading">Loading fundamentals…</span>';
  const [profRes, tgtRes, recRes, earnRes] = await Promise.allSettled([fetchFmpProfile(sym.symbol), fetchFmpTarget(sym.symbol), fetchFinnhubRec(sym.symbol), fetchEarningsSurprises(sym.symbol)]);
  const p    = profRes.status === 'fulfilled' ? profRes.value : null;
  const tgt  = tgtRes.status  === 'fulfilled' ? tgtRes.value  : null;
  const rec  = recRes.status  === 'fulfilled' ? recRes.value  : null;
  const earr = earnRes.status === 'fulfilled' ? earnRes.value : [];
  // Store earnings dates for chart markers
  if (earr && earr.length) _earningsDateMarks[sym.symbol] = earr;
  // Store analyst price target for chart overlay (v2.53)
  if (tgt && tgt.targetConsensus) _analystTargets[sym.symbol] = tgt.targetConsensus;
  if (!p) { bar.style.display = 'none'; return; }
  const fmtMcap = v => { if (!v) return '–'; if (v>=1e12) return `${(v/1e12).toFixed(2)}T`; if (v>=1e9) return `${(v/1e9).toFixed(1)}B`; if (v>=1e6) return `${(v/1e6).toFixed(0)}M`; return `${v}`; };
  const pe = p.pe != null ? p.pe.toFixed(1) : '–';
  const eps = p.eps != null ? `${p.eps.toFixed(2)}` : '–';
  const mcap = fmtMcap(p.mktCap);
  const beta = p.beta != null ? p.beta.toFixed(2) : '–';
  const h52 = p['52WeekHigh'] != null ? `${p['52WeekHigh'].toFixed(2)}` : '–';
  const l52 = p['52WeekLow'] != null ? `${p['52WeekLow'].toFixed(2)}` : '–';
  let targetHtml = '';
  if (tgt && tgt.targetConsensus) {
    const t = tgt.targetConsensus; const curr = lastKnownPrices[sym.id]?.price;
    const upside = curr ? ((t-curr)/curr*100).toFixed(1) : null;
    const uCls = upside && parseFloat(upside)>=0 ? 'positive' : 'negative';
    const uStr = upside ? `<span class="${uCls}">(${parseFloat(upside)>=0?'+':''}${upside}%)</span>` : '';
    targetHtml = `<div class="fund-sep"></div><div class="fund-item"><span class="fund-label">TARGET</span><span class="fund-value">${t.toFixed(2)} ${uStr}</span></div>`;
  }
  let recHtml = '';
  if (rec) {
    const buy=(rec.strongBuy||0)+(rec.buy||0); const hold=rec.hold||0; const sell=(rec.sell||0)+(rec.strongSell||0); const total=buy+hold+sell;
    if (total>0) {
      const consensus = buy>sell&&buy>hold?'BUY':sell>buy&&sell>hold?'SELL':'HOLD';
      const conCls = consensus==='BUY'?'positive':consensus==='SELL'?'negative':'neutral';
      recHtml = `<div class="fund-sep"></div><div class="fund-item"><span class="fund-label">ANALYSTS</span><span class="fund-value"><span class="${conCls}">${consensus}</span> <span class="fund-sub">${buy}B ${hold}H ${sell}S</span></span></div>`;
    }
  }
  const sep = '<div class="fund-sep"></div>';
  // ── Earnings countdown ──────────────────────────────────────────────────
  let earningsHtml = '';
  if (earr && earr.length > 0) {
    try {
      // Most recent date is earr[0].date (format: "2024-10-31")
      const lastEarnDate = new Date(earr[0].date + 'T12:00:00Z');
      const nextEarnDate = new Date(lastEarnDate);
      nextEarnDate.setMonth(nextEarnDate.getMonth() + 3); // approximate next quarter
      const diffDays = Math.round((nextEarnDate - Date.now()) / 86_400_000);
      let eTxt, eCls;
      if (diffDays > 90)       { eTxt = '> 90d';         eCls = ''; }
      else if (diffDays > 0)   { eTxt = `in ${diffDays}d`; eCls = diffDays <= 14 ? 'positive' : ''; }
      else if (diffDays >= -7) { eTxt = 'this week!';    eCls = 'positive'; }
      else                     { eTxt = 'reported';       eCls = ''; }
      earningsHtml = `${sep}<div class="fund-item"><span class="fund-label">EARNINGS</span><span class="fund-value ${eCls}" title="Based on last report: ${earr[0].date}">~${eTxt}</span></div>`;
    } catch (_) {}
  }
  // ── Earnings Beat Streak ────────────────────────────────────────────────
  let beatStreakHtml = '';
  if (earr && earr.length >= 2) {
    try {
      const valid = earr.slice(0, 4).filter(q => q.actualEarningResult != null && q.estimatedEarning != null);
      if (valid.length >= 2) {
        const results = valid.map(q => q.actualEarningResult > q.estimatedEarning);
        const beatCount = results.filter(Boolean).length;
        let streak = 0;
        for (const r of results) { if (r) streak++; else break; }
        const fire = streak >= 3 ? '🔥' : '';
        const beatLabel = streak >= 2 ? `${fire}Beat ${streak}Q` : streak === 1 ? 'Beat 1Q' : 'Missed';
        const beatCls = beatCount >= 3 ? 'positive' : beatCount <= 1 ? 'negative' : '';
        const beatTitle = `${beatCount}/${valid.length} quarters beat EPS estimates`;
        beatStreakHtml = `${sep}<div class="fund-item"><span class="fund-label">BEAT</span><span class="fund-value ${beatCls}" title="${beatTitle}">${beatLabel} <span class="fund-sub">${beatCount}/${valid.length}Q</span></span></div>`;
      }
    } catch (_) {}
  }
  // ── Dividend Yield ──────────────────────────────────────────────────────
  let divHtml = '';
  if (p.dividendYield && p.dividendYield > 0) {
    const yld = (p.dividendYield * 100).toFixed(2);
    const amt = p.lastDividend ? ` · $${parseFloat(p.lastDividend).toFixed(2)}` : '';
    divHtml = `${sep}<div class="fund-item"><span class="fund-label">DIV</span><span class="fund-value positive">${yld}%<span class="fund-sub">${amt}</span></span></div>`;
  }
  bar.innerHTML = `
    <div class="fund-item"><span class="fund-label">MKT CAP</span><span class="fund-value">${mcap}</span></div>
    ${sep}
    <div class="fund-item"><span class="fund-label">P/E</span><span class="fund-value">${pe}</span></div>
    ${sep}
    <div class="fund-item"><span class="fund-label">EPS</span><span class="fund-value">${eps}</span></div>
    ${sep}
    <div class="fund-item"><span class="fund-label">BETA</span><span class="fund-value">${beta}</span></div>
    ${sep}
    <div class="fund-item fund-range-item">
      <span class="fund-label">52W</span>
      <div class="fund-range-wrap">
        <span class="fund-range-lo">${l52}</span>
        <div class="fund-range-bar">
          ${(() => {
            const lo = parseFloat(l52), hi = parseFloat(h52);
            const curr = lastKnownPrices[sym.id]?.price;
            if (curr && lo && hi && hi > lo) {
              const pct = Math.min(100, Math.max(0, ((curr - lo) / (hi - lo)) * 100));
              return `<div class="fund-range-fill" style="left:${pct.toFixed(1)}%"></div>`;
            }
            return '<div class="fund-range-fill" style="left:50%"></div>';
          })()}
        </div>
        <span class="fund-range-hi">${h52}</span>
      </div>
    </div>
    ${targetHtml}
    ${recHtml}
    ${earningsHtml}
    ${beatStreakHtml}
    ${divHtml}
    ${p.sector ? sep + `<div class="fund-item"><span class="fund-label">SECTOR</span><span class="fund-value fund-sector">${p.sector}</span></div>` : ''}
  `;
}

// ── Company-specific news (Finnhub) ─────────────────
async function fetchFinnhubCompanyNews(symbol) {
  const key = `fh_news_${symbol}`;
  const cached = _extCacheGet(key);
  if (cached) return cached;
  try {
    const to   = new Date().toISOString().slice(0,10);
    const from = new Date(Date.now() - 7*86400000).toISOString().slice(0,10);
    const res  = await window.electronAPI.fetchJson(
      `https://finnhub.io/api/v1/company-news?symbol=${encodeURIComponent(symbol)}&from=${from}&to=${to}&token=${FINNHUB_KEY}`
    );
    if (!res.ok) return [];
    const arr = JSON.parse(res.text);
    const data = Array.isArray(arr) ? arr.slice(0,15) : [];
    _extCacheSet(key, data);
    return data;
  } catch { return []; }
}

// ── Finnhub News Sentiment ─────────────────────────────────
async function fetchFinnhubNewsSentiment(symbol) {
  const key = `fh_sent_${symbol}`;
  const cached = _extCacheGet(key);
  if (cached) return cached;
  try {
    const res = await window.electronAPI.fetchJson(
      `https://finnhub.io/api/v1/news-sentiment?symbol=${encodeURIComponent(symbol)}&token=${FINNHUB_KEY}`
    );
    if (!res.ok) return null;
    const data = JSON.parse(res.text);
    if (!data || !data.sentiment) return null;
    _extCacheSet(key, data);
    return data;
  } catch { return null; }
}

// ── GeoPulse Score ─────────────────────────────────────────
// Composite geopolitical stress: 0=LOW, 1-3=ELEVATED, 4+=HIGH
function calcGeoPulseScore() {
  let score = 0;
  const vix  = riskPrices['vix'];
  const gold = lastKnownPrices['gold'];
  const oil  = lastKnownPrices['oil'];
  const dxy  = riskPrices['dxy'];
  if (vix)  { if (vix.price > 30) score += 2; else if (vix.price > 22) score += 1; }
  if (gold) { if (gold.pct  > 1.0) score += 2; else if (gold.pct > 0.3) score += 1; }
  if (oil)  { if (oil.pct   > 1.5) score += 1; else if (oil.pct  > 0.5) score += 1; }
  if (dxy)  { if (dxy.pct   > 0.5) score += 1; }
  return score;
}

// ── Earnings surprises (FMP) ──────────────────────────────
async function fetchEarningsSurprises(symbol) {
  const key = `fmp_earn_${symbol}`;
  const cached = _extCacheGet(key);
  if (cached) return cached;
  try {
    const res = await window.electronAPI.fetchJson(
      `https://financialmodelingprep.com/api/v3/earnings-surprises/${encodeURIComponent(symbol)}?apikey=${FMP_KEY}`
    );
    if (!res.ok) return [];
    const arr = JSON.parse(res.text);
    const data = Array.isArray(arr) ? arr.slice(0,4) : [];
    _extCacheSet(key, data);
    return data;
  } catch { return []; }
}

// ── Insider transactions (Finnhub) ────────────────────────────
async function fetchInsiderTransactions(symbol) {
  const key = `fh_insider_${symbol}`;
  const cached = _extCacheGet(key);
  if (cached) return cached;
  try {
    const res = await window.electronAPI.fetchJson(
      `https://finnhub.io/api/v1/stock/insider-transactions?symbol=${encodeURIComponent(symbol)}&token=${FINNHUB_KEY}`
    );
    if (!res.ok) return [];
    const data = JSON.parse(res.text)?.data || [];
    const filtered = data.filter(t => t.transactionCode === 'P' || t.transactionCode === 'S').slice(0,6);
    _extCacheSet(key, filtered);
    return filtered;
  } catch { return []; }
}

// ── Peer symbols (Finnhub) ────────────────────────────────
async function fetchPeerSymbols(symbol) {
  const key = `fh_peers_${symbol}`;
  const cached = _extCacheGet(key);
  if (cached) return cached;
  try {
    const res = await window.electronAPI.fetchJson(
      `https://finnhub.io/api/v1/stock/peers?symbol=${encodeURIComponent(symbol)}&token=${FINNHUB_KEY}`
    );
    if (!res.ok) return [];
    const arr = JSON.parse(res.text);
    const data = Array.isArray(arr) ? arr.filter(s => s !== symbol).slice(0,8) : [];
    _extCacheSet(key, data);
    return data;
  } catch { return []; }
}

// ── Extra info bar (Earnings + Insider + Peers) ──────────────
let currentCompanyNews = [];

async function loadExtraInfoBar(sym) {
  const bar = document.getElementById('extra-info-bar');
  if (!bar) return;
  const s = sym.symbol;
  const isEquity = !s.startsWith('^') && !s.endsWith('=X') && !s.endsWith('=F') && !s.endsWith('-USD') && !s.endsWith('.IS');
  if (!isEquity) { bar.style.display = 'none'; currentCompanyNews = []; updateNewsSentimentWidget(null); return; }

  bar.style.display = 'block';
  bar.innerHTML = '<div class="eib-loading">Loading details…</div>';

  const [newsArr, earningsArr, insiderArr, peersArr, sentArr] = await Promise.allSettled([
    fetchFinnhubCompanyNews(sym.symbol),
    fetchEarningsSurprises(sym.symbol),
    fetchInsiderTransactions(sym.symbol),
    fetchPeerSymbols(sym.symbol),
    fetchFinnhubNewsSentiment(sym.symbol),
  ]);

  const news     = newsArr.status    === 'fulfilled' ? newsArr.value    : [];
  const earnings = earningsArr.status=== 'fulfilled' ? earningsArr.value: [];
  const insider  = insiderArr.status === 'fulfilled' ? insiderArr.value : [];
  const peers    = peersArr.status   === 'fulfilled' ? peersArr.value   : [];
  const sentData = sentArr.status    === 'fulfilled' ? sentArr.value    : null;

  // Cache company news for renderNewsPanel + update sentiment widget
  currentCompanyNews = news;
  updateNewsSentimentWidget(sentData);
  renderNewsPanel();

  let html = '';

  // ── Earnings section ───────────────────────────
  if (earnings.length > 0) {
    const cards = earnings.map(e => {
      const beat = e.actualEarningResult != null && e.estimatedEarning != null
        ? e.actualEarningResult >= e.estimatedEarning : null;
      const cls  = beat === true ? 'positive' : beat === false ? 'negative' : 'neutral';
      const icon = beat === true ? '▲' : beat === false ? '▼' : '–';
      const dateStr = e.date ? e.date.slice(0,7) : '–';
      const actual  = e.actualEarningResult != null ? `${e.actualEarningResult.toFixed(2)}` : '–';
      const est     = e.estimatedEarning   != null ? `${e.estimatedEarning.toFixed(2)}`   : '–';
      return `<div class="earn-card">
        <div class="earn-date">${dateStr}</div>
        <div class="earn-vals">
          <span class="earn-actual ${cls}">${icon} ${actual}</span>
          <span class="earn-est">est ${est}</span>
        </div>
      </div>`;
    }).join('');
    html += `<div class="eib-section">
      <div class="eib-section-title">EARNINGS HISTORY</div>
      <div class="earn-row">${cards}</div>
    </div>`;
  }

  // ── Insider section ────────────────────────────
  if (insider.length > 0) {
    // Cluster buy detection: 3+ buys within last 30 days
    const thirtyDaysAgo = new Date(Date.now() - 30 * 86_400_000).toISOString().slice(0,10);
    const recentBuys = insider.filter(t => t.transactionCode === 'P' && (t.transactionDate || '') >= thirtyDaysAgo);
    const recentSells = insider.filter(t => t.transactionCode === 'S' && (t.transactionDate || '') >= thirtyDaysAgo);
    let clusterBadge = '';
    if (recentBuys.length >= 3) {
      clusterBadge = `<span class="insider-cluster-badge positive">🔥 CLUSTER BUY · ${recentBuys.length} insiders</span>`;
    } else if (recentSells.length >= 3) {
      clusterBadge = `<span class="insider-cluster-badge negative">⚠ CLUSTER SELL · ${recentSells.length} insiders</span>`;
    }
    const rows = insider.map(t => {
      const isBuy = t.transactionCode === 'P';
      const cls   = isBuy ? 'positive' : 'negative';
      const label = isBuy ? 'BUY' : 'SELL';
      const name  = (t.name || 'Insider').split(' ').slice(0,2).join(' ');
      const shares= t.change != null ? Math.abs(t.change).toLocaleString('en-US') : '–';
      const price = t.transactionPrice ? `@ ${parseFloat(t.transactionPrice).toFixed(2)}` : '';
      const date  = t.transactionDate || t.filingDate || '';
      return `<div class="insider-row">
        <span class="insider-badge ${cls}">${label}</span>
        <span class="insider-name">${name}</span>
        <span class="insider-shares">${shares} shares ${price}</span>
        <span class="insider-date">${date}</span>
      </div>`;
    }).join('');
    html += `<div class="eib-section">
      <div class="eib-section-title">INSIDER TRANSACTIONS${clusterBadge}</div>
      <div class="insider-list">${rows}</div>
    </div>`;
  }

  // ── Peers section ──────────────────────────────
  if (peers.length > 0) {
    const chips = peers.map(p => `<button class="peer-chip" data-peer="${p}">${p}</button>`).join('');
    html += `<div class="eib-section">
      <div class="eib-section-title">PEERS</div>
      <div class="peer-chips">${chips}</div>
    </div>`;
  }

  if (!html) { bar.style.display = 'none'; return; }
  bar.innerHTML = html;

  // Peer click -> select as chart symbol
  bar.querySelectorAll('.peer-chip').forEach(btn => {
    btn.addEventListener('click', () => {
      const peerSym = btn.dataset.peer;
      const known = ALL_HOME_SYMBOLS.find(s => s.symbol === peerSym);
      if (known) {
        selectMainChartSym(known);
      } else {
        const tmp = { id: '_peer_' + peerSym, symbol: peerSym, label: peerSym, fmt: 'dec' };
        selectedChartSym = tmp;
        const nameEl = document.getElementById('main-name');
        if (nameEl) nameEl.textContent = peerSym;
        loadMainChart();
        loadFundamentalsBar(tmp);
        loadExtraInfoBar(tmp);
      }
    });
  });
}

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
const myspacePanel     = document.getElementById('myspace-panel');
const heatmapPanel     = document.getElementById('heatmap-panel');
const pulsePanel       = document.getElementById('pulse-panel');
const calendarPanel    = document.getElementById('calendar-panel');
const sentimentPanel   = document.getElementById('sentiment-panel');
const globePanel       = document.getElementById('globe-panel');
const insiderPanel     = document.getElementById('insider-panel');
const signalsPanel     = document.getElementById('signals-panel');
const scannerPanel     = document.getElementById('scanner-panel');
const dnaPanel         = document.getElementById('dna-panel');
const btnSettings      = document.getElementById('btn-settings');
const btnSettingsClose = document.getElementById('btn-settings-close');
const settingsSymbols  = document.getElementById('settings-symbols');
const settingsNote     = document.getElementById('settings-note');
const newsText         = document.getElementById('news-text');
const btnTheme         = document.getElementById('btn-theme');

// ══════════════════════════════════════════════
// THEME (LIGHT / DARK)
// ══════════════════════════════════════════════
let currentTheme = localStorage.getItem('fh-theme') || 'dark';

function applyTheme(theme) {
  currentTheme = theme;
  if (theme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
  localStorage.setItem('fh-theme', theme);
  if (btnTheme) {
    btnTheme.title = theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode';
  }
  // Redraw all visible charts so colors update immediately
  redrawVisibleCharts();
}

function toggleTheme() {
  document.documentElement.classList.add('theme-transitioning');
  setTimeout(() => document.documentElement.classList.remove('theme-transitioning'), 350);
  applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
}

// ── Chart gradient themes (v2.56) ─────────────────────────────────────────
let _chartTheme = (() => { try { return localStorage.getItem('fh-chart-theme') || 'default'; } catch { return 'default'; } })();
const CHART_THEMES = {
  default: { upFill: ['rgba(16,185,129,0.22)', 'rgba(16,185,129,0.03)', 'rgba(0,0,0,0)'],
             dnFill: ['rgba(239,68,68,0.20)',   'rgba(239,68,68,0.02)',  'rgba(0,0,0,0)'],
             upLine: '#10b981', dnLine: '#ef4444' },
  ocean:   { upFill: ['rgba(56,189,248,0.28)', 'rgba(56,189,248,0.04)', 'rgba(0,0,0,0)'],
             dnFill: ['rgba(167,139,250,0.24)', 'rgba(167,139,250,0.03)','rgba(0,0,0,0)'],
             upLine: '#38bdf8', dnLine: '#a78bfa' },
  sunset:  { upFill: ['rgba(251,191,36,0.26)', 'rgba(251,191,36,0.03)', 'rgba(0,0,0,0)'],
             dnFill: ['rgba(244,114,182,0.24)', 'rgba(244,114,182,0.03)','rgba(0,0,0,0)'],
             upLine: '#fbbf24', dnLine: '#f472b6' },
  neon:    { upFill: ['rgba(52,211,153,0.32)', 'rgba(52,211,153,0.05)', 'rgba(0,0,0,0)'],
             dnFill: ['rgba(248,113,113,0.28)', 'rgba(248,113,113,0.04)','rgba(0,0,0,0)'],
             upLine: '#34d399', dnLine: '#f87171' },
};
function getThemeColors(isUp) {
  const t = CHART_THEMES[_chartTheme] || CHART_THEMES.default;
  return {
    fill:  isUp ? t.upFill : t.dnFill,
    line:  isUp ? t.upLine : t.dnLine,
    aura:  isUp ? (t.upLine.replace('#','').match(/../g)?.map(x=>parseInt(x,16)).join(',') || '16,185,129')
                : (t.dnLine.replace('#','').match(/../g)?.map(x=>parseInt(x,16)).join(',') || '239,68,68'),
  };
}

// Returns chart canvas colors from CSS variables (theme-aware)
function getChartColors() {
  const s = getComputedStyle(document.documentElement);
  const g = p => s.getPropertyValue(p).trim();
  return {
    grid:       g('--chart-grid')        || 'rgba(255,255,255,0.04)',
    label:      g('--chart-label')       || 'rgba(148,163,184,0.55)',
    crosshair:  g('--chart-crosshair')   || 'rgba(255,255,255,0.14)',
    tooltipBg:  g('--chart-tooltip-bg')  || 'rgba(22,22,32,0.94)',
    tooltipTxt: g('--chart-tooltip-txt') || '#f1f5f9',
    dotRing:    g('--chart-dot-ring')    || 'rgba(255,255,255,0.75)',
  };
}

function redrawVisibleCharts() {
  const canvas = document.getElementById('main-chart-canvas');
  if (canvas && lastMainChartData && lastMainChartSym) {
    drawMainChart(canvas, lastMainChartData, lastMainChartSym);
    updateSubPanels(lastMainChartData);
  }
  // Redraw sparklines with correct isUp from cached data
  document.querySelectorAll('.sym-chip canvas').forEach(c => {
    const symId = c.closest('.sym-chip')?.dataset?.symId;
    if (symId && chartDataCache) {
      const key  = Object.keys(chartDataCache).find(k => k.startsWith(symId + '|'));
      if (key) {
        const d  = chartDataCache[key];
        const pr = d.map(x => x.close).filter(p => p != null);
        const isUp = pr.length >= 2 ? pr[pr.length - 1] >= pr[0] : true;
        drawSparkline(c, d, isUp);
      }
    }
  });
}

// Init theme
applyTheme(currentTheme);

if (btnTheme) btnTheme.addEventListener('click', toggleTheme);

// ── Chrome / Acrylic Mode (v2.48) ────────────────────────────────────────
let _acrylicOn = localStorage.getItem('fh-acrylic') === '1';

function applyAcrylic(enable) {
  _acrylicOn = enable;
  localStorage.setItem('fh-acrylic', enable ? '1' : '0');
  document.documentElement.classList.toggle('chrome-mode', enable);
  try { window.electronAPI?.setAcrylic(enable); } catch (_) {}
  const btn = document.getElementById('btn-acrylic');
  if (btn) {
    btn.classList.toggle('active', enable);
    btn.title = enable ? 'Chrome mode ON — click to disable' : 'Chrome mode — transparent frosted glass window';
  }
}

document.getElementById('btn-acrylic')?.addEventListener('click', () => applyAcrylic(!_acrylicOn));
// Apply saved state on load
if (_acrylicOn) applyAcrylic(true);

// Sidebar command palette hint click
document.querySelector('.sidebar-cmd-hint')?.addEventListener('click', () => openCommandPalette());

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
        `<span class="ticker-dir neutral" id="td${suffix}-${sym.id}">●</span>` +
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
  const dirChar    = isPositive ? '▲' : '▼';
  // magnitude-based background tint: 3% change = full intensity
  const mag = Math.min(Math.abs(pct) / 3, 1);
  const bg  = isPositive
    ? `rgba(16,185,129,${(mag * 0.13).toFixed(3)})`
    : `rgba(239,68,68,${(mag * 0.13).toFixed(3)})`;

  // Update both primary and duplicate elements
  ['', '2'].forEach(suffix => {
    const el = document.getElementById(`tv${suffix}-${sym.id}`);
    if (!el) return;
    el.textContent = newText;
    el.classList.remove('flash-up', 'flash-down', 'positive', 'negative', 'neutral');
    el.classList.add(cls);
    // Direction arrow
    const dir = document.getElementById(`td${suffix}-${sym.id}`);
    if (dir) { dir.textContent = dirChar; dir.className = `ticker-dir ${cls}`; }
    // Magnitude tint on parent item
    const tItem = el.closest('.ticker-item');
    if (tItem) tItem.style.background = bg;
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

// ── Fetch a single symbol price via v8/chart (no crumb required) ──────────
async function fetchPriceV8(sym) {
  // Use query2 as primary (less rate-limited for chart calls), query1 as fallback
  const hosts = ['query2', 'query1'];
  for (const host of hosts) {
    const url = `https://${host}.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(sym.symbol)}?range=5d&interval=1d&includePrePost=false`;
    try {
      const result = await window.electronAPI.fetchJson(url);
      if (!result.ok) continue;
      const json = JSON.parse(result.text);
      const meta = json?.chart?.result?.[0]?.meta;
      if (!meta || meta.regularMarketPrice == null) continue;

      const price       = meta.regularMarketPrice;
      const prev        = meta.chartPreviousClose || meta.previousClose || price;
      const change      = price - prev;
      const pct         = prev ? (change / prev) * 100 : 0;
      const marketState = meta.marketState || 'CLOSED';
      // Extended hours data (available in PRE/POST/CLOSED states)
      const extPrice    = meta.preMarketPrice  || meta.postMarketPrice  || null;
      const extPct      = meta.preMarketChangePercent || meta.postMarketChangePercent || null;
      const extType     = meta.preMarketPrice ? 'pre' : (meta.postMarketPrice ? 'post' : null);
      // Intraday range (v2.45)
      const dayLow      = meta.regularMarketDayLow  || null;
      const dayHigh     = meta.regularMarketDayHigh || null;
      return { price, change, pct, marketState, extPrice, extPct, extType, dayLow, dayHigh };
    } catch (_) { /* try next host */ }
  }
  return null;
}

// CoinGecko ID map for crypto fallback
const COINGECKO_IDS = {
  'BTC-USD': 'bitcoin', 'ETH-USD': 'ethereum', 'BNB-USD': 'binancecoin',
  'SOL-USD': 'solana',  'AVAX-USD': 'avalanche-2', 'XRP-USD': 'ripple',
  'ADA-USD': 'cardano', 'DOGE-USD': 'dogecoin',    'LINK-USD': 'chainlink',
};

async function fetchPriceCoingecko(symbol) {
  const cgId = COINGECKO_IDS[symbol];
  if (!cgId) return null;
  try {
    const result = await window.electronAPI.fetchJson(
      `https://api.coingecko.com/api/v3/simple/price?ids=${cgId}&vs_currencies=usd&include_24hr_change=true`
    );
    if (!result.ok) return null;
    const data = JSON.parse(result.text);
    const coin = data[cgId];
    if (!coin || coin.usd == null) return null;
    const price = coin.usd;
    const pct   = coin.usd_24h_change ?? 0;
    return { price, change: null, pct, marketState: 'REGULAR' };
  } catch { return null; }
}

async function fetchPriceWithFallback(sym) {
  const res = await fetchPriceV8(sym);
  if (res && res.price != null) return res;
  // Yahoo failed — try CoinGecko for crypto
  const cg = await fetchPriceCoingecko(sym.symbol);
  if (cg) { console.log('[Fallback] CoinGecko used for', sym.symbol); return cg; }
  return null;
}

async function fetchAndUpdateTickers() {
  const syms = ALL_SYMBOLS;

  // Fetch all 12 ticker symbols concurrently via v8/chart
  const results = await Promise.allSettled(syms.map(sym => fetchPriceV8(sym)));

  let anySuccess = false;
  results.forEach((res, i) => {
    const sym = syms[i];
    if (res.status === 'fulfilled' && res.value) {
      const { price, change, pct } = res.value;
      lastKnownTickerPrices[sym.id] = { price, change, pct };
      updateTickerValue(sym, price, change, pct);
      anySuccess = true;
    }
  });

  if (anySuccess) {
    showDataWarning(false);
  } else {
    console.warn('[Ticker] All v8/chart fetches failed — using simulation');
    simulateTickers();
    showDataWarning(true);
  }
}

// Show/hide data reliability warning
function showDataWarning(show) {
  let dot = document.getElementById('ticker-data-warning');
  if (show && !dot) {
    dot = document.createElement('span');
    dot.id = 'ticker-data-warning';
    dot.title = 'Live data unavailable — showing estimated prices';
    dot.style.cssText = 'position:absolute;top:6px;right:8px;background:#f59e0b;color:#000;font-size:9px;font-weight:700;padding:1px 5px;border-radius:3px;letter-spacing:.5px;z-index:10;pointer-events:none';
    dot.textContent = 'EST';
    document.querySelector('.ticker-bar')?.appendChild(dot);
  } else if (!show && dot) {
    dot.remove();
  }
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
  // openUTC/closeUTC in minutes from UTC midnight (for session progress bar v2.45)
  { id: 'nyse',   openUTC: 870,  closeUTC: 1260, isOpen: () => { const t = getTime(-5); const d = t.getDay(), m = t.getHours()*60+t.getMinutes(); return d>=1&&d<=5&&m>=570&&m<960;  } },
  { id: 'bist',   openUTC: 420,  closeUTC: 900,  isOpen: () => { const t = getTime(3);  const d = t.getDay(), m = t.getHours()*60+t.getMinutes(); return d>=1&&d<=5&&m>=600&&m<1080; } },
  { id: 'lse',    openUTC: 480,  closeUTC: 1010, isOpen: () => { const t = getTime(0);  const d = t.getDay(), m = t.getHours()*60+t.getMinutes(); return d>=1&&d<=5&&m>=480&&m<1010; } },
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

  // Keep market briefing bar dots in sync
  updateMarketBriefing();
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
    if (host.includes('yahoo'))       return 'YAHOO FIN.';
    if (host.includes('reuters'))     return 'REUTERS';
    if (host.includes('bloomberg'))   return 'BLOOMBERG';
    if (host.includes('wsj') || host.includes('dowjones') || host.includes('dj.com')) return 'WSJ';
    if (host.includes('cnbc'))        return 'CNBC';
    if (host.includes('marketwatch')) return 'MARKETWATCH';
    if (host.includes('benzinga'))    return 'BENZINGA';
    if (host.includes('investing'))   return 'INVESTING.COM';
    if (host.includes('seekingalpha'))return 'SEEK. ALPHA';
    if (host.includes('nasdaq'))      return 'NASDAQ';
    if (host.includes('bbc'))         return 'BBC BUSINESS';
    if (host.includes('fool'))        return 'MOTLEY FOOL';
    if (host.includes('ft.com'))      return 'FIN. TIMES';
    if (host.includes('barrons'))     return 'BARRON\'S';
    if (host.includes('forbes'))      return 'FORBES';
    if (host.includes('businessinsider') || host.includes('insider.com')) return 'BUS. INSIDER';
    return host.split('.')[0].toUpperCase().slice(0, 12);
  } catch { return ''; }
}

// ── News source tier (for color-coding in news panel) ─────────────────────
function sourceTier(source) {
  if (['YAHOO FIN.', 'CNBC', 'MARKETWATCH'].includes(source)) return '1';
  if (['WSJ', 'BBC BUSINESS', 'NASDAQ'].includes(source))     return '2';
  return '3';
}

// ── News headline sentiment scorer ────────────────────────────────────────
const _BULL_KW = ['surge','soar','beat','jump','rally','record','breakout','bull','strong','gain',' rise','profit','growth','upgrade','boom','high','top','buy','up ','upside','win','beat'];
const _BEAR_KW = ['crash','plunge','fall','miss','decline','drop','risk','warn','sell','bear','loss','weak','cut','downgrade','slump','fail','short','low','fear','down ','concern','threat','below'];
function newsSentiment(title) {
  const t = title.toLowerCase();
  const bull = _BULL_KW.filter(w => t.includes(w)).length;
  const bear = _BEAR_KW.filter(w => t.includes(w)).length;
  if (bull > bear && bull > 0) return 'bull';
  if (bear > bull && bear > 0) return 'bear';
  return 'neutral';
}

// ── v2.68: Smart News Tag detector ─────────────────────────────────────────
function _getNewsTag(title) {
  const t = title.toLowerCase();
  if (/\bearnings?\b|\beps\b|\bquarterly\b|\brevenue\b|\bguidance\b|\bbeat\b|\bmiss(ed)?\b|\bprofit\b|\bq[1-4]\b/.test(t))
    return { label: 'EARNINGS', cls: 'earnings' };
  if (/\bfed\b|\bfomc\b|\brate\b|\binterest rate\b|\bpowell\b|\byield\b|\binflation\b|\bcpi\b|\bpce\b|\bhike\b|\bpivot\b/.test(t))
    return { label: 'RATES', cls: 'rates' };
  if (/\bgdp\b|\bjobs?\b|\bnfp\b|\bunemployment\b|\bjackson hole\b|\bmacro\b|\brecession\b|\bsoftland\b/.test(t))
    return { label: 'MACRO', cls: 'macro' };
  if (/\bbitcoin\b|\bcrypto\b|\betherenum\b|\bblockchain\b|\bdefi\b|\bnft\b|\bsolana\b|\bbtc\b|\beth\b/.test(t))
    return { label: 'CRYPTO', cls: 'crypto' };
  if (/\bm&a\b|\bmerger\b|\bacquisition\b|\bdeal\b|\bbuyout\b|\bipo\b|\bspin.?off\b/.test(t))
    return { label: 'M&A', cls: 'ma' };
  if (/\bwar\b|\bgeopolit\b|\bsanction\b|\bchina\b|\btariff\b|\btrade war\b|\bconflict\b/.test(t))
    return { label: 'GEO', cls: 'geo' };
  return null;
}

// ── News Sentiment Widget (Finnhub aggregate) ─────────────────────────────
function updateNewsSentimentWidget(sentData) {
  const el = document.getElementById('news-sent-widget');
  if (!el) return;
  if (!sentData || !sentData.sentiment) { el.style.display = 'none'; return; }
  const bull = (sentData.sentiment.bullishPercent * 100).toFixed(0);
  const bear = (sentData.sentiment.bearishPercent * 100).toFixed(0);
  const score = sentData.companyNewsScore;
  const buzz  = sentData.buzz?.articlesInLastWeek || 0;
  const clsBar = bull >= 60 ? 'sent-bull' : bull <= 40 ? 'sent-bear' : 'sent-neutral';
  el.innerHTML = `
    <div class="sent-bar-wrap">
      <span class="sent-label sent-bull-lbl">📈 ${bull}%</span>
      <div class="sent-bar">
        <div class="sent-bar-fill ${clsBar}" style="width:${bull}%"></div>
      </div>
      <span class="sent-label sent-bear-lbl">📉 ${bear}%</span>
    </div>
    <span class="sent-meta">${buzz} articles · score ${score?.toFixed(2) ?? '–'}</span>`;
  el.style.display = '';
}

// ── News Chart Annotations ────────────────────────────────────────────────
// Draws small colored news dots at the top of a chart canvas for currentCompanyNews
function drawNewsAnnotations(ctx, data, toX, pT, dpr) {
  if (!currentCompanyNews || currentCompanyNews.length === 0) return;
  if (!selectedChartSym) return;
  try {
    ctx.save();
    const DOT_R = 3.5 * dpr;
    const DOT_Y = pT + DOT_R + 2 * dpr;
    for (const news of currentCompanyNews) {
      if (!news.datetime) continue;
      const newsTs = news.datetime; // unix seconds
      // Find closest bar index within ±12h (43200s)
      let bestIdx = -1, bestDelta = Infinity;
      for (let i = 0; i < data.length; i++) {
        const barTs = data[i].time / 1000; // ms → s
        const delta = Math.abs(barTs - newsTs);
        if (delta < bestDelta && delta < 43200) { bestDelta = delta; bestIdx = i; }
      }
      if (bestIdx < 0) continue;
      const sent = newsSentiment(news.headline || '');
      const col = sent === 'bull' ? 'rgba(16,185,129,0.85)'
                : sent === 'bear' ? 'rgba(239,68,68,0.85)'
                : 'rgba(100,116,139,0.65)';
      const x = toX(bestIdx);
      ctx.beginPath();
      ctx.arc(x, DOT_Y, DOT_R, 0, Math.PI * 2);
      ctx.fillStyle = col;
      ctx.fill();
      // Glow ring
      ctx.beginPath();
      ctx.arc(x, DOT_Y, DOT_R + 1.5 * dpr, 0, Math.PI * 2);
      ctx.strokeStyle = col; ctx.lineWidth = 0.6 * dpr;
      ctx.globalAlpha = 0.35; ctx.stroke();
      ctx.globalAlpha = 1;
    }
    ctx.restore();
  } catch (_) {}
}

// ── WHY? overlay ──────────────────────────────────────────────────────────
async function fetchWhyNews(yahooSymbol) {
  try {
    const encoded = encodeURIComponent(yahooSymbol);
    const url = `https://feeds.finance.yahoo.com/rss/2.0/headline?s=${encoded}&region=US&lang=en-US`;
    const result = await window.electronAPI.fetchJson(url);
    if (!result.ok) return [];
    const xml   = new DOMParser().parseFromString(result.text, 'text/xml');
    const items = Array.from(xml.querySelectorAll('item')).slice(0, 6);
    return items.map(i => ({
      title: i.querySelector('title')?.textContent?.trim() || '',
      link:  i.getElementsByTagName('link')[0]?.nextSibling?.nodeValue?.trim()
          || i.querySelector('link')?.textContent?.trim()
          || i.querySelector('guid')?.textContent?.trim()
          || '',
      time:  i.querySelector('pubDate')?.textContent?.trim() || '',
    })).filter(n => n.title);
  } catch { return []; }
}

function showWhyOverlay(sym) {
  document.getElementById('why-overlay')?.remove();

  const pct  = lastKnownPrices[sym.id]?.pct ?? 0;
  const sign = pct >= 0 ? '+' : '';
  const cls  = pct >= 0 ? 'positive' : 'negative';

  const overlay = document.createElement('div');
  overlay.id        = 'why-overlay';
  overlay.className = 'why-overlay';
  overlay.innerHTML = `
    <div class="why-header">
      <div class="why-title">
        WHY IS <strong>${sym.label}</strong> MOVING?
        <span class="why-pct ${cls}">${sign}${pct.toFixed(2)}%</span>
      </div>
      <button class="why-close">✕</button>
    </div>
    <div class="why-body"><div class="why-loading">Fetching news…</div></div>`;

  document.getElementById('home-panel').appendChild(overlay);
  overlay.querySelector('.why-close').addEventListener('click', () => overlay.remove());

  fetchWhyNews(sym.symbol).then(news => {
    const body = overlay.querySelector('.why-body');
    if (!body) return;
    if (!news.length) {
      body.innerHTML = '<div class="why-empty">No recent news found for this symbol.</div>';
      return;
    }
    body.innerHTML = news.map(n => {
      const t = n.time ? new Date(n.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
      return `<div class="why-item" data-link="${n.link || ''}">
        <span class="why-item-title">${n.title}</span>
        ${t ? `<span class="why-item-time">${t}</span>` : ''}
      </div>`;
    }).join('');

    // Open news links in system browser (shell.openExternal via IPC)
    body.querySelectorAll('.why-item').forEach(el => {
      el.style.cursor = 'pointer';
      el.addEventListener('click', () => {
        const url = el.dataset.link;
        const title = el.querySelector('.why-item-title')?.textContent?.trim();
        if (url && url.startsWith('http')) {
          window.electronAPI.openExternal(url);
        } else if (title) {
          // Fallback: Google search for the headline
          window.electronAPI.openExternal(`https://www.google.com/search?q=${encodeURIComponent(title)}`);
        }
      });
    });
  });
}

// ── Multi-source RSS feeds ─────────────────────
// ⚠️ Legal note: Reuters & Investing.com RSS are technically personal-use only.
//    At commercial scale, replace with a licensed provider (e.g. newsapi.org).
const NEWS_FEEDS = [
  // ── Tier 1: High-volume, reliable ───────────────────────────────────────
  { url: 'https://feeds.finance.yahoo.com/rss/2.0/headline?s=%5EGSPC&region=US&lang=en-US',  max: 6 },
  { url: 'https://www.cnbc.com/id/100003114/device/rss/rss.html',                             max: 5 },
  { url: 'https://feeds.marketwatch.com/marketwatch/topstories/',                             max: 5 },
  // ── Tier 2: Major global outlets ────────────────────────────────────────
  { url: 'https://feeds.a.dj.com/rss/RSSMarketsMain.xml',                                    max: 5 }, // WSJ Markets
  { url: 'https://feeds.bbci.co.uk/news/business/rss.xml',                                   max: 4 }, // BBC Business
  { url: 'https://www.nasdaq.com/feed/rssoutbound?category=Markets',                          max: 4 }, // Nasdaq
  // ── Tier 3: Analysis & specialist ───────────────────────────────────────
  { url: 'https://feeds.benzinga.com/benzinga',                                               max: 4 },
  { url: 'https://seekingalpha.com/market_currents.xml',                                      max: 3 }, // Seeking Alpha
  // Reuters & Investing.com removed — personal-use ToS, legal risk at scale
];

function parseRssItems(xmlText, max) {
  try {
    const xml   = new DOMParser().parseFromString(xmlText, 'text/xml');
    const items = Array.from(xml.querySelectorAll('item')).slice(0, max);
    return items.map(i => {
      const title  = i.querySelector('title')?.textContent?.trim() || '';
      const linkEl = i.getElementsByTagName('link')[0];
      const link   = linkEl?.nextSibling?.nodeValue?.trim() || linkEl?.textContent?.trim() || '';
      const time   = i.querySelector('pubDate')?.textContent?.trim() || '';
      return { title, link, time, source: newsSource(link) };
    }).filter(n => n.title && n.link);
  } catch (_) { return []; }
}

async function fetchNews() {
  try {
    const results = await Promise.allSettled(
      NEWS_FEEDS.map(f => window.electronAPI.fetchJson(f.url).then(r => ({ r, max: f.max })))
    );

    const all = [];
    results.forEach(res => {
      if (res.status !== 'fulfilled') return;
      const { r, max } = res.value;
      if (!r.ok) return;
      all.push(...parseRssItems(r.text, max));
    });

    // Sort by date desc, deduplicate by title
    const seen = new Set();
    const parsed = all
      .filter(n => { if (seen.has(n.title)) return false; seen.add(n.title); return true; })
      .sort((a, b) => new Date(b.time) - new Date(a.time))
      .slice(0, 30);

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

function buildNewsKeywords(sym) {
  const kws = new Set();
  // Ticker: strip Yahoo suffixes
  const ticker = sym.symbol.replace(/=X$/, '').replace(/\^/, '').replace(/-USD$/, '').toLowerCase();
  if (ticker.length > 1) kws.add(ticker);
  // Label words
  sym.label.split(/[\s\/\-]+/).filter(w => w.length > 2).forEach(w => kws.add(w.toLowerCase()));
  // Hand-crafted extras
  const EXTRAS = {
    'BTC-USD': ['bitcoin','btc','crypto'], 'ETH-USD': ['ethereum','eth'],
    'BNB-USD': ['binance','bnb'],          'SOL-USD': ['solana'],
    'XRP-USD': ['ripple','xrp'],           'DOGE-USD': ['dogecoin','doge'],
    '^GSPC': ['s&p 500','sp500','spx'],  '^IXIC': ['nasdaq','ndx'],
    '^DJI': ['dow jones','dow'],        'GC=F': ['gold','xau'],
    'CL=F': ['oil','crude','wti'],      'BZ=F': ['brent'],
    'NG=F': ['natural gas'],
    'USDTRY=X': ['turkish lira','try','turkey'], 'EURUSD=X': ['euro','eur/usd'],
    '^VIX': ['vix','volatility'],
  };
  (EXTRAS[sym.symbol] || []).forEach(k => kws.add(k));
  return [...kws];
}

function clearNewsFilter() {
  currentNewsFilter = null;
  renderNewsPanel();
}

function renderNewsPanel() {
  const list  = document.getElementById('news-list');
  const title = document.getElementById('news-panel-title');
  if (!list) return;

  // Update header
  if (title) {
    if (currentNewsFilter) {
      title.innerHTML = `<span>${currentNewsFilter.label}</span><button class="news-filter-clear" onclick="clearNewsFilter()">× All</button>`;
    } else {
      title.textContent = 'Market News';
    }
  }

  if (!newsHeadlines.length) {
    list.innerHTML = '<div class="news-empty">No headlines available</div>';
    return;
  }

  let items = newsHeadlines;
  if (currentNewsFilter) {
    // Merge Finnhub company-specific news (fresher, more relevant)
    const fhNews = currentCompanyNews.map(n => ({
      title:   n.headline || n.summary || '',
      summary: n.summary || '',
      link:    n.url || '',
      time:    n.datetime ? new Date(n.datetime * 1000) : null,
      source:  n.source || 'Finnhub',
    })).filter(n => n.title);

    const kws = buildNewsKeywords(currentNewsFilter);
    const filtered = newsHeadlines.filter(n =>
      kws.some(kw => n.title.toLowerCase().includes(kw))
    );
    const rss = filtered.length > 0 ? filtered : newsHeadlines;

    // Deduplicate by title prefix (first 40 chars)
    const seen = new Set(fhNews.map(n => n.title.slice(0,40).toLowerCase()));
    const deduped = rss.filter(n => !seen.has(n.title.slice(0,40).toLowerCase()));
    items = [...fhNews, ...deduped].slice(0, 40);
  }

  // v2.61 — keyword search filter
  if (_newsSearchQuery.trim().length > 0) {
    const q = _newsSearchQuery.trim().toLowerCase();
    items = items.filter(n => n.title.toLowerCase().includes(q) || (n.source || '').toLowerCase().includes(q));
  }

  list.innerHTML = items.map((n, idx) => {
    const sent = newsSentiment(n.title);
    const ntag = _getNewsTag(n.title);
    const hasSummary = !!(n.summary && n.summary.trim() && n.summary.trim() !== n.title.trim());
    // v2.75: freshness indicator
    const ageMs  = n.time ? (Date.now() - new Date(n.time).getTime()) : Infinity;
    const isFresh = ageMs < 30 * 60 * 1000;   // < 30 min
    const isRecent = ageMs < 90 * 60 * 1000;   // < 90 min
    const freshTag = isFresh  ? `<span class="news-fresh-dot fresh" title="< 30 minutes ago">NEW</span>` :
                     isRecent ? `<span class="news-fresh-dot recent" title="< 90 minutes ago">HOT</span>` : '';
    return `
    <div class="news-item${hasSummary ? ' news-item-expandable' : ''}${isFresh ? ' news-item-fresh' : ''} news-sent-${sent}" data-url="${n.link}" data-idx="${idx}">
      <div class="news-item-inner">
        <div class="news-item-meta">
          <span class="news-item-time">${timeAgo(n.time) || '–'}</span>
          ${freshTag}
          ${n.source ? `<span class="news-item-dot"></span><span class="news-item-source tier-${sourceTier(n.source)}">${n.source}</span>` : ''}
          ${sent !== 'neutral' ? `<span class="news-sent-dot ${sent}" title="${sent === 'bull' ? '📈 Bullish signal' : '📉 Bearish signal'}"></span>` : ''}
          ${ntag ? `<span class="news-tag news-tag-${ntag.cls}">${ntag.label}</span>` : ''}
          ${hasSummary ? `<span class="news-expand-toggle" title="Expand summary">▸</span>` : ''}
        </div>
        <div class="news-item-title">${n.title}<span class="news-ext-icon">↗</span></div>
        ${hasSummary ? `<div class="news-item-summary" style="display:none">${n.summary}</div>` : ''}
      </div>
    </div>`;
  }).join('');

  // Disclaimer footer — remove old, append new
  const existingFooter = list.parentElement?.querySelector('.news-disclaimer');
  if (existingFooter) existingFooter.remove();
  const footer = document.createElement('div');
  footer.className = 'news-disclaimer';
  footer.textContent = 'Data may be delayed. Headlines link to original sources.';
  list.parentElement?.appendChild(footer);

  if (!list._newsClickDelegated) {
    list._newsClickDelegated = true;
    list.addEventListener('click', (e) => {
      const item = e.target.closest('.news-item');
      if (!item) return;
      // ↗ icon or double-click → open external
      if (e.target.classList.contains('news-ext-icon') || e.detail >= 2) {
        const url = item.dataset.url;
        if (url) window.open(url, '_blank');
        return;
      }
      // expand toggle click
      if (e.target.classList.contains('news-expand-toggle')) {
        const summary = item.querySelector('.news-item-summary');
        const toggle  = item.querySelector('.news-expand-toggle');
        if (summary) {
          const open = summary.style.display !== 'none';
          summary.style.display = open ? 'none' : '';
          if (toggle) toggle.textContent = open ? '▸' : '▾';
          item.classList.toggle('news-item-expanded', !open);
        }
        return;
      }
      // expandable item single click → expand
      if (item.classList.contains('news-item-expandable')) {
        const summary = item.querySelector('.news-item-summary');
        const toggle  = item.querySelector('.news-expand-toggle');
        if (summary) {
          const open = summary.style.display !== 'none';
          summary.style.display = open ? 'none' : '';
          if (toggle) toggle.textContent = open ? '▸' : '▾';
          item.classList.toggle('news-item-expanded', !open);
        }
        return;
      }
      // Default: open link
      const url = item.dataset.url;
      if (url) window.open(url, '_blank');
    });
  }
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
let currentChartType  = 'area'; // 'area' | 'candle'
let activeIndicators  = new Set(
  JSON.parse(localStorage.getItem('fh-ind-active') || '["rsi","volume"]')
); // active indicator keys
let pinnedSymbols     = JSON.parse(localStorage.getItem('fh_pinned') || '[]'); // pinned sym ids
const chartDataCache  = {};
let compareMode       = false;        // comparison chart active
let compareSyms       = [];           // [{id,symbol,name,fmt,color}] max 2
const COMPARE_COLORS  = ['#3b82f6', '#f59e0b', '#ec4899']; // blue, amber, pink
const compareDataMap  = {};           // symbol → data[], cached per compare session
let mainChartData     = null;
let mainHoverX        = -1;
let lastMainChartData = null; // for theme redraw
let lastMainChartSym  = null; // for theme redraw

// ── Chart draw-in animation state (v2.48) ────────────────────────────────
let _chartClipFrac = 1.0;  // 0→1, clip fraction for animated draw-in
let _chartAnimId   = null; // rAF handle

// ── Chart Zoom & Pan state (v2.49) ────────────────────────────────────────
let _zoomStart = 0;           // index of first visible bar
let _zoomBars  = -1;          // visible bar count (-1 = all)
let _isDraggingChart    = false;
let _dragStartX         = 0;
let _dragStartZoomStart = 0;
let _dragLastX          = 0;      // for velocity tracking (v2.51)
let _dragLastT          = 0;      // timestamp for velocity
let _dragVelPx          = 0;      // px/ms drag velocity
let _inertiaRaf         = null;   // RAF handle for momentum scroll

// ── Crosshair easing state (v2.50) ────────────────────────────────────────
let _rawHoverX    = -1;    // raw mouse X (target)
let _hoverLerpRaf = null;  // RAF ID for lerp loop

// ── Live Price Pulse Ring state (v2.49) ───────────────────────────────────
const _pulseRings = [];
function triggerPriceRing() {
  if (_pulseRings.length >= 3) return;
  const ring = { r: 0, alpha: 0.85 };
  _pulseRings.push(ring);
  const start = performance.now();
  function tick(now) {
    const t = Math.min(1, (now - start) / 750);
    ring.r     = t * 13;
    ring.alpha = (1 - t) * 0.85;
    const mc = document.getElementById('main-chart-canvas');
    if (mc && lastMainChartData) drawMainChart(mc, lastMainChartData, lastMainChartSym || selectedChartSym);
    if (t < 1) { ring._raf = requestAnimationFrame(tick); }
    else { const ix = _pulseRings.indexOf(ring); if (ix !== -1) _pulseRings.splice(ix, 1); }
  }
  ring._raf = requestAnimationFrame(tick);
}

// ── Chip spark particles on price tick (v2.50) ────────────────────────────
function sparkTick(el, up) {
  if (!el) return;
  const rect = el.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const col = up ? '#10b981' : '#ef4444';
  for (let i = 0; i < 6; i++) {
    const dot = document.createElement('div');
    const angle = (Math.random() * Math.PI) * (up ? -1 : 1) - (up ? 0 : Math.PI);
    const speed = Math.random() * 18 + 8;
    const dx = Math.cos(angle + (Math.random() - 0.5) * 1.8) * speed;
    const dy = Math.sin(angle + (Math.random() - 0.5) * 1.2) * speed;
    dot.className = 'spark-particle';
    dot.style.cssText = `left:${cx}px;top:${cy}px;background:${col};`
      + `--sdx:${dx.toFixed(1)}px;--sdy:${dy.toFixed(1)}px;`
      + `width:${(Math.random() * 3 + 2).toFixed(1)}px;height:${(Math.random() * 3 + 2).toFixed(1)}px;`
      + `animation-duration:${(Math.random() * 200 + 350).toFixed(0)}ms;`;
    document.body.appendChild(dot);
    setTimeout(() => dot.remove(), 600);
  }
}

// ── Volatility Lightning — flash when VIX spikes ≥5% (v2.51) ─────────────
let _prevVixPrice   = null;
let _lightningActive = false;

function triggerLightningFlash() {
  if (_lightningActive) return;
  _lightningActive = true;
  const overlay = document.getElementById('volatility-lightning-overlay');
  if (!overlay) { _lightningActive = false; return; }
  overlay.style.display = 'block';
  overlay.classList.remove('lightning-flash');
  void overlay.offsetWidth;   // reflow
  overlay.classList.add('lightning-flash');
  // Draw a lightning zigzag SVG inside the overlay
  const svg = overlay.querySelector('svg');
  if (svg) {
    const W = overlay.offsetWidth || 400;
    const H = overlay.offsetHeight || 200;
    const midX = W / 2 + (Math.random() - 0.5) * W * 0.4;
    const numSegs = 8 + Math.floor(Math.random() * 5);
    let pts = [{ x: midX, y: 0 }];
    for (let i = 1; i < numSegs; i++) {
      pts.push({
        x: pts[i-1].x + (Math.random() - 0.5) * W * 0.25,
        y: (i / numSegs) * H
      });
    }
    pts.push({ x: pts[pts.length-1].x + (Math.random() - 0.5) * 40, y: H });
    const d = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
    svg.innerHTML = `<path d="${d}" stroke="rgba(251,191,36,0.85)" stroke-width="2" fill="none"
      filter="url(#lf)" stroke-linecap="round" stroke-linejoin="round"/>
      <defs><filter id="lf"><feGaussianBlur stdDeviation="3"/></filter></defs>`;
  }
  setTimeout(() => {
    overlay.style.display = 'none';
    overlay.classList.remove('lightning-flash');
    if (svg) svg.innerHTML = '';
    _lightningActive = false;
  }, 900);
}

function startChartDrawAnim() {
  _chartClipFrac = 0;
  if (_chartAnimId) { cancelAnimationFrame(_chartAnimId); _chartAnimId = null; }
  const startTs  = performance.now();
  const DURATION = 550;
  function tick(now) {
    const t = Math.min(1, (now - startTs) / DURATION);
    _chartClipFrac = 1 - Math.pow(1 - t, 3); // cubic ease-out
    const mc = document.getElementById('main-chart');
    if (mc && lastMainChartData) drawMainChart(mc, lastMainChartData, lastMainChartSym || selectedChartSym);
    if (t < 1) _chartAnimId = requestAnimationFrame(tick);
    else { _chartAnimId = null; _chartClipFrac = 1.0; }
  }
  _chartAnimId = requestAnimationFrame(tick);
}

// ── v2.74: Live Candle Countdown ─────────────────────────────────────────────
function startCandleCountdown() {
  if (window._candleCountdownInterval) clearInterval(window._candleCountdownInterval);
  function update() {
    const el = document.getElementById('chart-candle-cdown');
    if (!el) return;
    const interval = mainTf?.interval;
    if (!interval || !['30m', '1h', '2h', '4h', '1d'].includes(interval)) { el.style.display = 'none'; return; }
    const now = new Date(); const nowMs = now.getTime();
    let closeMs = null;
    if (interval === '30m') {
      const min = now.getUTCMinutes(); const nextMin = min < 30 ? 30 : 60;
      closeMs = nowMs + (nextMin - min) * 60000 - now.getUTCSeconds() * 1000 - now.getUTCMilliseconds();
    } else if (interval === '1h') {
      closeMs = nowMs + (60 - now.getUTCMinutes()) * 60000 - now.getUTCSeconds() * 1000 - now.getUTCMilliseconds();
    } else if (interval === '2h') {
      const h = now.getUTCHours(); const nextH = Math.ceil((h + 1) / 2) * 2;
      closeMs = nowMs + (nextH - h) * 3600000 - now.getUTCMinutes() * 60000 - now.getUTCSeconds() * 1000 - now.getUTCMilliseconds();
    } else if (interval === '4h') {
      const h = now.getUTCHours(); const nextH = Math.ceil((h + 1) / 4) * 4;
      closeMs = nowMs + (nextH - h) * 3600000 - now.getUTCMinutes() * 60000 - now.getUTCSeconds() * 1000 - now.getUTCMilliseconds();
    } else if (interval === '1d') {
      const todayMidnight = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())).getTime();
      const closeToday = todayMidnight + 21 * 3600000; // 4pm ET ≈ 21:00 UTC
      if (nowMs < closeToday) closeMs = closeToday; else { el.style.display = 'none'; return; }
    }
    if (!closeMs) { el.style.display = 'none'; return; }
    const diff = closeMs - nowMs; if (diff <= 0) { el.style.display = 'none'; return; }
    const totalSec = Math.floor(diff / 1000);
    const h = Math.floor(totalSec / 3600), m = Math.floor((totalSec % 3600) / 60), s = totalSec % 60;
    const timeStr = h > 0 ? `${h}h ${m.toString().padStart(2,'0')}m` : `${m}:${s.toString().padStart(2,'0')}`;
    const isUrgent = totalSec <= 120;
    el.textContent = `⏱ ${timeStr}`;
    el.className = `chart-candle-cdown${isUrgent ? ' cdown-urgent' : ''}`;
    el.style.display = '';
  }
  update();
  window._candleCountdownInterval = setInterval(update, 1000);
}

// ── Yahoo Finance Chart API ───────────────────
const _chartFetchInFlight = {};  // v2.92: dedup in-flight requests
async function fetchChartData(symbol, range, interval) {
  const key = `${symbol}|${range}|${interval}`;
  if (chartDataCache[key]) return chartDataCache[key];

  // v2.92: If a fetch for this exact key is already in-flight, piggyback on it
  if (_chartFetchInFlight[key]) return _chartFetchInFlight[key];

  const _doFetch = async () => {
  for (const host of ['query1', 'query2']) {
    const url = `https://${host}.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?interval=${interval}&range=${range}`;
    try {
      const result = await window.electronAPI.fetchJson(url);
      if (!result.ok) continue;
      const json = JSON.parse(result.text);
      const res  = json?.chart?.result?.[0];
      if (!res) continue;

      const stamps = res.timestamp || [];
      const q      = res.indicators.quote[0];
      const parsed = stamps.map((t, i) => ({
        time:   t * 1000,
        open:   q.open?.[i]   ?? null,
        high:   q.high?.[i]   ?? null,
        low:    q.low?.[i]    ?? null,
        close:  q.close?.[i]  ?? null,
        volume: q.volume?.[i] ?? 0,
      })).filter(d => d.close !== null && !isNaN(d.close));

      if (parsed.length > 0) {
        chartDataCache[key] = parsed;
        // LRU eviction: keep cache under 200 entries (v2.92: 35+ syms × 5 TFs = 175 combos)
        const cacheKeys = Object.keys(chartDataCache);
        if (cacheKeys.length > 200) delete chartDataCache[cacheKeys[0]];
        return parsed;
      }
    } catch (err) { console.warn('[Chart]', symbol, host, err.message); }
  }
  return null;
  };  // end _doFetch

  // v2.92: store promise so concurrent callers share the same fetch
  _chartFetchInFlight[key] = _doFetch().finally(() => { delete _chartFetchInFlight[key]; });
  return _chartFetchInFlight[key];
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


// ── RSI + Volume sub-panels ───────────────────

// Wilder's RSI (period = 14)
function calcRSI(closes, period = 14) {
  if (closes.length < period + 1) return closes.map(() => null);
  const chg = closes.map((c, i) => i === 0 ? 0 : c - closes[i - 1]);
  let avgG = 0, avgL = 0;
  for (let i = 1; i <= period; i++) {
    if (chg[i] > 0) avgG += chg[i]; else avgL += Math.abs(chg[i]);
  }
  avgG /= period; avgL /= period;
  const rsi = new Array(closes.length).fill(null);
  rsi[period] = 100 - 100 / (1 + avgG / (avgL || 1e-10));
  for (let i = period + 1; i < closes.length; i++) {
    const g = Math.max(0, chg[i]), l = Math.max(0, -chg[i]);
    avgG = (avgG * (period - 1) + g) / period;
    avgL = (avgL * (period - 1) + l) / period;
    rsi[i] = 100 - 100 / (1 + avgG / (avgL || 1e-10));
  }
  return rsi;
}

function drawRSIPanel(canvas, data) {
  if (!canvas || !data || data.length < 15) return;
  const dpr = window.devicePixelRatio || 1;
  canvas.width  = canvas.offsetWidth  * dpr;
  canvas.height = canvas.offsetHeight * dpr;
  const W = canvas.width, H = canvas.height;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, W, H);
  const cc = getChartColors();

  const closes = data.map(d => d.close);
  const rsi    = calcRSI(closes);
  const pL = 32 * dpr, pR = 6 * dpr, pT = 4 * dpr, pB = 4 * dpr;
  const cW = W - pL - pR, cH = H - pT - pB;
  const toX = i  => pL + (i / (data.length - 1)) * cW;
  const toY = v  => pT + (1 - v / 100) * cH;

  // Shading zones
  ctx.fillStyle = 'rgba(239,68,68,0.07)';
  ctx.fillRect(pL, pT, cW, toY(70) - pT);
  ctx.fillStyle = 'rgba(34,197,94,0.07)';
  ctx.fillRect(pL, toY(30), cW, H - pB - toY(30));

  // Grid lines at 30, 50, 70
  ctx.lineWidth = dpr;
  ctx.setLineDash([3 * dpr, 4 * dpr]);
  [30, 50, 70].forEach(lvl => {
    const y = toY(lvl);
    ctx.strokeStyle = lvl === 50 ? cc.grid : (lvl === 70 ? 'rgba(239,68,68,0.25)' : 'rgba(34,197,94,0.25)');
    ctx.beginPath(); ctx.moveTo(pL, y); ctx.lineTo(W - pR, y); ctx.stroke();
    ctx.fillStyle = cc.label;
    ctx.font = `${8.5 * dpr}px Inter,sans-serif`;
    ctx.textAlign = 'right';
    ctx.fillText(lvl, pL - 4 * dpr, y + 3 * dpr);
  });
  ctx.setLineDash([]);

  // RSI line
  ctx.beginPath();
  ctx.lineWidth = 1.5 * dpr;
  let started = false;
  for (let i = 0; i < rsi.length; i++) {
    if (rsi[i] == null) continue;
    const x = toX(i), y = toY(rsi[i]);
    if (!started) { ctx.moveTo(x, y); started = true; } else { ctx.lineTo(x, y); }
  }
  ctx.strokeStyle = '#818cf8';
  ctx.stroke();

  // ── RSI Divergence Detection ──────────────────────────────────────────────
  try {
    const LOOKBACK = Math.min(data.length, 60);
    const startIdx = data.length - LOOKBACK;
    const WIN = 3; // bars on each side to qualify as pivot
    const pivotLows = [], pivotHighs = [];
    for (let i = startIdx + WIN; i < data.length - WIN; i++) {
      if (rsi[i] == null) continue;
      const pLow  = data[i].low  || data[i].close;
      const pHigh = data[i].high || data[i].close;
      let isPivotLow = true, isPivotHigh = true;
      for (let j = i - WIN; j <= i + WIN; j++) {
        if (j === i) continue;
        if ((data[j].low  || data[j].close) <= pLow)  isPivotLow  = false;
        if ((data[j].high || data[j].close) >= pHigh) isPivotHigh = false;
      }
      if (isPivotLow)  pivotLows.push ({ idx: i, price: pLow,  rsiVal: rsi[i] });
      if (isPivotHigh) pivotHighs.push({ idx: i, price: pHigh, rsiVal: rsi[i] });
    }
    // Bullish divergence: price lower low, RSI higher low
    if (pivotLows.length >= 2) {
      const a = pivotLows[pivotLows.length - 2];
      const b = pivotLows[pivotLows.length - 1];
      if (b.price < a.price && b.rsiVal > a.rsiVal + 1) {
        ctx.save();
        ctx.strokeStyle = '#22c55e'; ctx.lineWidth = 1.5 * dpr;
        ctx.setLineDash([2 * dpr, 2 * dpr]);
        ctx.beginPath();
        ctx.moveTo(toX(a.idx), toY(a.rsiVal));
        ctx.lineTo(toX(b.idx), toY(b.rsiVal));
        ctx.stroke(); ctx.setLineDash([]);
        // Up triangle at b
        const bx = toX(b.idx), by = toY(b.rsiVal) + 6 * dpr;
        ctx.fillStyle = '#22c55e';
        ctx.beginPath();
        ctx.moveTo(bx - 3 * dpr, by + 5 * dpr);
        ctx.lineTo(bx + 3 * dpr, by + 5 * dpr);
        ctx.lineTo(bx, by);
        ctx.closePath(); ctx.fill();
        ctx.restore();
      }
    }
    // Bearish divergence: price higher high, RSI lower high
    if (pivotHighs.length >= 2) {
      const a = pivotHighs[pivotHighs.length - 2];
      const b = pivotHighs[pivotHighs.length - 1];
      if (b.price > a.price && b.rsiVal < a.rsiVal - 1) {
        ctx.save();
        ctx.strokeStyle = '#ef4444'; ctx.lineWidth = 1.5 * dpr;
        ctx.setLineDash([2 * dpr, 2 * dpr]);
        ctx.beginPath();
        ctx.moveTo(toX(a.idx), toY(a.rsiVal));
        ctx.lineTo(toX(b.idx), toY(b.rsiVal));
        ctx.stroke(); ctx.setLineDash([]);
        // Down triangle at b
        const bx = toX(b.idx), by = toY(b.rsiVal) - 6 * dpr;
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.moveTo(bx - 3 * dpr, by - 5 * dpr);
        ctx.lineTo(bx + 3 * dpr, by - 5 * dpr);
        ctx.lineTo(bx, by);
        ctx.closePath(); ctx.fill();
        ctx.restore();
      }
    }
  } catch (_) {}

  // Panel label + current value
  const last = rsi.slice().reverse().find(v => v != null);
  const valColor = last >= 70 ? '#ef4444' : last <= 30 ? '#22c55e' : '#818cf8';
  ctx.font = `bold ${8.5 * dpr}px Inter,sans-serif`;
  ctx.textAlign = 'left';
  ctx.fillStyle = cc.label;
  ctx.fillText('RSI 14', 2 * dpr, pT + 9 * dpr);
  if (last != null) {
    ctx.fillStyle = valColor;
    ctx.textAlign = 'right';
    ctx.fillText(last.toFixed(1), W - pR, pT + 9 * dpr);
  }
}

function drawVolumePanel(canvas, data) {
  if (!canvas || !data || data.length < 2) return;
  const dpr = window.devicePixelRatio || 1;
  canvas.width  = canvas.offsetWidth  * dpr;
  canvas.height = canvas.offsetHeight * dpr;
  const W = canvas.width, H = canvas.height;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, W, H);
  const cc = getChartColors();

  const vols   = data.map(d => d.volume || 0);
  const maxVol = Math.max(...vols, 1);
  const avgVol = vols.reduce((a, b) => a + b, 0) / vols.length;
  const pL = 32 * dpr, pR = 6 * dpr, pT = 4 * dpr, pB = 4 * dpr;
  const cW = W - pL - pR, cH = H - pT - pB;
  const barW  = Math.max(1, cW / data.length - 0.5);

  // Avg line
  const avgY = pT + cH - (avgVol / maxVol) * cH;
  ctx.strokeStyle = cc.crosshair;
  ctx.lineWidth   = dpr;
  ctx.setLineDash([3 * dpr, 4 * dpr]);
  ctx.beginPath(); ctx.moveTo(pL, avgY); ctx.lineTo(W - pR, avgY); ctx.stroke();
  ctx.setLineDash([]);

  // Volume bars — heatmap: intensity alpha proportional to relative volume (v2.40)
  for (let i = 0; i < data.length; i++) {
    const vol    = data[i].volume || 0;
    const isUp   = (data[i].close ?? 0) >= (data[i].open ?? data[i].close ?? 0);
    const barH   = (vol / maxVol) * cH;
    const x      = pL + (i / data.length) * cW;
    const relVol = avgVol > 0 ? vol / avgVol : 1;
    const vAlpha = Math.min(0.88, 0.20 + relVol * 0.30);
    ctx.fillStyle = isUp
      ? `rgba(34,197,94,${vAlpha.toFixed(2)})`
      : `rgba(239,68,68,${vAlpha.toFixed(2)})`;
    ctx.fillRect(x, pT + cH - barH, Math.max(1, barW), barH);
  }

  // ── Volume Waveform — smooth bezier wave over bars (v2.51) ────────────────
  {
    const pts = data.map((d, i) => {
      const vol  = d.volume || 0;
      const barH = (vol / maxVol) * cH;
      const cx   = pL + (i + 0.5) / data.length * cW;
      return { x: cx, y: pT + cH - barH };
    });

    // Determine dominant direction for wave color
    const upVol   = data.reduce((s, d) => s + ((d.close >= (d.open ?? d.close)) ? (d.volume || 0) : 0), 0);
    const dnVol   = data.reduce((s, d) => s + ((d.close  < (d.open ?? d.close)) ? (d.volume || 0) : 0), 0);
    const waveRgb = upVol >= dnVol ? '52,211,153' : '248,113,113';   // emerald / red-400

    // Gradient fill below wave
    const waveGrad = ctx.createLinearGradient(0, pT, 0, pT + cH);
    waveGrad.addColorStop(0,   `rgba(${waveRgb},0.22)`);
    waveGrad.addColorStop(1,   `rgba(${waveRgb},0.00)`);

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    for (let i = 1; i < pts.length - 1; i++) {
      const mx = (pts[i].x + pts[i + 1].x) / 2;
      const my = (pts[i].y + pts[i + 1].y) / 2;
      ctx.quadraticCurveTo(pts[i].x, pts[i].y, mx, my);
    }
    ctx.lineTo(pts[pts.length - 1].x, pts[pts.length - 1].y);
    ctx.lineTo(W - pR, pT + cH);
    ctx.lineTo(pL, pT + cH);
    ctx.closePath();
    ctx.fillStyle = waveGrad;
    ctx.fill();

    // Glowing wave stroke
    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    for (let i = 1; i < pts.length - 1; i++) {
      const mx = (pts[i].x + pts[i + 1].x) / 2;
      const my = (pts[i].y + pts[i + 1].y) / 2;
      ctx.quadraticCurveTo(pts[i].x, pts[i].y, mx, my);
    }
    ctx.lineTo(pts[pts.length - 1].x, pts[pts.length - 1].y);
    ctx.shadowColor = `rgba(${waveRgb},0.7)`;
    ctx.shadowBlur  = 6 * dpr;
    ctx.strokeStyle = `rgba(${waveRgb},0.75)`;
    ctx.lineWidth   = 1.5 * dpr;
    ctx.stroke();
    ctx.shadowBlur  = 0;
    ctx.restore();
  }

  // Panel label
  ctx.font = `bold ${8.5 * dpr}px Inter,sans-serif`;
  ctx.textAlign = 'left';
  ctx.fillStyle = cc.label;
  ctx.fillText('Volume', 2 * dpr, pT + 9 * dpr);
}

// ── ADX Calculation (Wilder smoothing) ────────
function calcADX(data, period = 14) {
  if (!data || data.length < period * 2) return null;
  const n = data.length;
  const tr = [], dmP = [], dmM = [];
  for (let i = 1; i < n; i++) {
    const h = data[i].high  || data[i].close;
    const l = data[i].low   || data[i].close;
    const ph = data[i-1].high  || data[i-1].close;
    const pl = data[i-1].low   || data[i-1].close;
    const pc = data[i-1].close;
    tr.push(Math.max(h - l, Math.abs(h - pc), Math.abs(l - pc)));
    const upMove = h - ph;
    const downMove = pl - l;
    dmP.push(upMove > downMove && upMove > 0 ? upMove : 0);
    dmM.push(downMove > upMove && downMove > 0 ? downMove : 0);
  }
  // Wilder smooth: first value = sum of first `period` values
  const wilderSmooth = (arr) => {
    const out = new Array(arr.length).fill(null);
    let sum = arr.slice(0, period).reduce((a, b) => a + b, 0);
    out[period - 1] = sum;
    for (let i = period; i < arr.length; i++) {
      sum = sum - sum / period + arr[i];
      out[i] = sum;
    }
    return out;
  };
  const smoothTR = wilderSmooth(tr);
  const smoothDMP = wilderSmooth(dmP);
  const smoothDMM = wilderSmooth(dmM);
  const diP = smoothDMP.map((v, i) => smoothTR[i] ? (v / smoothTR[i]) * 100 : null);
  const diM = smoothDMM.map((v, i) => smoothTR[i] ? (v / smoothTR[i]) * 100 : null);
  const dx = diP.map((p, i) => {
    if (p == null || diM[i] == null) return null;
    const s = p + diM[i]; return s ? Math.abs(p - diM[i]) / s * 100 : null;
  });
  // Wilder smooth DX to get ADX
  const adxArr = new Array(dx.length).fill(null);
  let firstIdx = -1;
  for (let i = period - 1; i < dx.length; i++) {
    if (dx[i] != null) { firstIdx = i; break; }
  }
  if (firstIdx < 0) return null;
  let adxSum = 0, cnt = 0;
  for (let i = firstIdx; i < firstIdx + period && i < dx.length; i++) {
    if (dx[i] != null) { adxSum += dx[i]; cnt++; }
  }
  if (cnt < period) return null;
  adxArr[firstIdx + period - 1] = adxSum / period;
  for (let i = firstIdx + period; i < dx.length; i++) {
    if (dx[i] == null || adxArr[i - 1] == null) continue;
    adxArr[i] = (adxArr[i - 1] * (period - 1) + dx[i]) / period;
  }
  // Return aligned to data (offset by 1 for TR/DM computation)
  const result = new Array(n).fill(null);
  for (let i = 0; i < adxArr.length; i++) {
    result[i + 1] = adxArr[i] != null ? { adx: adxArr[i], diP: diP[i], diM: diM[i] } : null;
  }
  return result;
}

function drawADXPanel(canvas, data) {
  if (!canvas || !data || data.length < 30) return;
  const dpr = window.devicePixelRatio || 1;
  canvas.width  = canvas.offsetWidth  * dpr;
  canvas.height = canvas.offsetHeight * dpr;
  const W = canvas.width, H = canvas.height;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, W, H);
  const cc = getChartColors();
  const adxData = calcADX(data);
  if (!adxData) return;

  const pL = 32 * dpr, pR = 6 * dpr, pT = 4 * dpr, pB = 4 * dpr;
  const cW = W - pL - pR, cH = H - pT - pB;
  const toX = i  => pL + (i / (data.length - 1)) * cW;
  const toY = v  => pT + (1 - Math.min(v, 100) / 100) * cH;

  // Grid lines at 20, 40, 60
  ctx.lineWidth = dpr; ctx.setLineDash([3 * dpr, 4 * dpr]);
  [20, 40, 60].forEach(lvl => {
    const y = toY(lvl);
    ctx.strokeStyle = lvl === 40 ? cc.grid : 'rgba(100,116,139,0.18)';
    ctx.beginPath(); ctx.moveTo(pL, y); ctx.lineTo(W - pR, y); ctx.stroke();
    ctx.fillStyle = cc.label; ctx.font = `${8 * dpr}px Inter,sans-serif`;
    ctx.textAlign = 'right'; ctx.fillText(lvl, pL - 4 * dpr, y + 3 * dpr);
  });
  ctx.setLineDash([]);

  // Draw DI+ (green), DI- (red), ADX (blue)
  const drawLine = (key, color) => {
    ctx.beginPath(); ctx.lineWidth = 1.2 * dpr; ctx.strokeStyle = color;
    let started = false;
    for (let i = 0; i < adxData.length; i++) {
      if (!adxData[i]) continue;
      const v = adxData[i][key];
      if (v == null) continue;
      const x = toX(i), y = toY(v);
      if (!started) { ctx.moveTo(x, y); started = true; } else { ctx.lineTo(x, y); }
    }
    ctx.stroke();
  };
  drawLine('diP',  'rgba(16,185,129,0.55)');
  drawLine('diM',  'rgba(239,68,68,0.55)');
  drawLine('adx',  '#60a5fa');

  // Current values
  const last = adxData.slice().reverse().find(v => v != null);
  if (last) {
    const adxVal = last.adx.toFixed(0);
    const strength = last.adx >= 40 ? 'Strong' : last.adx >= 20 ? 'Moderate' : 'Weak';
    ctx.font = `bold ${8.5 * dpr}px Inter,sans-serif`;
    ctx.textAlign = 'left'; ctx.fillStyle = cc.label;
    ctx.fillText('ADX 14', 2 * dpr, pT + 9 * dpr);
    ctx.textAlign = 'right'; ctx.fillStyle = '#60a5fa';
    ctx.fillText(`${adxVal} · ${strength}`, W - pR, pT + 9 * dpr);
  }
}

// ── Williams %R ───────────────────────────────
function calcWilliamsR(data, period = 14) {
  return data.map((d, i) => {
    if (i < period - 1) return null;
    const slice = data.slice(i - period + 1, i + 1);
    const hi = Math.max(...slice.map(x => x.high  || x.close));
    const lo = Math.min(...slice.map(x => x.low   || x.close));
    return hi !== lo ? ((hi - d.close) / (hi - lo)) * -100 : -50;
  });
}

function drawWilliamsRPanel(canvas, data) {
  if (!canvas || !data || data.length < 16) return;
  const wr = calcWilliamsR(data, 14);
  const dpr = window.devicePixelRatio || 1;
  canvas.width  = canvas.offsetWidth  * dpr;
  canvas.height = canvas.offsetHeight * dpr;
  const W = canvas.width, H = canvas.height;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, W, H);
  const cc = getChartColors();
  const pL = 32 * dpr, pR = 6 * dpr, pT = 4 * dpr, pB = 4 * dpr;
  const cW = W - pL - pR, cH = H - pT - pB;
  // Scale: -100 to 0
  const toX = i => pL + (i / (data.length - 1)) * cW;
  const toY = v => pT + ((v + 100) / 100) * cH;   // maps -100..0 → H..0 (flipped)
  // Zones
  ctx.fillStyle = 'rgba(239,68,68,0.07)';
  ctx.fillRect(pL, pT, cW, toY(-20) - pT);                   // overbought zone top
  ctx.fillStyle = 'rgba(34,197,94,0.07)';
  ctx.fillRect(pL, toY(-80), cW, H - pB - toY(-80));          // oversold zone bottom
  // Grid lines
  ctx.lineWidth = dpr; ctx.setLineDash([3 * dpr, 4 * dpr]);
  [[-20, 'rgba(239,68,68,0.25)'], [-50, cc.grid], [-80, 'rgba(34,197,94,0.25)']].forEach(([lvl, col]) => {
    const y = toY(lvl);
    ctx.strokeStyle = col;
    ctx.beginPath(); ctx.moveTo(pL, y); ctx.lineTo(W - pR, y); ctx.stroke();
    ctx.fillStyle = cc.label; ctx.font = `${8 * dpr}px Inter,sans-serif`;
    ctx.textAlign = 'right'; ctx.fillText(lvl, pL - 4 * dpr, y + 3 * dpr);
  });
  ctx.setLineDash([]);
  // %R line
  ctx.beginPath(); ctx.lineWidth = 1.5 * dpr;
  const lastVal = wr.slice().reverse().find(v => v != null);
  const lineColor = lastVal == null ? '#a78bfa'
    : lastVal > -20 ? '#ef4444' : lastVal < -80 ? '#22c55e' : '#a78bfa';
  ctx.strokeStyle = lineColor;
  let started = false;
  for (let i = 0; i < wr.length; i++) {
    if (wr[i] == null) continue;
    const x = toX(i), y = toY(wr[i]);
    if (!started) { ctx.moveTo(x, y); started = true; } else { ctx.lineTo(x, y); }
  }
  ctx.stroke();
  ctx.font = `bold ${8.5 * dpr}px Inter,sans-serif`;
  ctx.textAlign = 'left'; ctx.fillStyle = cc.label;
  ctx.fillText('W%R 14', 2 * dpr, pT + 9 * dpr);
  if (lastVal != null) {
    ctx.textAlign = 'right'; ctx.fillStyle = lineColor;
    ctx.fillText(lastVal.toFixed(1), W - pR, pT + 9 * dpr);
  }
}

// ── CCI (Commodity Channel Index) ─────────────
function calcCCI(data, period = 20) {
  return data.map((d, i) => {
    if (i < period - 1) return null;
    const slice = data.slice(i - period + 1, i + 1);
    const typicals = slice.map(x => ((x.high || x.close) + (x.low || x.close) + x.close) / 3);
    const avg = typicals.reduce((a, b) => a + b, 0) / period;
    const mad = typicals.reduce((s, t) => s + Math.abs(t - avg), 0) / period;
    if (mad === 0) return 0;
    const tp = (d.high || d.close + d.low || d.close + d.close) / 3;
    return (typicals[typicals.length - 1] - avg) / (0.015 * mad);
  });
}

function drawCCIPanel(canvas, data) {
  if (!canvas || !data || data.length < 22) return;
  const cci = calcCCI(data, 20);
  const dpr = window.devicePixelRatio || 1;
  canvas.width  = canvas.offsetWidth  * dpr;
  canvas.height = canvas.offsetHeight * dpr;
  const W = canvas.width, H = canvas.height;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, W, H);
  const cc = getChartColors();
  const pL = 32 * dpr, pR = 6 * dpr, pT = 4 * dpr, pB = 4 * dpr;
  const cW = W - pL - pR, cH = H - pT - pB;
  const vals = cci.filter(v => v != null);
  if (vals.length < 2) return;
  const mn = Math.min(...vals, -100), mx = Math.max(...vals, 100);
  const rng = mx - mn || 1;
  const toX = i => pL + (i / (data.length - 1)) * cW;
  const toY = v => pT + (1 - (v - mn) / rng) * cH;
  // Zones ±100
  ctx.fillStyle = 'rgba(239,68,68,0.07)';
  ctx.fillRect(pL, pT, cW, toY(100) - pT);
  ctx.fillStyle = 'rgba(34,197,94,0.07)';
  ctx.fillRect(pL, toY(-100), cW, H - pB - toY(-100));
  // Grid lines
  ctx.lineWidth = dpr; ctx.setLineDash([3 * dpr, 4 * dpr]);
  [[100, 'rgba(239,68,68,0.25)'], [0, cc.grid], [-100, 'rgba(34,197,94,0.25)']].forEach(([lvl, col]) => {
    const y = toY(lvl);
    ctx.strokeStyle = col;
    ctx.beginPath(); ctx.moveTo(pL, y); ctx.lineTo(W - pR, y); ctx.stroke();
    ctx.fillStyle = cc.label; ctx.font = `${8 * dpr}px Inter,sans-serif`;
    ctx.textAlign = 'right'; ctx.fillText(lvl, pL - 4 * dpr, y + 3 * dpr);
  });
  ctx.setLineDash([]);
  // CCI line
  ctx.beginPath(); ctx.lineWidth = 1.5 * dpr;
  const lastCCI = cci.slice().reverse().find(v => v != null);
  ctx.strokeStyle = lastCCI == null ? '#22d3ee'
    : lastCCI > 100 ? '#ef4444' : lastCCI < -100 ? '#22c55e' : '#22d3ee';
  let started = false;
  for (let i = 0; i < cci.length; i++) {
    if (cci[i] == null) continue;
    const x = toX(i), y = toY(cci[i]);
    if (!started) { ctx.moveTo(x, y); started = true; } else { ctx.lineTo(x, y); }
  }
  ctx.stroke();
  ctx.font = `bold ${8.5 * dpr}px Inter,sans-serif`;
  ctx.textAlign = 'left'; ctx.fillStyle = cc.label;
  ctx.fillText('CCI 20', 2 * dpr, pT + 9 * dpr);
  if (lastCCI != null) {
    ctx.textAlign = 'right';
    ctx.fillStyle = lastCCI > 100 ? '#ef4444' : lastCCI < -100 ? '#22c55e' : '#22d3ee';
    ctx.fillText(lastCCI.toFixed(1), W - pR, pT + 9 * dpr);
  }
}

// ── Heikin-Ashi Transformation ────────────────
function calcHeikinAshi(data) {
  const ha = [];
  for (let i = 0; i < data.length; i++) {
    const d = data[i];
    const haClose = (d.open + d.high + d.low + d.close) / 4;
    const haOpen  = i === 0
      ? (d.open + d.close) / 2
      : (ha[i - 1].open + ha[i - 1].close) / 2;
    const haHigh  = Math.max(d.high, haOpen, haClose);
    const haLow   = Math.min(d.low,  haOpen, haClose);
    ha.push({ ...d, open: haOpen, high: haHigh, low: haLow, close: haClose });
  }
  return ha;
}

// ── TRIX Oscillator ───────────────────────────
function calcTRIX(closes, period = 14) {
  const ema1 = calcEMA(closes, period);
  const ema2 = calcEMA(ema1, period);
  const ema3 = calcEMA(ema2, period);
  return ema3.map((v, i) => {
    if (v == null || i === 0 || ema3[i - 1] == null || ema3[i - 1] === 0) return null;
    return ((v - ema3[i - 1]) / ema3[i - 1]) * 100;
  });
}

function drawTRIXPanel(canvas, data) {
  if (!canvas || !data || data.length < 45) return;
  const dpr = window.devicePixelRatio || 1;
  const W = canvas.width, H = canvas.height;
  const cc = getChartColors();
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.clearRect(0, 0, W, H);
  const pT = 10 * dpr, pB = 10 * dpr, pL = 5 * dpr, pR = 40 * dpr;
  const cH = H - pT - pB;
  const closes = data.map(d => d.close);
  const trix = calcTRIX(closes, 14);
  const vals = trix.filter(v => v != null);
  if (vals.length < 2) return;
  const maxV = Math.max(...vals.map(Math.abs)) * 1.2 || 0.01;
  const toX = i => pL + (i / (data.length - 1)) * (W - pL - pR);
  const toY = v => pT + cH - ((v + maxV) / (2 * maxV)) * cH;
  const y0 = toY(0);
  // Zero line
  ctx.beginPath(); ctx.strokeStyle = cc.grid; ctx.lineWidth = 1 * dpr;
  ctx.moveTo(pL, y0); ctx.lineTo(W - pR, y0); ctx.stroke();
  // TRIX line colored by value
  let started = false;
  for (let i = 0; i < data.length; i++) {
    if (trix[i] == null) continue;
    const x = toX(i), y = toY(trix[i]);
    if (!started) { ctx.beginPath(); ctx.moveTo(x, y); started = true; }
    else ctx.lineTo(x, y);
    // Color-coded segments
    if (i > 0 && trix[i - 1] != null && trix[i] !== trix[i - 1]) {
      ctx.strokeStyle = trix[i] >= 0 ? '#22c55e' : '#ef4444';
      ctx.lineWidth = 1.5 * dpr; ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x, y); started = true;
    }
  }
  if (started) { ctx.strokeStyle = trix[data.length - 1] >= 0 ? '#22c55e' : '#ef4444'; ctx.lineWidth = 1.5 * dpr; ctx.stroke(); }
  // Label
  ctx.font = `bold ${8.5 * dpr}px Inter,sans-serif`;
  ctx.textAlign = 'left'; ctx.fillStyle = cc.label;
  ctx.fillText('TRIX 14', 2 * dpr, pT + 9 * dpr);
  const lastT = trix.slice().reverse().find(v => v != null);
  if (lastT != null) {
    ctx.textAlign = 'right';
    ctx.fillStyle = lastT >= 0 ? '#22c55e' : '#ef4444';
    ctx.fillText(lastT.toFixed(4), W - pR, pT + 9 * dpr);
  }
}

// ── Rate of Change (ROC) ─────────────────────
function calcROC(closes, period = 14) {
  return closes.map((c, i) => {
    if (i < period || !closes[i - period]) return null;
    return ((c - closes[i - period]) / closes[i - period]) * 100;
  });
}

function drawROCPanel(canvas, data) {
  if (!canvas || !data || data.length < 16) return;
  const closes = data.map(d => d.close);
  const roc = calcROC(closes, 14);
  if (!roc) return;
  const dpr = window.devicePixelRatio || 1;
  canvas.width  = canvas.offsetWidth  * dpr;
  canvas.height = canvas.offsetHeight * dpr;
  const W = canvas.width, H = canvas.height;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, W, H);
  const cc = getChartColors();
  const pL = 32 * dpr, pR = 6 * dpr, pT = 4 * dpr, pB = 4 * dpr;
  const cW = W - pL - pR, cH = H - pT - pB;
  const vals = roc.filter(v => v != null);
  if (vals.length < 2) return;
  const mn = Math.min(...vals, 0), mx = Math.max(...vals, 0);
  const rng = mx - mn || 1;
  const toX = i => pL + (i / (data.length - 1)) * cW;
  const toY = v => pT + (1 - (v - mn) / rng) * cH;
  // Zero line
  const zy = toY(0);
  ctx.strokeStyle = cc.grid; ctx.lineWidth = dpr; ctx.setLineDash([3 * dpr, 4 * dpr]);
  ctx.beginPath(); ctx.moveTo(pL, zy); ctx.lineTo(W - pR, zy); ctx.stroke();
  ctx.setLineDash([]);
  // ROC bars (colored by sign)
  const barW = Math.max(1, cW / data.length - 0.5);
  for (let i = 0; i < roc.length; i++) {
    if (roc[i] == null) continue;
    const x = toX(i);
    const y0 = zy, y1 = toY(roc[i]);
    ctx.fillStyle = roc[i] >= 0 ? 'rgba(16,185,129,0.60)' : 'rgba(239,68,68,0.60)';
    ctx.fillRect(x - barW / 2, Math.min(y0, y1), barW, Math.abs(y1 - y0) || 1);
  }
  // Labels
  const lastROC = roc.slice().reverse().find(v => v != null);
  ctx.font = `bold ${8.5 * dpr}px Inter,sans-serif`;
  ctx.textAlign = 'left'; ctx.fillStyle = cc.label;
  ctx.fillText('ROC 14', 2 * dpr, pT + 9 * dpr);
  if (lastROC != null) {
    ctx.textAlign = 'right';
    ctx.fillStyle = lastROC >= 0 ? '#10b981' : '#ef4444';
    ctx.fillText(`${lastROC >= 0 ? '+' : ''}${lastROC.toFixed(2)}%`, W - pR, pT + 9 * dpr);
  }
}

// ── OBV (On-Balance Volume) ───────────────────
function calcOBV(data) {
  if (!data || data.length < 2) return null;
  const obv = [0];
  for (let i = 1; i < data.length; i++) {
    const vol = data[i].volume || 0;
    if (data[i].close > data[i-1].close)      obv.push(obv[i-1] + vol);
    else if (data[i].close < data[i-1].close) obv.push(obv[i-1] - vol);
    else                                       obv.push(obv[i-1]);
  }
  return obv;
}

function drawOBVPanel(canvas, data) {
  if (!canvas || !data || data.length < 3) return;
  const obv = calcOBV(data);
  if (!obv) return;
  const dpr = window.devicePixelRatio || 1;
  canvas.width  = canvas.offsetWidth  * dpr;
  canvas.height = canvas.offsetHeight * dpr;
  const W = canvas.width, H = canvas.height;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, W, H);
  const cc = getChartColors();
  const pL = 32 * dpr, pR = 6 * dpr, pT = 4 * dpr, pB = 4 * dpr;
  const cW = W - pL - pR, cH = H - pT - pB;
  const min = Math.min(...obv), max = Math.max(...obv);
  const rng = max - min || 1;
  const toX = i => pL + (i / (obv.length - 1)) * cW;
  const toY = v => pT + cH - ((v - min) / rng) * cH;
  // Zero line
  const zy = toY(0);
  if (zy >= pT && zy <= pT + cH) {
    ctx.strokeStyle = cc.grid; ctx.lineWidth = dpr; ctx.setLineDash([3 * dpr, 4 * dpr]);
    ctx.beginPath(); ctx.moveTo(pL, zy); ctx.lineTo(W - pR, zy); ctx.stroke();
    ctx.setLineDash([]);
  }
  // OBV line
  const isUp = obv[obv.length - 1] >= obv[0];
  const lineColor = isUp ? 'rgba(16,185,129,0.8)' : 'rgba(239,68,68,0.8)';
  ctx.beginPath(); ctx.lineWidth = 1.5 * dpr; ctx.strokeStyle = lineColor;
  obv.forEach((v, i) => { i === 0 ? ctx.moveTo(toX(i), toY(v)) : ctx.lineTo(toX(i), toY(v)); });
  ctx.stroke();
  ctx.font = `bold ${8.5 * dpr}px Inter,sans-serif`;
  ctx.textAlign = 'left'; ctx.fillStyle = cc.label;
  ctx.fillText('OBV', 2 * dpr, pT + 9 * dpr);
  ctx.textAlign = 'right'; ctx.fillStyle = lineColor;
  const lastObv = obv[obv.length - 1];
  const obvFmt = Math.abs(lastObv) >= 1_000_000 ? `${(lastObv/1_000_000).toFixed(1)}M`
    : Math.abs(lastObv) >= 1_000 ? `${(lastObv/1_000).toFixed(0)}K` : lastObv.toFixed(0);
  ctx.fillText(obvFmt, W - pR, pT + 9 * dpr);
}

// ── Stochastic Oscillator ─────────────────────
function calcStochastic(data, k = 14, d = 3) {
  if (!data || data.length < k) return null;
  const kArr = new Array(data.length).fill(null);
  for (let i = k - 1; i < data.length; i++) {
    const slice = data.slice(i - k + 1, i + 1);
    const lo = Math.min(...slice.map(x => x.low  || x.close));
    const hi = Math.max(...slice.map(x => x.high || x.close));
    kArr[i] = hi !== lo ? ((data[i].close - lo) / (hi - lo)) * 100 : 50;
  }
  // %D = SMA of %K over d periods
  const dArr = new Array(data.length).fill(null);
  for (let i = k - 1 + d - 1; i < data.length; i++) {
    const s = kArr.slice(i - d + 1, i + 1).filter(v => v != null);
    if (s.length === d) dArr[i] = s.reduce((a, b) => a + b, 0) / d;
  }
  return { k: kArr, d: dArr };
}

function drawStochasticPanel(canvas, data) {
  if (!canvas || !data || data.length < 17) return;
  const st = calcStochastic(data, 14, 3);
  if (!st) return;
  const dpr = window.devicePixelRatio || 1;
  canvas.width  = canvas.offsetWidth  * dpr;
  canvas.height = canvas.offsetHeight * dpr;
  const W = canvas.width, H = canvas.height;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, W, H);
  const cc = getChartColors();
  const pL = 32 * dpr, pR = 6 * dpr, pT = 4 * dpr, pB = 4 * dpr;
  const cW = W - pL - pR, cH = H - pT - pB;
  const toX = i => pL + (i / (data.length - 1)) * cW;
  const toY = v => pT + (1 - v / 100) * cH;
  // Shading zones
  ctx.fillStyle = 'rgba(239,68,68,0.07)'; ctx.fillRect(pL, pT, cW, toY(80) - pT);
  ctx.fillStyle = 'rgba(34,197,94,0.07)';  ctx.fillRect(pL, toY(20), cW, H - pB - toY(20));
  // Grid lines
  ctx.lineWidth = dpr; ctx.setLineDash([3 * dpr, 4 * dpr]);
  [20, 50, 80].forEach(lvl => {
    const y = toY(lvl);
    ctx.strokeStyle = lvl === 50 ? cc.grid : (lvl === 80 ? 'rgba(239,68,68,0.25)' : 'rgba(34,197,94,0.25)');
    ctx.beginPath(); ctx.moveTo(pL, y); ctx.lineTo(W - pR, y); ctx.stroke();
    ctx.fillStyle = cc.label; ctx.font = `${8 * dpr}px Inter,sans-serif`;
    ctx.textAlign = 'right'; ctx.fillText(lvl, pL - 4 * dpr, y + 3 * dpr);
  });
  ctx.setLineDash([]);
  // Draw %K and %D
  const drawLine = (arr, color) => {
    ctx.beginPath(); ctx.lineWidth = 1.3 * dpr; ctx.strokeStyle = color;
    let started = false;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] == null) continue;
      const x = toX(i), y = toY(arr[i]);
      if (!started) { ctx.moveTo(x, y); started = true; } else { ctx.lineTo(x, y); }
    }
    ctx.stroke();
  };
  drawLine(st.k, '#60a5fa');   // %K blue
  drawLine(st.d, '#f97316');   // %D orange
  // %K/%D Crossover signals
  try {
    for (let i = 1; i < st.k.length; i++) {
      if (st.k[i] == null || st.d[i] == null || st.k[i-1] == null || st.d[i-1] == null) continue;
      const bullX = st.k[i-1] < st.d[i-1] && st.k[i] >= st.d[i];
      const bearX = st.k[i-1] > st.d[i-1] && st.k[i] <= st.d[i];
      if (!bullX && !bearX) continue;
      const bx = toX(i), by = toY((st.k[i] + st.d[i]) / 2);
      ctx.fillStyle = bullX ? 'rgba(34,197,94,0.85)' : 'rgba(239,68,68,0.85)';
      ctx.beginPath();
      if (bullX) {
        ctx.moveTo(bx, by - 5 * dpr); ctx.lineTo(bx - 3 * dpr, by + 1 * dpr); ctx.lineTo(bx + 3 * dpr, by + 1 * dpr);
      } else {
        ctx.moveTo(bx, by + 5 * dpr); ctx.lineTo(bx - 3 * dpr, by - 1 * dpr); ctx.lineTo(bx + 3 * dpr, by - 1 * dpr);
      }
      ctx.closePath(); ctx.fill();
    }
  } catch (_) {}
  // Labels
  const lastK = st.k.slice().reverse().find(v => v != null);
  const lastD = st.d.slice().reverse().find(v => v != null);
  ctx.font = `bold ${8.5 * dpr}px Inter,sans-serif`;
  ctx.textAlign = 'left'; ctx.fillStyle = cc.label;
  ctx.fillText('Stoch 14,3', 2 * dpr, pT + 9 * dpr);
  if (lastK != null) {
    ctx.textAlign = 'right';
    ctx.fillStyle = lastK >= 80 ? '#ef4444' : lastK <= 20 ? '#22c55e' : '#60a5fa';
    ctx.fillText(`K:${lastK.toFixed(0)}  D:${(lastD||0).toFixed(0)}`, W - pR, pT + 9 * dpr);
  }
}

// ── Stochastic RSI ────────────────────────────
function calcStochRSI(data, rsiPeriod = 14, stochPeriod = 14) {
  const closes = data.map(d => d.close);
  const rsi = calcRSI(closes, rsiPeriod);
  const k = rsi.map((r, i) => {
    if (r == null || i < stochPeriod - 1) return null;
    const slice = rsi.slice(i - stochPeriod + 1, i + 1).filter(v => v != null);
    if (slice.length < 2) return null;
    const minR = Math.min(...slice), maxR = Math.max(...slice);
    return maxR !== minR ? ((r - minR) / (maxR - minR)) * 100 : 50;
  });
  const d = k.map((v, i) => {
    if (v == null || i < 2 || k[i-1] == null || k[i-2] == null) return null;
    return (k[i-2] + k[i-1] + v) / 3;
  });
  return { k, d };
}

function drawStochRSIPanel(canvas, data) {
  if (!canvas || !data || data.length < 30) return;
  const dpr = window.devicePixelRatio || 1;
  const W = canvas.width, H = canvas.height;
  const cc = getChartColors();
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.clearRect(0, 0, W, H);
  const pT = 10 * dpr, pB = 10 * dpr, pL = 5 * dpr, pR = 40 * dpr;
  const cH = H - pT - pB;
  const sr = calcStochRSI(data);
  const toX = i => pL + (i / (data.length - 1)) * (W - pL - pR);
  const toY = v => pT + cH - (v / 100) * cH;
  // Overbought/oversold bands
  [80, 20].forEach(lv => {
    ctx.beginPath(); ctx.strokeStyle = cc.grid; ctx.lineWidth = 0.7 * dpr;
    ctx.setLineDash([3 * dpr, 3 * dpr]);
    ctx.moveTo(pL, toY(lv)); ctx.lineTo(W - pR, toY(lv));
    ctx.stroke(); ctx.setLineDash([]);
  });
  const drawLine = (arr, color) => {
    ctx.beginPath(); ctx.strokeStyle = color; ctx.lineWidth = 1.2 * dpr;
    let s = false;
    for (let i = 0; i < data.length; i++) {
      if (arr[i] == null) continue;
      const x = toX(i), y = toY(arr[i]);
      if (!s) { ctx.moveTo(x, y); s = true; } else ctx.lineTo(x, y);
    }
    ctx.stroke();
  };
  drawLine(sr.k, '#60a5fa');   // %K blue
  drawLine(sr.d, '#f97316');   // %D orange
  const lastK = sr.k.slice().reverse().find(v => v != null);
  const lastD = sr.d.slice().reverse().find(v => v != null);
  ctx.font = `bold ${8.5 * dpr}px Inter,sans-serif`;
  ctx.textAlign = 'left'; ctx.fillStyle = cc.label;
  ctx.fillText('StochRSI', 2 * dpr, pT + 9 * dpr);
  if (lastK != null) {
    ctx.textAlign = 'right';
    ctx.fillStyle = lastK >= 80 ? '#ef4444' : lastK <= 20 ? '#22c55e' : '#60a5fa';
    ctx.fillText(`K:${lastK.toFixed(0)}  D:${(lastD||0).toFixed(0)}`, W - pR, pT + 9 * dpr);
  }
}

// ── Linear Regression ─────────────────────────
function calcLinReg(closes) {
  const n = closes.length;
  let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;
  for (let i = 0; i < n; i++) {
    sumX += i; sumY += closes[i]; sumXY += i * closes[i]; sumX2 += i * i;
  }
  const denom = n * sumX2 - sumX * sumX;
  if (denom === 0) return null;
  const slope = (n * sumXY - sumX * sumY) / denom;
  const intercept = (sumY - slope * sumX) / n;
  let sumSqErr = 0;
  for (let i = 0; i < n; i++) {
    const residual = closes[i] - (slope * i + intercept);
    sumSqErr += residual * residual;
  }
  const stdDev = Math.sqrt(sumSqErr / n);
  return { slope, intercept, stdDev };
}

// ── Chart Pattern Detection ────────────────────
function detectChartPatterns(data) {
  if (!data || data.length < 30) return [];
  const patterns = [];
  const highs = data.map(d => d.high || d.close);
  const lows  = data.map(d => d.low  || d.close);
  const LOOKBACK = Math.min(data.length, 80);
  const hS = highs.slice(-LOOKBACK), lS = lows.slice(-LOOKBACK);
  const WIN = 4;
  const peaks = [], troughs = [];
  for (let i = WIN; i < hS.length - WIN; i++) {
    let isPeak = true, isTrough = true;
    for (let j = i - WIN; j <= i + WIN; j++) {
      if (j === i) continue;
      if (hS[j] >= hS[i]) isPeak   = false;
      if (lS[j] <= lS[i]) isTrough = false;
    }
    if (isPeak)   peaks.push({ idx: i, val: hS[i] });
    if (isTrough) troughs.push({ idx: i, val: lS[i] });
  }
  // Double Top: 2 peaks of similar height (within 2%), separated ≥5 bars
  if (peaks.length >= 2) {
    const p1 = peaks[peaks.length - 2], p2 = peaks[peaks.length - 1];
    if (Math.abs(p1.val - p2.val) / p1.val < 0.02 && p2.idx - p1.idx >= 5)
      patterns.push({ type: 'Double Top', signal: 'bearish' });
  }
  // Double Bottom: 2 troughs of similar depth (within 2%), separated ≥5 bars
  if (troughs.length >= 2) {
    const t1 = troughs[troughs.length - 2], t2 = troughs[troughs.length - 1];
    if (Math.abs(t1.val - t2.val) / t1.val < 0.02 && t2.idx - t1.idx >= 5)
      patterns.push({ type: 'Double Bottom', signal: 'bullish' });
  }
  // Head & Shoulders: 3 peaks, middle (head) highest, two shoulders similar height
  if (peaks.length >= 3) {
    const ls = peaks[peaks.length - 3], hd = peaks[peaks.length - 2], rs = peaks[peaks.length - 1];
    if (hd.val > ls.val && hd.val > rs.val && Math.abs(ls.val - rs.val) / ls.val < 0.04)
      patterns.push({ type: 'H&S Top', signal: 'bearish' });
  }
  // Inverse Head & Shoulders: 3 troughs, middle (head) lowest, two shoulders similar
  if (troughs.length >= 3) {
    const ls = troughs[troughs.length - 3], hd = troughs[troughs.length - 2], rs = troughs[troughs.length - 1];
    if (hd.val < ls.val && hd.val < rs.val && Math.abs(ls.val - rs.val) / ls.val < 0.04)
      patterns.push({ type: 'Inv H&S', signal: 'bullish' });
  }
  return patterns;
}

// ── Chaikin Money Flow (CMF) ──────────────────
function calcCMF(data, period = 20) {
  return data.map((d, i) => {
    if (i < period - 1) return null;
    const slice = data.slice(i - period + 1, i + 1);
    let mfvSum = 0, volSum = 0;
    for (const bar of slice) {
      const hi  = bar.high || bar.close;
      const lo  = bar.low  || bar.close;
      const vol = bar.volume || 0;
      const clv = (hi !== lo) ? ((bar.close - lo) - (hi - bar.close)) / (hi - lo) : 0;
      mfvSum += clv * vol; volSum += vol;
    }
    return volSum > 0 ? mfvSum / volSum : 0;
  });
}

function drawCMFPanel(canvas, data) {
  if (!canvas || !data || data.length < 22) return;
  const dpr = window.devicePixelRatio || 1;
  const W = canvas.width, H = canvas.height;
  const cc = getChartColors();
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.clearRect(0, 0, W, H);
  const pT = 10 * dpr, pB = 10 * dpr, pL = 5 * dpr, pR = 40 * dpr;
  const cH = H - pT - pB;
  const cmf = calcCMF(data, 20);
  const minV = -1, maxV = 1;
  const toX = i => pL + (i / (data.length - 1)) * (W - pL - pR);
  const toY = v => pT + cH - ((v - minV) / (maxV - minV)) * cH;
  const y0 = toY(0);
  // Zero line
  ctx.beginPath(); ctx.strokeStyle = cc.grid; ctx.lineWidth = 1 * dpr;
  ctx.moveTo(pL, y0); ctx.lineTo(W - pR, y0); ctx.stroke();
  // ±0.1 guides
  [0.1, -0.1].forEach(lv => {
    ctx.beginPath(); ctx.strokeStyle = cc.grid; ctx.lineWidth = 0.5 * dpr;
    ctx.setLineDash([3 * dpr, 3 * dpr]);
    ctx.moveTo(pL, toY(lv)); ctx.lineTo(W - pR, toY(lv));
    ctx.stroke(); ctx.setLineDash([]);
  });
  // CMF bars
  const barW = Math.max(1, (W / data.length) * 0.65);
  for (let i = 0; i < data.length; i++) {
    if (cmf[i] == null) continue;
    const x = toX(i), yV = toY(cmf[i]);
    const barTop = Math.min(y0, yV), barH = Math.abs(yV - y0);
    ctx.fillStyle = cmf[i] >= 0 ? 'rgba(16,185,129,0.55)' : 'rgba(239,68,68,0.55)';
    ctx.fillRect(x - barW / 2, barTop, barW, Math.max(1, barH));
  }
  // Label
  ctx.font = `bold ${8.5 * dpr}px Inter,sans-serif`;
  ctx.textAlign = 'left'; ctx.fillStyle = cc.label;
  ctx.fillText('CMF 20', 2 * dpr, pT + 9 * dpr);
  const lastCMF = cmf.slice().reverse().find(v => v != null);
  if (lastCMF != null) {
    ctx.textAlign = 'right';
    ctx.fillStyle = lastCMF > 0.1 ? '#22c55e' : lastCMF < -0.1 ? '#ef4444' : '#22d3ee';
    ctx.fillText(lastCMF.toFixed(3), W - pR, pT + 9 * dpr);
  }
}

// ── Ichimoku Cloud ────────────────────────────
function calcIchimoku(data) {
  if (!data || data.length < 52) return null;
  const midRange = (arr, period, i) => {
    const sl = arr.slice(Math.max(0, i - period + 1), i + 1);
    const h = Math.max(...sl.map(d => d.high || d.close));
    const l = Math.min(...sl.map(d => d.low  || d.close));
    return (h + l) / 2;
  };
  const tenkan = data.map((_, i) => i >= 8  ? midRange(data, 9,  i) : null);
  const kijun  = data.map((_, i) => i >= 25 ? midRange(data, 26, i) : null);
  const spanA  = data.map((_, i) => (tenkan[i] != null && kijun[i] != null)
    ? (tenkan[i] + kijun[i]) / 2 : null);
  const spanB  = data.map((_, i) => i >= 51 ? midRange(data, 52, i) : null);
  const chikou = data.map((d, i) => i < 26 ? null : data[i - 26].close);
  return { tenkan, kijun, spanA, spanB, chikou };
}

// ── Donchian Channels ─────────────────────────
function calcDonchian(data, period = 20) {
  const upper = new Array(data.length).fill(null);
  const lower = new Array(data.length).fill(null);
  const mid   = new Array(data.length).fill(null);
  for (let i = period - 1; i < data.length; i++) {
    const sl = data.slice(i - period + 1, i + 1);
    upper[i] = Math.max(...sl.map(d => d.high  || d.close));
    lower[i] = Math.min(...sl.map(d => d.low   || d.close));
    mid[i]   = (upper[i] + lower[i]) / 2;
  }
  return { upper, mid, lower };
}

// ── Parabolic SAR Calculation ─────────────────
function calcParabolicSAR(data, step = 0.02, maxStep = 0.2) {
  if (!data || data.length < 3) return null;
  const result = new Array(data.length).fill(null);
  let isUp = data[1].close > data[0].close;
  let sar = isUp
    ? Math.min(data[0].low  || data[0].close, data[1].low  || data[1].close)
    : Math.max(data[0].high || data[0].close, data[1].high || data[1].close);
  let ep = isUp
    ? Math.max(data[0].high || data[0].close, data[1].high || data[1].close)
    : Math.min(data[0].low  || data[0].close, data[1].low  || data[1].close);
  let af = step;
  for (let i = 2; i < data.length; i++) {
    const h  = data[i].high || data[i].close;
    const l  = data[i].low  || data[i].close;
    sar = sar + af * (ep - sar);
    if (isUp) {
      sar = Math.min(sar, data[i-1].low || data[i-1].close, data[i-2].low || data[i-2].close);
      if (l < sar) { isUp = false; sar = ep; ep = l; af = step; }
      else { if (h > ep) { ep = h; af = Math.min(af + step, maxStep); } }
    } else {
      sar = Math.max(sar, data[i-1].high || data[i-1].close, data[i-2].high || data[i-2].close);
      if (h > sar) { isUp = true; sar = ep; ep = h; af = step; }
      else { if (l < ep) { ep = l; af = Math.min(af + step, maxStep); } }
    }
    result[i] = { sar, isUp };
  }
  return result;
}

// ── Supertrend Calculation ────────────────────
function calcSupertrend(data, period = 10, mult = 3.0) {
  if (!data || data.length < period + 2) return null;
  const trArr = [];
  for (let i = 1; i < data.length; i++) {
    const h = data[i].high  || data[i].close;
    const l = data[i].low   || data[i].close;
    const pc = data[i-1].close;
    trArr.push(Math.max(h - l, Math.abs(h - pc), Math.abs(l - pc)));
  }
  const atrArr = new Array(data.length).fill(null);
  for (let i = period; i < data.length; i++) {
    atrArr[i] = trArr.slice(i - period, i).reduce((a, b) => a + b, 0) / period;
  }
  const result = new Array(data.length).fill(null);
  let prevST = null, prevIsUp = null;
  for (let i = period; i < data.length; i++) {
    if (atrArr[i] == null) continue;
    const hl2 = ((data[i].high || data[i].close) + (data[i].low || data[i].close)) / 2;
    const upperBand = hl2 + mult * atrArr[i];
    const lowerBand = hl2 - mult * atrArr[i];
    let isUp, st;
    if (prevST == null) {
      isUp = data[i].close >= hl2;
      st = isUp ? lowerBand : upperBand;
    } else if (prevIsUp) {
      st = Math.max(lowerBand, prevST);
      isUp = data[i].close > st;
      if (!isUp) st = upperBand;
    } else {
      st = Math.min(upperBand, prevST);
      isUp = data[i].close > st;
      if (isUp) st = lowerBand;
    }
    result[i] = { st, isUp };
    prevST = result[i].st; prevIsUp = isUp;
  }
  return result;
}

// ── Keltner Channel Calculation ───────────────
function calcKeltnerChannels(data, emaPeriod = 20, atrPeriod = 14, mult = 1.5) {
  if (!data || data.length < emaPeriod) return null;
  const closes = data.map(d => d.close);
  const ema = calcEMA(closes, emaPeriod);
  const trArr = [];
  for (let i = 1; i < data.length; i++) {
    const h = data[i].high  || data[i].close;
    const l = data[i].low   || data[i].close;
    const pc = data[i - 1].close;
    trArr.push(Math.max(h - l, Math.abs(h - pc), Math.abs(l - pc)));
  }
  const atrArr = new Array(data.length).fill(null);
  if (trArr.length >= atrPeriod) {
    let atr = trArr.slice(0, atrPeriod).reduce((a, b) => a + b, 0) / atrPeriod;
    atrArr[atrPeriod] = atr;
    for (let i = atrPeriod; i < trArr.length; i++) {
      atr = (atr * (atrPeriod - 1) + trArr[i]) / atrPeriod;
      atrArr[i + 1] = atr;
    }
  }
  const upper = new Array(data.length).fill(null);
  const lower = new Array(data.length).fill(null);
  for (let i = 0; i < data.length; i++) {
    if (ema[i] != null && atrArr[i] != null) {
      upper[i] = ema[i] + mult * atrArr[i];
      lower[i] = ema[i] - mult * atrArr[i];
    }
  }
  return { mid: ema, upper, lower };
}

// ── Vortex Indicator ──────────────────────────
function calcVortex(data, period = 14) {
  const viPlus  = new Array(data.length).fill(null);
  const viMinus = new Array(data.length).fill(null);
  for (let i = period; i < data.length; i++) {
    let vmPlus = 0, vmMinus = 0, trSum = 0;
    for (let j = i - period + 1; j <= i; j++) {
      const hi  = data[j].high  || data[j].close;
      const lo  = data[j].low   || data[j].close;
      const phi = data[j-1].high || data[j-1].close;
      const plo = data[j-1].low  || data[j-1].close;
      const pc  = data[j-1].close;
      vmPlus  += Math.abs(hi - plo);
      vmMinus += Math.abs(lo - phi);
      trSum   += Math.max(hi - lo, Math.abs(hi - pc), Math.abs(lo - pc));
    }
    viPlus[i]  = trSum > 0 ? vmPlus  / trSum : null;
    viMinus[i] = trSum > 0 ? vmMinus / trSum : null;
  }
  return { viPlus, viMinus };
}

function drawVortexPanel(canvas, data) {
  if (!canvas || !data || data.length < 16) return;
  const dpr = window.devicePixelRatio || 1;
  const W = canvas.width, H = canvas.height;
  const cc = getChartColors();
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.clearRect(0, 0, W, H);
  const pT = 10 * dpr, pB = 10 * dpr, pL = 5 * dpr, pR = 40 * dpr;
  const cH = H - pT - pB;
  const vx = calcVortex(data, 14);
  const allV = [...vx.viPlus, ...vx.viMinus].filter(v => v != null);
  if (allV.length < 2) return;
  const maxV = Math.max(...allV) * 1.1, minV = Math.min(...allV) * 0.9;
  const toX = i => pL + (i / (data.length - 1)) * (W - pL - pR);
  const toY = v => pT + cH - ((v - minV) / (maxV - minV)) * cH;
  // Unity line
  ctx.beginPath(); ctx.strokeStyle = cc.grid; ctx.lineWidth = 0.7 * dpr;
  ctx.setLineDash([3 * dpr, 3 * dpr]);
  ctx.moveTo(pL, toY(1)); ctx.lineTo(W - pR, toY(1));
  ctx.stroke(); ctx.setLineDash([]);
  const drawLine = (arr, color) => {
    ctx.beginPath(); ctx.strokeStyle = color; ctx.lineWidth = 1.3 * dpr;
    let s = false;
    for (let i = 0; i < data.length; i++) {
      if (arr[i] == null) continue;
      const x = toX(i), y = toY(arr[i]);
      if (!s) { ctx.moveTo(x, y); s = true; } else ctx.lineTo(x, y);
    }
    ctx.stroke();
  };
  drawLine(vx.viPlus,  '#22c55e');  // +VI green
  drawLine(vx.viMinus, '#ef4444');  // -VI red
  const lastP = vx.viPlus.slice().reverse().find(v => v != null);
  const lastM = vx.viMinus.slice().reverse().find(v => v != null);
  ctx.font = `bold ${8.5 * dpr}px Inter,sans-serif`;
  ctx.textAlign = 'left'; ctx.fillStyle = cc.label;
  ctx.fillText('Vortex 14', 2 * dpr, pT + 9 * dpr);
  if (lastP != null) {
    ctx.textAlign = 'right';
    ctx.fillStyle = lastP > (lastM || 0) ? '#22c55e' : '#ef4444';
    ctx.fillText(`+${lastP.toFixed(2)} / -${(lastM||0).toFixed(2)}`, W - pR, pT + 9 * dpr);
  }
}

// ── Aroon Oscillator ──────────────────────────
function calcAroon(data, period = 25) {
  const aroonUp   = new Array(data.length).fill(null);
  const aroonDown = new Array(data.length).fill(null);
  for (let i = period; i < data.length; i++) {
    const slice = data.slice(i - period, i + 1);
    let maxIdx = 0, minIdx = 0;
    for (let j = 1; j <= period; j++) {
      if ((slice[j].high || slice[j].close) > (slice[maxIdx].high || slice[maxIdx].close)) maxIdx = j;
      if ((slice[j].low  || slice[j].close) < (slice[minIdx].low  || slice[minIdx].close)) minIdx = j;
    }
    aroonUp[i]   = ((maxIdx) / period) * 100;
    aroonDown[i] = ((minIdx) / period) * 100;
  }
  return { up: aroonUp, down: aroonDown, osc: aroonUp.map((u, i) => (u == null ? null : u - aroonDown[i])) };
}

function drawAroonPanel(canvas, data) {
  if (!canvas || !data || data.length < 27) return;
  const dpr = window.devicePixelRatio || 1;
  const W = canvas.width, H = canvas.height;
  const cc = getChartColors();
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.clearRect(0, 0, W, H);
  const pT = 10 * dpr, pB = 10 * dpr, pL = 5 * dpr, pR = 40 * dpr;
  const cH = H - pT - pB;
  const ar = calcAroon(data, 25);
  const toX = i => pL + (i / (data.length - 1)) * (W - pL - pR);
  const toY = v => pT + cH - ((v + 100) / 200) * cH;
  // Zero line
  ctx.beginPath(); ctx.strokeStyle = cc.grid; ctx.lineWidth = 1 * dpr;
  ctx.moveTo(pL, toY(0)); ctx.lineTo(W - pR, toY(0)); ctx.stroke();
  // Oscillator bars
  const barW = Math.max(1, (W / data.length) * 0.65);
  for (let i = 0; i < data.length; i++) {
    if (ar.osc[i] == null) continue;
    const x = toX(i), y0 = toY(0), yV = toY(ar.osc[i]);
    ctx.fillStyle = ar.osc[i] >= 0 ? 'rgba(34,197,94,0.55)' : 'rgba(239,68,68,0.55)';
    ctx.fillRect(x - barW/2, Math.min(y0,yV), barW, Math.max(1, Math.abs(yV-y0)));
  }
  const lastOsc = ar.osc.slice().reverse().find(v => v != null);
  ctx.font = `bold ${8.5 * dpr}px Inter,sans-serif`;
  ctx.textAlign = 'left'; ctx.fillStyle = cc.label;
  ctx.fillText('Aroon 25', 2 * dpr, pT + 9 * dpr);
  if (lastOsc != null) {
    ctx.textAlign = 'right';
    ctx.fillStyle = lastOsc >= 0 ? '#22c55e' : '#ef4444';
    ctx.fillText(lastOsc.toFixed(1), W - pR, pT + 9 * dpr);
  }
}

// ── Awesome Oscillator ────────────────────────
function calcAwesomeOscillator(data) {
  const mp = data.map(d => ((d.high || d.close) + (d.low || d.close)) / 2);
  const sma5 = mp.map((_, i) => {
    if (i < 4) return null;
    return (mp[i] + mp[i-1] + mp[i-2] + mp[i-3] + mp[i-4]) / 5;
  });
  const sma34 = mp.map((_, i) => {
    if (i < 33) return null;
    let s = 0; for (let j = i; j > i - 34; j--) s += mp[j]; return s / 34;
  });
  return sma5.map((s5, i) => (s5 == null || sma34[i] == null) ? null : s5 - sma34[i]);
}

function drawAOPanel(canvas, data) {
  if (!canvas || !data || data.length < 35) return;
  const dpr = window.devicePixelRatio || 1;
  const W = canvas.width, H = canvas.height;
  const cc = getChartColors();
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.clearRect(0, 0, W, H);
  const pT = 10 * dpr, pB = 10 * dpr, pL = 5 * dpr, pR = 40 * dpr;
  const cH = H - pT - pB;
  const ao = calcAwesomeOscillator(data);
  const vals = ao.filter(v => v != null);
  if (vals.length < 2) return;
  const maxAbs = Math.max(...vals.map(Math.abs)) * 1.2 || 1;
  const toX = i => pL + (i / (data.length - 1)) * (W - pL - pR);
  const toY = v => pT + cH - ((v + maxAbs) / (2 * maxAbs)) * cH;
  const y0 = toY(0);
  ctx.beginPath(); ctx.strokeStyle = cc.grid; ctx.lineWidth = 1 * dpr;
  ctx.moveTo(pL, y0); ctx.lineTo(W - pR, y0); ctx.stroke();
  const barW = Math.max(1, (W / data.length) * 0.65);
  for (let i = 1; i < data.length; i++) {
    if (ao[i] == null) continue;
    // Green if AO rising, red if falling
    const col = (ao[i] >= (ao[i-1] || ao[i])) ? 'rgba(34,197,94,0.60)' : 'rgba(239,68,68,0.60)';
    const x = toX(i), yV = toY(ao[i]);
    ctx.fillStyle = col;
    ctx.fillRect(x - barW/2, Math.min(y0,yV), barW, Math.max(1, Math.abs(yV-y0)));
  }
  const lastAO = ao.slice().reverse().find(v => v != null);
  ctx.font = `bold ${8.5 * dpr}px Inter,sans-serif`;
  ctx.textAlign = 'left'; ctx.fillStyle = cc.label;
  ctx.fillText('AO', 2 * dpr, pT + 9 * dpr);
  if (lastAO != null) {
    ctx.textAlign = 'right';
    ctx.fillStyle = lastAO >= 0 ? '#22c55e' : '#ef4444';
    ctx.fillText(lastAO.toFixed(4), W - pR, pT + 9 * dpr);
  }
}

// ── VWMACD (Volume-Weighted MACD) ─────────────
function calcVWMACD(data, fast = 12, slow = 26, sig = 9) {
  if (!data || data.length < slow + sig) return null;
  const vols = data.map(d => d.volume || 1);
  const avgVol = vols.reduce((a, b) => a + b, 0) / (vols.length || 1) || 1;
  // Volume-weighted close: bars with higher volume have more influence
  const vwClose = data.map((d, i) => d.close * (vols[i] / avgVol));
  const ema1  = calcEMA(vwClose, fast);
  const ema2  = calcEMA(vwClose, slow);
  const macd   = ema1.map((v, i) => (v == null || ema2[i] == null) ? null : v - ema2[i]);
  const signal = calcEMA(macd, sig);
  const hist   = macd.map((v, i) => (v == null || signal[i] == null) ? null : v - signal[i]);
  return { macd, signal, hist };
}

function drawVWMACDPanel(canvas, data) {
  if (!canvas || !data || data.length < 35) return;
  const dpr = window.devicePixelRatio || 1;
  canvas.width  = canvas.offsetWidth  * dpr;
  canvas.height = canvas.offsetHeight * dpr;
  const W = canvas.width, H = canvas.height;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, W, H);
  const cc = getChartColors();
  const vwm = calcVWMACD(data);
  if (!vwm) return;
  const { macd, signal, hist } = vwm;
  const pL = 32 * dpr, pR = 6 * dpr, pT = 4 * dpr, pB = 4 * dpr;
  const cW = W - pL - pR, cH = H - pT - pB;
  const toX = i => pL + (i / (data.length - 1)) * cW;
  const allVals = [...macd, ...signal, ...hist].filter(v => v != null);
  if (allVals.length < 2) return;
  const minV = Math.min(...allVals), maxV = Math.max(...allVals);
  const rng = maxV - minV || 1;
  const aMin = minV - rng * 0.06, aMax = maxV + rng * 0.06, aRng = aMax - aMin;
  const toY  = v => pT + (1 - (v - aMin) / aRng) * cH;
  const y0   = toY(0);
  // Zero line
  ctx.strokeStyle = cc.grid; ctx.lineWidth = dpr;
  ctx.setLineDash([2 * dpr, 3 * dpr]);
  ctx.beginPath(); ctx.moveTo(pL, y0); ctx.lineTo(W - pR, y0); ctx.stroke();
  ctx.setLineDash([]);
  // Histogram
  const barW = Math.max(1, (cW / data.length) * 0.65);
  for (let i = 0; i < data.length; i++) {
    if (hist[i] == null) continue;
    const x = toX(i), yH = toY(hist[i]);
    ctx.fillStyle = hist[i] >= 0 ? 'rgba(99,102,241,0.50)' : 'rgba(236,72,153,0.50)';
    ctx.fillRect(x - barW / 2, Math.min(y0, yH), barW, Math.max(1, Math.abs(yH - y0)));
  }
  // VWMACD line (indigo)
  ctx.beginPath(); ctx.strokeStyle = '#6366f1'; ctx.lineWidth = 1.5 * dpr;
  let s = false;
  for (let i = 0; i < data.length; i++) {
    if (macd[i] == null) continue;
    const x = toX(i), y = toY(macd[i]);
    if (!s) { ctx.moveTo(x, y); s = true; } else ctx.lineTo(x, y);
  }
  ctx.stroke();
  // Signal line (pink)
  ctx.beginPath(); ctx.strokeStyle = '#ec4899'; ctx.lineWidth = 1.2 * dpr;
  s = false;
  for (let i = 0; i < data.length; i++) {
    if (signal[i] == null) continue;
    const x = toX(i), y = toY(signal[i]);
    if (!s) { ctx.moveTo(x, y); s = true; } else ctx.lineTo(x, y);
  }
  ctx.stroke();
  // Zero-line crossover arrows
  try {
    for (let i = 1; i < data.length; i++) {
      if (macd[i] == null || macd[i-1] == null) continue;
      const bullX = macd[i-1] < 0 && macd[i] >= 0;
      const bearX = macd[i-1] > 0 && macd[i] <= 0;
      if (!bullX && !bearX) continue;
      const bx = toX(i), yz = toY(0);
      ctx.fillStyle = bullX ? 'rgba(99,102,241,0.90)' : 'rgba(236,72,153,0.90)';
      ctx.beginPath();
      if (bullX) { ctx.moveTo(bx, yz-8*dpr); ctx.lineTo(bx-3.5*dpr, yz-2*dpr); ctx.lineTo(bx+3.5*dpr, yz-2*dpr); }
      else       { ctx.moveTo(bx, yz+8*dpr); ctx.lineTo(bx-3.5*dpr, yz+2*dpr); ctx.lineTo(bx+3.5*dpr, yz+2*dpr); }
      ctx.closePath(); ctx.fill();
    }
  } catch (_) {}
  // Label
  ctx.font = `bold ${8.5 * dpr}px Inter,sans-serif`;
  ctx.textAlign = 'left'; ctx.fillStyle = '#6366f1';
  ctx.fillText('VWMACD', pL + 2 * dpr, pT + 9 * dpr);
  const lastM = macd.slice().reverse().find(v => v != null);
  if (lastM != null) {
    ctx.textAlign = 'right';
    ctx.fillStyle = lastM >= 0 ? '#6366f1' : '#ec4899';
    ctx.fillText(lastM.toFixed(4), W - pR, pT + 9 * dpr);
  }
}

// ── v2.70: Candle Body% Histogram ────────────────────────────────────────────
function drawBodyPctPanel(canvas, data) {
  if (!canvas || !data || data.length < 5) return;
  const W = canvas.parentElement.clientWidth || 600;
  const H = 52, dpr = window.devicePixelRatio || 1;
  canvas.width = W * dpr; canvas.height = H * dpr;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, W * dpr, H * dpr);
  ctx.scale(dpr, dpr);

  const pL = 2, pR = 42, pT = 8, pB = 14;
  const cW = W - pL - pR, cH = H - pT - pB;

  // Compute body% for each candle: |close - open| / range
  const bodyPcts = data.map(d => {
    const range = (d.high || d.close) - (d.low || d.close);
    if (range <= 0) return 0;
    return Math.abs(d.close - d.open) / range;
  });

  // Draw bars
  const n = bodyPcts.length;
  const bW = Math.max(1, cW / n - 0.5);
  const maxP = 1.0;
  bodyPcts.forEach((bp, i) => {
    const x = pL + (i / n) * cW;
    const h = bp * cH;
    // Color: high body% = strong candle (green/red by direction), low = doji-like
    const isUp = data[i].close >= data[i].open;
    const alpha = 0.25 + bp * 0.55;
    ctx.fillStyle = bp > 0.6
      ? (isUp ? `rgba(52,211,153,${alpha})` : `rgba(248,113,113,${alpha})`)
      : `rgba(100,116,139,${alpha * 0.7})`;
    ctx.fillRect(x, pT + cH - h, bW, h);
  });

  // Average line
  const avg = bodyPcts.reduce((a, b) => a + b, 0) / bodyPcts.length;
  const avgY = pT + cH - avg * cH;
  ctx.save();
  ctx.strokeStyle = 'rgba(148,163,184,0.4)';
  ctx.lineWidth = 1;
  ctx.setLineDash([3, 3]);
  ctx.beginPath();
  ctx.moveTo(pL, avgY); ctx.lineTo(pL + cW, avgY);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.restore();

  // Labels
  ctx.font = `bold ${7 * dpr}px "Segoe UI Variable", sans-serif`;
  ctx.fillStyle = 'rgba(148,163,184,0.7)';
  ctx.textAlign = 'left';
  ctx.fillText('BODY%', pL + 2 * dpr, pT + 9 * dpr);
  ctx.textAlign = 'right';
  ctx.fillStyle = 'rgba(148,163,184,0.85)';
  ctx.fillText(`avg ${(avg * 100).toFixed(0)}%`, W - pR, pT + 9 * dpr);
}

// ── v2.73: Daily Returns Heat Strip ─────────────────────────────────────────
function drawDailyReturnsStrip(canvas, data) {
  if (!canvas || !data || data.length < 5) return;
  const W = canvas.parentElement.clientWidth || 600;
  const H = 42, dpr = window.devicePixelRatio || 1;
  canvas.width = W * dpr; canvas.height = H * dpr;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, W * dpr, H * dpr);
  ctx.scale(dpr, dpr);

  const pL = 2, pR = 68, pT = 4, pB = 14;
  const cW = W - pL - pR;

  // Compute daily returns
  const rets = data.map((d, i) => {
    if (i === 0) return 0;
    const prev = data[i - 1].close;
    return prev > 0 ? ((d.close - prev) / prev) * 100 : 0;
  }).slice(1);

  const n = rets.length;
  const cellW = Math.max(2, Math.floor(cW / n));
  const maxAbs = Math.max(...rets.map(Math.abs), 0.1);

  rets.forEach((ret, i) => {
    const x = pL + i * cellW;
    const isPos = ret >= 0;
    const intensity = Math.min(0.92, 0.12 + (Math.abs(ret) / maxAbs) * 0.78);
    ctx.fillStyle = isPos
      ? `rgba(52,211,153,${intensity.toFixed(3)})`
      : `rgba(248,113,113,${intensity.toFixed(3)})`;
    const cellH = H - pT - pB;
    ctx.fillRect(x, pT, cellW - 1, cellH);

    // Tooltip hint via title attribute not possible in canvas; use title overlay
  });

  // Zero baseline
  ctx.strokeStyle = 'rgba(148,163,184,0.18)'; ctx.lineWidth = 1; ctx.setLineDash([]);
  ctx.beginPath(); ctx.moveTo(pL, pT + (H - pT - pB) / 2); ctx.lineTo(pL + cW, pT + (H - pT - pB) / 2); ctx.stroke();

  // Right-side stats
  ctx.setLineDash([]);
  const pos = rets.filter(r => r > 0).length;
  const neg = rets.filter(r => r < 0).length;
  const avgRet = rets.reduce((a, b) => a + b, 0) / (rets.length || 1);
  ctx.textAlign = 'right'; ctx.font = `bold ${7.5 * dpr}px "Segoe UI Variable", sans-serif`;
  ctx.fillStyle = 'rgba(148,163,184,0.6)';
  ctx.fillText('30D', W - 2, pT + 9);
  ctx.fillStyle = '#34d399'; ctx.font = `${7 * dpr}px "Segoe UI Variable", sans-serif`;
  ctx.fillText(`↑${pos}`, W - 2, pT + 19);
  ctx.fillStyle = '#f87171';
  ctx.fillText(`↓${neg}`, W - 2, pT + 28);
  ctx.fillStyle = avgRet >= 0 ? '#34d399' : '#f87171';
  ctx.font = `bold ${7 * dpr}px "Segoe UI Variable", sans-serif`;
  ctx.fillText(`${avgRet >= 0 ? '+' : ''}${avgRet.toFixed(2)}%`, W - 2, H - pB + 8);
}

// ── MFI (Money Flow Index) ────────────────────
function calcMFI(data, period = 14) {
  return data.map((d, i) => {
    if (i < period) return null;
    const slice = data.slice(i - period + 1, i + 1);
    let posFlow = 0, negFlow = 0;
    for (let j = 1; j < slice.length; j++) {
      const tp  = (slice[j].high || slice[j].close + slice[j].low || slice[j].close + slice[j].close) / 3;
      const tpp = (slice[j-1].high || slice[j-1].close + slice[j-1].low || slice[j-1].close + slice[j-1].close) / 3;
      const mf  = tp * (slice[j].volume || 0);
      if (tp > tpp) posFlow += mf; else negFlow += mf;
    }
    if (negFlow === 0) return 100;
    const mfr = posFlow / negFlow;
    return 100 - (100 / (1 + mfr));
  });
}

function drawMFIPanel(canvas, data) {
  if (!canvas || !data || data.length < 16) return;
  const dpr = window.devicePixelRatio || 1;
  const W = canvas.width, H = canvas.height;
  const cc = getChartColors();
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.clearRect(0, 0, W, H);
  const pT = 10 * dpr, pB = 10 * dpr, pL = 5 * dpr, pR = 40 * dpr;
  const cH = H - pT - pB;
  const mfi = calcMFI(data, 14);
  const toX = i => pL + (i / (data.length - 1)) * (W - pL - pR);
  const toY = v => pT + cH - (v / 100) * cH;
  // OB/OS bands
  [80, 20].forEach(lv => {
    ctx.beginPath(); ctx.strokeStyle = cc.grid; ctx.lineWidth = 0.7 * dpr;
    ctx.setLineDash([3 * dpr, 3 * dpr]);
    ctx.moveTo(pL, toY(lv)); ctx.lineTo(W - pR, toY(lv));
    ctx.stroke(); ctx.setLineDash([]);
  });
  // MFI line
  ctx.beginPath(); ctx.lineWidth = 1.5 * dpr;
  let started = false;
  for (let i = 0; i < data.length; i++) {
    if (mfi[i] == null) continue;
    ctx.strokeStyle = mfi[i] >= 80 ? '#ef4444' : mfi[i] <= 20 ? '#22c55e' : '#22d3ee';
    const x = toX(i), y = toY(mfi[i]);
    if (!started) { ctx.moveTo(x, y); started = true; } else ctx.lineTo(x, y);
  }
  ctx.stroke();
  const lastMFI = mfi.slice().reverse().find(v => v != null);
  ctx.font = `bold ${8.5 * dpr}px Inter,sans-serif`;
  ctx.textAlign = 'left'; ctx.fillStyle = cc.label;
  ctx.fillText('MFI 14', 2 * dpr, pT + 9 * dpr);
  if (lastMFI != null) {
    ctx.textAlign = 'right';
    ctx.fillStyle = lastMFI >= 80 ? '#ef4444' : lastMFI <= 20 ? '#22c55e' : '#22d3ee';
    ctx.fillText(lastMFI.toFixed(1), W - pR, pT + 9 * dpr);
  }
}

// ── DPO (Detrended Price Oscillator) ──────────
function calcDPO(closes, period = 20) {
  const sma = closes.map((_, i) => {
    if (i < period - 1) return null;
    const sl = closes.slice(i - period + 1, i + 1);
    return sl.reduce((a, b) => a + b, 0) / period;
  });
  const lookback = Math.floor(period / 2) + 1;
  return closes.map((c, i) => {
    const smaIdx = i - lookback;
    if (smaIdx < 0 || sma[smaIdx] == null) return null;
    return c - sma[smaIdx];
  });
}

function drawDPOPanel(canvas, data) {
  if (!canvas || !data || data.length < 22) return;
  const dpr = window.devicePixelRatio || 1;
  const W = canvas.width, H = canvas.height;
  const cc = getChartColors();
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.clearRect(0, 0, W, H);
  const pT = 10 * dpr, pB = 10 * dpr, pL = 5 * dpr, pR = 40 * dpr;
  const cH = H - pT - pB;
  const closes = data.map(d => d.close);
  const dpo = calcDPO(closes, 20);
  const vals = dpo.filter(v => v != null);
  if (vals.length < 2) return;
  const maxAbs = Math.max(...vals.map(Math.abs)) * 1.2 || 1;
  const toX = i => pL + (i / (data.length - 1)) * (W - pL - pR);
  const toY = v => pT + cH - ((v + maxAbs) / (2 * maxAbs)) * cH;
  const y0 = toY(0);
  ctx.beginPath(); ctx.strokeStyle = cc.grid; ctx.lineWidth = 1 * dpr;
  ctx.moveTo(pL, y0); ctx.lineTo(W - pR, y0); ctx.stroke();
  // DPO bars
  const barW = Math.max(1, (W / data.length) * 0.65);
  for (let i = 0; i < data.length; i++) {
    if (dpo[i] == null) continue;
    const x = toX(i), yV = toY(dpo[i]);
    ctx.fillStyle = dpo[i] >= 0 ? 'rgba(34,197,94,0.55)' : 'rgba(239,68,68,0.55)';
    ctx.fillRect(x - barW/2, Math.min(y0,yV), barW, Math.max(1, Math.abs(yV-y0)));
  }
  const lastDPO = dpo.slice().reverse().find(v => v != null);
  ctx.font = `bold ${8.5 * dpr}px Inter,sans-serif`;
  ctx.textAlign = 'left'; ctx.fillStyle = cc.label;
  ctx.fillText('DPO 20', 2 * dpr, pT + 9 * dpr);
  if (lastDPO != null) {
    ctx.textAlign = 'right';
    ctx.fillStyle = lastDPO >= 0 ? '#22c55e' : '#ef4444';
    ctx.fillText(lastDPO.toFixed(2), W - pR, pT + 9 * dpr);
  }
}

// ── Elder Ray (Bull/Bear Power) ───────────────
function calcElderRay(data, period = 13) {
  const closes = data.map(d => d.close);
  const ema = calcEMA(closes, period);
  const bull = data.map((d, i) => ema[i] == null ? null : (d.high || d.close) - ema[i]);
  const bear = data.map((d, i) => ema[i] == null ? null : (d.low  || d.close) - ema[i]);
  return { bull, bear };
}

function drawElderRayPanel(canvas, data) {
  if (!canvas || !data || data.length < 15) return;
  const dpr = window.devicePixelRatio || 1;
  const W = canvas.width, H = canvas.height;
  const cc = getChartColors();
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.clearRect(0, 0, W, H);
  const pT = 10 * dpr, pB = 10 * dpr, pL = 5 * dpr, pR = 40 * dpr;
  const cH = H - pT - pB;
  const er = calcElderRay(data, 13);
  const allV = [...er.bull, ...er.bear].filter(v => v != null);
  if (allV.length < 2) return;
  const maxAbs = Math.max(...allV.map(Math.abs)) * 1.2 || 1;
  const toX = i => pL + (i / (data.length - 1)) * (W - pL - pR);
  const toY = v => pT + cH - ((v + maxAbs) / (2 * maxAbs)) * cH;
  const y0 = toY(0);
  ctx.beginPath(); ctx.strokeStyle = cc.grid; ctx.lineWidth = 1 * dpr;
  ctx.moveTo(pL, y0); ctx.lineTo(W - pR, y0); ctx.stroke();
  const barW = Math.max(1, (W / data.length) * 0.55);
  for (let i = 0; i < data.length; i++) {
    // Bull power (green, above 0)
    if (er.bull[i] != null) {
      const yV = toY(er.bull[i]);
      ctx.fillStyle = 'rgba(34,197,94,0.60)';
      ctx.fillRect(toX(i) - barW/2, Math.min(y0,yV), barW, Math.max(1,Math.abs(yV-y0)));
    }
    // Bear power (red, below 0)
    if (er.bear[i] != null) {
      const yV = toY(er.bear[i]);
      ctx.fillStyle = 'rgba(239,68,68,0.60)';
      ctx.fillRect(toX(i) - barW/2, Math.min(y0,yV), barW, Math.max(1,Math.abs(yV-y0)));
    }
  }
  const lastBull = er.bull.slice().reverse().find(v => v != null);
  const lastBear = er.bear.slice().reverse().find(v => v != null);
  ctx.font = `bold ${8.5 * dpr}px Inter,sans-serif`;
  ctx.textAlign = 'left'; ctx.fillStyle = cc.label;
  ctx.fillText('Elder Ray', 2 * dpr, pT + 9 * dpr);
  if (lastBull != null) {
    ctx.textAlign = 'right';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText(`B:${lastBull.toFixed(2)} / ${(lastBear||0).toFixed(2)}`, W - pR, pT + 9 * dpr);
  }
}

// ── WMA / HMA / DEMA / TEMA ───────────────────
function calcWMA(closes, period) {
  return closes.map((_, i) => {
    if (i < period - 1) return null;
    const sl = closes.slice(i - period + 1, i + 1);
    let ws = 0, wt = 0;
    for (let j = 0; j < period; j++) { if (sl[j] == null) return null; ws += (j + 1) * sl[j]; wt += (j + 1); }
    return wt > 0 ? ws / wt : null;
  });
}

function calcHMA(closes, period = 20) {
  const half  = Math.max(2, Math.floor(period / 2));
  const sqrtP = Math.max(2, Math.round(Math.sqrt(period)));
  const wmaH  = calcWMA(closes, half);
  const wmaF  = calcWMA(closes, period);
  const diff  = wmaH.map((h, i) => (h == null || wmaF[i] == null) ? null : 2 * h - wmaF[i]);
  return calcWMA(diff, sqrtP);
}

function calcDEMA(closes, period = 20) {
  const ema1 = calcEMA(closes, period);
  const ema2 = calcEMA(ema1, period);
  return ema1.map((e1, i) => (e1 == null || ema2[i] == null) ? null : 2 * e1 - ema2[i]);
}

function calcTEMA(closes, period = 20) {
  const ema1 = calcEMA(closes, period);
  const ema2 = calcEMA(ema1, period);
  const ema3 = calcEMA(ema2, period);
  return ema1.map((e1, i) => {
    const e2 = ema2[i], e3 = ema3[i];
    return (e1 == null || e2 == null || e3 == null) ? null : 3 * e1 - 3 * e2 + e3;
  });
}

// ── EMA Calculation ───────────────────────────
function calcEMA(closes, n) {
  const ema = new Array(closes.length).fill(null);
  if (closes.length < n) return ema;
  let sum = 0;
  for (let i = 0; i < n; i++) sum += closes[i];
  ema[n - 1] = sum / n;
  const k = 2 / (n + 1);
  for (let i = n; i < closes.length; i++) {
    ema[i] = closes[i] * k + ema[i - 1] * (1 - k);
  }
  return ema;
}

// ── Bollinger Bands (20, 2σ) ──────────────────
function calcBollingerBands(closes, n = 20, mult = 2) {
  const upper = new Array(closes.length).fill(null);
  const mid   = new Array(closes.length).fill(null);
  const lower = new Array(closes.length).fill(null);
  for (let i = n - 1; i < closes.length; i++) {
    let sum = 0;
    for (let j = i - n + 1; j <= i; j++) sum += closes[j];
    const avg = sum / n;
    let variance = 0;
    for (let j = i - n + 1; j <= i; j++) variance += (closes[j] - avg) ** 2;
    const std = Math.sqrt(variance / n);
    mid[i]   = avg;
    upper[i] = avg + mult * std;
    lower[i] = avg - mult * std;
  }
  return { upper, mid, lower };
}

// ── MACD (12, 26, 9) ─────────────────────────
function calcMACD(closes, fast = 12, slow = 26, sig = 9) {
  const ema12 = calcEMA(closes, fast);
  const ema26 = calcEMA(closes, slow);
  const macd  = closes.map((_, i) =>
    ema12[i] != null && ema26[i] != null ? ema12[i] - ema26[i] : null
  );
  const firstValid = macd.findIndex(v => v != null);
  const signal = new Array(closes.length).fill(null);
  if (firstValid >= 0) {
    const macdSlice = macd.slice(firstValid);
    const sigSlice  = calcEMA(macdSlice, sig);
    for (let i = 0; i < sigSlice.length; i++) signal[firstValid + i] = sigSlice[i];
  }
  const hist = macd.map((v, i) =>
    v != null && signal[i] != null ? v - signal[i] : null
  );
  return { macd, signal, hist };
}

// ── MACD Sub-panel ────────────────────────────
function drawMACDPanel(canvas, data) {
  if (!canvas || !data || data.length < 30) return;
  const dpr = window.devicePixelRatio || 1;
  canvas.width  = canvas.offsetWidth  * dpr;
  canvas.height = canvas.offsetHeight * dpr;
  const W = canvas.width, H = canvas.height;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, W, H);
  const cc = getChartColors();

  const closes = data.map(d => d.close);
  const { macd, signal, hist } = calcMACD(closes);
  const pL = 32 * dpr, pR = 6 * dpr, pT = 4 * dpr, pB = 4 * dpr;
  const cW = W - pL - pR, cH = H - pT - pB;
  const toX = i => pL + (i / (data.length - 1)) * cW;

  const allVals = [...macd, ...signal, ...hist].filter(v => v != null);
  if (allVals.length < 2) return;
  const minV = Math.min(...allVals), maxV = Math.max(...allVals);
  const rng = maxV - minV || 1;
  const aMin = minV - rng * 0.06, aMax = maxV + rng * 0.06, aRng = aMax - aMin;
  const toY  = v => pT + (1 - (v - aMin) / aRng) * cH;
  const y0   = toY(0);

  // Zero line
  ctx.strokeStyle = cc.grid;
  ctx.lineWidth = dpr;
  ctx.setLineDash([2 * dpr, 3 * dpr]);
  ctx.beginPath(); ctx.moveTo(pL, y0); ctx.lineTo(W - pR, y0); ctx.stroke();
  ctx.setLineDash([]);

  // Histogram bars
  const barW = Math.max(1, (cW / data.length) * 0.65);
  for (let i = 0; i < data.length; i++) {
    if (hist[i] == null) continue;
    const x = toX(i), yH = toY(hist[i]);
    const barTop = Math.min(y0, yH), barH = Math.abs(yH - y0);
    ctx.fillStyle = hist[i] >= 0 ? 'rgba(34,197,94,0.5)' : 'rgba(239,68,68,0.5)';
    ctx.fillRect(x - barW / 2, barTop, barW, Math.max(1, barH));
  }

  // MACD line (blue)
  ctx.beginPath(); ctx.strokeStyle = '#3b82f6'; ctx.lineWidth = 1.5 * dpr;
  let s = false;
  for (let i = 0; i < data.length; i++) {
    if (macd[i] == null) continue;
    const x = toX(i), y = toY(macd[i]);
    if (!s) { ctx.moveTo(x, y); s = true; } else ctx.lineTo(x, y);
  }
  ctx.stroke();

  // Signal line (orange)
  ctx.beginPath(); ctx.strokeStyle = '#f97316'; ctx.lineWidth = 1.5 * dpr;
  s = false;
  for (let i = 0; i < data.length; i++) {
    if (signal[i] == null) continue;
    const x = toX(i), y = toY(signal[i]);
    if (!s) { ctx.moveTo(x, y); s = true; } else ctx.lineTo(x, y);
  }
  ctx.stroke();

  // ── MACD Histogram Divergence ──────────────────────────────────────────────
  try {
    const MLOOKBACK = Math.min(data.length, 60);
    const mStartIdx = data.length - MLOOKBACK;
    const MWIN = 3;
    const mPivotLows = [], mPivotHighs = [];
    for (let i = mStartIdx + MWIN; i < data.length - MWIN; i++) {
      if (hist[i] == null) continue;
      const pLow  = data[i].low  || data[i].close;
      const pHigh = data[i].high || data[i].close;
      let isPivotLow = true, isPivotHigh = true;
      for (let j = i - MWIN; j <= i + MWIN; j++) {
        if (j === i) continue;
        if ((data[j].low  || data[j].close) <= pLow)  isPivotLow  = false;
        if ((data[j].high || data[j].close) >= pHigh) isPivotHigh = false;
      }
      if (isPivotLow)  mPivotLows.push ({ idx: i, price: pLow,  histVal: hist[i] });
      if (isPivotHigh) mPivotHighs.push({ idx: i, price: pHigh, histVal: hist[i] });
    }
    // Bullish divergence: price makes lower low, histogram makes higher (less negative) low
    if (mPivotLows.length >= 2) {
      const ma = mPivotLows[mPivotLows.length - 2];
      const mb = mPivotLows[mPivotLows.length - 1];
      if (mb.price < ma.price && mb.histVal > ma.histVal + 0.0001) {
        ctx.save();
        ctx.strokeStyle = 'rgba(34,197,94,0.80)'; ctx.lineWidth = 1.2 * dpr;
        ctx.setLineDash([3 * dpr, 2 * dpr]);
        ctx.beginPath();
        ctx.moveTo(toX(ma.idx), toY(ma.histVal));
        ctx.lineTo(toX(mb.idx), toY(mb.histVal));
        ctx.stroke(); ctx.setLineDash([]);
        const mbx = toX(mb.idx), mby = toY(mb.histVal) + 5 * dpr;
        ctx.fillStyle = 'rgba(34,197,94,0.85)';
        ctx.beginPath();
        ctx.moveTo(mbx, mby); ctx.lineTo(mbx - 4 * dpr, mby + 7 * dpr); ctx.lineTo(mbx + 4 * dpr, mby + 7 * dpr);
        ctx.closePath(); ctx.fill();
        ctx.restore();
      }
    }
    // Bearish divergence: price makes higher high, histogram makes lower (less positive) high
    if (mPivotHighs.length >= 2) {
      const ma = mPivotHighs[mPivotHighs.length - 2];
      const mb = mPivotHighs[mPivotHighs.length - 1];
      if (mb.price > ma.price && mb.histVal < ma.histVal - 0.0001) {
        ctx.save();
        ctx.strokeStyle = 'rgba(239,68,68,0.80)'; ctx.lineWidth = 1.2 * dpr;
        ctx.setLineDash([3 * dpr, 2 * dpr]);
        ctx.beginPath();
        ctx.moveTo(toX(ma.idx), toY(ma.histVal));
        ctx.lineTo(toX(mb.idx), toY(mb.histVal));
        ctx.stroke(); ctx.setLineDash([]);
        const mbx = toX(mb.idx), mby = toY(mb.histVal) - 5 * dpr;
        ctx.fillStyle = 'rgba(239,68,68,0.85)';
        ctx.beginPath();
        ctx.moveTo(mbx, mby); ctx.lineTo(mbx - 4 * dpr, mby - 7 * dpr); ctx.lineTo(mbx + 4 * dpr, mby - 7 * dpr);
        ctx.closePath(); ctx.fill();
        ctx.restore();
      }
    }
  } catch (_) {}

  // ── MACD Zero-Line Crossover Signals ──────────────────────────────────────
  try {
    for (let i = 1; i < data.length; i++) {
      if (macd[i] == null || macd[i - 1] == null) continue;
      const bullX = macd[i - 1] < 0 && macd[i] >= 0;
      const bearX = macd[i - 1] > 0 && macd[i] <= 0;
      if (!bullX && !bearX) continue;
      const bx = toX(i), yz = toY(0);
      ctx.fillStyle = bullX ? 'rgba(34,197,94,0.90)' : 'rgba(239,68,68,0.90)';
      ctx.beginPath();
      if (bullX) {
        ctx.moveTo(bx, yz - 9 * dpr);
        ctx.lineTo(bx - 4 * dpr, yz - 3 * dpr);
        ctx.lineTo(bx + 4 * dpr, yz - 3 * dpr);
      } else {
        ctx.moveTo(bx, yz + 9 * dpr);
        ctx.lineTo(bx - 4 * dpr, yz + 3 * dpr);
        ctx.lineTo(bx + 4 * dpr, yz + 3 * dpr);
      }
      ctx.closePath(); ctx.fill();
    }
  } catch (_) {}

  // Label
  ctx.font = `bold ${8.5 * dpr}px Inter,sans-serif`;
  ctx.textAlign = 'left';
  ctx.fillStyle = cc.label;
  ctx.fillText('MACD 12·26·9', 2 * dpr, pT + 9 * dpr);
  const lastM = macd.slice().reverse().find(v => v != null);
  if (lastM != null) {
    ctx.fillStyle = lastM >= 0 ? '#22c55e' : '#ef4444';
    ctx.textAlign = 'right';
    ctx.fillText(lastM.toFixed(4), W - pR, pT + 9 * dpr);
  }
}

// ── Overlay Indicators (EMA, Bollinger) on price canvas ─────────────────
// v2.92: Overlay indicator calculation cache — avoids recalculating on every mousemove
const _overlayCalcCache = { key: '', results: {} };
function _getOverlayCalc(name, data, calcFn) {
  const cacheKey = `${selectedChartSym?.symbol}|${mainTf?.range}|${data.length}`;
  if (_overlayCalcCache.key !== cacheKey) {
    _overlayCalcCache.key = cacheKey;
    _overlayCalcCache.results = {};
  }
  if (!_overlayCalcCache.results[name]) {
    _overlayCalcCache.results[name] = calcFn();
  }
  return _overlayCalcCache.results[name];
}

function drawOverlayIndicators(ctx, data, toX, toY, dpr, pL, pR) {
  const OVERLAY_KEYS = ['ema20','ema50','ema200','bb','vwap','fib','psar','supertrend',
                        'kc','pivots','ichi','donchian','lr','hma','dema','tema','autosr','trendlines','proj'];
  const hasActiveInd = OVERLAY_KEYS.some(k => activeIndicators.has(k));
  const hasAlertLn   = typeof selectedChartSym !== 'undefined' && selectedChartSym &&
                       typeof watchlistItems !== 'undefined' &&
                       watchlistItems.some(i => i.symbol === selectedChartSym.symbol &&
                         (i.alertAbove != null || i.alertBelow != null));
  if ((!hasActiveInd && !hasAlertLn) || !data || data.length < 2) return;

  const closes = data.map(d => d.close);
  const n      = data.length;

  // ── v2.75: Round Number Grid Lines ───────────────────────────────────────
  {
    try {
      const allPrices = data.map(d => d.close).filter(v => v != null && !isNaN(v));
      if (allPrices.length >= 2) {
        const pMin = Math.min(...data.map(d => d.low  || d.close));
        const pMax = Math.max(...data.map(d => d.high || d.close));
        const pRng = pMax - pMin;
        // Determine round number step based on price magnitude
        const magnitude = Math.pow(10, Math.floor(Math.log10(pRng * 0.5)));
        const stepCandidates = [magnitude, magnitude * 2, magnitude * 5, magnitude * 10];
        const step = stepCandidates.find(s => pRng / s >= 2 && pRng / s <= 12) || magnitude * 5;
        const firstLevel = Math.ceil(pMin / step) * step;
        ctx.save();
        ctx.setLineDash([3 * dpr, 4 * dpr]);
        ctx.lineWidth = 0.6 * dpr;
        for (let lvl = firstLevel; lvl <= pMax; lvl += step) {
          const y = toY(lvl);
          // Skip if too close to chart edge
          if (y < 5 * dpr || y > 99999) continue;
          ctx.strokeStyle = 'rgba(148,163,184,0.10)';
          ctx.beginPath(); ctx.moveTo(pL, y); ctx.lineTo(pL + (n > 0 ? toX(n - 1) - pL : 400), y); ctx.stroke();
        }
        ctx.restore();
      }
    } catch (_) {}
  }

  // EMA overlays
  const emaConfigs = [
    { key: 'ema20',  period: 20,  color: '#f59e0b', lw: 1.5 },
    { key: 'ema50',  period: 50,  color: '#3b82f6', lw: 1.5 },
    { key: 'ema200', period: 200, color: '#a855f7', lw: 2   },
  ];
  for (const { key, period, color, lw } of emaConfigs) {
    if (!activeIndicators.has(key)) continue;
    const ema = _getOverlayCalc(`ema${period}`, data, () => calcEMA(closes, period));
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = lw * dpr;
    ctx.setLineDash([]);
    let started = false;
    for (let i = 0; i < n; i++) {
      if (ema[i] == null) continue;
      const x = toX(i), y = toY(ema[i]);
      if (!started) { ctx.moveTo(x, y); started = true; } else ctx.lineTo(x, y);
    }
    ctx.stroke();
    // Right-edge label
    const lastEma = ema.slice().reverse().find(v => v != null);
    if (lastEma != null) {
      ctx.font = `bold ${7 * dpr}px Inter,sans-serif`;
      ctx.fillStyle = color + 'cc';
      ctx.textAlign = 'right';
      ctx.fillText(`E${period}`, toX(n - 1) - 2 * dpr, toY(lastEma) - 3 * dpr);
    }
  }

  // ── EMA Cross Signal Arrows ────────────────────────────────────────────────
  if (activeIndicators.has('ema20') && activeIndicators.has('ema50') && data.length >= 52) {
    const e20 = _getOverlayCalc('ema20', data, () => calcEMA(closes, 20));
    const e50 = _getOverlayCalc('ema50', data, () => calcEMA(closes, 50));
    ctx.save();
    for (let i = 51; i < n; i++) {
      if (e20[i] == null || e50[i] == null || e20[i-1] == null || e50[i-1] == null) continue;
      const goldCross = e20[i-1] <= e50[i-1] && e20[i] > e50[i];
      const deathCross = e20[i-1] >= e50[i-1] && e20[i] < e50[i];
      if (!goldCross && !deathCross) continue;
      const x = toX(i);
      const crossY = toY((e20[i] + e50[i]) / 2);
      if (goldCross) {
        ctx.fillStyle = '#10b981';
        const ty = crossY + 14 * dpr;
        ctx.beginPath(); ctx.moveTo(x - 5*dpr, ty); ctx.lineTo(x + 5*dpr, ty); ctx.lineTo(x, ty - 8*dpr); ctx.closePath(); ctx.fill();
      } else {
        ctx.fillStyle = '#ef4444';
        const ty = crossY - 14 * dpr;
        ctx.beginPath(); ctx.moveTo(x - 5*dpr, ty); ctx.lineTo(x + 5*dpr, ty); ctx.lineTo(x, ty + 8*dpr); ctx.closePath(); ctx.fill();
      }
    }
    ctx.restore();
  }

  // Bollinger Bands
  if (activeIndicators.has('bb')) {
    const bb = _getOverlayCalc('bb', data, () => calcBollingerBands(closes));
    const drawBand = (vals, color, dashed) => {
      ctx.beginPath();
      ctx.strokeStyle = color; ctx.lineWidth = dpr;
      ctx.setLineDash(dashed ? [3 * dpr, 3 * dpr] : []);
      let s = false;
      for (let i = 0; i < n; i++) {
        if (vals[i] == null) continue;
        const x = toX(i), y = toY(vals[i]);
        if (!s) { ctx.moveTo(x, y); s = true; } else ctx.lineTo(x, y);
      }
      ctx.stroke(); ctx.setLineDash([]);
    };
    drawBand(bb.upper, 'rgba(148,163,184,0.55)', false);
    drawBand(bb.mid,   'rgba(148,163,184,0.35)', true);
    drawBand(bb.lower, 'rgba(148,163,184,0.55)', false);
    // Band fill
    const fv = bb.upper.findIndex(v => v != null);
    if (fv >= 0) {
      ctx.beginPath();
      for (let i = fv; i < n; i++) {
        if (bb.upper[i] == null) continue;
        i === fv ? ctx.moveTo(toX(i), toY(bb.upper[i])) : ctx.lineTo(toX(i), toY(bb.upper[i]));
      }
      for (let i = n - 1; i >= fv; i--) {
        if (bb.lower[i] == null) continue;
        ctx.lineTo(toX(i), toY(bb.lower[i]));
      }
      ctx.closePath();
      ctx.fillStyle = 'rgba(148,163,184,0.06)';
      ctx.fill();
    }
  }

  // ── VWAP (Volume Weighted Average Price) ─────────────────────────────────
  if (activeIndicators.has('vwap')) {
    const vols = data.map(d => d.volume || 0);
    if (vols.some(v => v > 0)) {
      let cumPV = 0, cumV = 0;
      const vwapVals = data.map(d => {
        const typical = ((d.high || d.close) + (d.low || d.close) + d.close) / 3;
        const vol = d.volume || 0;
        cumPV += typical * vol;
        cumV  += vol;
        return cumV > 0 ? cumPV / cumV : null;
      });
      ctx.beginPath();
      ctx.strokeStyle = '#e879f9';
      ctx.lineWidth   = 1.5 * dpr;
      ctx.setLineDash([5 * dpr, 3 * dpr]);
      let sv = false;
      for (let i = 0; i < n; i++) {
        if (vwapVals[i] == null) continue;
        const x = toX(i), y = toY(vwapVals[i]);
        if (!sv) { ctx.moveTo(x, y); sv = true; } else ctx.lineTo(x, y);
      }
      ctx.stroke(); ctx.setLineDash([]);
      const lastVwap = vwapVals.slice().reverse().find(v => v != null);
      if (lastVwap != null) {
        ctx.font      = `bold ${7 * dpr}px Inter, sans-serif`;
        ctx.fillStyle = 'rgba(232,121,249,0.85)';
        ctx.textAlign = 'right';
        ctx.fillText('VWAP', toX(n - 1) - 2 * dpr, toY(lastVwap) - 3 * dpr);
      }
    }
  }

  // ── Fibonacci Retracement ─────────────────────────────────────────────────
  if (activeIndicators.has('fib')) {
    const highs   = data.map(d => d.high  || d.close);
    const lows    = data.map(d => d.low   || d.close);
    const fibHigh = Math.max(...highs);
    const fibLow  = Math.min(...lows);
    const fibRng  = fibHigh - fibLow || 1;
    const FIB_LEVELS = [
      [0,     'rgba(16,185,129,0.75)',  '0%'],
      [0.236, 'rgba(148,163,184,0.60)', '23.6%'],
      [0.382, 'rgba(59,130,246,0.70)',  '38.2%'],
      [0.500, 'rgba(245,158,11,0.80)',  '50%'],
      [0.618, 'rgba(59,130,246,0.70)',  '61.8%'],
      [0.786, 'rgba(148,163,184,0.60)', '78.6%'],
      [1,     'rgba(239,68,68,0.75)',   '100%'],
    ];
    const x0 = toX(0), x1 = toX(n - 1);
    for (const [level, color, label] of FIB_LEVELS) {
      const price = fibHigh - fibRng * level;
      const y = toY(price);
      ctx.beginPath(); ctx.strokeStyle = color; ctx.lineWidth = dpr;
      ctx.setLineDash([3 * dpr, 5 * dpr]);
      ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.stroke();
      ctx.setLineDash([]);
      ctx.font      = `bold ${6.5 * dpr}px Inter, sans-serif`;
      ctx.fillStyle = color;
      ctx.textAlign = 'right';
      ctx.fillText(label, x1 - 3 * dpr, y - 2 * dpr);
    }
  }

  // ── Parabolic SAR ─────────────────────────────────────────────────────────
  if (activeIndicators.has('psar')) {
    const psarData = _getOverlayCalc('psar', data, () => calcParabolicSAR(data));
    if (psarData) {
      const dotR = 2 * dpr;
      ctx.save();
      // Draw PSAR dots
      for (let i = 0; i < psarData.length; i++) {
        if (psarData[i] == null) continue;
        const { sar, isUp } = psarData[i];
        const x = toX(i), y = toY(sar);
        ctx.beginPath();
        ctx.arc(x, y, dotR, 0, Math.PI * 2);
        ctx.fillStyle = isUp ? '#10b981' : '#ef4444';
        ctx.globalAlpha = 0.75;
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      // ── PSAR Crossover Signal Arrows ───────────────────────────────────
      for (let i = 1; i < psarData.length; i++) {
        if (!psarData[i] || !psarData[i - 1]) continue;
        const bullX = !psarData[i - 1].isUp && psarData[i].isUp;  // flipped to bullish
        const bearX = psarData[i - 1].isUp  && !psarData[i].isUp; // flipped to bearish
        if (!bullX && !bearX) continue;
        const bx  = toX(i);
        const sy  = toY(psarData[i].sar);
        const sz  = 5.5 * dpr;
        ctx.fillStyle = bullX ? 'rgba(16,185,129,0.95)' : 'rgba(239,68,68,0.95)';
        ctx.beginPath();
        if (bullX) {
          // Up arrow pointing upward, placed at SAR dot (below price)
          ctx.moveTo(bx, sy - sz * 1.8);
          ctx.lineTo(bx - sz, sy + sz * 0.2);
          ctx.lineTo(bx + sz, sy + sz * 0.2);
        } else {
          // Down arrow pointing downward, placed at SAR dot (above price)
          ctx.moveTo(bx, sy + sz * 1.8);
          ctx.lineTo(bx - sz, sy - sz * 0.2);
          ctx.lineTo(bx + sz, sy - sz * 0.2);
        }
        ctx.closePath(); ctx.fill();
      }
      ctx.restore();
    }
  }

  // ── Supertrend ────────────────────────────────────────────────────────────
  if (activeIndicators.has('supertrend')) {
    const stData = _getOverlayCalc('supertrend', data, () => calcSupertrend(data, 10, 3));
    if (stData) {
      ctx.save();
      let segStart = null, segIsUp = null;
      const drawSeg = (from, to, up) => {
        if (stData[from] == null || stData[to] == null) return;
        ctx.beginPath();
        ctx.strokeStyle = up ? 'rgba(16,185,129,0.80)' : 'rgba(239,68,68,0.80)';
        ctx.lineWidth = 2 * dpr;
        for (let k = from; k <= to; k++) {
          if (stData[k] == null) continue;
          k === from ? ctx.moveTo(toX(k), toY(stData[k].st))
                     : ctx.lineTo(toX(k), toY(stData[k].st));
        }
        ctx.stroke();
      };
      for (let i = 0; i < stData.length; i++) {
        if (stData[i] == null) continue;
        if (segIsUp === null) { segStart = i; segIsUp = stData[i].isUp; continue; }
        if (stData[i].isUp !== segIsUp) {
          drawSeg(segStart, i, segIsUp);
          segStart = i; segIsUp = stData[i].isUp;
        }
      }
      if (segStart !== null) drawSeg(segStart, stData.length - 1, segIsUp);
      const lastST = stData.slice().reverse().find(v => v != null);
      if (lastST) {
        ctx.font = `bold ${7 * dpr}px Inter,sans-serif`;
        ctx.fillStyle = lastST.isUp ? 'rgba(16,185,129,0.90)' : 'rgba(239,68,68,0.90)';
        ctx.textAlign = 'right';
        ctx.fillText('ST', toX(n - 1) - 2 * dpr, toY(lastST.st) - 3 * dpr);
      }
      ctx.restore();
    }
  }

  // ── Keltner Channels ──────────────────────────────────────────────────────
  if (activeIndicators.has('kc')) {
    const kc = _getOverlayCalc('kc', data, () => calcKeltnerChannels(data, 20, 14, 1.5));
    if (kc) {
      const drawKCLine = (vals, color, dashed) => {
        ctx.beginPath(); ctx.strokeStyle = color; ctx.lineWidth = dpr;
        ctx.setLineDash(dashed ? [4 * dpr, 3 * dpr] : []);
        let s = false;
        for (let i = 0; i < n; i++) {
          if (vals[i] == null) continue;
          const x = toX(i), y = toY(vals[i]);
          if (!s) { ctx.moveTo(x, y); s = true; } else ctx.lineTo(x, y);
        }
        ctx.stroke(); ctx.setLineDash([]);
      };
      drawKCLine(kc.upper, 'rgba(251,191,36,0.70)', true);
      drawKCLine(kc.mid,   'rgba(251,191,36,0.30)', false);
      drawKCLine(kc.lower, 'rgba(251,191,36,0.70)', true);
      // Band fill
      const fvKC = kc.upper.findIndex(v => v != null);
      if (fvKC >= 0) {
        ctx.beginPath();
        for (let i = fvKC; i < n; i++) {
          if (kc.upper[i] == null) continue;
          i === fvKC ? ctx.moveTo(toX(i), toY(kc.upper[i])) : ctx.lineTo(toX(i), toY(kc.upper[i]));
        }
        for (let i = n - 1; i >= fvKC; i--) {
          if (kc.lower[i] == null) continue;
          ctx.lineTo(toX(i), toY(kc.lower[i]));
        }
        ctx.closePath();
        ctx.fillStyle = 'rgba(251,191,36,0.05)'; ctx.fill();
      }
      // Right-edge label
      const lastKCUpp = kc.upper.slice().reverse().find(v => v != null);
      if (lastKCUpp != null) {
        ctx.font = `bold ${7 * dpr}px Inter,sans-serif`;
        ctx.fillStyle = 'rgba(251,191,36,0.80)';
        ctx.textAlign = 'right';
        ctx.fillText('KC', toX(n - 1) - 2 * dpr, toY(lastKCUpp) - 3 * dpr);
      }
    }
  }

  // ── HMA / DEMA / TEMA overlays ────────────────────────────────────────────
  const drawMALine = (values, color, label) => {
    if (!values) return;
    ctx.save();
    ctx.beginPath(); ctx.strokeStyle = color; ctx.lineWidth = 1.5 * dpr;
    let stM = false;
    for (let i = 0; i < data.length; i++) {
      if (values[i] == null) continue;
      const x = toX(i), y = toY(values[i]);
      if (!stM) { ctx.moveTo(x, y); stM = true; } else ctx.lineTo(x, y);
    }
    ctx.stroke();
    const last = values.slice().reverse().find(v => v != null);
    if (last != null) {
      ctx.font = `bold ${7 * dpr}px Inter,sans-serif`;
      ctx.fillStyle = color; ctx.textAlign = 'right';
      ctx.fillText(label, toX(data.length - 1) - 2 * dpr, toY(last) - 3 * dpr);
    }
    ctx.restore();
  };
  if (activeIndicators.has('hma')  && data.length >= 20) {
    const closes = data.map(d => d.close);
    drawMALine(_getOverlayCalc('hma', data, () => calcHMA(closes, 20)),  'rgba(168,85,247,0.85)', 'HMA20');
  }
  if (activeIndicators.has('dema') && data.length >= 20) {
    const closes = data.map(d => d.close);
    drawMALine(_getOverlayCalc('dema', data, () => calcDEMA(closes, 20)), 'rgba(52,211,153,0.85)',  'DEMA20');
  }
  if (activeIndicators.has('tema') && data.length >= 20) {
    const closes = data.map(d => d.close);
    drawMALine(_getOverlayCalc('tema', data, () => calcTEMA(closes, 20)), 'rgba(251,113,133,0.85)', 'TEMA20');
  }

  // ── Linear Regression Channel ─────────────────────────────────────────────
  if (activeIndicators.has('lr') && data.length >= 10) {
    const closes = data.map(d => d.close);
    const lr = _getOverlayCalc('lr', data, () => calcLinReg(closes));
    if (lr) {
      const { slope, intercept, stdDev } = lr;
      const nLR = data.length;
      ctx.save();
      // Fill band
      ctx.beginPath();
      for (let i = 0; i < nLR; i++) ctx.lineTo(toX(i), toY(slope * i + intercept + stdDev));
      for (let i = nLR - 1; i >= 0; i--) ctx.lineTo(toX(i), toY(slope * i + intercept - stdDev));
      ctx.closePath(); ctx.fillStyle = 'rgba(245,158,11,0.05)'; ctx.fill();
      // Central regression line (amber)
      ctx.beginPath(); ctx.strokeStyle = 'rgba(245,158,11,0.90)'; ctx.lineWidth = 1.5 * dpr;
      for (let i = 0; i < nLR; i++) {
        const x = toX(i), y = toY(slope * i + intercept);
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
      // +1σ channel (dashed amber)
      ctx.beginPath(); ctx.strokeStyle = 'rgba(245,158,11,0.40)';
      ctx.lineWidth = 1 * dpr; ctx.setLineDash([5 * dpr, 3 * dpr]);
      for (let i = 0; i < nLR; i++) {
        const x = toX(i), y = toY(slope * i + intercept + stdDev);
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
      // -1σ channel (dashed amber)
      ctx.beginPath();
      for (let i = 0; i < nLR; i++) {
        const x = toX(i), y = toY(slope * i + intercept - stdDev);
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke(); ctx.setLineDash([]);
      // Right-edge label
      const lastLRY = slope * (nLR - 1) + intercept;
      ctx.font = `bold ${7 * dpr}px Inter,sans-serif`;
      ctx.fillStyle = 'rgba(245,158,11,0.85)';
      ctx.textAlign = 'right';
      ctx.fillText('LR', toX(nLR - 1) - 2 * dpr, toY(lastLRY) - 3 * dpr);
      ctx.restore();
    }
  }

  // ── Ichimoku Cloud ────────────────────────────────────────────────────────
  if (activeIndicators.has('ichi') && data.length >= 52) {
    const ich = _getOverlayCalc('ichi', data, () => calcIchimoku(data));
    if (ich) {
      const { tenkan, kijun, spanA, spanB, chikou } = ich;
      ctx.save();
      const nI = data.length;
      // Cloud fill (Senkou A vs B displaced +26)
      for (let i = 0; i < nI - 26; i++) {
        const a = spanA[i], b = spanB[i];
        if (a == null || b == null) continue;
        const xL = toX(i + 26);
        const xR = toX(Math.min(i + 27, nI - 1));
        ctx.fillStyle = a >= b ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.12)';
        ctx.beginPath();
        ctx.moveTo(xL, toY(a)); ctx.lineTo(xR, toY(a));
        ctx.lineTo(xR, toY(b)); ctx.lineTo(xL, toY(b));
        ctx.closePath(); ctx.fill();
      }
      // Tenkan-sen (red thin)
      ctx.beginPath(); ctx.strokeStyle = 'rgba(239,68,68,0.85)'; ctx.lineWidth = 1 * dpr;
      let stI = false;
      for (let i = 0; i < nI; i++) {
        if (tenkan[i] == null) continue;
        const x = toX(i), y = toY(tenkan[i]);
        if (!stI) { ctx.moveTo(x, y); stI = true; } else ctx.lineTo(x, y);
      }
      ctx.stroke();
      // Kijun-sen (blue thin)
      ctx.beginPath(); ctx.strokeStyle = 'rgba(59,130,246,0.85)'; ctx.lineWidth = 1 * dpr;
      stI = false;
      for (let i = 0; i < nI; i++) {
        if (kijun[i] == null) continue;
        const x = toX(i), y = toY(kijun[i]);
        if (!stI) { ctx.moveTo(x, y); stI = true; } else ctx.lineTo(x, y);
      }
      ctx.stroke();
      // Chikou span (purple dotted, shifted back 26 bars)
      ctx.beginPath(); ctx.strokeStyle = 'rgba(167,139,250,0.70)';
      ctx.lineWidth = 1 * dpr; ctx.setLineDash([3 * dpr, 3 * dpr]);
      stI = false;
      for (let i = 26; i < nI; i++) {
        if (chikou[i] == null) continue;
        const x = toX(i - 26), y = toY(chikou[i]);
        if (!stI) { ctx.moveTo(x, y); stI = true; } else ctx.lineTo(x, y);
      }
      ctx.stroke(); ctx.setLineDash([]);
      ctx.restore();
    }
  }

  // ── Donchian Channels ─────────────────────────────────────────────────────
  if (activeIndicators.has('donchian') && data.length >= 20) {
    const dc = _getOverlayCalc('donchian', data, () => calcDonchian(data, 20));
    ctx.save();
    const nD = data.length;
    // Cloud fill between upper and lower
    ctx.beginPath();
    let startedDC = false;
    for (let i = 0; i < nD; i++) {
      if (dc.upper[i] == null) continue;
      if (!startedDC) { ctx.moveTo(toX(i), toY(dc.upper[i])); startedDC = true; }
      else ctx.lineTo(toX(i), toY(dc.upper[i]));
    }
    for (let i = nD - 1; i >= 0; i--) {
      if (dc.lower[i] == null) continue;
      ctx.lineTo(toX(i), toY(dc.lower[i]));
    }
    ctx.closePath();
    ctx.fillStyle = 'rgba(99,102,241,0.07)';
    ctx.fill();
    // Upper band (indigo dashed)
    ctx.beginPath(); ctx.strokeStyle = 'rgba(99,102,241,0.75)';
    ctx.lineWidth = 1 * dpr; ctx.setLineDash([4 * dpr, 3 * dpr]);
    let stD = false;
    for (let i = 0; i < nD; i++) {
      if (dc.upper[i] == null) continue;
      const x = toX(i), y = toY(dc.upper[i]);
      if (!stD) { ctx.moveTo(x, y); stD = true; } else ctx.lineTo(x, y);
    }
    ctx.stroke();
    // Mid band (faint)
    ctx.beginPath(); ctx.strokeStyle = 'rgba(99,102,241,0.35)';
    ctx.lineWidth = 0.8 * dpr; stD = false;
    for (let i = 0; i < nD; i++) {
      if (dc.mid[i] == null) continue;
      const x = toX(i), y = toY(dc.mid[i]);
      if (!stD) { ctx.moveTo(x, y); stD = true; } else ctx.lineTo(x, y);
    }
    ctx.stroke();
    // Lower band (indigo dashed)
    ctx.beginPath(); ctx.strokeStyle = 'rgba(99,102,241,0.75)';
    ctx.lineWidth = 1 * dpr; stD = false;
    for (let i = 0; i < nD; i++) {
      if (dc.lower[i] == null) continue;
      const x = toX(i), y = toY(dc.lower[i]);
      if (!stD) { ctx.moveTo(x, y); stD = true; } else ctx.lineTo(x, y);
    }
    ctx.stroke(); ctx.setLineDash([]);
    // Right-edge label
    const lastDCU = dc.upper.slice().reverse().find(v => v != null);
    if (lastDCU != null) {
      ctx.font = `bold ${7 * dpr}px Inter,sans-serif`;
      ctx.fillStyle = 'rgba(99,102,241,0.80)';
      ctx.textAlign = 'right';
      ctx.fillText('DC20', toX(nD - 1) - 2 * dpr, toY(lastDCU) - 3 * dpr);
    }
    ctx.restore();
  }

  // ── Pivot Points (Classic Daily) ──────────────────────────────────────────
  if (activeIndicators.has('pivots') && data.length >= 2) {
    const ref = data[data.length - 1];
    const H   = ref.high  || ref.close;
    const L   = ref.low   || ref.close;
    const C   = ref.close;
    const P   = (H + L + C) / 3;
    const R1  = 2 * P - L;
    const S1  = 2 * P - H;
    const R2  = P + (H - L);
    const S2  = P - (H - L);
    const pivotDefs = [
      { val: R2, label: 'R2', color: 'rgba(239,68,68,0.75)' },
      { val: R1, label: 'R1', color: 'rgba(239,68,68,0.55)' },
      { val: P,  label: 'P',  color: 'rgba(148,163,184,0.70)' },
      { val: S1, label: 'S1', color: 'rgba(16,185,129,0.55)' },
      { val: S2, label: 'S2', color: 'rgba(16,185,129,0.75)' },
    ];
    ctx.save();
    const x0p = toX(0), x1p = toX(n - 1);
    for (const { val, label, color } of pivotDefs) {
      const y = toY(val);
      ctx.strokeStyle = color;
      ctx.lineWidth = dpr;
      ctx.setLineDash([4 * dpr, 4 * dpr]);
      ctx.beginPath(); ctx.moveTo(x0p, y); ctx.lineTo(x1p, y); ctx.stroke();
      ctx.setLineDash([]);
      ctx.font = `bold ${6.5 * dpr}px Inter, sans-serif`;
      ctx.fillStyle = color; ctx.textAlign = 'left';
      ctx.fillText(label, pL + 3 * dpr, y - 2 * dpr);
    }
    ctx.restore();
  }

  // ── Auto Support/Resistance Levels ────────────────────────────────────────
  if (activeIndicators.has('autosr') && data.length >= 20) {
    try {
      const WIN = 4;
      const n = data.length;
      const srLevels = [];
      for (let i = WIN; i < n - WIN; i++) {
        const hi = data[i].high || data[i].close;
        const lo = data[i].low  || data[i].close;
        let isPeak = true, isTrough = true;
        for (let j = i - WIN; j <= i + WIN; j++) {
          if (j === i) continue;
          if ((data[j].high || data[j].close) >= hi) isPeak   = false;
          if ((data[j].low  || data[j].close) <= lo) isTrough = false;
        }
        if (isPeak)   srLevels.push({ val: hi, type: 'res' });
        if (isTrough) srLevels.push({ val: lo, type: 'sup' });
      }
      // Deduplicate within 0.3% price range and draw max 10 levels
      const priceSpan = Math.max(...data.map(d => d.high || d.close)) -
                        Math.min(...data.map(d => d.low  || d.close));
      const minGap = priceSpan * 0.003;
      const drawn = [];
      for (const lvl of srLevels.slice(-30).reverse()) {
        if (drawn.some(v => Math.abs(v - lvl.val) < minGap)) continue;
        drawn.push(lvl.val);
        const y = toY(lvl.val);
        ctx.beginPath();
        ctx.strokeStyle = lvl.type === 'res' ? 'rgba(239,68,68,0.38)' : 'rgba(16,185,129,0.38)';
        ctx.lineWidth = 0.8 * dpr; ctx.setLineDash([4 * dpr, 4 * dpr]);
        ctx.moveTo(toX(0), y); ctx.lineTo(toX(n - 1), y);
        ctx.stroke(); ctx.setLineDash([]);
        ctx.font = `${6.5 * dpr}px Inter,sans-serif`;
        ctx.fillStyle = lvl.type === 'res' ? 'rgba(239,68,68,0.65)' : 'rgba(16,185,129,0.65)';
        ctx.textAlign = 'right';
        ctx.fillText(lvl.val.toFixed(2), toX(n - 1) - 3 * dpr, y - 2 * dpr);
        if (drawn.length >= 10) break;
      }
    } catch (_) {}
  }

  // ── Auto Trendlines — connects swing highs (resistance) and lows (support) (v2.52) ─
  if (activeIndicators.has('trendlines') && data.length >= 20) {
    try {
      const WIN = 3;
      const n = data.length;
      const swingHighs = [], swingLows = [];
      for (let i = WIN; i < n - WIN; i++) {
        const hi = data[i].high  || data[i].close;
        const lo = data[i].low   || data[i].close;
        let isPeak = true, isTrough = true;
        for (let j = i - WIN; j <= i + WIN; j++) {
          if (j === i) continue;
          if ((data[j].high || data[j].close) >= hi) isPeak   = false;
          if ((data[j].low  || data[j].close) <= lo) isTrough = false;
        }
        if (isPeak)   swingHighs.push({ i, val: hi });
        if (isTrough) swingLows.push({ i, val: lo });
      }
      ctx.save();
      ctx.setLineDash([6 * dpr, 3 * dpr]);
      // Resistance: last 2 swing highs
      if (swingHighs.length >= 2) {
        const [p1, p2] = swingHighs.slice(-2);
        const x1 = toX(p1.i), y1 = toY(p1.val);
        const x2 = toX(p2.i), y2 = toY(p2.val);
        // Extend to right edge
        const slope = (y2 - y1) / Math.max(1, x2 - x1);
        const xR = toX(n - 1);
        const yR = y2 + slope * (xR - x2);
        ctx.strokeStyle = 'rgba(239,68,68,0.55)';
        ctx.lineWidth = 1.5 * dpr;
        ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(xR, yR); ctx.stroke();
        // Label
        ctx.setLineDash([]);
        ctx.font = `${7 * dpr}px Inter,sans-serif`;
        ctx.fillStyle = 'rgba(239,68,68,0.7)';
        ctx.textAlign = 'right';
        ctx.fillText('R-TL', xR - 4 * dpr, yR - 4 * dpr);
      }
      // Support: last 2 swing lows
      if (swingLows.length >= 2) {
        const [p1, p2] = swingLows.slice(-2);
        const x1 = toX(p1.i), y1 = toY(p1.val);
        const x2 = toX(p2.i), y2 = toY(p2.val);
        const slope = (y2 - y1) / Math.max(1, x2 - x1);
        const xR = toX(n - 1);
        const yR = y2 + slope * (xR - x2);
        ctx.strokeStyle = 'rgba(52,211,153,0.55)';
        ctx.lineWidth = 1.5 * dpr;
        ctx.setLineDash([6 * dpr, 3 * dpr]);
        ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(xR, yR); ctx.stroke();
        ctx.setLineDash([]);
        ctx.font = `${7 * dpr}px Inter,sans-serif`;
        ctx.fillStyle = 'rgba(52,211,153,0.7)';
        ctx.textAlign = 'right';
        ctx.fillText('S-TL', xR - 4 * dpr, yR + 10 * dpr);
      }
      ctx.restore();
    } catch (_) {}
  }

  // ── Alert Price Lines ─────────────────────────────────────────────────────
  if (typeof selectedChartSym !== 'undefined' && selectedChartSym &&
      typeof watchlistItems !== 'undefined' && watchlistItems.length > 0) {
    const wlItem = watchlistItems.find(i => i.symbol === selectedChartSym.symbol);
    if (wlItem) {
      const alertLevels = [];
      if (wlItem.alertAbove != null) alertLevels.push({ val: wlItem.alertAbove, dir: 'above', color: '#10b981' });
      if (wlItem.alertBelow != null) alertLevels.push({ val: wlItem.alertBelow, dir: 'below', color: '#ef4444' });
      if (alertLevels.length > 0) {
        ctx.save();
        ctx.lineWidth = 1.2 * dpr;
        const x0a = toX(0), x1a = toX(n - 1);
        for (const { val, dir, color } of alertLevels) {
          const y = toY(val);
          ctx.strokeStyle = color;
          ctx.globalAlpha = 0.50;
          ctx.setLineDash([6 * dpr, 3 * dpr]);
          ctx.beginPath(); ctx.moveTo(x0a, y); ctx.lineTo(x1a, y); ctx.stroke();
          ctx.setLineDash([]); ctx.globalAlpha = 1;
          ctx.font = `bold ${6.5 * dpr}px Inter, sans-serif`;
          ctx.fillStyle = color; ctx.textAlign = 'left';
          ctx.fillText(`ALERT ${dir === 'above' ? '↑' : '↓'}`, pL + 3 * dpr, y - 2 * dpr);
        }
        ctx.restore();
      }
    }
  }

  // ── Analyst Price Target line (v2.53) ─────────────────────────────────────
  if (typeof selectedChartSym !== 'undefined' && selectedChartSym) {
    const target = _analystTargets[selectedChartSym.symbol];
    if (target && target > 0) {
      const priceRange = data.length > 0
        ? Math.max(...data.map(d => d.high || d.close)) - Math.min(...data.map(d => d.low || d.close))
        : 0;
      // Only draw if target is within 50% of chart's price range (avoids off-screen lines)
      const midPrice = data.length > 0 ? data[Math.floor(data.length / 2)].close : target;
      if (Math.abs(target - midPrice) / Math.max(1, midPrice) < 0.5) {
        const y = toY(target);
        ctx.save();
        ctx.strokeStyle = 'rgba(167,139,250,0.65)';  // purple-400
        ctx.lineWidth   = 1.5 * dpr;
        ctx.setLineDash([8 * dpr, 4 * dpr]);
        ctx.beginPath(); ctx.moveTo(toX(0), y); ctx.lineTo(toX(n - 1), y); ctx.stroke();
        ctx.setLineDash([]);
        // Label pill at right edge
        ctx.font = `bold ${6.5 * dpr}px Inter,sans-serif`;
        const lbl = `TARGET ${target.toFixed(2)}`;
        const lw = ctx.measureText(lbl).width + 10 * dpr;
        ctx.fillStyle = 'rgba(139,92,246,0.7)';
        roundRect(ctx, toX(n - 1) - lw - 2 * dpr, y - 8 * dpr, lw, 13 * dpr, 3 * dpr);
        ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.textAlign = 'right';
        ctx.fillText(lbl, toX(n - 1) - 5 * dpr, y + 2 * dpr);
        ctx.restore();
      }
    }
  }

  // ── Rolling 20-bar High/Low Lines (v2.57) — always shown, no toggle ───────
  if (data.length >= 5) {
    try {
      const WIN20 = Math.min(20, data.length);
      const slice20 = data.slice(data.length - WIN20);
      const hi20 = Math.max(...slice20.map(d => d.high || d.close));
      const lo20 = Math.min(...slice20.map(d => d.low  || d.close));
      const hiY = toY(hi20), loY = toY(lo20);
      ctx.save();
      ctx.lineWidth = 1 * dpr;
      ctx.globalAlpha = 0.45;
      const xL = toX(0), xR = toX(n - 1);
      // 20-bar High — purple dotted
      ctx.strokeStyle = '#a78bfa';
      ctx.setLineDash([3 * dpr, 4 * dpr]);
      ctx.beginPath(); ctx.moveTo(xL, hiY); ctx.lineTo(xR, hiY); ctx.stroke();
      ctx.setLineDash([]);
      ctx.globalAlpha = 0.7;
      ctx.font = `bold ${6.5 * dpr}px Inter,sans-serif`;
      ctx.fillStyle = '#a78bfa'; ctx.textAlign = 'right';
      ctx.fillText(`20H`, xR - 2 * dpr, hiY - 3 * dpr);
      // 20-bar Low — cyan dotted
      ctx.globalAlpha = 0.45;
      ctx.strokeStyle = '#22d3ee';
      ctx.setLineDash([3 * dpr, 4 * dpr]);
      ctx.beginPath(); ctx.moveTo(xL, loY); ctx.lineTo(xR, loY); ctx.stroke();
      ctx.setLineDash([]);
      ctx.globalAlpha = 0.7;
      ctx.fillStyle = '#22d3ee'; ctx.textAlign = 'right';
      ctx.fillText(`20L`, xR - 2 * dpr, loY + 10 * dpr);
      ctx.restore();
    } catch (_) {}
  }

  // ── v2.67: Price Projection Line (linear regression extrapolation) ────────
  if (activeIndicators.has('proj') && data.length >= 8) {
    try {
      const LOOK = Math.min(20, Math.floor(n * 0.4));
      const slice = closes.slice(-LOOK);
      let sx = 0, sy = 0, sxy = 0, sx2 = 0, sl = slice.length;
      for (let i = 0; i < sl; i++) { sx += i; sy += slice[i]; sxy += i * slice[i]; sx2 += i * i; }
      const det = sl * sx2 - sx * sx;
      if (Math.abs(det) < 1e-10) { /* skip */ }
      else {
        const slope = (sl * sxy - sx * sy) / det;
        const inter = (sy - slope * sx) / sl;
        const projBars = Math.round(n * 0.15); // project 15% of visible bars forward
        const startIdx = n - LOOK;
        const regLine = closes.map((_, i) => {
          const j = i - startIdx;
          return j >= 0 ? inter + slope * j : null;
        });
        // Draw regression fit line (faint)
        ctx.save();
        ctx.strokeStyle = 'rgba(148,163,184,0.25)';
        ctx.lineWidth = 1 * dpr; ctx.setLineDash([]);
        ctx.beginPath();
        let started = false;
        regLine.forEach((v, i) => {
          if (v == null) return;
          const px = toX(i), py = toY(v);
          if (!started) { ctx.moveTo(px, py); started = true; }
          else ctx.lineTo(px, py);
        });
        ctx.stroke();
        // Draw projection forward
        const lastClose = closes[n - 1];
        const lastRegVal = inter + slope * (n - 1 - startIdx);
        ctx.strokeStyle = slope >= 0 ? 'rgba(52,211,153,0.55)' : 'rgba(248,113,113,0.55)';
        ctx.lineWidth = 1.5 * dpr; ctx.setLineDash([4 * dpr, 3 * dpr]);
        ctx.beginPath();
        ctx.moveTo(toX(n - 1), toY(lastClose));
        const endPrice = lastRegVal + slope * projBars;
        const endX = toX(n - 1) + (projBars / (n - 1)) * (toX(n - 1) - toX(0));
        ctx.lineTo(Math.min(endX, pR ? (ctx.canvas.width / dpr) - pR - 4 : endX), toY(endPrice));
        ctx.stroke();
        ctx.setLineDash([]);
        // Label
        ctx.globalAlpha = 0.7;
        ctx.font = `bold ${7 * dpr}px "Segoe UI Variable", sans-serif`;
        ctx.fillStyle = slope >= 0 ? '#34d399' : '#f87171';
        ctx.textAlign = 'right';
        ctx.fillText('PROJ', toX(n - 1) - 2 * dpr, toY(lastClose) - 5 * dpr);
        ctx.restore();
      }
    } catch (_) {}
  }
}

// ── Volume Profile (Visible Range) ──────────────────────────────────────────
function drawVolumeProfile(ctx, data, toY, dpr, W, pL, pR) {
  if (!activeIndicators.has('vp') || !data || data.length < 5) return;
  const BINS  = 30;
  const highs = data.map(d => d.high  || d.close);
  const lows  = data.map(d => d.low   || d.close);
  const vols  = data.map(d => d.volume || 0);
  if (vols.every(v => v === 0)) return;
  const pMin = Math.min(...lows);
  const pMax = Math.max(...highs);
  const pRng = pMax - pMin || 1;
  const bins = new Array(BINS).fill(0);
  for (let i = 0; i < data.length; i++) {
    const mid = ((data[i].high || data[i].close) + (data[i].low || data[i].close)) / 2;
    const bi  = Math.min(BINS - 1, Math.floor((mid - pMin) / pRng * BINS));
    bins[bi] += vols[i];
  }
  const maxVol = Math.max(...bins);
  const pocIdx = bins.indexOf(maxVol);
  if (maxVol === 0) return;
  const maxBarW = (W - pL - pR) * 0.14;
  for (let i = 0; i < BINS; i++) {
    if (!bins[i]) continue;
    const barW = (bins[i] / maxVol) * maxBarW;
    const yTop = toY(pMin + ((i + 1) / BINS) * pRng);
    const yBtm = toY(pMin + (i / BINS) * pRng);
    ctx.fillStyle = i === pocIdx ? 'rgba(250,204,21,0.40)' : 'rgba(148,163,184,0.16)';
    ctx.fillRect(W - pR - barW, yTop, barW, Math.max(1, yBtm - yTop));
  }
  // POC dashed line + label
  const pocY = toY(pMin + (pocIdx + 0.5) / BINS * pRng);
  ctx.save();
  ctx.strokeStyle = 'rgba(250,204,21,0.60)';
  ctx.lineWidth   = dpr;
  ctx.setLineDash([3 * dpr, 3 * dpr]);
  ctx.beginPath(); ctx.moveTo(pL, pocY); ctx.lineTo(W - pR, pocY); ctx.stroke();
  ctx.setLineDash([]);
  ctx.font      = `bold ${7.5 * dpr}px Inter, sans-serif`;
  ctx.fillStyle = 'rgba(250,204,21,0.90)';
  ctx.textAlign = 'right';
  ctx.fillText('POC', pL - 2 * dpr, pocY + 2.5 * dpr);
  ctx.restore();
}

// ── Comparison Chart ─────────────────────────────────────────────────────────
function drawCompareChart(canvas, primaryData, primarySym, cmpMap) {
  if (!canvas || !primaryData || primaryData.length < 2) return;
  const dpr = window.devicePixelRatio || 1;
  canvas.width  = canvas.offsetWidth  * dpr;
  canvas.height = canvas.offsetHeight * dpr;
  const W = canvas.width, H = canvas.height;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, W, H);

  const pL = 60 * dpr, pR = 96 * dpr, pT = 10 * dpr, pB = 26 * dpr;
  const cW = W - pL - pR, cH = H - pT - pB;

  // Build series list
  const primaryColor = primaryData[primaryData.length - 1].close >= primaryData[0].close
    ? '#10b981' : '#ef4444';
  const allSeries = [
    { label: primarySym.id.toUpperCase(), color: primaryColor, data: primaryData },
    ...compareSyms.map((s, i) => ({
      label: s.id.toUpperCase(), color: COMPARE_COLORS[i], data: cmpMap[s.symbol] || []
    }))
  ].filter(s => s.data.length >= 2);

  // Normalize to % from first close
  const norm = allSeries.map(s => ({
    ...s,
    pcts: s.data.map(d => (d.close / s.data[0].close - 1) * 100)
  }));

  const allPcts = norm.flatMap(s => s.pcts);
  const minP = Math.min(...allPcts), maxP = Math.max(...allPcts);
  const rng  = maxP - minP || 1;
  const aPmin = minP - rng * 0.06, aPmax = maxP + rng * 0.06, aPrng = aPmax - aPmin;
  const toY  = p => pT + cH - ((p - aPmin) / aPrng) * cH;

  const cc = getChartColors();

  // Grid + % labels
  for (let i = 0; i <= 5; i++) {
    const y = pT + (cH / 5) * i;
    const p = aPmax - (aPrng / 5) * i;
    ctx.strokeStyle = cc.grid; ctx.lineWidth = 1; ctx.setLineDash([]);
    ctx.beginPath(); ctx.moveTo(pL, y); ctx.lineTo(W - pR, y); ctx.stroke();
    ctx.fillStyle = cc.label;
    ctx.font = `${9.5 * dpr}px "Segoe UI Variable", sans-serif`;
    ctx.textAlign = 'right';
    ctx.fillText(`${p >= 0 ? '+' : ''}${p.toFixed(2)}%`, pL - 5 * dpr, y + 3.5 * dpr);
  }

  // Zero line
  const zeroY = toY(0);
  ctx.strokeStyle = 'rgba(148,163,184,0.22)'; ctx.lineWidth = dpr;
  ctx.setLineDash([4 * dpr, 4 * dpr]);
  ctx.beginPath(); ctx.moveTo(pL, zeroY); ctx.lineTo(W - pR, zeroY); ctx.stroke();
  ctx.setLineDash([]);

  // Draw series lines + gradient fills
  for (const { color, pcts, data } of norm) {
    const n = pcts.length;
    const toX = i => pL + (i / (n - 1)) * cW;

    // Gradient fill
    const grad = ctx.createLinearGradient(0, pT, 0, pT + cH);
    grad.addColorStop(0,   color + '28');
    grad.addColorStop(1,   color + '00');
    ctx.beginPath();
    ctx.moveTo(toX(0), toY(pcts[0]));
    for (let i = 1; i < n; i++) ctx.lineTo(toX(i), toY(pcts[i]));
    ctx.lineTo(toX(n - 1), pT + cH);
    ctx.lineTo(toX(0),     pT + cH);
    ctx.closePath();
    ctx.fillStyle = grad; ctx.fill();

    // Line
    ctx.beginPath(); ctx.strokeStyle = color; ctx.lineWidth = 2 * dpr;
    ctx.lineJoin = 'round'; ctx.setLineDash([]);
    ctx.moveTo(toX(0), toY(pcts[0]));
    for (let i = 1; i < n; i++) ctx.lineTo(toX(i), toY(pcts[i]));
    ctx.stroke();

    // End dot
    const lx = toX(n - 1), ly = toY(pcts[n - 1]);
    ctx.beginPath(); ctx.arc(lx, ly, 3.5 * dpr, 0, Math.PI * 2);
    ctx.fillStyle = color; ctx.fill();
  }

  // Legend (right panel) — v2.72 enhanced with mini sparklines
  norm.forEach(({ label, color, pcts }, i) => {
    const lastPct = pcts[pcts.length - 1];
    const ry  = pT + i * 40 * dpr;
    const lx  = W - pR + 5 * dpr;
    const lW  = pR - 10 * dpr;
    // Swatch
    ctx.fillStyle = color;
    ctx.fillRect(lx, ry + 3 * dpr, 7 * dpr, 7 * dpr);
    // Label
    ctx.font = `bold ${8.5 * dpr}px Inter, sans-serif`;
    ctx.fillStyle = color;
    ctx.textAlign = 'left';
    ctx.fillText(label, lx + 11 * dpr, ry + 11 * dpr);
    // Pct
    ctx.font = `bold ${8 * dpr}px Inter, sans-serif`;
    ctx.fillStyle = lastPct >= 0 ? '#10b981' : '#ef4444';
    ctx.fillText(`${lastPct >= 0 ? '+' : ''}${lastPct.toFixed(2)}%`,
                 lx + 11 * dpr, ry + 22 * dpr);
    // Mini sparkline
    if (pcts.length >= 4) {
      const spData = pcts.slice(-Math.min(pcts.length, 40));
      const spY = ry + 26 * dpr;
      const spH = 11 * dpr;
      const mn = Math.min(...spData), mx = Math.max(...spData);
      const rng = mx - mn || 0.01;
      const toSx = j => lx + (j / (spData.length - 1)) * lW;
      const toSy = v => spY + spH - ((v - mn) / rng) * spH;
      // Fill
      const spGrad = ctx.createLinearGradient(0, spY, 0, spY + spH);
      spGrad.addColorStop(0, color + '30'); spGrad.addColorStop(1, color + '00');
      ctx.beginPath();
      ctx.moveTo(toSx(0), toSy(spData[0]));
      for (let j = 1; j < spData.length; j++) ctx.lineTo(toSx(j), toSy(spData[j]));
      ctx.lineTo(toSx(spData.length - 1), spY + spH);
      ctx.lineTo(toSx(0), spY + spH);
      ctx.closePath();
      ctx.fillStyle = spGrad; ctx.fill();
      // Line
      ctx.beginPath(); ctx.strokeStyle = color; ctx.lineWidth = 1.5 * dpr;
      ctx.lineJoin = 'round'; ctx.setLineDash([]);
      ctx.moveTo(toSx(0), toSy(spData[0]));
      for (let j = 1; j < spData.length; j++) ctx.lineTo(toSx(j), toSy(spData[j]));
      ctx.stroke();
      // Zero baseline when visible
      if (mn <= 0 && mx >= 0) {
        const zy = toSy(0);
        ctx.strokeStyle = 'rgba(148,163,184,0.22)'; ctx.lineWidth = dpr; ctx.setLineDash([2 * dpr, 2 * dpr]);
        ctx.beginPath(); ctx.moveTo(lx, zy); ctx.lineTo(lx + lW, zy); ctx.stroke();
        ctx.setLineDash([]);
      }
      // Endpoint dot
      ctx.beginPath(); ctx.arc(toSx(spData.length - 1), toSy(spData[spData.length - 1]), 2 * dpr, 0, Math.PI * 2);
      ctx.fillStyle = color; ctx.fill();
    }
  });

  // Time labels
  const n0 = norm[0]?.data.length || 1;
  const toX0 = i => pL + (i / (n0 - 1)) * cW;
  const step = Math.max(1, Math.floor(n0 / 6));
  ctx.fillStyle = cc.label;
  ctx.font = `${8.5 * dpr}px "Segoe UI Variable", sans-serif`;
  ctx.textAlign = 'center';
  for (let i = 0; i < n0; i += step) {
    const d = new Date(norm[0].data[i].time);
    ctx.fillText(d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                 toX0(i), H - 7 * dpr);
  }

  // Crosshair
  if (mainHoverX >= 0) {
    const mx = mainHoverX * dpr;
    const n = norm[0].data.length;
    const toX = i => pL + (i / (n - 1)) * cW;
    let ni = 0, md = Infinity;
    for (let i = 0; i < n; i++) {
      const d = Math.abs(toX(i) - mx); if (d < md) { md = d; ni = i; }
    }
    ctx.strokeStyle = 'rgba(148,163,184,0.35)'; ctx.lineWidth = dpr; ctx.setLineDash([]);
    ctx.beginPath(); ctx.moveTo(toX(ni), pT); ctx.lineTo(toX(ni), pT + cH); ctx.stroke();
    // Multi-value tooltip
    const lines = norm.map(s => `${s.label}: ${s.pcts[Math.min(ni, s.pcts.length - 1)] >= 0 ? '+' : ''}${(s.pcts[Math.min(ni, s.pcts.length - 1)] || 0).toFixed(2)}%`);
    const boxW = 90 * dpr, boxH = (lines.length * 14 + 8) * dpr;
    let tx = toX(ni) + 8 * dpr;
    if (tx + boxW > W - pR) tx = toX(ni) - boxW - 8 * dpr;
    const ty = pT + 4 * dpr;
    ctx.fillStyle = 'rgba(15,23,42,0.85)';
    ctx.beginPath();
    ctx.roundRect(tx, ty, boxW, boxH, 5 * dpr);
    ctx.fill();
    ctx.font = `${8.5 * dpr}px Inter, sans-serif`;
    lines.forEach((line, i) => {
      ctx.fillStyle = norm[i].color;
      ctx.textAlign = 'left';
      ctx.fillText(line, tx + 6 * dpr, ty + (14 * i + 12) * dpr);
    });
  }
}

// ── Multi-TF Grid: 2×2 timeframe grid for the selected symbol ─────────────────
const GRID_CELLS = [
  { label: '1D',  range: '5d',  interval: '30m' },
  { label: '1W',  range: '1mo', interval: '1d'  },
  { label: '1M',  range: '3mo', interval: '1d'  },
  { label: '1Y',  range: '1y',  interval: '1wk' },
];

async function drawMultiTFGrid(sym) {
  if (!sym) return;
  const gridEl = document.getElementById('main-chart-grid');
  if (!gridEl) return;

  // Build 4-cell grid HTML
  gridEl.innerHTML = GRID_CELLS.map(c => `
    <div class="grid-cell" id="gc-${c.label.replace(/\s/,'')}">
      <span class="grid-cell-label">${c.label}</span>
      <div class="grid-cell-info" id="gci-${c.label}"></div>
      <canvas class="grid-cell-canvas" id="gcc-${c.label}"></canvas>
    </div>`).join('');

  // Fetch all 4 timeframes concurrently and draw
  await Promise.allSettled(GRID_CELLS.map(async cell => {
    const data = await fetchChartData(sym.symbol, cell.range, cell.interval);
    const canvas = document.getElementById(`gcc-${cell.label}`);
    if (!canvas || !data || data.length < 2) return;

    // Resize canvas to fill cell
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width  = rect.width  * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width  = rect.width  + 'px';
    canvas.style.height = rect.height + 'px';

    const prices = data.map(d => d.close).filter(Boolean);
    if (prices.length < 2) return;
    const isUp = prices[prices.length - 1] >= prices[0];

    // Draw using existing sparkline (re-using the simplified drawSparkline)
    drawSparkline(canvas, data, isUp);

    // Update info label: last price + % change
    const first = prices[0], last = prices[prices.length - 1];
    const pct   = ((last - first) / first) * 100;
    const sign  = pct >= 0 ? '+' : '';
    const infoEl = document.getElementById(`gci-${cell.label}`);
    if (infoEl) {
      infoEl.textContent = `${sign}${pct.toFixed(2)}%`;
      infoEl.className = `grid-cell-info ${pct >= 0 ? 'positive' : 'negative'}`;
    }
  }));
}

// ── Options Chain viewer ──────────────────────────────────────────────────────
async function loadOptionsChain(sym) {
  const panelEl = document.getElementById('options-chain-panel');
  if (!panelEl) return;
  panelEl.innerHTML = '<div class="opts-loading">Loading options chain…</div>';

  // Only fetch for equities (not indices, crypto, forex, futures)
  const s = sym.symbol;
  const isEquity = !s.startsWith('^') && !s.endsWith('=X') && !s.endsWith('=F')
                && !s.endsWith('-USD') && !s.endsWith('.IS');
  if (!isEquity) {
    panelEl.innerHTML = '<div class="opts-error">Options not available for this instrument type.</div>';
    return;
  }

  try {
    const url = `https://query2.finance.yahoo.com/v7/finance/options/${encodeURIComponent(s)}`;
    const result = await window.electronAPI.fetchJson(url);
    if (!result.ok) throw new Error('Fetch failed');
    const json  = JSON.parse(result.text);
    const chain = json?.optionChain?.result?.[0];
    if (!chain) throw new Error('No chain data');
    const opts  = chain.options?.[0];
    const spot  = chain.quote?.regularMarketPrice || 0;
    const calls = (opts?.calls  || []).sort((a, b) => a.strike - b.strike);
    const puts  = (opts?.puts   || []).sort((a, b) => a.strike - b.strike);
    renderOptionsTable(panelEl, calls, puts, spot);
  } catch (e) {
    panelEl.innerHTML = `<div class="opts-error">Options unavailable for <strong>${s}</strong>.<br><small>Options data is only available for US equity symbols during market hours.</small></div>`;
  }
}

function renderOptionsTable(panelEl, calls, puts, spot) {
  const fmt   = v => (v != null && !isNaN(v)) ? v.toFixed(2) : '–';
  const fmtOI = v => (v != null && v > 0) ? v.toLocaleString() : '–';
  const pFmt  = v => v != null ? (v >= 0 ? `+${v.toFixed(1)}%` : `${v.toFixed(1)}%`) : '';

  const allStrikes = [...new Set([...calls.map(c => c.strike), ...puts.map(p => p.strike)])].sort((a, b) => a - b);
  const callMap    = Object.fromEntries(calls.map(c => [c.strike, c]));
  const putMap     = Object.fromEntries(puts.map(p => [p.strike, p]));

  // Find ATM (closest strike to spot)
  const atmStrike = allStrikes.reduce((prev, cur) => Math.abs(cur - spot) < Math.abs(prev - spot) ? cur : prev, allStrikes[0] || spot);

  const rows = allStrikes.map(strike => {
    const c   = callMap[strike];
    const p   = putMap[strike];
    const atm = strike === atmStrike;
    const pctC = c?.percentChange;
    const pctP = p?.percentChange;
    return `<tr class="${atm ? 'opts-atm-row' : ''}">
      <td class="opts-last ${c?.inTheMoney ? 'opts-itm-call' : ''}">${fmt(c?.lastPrice)}${pctC != null ? ` <span class="${pctC>=0?'positive':'negative'}" style="font-size:9px">${pFmt(pctC)}</span>` : ''}</td>
      <td class="opts-bid">${fmt(c?.bid)}</td>
      <td class="opts-ask">${fmt(c?.ask)}</td>
      <td class="opts-oi">${fmtOI(c?.openInterest)}</td>
      <td class="opts-strike-col ${atm ? 'opts-atm-strike' : ''}">${fmt(strike)}</td>
      <td class="opts-oi">${fmtOI(p?.openInterest)}</td>
      <td class="opts-bid">${fmt(p?.bid)}</td>
      <td class="opts-ask">${fmt(p?.ask)}</td>
      <td class="opts-last ${p?.inTheMoney ? 'opts-itm-put' : ''}">${fmt(p?.lastPrice)}${pctP != null ? ` <span class="${pctP>=0?'positive':'negative'}" style="font-size:9px">${pFmt(pctP)}</span>` : ''}</td>
    </tr>`;
  }).join('');

  // ── Put/Call Ratio & Max Pain ─────────────────
  const totalCallOI = calls.reduce((s, c) => s + (c.openInterest || 0), 0);
  const totalPutOI  = puts.reduce((s, p) => s + (p.openInterest || 0), 0);
  const pcRatio     = totalCallOI > 0 ? (totalPutOI / totalCallOI).toFixed(2) : '–';
  const pcNum       = totalCallOI > 0 ? totalPutOI / totalCallOI : null;
  const pcLabel     = pcNum == null ? '' : pcNum < 0.7 ? ' · Bullish skew' : pcNum > 1.2 ? ' · Bearish skew' : ' · Neutral';
  const pcColor     = pcNum == null ? 'var(--text-lo)' : pcNum < 0.7 ? 'var(--green)' : pcNum > 1.2 ? 'var(--red)' : 'var(--text-md)';
  // Max pain: strike with highest combined call+put OI loss for buyers
  let maxPainStrike = null;
  if (allStrikes.length > 0 && (totalCallOI + totalPutOI) > 0) {
    let minPain = Infinity;
    allStrikes.forEach(k => {
      const callPain = calls.reduce((s, c) => s + (c.openInterest || 0) * Math.max(0, c.strike - k), 0);
      const putPain  = puts.reduce((s, p) => s + (p.openInterest || 0) * Math.max(0, k - p.strike), 0);
      const pain = callPain + putPain;
      if (pain < minPain) { minPain = pain; maxPainStrike = k; }
    });
  }
  const mpStr = maxPainStrike != null ? fmt(maxPainStrike) : '–';

  panelEl.innerHTML = `
    <div class="opts-hdr">
      <span class="opts-title">Options Chain</span>
      <span class="opts-spot">Spot: <strong>${fmt(spot)}</strong></span>
      <span class="opts-pcr" style="color:${pcColor}">P/C: <strong>${pcRatio}</strong>${pcLabel}</span>
      <span class="opts-maxpain">Max Pain: <strong>${mpStr}</strong></span>
      <span class="opts-note">Nearest expiry · ${calls.length} calls · ${puts.length} puts</span>
    </div>
    <div class="opts-table-wrap">
      <table class="opts-table">
        <thead>
          <tr>
            <th colspan="4" class="opts-col-hdr opts-calls-hdr">CALLS</th>
            <th class="opts-col-hdr opts-strike-hdr">STRIKE</th>
            <th colspan="4" class="opts-col-hdr opts-puts-hdr">PUTS</th>
          </tr>
          <tr class="opts-sub-hdr">
            <th>Last</th><th>Bid</th><th>Ask</th><th>OI</th>
            <th>—</th>
            <th>OI</th><th>Bid</th><th>Ask</th><th>Last</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>`;
}

// ── 24h Market Sessions Clock ─────────────────────────────────────────────────
function drawSessionClock(canvas) {
  if (!canvas) return;
  const dpr  = window.devicePixelRatio || 1;
  const side = (canvas.offsetWidth || 72) * dpr;
  canvas.width = side; canvas.height = side;
  const ctx = canvas.getContext('2d');
  const cx = side / 2, cy = side / 2;
  const outerR = side / 2 - 3 * dpr;
  const ringW  = 7 * dpr;
  ctx.clearRect(0, 0, side, side);

  // Background track
  ctx.beginPath(); ctx.arc(cx, cy, outerR, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(148,163,184,0.10)'; ctx.lineWidth = ringW; ctx.stroke();

  // 24h → angle: midnight top (-π/2), clockwise
  const timeToAngle = (h, m) => ((h * 60 + m) / 1440) * Math.PI * 2 - Math.PI / 2;

  // Sessions in UTC: [startH, startM, endH, endM, color, name]
  const SESSIONS = [
    [22, 0,  6,  0,  'rgba(168,85,247,0.80)',  'SYD'],  // Sydney  UTC 22-06
    [0,  0,  6,  0,  'rgba(245,158,11,0.80)',  'TYO'],  // Tokyo   UTC 00-06
    [8,  0,  16, 30, 'rgba(59,130,246,0.80)',  'LSE'],  // London  UTC 08-16:30
    [14, 30, 21, 0,  'rgba(16,185,129,0.80)',  'NYSE'], // NYSE    UTC 14:30-21
  ];

  SESSIONS.forEach(([sh, sm, eh, em, color], idx) => {
    let sa = timeToAngle(sh, sm);
    let ea = timeToAngle(eh, em);
    if (ea <= sa) ea += Math.PI * 2; // overnight wrap
    const r = outerR - idx * 0 * dpr; // all on same ring, stacked by opacity
    ctx.beginPath(); ctx.arc(cx, cy, outerR - idx * (ringW + 1 * dpr), sa, ea);
    ctx.strokeStyle = color; ctx.lineWidth = ringW - 1 * dpr; ctx.lineCap = 'butt';
    ctx.stroke();
  });

  // Hour tick marks (every 6h)
  [0, 6, 12, 18].forEach(h => {
    const a = timeToAngle(h, 0);
    const ir = outerR - 4 * (ringW + 1 * dpr) - 2 * dpr;
    const or = outerR + 1 * dpr;
    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(a) * ir, cy + Math.sin(a) * ir);
    ctx.lineTo(cx + Math.cos(a) * or, cy + Math.sin(a) * or);
    ctx.strokeStyle = 'rgba(148,163,184,0.35)'; ctx.lineWidth = dpr; ctx.stroke();
  });

  // Current UTC time dot (animated needle)
  const now = new Date();
  const nowA = timeToAngle(now.getUTCHours(), now.getUTCMinutes());
  const nr   = outerR - 1 * dpr;
  const nx   = cx + Math.cos(nowA) * nr;
  const ny   = cy + Math.sin(nowA) * nr;
  ctx.beginPath(); ctx.arc(nx, ny, 4.5 * dpr, 0, Math.PI * 2);
  ctx.fillStyle = '#fff'; ctx.fill();
  ctx.strokeStyle = 'rgba(0,0,0,0.4)'; ctx.lineWidth = dpr; ctx.stroke();

  // Center label
  ctx.fillStyle = 'rgba(148,163,184,0.5)';
  ctx.font = `bold ${7 * dpr}px Inter, sans-serif`;
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText('UTC', cx, cy);
  ctx.textBaseline = 'alphabetic';
}

function updateSubPanels(data) {
  const subPanels = document.getElementById('sub-panels');
  if (!subPanels) return;
  const hasSubInd = ['rsi', 'macd', 'volume', 'adx', 'obv', 'stoch', 'roc', 'wr', 'cci', 'cmf', 'srsi', 'trix', 'mfi', 'dpo', 'elder', 'vortex', 'aroon', 'ao', 'vwmacd', 'cbody', 'dret'].some(k => activeIndicators.has(k));
  if (!hasSubInd) return;

  const rsiRow   = document.getElementById('rsi-panel-row');
  const macdRow  = document.getElementById('macd-panel-row');
  const volRow   = document.getElementById('vol-panel-row');
  const adxRow   = document.getElementById('adx-panel-row');
  const obvRow   = document.getElementById('obv-panel-row');
  const stochRow = document.getElementById('stoch-panel-row');
  const rocRow   = document.getElementById('roc-panel-row');
  const wrRow    = document.getElementById('wr-panel-row');
  const cciRow   = document.getElementById('cci-panel-row');
  const cmfRow   = document.getElementById('cmf-panel-row');
  const srsiRow  = document.getElementById('srsi-panel-row');
  const trixRow  = document.getElementById('trix-panel-row');
  const mfiRow    = document.getElementById('mfi-panel-row');
  const dpoRow    = document.getElementById('dpo-panel-row');
  const elderRow  = document.getElementById('elder-panel-row');
  const vortexRow = document.getElementById('vortex-panel-row');
  const aroonRow  = document.getElementById('aroon-panel-row');
  const aoRow      = document.getElementById('ao-panel-row');
  const vwmacdRow  = document.getElementById('vwmacd-panel-row');
  if (rsiRow)    rsiRow.style.display    = activeIndicators.has('rsi')    ? '' : 'none';
  if (macdRow)   macdRow.style.display   = activeIndicators.has('macd')   ? '' : 'none';
  if (volRow)    volRow.style.display    = activeIndicators.has('volume') ? '' : 'none';
  if (adxRow)    adxRow.style.display    = activeIndicators.has('adx')    ? '' : 'none';
  if (obvRow)    obvRow.style.display    = activeIndicators.has('obv')    ? '' : 'none';
  if (stochRow)  stochRow.style.display  = activeIndicators.has('stoch')  ? '' : 'none';
  if (rocRow)    rocRow.style.display    = activeIndicators.has('roc')    ? '' : 'none';
  if (wrRow)     wrRow.style.display     = activeIndicators.has('wr')     ? '' : 'none';
  if (cciRow)    cciRow.style.display    = activeIndicators.has('cci')    ? '' : 'none';
  if (cmfRow)    cmfRow.style.display    = activeIndicators.has('cmf')    ? '' : 'none';
  if (srsiRow)   srsiRow.style.display   = activeIndicators.has('srsi')   ? '' : 'none';
  if (trixRow)   trixRow.style.display   = activeIndicators.has('trix')   ? '' : 'none';
  if (mfiRow)    mfiRow.style.display    = activeIndicators.has('mfi')    ? '' : 'none';
  if (dpoRow)    dpoRow.style.display    = activeIndicators.has('dpo')    ? '' : 'none';
  if (elderRow)  elderRow.style.display  = activeIndicators.has('elder')  ? '' : 'none';
  if (vortexRow) vortexRow.style.display = activeIndicators.has('vortex') ? '' : 'none';
  if (aroonRow)  aroonRow.style.display  = activeIndicators.has('aroon')  ? '' : 'none';
  if (aoRow)     aoRow.style.display     = activeIndicators.has('ao')     ? '' : 'none';
  if (vwmacdRow) vwmacdRow.style.display = activeIndicators.has('vwmacd') ? '' : 'none';
  const cbodyRow = document.getElementById('cbody-panel-row');
  if (cbodyRow)  cbodyRow.style.display  = activeIndicators.has('cbody')  ? '' : 'none';
  const dretRow  = document.getElementById('dret-panel-row');
  if (dretRow)   dretRow.style.display   = activeIndicators.has('dret')   ? '' : 'none';

  if (activeIndicators.has('rsi'))    drawRSIPanel        (document.getElementById('rsi-canvas'),    data);
  if (activeIndicators.has('macd'))   drawMACDPanel       (document.getElementById('macd-canvas'),   data);
  if (activeIndicators.has('volume')) drawVolumePanel     (document.getElementById('vol-canvas'),    data);
  if (activeIndicators.has('adx'))    drawADXPanel        (document.getElementById('adx-canvas'),    data);
  if (activeIndicators.has('obv'))    drawOBVPanel        (document.getElementById('obv-canvas'),    data);
  if (activeIndicators.has('stoch'))  drawStochasticPanel (document.getElementById('stoch-canvas'),  data);
  if (activeIndicators.has('roc'))    drawROCPanel        (document.getElementById('roc-canvas'),    data);
  if (activeIndicators.has('wr'))     drawWilliamsRPanel  (document.getElementById('wr-canvas'),     data);
  if (activeIndicators.has('cci'))    drawCCIPanel        (document.getElementById('cci-canvas'),    data);
  if (activeIndicators.has('cmf'))    drawCMFPanel        (document.getElementById('cmf-canvas'),    data);
  if (activeIndicators.has('srsi'))   drawStochRSIPanel   (document.getElementById('srsi-canvas'),   data);
  if (activeIndicators.has('trix'))   drawTRIXPanel       (document.getElementById('trix-canvas'),   data);
  if (activeIndicators.has('mfi'))    drawMFIPanel        (document.getElementById('mfi-canvas'),    data);
  if (activeIndicators.has('dpo'))    drawDPOPanel        (document.getElementById('dpo-canvas'),    data);
  if (activeIndicators.has('elder'))  drawElderRayPanel   (document.getElementById('elder-canvas'),  data);
  if (activeIndicators.has('vortex')) drawVortexPanel     (document.getElementById('vortex-canvas'), data);
  if (activeIndicators.has('aroon'))  drawAroonPanel      (document.getElementById('aroon-canvas'),  data);
  if (activeIndicators.has('ao'))     drawAOPanel         (document.getElementById('ao-canvas'),     data);
  if (activeIndicators.has('vwmacd')) drawVWMACDPanel     (document.getElementById('vwmacd-canvas'), data);
  if (activeIndicators.has('cbody'))  drawBodyPctPanel    (document.getElementById('cbody-canvas'),  data);
  if (activeIndicators.has('dret'))   drawDailyReturnsStrip(document.getElementById('dret-canvas'),  data);
}

// ══════════════════════════════════════════════
// v1.7 — Gen-Z Animations & Modern UX Helpers
// ══════════════════════════════════════════════

// ── Spring physics helpers ────────────────────
function makeRAFLoop(tick) {
  let last = 0, rafId = 0;
  function frame(now) {
    if (!last) last = now;
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    const done = tick(dt);
    if (!done) rafId = requestAnimationFrame(frame);
  }
  rafId = requestAnimationFrame(frame);
  return () => cancelAnimationFrame(rafId);
}

// ── Digit Roller (DB metric card prices) ──────
// Converts a price span into an animated digit-column roller.
// Each digit 0-9 in a clipped column, CSS transition on transform.
function updateDigitRoller(el, newText) {
  if (!el) return;
  const prev = el._drText;
  if (prev === newText) return;
  el._drText = newText;

  // Rebuild if length changed or not yet initialized
  if (!el._drCols || el._drCols.length !== newText.length) {
    el.classList.add('digit-roller');
    el.innerHTML = '';
    el._drCols = [];
    for (let i = 0; i < newText.length; i++) {
      const ch = newText[i];
      if (ch >= '0' && ch <= '9') {
        const col = document.createElement('span');
        col.className = 'dr-col';
        const wheel = document.createElement('span');
        wheel.className = 'dr-wheel';
        wheel.textContent = '0123456789';
        const n = parseInt(ch, 10);
        // Set immediately without transition on first build
        wheel.style.transition = 'none';
        wheel.style.transform  = `translateY(-${n * 10}%)`;
        col.appendChild(wheel);
        el.appendChild(col);
        el._drCols.push({ isDigit: true, wheel, cur: n });
      } else {
        const sp = document.createElement('span');
        sp.className = 'dr-static';
        sp.textContent = ch;
        el.appendChild(sp);
        el._drCols.push({ isDigit: false, sp, cur: ch });
      }
    }
    // Re-enable transitions after first paint
    requestAnimationFrame(() => {
      if (el._drCols) el._drCols.forEach(c => {
        if (c.isDigit) c.wheel.style.transition = '';
      });
    });
    return;
  }

  // Update existing columns (same length)
  for (let i = 0; i < newText.length; i++) {
    const ch  = newText[i];
    const col = el._drCols[i];
    if (!col) continue;
    if (col.isDigit && ch >= '0' && ch <= '9') {
      const n = parseInt(ch, 10);
      if (n !== col.cur) {
        col.cur = n;
        col.wheel.style.transform = `translateY(-${n * 10}%)`;
      }
    } else if (!col.isDigit) {
      if (ch !== col.cur) { col.sp.textContent = ch; col.cur = ch; }
    }
  }
}

// ── Particle confetti burst ───────────────────
function burstConfetti(originX, originY) {
  let canvas = document.getElementById('confetti-canvas');
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.id = 'confetti-canvas';
    document.body.appendChild(canvas);
  }
  const dpr  = window.devicePixelRatio || 1;
  canvas.width  = window.innerWidth  * dpr;
  canvas.height = window.innerHeight * dpr;
  canvas.style.width  = window.innerWidth  + 'px';
  canvas.style.height = window.innerHeight + 'px';
  const ctx   = canvas.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const colors = ['rgba(16,185,129,0.9)','rgba(52,211,153,0.85)','rgba(255,255,255,0.8)',
                  '#34d399','#6ee7b7','rgba(6,214,160,0.9)'];
  const parts = [];
  for (let i = 0; i < 72; i++) {
    const angle = (Math.PI * 2 * i / 72) + (Math.random() - 0.5) * 0.8;
    const spd   = 280 + Math.random() * 320;
    parts.push({
      x: originX, y: originY,
      vx: Math.cos(angle) * spd,
      vy: Math.sin(angle) * spd - 180,
      r: 2 + Math.random() * 3.5,
      rot: Math.random() * Math.PI * 2,
      vr: (Math.random() - 0.5) * 14,
      t: 0, ttl: 0.75 + Math.random() * 0.55,
      col: colors[Math.floor(Math.random() * colors.length)],
    });
  }

  let stop = null;
  stop = makeRAFLoop(dt => {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    let alive = false;
    for (const p of parts) {
      p.t += dt;
      if (p.t >= p.ttl) continue;
      alive = true;
      p.vy += 900 * dt;
      const damp = Math.exp(-2.5 * dt);
      p.vx *= damp; p.vy *= damp;
      p.x  += p.vx * dt; p.y += p.vy * dt;
      p.rot += p.vr * dt; p.vr *= Math.exp(-5 * dt);
      const fade = 1 - p.t / p.ttl;
      ctx.save();
      ctx.globalAlpha = fade;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.col;
      ctx.fillRect(-p.r, -p.r * 0.55, p.r * 2.2, p.r * 1.1);
      ctx.restore();
    }
    if (!alive) { ctx.clearRect(0, 0, window.innerWidth, window.innerHeight); }
    return !alive;
  });
}

// ── Sparkline (mini card chart) ───────────────
function drawSparkline(canvas, data, isUp) {
  if (!canvas) return;
  const prices = (data || []).map(d => d.close).filter(p => p != null && !isNaN(p));
  if (prices.length < 2) return;

  const dpr = window.devicePixelRatio || 1;
  // For very small canvases (globe mini-sparklines), use HTML attr size; for normal canvases use layout size
  const layoutW = canvas.offsetWidth  || (parseInt(canvas.getAttribute('width'))  || 0);
  const layoutH = canvas.offsetHeight || (parseInt(canvas.getAttribute('height')) || 0);
  if (layoutW < 4 || layoutH < 4) return; // canvas not visible yet
  canvas.width  = layoutW * dpr;
  canvas.height = layoutH * dpr;
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

// ── v2.62 Chip Sparkline — tiny 32×16 inline sparkline on each home chip ─────
function drawChipSparkline(canvas, data, isUp) {
  if (!canvas || !data || data.length < 2) return;
  const prices = data.map(d => d.close).filter(p => p != null && !isNaN(p));
  if (prices.length < 2) return;
  const W = 32, H = 16, dpr = window.devicePixelRatio || 1;
  canvas.width  = W * dpr;
  canvas.height = H * dpr;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, W * dpr, H * dpr);
  ctx.scale(dpr, dpr);
  const mn = Math.min(...prices), mx = Math.max(...prices), rng = mx - mn || 1;
  const pad = 1.5;
  const toX = i => (i / (prices.length - 1)) * (W - 1);
  const toY = p => H - pad - ((p - mn) / rng) * (H - 2 * pad);
  const color = isUp ? '#34d399' : '#f87171';
  ctx.beginPath();
  ctx.moveTo(toX(0), toY(prices[0]));
  for (let i = 1; i < prices.length; i++) ctx.lineTo(toX(i), toY(prices[i]));
  ctx.strokeStyle = color;
  ctx.lineWidth   = 0.9;
  ctx.globalAlpha = 0.75;
  ctx.stroke();
  ctx.globalAlpha = 1;
}

// ── Animated sparkline draw (v2.47) — progressive left→right reveal ─────────
// canvas._sparkAnimId allows cancelling a previous animation
function drawSparklineAnimated(canvas, data, isUp, durationMs = 600) {
  if (!canvas) return;
  const prices = (data || []).map(d => d.close).filter(p => p != null && !isNaN(p));
  if (prices.length < 2) { drawSparkline(canvas, data, isUp); return; }

  const dpr     = window.devicePixelRatio || 1;
  const layoutW = canvas.offsetWidth  || parseInt(canvas.getAttribute('width'))  || 0;
  const layoutH = canvas.offsetHeight || parseInt(canvas.getAttribute('height')) || 0;
  if (layoutW < 4 || layoutH < 4) { drawSparkline(canvas, data, isUp); return; }
  canvas.width  = layoutW * dpr;
  canvas.height = layoutH * dpr;
  const W = canvas.width, H = canvas.height;
  const ctx   = canvas.getContext('2d');
  const pad   = H * 0.1;
  const min   = Math.min(...prices), max = Math.max(...prices);
  const rng   = max - min || 1;
  const toX   = i => (i / (prices.length - 1)) * W;
  const toY   = p => H - pad - ((p - min) / rng) * (H - 2 * pad);
  const color = isUp ? '#10b981' : '#ef4444';

  // Pre-compute point array
  const pts = prices.map((p, i) => ({ x: toX(i), y: toY(p) }));

  // Cancel any previous animation for this canvas
  if (canvas._sparkAnimId) cancelAnimationFrame(canvas._sparkAnimId);

  const startTs = performance.now();
  function tick(now) {
    const t = Math.min(1, (now - startTs) / durationMs);
    // Ease-out cubic
    const ease = 1 - Math.pow(1 - t, 3);
    const clipX = ease * W;

    ctx.clearRect(0, 0, W, H);

    // Clip to revealed portion
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, 0, clipX, H);
    ctx.clip();

    // Fill area
    const grad = ctx.createLinearGradient(0, 0, 0, H);
    grad.addColorStop(0,   isUp ? 'rgba(16,185,129,0.38)' : 'rgba(239,68,68,0.32)');
    grad.addColorStop(0.6, isUp ? 'rgba(16,185,129,0.07)' : 'rgba(239,68,68,0.05)');
    grad.addColorStop(1,   'rgba(0,0,0,0)');
    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    for (let i = 1; i < pts.length; i++) {
      const xm = (pts[i-1].x + pts[i].x) / 2;
      const ym = (pts[i-1].y + pts[i].y) / 2;
      ctx.quadraticCurveTo(pts[i-1].x, pts[i-1].y, xm, ym);
    }
    ctx.lineTo(pts[pts.length-1].x, pts[pts.length-1].y);
    ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.closePath();
    ctx.fillStyle = grad; ctx.fill();

    // Line
    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    for (let i = 1; i < pts.length; i++) {
      const xm = (pts[i-1].x + pts[i].x) / 2;
      const ym = (pts[i-1].y + pts[i].y) / 2;
      ctx.quadraticCurveTo(pts[i-1].x, pts[i-1].y, xm, ym);
    }
    ctx.lineTo(pts[pts.length-1].x, pts[pts.length-1].y);
    ctx.strokeStyle = color;
    ctx.lineWidth   = 1.5 * dpr;
    ctx.lineJoin    = 'round';
    ctx.stroke();

    // Glowing endpoint dot
    if (clipX > 8) {
      ctx.beginPath();
      ctx.arc(Math.min(clipX - 1, pts[pts.length-1].x), pts[pts.length-1].y, 2.5 * dpr, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
    }

    ctx.restore();

    if (t < 1) {
      canvas._sparkAnimId = requestAnimationFrame(tick);
    } else {
      canvas._sparkAnimId = null;
    }
  }
  canvas._sparkAnimId = requestAnimationFrame(tick);
}

// ── Briefing sparkline — tiny 60×24 canvas for Daily Brief metric cards ────
function drawBriefingSparkline(canvasId, symId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  // Prefer current mainTf range; fall back to any cached data for this symbol
  const preferKey = `${symId}|${mainTf.range}|${mainTf.interval}`;
  const cacheKey  = chartDataCache[preferKey]
    ? preferKey
    : Object.keys(chartDataCache).find(k => k.startsWith(symId + '|'));
  if (cacheKey) {
    const data  = chartDataCache[cacheKey];
    const price = lastKnownPrices[symId] || riskPrices[symId];
    const isUp  = price ? price.change >= 0 : true;
    drawSparkline(canvas, data, isUp);
    return;
  }
  // No cache yet — draw a flat neutral placeholder line
  const dpr = window.devicePixelRatio || 1;
  const w   = (canvas.offsetWidth  || parseInt(canvas.getAttribute('width'))  || 60);
  const h   = (canvas.offsetHeight || parseInt(canvas.getAttribute('height')) || 24);
  canvas.width  = w * dpr;
  canvas.height = h * dpr;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.moveTo(0, canvas.height / 2);
  ctx.lineTo(canvas.width, canvas.height / 2);
  ctx.strokeStyle = 'rgba(148,163,184,0.2)';
  ctx.lineWidth   = 1 * dpr;
  ctx.stroke();
}

// ════════════════════════════════════════════════════════════════════════════
// ── NARRATIVE ENGINE v1.5 ─────────────────────────────────────────────────
// SignalEngine: detects threshold events from global state
// FeedStore:    deduplication, cooldown, ordering
// refreshNarrativeFeed(): renders the Today Strip
// ════════════════════════════════════════════════════════════════════════════

const _FEED_COOLDOWN_MS = 5 * 60 * 1000; // 5 min between same-type stories
const _feedCooldowns    = {};             // key: `${type}:${subject}` → timestamp
const _feedStories      = [];            // current rendered stories

const TAG_COLORS = {
  'Equities':   'var(--purple)',
  'Crypto':     'var(--cyan)',
  'Volatility': '#f97316',   // orange
  'Rates':      '#a78bfa',   // violet
  'Breadth':    'var(--green)',
  'Risk':       '#f43f5e',   // rose
  'Commodities':'#eab308',   // yellow
  'Forex':      '#64748b',   // slate
};

function _fmtPct(v) { return (v >= 0 ? '+' : '') + v.toFixed(2) + '%'; }
function _fmtNum(v, d=2) { return Number(v).toFixed(d); }
function _clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
function _getLeadingSector(data, wantPositive) {
  if (!Array.isArray(data) || !data.length) return null;
  const filtered = data.filter(s => wantPositive ? s.pct > 0 : s.pct < 0);
  return filtered.length ? filtered[0] : null;
}

// ── 10 Signal Detection Functions ─────────────────────────────────────────

// 1) S&P 500 momentum — fires when daily move ≥ 0.5%
function sig_index_momentum(s) {
  const sp = s.lastKnownPrices?.sp500;
  if (!sp || typeof sp.pct !== 'number') return null;
  const abs = Math.abs(sp.pct);
  if (abs < 0.5) return null;
  const leader = _getLeadingSector(s.sectorData, sp.pct > 0);
  const leaderTxt = leader ? ` — ${leader.name} ${sp.pct > 0 ? 'leading' : 'dragging'}` : '';
  const sev = _clamp(Math.ceil(abs / 0.6), 1, 5);
  return {
    type: 'INDEX_MOMENTUM', subject: 'sp500',
    headline: `S&P 500 ${sp.pct >= 0 ? 'up' : 'down'} ${_fmtPct(sp.pct)} today${leaderTxt}`,
    timeWindow: 'today', severity: sev, tag: 'Equities'
  };
}

// 2) Nasdaq / S&P divergence — risk-appetite signal
function sig_nasdaq_divergence(s) {
  const sp  = s.lastKnownPrices?.sp500;
  const ndq = s.lastKnownPrices?.nasdaq;
  if (!sp || !ndq || typeof sp.pct !== 'number' || typeof ndq.pct !== 'number') return null;
  const diff = ndq.pct - sp.pct;
  const abs  = Math.abs(diff);
  if (abs < 0.8) return null;
  const dir = diff > 0 ? 'outperforming' : 'underperforming';
  return {
    type: 'NDX_DIVERGENCE', subject: 'nasdaq',
    headline: `Nasdaq ${dir} S&P by ${_fmtNum(abs, 1)}% — risk appetite ${diff > 0 ? 'elevated' : 'compressed'}`,
    timeWindow: 'today', severity: _clamp(Math.ceil(abs / 0.8), 1, 5), tag: 'Equities'
  };
}

// 3) BTC big move — ≥ 2%
function sig_crypto_move(s) {
  const btc = s.lastKnownPrices?.btc;
  if (!btc || typeof btc.pct !== 'number') return null;
  const abs = Math.abs(btc.pct);
  if (abs < 2.0) return null;
  return {
    type: 'CRYPTO_MOVE', subject: 'btc',
    headline: `Bitcoin ${btc.pct >= 0 ? 'rallying' : 'selling off'} ${_fmtPct(btc.pct)} — crypto ${btc.pct >= 0 ? 'risk-on' : 'retreating'}`,
    timeWindow: 'today', severity: _clamp(Math.ceil(abs / 2.0) + 1, 1, 5), tag: 'Crypto'
  };
}

// 4) VIX shock / calm — ≥ 6% move
function sig_vix_move(s) {
  const vix = s.riskPrices?.vix;
  if (!vix || typeof vix.pct !== 'number') return null;
  const abs = Math.abs(vix.pct);
  if (abs < 6.0) return null;
  const verb = vix.pct > 0 ? 'spikes' : 'falls';
  const lvl  = vix.price;
  const ctx  = lvl > 25 ? ' — elevated fear' : lvl < 15 ? ' — complacency zone' : '';
  return {
    type: 'VIX_SHOCK', subject: 'vix',
    headline: `Volatility ${verb} ${_fmtPct(vix.pct)} (VIX ${_fmtNum(lvl, 1)})${ctx}`,
    timeWindow: 'today', severity: _clamp(Math.ceil(abs / 6.0) + 1, 1, 5), tag: 'Volatility'
  };
}

// 5) Yield curve regime flip — T10Y2Y crosses zero
function sig_curve_regime_flip(s) {
  const t = s.fredData?.T10Y2Y;
  if (!t || typeof t.value !== 'number' || typeof t.prev !== 'number') return null;
  const crossedUp   = t.prev <= 0 && t.value > 0;
  const crossedDown = t.prev >= 0 && t.value < 0;
  if (!crossedUp && !crossedDown) return null;
  return {
    type: 'CURVE_REGIME_FLIP', subject: 'T10Y2Y',
    headline: `2s10s yield spread ${crossedUp ? 'turned positive' : 're-inverted'} (${_fmtNum(t.value, 2)}%) — rates regime shift`,
    timeWindow: 'today', severity: 4, tag: 'Rates'
  };
}

// 6) Yield curve level — persistent inversion or steep
function sig_curve_level(s) {
  const t = s.fredData?.T10Y2Y;
  if (!t || typeof t.value !== 'number') return null;
  if (t.value < -0.5) {
    return {
      type: 'CURVE_INVERTED', subject: 'T10Y2Y',
      headline: `Yield curve deeply inverted (${_fmtNum(t.value, 2)}%) — recession watch signal`,
      timeWindow: 'today', severity: 3, tag: 'Rates'
    };
  }
  if (t.value > 0.3) {
    return {
      type: 'CURVE_STEEP', subject: 'T10Y2Y',
      headline: `Yield curve steepening (${_fmtNum(t.value, 2)}%) — growth expectations rising`,
      timeWindow: 'today', severity: 2, tag: 'Rates'
    };
  }
  return null;
}

// 7) Market breadth extreme
function sig_breadth_extreme(s) {
  const b = s.lastBreadthScore;
  if (typeof b !== 'number') return null;
  if (b >= 75) {
    return {
      type: 'BREADTH_STRONG', subject: 'breadth',
      headline: `Market breadth strong: ${Math.round(b)}/100 — broad participation across sectors`,
      timeWindow: 'today', severity: 3, tag: 'Breadth'
    };
  }
  if (b <= 30) {
    return {
      type: 'BREADTH_WEAK', subject: 'breadth',
      headline: `Market breadth weak: ${Math.round(b)}/100 — narrow, fragile rally`,
      timeWindow: 'today', severity: 3, tag: 'Breadth'
    };
  }
  return null;
}

// 8) Fear & Greed extremes
function sig_fear_greed(s) {
  const fg = s.fearGreedScore;
  if (typeof fg !== 'number') return null;
  if (fg >= 75) {
    return {
      type: 'GREED_EXTREME', subject: 'feargreed',
      headline: `Extreme Greed: Fear & Greed at ${Math.round(fg)} — contrarian caution zone`,
      timeWindow: 'today', severity: 3, tag: 'Risk'
    };
  }
  if (fg <= 25) {
    return {
      type: 'FEAR_EXTREME', subject: 'feargreed',
      headline: `Extreme Fear: Fear & Greed at ${Math.round(fg)} — potential capitulation`,
      timeWindow: 'today', severity: 3, tag: 'Risk'
    };
  }
  return null;
}

// 9) Sector dispersion — top vs bottom spread ≥ 1.5%
function sig_sector_dispersion(s) {
  const data = s.sectorData;
  if (!Array.isArray(data) || data.length < 4) return null;
  const sorted = [...data].sort((a, b) => b.pct - a.pct);
  const top    = sorted[0];
  const bot    = sorted[sorted.length - 1];
  const spread = (top.pct || 0) - (bot.pct || 0);
  if (spread < 1.5) return null;
  return {
    type: 'SECTOR_DISPERSION', subject: 'sectors',
    headline: `${top.name} +${_fmtNum(top.pct, 1)}% vs ${bot.name} ${_fmtNum(bot.pct, 1)}% — sector rotation in play`,
    timeWindow: 'today', severity: _clamp(Math.ceil(spread / 1.5), 1, 5), tag: 'Equities'
  };
}

// 10) Gold / DXY — safe haven flow signal
function sig_gold_dxy(s) {
  const gold = s.lastKnownPrices?.gold;
  const dxy  = s.riskPrices?.dxy;
  if (!gold || !dxy || typeof gold.pct !== 'number' || typeof dxy.pct !== 'number') return null;
  // Gold up + DXY up = unusual strength
  if (gold.pct > 0.5 && dxy.pct > 0.3) {
    return {
      type: 'GOLD_DXY_STRENGTH', subject: 'gold',
      headline: `Gold ${_fmtPct(gold.pct)} and Dollar ${_fmtPct(dxy.pct)} rising together — risk-off defensive flow`,
      timeWindow: 'today', severity: 3, tag: 'Commodities'
    };
  }
  // Gold up + DXY down = classic safe haven
  if (gold.pct > 0.6 && dxy.pct < -0.2) {
    return {
      type: 'SAFE_HAVEN_FLOW', subject: 'gold',
      headline: `Gold surging ${_fmtPct(gold.pct)} as Dollar weakens — classic safe haven demand`,
      timeWindow: 'today', severity: 3, tag: 'Commodities'
    };
  }
  return null;
}

// ── Signal registry ─────────────────────────────────────────────────────────
const SIGNALS_V15 = [
  sig_index_momentum,
  sig_nasdaq_divergence,
  sig_crypto_move,
  sig_vix_move,
  sig_curve_regime_flip,
  sig_curve_level,
  sig_breadth_extreme,
  sig_fear_greed,
  sig_sector_dispersion,
  sig_gold_dxy,
];

// ── FeedStore helpers ────────────────────────────────────────────────────────
function _feedCanShow(type, subject) {
  const key = `${type}:${subject}`;
  const last = _feedCooldowns[key];
  if (!last) return true;
  return (Date.now() - last) >= _FEED_COOLDOWN_MS;
}
function _feedMarkShown(type, subject) {
  _feedCooldowns[`${type}:${subject}`] = Date.now();
}

// ── Main refresh function ─────────────────────────────────────────────────────
function refreshNarrativeFeed() {
  const strip = document.getElementById('today-strip-inner');
  if (!strip) return;

  // Build snapshot from current global state
  const snapshot = {
    lastKnownPrices,
    riskPrices,
    riskScore: (typeof calcRiskScore === 'function') ? calcRiskScore() : 0,
    lastBreadthScore,
    fearGreedScore: (typeof calcFearGreed === 'function') ? calcFearGreed().score : null,
    sectorData: window._lastSectorData || [],
    fredData: window._lastFredData || {},
  };

  // Run all signals
  const raw = SIGNALS_V15.map(fn => { try { return fn(snapshot); } catch(e) { return null; } }).filter(Boolean);

  // Apply cooldown filter + dedupe by type:subject
  const seen = new Set();
  const stories = raw.filter(s => {
    const key = `${s.type}:${s.subject}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return _feedCanShow(s.type, s.subject);
  });

  // Sort by severity desc
  stories.sort((a, b) => b.severity - a.severity);

  if (stories.length === 0) {
    strip.innerHTML = '<div class="today-empty">Markets quiet — no major signals detected</div>';
    return;
  }

  // Mark all shown
  stories.forEach(s => _feedMarkShown(s.type, s.subject));

  // Render cards with severity-based styling
  strip.innerHTML = stories.map(s => {
    const color     = TAG_COLORS[s.tag] || 'var(--text-lo)';
    const sevClass  = s.severity >= 4 ? 'sev-high' : s.severity >= 3 ? 'sev-med' : 'sev-low';
    const sevBorder = s.severity >= 4 ? 'rgba(239,68,68,0.55)' :
                      s.severity >= 3 ? 'rgba(251,191,36,0.45)' : 'rgba(100,116,139,0.25)';
    const dot       = s.severity >= 4 ? '🔴' : s.severity >= 3 ? '🟡' : '⚪';
    return `
      <div class="today-card ${sevClass}" data-tag="${s.tag}"
           style="border-left:3px solid ${sevBorder};">
        <span class="today-tag" style="color:${color};border-color:${color}44;background:${color}11">${s.tag}</span>
        <span class="today-headline">${dot} ${s.headline}</span>
        <span class="today-tw">${s.timeWindow}</span>
      </div>`;
  }).join('');
}

// ── Expose sector/fred data for snapshot ───────────────────────────────────
// (These are populated in loadMarketBreadth and loadMacroPulse)

// ── My Space sparkline — with optional alert level lines ──────────────────
function drawMySpaceSparkline(canvas, data, isUp, alertAbove, alertBelow) {
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
  // Extend range to include alert levels so lines stay within canvas
  const allVals = [...prices];
  if (alertAbove && !isNaN(alertAbove)) allVals.push(alertAbove);
  if (alertBelow && !isNaN(alertBelow)) allVals.push(alertBelow);
  const min = Math.min(...allVals), max = Math.max(...allVals);
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
  grad.addColorStop(0,   isUp ? 'rgba(16,185,129,0.40)' : 'rgba(239,68,68,0.34)');
  grad.addColorStop(0.6, isUp ? 'rgba(16,185,129,0.08)' : 'rgba(239,68,68,0.06)');
  grad.addColorStop(1,   'rgba(0,0,0,0)');
  ctx.beginPath(); buildPath();
  ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.closePath();
  ctx.fillStyle = grad; ctx.fill();

  // Main line
  ctx.beginPath(); buildPath();
  ctx.strokeStyle = color;
  ctx.lineWidth   = 1.6 * dpr;
  ctx.lineJoin    = 'round';
  ctx.stroke();

  // Alert level lines (dashed horizontal)
  const drawAlertLine = (alertPrice, lineColor) => {
    if (!alertPrice || isNaN(alertPrice)) return;
    const y = toY(alertPrice);
    if (y < -2 || y > H + 2) return; // fully out of range
    ctx.save();
    ctx.setLineDash([3 * dpr, 3 * dpr]);
    ctx.strokeStyle = lineColor;
    ctx.lineWidth   = 1 * dpr;
    ctx.globalAlpha = 0.75;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(W, y);
    ctx.stroke();
    ctx.restore();
  };
  drawAlertLine(alertAbove, '#10b981');
  drawAlertLine(alertBelow, '#ef4444');
}

// ── Candle Pattern Detector ───────────────────
function detectCandlePattern(prev, curr) {
  if (!curr) return null;
  const o = curr.open || curr.close;
  const c = curr.close;
  const h = curr.high || Math.max(o, c);
  const l = curr.low  || Math.min(o, c);
  const body = Math.abs(c - o);
  const range = h - l || 0.0001;
  const upperWick = h - Math.max(o, c);
  const lowerWick = Math.min(o, c) - l;
  const isGreen = c >= o;

  if (body / range < 0.08 && range > 0) return { name: 'Doji', dir: 'neutral' };
  if (lowerWick >= 2 * body && upperWick <= 0.4 * body && isGreen && lowerWick / range > 0.3)
    return { name: 'Hammer', dir: 'bull' };
  if (upperWick >= 2 * body && lowerWick <= 0.4 * body && !isGreen && upperWick / range > 0.3)
    return { name: 'Star', dir: 'bear' };
  if (prev) {
    const po = prev.open || prev.close;
    const pc = prev.close;
    const prevIsGreen = pc >= po;
    const prevBody = Math.abs(pc - po);
    if (!prevIsGreen && isGreen && body > prevBody && o <= Math.min(po, pc) + prevBody * 0.1 && c >= Math.max(po, pc))
      return { name: 'Engulf↑', dir: 'bull' };
    if (prevIsGreen && !isGreen && body > prevBody && o >= Math.max(po, pc) - prevBody * 0.1 && c <= Math.min(po, pc))
      return { name: 'Engulf↓', dir: 'bear' };
  }
  return null;
}

// ── Price Action Pattern Scanner ─────────────
// Scans all candles; returns [{idx, type, dir, label}]
function detectPriceActionPatterns(data) {
  if (!data || data.length < 2) return [];
  const results = [];
  for (let i = 1; i < data.length; i++) {
    const d  = data[i];
    const p  = data[i - 1];
    const o  = d.open  || d.close;
    const h  = d.high  || d.close;
    const l  = d.low   || d.close;
    const c  = d.close;
    const po = p.open  || p.close;
    const pc = p.close;
    const range = h - l;
    const body  = Math.abs(c - o);
    if (range < 0.0001) continue;
    const upperWick = h - Math.max(o, c);
    const lowerWick = Math.min(o, c) - l;
    // ── Pin Bar (Hammer / Shooting Star) ─────
    if (body < range * 0.30) {
      if (lowerWick >= range * 0.60 && upperWick < range * 0.20) {
        results.push({ idx: i, type: 'pin', dir: 'bull', label: 'Pin↑' }); continue;
      }
      if (upperWick >= range * 0.60 && lowerWick < range * 0.20) {
        results.push({ idx: i, type: 'pin', dir: 'bear', label: 'Pin↓' }); continue;
      }
    }
    // ── Engulfing ─────────────────────────────
    const prevBody    = Math.abs(pc - po);
    const prevBearish = pc < po;
    const prevBullish = pc > po;
    const currBull    = c > o;
    const currBear    = c < o;
    if (prevBearish && currBull && body > prevBody * 0.80 && o <= pc + prevBody * 0.10 && c >= po - prevBody * 0.10) {
      results.push({ idx: i, type: 'engulf', dir: 'bull', label: 'Engulf↑' }); continue;
    }
    if (prevBullish && currBear && body > prevBody * 0.80 && o >= pc - prevBody * 0.10 && c <= po + prevBody * 0.10) {
      results.push({ idx: i, type: 'engulf', dir: 'bear', label: 'Engulf↓' }); continue;
    }
  }
  return results;
}

// ── Candlestick chart ─────────────────────────
function drawCandlestickChart(canvas, data, sym) {
  if (!canvas || !data || data.length < 2) return;

  const dpr = window.devicePixelRatio || 1;
  canvas.width  = canvas.offsetWidth  * dpr;
  canvas.height = canvas.offsetHeight * dpr;
  const W = canvas.width, H = canvas.height;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, W, H);

  const pL = 60 * dpr, pR = 14 * dpr, pT = 10 * dpr, pB = 26 * dpr;
  const cW = W - pL - pR, cH = H - pT - pB;

  const highs  = data.map(d => d.high  || d.close);
  const lows   = data.map(d => d.low   || d.close);
  const n = data.length;

  const min = Math.min(...lows);
  const max = Math.max(...highs);
  const rng = max - min || 1;
  const aMin = min - rng * 0.04, aMax = max + rng * 0.04, aRng = aMax - aMin;

  const candleW = Math.max(2 * dpr, (cW / n) * 0.6);
  const toX = i => pL + (i / (n - 1)) * cW;
  const toY = p => pT + cH - ((p - aMin) / aRng) * cH;

  const cc = getChartColors();

  // Regime background tint (v2.41)
  if (_lastRegime === 'trending') {
    ctx.fillStyle = 'rgba(16,185,129,0.035)';
    ctx.fillRect(pL, pT, cW, cH);
  } else if (_lastRegime === 'volatile') {
    ctx.fillStyle = 'rgba(245,158,11,0.035)';
    ctx.fillRect(pL, pT, cW, cH);
  } else {
    ctx.fillStyle = 'rgba(99,102,241,0.030)';
    ctx.fillRect(pL, pT, cW, cH);
  }

  // ── Intraday Session Zones (v2.54) — candle chart ─────────────────────
  if (data.length >= 3) {
    const dtMs2 = (data[1].time - data[0].time) || 0;
    if (dtMs2 > 0 && dtMs2 <= 4 * 3600 * 1000) {
      ctx.save();
      for (let i = 0; i < n; i++) {
        const d2 = new Date(data[i].time);
        const utcH2 = d2.getUTCHours() + d2.getUTCMinutes() / 60;
        const x1 = toX(i);
        const barW2b = Math.max(1, cW / n);
        if (utcH2 < 14.5) {
          ctx.fillStyle = 'rgba(99,102,241,0.055)';
          ctx.fillRect(x1, pT, barW2b, cH);
        } else if (utcH2 >= 21.0) {
          ctx.fillStyle = 'rgba(245,158,11,0.055)';
          ctx.fillRect(x1, pT, barW2b, cH);
        }
      }
      ctx.restore();
    }
  }

  // Grid + price labels
  const gridN = 5;
  for (let i = 0; i <= gridN; i++) {
    const y = pT + (cH / gridN) * i;
    const p = aMax - (aRng / gridN) * i;
    ctx.strokeStyle = cc.grid;
    ctx.lineWidth = 1; ctx.setLineDash([]);
    ctx.beginPath(); ctx.moveTo(pL, y); ctx.lineTo(W - pR, y); ctx.stroke();
    ctx.fillStyle = cc.label;
    ctx.font = `${9.5 * dpr}px "Segoe UI Variable", sans-serif`;
    ctx.textAlign = 'right';
    ctx.fillText(fmtPrice(p, sym.fmt), pL - 5 * dpr, y + 3.5 * dpr);
  }

  // ── Gap Detection Bands (v2.59) — candle chart ─────────────────────────
  if (n >= 3) {
    ctx.save();
    for (let i = 1; i < n; i++) {
      const prevClose = data[i - 1].close;
      const curOpen   = data[i].open ?? data[i].close;
      if (!prevClose || !curOpen) continue;
      const gapPct = (curOpen - prevClose) / prevClose * 100;
      if (Math.abs(gapPct) < 0.5) continue;
      const isGapUp = gapPct > 0;
      const gapY1 = toY(Math.max(prevClose, curOpen));
      const gapY2 = toY(Math.min(prevClose, curOpen));
      if (Math.abs(gapY2 - gapY1) < 1.5 * dpr) continue;
      const xFrom = toX(i - 1);
      const xTo   = toX(i);
      ctx.fillStyle = isGapUp ? 'rgba(52,211,153,0.10)' : 'rgba(248,113,113,0.10)';
      ctx.fillRect(xFrom, gapY1, xTo - xFrom, gapY2 - gapY1);
    }
    ctx.restore();
  }

  // ── Key Bar Highlights (v2.59) — glow on top-2 volume & biggest-move bars ─
  if (n >= 5) {
    const cvols = data.map(d => d.volume || 0);
    const avgV  = cvols.reduce((a, b) => a + b, 0) / (n || 1) || 1;
    ctx.save();
    data.forEach((d, i) => {
      const vol   = cvols[i] || 0;
      const isHighVol = vol > avgV * 2.5;
      const bodySize  = d.open ? Math.abs(d.close - d.open) / d.close : 0;
      const isBigMove = bodySize > 0.025; // >2.5% body
      if (!isHighVol && !isBigMove) return;
      const x = toX(i);
      const isGreen = d.close >= (d.open ?? d.close);
      const rgb = isGreen ? '52,211,153' : '248,113,113';
      const alpha = Math.min(0.28, (isHighVol ? vol / avgV * 0.04 : 0) + (isBigMove ? bodySize * 3 : 0));
      const grd = ctx.createRadialGradient(x, pT + cH / 2, 0, x, pT + cH / 2, candleW * 3);
      grd.addColorStop(0, `rgba(${rgb},${alpha.toFixed(3)})`);
      grd.addColorStop(1, `rgba(${rgb},0)`);
      ctx.fillStyle = grd;
      ctx.fillRect(x - candleW * 3, pT, candleW * 6, cH);
    });
    ctx.restore();
  }

  // ── Animated draw-in clip for candle chart (v2.48) ─────────────────────
  const _hasDrawClipC = _chartClipFrac < 0.9999;
  if (_hasDrawClipC) {
    ctx.save();
    ctx.beginPath();
    ctx.rect(pL, 0, cW * _chartClipFrac, H);
    ctx.clip();
  }

  // Draw candles
  for (let i = 0; i < n; i++) {
    const d = data[i];
    const o = d.open  || d.close;
    const h = d.high  || d.close;
    const l = d.low   || d.close;
    const c = d.close;
    const isGreen = c >= o;
    const col = isGreen ? '#10b981' : '#ef4444';
    const x = toX(i);

    // Wick
    ctx.strokeStyle = col;
    ctx.lineWidth = 1 * dpr;
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.moveTo(x, toY(h));
    ctx.lineTo(x, toY(l));
    ctx.stroke();

    // Body — v2.73 gradient fill
    const bodyTop = toY(Math.max(o, c));
    const bodyH   = Math.max(1 * dpr, toY(Math.min(o, c)) - bodyTop);
    if (bodyH > 2 * dpr) {
      const bGrad = ctx.createLinearGradient(0, bodyTop, 0, bodyTop + bodyH);
      if (isGreen) {
        bGrad.addColorStop(0, 'rgba(52,211,153,0.72)');
        bGrad.addColorStop(1, 'rgba(52,211,153,0.98)');
      } else {
        bGrad.addColorStop(0, 'rgba(248,113,113,0.98)');
        bGrad.addColorStop(1, 'rgba(248,113,113,0.72)');
      }
      ctx.fillStyle = bGrad;
    } else {
      ctx.fillStyle = col;
    }
    ctx.fillRect(x - candleW / 2, bodyTop, candleW, bodyH);
  }

  // Indicator overlays (EMA, Bollinger Bands) + Volume Profile
  drawOverlayIndicators(ctx, data, toX, toY, dpr, pL, pR);
  drawVolumeProfile(ctx, data, toY, dpr, W, pL, pR);
  drawNewsAnnotations(ctx, data, toX, pT, dpr);

  // Time labels
  const step = Math.max(1, Math.floor(n / 6));
  ctx.fillStyle = cc.label;
  ctx.font = `${8.5 * dpr}px "Segoe UI Variable", sans-serif`;
  ctx.textAlign = 'center';
  for (let i = 0; i < n; i += step) {
    const d = new Date(data[i].time);
    ctx.fillText(
      d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      toX(i), H - 7 * dpr
    );
  }


  // ── Volume Spike Markers on candle chart ─────
  const _cVols = data.map(d => d.volume || 0);
  const _cNonZero = _cVols.filter(v => v > 0);
  if (_cNonZero.length > 3) {
    const _cAvg = _cNonZero.reduce((a, b) => a + b, 0) / _cNonZero.length;
    const _cThresh = _cAvg * 2.0;
    ctx.save();
    data.forEach((d, i) => {
      if ((_cVols[i] || 0) < _cThresh) return;
      const sx = toX(i);
      const sy = pT + cH;
      const tw = 4.5 * dpr;
      ctx.beginPath();
      ctx.moveTo(sx,        sy - tw * 1.6);
      ctx.lineTo(sx - tw,   sy + tw * 0.4);
      ctx.lineTo(sx + tw,   sy + tw * 0.4);
      ctx.closePath();
      ctx.fillStyle    = 'rgba(245,158,11,0.60)';
      ctx.shadowColor  = 'rgba(245,158,11,0.4)';
      ctx.shadowBlur   = 4 * dpr;
      ctx.fill();
      ctx.shadowBlur = 0;
    });
    ctx.restore();
  }

  // ── Price Action Pattern Annotations (all candles) ────────────────────
  try {
    const paPatterns = detectPriceActionPatterns(data);
    if (paPatterns.length > 0) {
      ctx.save();
      ctx.font = `bold ${7.5 * dpr}px "Segoe UI Variable", sans-serif`;
      const PAD = 3 * dpr, BH = 12 * dpr;
      for (const pat of paPatterns) {
        const d = data[pat.idx];
        const dh = d.high  || d.close;
        const dl = d.low   || d.close;
        const isBull = pat.dir === 'bull';
        const col    = isBull ? '#10b981' : '#ef4444';
        const bgCol  = isBull ? 'rgba(16,185,129,0.13)' : 'rgba(239,68,68,0.13)';
        const bx = toX(pat.idx);
        const tw = ctx.measureText(pat.label).width;
        const bw = tw + PAD * 2;
        // Place above high for bear, below low for bull
        const by = isBull ? toY(dl) + 5 * dpr : toY(dh) - BH - 5 * dpr;
        const rx = Math.min(Math.max(bx - bw / 2, pL), W - pR - bw);
        roundRect(ctx, rx, by, bw, BH, 2.5 * dpr);
        ctx.fillStyle = bgCol; ctx.fill();
        ctx.strokeStyle = col; ctx.lineWidth = 0.6 * dpr; ctx.stroke();
        ctx.fillStyle = col; ctx.textAlign = 'center';
        ctx.fillText(pat.label, rx + bw / 2, by + BH - 3 * dpr);
        // Small arrow from badge to candle
        const ax = bx, ay1 = isBull ? by + BH : by;
        const ay2 = isBull ? toY(dl) : toY(dh);
        ctx.strokeStyle = col; ctx.globalAlpha = 0.35; ctx.lineWidth = 0.8 * dpr;
        ctx.setLineDash([2 * dpr, 2 * dpr]);
        ctx.beginPath(); ctx.moveTo(ax, ay1); ctx.lineTo(ax, ay2); ctx.stroke();
        ctx.setLineDash([]); ctx.globalAlpha = 1;
      }
      ctx.restore();
    }
  } catch (_) {}

  // ── Candle Pattern Badge ───────────────────────────────────────────────
  if (data.length >= 2) {
    const lastIdx = data.length - 1;
    const pattern = detectCandlePattern(data[lastIdx - 1], data[lastIdx]);
    if (pattern) {
      const cx = toX(lastIdx);
      const cd = data[lastIdx];
      const co = cd.open || cd.close;
      const cc2 = cd.close;
      const ch = cd.high || Math.max(co, cc2);
      const cl = cd.low  || Math.min(co, cc2);
      const isBull = pattern.dir === 'bull';
      const isBear = pattern.dir === 'bear';
      const pColor = isBull ? '#10b981' : isBear ? '#ef4444' : '#94a3b8';
      const bgColor = isBull ? 'rgba(16,185,129,0.14)' : isBear ? 'rgba(239,68,68,0.14)' : 'rgba(148,163,184,0.12)';
      ctx.save();
      ctx.font = `bold ${8 * dpr}px "Segoe UI Variable", sans-serif`;
      const tw = ctx.measureText(pattern.name).width;
      const pad = 4 * dpr, bh = 14 * dpr;
      const bw = tw + pad * 2;
      const by = isBull ? toY(cl) + 4 * dpr : toY(ch) - bh - 4 * dpr;
      const bx = Math.min(Math.max(cx - bw / 2, pL), W - pR - bw);
      roundRect(ctx, bx, by, bw, bh, 3 * dpr);
      ctx.fillStyle = bgColor; ctx.fill();
      ctx.strokeStyle = pColor; ctx.lineWidth = 0.7 * dpr; ctx.stroke();
      ctx.fillStyle = pColor; ctx.textAlign = 'center';
      ctx.fillText(pattern.name, bx + bw / 2, by + bh - 3 * dpr);
      ctx.restore();
    }
  }

  // ── Last Price Reference Line (candle) ─────────────────────────────────
  {
    const lastC = data[data.length - 1];
    const lastP = lastC.close;
    const isUp  = lastC.close >= (lastC.open || lastC.close);
    const color = isUp ? '#10b981' : '#ef4444';
    const ly    = toY(lastP);
    if (ly >= pT && ly <= pT + cH) {
      ctx.save();
      const lblTemp = fmtPrice(lastP, sym.fmt);
      ctx.font = `bold ${8.5 * dpr}px "Segoe UI Variable", sans-serif`;
      const lblW  = ctx.measureText(lblTemp).width;
      const pad   = 5 * dpr, bh = 16 * dpr;
      const badgeW = lblW + pad * 2;
      ctx.strokeStyle = color; ctx.lineWidth = 0.8 * dpr;
      ctx.setLineDash([3 * dpr, 4 * dpr]); ctx.globalAlpha = 0.38;
      ctx.beginPath(); ctx.moveTo(pL, ly); ctx.lineTo(W - pR - badgeW - 2 * dpr, ly); ctx.stroke();
      ctx.setLineDash([]); ctx.globalAlpha = 1;
      const bx = W - pR - badgeW;
      roundRect(ctx, bx, ly - bh / 2, badgeW, bh, 3 * dpr);
      ctx.fillStyle = isUp ? 'rgba(16,185,129,0.16)' : 'rgba(239,68,68,0.16)'; ctx.fill();
      ctx.strokeStyle = color; ctx.lineWidth = 0.7 * dpr; ctx.stroke();
      ctx.fillStyle = color; ctx.textAlign = 'right';
      ctx.fillText(lblTemp, W - pR - pad, ly + 3 * dpr);
      ctx.restore();
    }
  }

  if (_hasDrawClipC) ctx.restore(); // end candle draw-in clip

  // Crosshair + OHLC tooltip
  if (mainHoverX >= 0) {
    const mx = mainHoverX * dpr;
    let ni = 0, md = Infinity;
    for (let i = 0; i < n; i++) {
      const dist = Math.abs(toX(i) - mx);
      if (dist < md) { md = dist; ni = i; }
    }
    const d  = data[ni];
    const o  = d.open || d.close;
    const h  = d.high || d.close;
    const l  = d.low  || d.close;
    const c  = d.close;
    const isGreen = c >= o;
    const cx = toX(ni);
    const cy = toY(c);

    ctx.strokeStyle = cc.crosshair;
    ctx.lineWidth = 1; ctx.setLineDash([3 * dpr, 3 * dpr]);
    ctx.beginPath(); ctx.moveTo(cx, pT); ctx.lineTo(cx, pT + cH); ctx.stroke();
    ctx.setLineDash([]);

    const fmt = v => fmtPrice(v, sym.fmt);
    const td  = new Date(d.time).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    // v2.60: add Delta (body) and Range to tooltip
    const delta   = c - o;
    const deltaSign = delta >= 0 ? '+' : '';
    const range     = h - l;
    const deltaTxt  = `  Δ${deltaSign}${fmt(delta)}  R:${fmt(range)}`;
    const txt = `O:${fmt(o)}  H:${fmt(h)}  L:${fmt(l)}  C:${fmt(c)}${deltaTxt}   ${td}`;
    ctx.font = `bold ${9.5 * dpr}px "Segoe UI Variable", sans-serif`;
    const tw = ctx.measureText(txt).width;
    const xp = 8 * dpr, th = 22 * dpr;
    let tx = cx + 12 * dpr;
    if (tx + tw + xp * 2 > W - pR) tx = cx - tw - xp * 2 - 12 * dpr;
    roundRect(ctx, tx, cy - th / 2, tw + xp * 2, th, 4 * dpr);
    ctx.fillStyle = cc.tooltipBg; ctx.fill();
    ctx.fillStyle = isGreen ? '#10b981' : '#ef4444'; ctx.textAlign = 'left';
    ctx.fillText(txt, tx + xp, cy + 3.5 * dpr);
  }

  // ── v2.65: Symbol Watermark (candle chart) ─────────────────────────────
  if (sym && sym.label) {
    ctx.save();
    ctx.globalAlpha = 0.030;
    ctx.font = `bold ${Math.min(80 * dpr, cW * 0.28)}px "Segoe UI Variable", sans-serif`;
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(sym.label, pL + cW / 2, pT + cH / 2);
    ctx.restore();
  }
}

// ── Main chart (full size, crosshair + tooltip) ──
function drawMainChart(canvas, data, sym) {
  // ── Zoom viewport slice (v2.49) ────────────────────────────────────────
  const _total = (data && data.length) || 0;
  const _vs    = (_zoomBars < 0 || !data) ? 0 : Math.max(0, Math.min(_zoomStart, _total - 2));
  const _vb    = (_zoomBars < 0 || !data) ? _total : Math.max(10, Math.min(_zoomBars, _total - _vs));
  const _ve    = _vs + _vb - 1;
  const visData = (data && (_vs > 0 || _ve < _total - 1)) ? data.slice(_vs, _ve + 1) : data;

  if (currentChartType === 'candle') return drawCandlestickChart(canvas, visData, sym);
  if (currentChartType === 'ha')     return drawCandlestickChart(canvas, data ? calcHeikinAshi(data).slice(_vs, _ve + 1) : data, sym);
  if (!canvas || !visData || visData.length < 2) return;

  const dpr = window.devicePixelRatio || 1;
  canvas.width  = canvas.offsetWidth  * dpr;
  canvas.height = canvas.offsetHeight * dpr;
  const W = canvas.width, H = canvas.height;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, W, H);

  const pL = 60 * dpr, pR = 14 * dpr, pT = 10 * dpr, pB = 26 * dpr;
  const cW = W - pL - pR, cH = H - pT - pB;

  const prices = visData.map(d => d.close);
  const isUp   = prices[prices.length - 1] >= prices[0];

  const min = Math.min(...prices), max = Math.max(...prices);
  const rng = max - min || 1;
  const aMin = min - rng * 0.05, aMax = max + rng * 0.05, aRng = aMax - aMin;

  const toX = i => pL + (i / (prices.length - 1)) * cW;
  const toY = p => pT + cH - ((p - aMin) / aRng) * cH;

  // Store coordinate meta for annotation hit-testing + ruler (v2.42)
  _mainChartMeta = { aMin, aMax, aRng, pL, pR, pT, pB, W, H, dpr, cH, n: visData.length, visData };

  const cc = getChartColors();

  // Regime background tint (v2.41) — subtle color based on market regime
  if (_lastRegime === 'trending') {
    ctx.fillStyle = 'rgba(16,185,129,0.035)';
    ctx.fillRect(pL, pT, cW, cH);
  } else if (_lastRegime === 'volatile') {
    ctx.fillStyle = 'rgba(245,158,11,0.035)';
    ctx.fillRect(pL, pT, cW, cH);
  } else {
    ctx.fillStyle = 'rgba(99,102,241,0.030)';
    ctx.fillRect(pL, pT, cW, cH);
  }

  // ── Intraday Session Zones (v2.54) — only on 1D/30m chart ───────────────
  // Detect if data is intraday (bars spaced < 4h apart)
  if (visData.length >= 3) {
    const dtMs = (visData[1].time - visData[0].time) || 0;
    if (dtMs > 0 && dtMs <= 4 * 3600 * 1000) {
      // Pre-market: before 9:30 ET (14:30 UTC), After-hours: after 16:00 ET (21:00 UTC)
      ctx.save();
      for (let i = 0; i < visData.length; i++) {
        const d = new Date(visData[i].time);
        const utcH = d.getUTCHours() + d.getUTCMinutes() / 60;
        const x1 = toX(i);
        const x2 = i < visData.length - 1 ? toX(i + 1) : x1 + cW / visData.length;
        const barW2 = Math.max(1, x2 - x1);
        if (utcH < 14.5) {
          ctx.fillStyle = 'rgba(99,102,241,0.055)';   // pre-market: indigo
          ctx.fillRect(x1, pT, barW2, cH);
        } else if (utcH >= 21.0) {
          ctx.fillStyle = 'rgba(245,158,11,0.055)';   // after-hours: amber
          ctx.fillRect(x1, pT, barW2, cH);
        }
      }
      ctx.restore();
    }
  }

  // ── Volatility aura — right-edge radial glow when |pct| ≥ 1.5% (v2.50) ──
  {
    const _selPct = sym?.id ? (lastKnownPrices[sym.id]?.pct ?? 0) : 0;
    if (Math.abs(_selPct) >= 1.5) {
      const auraRgb = _selPct > 0 ? '16,185,129' : '239,68,68';
      const auraStrength = Math.min(0.13, (Math.abs(_selPct) - 1.5) * 0.028);
      const auraX = W - pR;
      const auraY = toY(prices[prices.length - 1]);
      const auraGrad = ctx.createRadialGradient(auraX, auraY, 0, auraX, auraY, cW * 0.6);
      auraGrad.addColorStop(0,   `rgba(${auraRgb},${auraStrength.toFixed(3)})`);
      auraGrad.addColorStop(0.5, `rgba(${auraRgb},${(auraStrength * 0.4).toFixed(3)})`);
      auraGrad.addColorStop(1,   `rgba(${auraRgb},0)`);
      ctx.fillStyle = auraGrad;
      ctx.fillRect(pL, pT, cW, cH);
    }
  }

  // Grid lines + price labels
  const gridN = 5;
  for (let i = 0; i <= gridN; i++) {
    const y = pT + (cH / gridN) * i;
    const p = aMax - (aRng / gridN) * i;
    ctx.strokeStyle = cc.grid;
    ctx.lineWidth = 1; ctx.setLineDash([]);
    ctx.beginPath(); ctx.moveTo(pL, y); ctx.lineTo(W - pR, y); ctx.stroke();
    ctx.fillStyle = cc.label;
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

  // ── Animated draw-in clip (v2.48) ──────────────────────────────────────
  const _hasDrawClip = _chartClipFrac < 0.9999;
  if (_hasDrawClip) {
    ctx.save();
    ctx.beginPath();
    ctx.rect(pL, 0, cW * _chartClipFrac, H);
    ctx.clip();
  }

  // Gap Detection Bands removed (v2.87) — too noisy on area chart with daily intervals

  // Gradient fill — theme aware (v2.56)
  const _tc = getThemeColors(isUp);
  const grad = ctx.createLinearGradient(0, pT, 0, pT + cH);
  grad.addColorStop(0,   _tc.fill[0]);
  grad.addColorStop(0.7, _tc.fill[1]);
  grad.addColorStop(1,   _tc.fill[2]);
  ctx.beginPath(); buildPath();
  ctx.lineTo(toX(prices.length - 1), pT + cH);
  ctx.lineTo(toX(0), pT + cH); ctx.closePath();
  ctx.fillStyle = grad; ctx.fill();

  // Price line — theme aware (v2.56)
  const color = _tc.line;
  ctx.beginPath(); buildPath();
  ctx.strokeStyle = color; ctx.lineWidth = 2 * dpr;
  ctx.lineJoin = 'round'; ctx.setLineDash([]); ctx.stroke();

  // ── Animated Price Trail Glow (v2.91) — last 15 bars glowing trail ──────
  // Adds a luminous glow overlay that fades in toward the "now" edge
  {
    const trailLen = Math.min(15, prices.length - 1);
    if (trailLen >= 3) {
      const trailRgb  = isUp ? '52,211,153' : '248,113,113';
      ctx.save();
      ctx.lineJoin = 'round';
      ctx.lineCap  = 'round';
      const trailStart = prices.length - 1 - trailLen;
      for (let i = trailStart + 1; i < prices.length; i++) {
        const frac   = (i - trailStart) / trailLen; // 0→1 toward now
        const alpha  = 0.05 + frac * 0.50;
        const blur   = (1 + frac * 6) * dpr;
        const lw     = (1.8 + frac * 2.5) * dpr;
        ctx.shadowColor = `rgba(${trailRgb},${(alpha * 0.9).toFixed(2)})`;
        ctx.shadowBlur  = blur;
        ctx.strokeStyle = `rgba(${trailRgb},${alpha.toFixed(2)})`;
        ctx.lineWidth   = lw;
        ctx.beginPath();
        ctx.moveTo(toX(i - 1), toY(prices[i - 1]));
        const xm = (toX(i - 1) + toX(i)) / 2;
        ctx.quadraticCurveTo(toX(i - 1), toY(prices[i - 1]), xm, (toY(prices[i - 1]) + toY(prices[i])) / 2);
        ctx.stroke();
      }
      // Glowing endpoint dot
      const ex = toX(prices.length - 1);
      const ey = toY(prices[prices.length - 1]);
      const now = performance.now();
      const pulse = 0.65 + 0.35 * Math.sin(now / 500); // 0.65..1.0 breathing
      ctx.shadowColor = `rgba(${trailRgb},${(0.9 * pulse).toFixed(2)})`;
      ctx.shadowBlur  = 14 * dpr * pulse;
      ctx.fillStyle   = `rgba(${trailRgb},${(0.95 * pulse).toFixed(2)})`;
      ctx.beginPath();
      ctx.arc(ex, ey, 4 * dpr, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.restore();
    }
  }

  // ── Liquidity Heat Trail — price line colored by volume intensity (v2.55) ─
  {
    const vols   = visData.map(d => d.volume || 0);
    const avgVol = vols.reduce((a, b) => a + b, 0) / (vols.length || 1) || 1;
    const maxVol = Math.max(...vols, 1);
    if (maxVol > 0) {
      ctx.save();
      ctx.lineWidth = 2.5 * dpr;
      ctx.lineJoin  = 'round';
      ctx.lineCap   = 'round';
      for (let i = 1; i < prices.length; i++) {
        const vol     = vols[i] || 0;
        const relVol  = vol / avgVol;
        const alpha   = Math.min(0.85, 0.12 + relVol * 0.22);
        if (alpha < 0.14) continue;  // skip low-volume segments
        const segUp   = prices[i] >= prices[i - 1];
        const rgb     = segUp ? '52,211,153' : '248,113,113';   // emerald / red-400
        ctx.strokeStyle = `rgba(${rgb},${alpha.toFixed(2)})`;
        ctx.shadowColor = `rgba(${rgb},${(alpha * 0.6).toFixed(2)})`;
        ctx.shadowBlur  = 4 * dpr;
        ctx.beginPath();
        ctx.moveTo(toX(i - 1), toY(prices[i - 1]));
        const xm = (toX(i - 1) + toX(i)) / 2;
        const ym = (toY(prices[i - 1]) + toY(prices[i])) / 2;
        ctx.quadraticCurveTo(toX(i - 1), toY(prices[i - 1]), xm, ym);
        ctx.stroke();
      }
      ctx.shadowBlur = 0;
      ctx.restore();
    }
  }

  // Indicator overlays (EMA, Bollinger Bands) + Volume Profile
  drawOverlayIndicators(ctx, visData, toX, toY, dpr, pL, pR);
  drawVolumeProfile(ctx, visData, toY, dpr, W, pL, pR);
  drawNewsAnnotations(ctx, visData, toX, pT, dpr);

  if (_hasDrawClip) ctx.restore(); // end draw-in clip

  // Time labels
  const step = Math.max(1, Math.floor(prices.length / 6));
  ctx.fillStyle = cc.label;
  ctx.font = `${8.5 * dpr}px "Segoe UI Variable", sans-serif`;
  ctx.textAlign = 'center';
  for (let i = 0; i < prices.length; i += step) {
    const d = new Date(visData[i].time);
    ctx.fillText(
      d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      toX(i), H - 7 * dpr
    );
  }


  // ── Earnings date markers ────────────────────
  const _earnMarks = (sym && _earningsDateMarks[sym.symbol]) || [];
  if (_earnMarks.length) {
    _earnMarks.forEach(mark => {
      const ts = new Date(mark.date + 'T12:00:00Z').getTime();
      let ni = 0, md = Infinity;
      visData.forEach((d, i) => { const dist = Math.abs(d.time - ts); if (dist < md) { md = dist; ni = i; } });
      if (md > 8 * 86_400_000) return; // only if within 8 days of a data point
      const ex = toX(ni);
      // Faint vertical marker
      ctx.save();
      ctx.strokeStyle = 'rgba(168,85,247,0.22)';
      ctx.lineWidth = 1.5 * dpr;
      ctx.setLineDash([3 * dpr, 3 * dpr]);
      ctx.beginPath(); ctx.moveTo(ex, pT); ctx.lineTo(ex, pT + cH); ctx.stroke();
      ctx.setLineDash([]);
      // "E" badge at bottom
      const bw = 18 * dpr, bh = 13 * dpr;
      roundRect(ctx, ex - bw / 2, pT + cH - bh, bw, bh, 3 * dpr);
      ctx.fillStyle = 'rgba(168,85,247,0.20)'; ctx.fill();
      ctx.fillStyle = '#a855f7';
      ctx.font = `bold ${7.5 * dpr}px "Segoe UI Variable", sans-serif`;
      ctx.textAlign = 'center';
      ctx.fillText('E', ex, pT + cH - 2.5 * dpr);
      // Beat/Miss badge
      if (mark.actualEarningResult != null && mark.estimatedEarning != null) {
        const beat = mark.actualEarningResult > mark.estimatedEarning;
        roundRect(ctx, ex + 3 * dpr, pT + cH - bh - 14 * dpr, 20 * dpr, 11 * dpr, 2 * dpr);
        ctx.fillStyle = beat ? 'rgba(16,185,129,0.20)' : 'rgba(239,68,68,0.20)'; ctx.fill();
        ctx.fillStyle = beat ? '#10b981' : '#ef4444';
        ctx.font = `bold ${8 * dpr}px "Segoe UI Variable", sans-serif`;
        ctx.fillText(beat ? '▲' : '▼', ex + 13 * dpr, pT + cH - bh - 5 * dpr);
      }
      ctx.restore();
    });
  }

  // ── Volume Spike Markers ─────────────────────
  // Mark candles where volume > 2× average with a small amber triangle at chart bottom
  const _vols = visData.map(d => d.volume || 0);
  const _nonZeroVols = _vols.filter(v => v > 0);
  if (_nonZeroVols.length > 3) {
    const _avgVol = _nonZeroVols.reduce((a, b) => a + b, 0) / _nonZeroVols.length;
    const _spikeThresh = _avgVol * 2.0;
    ctx.save();
    visData.forEach((d, i) => {
      if ((_vols[i] || 0) < _spikeThresh) return;
      const sx = toX(i);
      const sy = pT + cH;
      // Upward-pointing triangle rising from chart bottom edge
      const tw = 4.5 * dpr;
      ctx.beginPath();
      ctx.moveTo(sx,        sy - tw * 1.6);   // tip (into chart)
      ctx.lineTo(sx - tw,   sy + tw * 0.4);   // bottom-left
      ctx.lineTo(sx + tw,   sy + tw * 0.4);   // bottom-right
      ctx.closePath();
      ctx.fillStyle = 'rgba(245,158,11,0.60)';
      ctx.shadowColor  = 'rgba(245,158,11,0.4)';
      ctx.shadowBlur   = 4 * dpr;
      ctx.fill();
      ctx.shadowBlur = 0;
    });
    ctx.restore();
  }

  // ── Annotation lines (S/R horizontal levels) ─
  const _anns = (sym && chartAnnotations[sym.symbol]) || [];
  if (_anns.length) {
    ctx.save();
    _anns.forEach(ann => {
      const ay = toY(ann.price);
      if (ay < pT - 2 * dpr || ay > pT + cH + 2 * dpr) return;
      const annColor = ann.color || '#f59e0b';
      ctx.strokeStyle = annColor;
      ctx.lineWidth   = 1.5 * dpr;
      ctx.setLineDash([6 * dpr, 3 * dpr]);
      ctx.globalAlpha = 0.8;
      ctx.beginPath();
      ctx.moveTo(pL, ay);
      ctx.lineTo(W - pR, ay);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.globalAlpha = 1;
      // Price label pill on right
      const lbl = fmtPrice(ann.price, sym.fmt);
      ctx.font = `bold ${9 * dpr}px "Segoe UI Variable", sans-serif`;
      const lw  = ctx.measureText(lbl).width;
      const pad = 5 * dpr;
      roundRect(ctx, W - pR - lw - pad * 2, ay - 9 * dpr, lw + pad * 2, 18 * dpr, 3 * dpr);
      ctx.fillStyle = 'rgba(245,158,11,0.18)';
      ctx.fill();
      ctx.fillStyle = annColor;
      ctx.textAlign = 'right';
      ctx.fillText(lbl, W - pR - pad, ay + 3.5 * dpr);
    });
    ctx.restore();
  }

  // ── Watchlist alert price lines ───────────────
  if (sym && watchlistItems) {
    const wlItem = watchlistItems.find(i => i.symbol === sym.symbol);
    if (wlItem) {
      const drawAlertLine = (price, isAbove) => {
        if (price == null || isNaN(price)) return;
        const ay = toY(price);
        if (ay < pT - 2 * dpr || ay > pT + cH + 2 * dpr) return;
        const col = isAbove ? 'rgba(16,185,129,0.75)' : 'rgba(239,68,68,0.75)';
        ctx.strokeStyle = col;
        ctx.lineWidth   = 1.2 * dpr;
        ctx.setLineDash([4 * dpr, 4 * dpr]);
        ctx.globalAlpha = 0.65;
        ctx.beginPath(); ctx.moveTo(pL, ay); ctx.lineTo(W - pR, ay); ctx.stroke();
        ctx.setLineDash([]); ctx.globalAlpha = 1;
        const lbl = (isAbove ? '↑ ' : '↓ ') + fmtPrice(price, sym.fmt);
        ctx.font = `bold ${8.5 * dpr}px "Segoe UI Variable", sans-serif`;
        const lw = ctx.measureText(lbl).width + 8 * dpr;
        roundRect(ctx, pL, ay - 8 * dpr, lw, 16 * dpr, 3 * dpr);
        ctx.fillStyle = isAbove ? 'rgba(16,185,129,0.18)' : 'rgba(239,68,68,0.18)';
        ctx.fill();
        ctx.fillStyle = col; ctx.textAlign = 'left';
        ctx.fillText(lbl, pL + 4 * dpr, ay + 3 * dpr);
      };
      drawAlertLine(wlItem.alertAbove, true);
      drawAlertLine(wlItem.alertBelow, false);
    }
  }

  // ── Fibonacci Retracement Overlay (F key toggle) ──────────────────────
  if (_showFib && aRng > 0) {
    const FIB_LEVELS = [
      { r: 0.000, lbl: '0%',    col: 'rgba(100,116,139,0.5)'  },
      { r: 0.236, lbl: '23.6%', col: 'rgba(16,185,129,0.65)'  },
      { r: 0.382, lbl: '38.2%', col: 'rgba(59,130,246,0.65)'  },
      { r: 0.500, lbl: '50.0%', col: 'rgba(168,85,247,0.75)'  },
      { r: 0.618, lbl: '61.8%', col: 'rgba(245,158,11,0.65)'  },
      { r: 0.786, lbl: '78.6%', col: 'rgba(239,68,68,0.55)'   },
      { r: 1.000, lbl: '100%',  col: 'rgba(100,116,139,0.5)'  },
      // ── v2.61 Fibonacci Extensions ──────────────────────────────────────
      { r: 1.272, lbl: '127.2%', col: 'rgba(244,114,182,0.55)' },
      { r: 1.618, lbl: '161.8%', col: 'rgba(249,115,22,0.60)'  },
      { r: 2.000, lbl: '200%',   col: 'rgba(239,68,68,0.45)'   },
      { r: 2.618, lbl: '261.8%', col: 'rgba(239,68,68,0.35)'   },
    ];
    const fibFont = `${8 * dpr}px "Segoe UI Variable", sans-serif`;
    ctx.save();
    FIB_LEVELS.forEach(({ r, lbl, col }) => {
      const fibPrice = aMin + r * aRng;
      const fy = toY(fibPrice);
      if (fy < pT || fy > pT + cH) return;
      ctx.setLineDash([3 * dpr, 4 * dpr]);
      ctx.strokeStyle = col;
      ctx.lineWidth   = 1 * dpr;
      ctx.globalAlpha = 0.9;
      ctx.beginPath();
      ctx.moveTo(pL, fy);
      ctx.lineTo(pL + (pR - pL), fy);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.globalAlpha = 1;
      // Label on right side
      const priceLbl = `${lbl}  ${fmtPrice(fibPrice, sym?.fmt || 'dec')}`;
      ctx.font = fibFont;
      const lw = ctx.measureText(priceLbl).width + 8 * dpr;
      ctx.fillStyle = col.replace('0.65', '0.18').replace('0.75', '0.22').replace('0.5', '0.14').replace('0.55', '0.14');
      roundRect(ctx, pR - lw - 2 * dpr, fy - 7.5 * dpr, lw, 15 * dpr, 3 * dpr);
      ctx.fill();
      ctx.fillStyle = col.replace(/0\.\d+\)$/, '1)');
      ctx.textAlign = 'right';
      ctx.fillText(priceLbl, pR - 4 * dpr, fy + 3 * dpr);
    });
    ctx.restore();
    // FIB badge in top-left corner of chart
    ctx.save();
    ctx.font = `bold ${9 * dpr}px "Segoe UI Variable", sans-serif`;
    ctx.fillStyle = 'rgba(168,85,247,0.9)';
    ctx.textAlign = 'left';
    ctx.fillText('FIB', pL + 6 * dpr, pT + 14 * dpr);
    ctx.restore();
  }

  // ── Last Price Reference Line ──────────────────────────────────────────
  {
    const lastP = prices[prices.length - 1];
    const ly = toY(lastP);
    if (ly >= pT && ly <= pT + cH) {
      ctx.save();
      ctx.strokeStyle = color;
      ctx.lineWidth   = 0.8 * dpr;
      ctx.setLineDash([3 * dpr, 4 * dpr]);
      ctx.globalAlpha = 0.38;
      const lblTemp = fmtPrice(lastP, sym.fmt);
      const lblW = (() => { ctx.font = `bold ${8.5 * dpr}px "Segoe UI Variable", sans-serif`; return ctx.measureText(lblTemp).width; })();
      const badgeW = lblW + 10 * dpr;
      ctx.beginPath(); ctx.moveTo(pL, ly); ctx.lineTo(W - pR - badgeW - 2 * dpr, ly); ctx.stroke();
      ctx.setLineDash([]); ctx.globalAlpha = 1;
      const pad = 5 * dpr, bh = 16 * dpr;
      const bx = W - pR - badgeW;
      roundRect(ctx, bx, ly - bh / 2, badgeW, bh, 3 * dpr);
      ctx.fillStyle = isUp ? 'rgba(16,185,129,0.16)' : 'rgba(239,68,68,0.16)'; ctx.fill();
      ctx.strokeStyle = color; ctx.lineWidth = 0.7 * dpr; ctx.stroke();
      ctx.fillStyle = color; ctx.textAlign = 'right';
      ctx.fillText(lblTemp, W - pR - pad, ly + 3 * dpr);
      ctx.restore();
    }
  }

  // ── Live Price Pulse Ring (v2.49) ─────────────────────────────────────────
  if (_pulseRings.length > 0) {
    const lastPx = toX(prices.length - 1);
    const lastPy = toY(prices[prices.length - 1]);
    ctx.save();
    _pulseRings.forEach(ring => {
      if (ring.alpha <= 0.01) return;
      ctx.beginPath();
      ctx.arc(lastPx, lastPy, ring.r * dpr, 0, Math.PI * 2);
      ctx.strokeStyle = color;
      ctx.globalAlpha = ring.alpha;
      ctx.lineWidth   = 1.5 * dpr;
      ctx.stroke();
    });
    ctx.restore();
  }

  // ── Price Level Bubbles — Day Hi/Lo on Y-axis (v2.49) ────────────────────
  {
    const _cachedQ = lastKnownPrices[sym?.id];
    if (_cachedQ?.dayHigh && _cachedQ?.dayLow) {
      const bubbles = [
        { p: _cachedQ.dayHigh, label: '↑Hi', col: '#ef4444' },
        { p: _cachedQ.dayLow,  label: '↓Lo', col: '#10b981' },
      ];
      ctx.save();
      ctx.font = `bold ${7.5 * dpr}px "Segoe UI Variable", sans-serif`;
      bubbles.forEach(({ p, label, col }) => {
        const py = toY(p);
        if (py < pT || py > pT + cH) return;
        const txt = `${label} ${fmtPrice(p, sym.fmt)}`;
        const tw  = ctx.measureText(txt).width;
        const bw  = tw + 8 * dpr, bh = 13 * dpr;
        const bx  = pL + 5 * dpr;
        roundRect(ctx, bx, py - bh / 2, bw, bh, 3 * dpr);
        ctx.fillStyle   = col + '18'; ctx.fill();
        ctx.strokeStyle = col + '50'; ctx.lineWidth = 0.5 * dpr; ctx.stroke();
        ctx.fillStyle   = col; ctx.textAlign = 'left';
        ctx.fillText(txt, bx + 4 * dpr, py + 3 * dpr);
      });
      ctx.restore();
    }
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

    ctx.strokeStyle = cc.crosshair;
    ctx.lineWidth = 1; ctx.setLineDash([3 * dpr, 3 * dpr]);
    ctx.beginPath(); ctx.moveTo(cx, pT); ctx.lineTo(cx, pT + cH); ctx.stroke();
    ctx.setLineDash([]);

    ctx.beginPath(); ctx.arc(cx, cy, 4 * dpr, 0, Math.PI * 2);
    ctx.fillStyle = color; ctx.fill();
    ctx.strokeStyle = cc.dotRing; ctx.lineWidth = 1.5 * dpr; ctx.stroke();

    // ── Enhanced glass tooltip (v2.48 + v2.52 volume) ───────────────────
    const tp   = fmtPrice(prices[ni], sym.fmt);
    const td   = new Date(visData[ni].time).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const pct0 = prices[0] ? ((prices[ni] - prices[0]) / prices[0]) * 100 : 0;
    const pctTxt = (pct0 >= 0 ? '+' : '') + pct0.toFixed(2) + '%';
    // Volume line (v2.52) — format as K/M
    const barVol = visData[ni]?.volume || 0;
    const allVols = visData.map(d => d.volume || 0);
    const avgVol52 = allVols.reduce((a, b) => a + b, 0) / (allVols.length || 1);
    const volRel = avgVol52 > 0 ? (barVol / avgVol52) : 1;
    const volFmt = barVol >= 1e9 ? (barVol / 1e9).toFixed(1) + 'B'
                 : barVol >= 1e6 ? (barVol / 1e6).toFixed(1) + 'M'
                 : barVol >= 1e3 ? (barVol / 1e3).toFixed(0) + 'K' : barVol ? barVol.toFixed(0) : '';
    const volTxt = volFmt ? `Vol ${volFmt} (${volRel.toFixed(1)}×avg)` : '';
    const showVolLine = !!volTxt;
    const fSz = 10 * dpr;
    ctx.font = `bold ${fSz}px "Segoe UI Variable", sans-serif`;
    const priceW = ctx.measureText(tp).width;
    ctx.font = `${fSz * 0.88}px "Segoe UI Variable", sans-serif`;
    const pctW   = ctx.measureText(pctTxt).width;
    const dateW  = ctx.measureText(td).width;
    const volW   = showVolLine ? ctx.measureText(volTxt).width : 0;
    const line1W = priceW + 8 * dpr + pctW;
    const ttW    = Math.max(line1W, dateW, volW) + 20 * dpr;
    const ttH    = showVolLine ? 55 * dpr : 42 * dpr;
    const xp     = 10 * dpr;
    let tx = cx + 14 * dpr;
    if (tx + ttW > W - pR) tx = cx - ttW - 14 * dpr;
    const ty = Math.max(pT, Math.min(cy - ttH / 2, pT + cH - ttH));
    // Tooltip bg
    ctx.save();
    roundRect(ctx, tx, ty, ttW, ttH, 6 * dpr);
    ctx.fillStyle = 'rgba(10,12,20,0.88)'; ctx.fill();
    ctx.strokeStyle = isUp ? 'rgba(16,185,129,0.4)' : 'rgba(239,68,68,0.4)';
    ctx.lineWidth = 1 * dpr; ctx.stroke();
    // Price line
    ctx.font = `bold ${fSz}px "Segoe UI Variable", sans-serif`;
    ctx.fillStyle = cc.tooltipTxt; ctx.textAlign = 'left';
    ctx.fillText(tp, tx + xp, ty + 16 * dpr);
    // Pct badge
    ctx.font = `600 ${fSz * 0.85}px "Segoe UI Variable", sans-serif`;
    ctx.fillStyle = isUp ? '#10b981' : '#ef4444';
    ctx.fillText(pctTxt, tx + xp + priceW + 7 * dpr, ty + 16 * dpr);
    // Date line
    ctx.font = `${fSz * 0.8}px "Segoe UI Variable", sans-serif`;
    ctx.fillStyle = 'rgba(148,163,184,0.75)';
    ctx.fillText(td, tx + xp, ty + 30 * dpr);
    // Volume line (v2.52)
    if (showVolLine) {
      const vAlpha = Math.min(0.9, 0.45 + volRel * 0.15);
      ctx.fillStyle = volRel > 1.5 ? `rgba(251,191,36,${vAlpha})` : `rgba(148,163,184,0.65)`;
      ctx.fillText(volTxt, tx + xp, ty + 44 * dpr);
    }
    ctx.restore();
  }

  // ── Chart Time Ruler (v2.42) — T key, click-click measurement ─────────
  if (_rulerMode && _rulerClicks.length > 0) {
    const n2 = prices.length;
    const toXR = i => pL + (i / (n2 - 1)) * cW;
    ctx.save();
    _rulerClicks.forEach(click => {
      if (click.dataIdx < 0 || click.dataIdx >= n2) return;
      const x = toXR(click.dataIdx);
      ctx.strokeStyle = 'rgba(250,204,21,0.75)';
      ctx.lineWidth   = 1 * dpr; ctx.setLineDash([4 * dpr, 3 * dpr]);
      ctx.beginPath(); ctx.moveTo(x, pT); ctx.lineTo(x, pT + cH); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = 'rgba(250,204,21,0.95)';
      ctx.beginPath(); ctx.arc(x, pT + 5 * dpr, 4 * dpr, 0, Math.PI * 2); ctx.fill();
    });
    if (_rulerClicks.length === 2) {
      const [c1, c2] = [..._rulerClicks].sort((a, b) => a.dataIdx - b.dataIdx);
      const x1 = toXR(c1.dataIdx), x2 = toXR(c2.dataIdx);
      const barCount = c2.dataIdx - c1.dataIdx;
      const ms1 = visData[c1.dataIdx]?.time, ms2 = visData[c2.dataIdx]?.time;
      const dayCount = (ms1 && ms2) ? Math.round(Math.abs(ms2 - ms1) / 86400000) : barCount;
      const midX = (x1 + x2) / 2, measY = pT + 18 * dpr;
      ctx.strokeStyle = 'rgba(250,204,21,0.7)';
      ctx.lineWidth = 1.5 * dpr; ctx.setLineDash([]);
      ctx.beginPath(); ctx.moveTo(x1, measY); ctx.lineTo(x2, measY); ctx.stroke();
      [x1, x2].forEach(x => {
        ctx.beginPath(); ctx.moveTo(x, measY - 4 * dpr); ctx.lineTo(x, measY + 4 * dpr); ctx.stroke();
      });
      const lbl = `${barCount}B · ${dayCount}d`;
      ctx.font = `bold ${9 * dpr}px "Segoe UI Variable", sans-serif`;
      const tw2 = ctx.measureText(lbl).width;
      const pw = tw2 + 12 * dpr, ph = 15 * dpr;
      const px = midX - pw / 2, py = measY - ph - 4 * dpr;
      ctx.fillStyle = 'rgba(250,204,21,0.92)';
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(px, py, pw, ph, 3 * dpr); else ctx.rect(px, py, pw, ph);
      ctx.fill();
      ctx.fillStyle = '#000'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(lbl, midX, py + ph / 2);
    }
    ctx.restore();
  }

  // ── v2.65: Symbol Watermark ──────────────────────────────────────────────
  if (sym && sym.label) {
    ctx.save();
    ctx.globalAlpha = 0.035;
    ctx.font = `bold ${Math.min(80 * dpr, cW * 0.28)}px "Segoe UI Variable", sans-serif`;
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(sym.label, pL + cW / 2, pT + cH / 2);
    ctx.restore();
  }

  // ── Live Price Dot overlay (v2.50) — CSS-animated breathing dot at last price ──
  const _lpDot = document.getElementById('live-price-dot');
  if (_lpDot) {
    const lastPx = toX(prices.length - 1) / dpr;
    const lastPy = toY(prices[prices.length - 1]) / dpr;
    _lpDot.style.left    = lastPx + 'px';
    _lpDot.style.top     = lastPy + 'px';
    _lpDot.style.background = color;
    _lpDot.style.boxShadow  = `0 0 10px 3px ${color}88, 0 0 22px 8px ${color}33`;
    _lpDot.style.display    = 'block';
  }
}

// ── Build Symbol Strip ────────────────────────
function buildSymbolStrip(catId) {
  const strip = document.getElementById('home-symbol-strip');
  if (!strip) return;

  let syms;
  let moversMode = false;
  if (catId === 'all') {
    syms = ALL_HOME_SYMBOLS;
  } else if (catId === 'movers') {
    // Top 5 gainers + top 5 losers by % change
    moversMode = true;
    const scored = ALL_HOME_SYMBOLS
      .filter(s => lastKnownPrices[s.id] != null)
      .sort((a, b) => lastKnownPrices[b.id].pct - lastKnownPrices[a.id].pct);
    if (scored.length < 4) {
      // Not enough data yet — show all
      syms = ALL_HOME_SYMBOLS;
    } else {
      const half = Math.min(5, Math.floor(scored.length / 2));
      const gainers = scored.slice(0, half);
      const losers  = scored.slice(-half).reverse();
      syms = [...gainers, ...losers];
    }
  } else {
    const cat = HOME_CATEGORIES.find(c => c.id === catId);
    syms = cat ? cat.symbols : ALL_HOME_SYMBOLS;
  }

  // Pinned symbols first, then rest — no duplicates (skip pin sort in movers mode)
  let ordered;
  if (moversMode) {
    ordered = syms;  // preserve gainers-first order
  } else {
    const pinned   = syms.filter(s => pinnedSymbols.includes(s.id));
    const unpinned = syms.filter(s => !pinnedSymbols.includes(s.id));
    ordered = [...pinned, ...unpinned];
  }

  // In movers mode, add separator between gainers and losers
  const half = moversMode ? Math.ceil(ordered.length / 2) : -1;
  strip.innerHTML = ordered.map((s, idx) => {
    const known     = lastKnownPrices[s.id];
    const priceStr  = known ? fmtPrice(known.price, s.fmt) : '–';
    const isPos     = known ? known.change >= 0 : null;
    const changeStr = known ? `${isPos ? '+' : ''}${known.pct.toFixed(2)}%` : '–';
    const changeCls = known ? (isPos ? 'positive' : 'negative') : 'neutral';
    const isActive  = s.id === selectedChartSym.id;
    const bigMove   = known && Math.abs(known.pct) >= 2.0;
    const isPinned  = pinnedSymbols.includes(s.id);
    // v2.88 — Clean minimal chips: label + price + change only
    const sep = (moversMode && idx === half)
      ? `<div class="mover-sep" title="losers below">▼</div>`
      : '';
    return `${sep}
      <div class="sym-chip${isActive ? ' active' : ''}${isPinned ? ' pinned' : ''}" id="chip-${s.id}" data-sym-id="${s.id}">
        <button class="chip-pin${isPinned ? ' active' : ''}" id="cpin-${s.id}" title="${isPinned ? 'Unpin' : 'Pin to top'}">📌</button>
        <span class="chip-label">${s.label}</span>
        <span class="chip-price${!known ? ' skeleton' : ''}" id="sprice-${s.id}">${priceStr}</span>
        <span class="chip-change ${changeCls}" id="schange-${s.id}">${changeStr}</span>
        <button class="chip-why" id="cwhy-${s.id}" style="visibility:${bigMove ? 'visible' : 'hidden'}" title="Why is ${s.label} moving?">WHY?</button>
      </div>`;
  }).join('');

  if (!strip._chipClickDelegated) {
    strip._chipClickDelegated = true;
    strip.addEventListener('click', (e) => {
      // Pin button
      const pinBtn = e.target.closest('.chip-pin');
      if (pinBtn) {
        e.stopPropagation();
        const symId = pinBtn.closest('.sym-chip').dataset.symId;
        if (pinnedSymbols.includes(symId)) {
          pinnedSymbols = pinnedSymbols.filter(id => id !== symId);
        } else {
          pinnedSymbols = [symId, ...pinnedSymbols];
        }
        localStorage.setItem('fh_pinned', JSON.stringify(pinnedSymbols));
        buildSymbolStrip(activeCatId);
        return;
      }
      // WHY? button
      const whyBtn = e.target.closest('.chip-why');
      if (whyBtn) {
        e.stopPropagation();
        const symId = whyBtn.closest('.sym-chip').dataset.symId;
        const sym = ALL_HOME_SYMBOLS.find(s => s.id === symId);
        if (sym) showWhyOverlay(sym);
        return;
      }
      // Chip body -> select chart symbol
      const chip = e.target.closest('.sym-chip');
      if (chip) {
        const sym = ALL_HOME_SYMBOLS.find(s => s.id === chip.dataset.symId);
        if (sym) selectMainChartSym(sym);
      }
    });

    // v2.62 — Right-click context menu on chip
    strip.addEventListener('contextmenu', (e) => {
      const chip = e.target.closest('.sym-chip');
      if (!chip) return;
      e.preventDefault();
      const symId = chip.dataset.symId;
      const sym = ALL_HOME_SYMBOLS.find(s => s.id === symId);
      if (!sym) return;
      showChipContextMenu(e.clientX, e.clientY, sym);
    });

    // v2.91 — Rich hover tooltip on chip
    strip.addEventListener('mouseenter', (e) => {
      const chip = e.target.closest('.sym-chip');
      if (!chip) return;
      const symId = chip.dataset.symId;
      const sym   = ALL_HOME_SYMBOLS.find(s => s.id === symId);
      if (!sym) return;
      showChipRichTooltip(chip, sym);
    }, true);
    strip.addEventListener('mouseleave', (e) => {
      if (!e.target.closest('.sym-chip')) hideChipRichTooltip();
    }, true);
  }
}

// ── v2.91 Rich Chip Hover Tooltip ─────────────
let _chipTooltipEl = null;
let _chipTooltipTimer = null;

function showChipRichTooltip(chipEl, sym) {
  clearTimeout(_chipTooltipTimer);
  _chipTooltipTimer = setTimeout(() => {
    hideChipRichTooltip();
    const lk  = lastKnownPrices[sym.id];
    if (!lk) return;

    const pct = lk.pct ?? 0;
    const pSign = pct >= 0 ? '+' : '';
    const pctColor = pct >= 0 ? '#4ade80' : '#f87171';

    // RSI from cache
    let rsiHtml = '';
    const dataKey = Object.keys(chartDataCache).find(k => k.startsWith(sym.id + '|'));
    if (dataKey) {
      const data = chartDataCache[dataKey];
      if (data && data.length >= 15) {
        const closes = data.map(d => d.close);
        const rsiArr = calcRSI(closes, 14);
        const rsiVal = rsiArr[rsiArr.length - 1];
        if (rsiVal != null) {
          const rsiColor = rsiVal >= 70 ? '#f87171' : rsiVal <= 30 ? '#4ade80' : '#94a3b8';
          rsiHtml = `<div class="chip-tt-row"><span class="chip-tt-key">RSI 14</span><span class="chip-tt-val" style="color:${rsiColor}">${rsiVal.toFixed(1)}</span></div>`;
        }
      }
    }

    // Conviction
    const cv = calcConvictionScore(sym.id);
    const cvHtml = cv ? `<div class="chip-tt-row"><span class="chip-tt-key">Conviction</span><span class="chip-tt-val" style="color:${cv.color}">${cv.score} — ${cv.label}</span></div>` : '';

    // Day range bar
    let rangeHtml = '';
    if (lk.dayHigh && lk.dayLow && lk.dayHigh > lk.dayLow) {
      const pos = Math.round(((lk.price - lk.dayLow) / (lk.dayHigh - lk.dayLow)) * 100);
      rangeHtml = `<div class="chip-tt-range-wrap">
        <span class="chip-tt-lo">${fmtPrice(lk.dayLow, sym.fmt)}</span>
        <div class="chip-tt-range-track"><div class="chip-tt-range-dot" style="left:${pos}%"></div></div>
        <span class="chip-tt-hi">${fmtPrice(lk.dayHigh, sym.fmt)}</span>
      </div>`;
    }

    const el = document.createElement('div');
    el.className = 'chip-rich-tooltip';
    el.innerHTML = `
      <div class="chip-tt-header">
        <span class="chip-tt-label">${sym.label}</span>
        <span class="chip-tt-ticker">${sym.symbol}</span>
      </div>
      <div class="chip-tt-price">${fmtPrice(lk.price, sym.fmt)}</div>
      <div class="chip-tt-row"><span class="chip-tt-key">Change</span><span class="chip-tt-val" style="color:${pctColor}">${pSign}${pct.toFixed(2)}%</span></div>
      ${rsiHtml}
      ${cvHtml}
      ${rangeHtml ? '<div class="chip-tt-section-label">Day Range</div>' + rangeHtml : ''}
    `;

    document.body.appendChild(el);
    _chipTooltipEl = el;

    // Position: below the chip, centered
    const rect = chipEl.getBoundingClientRect();
    const tw = el.offsetWidth || 180;
    const th = el.offsetHeight || 100;
    let left = rect.left + rect.width / 2 - tw / 2;
    let top  = rect.bottom + 6;
    left = Math.max(8, Math.min(left, window.innerWidth - tw - 8));
    if (top + th > window.innerHeight - 8) top = rect.top - th - 6;
    el.style.left = left + 'px';
    el.style.top  = top + 'px';
    el.style.opacity = '1';
  }, 220); // 220ms delay — don't show on quick mouse-pass
}

function hideChipRichTooltip() {
  clearTimeout(_chipTooltipTimer);
  if (_chipTooltipEl) { _chipTooltipEl.remove(); _chipTooltipEl = null; }
}

// ── v2.62 Chip Context Menu ────────────────────
let _ctxMenuEl = null;
function showChipContextMenu(x, y, sym) {
  closeChipContextMenu();
  const menu = document.createElement('div');
  menu.id = 'chip-ctx-menu';
  menu.className = 'chip-ctx-menu';
  const isInWl = watchlistItems.some(w => w.symbol === sym.symbol);
  const isPinned2 = pinnedSymbols.includes(sym.id);
  const price = lastKnownPrices[sym.id]?.price;
  const priceTxt = price ? `${sym.currency || '$'}${fmtPrice(price)}` : '–';
  menu.innerHTML = `
    <div class="ccm-header"><span class="ccm-sym">${sym.label}</span><span class="ccm-price">${priceTxt}</span></div>
    <div class="ccm-sep"></div>
    <button class="ccm-item" data-action="chart">📈 View Chart</button>
    <button class="ccm-item" data-action="watch">${isInWl ? '✓ In Watchlist' : '👁 Add to Watchlist'}</button>
    <button class="ccm-item" data-action="pin">${isPinned2 ? '📌 Unpin' : '📌 Pin to Top'}</button>
    <button class="ccm-item" data-action="copy">📋 Copy Symbol</button>
    <div class="ccm-sep"></div>
    <button class="ccm-item" data-action="why">❓ Why Moving?</button>
  `;
  document.body.appendChild(menu);
  _ctxMenuEl = menu;
  // Position: clamp to viewport
  const mW = 168, mH = 170;
  const lx = Math.min(x, window.innerWidth - mW - 8);
  const ly = Math.min(y, window.innerHeight - mH - 8);
  menu.style.left = `${lx}px`;
  menu.style.top  = `${ly}px`;
  menu.addEventListener('click', (e) => {
    const btn = e.target.closest('.ccm-item');
    if (!btn) return;
    const act = btn.dataset.action;
    closeChipContextMenu();
    if (act === 'chart') { selectMainChartSym(sym); }
    else if (act === 'watch') {
      if (!isInWl) {
        watchlistItems.push({ symbol: sym.symbol, label: sym.label, alertAbove: null, alertBelow: null });
        saveWatchlist(); renderWatchlist();
        showToast(`${sym.label} added to watchlist`);
      }
    }
    else if (act === 'pin') {
      if (isPinned2) pinnedSymbols = pinnedSymbols.filter(id => id !== sym.id);
      else           pinnedSymbols = [sym.id, ...pinnedSymbols];
      localStorage.setItem('fh_pinned', JSON.stringify(pinnedSymbols));
      buildSymbolStrip(activeCatId);
    }
    else if (act === 'copy') {
      try { navigator.clipboard.writeText(sym.symbol); showToast(`Copied: ${sym.symbol}`); } catch(_) {}
    }
    else if (act === 'why') { showWhyOverlay(sym); }
  });
  setTimeout(() => document.addEventListener('click', closeChipContextMenu, { once: true }), 0);
}
function closeChipContextMenu() {
  if (_ctxMenuEl) { _ctxMenuEl.remove(); _ctxMenuEl = null; }
}

// ── v2.76: My Space Card Right-Click Context Menu ─────────────────────────
let _msCtxMenuEl = null;
function showMsCardContextMenu(x, y, symbol) {
  if (_msCtxMenuEl) { _msCtxMenuEl.remove(); _msCtxMenuEl = null; }
  const item = watchlistItems.find(i => i.symbol === symbol);
  if (!item) return;
  const homeId = ALL_HOME_SYMBOLS.find(s => s.symbol === symbol)?.id;
  const price = homeId ? lastKnownPrices[homeId]?.price : null;
  const pct   = homeId ? lastKnownPrices[homeId]?.pct   : null;
  const priceTxt = price ? `$${fmtPrice(price)}` : '–';
  const pctTxt   = pct != null ? `${pct >= 0 ? '+' : ''}${pct.toFixed(2)}%` : '';
  const menu = document.createElement('div');
  menu.className = 'ms-card-ctx-menu';
  menu.innerHTML = `
    <div class="mccm-header">
      <span class="mccm-sym">${item.label || symbol}</span>
      <span class="mccm-price ${pct != null ? (pct >= 0 ? 'positive' : 'negative') : ''}">${priceTxt}${pctTxt ? ` <span>${pctTxt}</span>` : ''}</span>
    </div>
    <div class="mccm-sep"></div>
    <button class="mccm-item" data-act="chart">📈 View Chart</button>
    <button class="mccm-item" data-act="alert">🔔 Set Alert…</button>
    <button class="mccm-item" data-act="news">📰 Why Moving?</button>
    <button class="mccm-item" data-act="copy">📋 Copy Symbol</button>
    <button class="mccm-item" data-act="savespark">💾 Save Sparkline PNG</button>
    <div class="mccm-sep"></div>
    <button class="mccm-item mccm-danger" data-act="remove">🗑 Remove</button>`;
  document.body.appendChild(menu);
  _msCtxMenuEl = menu;
  const mW = 180, mH = 200;
  menu.style.left = `${Math.min(x, window.innerWidth  - mW - 8)}px`;
  menu.style.top  = `${Math.min(y, window.innerHeight - mH - 8)}px`;
  menu.addEventListener('click', e => {
    const btn = e.target.closest('.mccm-item'); if (!btn) return;
    const act = btn.dataset.act;
    if (_msCtxMenuEl) { _msCtxMenuEl.remove(); _msCtxMenuEl = null; }
    if (act === 'chart') {
      const sym = ALL_HOME_SYMBOLS.find(s => s.symbol === symbol);
      if (sym) { switchSite('overview'); selectMainChartSym(sym); }
    } else if (act === 'alert') {
      // Focus the alert input on the card
      const alertEl = document.getElementById(`ms-alert-above-${symbol}`);
      alertEl?.focus();
      alertEl?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else if (act === 'news') {
      const sym = ALL_HOME_SYMBOLS.find(s => s.symbol === symbol);
      if (sym) showWhyOverlay(sym);
    } else if (act === 'copy') {
      try { navigator.clipboard.writeText(symbol); showToast(`Copied: ${symbol}`); } catch(_) {}
    } else if (act === 'savespark') {
      // v2.77: Save sparkline canvas as PNG
      const card = document.getElementById(`msc-${symbol}`);
      const spark = card?.querySelector('.ms-sparkline-canvas');
      if (spark) {
        try {
          const dataUrl = spark.toDataURL('image/png');
          const a = document.createElement('a');
          a.href = dataUrl;
          a.download = `${symbol.replace(/[^A-Z0-9]/gi, '_')}_sparkline.png`;
          a.click();
          showToast(`Saved: ${symbol} sparkline`);
        } catch(_) { showToast('Could not save sparkline'); }
      } else { showToast('No sparkline available yet'); }
    } else if (act === 'remove') {
      const idx = watchlistItems.findIndex(i => i.symbol === symbol);
      if (idx >= 0) { watchlistItems.splice(idx, 1); saveWatchlist(); renderWatchlist(); }
    }
  });
  setTimeout(() => document.addEventListener('click', () => { if (_msCtxMenuEl) { _msCtxMenuEl.remove(); _msCtxMenuEl = null; } }, { once: true }), 0);
}

// ── Build Home Panel HTML ─────────────────────
const CAT_LABELS = { all: 'ALL', movers: '🔥 MOVERS', indices: 'INDICES', crypto: 'CRYPTO', forex: 'FOREX', commodities: 'COMMODITIES' };

function buildHomePanel() {
  const ALL_CATS = catOrder
    .filter(id => CAT_LABELS[id])
    .map(id => ({ id, label: CAT_LABELS[id] }));

  homePanel.innerHTML = `

    <div class="home-tab-bar" id="home-tab-bar">
      ${ALL_CATS.map(c =>
        `<button class="cat-tab${c.id === activeCatId ? ' active' : ''}" data-cat="${c.id}">${c.label}<span class="cat-breadth" id="cb-${c.id}" style="display:none"></span></button>`
      ).join('')}
      <div class="home-search-wrap">
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"
             stroke-linecap="round" stroke-linejoin="round">
          <circle cx="6.5" cy="6.5" r="4"/>
          <line x1="9.5" y1="9.5" x2="13" y2="13"/>
        </svg>
        <input type="text" class="home-search-input" id="symbol-search"
          placeholder="Search — AAPL, BTC-USD, EURUSD=X ..." autocomplete="off">
        <div class="sym-autocomplete" id="sym-autocomplete" style="display:none"></div>
      </div>
      <div class="streak-badge" id="streak-badge" style="display:none" title="">🔥 <span id="streak-count">1</span></div>
      <button class="daily-challenge-btn" id="daily-challenge-btn" title="Daily Challenge" style="display:none">
        <span class="dc-icon">🎯</span>
        <span class="dc-label">Challenge</span>
        <span class="dc-prog" id="dc-prog-label">0/3</span>
      </button>
    </div>

    <div class="home-symbol-strip" id="home-symbol-strip"></div>





    <div class="home-chart-section">

      <div class="home-chart-main">
        <div class="home-chart-header">
          <div class="chart-symbol-info">
            <span class="chart-sym-name"  id="main-name">S&amp;P 500</span>
            <span class="market-status-dot" id="market-status-dot" title=""></span>
            <span class="chart-sym-price" id="main-price">–</span>
            <span class="chart-sym-chg neutral" id="main-chg">–</span>
          </div>
          <div class="tf-tabs" id="main-tf-tabs">
            <button class="tf-btn" data-range="5d"  data-interval="30m">1D</button>
            <button class="tf-btn active" data-range="1mo" data-interval="1d">1M</button>
            <button class="tf-btn" data-range="3mo" data-interval="1d">3M</button>
            <button class="tf-btn" data-range="1y"  data-interval="1wk">1Y</button>
            <button class="tf-btn" data-range="5y"  data-interval="1mo">5Y</button>
            <span class="chart-date-range" id="chart-date-range" style="display:none"></span>
          </div>
          <div class="chart-type-tabs" id="chart-type-tabs">
            <button class="chart-type-btn active" data-type="area">Area</button>
            <button class="chart-type-btn" data-type="candle">Candle</button>
            <button class="chart-type-btn" data-type="ha" title="Heikin-Ashi candles">HA</button>
            <button class="ann-clear-btn" id="ann-clear-btn" style="display:none"
              title="Clear all S/R lines for this symbol (right-click on line to remove one)">🗑 0</button>
          </div>
          <div class="ind-btn-wrap">
            <button class="ind-btn" id="ind-toggle-btn">Indicators ▾</button>
            <div class="ind-picker" id="ind-picker">
              <button class="ind-pick-btn" data-ind="ema20">EMA 20</button>
              <button class="ind-pick-btn" data-ind="ema50">EMA 50</button>
              <button class="ind-pick-btn" data-ind="ema200">EMA 200</button>
              <button class="ind-pick-btn" data-ind="bb">Bollinger</button>
              <button class="ind-pick-btn" data-ind="rsi">RSI 14</button>
              <button class="ind-pick-btn" data-ind="macd">MACD</button>
              <button class="ind-pick-btn" data-ind="volume">Volume</button>
              <button class="ind-pick-btn" data-ind="vp">Vol. Profile</button>
              <button class="ind-pick-btn" data-ind="vwap">VWAP</button>
              <button class="ind-pick-btn" data-ind="fib">Fibonacci</button>
              <button class="ind-pick-btn" data-ind="adx">ADX 14</button>
              <button class="ind-pick-btn" data-ind="obv">OBV</button>
              <button class="ind-pick-btn" data-ind="stoch">Stoch 14</button>
              <button class="ind-pick-btn" data-ind="pivots">Pivots</button>
              <button class="ind-pick-btn" data-ind="kc">Keltner</button>
              <button class="ind-pick-btn" data-ind="roc">ROC 14</button>
              <button class="ind-pick-btn" data-ind="wr">W%R 14</button>
              <button class="ind-pick-btn" data-ind="cci">CCI 20</button>
              <button class="ind-pick-btn" data-ind="psar">PSAR</button>
              <button class="ind-pick-btn" data-ind="supertrend">Supertrend</button>
              <button class="ind-pick-btn" data-ind="ichi">Ichimoku</button>
              <button class="ind-pick-btn" data-ind="donchian">Donchian</button>
              <button class="ind-pick-btn" data-ind="lr">Lin.Reg</button>
              <button class="ind-pick-btn" data-ind="cmf">CMF 20</button>
              <button class="ind-pick-btn" data-ind="srsi">Stoch RSI</button>
              <button class="ind-pick-btn" data-ind="trix">TRIX 14</button>
              <button class="ind-pick-btn" data-ind="hma">HMA 20</button>
              <button class="ind-pick-btn" data-ind="dema">DEMA 20</button>
              <button class="ind-pick-btn" data-ind="tema">TEMA 20</button>
              <button class="ind-pick-btn" data-ind="mfi">MFI 14</button>
              <button class="ind-pick-btn" data-ind="dpo">DPO 20</button>
              <button class="ind-pick-btn" data-ind="elder">Elder Ray</button>
              <button class="ind-pick-btn" data-ind="vortex">Vortex 14</button>
              <button class="ind-pick-btn" data-ind="aroon">Aroon 25</button>
              <button class="ind-pick-btn" data-ind="ao">Awesome Osc</button>
              <button class="ind-pick-btn" data-ind="vwmacd">VWMACD</button>
              <button class="ind-pick-btn" data-ind="autosr">Auto S/R</button>
              <button class="ind-pick-btn" data-ind="trendlines">TrendLines</button>
              <button class="ind-pick-btn" data-ind="proj">Projection</button>
              <button class="ind-pick-btn" data-ind="cbody">Body%</button>
              <button class="ind-pick-btn" data-ind="dret">30D Returns</button>
            </div>
          </div>
          <button class="chart-watch-btn" id="chart-watch-btn" title="Add to My Space">👁 Watch</button>
          <button class="chart-float-btn" id="chart-float-btn" title="Open always-on-top mini window (⧉ Float)">⧉ Float</button>
          </div>
        <div id="fundamentals-bar" class="fundamentals-bar" style="display:none"></div>
        <div id="extra-info-bar" class="extra-info-bar" style="display:none"></div>
        <!-- AI MARKET NARRATIVE BAR (v2.81) -->
        <div id="narrative-bar" class="narrative-bar" style="display:none">
          <span class="narr-icon">✦</span>
          <span id="narr-text" class="narr-text">Analyzing market conditions…</span>
          <span id="narr-badge" class="narr-badge">AI</span>
        </div>
        <div class="home-chart-canvas-wrap">
          <canvas id="main-chart-canvas"></canvas>
          <div id="live-price-dot" style="display:none"></div>
          <div id="volatility-lightning-overlay" style="display:none"><svg width="100%" height="100%"></svg></div>
          <div class="home-chart-grid" id="main-chart-grid" style="display:none">
            <!-- filled by drawMultiTFGrid() -->
          </div>
          <div class="options-chain-panel" id="options-chain-panel" style="display:none">
            <!-- filled by loadOptionsChain() -->
          </div>
        </div>
        <div class="sub-panels" id="sub-panels">
          <div class="sub-panel-row" id="rsi-panel-row"><canvas id="rsi-canvas"></canvas></div>
          <div class="sub-panel-row" id="macd-panel-row"><canvas id="macd-canvas"></canvas></div>
          <div class="sub-panel-row" id="vol-panel-row"><canvas id="vol-canvas"></canvas></div>
          <div class="sub-panel-row" id="adx-panel-row"><canvas id="adx-canvas"></canvas></div>
          <div class="sub-panel-row" id="obv-panel-row"><canvas id="obv-canvas"></canvas></div>
          <div class="sub-panel-row" id="stoch-panel-row"><canvas id="stoch-canvas"></canvas></div>
          <div class="sub-panel-row" id="roc-panel-row"><canvas id="roc-canvas"></canvas></div>
          <div class="sub-panel-row" id="wr-panel-row"><canvas id="wr-canvas"></canvas></div>
          <div class="sub-panel-row" id="cci-panel-row"><canvas id="cci-canvas"></canvas></div>
          <div class="sub-panel-row" id="cmf-panel-row"><canvas id="cmf-canvas"></canvas></div>
          <div class="sub-panel-row" id="srsi-panel-row"><canvas id="srsi-canvas"></canvas></div>
          <div class="sub-panel-row" id="trix-panel-row"><canvas id="trix-canvas"></canvas></div>
          <div class="sub-panel-row" id="mfi-panel-row"><canvas id="mfi-canvas"></canvas></div>
          <div class="sub-panel-row" id="dpo-panel-row"><canvas id="dpo-canvas"></canvas></div>
          <div class="sub-panel-row" id="elder-panel-row"><canvas id="elder-canvas"></canvas></div>
          <div class="sub-panel-row" id="vortex-panel-row"><canvas id="vortex-canvas"></canvas></div>
          <div class="sub-panel-row" id="aroon-panel-row"><canvas id="aroon-canvas"></canvas></div>
          <div class="sub-panel-row" id="ao-panel-row"><canvas id="ao-canvas"></canvas></div>
          <div class="sub-panel-row" id="vwmacd-panel-row"><canvas id="vwmacd-canvas"></canvas></div>
          <div class="sub-panel-row" id="cbody-panel-row"><canvas id="cbody-canvas"></canvas></div>
          <div class="sub-panel-row" id="dret-panel-row" style="height:42px"><canvas id="dret-canvas"></canvas></div>
        </div>
        <div class="chart-notes-wrap" id="chart-notes-wrap">
          <span class="chart-notes-label">📝 Notes</span>
          <textarea class="chart-notes-ta" id="chart-notes-ta" placeholder="Personal notes for this symbol…" rows="2" spellcheck="false"></textarea>
        </div>
      </div>

      <div class="news-panel" id="news-panel">
        <div class="news-panel-hdr">
          <span class="news-panel-title" id="news-panel-title">Market News</span>
          <span class="news-live-dot"></span>
        </div>
        <div class="news-search-row" id="news-search-row">
          <input class="news-search-input" id="news-search-input" type="text" placeholder="🔍 Filter headlines…" autocomplete="off" spellcheck="false">
          <button class="news-search-clear" id="news-search-clear" style="display:none" title="Clear search">✕</button>
        </div>
        <div class="news-sent-widget" id="news-sent-widget" style="display:none"></div>
        <div class="news-list" id="news-list">
          <div class="news-empty">Loading...</div>
        </div>
      </div>

    </div>

    <!-- SYMBOL LENS OVERLAY (v2.81) — press L to toggle -->
    <div class="sym-lens" id="sym-lens">
      <div class="sym-lens-hdr">
        <span class="sym-lens-sym" id="sl-sym">–</span>
        <button class="sym-lens-close" id="sl-close">✕</button>
      </div>
      <div class="sym-lens-price" id="sl-price">–</div>
      <div class="sym-lens-pct" id="sl-pct">–</div>
      <hr class="sym-lens-divider">
      <div class="sym-lens-section">Momentum</div>
      <div class="sym-lens-row"><span class="sym-lens-lbl">RSI 14</span><span class="sym-lens-val" id="sl-rsi">–</span></div>
      <div class="sym-lens-row"><span class="sym-lens-lbl">vs EMA 20</span><span class="sym-lens-val" id="sl-ema20t">–</span></div>
      <div class="sym-lens-row"><span class="sym-lens-lbl">vs EMA 50</span><span class="sym-lens-val" id="sl-ema50t">–</span></div>
      <div class="sym-lens-section">Key Levels</div>
      <div class="sym-lens-row"><span class="sym-lens-lbl">Day Hi</span><span class="sym-lens-val" id="sl-dhi">–</span></div>
      <div class="sym-lens-row"><span class="sym-lens-lbl">Day Lo</span><span class="sym-lens-val" id="sl-dlo">–</span></div>
      <div class="sym-lens-section">Signals</div>
      <div class="sym-lens-row"><span class="sym-lens-lbl">TA Rating</span><span id="sl-rating" class="sym-lens-badge neu">–</span></div>
      <div class="sym-lens-row"><span class="sym-lens-lbl">Regime</span><span class="sym-lens-val" id="sl-regime">–</span></div>
      <div class="sym-lens-row"><span class="sym-lens-lbl">VIX</span><span class="sym-lens-val" id="sl-vix">–</span></div>
      <div class="sym-lens-footer">Press L to close · For informational use only</div>
    </div>

    <!-- RISK DISCLOSURE MODAL (v2.81) — shown once on first run -->
    <div class="risk-modal-overlay" id="risk-modal-overlay" style="display:none">
      <div class="risk-modal">
        <div class="risk-modal-icon">⚠️</div>
        <div class="risk-modal-title">Risk Disclosure</div>
        <div class="risk-modal-body">
          Finance Hub is an <strong>informational tool only</strong> and is not a registered investment advisor or broker-dealer.<br><br>
          • Market data may be delayed up to 15 minutes<br>
          • Prices, signals, and indicators are for <strong>educational purposes only</strong><br>
          • Past performance does not guarantee future results<br>
          • Price alerts are <strong>not</strong> trading recommendations<br>
          • Always consult a qualified financial professional before making investment decisions
        </div>
        <label class="risk-modal-ack" for="risk-modal-chk">
          <input type="checkbox" id="risk-modal-chk"> I understand this app is for informational/educational purposes only and does not constitute financial advice.
        </label>
        <button class="risk-modal-btn" id="risk-modal-btn" disabled>Continue to Finance Hub</button>
        <div class="risk-modal-version">Finance Hub v2.81 · Data sources: Yahoo Finance, Finnhub, FRED</div>
      </div>
    </div>

    <!-- SYMBOL NOTES QUICK FLOAT (v2.38) — press N to toggle -->
    <div class="sym-note-float" id="sym-note-float">
      <div class="sym-note-hdr">
        <span class="sym-note-title" id="sym-note-title">📝 Notes — –</span>
        <span class="sym-note-hint">auto-saved</span>
        <button class="sym-note-close" id="sym-note-close">✕</button>
      </div>
      <textarea class="sym-note-ta" id="sym-note-ta" placeholder="Quick notes for this symbol… (press N to toggle)"></textarea>
      <div class="sym-note-footer">Synced with chart notes bar · Esc or N to close</div>
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

  // ── Drag-to-reorder category tabs ────────────
  const tabsBar = homePanel.querySelector('.cat-tabs');
  let dragSrcTab = null;
  if (tabsBar) {
    tabsBar.querySelectorAll('.cat-tab').forEach(tab => {
      tab.setAttribute('draggable', 'true');
      tab.style.cursor = 'grab';
      tab.addEventListener('dragstart', e => {
        dragSrcTab = tab;
        tab.classList.add('tab-dragging');
        e.dataTransfer.effectAllowed = 'move';
      });
      tab.addEventListener('dragend', () => {
        tab.classList.remove('tab-dragging');
        tabsBar.querySelectorAll('.cat-tab').forEach(t => t.classList.remove('tab-drag-over'));
        dragSrcTab = null;
      });
      tab.addEventListener('dragover', e => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        if (dragSrcTab && tab !== dragSrcTab) {
          tabsBar.querySelectorAll('.cat-tab').forEach(t => t.classList.remove('tab-drag-over'));
          tab.classList.add('tab-drag-over');
        }
      });
      tab.addEventListener('drop', e => {
        e.preventDefault();
        if (!dragSrcTab || dragSrcTab === tab) return;
        const tabs    = [...tabsBar.querySelectorAll('.cat-tab')];
        const fromIdx = tabs.indexOf(dragSrcTab);
        const toIdx   = tabs.indexOf(tab);
        if (fromIdx < 0 || toIdx < 0) return;
        const moved = catOrder.splice(fromIdx, 1)[0];
        catOrder.splice(toIdx, 0, moved);
        localStorage.setItem('fh_cat_order', JSON.stringify(catOrder));
        buildHomePanel();
      });
    });
  }

  // ── Chart Copy to Clipboard ──────────────────
  document.getElementById('chart-copy-btn')?.addEventListener('click', () => {
    const canvas = document.getElementById('main-chart-canvas');
    if (!canvas) return;
    try {
      canvas.toBlob(blob => {
        if (!blob) return;
        const item = new ClipboardItem({ 'image/png': blob });
        navigator.clipboard.write([item]).then(() => {
          const btn = document.getElementById('chart-copy-btn');
          if (btn) { btn.textContent = '✓'; setTimeout(() => { btn.textContent = '📋'; }, 1500); }
        }).catch(() => {});
      });
    } catch (_) {}
  });

  // ── Chart Gradient Theme Picker (v2.56) ─────────────────────────────────
  {
    const _themeBtn    = document.getElementById('chart-theme-btn');
    const _themePicker = document.getElementById('chart-theme-picker');
    const _syncThemeBtns = () => {
      document.querySelectorAll('#chart-theme-picker .theme-pick-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.theme === _chartTheme);
      });
    };
    _syncThemeBtns();
    _themeBtn?.addEventListener('click', e => {
      e.stopPropagation();
      const open = _themePicker.style.display === 'none';
      _themePicker.style.display = open ? 'flex' : 'none';
    });
    _themePicker?.addEventListener('click', e => {
      const btn = e.target.closest('.theme-pick-btn');
      if (!btn) return;
      _chartTheme = btn.dataset.theme;
      try { localStorage.setItem('fh-chart-theme', _chartTheme); } catch(_) {}
      _syncThemeBtns();
      _themePicker.style.display = 'none';
      const mc = document.getElementById('main-chart-canvas');
      if (mc && mainChartData && selectedChartSym) drawMainChart(mc, mainChartData, selectedChartSym);
    });
    document.addEventListener('click', e => {
      if (!e.target.closest('#chart-theme-wrap') && _themePicker) {
        _themePicker.style.display = 'none';
      }
    });
  }

  // ── Chart Bookmarks (v2.53) ─────────────────────────────────────────────
  {
    let _bmOpen = false;
    const _loadBm  = () => { try { return JSON.parse(localStorage.getItem('fh-chart-bm') || '[]'); } catch { return []; } };
    const _saveBm  = arr => localStorage.setItem('fh-chart-bm', JSON.stringify(arr));
    const _renderBmList = () => {
      const listEl = document.getElementById('chart-bookmark-list');
      if (!listEl) return;
      const bms = _loadBm();
      if (bms.length === 0) {
        listEl.innerHTML = '<div class="bm-empty">No bookmarks yet.<br>Click 🔖 to save current view.</div>';
        return;
      }
      listEl.innerHTML = bms.map((bm, i) =>
        `<div class="bm-item" data-i="${i}">
          <span class="bm-label">${bm.label}</span>
          <span class="bm-tf">${bm.tf}</span>
          <button class="bm-del" data-i="${i}" title="Delete">×</button>
        </div>`
      ).join('');
      listEl.querySelectorAll('.bm-item').forEach(el => {
        el.addEventListener('click', e => {
          if (e.target.classList.contains('bm-del')) {
            const idx = parseInt(e.target.dataset.i);
            const bms2 = _loadBm(); bms2.splice(idx, 1); _saveBm(bms2);
            _renderBmList();
            return;
          }
          const bm  = _loadBm()[parseInt(el.dataset.i)];
          if (!bm) return;
          const sym = ALL_HOME_SYMBOLS.find(s => s.symbol === bm.symbol) ||
                      ALL_HOME_SYMBOLS.find(s => s.id === bm.symbol) ||
                      { symbol: bm.symbol, id: bm.symbol, label: bm.symbol, fmt: 'dec', category: 'indices' };
          selectMainChartSym(sym);
          // Restore zoom & timeframe
          if (bm.range) {
            mainTf = { range: bm.range, interval: bm.interval || '1d' };
            document.querySelectorAll('.tf-btn').forEach(b => b.classList.toggle('active', b.dataset.range === bm.range));
          }
          if (bm.zoomBars > 0) { _zoomBars = bm.zoomBars; _zoomStart = bm.zoomStart || 0; }
          _bmOpen = false;
          listEl.style.display = 'none';
        });
      });
    };
    document.getElementById('chart-bookmark-btn')?.addEventListener('click', () => {
      const listEl = document.getElementById('chart-bookmark-list');
      if (!listEl) return;
      _bmOpen = !_bmOpen;
      if (_bmOpen) {
        _renderBmList();
        listEl.style.display = 'block';
      } else {
        // Save current view as new bookmark
        if (!selectedChartSym) { listEl.style.display = 'none'; return; }
        const bms = _loadBm();
        const label = selectedChartSym.label || selectedChartSym.symbol;
        const newBm = {
          symbol: selectedChartSym.symbol,
          label:  label,
          tf:     mainTf?.range || '1mo',
          range:  mainTf?.range,
          interval: mainTf?.interval,
          zoomBars:  _zoomBars,
          zoomStart: _zoomStart,
          ts: Date.now()
        };
        // Deduplicate by symbol+tf
        const dup = bms.findIndex(b => b.symbol === newBm.symbol && b.tf === newBm.tf);
        if (dup !== -1) bms.splice(dup, 1);
        bms.unshift(newBm);
        if (bms.length > 12) bms.pop();
        _saveBm(bms);
        showToast(`🔖 Bookmarked: ${label}`);
        listEl.style.display = 'none';
      }
    });
    // Close when clicking outside
    document.addEventListener('click', e => {
      if (!_bmOpen) return;
      const wrap = document.getElementById('chart-bookmark-wrap');
      if (wrap && !wrap.contains(e.target)) {
        _bmOpen = false;
        document.getElementById('chart-bookmark-list').style.display = 'none';
      }
    }, true);
  }

  // ── Watch Button ────────────────────────────
  document.getElementById('chart-watch-btn')?.addEventListener('click', () => {
    if (!selectedChartSym) return;
    const sym = selectedChartSym;
    const already = watchlistItems.some(i => i.symbol === sym.symbol);
    if (already) {
      // Already watching — do nothing (button is informational when watching)
      return;
    }
    // Add to watchlist
    watchlistItems.push({
      symbol: sym.symbol, label: sym.label, fmt: sym.fmt,
      alertAbove: null, alertBelow: null,
      condSymbol: null, condDir: 'above', condThreshold: null,
      costBasis: null, shares: null, tag: null,
    });
    saveWatchlist();
    updateChartWatchBtn(sym);
    // If My Space panel is open, rebuild cards
    const msp = document.getElementById('my-space-panel');
    if (msp && msp.style.display !== 'none') renderMySpaceCards();
  });

  // Chart type toggle (Area / Candle / Replay)
  homePanel.querySelectorAll('#chart-type-tabs .chart-type-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const type = btn.dataset.type;

      // Special case: Replay toggle
      if (type === 'replay') {
        if (_replayMode) { stopReplayMode(); return; }
        startReplayMode();
        return;
      }

      // If currently in replay mode, exit it first
      if (_replayMode) stopReplayMode();

      homePanel.querySelectorAll('#chart-type-tabs .chart-type-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentChartType = type;
      const mainCanvas  = document.getElementById('main-chart-canvas');
      const gridEl      = document.getElementById('main-chart-grid');
      const optsEl      = document.getElementById('options-chain-panel');
      // Hide all overlays first
      if (gridEl)  gridEl.style.display  = 'none';
      if (optsEl)  optsEl.style.display  = 'none';
      if (mainCanvas) mainCanvas.style.display = '';
      if (currentChartType === 'grid') {
        if (mainCanvas) mainCanvas.style.display = 'none';
        if (gridEl)     { gridEl.style.display = ''; drawMultiTFGrid(selectedChartSym); }
      } else if (currentChartType === 'options') {
        if (mainCanvas) mainCanvas.style.display = 'none';
        if (optsEl)     { optsEl.style.display = ''; loadOptionsChain(selectedChartSym); }
      } else {
        if (mainChartData && mainCanvas) drawMainChart(mainCanvas, mainChartData, selectedChartSym);
      }
    });
  });

  // ── Indicator picker (multi-select: EMA/BB/RSI/MACD/Volume) ──────────
  const indBtn    = document.getElementById('ind-toggle-btn');
  const indPicker = document.getElementById('ind-picker');
  const subPanels = document.getElementById('sub-panels');

  const applyIndicators = () => {
    localStorage.setItem('fh-ind-active', JSON.stringify([...activeIndicators]));

    // Sync pick button active states
    indPicker.querySelectorAll('.ind-pick-btn').forEach(b => {
      b.classList.toggle('active', activeIndicators.has(b.dataset.ind));
    });

    // Ind-btn highlight if any indicator on
    indBtn.classList.toggle('active', activeIndicators.size > 0);

    // Show/hide sub-panels container
    const hasSubInd = ['rsi', 'macd', 'volume'].some(k => activeIndicators.has(k));
    subPanels.classList.toggle('visible', hasSubInd);

    // Redraw main chart (overlay indicators)
    const mainCanvas = document.getElementById('main-chart-canvas');
    if (mainChartData && mainCanvas) drawMainChart(mainCanvas, mainChartData, selectedChartSym);

    // Redraw sub-panels
    if (mainChartData) updateSubPanels(mainChartData);
  };

  // Toggle picker open/close on button click
  indBtn.addEventListener('click', e => {
    e.stopPropagation();
    indPicker.classList.toggle('open');
  });

  // Close picker when clicking outside
  document.addEventListener('click', () => indPicker.classList.remove('open'), true);
  indPicker.addEventListener('click', e => e.stopPropagation());

  // Per-indicator toggle
  indPicker.querySelectorAll('.ind-pick-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const ind = btn.dataset.ind;
      if (activeIndicators.has(ind)) activeIndicators.delete(ind);
      else {
        activeIndicators.add(ind);
        // Daily challenge auto-tick for indicator toggles
        if (ind === 'rsi')  tickDcStep('toggle_rsi');
        if (ind === 'macd') tickDcStep('toggle_macd');
      }
      applyIndicators();
    });
  });

  // Init state from saved localStorage
  applyIndicators();

  // Main chart timeframe selector
  homePanel.querySelectorAll('#main-tf-tabs .tf-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      homePanel.querySelectorAll('#main-tf-tabs .tf-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      mainTf = { range: btn.dataset.range, interval: btn.dataset.interval };
      _zoomStart = 0; _zoomBars = -1; // reset zoom on TF change (v2.49)
      // v2.63: TF background tint
      const chartSec = document.querySelector('.home-chart-section');
      if (chartSec) {
        chartSec.dataset.tf = btn.dataset.range;
      }
      loadMainChart();
      // v2.92: Removed 1400ms delay — update briefing after 50ms (was blocking UI feel)
      setTimeout(() => updateMarketBriefing(), 50);
    });
  });

  // Crosshair on main chart
  const mainCanvas = document.getElementById('main-chart-canvas');
  if (mainCanvas) {
    // Crosshair smooth easing — lerp toward raw mouse X (v2.50)
    function _runHoverLerp() {
      if (_rawHoverX < 0) { mainHoverX = -1; _hoverLerpRaf = null; return; }
      if (mainHoverX < 0) mainHoverX = _rawHoverX;
      const diff = _rawHoverX - mainHoverX;
      mainHoverX = mainHoverX + diff * 0.28;
      if (mainChartData) drawMainChart(mainCanvas, mainChartData, selectedChartSym);
      if (Math.abs(diff) > 0.4) {
        _hoverLerpRaf = requestAnimationFrame(_runHoverLerp);
      } else {
        mainHoverX = _rawHoverX;
        _hoverLerpRaf = null;
      }
    }
    mainCanvas.addEventListener('mousemove', e => {
      _rawHoverX = e.clientX - mainCanvas.getBoundingClientRect().left;
      if (!_hoverLerpRaf) _hoverLerpRaf = requestAnimationFrame(_runHoverLerp);
    });
    mainCanvas.addEventListener('mouseleave', () => {
      _rawHoverX = -1;
      mainHoverX = -1;
      _hoverLerpRaf = null;
      // Hide live price dot when mouse leaves
      const d = document.getElementById('live-price-dot');
      if (d) d.style.display = 'none';
      if (mainChartData) drawMainChart(mainCanvas, mainChartData, selectedChartSym);
    });

    // ── Double-click: add horizontal S/R annotation ─────────────────────
    mainCanvas.addEventListener('dblclick', e => {
      if (!_mainChartMeta || currentChartType === 'grid' || currentChartType === 'options') return;
      const { aMin, aRng, pT, pB, H, dpr } = _mainChartMeta;
      const cH   = H - pT - pB;
      const rect  = mainCanvas.getBoundingClientRect();
      const y     = (e.clientY - rect.top) * dpr;
      const price = aMin + (1 - (y - pT) / cH) * aRng;
      const symKey = selectedChartSym?.symbol;
      if (!symKey || !isFinite(price) || price <= 0) return;
      if (!chartAnnotations[symKey]) chartAnnotations[symKey] = [];
      chartAnnotations[symKey].push({ price: parseFloat(price.toFixed(4)) });
      saveAnnotations();
      updateAnnClearBtn();
      if (mainChartData) drawMainChart(mainCanvas, mainChartData, selectedChartSym);
    });

    // ── Right-click: remove nearest annotation ───────────────────────────
    mainCanvas.addEventListener('contextmenu', e => {
      if (!_mainChartMeta || currentChartType === 'grid' || currentChartType === 'options') return;
      const { aMin, aRng, pT, pB, H, dpr } = _mainChartMeta;
      const cH        = H - pT - pB;
      const rect      = mainCanvas.getBoundingClientRect();
      const y         = (e.clientY - rect.top) * dpr;
      const clickPrice = aMin + (1 - (y - pT) / cH) * aRng;
      const symKey     = selectedChartSym?.symbol;
      const anns       = chartAnnotations[symKey] || [];
      if (!anns.length) return;
      let nearest = -1, nearestDist = Infinity;
      anns.forEach((ann, idx) => {
        const dist = Math.abs(ann.price - clickPrice);
        if (dist < nearestDist) { nearestDist = dist; nearest = idx; }
      });
      if (nearest !== -1 && nearestDist < _mainChartMeta.aRng * 0.06) {
        e.preventDefault();
        anns.splice(nearest, 1);
        saveAnnotations();
        updateAnnClearBtn();
        if (mainChartData) drawMainChart(mainCanvas, mainChartData, selectedChartSym);
      }
    });

    // ── Ruler click handler (v2.42) — single-click captures measurement points ─
    mainCanvas.addEventListener('click', e => {
      if (!_rulerMode || !_mainChartMeta) return;
      if (currentChartType === 'grid' || currentChartType === 'options') return;
      const { pL, pR, W, n: nBars, cW, visData } = _mainChartMeta;
      if (!nBars || nBars < 2) return;
      const rect = mainCanvas.getBoundingClientRect();
      const mx   = (e.clientX - rect.left) * (window.devicePixelRatio || 1);
      // Map pixel x → nearest bar index
      let ni = 0, md = Infinity;
      for (let i = 0; i < nBars; i++) {
        const bx = pL + (i / (nBars - 1)) * (W - pL - pR);
        const dist = Math.abs(bx - mx);
        if (dist < md) { md = dist; ni = i; }
      }
      const d = visData?.[ni];
      if (_rulerClicks.length >= 2) _rulerClicks = []; // reset after 2 clicks
      _rulerClicks.push({ dataIdx: ni, time: d?.time, price: d?.close });
      if (mainChartData) drawMainChart(mainCanvas, mainChartData, selectedChartSym);
    });

    // ── Ann clear button ─────────────────────────────────────────────────
    const annClearBtn = document.getElementById('ann-clear-btn');
    if (annClearBtn) {
      annClearBtn.addEventListener('click', () => {
        const symKey = selectedChartSym?.symbol;
        if (symKey) { delete chartAnnotations[symKey]; saveAnnotations(); }
        updateAnnClearBtn();
        if (mainChartData) drawMainChart(mainCanvas, mainChartData, selectedChartSym);
      });
    }

    // ── Wheel Zoom (v2.49) ─────────────────────────────────────────────────
    mainCanvas.addEventListener('wheel', e => {
      e.preventDefault();
      if (!lastMainChartData || lastMainChartData.length < 5) return;
      if (currentChartType === 'grid' || currentChartType === 'options') return;
      const total   = lastMainChartData.length;
      const curBars = _zoomBars < 0 ? total : _zoomBars;
      const factor  = e.deltaY > 0 ? 1.22 : 0.82; // down = zoom out, up = zoom in
      const newBars = Math.round(Math.max(10, Math.min(total, curBars * factor)));
      // Keep bar under cursor anchored
      const rect  = mainCanvas.getBoundingClientRect();
      const fracX = Math.max(0, Math.min(1, (e.clientX - rect.left - 60) / Math.max(1, mainCanvas.offsetWidth - 74)));
      const anchor = (_zoomBars < 0 ? 0 : _zoomStart) + Math.round(fracX * (curBars - 1));
      const newStart = Math.max(0, Math.min(total - newBars, Math.round(anchor - fracX * (newBars - 1))));
      _zoomBars  = newBars >= total ? -1 : newBars;
      _zoomStart = _zoomBars < 0 ? 0 : newStart;
      if (mainChartData) drawMainChart(mainCanvas, mainChartData, selectedChartSym);
    }, { passive: false });

    // ── Pan Drag — mousedown on canvas (v2.49) ─────────────────────────────
    mainCanvas.addEventListener('mousedown', e => {
      if (e.button !== 0 || _rulerMode || currentChartType === 'grid' || currentChartType === 'options') return;
      _isDraggingChart    = true;
      _dragStartX         = e.clientX;
      _dragStartZoomStart = _zoomStart;
      _dragLastX          = e.clientX;
      _dragLastT          = performance.now();
      _dragVelPx          = 0;
      if (_inertiaRaf) { cancelAnimationFrame(_inertiaRaf); _inertiaRaf = null; }
      mainCanvas.style.cursor = 'grabbing';
    });
  }

  // ── Pan Drag — window move/up (v2.49 + v2.51 momentum) ───────────────────
  window.addEventListener('mousemove', e => {
    if (!_isDraggingChart) return;
    const total   = lastMainChartData?.length || 0;
    if (!total) return;
    const curBars  = _zoomBars < 0 ? total : _zoomBars;
    const mc       = document.getElementById('main-chart-canvas');
    const chartW   = (mc?.offsetWidth || 800) - 74;
    const barsPerPx = curBars / Math.max(1, chartW);
    const shift     = Math.round(-(e.clientX - _dragStartX) * barsPerPx);
    _zoomStart = Math.max(0, Math.min(total - curBars, _dragStartZoomStart + shift));
    if (mc && mainChartData) drawMainChart(mc, mainChartData, selectedChartSym);
    // ── Velocity tracking for inertia (v2.51) ────────────────────────────────
    const now = performance.now();
    const dt  = now - _dragLastT;
    if (dt > 0 && dt < 100) {
      // Exponential moving average of velocity (px/ms)
      const inst = (e.clientX - _dragLastX) / dt;
      _dragVelPx = _dragVelPx * 0.6 + inst * 0.4;
    }
    _dragLastX = e.clientX;
    _dragLastT = now;
  });
  window.addEventListener('mouseup', () => {
    if (!_isDraggingChart) return;
    _isDraggingChart = false;
    const mc = document.getElementById('main-chart-canvas');
    if (mc) mc.style.cursor = '';
    // ── Launch inertia momentum if velocity is significant (v2.51) ───────────
    if (_inertiaRaf) { cancelAnimationFrame(_inertiaRaf); _inertiaRaf = null; }
    if (Math.abs(_dragVelPx) > 0.08) {
      let vel = _dragVelPx;
      const total   = lastMainChartData?.length || 0;
      const curBars = _zoomBars < 0 ? total : _zoomBars;
      const chartW  = (mc?.offsetWidth || 800) - 74;
      const barsPerPx = curBars / Math.max(1, chartW);
      function inertiaTick() {
        vel *= 0.87;                                          // friction
        if (Math.abs(vel) < 0.04) { _inertiaRaf = null; return; }
        const shift = -vel * 16 * barsPerPx;                // 16ms ≈ one frame
        _zoomStart = Math.max(0, Math.min(total - curBars, _zoomStart + shift));
        const mcc = document.getElementById('main-chart-canvas');
        if (mcc && mainChartData) drawMainChart(mcc, mainChartData, selectedChartSym);
        _inertiaRaf = requestAnimationFrame(inertiaTick);
      }
      _inertiaRaf = requestAnimationFrame(inertiaTick);
    }
    _dragVelPx = 0;
  });

  // ── Chart Notes textarea ──────────────────────────────────────────────────
  const notesTa = document.getElementById('chart-notes-ta');
  if (notesTa) {
    notesTa.addEventListener('input', () => {
      const symKey = selectedChartSym?.symbol;
      if (!symKey) return;
      if (notesTa.value.trim()) {
        chartNotes[symKey] = notesTa.value;
      } else {
        delete chartNotes[symKey];
      }
      saveChartNotes();
    });
    notesTa.addEventListener('click', e => e.stopPropagation());
    notesTa.addEventListener('keydown', e => e.stopPropagation());
  }

  // Symbol search + v2.69 autocomplete
  const searchEl = document.getElementById('symbol-search');
  const acEl     = document.getElementById('sym-autocomplete');
  if (searchEl) {
    let searchTimer;
    let _acSelIdx = -1;
    const closeAC = () => { if (acEl) { acEl.style.display = 'none'; acEl.innerHTML = ''; } _acSelIdx = -1; };
    const showAC  = (q) => {
      if (!acEl || q.length < 1) { closeAC(); return; }
      const qu = q.toUpperCase();
      const matches = ALL_HOME_SYMBOLS.filter(s =>
        s.id.toUpperCase().includes(qu) || s.label.toUpperCase().includes(qu) || s.symbol.toUpperCase().includes(qu)
      ).slice(0, 8);
      if (matches.length === 0) { closeAC(); return; }
      acEl.innerHTML = matches.map((s, i) => {
        const lk = lastKnownPrices[s.id];
        const pct = lk?.pct;
        const pctStr = pct != null ? `<span class="ac-pct ${pct >= 0 ? 'positive' : 'negative'}">${pct >= 0 ? '+' : ''}${pct.toFixed(2)}%</span>` : '';
        return `<div class="ac-item" data-idx="${i}" data-sym-id="${s.id}">\
          <span class="ac-ticker">${s.id.toUpperCase()}</span>\
          <span class="ac-label">${s.label}</span>\
          ${pctStr}\
        </div>`;
      }).join('');
      acEl.style.display = 'block';
      _acSelIdx = -1;
      acEl.querySelectorAll('.ac-item').forEach((el, i) => {
        el.addEventListener('mousedown', (e) => {
          e.preventDefault();
          const sym = matches[i];
          if (sym) { selectMainChartSym(sym); searchEl.value = sym.label; closeAC(); }
        });
      });
    };
    searchEl.addEventListener('keydown', e => {
      const items = acEl?.querySelectorAll('.ac-item') || [];
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        _acSelIdx = Math.min(_acSelIdx + 1, items.length - 1);
        items.forEach((el, i) => el.classList.toggle('ac-selected', i === _acSelIdx));
        return;
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        _acSelIdx = Math.max(_acSelIdx - 1, -1);
        items.forEach((el, i) => el.classList.toggle('ac-selected', i === _acSelIdx));
        return;
      }
      if (e.key === 'Escape') { closeAC(); return; }
      if (e.key === 'Enter') {
        clearTimeout(searchTimer);
        if (_acSelIdx >= 0 && items[_acSelIdx]) {
          items[_acSelIdx].dispatchEvent(new MouseEvent('mousedown'));
        } else {
          closeAC();
          searchSymbol(searchEl.value.trim());
        }
      }
    });
    searchEl.addEventListener('input', () => {
      clearTimeout(searchTimer);
      const v = searchEl.value.trim();
      showAC(v);
      searchTimer = setTimeout(() => {
        if (v.length >= 2) searchSymbol(v);
      }, 700);
    });
    searchEl.addEventListener('blur', () => { setTimeout(closeAC, 180); });
    searchEl.addEventListener('focus', () => { if (searchEl.value.trim()) showAC(searchEl.value.trim()); });
    document.addEventListener('click', e => { if (!e.target.closest('.home-search-wrap')) closeAC(); });
  }

  // ── Compare button wiring ─────────────────────────────────────────────────
  const compareBtn   = document.getElementById('compare-btn');
  const compareBar   = document.getElementById('compare-bar');
  const compareInput = document.getElementById('compare-input');
  const compareChips = document.getElementById('compare-chips');

  function renderCompareChips() {
    if (!compareChips) return;
    compareChips.innerHTML = compareSyms.map((s, i) =>
      `<span class="cmp-chip" style="border-color:${s.color};color:${s.color}" data-idx="${i}">${s.id.toUpperCase()} <span class="cmp-chip-x">×</span></span>`
    ).join('');
    compareChips.querySelectorAll('.cmp-chip').forEach(chip => {
      chip.querySelector('.cmp-chip-x').addEventListener('click', () => {
        const idx = +chip.dataset.idx;
        compareSyms.splice(idx, 1);
        if (compareSyms.length === 0) {
          compareMode = false;
          compareBar.style.display = 'none';
          compareBtn.classList.remove('active');
        }
        Object.keys(compareDataMap).forEach(k => delete compareDataMap[k]);
        renderCompareChips();
        loadMainChart();
      });
    });
  }

  if (compareBtn) {
    compareBtn.addEventListener('click', () => {
      compareMode = !compareMode;
      compareBtn.classList.toggle('active', compareMode);
      compareBar.style.display = compareMode ? 'flex' : 'none';
      if (!compareMode) {
        compareSyms = [];
        Object.keys(compareDataMap).forEach(k => delete compareDataMap[k]);
        renderCompareChips();
        loadMainChart();
      } else {
        compareInput && compareInput.focus();
      }
    });
  }

  // ── vs S&P quick compare button ────────────────────────────────────────
  const vsSpBtn = document.getElementById('vs-sp-btn');
  if (vsSpBtn) {
    vsSpBtn.addEventListener('click', () => {
      const sp = ALL_HOME_SYMBOLS.find(s => s.id === 'sp500');
      if (!sp) return;
      // If already comparing with S&P, remove it
      const existingIdx = compareSyms.findIndex(s => s.symbol === sp.symbol);
      if (existingIdx !== -1) {
        compareSyms.splice(existingIdx, 1);
        Object.keys(compareDataMap).forEach(k => delete compareDataMap[k]);
        if (compareSyms.length === 0) {
          compareMode = false;
          if (compareBar) compareBar.style.display = 'none';
          compareBtn?.classList.remove('active');
        }
        vsSpBtn.classList.remove('active');
        renderCompareChips();
        loadMainChart();
      } else {
        if (compareSyms.length >= 2) return;
        if (selectedChartSym?.symbol === sp.symbol) return; // can't compare with itself
        compareSyms.push({ ...sp, color: COMPARE_COLORS[compareSyms.length] });
        compareMode = true;
        if (compareBar) compareBar.style.display = 'flex';
        compareBtn?.classList.add('active');
        vsSpBtn.classList.add('active');
        Object.keys(compareDataMap).forEach(k => delete compareDataMap[k]);
        renderCompareChips();
        loadMainChart();
      }
    });
  }

  if (compareInput) {
    compareInput.addEventListener('keydown', e => {
      if (e.key !== 'Enter') return;
      const raw = compareInput.value.trim().toUpperCase();
      if (!raw || compareSyms.length >= 2) return;
      // Check if already in compareSyms
      if (compareSyms.some(s => s.symbol === raw || s.id === raw.toLowerCase())) return;
      const known = ALL_HOME_SYMBOLS.find(s => s.symbol.toUpperCase() === raw || s.id.toUpperCase() === raw);
      const newSym = known
        ? { ...known, color: COMPARE_COLORS[compareSyms.length] }
        : { id: raw.toLowerCase(), symbol: raw, label: raw, fmt: 'dec', color: COMPARE_COLORS[compareSyms.length] };
      compareSyms.push(newSym);
      compareMode = true;
      compareInput.value = '';
      Object.keys(compareDataMap).forEach(k => delete compareDataMap[k]);
      renderCompareChips();
      loadMainChart();
    });
  }

  // ── Session clock init + auto-refresh ────────────────────────────────────
  const clockCanvas = document.getElementById('db-session-clock');
  if (clockCanvas) {
    drawSessionClock(clockCanvas);
    setInterval(() => drawSessionClock(clockCanvas), 60_000); // refresh every minute
  }
}

// ── Market Briefing updater ───────────────────
function updateMarketBriefing() {
  if (!document.getElementById('market-briefing-bar')) return; // DBC removed in v2.92
  // Market open/close dots + label color + countdown + session progress bar (v2.45)
  ['nyse', 'lse', 'bist'].forEach(id => {
    const def   = MARKET_DEFS.find(m => m.id === id);
    const dot   = document.getElementById(`mbd-${id}`);
    const label = document.getElementById(`mbm-${id}-label`);
    const cdEl  = document.getElementById(`mbd-${id}-cd`);
    const sbEl  = document.getElementById(`dbsb-${id}`);
    if (!def || !dot) return;
    const open = def.isOpen();
    dot.className = `mb-dot ${open ? 'open' : 'closed'}`;
    if (label) label.style.color = open ? 'var(--green)' : 'var(--text-lo)';
    // Sync sidebar bottom market status dots (v2.80)
    const sDot   = document.getElementById(`smd-${id}`);
    const sLabel = document.getElementById(`smkt-${id}-lbl`);
    if (sDot)   sDot.className   = `mb-dot ${open ? 'open' : 'closed'}`;
    if (sLabel) sLabel.style.color = open ? 'var(--green)' : 'var(--text-lo)';
    if (cdEl) {
      const cd = getCountdown(id);
      cdEl.textContent  = cd.text;
      // v2.65: amber pulse when ≤30min remaining or to open
      const minutesLeft = cd.text.match(/(\d+)m/)?.[1] ? parseInt(cd.text.match(/(\d+)m/)[1]) : 999;
      const hoursLeft = cd.text.match(/(\d+)h/)?.[1] ? parseInt(cd.text.match(/(\d+)h/)[1]) : 99;
      const soonThreshold = hoursLeft === 0 && minutesLeft <= 30;
      if (soonThreshold) {
        cdEl.style.color = 'rgba(245,158,11,0.85)';
        cdEl.classList.add('cd-soon');
      } else {
        cdEl.style.color  = open ? 'rgba(16,185,129,0.55)' : 'rgba(100,116,139,0.55)';
        cdEl.classList.remove('cd-soon');
      }
    }
    // Session progress bar — shows elapsed fraction of today's session
    if (sbEl && def.openUTC && def.closeUTC) {
      const nowUTC  = new Date();
      const utcMins = nowUTC.getUTCHours() * 60 + nowUTC.getUTCMinutes();
      let pct = 0;
      if (open) {
        const dur = def.closeUTC - def.openUTC;
        pct = Math.min(100, Math.max(0, ((utcMins - def.openUTC) / dur) * 100));
      }
      sbEl.style.width      = `${pct}%`;
      sbEl.style.background = open ? 'var(--green)' : 'var(--border)';
    }
  });

  // Sentiment (up / down count from lastKnownPrices)
  const known = Object.entries(lastKnownPrices);
  if (known.length > 0) {
    const upCount = known.filter(([, v]) => v.change >= 0).length;
    const dnCount = known.length - upCount;
    const upEl = document.getElementById('mb-up');
    const dnEl = document.getElementById('mb-dn');
    if (upEl) upEl.textContent = `${upCount} ↑`;
    if (dnEl) dnEl.textContent = `${dnCount} ↓`;

    // v2.64: Momentum Gauge Ring
    const momArc = document.getElementById('db-mom-arc');
    const momPctEl = document.getElementById('db-mom-pct');
    if (momArc && known.length > 0) {
      const bullPct = upCount / known.length;
      const circumf = 2 * Math.PI * 17; // r=17 → ~106.81
      const dashLen = circumf * bullPct;
      momArc.setAttribute('stroke-dasharray', `${dashLen.toFixed(2)} ${(circumf - dashLen).toFixed(2)}`);
      const isNetBull = bullPct >= 0.5;
      momArc.setAttribute('stroke', isNetBull ? 'rgba(52,211,153,0.65)' : 'rgba(248,113,113,0.65)');
      if (momPctEl) momPctEl.textContent = `${Math.round(bullPct * 100)}%`;
    }
  }

  // Top movers (5 largest % movers — Daily Brief vertical layout with proportional bars)
  const moversEl = document.getElementById('mb-movers');
  if (!moversEl || known.length === 0) return;

  const movers = known
    .map(([id, v]) => {
      const s = ALL_HOME_SYMBOLS.find(x => x.id === id);
      return s ? { ...s, pct: v.pct, change: v.change } : null;
    })
    .filter(Boolean)
    .sort((a, b) => Math.abs(b.pct) - Math.abs(a.pct))
    .slice(0, 5);

  const maxPct = Math.max(...movers.map(s => Math.abs(s.pct)), 0.01);

  moversEl.innerHTML = movers.map(s => {
    const isUp   = s.change >= 0;
    const sign   = isUp ? '+' : '';
    const barPct = (Math.abs(s.pct) / maxPct * 100).toFixed(1);
    return `<div class="db-mover-row ${isUp ? 'up' : 'dn'}" data-sym-id="${s.id}">
      <span class="db-mover-name">${s.label}</span>
      <span class="db-mover-pct">${sign}${s.pct.toFixed(2)}%</span>
      <canvas class="db-mover-spark" id="dbms-${s.id}" width="40" height="16"></canvas>
      <div class="db-mover-bar"><div class="db-mover-bar-fill" style="width:${barPct}%"></div></div>
    </div>`;
  }).join('');

  // Draw micro-sparklines from cache; fire-and-forget fetch if not cached (v2.45)
  movers.forEach(s => {
    const cacheKey = Object.keys(chartDataCache).find(k => k.startsWith(`${s.id}|`));
    const canvas   = document.getElementById(`dbms-${s.id}`);
    if (!canvas) return;
    if (cacheKey) {
      drawSparkline(canvas, chartDataCache[cacheKey], s.change >= 0);
    } else {
      // Fetch 1d data in background
      fetchChartData(s.symbol, '5d', '30m').then(data => {
        if (data && data.length > 0 && document.getElementById(`dbms-${s.id}`)) {
          drawSparkline(canvas, data, s.change >= 0);
        }
      }).catch(() => {});
    }
  });

  moversEl.querySelectorAll('.db-mover-row').forEach(el => {
    el.addEventListener('click', () => {
      const sym = ALL_HOME_SYMBOLS.find(s => s.id === el.dataset.symId);
      if (sym) selectMainChartSym(sym);
    });
  });

  // ── Risk Meter ──────────────────────────────────────────────────────────
  const riskEl = document.getElementById('mb-risk');
  const vixEl  = document.getElementById('mb-vix');
  if (riskEl) {
    const score = calcRiskScore();
    let label, cls;
    if      (score >= 2)  { label = '▲ Risk-On';  cls = 'risk-on';  }
    else if (score <= -2) { label = '▼ Risk-Off'; cls = 'risk-off'; }
    else if (score > 0)   { label = '◈ Mild Risk-On';  cls = 'risk-mild-on'; }
    else if (score < 0)   { label = '◈ Mild Risk-Off'; cls = 'risk-mild-off'; }
    else                  { label = '● Neutral';  cls = 'neutral'; }
    riskEl.textContent = label;
    riskEl.className   = `mb-risk-badge ${cls}`;
  }
  if (vixEl && riskPrices['vix']) {
    const v = riskPrices['vix'];
    const sign = v.change >= 0 ? '+' : '';
    vixEl.textContent = `VIX ${v.price.toFixed(1)} (${sign}${v.pct.toFixed(1)}%)`;
    vixEl.className   = `mb-risk-sub ${v.change >= 0 ? 'dn' : 'up'}`;  // VIX up = bad
    // ── Volatility Lightning when VIX spikes ≥5% vs last known price (v2.51) ─
    if (_prevVixPrice !== null && v.price > 0) {
      const vixChangePct = Math.abs((v.price - _prevVixPrice) / Math.max(0.01, _prevVixPrice) * 100);
      if (vixChangePct >= 5) triggerLightningFlash();
    }
    _prevVixPrice = v.price;
  }

  // ── GeoPulse Badge ──────────────────────────────────────────────────────
  const geoEl = document.getElementById('mb-geo');
  if (geoEl) {
    const gs = calcGeoPulseScore();
    let gLabel, gCls;
    if      (gs >= 4) { gLabel = '🔴 GEO HIGH';      gCls = 'geo-high'; }
    else if (gs >= 2) { gLabel = '🟡 GEO ELEVATED';  gCls = 'geo-elevated'; }
    else              { gLabel = '🟢 GEO LOW';        gCls = 'geo-low'; }
    geoEl.textContent = gLabel;
    geoEl.className   = `mb-geo-badge ${gCls}`;
  }

  // ── Daily Brief metric cards (S&P, NASDAQ, BTC, Gold, Oil, VIX) — v2.85 ──
  const BRIEF_METRICS = [
    { id: 'sp500',  fmt: 'int',    dataFn: () => lastKnownPrices['sp500']  },
    { id: 'nasdaq', fmt: 'int',    dataFn: () => lastKnownPrices['nasdaq'] },
    { id: 'btc',    fmt: 'crypto', dataFn: () => lastKnownPrices['btc']    },
    { id: 'gold',   fmt: 'dec',    dataFn: () => lastKnownPrices['gold']   },
    { id: 'oil',    fmt: 'dec',    dataFn: () => lastKnownPrices['oil']    },
    { id: 'vix',    fmt: 'dec',    dataFn: () => riskPrices['vix']         },
  ];
  BRIEF_METRICS.forEach(m => {
    const data    = m.dataFn();
    const priceEl = document.getElementById(`dbp-${m.id}`);
    const badgeEl = document.getElementById(`dbb-${m.id}`);
    if (!priceEl || !badgeEl || !data) return;
    const isPos  = data.change >= 0;
    const sign   = isPos ? '+' : '';
    updateDigitRoller(priceEl, fmtPrice(data.price, m.fmt));
    badgeEl.textContent = `${sign}${data.pct.toFixed(2)}%`;
    badgeEl.className   = `db-metric-badge ${isPos ? 'positive' : 'negative'}`;

    // Colored left-border accent + pulse glow (v2.85 — replaces broken sparkline)
    const cardEl = document.getElementById(`dbm-${m.id}`);
    if (cardEl) {
      cardEl.classList.toggle('positive', isPos);
      cardEl.classList.toggle('negative', !isPos);
      cardEl.classList.remove('db-card-pulse');
      void cardEl.offsetWidth;
      cardEl.classList.add('db-card-pulse');
    }

    // 24h Range Bar (v2.45) — shows where price sits within today's high-low
    const fillEl  = document.getElementById(`dbr-${m.id}`);
    const dotEl   = document.getElementById(`dbrd-${m.id}`);
    const loLabel = document.getElementById(`dbrl-${m.id}-lo`);
    const hiLabel = document.getElementById(`dbrl-${m.id}-hi`);
    const lo = data.dayLow, hi = data.dayHigh;
    if (fillEl && dotEl && lo && hi && hi > lo) {
      const pct = Math.min(100, Math.max(0, ((data.price - lo) / (hi - lo)) * 100));
      fillEl.style.width = `${pct}%`;
      dotEl.style.left   = `${pct}%`;
      dotEl.style.background = isPos ? 'var(--green)' : 'var(--red)';
      if (loLabel) loLabel.textContent = fmtPrice(lo, m.fmt);
      if (hiLabel) hiLabel.textContent = fmtPrice(hi, m.fmt);
    }
  });

  // Click handlers on stat tiles → select chart symbol (attach once)
  document.querySelectorAll('.dbc-stat[data-sym-id], .db-metric-card[data-sym-id]').forEach(card => {
    if (card._dbClickAttached) return;
    card._dbClickAttached = true;
    card.addEventListener('click', () => {
      const sym = ALL_HOME_SYMBOLS.find(s => s.id === card.dataset.symId);
      if (sym) selectMainChartSym(sym);
    });
  });
}

// ── Category Breadth Pills (v2.45) ─────────────────────────────────────────
// After fetchHomeData() completes, show ↑N ↓N in each category tab
function updateCatBreadthPills() {
  const HOME_CATS = [
    { id: 'all',         syms: ALL_HOME_SYMBOLS },
    { id: 'indices',     syms: ALL_HOME_SYMBOLS.filter(s => s.category === 'indices') },
    { id: 'crypto',      syms: ALL_HOME_SYMBOLS.filter(s => s.category === 'crypto') },
    { id: 'forex',       syms: ALL_HOME_SYMBOLS.filter(s => s.category === 'forex') },
    { id: 'commodities', syms: ALL_HOME_SYMBOLS.filter(s => s.category === 'commodities') },
  ];
  HOME_CATS.forEach(({ id, syms }) => {
    const el = document.getElementById(`cb-${id}`);
    if (!el) return;
    // v2.92: Only show breadth on ALL tab to reduce clutter
    if (id !== 'all') { el.style.display = 'none'; return; }
    const known = syms.filter(s => lastKnownPrices[s.id]);
    if (known.length === 0) { el.style.display = 'none'; return; }
    const up = known.filter(s => lastKnownPrices[s.id].change >= 0).length;
    const dn = known.length - up;
    el.innerHTML = `<span style="color:var(--green)">↑${up}</span><span style="color:var(--red)">↓${dn}</span>`;
    el.style.display = 'inline-flex';
  });
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

// ── Chart Watch Button State ──────────────────
function updateChartWatchBtn(sym) {
  const btn = document.getElementById('chart-watch-btn');
  if (!btn || !sym) return;
  const isWatching = watchlistItems.some(i => i.symbol === sym.symbol);
  btn.textContent = isWatching ? '✓ Watching' : '👁 Watch';
  btn.className   = `chart-watch-btn${isWatching ? ' watching' : ''}`;
}

// ── Select chart symbol ───────────────────────
function selectMainChartSym(sym) {
  _zoomStart = 0; _zoomBars = -1; // reset zoom on symbol change (v2.49)
  homePanel.querySelectorAll('.sym-chip').forEach(c => c.classList.remove('active'));
  const chip = document.getElementById(`chip-${sym.id}`);
  if (chip) {
    chip.classList.add('active');
    chip.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'smooth' });
  }
  selectedChartSym = sym;
  const nameEl = document.getElementById('main-name');
  if (nameEl) nameEl.textContent = sym.label;
  // Update news filter for selected symbol
  currentNewsFilter = sym;
  renderNewsPanel();
  loadMainChart();
  loadFundamentalsBar(sym);
  loadExtraInfoBar(sym);
  updateAnnClearBtn();
  // Load chart notes for new symbol
  const notesTa = document.getElementById('chart-notes-ta');
  if (notesTa) notesTa.value = chartNotes[sym.symbol] || '';
  updateChartWatchBtn(sym);
  // Daily challenge auto-tick: opened a chart
  tickDcStep('open_chart');
  // Quick symbol memory — store last 3 viewed symbols (v2.55)
  _updateRecentSymbols(sym);

  // ── Background pre-fetch all TFs for instant TF switching (v2.87, optimized v2.92) ──
  // v2.92: Reduced delay from 1200ms→200ms and stagger from 350ms→150ms.
  // In-flight dedup in fetchChartData() prevents duplicate requests.
  const _prefetchSym = sym.symbol;
  const _prefetchTFs = [
    { range: '5d',  interval: '30m' },
    { range: '1mo', interval: '1d'  },
    { range: '3mo', interval: '1d'  },
    { range: '1y',  interval: '1wk' },
    { range: '5y',  interval: '1mo' },
  ];
  let _pfDelay = 200;
  _prefetchTFs.forEach(tf => {
    const key = `${_prefetchSym}|${tf.range}|${tf.interval}`;
    if (!chartDataCache[key]) {
      setTimeout(() => {
        if (selectedChartSym.symbol === _prefetchSym) { // still on same symbol
          fetchChartData(_prefetchSym, tf.range, tf.interval).catch(() => {});
        }
      }, _pfDelay);
      _pfDelay += 150;
    }
  });
}

// ── Recent symbol memory (v2.55) ────────────────────────────────────────────
const _MAX_RECENT = 4;
function _getRecentSymbols() {
  try { return JSON.parse(localStorage.getItem('fh-recent-syms') || '[]'); } catch { return []; }
}
function _updateRecentSymbols(sym) {
  let rec = _getRecentSymbols().filter(s => s.symbol !== sym.symbol);
  rec.unshift({ symbol: sym.symbol, id: sym.id, label: sym.label, fmt: sym.fmt, category: sym.category });
  if (rec.length > _MAX_RECENT) rec = rec.slice(0, _MAX_RECENT);
  localStorage.setItem('fh-recent-syms', JSON.stringify(rec));
  _renderRecentSymbols();
}
function _renderRecentSymbols() {
  const el = document.getElementById('chart-recent-syms');
  if (!el) return;
  const rec = _getRecentSymbols();
  // Exclude currently selected
  const filtered = rec.filter(s => s.symbol !== selectedChartSym?.symbol).slice(0, 3);
  if (filtered.length === 0) { el.style.display = 'none'; return; }
  el.style.display = 'flex';
  el.innerHTML = filtered.map(s =>
    `<button class="recent-sym-chip" data-sym="${s.symbol}" title="Go to ${s.label}">${s.label}</button>`
  ).join('');
  el.querySelectorAll('.recent-sym-chip').forEach(btn => {
    btn.addEventListener('click', () => {
      const found = ALL_HOME_SYMBOLS.find(x => x.symbol === btn.dataset.sym);
      if (found) selectMainChartSym(found);
    });
  });
}

// ── Load main chart ───────────────────────────
async function loadMainChart() {
  const canvas = document.getElementById('main-chart-canvas');
  if (!canvas) return;

  // Grid mode: delegate to multi-TF grid
  if (currentChartType === 'grid') {
    canvas.style.display = 'none';
    document.getElementById('main-chart-grid')?.style.setProperty('display', '');
    document.getElementById('options-chain-panel')?.style.setProperty('display', 'none');
    drawMultiTFGrid(selectedChartSym);
    const daily = await fetchPriceV8(selectedChartSym);
    if (daily) {
      const isUp = daily.change >= 0; const sign = isUp ? '+' : '';
      const priceEl = document.getElementById('main-price');
      const chgEl   = document.getElementById('main-chg');
      if (priceEl) priceEl.textContent = fmtPrice(daily.price, selectedChartSym.fmt);
      if (chgEl) { chgEl.textContent = `${sign}${Math.abs(daily.change).toFixed(2)} (${sign}${daily.pct.toFixed(2)}%)`; chgEl.className = `chart-sym-chg ${isUp ? 'positive' : 'negative'}`; }
    }
    return;
  }

  // Options mode: show options chain
  if (currentChartType === 'options') {
    canvas.style.display = 'none';
    document.getElementById('main-chart-grid')?.style.setProperty('display', 'none');
    const optsEl = document.getElementById('options-chain-panel');
    if (optsEl) { optsEl.style.display = ''; loadOptionsChain(selectedChartSym); }
    const daily = await fetchPriceV8(selectedChartSym);
    if (daily) {
      const isUp = daily.change >= 0; const sign = isUp ? '+' : '';
      const priceEl = document.getElementById('main-price');
      const chgEl   = document.getElementById('main-chg');
      if (priceEl) priceEl.textContent = fmtPrice(daily.price, selectedChartSym.fmt);
      if (chgEl) { chgEl.textContent = `${sign}${Math.abs(daily.change).toFixed(2)} (${sign}${daily.pct.toFixed(2)}%)`; chgEl.className = `chart-sym-chg ${isUp ? 'positive' : 'negative'}`; }
    }
    return;
  }

  // Restore canvas, hide overlays
  canvas.style.display = '';
  document.getElementById('main-chart-grid')?.style.setProperty('display', 'none');
  document.getElementById('options-chain-panel')?.style.setProperty('display', 'none');

  // v2.92: Draw chart IMMEDIATELY from cache — don't wait for fetchPriceV8.
  // Price header updates asynchronously in background.
  const _chartCacheKey = `${selectedChartSym.symbol}|${mainTf.range}|${mainTf.interval}`;
  const _cachedData = chartDataCache[_chartCacheKey];

  // Fire both, but don't block chart drawing on fetchPriceV8
  const chartDataPromise = _cachedData ? Promise.resolve(_cachedData) : fetchChartData(selectedChartSym.symbol, mainTf.range, mainTf.interval);
  const dailyPromise = fetchPriceV8(selectedChartSym);

  // If cached, we can skip waiting for fetchPriceV8 entirely for chart drawing
  const data = _cachedData || await chartDataPromise;
  // Daily price: use lastKnownPrices as instant fallback, update when API responds
  const _symId = selectedChartSym.id || selectedChartSym.symbol;
  const _knownPrice = lastKnownPrices[_symId];
  let daily = _knownPrice ? { price: _knownPrice.price, change: _knownPrice.change, pct: _knownPrice.pct, marketState: _knownPrice.marketState || 'CLOSED', dayLow: _knownPrice.dayLow, dayHigh: _knownPrice.dayHigh } : null;

  if (data && data.length > 0) {
    mainChartData = data;

    // ── Header: use cached price instantly, update when API responds ──
    const last = daily ? daily.price : data[data.length - 1].close;
    const dailyChange = daily ? daily.change : 0;
    const dailyPct    = daily ? daily.pct    : 0;
    const isUp  = dailyChange >= 0;
    const sign  = isUp ? '+' : '';

    const priceEl = document.getElementById('main-price');
    const chgEl   = document.getElementById('main-chg');
    if (priceEl) priceEl.textContent = fmtPrice(last, selectedChartSym.fmt);
    if (chgEl) {
      const absChg = Math.abs(dailyChange);
      const chgStr = absChg >= 1000
        ? fmtPrice(absChg, selectedChartSym.fmt)
        : absChg.toFixed(absChg < 1 ? 4 : 2);
      chgEl.textContent = `${sign}${chgStr} (${sign}${dailyPct.toFixed(2)}%)`;
      chgEl.className   = `chart-sym-chg ${isUp ? 'positive' : 'negative'}`;
    }

    // Market status dot
    const dot = document.getElementById('market-status-dot');
    if (dot && daily) {
      const state = daily.marketState;
      const isOpen   = state === 'REGULAR';
      const isPrePost = state === 'PRE' || state === 'POST' || state === 'PREPRE' || state === 'POSTPOST';
      dot.className = 'market-status-dot ' + (isOpen ? 'open' : isPrePost ? 'pre' : 'closed');
      dot.title     = isOpen ? 'Market Open' : isPrePost ? 'Pre/Post Market' : 'Market Closed';
    }

    lastMainChartData = data;
    lastMainChartSym  = selectedChartSym;

    // ── v2.68: Chart Date Range Pill ─────────────────────────────────────
    {
      const drEl = document.getElementById('chart-date-range');
      if (drEl && data.length >= 2) {
        try {
          const t0 = data[0].time;
          const t1 = data[data.length - 1].time;
          if (t0 && t1) {
            const fmtD = (ts) => {
              const d = new Date(ts * 1000);
              return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            };
            drEl.textContent = `${fmtD(t0)} – ${fmtD(t1)}`;
            drEl.style.display = '';
          } else { drEl.style.display = 'none'; }
        } catch (_) { drEl.style.display = 'none'; }
      }
    }

    // v2.92: Defer all badge/detection computations — draw chart FIRST, update badges async
    setTimeout(() => {
    if (selectedChartSym.symbol !== (_chartCacheKey.split('|')[0])) return; // stale guard

    // ── Historical Volatility (HV20) + ATR14 ─────────────────────────────
    const hvEl = document.getElementById('chart-hv-stat');
    if (hvEl && data.length >= 22) {
      try {
        const closes = data.map(d => d.close);
        const n = Math.min(21, closes.length);
        const slice = closes.slice(closes.length - n);
        const rets = [];
        for (let i = 1; i < slice.length; i++) {
          if (slice[i - 1] > 0) rets.push(Math.log(slice[i] / slice[i - 1]));
        }
        // ATR14 (Wilder smooth)
        let atrText = '';
        if (data.length >= 15) {
          const trArr = [];
          for (let i = 1; i < data.length; i++) {
            const h = data[i].high  || data[i].close;
            const l = data[i].low   || data[i].close;
            const pc = data[i-1].close;
            trArr.push(Math.max(h - l, Math.abs(h - pc), Math.abs(l - pc)));
          }
          // Wilder smooth over 14
          let atr = trArr.slice(0, 14).reduce((a, b) => a + b, 0) / 14;
          for (let i = 14; i < trArr.length; i++) atr = (atr * 13 + trArr[i]) / 14;
          atrText = ` · ATR ${fmtPrice(atr, selectedChartSym.fmt)}`;
        }
        if (rets.length >= 10) {
          const mean = rets.reduce((a, b) => a + b, 0) / rets.length;
          const variance = rets.reduce((s, r) => s + (r - mean) ** 2, 0) / rets.length;
          const hv20 = Math.sqrt(variance * 252) * 100;
          hvEl.textContent = `HV20 ${hv20.toFixed(1)}%${atrText}`;
          hvEl.style.display = '';
        } else if (atrText) {
          hvEl.textContent = atrText.slice(3); // remove leading " · "
          hvEl.style.display = '';
        }
      } catch (_) { hvEl.style.display = 'none'; }
    } else if (hvEl) { hvEl.style.display = 'none'; }

    // ── BB Squeeze Detection ──────────────────────────────────────────────
    const sqEl = document.getElementById('chart-squeeze-badge');
    if (sqEl && data.length >= 25) {
      try {
        const sqCloses = data.map(d => d.close);
        const bb = calcBollingerBands(sqCloses, 20, 2);
        const kc = calcKeltnerChannels(data, 20, 14, 1.5);
        const lastBBU = bb.upper.slice().reverse().find(v => v != null);
        const lastBBL = bb.lower.slice().reverse().find(v => v != null);
        const lastKCU = kc?.upper.slice().reverse().find(v => v != null);
        const lastKCL = kc?.lower.slice().reverse().find(v => v != null);
        if (lastBBU != null && lastKCU != null) {
          const isSq = lastBBU < lastKCU && lastBBL > lastKCL;
          sqEl.textContent = isSq ? '🔴 SQUEEZE' : '🟢 EXPANDING';
          sqEl.className   = `chart-squeeze-badge ${isSq ? 'squeeze' : 'expanding'}`;
          sqEl.style.display = '';
        } else { sqEl.style.display = 'none'; }
      } catch (_) { sqEl.style.display = 'none'; }
    } else if (sqEl) { sqEl.style.display = 'none'; }

    // ── Market Regime Detector (ADX + BB width) ───────────────────────────
    const regEl = document.getElementById('chart-regime-badge');
    if (regEl && data.length >= 30) {
      try {
        const adxRes = calcADX(data, 14);
        const lastADX = adxRes.adx.slice().reverse().find(v => v != null) || 0;
        const regCloses = data.map(d => d.close);
        const regBB = calcBollingerBands(regCloses, 20, 2);
        const validU = regBB.upper.filter(v => v != null);
        const validL = regBB.lower.filter(v => v != null);
        let regime = 'RANGING', regCls = 'regime-ranging', regIcon = '↔';
        if (lastADX > 25) {
          regime = 'TRENDING'; regCls = 'regime-trending'; regIcon = '📈';
        } else if (lastADX >= 18 && validU.length >= 6) {
          const bwNow  = validU[validU.length - 1] - validL[validL.length - 1];
          const bwPrev = validU[validU.length - 6] - validL[validL.length - 6];
          if (bwNow > bwPrev * 1.15) {
            regime = 'VOLATILE'; regCls = 'regime-volatile'; regIcon = '⚡';
          }
        }
        _lastRegime = regime.toLowerCase(); // persist for chart bg tint (v2.41)
        regEl.textContent = `${regIcon} ${regime}`;
        regEl.className   = `chart-regime-badge ${regCls}`;
        regEl.style.display = '';
      } catch (_) { regEl.style.display = 'none'; }
    } else if (regEl) { regEl.style.display = 'none'; }

    // ── Market Phase Detector (v2.58) — Wyckoff-inspired 4-phase detection ──
    const phEl = document.getElementById('chart-phase-badge');
    if (phEl && data.length >= 50) {
      try {
        const phCloses = data.map(d => d.close);
        const ema200 = calcEMA(phCloses, Math.min(200, Math.floor(phCloses.length * 0.8)));
        const lastEma = ema200.slice().reverse().find(v => v != null);
        const lastPrice = phCloses[phCloses.length - 1];
        // Recent swing detection: compare last 10 bars vs previous 10
        const n50 = phCloses.length;
        const half = Math.max(5, Math.floor(n50 / 5));
        const recentHigh = Math.max(...phCloses.slice(-half));
        const prevHigh   = Math.max(...phCloses.slice(-half * 2, -half));
        const recentLow  = Math.min(...phCloses.slice(-half));
        const prevLow    = Math.min(...phCloses.slice(-half * 2, -half));
        let phase = '', phCls = '', phIcon = '';
        if (lastEma && lastPrice > lastEma) {
          if (recentHigh > prevHigh) {
            phase = 'MARKUP'; phCls = 'phase-markup'; phIcon = '🚀';
          } else {
            phase = 'DISTRIBUTION'; phCls = 'phase-dist'; phIcon = '⚖';
          }
        } else if (lastEma) {
          if (recentLow < prevLow) {
            phase = 'MARKDOWN'; phCls = 'phase-markdown'; phIcon = '📉';
          } else {
            phase = 'ACCUMULATION'; phCls = 'phase-accum'; phIcon = '🔄';
          }
        }
        if (phase) {
          phEl.textContent  = `${phIcon} ${phase}`;
          phEl.className    = `chart-phase-badge ${phCls}`;
          phEl.style.display = '';
        } else { phEl.style.display = 'none'; }
      } catch (_) { phEl.style.display = 'none'; }
    } else if (phEl) { phEl.style.display = 'none'; }

    // ── Chart Pattern Detection ────────────────────────────────────────────
    const ptEl = document.getElementById('chart-pattern-badge');
    if (ptEl && data.length >= 30) {
      try {
        const patterns = detectChartPatterns(data);
        if (patterns.length > 0) {
          ptEl.innerHTML = patterns.map(p => {
            const cls = p.signal === 'bullish' ? 'pattern-bull' : 'pattern-bear';
            return `<span class="chart-pattern-chip ${cls}">${p.type}</span>`;
          }).join('');
          ptEl.style.display = '';
        } else { ptEl.style.display = 'none'; }
      } catch (_) { ptEl.style.display = 'none'; }
    } else if (ptEl) { ptEl.style.display = 'none'; }

    // ── Multi-TF RSI Badge (v2.54) ────────────────────────────────────────
    const mtfRsiEl = document.getElementById('chart-mtf-rsi');
    if (mtfRsiEl && selectedChartSym) {
      // Async: fire-and-forget MTF RSI computation using cached data
      (async () => {
        try {
          const TFS = [
            { label: '1D', range: '5d',  interval: '30m' },
            { label: '1W', range: '1mo', interval: '1d'  },
            { label: '1M', range: '3mo', interval: '1d'  },
          ];
          const rsiVals = await Promise.all(TFS.map(async tf => {
            const cacheKey = Object.keys(chartDataCache).find(k =>
              k.startsWith(`${selectedChartSym.id}|${tf.range}`) ||
              k.startsWith(`${selectedChartSym.symbol}|${tf.range}`)
            );
            const d = cacheKey ? chartDataCache[cacheKey]
                                : await fetchChartData(selectedChartSym.symbol, tf.range, tf.interval);
            if (!d || d.length < 15) return { label: tf.label, rsi: null };
            const closes = d.map(x => x.close);
            const rsiArr = calcRSI(closes, 14);
            const last = rsiArr.slice().reverse().find(v => v != null);
            return { label: tf.label, rsi: last != null ? Math.round(last) : null };
          }));
          const chips = rsiVals.filter(v => v.rsi != null).map(v => {
            const cls = v.rsi >= 70 ? 'mtf-ob' : v.rsi <= 30 ? 'mtf-os' : 'mtf-n';
            return `<span class="mtf-chip ${cls}">${v.label} ${v.rsi}</span>`;
          });
          if (chips.length > 0) {
            mtfRsiEl.innerHTML = 'RSI ' + chips.join('');
            mtfRsiEl.style.display = '';
          } else {
            mtfRsiEl.style.display = 'none';
          }
        } catch (_) { if (mtfRsiEl) mtfRsiEl.style.display = 'none'; }
      })();
    } else if (mtfRsiEl) { mtfRsiEl.style.display = 'none'; }

    // ── N-Day Return Strip (v2.57) — 1D/5D/1M return from current chart data ─
    {
      const ndrEl = document.getElementById('chart-nday-returns');
      if (ndrEl && data && data.length >= 3) {
        try {
          const cls = data.map(d => d.close);
          const last = cls[cls.length - 1];
          const ret = (p0, p1) => p0 > 0 ? ((p1 - p0) / p0) * 100 : null;
          const segments = [];
          if (cls.length >= 2)  { const r = ret(cls[cls.length - 2], last); if (r != null) segments.push({ lbl: '1D', r }); }
          if (cls.length >= 6)  { const r = ret(cls[cls.length - 6], last); if (r != null) segments.push({ lbl: '5D', r }); }
          if (cls.length >= 22) { const r = ret(cls[cls.length - 22], last); if (r != null) segments.push({ lbl: '1M', r }); }
          if (segments.length > 0) {
            ndrEl.innerHTML = segments.map(s => {
              const sign = s.r >= 0 ? '+' : '';
              const cls2 = s.r >= 0 ? 'ndr-pos' : 'ndr-neg';
              return `<span class="ndr-chip ${cls2}">${s.lbl} ${sign}${s.r.toFixed(1)}%</span>`;
            }).join('');
            ndrEl.style.display = '';
          } else { ndrEl.style.display = 'none'; }
        } catch (_) { if (ndrEl) ndrEl.style.display = 'none'; }
      } else if (ndrEl) { ndrEl.style.display = 'none'; }
    }

    // ── v2.62 Trend Strength Meter ─────────────────────────────────────────
    {
      const tmEl = document.getElementById('chart-trend-meter');
      if (tmEl && data && data.length >= 20) {
        try {
          const adxRes = calcADX(data, 14);
          const lastAdx = adxRes.adx.slice().reverse().find(v => v != null && !isNaN(v));
          const lastDIp = adxRes.diPlus.slice().reverse().find(v => v != null && !isNaN(v));
          const lastDIm = adxRes.diMinus.slice().reverse().find(v => v != null && !isNaN(v));
          if (lastAdx != null) {
            const isUp2 = lastDIp != null && lastDIm != null ? lastDIp > lastDIm : data[data.length-1].close >= data[data.length-2].close;
            const strength = lastAdx >= 50 ? 'Strong' : lastAdx >= 25 ? 'Moderate' : 'Weak';
            const dir = isUp2 ? '▲' : '▼';
            const tmCls = `chart-trend-meter ${isUp2 ? 'tm-bull' : 'tm-bear'} tm-${strength.toLowerCase()}`;
            tmEl.textContent = `${dir} ${strength} ${Math.round(lastAdx)}`;
            tmEl.className   = tmCls;
            tmEl.title       = `ADX ${lastAdx.toFixed(1)} — ${isUp2 ? '+DI' : '-DI'} dominant`;
            tmEl.style.display = '';
          } else { tmEl.style.display = 'none'; }
        } catch (_) { if (tmEl) tmEl.style.display = 'none'; }
      } else if (tmEl) { tmEl.style.display = 'none'; }
    }

    // ── v2.67 Oscillator Confluence Badge ──────────────────────────────────
    {
      const confEl = document.getElementById('chart-confluence-badge');
      if (confEl && data && data.length >= 30) {
        try {
          const closes2 = data.map(d => d.close).filter(v => v != null && !isNaN(v));
          let votes = 0; // positive = bull, negative = bear
          let total = 0;
          // RSI direction
          const rsiArr2 = calcRSI(closes2, 14);
          const lastRsi2 = rsiArr2.slice().reverse().find(v => v != null && !isNaN(v));
          const prevRsi2 = rsiArr2.slice(0, -1).reverse().find(v => v != null && !isNaN(v));
          if (lastRsi2 != null && prevRsi2 != null) {
            votes += lastRsi2 > 50 ? 1 : -1; total++;
          }
          // MACD direction (histogram sign)
          const macdRes2 = calcMACD(closes2);
          const lastHist2 = macdRes2.hist.slice().reverse().find(v => v != null && !isNaN(v));
          const prevHist2 = macdRes2.hist.slice(0, -1).reverse().find(v => v != null && !isNaN(v));
          if (lastHist2 != null) {
            votes += lastHist2 > 0 ? 1 : -1; total++;
          }
          // Stochastic %K direction
          const stochRes2 = calcStochastic(data);
          const lastK2 = stochRes2.k.slice().reverse().find(v => v != null && !isNaN(v));
          if (lastK2 != null) {
            votes += lastK2 > 50 ? 1 : -1; total++;
          }
          if (total >= 2) {
            const bullCount = Math.round((votes + total) / 2);
            const bearCount = total - bullCount;
            const isBull = votes > 0;
            const isBear = votes < 0;
            const unanimous = Math.abs(votes) === total;
            if (unanimous || Math.abs(votes) >= total - 1) {
              if (isBull) {
                confEl.textContent = unanimous ? `🟢 BULL ${total}/${total}` : `🟡 BULL ${bullCount}/${total}`;
                confEl.className = `chart-confluence-badge conf-bull${unanimous ? ' conf-strong' : ''}`;
              } else if (isBear) {
                confEl.textContent = unanimous ? `🔴 BEAR ${total}/${total}` : `🟠 BEAR ${bearCount}/${total}`;
                confEl.className = `chart-confluence-badge conf-bear${unanimous ? ' conf-strong' : ''}`;
              }
              confEl.title = `RSI ${lastRsi2 != null ? Math.round(lastRsi2) : '–'} | MACD hist ${lastHist2 != null ? (lastHist2 > 0 ? '+' : '') + lastHist2.toFixed(2) : '–'} | Stoch ${lastK2 != null ? Math.round(lastK2) : '–'}`;
              confEl.style.display = '';
            } else {
              confEl.style.display = 'none';
            }
          } else { confEl.style.display = 'none'; }
        } catch (_) { if (confEl) confEl.style.display = 'none'; }
      } else if (confEl) { confEl.style.display = 'none'; }
    }

    // ── v2.76 Technical Rating Chip ────────────────────────────────────────
    {
      const taEl = document.getElementById('chart-ta-rating');
      if (taEl && data && data.length >= 50) {
        try {
          const closes = data.map(d => d.close).filter(v => v != null && !isNaN(v));
          let score = 0, signals = 0;
          // EMA Trend (EMA20 vs EMA50)
          const ema20v = calcEMA(closes, 20); const ema50v = calcEMA(closes, 50);
          if (ema20v && ema50v) {
            const e20 = ema20v[ema20v.length - 1], e50 = ema50v[ema50v.length - 1];
            if (e20 != null && e50 != null) { score += e20 > e50 ? 2 : -2; signals += 2; }
          }
          // EMA200 trend (price vs EMA200)
          const ema200v = calcEMA(closes, 200);
          if (ema200v) {
            const e200 = ema200v[ema200v.length - 1], lastC = closes[closes.length - 1];
            if (e200 != null) { score += lastC > e200 ? 1 : -1; signals++; }
          }
          // RSI
          const rsiV = calcRSI(closes, 14);
          if (rsiV) {
            const r = rsiV[rsiV.length - 1];
            if (r != null) {
              score += r < 30 ? 2 : r < 45 ? 1 : r > 70 ? -2 : r > 55 ? -1 : 0;
              signals += 2;
            }
          }
          // MACD histogram
          const macdV = calcMACD(closes, 12, 26, 9);
          if (macdV) {
            const h = macdV.hist[macdV.hist.length - 1], hp = macdV.hist[macdV.hist.length - 2];
            if (h != null && hp != null) { score += h > 0 && h > hp ? 1 : h < 0 && h < hp ? -1 : 0; signals++; }
          }
          // Price momentum (5-bar)
          if (closes.length >= 6) {
            const mom = (closes[closes.length - 1] - closes[closes.length - 6]) / closes[closes.length - 6] * 100;
            score += mom > 2 ? 1 : mom < -2 ? -1 : 0; signals++;
          }
          const pct = signals > 0 ? score / signals : 0;
          let label, cls;
          if (pct > 0.55)       { label = '▲▲ STRONG BUY';  cls = 'ta-strong-buy'; }
          else if (pct > 0.2)   { label = '▲ BUY';          cls = 'ta-buy'; }
          else if (pct < -0.55) { label = '▼▼ STRONG SELL'; cls = 'ta-strong-sell'; }
          else if (pct < -0.2)  { label = '▼ SELL';         cls = 'ta-sell'; }
          else                  { label = '— NEUTRAL';       cls = 'ta-neutral'; }
          taEl.textContent = label;
          taEl.className = `chart-ta-rating ${cls}`;
          taEl.title = `TA Score: ${score.toFixed(1)}/${signals} signals`;
          taEl.style.display = '';
        } catch (_) { if (taEl) taEl.style.display = 'none'; }
      } else if (taEl) { taEl.style.display = 'none'; }
    }

    }, 0); // end of deferred badge computations (v2.92)

    // Compare mode: fetch extra symbols then draw comparison chart
    if (compareMode && compareSyms.length > 0) {
      await Promise.all(compareSyms.map(async s => {
        if (!compareDataMap[s.symbol]) {
          const d = await fetchChartData(s.symbol, mainTf.range, mainTf.interval);
          if (d && d.length > 0) compareDataMap[s.symbol] = d;
        }
      }));
      drawCompareChart(canvas, data, selectedChartSym, compareDataMap);
    } else {
      const _symChanged = !lastMainChartSym || lastMainChartSym.symbol !== selectedChartSym.symbol;
      lastMainChartData = data;
      lastMainChartSym  = selectedChartSym;
      // v2.92: Only animate on symbol change, skip on TF switch for instant feel
      if (_symChanged) startChartDrawAnim();
      else drawMainChart(canvas, data, selectedChartSym);
      updateSubPanels(data);
      // AI Market Narrative (v2.81) — async, non-blocking
      generateMarketNarrative(selectedChartSym, data).catch(() => {});
      // Update symbol lens if open (v2.81)
      if (_symLensOpen) populateSymbolLens();
    }
  } else {
    simulateMainChart(canvas);
  }

  // v2.92: Background price header update — don't block chart drawing
  dailyPromise.then(freshDaily => {
    if (!freshDaily) return;
    // Only update if still on the same symbol
    if (selectedChartSym.symbol !== (_chartCacheKey.split('|')[0])) return;
    const fLast = freshDaily.price;
    const fIsUp = freshDaily.change >= 0;
    const fSign = fIsUp ? '+' : '';
    const fPriceEl = document.getElementById('main-price');
    const fChgEl   = document.getElementById('main-chg');
    if (fPriceEl) fPriceEl.textContent = fmtPrice(fLast, selectedChartSym.fmt);
    if (fChgEl) {
      const a = Math.abs(freshDaily.change);
      const s = a >= 1000 ? fmtPrice(a, selectedChartSym.fmt) : a.toFixed(a < 1 ? 4 : 2);
      fChgEl.textContent = `${fSign}${s} (${fSign}${freshDaily.pct.toFixed(2)}%)`;
      fChgEl.className   = `chart-sym-chg ${fIsUp ? 'positive' : 'negative'}`;
    }
    // Update market status dot
    const fDot = document.getElementById('market-status-dot');
    if (fDot) {
      const st = freshDaily.marketState;
      const isO = st === 'REGULAR';
      const isPP = st === 'PRE' || st === 'POST' || st === 'PREPRE' || st === 'POSTPOST';
      fDot.className = 'market-status-dot ' + (isO ? 'open' : isPP ? 'pre' : 'closed');
    }
  }).catch(() => {});
}

function simulateMainChart(canvas) {
  const base = HOME_SIM_BASES[selectedChartSym.id] || 100;
  const sim  = Array.from({ length: 30 }, (_, i) => ({
    time:  Date.now() - (29 - i) * 86_400_000,
    close: base * (1 + (Math.random() - 0.49) * 0.008 * (i + 1)),
  }));
  mainChartData     = sim;
  lastMainChartData = sim;
  lastMainChartSym  = selectedChartSym;
  drawMainChart(canvas, sim, selectedChartSym);
  updateSubPanels(sim);
}


// ── Live price data (chip prices) — v8/chart (no crumb required) ──────────
async function fetchHomeData() {
  // Batch 25 symbols concurrently — v8/chart gives meta.regularMarketPrice
  // Limit concurrency to 6 at a time to avoid rate-limiting
  const BATCH = 6;
  const syms  = ALL_HOME_SYMBOLS;
  let anySuccess = false;

  for (let i = 0; i < syms.length; i += BATCH) {
    const batch = syms.slice(i, i + BATCH);
    const results = await Promise.allSettled(batch.map(sym => fetchPriceWithFallback(sym)));
    results.forEach((res, j) => {
      const sym = batch[j];
      if (res.status === 'fulfilled' && res.value) {
        const { price, change, pct, extPrice = null, extPct = null, extType = null, dayLow = null, dayHigh = null } = res.value;
        updateHomeCard(sym, price, change, pct, extPrice, extPct, extType, dayLow, dayHigh);
        lastPriceFetchTime[sym.id] = Date.now();  // track freshness
        anySuccess = true;
      }
    });
  }

  if (!anySuccess) {
    if (Object.keys(lastKnownPrices).length === 0) simulateHomeCards();
    else console.warn('[HomeData] All v8/chart fetches failed, keeping last known prices');
  }

  // Update market briefing bar (sentiment + movers)
  updateMarketBriefing();

  // Update category breadth pills (↑N ↓N) on each tab (v2.45)
  updateCatBreadthPills();

  // Refresh MOVERS tab strip when new data arrives (re-sorts by pct change)
  if (activeCatId === 'movers') buildSymbolStrip('movers');

  // Refresh narrative feed after price data is fresh
  if (typeof refreshNarrativeFeed === 'function') refreshNarrativeFeed();

  // Refresh news heatmap if open
  refreshNewsHeatmapIfOpen();

  // Check S/R annotation breaches (v2.34)
  checkSRBreaches();
  // Smart Summary Bar refresh (v2.37)
  updateSmartSummary();
}

// ══════════════════════════════════════════════
// SMART SUMMARY BAR (v2.37) — Auto-generated market narrative
// ══════════════════════════════════════════════
function updateSmartSummary() {
  const el = document.getElementById('ssb-text');
  if (!el) return;
  try {
    const spx  = lastKnownPrices['sp500'];
    const btc  = lastKnownPrices['btc'];
    const vix  = lastKnownPrices['vix'];
    const gold = lastKnownPrices['gold'];
    const oil  = lastKnownPrices['oil'];
    if (!spx) return;

    const chips = [];

    // S&P 500 chip
    if (spx.pct != null) {
      const isUp = spx.pct >= 0;
      chips.push(`<span class="ssb-chip ${isUp ? 'bull' : 'bear'}">${isUp ? '▲' : '▼'} S&P ${isUp ? '+' : ''}${spx.pct.toFixed(2)}%</span>`);
    }
    // BTC chip
    if (btc?.pct != null) {
      const isUp = btc.pct >= 0;
      chips.push(`<span class="ssb-chip ${isUp ? 'bull' : 'bear'}">${isUp ? '▲' : '▼'} BTC ${isUp ? '+' : ''}${btc.pct.toFixed(2)}%</span>`);
    }
    // VIX risk signal chip
    if (vix?.price != null) {
      const v = parseFloat(vix.price);
      if (v >= 25)       chips.push(`<span class="ssb-chip bear">⚡ VIX ${v.toFixed(1)} ELEVATED</span>`);
      else if (v <= 14)  chips.push(`<span class="ssb-chip bull">🟢 VIX ${v.toFixed(1)} LOW</span>`);
    }
    // Gold chip (only notable moves ≥0.5%)
    if (gold?.pct != null && Math.abs(gold.pct) >= 0.5) {
      const isUp = gold.pct >= 0;
      chips.push(`<span class="ssb-chip ${isUp ? 'bull' : 'bear'}">${isUp ? '▲' : '▼'} Gold ${isUp ? '+' : ''}${gold.pct.toFixed(2)}%</span>`);
    }
    // Oil chip (only notable moves ≥1%)
    if (oil?.pct != null && Math.abs(oil.pct) >= 1) {
      const isUp = oil.pct >= 0;
      chips.push(`<span class="ssb-chip ${isUp ? 'bull' : 'bear'}">${isUp ? '▲' : '▼'} Oil ${isUp ? '+' : ''}${oil.pct.toFixed(2)}%</span>`);
    }

    // Narrative text based on S&P momentum
    let narrative = 'Markets mixed';
    if (spx.pct != null) {
      if      (spx.pct >  1.5)  narrative = 'Strong rally across equities';
      else if (spx.pct >  0.3)  narrative = 'Markets edging higher';
      else if (spx.pct >  0)    narrative = 'Modest gains, cautious tone';
      else if (spx.pct > -0.3)  narrative = 'Mild pressure, drift lower';
      else if (spx.pct > -1.5)  narrative = 'Equities pulling back';
      else                       narrative = 'Broad market selloff';
    }

    el.innerHTML = chips.join('') +
      `<span style="color:var(--text-lo);margin-left:${chips.length ? 8 : 0}px">${narrative}</span>`;

    // Live dot + timestamp (v2.46)
    const liveDot    = document.getElementById('ssb-live-dot');
    const updatedEl  = document.getElementById('ssb-updated');
    if (liveDot) {
      liveDot.classList.remove('ssb-live-flash');
      void liveDot.offsetWidth;
      liveDot.classList.add('ssb-live-flash');
    }
    if (updatedEl) {
      const now = new Date();
      updatedEl.textContent = `Updated ${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}`;
    }

    // ── Market DNA bar (v2.44) — colored proportional segments per asset class ──
    const dnaEl = document.getElementById('ssb-dna-bar');
    if (dnaEl) {
      const DNA_ASSETS = [
        { id: 'sp500',  label: 'S&P 500',    group: 'Equities'   },
        { id: 'nasdaq', label: 'NASDAQ',      group: 'Equities'   },
        { id: 'btc',    label: 'BTC',         group: 'Crypto'     },
        { id: 'eth',    label: 'ETH',         group: 'Crypto'     },
        { id: 'gold',   label: 'Gold',        group: 'Commodities'},
        { id: 'oil',    label: 'Oil',         group: 'Commodities'},
        { id: 'eur',    label: 'EUR/USD',     group: 'Forex'      },
      ];
      const segs = DNA_ASSETS.map(a => {
        const d = lastKnownPrices[a.id];
        if (!d?.pct) return null;
        const mag = Math.min(Math.abs(d.pct), 4); // cap at 4% for visual
        const up  = d.pct >= 0;
        return { ...a, pct: d.pct, mag, up };
      }).filter(Boolean);

      if (segs.length) {
        const totalMag = segs.reduce((s, sg) => s + sg.mag, 0) || 1;
        dnaEl.innerHTML = segs.map(sg => {
          const w = (sg.mag / totalMag * 100).toFixed(1);
          const col = sg.up ? 'rgba(16,185,129,' : 'rgba(239,68,68,';
          const alpha = (0.4 + sg.mag * 0.1).toFixed(2);
          const sign = sg.up ? '+' : '';
          return `<div class="ssb-dna-seg" style="width:${w}%;background:${col}${alpha});"
            title="${sg.label}: ${sign}${sg.pct.toFixed(2)}%">
            <span class="ssb-dna-lbl">${sg.label}</span>
            <span class="ssb-dna-pct">${sign}${sg.pct.toFixed(2)}%</span>
          </div>`;
        }).join('');
        dnaEl.style.display = 'flex';
      } else {
        dnaEl.style.display = 'none';
      }
    }
  } catch (_) {}
}

function updateHomeCard(sym, price, change, pct, extPrice = null, extPct = null, extType = null, dayLow = null, dayHigh = null) {
  // Capture previous price BEFORE overwriting cache (for flash animation)
  const prevPrice = lastKnownPrices[sym.id]?.price;

  // Cache the latest real price + extended hours + intraday range — survives refresh failures
  lastKnownPrices[sym.id] = { price, change, pct, extPrice, extPct, extType, dayLow, dayHigh };

  const priceEl  = document.getElementById(`sprice-${sym.id}`);
  const changeEl = document.getElementById(`schange-${sym.id}`);
  if (priceEl && changeEl) {
    const isPos = change >= 0;
    const sign = isPos ? '+' : '';

    // Remove skeleton on first real data
    priceEl.classList.remove('skeleton');

    // Set price text
    const newPriceText = fmtPrice(price, sym.fmt);
    priceEl.textContent  = newPriceText;
    changeEl.textContent = `${sign}${pct.toFixed(2)}%`;
    changeEl.className   = `chip-change ${isPos ? 'positive' : 'negative'}`;

    // Flash + roll animation when price changed
    if (prevPrice !== undefined && price !== prevPrice) {
      const goingUp  = price > prevPrice;
      const flashCls = goingUp ? 'flash-up' : 'flash-down';
      const rollCls  = goingUp ? 'rolling-up' : 'rolling-down';
      if (priceEl._flashTimer) clearTimeout(priceEl._flashTimer);
      priceEl.classList.remove('flash-up', 'flash-down', 'rolling-up', 'rolling-down');
      void priceEl.offsetWidth;
      priceEl.classList.add(flashCls, rollCls);
      priceEl._flashTimer = setTimeout(() => {
        priceEl.classList.remove(flashCls, rollCls);
      }, 700);
      // Live price pulse ring on main chart for selected symbol (v2.49)
      if (sym.id === selectedChartSym?.id) triggerPriceRing();
      // Spark particles burst from chip price element (v2.50) — v2.92: only on big moves (>2%)
      if (Math.abs(pct) >= 2) sparkTick(priceEl, goingUp);
    }
  }

  // Pre/Post market extended hours row
  const extEl = document.getElementById(`cext-${sym.id}`);
  if (extEl) {
    if (extPrice != null && extType != null && extPct != null) {
      const sign   = extPct >= 0 ? '+' : '';
      const tag    = extType === 'pre' ? 'PRE' : 'POST';
      const pctCls = extPct >= 0 ? 'positive' : 'negative';
      extEl.innerHTML =
        `<span class="chip-ext-tag ${extType}">${tag}</span>` +
        `<span class="chip-ext-price">${fmtPrice(extPrice, sym.fmt)}</span>` +
        `<span class="chip-ext-pct ${pctCls}">${sign}${extPct.toFixed(2)}%</span>`;
      extEl.classList.add('visible');
    } else {
      extEl.classList.remove('visible');
      extEl.innerHTML = '';
    }
  }

  // WHY? button — show when |pct| >= 2%
  const whyBtn = document.getElementById(`cwhy-${sym.id}`);
  if (whyBtn) whyBtn.style.visibility = Math.abs(pct) >= 2.0 ? 'visible' : 'hidden';

  // Chip heat tint — background tint intensity proportional to |pct| (v2.46)
  const chipEl = document.getElementById(`chip-${sym.id}`);
  if (chipEl) {
    const absPct = Math.abs(pct);
    const alpha  = Math.min(0.09, absPct * 0.022);  // 0% → 0, 4% → 0.088
    if (absPct >= 0.25) {
      const rgb = change >= 0 ? '16,185,129' : '239,68,68';
      chipEl.style.backgroundColor = `rgba(${rgb},${alpha.toFixed(3)})`;
    } else {
      chipEl.style.backgroundColor = '';
    }
  }

  // ── Alert proximity ring — amber pulsing outline when near alert level (v2.52) + bell (v2.63) ─
  if (chipEl) {
    const wlCheck = watchlistItems.find(i => i.symbol === sym.symbol);
    let nearAlert = false;
    if (wlCheck && price > 0) {
      const levels = [wlCheck.alertAbove, wlCheck.alertBelow].filter(v => v != null && v > 0);
      nearAlert = levels.some(lvl => Math.abs((price - lvl) / lvl) <= 0.015);
    }
    if (nearAlert) {
      chipEl.classList.add('chip-alert-near');
    } else {
      chipEl.classList.remove('chip-alert-near');
    }
    const bellEl = document.getElementById(`cbell-${sym.id}`);
    if (bellEl) bellEl.style.display = nearAlert ? 'inline-block' : 'none';
  }

  // ── Chip Velocity Arrow (v2.58) — ↑↑/↑/→/↓/↓↓ from last 5 ticks ─────────
  {
    if (!_priceVelocityHistory[sym.id]) _priceVelocityHistory[sym.id] = [];
    const hist = _priceVelocityHistory[sym.id];
    hist.push(price);
    if (hist.length > 6) hist.shift();
    const velEl = document.getElementById(`cvel-${sym.id}`);
    if (velEl && hist.length >= 3) {
      const last3 = hist.slice(-3);
      const ups   = last3.filter((p, i) => i > 0 && p > last3[i - 1]).length;
      const dns   = last3.filter((p, i) => i > 0 && p < last3[i - 1]).length;
      let arrow = '', cls = '';
      if (ups >= 2 && hist.length >= 4 && hist[hist.length-1] > hist[hist.length-4]) {
        arrow = '↑↑'; cls = 'vel-up2';
      } else if (ups === 2) {
        arrow = '↑'; cls = 'vel-up1';
      } else if (dns >= 2 && hist.length >= 4 && hist[hist.length-1] < hist[hist.length-4]) {
        arrow = '↓↓'; cls = 'vel-dn2';
      } else if (dns === 2) {
        arrow = '↓'; cls = 'vel-dn1';
      }
      if (arrow) {
        velEl.textContent   = arrow;
        velEl.className     = `chip-vel ${cls}`;
        velEl.style.display = 'inline-block';
      } else {
        velEl.style.display = 'none';
      }
    }
  }

  // Heat Score badge removed (v2.86)

  // v2.66: Intraday High/Low Breach Badge
  if (chipEl && dayHigh != null && dayLow != null && dayHigh > 0 && dayLow > 0) {
    const prevData = _intradayBreach[sym.id];
    let breach = null;
    if (price >= dayHigh) breach = 'high';
    else if (price <= dayLow) breach = 'low';
    if (breach !== prevData) {
      _intradayBreach[sym.id] = breach;
      let breachBadge = chipEl.querySelector('.chip-breach-badge');
      if (!breachBadge) {
        breachBadge = document.createElement('span');
        breachBadge.className = 'chip-breach-badge';
        chipEl.appendChild(breachBadge);
      }
      if (breach === 'high') {
        breachBadge.textContent = '▲HI';
        breachBadge.className   = 'chip-breach-badge breach-hi';
      } else if (breach === 'low') {
        breachBadge.textContent = '▼LO';
        breachBadge.className   = 'chip-breach-badge breach-lo';
      } else {
        breachBadge.remove();
      }
    }
  }

  // Sync watchlist card if this symbol is also tracked — keeps both panels in lockstep
  const wlItem = watchlistItems.find(i => i.symbol === sym.symbol);
  if (wlItem) {
    updateMySpaceCard(sym.symbol, price, change, pct);
    checkPriceAlert(wlItem, price);
    wlPrevPrices[sym.symbol] = price;
  }

  // Update bottom ticker tape (v2.42)
  updateBottomTickerValue(sym.id, fmtPrice(price, sym.fmt), pct);
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
// WATCHLIST & PRICE ALERTS
// ══════════════════════════════════════════════

let watchlistItems  = [];          // [{ symbol, label, fmt, alertPrice }]
const wlPrevPrices  = {};          // { symbol: price } — for alert edge detection
const firedAlerts   = new Set();   // symbol keys that already fired this session
const snoozedAlerts = new Map();   // key → snoozeUntilTimestamp (v2.39)
let msSortMode      = 'default';   // default | pct-desc | pct-asc | pnl | alpha (v2.40)
let msFilterMode    = 'all';       // all | gainers | losers (v2.40)
let msSparkTF       = '1mo';       // current sparkline timeframe for My Space cards

// Symbol search autocomplete state
let _sugDebounce = null;
let _sugFocused  = -1;

// ── Persistence ───────────────────────────────
function loadWatchlist() {
  try {
    const s = localStorage.getItem('fh-watchlist');
    if (s) {
      const arr = JSON.parse(s);
      if (Array.isArray(arr)) {
        // Migration: old items may have alertPrice — convert & remove
        watchlistItems = arr.map(item => {
          if (item.alertPrice != null && item.alertAbove == null && item.alertBelow == null) {
            // Can't know direction — discard old single-target alert
            const { alertPrice, ...rest } = item;
            return { ...rest, alertAbove: null, alertBelow: null };
          }
          // Ensure fields exist
          if (item.alertAbove    === undefined) item.alertAbove    = null;
          if (item.alertBelow    === undefined) item.alertBelow    = null;
          if (item.condSymbol    === undefined) item.condSymbol    = null;
          if (item.condDir       === undefined) item.condDir       = 'above';
          if (item.condThreshold === undefined) item.condThreshold = null;
          if (item.costBasis     === undefined) item.costBasis     = null;
          if (item.shares        === undefined) item.shares        = null;
          if (item.tag           === undefined) item.tag           = null;
          return item;
        });
      }
    }
  } catch {}
}

function saveWatchlist() {
  localStorage.setItem('fh-watchlist', JSON.stringify(watchlistItems));
}

// ── Detect format from symbol string + price ──
function detectFmt(symbol, price) {
  const s = symbol.toUpperCase();
  if (s.startsWith('^'))      return 'int';
  if (s.endsWith('=X'))       return 'forex';
  if (s.includes('-USD') || s.includes('-EUR')) {
    return price >= 500 ? 'crypto' : 'dec';
  }
  return 'dec';
}

// ── Fetch full symbol info for watchlist ──────
async function fetchSymbolInfo(symbol) {
  const hosts = ['query2', 'query1'];
  for (const host of hosts) {
    const url = `https://${host}.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?range=5d&interval=1d&includePrePost=false`;
    try {
      const result = await window.electronAPI.fetchJson(url);
      if (!result.ok) continue;
      const json = JSON.parse(result.text);
      const meta = json?.chart?.result?.[0]?.meta;
      if (!meta || meta.regularMarketPrice == null) continue;

      const price  = meta.regularMarketPrice;
      const prev   = meta.chartPreviousClose || meta.previousClose || price;
      const change = price - prev;
      const pct    = prev ? (change / prev) * 100 : 0;
      const label  = meta.shortName || meta.longName || symbol.toUpperCase();
      const fmt    = detectFmt(symbol, price);

      return { price, change, pct, label, fmt };
    } catch (_) { /* try next */ }
  }
  return null;
}

// ══════════════════════════════════════════════
// SYMBOL SEARCH AUTOCOMPLETE
// ══════════════════════════════════════════════

// ── Local symbol database — instant, keyword-rich ──────────────────────────
const SYMBOL_DB = [
  // ── Indices ──
  { symbol: '^DJI',     name: 'Dow Jones Industrial Average', type: 'Index',  k: 'dow jones djia industrial average' },
  { symbol: '^GSPC',    name: 'S&P 500',                      type: 'Index',  k: 'sp500 s&p snp standard poor 500' },
  { symbol: '^IXIC',    name: 'NASDAQ Composite',             type: 'Index',  k: 'nasdaq composite tech' },
  { symbol: '^NDX',     name: 'NASDAQ-100',                   type: 'Index',  k: 'nasdaq 100 ndx qqq tech' },
  { symbol: '^VIX',     name: 'CBOE Volatility Index',        type: 'Index',  k: 'vix volatility fear index cboe' },
  { symbol: '^RUT',     name: 'Russell 2000',                 type: 'Index',  k: 'russell 2000 small cap rut' },
  { symbol: '^FTSE',    name: 'FTSE 100',                     type: 'Index',  k: 'ftse 100 uk london england britain' },
  { symbol: '^DAX',     name: 'DAX 40',                       type: 'Index',  k: 'dax 40 germany german frankfurt' },
  { symbol: '^FCHI',    name: 'CAC 40',                       type: 'Index',  k: 'cac 40 france paris french' },
  { symbol: '^STOXX50E',name: 'EURO STOXX 50',               type: 'Index',  k: 'euro stoxx 50 europe european' },
  { symbol: 'XU100.IS', name: 'BIST 100',                     type: 'Index',  k: 'bist borsa istanbul turkey turkish xu100' },
  { symbol: '^N225',    name: 'Nikkei 225',                   type: 'Index',  k: 'nikkei 225 japan japanese tokyo' },
  { symbol: '^HSI',     name: 'Hang Seng Index',              type: 'Index',  k: 'hang seng hsi hong kong china' },
  { symbol: '000001.SS',name: 'SSE Composite Index',          type: 'Index',  k: 'sse shanghai china composite' },
  { symbol: '^BSESN',   name: 'BSE SENSEX',                   type: 'Index',  k: 'sensex bse india mumbai' },
  { symbol: '^NSEI',    name: 'Nifty 50',                     type: 'Index',  k: 'nifty 50 india nse' },
  // ── US Stocks ──
  { symbol: 'AAPL',     name: 'Apple Inc.',                   type: 'Equity', k: 'apple iphone mac' },
  { symbol: 'MSFT',     name: 'Microsoft Corporation',        type: 'Equity', k: 'microsoft windows office azure' },
  { symbol: 'GOOGL',    name: 'Alphabet (Google)',            type: 'Equity', k: 'google alphabet youtube search' },
  { symbol: 'AMZN',     name: 'Amazon.com Inc.',              type: 'Equity', k: 'amazon aws prime shopping' },
  { symbol: 'META',     name: 'Meta Platforms',               type: 'Equity', k: 'meta facebook instagram whatsapp' },
  { symbol: 'NVDA',     name: 'NVIDIA Corporation',           type: 'Equity', k: 'nvidia gpu ai chip' },
  { symbol: 'TSLA',     name: 'Tesla Inc.',                   type: 'Equity', k: 'tesla electric car elon musk' },
  { symbol: 'BRK-B',    name: 'Berkshire Hathaway',           type: 'Equity', k: 'berkshire hathaway warren buffett' },
  { symbol: 'JPM',      name: 'JPMorgan Chase',               type: 'Equity', k: 'jpmorgan chase bank financial' },
  { symbol: 'V',        name: 'Visa Inc.',                    type: 'Equity', k: 'visa payment card' },
  { symbol: 'JNJ',      name: 'Johnson & Johnson',            type: 'Equity', k: 'johnson pharma healthcare' },
  { symbol: 'WMT',      name: 'Walmart Inc.',                 type: 'Equity', k: 'walmart retail shopping' },
  { symbol: 'XOM',      name: 'Exxon Mobil',                  type: 'Equity', k: 'exxon mobil oil energy' },
  { symbol: 'NFLX',     name: 'Netflix Inc.',                 type: 'Equity', k: 'netflix streaming video' },
  { symbol: 'DIS',      name: 'Walt Disney Co.',              type: 'Equity', k: 'disney entertainment media' },
  { symbol: 'AMD',      name: 'Advanced Micro Devices',       type: 'Equity', k: 'amd chip cpu gpu semiconductor' },
  { symbol: 'INTC',     name: 'Intel Corporation',            type: 'Equity', k: 'intel chip cpu processor' },
  { symbol: 'BABA',     name: 'Alibaba Group',                type: 'Equity', k: 'alibaba china ecommerce' },
  // ── Crypto ──
  { symbol: 'BTC-USD',  name: 'Bitcoin',                      type: 'Crypto', k: 'bitcoin btc crypto coin digital' },
  { symbol: 'ETH-USD',  name: 'Ethereum',                     type: 'Crypto', k: 'ethereum eth crypto smart contract' },
  { symbol: 'BNB-USD',  name: 'BNB (Binance)',                type: 'Crypto', k: 'bnb binance coin crypto' },
  { symbol: 'SOL-USD',  name: 'Solana',                       type: 'Crypto', k: 'solana sol crypto' },
  { symbol: 'XRP-USD',  name: 'XRP (Ripple)',                 type: 'Crypto', k: 'xrp ripple crypto' },
  { symbol: 'DOGE-USD', name: 'Dogecoin',                     type: 'Crypto', k: 'dogecoin doge meme crypto elon' },
  { symbol: 'ADA-USD',  name: 'Cardano',                      type: 'Crypto', k: 'cardano ada crypto' },
  { symbol: 'AVAX-USD', name: 'Avalanche',                    type: 'Crypto', k: 'avalanche avax crypto' },
  { symbol: 'LINK-USD', name: 'Chainlink',                    type: 'Crypto', k: 'chainlink link oracle crypto' },
  // ── Forex ──
  { symbol: 'EURUSD=X', name: 'EUR/USD',                      type: 'Forex',  k: 'euro dollar eur usd currency' },
  { symbol: 'GBPUSD=X', name: 'GBP/USD',                      type: 'Forex',  k: 'pound sterling gbp usd british currency' },
  { symbol: 'USDJPY=X', name: 'USD/JPY',                      type: 'Forex',  k: 'dollar yen usd jpy japan currency' },
  { symbol: 'USDTRY=X', name: 'USD/TRY (Dolar/TL)',           type: 'Forex',  k: 'dolar tl turk lirasi try usdtry kur' },
  { symbol: 'EURTRY=X', name: 'EUR/TRY (Euro/TL)',            type: 'Forex',  k: 'euro tl turk lirasi eurtry kur' },
  { symbol: 'GBPTRY=X', name: 'GBP/TRY (Sterlin/TL)',        type: 'Forex',  k: 'sterlin pound tl turk gbptry' },
  { symbol: 'USDCHF=X', name: 'USD/CHF',                      type: 'Forex',  k: 'dollar swiss franc chf currency' },
  { symbol: 'AUDUSD=X', name: 'AUD/USD',                      type: 'Forex',  k: 'australian dollar aud currency' },
  { symbol: 'USDCAD=X', name: 'USD/CAD',                      type: 'Forex',  k: 'dollar canadian cad currency' },
  { symbol: 'USDRUB=X', name: 'USD/RUB',                      type: 'Forex',  k: 'dollar ruble rub russia' },
  // ── Commodities (Futures) ──
  { symbol: 'GC=F',     name: 'Gold Futures',                 type: 'Future', k: 'gold altin futures commodity xau' },
  { symbol: 'SI=F',     name: 'Silver Futures',               type: 'Future', k: 'silver gumus futures commodity xag' },
  { symbol: 'CL=F',     name: 'Crude Oil (WTI)',              type: 'Future', k: 'crude oil wti petrol futures commodity' },
  { symbol: 'BZ=F',     name: 'Brent Crude Oil',              type: 'Future', k: 'brent crude oil petrol futures' },
  { symbol: 'NG=F',     name: 'Natural Gas',                  type: 'Future', k: 'natural gas dogalgaz futures energy' },
  { symbol: 'ZW=F',     name: 'Wheat Futures',                type: 'Future', k: 'wheat bugday futures commodity' },
  { symbol: 'ZC=F',     name: 'Corn Futures',                 type: 'Future', k: 'corn misir futures commodity' },
  { symbol: 'HG=F',     name: 'Copper Futures',               type: 'Future', k: 'copper bakir futures commodity' },
  { symbol: 'PL=F',     name: 'Platinum Futures',             type: 'Future', k: 'platinum platin futures commodity' },
  // ── ETFs ──
  { symbol: 'SPY',      name: 'SPDR S&P 500 ETF',             type: 'ETF',    k: 'spy sp500 etf index fund' },
  { symbol: 'QQQ',      name: 'Invesco NASDAQ-100 ETF',       type: 'ETF',    k: 'qqq nasdaq 100 etf tech fund' },
  { symbol: 'IWM',      name: 'iShares Russell 2000 ETF',     type: 'ETF',    k: 'iwm russell 2000 small cap etf' },
  { symbol: 'GLD',      name: 'SPDR Gold Shares ETF',         type: 'ETF',    k: 'gld gold altin etf fund xau' },
  { symbol: 'TLT',      name: 'iShares 20+ Year Treasury ETF',type: 'ETF',    k: 'tlt treasury bond etf long term' },
  { symbol: 'VXX',      name: 'iPath VIX Short-Term Futures', type: 'ETF',    k: 'vxx vix volatility etf' },
];

// ── Local search (instant, no API needed) ─────────────────────────────────
function searchLocalSymbols(query) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return SYMBOL_DB.filter(entry => {
    const symLo  = entry.symbol.toLowerCase();
    const nameLo = entry.name.toLowerCase();
    const kLo    = (entry.k || '').toLowerCase();
    return symLo.startsWith(q)   ||
           symLo.includes(q)     ||
           nameLo.includes(q)    ||
           kLo.includes(q);
  }).slice(0, 6);
}

// ── Yahoo Finance search API (supplementary) ──────────────────────────────
async function fetchRemoteSuggestions(query) {
  if (!query || query.trim().length < 1) return [];
  try {
    const url = `https://query1.finance.yahoo.com/v1/finance/search?q=${encodeURIComponent(query)}&quotesCount=8&newsCount=0&enableFuzzyQuery=true&enableCb=false`;
    const res = await window.electronAPI.fetchJson(url);
    if (!res.ok) return [];
    const data = JSON.parse(res.text);
    const quotes = data?.finance?.result?.[0]?.quotes || [];
    return quotes
      .filter(q => q.isYahooFinance && q.symbol)
      .map(q => ({
        symbol:   q.symbol,
        name:     q.shortname || q.longname || q.symbol,
        type:     q.typeDisp  || q.quoteType || '',
        exchange: q.exchange  || '',
      }))
      .slice(0, 8);
  } catch (_) { return []; }
}

// ── Merge local + remote (deduped) ────────────────────────────────────────
async function fetchSymbolSuggestions(query) {
  const local  = searchLocalSymbols(query);
  const remote = await fetchRemoteSuggestions(query);
  const seen   = new Set(local.map(r => r.symbol));
  const merged = [...local];
  for (const r of remote) {
    if (!seen.has(r.symbol)) { seen.add(r.symbol); merged.push(r); }
    if (merged.length >= 10) break;
  }
  return merged;
}

// ── CSS class for type badge ──────────────────
function getSugTypeClass(type) {
  const t = (type || '').toLowerCase();
  if (t.includes('crypto'))                            return 't-crypto';
  if (t.includes('etf'))                               return 't-etf';
  if (t.includes('index') || t === 'indice')           return 't-index';
  if (t.includes('currency') || t.includes('forex'))   return 't-forex';
  if (t.includes('future') || t.includes('commodity')) return 't-future';
  if (t.includes('equity') || t.includes('stock'))     return 't-equity';
  return 't-other';
}

// ── Render suggestion items into dropdown ─────────────────────────────────
function renderSuggestions(sugBox, results) {
  sugBox.innerHTML = results.map(r => `
    <div class="ms-sug-item" data-symbol="${r.symbol}">
      <span class="ms-sug-sym">${r.symbol}</span>
      <span class="ms-sug-name">${r.name}</span>
      <span class="ms-sug-type ${getSugTypeClass(r.type)}">${r.type || 'Symbol'}</span>
    </div>`).join('');
  sugBox.querySelectorAll('.ms-sug-item').forEach(item => {
    item.addEventListener('mousedown', (e) => {
      e.preventDefault();
      const sym = item.dataset.symbol;
      const addInput = document.getElementById('ms-add-input');
      if (addInput) addInput.value = sym;
      hideSuggestions();
      addWatchlistItem(sym);
    });
  });
}

// ── Show suggestions dropdown ─────────────────
async function showSuggestions(query) {
  const sugBox = document.getElementById('ms-suggestions');
  if (!sugBox) return;
  _sugFocused = -1;

  // 1. Show local results INSTANTLY (no network needed)
  const localResults = searchLocalSymbols(query);
  if (localResults.length > 0) {
    renderSuggestions(sugBox, localResults);
    sugBox.classList.add('show');
  } else {
    sugBox.innerHTML = `<div class="ms-sug-loading">Searching…</div>`;
    sugBox.classList.add('show');
  }

  // 2. Fetch remote + merge, then update the dropdown
  const remote = await fetchRemoteSuggestions(query);
  const seen   = new Set(localResults.map(r => r.symbol));
  const merged = [...localResults];
  for (const r of remote) {
    if (!seen.has(r.symbol)) { seen.add(r.symbol); merged.push(r); }
    if (merged.length >= 10) break;
  }

  if (merged.length === 0) {
    sugBox.classList.remove('show');
    return;
  }
  renderSuggestions(sugBox, merged);
  sugBox.classList.add('show');
}

// ── Hide / clear suggestions ──────────────────
function hideSuggestions() {
  _sugFocused = -1;
  const sugBox = document.getElementById('ms-suggestions');
  if (sugBox) { sugBox.classList.remove('show'); sugBox.innerHTML = ''; }
}

// ── Render watchlist → delegates to My Space panel ───────────────────────
function renderWatchlist() {
  renderMySpaceCards();
}

// ══════════════════════════════════════════════
// MY SPACE PANEL — Full-screen Watchlist & Alerts
// ══════════════════════════════════════════════

// ── Sector Heatmap ────────────────────────────
const SECTORS = [
  { symbol: 'XLK',  name: 'Technology',           large: true  },
  { symbol: 'XLF',  name: 'Financials',            large: false },
  { symbol: 'XLV',  name: 'Health Care',           large: false },
  { symbol: 'XLC',  name: 'Comm. Services',        large: false },
  { symbol: 'XLY',  name: 'Cons. Discretionary',   large: false },
  { symbol: 'XLI',  name: 'Industrials',           large: false },
  { symbol: 'XLP',  name: 'Cons. Staples',         large: false },
  { symbol: 'XLE',  name: 'Energy',                large: false },
  { symbol: 'XLB',  name: 'Materials',             large: false },
  { symbol: 'XLU',  name: 'Utilities',             large: false },
  { symbol: 'XLRE', name: 'Real Estate',           large: false },
];

// Top S&P 500 holdings per sector  (w = approx. weight / size hint)
const SECTOR_COMPANIES = {
  XLK:  [
    { symbol: 'AAPL',  name: 'Apple',           w: 3 },
    { symbol: 'MSFT',  name: 'Microsoft',        w: 3 },
    { symbol: 'NVDA',  name: 'NVIDIA',           w: 2 },
    { symbol: 'AVGO',  name: 'Broadcom',         w: 1 },
    { symbol: 'ORCL',  name: 'Oracle',           w: 1 },
    { symbol: 'AMD',   name: 'AMD',              w: 1 },
    { symbol: 'CRM',   name: 'Salesforce',       w: 1 },
    { symbol: 'ADBE',  name: 'Adobe',            w: 1 },
    { symbol: 'QCOM',  name: 'Qualcomm',         w: 1 },
    { symbol: 'TXN',   name: 'Texas Instr.',     w: 1 },
    { symbol: 'CSCO',  name: 'Cisco',            w: 1 },
    { symbol: 'NOW',   name: 'ServiceNow',       w: 1 },
    { symbol: 'AMAT',  name: 'Appl. Materials',  w: 1 },
    { symbol: 'MU',    name: 'Micron',           w: 1 },
    { symbol: 'INTC',  name: 'Intel',            w: 1 },
  ],
  XLF:  [
    { symbol: 'BRK-B', name: 'Berkshire B',      w: 3 },
    { symbol: 'JPM',   name: 'JPMorgan',         w: 3 },
    { symbol: 'V',     name: 'Visa',             w: 2 },
    { symbol: 'MA',    name: 'Mastercard',       w: 2 },
    { symbol: 'BAC',   name: 'Bank of America',  w: 1 },
    { symbol: 'WFC',   name: 'Wells Fargo',      w: 1 },
    { symbol: 'GS',    name: 'Goldman Sachs',    w: 1 },
    { symbol: 'MS',    name: 'Morgan Stanley',   w: 1 },
    { symbol: 'AXP',   name: 'Amex',             w: 1 },
    { symbol: 'BLK',   name: 'BlackRock',        w: 1 },
    { symbol: 'SPGI',  name: 'S&P Global',       w: 1 },
    { symbol: 'SCHW',  name: 'Schwab',           w: 1 },
  ],
  XLV:  [
    { symbol: 'UNH',   name: 'UnitedHealth',     w: 3 },
    { symbol: 'LLY',   name: 'Eli Lilly',        w: 3 },
    { symbol: 'JNJ',   name: 'J&J',              w: 2 },
    { symbol: 'ABBV',  name: 'AbbVie',           w: 2 },
    { symbol: 'MRK',   name: 'Merck',            w: 1 },
    { symbol: 'TMO',   name: 'Thermo Fisher',    w: 1 },
    { symbol: 'ABT',   name: 'Abbott',           w: 1 },
    { symbol: 'DHR',   name: 'Danaher',          w: 1 },
    { symbol: 'AMGN',  name: 'Amgen',            w: 1 },
    { symbol: 'PFE',   name: 'Pfizer',           w: 1 },
    { symbol: 'ISRG',  name: 'Intuitive Surg.',  w: 1 },
    { symbol: 'BMY',   name: 'Bristol Myers',    w: 1 },
  ],
  XLC:  [
    { symbol: 'META',  name: 'Meta',             w: 3 },
    { symbol: 'GOOGL', name: 'Alphabet',         w: 3 },
    { symbol: 'NFLX',  name: 'Netflix',          w: 2 },
    { symbol: 'DIS',   name: 'Disney',           w: 1 },
    { symbol: 'CMCSA', name: 'Comcast',          w: 1 },
    { symbol: 'TMUS',  name: 'T-Mobile',         w: 1 },
    { symbol: 'T',     name: 'AT&T',             w: 1 },
    { symbol: 'VZ',    name: 'Verizon',          w: 1 },
    { symbol: 'CHTR',  name: 'Charter',          w: 1 },
  ],
  XLY:  [
    { symbol: 'AMZN',  name: 'Amazon',           w: 3 },
    { symbol: 'TSLA',  name: 'Tesla',            w: 3 },
    { symbol: 'HD',    name: 'Home Depot',       w: 2 },
    { symbol: 'MCD',   name: "McDonald's",       w: 1 },
    { symbol: 'BKNG',  name: 'Booking',          w: 1 },
    { symbol: 'NKE',   name: 'Nike',             w: 1 },
    { symbol: 'LOW',   name: "Lowe's",           w: 1 },
    { symbol: 'SBUX',  name: 'Starbucks',        w: 1 },
    { symbol: 'TJX',   name: 'TJX',              w: 1 },
    { symbol: 'MAR',   name: 'Marriott',         w: 1 },
    { symbol: 'GM',    name: 'General Motors',   w: 1 },
  ],
  XLI:  [
    { symbol: 'GE',    name: 'GE Aerospace',     w: 2 },
    { symbol: 'RTX',   name: 'RTX',              w: 2 },
    { symbol: 'CAT',   name: 'Caterpillar',      w: 2 },
    { symbol: 'HON',   name: 'Honeywell',        w: 1 },
    { symbol: 'LMT',   name: 'Lockheed',         w: 1 },
    { symbol: 'DE',    name: 'Deere',            w: 1 },
    { symbol: 'ETN',   name: 'Eaton',            w: 1 },
    { symbol: 'UPS',   name: 'UPS',              w: 1 },
    { symbol: 'BA',    name: 'Boeing',           w: 1 },
    { symbol: 'FDX',   name: 'FedEx',            w: 1 },
    { symbol: 'NOC',   name: 'Northrop',         w: 1 },
    { symbol: 'EMR',   name: 'Emerson',          w: 1 },
  ],
  XLP:  [
    { symbol: 'WMT',   name: 'Walmart',          w: 3 },
    { symbol: 'PG',    name: 'P&G',              w: 2 },
    { symbol: 'COST',  name: 'Costco',           w: 2 },
    { symbol: 'KO',    name: 'Coca-Cola',        w: 2 },
    { symbol: 'PEP',   name: 'PepsiCo',          w: 2 },
    { symbol: 'PM',    name: 'Philip Morris',    w: 1 },
    { symbol: 'MO',    name: 'Altria',           w: 1 },
    { symbol: 'CL',    name: 'Colgate',          w: 1 },
    { symbol: 'MDLZ',  name: 'Mondelez',         w: 1 },
  ],
  XLE:  [
    { symbol: 'XOM',   name: 'ExxonMobil',       w: 3 },
    { symbol: 'CVX',   name: 'Chevron',          w: 2 },
    { symbol: 'COP',   name: 'ConocoPhillips',   w: 1 },
    { symbol: 'SLB',   name: 'SLB',              w: 1 },
    { symbol: 'EOG',   name: 'EOG Resources',    w: 1 },
    { symbol: 'MPC',   name: 'Marathon Pet.',    w: 1 },
    { symbol: 'PSX',   name: 'Phillips 66',      w: 1 },
    { symbol: 'VLO',   name: 'Valero',           w: 1 },
    { symbol: 'OXY',   name: 'Occidental',       w: 1 },
  ],
  XLB:  [
    { symbol: 'LIN',   name: 'Linde',            w: 2 },
    { symbol: 'SHW',   name: 'Sherwin-Williams', w: 2 },
    { symbol: 'APD',   name: 'Air Products',     w: 1 },
    { symbol: 'ECL',   name: 'Ecolab',           w: 1 },
    { symbol: 'FCX',   name: 'Freeport',         w: 1 },
    { symbol: 'DOW',   name: 'Dow',              w: 1 },
    { symbol: 'NEM',   name: 'Newmont',          w: 1 },
    { symbol: 'DD',    name: 'DuPont',           w: 1 },
    { symbol: 'PPG',   name: 'PPG Industries',   w: 1 },
  ],
  XLU:  [
    { symbol: 'NEE',   name: 'NextEra Energy',   w: 2 },
    { symbol: 'SO',    name: 'Southern Co.',     w: 1 },
    { symbol: 'DUK',   name: 'Duke Energy',      w: 1 },
    { symbol: 'D',     name: 'Dominion',         w: 1 },
    { symbol: 'AEP',   name: 'AEP',              w: 1 },
    { symbol: 'EXC',   name: 'Exelon',           w: 1 },
    { symbol: 'SRE',   name: 'Sempra',           w: 1 },
    { symbol: 'XEL',   name: 'Xcel Energy',      w: 1 },
    { symbol: 'ED',    name: 'Con Edison',       w: 1 },
  ],
  XLRE: [
    { symbol: 'PLD',   name: 'Prologis',         w: 2 },
    { symbol: 'AMT',   name: 'American Tower',   w: 2 },
    { symbol: 'EQIX',  name: 'Equinix',          w: 2 },
    { symbol: 'SPG',   name: 'Simon Property',   w: 1 },
    { symbol: 'CCI',   name: 'Crown Castle',     w: 1 },
    { symbol: 'WELL',  name: 'Welltower',        w: 1 },
    { symbol: 'PSA',   name: 'Public Storage',   w: 1 },
    { symbol: 'O',     name: 'Realty Income',    w: 1 },
    { symbol: 'DLR',   name: 'Digital Realty',   w: 1 },
  ],
};

function sectorTileColor(pct) {
  if (pct >=  3)   return { bg: '#14532d', txt: '#86efac' };
  if (pct >=  1.5) return { bg: '#166534', txt: '#bbf7d0' };
  if (pct >=  0.3) return { bg: '#15803d', txt: '#dcfce7' };
  if (pct > -0.3)  return { bg: '#27272a', txt: '#a1a1aa' };
  if (pct > -1.5)  return { bg: '#7f1d1d', txt: '#fecaca' };
  if (pct > -3)    return { bg: '#991b1b', txt: '#fee2e2' };
                   return { bg: '#450a0a', txt: '#fca5a5' };
}

// ── Heatmap color lerp helpers (v2.48) ──────────────────────────────────
const _hmPrevBg = {}; // sym → current displayed hex bg

function _hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
}
function _rgbToHex(r, g, b) {
  return '#' + [r, g, b].map(v => Math.round(v).toString(16).padStart(2, '0')).join('');
}
function _lerpHex(hex1, hex2, t) {
  try {
    const [r1, g1, b1] = _hexToRgb(hex1);
    const [r2, g2, b2] = _hexToRgb(hex2);
    return _rgbToHex(r1 + (r2 - r1) * t, g1 + (g2 - g1) * t, b1 + (b2 - b1) * t);
  } catch (_) { return hex2; }
}

function _animateHmTile(tileEl, fromBg, toBg, toTxt, duration = 400) {
  if (_hmPrevBg[tileEl.id] === toBg) return; // no change
  const startTs = performance.now();
  function tick(now) {
    const t = Math.min(1, (now - startTs) / duration);
    const ease = 1 - Math.pow(1 - t, 2); // ease-out quad
    tileEl.style.background = _lerpHex(fromBg, toBg, ease);
    if (t < 1) requestAnimationFrame(tick);
    else {
      tileEl.style.background = toBg;
      tileEl.style.color = toTxt;
      _hmPrevBg[tileEl.id] = toBg;
    }
  }
  tileEl.style.color = toTxt;
  requestAnimationFrame(tick);
}

let heatmapRefreshTimer = null;
let hmCurrentView = 'sectors'; // 'sectors' | 'companies'

function buildHeatmapPanel() {
  if (!heatmapPanel) return;
  heatmapPanel.innerHTML = `
    <div class="hm-wrap">

      <!-- ── Level 1: Sector overview ── -->
      <div class="hm-view" id="hm-sectors-view">
        <div class="hm-header">
          <div class="hm-title-row">
            <span class="hm-title">Sector Heatmap</span>
            <span class="hm-sub">S&amp;P 500 Sector ETFs · Click a sector to see top holdings</span>
          </div>
          <div class="hm-legend">
            <span class="hm-leg-item" style="background:#7f1d1d;color:#fecaca">−3%+</span>
            <span class="hm-leg-item" style="background:#27272a;color:#a1a1aa">0%</span>
            <span class="hm-leg-item" style="background:#14532d;color:#86efac">+3%+</span>
          </div>
        </div>
        <div class="hm-grid" id="hm-sector-grid">
          ${SECTORS.map(s => `
            <div class="hm-tile ${s.large ? 'hm-tile-lg' : ''} hm-sector-clickable"
                 id="hm-${s.symbol}" data-symbol="${s.symbol}" title="Click to view ${s.name} holdings">
              <span class="hm-sector-name">${s.name}</span>
              <span class="hm-ticker">${s.symbol}</span>
              <span class="hm-pct" id="hm-pct-${s.symbol}">—</span>
              <span class="hm-price" id="hm-price-${s.symbol}"></span>
              <span class="hm-drill-hint">→ holdings</span>
            </div>`).join('')}
        </div>
      </div>

      <!-- ── Level 2: Company drill-down ── -->
      <div class="hm-view" id="hm-companies-view" style="display:none">
        <div class="hm-header">
          <button class="hm-back-btn" id="hm-back-btn">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M10 3L5 8l5 5"/></svg>
            All Sectors
          </button>
          <div class="hm-breadcrumb">
            <span class="hm-breadcrumb-name" id="hm-breadcrumb-name">Technology</span>
            <span class="hm-breadcrumb-etf" id="hm-breadcrumb-etf">XLK</span>
            <span class="hm-breadcrumb-pct" id="hm-breadcrumb-pct"></span>
          </div>
          <div class="hm-legend">
            <span class="hm-leg-item" style="background:#7f1d1d;color:#fecaca">−3%+</span>
            <span class="hm-leg-item" style="background:#27272a;color:#a1a1aa">0%</span>
            <span class="hm-leg-item" style="background:#14532d;color:#86efac">+3%+</span>
          </div>
        </div>
        <div class="hm-companies-grid" id="hm-companies-grid"></div>
      </div>

    </div>
  `;

  // Back button
  document.getElementById('hm-back-btn').addEventListener('click', showSectorsView);

  // Sector tile click → drill down
  document.getElementById('hm-sector-grid').addEventListener('click', e => {
    const tile = e.target.closest('.hm-sector-clickable');
    if (tile) showSectorDrill(tile.dataset.symbol);
  });

  // Company tile click → navigate to Overview chart
  document.getElementById('hm-companies-grid').addEventListener('click', e => {
    const tile = e.target.closest('.hm-co-tile');
    if (!tile) return;
    const rawSym = tile.dataset.symbol;
    const known = ALL_HOME_SYMBOLS.find(s => s.symbol === rawSym);
    switchSite('overview');
    if (known) {
      selectMainChartSym(known);
    } else {
      const tmp = { id: rawSym.toLowerCase(), symbol: rawSym, label: rawSym, fmt: 2 };
      selectedChartSym = tmp;
      const nameEl = document.getElementById('main-name');
      if (nameEl) nameEl.textContent = rawSym;
      currentNewsFilter = tmp;
      renderNewsPanel();
      loadMainChart();
      loadFundamentalsBar(tmp);
      loadExtraInfoBar(tmp);
    }
  });
}

function showSectorsView() {
  hmCurrentView = 'sectors';
  document.getElementById('hm-sectors-view').style.display  = '';
  document.getElementById('hm-companies-view').style.display = 'none';
}

async function showSectorDrill(sectorSym) {
  hmCurrentView = 'companies';
  const sector    = SECTORS.find(s => s.symbol === sectorSym);
  const companies = SECTOR_COMPANIES[sectorSym] || [];

  // Switch view
  document.getElementById('hm-sectors-view').style.display  = 'none';
  document.getElementById('hm-companies-view').style.display = '';

  // Breadcrumb
  document.getElementById('hm-breadcrumb-name').textContent = sector?.name || sectorSym;
  document.getElementById('hm-breadcrumb-etf').textContent  = sectorSym;
  const sectorPctEl = document.getElementById(`hm-pct-${sectorSym}`);
  const bcPct = document.getElementById('hm-breadcrumb-pct');
  if (sectorPctEl) bcPct.textContent = sectorPctEl.textContent;

  // Build company tiles (loading state) — clickable → navigates to chart
  const grid = document.getElementById('hm-companies-grid');
  grid.innerHTML = companies.map(c => `
    <div class="hm-co-tile hm-co-w${Math.min(c.w, 3)}" id="hmco-${c.symbol}" data-symbol="${c.symbol}" title="Click to open chart for ${c.name}">
      <div class="hm-co-top">
        <span class="hm-co-name">${c.name}</span>
        <span class="hm-co-ticker">${c.symbol}</span>
      </div>
      <canvas class="hm-co-spark" id="hmco-spark-${c.symbol}" width="58" height="20"></canvas>
      <div class="hm-co-bottom">
        <span class="hm-co-pct" id="hmco-pct-${c.symbol}">…</span>
        <span class="hm-co-price" id="hmco-price-${c.symbol}"></span>
      </div>
    </div>`).join('');

  // Fetch prices in batches of 6
  const BATCH = 6;
  for (let i = 0; i < companies.length; i += BATCH) {
    const batch = companies.slice(i, i + BATCH);
    const results = await Promise.allSettled(
      batch.map(c => fetchPriceV8({ symbol: c.symbol, fmt: 2 }))
    );
    results.forEach((res, j) => {
      const sym = batch[j].symbol;
      const tile    = document.getElementById(`hmco-${sym}`);
      const pctEl   = document.getElementById(`hmco-pct-${sym}`);
      const priceEl = document.getElementById(`hmco-price-${sym}`);
      if (!tile || !pctEl) return;
      if (res.status !== 'fulfilled' || !res.value) {
        pctEl.textContent = '—'; return;
      }
      const { price, pct } = res.value;
      const col = sectorTileColor(pct);
      tile.style.background = col.bg;
      tile.style.color      = col.txt;
      pctEl.textContent     = (pct >= 0 ? '+' : '') + pct.toFixed(2) + '%';
      if (priceEl) priceEl.textContent = '$' + price.toFixed(2);
    });
  }

  // Async sparklines — fire-and-forget, draw as data arrives
  companies.forEach(c => {
    fetchChartData(c.symbol, '5d', '30m').then(data => {
      const canvas = document.getElementById(`hmco-spark-${c.symbol}`);
      if (!canvas || !data || data.length < 2) return;
      const isUp = data[data.length - 1].close >= data[0].close;
      drawSparkline(canvas, data, isUp);
    }).catch(() => {});
  });
}

async function loadHeatmapData() {
  const results = await Promise.allSettled(
    SECTORS.map(s => fetchPriceV8({ symbol: s.symbol, fmt: 2 }))
  );
  results.forEach((res, i) => {
    if (res.status !== 'fulfilled' || !res.value) return;
    const sym   = SECTORS[i].symbol;
    const { price, pct } = res.value;
    const tile    = document.getElementById(`hm-${sym}`);
    const pctEl   = document.getElementById(`hm-pct-${sym}`);
    const priceEl = document.getElementById(`hm-price-${sym}`);
    if (!tile || !pctEl) return;
    const col  = sectorTileColor(pct);
    const prev = _hmPrevBg[tile.id] || '#27272a';
    _animateHmTile(tile, prev, col.bg, col.txt, 450); // smooth color lerp (v2.48)
    pctEl.textContent     = (pct >= 0 ? '+' : '') + pct.toFixed(2) + '%';
    if (priceEl) priceEl.textContent = '$' + price.toFixed(2);
    // Also update breadcrumb if currently in that sector's drill view
    const bcPct = document.getElementById('hm-breadcrumb-pct');
    if (bcPct && document.getElementById('hm-breadcrumb-etf')?.textContent === sym) {
      bcPct.textContent = pctEl.textContent;
    }
  });
}

function startHeatmapRefresh() {
  showSectorsView();
  loadHeatmapData();
  clearInterval(heatmapRefreshTimer);
  heatmapRefreshTimer = setInterval(loadHeatmapData, 30_000);
}

function stopHeatmapRefresh() {
  clearInterval(heatmapRefreshTimer);
  heatmapRefreshTimer = null;
}

// ── Build My Space panel structure (called once on init) ─────────────────
function buildMySpacePanel() {
  if (!myspacePanel) return;

  myspacePanel.innerHTML = `
    <div class="ms-topbar">
      <div class="ms-topbar-left">
        <div class="ms-topbar-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
               stroke-linecap="round" stroke-linejoin="round">
            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
          </svg>
        </div>
        <span class="ms-topbar-title">My Space</span>
        <span class="ms-topbar-count" id="ms-count">0 symbols</span>
        <span class="ms-last-updated" id="ms-last-updated"></span>
      </div>
      <div class="ms-topbar-right">
        <div class="ms-spark-tf" id="ms-spark-tf">
          <button class="ms-tf-btn" data-tf="5d">1W</button>
          <button class="ms-tf-btn active" data-tf="1mo">1M</button>
          <button class="ms-tf-btn" data-tf="3mo">3M</button>
        </div>
        <div class="ms-input-wrap">
          <input type="text" class="ms-add-input" id="ms-add-input"
            placeholder="Search — Apple, Bitcoin, EUR/USD …"
            spellcheck="false" autocomplete="off">
          <div class="ms-suggestions" id="ms-suggestions"></div>
        </div>
        <button class="ms-add-btn" id="btn-ms-add">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round">
            <line x1="8" y1="3" x2="8" y2="13"/><line x1="3" y1="8" x2="13" y2="8"/>
          </svg>
          Add
        </button>
      </div>
    </div>
    <div class="ms-grid-area">
      <div class="wl-tag-tabs" id="wl-tag-tabs">
        <button class="wl-tag-tab active" data-tag="all">All</button>
      </div>
      <!-- SORT & FILTER BAR (v2.40) -->
      <div class="ms-sort-bar" id="ms-sort-bar">
        <button class="ms-sort-btn active" data-sort="default" title="Original order">Default</button>
        <button class="ms-sort-btn" data-sort="pct-desc" title="Sort by % change (high to low)">▲ %</button>
        <button class="ms-sort-btn" data-sort="pct-asc" title="Sort by % change (low to high)">▼ %</button>
        <button class="ms-sort-btn" data-sort="pnl" title="Sort by P&amp;L (best first)">P&amp;L</button>
        <button class="ms-sort-btn" data-sort="alpha" title="Sort alphabetically">A–Z</button>
        <div class="ms-sort-sep"></div>
        <button class="ms-filter-btn active" data-filter="all">All</button>
        <button class="ms-filter-btn" data-filter="gainers">▲ Up</button>
        <button class="ms-filter-btn" data-filter="losers">▼ Down</button>
        <button class="ms-filter-btn" data-filter="profit" title="Show positions in profit">💚 Profit</button>
        <button class="ms-filter-btn" data-filter="loss" title="Show positions in loss">❤️ Loss</button>
      </div>
      <!-- v2.73 Today Snapshot banner -->
      <div class="ms-today-snapshot" id="ms-today-snapshot" style="display:none"></div>
      <div class="ms-daily-stats" id="ms-daily-stats" style="display:none"></div>
      <div class="ms-insights" id="ms-insights" style="display:none"></div>
      <div class="ms-portfolio-summary" id="ms-portfolio-summary" style="display:none"></div>
      <div class="ms-attribution" id="ms-attribution" style="display:none">
        <div class="ms-attr-header">Portfolio Attribution · P&amp;L by Asset Type</div>
        <canvas id="ms-attr-canvas" height="72"></canvas>
      </div>
      <!-- Alert Digest Banner (v2.44) — shown when alerts fired this session -->
      <div class="ms-alert-digest" id="ms-alert-digest" style="display:none">
        <span class="mad-icon">🔔</span>
        <span class="mad-label">Session:</span>
        <div class="mad-chips" id="mad-chips"></div>
        <span class="mad-count" id="mad-count"></span>
      </div>
      <div class="ms-cards-grid" id="ms-cards-grid"></div>
      <details class="ms-alert-history" id="ms-alert-history">
        <summary class="ah-summary">🔔 No alerts fired yet</summary>
        <div class="ah-list"><div class="ah-empty">No alerts this session</div></div>
      </details>
    </div>

  `;

  // ── Sparkline timeframe toggle ────────────────────────────────────────
  document.getElementById('ms-spark-tf')?.querySelectorAll('.ms-tf-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      msSparkTF = btn.dataset.tf;
      document.querySelectorAll('.ms-tf-btn').forEach(b => b.classList.toggle('active', b === btn));
      // Redraw all sparklines with new timeframe
      watchlistItems.forEach(item => loadMySpaceSparkline(item.symbol));
    });
  });

  // ── Alert sound theme selector ────────────────────────────────────────
  const soundSel = document.getElementById('ms-sound-sel');
  if (soundSel) {
    soundSel.value = localStorage.getItem('fh-alert-sound') || 'default';
    soundSel.addEventListener('change', () => {
      localStorage.setItem('fh-alert-sound', soundSel.value);
      playAlertSound(); // preview the sound
    });
  }

  // ── ntfy.sh push topic input (v2.37) ─────────────────────────────────
  const ntfyInp = document.getElementById('ms-ntfy-input');
  if (ntfyInp) {
    ntfyInp.value = localStorage.getItem('fh-ntfy-topic') || '';
    ntfyInp.addEventListener('input', () => {
      const val = ntfyInp.value.trim();
      if (val) localStorage.setItem('fh-ntfy-topic', val);
      else     localStorage.removeItem('fh-ntfy-topic');
    });
  }

  // ── v2.74: Heatmap view toggle ────────────────────────────────────────
  let _msHeatmapView = false;
  document.getElementById('ms-view-btn')?.addEventListener('click', (e) => {
    _msHeatmapView = !_msHeatmapView;
    const grid = document.getElementById('ms-cards-grid');
    const btn  = e.currentTarget;
    if (grid) grid.classList.toggle('ms-heatmap-view', _msHeatmapView);
    btn.classList.toggle('active', _msHeatmapView);
    btn.textContent = _msHeatmapView ? '⬛ Cards' : '⬛ Heatmap';
  });

  // ── Export watchlist as JSON ──────────────────────────────────────────
  document.getElementById('ms-export-btn')?.addEventListener('click', () => {
    const json = JSON.stringify(watchlistItems, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href = url; a.download = `fh-watchlist-${new Date().toISOString().slice(0,10)}.json`;
    a.click(); URL.revokeObjectURL(url);
  });

  // ── Import watchlist from JSON ────────────────────────────────────────
  document.getElementById('ms-import-btn')?.addEventListener('click', () => {
    const inp = document.createElement('input');
    inp.type = 'file'; inp.accept = '.json,application/json';
    inp.onchange = e => {
      const f = e.target.files?.[0]; if (!f) return;
      const reader = new FileReader();
      reader.onload = ev => {
        try {
          const items = JSON.parse(ev.target.result);
          if (!Array.isArray(items)) return;
          let added = 0;
          items.forEach(item => {
            if (!item.symbol || watchlistItems.some(i => i.symbol === item.symbol)) return;
            watchlistItems.push({
              symbol: item.symbol, label: item.label || item.symbol,
              fmt: item.fmt || 'dec', alertAbove: null, alertBelow: null,
              condSymbol: null, condDir: 'above', condThreshold: null,
              costBasis: item.costBasis || null, shares: item.shares || null, tag: item.tag || null,
            });
            added++;
          });
          if (added > 0) { saveWatchlist(); renderWatchlist(); }
        } catch (_) {}
      };
      reader.readAsText(f);
    };
    inp.click();
  });

  // ── Bind search input with autocomplete ────────────────────────────────
  const addInput = document.getElementById('ms-add-input');
  const addBtn   = document.getElementById('btn-ms-add');

  if (addInput) {
    // Debounced suggestions on typing
    addInput.addEventListener('input', () => {
      clearTimeout(_sugDebounce);
      const q = addInput.value.trim();
      if (!q) { hideSuggestions(); return; }
      _sugDebounce = setTimeout(() => showSuggestions(q), 280);
    });

    // Keyboard navigation: ↑↓ to select, Enter to add, Escape to close
    addInput.addEventListener('keydown', (e) => {
      const sugBox = document.getElementById('ms-suggestions');
      const items  = sugBox ? Array.from(sugBox.querySelectorAll('.ms-sug-item')) : [];

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        _sugFocused = Math.min(_sugFocused + 1, items.length - 1);
        items.forEach((el, i) => el.classList.toggle('focused', i === _sugFocused));
        if (_sugFocused >= 0 && items[_sugFocused]) {
          addInput.value = items[_sugFocused].dataset.symbol;
        }
        return;
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        _sugFocused = Math.max(_sugFocused - 1, 0);
        items.forEach((el, i) => el.classList.toggle('focused', i === _sugFocused));
        if (_sugFocused >= 0 && items[_sugFocused]) {
          addInput.value = items[_sugFocused].dataset.symbol;
        }
        return;
      }
      if (e.key === 'Enter') {
        hideSuggestions();
        addWatchlistItem(addInput.value);
        return;
      }
      if (e.key === 'Escape') {
        hideSuggestions();
        return;
      }
    });

    // Close suggestions when focus leaves the input
    addInput.addEventListener('blur', () => {
      // Small delay so mousedown on suggestion fires first
      setTimeout(hideSuggestions, 200);
    });
  }

  if (addBtn) {
    addBtn.addEventListener('click', () => {
      const val = addInput?.value?.trim() || '';
      if (!val) {
        // No symbol typed — focus the input so user knows where to type
        if (addInput) { addInput.focus(); addInput.style.borderColor = 'var(--purple)'; setTimeout(() => { addInput.style.borderColor = ''; }, 1200); }
        return;
      }
      hideSuggestions();
      addWatchlistItem(val);
    });
  }

  // Initial render
  renderMySpaceCards();
  renderAlertHistory();
}

// ── Watchlist tag constants ────────────────────
const WL_TAGS = ['📈 Longs', '📉 Shorts', '⭐ Core', '🔍 Watch', '⚡ Hot'];

// ── Render all watchlist cards in My Space grid ──────────────────────────
function renderMySpaceCards() {
  const grid = document.getElementById('ms-cards-grid');
  if (!grid) return;

  // ── Rebuild tag filter tabs ───────────────────────────────────────────
  const tagTabsEl = document.getElementById('wl-tag-tabs');
  if (tagTabsEl) {
    const usedTags = [...new Set(watchlistItems.map(i => i.tag).filter(Boolean))];
    tagTabsEl.innerHTML =
      `<button class="wl-tag-tab${activeWlTag === 'all' ? ' active' : ''}" data-tag="all">All</button>` +
      usedTags.map(t =>
        `<button class="wl-tag-tab${activeWlTag === t ? ' active' : ''}" data-tag="${t}">${t}</button>`
      ).join('') +
      `<button class="wl-tag-tab wl-tag-add" id="wl-tag-add-btn" title="Add tags via card dropdowns">＋ Tag</button>`;
    tagTabsEl.querySelectorAll('.wl-tag-tab:not(.wl-tag-add)').forEach(btn => {
      btn.addEventListener('click', () => {
        activeWlTag = btn.dataset.tag;
        renderMySpaceCards();
      });
    });
  }

  // Sort & Filter bar delegation (v2.40)
  const sortBarEl = document.getElementById('ms-sort-bar');
  if (sortBarEl && !sortBarEl._sortDelegated) {
    sortBarEl._sortDelegated = true;
    sortBarEl.addEventListener('click', e => {
      const sortBtn = e.target.closest('.ms-sort-btn');
      if (sortBtn) {
        msSortMode = sortBtn.dataset.sort;
        sortBarEl.querySelectorAll('.ms-sort-btn').forEach(b => b.classList.toggle('active', b === sortBtn));
        renderMySpaceCards();
        return;
      }
      const filterBtn = e.target.closest('.ms-filter-btn');
      if (filterBtn) {
        msFilterMode = filterBtn.dataset.filter;
        sortBarEl.querySelectorAll('.ms-filter-btn').forEach(b => b.classList.toggle('active', b === filterBtn));
        renderMySpaceCards();
      }
    });
  }

  // Update count badge (topbar + sidebar sub-text)
  const countEl = document.getElementById('ms-count');
  if (countEl) countEl.textContent = `${watchlistItems.length} symbol${watchlistItems.length !== 1 ? 's' : ''}`;
  const subEl = document.getElementById('ms-nav-sub');
  if (subEl) subEl.textContent = watchlistItems.length > 0
    ? `${watchlistItems.length} symbol${watchlistItems.length !== 1 ? 's' : ''} tracked`
    : 'Watchlist & alerts';

  // Filter by active tag, then by gainer/loser, then sort (v2.40)
  let visibleItems = activeWlTag === 'all'
    ? [...watchlistItems]
    : watchlistItems.filter(i => i.tag === activeWlTag);

  // Gainer / Loser / Profit / Loss filter (v2.77: profit/loss added)
  if (msFilterMode === 'gainers') visibleItems = visibleItems.filter(i => (lastKnownPrices[i.symbol]?.pct ?? 0) >= 0);
  if (msFilterMode === 'losers')  visibleItems = visibleItems.filter(i => (lastKnownPrices[i.symbol]?.pct ?? 0) < 0);
  if (msFilterMode === 'profit')  visibleItems = visibleItems.filter(i => {
    if (!i.costBasis || i.costBasis <= 0 || !i.shares || i.shares <= 0) return false;
    const p = lastKnownPrices[i.symbol]?.price ?? 0;
    return p > i.costBasis;
  });
  if (msFilterMode === 'loss') visibleItems = visibleItems.filter(i => {
    if (!i.costBasis || i.costBasis <= 0 || !i.shares || i.shares <= 0) return false;
    const p = lastKnownPrices[i.symbol]?.price ?? 0;
    return p <= i.costBasis;
  });

  // Sort
  if (msSortMode === 'pct-desc') visibleItems.sort((a, b) => (lastKnownPrices[b.symbol]?.pct ?? -999) - (lastKnownPrices[a.symbol]?.pct ?? -999));
  if (msSortMode === 'pct-asc')  visibleItems.sort((a, b) => (lastKnownPrices[a.symbol]?.pct ??  999) - (lastKnownPrices[b.symbol]?.pct ??  999));
  if (msSortMode === 'pnl')      visibleItems.sort((a, b) => _calcCardPnl(b) - _calcCardPnl(a));
  if (msSortMode === 'alpha')    visibleItems.sort((a, b) => a.symbol.localeCompare(b.symbol));

  if (watchlistItems.length === 0) {
    grid.innerHTML = `
      <div class="ms-empty">
        <div class="ms-empty-icon">★</div>
        <div class="ms-empty-title">Your watchlist is empty</div>
        <div class="ms-empty-sub">
          Add any symbol above to track its price and set a price alert.
        </div>
        <div class="ms-empty-hint">Try: AAPL · BTC-USD · EURUSD=X · ^GSPC · GC=F</div>
      </div>`;
    return;
  }

  if (visibleItems.length === 0 && activeWlTag !== 'all') {
    grid.innerHTML = `<div class="ms-empty"><div class="ms-empty-icon">🏷</div><div class="ms-empty-title">No items tagged "${activeWlTag}"</div><div class="ms-empty-sub">Assign this tag to cards using the tag dropdown on each card.</div></div>`;
    return;
  }

  // v2.76: Watchlist Group Summary bar (shown when a tag filter is active)
  {
    let gsBanner = document.getElementById('ms-group-summary');
    if (activeWlTag !== 'all' && visibleItems.length > 0) {
      if (!gsBanner) {
        gsBanner = document.createElement('div');
        gsBanner.id = 'ms-group-summary';
        gsBanner.className = 'ms-group-summary';
        grid.parentElement?.insertBefore(gsBanner, grid);
      }
      let up = 0, dn = 0, totalPnl = 0, hasPnl = false;
      visibleItems.forEach(item => {
        const homeId = ALL_HOME_SYMBOLS.find(s => s.symbol === item.symbol)?.id;
        const lkp = homeId ? lastKnownPrices[homeId] : null;
        const pct = lkp?.pct ?? null;
        if (pct != null) { if (pct >= 0) up++; else dn++; }
        if (item.costBasis > 0 && item.shares > 0 && lkp?.price != null) {
          totalPnl += (lkp.price - item.costBasis) * item.shares;
          hasPnl = true;
        }
      });
      const TAG_MAP = { longs: '📈 Longs', shorts: '📉 Shorts', core: '⭐ Core', watch: '🔍 Watch', hot: '⚡ Hot' };
      const tagLabel = TAG_MAP[activeWlTag] || activeWlTag;
      const pnlHtml = hasPnl ? `<span class="mgs-sep">·</span><span class="mgs-stat"><span class="mgs-stat-lbl">P&L</span><span class="mgs-pnl ${totalPnl >= 0 ? 'positive' : 'negative'}">${totalPnl >= 0 ? '+' : ''}$${Math.abs(totalPnl).toFixed(0)}</span></span>` : '';
      gsBanner.innerHTML = `
        <span class="mgs-tag">${tagLabel}</span>
        <span class="mgs-count">${visibleItems.length} symbol${visibleItems.length !== 1 ? 's' : ''}</span>
        <span class="mgs-sep">·</span>
        <span class="mgs-breadth"><span class="positive">↑${up}</span><span class="negative">↓${dn}</span></span>
        ${pnlHtml}`;
    } else if (gsBanner) {
      gsBanner.remove();
    }
  }

  grid.innerHTML = visibleItems.map(item => {
    const hasAbove = item.alertAbove != null && !isNaN(item.alertAbove);
    const hasBelow = item.alertBelow != null && !isNaN(item.alertBelow);
    return `
      <div class="ms-card" id="msc-${item.symbol}" data-symbol="${item.symbol}" draggable="true">
        <div class="ms-card-header">
          <div class="ms-card-info">
            <span class="ms-card-sym">${item.symbol}</span>
            <span class="ms-card-label">${item.label}</span>
          </div>
          <select class="ms-card-tag-sel" data-symbol="${item.symbol}" title="Assign group tag">
            <option value="">🏷 Tag</option>
            ${WL_TAGS.map(t => `<option value="${t}" ${item.tag === t ? 'selected' : ''}>${t}</option>`).join('')}
          </select>
          <button class="ms-card-del" data-symbol="${item.symbol}" title="Remove">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
              <line x1="3" y1="3" x2="13" y2="13"/><line x1="13" y1="3" x2="3" y2="13"/>
            </svg>
          </button>
        </div>
        <div class="ms-card-prices">
          <span class="ms-card-price" id="mscp-${item.symbol}">–</span>
          <!-- PCT CHANGE RING (v2.40) — SVG arc proportional to today's % change -->
          <svg class="ms-pct-ring" id="msring-${item.symbol}" viewBox="0 0 26 26" width="26" height="26" title="Today's % change ring">
            <circle cx="13" cy="13" r="10" fill="none" stroke="rgba(255,255,255,0.07)" stroke-width="2.5"/>
            <circle class="ms-ring-arc" id="msringarc-${item.symbol}" cx="13" cy="13" r="10"
              fill="none" stroke="rgba(99,102,241,0.4)" stroke-width="2.5" stroke-linecap="round"
              stroke-dasharray="0 62.83" stroke-dashoffset="0" transform="rotate(-90 13 13)"/>
          </svg>
          <div class="ms-card-chg-wrap">
            <span class="ms-card-chg neutral" id="mscc-${item.symbol}">–</span>
            <span class="ms-card-abs neutral" id="msabs-${item.symbol}">–</span>
          </div>
          <span class="ms-vel-arrow" id="msvel-${item.symbol}" style="display:none" title="Price velocity"></span>
        </div>
        <div class="ms-card-sparkwrap">
          <canvas class="ms-card-canvas" id="msca-${item.symbol}"></canvas>
        </div>
        <!-- v2.63: Day Hi/Lo stat row -->
        <div class="ms-card-daystat" id="msdaystat-${item.symbol}" style="display:none">
          <span class="ms-ds-hi" id="msdshi-${item.symbol}">H –</span>
          <span class="ms-ds-lo" id="msdsl-${item.symbol}">L –</span>
        </div>
        <!-- MINI 7-DAY HEATMAP (v2.41) -->
        <div class="ms-card-heatmap" id="msheat-${item.symbol}"></div>
        <div class="ms-tf-align" id="mstfa-${item.symbol}" style="display:none"></div>
        <div class="ms-div-badges" id="msdiv-${item.symbol}"></div>
        <!-- v2.91: Conviction Score badge -->
        <div class="ms-conviction" id="msconv-${item.symbol}" style="display:none"></div>
        <!-- v2.75: Earnings countdown badge -->
        <span class="ms-earn-badge" id="msearn-${item.symbol}" style="display:none"></span>
        <!-- PRICE BAND GAUGE (v2.38) — 52W range with current price dot -->
        <div class="ms-price-band" id="mspb-${item.symbol}" style="display:none">
          <div class="ms-pb-track">
            <div class="ms-pb-fill" id="mspbf-${item.symbol}" style="width:0%"></div>
            <div class="ms-pb-dot"  id="mspbd-${item.symbol}" style="left:0%"></div>
          </div>
          <div class="ms-pb-labels">
            <span id="mspbl-lo-${item.symbol}">52W Lo</span>
            <span class="ms-pb-pct" id="mspbl-pct-${item.symbol}"></span>
            <span id="mspbl-hi-${item.symbol}">52W Hi</span>
          </div>
        </div>
        <div class="ms-card-alert-row">
          <div class="ms-alert-line">
            <span class="ms-alert-dir up" title="Notify when price rises above this level">↑</span>
            <input type="number" class="ms-alert-input" id="msai-above-${item.symbol}"
              data-symbol="${item.symbol}" data-dir="above"
              placeholder="Alert above…"
              value="${hasAbove ? item.alertAbove : ''}"
              ${hasAbove ? 'data-has-alert="true"' : ''}>
          </div>
          <div class="ms-alert-line">
            <span class="ms-alert-dir dn" title="Notify when price drops below this level">↓</span>
            <input type="number" class="ms-alert-input" id="msai-below-${item.symbol}"
              data-symbol="${item.symbol}" data-dir="below"
              placeholder="Alert below…"
              value="${hasBelow ? item.alertBelow : ''}"
              ${hasBelow ? 'data-has-alert="true"' : ''}>
          </div>
          <div class="ms-cond-row">
            <span class="ms-cond-and">AND</span>
            <select class="ms-cond-sym" data-symbol="${item.symbol}" title="Condition on another asset">
              <option value="">No condition</option>
              <option value="^VIX"     ${item.condSymbol==='^VIX'    ?'selected':''}>VIX above/below</option>
              <option value="^GSPC"    ${item.condSymbol==='^GSPC'   ?'selected':''}>S&P 500</option>
              <option value="DX-Y.NYB" ${item.condSymbol==='DX-Y.NYB'?'selected':''}>DXY (Dollar)</option>
              <option value="BTC-USD"  ${item.condSymbol==='BTC-USD' ?'selected':''}>Bitcoin</option>
              <option value="GC=F"     ${item.condSymbol==='GC=F'    ?'selected':''}>Gold</option>
            </select>
            <select class="ms-cond-dir" data-symbol="${item.symbol}" ${!item.condSymbol?'disabled':''}>
              <option value="above" ${item.condDir==='above'?'selected':''}>↑ above</option>
              <option value="below" ${item.condDir==='below'?'selected':''}>↓ below</option>
            </select>
            <input type="number" class="ms-cond-thresh" data-symbol="${item.symbol}"
              placeholder="level" value="${item.condThreshold ?? ''}" ${!item.condSymbol?'disabled':''}>
          </div>
        </div>
        <div class="ms-card-pnl-row">
          <div class="ms-pnl-inputs">
            <input type="number" class="ms-pnl-input" id="mspnl-cost-${item.symbol}"
              data-symbol="${item.symbol}" data-field="costBasis"
              placeholder="Avg cost" min="0" step="any"
              value="${item.costBasis != null ? item.costBasis : ''}">
            <span class="ms-pnl-x">×</span>
            <input type="number" class="ms-pnl-input ms-pnl-qty" id="mspnl-qty-${item.symbol}"
              data-symbol="${item.symbol}" data-field="shares"
              placeholder="Qty" min="0" step="any"
              value="${item.shares != null ? item.shares : ''}">
          </div>
          <span class="ms-pnl-display" id="mspnl-${item.symbol}"></span>
        </div>
      </div>`;
  }).join('');

  // ── Delegated click on grid (card nav + delete) ───────────────────
  if (!grid._msClickDelegated) {
    grid._msClickDelegated = true;
    grid.addEventListener('click', (e) => {
      // Delete button
      const delBtn = e.target.closest('.ms-card-del');
      if (delBtn) {
        e.stopPropagation();
        removeWatchlistItem(delBtn.dataset.symbol);
        return;
      }
      // Card body click -> switch to overview
      if (e.target.closest('.ms-alert-input') || e.target.tagName === 'INPUT' ||
          e.target.tagName === 'SELECT' || e.target.closest('select')) return;
      const card = e.target.closest('.ms-card');
      if (!card) return;
      const item = watchlistItems.find(i => i.symbol === card.dataset.symbol);
      if (!item) return;
      switchSite('overview');
      const known = ALL_HOME_SYMBOLS.find(s => s.symbol === item.symbol);
      if (known) {
        selectMainChartSym(known);
      } else {
        const tmp = { id: '_ms_' + item.symbol, symbol: item.symbol, label: item.label, fmt: item.fmt };
        selectedChartSym = tmp;
        const nameEl = document.getElementById('main-name');
        if (nameEl) nameEl.textContent = item.label;
        loadMainChart();
      }
    });
  }

  // v2.39 hover thumbnail removed in v2.92

  // ── Alert price inputs (above ↑ and below ↓) ─────────────────────────
  grid.querySelectorAll('.ms-alert-input').forEach(input => {
    const saveAlert = () => {
      const symbol = input.dataset.symbol;
      const dir    = input.dataset.dir; // 'above' | 'below'
      const item   = watchlistItems.find(i => i.symbol === symbol);
      if (!item) return;
      const val   = parseFloat(input.value);
      const price = isNaN(val) || input.value === '' ? null : val;
      if (dir === 'above') {
        item.alertAbove = price;
        // Reset fired state so new level can trigger
        firedAlerts.forEach(k => { if (k.startsWith(`${symbol}:above:`)) firedAlerts.delete(k); });
      } else {
        item.alertBelow = price;
        firedAlerts.forEach(k => { if (k.startsWith(`${symbol}:below:`)) firedAlerts.delete(k); });
      }
      saveWatchlist();
      input.dataset.hasAlert = price != null ? 'true' : 'false';
    };
    input.addEventListener('change', saveAlert);
    input.addEventListener('blur',   saveAlert);
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') input.blur(); });
  });

  // ── Smart condition inputs ────────────────────────────────────────────
  grid.querySelectorAll('.ms-cond-sym').forEach(sel => {
    sel.addEventListener('change', () => {
      const sym  = sel.dataset.symbol;
      const item = watchlistItems.find(i => i.symbol === sym);
      if (!item) return;
      item.condSymbol = sel.value || null;
      const dirSel    = sel.closest('.ms-cond-row').querySelector('.ms-cond-dir');
      const thrInput  = sel.closest('.ms-cond-row').querySelector('.ms-cond-thresh');
      if (dirSel)   dirSel.disabled   = !item.condSymbol;
      if (thrInput) thrInput.disabled = !item.condSymbol;
      if (!item.condSymbol) { item.condThreshold = null; if (thrInput) thrInput.value = ''; }
      firedAlerts.forEach(k => { if (k.startsWith(`${sym}:`)) firedAlerts.delete(k); });
      saveWatchlist();
    });
  });
  grid.querySelectorAll('.ms-cond-dir').forEach(sel => {
    sel.addEventListener('change', () => {
      const sym  = sel.dataset.symbol;
      const item = watchlistItems.find(i => i.symbol === sym);
      if (!item) return;
      item.condDir = sel.value;
      firedAlerts.forEach(k => { if (k.startsWith(`${sym}:`)) firedAlerts.delete(k); });
      saveWatchlist();
    });
  });
  grid.querySelectorAll('.ms-cond-thresh').forEach(input => {
    const save = () => {
      const sym  = input.dataset.symbol;
      const item = watchlistItems.find(i => i.symbol === sym);
      if (!item) return;
      const val = parseFloat(input.value);
      item.condThreshold = isNaN(val) || input.value === '' ? null : val;
      firedAlerts.forEach(k => { if (k.startsWith(`${sym}:`)) firedAlerts.delete(k); });
      saveWatchlist();
    };
    input.addEventListener('change', save);
    input.addEventListener('blur', save);
    input.addEventListener('keydown', e => { if (e.key === 'Enter') input.blur(); });
  });

  // ── Portfolio P&L inputs (avg cost × qty) ────────────────────────────
  grid.querySelectorAll('.ms-pnl-input').forEach(input => {
    const savePnl = () => {
      const sym   = input.dataset.symbol;
      const field = input.dataset.field; // 'costBasis' | 'shares'
      const item  = watchlistItems.find(i => i.symbol === sym);
      if (!item) return;
      const val = parseFloat(input.value);
      item[field] = isNaN(val) || input.value === '' ? null : val;
      saveWatchlist();
      // Refresh P&L display using last known price
      const cached = lastKnownPrices[ALL_HOME_SYMBOLS.find(s => s.symbol === sym)?.id]?.price
        ?? Object.values(wlPrevPrices)[0]; // fallback
      const px = wlPrevPrices[sym];
      if (px != null) {
        const pnlEl = document.getElementById(`mspnl-${sym}`);
        if (pnlEl && item.costBasis != null && item.shares != null && item.costBasis > 0 && item.shares > 0) {
          const pnl    = (px - item.costBasis) * item.shares;
          const pnlPct = ((px - item.costBasis) / item.costBasis) * 100;
          const pos    = pnl >= 0;
          const sg     = pos ? '+' : '';
          pnlEl.textContent = `P&L ${sg}$${Math.abs(pnl).toFixed(2)} (${sg}${pnlPct.toFixed(1)}%)`;
          pnlEl.className   = `ms-pnl-display ${pos ? 'positive' : 'negative'}`;
        } else if (pnlEl) { pnlEl.textContent = ''; }
      }
    };
    input.addEventListener('change', savePnl);
    input.addEventListener('blur', savePnl);
    input.addEventListener('keydown', e => { if (e.key === 'Enter') input.blur(); });
    input.addEventListener('click', e => e.stopPropagation()); // prevent card navigation
  });

  // ── Tag selector on each card ────────────────────────────────────────
  grid.querySelectorAll('.ms-card-tag-sel').forEach(sel => {
    sel.addEventListener('change', e => {
      e.stopPropagation();
      const sym  = sel.dataset.symbol;
      const item = watchlistItems.find(i => i.symbol === sym);
      if (!item) return;
      item.tag = sel.value || null;
      saveWatchlist();
      // Rebuild tag tabs (new tag may have appeared)
      renderMySpaceCards();
    });
  });

  // ── v2.67 Drag-to-Reorder ────────────────────────────────────────────
  if (!grid._dragDelegated) {
    grid._dragDelegated = true;
    let _dragSym = null;
    grid.addEventListener('dragstart', e => {
      const card = e.target.closest('.ms-card');
      if (!card) return;
      _dragSym = card.dataset.symbol;
      card.classList.add('ms-card-dragging');
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', _dragSym);
    });
    grid.addEventListener('dragend', e => {
      const card = e.target.closest('.ms-card');
      if (card) card.classList.remove('ms-card-dragging');
      grid.querySelectorAll('.ms-card-drag-over').forEach(c => c.classList.remove('ms-card-drag-over'));
      _dragSym = null;
    });
    grid.addEventListener('dragover', e => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      const target = e.target.closest('.ms-card');
      if (!target) return;
      grid.querySelectorAll('.ms-card-drag-over').forEach(c => c.classList.remove('ms-card-drag-over'));
      if (target.dataset.symbol !== _dragSym) target.classList.add('ms-card-drag-over');
    });
    grid.addEventListener('dragleave', e => {
      const target = e.target.closest('.ms-card');
      if (target) target.classList.remove('ms-card-drag-over');
    });
    grid.addEventListener('drop', e => {
      e.preventDefault();
      const targetCard = e.target.closest('.ms-card');
      if (!targetCard || !_dragSym) return;
      targetCard.classList.remove('ms-card-drag-over');
      const targetSym = targetCard.dataset.symbol;
      if (targetSym === _dragSym) return;
      const fromIdx = watchlistItems.findIndex(i => i.symbol === _dragSym);
      const toIdx   = watchlistItems.findIndex(i => i.symbol === targetSym);
      if (fromIdx < 0 || toIdx < 0) return;
      const [moved] = watchlistItems.splice(fromIdx, 1);
      watchlistItems.splice(toIdx, 0, moved);
      saveWatchlist();
      renderMySpaceCards();
    });
  }

  // ── v2.76: Right-click context menu on My Space cards ────────────────
  if (!grid._ctxDelegated) {
    grid._ctxDelegated = true;
    grid.addEventListener('contextmenu', (e) => {
      const card = e.target.closest('.ms-card');
      if (!card) return;
      e.preventDefault();
      showMsCardContextMenu(e.clientX, e.clientY, card.dataset.symbol);
    });
  }

  // ── Fetch prices + sparklines for all cards ──────────────────────────
  fetchMySpacePrices();
}

// ── Update a single card's price display ────────────────────────────────
function updateMySpaceCard(symbol, price, change, pct) {
  const priceEl = document.getElementById(`mscp-${symbol}`);
  const chgEl   = document.getElementById(`mscc-${symbol}`);
  const absEl   = document.getElementById(`msabs-${symbol}`);
  const card    = document.getElementById(`msc-${symbol}`);
  const item    = watchlistItems.find(i => i.symbol === symbol);
  if (!priceEl || !chgEl || !item) return;

  const isPos = change >= 0;
  const sign  = isPos ? '+' : '';
  priceEl.textContent = fmtPrice(price, item.fmt);
  chgEl.textContent   = `${sign}${pct.toFixed(2)}%`;
  chgEl.className     = `ms-card-chg ${isPos ? 'positive' : 'negative'}`;

  // Absolute dollar change
  if (absEl) {
    absEl.textContent = `${sign}${fmtPrice(Math.abs(change), item.fmt)}`;
    absEl.className   = `ms-card-abs ${isPos ? 'positive' : 'negative'}`;
  }

  // Left accent border color
  if (card) {
    card.classList.toggle('pos-change', isPos);
    card.classList.toggle('neg-change', !isPos);

    // Price update pulse flash on card border (v2.47)
    const prevCardPrice = card._lastPrice;
    if (prevCardPrice !== undefined && price !== prevCardPrice) {
      const pulseCls = isPos ? 'ms-card-pulse-up' : 'ms-card-pulse-dn';
      card.classList.remove('ms-card-pulse-up', 'ms-card-pulse-dn');
      void card.offsetWidth;
      card.classList.add(pulseCls);
    }
    card._lastPrice = price;
    // v2.74: Heatmap view tint — stronger color when compact view active
    const alpha = Math.min(0.28, 0.04 + Math.abs(pct) * 0.035);
    card.style.setProperty('--hm-tint', isPos
      ? `rgba(52,211,153,${alpha.toFixed(3)})`
      : `rgba(248,113,113,${alpha.toFixed(3)})`);
    card.dataset.hmPct = pct.toFixed(2);
  }

  // Portfolio P&L display
  const pnlEl = document.getElementById(`mspnl-${symbol}`);
  if (pnlEl) {
    if (item.costBasis != null && item.shares != null && item.costBasis > 0 && item.shares > 0) {
      const pnl    = (price - item.costBasis) * item.shares;
      const pnlPct = ((price - item.costBasis) / item.costBasis) * 100;
      const pos    = pnl >= 0;
      const sg     = pos ? '+' : '';
      pnlEl.textContent = `P&L ${sg}$${Math.abs(pnl).toFixed(2)} (${sg}${pnlPct.toFixed(1)}%)`;
      pnlEl.className   = `ms-pnl-display ${pos ? 'positive' : 'negative'}`;
    } else {
      pnlEl.textContent = '';
    }
  }

  // Refresh portfolio & daily stats
  updatePortfolioSummary();
  updateMsDailyStats();
  updateMsInsights();
  updateMsTodaySnapshot(); // v2.73
  // Price band gauge (v2.38)
  updateMsPriceBand(symbol, price);
  // Pct change ring (v2.40)
  updateMsPctRing(symbol, pct);

  // v2.69: Velocity Arrow — tracks pct change momentum
  {
    const velEl = document.getElementById(`msvel-${symbol}`);
    if (velEl) {
      if (!velEl._pctHistory) velEl._pctHistory = [];
      velEl._pctHistory.push(pct);
      if (velEl._pctHistory.length > 5) velEl._pctHistory.shift();
      if (velEl._pctHistory.length >= 3) {
        const recent = velEl._pctHistory.slice(-3);
        const avg = recent.reduce((a, b) => a + b, 0) / recent.length;
        const delta = recent[recent.length - 1] - recent[0];
        let arrow = '', cls = '';
        if (avg > 0.8 && delta > 0.2)      { arrow = '↑↑'; cls = 'vel-strong-up'; }
        else if (avg > 0.2 || delta > 0.1) { arrow = '↑';  cls = 'vel-up'; }
        else if (avg < -0.8 && delta < -0.2){ arrow = '↓↓'; cls = 'vel-strong-dn'; }
        else if (avg < -0.2 || delta < -0.1){ arrow = '↓';  cls = 'vel-dn'; }
        else                               { arrow = '→';  cls = 'vel-flat'; }
        velEl.textContent = arrow;
        velEl.className   = `ms-vel-arrow ${cls}`;
        velEl.style.display = '';
      }
    }
  }

  // v2.63: Day Hi/Lo stat row — from lastKnownPrices cache
  {
    const dayStatEl = document.getElementById(`msdaystat-${symbol}`);
    const hiEl2 = document.getElementById(`msdshi-${symbol}`);
    const loEl2 = document.getElementById(`msdsl-${symbol}`);
    if (dayStatEl && hiEl2 && loEl2) {
      const homeId = ALL_HOME_SYMBOLS.find(s => s.symbol === symbol)?.id;
      const cached = homeId ? lastKnownPrices[homeId] : null;
      const dHi = cached?.dayHigh;
      const dLo = cached?.dayLow;
      if (dHi != null && dLo != null && dHi > 0 && dLo > 0) {
        hiEl2.textContent = `H ${fmtPrice(dHi, item?.fmt)}`;
        loEl2.textContent = `L ${fmtPrice(dLo, item?.fmt)}`;
        dayStatEl.style.display = 'flex';
      } else {
        dayStatEl.style.display = 'none';
      }
    }
  }

  // v2.91: Conviction Score badge
  {
    const convEl = document.getElementById(`msconv-${symbol}`);
    if (convEl) {
      const homeId = ALL_HOME_SYMBOLS.find(s => s.symbol === symbol)?.id;
      if (homeId) {
        const cv = calcConvictionScore(homeId);
        if (cv) {
          convEl.innerHTML = `<span class="ms-conv-bar-wrap"><span class="ms-conv-bar" style="width:${cv.score}%;background:${cv.color}"></span></span><span class="ms-conv-score" style="color:${cv.color}">${cv.score}</span><span class="ms-conv-label">${cv.label}</span>`;
          convEl.style.display = 'flex';
        }
      }
    }
  }
}

// ── Price Band Gauge (v2.38) — 52W range with live price dot ──────────
function updateMsPriceBand(symbol, price) {
  const bandEl = document.getElementById(`mspb-${symbol}`);
  const fillEl = document.getElementById(`mspbf-${symbol}`);
  const dotEl  = document.getElementById(`mspbd-${symbol}`);
  const loEl   = document.getElementById(`mspbl-lo-${symbol}`);
  const hiEl   = document.getElementById(`mspbl-hi-${symbol}`);
  const pctEl  = document.getElementById(`mspbl-pct-${symbol}`);
  if (!bandEl || !fillEl || !dotEl) return;

  // Look for 1y chart data in cache to compute 52W range
  const cacheKey = Object.keys(chartDataCache).find(k => k.startsWith(`${symbol}|1y`));
  if (!cacheKey) { bandEl.style.display = 'none'; return; }

  const data   = chartDataCache[cacheKey];
  const closes = data.map(d => d.close).filter(v => v != null && v > 0);
  if (closes.length < 5) { bandEl.style.display = 'none'; return; }

  const lo52  = Math.min(...closes);
  const hi52  = Math.max(...closes);
  const range = hi52 - lo52;
  if (range <= 0) { bandEl.style.display = 'none'; return; }

  const pct  = Math.max(0, Math.min(1, (price - lo52) / range));
  const pctF = (pct * 100).toFixed(0);

  fillEl.style.width = `${pct * 100}%`;
  dotEl.style.left   = `${pct * 100}%`;
  if (loEl)  loEl.textContent  = fmtPrice(lo52, 'dec');
  if (hiEl)  hiEl.textContent  = fmtPrice(hi52, 'dec');
  if (pctEl) pctEl.textContent = `${pctF}% of 52W range`;

  bandEl.style.display = '';
}

// ── P&L helper for sort (v2.40) ───────────────────────────────────────
function _calcCardPnl(item) {
  const price = lastKnownPrices[item.symbol]?.price;
  if (price == null || !item.costBasis || !item.shares) return 0;
  return (price - item.costBasis) * item.shares;
}

// ── Pct Change Ring (v2.40) — SVG arc on My Space cards ───────────────
function updateMsPctRing(symbol, pct) {
  const arc = document.getElementById(`msringarc-${symbol}`);
  if (!arc) return;
  const maxPct        = 10; // ±10% = full ring
  const circumference = 2 * Math.PI * 10; // r=10 → 62.83
  const clamped       = Math.max(-maxPct, Math.min(maxPct, pct));
  const filled        = (Math.abs(clamped) / maxPct) * circumference;
  arc.setAttribute('stroke-dasharray', `${filled.toFixed(2)} ${circumference.toFixed(2)}`);
  arc.setAttribute('stroke', pct >= 0 ? 'rgba(16,185,129,0.75)' : 'rgba(239,68,68,0.7)');
}

// ── Annotation clear button visibility ────────
function updateAnnClearBtn() {
  const btn = document.getElementById('ann-clear-btn');
  if (!btn || !selectedChartSym) return;
  const anns = chartAnnotations[selectedChartSym.symbol] || [];
  btn.style.display = anns.length ? '' : 'none';
  btn.textContent   = `🗑 ${anns.length}`;
}

// ── Alert history renderer ─────────────────────
function renderAlertHistory() {
  const el = document.getElementById('ms-alert-history');
  if (!el) return;
  const sum  = el.querySelector('.ah-summary');
  const list = el.querySelector('.ah-list');
  if (sum) sum.textContent = alertHistory.length
    ? `🔔 ${alertHistory.length} alert${alertHistory.length !== 1 ? 's' : ''} fired this session`
    : '🔔 No alerts fired yet';
  updateAlertDigestBanner();
  if (!list) return;
  if (alertHistory.length === 0) { list.innerHTML = '<div class="ah-empty">No alerts this session</div>'; return; }
  list.innerHTML = alertHistory.map(h => {
    const dir     = h.isAbove ? '↑' : '↓';
    const pFmt    = fmtPrice(h.price, h.fmt || 'dec');
    const tAgo    = Math.round((Date.now() - h.time) / 60_000);
    const tStr    = tAgo < 1 ? 'just now' : tAgo < 60 ? `${tAgo}m ago` : `${Math.round(tAgo / 60)}h ago`;
    const snKey   = `${h.symbol}:${h.isAbove ? 'above' : 'below'}:${h.target}`;
    const snUntil = snoozedAlerts.get(snKey) || 0;
    const isSnoozed = snUntil > Date.now();
    const snoozeLabel = isSnoozed
      ? `💤 ${Math.ceil((snUntil - Date.now()) / 60_000)}m left`
      : '💤 Snooze 30m';
    const streakBadge = h.streak >= 3 ? `<span class="ah-streak" title="${h.streak} fires in a row">🔥${h.streak}×</span>` : '';
    return `<div class="ah-item">
      <span class="ah-dir ${h.isAbove ? 'up' : 'dn'}">${dir}</span>
      <span class="ah-sym">${h.symbol}</span>
      <span class="ah-price">${pFmt}</span>
      <span class="ah-time">${tStr}</span>
      ${streakBadge}
      <button class="ah-snooze-btn${isSnoozed ? ' snoozed' : ''}" data-snkey="${snKey}" ${isSnoozed ? 'disabled' : ''}>${snoozeLabel}</button>
    </div>`;
  }).join('');

  // Delegated snooze click
  const listEl = document.getElementById('ms-alert-history');
  if (listEl && !listEl._snoozeDelegated) {
    listEl._snoozeDelegated = true;
    listEl.addEventListener('click', e => {
      const btn = e.target.closest('.ah-snooze-btn');
      if (!btn || btn.disabled) return;
      const key = btn.dataset.snkey;
      if (!key) return;
      // Snooze for 30 minutes — remove from firedAlerts so it can re-fire after snooze
      snoozedAlerts.set(key, Date.now() + 30 * 60_000);
      firedAlerts.delete(key); // allow re-fire after snooze expires
      renderAlertHistory();
    });
  }
}

// ── Alert Digest Banner (v2.44) — compact horizontal strip above cards ────────
function updateAlertDigestBanner() {
  const banner   = document.getElementById('ms-alert-digest');
  const chipsEl  = document.getElementById('mad-chips');
  const countEl  = document.getElementById('mad-count');
  if (!banner || !chipsEl || !countEl) return;

  if (alertHistory.length === 0) { banner.style.display = 'none'; return; }
  banner.style.display = 'flex';

  // Unique symbols that fired, in order of most-recent first
  const seen = new Set();
  const unique = alertHistory.filter(h => { if (seen.has(h.symbol)) return false; seen.add(h.symbol); return true; });

  chipsEl.innerHTML = unique.slice(0, 8).map(h => {
    const dir   = h.isAbove ? '↑' : '↓';
    const pFmt  = fmtPrice(h.price, h.fmt || 'dec');
    const tAgo  = Math.round((Date.now() - h.time) / 60_000);
    const tStr  = tAgo < 1 ? 'now' : tAgo < 60 ? `${tAgo}m` : `${Math.round(tAgo / 60)}h`;
    return `<div class="mad-chip ${h.isAbove ? 'up' : 'dn'}" title="${h.symbol} hit ${pFmt} ${tStr} ago">
      <span class="mad-chip-sym">${h.symbol}</span>
      <span class="mad-chip-dir">${dir}</span>
      <span class="mad-chip-time">${tStr}</span>
    </div>`;
  }).join('');

  countEl.textContent = `${alertHistory.length} alert${alertHistory.length !== 1 ? 's' : ''} total`;
}

// ── Portfolio summary bar (total cost, total market value, total P&L) ────────
function updatePortfolioSummary() {
  const summaryEl = document.getElementById('ms-portfolio-summary');
  if (!summaryEl) return;

  let totalCost = 0, totalValue = 0, validCount = 0;
  watchlistItems.forEach(item => {
    if (item.costBasis == null || item.shares == null || item.costBasis <= 0 || item.shares <= 0) return;
    // Get last known price from wlPrevPrices
    const price = wlPrevPrices[item.symbol];
    if (price == null) return;
    totalCost  += item.costBasis * item.shares;
    totalValue += price * item.shares;
    validCount++;
  });

  if (validCount === 0) { summaryEl.style.display = 'none'; return; }

  summaryEl.style.display = 'flex';
  const totalPnl    = totalValue - totalCost;
  const totalPnlPct = totalCost > 0 ? ((totalPnl / totalCost) * 100) : 0;
  const pos         = totalPnl >= 0;
  const sg          = pos ? '+' : '';
  // v2.65: Mini portfolio donut SVG
  const catMap = {};
  watchlistItems.forEach(item => {
    const s = ALL_HOME_SYMBOLS.find(h => h.symbol === item.symbol);
    const cat = s?.cat || 'other';
    catMap[cat] = (catMap[cat] || 0) + 1;
  });
  const catColors = { indices: '#818cf8', crypto: '#f59e0b', forex: '#22d3ee', commodities: '#34d399', other: '#94a3b8' };
  const catLabels = { indices: 'IDX', crypto: 'CRY', forex: 'FX', commodities: 'CMD', other: '–' };
  const total2 = watchlistItems.length || 1;
  const R = 14, CX = 16, CY = 16, CIRC = 2 * Math.PI * R;
  let offset = 0;
  const segments = Object.entries(catMap).map(([cat, count]) => {
    const frac = count / total2;
    const dash = frac * CIRC;
    const seg = { cat, count, frac, dash, offset, color: catColors[cat] || '#64748b', label: catLabels[cat] || cat };
    offset += dash;
    return seg;
  });
  const donutSvg = `<svg class="mps-donut" viewBox="0 0 32 32" width="32" height="32">
    <circle cx="${CX}" cy="${CY}" r="${R}" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="5"/>
    ${segments.map(s => `<circle cx="${CX}" cy="${CY}" r="${R}" fill="none"
      stroke="${s.color}" stroke-width="5" stroke-linecap="butt"
      stroke-dasharray="${s.dash.toFixed(2)} ${(CIRC - s.dash).toFixed(2)}"
      stroke-dashoffset="${(CIRC / 4 - s.offset).toFixed(2)}"
      title="${s.label}: ${s.count}"/>`).join('')}
  </svg>`;

  summaryEl.innerHTML = `
    ${donutSvg}
    <span class="mps-label">Portfolio</span>
    <div class="mps-sep"></div>
    <span class="mps-item"><span class="mps-k">Invested</span><span class="mps-v">$${totalCost.toFixed(0)}</span></span>
    <span class="mps-item"><span class="mps-k">Value</span><span class="mps-v">$${totalValue.toFixed(0)}</span></span>
    <span class="mps-item"><span class="mps-k">Total P&L</span><span class="mps-v ${pos ? 'positive' : 'negative'}">${sg}$${Math.abs(totalPnl).toFixed(2)} <span class="mps-pct">(${sg}${totalPnlPct.toFixed(1)}%)</span></span></span>
    <span class="mps-count">${validCount} position${validCount !== 1 ? 's' : ''}</span>`;
  drawPortfolioAttribution();
}

// ── Portfolio Attribution Chart — P&L grouped by asset type ──────────────
function drawPortfolioAttribution() {
  const attrEl  = document.getElementById('ms-attribution');
  const canvas  = document.getElementById('ms-attr-canvas');
  if (!attrEl || !canvas) return;

  // Classify symbol into asset type
  function assetType(symbol) {
    if (!symbol) return 'Equity';
    if (symbol.endsWith('-USD') || symbol.endsWith('-USDT')) return 'Crypto';
    if (symbol.endsWith('=X'))  return 'Forex';
    if (symbol.endsWith('=F'))  return 'Commodity';
    if (symbol.startsWith('^')) return 'Index';
    return 'Equity';
  }

  // Accumulate P&L per type
  const groups = {};
  watchlistItems.forEach(item => {
    if (item.costBasis == null || item.shares == null || item.costBasis <= 0 || item.shares <= 0) return;
    const price = wlPrevPrices[item.symbol];
    if (price == null) return;
    const pnl = (price - item.costBasis) * item.shares;
    const type = assetType(item.symbol);
    groups[type] = (groups[type] || 0) + pnl;
  });

  const entries = Object.entries(groups).filter(([, v]) => v !== 0);
  if (entries.length === 0) { attrEl.style.display = 'none'; return; }
  attrEl.style.display = '';

  // Canvas draw
  const dpr  = window.devicePixelRatio || 1;
  const W    = canvas.parentElement.clientWidth || 400;
  const H    = 72;
  canvas.width  = W * dpr;
  canvas.height = H * dpr;
  canvas.style.width  = W + 'px';
  canvas.style.height = H + 'px';
  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, W, H);

  const barH     = 13;
  const rowH     = 18;
  const labelW   = 68;
  const valueW   = 60;
  const barAreaW = W - labelW - valueW - 8;
  const maxAbs   = Math.max(...entries.map(([, v]) => Math.abs(v)));

  // Sort: largest abs P&L first
  entries.sort((a, b) => Math.abs(b[1]) - Math.abs(a[1]));

  const startY = (H - entries.length * rowH) / 2;

  entries.forEach(([type, pnl], i) => {
    const y     = startY + i * rowH;
    const isPos = pnl >= 0;
    const frac  = maxAbs > 0 ? Math.abs(pnl) / maxAbs : 0;
    const bw    = frac * barAreaW;

    // Label
    ctx.fillStyle = 'rgba(148,163,184,0.7)';
    ctx.font      = `500 9px/1 "Inter", system-ui, sans-serif`;
    ctx.textAlign = 'right';
    ctx.fillText(type.toUpperCase(), labelW - 4, y + barH - 2);

    // Bar background
    ctx.fillStyle = 'rgba(100,116,139,0.08)';
    ctx.beginPath();
    ctx.roundRect(labelW, y, barAreaW, barH, 3);
    ctx.fill();

    // Bar fill
    const grad = ctx.createLinearGradient(labelW, 0, labelW + bw, 0);
    if (isPos) {
      grad.addColorStop(0, 'rgba(16,185,129,0.7)');
      grad.addColorStop(1, 'rgba(16,185,129,0.35)');
    } else {
      grad.addColorStop(0, 'rgba(239,68,68,0.7)');
      grad.addColorStop(1, 'rgba(239,68,68,0.35)');
    }
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.roundRect(labelW, y, bw, barH, 3);
    ctx.fill();

    // Value label
    const sg  = isPos ? '+' : '';
    const val = Math.abs(pnl) >= 1000
      ? `${sg}$${(pnl / 1000).toFixed(1)}K`
      : `${sg}$${pnl.toFixed(0)}`;
    ctx.fillStyle = isPos ? '#10b981' : '#ef4444';
    ctx.font      = `600 9px/1 "Inter", system-ui, sans-serif`;
    ctx.textAlign = 'left';
    ctx.fillText(val, labelW + barAreaW + 6, y + barH - 2);
  });
}

// ── My Space daily movers summary ────────────────────────────────────────
function updateMsDailyStats() {
  const el = document.getElementById('ms-daily-stats');
  if (!el || watchlistItems.length === 0) { if (el) el.style.display = 'none'; return; }
  let up = 0, dn = 0, flat = 0, dailyPnl = 0, hasPnl = false;
  watchlistItems.forEach(item => {
    // find from home symbols first, then wlPrevPrices
    const homeId = ALL_HOME_SYMBOLS.find(s => s.symbol === item.symbol)?.id;
    const lkp = homeId ? lastKnownPrices[homeId] : null;
    const change = lkp?.change ?? null;
    const pct = lkp?.pct ?? null;
    if (pct === null) { flat++; return; }
    if (pct > 0.01) up++; else if (pct < -0.01) dn++; else flat++;
    if (item.shares && item.shares > 0 && change != null) { dailyPnl += change * item.shares; hasPnl = true; }
  });
  const total = up + dn + flat;
  if (total === 0) { el.style.display = 'none'; return; }
  el.style.display = 'flex';
  const pnlPart = hasPnl
    ? `<span class="mds-sep">·</span><span class="mds-pnl ${dailyPnl >= 0 ? 'positive' : 'negative'}">${dailyPnl >= 0 ? '+' : ''}$${Math.abs(dailyPnl).toFixed(2)} today</span>`
    : '';
  el.innerHTML = `
    <span class="mds-label">Today</span>
    <span class="mds-up">↑ ${up}</span>
    <span class="mds-dn">↓ ${dn}</span>
    ${flat > 0 ? `<span class="mds-flat">– ${flat}</span>` : ''}
    ${pnlPart}`;
}

// ── v2.73: My Space Today Snapshot banner ───────────────────────────────────
function updateMsTodaySnapshot() {
  const el = document.getElementById('ms-today-snapshot');
  if (!el || watchlistItems.length === 0) { if (el) el.style.display = 'none'; return; }

  let best = null, worst = null, up = 0, dn = 0;
  watchlistItems.forEach(item => {
    const homeId = ALL_HOME_SYMBOLS.find(s => s.symbol === item.symbol)?.id;
    const lkp = homeId ? lastKnownPrices[homeId] : null;
    const pct  = lkp?.pct ?? null;
    if (pct === null) return;
    if (pct > 0.01) up++; else if (pct < -0.01) dn++;
    if (best  === null || pct > best.pct)  best  = { id: item.symbol, label: item.label || homeId || item.symbol, pct };
    if (worst === null || pct < worst.pct) worst = { id: item.symbol, label: item.label || homeId || item.symbol, pct };
  });

  if (!best && !worst) { el.style.display = 'none'; return; }

  // Market mood from S&P
  const spPct = lastKnownPrices['sp500']?.pct ?? 0;
  const mood  = spPct >  1.0 ? '🟢' : spPct >  0.2 ? '🟡' : spPct < -1.0 ? '🔴' : spPct < -0.2 ? '🟠' : '⚪';

  const fmtPct = (v) => `${v >= 0 ? '+' : ''}${v.toFixed(2)}%`;
  const bestHtml  = best  ? `<span class="mts-item mts-best"><span class="mts-ticker">${best.label.split(' ')[0]}</span><span class="positive">${fmtPct(best.pct)}</span></span>`  : '';
  const worstHtml = worst ? `<span class="mts-item mts-worst"><span class="mts-ticker">${worst.label.split(' ')[0]}</span><span class="negative">${fmtPct(worst.pct)}</span></span>` : '';

  el.style.display = 'flex';
  el.innerHTML = `
    <span class="mts-mood" title="Market mood">${mood}</span>
    <span class="mts-label">Today</span>
    <span class="mts-breadth"><span class="positive">↑${up}</span> <span class="negative">↓${dn}</span></span>
    <span class="mts-sep">·</span>
    <span class="mts-section-label">Best</span>${bestHtml}
    <span class="mts-sep">·</span>
    <span class="mts-section-label">Worst</span>${worstHtml}`;
}

// ── v2.75: Earnings Countdown Badge on My Space cards ────────────────────────
function updateMsEarnBadge(symbol) {
  const el = document.getElementById(`msearn-${symbol}`);
  if (!el) return;
  const marks = _earningsDateMarks[symbol];
  if (!marks || marks.length === 0) { el.style.display = 'none'; return; }
  // Estimate next earnings = last known date + ~91 days
  const sorted = [...marks].sort((a, b) => new Date(b.date) - new Date(a.date));
  const lastDate = new Date(sorted[0].date);
  if (isNaN(lastDate.getTime())) { el.style.display = 'none'; return; }
  const nextDate = new Date(lastDate.getTime() + 91 * 24 * 3600 * 1000);
  const now = Date.now();
  const daysUntil = Math.round((nextDate.getTime() - now) / (24 * 3600 * 1000));
  if (daysUntil < 0 || daysUntil > 30) { el.style.display = 'none'; return; }
  const isImminent = daysUntil <= 5;
  const isSoon     = daysUntil <= 14;
  el.textContent = daysUntil === 0 ? '📊 EARN TODAY' : `📊 EARN ${daysUntil}d`;
  el.className = `ms-earn-badge${isImminent ? ' earn-imminent' : isSoon ? ' earn-soon' : ''}`;
  el.style.display = '';
}

// ── Smart Watchlist Insights (v2.60) — quick insight chips above cards ───
function updateMsInsights() {
  const el = document.getElementById('ms-insights');
  if (!el || watchlistItems.length === 0) { if (el) el.style.display = 'none'; return; }
  const chips = [];
  // Count near-alert symbols
  let nearAlerts = 0;
  watchlistItems.forEach(item => {
    const homeId = ALL_HOME_SYMBOLS.find(s => s.symbol === item.symbol)?.id;
    const price  = homeId ? (lastKnownPrices[homeId]?.price || 0) : 0;
    if (price <= 0) return;
    const levels = [item.alertAbove, item.alertBelow].filter(v => v != null && v > 0);
    if (levels.some(lvl => Math.abs((price - lvl) / lvl) <= 0.02)) nearAlerts++;
  });
  if (nearAlerts > 0) chips.push(`<span class="msi-chip msi-alert">🔔 ${nearAlerts} near alert</span>`);
  // Count big movers (|pct| ≥ 2%)
  let bigMovers = 0;
  watchlistItems.forEach(item => {
    const homeId = ALL_HOME_SYMBOLS.find(s => s.symbol === item.symbol)?.id;
    const pct    = homeId ? (lastKnownPrices[homeId]?.pct ?? null) : null;
    if (pct != null && Math.abs(pct) >= 2.0) bigMovers++;
  });
  if (bigMovers > 0) chips.push(`<span class="msi-chip msi-mover">⚡ ${bigMovers} big move${bigMovers > 1 ? 's' : ''}</span>`);
  // Count positive vs negative
  let posCount = 0, negCount = 0;
  watchlistItems.forEach(item => {
    const homeId = ALL_HOME_SYMBOLS.find(s => s.symbol === item.symbol)?.id;
    const pct    = homeId ? (lastKnownPrices[homeId]?.pct ?? null) : null;
    if (pct == null) return;
    if (pct > 0.05) posCount++; else if (pct < -0.05) negCount++;
  });
  const sentiment = posCount > negCount ? 'bullish' : posCount < negCount ? 'bearish' : 'mixed';
  const senCls = sentiment === 'bullish' ? 'msi-bull' : sentiment === 'bearish' ? 'msi-bear' : 'msi-mixed';
  chips.push(`<span class="msi-chip ${senCls}">${posCount}↑ ${negCount}↓ ${sentiment}</span>`);
  if (chips.length === 0) { el.style.display = 'none'; return; }
  el.innerHTML = chips.join('');
  el.style.display = 'flex';
}

// ── Load sparkline for one card ──────────────────────────────────────────
async function loadMySpaceSparkline(symbol) {
  const canvas = document.getElementById(`msca-${symbol}`);
  if (!canvas) return;
  const item  = watchlistItems.find(i => i.symbol === symbol);
  const tf    = msSparkTF || '1mo';
  const int   = tf === '5d' ? '1h' : '1d';
  const data  = await fetchChartData(symbol, tf, int); // cached after first call
  if (data && data.length > 1) {
    const prices = data.map(d => d.close).filter(Boolean);
    const isUp   = prices[prices.length - 1] >= prices[0];
    // Use animated draw on first load, static redraw on subsequent calls (v2.47)
    if (!canvas._drawn) {
      canvas._drawn = true;
      drawSparklineAnimated(canvas, data, isUp, 500);
      // Also draw alert lines after animation completes
      setTimeout(() => drawMySpaceSparkline(canvas, data, isUp, item?.alertAbove, item?.alertBelow), 520);
    } else {
      drawMySpaceSparkline(canvas, data, isUp, item?.alertAbove, item?.alertBelow);
    }
    updateMsHeatmap(symbol, data); // mini 7-day heatmap (v2.41)
    // v2.64: RSI extremes badge on watchlist card
    updateMsRsiBadge(symbol, data);
    // v2.68: Multi-TF alignment badge
    updateMsTFAlignBadge(symbol, data);
    // v2.75: Earnings countdown badge
    updateMsEarnBadge(symbol);
  }
}

// ── v2.64: RSI Extremes Badge on Watchlist Card ────────────────────────────
function updateMsRsiBadge(symbol, data) {
  const divEl = document.getElementById(`msdiv-${symbol}`);
  if (!divEl || !data || data.length < 20) return;
  try {
    const closes = data.map(d => d.close).filter(v => v != null);
    const rsiArr = calcRSI(closes, 14);
    const lastRsi = rsiArr.slice().reverse().find(v => v != null && !isNaN(v));
    if (lastRsi == null) return;
    // Append RSI badge after existing divergence badges
    let rsiBadgeEl = divEl.querySelector('.ms-rsi-badge');
    if (!rsiBadgeEl) {
      rsiBadgeEl = document.createElement('span');
      rsiBadgeEl.className = 'ms-rsi-badge';
      divEl.appendChild(rsiBadgeEl);
    }
    if (lastRsi >= 70) {
      rsiBadgeEl.textContent = `RSI ${Math.round(lastRsi)} OB`;
      rsiBadgeEl.className = 'ms-rsi-badge ms-rsi-ob';
    } else if (lastRsi <= 30) {
      rsiBadgeEl.textContent = `RSI ${Math.round(lastRsi)} OS`;
      rsiBadgeEl.className = 'ms-rsi-badge ms-rsi-os';
    } else {
      rsiBadgeEl.remove();
    }
  } catch (_) {}
}

// ── v2.68: Multi-TF Alignment Badge on Watchlist Card ─────────────────────
function updateMsTFAlignBadge(symbol, data1mo) {
  const el = document.getElementById(`mstfa-${symbol}`);
  if (!el) return;
  // Use already-cached data for different TFs
  const getTrend = (d) => {
    if (!d || d.length < 5) return '–';
    const closes = d.map(x => x.close).filter(v => v != null && !isNaN(v));
    if (closes.length < 5) return '–';
    const ema = calcEMA(closes, Math.min(10, Math.floor(closes.length * 0.6)));
    const lastEma = ema.slice().reverse().find(v => v != null);
    if (lastEma == null) return '–';
    return closes[closes.length - 1] > lastEma ? '▲' : '▼';
  };
  const d1d  = chartDataCache[`${symbol}|5d|30m`]  || chartDataCache[`${symbol}|5d|1h`];
  const d1mo = data1mo;
  const d1y  = chartDataCache[`${symbol}|1y|1wk`]  || chartDataCache[`${symbol}|1y|1d`];
  const t1d  = getTrend(d1d);
  const t1mo = getTrend(d1mo);
  const t1y  = getTrend(d1y);
  // Only show if we have at least 2 timeframes
  const known = [t1d, t1mo, t1y].filter(t => t !== '–');
  if (known.length < 2) { el.style.display = 'none'; return; }
  const bullCount = known.filter(t => t === '▲').length;
  const allBull = bullCount === known.length;
  const allBear = bullCount === 0;
  const tfClass = allBull ? 'tfa-all-bull' : allBear ? 'tfa-all-bear' : 'tfa-mixed';
  el.innerHTML = `
    <span class="tfa-label">TF</span>
    <span class="tfa-cell ${t1d === '▲' ? 'tfa-up' : t1d === '▼' ? 'tfa-dn' : 'tfa-na'}" title="1-Day trend">${t1d}<span class="tfa-tf">1D</span></span>
    <span class="tfa-cell ${t1mo === '▲' ? 'tfa-up' : t1mo === '▼' ? 'tfa-dn' : 'tfa-na'}" title="1-Month trend">${t1mo}<span class="tfa-tf">1M</span></span>
    <span class="tfa-cell ${t1y === '▲' ? 'tfa-up' : t1y === '▼' ? 'tfa-dn' : 'tfa-na'}" title="1-Year trend">${t1y}<span class="tfa-tf">1Y</span></span>`;
  el.className = `ms-tf-align ${tfClass}`;
  el.style.display = 'flex';
}

// ── Mini 7-Day Heatmap Row (v2.41) ────────────────────────────────────────
function updateMsHeatmap(symbol, data) {
  const el = document.getElementById(`msheat-${symbol}`);
  if (!el || !data || data.length < 2) return;

  // Use last 7 bars (1mo/1d data → last 7 trading days)
  const slice = data.slice(-8); // need prev close for first return
  const cells = [];
  for (let i = 1; i < slice.length; i++) {
    const prev  = slice[i - 1].close;
    const close = slice[i].close;
    if (!prev || !close) continue;
    const ret = ((close - prev) / prev) * 100;
    // Timestamp → day letter
    const ts  = slice[i].timestamp;
    const day = ts ? ['S','M','T','W','T','F','S'][new Date(ts * 1000).getDay()] : '·';
    cells.push({ ret, day });
  }

  el.innerHTML = cells.map(c => {
    const abs   = Math.abs(c.ret);
    const alpha = Math.min(0.85, 0.12 + abs * 0.18);
    const color = c.ret >= 0
      ? `rgba(16,185,129,${alpha.toFixed(2)})`
      : `rgba(239,68,68,${alpha.toFixed(2)})`;
    const sign  = c.ret >= 0 ? '+' : '';
    return `<span class="mshm-cell" style="background:${color}" title="${c.day}: ${sign}${c.ret.toFixed(2)}%"></span>`;
  }).join('');
}

// ── Fetch prices + sparklines for all watchlist items ────────────────────
async function fetchMySpacePrices() {
  if (watchlistItems.length === 0) return;

  const now        = Date.now();
  const CACHE_TTL  = 25_000; // reuse home price if fresher than 25s

  // Split items: use cached home price vs need fresh fetch
  const needFetch = [];
  watchlistItems.forEach(item => {
    const homeEntry = ALL_HOME_SYMBOLS.find(s => s.symbol === item.symbol);
    if (homeEntry && lastKnownPrices[homeEntry.id] &&
        (now - (lastPriceFetchTime[homeEntry.id] || 0)) < CACHE_TTL) {
      // Fresh home data available — use it directly, skip API call
      const { price, change, pct } = lastKnownPrices[homeEntry.id];
      updateMySpaceCard(item.symbol, price, change, pct);
      checkPriceAlert(item, price);
      wlPrevPrices[item.symbol] = price;
      loadMySpaceSparkline(item.symbol);
    } else {
      needFetch.push(item);
    }
  });

  if (needFetch.length === 0) {
    // All served from cache — just update timestamp
  } else {
    const results = await Promise.allSettled(
      needFetch.map(item => fetchSymbolInfo(item.symbol))
    );
    results.forEach((res, i) => {
      const item = needFetch[i];
      if (res.status === 'fulfilled' && res.value) {
        const { price, change, pct } = res.value;
        updateMySpaceCard(item.symbol, price, change, pct);
        checkPriceAlert(item, price);
        wlPrevPrices[item.symbol] = price;
        const homeEntry = ALL_HOME_SYMBOLS.find(s => s.symbol === item.symbol);
        if (homeEntry) {
          lastKnownPrices[homeEntry.id]    = { price, change, pct };
          lastPriceFetchTime[homeEntry.id] = Date.now();
        }
        loadMySpaceSparkline(item.symbol);
      }
    });
  }

  // Update "last refreshed" timestamp
  const luEl = document.getElementById('ms-last-updated');
  if (luEl) {
    const now = new Date();
    const hh  = String(now.getHours()).padStart(2, '0');
    const mm  = String(now.getMinutes()).padStart(2, '0');
    luEl.textContent = `Updated ${hh}:${mm}`;
  }
}

// ── Add a symbol to watchlist ─────────────────
async function addWatchlistItem(symbol) {
  const clean = symbol.trim().toUpperCase();
  if (!clean) return;

  // Don't add duplicates
  if (watchlistItems.some(i => i.symbol === clean)) {
    // Briefly flash the existing card
    const el = document.getElementById(`msc-${clean}`);
    if (el) { el.style.borderColor = 'rgba(245,158,11,0.7)'; setTimeout(() => { el.style.borderColor = ''; }, 600); }
    return;
  }

  // Show loading state
  const addBtn = document.getElementById('btn-ms-add');
  if (addBtn) addBtn.classList.add('loading');

  const info = await fetchSymbolInfo(clean);

  if (addBtn) addBtn.classList.remove('loading');

  if (!info) {
    // Symbol not found — briefly highlight the input red
    const inp = document.getElementById('ms-add-input');
    if (inp) { inp.style.borderColor = 'var(--red)'; setTimeout(() => { inp.style.borderColor = ''; }, 800); }
    return;
  }

  watchlistItems.push({
    symbol:         clean,
    label:          info.label,
    fmt:            info.fmt,
    alertAbove:     null,
    alertBelow:     null,
    condSymbol:     null,
    condDir:        'above',
    condThreshold:  null,
  });
  saveWatchlist();
  renderWatchlist();

  // Immediately update price for the new item
  updateWatchlistItem(clean, info.price, info.change, info.pct);

  // v2.66: Auto-suggest alert levels from 52W range
  if (info.price && info.price > 0) {
    setTimeout(() => {
      // Try chart data for S/R suggestion, fallback to +/-5%
      const cacheKey = Object.keys(chartDataCache).find(k => k.startsWith(`${clean}|`));
      let sugAbove = null, sugBelow = null;
      if (cacheKey) {
        const d = chartDataCache[cacheKey];
        const closes = d.map(x => x.close).filter(v => v > 0);
        if (closes.length >= 10) {
          const hi = Math.max(...closes);
          const lo = Math.min(...closes);
          sugAbove = Math.round(hi * 100) / 100;
          sugBelow = Math.round(lo * 100) / 100;
        }
      }
      if (!sugAbove) {
        sugAbove = Math.round(info.price * 1.05 * 100) / 100;
        sugBelow = Math.round(info.price * 0.95 * 100) / 100;
      }
      showToast(`💡 ${info.label}: Set alerts at ${sugAbove} ↑ / ${sugBelow} ↓?`, 4000);
    }, 600);
  }

  // Clear input + close suggestions
  const inp = document.getElementById('ms-add-input');
  if (inp) inp.value = '';
  hideSuggestions();
}

// ── Remove a symbol ───────────────────────────
function removeWatchlistItem(symbol) {
  watchlistItems = watchlistItems.filter(i => i.symbol !== symbol);
  firedAlerts.delete(symbol);
  delete wlPrevPrices[symbol];
  saveWatchlist();
  renderWatchlist();
}

// ── Update a single watchlist item's price UI (delegates to My Space card) ─
function updateWatchlistItem(symbol, price, change, pct) {
  updateMySpaceCard(symbol, price, change, pct);
}

// ── Fetch live prices for all watchlist items (delegates to fetchMySpacePrices) ─
async function fetchWatchlistPrices() {
  await fetchMySpacePrices();
}

// ── Smart condition check ─────────────────────
function conditionMet(item) {
  if (!item.condSymbol || item.condThreshold == null) return true;
  let condPrice = null;
  const homeEntry = ALL_HOME_SYMBOLS.find(s => s.symbol === item.condSymbol);
  if (homeEntry && lastKnownPrices[homeEntry.id]) condPrice = lastKnownPrices[homeEntry.id].price;
  else if (item.condSymbol === '^VIX'     && riskPrices['vix']) condPrice = riskPrices['vix'].price;
  else if (item.condSymbol === 'DX-Y.NYB' && riskPrices['dxy']) condPrice = riskPrices['dxy'].price;
  if (condPrice == null) return true; // data unavailable — don't block
  return item.condDir === 'above' ? condPrice >= item.condThreshold : condPrice <= item.condThreshold;
}

// ── Price alert check (dual: above + below, optional AND condition) ────────
function checkPriceAlert(item, currentPrice) {
  const prevPx = wlPrevPrices[item.symbol];
  if (prevPx == null) return;

  // ↑ Above alert
  if (item.alertAbove != null) {
    const key = `${item.symbol}:above:${item.alertAbove}`;
    const snUntil = snoozedAlerts.get(key) || 0;
    if (snUntil > Date.now()) { /* snoozed — skip */ }
    else if (!firedAlerts.has(key) && prevPx < item.alertAbove && currentPrice >= item.alertAbove) {
      if (conditionMet(item)) { firedAlerts.add(key); fireNotification(item, currentPrice, item.alertAbove, true); }
    }
  }

  // ↓ Below alert
  if (item.alertBelow != null) {
    const key = `${item.symbol}:below:${item.alertBelow}`;
    const snUntil = snoozedAlerts.get(key) || 0;
    if (snUntil > Date.now()) { /* snoozed — skip */ }
    else if (!firedAlerts.has(key) && prevPx > item.alertBelow && currentPrice <= item.alertBelow) {
      if (conditionMet(item)) { firedAlerts.add(key); fireNotification(item, currentPrice, item.alertBelow, false); }
    }
  }
}

// ── Fire a desktop notification ───────────────
function fireNotification(item, price, target, isAbove) {
  const dir    = isAbove ? '↑ reached' : '↓ dropped to';
  const pFmt   = fmtPrice(price, item.fmt);
  const tFmt   = fmtPrice(target, item.fmt);
  const title  = `FinanceHub Alert: ${item.label}`;
  const body   = `${item.label} (${item.symbol}) ${dir} ${pFmt} — target was ${tFmt}`;

  if (Notification.permission === 'granted') {
    try { new Notification(title, { body, silent: false }); } catch (_) {}
  }
  playAlertSound();
  // Log to alert history with streak tracking (v2.70)
  if (!window._alertStreaks) window._alertStreaks = {};
  const streakKey = `${item.symbol}:${isAbove ? 'up' : 'dn'}`;
  window._alertStreaks[streakKey] = (window._alertStreaks[streakKey] || 0) + 1;
  const streak = window._alertStreaks[streakKey];
  alertHistory.unshift({ symbol: item.symbol, label: item.label, price, target, isAbove, fmt: item.fmt, time: Date.now(), streak });
  if (alertHistory.length > 30) alertHistory.pop();
  renderAlertHistory();
  // Confetti burst — celebrate the alert trigger (green for bullish, teal for bearish)
  burstConfetti(window.innerWidth - 80, 50);
  console.info('[Alert]', body);

  // External ntfy.sh push alert (v2.37) — fire-and-forget to user's topic
  try {
    const ntfyTopic = (document.getElementById('ms-ntfy-input')?.value?.trim() ||
                       localStorage.getItem('fh-ntfy-topic') || '').trim();
    if (ntfyTopic) {
      fetch(`https://ntfy.sh/${encodeURIComponent(ntfyTopic)}`, {
        method : 'POST',
        headers: {
          'Title'   : title,
          'Priority': 'high',
          'Tags'    : isAbove ? 'chart_with_upwards_trend,green_circle' : 'chart_with_downwards_trend,red_circle',
        },
        body: body,
      }).catch(() => {});
    }
  } catch (_) {}
}

// ══════════════════════════════════════════════
// ALERT SOUND (Web Audio API)
// ══════════════════════════════════════════════
function playAlertSound() {
  try {
    const ctx   = new (window.AudioContext || window.webkitAudioContext)();
    const gain  = ctx.createGain();
    gain.connect(ctx.destination);
    const theme = localStorage.getItem('fh-alert-sound') || 'default';
    const now   = ctx.currentTime;

    if (theme === 'zen') {
      // Soft, low sine tone — calm and unobtrusive
      const osc = ctx.createOscillator();
      osc.connect(gain); osc.type = 'sine';
      osc.frequency.setValueAtTime(330, now);
      osc.frequency.exponentialRampToValueAtTime(440, now + 0.4);
      gain.gain.setValueAtTime(0.14, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.1);
      osc.start(now); osc.stop(now + 1.2);
    } else if (theme === 'terminal') {
      // Two short square-wave blips — Bloomberg-style
      [0, 0.18].forEach(delay => {
        const osc = ctx.createOscillator();
        osc.connect(gain); osc.type = 'square';
        osc.frequency.setValueAtTime(1400, now + delay);
        gain.gain.setValueAtTime(0.07, now + delay);
        gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.10);
        osc.start(now + delay); osc.stop(now + delay + 0.12);
      });
    } else {
      // Default — sine sweep (original)
      const osc = ctx.createOscillator();
      osc.connect(gain); osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(1100, now + 0.12);
      osc.frequency.exponentialRampToValueAtTime(880,  now + 0.28);
      gain.gain.setValueAtTime(0.22, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);
      osc.start(now); osc.stop(now + 0.6);
    }
  } catch (_) {}
}

// ══════════════════════════════════════════════
// PULSE PANEL — Fear & Greed · Macro · Yield Curve · Breadth
// ══════════════════════════════════════════════
let pulseRefreshTimer  = null;
let lastBreadthScore   = 50;

function fgLabel(score) {
  if (score <= 20) return { text: 'Extreme Fear',  color: '#ef4444' };
  if (score <= 40) return { text: 'Fear',           color: '#f97316' };
  if (score <= 60) return { text: 'Neutral',        color: '#eab308' };
  if (score <= 80) return { text: 'Greed',          color: '#84cc16' };
  return                  { text: 'Extreme Greed',  color: '#22c55e' };
}

function calcFearGreed() {
  const comps = [];

  // 1. VIX Level (30% weight)
  const vix = riskPrices['vix']?.price;
  if (vix != null) {
    let s;
    if      (vix > 40) s = 5;
    else if (vix > 30) s = 15 + (40 - vix) * 1.0;
    else if (vix > 25) s = 25 + (30 - vix) * 2.0;
    else if (vix > 20) s = 35 + (25 - vix) * 3.0;
    else if (vix > 15) s = 50 + (20 - vix) * 4.0;
    else               s = 70 + (15 - vix) * 2.0;
    comps.push({ key: 'VIX', v: Math.min(100, Math.max(0, s)), w: 0.30 });
  }

  // 2. S&P 500 Momentum (25% weight)
  const sp = lastKnownPrices['sp500'];
  if (sp != null) {
    const s = 50 + sp.pct * 12;
    comps.push({ key: 'SPX', v: Math.min(100, Math.max(0, s)), w: 0.25 });
  }

  // 3. Market Breadth (25% weight)
  comps.push({ key: 'Breadth', v: lastBreadthScore, w: 0.25 });

  // 4. Safe Haven — Gold (20% weight)
  const gold = lastKnownPrices['gold'];
  if (gold != null) {
    const s = 50 - gold.pct * 8;
    comps.push({ key: 'Gold', v: Math.min(100, Math.max(0, s)), w: 0.20 });
  }

  if (comps.length === 0) return { score: 50, comps: [] };
  const tw    = comps.reduce((a, c) => a + c.w, 0);
  const score = Math.round(comps.reduce((a, c) => a + c.v * c.w, 0) / tw);
  return { score, comps };
}

function drawFearGreedGauge(canvas, score) {
  const W = 200, H = 110;
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, W, H);
  const cx = W / 2, cy = H - 8, R = 80, ARC_W = 14;

  // Colored arc segments
  const segs = [
    { a: Math.PI,       b: Math.PI * 1.2, c: '#ef4444' },
    { a: Math.PI * 1.2, b: Math.PI * 1.4, c: '#f97316' },
    { a: Math.PI * 1.4, b: Math.PI * 1.6, c: '#eab308' },
    { a: Math.PI * 1.6, b: Math.PI * 1.8, c: '#84cc16' },
    { a: Math.PI * 1.8, b: Math.PI * 2.0, c: '#22c55e' },
  ];
  segs.forEach(s => {
    ctx.beginPath();
    ctx.arc(cx, cy, R, s.a, s.b);
    ctx.strokeStyle = s.c; ctx.lineWidth = ARC_W; ctx.stroke();
  });

  // Tick marks
  for (let i = 0; i <= 10; i++) {
    const a = Math.PI + (i / 10) * Math.PI;
    const r1 = R + ARC_W / 2 + 3, r2 = r1 + 4;
    ctx.beginPath();
    ctx.moveTo(cx + r1 * Math.cos(a), cy + r1 * Math.sin(a));
    ctx.lineTo(cx + r2 * Math.cos(a), cy + r2 * Math.sin(a));
    ctx.strokeStyle = 'rgba(255,255,255,0.18)'; ctx.lineWidth = 1; ctx.stroke();
  }

  // Needle
  const angle = Math.PI + (score / 100) * Math.PI;
  const nx = cx + (R - 18) * Math.cos(angle);
  const ny = cy + (R - 18) * Math.sin(angle);
  ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(nx, ny);
  ctx.strokeStyle = 'rgba(255,255,255,0.9)'; ctx.lineWidth = 2.5; ctx.lineCap = 'round'; ctx.stroke();
  // Pivot dot
  ctx.beginPath(); ctx.arc(cx, cy, 5, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255,255,255,0.9)'; ctx.fill();
}

function buildPulsePanel() {
  if (!pulsePanel) return;
  pulsePanel.innerHTML = `
    <div class="analytics-topbar">
      <div class="analytics-title">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="2,12 6,12 8,4 10,20 12,12 14,16 16,12 22,12"/></svg>
        PULSE
      </div>
      <button class="analytics-refresh-btn" id="pulse-refresh-btn">↻ Refresh</button>
    </div>
    <div class="analytics-scroll">
      <div class="pulse-widget">
        <div class="pulse-widget-header">
          <span class="pulse-widget-title">Fear &amp; Greed Index</span>
          <span class="pulse-widget-badge" id="fg-badge" style="background:rgba(255,255,255,0.06);color:var(--text-lo);border:1px solid rgba(255,255,255,0.08)">—</span>
        </div>
        <div class="fg-wrap">
          <div class="fg-canvas-wrap">
            <canvas id="fg-canvas"></canvas>
            <div class="fg-score-center">
              <div class="fg-score-num" id="fg-score">—</div>
              <div class="fg-score-label" id="fg-label">Loading…</div>
            </div>
          </div>
          <div class="fg-components" id="fg-components"></div>
        </div>
      </div>

      <div class="pulse-widget">
        <div class="pulse-widget-header">
          <span class="pulse-widget-title">Macro Dashboard</span>
        </div>
        <div class="macro-grid" id="macro-grid"><div class="analytics-loading">Loading…</div></div>
      </div>

      <div class="pulse-widget">
        <div class="pulse-widget-header">
          <span class="pulse-widget-title">US Treasury Yield Curve</span>
          <span id="yield-status-badge"></span>
        </div>
        <div class="yield-wrap">
          <div style="width:100%;height:90px;position:relative;">
            <canvas id="yield-canvas" style="display:block;width:100%;height:90px;"></canvas>
          </div>
          <div class="yield-labels" id="yield-labels"><div class="analytics-loading">Loading yields…</div></div>
        </div>
      </div>

      <div class="pulse-widget">
        <div class="pulse-widget-header">
          <span class="pulse-widget-title">Market Breadth — S&amp;P 500 Sectors</span>
          <span class="breadth-thrust-badge" id="breadth-thrust-badge" style="display:none"></span>
        </div>
        <div class="breadth-bars" id="breadth-bars"><div class="analytics-loading">Loading sectors…</div></div>
      </div>

      <div class="pulse-widget">
        <div class="pulse-widget-header">
          <span class="pulse-widget-title">Sector Rotation — 1W Performance</span>
        </div>
        <div class="sector-rot-wrap">
          <div class="sr-loading" id="sr-loading">Loading sector ETFs…</div>
          <canvas id="sector-rot-canvas" height="220" style="display:none"></canvas>
        </div>
      </div>
    </div>`;
  document.getElementById('pulse-refresh-btn').addEventListener('click', refreshPulsePanel);
}

async function loadYieldCurve() {
  const yDefs = [
    { sym: '^IRX', mat: '3mo' },
    { sym: '^FVX', mat: '5yr' },
    { sym: '^TNX', mat: '10yr' },
    { sym: '^TYX', mat: '30yr' },
  ];
  const results = await Promise.allSettled(
    yDefs.map(y => fetchPriceV8({ symbol: y.sym, fmt: 'dec' }))
  );
  const yields = [];
  results.forEach((res, i) => {
    if (res.status === 'fulfilled' && res.value) {
      // Yahoo Finance ^IRX/^FVX/^TNX/^TYX report values ×10 (e.g. 52.38 = 5.238%)
      yields.push({ mat: yDefs[i].mat, val: res.value.price / 10 });
    }
  });
  if (yields.length < 2) return;

  const canvas = document.getElementById('yield-canvas');
  if (!canvas) return;
  // Use requestAnimationFrame to ensure parent has rendered and has a real offsetWidth
  await new Promise(resolve => requestAnimationFrame(resolve));
  const W = Math.max(canvas.parentElement?.offsetWidth || 0, 200);
  canvas.width = W; canvas.height = 90;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, W, 90);

  const vals = yields.map(y => y.val);
  const minV = Math.min(...vals) * 0.96, maxV = Math.max(...vals) * 1.04;
  const range = maxV - minV || 0.1;
  const pL = 12, pR = 12, pT = 8, pB = 8;
  const cW = W - pL - pR, cH = 90 - pT - pB;
  const step = cW / (yields.length - 1);
  const xf = i => pL + i * step;
  const yf = v => pT + cH - ((v - minV) / range) * cH;
  const isInverted = yields[0].val > yields[yields.length - 1].val;
  const lc = isInverted ? '#ef4444' : '#a855f7';

  // Grid
  ctx.strokeStyle = 'rgba(255,255,255,0.05)'; ctx.lineWidth = 1;
  [0, 0.33, 0.67, 1].forEach(f => {
    const yy = pT + f * cH;
    ctx.beginPath(); ctx.moveTo(pL, yy); ctx.lineTo(W - pR, yy); ctx.stroke();
  });

  // Area fill
  const grad = ctx.createLinearGradient(0, pT, 0, 90);
  grad.addColorStop(0, isInverted ? 'rgba(239,68,68,0.2)' : 'rgba(168,85,247,0.2)');
  grad.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.beginPath();
  ctx.moveTo(xf(0), yf(yields[0].val));
  yields.forEach((y, i) => { if (i > 0) ctx.lineTo(xf(i), yf(y.val)); });
  ctx.lineTo(xf(yields.length - 1), 90 - pB);
  ctx.lineTo(xf(0), 90 - pB);
  ctx.closePath(); ctx.fillStyle = grad; ctx.fill();

  // Line
  ctx.beginPath();
  ctx.moveTo(xf(0), yf(yields[0].val));
  yields.forEach((y, i) => { if (i > 0) ctx.lineTo(xf(i), yf(y.val)); });
  ctx.strokeStyle = lc; ctx.lineWidth = 2.2; ctx.lineJoin = 'round'; ctx.stroke();

  // Dots
  yields.forEach((y, i) => {
    ctx.beginPath(); ctx.arc(xf(i), yf(y.val), 3.5, 0, Math.PI * 2);
    ctx.fillStyle = lc; ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.6)'; ctx.lineWidth = 1; ctx.stroke();
  });

  // Status badge
  const badge = document.getElementById('yield-status-badge');
  if (badge) {
    badge.className = isInverted ? 'yield-inverted-badge' : 'yield-normal-badge';
    badge.textContent = isInverted ? '⚠ Inverted' : '✓ Normal';
  }

  // Labels
  const labelsEl = document.getElementById('yield-labels');
  if (labelsEl) {
    labelsEl.innerHTML = yields.map(y =>
      `<div class="yield-label-item">
        <span class="yield-label-mat">${y.mat}</span>
        <span class="yield-label-val">${y.val.toFixed(2)}%</span>
      </div>`).join('');
  }
}

async function loadMarketBreadth() {
  const container = document.getElementById('breadth-bars');
  if (!container) return;
  const results = await Promise.allSettled(
    SECTORS.map(s => fetchPriceV8({ symbol: s.symbol, fmt: 'dec' }))
  );
  const rows = SECTORS.map((s, i) => ({
    name: s.name,
    pct: (results[i].status === 'fulfilled' && results[i].value) ? results[i].value.pct : 0,
  }));
  rows.sort((a, b) => b.pct - a.pct);
  const posCount = rows.filter(r => r.pct >= 0).length;
  lastBreadthScore = (posCount / rows.length) * 100;
  window._lastSectorData = rows; // Expose for narrative feed snapshot

  // Breadth Thrust Badge (v2.39)
  const btBadge = document.getElementById('breadth-thrust-badge');
  if (btBadge) {
    if (lastBreadthScore >= 70) {
      btBadge.textContent = '🚀 BREADTH THRUST';
      btBadge.className   = 'breadth-thrust-badge thrust';
      btBadge.style.display = '';
    } else if (lastBreadthScore <= 30) {
      btBadge.textContent = '⚠ BREADTH WEAK';
      btBadge.className   = 'breadth-thrust-badge weak';
      btBadge.style.display = '';
    } else if (lastBreadthScore >= 60) {
      btBadge.textContent = `↑ ${lastBreadthScore.toFixed(0)}% Advancing`;
      btBadge.className   = 'breadth-thrust-badge neutral';
      btBadge.style.display = '';
    } else {
      btBadge.style.display = 'none';
    }
  }

  container.innerHTML = rows.map(r => {
    const up = r.pct >= 0;
    const barW = Math.min(100, Math.abs(r.pct) * 10);
    return `<div class="breadth-row">
      <span class="breadth-name">${r.name}</span>
      <div class="breadth-track"><div class="breadth-fill ${up ? 'up' : 'down'}" style="width:${barW}%"></div></div>
      <span class="breadth-pct ${up ? 'up' : 'down'}">${up ? '+' : ''}${r.pct.toFixed(2)}%</span>
    </div>`;
  }).join('');
}

async function loadMacroPulse() {
  const grid = document.getElementById('macro-grid');
  if (!grid) return;

  const renderCard = (lbl, val, sub, cls) => `
    <div class="macro-card">
      <div class="macro-card-lbl">${lbl}</div>
      <div class="macro-card-val">${val}</div>
      <div class="macro-card-chg ${cls || 'neutral'}">${sub}</div>
    </div>`;

  const renderFredCard = (lbl, d, suffix, decimals, canvasId) => {
    if (!d || d.value == null) return renderCard(lbl, '—', '–', 'neutral');
    const v = d.value.toFixed(decimals ?? 2);
    const chg = d.prev != null ? d.value - d.prev : null;
    const cls = chg == null ? 'neutral' : chg >= 0 ? 'positive' : 'negative';
    const chgStr = chg != null ? `${chg >= 0 ? '+' : ''}${chg.toFixed(decimals ?? 2)}${suffix}` : '–';
    // Include a sparkline canvas if canvasId provided
    const sparkHtml = canvasId
      ? `<canvas class="macro-fred-spark" id="${canvasId}" width="60" height="24"></canvas>`
      : '';
    return `<div class="macro-card macro-card-fred">
      <div class="macro-card-lbl">${lbl}</div>
      <div class="macro-card-val">${v}${suffix}</div>
      <div class="macro-card-chg ${cls}">${chgStr}</div>
      ${sparkHtml}
    </div>`;
  };

  const vix  = riskPrices['vix'];
  const dxy  = riskPrices['dxy'];
  const sp   = lastKnownPrices['sp500'];
  const nq   = lastKnownPrices['nasdaq'];
  const gold = lastKnownPrices['gold'];

  const yahooCard = (lbl, d, fmt, neutral) => {
    if (!d) return renderCard(lbl, '—', '–', 'neutral');
    const pv = fmt === 'int' ? d.price.toLocaleString('en-US', { maximumFractionDigits: 0 }) : d.price.toFixed(2);
    const cls = neutral ? 'neutral' : d.pct >= 0 ? 'positive' : 'negative';
    return renderCard(lbl, pv, `${d.pct >= 0 ? '+' : ''}${d.pct.toFixed(2)}%`, cls);
  };

  grid.innerHTML =
    yahooCard('VIX',     vix,  'dec', true) +
    yahooCard('DXY',     dxy,  'dec', true) +
    renderCard('10Y Yield', '—', '–', 'neutral') +
    yahooCard('S&P 500', sp,   'int', false) +
    yahooCard('NASDAQ',  nq,   'int', false) +
    yahooCard('Gold',    gold, 'dec', false) +
    renderCard('Fed Rate',    '—', 'FRED', 'neutral') +
    renderCard('CPI',         '—', 'FRED', 'neutral') +
    renderCard('Unemployment','—', 'FRED', 'neutral') +
    renderCard('GDP Growth',  '—', 'FRED', 'neutral');

  const [tnx, fedRes, cpiRes, unrateRes, gdpRes, spreadRes] = await Promise.allSettled([
    fetchPriceV8({ symbol: '^TNX', fmt: 'dec' }),
    fetchFredSeries('FEDFUNDS'),
    fetchFredSeries('CPIAUCSL'),
    fetchFredSeries('UNRATE'),
    fetchFredSeries('A191RL1Q225SBEA'),
    fetchFredSeries('T10Y2Y'),
  ]);

  const tnxData = tnx.status    === 'fulfilled' ? tnx.value    : null;
  const fed     = fedRes.status === 'fulfilled' ? fedRes.value : null;
  const cpi     = cpiRes.status === 'fulfilled' ? cpiRes.value : null;
  const unrate  = unrateRes.status === 'fulfilled' ? unrateRes.value : null;
  const gdp     = gdpRes.status    === 'fulfilled' ? gdpRes.value    : null;
  const spread  = spreadRes.status === 'fulfilled' ? spreadRes.value : null;
  // Expose for narrative feed snapshot
  window._lastFredData = { fed, cpi, unrate, gdp, spread, tnxData };

  const tnxCard = tnxData
    ? renderCard('10Y Yield', (tnxData.price / 10).toFixed(2) + '%',
        `${tnxData.pct >= 0 ? '+' : ''}${tnxData.pct.toFixed(2)}%`,
        tnxData.pct >= 0 ? 'positive' : 'negative')
    : renderCard('10Y Yield', '—', '–', 'neutral');

  // Yield spread card — red badge if inverted (negative)
  let spreadCard = renderCard('10Y–2Y Spread', '—', '–', 'neutral');
  if (spread && spread.value != null) {
    const sv  = spread.value;
    const cls = sv < 0 ? 'negative' : 'positive';
    const sub = sv < 0 ? '⚠ INVERTED' : 'Normal';
    spreadCard = renderCard('10Y–2Y Spread', `${sv.toFixed(2)}%`, sub, cls);
  }

  grid.innerHTML =
    yahooCard('VIX',     vix,  'dec', true) +
    yahooCard('DXY',     dxy,  'dec', true) +
    tnxCard +
    spreadCard +
    yahooCard('S&P 500', sp,   'int', false) +
    yahooCard('NASDAQ',  nq,   'int', false) +
    yahooCard('Gold',    gold, 'dec', false) +
    renderFredCard('Fed Rate',    fed,    '%', 2, 'fred-spark-fed') +
    renderFredCard('CPI',         cpi,    '',  1, 'fred-spark-cpi') +
    renderFredCard('Unemployment',unrate, '%', 1, 'fred-spark-unrate') +
    renderFredCard('GDP Growth',  gdp,    '%', 1, 'fred-spark-gdp');

  // ── Fetch FRED history and draw sparklines ─
  const [fedH, cpiH, unrateH, gdpH] = await Promise.allSettled([
    fetchFredHistory('FEDFUNDS', 12),
    fetchFredHistory('CPIAUCSL', 12),
    fetchFredHistory('UNRATE', 12),
    fetchFredHistory('A191RL1Q225SBEA', 8),
  ]);
  const sparkPairs = [
    ['fred-spark-fed',    fedH],
    ['fred-spark-cpi',    cpiH],
    ['fred-spark-unrate', unrateH],
    ['fred-spark-gdp',    gdpH],
  ];
  sparkPairs.forEach(([id, res]) => {
    const vals = res.status === 'fulfilled' ? res.value : null;
    const canvas = document.getElementById(id);
    if (canvas && vals) drawFredSparkline(canvas, vals);
  });

  // ── v2.70: Macro Pulse Scrolling Ticker ───────────────────────────────
  _buildMacroTicker({ vix, dxy, sp, nq, gold, fed, cpi, unrate, gdp, spread, tnxData });

  // ── v2.72: Animated count-up for macro card values ─────────────────────
  requestAnimationFrame(() => {
    document.querySelectorAll('#macro-grid .macro-card-val').forEach(el => {
      const txt = el.textContent;
      const raw = parseFloat(txt.replace(/[,%$+]/g, '').replace(/,/g, ''));
      if (isNaN(raw) || raw === 0) return;
      const suffix = txt.replace(/[\d\s+\-.]/g, '').trim();
      const start  = raw * 0.82;
      const dur    = 700;
      const t0     = performance.now();
      const tick = (now) => {
        const p    = Math.min((now - t0) / dur, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        const cur  = start + (raw - start) * ease;
        const dec  = txt.includes('%') ? 2 : (Math.abs(raw) >= 100 ? 0 : 1);
        el.textContent = (Math.abs(raw) >= 1000
          ? cur.toLocaleString('en-US', { maximumFractionDigits: dec })
          : cur.toFixed(dec)) + suffix;
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = txt;
      };
      requestAnimationFrame(tick);
    });
  });
}

function _buildMacroTicker({ vix, dxy, sp, nq, gold, fed, cpi, unrate, gdp, spread, tnxData }) {
  let tickerEl = document.getElementById('macro-pulse-ticker');
  if (!tickerEl) {
    const pulseEl = document.getElementById('pulse-panel');
    if (!pulseEl) return;
    tickerEl = document.createElement('div');
    tickerEl.id = 'macro-pulse-ticker';
    tickerEl.className = 'macro-pulse-ticker';
    pulseEl.insertBefore(tickerEl, pulseEl.firstChild);
  }
  const items = [];
  const fmtMacro = (label, val, suffix, pct) => {
    if (val == null) return null;
    const cls = pct != null ? (pct >= 0 ? 'mpt-pos' : 'mpt-neg') : 'mpt-neu';
    const pctStr = pct != null ? `<span class="${cls}">${pct >= 0 ? '+' : ''}${pct.toFixed(2)}%</span>` : '';
    return `<span class="mpt-item"><span class="mpt-lbl">${label}</span><span class="mpt-val">${val}${suffix}</span>${pctStr}</span>`;
  };
  if (vix)    items.push(fmtMacro('VIX',     vix.price?.toFixed(2),  '', vix.pct));
  if (dxy)    items.push(fmtMacro('DXY',     dxy.price?.toFixed(2),  '', dxy.pct));
  if (tnxData) items.push(fmtMacro('10Y',    (tnxData.price / 10)?.toFixed(2), '%', tnxData.pct));
  if (sp)     items.push(fmtMacro('S&P',     sp.price?.toLocaleString('en-US', { maximumFractionDigits: 0 }), '', sp.pct));
  if (nq)     items.push(fmtMacro('NQ',      nq.price?.toLocaleString('en-US', { maximumFractionDigits: 0 }), '', nq.pct));
  if (gold)   items.push(fmtMacro('Gold',    gold.price?.toFixed(0), '', gold.pct));
  if (fed?.value != null) items.push(fmtMacro('Fed', fed.value.toFixed(2), '%', null));
  if (cpi?.value != null) items.push(fmtMacro('CPI', cpi.value.toFixed(1), '', null));
  if (unrate?.value != null) items.push(fmtMacro('Unemp', unrate.value.toFixed(1), '%', null));
  if (gdp?.value != null)    items.push(fmtMacro('GDP', (gdp.value >= 0 ? '+' : '') + gdp.value.toFixed(1), '%', null));
  if (spread?.value != null) items.push(fmtMacro('10Y–2Y', spread.value.toFixed(2), '%', null));
  const validItems = items.filter(Boolean);
  if (validItems.length === 0) { tickerEl.style.display = 'none'; return; }
  // Double for seamless scroll
  const content = [...validItems, ...validItems].join('<span class="mpt-sep">·</span>');
  tickerEl.innerHTML = `<div class="mpt-track" id="mpt-track">${content}</div>`;
  tickerEl.style.display = '';
}

async function refreshPulsePanel() {
  await loadMarketBreadth();
  const { score, comps } = calcFearGreed();
  const lbl = fgLabel(score);

  const scoreEl = document.getElementById('fg-score');
  const labelEl = document.getElementById('fg-label');
  const badgeEl = document.getElementById('fg-badge');
  const canvas  = document.getElementById('fg-canvas');

  if (scoreEl) scoreEl.textContent = score;
  if (labelEl) { labelEl.textContent = lbl.text; labelEl.style.color = lbl.color; }
  if (badgeEl) {
    badgeEl.textContent = lbl.text;
    badgeEl.style.background = lbl.color + '22';
    badgeEl.style.color = lbl.color;
    badgeEl.style.border = `1px solid ${lbl.color}44`;
  }
  if (canvas) drawFearGreedGauge(canvas, score);

  const compEl = document.getElementById('fg-components');
  if (compEl && comps.length > 0) {
    compEl.innerHTML = comps.map(c => {
      const cl = fgLabel(c.v);
      return `<div class="fg-comp">
        <div class="fg-comp-val" style="color:${cl.color}">${Math.round(c.v)}</div>
        <div class="fg-comp-lbl">${c.key}</div>
      </div>`;
    }).join('');
  }

  await Promise.allSettled([loadYieldCurve(), loadMacroPulse(), loadSectorRotation()]);
}

function startPulseRefresh() {
  refreshPulsePanel();
  clearInterval(pulseRefreshTimer);
  pulseRefreshTimer = setInterval(refreshPulsePanel, 60_000);
}

function stopPulseRefresh() {
  clearInterval(pulseRefreshTimer);
  pulseRefreshTimer = null;
}

// ── Sector Rotation Chart — 1W performance of 11 sector ETFs (v2.36) ─────
const SECTOR_ETFS = [
  { sym: 'XLK',  label: 'Tech',        color: '#818cf8' },
  { sym: 'XLV',  label: 'Health',      color: '#34d399' },
  { sym: 'XLF',  label: 'Finance',     color: '#60a5fa' },
  { sym: 'XLC',  label: 'Comm Svcs',   color: '#a78bfa' },
  { sym: 'XLY',  label: 'Cons Disc',   color: '#f472b6' },
  { sym: 'XLI',  label: 'Industrial',  color: '#fbbf24' },
  { sym: 'XLP',  label: 'Cons Stpl',   color: '#6ee7b7' },
  { sym: 'XLE',  label: 'Energy',      color: '#fb923c' },
  { sym: 'XLB',  label: 'Materials',   color: '#a3e635' },
  { sym: 'XLRE', label: 'Real Estate', color: '#38bdf8' },
  { sym: 'XLU',  label: 'Utilities',   color: '#94a3b8' },
];

// v2.77: Sector pills in Daily Brief row
function updateSectorPills(entries) {
  const row = document.getElementById('db-sector-row');
  if (!row || !entries || entries.length === 0) return;
  const maxAbs = Math.max(...entries.map(e => Math.abs(e.pct)), 0.1);
  const sortedEntries = [...entries].sort((a, b) => b.pct - a.pct);
  row.innerHTML = `
    <span class="dsr-label">Sectors</span>
    ${sortedEntries.map(e => {
      const isPos  = e.pct >= 0;
      const alpha  = Math.min(0.85, 0.18 + (Math.abs(e.pct) / maxAbs) * 0.65);
      const bg     = isPos ? `rgba(16,185,129,${alpha.toFixed(2)})` : `rgba(239,68,68,${alpha.toFixed(2)})`;
      const pctStr = `${isPos ? '+' : ''}${e.pct.toFixed(1)}%`;
      return `<span class="dsr-pill ${isPos ? 'dsr-up' : 'dsr-dn'}" style="--dsr-bg:${bg}" title="${e.sym}: ${pctStr}">
        <span class="dsr-name">${e.label}</span>
        <span class="dsr-pct">${pctStr}</span>
      </span>`;
    }).join('')}`;
}

async function loadSectorRotation() {
  const loadEl   = document.getElementById('sr-loading');
  const canvas   = document.getElementById('sector-rot-canvas');
  if (!canvas) return;

  if (loadEl) { loadEl.style.display = ''; loadEl.textContent = 'Loading sector ETFs…'; }
  canvas.style.display = 'none';

  try {
    const results = await Promise.allSettled(
      SECTOR_ETFS.map(s => fetchChartData(s.sym, '5d', '1h'))
    );

    const entries = [];
    results.forEach((res, i) => {
      if (res.status !== 'fulfilled' || !res.value || res.value.length < 2) return;
      const data  = res.value;
      const first = data[0].close;
      const last  = data[data.length - 1].close;
      if (!first || !last) return;
      const pct = ((last - first) / first) * 100;
      entries.push({ ...SECTOR_ETFS[i], pct });
    });

    if (entries.length === 0) {
      if (loadEl) { loadEl.textContent = 'No sector data available.'; }
      return;
    }

    // Sort by performance desc
    entries.sort((a, b) => b.pct - a.pct);

    // v2.77: update sector pills row in Daily Brief
    updateSectorPills(entries);

    // Draw chart
    if (loadEl) loadEl.style.display = 'none';
    canvas.style.display = 'block';

    const dpr   = window.devicePixelRatio || 1;
    const W     = canvas.parentElement.clientWidth || 440;
    const H     = 220;
    canvas.width  = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width  = W + 'px';
    canvas.style.height = H + 'px';
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, W, H);

    const labelW  = 70;
    const valW    = 46;
    const barAreaW = W - labelW - valW - 10;
    const rowH    = Math.floor((H - 10) / entries.length);
    const barH    = Math.max(10, rowH - 5);
    const maxAbs  = Math.max(...entries.map(e => Math.abs(e.pct)), 0.01);
    const zeroX   = labelW + barAreaW * 0.5;

    // Zero line
    ctx.strokeStyle = 'rgba(100,116,139,0.25)';
    ctx.lineWidth   = 1;
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(zeroX, 4);
    ctx.lineTo(zeroX, H - 4);
    ctx.stroke();
    ctx.setLineDash([]);

    entries.forEach((e, i) => {
      const y      = 5 + i * rowH;
      const isPos  = e.pct >= 0;
      const frac   = Math.abs(e.pct) / maxAbs;
      const bw     = frac * (barAreaW * 0.5 - 2);
      const barX   = isPos ? zeroX : zeroX - bw;

      // Background
      ctx.fillStyle = 'rgba(100,116,139,0.06)';
      ctx.beginPath();
      ctx.roundRect(labelW, y, barAreaW, barH, 2);
      ctx.fill();

      // Bar
      const barColor = isPos ? 'rgba(16,185,129,' : 'rgba(239,68,68,';
      ctx.fillStyle = barColor + '0.7)';
      ctx.beginPath();
      ctx.roundRect(barX, y + 1, Math.max(2, bw), barH - 2, 2);
      ctx.fill();

      // Label (left)
      ctx.fillStyle = 'rgba(148,163,184,0.85)';
      ctx.font      = `500 9px/1 "Inter", system-ui, sans-serif`;
      ctx.textAlign = 'right';
      ctx.fillText(e.label.toUpperCase(), labelW - 4, y + barH - 3);

      // Value (right)
      const pctStr = `${isPos ? '+' : ''}${e.pct.toFixed(1)}%`;
      ctx.fillStyle = isPos ? '#10b981' : '#ef4444';
      ctx.font      = `700 9px/1 "Inter", system-ui, sans-serif`;
      ctx.textAlign = 'left';
      ctx.fillText(pctStr, labelW + barAreaW + 4, y + barH - 3);
    });
  } catch (err) {
    if (loadEl) { loadEl.style.display = ''; loadEl.textContent = 'Could not load sector data.'; }
  }
}

// ══════════════════════════════════════════════
// CALENDAR PANEL — Earnings + Macro Events
// ══════════════════════════════════════════════
let _calActiveTab = 'earnings';   // 'earnings' | 'macro'

function buildCalendarPanel() {
  if (!calendarPanel) return;
  calendarPanel.innerHTML = `
    <div class="analytics-topbar">
      <div class="analytics-title">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2"/>
          <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
          <line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
        CALENDAR
      </div>
      <button class="analytics-refresh-btn" id="cal-refresh-btn">↻ Refresh</button>
    </div>
    <div class="cal-tab-row">
      <button class="cal-tab active" data-cal-tab="earnings">📋 Earnings</button>
      <button class="cal-tab" data-cal-tab="macro">🏛 Macro Events</button>
    </div>
    <div class="analytics-scroll" id="cal-scroll">
      <div class="analytics-loading">Loading…</div>
    </div>`;

  calendarPanel.querySelectorAll('.cal-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      _calActiveTab = btn.dataset.calTab;
      calendarPanel.querySelectorAll('.cal-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      if (_calActiveTab === 'earnings') loadEarningsCalendar();
      else loadMacroCalendar();
    });
  });
  document.getElementById('cal-refresh-btn').addEventListener('click', () => {
    if (_calActiveTab === 'earnings') loadEarningsCalendar();
    else loadMacroCalendar();
  });
  loadEarningsCalendar();
}

function loadEarningsCalendar() {
  const scroll = document.getElementById('cal-scroll');
  if (!scroll) return;

  const now      = new Date();
  const todayStr = now.toISOString().slice(0, 10);

  // Curated 2026 earnings calendar — actual reported/expected dates
  // Q1 season: Mar–Apr 2026 | Q2 season: Jul–Aug 2026
  const EARNINGS_2026 = [
    // March 2026 (end of Q4 2025 reporting)
    { sym: 'TGT',   name: 'Target Corp.',      date: '2026-03-04', time: 'bmo', est: '$2.18', sector: 'Retail'     },
    { sym: 'CRM',   name: 'Salesforce',        date: '2026-03-04', time: 'amc', est: '$2.65', sector: 'Tech'       },
    { sym: 'COST',  name: 'Costco',            date: '2026-03-05', time: 'amc', est: '$4.11', sector: 'Retail'     },
    { sym: 'AVGO',  name: 'Broadcom',          date: '2026-03-06', time: 'amc', est: '$1.48', sector: 'Semis'      },
    { sym: 'ORCL',  name: 'Oracle',            date: '2026-03-09', time: 'amc', est: '$1.63', sector: 'Tech'       },
    { sym: 'ADBE',  name: 'Adobe',             date: '2026-03-12', time: 'amc', est: '$5.08', sector: 'Tech'       },
    { sym: 'DIS',   name: 'Walt Disney',       date: '2026-03-12', time: 'bmo', est: '$1.20', sector: 'Media'      },
    { sym: 'FDX',   name: 'FedEx',             date: '2026-03-17', time: 'amc', est: '$4.80', sector: 'Transport'  },
    { sym: 'NKE',   name: 'Nike',              date: '2026-03-19', time: 'amc', est: '$0.74', sector: 'Consumer'   },
    { sym: 'GIS',   name: 'General Mills',     date: '2026-03-26', time: 'bmo', est: '$1.04', sector: 'Consumer'   },
    // April 2026 — Q1 2026 Earnings Season
    { sym: 'JPM',   name: 'JPMorgan Chase',    date: '2026-04-14', time: 'bmo', est: '$4.62', sector: 'Banking'    },
    { sym: 'WFC',   name: 'Wells Fargo',       date: '2026-04-14', time: 'bmo', est: '$1.34', sector: 'Banking'    },
    { sym: 'C',     name: 'Citigroup',         date: '2026-04-14', time: 'bmo', est: '$1.70', sector: 'Banking'    },
    { sym: 'GS',    name: 'Goldman Sachs',     date: '2026-04-15', time: 'bmo', est: '$9.86', sector: 'Banking'    },
    { sym: 'BAC',   name: 'Bank of America',   date: '2026-04-15', time: 'bmo', est: '$0.88', sector: 'Banking'    },
    { sym: 'MS',    name: 'Morgan Stanley',    date: '2026-04-16', time: 'bmo', est: '$2.31', sector: 'Banking'    },
    { sym: 'NFLX',  name: 'Netflix',           date: '2026-04-21', time: 'amc', est: '$5.28', sector: 'Streaming'  },
    { sym: 'TSLA',  name: 'Tesla',             date: '2026-04-22', time: 'amc', est: '$0.52', sector: 'EV/Auto'    },
    { sym: 'GOOGL', name: 'Alphabet',          date: '2026-04-28', time: 'amc', est: '$2.14', sector: 'Tech'       },
    { sym: 'META',  name: 'Meta Platforms',    date: '2026-04-29', time: 'amc', est: '$6.83', sector: 'Tech'       },
    { sym: 'MSFT',  name: 'Microsoft',         date: '2026-04-29', time: 'amc', est: '$3.24', sector: 'Tech'       },
    { sym: 'AMZN',  name: 'Amazon',            date: '2026-04-30', time: 'amc', est: '$1.37', sector: 'Tech'       },
    { sym: 'AAPL',  name: 'Apple',             date: '2026-04-30', time: 'amc', est: '$1.63', sector: 'Tech'       },
    // May 2026
    { sym: 'NVDA',  name: 'NVIDIA',            date: '2026-05-20', time: 'amc', est: '$0.88', sector: 'Semis'      },
    { sym: 'COST',  name: 'Costco',            date: '2026-05-28', time: 'amc', est: '$4.29', sector: 'Retail'     },
  ];

  const DAY_NAMES   = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const MONTH_NAMES = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  // Split: upcoming (today or future) vs recently past (last 7 days)
  const cutoff = new Date(now); cutoff.setDate(cutoff.getDate() - 7);
  const cutoffStr = cutoff.toISOString().slice(0, 10);

  const upcoming = EARNINGS_2026.filter(e => e.date >= todayStr);
  const recent   = EARNINGS_2026.filter(e => e.date >= cutoffStr && e.date < todayStr);

  // Group upcoming by date
  const byDate = {};
  upcoming.forEach(e => { if (!byDate[e.date]) byDate[e.date] = []; byDate[e.date].push(e); });
  const sortedDates = Object.keys(byDate).sort();

  const SECTOR_COLORS = {
    Tech:'#7c3aed', Banking:'#0ea5e9', Retail:'#f59e0b', Semis:'#10b981',
    Streaming:'#ef4444', 'EV/Auto':'#22d3ee', Consumer:'#a78bfa', Media:'#fb923c',
    Transport:'#64748b',
  };

  const upcomingHtml = sortedDates.map(dateStr => {
    const d        = new Date(dateStr + 'T12:00:00');
    const isToday  = dateStr === todayStr;
    const dayLabel = `${DAY_NAMES[d.getDay()]} ${MONTH_NAMES[d.getMonth()]} ${d.getDate()}`;
    const daysAway = Math.round((d - now) / 86400000);
    const countdown = daysAway === 0 ? 'Today' : daysAway === 1 ? 'Tomorrow' : `in ${daysAway}d`;
    const tiles = byDate[dateStr].map(e => {
      const sc = SECTOR_COLORS[e.sector] || '#64748b';
      return `<div class="earnings-tile">
        <span class="earnings-tile-sector" style="background:${sc}22;color:${sc};border:1px solid ${sc}44">${e.sector}</span>
        <div class="earnings-tile-sym">${e.sym}</div>
        <div class="earnings-tile-name">${e.name}</div>
        <div class="earnings-tile-est">EPS est. ${e.est}</div>
        <div class="earnings-tile-time ${e.time}">${e.time === 'bmo' ? '☀ Pre-Mkt' : '🌙 After Close'}</div>
      </div>`;
    }).join('');
    return `<div>
      <div class="earnings-day-header ${isToday ? 'today' : ''}">
        ${isToday ? '⬤ ' : ''}${dayLabel}
        <span class="earnings-day-countdown ${isToday ? 'today' : ''}">${countdown}</span>
      </div>
      <div class="earnings-tiles">${tiles}</div>
    </div>`;
  }).join('');

  const recentHtml = recent.length > 0 ? `
    <div class="earnings-past-header">↩ Recently Reported (last 7 days)</div>
    <div class="earnings-tiles past-tiles">${recent.map(e => `
      <div class="earnings-tile past">
        <div class="earnings-tile-sym">${e.sym}</div>
        <div class="earnings-tile-name">${e.name}</div>
        <div class="earnings-tile-time ${e.time}">${e.time === 'bmo' ? '☀ Pre-Mkt' : '🌙 After Close'}</div>
      </div>`).join('')}
    </div>` : '';

  scroll.innerHTML = `
    <div class="earnings-intro">📋 Major earnings — 2026 Q1 season. EPS estimates are consensus forecasts.</div>
    <div class="earnings-week">${upcomingHtml || '<div class="analytics-loading">No upcoming earnings in the next 3 months.</div>'}${recentHtml}</div>`;
}

// ── Macro Economic Events Calendar ────────────────────────────────────────
function loadMacroCalendar() {
  const scroll = document.getElementById('cal-scroll');
  if (!scroll) return;
  scroll.innerHTML = '<div class="analytics-loading">Loading macro events…</div>';

  const now = new Date();

  // Curated 2026 economic event calendar
  const MACRO_EVENTS = [
    // ─── FED FOMC ──────────────────────────────────────────────────────────
    { date: '2026-03-19', name: 'FOMC Rate Decision',      cat: 'FED',        imp: 3, note: 'Interest rate decision + press conference', impact: 'USD · Equities · Bonds' },
    { date: '2026-04-30', name: 'FOMC Rate Decision',      cat: 'FED',        imp: 3, note: 'Interest rate decision + press conference', impact: 'USD · Equities · Bonds' },
    { date: '2026-06-18', name: 'FOMC Rate Decision',      cat: 'FED',        imp: 3, note: 'Interest rate decision + press conference', impact: 'USD · Equities · Bonds' },
    { date: '2026-07-30', name: 'FOMC Rate Decision',      cat: 'FED',        imp: 3, note: 'Interest rate decision + press conference', impact: 'USD · Equities · Bonds' },
    { date: '2026-09-17', name: 'FOMC Rate Decision',      cat: 'FED',        imp: 3, note: 'Interest rate decision + press conference', impact: 'USD · Equities · Bonds' },
    { date: '2026-11-05', name: 'FOMC Rate Decision',      cat: 'FED',        imp: 3, note: 'Interest rate decision + press conference', impact: 'USD · Equities · Bonds' },
    { date: '2026-12-17', name: 'FOMC Rate Decision',      cat: 'FED',        imp: 3, note: 'Interest rate decision + press conference', impact: 'USD · Equities · Bonds' },
    // ─── CPI ───────────────────────────────────────────────────────────────
    { date: '2026-03-12', name: 'CPI (Feb)',               cat: 'INFLATION',  imp: 3, note: 'Consumer Price Index YoY — 8:30 AM ET',   impact: 'USD · Bonds · Gold' },
    { date: '2026-04-10', name: 'CPI (Mar)',               cat: 'INFLATION',  imp: 3, note: 'Consumer Price Index YoY — 8:30 AM ET',   impact: 'USD · Bonds · Gold' },
    { date: '2026-05-13', name: 'CPI (Apr)',               cat: 'INFLATION',  imp: 3, note: 'Consumer Price Index YoY — 8:30 AM ET',   impact: 'USD · Bonds · Gold' },
    { date: '2026-06-11', name: 'CPI (May)',               cat: 'INFLATION',  imp: 3, note: 'Consumer Price Index YoY — 8:30 AM ET',   impact: 'USD · Bonds · Gold' },
    { date: '2026-07-14', name: 'CPI (Jun)',               cat: 'INFLATION',  imp: 3, note: 'Consumer Price Index YoY — 8:30 AM ET',   impact: 'USD · Bonds · Gold' },
    { date: '2026-08-12', name: 'CPI (Jul)',               cat: 'INFLATION',  imp: 3, note: 'Consumer Price Index YoY — 8:30 AM ET',   impact: 'USD · Bonds · Gold' },
    { date: '2026-09-10', name: 'CPI (Aug)',               cat: 'INFLATION',  imp: 3, note: 'Consumer Price Index YoY — 8:30 AM ET',   impact: 'USD · Bonds · Gold' },
    { date: '2026-10-13', name: 'CPI (Sep)',               cat: 'INFLATION',  imp: 3, note: 'Consumer Price Index YoY — 8:30 AM ET',   impact: 'USD · Bonds · Gold' },
    // ─── PCE ───────────────────────────────────────────────────────────────
    { date: '2026-02-28', name: 'PCE Inflation (Jan)',     cat: 'INFLATION',  imp: 3, note: 'Fed\'s preferred inflation gauge — 8:30 AM ET', impact: 'USD · Equities' },
    { date: '2026-03-27', name: 'PCE Inflation (Feb)',     cat: 'INFLATION',  imp: 3, note: 'Fed\'s preferred inflation gauge — 8:30 AM ET', impact: 'USD · Equities' },
    { date: '2026-04-25', name: 'PCE Inflation (Mar)',     cat: 'INFLATION',  imp: 3, note: 'Fed\'s preferred inflation gauge — 8:30 AM ET', impact: 'USD · Equities' },
    { date: '2026-05-29', name: 'PCE Inflation (Apr)',     cat: 'INFLATION',  imp: 3, note: 'Fed\'s preferred inflation gauge — 8:30 AM ET', impact: 'USD · Equities' },
    { date: '2026-06-26', name: 'PCE Inflation (May)',     cat: 'INFLATION',  imp: 3, note: 'Fed\'s preferred inflation gauge — 8:30 AM ET', impact: 'USD · Equities' },
    // ─── NFP (Jobs) ────────────────────────────────────────────────────────
    { date: '2026-03-07', name: 'Nonfarm Payrolls (Feb)', cat: 'EMPLOYMENT', imp: 3, note: 'Jobs added, unemployment rate — 8:30 AM ET', impact: 'USD · Equities · Bonds' },
    { date: '2026-04-04', name: 'Nonfarm Payrolls (Mar)', cat: 'EMPLOYMENT', imp: 3, note: 'Jobs added, unemployment rate — 8:30 AM ET', impact: 'USD · Equities · Bonds' },
    { date: '2026-05-02', name: 'Nonfarm Payrolls (Apr)', cat: 'EMPLOYMENT', imp: 3, note: 'Jobs added, unemployment rate — 8:30 AM ET', impact: 'USD · Equities · Bonds' },
    { date: '2026-06-05', name: 'Nonfarm Payrolls (May)', cat: 'EMPLOYMENT', imp: 3, note: 'Jobs added, unemployment rate — 8:30 AM ET', impact: 'USD · Equities · Bonds' },
    { date: '2026-07-03', name: 'Nonfarm Payrolls (Jun)', cat: 'EMPLOYMENT', imp: 3, note: 'Jobs added, unemployment rate — 8:30 AM ET', impact: 'USD · Equities · Bonds' },
    { date: '2026-08-07', name: 'Nonfarm Payrolls (Jul)', cat: 'EMPLOYMENT', imp: 3, note: 'Jobs added, unemployment rate — 8:30 AM ET', impact: 'USD · Equities · Bonds' },
    { date: '2026-09-04', name: 'Nonfarm Payrolls (Aug)', cat: 'EMPLOYMENT', imp: 3, note: 'Jobs added, unemployment rate — 8:30 AM ET', impact: 'USD · Equities · Bonds' },
    // ─── GDP ───────────────────────────────────────────────────────────────
    { date: '2026-02-27', name: 'GDP Q4 2025 (Prelim)',   cat: 'GDP',        imp: 2, note: 'Second GDP estimate for Q4 2025 — 8:30 AM ET', impact: 'USD · Equities' },
    { date: '2026-03-27', name: 'GDP Q4 2025 (Final)',    cat: 'GDP',        imp: 2, note: 'Final GDP estimate for Q4 2025 — 8:30 AM ET',  impact: 'USD · Equities' },
    { date: '2026-04-30', name: 'GDP Q1 2026 (Advance)',  cat: 'GDP',        imp: 3, note: 'First GDP estimate for Q1 2026 — 8:30 AM ET', impact: 'USD · Equities · Bonds' },
    { date: '2026-05-28', name: 'GDP Q1 2026 (Second)',   cat: 'GDP',        imp: 2, note: 'Second GDP estimate for Q1 2026 — 8:30 AM ET', impact: 'USD · Equities' },
    { date: '2026-07-30', name: 'GDP Q2 2026 (Advance)',  cat: 'GDP',        imp: 3, note: 'First GDP estimate for Q2 2026 — 8:30 AM ET', impact: 'USD · Equities · Bonds' },
    // ─── Retail Sales ───────────────────────────────────────────────────────
    { date: '2026-03-17', name: 'Retail Sales (Feb)',     cat: 'CONSUMER',   imp: 2, note: 'Monthly retail spending — 8:30 AM ET',       impact: 'USD · Equities' },
    { date: '2026-04-16', name: 'Retail Sales (Mar)',     cat: 'CONSUMER',   imp: 2, note: 'Monthly retail spending — 8:30 AM ET',       impact: 'USD · Equities' },
    { date: '2026-05-15', name: 'Retail Sales (Apr)',     cat: 'CONSUMER',   imp: 2, note: 'Monthly retail spending — 8:30 AM ET',       impact: 'USD · Equities' },
    // ─── Jackson Hole ───────────────────────────────────────────────────────
    { date: '2026-08-27', name: 'Jackson Hole Symposium', cat: 'FED',        imp: 3, note: 'Fed Chair annual speech — watch for policy hints', impact: 'USD · Equities · Bonds · Gold' },
  ].filter(e => new Date(e.date + 'T12:00:00') >= new Date(now.toISOString().slice(0,10) + 'T00:00:00'))
   .sort((a, b) => a.date.localeCompare(b.date));

  const CAT_COLORS = {
    FED:        'var(--purple)',
    INFLATION:  'var(--red)',
    EMPLOYMENT: 'var(--cyan)',
    GDP:        'var(--green)',
    CONSUMER:   '#f59e0b',
  };
  const IMP_DOTS = ['', '⬤', '⬤⬤', '⬤⬤⬤'];

  const html = MACRO_EVENTS.map(ev => {
    const evDate = new Date(ev.date + 'T12:00:00');
    const msUntil = evDate - now;
    const daysUntil = Math.ceil(msUntil / 86_400_000);
    const isToday  = ev.date === now.toISOString().slice(0,10);
    const isPast   = msUntil < 0;
    let countdown = '';
    if (isToday)       countdown = '<span class="mac-countdown today">TODAY</span>';
    else if (isPast)   countdown = '<span class="mac-countdown past">PAST</span>';
    else if (daysUntil <= 7)  countdown = `<span class="mac-countdown soon">${daysUntil}d</span>`;
    else               countdown = `<span class="mac-countdown future">${daysUntil}d</span>`;
    const catColor = CAT_COLORS[ev.cat] || 'var(--text-lo)';
    return `<div class="mac-event ${isPast ? 'mac-past' : ''}">
      <div class="mac-event-left">
        <div class="mac-event-date">${ev.date.slice(5).replace('-','/')}</div>
        ${countdown}
      </div>
      <div class="mac-event-body">
        <div class="mac-event-header">
          <span class="mac-event-cat" style="color:${catColor}">${ev.cat}</span>
          <span class="mac-imp" title="Importance" style="color:${catColor}; opacity:0.6">${IMP_DOTS[ev.imp] || ''}</span>
        </div>
        <div class="mac-event-name">${ev.name}</div>
        <div class="mac-event-note">${ev.note}</div>
        <div class="mac-event-impact">📌 ${ev.impact}</div>
      </div>
    </div>`;
  }).join('');

  scroll.innerHTML = `
    <div class="mac-intro">🏛 Key economic events — dates are approximate and subject to government confirmation. All times ET.</div>
    <div class="mac-legend">
      <span style="color:var(--purple)">■ FED</span>
      <span style="color:var(--red)">■ INFLATION</span>
      <span style="color:var(--cyan)">■ EMPLOYMENT</span>
      <span style="color:var(--green)">■ GDP</span>
      <span style="color:#f59e0b">■ CONSUMER</span>
    </div>
    <div class="mac-event-list">${html || '<div class="analytics-loading">No upcoming events.</div>'}</div>`;
}

// ══════════════════════════════════════════════
// SENTIMENT PANEL — Reddit/WSB + Correlation Matrix
// ══════════════════════════════════════════════
let sentimentRefreshTimer = null;

function buildSentimentPanel() {
  if (!sentimentPanel) return;
  sentimentPanel.innerHTML = `
    <div class="analytics-topbar">
      <div class="analytics-title">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
        SENTIMENT
      </div>
      <button class="analytics-refresh-btn" id="sent-refresh-btn">↻ Refresh</button>
    </div>
    <div class="analytics-scroll">
      <div class="pulse-widget">
        <div class="pulse-widget-header">
          <span class="pulse-widget-title">Market Mood</span>
          <span class="pulse-widget-sub" id="sent-mood-time"></span>
        </div>
        <div class="sent-mood-grid">
          <div class="sent-mood-card">
            <div class="sent-mood-icon">📊</div>
            <div class="sent-mood-label">VIX</div>
            <div class="sent-mood-val" id="sm-vix">—</div>
            <div class="sent-mood-status" id="sm-vix-s">—</div>
          </div>
          <div class="sent-mood-card">
            <div class="sent-mood-icon">📈</div>
            <div class="sent-mood-label">S&P 500</div>
            <div class="sent-mood-val" id="sm-spx">—</div>
            <div class="sent-mood-status" id="sm-spx-s">—</div>
          </div>
          <div class="sent-mood-card">
            <div class="sent-mood-icon">💵</div>
            <div class="sent-mood-label">DXY</div>
            <div class="sent-mood-val" id="sm-dxy">—</div>
            <div class="sent-mood-status" id="sm-dxy-s">—</div>
          </div>
          <div class="sent-mood-card">
            <div class="sent-mood-icon">₿</div>
            <div class="sent-mood-label">BTC</div>
            <div class="sent-mood-val" id="sm-btc">—</div>
            <div class="sent-mood-status" id="sm-btc-s">—</div>
          </div>
        </div>
      </div>
      <div class="pulse-widget">
        <div class="wsb-header">
          <div class="wsb-logo">r/</div>
          <span class="wsb-title">WallStreetBets — Trending</span>
          <span class="wsb-sub" id="wsb-post-count"></span>
        </div>
        <div class="wsb-bars" id="wsb-tickers"><div class="wsb-loading">Fetching Reddit data…</div></div>
      </div>
      <div class="pulse-widget">
        <div class="pulse-widget-header">
          <span class="pulse-widget-title">Crypto Fear &amp; Greed Index</span>
          <span class="pulse-widget-sub">Alternative.me · Updated daily</span>
        </div>
        <div id="cfg-widget-body"><div class="wsb-loading">Loading…</div></div>
      </div>
      <div class="pulse-widget">
        <div class="pulse-widget-header">
          <span class="pulse-widget-title">Price Correlation Matrix (1 Month)</span>
        </div>
        <div id="corr-container"><div class="corr-loading">Loading chart data…</div></div>
      </div>
    </div>`;
  document.getElementById('sent-refresh-btn').addEventListener('click', refreshSentimentPanel);
}

async function loadSentimentMood() {
  try {
    const [vixRes, spxRes, dxyRes, btcRes] = await Promise.allSettled([
      fetchPriceV8({ symbol: '^VIX',     id: '^VIX',     fmt: 'dec' }),
      fetchPriceV8({ symbol: '^GSPC',    id: '^GSPC',    fmt: 'int' }),
      fetchPriceV8({ symbol: 'DX-Y.NYB', id: 'DX-Y.NYB', fmt: 'dec' }),
      fetchPriceV8({ symbol: 'BTC-USD',  id: 'BTC-USD',  fmt: 'int' }),
    ]);

    const vixEl  = document.getElementById('sm-vix');
    const vixSEl = document.getElementById('sm-vix-s');
    if (vixEl && vixRes.status === 'fulfilled' && vixRes.value) {
      const v = vixRes.value;
      vixEl.textContent = v.price != null ? v.price.toFixed(1) : '—';
      const lvl = v.price < 15 ? ['Calm',      '#10b981']
                : v.price < 20 ? ['Low Fear',  '#22c55e']
                : v.price < 30 ? ['Elevated',  '#f59e0b']
                :                ['High Fear', '#ef4444'];
      if (vixSEl) { vixSEl.textContent = lvl[0]; vixSEl.style.color = lvl[1]; }
    }

    const spxEl  = document.getElementById('sm-spx');
    const spxSEl = document.getElementById('sm-spx-s');
    if (spxEl && spxRes.status === 'fulfilled' && spxRes.value) {
      const v = spxRes.value;
      spxEl.textContent = v.price != null ? fmtPrice(v.price, 'int') : '—';
      spxEl.style.color = v.pct != null ? (v.pct >= 0 ? '#10b981' : '#ef4444') : '';
      const mood = v.pct == null ? ['—',        '#94a3b8']
                 : v.pct >  1   ? ['Bullish',   '#10b981']
                 : v.pct >  0   ? ['Mild Bull', '#22c55e']
                 : v.pct > -1   ? ['Mild Bear', '#f59e0b']
                 :                ['Bearish',   '#ef4444'];
      if (spxSEl) { spxSEl.textContent = mood[0]; spxSEl.style.color = mood[1]; }
    }

    const dxyEl  = document.getElementById('sm-dxy');
    const dxySEl = document.getElementById('sm-dxy-s');
    if (dxyEl && dxyRes.status === 'fulfilled' && dxyRes.value) {
      const v = dxyRes.value;
      dxyEl.textContent = v.price != null ? v.price.toFixed(2) : '—';
      const mood = v.pct == null  ? ['—',          '#94a3b8']
                 : v.pct >  0.5   ? ['Strong USD', '#ef4444']
                 : v.pct < -0.5   ? ['Weak USD',   '#10b981']
                 :                  ['Stable',     '#94a3b8'];
      if (dxySEl) { dxySEl.textContent = mood[0]; dxySEl.style.color = mood[1]; }
    }

    const btcEl  = document.getElementById('sm-btc');
    const btcSEl = document.getElementById('sm-btc-s');
    if (btcEl && btcRes.status === 'fulfilled' && btcRes.value) {
      const v = btcRes.value;
      btcEl.textContent = v.price != null ? fmtPrice(v.price, 'int') : '—';
      btcEl.style.color = v.pct != null ? (v.pct >= 0 ? '#10b981' : '#ef4444') : '';
      const mood = v.pct == null ? ['—',         '#94a3b8']
                 : v.pct >  3   ? ['Risk-On 🔥', '#10b981']
                 : v.pct >  0   ? ['Positive',   '#22c55e']
                 : v.pct > -3   ? ['Cautious',   '#f59e0b']
                 :                ['Risk-Off',   '#ef4444'];
      if (btcSEl) { btcSEl.textContent = mood[0]; btcSEl.style.color = mood[1]; }
    }

    const timeEl = document.getElementById('sent-mood-time');
    if (timeEl) timeEl.textContent = 'Live';
  } catch (err) {
    console.warn('loadSentimentMood:', err);
  }
}

async function loadRedditSentiment() {
  const container = document.getElementById('wsb-tickers');
  const countEl   = document.getElementById('wsb-post-count');
  if (!container) return;
  try {
    const result = await window.electronAPI.fetchJson(
      'https://www.reddit.com/r/wallstreetbets/hot.json?limit=100&raw_json=1'
    );
    if (!result.ok) throw new Error('HTTP ' + result.status);
    const json  = JSON.parse(result.text);
    const posts = json?.data?.children || [];
    if (countEl) countEl.textContent = `${posts.length} posts scanned`;

    const IGNORE = new Set(['WSB','THE','AND','FOR','BUT','NOT','ARE','YOU','THIS','THAT',
      'WITH','HAVE','FROM','THEY','WILL','BEEN','HAS','HAD','ITS','CAN','USE','MAY',
      'GET','ALL','NEW','ONE','OUT','NOW','BUY','PUT','DD','AI','IT','CEO','EPS','IPO',
      'SEC','ETF','GDP','FED','USA','YTD','ATH','ATL','IMO','LOL','BOT','NET','API',
      'CALL','PUTS','YOLO','EOD','DIV','PE','BB','AR','OP','SOS','NON','IRS','IRA',
      'TWO','TEN','END','CDN','IV','OI','SPY','QQQ','IWM','VIX','DXY','GME','AMC']);
    const re = /\$([A-Z]{1,5})\b|\b([A-Z]{2,5})\b/g;
    const counts = {};
    posts.forEach(p => {
      const text = (p.data.title || '') + ' ' + (p.data.selftext || '');
      let m;
      while ((m = re.exec(text)) !== null) {
        const t = (m[1] || m[2]);
        if (!IGNORE.has(t) && t.length >= 2) counts[t] = (counts[t] || 0) + 1;
      }
    });
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 10);
    if (sorted.length === 0) { container.innerHTML = '<div class="wsb-empty">No tickers found</div>'; return; }
    const maxCount = sorted[0][1];
    container.innerHTML = sorted.map(([sym, cnt], idx) =>
      `<div class="wsb-bar-row">
        <span class="wsb-bar-rank">${idx + 1}</span>
        <span class="wsb-bar-sym">${sym}</span>
        <div class="wsb-bar-track">
          <div class="wsb-bar-fill" style="width:${(cnt / maxCount * 100).toFixed(1)}%"></div>
        </div>
        <span class="wsb-bar-count">${cnt}</span>
      </div>`).join('');
  } catch (err) {
    if (container) container.innerHTML = `<div class="wsb-empty">Reddit unavailable</div>`;
  }
}

function calcPearson(x, y) {
  const n = Math.min(x.length, y.length);
  if (n < 3) return null;
  const mx = x.slice(0, n).reduce((a, v) => a + v, 0) / n;
  const my = y.slice(0, n).reduce((a, v) => a + v, 0) / n;
  let num = 0, dx2 = 0, dy2 = 0;
  for (let i = 0; i < n; i++) {
    const dx = x[i] - mx, dy = y[i] - my;
    num += dx * dy; dx2 += dx * dx; dy2 += dy * dy;
  }
  const denom = Math.sqrt(dx2 * dy2);
  return denom === 0 ? 0 : num / denom;
}

// ── Crypto Fear & Greed (alternative.me) ──────
async function loadCryptoFearGreed() {
  const body = document.getElementById('cfg-widget-body');
  if (!body) return;
  try {
    const res = await window.electronAPI.fetchJson('https://api.alternative.me/fng/?limit=7&format=json');
    if (!res.ok) throw new Error('fetch failed');
    const parsed = JSON.parse(res.text);
    const data = parsed?.data;
    if (!Array.isArray(data) || !data.length) throw new Error('empty');

    // data[0] = today (most recent), data[6] = 7 days ago
    const current = data[0];
    const score = parseInt(current.value, 10);
    const label = current.value_classification || '';

    const cfgColor = score >= 75 ? '#10b981'   // Extreme Greed — green
                   : score >= 55 ? '#22c55e'   // Greed
                   : score >= 45 ? '#94a3b8'   // Neutral
                   : score >= 25 ? '#f59e0b'   // Fear
                   :               '#ef4444';  // Extreme Fear

    // 7-bar mini chart (oldest on left)
    const bars = [...data].reverse(); // oldest → newest
    const maxScore = 100;
    const barsHtml = bars.map((d, i) => {
      const s = parseInt(d.value, 10);
      const h = Math.max(8, Math.round((s / maxScore) * 48));
      const c = s >= 55 ? '#10b981' : s >= 45 ? '#94a3b8' : s >= 25 ? '#f59e0b' : '#ef4444';
      const isToday = i === bars.length - 1;
      const date = new Date(parseInt(d.timestamp, 10) * 1000)
        .toLocaleDateString('en-US', { weekday: 'short' });
      return `<div class="cfg-bar-col" title="${date}: ${d.value} ${d.value_classification}">
        <div class="cfg-bar-fill${isToday ? ' today' : ''}" style="height:${h}px;background:${c}"></div>
        <span class="cfg-bar-label">${isToday ? 'Now' : date.slice(0,1)}</span>
      </div>`;
    }).join('');

    body.innerHTML = `
      <div class="cfg-main">
        <div class="cfg-score-wrap">
          <span class="cfg-score" style="color:${cfgColor}">${score}</span>
          <span class="cfg-label" style="color:${cfgColor}">${label}</span>
        </div>
        <div class="cfg-scale">
          <span style="color:#ef4444">0 Extreme Fear</span>
          <span style="color:#94a3b8">50 Neutral</span>
          <span style="color:#10b981">100 Extreme Greed</span>
        </div>
        <div class="cfg-bars">${barsHtml}</div>
      </div>
    `;
  } catch {
    const body2 = document.getElementById('cfg-widget-body');
    if (body2) body2.innerHTML = '<div class="wsb-empty">Crypto F&G unavailable</div>';
  }
}

async function buildCorrelationMatrix() {
  const container = document.getElementById('corr-container');
  if (!container) return;
  container.innerHTML = '<div class="corr-loading">Fetching price history…</div>';

  const CORR_SYMS = [
    { sym: '^GSPC',   lbl: 'SPX' },
    { sym: '^IXIC',   lbl: 'NDX' },
    { sym: 'BTC-USD', lbl: 'BTC' },
    { sym: 'ETH-USD', lbl: 'ETH' },
    { sym: 'GC=F',    lbl: 'Gold'},
    { sym: 'CL=F',    lbl: 'Oil' },
  ];
  const priceArrays = await Promise.allSettled(
    CORR_SYMS.map(s => fetchChartData(s.sym, '1mo', '1d'))
  );
  const arrays = priceArrays.map(r =>
    (r.status === 'fulfilled' && r.value) ? r.value.map(d => d.close).filter(p => p != null) : []
  );

  const n = CORR_SYMS.length;
  const matrix = Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) => {
      if (i === j) return 1;
      const c = calcPearson(arrays[i], arrays[j]);
      return c != null ? parseFloat(c.toFixed(2)) : null;
    })
  );

  const corrBg = v => {
    if (v == null)  return 'rgba(255,255,255,0.04)';
    if (v >=  0.7)  return 'rgba(34,197,94,0.28)';
    if (v >=  0.3)  return 'rgba(34,197,94,0.12)';
    if (v >= -0.3)  return 'rgba(148,163,184,0.08)';
    if (v >= -0.7)  return 'rgba(239,68,68,0.12)';
    return                  'rgba(239,68,68,0.28)';
  };

  // ── Heatmap grid (replaces ugly table) ──
  const corrLabel = v => {
    if (v == null) return '?';
    if (v >= 0.8)  return 'Strong+';
    if (v >= 0.5)  return 'Mod+';
    if (v >= 0.2)  return 'Weak+';
    if (v >= -0.2) return 'Neutral';
    if (v >= -0.5) return 'Weak−';
    if (v >= -0.8) return 'Mod−';
    return 'Strong−';
  };

  // Build a flat grid: 1 corner + N col-headers + N×(1 row-header + N cells)
  const cornerAndColHdrs = `<div></div>` +
    CORR_SYMS.map(s => `<div class="corr-axis-label">${s.lbl}</div>`).join('');

  const rows = matrix.map((row, i) => {
    const rowLabel = `<div class="corr-axis-label corr-row-lbl">${CORR_SYMS[i].lbl}</div>`;
    const rowCells = row.map((v, j) => {
      const isMe = i === j;
      const bg = corrBg(v);
      const val = isMe ? '·' : (v != null ? v.toFixed(2) : '?');
      const lbl = isMe ? '' : corrLabel(v);
      const textColor = isMe ? 'var(--text-lo)' : (v != null && Math.abs(v) > 0.3) ? 'rgba(255,255,255,0.92)' : 'var(--text-md)';
      return `<div class="corr-cell ${isMe ? 'corr-cell-diag' : ''}" style="background:${bg};color:${textColor}"
                title="${CORR_SYMS[i].lbl} ↔ ${CORR_SYMS[j].lbl}: ${v != null ? v.toFixed(2) : 'N/A'}">
        <div class="corr-cell-val">${val}</div>
        ${lbl ? `<div class="corr-cell-lbl">${lbl}</div>` : ''}
      </div>`;
    }).join('');
    return rowLabel + rowCells;
  }).join('');

  container.innerHTML = `
    <div class="corr-network-wrap">
      <canvas id="corr-network-canvas" width="320" height="160"></canvas>
    </div>
    <div class="corr-hm-flat" style="grid-template-columns:36px repeat(${n},1fr)">
      ${cornerAndColHdrs}
      ${rows}
    </div>
    <div class="corr-legend-row">
      <span class="corr-leg-item" style="background:rgba(239,68,68,0.35)">Strong−</span>
      <span class="corr-leg-item" style="background:rgba(148,163,184,0.1)">Neutral</span>
      <span class="corr-leg-item" style="background:rgba(34,197,94,0.35)">Strong+</span>
      <span style="margin-left:auto;font-size:8px;color:var(--text-lo)">1-month daily closes</span>
    </div>`;
  // Draw network graph on the freshly inserted canvas
  const netCanvas = document.getElementById('corr-network-canvas');
  if (netCanvas) drawCorrelationNetwork(netCanvas, matrix, CORR_SYMS);
}

// ══════════════════════════════════════════════
// CORRELATION NETWORK GRAPH (v2.37)
// ══════════════════════════════════════════════
function drawCorrelationNetwork(canvas, matrix, syms) {
  if (!canvas || !matrix || !syms) return;
  const dpr = window.devicePixelRatio || 1;
  const W   = canvas.offsetWidth  || 320;
  const H   = canvas.offsetHeight || 180;
  canvas.width  = W * dpr;
  canvas.height = H * dpr;
  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, W, H);

  const n   = syms.length;
  const cx  = W / 2, cy = H / 2;
  const rx  = (W / 2) - 36, ry = (H / 2) - 28;

  // Node positions arranged in an ellipse
  const pos = syms.map((_, i) => {
    const angle = (2 * Math.PI * i / n) - Math.PI / 2;
    return { x: cx + rx * Math.cos(angle), y: cy + ry * Math.sin(angle) };
  });

  // Draw edges first (lines)
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const v = matrix[i][j];
      if (v == null || Math.abs(v) < 0.3) continue;  // skip weak correlations
      const isPos  = v > 0;
      const alpha  = Math.min(0.75, Math.abs(v) * 0.8);
      const lw     = Math.max(0.5, Math.abs(v) * 2.5);
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.strokeStyle  = isPos ? '#22c55e' : '#ef4444';
      ctx.lineWidth    = lw;
      ctx.setLineDash(isPos ? [] : [3, 3]);
      ctx.beginPath();
      ctx.moveTo(pos[i].x, pos[i].y);
      ctx.lineTo(pos[j].x, pos[j].y);
      ctx.stroke();
      ctx.restore();

      // Edge correlation label (midpoint)
      const mx = (pos[i].x + pos[j].x) / 2;
      const my = (pos[i].y + pos[j].y) / 2;
      ctx.save();
      ctx.globalAlpha = 0.65;
      ctx.font = `bold 7px Inter, sans-serif`;
      ctx.fillStyle = isPos ? '#4ade80' : '#f87171';
      ctx.textAlign = 'center';
      ctx.fillText(v.toFixed(2), mx, my);
      ctx.restore();
    }
  }

  // Draw nodes (circles + labels)
  syms.forEach((s, i) => {
    const { x, y } = pos[i];
    // Node circle
    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, 14, 0, 2 * Math.PI);
    ctx.fillStyle   = 'rgba(99,102,241,0.18)';
    ctx.strokeStyle = 'rgba(99,102,241,0.55)';
    ctx.lineWidth   = 1.5;
    ctx.fill();
    ctx.stroke();
    ctx.restore();
    // Node label
    ctx.save();
    ctx.font      = 'bold 8.5px Inter, sans-serif';
    ctx.fillStyle = '#c7d2fe';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(s.lbl, x, y);
    ctx.restore();
  });
}

async function refreshSentimentPanel() {
  await Promise.allSettled([loadSentimentMood(), loadRedditSentiment(), buildCorrelationMatrix(), loadCryptoFearGreed()]);
}

function startSentimentRefresh() {
  refreshSentimentPanel();
  clearInterval(sentimentRefreshTimer);
  sentimentRefreshTimer = setInterval(refreshSentimentPanel, 120_000);
}

function stopSentimentRefresh() {
  clearInterval(sentimentRefreshTimer);
  sentimentRefreshTimer = null;
}

// ══════════════════════════════════════════════
// GLOBE PANEL — Interactive World Map
// ══════════════════════════════════════════════

let globeMarketData  = [];   // cached price data for all markets
let globeCurrentView = 'map'; // 'map' | 'list'

// Market geo-coordinates (lat/lon → real world city positions)
const GLOBE_MARKETS = [
  { sym: '^GSPC',     label: 'S&P 500',    flag: '🇺🇸', lat: 40.7,  lon: -74.0,  city: 'New York',  region: 'Americas',     exchange: 'NYSE',  tz: 'EST'  },
  { sym: '^BVSP',     label: 'Bovespa',    flag: '🇧🇷', lat: -23.5, lon: -46.6,  city: 'Sao Paulo', region: 'Americas',     exchange: 'B3',    tz: 'BRT'  },
  { sym: '^FTSE',     label: 'FTSE 100',   flag: '🇬🇧', lat: 51.5,  lon: -0.1,   city: 'London',    region: 'Europe',       exchange: 'LSE',   tz: 'GMT'  },
  { sym: '^GDAXI',    label: 'DAX',        flag: '🇩🇪', lat: 50.1,  lon: 8.7,    city: 'Frankfurt', region: 'Europe',       exchange: 'XETRA', tz: 'CET'  },
  { sym: '^N225',     label: 'Nikkei 225', flag: '🇯🇵', lat: 35.7,  lon: 139.7,  city: 'Tokyo',     region: 'Asia-Pacific', exchange: 'TSE',   tz: 'JST'  },
  { sym: '^HSI',      label: 'Hang Seng',  flag: '🇭🇰', lat: 22.3,  lon: 114.2,  city: 'Hong Kong', region: 'Asia-Pacific', exchange: 'HKEX',  tz: 'HKT'  },
  { sym: '000001.SS', label: 'SSE Comp.',  flag: '🇨🇳', lat: 31.2,  lon: 121.5,  city: 'Shanghai',  region: 'Asia-Pacific', exchange: 'SSE',   tz: 'CST'  },
  { sym: '^BSESN',    label: 'BSE Sensex', flag: '🇮🇳', lat: 19.1,  lon: 72.9,   city: 'Mumbai',    region: 'Asia-Pacific', exchange: 'BSE',   tz: 'IST'  },
  { sym: '^AORD',     label: 'ASX 200',    flag: '🇦🇺', lat: -33.9, lon: 151.2,  city: 'Sydney',    region: 'Asia-Pacific', exchange: 'ASX',   tz: 'AEDT' },
];

// Convert geographic coordinates to canvas percentage position (equirectangular)
function geoToMapPct(lat, lon) {
  return {
    x: (lon + 180) / 360 * 100,
    y: (90 - lat)  / 180 * 100,
  };
}

// Draw simplified world map on canvas
function drawWorldMapBg(canvas) {
  const dpr  = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  const W = rect.width;
  const H = rect.height;
  if (W < 4 || H < 4) return;

  canvas.width  = W * dpr;
  canvas.height = H * dpr;
  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);

  // ── Ocean background (deep navy) ──────────────────
  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0,   '#04090f');
  bg.addColorStop(1,   '#030710');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // ── Latitude / Longitude grid ─────────────────────
  ctx.strokeStyle = 'rgba(100,150,220,0.06)';
  ctx.lineWidth   = 0.5;
  for (let lat = -90; lat <= 90; lat += 30) {
    const y = (90 - lat) / 180 * H;
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
  }
  for (let lon = -180; lon <= 180; lon += 30) {
    const x = (lon + 180) / 360 * W;
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
  }

  // ── Equator line ──────────────────────────────────
  ctx.strokeStyle = 'rgba(100,150,220,0.14)';
  ctx.lineWidth   = 0.8;
  ctx.setLineDash([5, 5]);
  ctx.beginPath(); ctx.moveTo(0, H / 2); ctx.lineTo(W, H / 2); ctx.stroke();
  ctx.setLineDash([]);

  // Helper: lat/lon → canvas x/y
  const g = (lat, lon) => ({ x: (lon + 180) / 360 * W, y: (90 - lat) / 180 * H });

  // Helper: draw a filled land polygon
  function land(pts, fill = 'rgba(28,52,84,0.92)', stroke = 'rgba(60,110,170,0.45)') {
    if (!pts.length) return;
    ctx.beginPath();
    const p0 = g(pts[0][0], pts[0][1]);
    ctx.moveTo(p0.x, p0.y);
    for (let i = 1; i < pts.length; i++) {
      const p = g(pts[i][0], pts[i][1]);
      ctx.lineTo(p.x, p.y);
    }
    ctx.closePath();
    ctx.fillStyle   = fill;
    ctx.fill();
    ctx.strokeStyle = stroke;
    ctx.lineWidth   = 0.7;
    ctx.stroke();
  }

  // ── Continents (simplified outlines) ──────────────

  // North America
  land([
    [71,-141],[60,-141],[55,-130],[49,-124],[37,-122],[30,-116],
    [23,-110],[18,-103],[15,-93],[8,-82],[8,-77],[10,-75],
    [17,-88],[21,-90],[25,-81],[30,-81],[35,-75],[41,-70],
    [47,-66],[50,-65],[60,-65],[70,-55],[78,-70],
    [82,-80],[82,-105],[78,-130],
  ]);

  // Central America bridge
  land([[8,-77],[7,-77],[8,-82],[9,-82],[9,-79],[8,-77]]);

  // South America
  land([
    [10,-75],[2,-80],[0,-80],[-5,-81],[-15,-75],[-20,-70],
    [-30,-65],[-40,-65],[-55,-68],[-56,-65],[-40,-62],
    [-28,-48],[-18,-38],[-5,-35],[5,-52],[8,-62],
  ]);

  // Greenland
  land([
    [75,-72],[83,-37],[78,-20],[72,-22],[65,-38],
    [60,-44],[65,-52],[70,-52],[76,-55],[76,-68],
  ], 'rgba(24,46,72,0.80)', 'rgba(60,110,170,0.35)');

  // Iceland
  land([[65,-24],[66,-22],[64,-18],[63,-20],[64,-24],[65,-24]],
    'rgba(24,46,72,0.80)', 'rgba(60,110,170,0.35)');

  // Europe
  land([
    [71,28],[65,24],[60,28],[55,24],[51,16],[46,16],[44,28],
    [38,27],[36,28],[36,10],[44,5],[50,-2],[55,-5],
    [58,-5],[60,5],[65,14],[69,18],
  ]);

  // UK (separate island)
  land([[50,-5],[52,-5],[55,-3],[58,-5],[56,-3],[52,-3],[50,-5]]);

  // Africa
  land([
    [36,10],[36,32],[30,32],[22,37],[12,43],[0,42],
    [-10,40],[-34,26],[-35,18],[-18,12],[-5,10],[5,2],[5,10],[12,15],
  ]);

  // Arabian Peninsula
  land([[30,32],[22,37],[12,43],[12,52],[20,60],[26,56],[28,48],[30,32]]);

  // Asia main body
  land([
    [71,28],[71,70],[73,100],[70,135],[60,140],[50,140],[35,140],
    [22,121],[10,104],[2,104],[0,100],[5,80],[8,77],[10,78],
    [20,88],[24,88],[28,72],[30,50],[35,36],[32,35],[36,36],
    [40,40],[44,42],[50,40],[60,60],[65,50],[70,50],
  ]);

  // Indian subcontinent
  land([[28,72],[8,77],[10,80],[22,88],[24,88],[28,72]]);

  // Southeast Asia
  land([[10,104],[2,104],[0,100],[2,108],[10,104]]);

  // Japan
  land([[31,131],[33,131],[35,137],[37,137],[41,141],[43,141],
    [40,136],[34,135],[31,131]]);

  // Korea
  land([[34,126],[38,126],[38,130],[34,130],[34,126]]);

  // Australia
  land([
    [-15,130],[-12,136],[-14,144],[-18,148],[-24,152],
    [-32,153],[-38,145],[-38,140],[-33,133],[-26,114],[-22,114],[-18,122],
  ]);

  // New Zealand
  land([[-36,174],[-38,174],[-46,168],[-44,170],[-36,174]],
    'rgba(24,46,72,0.80)', 'rgba(60,110,170,0.35)');
}

function buildGlobePanel() {
  if (!globePanel) return;
  globePanel.innerHTML = `
    <div class="analytics-topbar">
      <div class="analytics-title">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
             stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <line x1="2" y1="12" x2="22" y2="12"/>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
        </svg>
        WORLD MARKETS
      </div>
      <div style="display:flex;align-items:center;gap:8px;">
        <div class="globe-view-toggle">
          <button class="globe-toggle-btn active" id="globe-btn-map" onclick="switchGlobeView('map')">🗺 Map</button>
          <button class="globe-toggle-btn" id="globe-btn-list" onclick="switchGlobeView('list')">☰ List</button>
        </div>
        <button class="analytics-refresh-btn" id="globe-refresh-btn">↻ Refresh</button>
      </div>
    </div>
    <div class="globe-map-wrap" id="globe-map-wrap">
      <canvas id="globe-map-canvas" class="globe-map-canvas"></canvas>
      <div class="globe-bubble-layer" id="globe-bubble-layer"></div>
    </div>
    <div class="globe-list-wrap" id="globe-list-wrap" style="display:none;"></div>
    <div class="globe-legend" id="globe-legend"></div>
    <div class="globe-detail-overlay" id="globe-detail-overlay" style="display:none;">
      <div class="globe-detail-card">
        <button class="globe-detail-close" id="globe-detail-close">✕</button>
        <div class="globe-detail-flag-large" id="globe-detail-flag"></div>
        <div class="globe-detail-name" id="globe-detail-name"></div>
        <div class="globe-detail-city" id="globe-detail-city"></div>
        <div class="globe-detail-price-big" id="globe-detail-price"></div>
        <div style="margin:4px 0 14px;">
          <span class="globe-detail-pct-badge" id="globe-detail-pct"></span>
        </div>
        <div class="globe-detail-spark-wrap">
          <canvas class="globe-detail-spark" id="globe-detail-spark"></canvas>
        </div>
        <div class="globe-detail-meta" id="globe-detail-meta"></div>
      </div>
    </div>`;

  document.getElementById('globe-refresh-btn').addEventListener('click', refreshGlobePanel);
  document.getElementById('globe-detail-close').addEventListener('click', () => {
    document.getElementById('globe-detail-overlay').style.display = 'none';
  });
  document.getElementById('globe-detail-overlay').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) e.currentTarget.style.display = 'none';
  });
}

function switchGlobeView(mode) {
  globeCurrentView = mode;
  const mapWrap  = document.getElementById('globe-map-wrap');
  const listWrap = document.getElementById('globe-list-wrap');
  const legend   = document.getElementById('globe-legend');
  const btnMap   = document.getElementById('globe-btn-map');
  const btnList  = document.getElementById('globe-btn-list');
  if (!mapWrap || !listWrap) return;
  if (mode === 'map') {
    mapWrap.style.display  = '';
    listWrap.style.display = 'none';
    if (legend) legend.style.display = '';
    if (btnMap)  btnMap.classList.add('active');
    if (btnList) btnList.classList.remove('active');
  } else {
    mapWrap.style.display  = 'none';
    listWrap.style.display = 'block';
    if (legend) legend.style.display = 'none';
    if (btnMap)  btnMap.classList.remove('active');
    if (btnList) btnList.classList.add('active');
    renderGlobeListView();
  }
}

function renderGlobeListView() {
  const wrap = document.getElementById('globe-list-wrap');
  if (!wrap) return;
  if (!globeMarketData.length) {
    wrap.innerHTML = '<div class="wsb-loading">No data yet — try refreshing</div>';
    return;
  }

  // ── Performance heat bar at top (all markets sorted by pct) ──────────
  const sorted = [...globeMarketData].filter(d => d.pct != null).sort((a,b) => b.pct - a.pct);
  const heatBarHtml = sorted.map(d => {
    const alpha = Math.min(0.85, 0.3 + Math.abs(d.pct) * 0.12);
    const bg = d.pct >= 0 ? `rgba(16,185,129,${alpha.toFixed(2)})` : `rgba(239,68,68,${alpha.toFixed(2)})`;
    const sign = d.pct >= 0 ? '+' : '';
    return `<div class="globe-heat-chip" style="background:${bg}" title="${d.mkt.label}">
      <span class="globe-heat-flag">${d.mkt.flag}</span>
      <span class="globe-heat-lbl">${d.mkt.label.split(' ')[0]}</span>
      <span class="globe-heat-pct">${sign}${d.pct.toFixed(2)}%</span>
    </div>`;
  }).join('');

  const regions = {};
  globeMarketData.forEach((item, idx) => {
    const reg = item.mkt.region || 'Other';
    if (!regions[reg]) regions[reg] = [];
    regions[reg].push({ ...item, idx });
  });
  const regionOrder = ['Americas', 'Europe', 'Asia-Pacific', 'Other'];

  wrap.innerHTML = `
    <div class="globe-heat-bar">${heatBarHtml}</div>
    ${regionOrder
      .filter(r => regions[r])
      .map(r => `
        <div class="globe-list-region">
          <div class="globe-list-region-hdr">${r}</div>
          ${regions[r].map(({ mkt, price, color, pctStr, pct, idx }) => {
            const isOpen = MARKET_DEFS.find(m => m.id === mkt.exchange?.toLowerCase() || m.id === 'nyse')?.isOpen() ?? true;
            const statusDot = pct != null
              ? `<div class="globe-open-dot" style="background:${color};box-shadow:0 0 5px ${color}88;"></div>`
              : `<div class="globe-open-dot" style="background:var(--text-lo)"></div>`;
            return `<div class="globe-list-row" onclick="showGlobeDetail(${idx})">
              ${statusDot}
              <span class="globe-list-flag">${mkt.flag}</span>
              <div class="globe-list-info">
                <div class="globe-list-name">${mkt.label}</div>
                <div class="globe-list-city">${mkt.city} · ${mkt.exchange} · ${mkt.tz}</div>
              </div>
              <canvas class="globe-row-spark" id="grs-${idx}" width="70" height="30"></canvas>
              <div class="globe-list-vals">
                <div class="globe-list-price" style="color:${color};">${price != null ? fmtPrice(price, 'int') : '—'}</div>
                <div class="globe-list-pct" style="color:${color};">${pctStr}</div>
              </div>
            </div>`;
          }).join('')}
        </div>`).join('')}`;

  // Async-draw sparklines for each row
  globeMarketData.forEach(({ mkt, pct }, idx) => {
    const canvas = document.getElementById(`grs-${idx}`);
    if (!canvas) return;
    fetchChartData(mkt.sym, '5d', '30m').then(data => {
      if (data && data.length > 1) {
        const closes = data.map(d => d.close).filter(p => p != null);
        drawSparkline(canvas, closes, pct == null || pct >= 0);
      }
    }).catch(() => {});
  });
}

async function showGlobeDetail(idx) {
  const item = globeMarketData[idx];
  if (!item) return;
  const { mkt, price, pct, color, pctStr } = item;

  const overlay = document.getElementById('globe-detail-overlay');
  const flagEl  = document.getElementById('globe-detail-flag');
  const nameEl  = document.getElementById('globe-detail-name');
  const cityEl  = document.getElementById('globe-detail-city');
  const priceEl = document.getElementById('globe-detail-price');
  const pctEl   = document.getElementById('globe-detail-pct');
  const metaEl  = document.getElementById('globe-detail-meta');
  const sparkEl = document.getElementById('globe-detail-spark');
  if (!overlay) return;

  if (flagEl)  flagEl.textContent  = mkt.flag;
  if (nameEl)  nameEl.textContent  = mkt.label;
  if (cityEl)  cityEl.textContent  = `${mkt.city} · ${mkt.exchange} · ${mkt.tz}`;
  if (priceEl) { priceEl.textContent = price != null ? fmtPrice(price, 'int') : '—'; priceEl.style.color = color; }
  if (pctEl)   {
    pctEl.textContent  = pctStr;
    pctEl.style.background = (pct != null && pct >= 0) ? 'rgba(16,185,129,0.18)' : 'rgba(239,68,68,0.18)';
    pctEl.style.color  = color;
  }
  if (metaEl) metaEl.innerHTML = `
    <div class="globe-detail-meta-item">
      <div style="font-size:8px;color:var(--text-lo);text-transform:uppercase;letter-spacing:.8px;margin-bottom:3px;">Exchange</div>
      <div style="font-size:12px;font-weight:700;color:var(--text-hi);">${mkt.exchange}</div>
    </div>
    <div class="globe-detail-meta-item">
      <div style="font-size:8px;color:var(--text-lo);text-transform:uppercase;letter-spacing:.8px;margin-bottom:3px;">Timezone</div>
      <div style="font-size:12px;font-weight:700;color:var(--text-hi);">${mkt.tz}</div>
    </div>
    <div class="globe-detail-meta-item">
      <div style="font-size:8px;color:var(--text-lo);text-transform:uppercase;letter-spacing:.8px;margin-bottom:3px;">Region</div>
      <div style="font-size:12px;font-weight:700;color:var(--text-hi);">${mkt.region}</div>
    </div>
    <div class="globe-detail-meta-item">
      <div style="font-size:8px;color:var(--text-lo);text-transform:uppercase;letter-spacing:.8px;margin-bottom:3px;">Symbol</div>
      <div style="font-size:12px;font-weight:700;color:var(--text-hi);">${mkt.sym}</div>
    </div>`;

  overlay.style.display = 'flex';

  if (sparkEl) {
    try {
      const chartData = await fetchChartData(mkt.sym, '1mo', '1d');
      if (chartData && chartData.length > 1) {
        const closes = chartData.map(d => d.close).filter(p => p != null);
        drawSparkline(sparkEl, closes, pct == null || pct >= 0);
      }
    } catch (err) {
      console.warn('Globe detail sparkline:', err);
    }
  }
}

async function refreshGlobePanel() {
  // Fetch live prices for all markets in parallel
  const results = await Promise.allSettled(
    GLOBE_MARKETS.map(m => fetchPriceV8({ symbol: m.sym, id: m.sym, fmt: 'int' }))
  );

  // Build globeMarketData cache (always, regardless of view mode)
  globeMarketData = GLOBE_MARKETS.map((mkt, i) => {
    const res = results[i];
    let price = null, pct = null;
    if (res.status === 'fulfilled' && res.value) { price = res.value.price; pct = res.value.pct; }
    const isUp   = pct != null && pct >= 0;
    const color  = pct == null ? '#64748b' : isUp ? '#10b981' : '#ef4444';
    const pctStr = pct == null ? '—' : (isUp ? '+' : '') + pct.toFixed(2) + '%';
    return { mkt, price, pct, isUp, color, pctStr };
  });

  // If list view is active, just re-render list and return
  if (globeCurrentView === 'list') {
    renderGlobeListView();
    return;
  }

  const canvas = document.getElementById('globe-map-canvas');
  const layer  = document.getElementById('globe-bubble-layer');
  const legend = document.getElementById('globe-legend');
  if (!canvas || !layer) return;

  // Draw world map background — wait two frames so panel layout is ready
  await new Promise(r => requestAnimationFrame(r));
  await new Promise(r => requestAnimationFrame(r));
  drawWorldMapBg(canvas);

  // Clear old bubbles & legend
  layer.innerHTML  = '';
  if (legend) legend.innerHTML = '';

  globeMarketData.forEach(({ mkt, price, color, pctStr }, i) => {
    // ── Geo bubble on the map ──────────────────────
    const pos    = geoToMapPct(mkt.lat, mkt.lon);
    const bubble = document.createElement('div');
    bubble.className = 'globe-bubble';
    bubble.style.cssText = `left:${pos.x.toFixed(2)}%;top:${pos.y.toFixed(2)}%;cursor:pointer;`;
    bubble.title = `${mkt.label} — ${mkt.city}`;
    bubble.innerHTML = `
      <div class="globe-bubble-card" style="border-color:${color}33;">
        <span class="globe-bubble-flag">${mkt.flag}</span>
        <span class="globe-bubble-pct" style="color:${color};">${pctStr}</span>
      </div>
      <div class="globe-bubble-stem"></div>
      <div class="globe-bubble-dot"
           style="background:${color};box-shadow:0 0 7px ${color}88;"></div>`;
    bubble.addEventListener('click', () => showGlobeDetail(i));
    layer.appendChild(bubble);

    // ── Bottom legend chip ─────────────────────────
    if (legend) {
      const chip = document.createElement('div');
      chip.className = 'globe-stat-chip';
      chip.style.cursor = 'pointer';
      chip.innerHTML = `
        <span class="globe-chip-flag">${mkt.flag}</span>
        <span class="globe-chip-label">${mkt.label}</span>
        <span class="globe-chip-pct" style="color:${color};">${pctStr}</span>
        <span class="globe-chip-city">${mkt.city}</span>`;
      chip.addEventListener('click', () => showGlobeDetail(i));
      legend.appendChild(chip);
    }
  });
}

// ── Init watchlist / My Space ─────────────────
function initWatchlist() {
  loadWatchlist();
  buildMySpacePanel();          // Builds panel HTML + renders cards
  buildWatchlistProfilesRow();  // Profiles toolbar (v2.34)
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

// ══════════════════════════════════════════════
// INSIDER FLOWS PANEL
// ══════════════════════════════════════════════

const INSIDER_WATCH_SYMBOLS = ['AAPL','MSFT','NVDA','AMZN','GOOGL','META','TSLA','JPM','GS','XOM'];
let _insiderFilter = 'all';   // 'all' | 'buy' | 'sell'
let _insiderData   = [];      // merged + sorted transactions

function buildInsiderFlowsPanel() {
  if (!insiderPanel) return;
  insiderPanel.innerHTML = `
    <div class="analytics-topbar">
      <div class="analytics-title">
        <span class="analytics-icon">👤</span>
        <div>
          <div class="analytics-name">Insider Flows</div>
          <div class="analytics-sub">Recent SEC Form 4 buy/sell activity — top 10 stocks</div>
        </div>
      </div>
      <button class="analytics-refresh-btn" id="insider-refresh-btn" title="Refresh insider data">↺</button>
    </div>
    <div class="insider-panel-body">
      <div class="insider-summary" id="insider-summary">
        <span class="ins-stat ins-stat-buy"  id="ins-buy-count">– Buys</span>
        <span class="ins-stat-sep">·</span>
        <span class="ins-stat ins-stat-sell" id="ins-sell-count">– Sells</span>
        <span class="ins-stat-sep">·</span>
        <span class="ins-stat ins-stat-neutral" id="ins-total-val">Loading…</span>
      </div>
      <div class="insider-filter-row" id="insider-filter-row">
        <button class="ins-filter-btn active" data-filter="all">All</button>
        <button class="ins-filter-btn" data-filter="buy">🟢 Buys</button>
        <button class="ins-filter-btn" data-filter="sell">🔴 Sells</button>
      </div>
      <div class="ins-table-wrap" id="ins-table-wrap">
        <div class="ins-loading">Fetching insider data from Finnhub…</div>
      </div>
    </div>
  `;

  // Filter button listeners
  insiderPanel.querySelectorAll('.ins-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      _insiderFilter = btn.dataset.filter;
      insiderPanel.querySelectorAll('.ins-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderInsiderTable();
    });
  });

  // Refresh button
  document.getElementById('insider-refresh-btn')?.addEventListener('click', () => {
    INSIDER_WATCH_SYMBOLS.forEach(sym => delete _extCache[`fh_insider_${sym}`]);
    loadInsiderFlowsPanel();
  });
}

async function loadInsiderFlowsPanel() {
  const wrap = document.getElementById('ins-table-wrap');
  if (!wrap) return;
  wrap.innerHTML = '<div class="ins-loading">Fetching insider data from Finnhub…</div>';

  // Fetch for all watched symbols in parallel
  const results = await Promise.allSettled(
    INSIDER_WATCH_SYMBOLS.map(sym =>
      fetchInsiderTransactions(sym).then(arr => arr.map(t => ({ ...t, sym })))
    )
  );

  _insiderData = results
    .filter(r => r.status === 'fulfilled')
    .flatMap(r => r.value)
    .sort((a, b) => {
      const da = a.transactionDate || a.filingDate || '';
      const db = b.transactionDate || b.filingDate || '';
      return db.localeCompare(da);
    });

  // Summary stats
  const buys  = _insiderData.filter(t => t.transactionCode === 'P');
  const sells = _insiderData.filter(t => t.transactionCode === 'S');
  const fmtVal = v => {
    if (v >= 1e9) return `$${(v/1e9).toFixed(1)}B`;
    if (v >= 1e6) return `$${(v/1e6).toFixed(1)}M`;
    if (v >= 1e3) return `$${(v/1e3).toFixed(0)}K`;
    return `$${v.toFixed(0)}`;
  };
  const buyVol  = buys.reduce( (s, t) => s + Math.abs(t.change || 0) * (t.transactionPrice || 0), 0);
  const sellVol = sells.reduce((s, t) => s + Math.abs(t.change || 0) * (t.transactionPrice || 0), 0);

  const buyEl  = document.getElementById('ins-buy-count');
  const sellEl = document.getElementById('ins-sell-count');
  const totEl  = document.getElementById('ins-total-val');
  if (buyEl)  buyEl.textContent  = `${buys.length} Buys (${fmtVal(buyVol)})`;
  if (sellEl) sellEl.textContent = `${sells.length} Sells (${fmtVal(sellVol)})`;
  if (totEl)  totEl.textContent  = `${_insiderData.length} total transactions`;

  renderInsiderTable();
}

function renderInsiderTable() {
  const wrap = document.getElementById('ins-table-wrap');
  if (!wrap) return;

  const filtered =
    _insiderFilter === 'buy'  ? _insiderData.filter(t => t.transactionCode === 'P') :
    _insiderFilter === 'sell' ? _insiderData.filter(t => t.transactionCode === 'S') :
    _insiderData;

  if (!filtered.length) {
    wrap.innerHTML = '<div class="ins-loading">No transactions found for selected filter.</div>';
    return;
  }

  const fmtVal = v => {
    if (!v) return '–';
    if (v >= 1e9) return `$${(v/1e9).toFixed(1)}B`;
    if (v >= 1e6) return `$${(v/1e6).toFixed(1)}M`;
    if (v >= 1e3) return `$${(v/1e3).toFixed(0)}K`;
    return `$${v.toFixed(0)}`;
  };

  wrap.innerHTML = `
    <table class="ins-table">
      <thead>
        <tr>
          <th>Ticker</th>
          <th>Insider</th>
          <th>Type</th>
          <th class="ins-th-num">Shares</th>
          <th class="ins-th-num">Price</th>
          <th class="ins-th-num">Total</th>
          <th class="ins-th-date">Date</th>
        </tr>
      </thead>
      <tbody>
        ${filtered.map(t => {
          const isBuy  = t.transactionCode === 'P';
          const shares = Math.abs(t.change || 0).toLocaleString('en-US');
          const price  = t.transactionPrice ? `$${parseFloat(t.transactionPrice).toFixed(2)}` : '–';
          const total  = fmtVal(Math.abs(t.change || 0) * (t.transactionPrice || 0));
          const name   = (t.name || 'Insider').split(' ').slice(0, 2).join(' ');
          const date   = t.transactionDate || t.filingDate || '–';
          return `<tr class="ins-row ${isBuy ? 'ins-row-buy' : 'ins-row-sell'}">
            <td><span class="ins-ticker-badge">${t.sym}</span></td>
            <td class="ins-name">${name}</td>
            <td><span class="ins-type-badge ${isBuy ? 'buy' : 'sell'}">${isBuy ? 'BUY' : 'SELL'}</span></td>
            <td class="ins-num">${shares}</td>
            <td class="ins-num">${price}</td>
            <td class="ins-num ${isBuy ? 'ins-pos' : 'ins-neg'}">${total}</td>
            <td class="ins-date">${date}</td>
          </tr>`;
        }).join('')}
      </tbody>
    </table>
    <div class="ins-disclaimer">Finnhub · SEC Form 4 filings · Delays possible · Not financial advice</div>
  `;
}

// ══════════════════════════════════════════════
// TA SIGNAL SCANNER PANEL
// ══════════════════════════════════════════════

let _signalsLoaded  = false;
let _sigFilter      = 'all';   // 'all' | 'buy' | 'neutral' | 'sell'
let _sigResults     = [];      // [{sym, overall, maSignal, rsiVal, rsiSig, pct}]
let _sigFetchActive = false;

// ── Compute TA signals from OHLCV data ────────
function computeSigForData(data) {
  if (!data || data.length < 14) return null; // min 14 bars for RSI
  const closes = data.map(d => d.close);
  const n = closes.length;

  // EMA 20 and EMA 50
  const ema20arr = calcEMA(closes, 20);
  const ema50arr = closes.length >= 50 ? calcEMA(closes, 50) : null;
  const ema20    = ema20arr[n - 1];
  const ema50    = ema50arr ? ema50arr[n - 1] : null;
  const last     = closes[n - 1];

  // MA signal
  let maSignal;
  if (ema50 != null) {
    maSignal = (last > ema20 && ema20 > ema50) ? 'bull'
             : (last < ema20 && ema20 < ema50) ? 'bear'
             : 'neutral';
  } else {
    maSignal = last > ema20 ? 'bull' : last < ema20 ? 'bear' : 'neutral';
  }

  // RSI 14
  const rsiArr = calcRSI(closes, 14);
  const rsiVal = Math.round(rsiArr.filter(v => v != null).pop() || 50);
  const rsiSig = rsiVal >= 75 ? 'ob' : rsiVal <= 30 ? 'os' : rsiVal >= 55 ? 'bull' : rsiVal <= 45 ? 'bear' : 'neutral';

  // Momentum (last 5 bars)
  const momStart = closes[Math.max(0, n - 6)];
  const momPct   = momStart > 0 ? ((last - momStart) / momStart) * 100 : 0;
  const momSig   = momPct >  1.5 ? 'bull' : momPct < -1.5 ? 'bear' : 'neutral';

  // Overall score
  const bulls = [maSignal === 'bull', rsiSig === 'bull' || rsiSig === 'os', momSig === 'bull'].filter(Boolean).length;
  const bears = [maSignal === 'bear', rsiSig === 'bear' || rsiSig === 'ob', momSig === 'bear'].filter(Boolean).length;
  const overall = bears >= 2 ? 'sell' : bulls >= 2 ? 'buy' : 'neutral';

  return { overall, maSignal, rsiVal, rsiSig, momSig, momPct };
}

function buildSignalsPanel() {
  if (!signalsPanel) return;
  signalsPanel.innerHTML = `
    <div class="sig-header">
      <div class="sig-title-block">
        <span class="sig-title">TA Signal Scanner</span>
        <span class="sig-subtitle">EMA20/50 · RSI(14) · 5-bar Momentum · 1-month daily data</span>
      </div>
      <div class="sig-controls">
        <div class="sig-filter-tabs" id="sig-filter-tabs">
          <button class="sig-filter-btn active" data-filter="all">All</button>
          <button class="sig-filter-btn" data-filter="buy">BUY</button>
          <button class="sig-filter-btn" data-filter="neutral">Neutral</button>
          <button class="sig-filter-btn" data-filter="sell">SELL</button>
        </div>
        <button class="sig-refresh-btn" id="sig-refresh-btn">↻ Refresh</button>
      </div>
    </div>
    <div class="sig-summary" id="sig-summary">
      <div class="sig-sum-item"><span class="sig-sum-label">BUY signals</span><span class="sig-sum-val buy" id="sig-cnt-buy">–</span></div>
      <div class="sig-sum-item"><span class="sig-sum-label">Neutral</span><span class="sig-sum-val neutral" id="sig-cnt-neutral">–</span></div>
      <div class="sig-sum-item"><span class="sig-sum-label">SELL signals</span><span class="sig-sum-val sell" id="sig-cnt-sell">–</span></div>
      <div class="sig-sum-item"><span class="sig-sum-label">Loaded</span><span class="sig-sum-val neutral" id="sig-cnt-total">–/–</span></div>
    </div>
    <div class="sig-body" id="sig-body"></div>
  `;

  // Filter tabs
  signalsPanel.querySelector('#sig-filter-tabs').addEventListener('click', e => {
    const btn = e.target.closest('.sig-filter-btn');
    if (!btn) return;
    _sigFilter = btn.dataset.filter;
    signalsPanel.querySelectorAll('.sig-filter-btn').forEach(b => b.classList.toggle('active', b === btn));
    renderSignalCards();
  });

  // Refresh
  signalsPanel.querySelector('#sig-refresh-btn').addEventListener('click', () => {
    _signalsLoaded = false;
    _sigResults = [];
    loadSignalsPanel();
  });
}

async function loadSignalsPanel() {
  if (_sigFetchActive) return;
  _sigFetchActive = true;
  _signalsLoaded  = true;

  const body = document.getElementById('sig-body');
  if (!body) { _sigFetchActive = false; return; }

  // Show loading skeletons
  body.innerHTML = ALL_HOME_SYMBOLS.map(s =>
    `<div class="sig-card loading" id="sigcard-${s.id}">
      <div class="sig-card-top">
        <span class="sig-card-name">${s.label}</span>
        <span class="sig-overall-badge neutral">…</span>
      </div>
      <div class="sig-chips"><span class="sig-chip neutral">Loading</span></div>
    </div>`
  ).join('');

  // Click to navigate from any card
  body.addEventListener('click', e => {
    const card = e.target.closest('.sig-card[data-sym-id]');
    if (!card) return;
    const sym = ALL_HOME_SYMBOLS.find(s => s.id === card.dataset.symId);
    if (sym) { switchSite('overview'); selectMainChartSym(sym); }
  });

  _sigResults = [];
  const BATCH = 4;
  let loaded = 0;

  for (let i = 0; i < ALL_HOME_SYMBOLS.length; i += BATCH) {
    // Stop if panel was hidden
    if (!signalsPanel.classList.contains('active')) break;

    const batch = ALL_HOME_SYMBOLS.slice(i, i + BATCH);
    await Promise.allSettled(batch.map(async sym => {
      // Try 1mo/1d first, then fallback ranges for commodities/futures that return sparse data
      const FALLBACKS = [
        { range: '1mo', interval: '1d'  },
        { range: '3mo', interval: '1d'  },
        { range: '1y',  interval: '1wk' },
      ];
      let data = null;
      for (const fb of FALLBACKS) {
        const ck = `${sym.symbol}|${fb.range}|${fb.interval}`;
        data = chartDataCache[ck] || null;
        if (!data || data.length < 20) {
          try { data = await fetchChartData(sym.symbol, fb.range, fb.interval); } catch { data = null; }
        }
        if (data && data.length >= 20) break; // good enough
      }

      loaded++;
      const sig = data ? computeSigForData(data) : null;
      const known = lastKnownPrices[sym.id];
      const pct = known ? known.pct : null;

      _sigResults.push({ sym, sig, pct });

      // Update the individual card immediately
      updateSignalCard(sym, sig, pct);

      // Update counts
      const cntEl = document.getElementById('sig-cnt-total');
      if (cntEl) cntEl.textContent = `${loaded}/${ALL_HOME_SYMBOLS.length}`;
    }));

    updateSignalSummary();
  }

  updateSignalSummary();
  _sigFetchActive = false;
}

function updateSignalCard(sym, sig, pct) {
  const card = document.getElementById(`sigcard-${sym.id}`);
  if (!card) return;

  card.dataset.symId = sym.id;
  card.classList.remove('loading', 'sig-card-buy', 'sig-card-sell');

  if (!sig) {
    card.innerHTML = `
      <div class="sig-card-top">
        <span class="sig-card-name">${sym.label}</span>
        <span class="sig-overall-badge neutral">N/A</span>
      </div>
      <div class="sig-chips"><span class="sig-chip neutral">No data</span></div>
    `;
    return;
  }

  if (sig.overall === 'buy')  card.classList.add('sig-card-buy');
  if (sig.overall === 'sell') card.classList.add('sig-card-sell');

  const pctStr  = pct != null ? `${pct >= 0 ? '+' : ''}${pct.toFixed(2)}%` : '';
  const pctCls  = pct == null ? '' : pct >= 0 ? 'positive' : 'negative';
  const momSign = sig.momPct >= 0 ? '+' : '';

  card.innerHTML = `
    <div class="sig-card-top">
      <span class="sig-card-name">${sym.label}</span>
      <span class="sig-card-pct ${pctCls}">${pctStr}</span>
      <span class="sig-overall-badge ${sig.overall}">${sig.overall === 'buy' ? '▲ BUY' : sig.overall === 'sell' ? '▼ SELL' : '— NEUTRAL'}</span>
    </div>
    <div class="sig-chips">
      <span class="sig-chip ${sig.maSignal}" title="EMA20/50 cross">MA ${sig.maSignal === 'bull' ? '▲' : sig.maSignal === 'bear' ? '▼' : '—'}</span>
      <span class="sig-chip ${sig.rsiSig}" title="RSI(14)">RSI ${sig.rsiVal}</span>
      <span class="sig-chip ${sig.momSig}" title="5-bar momentum">${momSign}${sig.momPct.toFixed(1)}% Mom</span>
    </div>
  `;
}

function renderSignalCards() {
  const body = document.getElementById('sig-body');
  if (!body) return;
  const filtered = _sigFilter === 'all'
    ? _sigResults
    : _sigResults.filter(r => r.sig?.overall === _sigFilter || (!r.sig && _sigFilter === 'neutral'));

  // Sort: buy first, then neutral, then sell; within group by |pct|
  const order = { buy: 0, neutral: 1, sell: 2 };
  const sorted = [...filtered].sort((a, b) => {
    const oa = order[a.sig?.overall || 'neutral'];
    const ob = order[b.sig?.overall || 'neutral'];
    if (oa !== ob) return oa - ob;
    return Math.abs(b.pct || 0) - Math.abs(a.pct || 0);
  });

  body.innerHTML = sorted.map(r =>
    `<div class="sig-card${r.sig?.overall === 'buy' ? ' sig-card-buy' : r.sig?.overall === 'sell' ? ' sig-card-sell' : ''}" data-sym-id="${r.sym.id}" style="cursor:pointer"></div>`
  ).join('');

  sorted.forEach(r => updateSignalCard(r.sym, r.sig, r.pct));
}

function updateSignalSummary() {
  const buys    = _sigResults.filter(r => r.sig?.overall === 'buy').length;
  const sells   = _sigResults.filter(r => r.sig?.overall === 'sell').length;
  const neutral = _sigResults.filter(r => !r.sig || r.sig.overall === 'neutral').length;
  const buyEl  = document.getElementById('sig-cnt-buy');
  const selEl  = document.getElementById('sig-cnt-sell');
  const neuEl  = document.getElementById('sig-cnt-neutral');
  if (buyEl) buyEl.textContent = buys;
  if (selEl) selEl.textContent = sells;
  if (neuEl) neuEl.textContent = neutral;
}

// ══════════════════════════════════════════════════════════════════════════
// NEWS HEATMAP PANEL (v2.33)
// Shows which assets are generating the most news coverage.
// Data: newsHeadlines (RSS) + Finnhub buzz (articlesInLastWeek) for equity.
// ══════════════════════════════════════════════════════════════════════════

// ══════════════════════════════════════════════════════════════════════════
// BAR REPLAY MODE (v2.34)
// Lets users "time-travel" through chart history bar by bar.
// ══════════════════════════════════════════════════════════════════════════

let _replayMode   = false;
let _replayData   = null;   // full chart data snapshot
let _replayIdx    = 0;      // how many bars are currently visible
let _replayPlaying = false;
let _replayTimerId = null;
let _replaySpeeds  = { fast: 80, normal: 250, slow: 600 };
let _replaySpeed   = 'normal';

function buildReplayToolbar() {
  // Inject toolbar right after the chart section header
  const chartSection = document.querySelector('.home-chart-section');
  if (!chartSection || document.getElementById('replay-toolbar')) return;

  // Replay button in chart type tabs
  const tabsEl = document.getElementById('chart-type-tabs');
  if (tabsEl && !tabsEl.querySelector('.replay-btn')) {
    const rBtn = document.createElement('button');
    rBtn.className = 'chart-type-btn replay-btn';
    rBtn.dataset.type = 'replay';
    rBtn.title = 'Bar Replay — time-travel through history';
    rBtn.textContent = '⏮ Replay';
    tabsEl.appendChild(rBtn);
  }

  // Toolbar DOM
  const tb = document.createElement('div');
  tb.id = 'replay-toolbar';
  tb.className = 'replay-toolbar';
  tb.innerHTML = `
    <span class="replay-date" id="replay-date">—</span>
    <button class="replay-ctrl-btn" id="replay-back" title="Step back (←)">◀</button>
    <button class="replay-ctrl-btn play" id="replay-play" title="Play/Pause (Space)">▶ Play</button>
    <button class="replay-ctrl-btn" id="replay-fwd" title="Step forward (→)">▶</button>
    <div class="replay-progress-wrap" id="replay-progress-wrap">
      <div class="replay-progress-fill" id="replay-progress-fill" style="width:0%"></div>
    </div>
    <span class="replay-bar-label" id="replay-bar-label">0/0</span>
    <span class="replay-speed-label">Speed:</span>
    <select class="replay-speed-select" id="replay-speed-select">
      <option value="fast">Fast</option>
      <option value="normal" selected>Normal</option>
      <option value="slow">Slow</option>
    </select>
    <button class="replay-exit-btn" id="replay-exit">✕ Exit</button>
  `;
  // Insert after the canvas-wrap
  const canvasWrap = chartSection.querySelector('.home-chart-canvas-wrap');
  if (canvasWrap) canvasWrap.after(tb);
  else chartSection.appendChild(tb);

  // Replay badge over chart
  const badge = document.createElement('div');
  badge.id = 'replay-mode-badge';
  badge.className = 'replay-mode-badge';
  badge.textContent = '⏮ REPLAY';
  document.querySelector('.home-chart-canvas-wrap')?.appendChild(badge);

  // Wire events
  document.getElementById('replay-back')?.addEventListener('click', () => replayStep(-1));
  document.getElementById('replay-fwd')?.addEventListener('click',  () => replayStep(+1));
  document.getElementById('replay-play')?.addEventListener('click', toggleReplayPlay);
  document.getElementById('replay-exit')?.addEventListener('click', stopReplayMode);
  document.getElementById('replay-speed-select')?.addEventListener('change', e => {
    _replaySpeed = e.target.value;
    if (_replayPlaying) { clearInterval(_replayTimerId); startReplayInterval(); }
  });
  document.getElementById('replay-progress-wrap')?.addEventListener('click', e => {
    if (!_replayData) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct  = (e.clientX - rect.left) / rect.width;
    _replayIdx = Math.max(10, Math.min(_replayData.length, Math.round(pct * _replayData.length)));
    updateReplayUI();
  });
}

function startReplayMode() {
  if (!mainChartData || mainChartData.length < 20) return;
  // Make sure toolbar exists
  buildReplayToolbar();

  _replayMode = true;
  _replayData = [...mainChartData];
  _replayIdx  = Math.max(10, Math.round(_replayData.length * 0.4)); // start at 40%

  document.getElementById('replay-toolbar')?.classList.add('visible');
  document.getElementById('replay-mode-badge')?.classList.add('visible');

  // Update active button
  document.querySelectorAll('#chart-type-tabs .chart-type-btn').forEach(b => b.classList.remove('active'));
  document.querySelector('.chart-type-btn.replay-btn')?.classList.add('active');

  updateReplayUI();
}

function stopReplayMode() {
  _replayMode    = false;
  _replayPlaying = false;
  clearInterval(_replayTimerId);

  document.getElementById('replay-toolbar')?.classList.remove('visible');
  document.getElementById('replay-mode-badge')?.classList.remove('visible');

  // Restore chart type tabs
  document.querySelectorAll('#chart-type-tabs .chart-type-btn').forEach(b => b.classList.remove('active'));
  const activeTypeBtn = document.querySelector(`#chart-type-tabs .chart-type-btn[data-type="${currentChartType}"]`);
  activeTypeBtn?.classList.add('active');

  // Restore full chart
  if (_replayData) {
    const canvas = document.getElementById('main-chart-canvas');
    if (canvas) {
      drawMainChart(canvas, _replayData, selectedChartSym);
      updateSubPanels(_replayData);
    }
  }
  _replayData = null;
}

function replayStep(delta) {
  if (!_replayData) return;
  _replayIdx = Math.max(10, Math.min(_replayData.length, _replayIdx + delta));
  updateReplayUI();
  // Auto-stop at end
  if (_replayIdx >= _replayData.length && _replayPlaying) {
    toggleReplayPlay();
  }
}

function startReplayInterval() {
  const ms = _replaySpeeds[_replaySpeed] || 250;
  _replayTimerId = setInterval(() => replayStep(+1), ms);
}

function toggleReplayPlay() {
  _replayPlaying = !_replayPlaying;
  const btn = document.getElementById('replay-play');
  if (_replayPlaying) {
    if (btn) { btn.textContent = '⏸ Pause'; btn.classList.add('play'); }
    startReplayInterval();
  } else {
    if (btn) { btn.textContent = '▶ Play'; }
    clearInterval(_replayTimerId);
  }
}

function updateReplayUI() {
  if (!_replayData) return;
  const slice = _replayData.slice(0, _replayIdx);
  const canvas = document.getElementById('main-chart-canvas');
  if (canvas) {
    // Show canvas (in case grid/options type was active)
    canvas.style.display = '';
    document.getElementById('main-chart-grid')?.style.setProperty('display', 'none');
    document.getElementById('options-chain-panel')?.style.setProperty('display', 'none');
    drawMainChart(canvas, slice, selectedChartSym);
    updateSubPanels(slice);
  }

  // Update header with replay bar's price
  const bar    = slice[slice.length - 1];
  const priceEl = document.getElementById('main-price');
  if (priceEl && bar) priceEl.textContent = fmtPrice(bar.close, selectedChartSym.fmt);

  // Date label
  const dateEl = document.getElementById('replay-date');
  if (dateEl && bar) {
    const d = new Date(bar.time);
    dateEl.textContent = d.toLocaleDateString('en-US', { month:'short', day:'numeric', year:'2-digit' });
  }

  // Progress
  const pct = (_replayIdx / _replayData.length * 100).toFixed(1);
  const fill = document.getElementById('replay-progress-fill');
  if (fill) fill.style.width = pct + '%';
  const barLbl = document.getElementById('replay-bar-label');
  if (barLbl) barLbl.textContent = `${_replayIdx}/${_replayData.length}`;
}

// ══════════════════════════════════════════════════════════════════════════
// WATCHLIST PROFILES (v2.34)
// Save/load named snapshots of the watchlist for different trading styles.
// ══════════════════════════════════════════════════════════════════════════

const WL_PROFILES = [
  { id: 'swing',     label: '📈 Swing',    desc: 'Multi-day momentum plays'      },
  { id: 'daytrader', label: '⚡ Day',       desc: 'Intraday setups'               },
  { id: 'investor',  label: '🏦 Investor', desc: 'Long-term fundamental holds'   },
  { id: 'macro',     label: '🌍 Macro',    desc: 'Indices, forex, commodities'   },
];

let _activeProfile = localStorage.getItem('fh-wl-profile') || null;

function buildWatchlistProfilesRow() {
  const msPanel = document.getElementById('myspace-panel');
  if (!msPanel || document.getElementById('ms-profiles-row')) return;

  // Find the topbar to insert after it
  const topbar = msPanel.querySelector('.ms-topbar');
  if (!topbar) return;

  const row = document.createElement('div');
  row.id = 'ms-profiles-row';
  row.className = 'ms-profiles-row';
  row.innerHTML = `
    <span class="ms-profile-label">Profile:</span>
    ${WL_PROFILES.map(p => `
      <button class="ms-profile-btn${_activeProfile === p.id ? ' active' : ''}"
        data-profile-id="${p.id}" title="${p.desc}">${p.label}</button>
    `).join('')}
    <button class="ms-profile-save-btn" id="ms-profile-save" title="Save current watchlist to active profile">💾 Save</button>
  `;
  topbar.after(row);

  // Profile load on click
  row.querySelectorAll('.ms-profile-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const pid = btn.dataset.profileId;
      if (_activeProfile === pid) {
        // Deactivate
        _activeProfile = null;
        localStorage.removeItem('fh-wl-profile');
        row.querySelectorAll('.ms-profile-btn').forEach(b => b.classList.remove('active'));
        return;
      }
      loadWatchlistProfile(pid);
    });
  });

  document.getElementById('ms-profile-save')?.addEventListener('click', saveWatchlistProfile);
}

function saveWatchlistProfile() {
  if (!_activeProfile) {
    // Prompt user to select a profile first
    showToast('Select a profile tab first, then save.', 3000);
    return;
  }
  const key = `fh-wl-prof-${_activeProfile}`;
  localStorage.setItem(key, JSON.stringify(watchlistItems));
  const prof = WL_PROFILES.find(p => p.id === _activeProfile);
  showToast(`Profile "${prof?.label || _activeProfile}" saved (${watchlistItems.length} items).`, 2000);
}

function loadWatchlistProfile(profileId) {
  const key  = `fh-wl-prof-${profileId}`;
  const data = localStorage.getItem(key);
  if (!data) {
    // No saved profile yet — just switch label
    _activeProfile = profileId;
    localStorage.setItem('fh-wl-profile', profileId);
    updateProfileButtons();
    showToast(`Profile switched. Add items and hit 💾 Save to store it.`, 2500);
    return;
  }
  try {
    const items = JSON.parse(data);
    if (!Array.isArray(items)) return;
    watchlistItems = items;
    saveWatchlist();
    _activeProfile = profileId;
    localStorage.setItem('fh-wl-profile', profileId);
    updateProfileButtons();
    renderMySpaceCards();
    const prof = WL_PROFILES.find(p => p.id === profileId);
    showToast(`Loaded "${prof?.label || profileId}" — ${items.length} items.`, 2000);
  } catch (_) {}
}

function updateProfileButtons() {
  document.querySelectorAll('#ms-profiles-row .ms-profile-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.profileId === _activeProfile);
  });
}

// ── Simple toast helper (if not already defined) ─────────────────────────
function showToast(msg, duration = 2000) {
  let toast = document.getElementById('fh-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'fh-toast';
    toast.style.cssText = `
      position:fixed;bottom:28px;left:50%;transform:translateX(-50%);
      background:var(--bg-elevated);border:1px solid var(--border-md);
      color:var(--text-hi);padding:8px 18px;border-radius:10px;font-size:11px;
      z-index:9999;pointer-events:none;white-space:nowrap;
      box-shadow:0 8px 24px rgba(0,0,0,0.4);
      animation:panel-spring-in 0.3s cubic-bezier(0.34,1.4,0.64,1) both;
    `;
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.style.display = 'block';
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => { toast.style.display = 'none'; }, duration);
}

// ══════════════════════════════════════════════════════════════════════════
// PRICE LEVEL BREAK ALERTS (v2.34)
// Auto-detects when price crosses a user-drawn S/R annotation line.
// Fires a notification + confetti burst.
// ══════════════════════════════════════════════════════════════════════════

let _srBreachCooldown = {}; // `${sym}|${level}` → timestamp

function checkSRBreaches() {
  if (!selectedChartSym || !mainChartData || mainChartData.length < 2) return;
  const sym  = selectedChartSym.symbol;
  const anns = chartAnnotations[sym];
  if (!anns || anns.length === 0) return;

  const lp = lastKnownPrices[selectedChartSym.id];
  if (!lp) return;
  const price = lp.price;

  const prevBar  = mainChartData[mainChartData.length - 2];
  const prevClose = prevBar ? prevBar.close : price;

  for (const level of anns) {
    const key = `${sym}|${level.toFixed(2)}`;
    const lastBreach = _srBreachCooldown[key] || 0;
    if (Date.now() - lastBreach < 5 * 60_000) continue; // 5-min cooldown

    const crossedUp   = prevClose < level && price >= level;
    const crossedDown = prevClose > level && price <= level;

    if (crossedUp || crossedDown) {
      _srBreachCooldown[key] = Date.now();
      const dir = crossedUp ? '▲ BREAK UP' : '▼ BREAK DN';
      const col = crossedUp ? 'rgba(16,185,129,0.9)' : 'rgba(239,68,68,0.9)';
      // Fire a subtle notification (not via alert system — just toast + optional sound)
      showToast(`${selectedChartSym.label} ${dir} level ${fmtPrice(level, selectedChartSym.fmt)}`, 4000);
      // Visual burst on canvas
      const canvas = document.getElementById('main-chart-canvas');
      if (canvas) {
        const rect = canvas.getBoundingClientRect();
        burstConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2);
      }
      // Also attempt to play alert sound
      try { playAlertSound(); } catch(_) {}
    }
  }
}

const newheatPanel  = document.getElementById('newsheat-panel');
const tfalignPanel  = document.getElementById('tfalign-panel');
let _nhLoaded = false;
let _nhBuzzCache = {}; // symbol → articlesInLastWeek

function buildNewsHeatmapPanel() {
  if (!newheatPanel) return;
  newheatPanel.innerHTML = `
    <div class="newsheat-header">
      <span class="newsheat-title">🗞 News Heatmap</span>
      <button class="newsheat-refresh-btn" id="nh-refresh-btn">↺ Refresh</button>
      <span class="newsheat-sub" id="nh-sub">Loading…</span>
    </div>
    <div class="newsheat-legend">
      <div class="nh-legend-swatch nh-sw-0"></div><span>None</span>
      <div class="nh-legend-swatch nh-sw-1"></div><span>1–2</span>
      <div class="nh-legend-swatch nh-sw-2"></div><span>3–5</span>
      <div class="nh-legend-swatch nh-sw-3"></div><span>6–10</span>
      <div class="nh-legend-swatch nh-sw-4"></div><span>11–20</span>
      <div class="nh-legend-swatch nh-sw-5"></div><span>21+</span>
      <span style="margin-left:auto;font-style:italic">RSS + Finnhub buzz · refreshes with news</span>
    </div>
    <div class="newsheat-grid" id="nh-grid"></div>
  `;
  document.getElementById('nh-refresh-btn')?.addEventListener('click', () => {
    _nhLoaded = false;
    _nhBuzzCache = {};
    loadNewsHeatmap();
  });
}

/**
 * Count how many newsHeadlines mention a given symbol via its keywords.
 */
function countRssHits(sym) {
  const kws = buildNewsKeywords(sym);
  let count = 0;
  for (const item of newsHeadlines) {
    const text = (item.title || '').toLowerCase();
    if (kws.some(k => text.includes(k))) count++;
  }
  return count;
}

/**
 * Map hit count → heat level 0–5
 */
function heatLevel(n) {
  if (n === 0) return 0;
  if (n <= 2)  return 1;
  if (n <= 5)  return 2;
  if (n <= 10) return 3;
  if (n <= 20) return 4;
  return 5;
}

async function loadNewsHeatmap() {
  const grid  = document.getElementById('nh-grid');
  const sub   = document.getElementById('nh-sub');
  if (!grid) return;

  if (sub) sub.textContent = 'Analyzing…';
  grid.innerHTML = '<div style="padding:20px;color:var(--text-lo);font-size:11px">Counting mentions…</div>';

  // ── Compute RSS mention counts for all symbols ────────────────────────
  const heatData = ALL_HOME_SYMBOLS.map(sym => {
    const rssCount = countRssHits(sym);
    const buzz     = _nhBuzzCache[sym.symbol] || 0;
    const total    = rssCount + buzz;
    const lp       = lastKnownPrices[sym.id];
    const pct      = lp ? lp.pct : 0;
    return { sym, rssCount, buzz, total, pct };
  });

  // ── Fetch Finnhub buzz for equity symbols (non-blocking, parallel) ────
  const equitySyms = ALL_HOME_SYMBOLS.filter(s => {
    const t = s.symbol;
    return !t.startsWith('^') && !t.endsWith('=X') && !t.endsWith('=F') &&
           !t.endsWith('-USD') && !t.endsWith('.IS');
  }).slice(0, 12); // limit to 12 to stay within rate limits

  await Promise.allSettled(equitySyms.map(async sym => {
    if (_nhBuzzCache[sym.symbol] !== undefined) return;
    try {
      const key = `fh_sent_${sym.symbol}`;
      const cached = _extCacheGet(key);
      const data = cached || await window.electronAPI.fetchJson(
        `https://finnhub.io/api/v1/news-sentiment?symbol=${encodeURIComponent(sym.symbol)}&token=${FINNHUB_KEY}`
      ).then(r => r.ok ? JSON.parse(r.text) : null);
      if (data?.buzz?.articlesInLastWeek) {
        _nhBuzzCache[sym.symbol] = data.buzz.articlesInLastWeek;
        if (!cached) _extCacheSet(key, data);
      }
    } catch (_) {}
  }));

  // Update buzz in heatData
  heatData.forEach(d => {
    d.buzz  = _nhBuzzCache[d.sym.symbol] || 0;
    d.total = d.rssCount + d.buzz;
  });

  // ── Render ─────────────────────────────────────────────────────────────
  const totalArticles = newsHeadlines.length;
  if (sub) sub.textContent = `${totalArticles} articles scanned · ${new Date().toLocaleTimeString()}`;

  let html = '';
  let lastCat = '';

  // Group by category to add dividers
  HOME_CATEGORIES.forEach(cat => {
    html += `<div class="nh-cat-divider">${cat.label}</div>`;
    cat.symbols.forEach(sym => {
      const d = heatData.find(h => h.sym.id === sym.id);
      if (!d) return;
      const lvl   = heatLevel(d.total);
      const pctCls = d.pct >= 0 ? 'positive' : 'negative';
      const pctStr = (d.pct >= 0 ? '+' : '') + d.pct.toFixed(2) + '%';
      const sentDot = d.pct > 0.5 ? `<span class="nh-sent-dot bull"></span>`
                    : d.pct < -0.5 ? `<span class="nh-sent-dot bear"></span>`
                    : '';
      const shortSym = sym.symbol.replace(/\^/,'').replace(/-USD$/,'').replace(/=X$/,'').replace(/=F$/,'').slice(0,6);
      const barW = d.total > 0 ? Math.min(100, (d.total / 25) * 100).toFixed(0) : 0;
      html += `
        <div class="nh-tile heat-${lvl}" data-sym-id="${sym.id}" title="${sym.label}: ${d.total} articles (${d.rssCount} RSS + ${d.buzz} Finnhub)">
          ${d.total > 0 ? `<div class="nh-tile-badge">${d.total}</div>` : ''}
          <div class="nh-tile-sym">${shortSym}</div>
          <div class="nh-tile-label">${sym.label}</div>
          <div class="nh-tile-bar"><div class="nh-tile-bar-fill" style="width:${barW}%"></div></div>
          <div class="nh-tile-sent">
            ${sentDot}
            <span class="nh-sent-txt ${pctCls}">${pctStr}</span>
          </div>
        </div>`;
    });
  });

  grid.innerHTML = html;

  // ── Click handler → navigate to overview + select symbol ─────────────
  grid.querySelectorAll('.nh-tile[data-sym-id]').forEach(tile => {
    tile.addEventListener('click', () => {
      const sym = ALL_HOME_SYMBOLS.find(s => s.id === tile.dataset.symId);
      if (!sym) return;
      tickDcStep('click_tile');
      switchSite('overview');
      selectMainChartSym(sym);
    });
  });

  _nhLoaded = true;
}

// Expose refresh for external calls (e.g., after fetchNews updates newsHeadlines)
function refreshNewsHeatmapIfOpen() {
  if (currentSite === 'newsheat') loadNewsHeatmap();
}

// ══════════════════════════════════════════════════════════════════════════
// MULTI-TF ALIGNMENT SCANNER (v2.35)
// Scans all home symbols across 1D / 1W / 1M timeframes.
// Per-TF trend = close above EMA20 (bullish) or below (bearish).
// Alignment score = number of TFs that agree on direction.
// ══════════════════════════════════════════════════════════════════════════

let _tfalignLoaded    = false;
let _tfalignFilter    = 'all';          // 'all' | 'bull' | 'bear' | 'mixed'
let _tfalignResults   = [];             // { sym, pct, cells:[{tf,dir}], score, align }

const TFA_TIMEFRAMES = [
  { key: '1d',  range: '5d',   interval: '30m', label: '1D' },
  { key: '1w',  range: '1mo',  interval: '1d',  label: '1W' },
  { key: '1m',  range: '3mo',  interval: '1d',  label: '1M' },
];

function buildTFAlignPanel() {
  if (!tfalignPanel) return;
  tfalignPanel.innerHTML = `
    <div class="tfa-header">
      <div class="tfa-header-row">
        <span class="tfa-title">TF Alignment</span>
        <span class="tfa-subtitle">1D · 1W · 1M trend agreement across all tracked symbols</span>
        <button class="tfa-refresh-btn" id="tfa-refresh-btn">↻ Refresh</button>
      </div>
      <div class="tfa-filter-tabs">
        <button class="tfa-filter-tab active" data-filter="all">All</button>
        <button class="tfa-filter-tab bull-tab" data-filter="bull">🟢 Full Bull (3/3)</button>
        <button class="tfa-filter-tab bear-tab" data-filter="bear">🔴 Full Bear (3/3)</button>
        <button class="tfa-filter-tab" data-filter="mixed">⚡ Mixed</button>
      </div>
      <div class="tfa-summary-row" id="tfa-summary-row"></div>
    </div>
    <div class="tfa-body">
      <div class="tfa-loading" id="tfa-loading">
        <div>Scanning 1D · 1W · 1M trends…</div>
        <div class="tfa-loading-bar"></div>
      </div>
      <div class="tfa-grid" id="tfa-grid" style="display:none"></div>
    </div>
  `;

  // Filter tabs
  tfalignPanel.querySelectorAll('.tfa-filter-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      _tfalignFilter = btn.dataset.filter;
      tfalignPanel.querySelectorAll('.tfa-filter-tab').forEach(b => b.classList.toggle('active', b === btn));
      renderTFAlignGrid();
    });
  });

  // Refresh button
  document.getElementById('tfa-refresh-btn')?.addEventListener('click', () => {
    _tfalignLoaded = false;
    _tfalignResults = [];
    loadTFAlignPanel();
  });
}

// ── Compute single-TF trend direction from chart data ─────────────────────
function computeTFDir(data) {
  if (!data || data.length < 21) return 'neutral';
  const closes = data.map(d => d.close).filter(v => v != null && v > 0);
  if (closes.length < 21) return 'neutral';
  const ema = calcEMA(closes, 20);
  const lastEMA   = ema.slice().reverse().find(v => v != null);
  const lastClose = closes[closes.length - 1];
  if (lastEMA == null) return 'neutral';
  if (lastClose > lastEMA * 1.001) return 'bull';
  if (lastClose < lastEMA * 0.999) return 'bear';
  return 'neutral';
}

// ── Load and compute alignment for all home symbols ───────────────────────
async function loadTFAlignPanel() {
  if (!tfalignPanel) return;
  const loadingEl = document.getElementById('tfa-loading');
  const gridEl    = document.getElementById('tfa-grid');
  if (loadingEl) loadingEl.style.display = '';
  if (gridEl)    gridEl.style.display = 'none';

  const syms = ALL_HOME_SYMBOLS.filter(s => !s.id.startsWith('mover'));
  _tfalignResults = [];

  // Process in batches of 5
  const BATCH = 5;
  for (let b = 0; b < syms.length; b += BATCH) {
    const batch = syms.slice(b, b + BATCH);
    await Promise.allSettled(batch.map(async sym => {
      const cells = [];
      for (const tf of TFA_TIMEFRAMES) {
        try {
          const data = await fetchChartData(sym.symbol, tf.range, tf.interval);
          cells.push({ tf: tf.label, dir: computeTFDir(data) });
        } catch (_) {
          cells.push({ tf: tf.label, dir: 'neutral' });
        }
      }
      // Alignment: count bull/bear agreement
      const bulls = cells.filter(c => c.dir === 'bull').length;
      const bears = cells.filter(c => c.dir === 'bear').length;
      const score = Math.max(bulls, bears);
      let align = 'mixed';
      if (bulls === 3) align = 'full-bull';
      else if (bears === 3) align = 'full-bear';
      else if (bulls > bears) align = 'lean-bull';
      else if (bears > bulls) align = 'lean-bear';

      // Get last known pct change
      const lkp = lastKnownPrices[sym.id];
      const pct  = lkp?.pct ?? null;

      _tfalignResults.push({ sym, cells, score, align, bulls, bears, pct });
    }));
  }

  _tfalignLoaded = true;
  if (loadingEl) loadingEl.style.display = 'none';
  if (gridEl)    gridEl.style.display = '';

  // Update summary row
  const summaryEl = document.getElementById('tfa-summary-row');
  if (summaryEl) {
    const fb = _tfalignResults.filter(r => r.align === 'full-bull').length;
    const fbe = _tfalignResults.filter(r => r.align === 'full-bear').length;
    const mix = _tfalignResults.filter(r => r.align === 'mixed' || r.align.startsWith('lean')).length;
    summaryEl.innerHTML = `
      <span class="tfa-stat">Full Bull <span class="tfa-stat-val bull">${fb}</span></span>
      <span class="tfa-stat">Full Bear <span class="tfa-stat-val bear">${fbe}</span></span>
      <span class="tfa-stat">Mixed <span class="tfa-stat-val">${mix}</span></span>
      <span class="tfa-stat">Loaded <span class="tfa-stat-val">${_tfalignResults.length}</span></span>`;
  }

  renderTFAlignGrid();
}

// ── Render filtered grid ──────────────────────────────────────────────────
function renderTFAlignGrid() {
  const gridEl = document.getElementById('tfa-grid');
  if (!gridEl) return;

  let results = _tfalignResults;
  if (_tfalignFilter === 'bull')  results = results.filter(r => r.align === 'full-bull');
  else if (_tfalignFilter === 'bear') results = results.filter(r => r.align === 'full-bear');
  else if (_tfalignFilter === 'mixed') results = results.filter(r => r.align !== 'full-bull' && r.align !== 'full-bear');

  // Sort: full alignment first, then by |pct| descending
  results = [...results].sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return Math.abs(b.pct ?? 0) - Math.abs(a.pct ?? 0);
  });

  if (results.length === 0) {
    gridEl.innerHTML = '<div class="tfa-loading">No symbols match this filter.</div>';
    return;
  }

  gridEl.innerHTML = results.map(r => {
    const pctStr = r.pct != null
      ? `${r.pct >= 0 ? '+' : ''}${r.pct.toFixed(2)}%`
      : '–';
    const pctCls = r.pct == null ? '' : r.pct > 0 ? 'positive' : r.pct < 0 ? 'negative' : '';

    // Card border class
    let cardCls = 'tfa-card';
    if (r.align === 'full-bull') cardCls += ' full-bull';
    else if (r.align === 'full-bear') cardCls += ' full-bear';
    else cardCls += ' mixed';

    // TF cells HTML
    const cellsHtml = r.cells.map(c => `
      <div class="tfa-cell ${c.dir}">
        <span class="tfa-cell-label">${c.tf}</span>
        ${c.dir === 'bull' ? '▲' : c.dir === 'bear' ? '▼' : '–'}
      </div>`).join('');

    // Score bar
    const barFrac   = (r.score / 3) * 100;
    const barCls    = r.align === 'full-bull' ? 'bull' : r.align === 'full-bear' ? 'bear' : 'neutral';
    const scoreBar  = `
      <div class="tfa-score-bar-wrap">
        <div class="tfa-score-bar-fill ${barCls}" style="width:${barFrac}%"></div>
      </div>`;

    return `
      <div class="${cardCls}" data-sym-id="${r.sym.id}">
        <div class="tfa-card-top">
          <span class="tfa-sym">${r.sym.label.split(' ')[0].replace(/[^A-Z0-9.^]/gi,'').slice(0,6)}</span>
          <span class="tfa-label">${r.sym.label}</span>
          <span class="tfa-pct ${pctCls}">${pctStr}</span>
        </div>
        <div class="tfa-cells">${cellsHtml}</div>
        ${scoreBar}
      </div>`;
  }).join('');

  // Click to navigate
  gridEl.querySelectorAll('.tfa-card[data-sym-id]').forEach(card => {
    card.addEventListener('click', () => {
      const sym = ALL_HOME_SYMBOLS.find(s => s.id === card.dataset.symId);
      if (!sym) return;
      switchSite('overview');
      selectMainChartSym(sym);
    });
  });
}

// ══════════════════════════════════════════════════════════════════════════
// HEAT CALENDAR PANEL (v2.36)
// Shows S&P 500 (^GSPC) daily returns as a color-coded calendar grid.
// Green = positive, Red = negative, intensity scales with magnitude.
// ══════════════════════════════════════════════════════════════════════════

let _heatcalLoaded = false;

function buildHeatCalPanel() {
  if (!heatcalPanel) return;
  heatcalPanel.innerHTML = `
    <div class="hc-topbar">
      <span class="hc-title">Heat Calendar</span>
      <span class="hc-subtitle">S&amp;P 500 daily returns · last 3 months</span>
      <button class="hc-refresh-btn" id="hc-refresh-btn">↻ Refresh</button>
    </div>
    <div class="hc-body" id="hc-body">
      <div class="hc-legend">
        <div class="hc-legend-cell" style="background:rgba(239,68,68,0.8)"></div>
        <span>Strong -</span>
        <div class="hc-legend-cell" style="background:rgba(239,68,68,0.35)"></div>
        <span>Mild -</span>
        <div class="hc-legend-cell" style="background:rgba(100,116,139,0.15)"></div>
        <span>Flat</span>
        <div class="hc-legend-cell" style="background:rgba(16,185,129,0.35)"></div>
        <span>Mild +</span>
        <div class="hc-legend-cell" style="background:rgba(16,185,129,0.8)"></div>
        <span>Strong +</span>
      </div>
      <div id="hc-grid-wrap"><div style="padding:30px;text-align:center;color:var(--text-lo)">Loading…</div></div>
    </div>`;

  document.getElementById('hc-refresh-btn')?.addEventListener('click', () => {
    _heatcalLoaded = false;
    loadHeatCalendar();
  });
}

async function loadHeatCalendar() {
  const gridWrap = document.getElementById('hc-grid-wrap');
  if (!gridWrap) return;
  gridWrap.innerHTML = '<div style="padding:30px;text-align:center;color:var(--text-lo)">Loading…</div>';

  try {
    const data = await fetchChartData('^GSPC', '3mo', '1d');
    if (!data || data.length < 5) { gridWrap.innerHTML = '<div style="padding:20px;color:var(--text-lo)">No data available.</div>'; return; }

    // Build date → pct map
    const dayMap = {};
    let maxAbs = 0;
    for (let i = 1; i < data.length; i++) {
      const prev = data[i - 1].close;
      const curr = data[i].close;
      if (!prev || !curr) continue;
      const pct = ((curr - prev) / prev) * 100;
      // data[i].time is already ms (fetchChartData multiplies by 1000)
      const d   = new Date(data[i].time);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      dayMap[key] = pct;
      maxAbs = Math.max(maxAbs, Math.abs(pct));
    }
    if (maxAbs === 0) maxAbs = 1;

    // Group into months
    const now   = new Date();
    const months = [];
    for (let m = 2; m >= 0; m--) {
      const d  = new Date(now.getFullYear(), now.getMonth() - m, 1);
      months.push({ year: d.getFullYear(), month: d.getMonth() });
    }

    const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December'];

    let html = '';
    months.forEach(({ year, month }) => {
      html += `<div class="hc-month-block">
        <div class="hc-month-label">${MONTH_NAMES[month]} ${year}</div>
        <div class="hc-weekday-row">${WEEKDAYS.map(d => `<div class="hc-weekday-label">${d}</div>`).join('')}</div>`;

      const firstDay = new Date(year, month, 1);
      const lastDay  = new Date(year, month + 1, 0);
      // Monday = 0 (CSS grid), adjust from JS Sunday=0
      const firstDow = (firstDay.getDay() + 6) % 7; // Mon=0

      // Collect all cells
      const cells = [];
      for (let e = 0; e < firstDow; e++) cells.push(null); // empty prefix
      for (let d = 1; d <= lastDay.getDate(); d++) cells.push(d);
      // Pad to fill rows
      while (cells.length % 7 !== 0) cells.push(null);

      // Chunk into rows of 7
      for (let r = 0; r < cells.length; r += 7) {
        html += '<div class="hc-week-row">';
        for (let c = r; c < r + 7; c++) {
          const day = cells[c];
          if (day == null) { html += '<div class="hc-day empty"></div>'; continue; }
          const key = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          const dow = c % 7; // 5=Sat,6=Sun
          if (dow >= 5) {
            html += `<div class="hc-day weekend" title="${key}">${day}</div>`;
            continue;
          }
          const pct = dayMap[key];
          if (pct == null) {
            html += `<div class="hc-day no-data" title="${key}">${day}</div>`;
            continue;
          }
          const intensity = Math.min(1, Math.abs(pct) / maxAbs);
          const alpha = 0.2 + intensity * 0.7;
          const bg = pct >= 0
            ? `rgba(16,185,129,${alpha.toFixed(2)})`
            : `rgba(239,68,68,${alpha.toFixed(2)})`;
          const sg = pct >= 0 ? '+' : '';
          html += `<div class="hc-day has-data" style="background:${bg}" title="${key}: ${sg}${pct.toFixed(2)}%">${day}</div>`;
        }
        html += '</div>';
      }
      html += '</div>';
    });

    gridWrap.innerHTML = html;
    _heatcalLoaded = true;
  } catch (err) {
    gridWrap.innerHTML = '<div style="padding:20px;color:var(--text-lo)">Could not load calendar data.</div>';
  }
}

// ══════════════════════════════════════════════════════════════════════════
// ══════════════════════════════════════════════════════════════════════════
// LIVE PRICE BOTTOM TICKER TAPE (v2.42)
// Bloomberg-style scrolling price bar at bottom of content area.
// All home symbols, live price + pct, click to navigate to chart.
// ══════════════════════════════════════════════════════════════════════════

function buildBottomTicker() {
  const track = document.getElementById('btb-track');
  if (!track || !ALL_HOME_SYMBOLS.length) return;

  const makeItem = sym => {
    const known  = lastKnownPrices[sym.id];
    const price  = known ? fmtPrice(known.price, sym.fmt) : '—';
    const pct    = known ? known.pct : null;
    const sign   = pct != null ? (pct >= 0 ? '+' : '') : '';
    const pctStr = pct != null ? `${sign}${pct.toFixed(2)}%` : '—';
    const cls    = pct == null ? '' : pct >= 0 ? 'up' : 'dn';
    const short  = sym.label.length > 10 ? sym.id.toUpperCase() : sym.label;
    return `<div class="btb-item" data-sym-id="${sym.id}">
      <span class="btb-sym">${short}</span>
      <span class="btb-price" id="btbp-${sym.id}">${price}</span>
      <span class="btb-pct ${cls}" id="btbpct-${sym.id}">${pctStr}</span>
    </div>`;
  };

  const items = ALL_HOME_SYMBOLS.map(makeItem).join('');
  // Double the items for seamless loop
  track.innerHTML = items + items;

  track.addEventListener('click', e => {
    const item = e.target.closest('.btb-item');
    if (!item) return;
    const sym = ALL_HOME_SYMBOLS.find(s => s.id === item.dataset.symId);
    if (sym) { switchSite('overview'); selectMainChartSym(sym); }
  });
}

function updateBottomTickerValue(id, price, pct) {
  // Both copies (for seamless scroll loop)
  document.querySelectorAll(`#btb-track [id="btbp-${id}"]`).forEach(el => {
    el.textContent = price;
  });
  document.querySelectorAll(`#btb-track [id="btbpct-${id}"]`).forEach(el => {
    const sign = pct >= 0 ? '+' : '';
    el.textContent = `${sign}${pct.toFixed(2)}%`;
    el.className   = `btb-pct ${pct >= 0 ? 'up' : 'dn'}`;
  });
  // v2.74: Market direction tint on ticker bar
  if (id === 'sp500') {
    const btb = document.getElementById('bottom-ticker-bar');
    if (btb) {
      const alpha = Math.min(0.08, Math.abs(pct) * 0.018);
      btb.style.background = pct >= 0
        ? `linear-gradient(90deg, rgba(16,185,129,${alpha}) 0%, rgba(0,0,0,0) 40%)`
        : `linear-gradient(90deg, rgba(239,68,68,${alpha}) 0%, rgba(0,0,0,0) 40%)`;
    }
  }
}

// ══════════════════════════════════════════════════════════════════════════
// SYMBOL SCANNER WITH SCREENER FILTERS (v2.41)
// User-defined criteria (RSI, Volume, % Change, ADX, Price) — AND logic.
// Fetches 1mo/1d data for all home symbols in batches, computes metrics.
// ══════════════════════════════════════════════════════════════════════════

let _scannerLoaded  = false;
let _scannerRunning = false;

function buildScannerPanel() {
  if (!scannerPanel) return;
  scannerPanel.innerHTML = `
    <div class="scanner-header">
      <span class="scanner-title">🔍 Symbol Scanner</span>
      <span class="scanner-sub">Screen all market symbols by TA criteria (AND logic) · 1-month daily data</span>
    </div>

    <div class="scanner-criteria" id="scanner-criteria">
      ${[1,2,3].map(n => `
      <div class="sc-row" id="sc-row-${n}">
        <span class="sc-label">${n}</span>
        <select class="sc-metric" id="sc-met-${n}">
          <option value="">— off —</option>
          <option value="rsi_lt">RSI 14 &lt;</option>
          <option value="rsi_gt">RSI 14 &gt;</option>
          <option value="vol_gt">Volume &gt; ×Avg</option>
          <option value="pct_gt">% Change &gt;</option>
          <option value="pct_lt">% Change &lt;</option>
          <option value="adx_gt">ADX 14 &gt;</option>
          <option value="price_lt">Price &lt;</option>
          <option value="price_gt">Price &gt;</option>
        </select>
        <input class="sc-val" id="sc-val-${n}" type="number" placeholder="value" step="any">
      </div>`).join('')}
    </div>

    <button class="scanner-run-btn" id="scanner-run-btn">▶ Run Scan</button>
    <div class="scanner-summary" id="scanner-summary"></div>
    <div class="scanner-results" id="scanner-results">
      <div class="sc-empty">Set criteria above and click Run Scan</div>
    </div>
  `;

  document.getElementById('scanner-run-btn')?.addEventListener('click', () => {
    if (!_scannerRunning) loadScannerPanel();
  });
}

async function loadScannerPanel() {
  if (_scannerRunning) return;
  _scannerRunning = true;
  const btn     = document.getElementById('scanner-run-btn');
  const summary = document.getElementById('scanner-summary');
  const results = document.getElementById('scanner-results');
  if (!btn || !summary || !results) { _scannerRunning = false; return; }

  btn.classList.add('loading');
  btn.textContent = '⏳ Scanning…';
  results.innerHTML = '';
  summary.textContent = '';

  // Read criteria
  const criteria = [1,2,3].map(n => {
    const metric = document.getElementById(`sc-met-${n}`)?.value || '';
    const val    = parseFloat(document.getElementById(`sc-val-${n}`)?.value);
    return { metric, val };
  }).filter(c => c.metric && !isNaN(c.val));

  if (criteria.length === 0) {
    results.innerHTML = '<div class="sc-empty">Add at least one criterion and click Run Scan</div>';
    btn.classList.remove('loading'); btn.textContent = '▶ Run Scan';
    _scannerRunning = false; return;
  }

  const matches = [];
  const syms    = ALL_HOME_SYMBOLS;

  // Batch fetch — 4 at a time
  for (let i = 0; i < syms.length; i += 4) {
    const batch = syms.slice(i, i + 4);
    await Promise.allSettled(batch.map(async sym => {
      try {
        const data = await fetchChartData(sym.symbol, '1mo', '1d');
        if (!data || data.length < 15) return;
        const closes = data.map(d => d.close);
        const vols   = data.map(d => d.volume || 0);
        const n      = closes.length;
        const price  = closes[n - 1];
        const avgVol = vols.reduce((a,b) => a+b, 0) / vols.length;
        const lastVol= vols[n - 1];

        // RSI
        const rsiArr = calcRSI(closes, 14);
        const rsi    = rsiArr.filter(v => v != null).pop() || 50;

        // ADX
        let adx = 0;
        try {
          const adxRes = calcADX(data, 14);
          adx = adxRes?.adx?.filter(v => v != null).pop() || 0;
        } catch(_) {}

        // % change today
        const pct = lastKnownPrices[sym.id]?.pct ?? (n >= 2 && closes[n-2] > 0 ? ((closes[n-1]-closes[n-2])/closes[n-2])*100 : 0);

        // Check ALL criteria (AND logic)
        const pass = criteria.every(c => {
          switch (c.metric) {
            case 'rsi_lt':   return rsi < c.val;
            case 'rsi_gt':   return rsi > c.val;
            case 'vol_gt':   return avgVol > 0 && (lastVol / avgVol) > c.val;
            case 'pct_gt':   return pct > c.val;
            case 'pct_lt':   return pct < c.val;
            case 'adx_gt':   return adx > c.val;
            case 'price_lt': return price < c.val;
            case 'price_gt': return price > c.val;
            default: return true;
          }
        });

        if (pass) matches.push({ sym, price, rsi, adx, pct, lastVol, avgVol });
      } catch(_) {}
    }));
  }

  // Sort by abs(pct) desc
  matches.sort((a, b) => Math.abs(b.pct) - Math.abs(a.pct));

  summary.textContent = `${matches.length} match${matches.length !== 1 ? 'es' : ''} out of ${syms.length} symbols`;

  if (matches.length === 0) {
    results.innerHTML = '<div class="sc-empty">No symbols match all criteria. Try relaxing the conditions.</div>';
  } else {
    results.innerHTML = matches.map(m => {
      const isPos  = m.pct >= 0;
      const pctStr = `${isPos ? '+' : ''}${m.pct.toFixed(2)}%`;
      const bdrCls = isPos ? 'match-bull' : 'match-bear';
      const tags   = criteria.map(c => {
        if (c.metric === 'rsi_lt' || c.metric === 'rsi_gt') return `RSI ${m.rsi.toFixed(0)}`;
        if (c.metric === 'vol_gt') return `${(m.lastVol/m.avgVol).toFixed(1)}× Vol`;
        if (c.metric === 'adx_gt') return `ADX ${m.adx.toFixed(0)}`;
        return '';
      }).filter(Boolean);
      return `
        <div class="sc-result-card ${bdrCls}" data-symbol="${m.sym.symbol}" data-symid="${m.sym.id}">
          <span class="sc-res-sym">${m.sym.symbol}</span>
          <span class="sc-res-lbl">${m.sym.label}</span>
          <span class="sc-res-pct ${isPos ? 'positive' : 'negative'}">${pctStr}</span>
          <div class="sc-res-tags">${tags.map(t => `<span class="sc-res-tag">${t}</span>`).join('')}</div>
        </div>`;
    }).join('');

    // Click → navigate to Overview + select symbol
    results.querySelectorAll('.sc-result-card').forEach(card => {
      card.addEventListener('click', () => {
        const sym = ALL_HOME_SYMBOLS.find(s => s.symbol === card.dataset.symbol);
        if (sym) { switchSite('overview'); selectMainChartSym(sym); }
      });
    });
  }

  btn.classList.remove('loading'); btn.textContent = '▶ Run Scan';
  _scannerLoaded  = true;
  _scannerRunning = false;
}

// ══════════════════════════════════════════════════════════════════════════
// DIVERGENCE ALERT BADGES — My Space Cards (v2.36)
// Scans watchlist symbols for RSI bullish/bearish divergence.
// Uses fetchChartData (cached) + calcRSI + pivot detection.
// ══════════════════════════════════════════════════════════════════════════

const _divAlerts = {}; // symbol → { bull: bool, bear: bool }

async function scanMySpaceDivergences() {
  if (watchlistItems.length === 0) return;

  // Process up to 8 items max to avoid overloading
  const items = watchlistItems.slice(0, 8);
  await Promise.allSettled(items.map(async item => {
    try {
      const data = await fetchChartData(item.symbol, '1mo', '1d');
      if (!data || data.length < 20) return;

      const closes = data.map(d => d.close);
      const rsi    = calcRSI(closes, 14);

      // Pivot detection (window=3) on last 40 bars
      const WIN = 3;
      const N   = Math.min(40, data.length);
      const startI = data.length - N;

      const priceLows  = [], priceHighs = [], rsiLows = [], rsiHighs = [];

      for (let i = startI + WIN; i < data.length - WIN; i++) {
        const c  = closes[i];
        const r  = rsi[i];
        if (r == null) continue;
        // Local low
        let isLow  = true, isHigh = true;
        for (let j = 1; j <= WIN; j++) {
          if (closes[i - j] <= c || closes[i + j] <= c) isLow  = false;
          if (closes[i - j] >= c || closes[i + j] >= c) isHigh = false;
        }
        if (isLow)  { priceLows.push({ i, c, r });  rsiLows.push({ i, c, r }); }
        if (isHigh) { priceHighs.push({ i, c, r }); rsiHighs.push({ i, c, r }); }
      }

      let bullDiv = false, bearDiv = false;

      // Bullish divergence: price makes lower low, RSI makes higher low
      if (priceLows.length >= 2) {
        const a = priceLows[priceLows.length - 2];
        const b = priceLows[priceLows.length - 1];
        if (b.c < a.c && b.r > a.r) bullDiv = true;
      }
      // Bearish divergence: price makes higher high, RSI makes lower high
      if (priceHighs.length >= 2) {
        const a = priceHighs[priceHighs.length - 2];
        const b = priceHighs[priceHighs.length - 1];
        if (b.c > a.c && b.r < a.r) bearDiv = true;
      }

      _divAlerts[item.symbol] = { bull: bullDiv, bear: bearDiv };
      // Update badge in DOM
      const badgeEl = document.getElementById(`msdiv-${item.symbol}`);
      if (badgeEl) {
        let html = '';
        if (bullDiv) html += '<span class="div-badge bull-div">↑ Bull Div</span>';
        if (bearDiv) html += '<span class="div-badge bear-div">↓ Bear Div</span>';
        badgeEl.innerHTML = html;
      }
    } catch (_) {}
  }));
}

// ══════════════════════════════════════════════════════════════════════════
// DAILY CHALLENGE SYSTEM (v2.33)
// A rotating daily task that encourages engagement with app features.
// ══════════════════════════════════════════════════════════════════════════

const DAILY_CHALLENGES = [
  {
    icon: '📊',
    name: 'Signal Hunter',
    desc: 'Explore the TA indicators on today\'s chart.',
    steps: [
      { id: 'open_chart',  text: 'Open Overview and select a symbol' },
      { id: 'toggle_rsi',  text: 'Enable RSI 14 from Indicators menu' },
      { id: 'toggle_macd', text: 'Enable MACD from Indicators menu' },
    ],
  },
  {
    icon: '🗞',
    name: 'News Detective',
    desc: 'Track market-moving news today.',
    steps: [
      { id: 'open_newsheat', text: 'Open the News Heatmap panel' },
      { id: 'click_tile',    text: 'Click a high-heat asset tile' },
      { id: 'read_news',     text: 'Read 3 headlines in the news panel' },
    ],
  },
  {
    icon: '🌍',
    name: 'Global Watcher',
    desc: 'Check how world markets are performing.',
    steps: [
      { id: 'open_globe',  text: 'Open World Markets panel' },
      { id: 'open_pulse',  text: 'Open Macro Pulse panel' },
      { id: 'check_yield', text: 'Look at the Yield Curve for inversions' },
    ],
  },
  {
    icon: '🔍',
    name: 'Insider Tracker',
    desc: 'Follow the smart money today.',
    steps: [
      { id: 'open_insider',  text: 'Open Insider Flows panel' },
      { id: 'filter_buys',   text: 'Filter to show only BUY transactions' },
      { id: 'open_chart',    text: 'Click a company tile to see its chart' },
    ],
  },
  {
    icon: '⚡',
    name: 'Watchlist Pro',
    desc: 'Level up your My Space setup.',
    steps: [
      { id: 'open_myspace', text: 'Open My Space panel' },
      { id: 'add_alert',    text: 'Set a price alert on any position' },
      { id: 'add_tag',      text: 'Tag a watchlist item (📈 Longs, ⭐ Core, etc.)' },
    ],
  },
  {
    icon: '📈',
    name: 'Chart Master',
    desc: 'Master the chart tools today.',
    steps: [
      { id: 'open_chart',   text: 'Select a stock in Overview' },
      { id: 'use_compare',  text: 'Use Compare mode to add S&P 500' },
      { id: 'add_drawing',  text: 'Double-click chart to draw an S/R line' },
    ],
  },
  {
    icon: '🧠',
    name: 'Macro Mind',
    desc: 'Understand the macro environment.',
    steps: [
      { id: 'check_geopulse', text: 'Check GeoPulse score in Daily Brief' },
      { id: 'open_calendar',  text: 'Open Calendar and find next FOMC date' },
      { id: 'open_sentiment', text: 'Check WSB Sentiment panel' },
    ],
  },
];

let _dcTodayChallenge = null;
let _dcProgress       = {}; // stepId → boolean

function getTodayChallenge() {
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  // Deterministic index from date string
  const hash  = today.split('').reduce((acc, c) => acc * 31 + c.charCodeAt(0), 7) >>> 0;
  return DAILY_CHALLENGES[hash % DAILY_CHALLENGES.length];
}

function loadDcProgress() {
  const today = new Date().toISOString().slice(0, 10);
  try {
    const saved = JSON.parse(localStorage.getItem('fh-dc-progress') || '{}');
    // Reset if from a different day
    return saved.date === today ? (saved.progress || {}) : {};
  } catch { return {}; }
}

function saveDcProgress() {
  const today = new Date().toISOString().slice(0, 10);
  localStorage.setItem('fh-dc-progress', JSON.stringify({ date: today, progress: _dcProgress }));
}

function dcStepsDone() {
  if (!_dcTodayChallenge) return 0;
  return _dcTodayChallenge.steps.filter(s => _dcProgress[s.id]).length;
}

function updateDcBadge() {
  const btn = document.getElementById('daily-challenge-btn');
  const lbl = document.getElementById('dc-prog-label');
  if (!btn || !_dcTodayChallenge) return;
  const done  = dcStepsDone();
  const total = _dcTodayChallenge.steps.length;
  btn.style.display = 'flex';
  if (lbl) lbl.textContent = `${done}/${total}`;
  // Completed styling
  btn.style.borderColor = done >= total ? 'rgba(16,185,129,0.50)' : '';
  btn.style.background  = done >= total ? 'rgba(16,185,129,0.12)' : '';
  btn.querySelector('.dc-icon').textContent = done >= total ? '✅' : '🎯';
}

/**
 * Mark a daily challenge step as done (auto-tick from app events).
 * @param {string} stepId
 */
function tickDcStep(stepId) {
  if (!_dcTodayChallenge) return;
  const hasStep = _dcTodayChallenge.steps.some(s => s.id === stepId);
  if (!hasStep || _dcProgress[stepId]) return;
  _dcProgress[stepId] = true;
  saveDcProgress();
  updateDcBadge();
  // Rebuild overlay content if open
  if (document.getElementById('challenge-overlay')?.classList.contains('open')) {
    buildChallengeOverlay();
  }
}

function buildChallengeOverlay() {
  const overlay = document.getElementById('challenge-overlay');
  const box     = document.getElementById('challenge-box');
  if (!box || !_dcTodayChallenge) return;

  const ch    = _dcTodayChallenge;
  const today = new Date().toLocaleDateString('en-US', { weekday:'long', month:'short', day:'numeric' });
  const done  = dcStepsDone();
  const total = ch.steps.length;
  const pct   = Math.round((done / total) * 100);

  box.innerHTML = `
    <div class="challenge-box-hdr">
      <div class="challenge-box-icon">${ch.icon}</div>
      <div class="challenge-box-title">${ch.name}</div>
      <div class="challenge-box-date">${today}</div>
    </div>
    <div class="challenge-task">
      <div class="challenge-task-name">${ch.desc}</div>
      <div class="challenge-task-desc">Complete all steps to finish today's challenge.</div>
    </div>
    <div class="challenge-prog-wrap">
      <div class="challenge-prog-bar">
        <div class="challenge-prog-fill" id="dc-fill" style="width:${pct}%"></div>
      </div>
      <div class="challenge-prog-txt">${done} / ${total} done</div>
    </div>
    <div class="challenge-steps" id="dc-steps">
      ${ch.steps.map(s => `
        <div class="challenge-step${_dcProgress[s.id] ? ' done' : ''}" data-step-id="${s.id}">
          <div class="step-check">${_dcProgress[s.id] ? '✓' : ''}</div>
          <div class="step-text">${s.text}</div>
        </div>
      `).join('')}
    </div>
    <div class="challenge-close-hint" id="dc-close-hint">Press Esc or click outside to close</div>
  `;

  // Step toggle (manual check-off)
  box.querySelectorAll('.challenge-step').forEach(el => {
    el.addEventListener('click', () => {
      const sid = el.dataset.stepId;
      _dcProgress[sid] = !_dcProgress[sid];
      saveDcProgress();
      buildChallengeOverlay();
      updateDcBadge();
      // Celebrate completion
      if (dcStepsDone() >= _dcTodayChallenge.steps.length) {
        setTimeout(() => burstConfetti(window.innerWidth / 2, window.innerHeight / 2), 100);
      }
    });
  });

  document.getElementById('dc-close-hint')?.addEventListener('click', closeChallengeOverlay);
}

function openChallengeOverlay() {
  const overlay = document.getElementById('challenge-overlay');
  if (!overlay) return;
  buildChallengeOverlay();
  overlay.classList.add('open');
}

function closeChallengeOverlay() {
  document.getElementById('challenge-overlay')?.classList.remove('open');
}

function initDailyChallenge() {
  _dcTodayChallenge = getTodayChallenge();
  _dcProgress       = loadDcProgress();
  updateDcBadge();

  // Wire up button
  document.getElementById('daily-challenge-btn')?.addEventListener('click', openChallengeOverlay);

  // Escape closes overlay
  // (handled in handleGlobalKeys)
  document.getElementById('challenge-overlay')?.addEventListener('click', e => {
    if (e.target === e.currentTarget) closeChallengeOverlay();
  });
}

// ══════════════════════════════════════════════════════════════════════════
// MARKET DNA PANEL (v2.91)
// Regime detector · Conviction scoreboard · Auto-generated edge narrative
// Zero new API calls — built from cached lastKnownPrices, chartDataCache,
// riskPrices, and lastBreadthScore.
// ══════════════════════════════════════════════════════════════════════════

/** Compute a 0–100 conviction score + label for a given symbol id */
function calcConvictionScore(symId) {
  const lk = lastKnownPrices[symId];
  if (!lk) return null;

  let score = 50;
  const reasons = [];

  // Price momentum
  const pct = lk.pct ?? 0;
  if      (pct >  2.0) { score += 15; reasons.push('Strong momentum +' + pct.toFixed(1) + '%'); }
  else if (pct >  0.8) { score +=  8; reasons.push('Positive momentum +' + pct.toFixed(1) + '%'); }
  else if (pct < -2.0) { score -= 15; reasons.push('Selling pressure ' + pct.toFixed(1) + '%'); }
  else if (pct < -0.8) { score -=  8; reasons.push('Mild pullback ' + pct.toFixed(1) + '%'); }

  // Chart indicators (RSI, EMA, ADX, Volume)
  const dataKey = Object.keys(chartDataCache).find(k => k.startsWith(symId + '|'));
  const data    = dataKey ? chartDataCache[dataKey] : null;

  if (data && data.length >= 20) {
    const closes = data.map(d => d.close);

    // RSI 14
    const rsiArr = calcRSI(closes, 14);
    const lastRsi = rsiArr[rsiArr.length - 1];
    if (lastRsi != null) {
      if      (lastRsi <= 30) { score += 18; reasons.push('RSI oversold ' + lastRsi.toFixed(0)); }
      else if (lastRsi <= 45) { score +=  8; reasons.push('RSI neutral-low ' + lastRsi.toFixed(0)); }
      else if (lastRsi >= 70) { score -= 12; reasons.push('RSI overbought ' + lastRsi.toFixed(0)); }
      else if (lastRsi >= 60) { score += 10; reasons.push('RSI bullish zone ' + lastRsi.toFixed(0)); }
      else                    { score +=  4; }
    }

    // EMA alignment
    if (closes.length >= 50) {
      const ema20  = calcEMA(closes, 20);
      const ema50  = calcEMA(closes, 50);
      const lastCl = closes[closes.length - 1];
      const e20    = ema20[ema20.length - 1];
      const e50    = ema50[ema50.length - 1];
      if (e20 && e50) {
        if      (lastCl > e20 && e20 > e50) { score += 14; reasons.push('Bullish EMA alignment'); }
        else if (lastCl < e20 && e20 < e50) { score -= 14; reasons.push('Bearish EMA alignment'); }
        else if (lastCl > e20)              { score +=  6; reasons.push('Above EMA20'); }
      }
    }

    // ADX strength
    if (data.length >= 28) {
      const adxArr  = calcADX(data, 14);
      const lastAdx = adxArr[adxArr.length - 1];
      if      (lastAdx != null && lastAdx > 25) { score += 10; reasons.push('Strong trend ADX ' + lastAdx.toFixed(0)); }
      else if (lastAdx != null && lastAdx < 15) { score -=  5; reasons.push('Weak trend ADX ' + lastAdx.toFixed(0)); }
    }

    // Volume spike
    if (data.length >= 10) {
      const vols   = data.map(d => d.volume || 0).filter(v => v > 0);
      const avgVol = vols.slice(-20).reduce((a, b) => a + b, 0) / Math.min(20, vols.length);
      const lastV  = vols[vols.length - 1];
      if (avgVol > 0 && lastV > 1.8 * avgVol) { score += 8; reasons.push('Volume surge ×' + (lastV / avgVol).toFixed(1)); }
    }
  }

  // Day range position
  if (lk.dayHigh && lk.dayLow && lk.dayHigh > lk.dayLow) {
    const pos = (lk.price - lk.dayLow) / (lk.dayHigh - lk.dayLow);
    if      (pos > 0.80) { score += 6; reasons.push('Near day high'); }
    else if (pos < 0.20) { score -= 6; reasons.push('Near day low'); }
  }

  score = Math.max(0, Math.min(100, Math.round(score)));

  let label, color;
  if      (score >= 80) { label = 'STRONG BULL'; color = '#22c55e'; }
  else if (score >= 65) { label = 'BULLISH';     color = '#4ade80'; }
  else if (score >= 52) { label = 'MILD BULL';   color = '#86efac'; }
  else if (score >= 48) { label = 'NEUTRAL';     color = '#94a3b8'; }
  else if (score >= 35) { label = 'MILD BEAR';   color = '#f87171'; }
  else if (score >= 20) { label = 'BEARISH';     color = '#ef4444'; }
  else                  { label = 'STRONG BEAR'; color = '#dc2626'; }

  return { score, label, color, reasons: reasons.slice(0, 2) };
}

/** Auto-generate market edge narrative */
function generateMarketEdge() {
  const sp    = lastKnownPrices['sp500'];
  const btc   = lastKnownPrices['btc'];
  const gold  = lastKnownPrices['gold'];
  const vix   = riskPrices['vix'];
  const bread = lastBreadthScore ?? 50;
  const lines = [];

  if (sp) {
    if      (sp.pct >  1.5) lines.push('Equities surging — S&P ' + (sp.pct > 0 ? '+' : '') + sp.pct.toFixed(1) + '% leads broad rally.');
    else if (sp.pct >  0.3) lines.push('Equity markets grind higher with mild S&P gains of +' + sp.pct.toFixed(1) + '%.');
    else if (sp.pct < -1.5) lines.push('Risk-off session — S&P drops ' + sp.pct.toFixed(1) + '%, selling is broad-based.');
    else if (sp.pct < -0.3) lines.push('Light distribution in equities, S&P slipping ' + sp.pct.toFixed(1) + '%.');
    else                    lines.push('Equity markets consolidating — S&P flat near ±0.3%.');
  }

  if (vix) {
    if      (vix.price < 15) lines.push('VIX at ' + vix.price.toFixed(1) + ' — complacency zone, markets priced for calm.');
    else if (vix.price < 20) lines.push('VIX ' + vix.price.toFixed(1) + ' signals low fear; trend-following setups favoured.');
    else if (vix.price < 28) lines.push('Elevated VIX ' + vix.price.toFixed(1) + ' — hedging activity ticking higher.');
    else                     lines.push('High VIX ' + vix.price.toFixed(1) + ' — panic conditions, mean-reversion opportunities.');
  }

  if      (bread >= 70) lines.push('Breadth strong (' + bread.toFixed(0) + '% advancers) — rally has wide sector participation.');
  else if (bread >= 55) lines.push('Breadth healthy at ' + bread.toFixed(0) + '% — most sectors joining the move.');
  else if (bread <= 35) lines.push('Weak breadth (' + bread.toFixed(0) + '% advancers) — narrow leadership signals caution.');
  else                  lines.push('Mixed breadth ' + bread.toFixed(0) + '% — selective market, stock-picking environment.');

  if (btc && Math.abs(btc.pct) > 1.5) {
    lines.push('BTC ' + (btc.pct > 0 ? '▲+' : '▼') + btc.pct.toFixed(1) + '% — crypto ' + (btc.pct > 0 ? 'adding risk appetite.' : 'weighing on risk sentiment.'));
  }
  if (gold && Math.abs(gold.pct) > 0.8) {
    lines.push('Gold ' + (gold.pct > 0 ? '+' : '') + gold.pct.toFixed(1) + '% — ' + (gold.pct > 0 ? 'safe-haven bid active.' : 'risk-on rotation away from gold.'));
  }

  return lines.slice(0, 3).join(' ');
}

/** Detect current market regime */
function detectMarketRegime() {
  const vix   = riskPrices['vix']?.price;
  const bread = lastBreadthScore ?? 50;
  const sp    = lastKnownPrices['sp500'];

  let regime = 'NEUTRAL', icon = '⚖️', color = '#94a3b8', desc = 'Mixed conditions — await confirmation';

  if (vix != null && sp) {
    const spPct = sp.pct ?? 0;
    if      (spPct >  0.5 && bread > 55 && vix < 22) { regime = 'BULL TREND'; icon = '📈'; color = '#22c55e'; desc = 'Risk assets advancing on broad participation'; }
    else if (spPct < -0.5 && bread < 45 && vix > 20) { regime = 'BEAR TREND'; icon = '📉'; color = '#ef4444'; desc = 'Selling pressure across most sectors'; }
    else if (vix > 28)                                 { regime = 'VOLATILE';   icon = '⚡'; color = '#f59e0b'; desc = 'High volatility — elevated VIX ' + vix.toFixed(1); }
    else if (bread > 60 && spPct > 0)                  { regime = 'RISK ON';    icon = '🟢'; color = '#4ade80'; desc = 'Broad risk appetite, ' + bread.toFixed(0) + '% sectors advancing'; }
    else if (bread < 40 && spPct < 0)                  { regime = 'RISK OFF';   icon = '🔴'; color = '#f87171'; desc = 'Defensive rotation, only ' + bread.toFixed(0) + '% sectors advancing'; }
    else if (Math.abs(spPct) < 0.2 && vix < 18)        { regime = 'RANGING';    icon = '↔️'; color = '#818cf8'; desc = 'Low-volatility consolidation phase'; }
  }
  return { regime, icon, color, desc };
}

/** Build HTML + render Market DNA panel */
function buildMarketDNAPanel() {
  if (!dnaPanel) return;
  const { regime, icon, color, desc } = detectMarketRegime();
  const edge = generateMarketEdge();

  const vix    = riskPrices['vix'];
  const dxy    = riskPrices['dxy'];
  const bread  = lastBreadthScore ?? 50;
  const fgScore = vix ? Math.round(100 - Math.min(100, Math.max(0, (vix.price - 10) / 40 * 100))) : null;
  const fgLabel = fgScore == null ? '—' : fgScore >= 75 ? 'Extreme Greed' : fgScore >= 55 ? 'Greed' : fgScore >= 45 ? 'Neutral' : fgScore >= 25 ? 'Fear' : 'Extreme Fear';
  const fgColor = fgScore == null ? '#94a3b8' : fgScore >= 75 ? '#22c55e' : fgScore >= 55 ? '#4ade80' : fgScore >= 45 ? '#94a3b8' : fgScore >= 25 ? '#f87171' : '#ef4444';

  // Conviction scoreboard
  const scored = ALL_HOME_SYMBOLS
    .filter(s => lastKnownPrices[s.id])
    .map(s => ({ sym: s, cv: calcConvictionScore(s.id) }))
    .filter(x => x.cv != null)
    .sort((a, b) => b.cv.score - a.cv.score);

  const convHTML = scored.map((x, i) => {
    const { sym, cv } = x;
    const lk  = lastKnownPrices[sym.id];
    const pct = lk?.pct ?? 0;
    const pSign   = pct >= 0 ? '+' : '';
    const pctColor = pct >= 0 ? '#4ade80' : '#f87171';
    const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : '';
    return `<div class="dna-conv-row" data-symbol="${sym.symbol}" title="${cv.reasons.join(' · ')}">
      <div class="dna-conv-left">
        <span class="dna-conv-medal">${medal}</span>
        <span class="dna-conv-label">${sym.label}</span>
        <span class="dna-conv-pct" style="color:${pctColor}">${pSign}${pct.toFixed(1)}%</span>
      </div>
      <div class="dna-conv-bar-wrap">
        <div class="dna-conv-bar" style="width:${cv.score}%;background:${cv.color}22;border-right:2px solid ${cv.color}"></div>
      </div>
      <div class="dna-conv-right">
        <span class="dna-conv-score" style="color:${cv.color}">${cv.score}</span>
        <span class="dna-conv-lbl">${cv.label}</span>
      </div>
    </div>`;
  }).join('');

  const ts = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  dnaPanel.innerHTML = `
    <div class="dna-wrap">
      <div class="dna-panel-header">
        <span class="dna-panel-title">🧬 Market DNA</span>
        <span class="dna-panel-ts">Updated ${ts}</span>
        <button class="dna-refresh-btn" id="dna-refresh-btn">↺</button>
      </div>

      <div class="dna-top-row">
        <div class="dna-regime-card" style="--rc:${color}">
          <div class="dna-regime-icon">${icon}</div>
          <div class="dna-regime-name" style="color:${color}">${regime}</div>
          <div class="dna-regime-desc">${desc}</div>
        </div>
        <div class="dna-edge-card">
          <div class="dna-edge-title">TODAY'S EDGE</div>
          <div class="dna-edge-text">${edge || 'Gathering market intelligence — refresh when data loads.'}</div>
        </div>
      </div>

      <div class="dna-section-label">MACRO DNA</div>
      <div class="dna-macro-grid">
        <div class="dna-macro-tile">
          <div class="dna-macro-key">VIX</div>
          <div class="dna-macro-val" style="color:${vix ? (vix.price < 20 ? '#22c55e' : vix.price < 28 ? '#f59e0b' : '#ef4444') : '#94a3b8'}">${vix ? vix.price.toFixed(1) : '—'}</div>
          <div class="dna-macro-sub">${vix ? (vix.price < 20 ? 'Low Fear' : vix.price < 28 ? 'Elevated' : 'High Fear') : 'Loading…'}</div>
        </div>
        <div class="dna-macro-tile">
          <div class="dna-macro-key">BREADTH</div>
          <div class="dna-macro-val" style="color:${bread >= 60 ? '#22c55e' : bread <= 40 ? '#ef4444' : '#94a3b8'}">${bread.toFixed(0)}%</div>
          <div class="dna-macro-sub">${bread >= 60 ? 'Broad Rally' : bread <= 40 ? 'Narrow Mkt' : 'Mixed'}</div>
        </div>
        <div class="dna-macro-tile">
          <div class="dna-macro-key">DXY</div>
          <div class="dna-macro-val" style="color:${dxy ? (dxy.pct > 0 ? '#f87171' : '#4ade80') : '#94a3b8'}">${dxy ? dxy.price.toFixed(2) : '—'}</div>
          <div class="dna-macro-sub">${dxy ? (dxy.pct > 0.2 ? '↑ Dollar Strong' : dxy.pct < -0.2 ? '↓ Dollar Weak' : '→ Flat') : 'Loading…'}</div>
        </div>
        <div class="dna-macro-tile">
          <div class="dna-macro-key">FEAR/GREED</div>
          <div class="dna-macro-val" style="color:${fgColor}">${fgScore ?? '—'}</div>
          <div class="dna-macro-sub">${fgLabel}</div>
        </div>
      </div>

      <div class="dna-section-label">CONVICTION SCOREBOARD <span class="dna-score-legend">0 Bear · 50 Neutral · 100 Bull</span></div>
      <div class="dna-conv-list">${convHTML}</div>
    </div>
  `;

  document.getElementById('dna-refresh-btn')?.addEventListener('click', buildMarketDNAPanel);

  dnaPanel.querySelectorAll('.dna-conv-row[data-symbol]').forEach(row => {
    row.addEventListener('click', () => {
      const sym = ALL_HOME_SYMBOLS.find(s => s.symbol === row.dataset.symbol);
      if (sym) { switchSite('overview'); selectMainChartSym(sym); }
    });
  });
}

function loadMarketDNA() { buildMarketDNAPanel(); }

// ── Hide all custom panels (called before every site switch) ─────────────
function hideAllPanels() {
  homePanel.classList.remove('active');
  myspacePanel.classList.remove('active');
  heatmapPanel.classList.remove('active');
  pulsePanel.classList.remove('active');
  calendarPanel.classList.remove('active');
  sentimentPanel.classList.remove('active');
  if (globePanel) globePanel.classList.remove('active');
  insiderPanel?.classList.remove('active');
  signalsPanel?.classList.remove('active');
  newheatPanel?.classList.remove('active');
  tfalignPanel?.classList.remove('active');
  if (scannerPanel) scannerPanel.style.display = 'none';
  dnaPanel?.classList.remove('active');
  stopHeatmapRefresh();
  stopPulseRefresh();
  stopSentimentRefresh();
  webviews.forEach(wv => wv.classList.remove('active'));
}

// ── Switch site ───────────────────────────────
function switchSite(siteId) {
  if (siteId === currentSite) return;
  currentSite = siteId;

  navBtns.forEach(btn => btn.classList.toggle('active', btn.dataset.site === siteId));

  if (siteId === 'overview') {
    hideAllPanels();
    homePanel.classList.add('active');
    urlBar.dataset.site = 'overview';
    urlBadgeText.textContent = '⊞';
    urlText.textContent = 'Market Overview';
    zoomLabel.textContent = '100%';
    hideLoading();
    return;
  }

  if (siteId === 'myspace') {
    hideAllPanels();
    myspacePanel.classList.add('active');
    urlBar.dataset.site = 'myspace';
    urlBadgeText.textContent = '★';
    urlText.textContent = 'My Space — Watchlist & Alerts';
    tickDcStep('open_myspace');
    zoomLabel.textContent = '100%';
    hideLoading();
    renderMySpaceCards();
    setTimeout(scanMySpaceDivergences, 800); // async divergence scan after render
    return;
  }

  if (siteId === 'heatmap') {
    hideAllPanels();
    heatmapPanel.classList.add('active');
    urlBar.dataset.site = 'heatmap';
    urlBadgeText.textContent = '▦';
    urlText.textContent = 'Sector Heatmap — S&P 500';
    zoomLabel.textContent = '100%';
    hideLoading();
    startHeatmapRefresh();
    return;
  }

  if (siteId === 'pulse') {
    hideAllPanels();
    pulsePanel.classList.add('active');
    urlBar.dataset.site = 'pulse';
    urlBadgeText.textContent = '📊';
    urlText.textContent = 'Pulse — Fear & Greed · Macro · Yield Curve';
    zoomLabel.textContent = '100%';
    hideLoading();
    startPulseRefresh();
    tickDcStep('open_pulse');
    return;
  }

  if (siteId === 'calendar') {
    hideAllPanels();
    calendarPanel.classList.add('active');
    urlBar.dataset.site = 'calendar';
    urlBadgeText.textContent = '📅';
    urlText.textContent = 'Earnings Calendar';
    zoomLabel.textContent = '100%';
    hideLoading();
    return;
  }

  if (siteId === 'sentiment') {
    hideAllPanels();
    sentimentPanel.classList.add('active');
    urlBar.dataset.site = 'sentiment';
    urlBadgeText.textContent = '🔥';
    urlText.textContent = 'Sentiment — WSB · Correlation Matrix';
    zoomLabel.textContent = '100%';
    hideLoading();
    startSentimentRefresh();
    return;
  }

  if (siteId === 'insider') {
    hideAllPanels();
    insiderPanel.classList.add('active');
    urlBar.dataset.site = 'insider';
    urlBadgeText.textContent = '👤';
    urlText.textContent = 'Insider Flows';
    tickDcStep('open_insider');
    zoomLabel.textContent = '—';
    hideLoading();
    if (!_insiderData.length) loadInsiderFlowsPanel();
    return;
  }

  if (siteId === 'signals') {
    hideAllPanels();
    signalsPanel.classList.add('active');
    urlBar.dataset.site = 'signals';
    urlBadgeText.textContent = '📊';
    urlText.textContent = 'TA Signal Scanner';
    zoomLabel.textContent = '—';
    hideLoading();
    if (!_signalsLoaded) loadSignalsPanel();
    return;
  }

  /* Globe panel removed in v2.92 */

  if (siteId === 'newsheat') {
    hideAllPanels();
    newheatPanel.classList.add('active');
    urlBar.dataset.site = 'newsheat';
    urlBadgeText.textContent = '🗞';
    urlText.textContent = 'News Heatmap — Asset Spotlight Tracker';
    zoomLabel.textContent = '—';
    hideLoading();
    if (!_nhLoaded) loadNewsHeatmap();
    // Mark challenge step
    tickDcStep('open_newsheat');
    return;
  }

  if (siteId === 'tfalign') {
    hideAllPanels();
    tfalignPanel.classList.add('active');
    urlBar.dataset.site = 'tfalign';
    urlBadgeText.textContent = '≡';
    urlText.textContent = 'Multi-TF Alignment — 1D · 1W · 1M Trend Scanner';
    zoomLabel.textContent = '—';
    hideLoading();
    if (!_tfalignLoaded) loadTFAlignPanel();
    return;
  }

  if (siteId === 'scanner') {
    hideAllPanels();
    if (scannerPanel) { scannerPanel.style.display = ''; }
    urlBar.dataset.site = 'scanner';
    urlBadgeText.textContent = '🔍';
    urlText.textContent = 'Symbol Scanner — Screener with TA Criteria';
    zoomLabel.textContent = '—';
    hideLoading();
    return;
  }

  if (siteId === 'dna') {
    hideAllPanels();
    dnaPanel.classList.add('active');
    urlBar.dataset.site = 'dna';
    urlBadgeText.textContent = '🧬';
    urlText.textContent = 'Market DNA — Regime · Conviction · Edge';
    zoomLabel.textContent = '—';
    hideLoading();
    loadMarketDNA();
    return;
  }

  hideAllPanels();
  webviews.forEach(wv => wv.classList.toggle('active', wv.id === `wv-${siteId}`));

  const wv = getWV(siteId);
  if (!wv) return; // Guard: unknown siteId
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
  if (currentSite === 'overview') {
    fetchHomeData();
    fetchRiskData();
    fetchAndUpdateTickers();
    const clk = document.getElementById('db-session-clock');
    if (clk && typeof drawSessionClock === 'function') drawSessionClock(clk);
    return;
  }
  // Custom panels (no webview) — call their refresh function directly
  if (currentSite === 'myspace')   { renderMySpaceCards(); return; }
  if (currentSite === 'pulse')     { refreshPulsePanel(); return; }
  if (currentSite === 'sentiment') { refreshSentimentPanel(); return; }
  if (currentSite === 'heatmap')   { try { loadHeatmapData(); } catch(_) {} return; }
  /* globe removed */
  if (currentSite === 'signals')   { _signalsLoaded = false; loadSignalsPanel(); return; }
  if (currentSite === 'newsheat')  { _nhLoaded = false; loadNewsHeatmap(); return; }
  if (currentSite === 'tfalign')   { _tfalignLoaded = false; loadTFAlignPanel(); return; }
  if (currentSite === 'scanner')   { loadScannerPanel(); return; }
  if (currentSite === 'calendar')  { return; }
  if (currentSite === 'insider')   { INSIDER_WATCH_SYMBOLS.forEach(sym => delete _extCache[`fh_insider_${sym}`]); loadInsiderFlowsPanel(); return; }
  // External webview sites
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
    if (e.key === 'w' || e.key === 'W') { switchSite('myspace'); return; }
  }
  if (e.key === 'F5') btnRefresh.click();
  if (e.altKey && e.key === 'ArrowLeft')  btnBack.click();
  if (e.altKey && e.key === 'ArrowRight') btnForward.click();
  if (e.key === 'Escape' && settingsPanel.classList.contains('open')) settingsPanel.classList.remove('open');
});

// ── Global Keyboard Shortcuts (Bloomberg-style) ───────────────────────────────
function _clickTfBtn(range) {
  const btn = document.querySelector(`#main-tf-tabs [data-range="${range}"]`);
  if (btn) btn.click();
}
function _clickChartTypeBtn(type) {
  const btn = document.querySelector(`#chart-type-tabs [data-type="${type}"]`);
  if (btn) btn.click();
}
function handleGlobalKeys(e) {
  // Ignore if typing in any input/textarea
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) return;
  if (e.ctrlKey || e.metaKey || e.altKey) return;
  const isHome = homePanel && homePanel.classList.contains('active');
  switch (e.key) {
    case '/':
      e.preventDefault();
      openCommandPalette();
      break;
    case '?':
      e.preventDefault();
      openHelpOverlay();
      break;
    case 'Escape':
      document.getElementById('ind-picker')?.classList.remove('open');
      if (_cmdPaletteOpen)  { e.preventDefault(); closeCommandPalette(); }
      if (_helpOverlayOpen) { e.preventDefault(); closeHelpOverlay(); }
      if (_symNoteOpen)     { e.preventDefault(); closeSymNoteFloat(); }
      if (_symLensOpen)     { e.preventDefault(); closeSymbolLens(); }
      if (document.getElementById('challenge-overlay')?.classList.contains('open')) {
        e.preventDefault(); closeChallengeOverlay();
      }
      break;
    case '1': if (isHome) { e.preventDefault(); _clickTfBtn('5d');  } break;
    case '2': if (isHome) { e.preventDefault(); _clickTfBtn('1mo'); } break;
    case '3': if (isHome) { e.preventDefault(); _clickTfBtn('3mo'); } break;
    case '4': if (isHome) { e.preventDefault(); _clickTfBtn('1y');  } break;
    case '5': if (isHome) { e.preventDefault(); _clickTfBtn('5y');  } break;
    case 'a': case 'A': if (isHome) { e.preventDefault(); _clickChartTypeBtn('area');   } break;
    case 'g': case 'G': if (isHome) { e.preventDefault(); _clickChartTypeBtn('grid');    } break;
    case 'o': case 'O': if (isHome) { e.preventDefault(); _clickChartTypeBtn('options'); } break;
    case 'Delete': if (isHome && _mainChartMeta) {
      const symKey = selectedChartSym?.symbol;
      if (symKey && chartAnnotations[symKey]?.length) {
        delete chartAnnotations[symKey]; saveAnnotations(); updateAnnClearBtn();
        const mc = document.getElementById('main-chart-canvas');
        if (mc && mainChartData) drawMainChart(mc, mainChartData, selectedChartSym);
      }
    } break;
    case 'C': if (isHome) { e.preventDefault(); document.getElementById('compare-btn')?.click(); } break;
    case 'i': case 'I': if (isHome) { e.preventDefault(); document.getElementById('ind-toggle-btn')?.click(); } break;
    case 'f': case 'F': if (isHome) {
      e.preventDefault();
      _showFib = !_showFib;
      const mc = document.getElementById('main-chart-canvas');
      if (mc && mainChartData) drawMainChart(mc, mainChartData, selectedChartSym);
    } break;
    // ── Bar Replay keyboard controls ───────────────────────────────────────
    case 'r': case 'R':
      if (isHome) { e.preventDefault(); _clickChartTypeBtn('replay'); }
      break;
    case 'ArrowLeft':
      if (isHome && _replayMode) { e.preventDefault(); replayStep(-1); }
      break;
    case 'ArrowRight':
      if (isHome && _replayMode) { e.preventDefault(); replayStep(+1); }
      break;
    case ' ':
      if (isHome && _replayMode) { e.preventDefault(); toggleReplayPlay(); }
      break;
    // ── Symbol Notes Quick Float (v2.38) ───────────────────────────────────
    case 'n': case 'N':
      if (isHome) { e.preventDefault(); toggleSymNoteFloat(); }
      break;
    // ── Symbol Lens Overlay (v2.81) — L key ────────────────────────────────
    case 'l': case 'L':
      if (isHome) { e.preventDefault(); toggleSymbolLens(); }
      break;
    // ── Chart Time Ruler (v2.42) ────────────────────────────────────────────
    case 't': case 'T':
      if (isHome) {
        e.preventDefault();
        _rulerMode = !_rulerMode;
        _rulerClicks = [];
        const mc2 = document.getElementById('main-chart-canvas');
        if (mc2) mc2.style.cursor = _rulerMode ? 'col-resize' : '';
        const rulerBtn = document.getElementById('ruler-btn');
        if (rulerBtn) rulerBtn.classList.toggle('active', _rulerMode);
        if (mainChartData && mc2) drawMainChart(mc2, mainChartData, selectedChartSym);
      }
      break;
    // ── Chart Gradient Theme Cycle (v2.56) — X key ──────────────────────────
    case 'x': case 'X':
      if (isHome) {
        e.preventDefault();
        const _themes = Object.keys(CHART_THEMES);
        const _cur = _themes.indexOf(_chartTheme);
        _chartTheme = _themes[(_cur + 1) % _themes.length];
        try { localStorage.setItem('fh-chart-theme', _chartTheme); } catch(_) {}
        const mc3 = document.getElementById('main-chart-canvas');
        if (mc3 && mainChartData) drawMainChart(mc3, mainChartData, selectedChartSym);
        showToast(`Theme: ${_chartTheme.charAt(0).toUpperCase() + _chartTheme.slice(1)}`);
      }
      break;

    // v2.64: [ / ] to cycle symbols in current category
    case '[':
      if (isHome && selectedChartSym) {
        e.preventDefault();
        const _catSyms = getVisibleCatSymbols();
        const _idx = _catSyms.findIndex(s => s.id === selectedChartSym.id);
        if (_catSyms.length > 1) {
          const _prev = _catSyms[(_idx - 1 + _catSyms.length) % _catSyms.length];
          selectMainChartSym(_prev);
          showToast(`← ${_prev.label}`);
        }
      }
      break;
    case ']':
      if (isHome && selectedChartSym) {
        e.preventDefault();
        const _catSyms2 = getVisibleCatSymbols();
        const _idx2 = _catSyms2.findIndex(s => s.id === selectedChartSym.id);
        if (_catSyms2.length > 1) {
          const _next = _catSyms2[(_idx2 + 1) % _catSyms2.length];
          selectMainChartSym(_next);
          showToast(`${_next.label} →`);
        }
      }
      break;
  }
}

function getVisibleCatSymbols() {
  if (activeCatId === 'all') return ALL_HOME_SYMBOLS;
  if (activeCatId === 'movers') return ALL_HOME_SYMBOLS.slice().sort((a, b) => {
    const pa = Math.abs(lastKnownPrices[a.id]?.pct ?? 0);
    const pb = Math.abs(lastKnownPrices[b.id]?.pct ?? 0);
    return pb - pa;
  });
  return ALL_HOME_SYMBOLS.filter(s => s.cat === activeCatId);
}

// ══════════════════════════════════════════════
// SYMBOL NOTES QUICK FLOAT (v2.38) — N key
// ══════════════════════════════════════════════
let _symNoteOpen = false;

function toggleSymNoteFloat() {
  _symNoteOpen ? closeSymNoteFloat() : openSymNoteFloat();
}

function openSymNoteFloat() {
  const floatEl = document.getElementById('sym-note-float');
  const ta      = document.getElementById('sym-note-ta');
  const title   = document.getElementById('sym-note-title');
  if (!floatEl || !ta) return;

  const sym = selectedChartSym;
  if (title) title.textContent = `📝 Notes — ${sym ? sym.label : '–'}`;
  // Load existing note from chartNotes (same storage as chart-notes-ta)
  ta.value = sym ? (chartNotes[sym.symbol] || '') : '';
  floatEl.classList.add('open');
  _symNoteOpen = true;
  ta.focus();
}

function closeSymNoteFloat() {
  const floatEl = document.getElementById('sym-note-float');
  if (!floatEl) return;
  floatEl.classList.remove('open');
  _symNoteOpen = false;
}

function initSymNoteFloat() {
  // Close button
  document.getElementById('sym-note-close')?.addEventListener('click', closeSymNoteFloat);
  // Auto-save on input (mirrors chart-notes-ta storage)
  const ta = document.getElementById('sym-note-ta');
  if (ta) {
    ta.addEventListener('input', () => {
      if (!selectedChartSym) return;
      const val = ta.value;
      if (val.trim()) {
        chartNotes[selectedChartSym.symbol] = val;
      } else {
        delete chartNotes[selectedChartSym.symbol];
      }
      localStorage.setItem('fh-chart-notes', JSON.stringify(chartNotes));
      // Mirror to the chart-notes-ta if visible
      const chartTa = document.getElementById('chart-notes-ta');
      if (chartTa && chartTa !== ta) chartTa.value = val;
    });
    // Close on Escape
    ta.addEventListener('keydown', e => {
      if (e.key === 'Escape') { e.preventDefault(); closeSymNoteFloat(); }
    });
  }
}

// ══════════════════════════════════════════════
// ECONOMIC CALENDAR TICKER (v2.38) — Daily Brief scrolling strip
// ══════════════════════════════════════════════
function buildEconTicker() {
  const inner = document.getElementById('db-econ-inner');
  if (!inner) return;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Condensed upcoming macro event schedule for 2026
  const ECON_TICKER_EVENTS = [
    { date: '2026-03-07', name: 'Nonfarm Payrolls', cat: 'EMPLOYMENT' },
    { date: '2026-03-12', name: 'CPI Feb',           cat: 'INFLATION'  },
    { date: '2026-03-17', name: 'Retail Sales',      cat: 'CONSUMER'   },
    { date: '2026-03-19', name: 'FOMC Decision',     cat: 'FED'        },
    { date: '2026-03-27', name: 'PCE Inflation',     cat: 'INFLATION'  },
    { date: '2026-04-02', name: 'Nonfarm Payrolls',  cat: 'EMPLOYMENT' },
    { date: '2026-04-10', name: 'CPI Mar',           cat: 'INFLATION'  },
    { date: '2026-04-30', name: 'GDP Q1 Advance',    cat: 'GDP'        },
    { date: '2026-04-30', name: 'FOMC Decision',     cat: 'FED'        },
    { date: '2026-05-08', name: 'Nonfarm Payrolls',  cat: 'EMPLOYMENT' },
    { date: '2026-05-13', name: 'CPI Apr',           cat: 'INFLATION'  },
    { date: '2026-06-11', name: 'CPI May',           cat: 'INFLATION'  },
    { date: '2026-06-17', name: 'FOMC Decision',     cat: 'FED'        },
    { date: '2026-07-09', name: 'CPI Jun',           cat: 'INFLATION'  },
    { date: '2026-07-30', name: 'FOMC Decision',     cat: 'FED'        },
    { date: '2026-08-14', name: 'CPI Jul',           cat: 'INFLATION'  },
    { date: '2026-08-27', name: 'Jackson Hole',      cat: 'FED'        },
    { date: '2026-09-17', name: 'FOMC Decision',     cat: 'FED'        },
    { date: '2026-10-14', name: 'CPI Sep',           cat: 'INFLATION'  },
    { date: '2026-11-05', name: 'FOMC Decision',     cat: 'FED'        },
    { date: '2026-12-16', name: 'FOMC Decision',     cat: 'FED'        },
  ];

  const catCls = {
    FED        : 'ep-fed',
    INFLATION  : 'ep-infl',
    EMPLOYMENT : 'ep-employ',
    GDP        : 'ep-gdp',
    CONSUMER   : 'ep-gdp',
  };

  const upcoming = ECON_TICKER_EVENTS
    .map(ev => {
      const evDate   = new Date(ev.date + 'T00:00:00');
      const daysUntil = Math.round((evDate - today) / 86_400_000);
      return { ...ev, daysUntil };
    })
    .filter(ev => ev.daysUntil >= -1)
    .sort((a, b) => a.daysUntil - b.daysUntil);

  if (!upcoming.length) {
    inner.innerHTML = '<span class="econ-pill ep-fed">No upcoming events scheduled</span>';
    return;
  }

  const makePill = ev => {
    const cls      = catCls[ev.cat] || '';
    const days     = ev.daysUntil;
    const dayStr   = days <= 0 ? 'TODAY' : `${days}d`;
    const todayCls = days <= 0 ? ' ep-today' : '';
    return `<span class="econ-pill ${cls}${todayCls}" title="${ev.cat} · ${ev.date}">📅 ${ev.name} · ${dayStr}</span>`;
  };

  // Double pills for seamless infinite-scroll loop
  const pills = upcoming.map(makePill).join('');
  inner.innerHTML = pills + pills;
}

// ══════════════════════════════════════════════
// KEYBOARD SHORTCUTS HELP OVERLAY (? key)
// ══════════════════════════════════════════════

const SHORTCUTS_HELP = [
  { key: '/',           desc: 'Open Command Palette'              },
  { key: '?',           desc: 'Show keyboard shortcuts'           },
  { key: 'Esc',         desc: 'Close overlay / command palette'   },
  { key: '1–5',         desc: 'Switch chart timeframe (1D–5Y)'    },
  { key: 'A',           desc: 'Area chart'                        },
  { key: 'G',           desc: 'Multi-timeframe Grid view'         },
  { key: 'O',           desc: 'Options Chain viewer'              },
  { key: 'Shift+C',     desc: 'Toggle Compare mode'               },
  { key: 'I',           desc: 'Toggle Indicators picker'          },
  { key: 'F',           desc: 'Toggle Fibonacci retracements'     },
  { key: 'Delete',      desc: 'Clear all S/R lines (chart)'       },
  { key: 'Dbl-click',   desc: 'Add S/R annotation line'           },
  { key: 'Rclick line', desc: 'Remove nearest annotation line'    },
  { key: 'N',           desc: 'Quick symbol notes float'          },
  { key: '[ / ]',       desc: 'Cycle prev/next symbol in category' },
  { key: 'X',           desc: 'Cycle chart color theme'            },
];

let _helpOverlayOpen = false;

function buildHelpOverlay() {
  if (document.getElementById('help-overlay')) return;
  const el = document.createElement('div');
  el.id = 'help-overlay';
  el.className = 'help-overlay';
  el.innerHTML = `
    <div class="help-box">
      <div class="help-title">⌨ Keyboard Shortcuts</div>
      <table class="help-table">
        ${SHORTCUTS_HELP.map(s => `
          <tr>
            <td class="help-key"><kbd>${s.key}</kbd></td>
            <td class="help-desc">${s.desc}</td>
          </tr>`).join('')}
      </table>
      <div class="help-close-hint">Press <kbd>Esc</kbd> or click outside to close</div>
    </div>
  `;
  el.addEventListener('click', e => { if (e.target === el) closeHelpOverlay(); });
  document.body.appendChild(el);
}

function openHelpOverlay() {
  _helpOverlayOpen = true;
  buildHelpOverlay();
  document.getElementById('help-overlay')?.classList.add('visible');
}

function closeHelpOverlay() {
  _helpOverlayOpen = false;
  document.getElementById('help-overlay')?.classList.remove('visible');
}

// ══════════════════════════════════════════════
// COMMAND PALETTE (/ key — Bloomberg-style)
// ══════════════════════════════════════════════

const CMD_SHORTCUTS = [
  { icon: '📊', label: 'Overview',        desc: 'Market overview & charts',      action: () => switchSite('overview')  },
  { icon: '⭐', label: 'My Space',        desc: 'Watchlist & alerts',            action: () => switchSite('myspace')   },
  { icon: '🌡', label: 'Macro Pulse',     desc: 'VIX · DXY · Yield · GDP',       action: () => switchSite('pulse')     },
  { icon: '🔥', label: 'Heatmap',         desc: 'S&P 500 sector heatmap',        action: () => switchSite('heatmap')   },
  { icon: '📅', label: 'Earnings Cal.',   desc: 'Upcoming earnings calendar',     action: () => switchSite('calendar')  },
  { icon: '📰', label: 'WSB Sentiment',   desc: 'Reddit WallStreetBets trends',   action: () => switchSite('sentiment') },
  { icon: '👤', label: 'Insider Flows',   desc: 'SEC Form 4 buy/sell activity',   action: () => switchSite('insider')   },
  { icon: '📈', label: 'TA Signals',     desc: 'EMA · RSI · Momentum scanner',   action: () => switchSite('signals')   },
  { icon: '🗞', label: 'News Heatmap',   desc: 'Asset spotlight · buzz tracker',  action: () => switchSite('newsheat')  },
  { icon: '≡',  label: 'TF Alignment',  desc: '1D/1W/1M multi-timeframe scanner', action: () => switchSite('tfalign')  },
  { icon: '🔍', label: 'Symbol Scanner',desc: 'Screener with RSI/Vol/ADX filters', action: () => switchSite('scanner')  },
  { icon: '🧬', label: 'Market DNA',    desc: 'Regime · Conviction · Edge narrative', action: () => switchSite('dna')   },
  { icon: '🎯', label: 'Daily Challenge',desc: 'Today\'s engagement challenge',    action: () => openChallengeOverlay()  },
  { icon: '☀️', label: 'Toggle Theme',    desc: 'Switch dark / light mode',       action: () => toggleTheme()           },
];

let _cmdPaletteOpen = false;
let _cmdSelectedIdx = 0;

function buildCommandPalette() {
  if (document.getElementById('cmd-palette-overlay')) return;
  const overlay = document.createElement('div');
  overlay.id = 'cmd-palette-overlay';
  overlay.className = 'cmd-palette-overlay';
  overlay.innerHTML = `
    <div class="cmd-palette" id="cmd-palette">
      <div class="cmd-input-wrap">
        <span class="cmd-slash">/</span>
        <input class="cmd-input" id="cmd-input" placeholder="Search symbols, panels… (ESC to close)" spellcheck="false" autocomplete="off">
      </div>
      <div class="cmd-results" id="cmd-results"></div>
      <div class="cmd-footer">
        <span>↑↓ navigate</span><span>↵ select</span><span>ESC close</span>
        <span class="cmd-footer-right">FinanceHub Command Palette</span>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeCommandPalette();
  });

  const input = document.getElementById('cmd-input');
  input.addEventListener('input', () => renderCmdResults(input.value));
  input.addEventListener('keydown', e => {
    const items = document.querySelectorAll('.cmd-item');
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      _cmdSelectedIdx = Math.min(_cmdSelectedIdx + 1, items.length - 1);
      items.forEach((el, i) => el.classList.toggle('selected', i === _cmdSelectedIdx));
      items[_cmdSelectedIdx]?.scrollIntoView({ block: 'nearest' });
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      _cmdSelectedIdx = Math.max(_cmdSelectedIdx - 1, 0);
      items.forEach((el, i) => el.classList.toggle('selected', i === _cmdSelectedIdx));
      items[_cmdSelectedIdx]?.scrollIntoView({ block: 'nearest' });
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const sel = items[_cmdSelectedIdx];
      if (sel) { sel.click(); }
    } else if (e.key === 'Escape') {
      closeCommandPalette();
    }
  });
}

function renderCmdResults(query) {
  const list = document.getElementById('cmd-results');
  if (!list) return;
  _cmdSelectedIdx = 0;

  const q = query.trim().toLowerCase();

  // Build items: shortcuts first, then symbols
  let items = [];

  if (!q) {
    // No query: show all shortcuts
    items = CMD_SHORTCUTS.map(c => ({
      icon: c.icon, label: c.label, desc: c.desc, tag: 'PANEL', action: c.action
    }));
  } else {
    // Filter shortcuts
    const filteredShortcuts = CMD_SHORTCUTS.filter(c =>
      c.label.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q)
    ).map(c => ({ icon: c.icon, label: c.label, desc: c.desc, tag: 'PANEL', action: c.action }));

    // Search through all known symbols (deduplicated)
    const allSyms = [
      ...HOME_CATEGORIES.flatMap(c => c.symbols),
      ...ALL_SYMBOLS,
    ];
    const seen = new Set();
    const filteredSyms = allSyms.filter(s => {
      if (seen.has(s.symbol)) return false;
      seen.add(s.symbol);
      return s.symbol.toLowerCase().includes(q) || s.label.toLowerCase().includes(q);
    }).slice(0, 8).map(s => ({
      icon: '📈', label: s.label, desc: s.symbol,
      tag: s.symbol.endsWith('=X') ? 'FOREX' : s.symbol.endsWith('=F') ? 'FUTURES' : s.symbol.startsWith('^') ? 'INDEX' : s.symbol.includes('-USD') ? 'CRYPTO' : 'STOCK',
      action: () => {
        closeCommandPalette();
        switchSite('overview');
        const known = ALL_HOME_SYMBOLS.find(h => h.symbol === s.symbol);
        if (known) selectMainChartSym(known);
        else { selectedChartSym = s; loadMainChart(); }
      }
    }));

    items = [...filteredShortcuts, ...filteredSyms];
  }

  list.innerHTML = items.map((item, i) => `
    <div class="cmd-item${i === 0 ? ' selected' : ''}" data-idx="${i}">
      <span class="cmd-item-icon">${item.icon}</span>
      <div class="cmd-item-info">
        <span class="cmd-item-label">${item.label}</span>
        <span class="cmd-item-desc">${item.desc}</span>
      </div>
      <span class="cmd-item-tag">${item.tag}</span>
    </div>
  `).join('');

  // Bind click actions
  list.querySelectorAll('.cmd-item').forEach((el, i) => {
    el.addEventListener('click', () => {
      if (items[i]) { closeCommandPalette(); items[i].action(); }
    });
    el.addEventListener('mouseenter', () => {
      _cmdSelectedIdx = i;
      list.querySelectorAll('.cmd-item').forEach((x, j) => x.classList.toggle('selected', j === i));
    });
  });
}

function openCommandPalette() {
  _cmdPaletteOpen = true;
  const overlay = document.getElementById('cmd-palette-overlay');
  if (overlay) overlay.classList.add('visible');
  _cmdSelectedIdx = 0;
  const input = document.getElementById('cmd-input');
  if (input) { input.value = ''; input.focus(); }
  renderCmdResults('');
}

function closeCommandPalette() {
  _cmdPaletteOpen = false;
  const overlay = document.getElementById('cmd-palette-overlay');
  if (overlay) overlay.classList.remove('visible');
}

// ── Daily Streak ─────────────────────────────────────────────────────────────
function checkDailyStreak() {
  const todayStr = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  const prevStr  = localStorage.getItem('fh-streak-last') || '';
  let   count    = parseInt(localStorage.getItem('fh-streak-count') || '0', 10);

  const yDate = new Date(); yDate.setDate(yDate.getDate() - 1);
  const yestStr = yDate.toISOString().slice(0, 10);

  let isMilestone = false;

  if (!prevStr || prevStr < yestStr) {
    // First open ever, or missed a day — reset
    count = 1;
  } else if (prevStr === yestStr) {
    // Consecutive day!
    count++;
    const MILESTONES = [3, 7, 14, 30, 60, 100];
    isMilestone = MILESTONES.includes(count);
  }
  // prevStr === todayStr → already counted today, no change

  localStorage.setItem('fh-streak-last',  todayStr);
  localStorage.setItem('fh-streak-count', String(count));

  // Update badge
  const badge   = document.getElementById('streak-badge');
  const countEl = document.getElementById('streak-count');
  if (badge && countEl) {
    countEl.textContent = count;
    badge.style.display = 'flex';
    badge.title = `${count}-day streak — ${count === 1 ? 'Welcome!' : `${count} days in a row!`}`;
  }

  // Milestone celebration (slight delay so layout is ready)
  if (isMilestone) {
    setTimeout(() => {
      if (badge) {
        badge.classList.add('streak-milestone');
        setTimeout(() => badge.classList.remove('streak-milestone'), 800);
        const r = badge.getBoundingClientRect();
        burstConfetti(r.left + r.width / 2, r.top + r.height / 2);
      }
      showStreakToast(count);
    }, 900);
  }
}

function showStreakToast(days) {
  const msgs = {
    3:   '🔥 3-day streak! You\'re on fire!',
    7:   '🔥🔥 Week streak! Keep it up!',
    14:  '🔥🔥🔥 2-week streak! Market master!',
    30:  '💎 30-day streak! Diamond hands!',
    60:  '👑 2-month streak! You\'re a legend!',
    100: '🚀 100 days! To the moon!'
  };
  const msg   = msgs[days] || `🔥 ${days}-day streak!`;
  const toast = document.createElement('div');
  toast.className   = 'streak-toast';
  toast.textContent = msg;
  document.body.appendChild(toast);
  requestAnimationFrame(() => requestAnimationFrame(() => toast.classList.add('streak-toast-show')));
  setTimeout(() => {
    toast.classList.remove('streak-toast-show');
    setTimeout(() => toast.remove(), 400);
  }, 3200);
}

// ══════════════════════════════════════════════════════════════
// v2.81: AI MARKET NARRATIVE BAR
// Rule-based contextual narrative. Optional Groq AI enhancement.
// ══════════════════════════════════════════════════════════════

async function generateMarketNarrative(sym, data) {
  const bar   = document.getElementById('narrative-bar');
  const txt   = document.getElementById('narr-text');
  const badge = document.getElementById('narr-badge');
  if (!bar || !txt || !sym) return;

  bar.style.display = 'flex';
  txt.textContent   = 'Analyzing…';
  badge.textContent = 'AI';

  const closes = (data || []).map(d => d.close).filter(Boolean);
  if (closes.length < 20) { bar.style.display = 'none'; return; }

  const rsiArr    = calcRSI(closes, 14);
  const ema20     = calcEMA(closes, 20);
  const ema50     = calcEMA(closes, 50);
  const lastRSI   = rsiArr[rsiArr.length - 1];
  const lastEMA20 = ema20[ema20.length - 1];
  const lastEMA50 = ema50[ema50.length - 1];
  const lastClose = closes[closes.length - 1];
  const vixVal    = riskPrices['vix'] ? parseFloat(riskPrices['vix'].price) : null;

  // ── Rule-based narrative ───────────────────────────────────
  const parts = [];
  if (lastClose && lastEMA20 && lastEMA50) {
    if (lastClose > lastEMA20 && lastClose > lastEMA50)
      parts.push(`${sym.label} is in an uptrend above both EMA-20 and EMA-50`);
    else if (lastClose < lastEMA20 && lastClose < lastEMA50)
      parts.push(`${sym.label} is below both EMA-20 and EMA-50, signaling bearish pressure`);
    else if (lastClose > lastEMA20)
      parts.push(`${sym.label} is above EMA-20 but testing the EMA-50 support`);
    else
      parts.push(`${sym.label} is below EMA-20 and facing near-term resistance`);
  } else {
    const p = lastKnownPrices[sym.id]?.pct ?? 0;
    parts.push(`${sym.label} is showing ${p >= 0 ? 'positive' : 'negative'} price action today`);
  }
  if (lastRSI !== null) {
    const r = Math.round(lastRSI);
    if (r >= 75)      parts.push(`RSI ${r} — overbought, watch for reversal`);
    else if (r >= 60) parts.push(`RSI ${r} — bullish momentum`);
    else if (r <= 25) parts.push(`RSI ${r} — deeply oversold, potential bounce`);
    else if (r <= 40) parts.push(`RSI ${r} — bearish momentum`);
    else              parts.push(`RSI ${r} — neutral zone`);
  }
  if (vixVal !== null) {
    if (vixVal >= 30)      parts.push(`VIX ${vixVal.toFixed(1)} signals high market fear`);
    else if (vixVal >= 20) parts.push(`VIX ${vixVal.toFixed(1)} — elevated uncertainty`);
    else                   parts.push(`VIX ${vixVal.toFixed(1)} — calm, risk-on backdrop`);
  }

  const ruleNarrative = parts.join('. ') + '.';
  txt.textContent   = ruleNarrative;
  badge.textContent = 'RULE';

}

function setupNarrativeBar() {
  // Rule-based only — no external API needed
}

// ══════════════════════════════════════════════════════════════
// v2.81: SYMBOL LENS OVERLAY (L key)
// Quick-view panel: live price, RSI, EMA trend, regime, VIX
// ══════════════════════════════════════════════════════════════
let _symLensOpen = false;

function toggleSymbolLens() { _symLensOpen ? closeSymbolLens() : openSymbolLens(); }

function openSymbolLens() {
  const lens = document.getElementById('sym-lens');
  if (!lens) return;
  populateSymbolLens();
  _symLensOpen = true;
  lens.classList.add('open');
}

function closeSymbolLens() {
  const lens = document.getElementById('sym-lens');
  if (!lens) return;
  _symLensOpen = false;
  lens.classList.remove('open');
}

function populateSymbolLens() {
  const sym  = selectedChartSym;
  if (!sym) return;
  const data = mainChartData || lastMainChartData;
  const pr   = lastKnownPrices[sym.id];
  const $    = id => document.getElementById(id);

  $('sl-sym').textContent   = sym.label;
  $('sl-price').textContent = pr ? fmtPrice(pr.price) : '–';
  if (pr) {
    const pct = pr.pct ?? 0;
    $('sl-pct').textContent = (pct >= 0 ? '+' : '') + pct.toFixed(2) + '%';
    $('sl-pct').className   = 'sym-lens-pct ' + (pct >= 0 ? 'positive' : 'negative');
  }
  $('sl-dhi').textContent = pr?.dayHigh ? fmtPrice(pr.dayHigh) : '–';
  $('sl-dlo').textContent = pr?.dayLow  ? fmtPrice(pr.dayLow)  : '–';
  const vix = riskPrices['vix'];
  $('sl-vix').textContent = vix ? parseFloat(vix.price).toFixed(2) : '–';
  const regMap = { trending: '📈 Trending', volatile: '⚡ Volatile', ranging: '↔ Ranging' };
  $('sl-regime').textContent = regMap[_lastRegime] || '–';

  if (data && data.length >= 20) {
    const closes  = data.map(d => d.close).filter(Boolean);
    const rsiArr  = calcRSI(closes, 14);
    const ema20   = calcEMA(closes, 20);
    const ema50   = calcEMA(closes, 50);
    const lastRSI = rsiArr[rsiArr.length - 1];
    const lc = closes[closes.length - 1];
    const le20 = ema20[ema20.length - 1];
    const le50 = ema50[ema50.length - 1];

    if (lastRSI !== null) {
      const r = Math.round(lastRSI);
      $('sl-rsi').textContent = r + (r >= 70 ? ' 🔴' : r <= 30 ? ' 🟢' : '');
    }
    if (lc && le20) {
      const d20 = ((lc - le20) / le20) * 100;
      $('sl-ema20t').textContent = (d20 >= 0 ? '+' : '') + d20.toFixed(2) + '%';
      $('sl-ema20t').style.color = d20 >= 0 ? 'var(--green)' : 'var(--red)';
    }
    if (lc && le50) {
      const d50 = ((lc - le50) / le50) * 100;
      $('sl-ema50t').textContent = (d50 >= 0 ? '+' : '') + d50.toFixed(2) + '%';
      $('sl-ema50t').style.color = d50 >= 0 ? 'var(--green)' : 'var(--red)';
    }
    // TA Rating
    let score = 0;
    if (lc > le20) score++; if (lc > le50) score++;
    if (lastRSI !== null && lastRSI > 50) score++;
    if ((pr?.pct ?? 0) > 0) score++;
    const rEl = $('sl-rating');
    if      (score >= 4) { rEl.textContent = '▲▲ STRONG BUY';  rEl.className = 'sym-lens-badge bull'; }
    else if (score >= 3) { rEl.textContent = '▲ BUY';          rEl.className = 'sym-lens-badge bull'; }
    else if (score >= 2) { rEl.textContent = '— NEUTRAL';      rEl.className = 'sym-lens-badge neu';  }
    else if (score >= 1) { rEl.textContent = '▼ SELL';         rEl.className = 'sym-lens-badge bear'; }
    else                 { rEl.textContent = '▼▼ STRONG SELL'; rEl.className = 'sym-lens-badge bear'; }
  }
}

function initSymbolLens() {
  const closeBtn = document.getElementById('sl-close');
  if (closeBtn) closeBtn.addEventListener('click', closeSymbolLens);
}

// ══════════════════════════════════════════════════════════════
// v2.81: RISK DISCLOSURE MODAL
// Shown once on first run — stored in localStorage
// ══════════════════════════════════════════════════════════════
function initRiskModal() {
  try { if (localStorage.getItem('fh-risk-ack') === '1') return; } catch(_) {}
  const overlay = document.getElementById('risk-modal-overlay');
  const chk     = document.getElementById('risk-modal-chk');
  const btn     = document.getElementById('risk-modal-btn');
  if (!overlay || !chk || !btn) return;
  overlay.style.display = 'flex';
  chk.addEventListener('change', () => {
    btn.disabled = !chk.checked;
    btn.classList.toggle('enabled', chk.checked);
  });
  btn.addEventListener('click', () => {
    if (!chk.checked) return;
    try { localStorage.setItem('fh-risk-ack', '1'); } catch(_) {}
    overlay.style.display = 'none';
    showToast('Welcome to Finance Hub ✦ For informational purposes only');
  });
}

// ══════════════════════════════════════════════════════════════
// v2.81: ALWAYS-ON-TOP FLOAT WINDOW
// Opens a small always-on-top mini price widget
// ══════════════════════════════════════════════════════════════
let _floatWinOpen = false;

function initFloatWindowBtn() {
  const btn = document.getElementById('chart-float-btn');
  if (!btn) return;
  btn.addEventListener('click', async () => {
    const sym = selectedChartSym;
    const pr  = sym ? lastKnownPrices[sym.id] : null;
    if (!sym) { showToast('Select a symbol first'); return; }
    if (!window.electronAPI?.openFloatWindow) { showToast('Float window requires desktop app'); return; }
    const result = await window.electronAPI.openFloatWindow({
      symbol: sym.label,
      price:  pr ? fmtPrice(pr.price, sym.fmt) : '–',
      pct:    pr ? (pr.pct ?? 0).toFixed(2) : '0',
    }).catch(() => null);
    _floatWinOpen = result?.opened ?? !_floatWinOpen;
    btn.classList.toggle('active', _floatWinOpen);
    btn.textContent = _floatWinOpen ? '⧉ Floating' : '⧉ Float';
  });
}

function _updateFloatIfOpen(sym, price, pct) {
  if (!_floatWinOpen || !window.electronAPI?.updateFloatWindow) return;
  if (!selectedChartSym || selectedChartSym.id !== sym.id) return;
  window.electronAPI.updateFloatWindow({ symbol: sym.label, price: fmtPrice(price, sym.fmt), pct: (pct ?? 0).toFixed(2) }).catch(() => {});
}

// ══════════════════════════════════════════════
// INIT
// ══════════════════════════════════════════════
(function init() {
  // Build panel structures
  buildHomePanel();
  checkDailyStreak();   // streak badge in tab bar
  buildHeatmapPanel();
  buildPulsePanel();
  buildCalendarPanel();
  buildSentimentPanel();
  /* buildGlobePanel() removed v2.92 */

  // Build title bar ticker
  buildTickerDOM();
  buildCommandPalette();    // Bloomberg-style / command palette
  buildInsiderFlowsPanel(); // SEC Form 4 insider activity
  buildSignalsPanel();      // TA Signal Scanner
  buildNewsHeatmapPanel();  // News Heatmap (v2.33)
  initDailyChallenge();     // Daily Challenge gamification (v2.33)
  buildReplayToolbar();     // Bar Replay mode toolbar (v2.34)
  buildTFAlignPanel();      // Multi-TF Alignment Scanner (v2.35)
  buildScannerPanel();      // Symbol Scanner with Screener Filters (v2.41)
  initSymNoteFloat();       // Symbol Notes Quick Float (v2.38)
  buildEconTicker();        // Economic Calendar Ticker in Daily Brief (v2.38)
  initRiskModal();          // Risk Disclosure first-run modal (v2.81)
  setupNarrativeBar();      // AI Market Narrative bar (v2.81)
  initSymbolLens();         // Symbol Lens overlay close btn (v2.81)
  initFloatWindowBtn();     // Always-on-top float window btn (v2.81)

  // v2.61 — News Panel Search Filter
  (function initNewsSearch() {
    const inp = document.getElementById('news-search-input');
    const clr = document.getElementById('news-search-clear');
    if (!inp) return;
    inp.addEventListener('input', () => {
      _newsSearchQuery = inp.value;
      if (clr) clr.style.display = _newsSearchQuery.length > 0 ? 'inline-flex' : 'none';
      renderNewsPanel();
    });
    inp.addEventListener('keydown', e => {
      if (e.key === 'Escape') { inp.value = ''; _newsSearchQuery = ''; if (clr) clr.style.display = 'none'; renderNewsPanel(); inp.blur(); }
    });
    if (clr) clr.addEventListener('click', () => {
      inp.value = ''; _newsSearchQuery = ''; clr.style.display = 'none'; renderNewsPanel(); inp.focus();
    });
    // Prevent global key shortcuts from firing when typing in the search box
    inp.addEventListener('keydown', e => e.stopPropagation(), true);
  })();
  buildBottomTicker();      // Live Price Ticker Tape bottom bar (v2.42)
  _renderRecentSymbols();   // Recent symbol quick chips (v2.55)
  startCandleCountdown();   // Live candle countdown timer (v2.74)
  // v2.77: Sector pills — fetch sector ETFs for DB row
  (async () => {
    try {
      const results = await Promise.allSettled(
        SECTOR_ETFS.map(s => fetchChartData(s.sym, '5d', '1h'))
      );
      const entries = [];
      results.forEach((res, i) => {
        if (res.status !== 'fulfilled' || !res.value || res.value.length < 2) return;
        const d = res.value, first = d[0].close, last = d[d.length - 1].close;
        if (!first || !last) return;
        entries.push({ ...SECTOR_ETFS[i], pct: ((last - first) / first) * 100 });
      });
      if (entries.length > 0) updateSectorPills(entries);
    } catch (_) {}
  })();

  // Global keyboard shortcuts
  document.addEventListener('keydown', handleGlobalKeys);

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

  // ── Watchlist UI (no API calls) — build immediately ──────────────────
  initWatchlist();

  // Request notification permission
  if (typeof Notification !== 'undefined' && Notification.permission === 'default') {
    Notification.requestPermission().catch(() => {});
  }

  // ── Managed interval system — all IDs tracked for cleanup ─────────
  const _managedIntervals = [];
  function setManagedInterval(fn, ms) {
    const id = setInterval(fn, ms);
    _managedIntervals.push(id);
    return id;
  }
  window.addEventListener('beforeunload', () => {
    _managedIntervals.forEach(id => clearInterval(id));
  });

  // ── STAGGERED DATA FETCHING — spread load across startup ─────────────
  // Wave 1 — t=0: ticker (12 symbols, most visible)
  fetchAndUpdateTickers();
  setManagedInterval(fetchAndUpdateTickers, 30_000);

  // Wave 2 — t=400ms: home card prices (25 symbols in batches)
  setTimeout(() => {
    fetchHomeData();
    setManagedInterval(fetchHomeData, 30_000);
  }, 400);

  // Wave 3 — t=900ms: risk meter (VIX + DXY) + market status dots
  setTimeout(() => {
    fetchRiskData();
    updateAllMarkets();
    setManagedInterval(fetchRiskData, 60_000);
    setManagedInterval(updateAllMarkets, 60_000);
  }, 900);

  // Wave 4 — t=1400ms: main chart
  setTimeout(() => loadMainChart(), 1400);

  // Wave 5 — t=2000ms: news (non-urgent, 5-min refresh anyway)
  setTimeout(() => {
    fetchNews();
    setManagedInterval(rotateNews, 7_000);
    setManagedInterval(fetchNews, 5 * 60_000);
  }, 2000);

  // Wave 6 — t=2800ms: watchlist prices
  // Offset from ticker (0s) to avoid 30s thunderherd — fires at t=2.8, 32.8, 62.8, ...
  setTimeout(() => {
    fetchWatchlistPrices();
    setManagedInterval(fetchWatchlistPrices, 30_000);
  }, 2800);

  // ── Narrative feed — first run after data is warm ────────────────────────
  setTimeout(() => refreshNarrativeFeed(), 6000);

  // v2.92: Webview preloading removed — webviews eliminated (saved ~1GB RAM)
})();
