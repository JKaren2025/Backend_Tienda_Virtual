const db = require('../models');
const carritoDetalle = db.tbd_carrito_detalle;

module.exports = {
    create(req, res) {
        return carritoDetalle.create({
            id_carrito: req.body.id_carrito,
            id_producto: req.body.id_producto,
            precio_unitario: req.body.precio_unitario,
            cantidad: req.body.cantidad
        })
        .then(carritoDetalle => res.status(200).send(carritoDetalle))
        .catch(error => res.status(400).send(error))
    },

    list(_, res) {
        return carritoDetalle.findAll()
            .then(carritoDetalle => res.status(200).send(carritoDetalle))
            .catch(error => res.status(400).send(error))
    },

    find(req, res) {
        return carritoDetalle.findAll({
            where: {
                id: req.params.id
            }
        })
        .then(carritoDetalle => res.status(200).send(carritoDetalle))
        .catch(error => res.status(400).send(error))
    },

    delete(req, res) {
        return carritoDetalle.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(() => res.status(200).send({ message: 'Dato eliminado correctamente' }))
        .catch(error => res.status(400).send(error))
    },

    update(req, res) {
        return carritoDetalle.update(
            {
                id_carrito: req.body.id_carrito,
                id_producto: req.body.id_producto,
                precio_unitario: req.body.precio_unitario,
                cantidad: req.body.cantidad
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
