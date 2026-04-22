const db = require('../models');
const { recalcularTotalCarrito } = require('../helpers/carrito');

const carritoDetalle = db.tbd_carrito_detalle;
const carrito = db.tbb_carrito;
const esAdmin = (req) => req.user?.rol === 'admin';

module.exports = {
    async create(req, res) {
        try {
            const carritoEncontrado = await carrito.findByPk(req.body.id_carrito);

            if (!carritoEncontrado) {
                return res.status(404).send({ mensaje: 'Carrito no encontrado' });
            }

            if (!esAdmin(req) && carritoEncontrado.id_usuario !== req.user.id) {
                return res.status(403).send({ mensaje: 'No tienes permisos para modificar este carrito' });
            }

            const nuevoDetalle = await carritoDetalle.create({
                id_carrito: req.body.id_carrito,
                id_producto: req.body.id_producto,
                precio_unitario: req.body.precio_unitario,
                cantidad: req.body.cantidad
            });

            await recalcularTotalCarrito(db, nuevoDetalle.id_carrito);
            return res.status(201).send(nuevoDetalle);
        } catch (error) {
            return res.status(400).send(error);
        }
    },

    async list(req, res) {
        try {
            const includeCarrito = {
                model: db.tbb_carrito,
                as: 'carrito'
            };

            if (!esAdmin(req)) {
                includeCarrito.where = { id_usuario: req.user.id };
            }

            const detalles = await carritoDetalle.findAll({
                include: [
                    includeCarrito,
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

            if (!esAdmin(req) && detalleEncontrado.carrito?.id_usuario !== req.user.id) {
                return res.status(403).send({ mensaje: 'No tienes permisos para ver este detalle de carrito' });
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

            const carritoEncontrado = await carrito.findByPk(detalleEncontrado.id_carrito);

            if (!esAdmin(req) && carritoEncontrado?.id_usuario !== req.user.id) {
                return res.status(403).send({ mensaje: 'No tienes permisos para modificar este detalle de carrito' });
            }

            await detalleEncontrado.update({
                id_carrito: req.body.id_carrito,
                id_producto: req.body.id_producto,
                precio_unitario: req.body.precio_unitario,
                cantidad: req.body.cantidad
            });

            await recalcularTotalCarrito(db, detalleEncontrado.id_carrito);
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

            const carritoEncontrado = await carrito.findByPk(detalleEncontrado.id_carrito);

            if (!esAdmin(req) && carritoEncontrado?.id_usuario !== req.user.id) {
                return res.status(403).send({ mensaje: 'No tienes permisos para eliminar este detalle de carrito' });
            }

            const idCarrito = detalleEncontrado.id_carrito;
            await detalleEncontrado.destroy();
            await recalcularTotalCarrito(db, idCarrito);
            return res.status(200).send({ mensaje: 'Datos eliminados correctamente' });
        } catch (error) {
            return res.status(400).send(error);
        }
    }
};
