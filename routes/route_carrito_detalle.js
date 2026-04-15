const carritoDetalleController = require('../controller/controller_carrito_detalle');

module.exports = (app) => {
    app.get('/api/carrito-detalles', carritoDetalleController.list);
    app.get('/api/carrito-detalles/:id', carritoDetalleController.find);
    app.post('/api/carrito-detalles', carritoDetalleController.create);
    app.put('/api/carrito-detalles/:id', carritoDetalleController.update);
    app.delete('/api/carrito-detalles/:id', carritoDetalleController.delete);
};
