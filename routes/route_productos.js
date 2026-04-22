const productoController = require('../controller/controller_producto');
const { authenticateToken, requireRole } = require('../middleware/auth');

module.exports = (app) => {
    app.get('/api/productos', productoController.list);
    app.get('/api/productos/:id', productoController.find);
    app.post('/api/productos', authenticateToken, requireRole('admin'), productoController.create);
    app.put('/api/productos/:id', authenticateToken, requireRole('admin'), productoController.update);
    app.delete('/api/productos/:id', authenticateToken, requireRole('admin'), productoController.delete);
};
