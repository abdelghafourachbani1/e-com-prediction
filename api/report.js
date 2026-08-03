const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const geo = (req.query?.geo || 'US').toUpperCase();

  const cacheFiles = [
    path.join('/tmp', 'cache', `report-${geo}.json`),
    path.join(__dirname, '..', 'server', 'cache', `report-${geo}.json`),
    path.join(__dirname, '..', 'server', 'cache', 'report-US.json')
  ];

  for (const file of cacheFiles) {
    if (fs.existsSync(file)) {
      try {
        const data = JSON.parse(fs.readFileSync(file, 'utf8'));
        return res.status(200).json({ success: true, report: data });
      } catch (e) {}
    }
  }

  try {
    const app = require('../server/server');
    return app(req, res);
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};
