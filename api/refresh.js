module.exports = async (req, res) => {
  const app = require('../server/server');
  return app(req, res);
};
