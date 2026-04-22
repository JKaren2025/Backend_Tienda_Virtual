const carritoDetalleController = require('../controller/controller_carrito_detalle');
const { authenticateToken } = require('../middleware/auth');

module.exports = (app) => {
    app.get('/api/carrito-detalles', authenticateToken, carritoDetalleController.list);
    app.get('/api/carrito-detalles/:id', authenticateToken, carritoDetalleController.find);
    app.post('/api/carrito-detalles', authenticateToken, carritoDetalleController.create);
    app.put('/api/carrito-detalles/:id', authenticateToken, carritoDetalleController.update);
    app.delete('/api/carrito-detalles/:id', authenticateToken, carritoDetalleController.delete);
};
