const usuarioController = require('../controller/controller_usuario');
const { optionalAuth, authenticateToken, requireRole } = require('../middleware/auth');

module.exports = (app) => {
    app.get('/api/usuarios', authenticateToken, requireRole('admin'), usuarioController.list);
    app.get('/api/usuarios/:id', authenticateToken, requireRole('admin'), usuarioController.find);
    app.post('/api/usuarios', optionalAuth, usuarioController.create);
    app.put('/api/usuarios/:id', authenticateToken, requireRole('admin'), usuarioController.update);
    app.delete('/api/usuarios/:id', authenticateToken, requireRole('admin'), usuarioController.delete);
};
