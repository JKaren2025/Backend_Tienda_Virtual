const db = require('../models');
const carrito = db.tbb_carrito;

module.exports = {
    create(req, res) {
        return carrito.create({
            id_usuario: req.body.id_usuario,
            total: req.body.total,
            estado: req.body.estado || 'pendiente',
            fecha_creacion: req.body.fecha_creacion || new Date()
        })
        .then(carrito => res.status(200).send(carrito))
        .catch(error => res.status(400).send(error))
    },

    list(_, res) {
        return carrito.findAll()
            .then(carrito => res.status(200).send(carrito))
            .catch(error => res.status(400).send(error))
    },

    find(req, res) {
        return carrito.findAll({
            where: {
                id: req.params.id
            }
        })
        .then(carrito => res.status(200).send(carrito))
        .catch(error => res.status(400).send(error))
    },

    delete(req, res) {
        return carrito.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(() => res.status(200).send({ message: 'Dato eliminado correctamente' }))
        .catch(error => res.status(400).send(error))
    },

    update(req, res) {
        return carrito.update(
            {
                id_usuario: req.body.id_usuario,
                total: req.body.total,
                estado: req.body.estado,
                fecha_creacion: req.body.fecha_creacion
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
