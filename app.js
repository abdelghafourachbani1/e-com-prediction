/* ===================== CONFIG ===================== */
const API_BASE = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
  ? 'http://localhost:3001/api'
  : '/api';

const $ = id => document.getElementById(id);

let PRODUCTS = [];
let isLoading = false;
let activeGeo = 'US';

/* ===================== DATE ===================== */
const dateStr = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
$('live-date').textContent = dateStr;
$('footer-date').textContent = dateStr;

/* ===================== LOADING UI ===================== */
function showLoading(msg = 'Fetching live market data...') {
  $('products-grid').innerHTML = `
    <div style="grid-column:1/-1;text-align:center;padding:80px 20px">
      <div class="loader"></div>
      <p style="color:var(--text2);margin-top:20px;font-size:15px">${msg}</p>
      <p style="color:var(--text3);font-size:12px;margin-top:8px">Scanning Google Trends + Reddit in real time</p>
    </div>`;
}

function showError(msg) {
  $('products-grid').innerHTML = `
    <div style="grid-column:1/-1;text-align:center;padding:80px 20px">
      <div style="font-size:48px;margin-bottom:16px">⚠️</div>
      <p style="color:var(--red);font-size:16px;font-weight:600">${msg}</p>
      <p style="color:var(--text3);font-size:13px;margin-top:8px">Make sure the server is running: <code style="background:var(--surface);padding:2px 8px;border-radius:4px">cd server && npm start</code></p>
      <button onclick="loadReport()" style="margin-top:20px;background:var(--grad);border:none;color:white;padding:10px 20px;border-radius:8px;cursor:pointer;font-size:13px">Retry</button>
    </div>`;
}

/* ===================== FETCH REPORT ===================== */
async function loadReport(forceRefresh = false) {
  if (isLoading) return;
  isLoading = true;
  showLoading(forceRefresh ? `Running fresh scan for ${activeGeo}...` : `Loading ${activeGeo} market data...`);

  try {
    const endpoint = forceRefresh
      ? `${API_BASE}/refresh?geo=${activeGeo}`
      : `${API_BASE}/report?geo=${activeGeo}`;
    const method = forceRefresh ? 'POST' : 'GET';
    const res = await fetch(endpoint, { method });
    if (!res.ok) throw new Error(`Server error: ${res.status}`);
    const data = await res.json();
    if (!data.success) throw new Error(data.error || 'Unknown error');

    PRODUCTS = data.report.products;
    const reportDate = data.report.date;
    $('live-date').textContent = reportDate;
    $('footer-date').textContent = reportDate;

    // Update region badge
    const regionBadge = $('active-region-badge');
    if (regionBadge) regionBadge.textContent = `📍 ${data.report.regionName || activeGeo}`;

    renderProducts();
    renderGems();
    renderSummary();
    updateStatusBar(data.report.generatedAt, data.report);
  } catch (err) {
    console.error(err);
    showError(`Cannot connect to server. ${err.message}`);
  } finally {
    isLoading = false;
  }
}

function updateStatusBar(generatedAt, report) {
  const el = $('status-bar');
  if (!el) return;
  const t = new Date(generatedAt);
  const sources = report?.dataSources?.join(' · ') || 'Google Trends · Reddit · eBay · AliExpress';
  el.innerHTML = `✅ Live data · ${report?.regionName || activeGeo} · Sources: ${sources} · Last: ${t.toLocaleTimeString()} · <a href="${API_BASE}/status" target="_blank" style="color:var(--accent2)">API</a>`;
  el.style.display = 'flex';
}

function showFallbackBanner() {}

/* ===================== REGION SELECTOR ===================== */
const regionSelect = $('region-select');
if (regionSelect) {
  regionSelect.addEventListener('change', () => {
    activeGeo = regionSelect.value;
    loadReport(false);
  });
}

/* ===================== TAB NAVIGATION ===================== */
document.querySelectorAll('.nav-btn[data-tab]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    $('tab-' + btn.dataset.tab).classList.add('active');
  });
});

/* ===================== FILTER, SEARCH & SORT ===================== */
let activeFilter   = 'all';
let activeSort     = 'score';
let activeSearch   = '';
let activeVerdict  = 'all'; // 'all' | 'YES' | 'MAYBE' | 'NO'

document.querySelectorAll('.cat-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeFilter = btn.dataset.filter;
    renderProducts();
  });
});

// Verdict quick-filter buttons (added dynamically)
function buildVerdictBar() {
  const bar = document.getElementById('verdict-bar');
  if (!bar) return;
  bar.innerHTML = '';
  ['all','YES','MAYBE','NO'].forEach(v => {
    const btn = document.createElement('button');
    btn.className = 'v-btn filter-btn' + (v === 'all' ? ' active' : '');
    btn.textContent = v === 'all' ? '🔍 All Verdicts' : v === 'YES' ? '✅ Winners Only' : v === 'MAYBE' ? '⚠️ Maybe' : '❌ Skip';
    btn.addEventListener('click', () => {
      bar.querySelectorAll('.v-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeVerdict = v;
      renderProducts();
    });
    bar.appendChild(btn);
  });
}

// Search input
const searchInput = document.getElementById('search-input');
if (searchInput) {
  searchInput.addEventListener('input', e => {
    activeSearch = e.target.value.toLowerCase().trim();
    renderProducts();
  });
}

const sortSel = $('sort-select');
if (sortSel) {
  sortSel.addEventListener('change', e => { activeSort = e.target.value; renderProducts(); });
}

/* ===================== HELPERS ===================== */
function scoreColor(s) {
  if (s >= 75) return '#10b981';
  if (s >= 55) return '#f59e0b';
  return '#ef4444';
}

function getVerdict(v) {
  if (v === 'YES')   return { cls: 'verdict-yes',   label: '✅ YES — TEST IT' };
  if (v === 'NO')    return { cls: 'verdict-no',    label: '❌ NO — SKIP' };
  return                   { cls: 'verdict-maybe', label: '⚠️ MAYBE' };
}

/* ===================== RENDER PRODUCTS ===================== */
function getFilteredSorted() {
  let list = [...PRODUCTS];

  // 1. Category filter
  if (activeFilter !== 'all') {
    const f = activeFilter.toLowerCase();
    list = list.filter(p => {
      const pFilter = (p.filter || '').toLowerCase();
      const pCat = (p.category || '').toLowerCase();
      return pFilter === f || pCat.includes(f) || (f === 'auto' && pCat.includes('automotive'));
    });
  }

  // 2. Verdict filter
  if (activeVerdict !== 'all') {
    list = list.filter(p => p.verdict === activeVerdict);
  }

  // 3. Search filter
  if (activeSearch) {
    const q = activeSearch.toLowerCase().trim();
    list = list.filter(p =>
      (p.name || '').toLowerCase().includes(q) ||
      (p.category || '').toLowerCase().includes(q) ||
      (p.description || '').toLowerCase().includes(q) ||
      (p.whyBuy || '').toLowerCase().includes(q)
    );
  }

  // 4. Sort
  if (activeSort === 'margin')           list.sort((a,b) => b.margin - a.margin);
  else if (activeSort === 'virality')    list.sort((a,b) => b.scores.virality - a.scores.virality);
  else if (activeSort === 'competition') list.sort((a,b) => a.scores.competition - b.scores.competition);
  else                                   list.sort((a,b) => b.scores.overall - a.scores.overall);

  return list;
}

function renderProducts() {
  const grid = $('products-grid');
  const list = getFilteredSorted();
  if (!list.length) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:60px;color:var(--text3)">
      <div style="font-size:36px;margin-bottom:12px">🔍</div>
      <p style="font-size:15px;font-weight:600">No products match your filters.</p>
      <p style="font-size:13px;margin-top:6px">Try clearing search or changing category filter.</p>
    </div>`;
    return;
  }

  grid.innerHTML = list.map((p, i) => {
    const v  = getVerdict(p.verdict);
    const oc = scoreColor(p.scores.overall);
    const tc = scoreColor(p.scores.trend);
    return `
    <div class="product-card" data-id="${p.id}" style="animation-delay:${i*0.07}s">
      <div class="card-header">
        <div class="card-rank">#${p.rank}</div>
        <span class="card-verdict ${v.cls}">${v.label}</span>
      </div>
      <div class="card-category">${p.category}</div>
      <div class="card-name">${p.name}</div>
      <div class="card-desc">${p.description || p.whyBuy || ''}</div>
      <div class="card-scores">
        <div class="score-item">
          <div class="score-label">Overall</div>
          <div class="score-value" style="color:${oc}">${p.scores.overall}</div>
          <div class="card-mini-bar"><div class="card-mini-fill" style="width:${p.scores.overall}%;background:${oc}"></div></div>
        </div>
        <div class="score-item">
          <div class="score-label">Trend 🔥</div>
          <div class="score-value" style="color:${tc}">${p.scores.trend}</div>
          <div class="card-mini-bar"><div class="card-mini-fill" style="width:${p.scores.trend}%;background:${tc}"></div></div>
        </div>
        <div class="score-item">
          <div class="score-label">Margin</div>
          <div class="score-value" style="color:var(--green)">${p.margin}%</div>
          <div class="card-mini-bar"><div class="card-mini-fill" style="width:${p.margin}%;background:var(--green)"></div></div>
        </div>
      </div>
      <div class="card-footer">
        <div class="card-price">
          <div class="price-sell">$${p.sellPrice}</div>
          <div class="price-cost">Cost ~$${p.supplierCost}</div>
        </div>
        <div class="card-tags">
          ${p.subscription ? '<span class="card-tag">🔄 Sub</span>' : ''}
          ${p.bundle ? '<span class="card-tag">📦 Bundle</span>' : ''}
          ${p.branded ? '<span class="card-tag">🎨 Brand</span>' : ''}
        </div>
        <div class="card-cta">View Report →</div>
      </div>
      <div class="card-quick-links" onclick="event.stopPropagation()">
        <a href="${p.links?.amazon || '#'}" target="_blank" class="chip-link chip-amz">📦 Amazon</a>
        <a href="${p.links?.alibaba || '#'}" target="_blank" class="chip-link chip-ali">🏭 Alibaba</a>
        <a href="${p.links?.tiktokVideos || '#'}" target="_blank" class="chip-link chip-tt">🎬 Video Ads</a>
      </div>
    </div>`;
  }).join('');

  grid.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', () => openModal(+card.dataset.id));
  });
}

/* ===================== MODAL ===================== */
function openModal(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  const v = getVerdict(p.verdict);
  const scoreEntries = [
    ['🏆 Overall', p.scores.overall], ['🔥 Trend', p.scores.trend],
    ['📈 Demand', p.scores.demand],   ['🎥 Virality', p.scores.virality],
    ['🥊 Competition', p.scores.competition], ['💰 Profit', p.scores.profit],
    ['🎨 Branding', p.scores.branding], ['🔄 Repeat', p.scores.repeat],
    ['🩹 Problem', p.scores.problemSolving], ['⚡ Impulse', p.scores.impulse],
    ['📦 Shipping', p.scores.shipping], ['🌿 Evergreen', p.scores.evergreen],
  ];

  const links = p.links || {
    amazon: `https://www.amazon.com/s?k=${encodeURIComponent(p.name)}`,
    alibaba: `https://www.alibaba.com/trade/search?SearchText=${encodeURIComponent(p.name)}`,
    aliexpress: `https://www.aliexpress.com/wholesale?SearchText=${encodeURIComponent(p.name)}`,
    tiktokAds: `https://ads.tiktok.com/business/creativecenter/inspiration/popular/pc/en?period=7&keyword=${encodeURIComponent(p.name)}`,
    tiktokVideos: `https://www.tiktok.com/search?q=${encodeURIComponent(p.name)}`,
    metaAds: `https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=${p.region || 'US'}&q=${encodeURIComponent(p.name)}`,
    youtubeShorts: `https://www.youtube.com/results?search_query=${encodeURIComponent(p.name + ' ad video')}`,
  };

  $('modal-content').innerHTML = `
    <div class="modal-hero">
      <div class="modal-category">${p.category}</div>
      <div class="modal-title">${p.name}</div>
      <div class="modal-badges">
        <span class="modal-badge" style="background:rgba(16,185,129,0.15);color:var(--green);border:1px solid rgba(16,185,129,0.3)">💰 ${p.margin}% Margin</span>
        <span class="modal-badge" style="background:rgba(108,99,255,0.15);color:var(--accent2);border:1px solid rgba(108,99,255,0.3)">📦 ${p.shipping}</span>
        <span class="modal-badge" style="background:rgba(6,182,212,0.15);color:var(--cyan);border:1px solid rgba(6,182,212,0.3)">🔥 Trend: ${p.scores.trend}/100</span>
      </div>
    </div>

    <!-- VIDEO ADS & MARKETPLACE LINKS -->
    <div class="modal-section">
      <div class="modal-section-title">🎬 Video Ads & Sourcing Intelligence</div>
      <div class="links-grid">
        <a href="${links.tiktokVideos}" target="_blank" class="ext-link-card link-tt-vid">
          <div class="ext-link-icon">🎵</div>
          <div class="ext-link-body">
            <div class="ext-link-title">TikTok Ads & Viral Videos</div>
            <div class="ext-link-sub">See real video ads & UGC examples on TikTok</div>
          </div>
          <span class="ext-link-arrow">↗</span>
        </a>
        <a href="${links.metaAds}" target="_blank" class="ext-link-card link-meta">
          <div class="ext-link-icon">📘</div>
          <div class="ext-link-body">
            <div class="ext-link-title">Meta Ad Library</div>
            <div class="ext-link-sub">Inspect active Facebook & Instagram ad campaigns</div>
          </div>
          <span class="ext-link-arrow">↗</span>
        </a>
        <a href="${links.youtubeShorts}" target="_blank" class="ext-link-card link-yt">
          <div class="ext-link-icon">📺</div>
          <div class="ext-link-body">
            <div class="ext-link-title">YouTube Shorts Ads & Reviews</div>
            <div class="ext-link-sub">Watch product unboxings & video ad breakdowns</div>
          </div>
          <span class="ext-link-arrow">↗</span>
        </a>
        <a href="${links.tiktokAds}" target="_blank" class="ext-link-card link-tt-ads">
          <div class="ext-link-icon">⚡</div>
          <div class="ext-link-body">
            <div class="ext-link-title">TikTok Creative Center</div>
            <div class="ext-link-sub">Top trending ad copy, music & CTR analytics</div>
          </div>
          <span class="ext-link-arrow">↗</span>
        </a>
        <a href="${links.amazon}" target="_blank" class="ext-link-card link-amz">
          <div class="ext-link-icon">📦</div>
          <div class="ext-link-body">
            <div class="ext-link-title">Amazon Market Analysis</div>
            <div class="ext-link-sub">Compare live prices, customer reviews & sellers</div>
          </div>
          <span class="ext-link-arrow">↗</span>
        </a>
        <a href="${links.alibaba}" target="_blank" class="ext-link-card link-ali">
          <div class="ext-link-icon">🏭</div>
          <div class="ext-link-body">
            <div class="ext-link-title">Alibaba Wholesale Sourcing</div>
            <div class="ext-link-sub">Find verified factories & OEM supplier pricing</div>
          </div>
          <span class="ext-link-arrow">↗</span>
        </a>
        <a href="${links.aliexpress}" target="_blank" class="ext-link-card link-aliex">
          <div class="ext-link-icon">🛒</div>
          <div class="ext-link-body">
            <div class="ext-link-title">AliExpress Supplier & Orders</div>
            <div class="ext-link-sub">Check order count & dropshipping suppliers</div>
          </div>
          <span class="ext-link-arrow">↗</span>
        </a>
      </div>
    </div>

    <div class="modal-section">
      <div class="modal-section-title">📊 Score Breakdown (Live Data)</div>
      <div class="scores-grid">
        ${scoreEntries.map(([label, val]) => `
          <div class="score-box">
            <div class="score-box-label">${label}</div>
            <div class="score-box-value" style="color:${scoreColor(val)}">${val}</div>
            <div class="score-box-bar"><div class="score-box-fill" style="width:${val}%;background:${scoreColor(val)}"></div></div>
          </div>`).join('')}
      </div>
    </div>

    <div class="modal-section">
      <div class="modal-section-title">📦 Product & Pricing Details</div>
      <div class="detail-grid">
        <div class="detail-row"><span class="dk">Sell Price</span><span class="dv">$${p.sellPrice}</span></div>
        <div class="detail-row"><span class="dk">Supplier Cost</span><span class="dv">~$${p.supplierCost}</span></div>
        <div class="detail-row"><span class="dk">Gross Margin</span><span class="dv" style="color:var(--green)">${p.margin}%</span></div>
        <div class="detail-row"><span class="dk">Net Margin</span><span class="dv">${p.finance.netMargin}</span></div>
        <div class="detail-row"><span class="dk">Bundle Price</span><span class="dv">$${p.pricing.bundle}</span></div>
        <div class="detail-row"><span class="dk">Breakeven ROAS</span><span class="dv">${p.finance.breakevenROAS}</span></div>
        <div class="detail-row"><span class="dk">Target CPA</span><span class="dv">${p.finance.targetCPA}</span></div>
        <div class="detail-row"><span class="dk">Expected AOV</span><span class="dv">${p.finance.expectedAOV}</span></div>
        <div class="detail-row"><span class="dk">Anchor Price</span><span class="dv">${p.pricing.anchor}</span></div>
        <div class="detail-row"><span class="dk">Delivery</span><span class="dv">${p.delivery}</span></div>
      </div>
    </div>

    <div class="modal-section">
      <div class="modal-section-title">🎬 Viral Hooks</div>
      <div class="hooks-list">
        ${(p.hooks || []).map(h => `<div class="hook-item">${h}</div>`).join('')}
      </div>
    </div>

    <div class="modal-section">
      <div class="modal-section-title">📘 Facebook Ad Copy</div>
      <div style="background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:16px">
        <div style="font-size:11px;color:var(--text3);margin-bottom:4px">PRIMARY TEXT</div>
        <p style="font-size:13px;color:var(--text2);line-height:1.6;margin-bottom:12px">${p.fbAd?.primary || ''}</p>
        <div style="display:flex;gap:16px">
          <div><div style="font-size:11px;color:var(--text3)">HEADLINE</div><div style="font-weight:700">${p.fbAd?.headline || ''}</div></div>
          <div><div style="font-size:11px;color:var(--text3)">CTA</div><div style="font-weight:700;color:var(--accent2)">${p.fbAd?.cta || ''}</div></div>
        </div>
      </div>
    </div>

    <div class="modal-section">
      <div class="modal-section-title">📱 TikTok Ad Script</div>
      <div style="background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:16px">
        <div style="font-size:11px;color:var(--text3);margin-bottom:4px">🎯 HOOK</div>
        <p style="font-weight:700;font-size:15px;margin-bottom:12px">"${p.tiktokAd?.hook || ''}"</p>
        <div style="font-size:11px;color:var(--text3);margin-bottom:4px">📝 SCRIPT</div>
        <p style="font-size:13px;color:var(--text2);line-height:1.6;margin-bottom:12px">${p.tiktokAd?.script || ''}</p>
        <div style="font-size:12px;color:var(--cyan)">${p.tiktokAd?.hashtags || ''}</div>
      </div>
    </div>

    <div class="modal-section">
      <div class="modal-section-title">⚠️ Risk Analysis</div>
      <div class="detail-grid">
        ${(p.risks || []).map(r => `
          <div class="detail-row">
            <span class="dk">${r.risk}</span>
            <span class="dv" style="color:${r.level==='high'?'var(--red)':r.level==='medium'?'var(--gold)':'var(--green)'}">
              ${r.level==='high'?'🔴':r.level==='medium'?'🟡':'🟢'} ${r.level}
            </span>
          </div>`).join('')}
      </div>
    </div>

    <div class="modal-section">
      <div class="modal-section-title">🤖 AI Verdict</div>
      <div class="verdict-box ${p.verdict==='MAYBE'?'maybe':p.verdict==='NO'?'no':''}">
        <div class="verdict-title">${v.label}</div>
        <div class="verdict-text">${p.verdictReason}</div>
        <div class="verdict-confidence">Confidence: ${p.confidence}/100</div>
      </div>
    </div>`;

  $('modal-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

$('modal-close').addEventListener('click', closeModal);
$('modal-overlay').addEventListener('click', e => { if (e.target === $('modal-overlay')) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
function closeModal() { $('modal-overlay').classList.remove('open'); document.body.style.overflow = ''; }

/* ===================== GEMS ===================== */
const GEMS_STATIC = [
  { name: "Mushroom Coffee Sachets", emoji: "🍄", why: "Functional beverages exploding. Biohacker audience on TikTok. Sub-$10 cost, $34.99 sell. Refill subscription revenue.", stats: { competition: "🟢 Low", margin: "78%", trend: "📈 Explosive", channel: "TikTok + Pinterest" }, hook: "I replaced my morning coffee with this and my brain fog disappeared", confidence: 88 },
  { name: "Electric Scalp Massager", emoji: "💆", why: "Hair loss anxiety drives massive spend. Not yet saturated on TikTok. Brandable into full hair wellness line.", stats: { competition: "🟢 Low", margin: "74%", trend: "📈 Fast Growing", channel: "TikTok + Instagram" }, hook: "My hair grew back after 3 months of this 10-minute routine", confidence: 86 },
  { name: "Baby Silicone Feeding Mat", emoji: "👶", why: "High-spend parents, safety concerns, cute viral content. Suction base prevents plate-throwing.", stats: { competition: "🟢 Low-Med", margin: "72%", trend: "📈 Steady", channel: "TikTok + Pinterest" }, hook: "This mat saved my sanity at dinner time 😭", confidence: 82 },
  { name: "Beeswax Food Wraps", emoji: "🌿", why: "Eco segment growing. Most sellers have terrible branding. Premium packaging unlocks $45+ AOV.", stats: { competition: "🟢 Low", margin: "77%", trend: "🌿 Evergreen", channel: "Pinterest + Instagram" }, hook: "I haven't used plastic wrap in 8 months — here's how", confidence: 79 },
  { name: "UV-C Phone Sanitizer", emoji: "🔬", why: "Hygiene awareness post-pandemic. Sleek premium design at $29.99 is compelling and viral.", stats: { competition: "🟢 Low-Med", margin: "68%", trend: "📈 Growing", channel: "Facebook + Amazon" }, hook: "Your phone has more bacteria than a toilet seat", confidence: 74 },
];

function renderGems() {
  $('gems-grid').innerHTML = GEMS_STATIC.map(g => `
    <div class="gem-card">
      <div class="gem-name">${g.emoji} ${g.name}</div>
      <div class="gem-why">${g.why}</div>
      <div class="gem-stats">
        ${Object.entries(g.stats).map(([k,v]) => `<span class="gem-stat"><strong>${k}:</strong> ${v}</span>`).join('')}
      </div>
      <div style="margin-top:14px;padding:10px 14px;background:rgba(108,99,255,0.08);border-radius:8px;font-size:13px;color:var(--text2)">
        🎬 <em>"${g.hook}"</em>
      </div>
      <div class="gem-confidence">🎯 Confidence: ${g.confidence}/100</div>
    </div>`).join('');
}

/* ===================== TRENDS ===================== */
function renderTrends() {
  const TRENDS = [
    { time: "30 Days", items: [{ emoji: "💍", product: "Smart Sleep Rings", reason: "Sleep anxiety culture at all-time high. Affordable alternatives to Oura Ring entering market." }, { emoji: "🧃", product: "Personalized Vitamin Packs", reason: "Print-on-demand personalization + subscription = recurring revenue dream." }] },
    { time: "60 Days", items: [{ emoji: "💧", product: "Smart Hydration Bottles", reason: "Gen Z + fitness crossover. LED glow reminders. TikTok water challenges = 4B+ views." }, { emoji: "🌱", product: "Self-Watering Desktop Pots", reason: "WFH aesthetic peaking on Pinterest. Self-watering solves the #1 objection." }] },
    { time: "90 Days", items: [{ emoji: "🧊", product: "At-Home Cold Plunge Kits", reason: "Biohacker trend crossing into mainstream. $299–$499 portable inflatable tubs." }, { emoji: "🛏", product: "Cooling Weighted Blankets", reason: "Weighted 2.0 — temperature-regulating. Winter prep buying starts in September." }] },
    { time: "6 Months", items: [{ emoji: "🪞", product: "AI Smart Fitness Mirrors", reason: "Moving from $1,500 luxury to $300–$400 accessible range. Massive opportunity." }, { emoji: "👜", product: "Sustainable Fashion Accessories", reason: "Gen Z sustainability values premiumizing recycled-material bags and wallets." }] },
    { time: "12 Months", items: [{ emoji: "🧠", product: "Neurofeedback Wellness Headbands", reason: "Brain stimulation entering consumer market. Early movers capture massive share." }, { emoji: "🌬", product: "Indoor Air Quality Monitors", reason: "Global air pollution + indoor health consciousness building huge smart AQI market." }] },
  ];
  $('trends-timeline').innerHTML = TRENDS.map(t => `
    <div class="trend-group">
      <div class="trend-header"><span class="trend-time">📅 ${t.time}</span><h3>${t.items.map(i=>i.product).join(' · ')}</h3></div>
      <div class="trend-items">${t.items.map(i=>`<div class="trend-item"><div class="trend-emoji">${i.emoji}</div><div><div class="trend-product">${i.product}</div><div class="trend-reason">${i.reason}</div></div></div>`).join('')}</div>
    </div>`).join('');
}

/* ===================== SUMMARY ===================== */
function renderSummary() {
  if (!PRODUCTS.length) return;
  const sorted     = [...PRODUCTS].sort((a,b) => b.scores.overall - a.scores.overall);
  const byMargin   = [...PRODUCTS].sort((a,b) => b.margin - a.margin);
  const byVirality = [...PRODUCTS].sort((a,b) => b.scores.virality - a.scores.virality);
  const byLowComp  = [...PRODUCTS].sort((a,b) => a.scores.competition - b.scores.competition);
  const winner     = sorted[0];

  const rankHTML = (list, val) => list.slice(0,5).map((p,i) => {
    const cls = i===0?'gold':i===1?'silver':i===2?'bronze':'';
    return `<div class="rank-item"><div class="rank-num ${cls}">${i+1}</div><div class="rank-name">${p.name}</div><div class="rank-score">${val(p)}</div></div>`;
  }).join('');

  $('summary-grid').innerHTML = `
    <div class="winner-card">
      <div class="winner-trophy">🏆</div>
      <div>
        <div class="winner-label">Overall Winner of the Day</div>
        <div class="winner-name">${winner.name}</div>
        <div class="winner-desc">Score ${winner.scores.overall}/100 · ${winner.margin}% margin · Trend ${winner.scores.trend}/100 · Confidence ${winner.confidence}%</div>
      </div>
    </div>
    <div class="summary-card"><div class="summary-card-title">🏆 Top Overall Score</div><div class="summary-rank-list">${rankHTML(sorted, p => p.scores.overall)}</div></div>
    <div class="summary-card"><div class="summary-card-title">💰 Top Profit Margin</div><div class="summary-rank-list">${rankHTML(byMargin, p => p.margin+'%')}</div></div>
    <div class="summary-card"><div class="summary-card-title">🎥 Top Virality</div><div class="summary-rank-list">${rankHTML(byVirality, p => p.scores.virality)}</div></div>
    <div class="summary-card"><div class="summary-card-title">🥊 Lowest Competition</div><div class="summary-rank-list">${rankHTML(byLowComp, p => p.scores.competition+'%')}</div></div>`;
}

/* ===================== REFRESH BUTTON ===================== */
$('refresh-btn').addEventListener('click', async () => {
  $('refresh-btn').textContent = '⏳ Scanning...';
  $('refresh-btn').disabled = true;
  await loadReport(true);
  $('refresh-btn').textContent = '↻ Refresh Report';
  $('refresh-btn').disabled = false;
});

/* ===================== INIT ===================== */
const clearBtn = $('search-clear');
if (clearBtn) {
  clearBtn.addEventListener('click', () => {
    const inp = $('search-input');
    if (inp) inp.value = '';
    activeSearch = '';
    renderProducts();
  });
}

buildVerdictBar();
renderTrends();
loadReport();
