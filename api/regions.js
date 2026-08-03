const { REGIONS } = require('../server/scraper');

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.json({ success: true, regions: REGIONS });
};
