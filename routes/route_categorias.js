const categoriaController = require('../controller/controller_categoria');

module.exports = (app) => {
    app.get('/categorias', categoriaController.list);
    app.get('/api/categorias', categoriaController.list);
    app.get('/api/categorias/id/:id', categoriaController.findById);
    app.get('/api/categorias/nombre/:nombre', categoriaController.findByName);
    app.post('/api/categorias', categoriaController.create);
    app.put('/api/categorias/:id', categoriaController.update);
    app.delete('/api/categorias/:id', categoriaController.delete);
};
