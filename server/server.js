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

function getCacheFile(geo) {
  return path.join(__dirname, 'cache', `report-${geo}.json`);
}

function readCache(geo) {
  const file = getCacheFile(geo);
  if (fs.existsSync(file)) return JSON.parse(fs.readFileSync(file, 'utf8'));
  return null;
}

// ─── GET /api/regions — list all supported regions ────────────────────────
app.get('/api/regions', (req, res) => {
  res.json({ success: true, regions: REGIONS });
});

// ─── GET /api/report?geo=US — get report for a region ────────────────────
app.get('/api/report', async (req, res) => {
  const geo = (req.query.geo || 'US').toUpperCase();
  if (!REGIONS[geo]) return res.status(400).json({ success:false, error:`Unknown region: ${geo}` });

  try {
    let report = readCache(geo);

    if (!report) {
      console.log(`[${geo}] No cache — scraping now...`);
      report = await scrapeAll(geo);
    } else {
      const hoursOld = (Date.now() - new Date(report.generatedAt).getTime()) / 3600000;
      if (hoursOld > 23) {
        console.log(`[${geo}] Cache ${hoursOld.toFixed(1)}h old — refreshing in background`);
        scrapeAll(geo).catch(console.error);
      }
    }
    res.json({ success: true, report });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ─── POST /api/refresh?geo=US — force refresh ────────────────────────────
app.post('/api/refresh', async (req, res) => {
  const geo = (req.query.geo || req.body?.geo || 'US').toUpperCase();
  if (!REGIONS[geo]) return res.status(400).json({ success:false, error:`Unknown region: ${geo}` });
  try {
    const report = await scrapeAll(geo);
    res.json({ success: true, report });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ─── GET /api/status ─────────────────────────────────────────────────────
app.get('/api/status', (req, res) => {
  const cacheDir = path.join(__dirname, 'cache');
  const cached = {};
  if (fs.existsSync(cacheDir)) {
    fs.readdirSync(cacheDir).filter(f => f.startsWith('report-')).forEach(f => {
      const geo = f.replace('report-','').replace('.json','');
      const data = JSON.parse(fs.readFileSync(path.join(cacheDir, f)));
      cached[geo] = { date: data.date, generatedAt: data.generatedAt, products: data.products.length };
    });
  }
  res.json({ status:'online', supportedRegions: Object.keys(REGIONS), cachedReports: cached, sources: ['Google Trends','Reddit','eBay','AliExpress'] });
});

// ─── Serve frontend ───────────────────────────────────────────────────────
app.use(express.static(path.join(__dirname, '..')));

// ─── Daily cron: refresh US report at midnight, others at 1am–2am ─────────
cron.schedule('0 0 * * *', () => {
  console.log('\n⏰ CRON: Refreshing US report...');
  scrapeAll('US').catch(console.error);
}, { timezone: 'America/New_York' });

cron.schedule('0 1 * * *', () => {
  console.log('\n⏰ CRON: Refreshing GB + CA reports...');
  scrapeAll('GB').catch(console.error);
  scrapeAll('CA').catch(console.error);
}, { timezone: 'America/New_York' });

cron.schedule('0 2 * * *', () => {
  console.log('\n⏰ CRON: Refreshing AU + FR + DE reports...');
  ['AU','FR','DE'].forEach(geo => scrapeAll(geo).catch(console.error));
}, { timezone: 'America/New_York' });

// ─── Start ────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n⚡ ProductIQ v2 running at http://localhost:${PORT}`);
  console.log(`📊 Regions: ${Object.keys(REGIONS).join(', ')}`);
  console.log(`🔎 Sources: Google Trends, Reddit, eBay, AliExpress`);
  console.log(`🕛 Cron: US@midnight, GB+CA@1am, AU+FR+DE@2am\n`);

  const cacheDir = path.join(__dirname,'cache');
  if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir);

  if (!fs.existsSync(path.join(cacheDir,'report-US.json'))) {
    console.log('🔍 No US cache — running first scrape...\n');
    scrapeAll('US').catch(console.error);
  }
});
