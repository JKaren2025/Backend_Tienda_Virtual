const db = require('../models');

const carritoDetalle = db.tbd_carrito_detalle;

module.exports = {
    async create(req, res) {
        try {
            const nuevoDetalle = await carritoDetalle.create({
                id_carrito: req.body.id_carrito,
                id_producto: req.body.id_producto,
                precio_unitario: req.body.precio_unitario,
                cantidad: req.body.cantidad
            });

            return res.status(201).send(nuevoDetalle);
        } catch (error) {
            return res.status(400).send(error);
        }
    },

    async list(_, res) {
        try {
            const detalles = await carritoDetalle.findAll({
                include: [
                    {
                        model: db.tbb_carrito,
                        as: 'carrito'
                    },
                    {
                        model: db.tbb_producto,
                        as: 'producto'
                    }
                ]
            });

            return res.status(200).send(detalles);
        } catch (error) {
            return res.status(400).send(error);
        }
    },

    async find(req, res) {
        try {
            const detalleEncontrado = await carritoDetalle.findByPk(req.params.id, {
                include: [
                    {
                        model: db.tbb_carrito,
                        as: 'carrito'
                    },
                    {
                        model: db.tbb_producto,
                        as: 'producto'
                    }
                ]
            });

            if (!detalleEncontrado) {
                return res.status(404).send({ mensaje: 'Detalle de carrito no encontrado' });
            }

            return res.status(200).send(detalleEncontrado);
        } catch (error) {
            return res.status(400).send(error);
        }
    },

    async update(req, res) {
        try {
            const detalleEncontrado = await carritoDetalle.findByPk(req.params.id);

            if (!detalleEncontrado) {
                return res.status(404).send({ mensaje: 'Detalle de carrito no encontrado' });
            }

            await detalleEncontrado.update({
                id_carrito: req.body.id_carrito,
                id_producto: req.body.id_producto,
                precio_unitario: req.body.precio_unitario,
                cantidad: req.body.cantidad
            });

            return res.status(200).send(detalleEncontrado);
        } catch (error) {
            return res.status(400).send(error);
        }
    },

    async delete(req, res) {
        try {
            const detalleEncontrado = await carritoDetalle.findByPk(req.params.id);

            if (!detalleEncontrado) {
                return res.status(404).send({ mensaje: 'Detalle de carrito no encontrado' });
            }

            await detalleEncontrado.destroy();
            return res.status(200).send({ mensaje: 'Datos eliminados correctamente' });
        } catch (error) {
            return res.status(400).send(error);
        }
    }
};
