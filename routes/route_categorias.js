const categoriaController = require('../controller/controller_categoria');
const { authenticateToken, requireRole } = require('../middleware/auth');

module.exports = (app) => {
    app.get('/categorias', categoriaController.list);
    app.get('/api/categorias', categoriaController.list);
    app.get('/api/categorias/id/:id', categoriaController.findById);
    app.get('/api/categorias/nombre/:nombre', categoriaController.findByName);
    app.post('/api/categorias', authenticateToken, requireRole('admin'), categoriaController.create);
    app.put('/api/categorias/:id', authenticateToken, requireRole('admin'), categoriaController.update);
    app.delete('/api/categorias/:id', authenticateToken, requireRole('admin'), categoriaController.delete);
};
