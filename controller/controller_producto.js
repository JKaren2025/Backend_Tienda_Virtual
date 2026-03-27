const db = require('../models');
const producto = db.tbb_producto;

module.exports = {
    create(req, res) {
        return producto.create({
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            precio: req.body.precio,
            stock: req.body.stock,
            id_categoria: req.body.id_categoria
        })
        .then(producto => res.status(200).send(producto))
        .catch(error => res.status(400).send(error))
    },

    list(_, res) {
        return producto.findAll()
            .then(producto => res.status(200).send(producto))
            .catch(error => res.status(400).send(error))
    },

    find(req, res) {
        return producto.findAll({
            where: {
                id: req.params.id
            }
        })
        .then(producto => res.status(200).send(producto))
        .catch(error => res.status(400).send(error))
    },

    delete(req, res) {
        return producto.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(() => res.status(200).send({ message: 'Dato eliminado correctamente' }))
        .catch(error => res.status(400).send(error))
    },

    update(req, res) {
        return producto.update(
            {
                nombre: req.body.nombre,
                descripcion: req.body.descripcion,
                precio: req.body.precio,
                stock: req.body.stock,
                id_categoria: req.body.id_categoria
            },
            {
                where: {
                    id: req.params.id
                }
            }
        )
        .then(() => res.status(200).send({ message: 'Dato actualizado correctamente' }))
        .catch(error => res.status(400).send(error))
    }
};
