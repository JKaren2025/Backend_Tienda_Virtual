const carritoController = require('../controller/controller_carrito');
const { authenticateToken } = require('../middleware/auth');

module.exports = (app) => {
    app.get('/api/carritos', authenticateToken, carritoController.list);
    app.get('/api/carritos/:id', authenticateToken, carritoController.find);
    app.post('/api/carritos', authenticateToken, carritoController.create);
    app.post('/api/carritos/agregar-producto', authenticateToken, carritoController.addProduct);
    app.put('/api/carritos/:id', authenticateToken, carritoController.update);
    app.delete('/api/carritos/:id', authenticateToken, carritoController.delete);
};
