const { REGIONS } = require('../server/scraper');

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.json({
    status: 'online',
    supportedRegions: Object.keys(REGIONS),
    sources: ['Google Trends', 'Reddit', 'eBay', 'AliExpress']
  });
};
