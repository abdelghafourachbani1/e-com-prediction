const express = require('express');
const cors    = require('cors');
const cron    = require('node-cron');
const fs      = require('fs');
const path    = require('path');
const { scrapeAll, REGIONS } = require('./scraper');

const app  = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const cacheDir = process.env.VERCEL
  ? path.join('/tmp', 'cache')
  : path.join(__dirname, 'cache');

if (!fs.existsSync(cacheDir)) {
  try { fs.mkdirSync(cacheDir, { recursive: true }); } catch (e) {}
}

function getCacheFile(geo) {
  return path.join(cacheDir, `report-${geo}.json`);
}

function readCache(geo) {
  // 1. Try tmp cache directory
  const tmpFile = path.join(cacheDir, `report-${geo}.json`);
  if (fs.existsSync(tmpFile)) {
    try { return JSON.parse(fs.readFileSync(tmpFile, 'utf8')); } catch(e){}
  }
  // 2. Try bundled server/cache directory
  const bundledFile = path.join(__dirname, 'cache', `report-${geo}.json`);
  if (fs.existsSync(bundledFile)) {
    try { return JSON.parse(fs.readFileSync(bundledFile, 'utf8')); } catch(e){}
  }
  // 3. Fallback to US bundled cache
  const defaultFile = path.join(__dirname, 'cache', 'report-US.json');
  if (fs.existsSync(defaultFile)) {
    try { return JSON.parse(fs.readFileSync(defaultFile, 'utf8')); } catch(e){}
  }
  return null;
}

// ─── GET /api/regions & /regions ──────────────────────────────────────────
app.get(['/api/regions', '/regions'], (req, res) => {
  res.json({ success: true, regions: REGIONS });
});

// ─── GET /api/report & /report ────────────────────────────────────────────
app.get(['/api/report', '/report'], async (req, res) => {
  const geo = (req.query.geo || 'US').toUpperCase();
  if (!REGIONS[geo]) return res.status(400).json({ success:false, error:`Unknown region: ${geo}` });

  try {
    let report = readCache(geo);

    if (!report) {
      console.log(`[${geo}] No cache — scraping now...`);
      report = await scrapeAll(geo);
      try { fs.writeFileSync(getCacheFile(geo), JSON.stringify(report, null, 2)); } catch(e){}
    }
    res.json({ success: true, report });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ─── POST /api/refresh & /refresh ────────────────────────────────────────
app.post(['/api/refresh', '/refresh'], async (req, res) => {
  const geo = (req.query.geo || req.body?.geo || 'US').toUpperCase();
  if (!REGIONS[geo]) return res.status(400).json({ success:false, error:`Unknown region: ${geo}` });
  try {
    const report = await scrapeAll(geo);
    try { fs.writeFileSync(getCacheFile(geo), JSON.stringify(report, null, 2)); } catch(e){}
    res.json({ success: true, report });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ─── GET /api/status & /status ───────────────────────────────────────────
app.get(['/api/status', '/status'], (req, res) => {
  const cached = {};
  [cacheDir, path.join(__dirname, 'cache')].forEach(dir => {
    if (fs.existsSync(dir)) {
      fs.readdirSync(dir).filter(f => f.startsWith('report-')).forEach(f => {
        const geo = f.replace('report-','').replace('.json','');
        try {
          const data = JSON.parse(fs.readFileSync(path.join(dir, f)));
          cached[geo] = { date: data.date, generatedAt: data.generatedAt, products: data.products.length };
        } catch(e) {}
      });
    }
  });
  res.json({ status:'online', supportedRegions: Object.keys(REGIONS), cachedReports: cached, sources: ['Google Trends','Reddit','eBay','AliExpress'] });
});

// ─── Serve static frontend if running locally ──────────────────────────────
app.use(express.static(path.join(__dirname, '..')));

// ─── Daily cron (only in long-running node processes) ────────────────────
if (!process.env.VERCEL) {
  cron.schedule('0 0 * * *', () => {
    console.log('\n⏰ CRON: Refreshing US report...');
    scrapeAll('US').catch(console.error);
  }, { timezone: 'America/New_York' });
}

// ─── Start local server if run directly ──────────────────────────────────
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`\n⚡ ProductIQ v2 running at http://localhost:${PORT}`);
    console.log(`📊 Regions: ${Object.keys(REGIONS).join(', ')}`);
    console.log(`🔎 Sources: Google Trends, Reddit, eBay, AliExpress\n`);

    if (!fs.existsSync(path.join(cacheDir,'report-US.json'))) {
      console.log('🔍 No US cache — running first scrape...\n');
      scrapeAll('US').catch(console.error);
    }
  });
}

module.exports = app;

