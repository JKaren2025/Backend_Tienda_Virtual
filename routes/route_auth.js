const authController = require('../controller/controller_auth');

module.exports = (app) => {
  app.post('/api/login', authController.login);
};
