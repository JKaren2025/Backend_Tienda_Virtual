const db = require('../models');

const carrito = db.tbb_carrito;

module.exports = {
    async create(req, res) {
        try {
            const nuevoCarrito = await carrito.create({
                id_usuario: req.body.id_usuario,
                total: req.body.total,
                estado: req.body.estado,
                fecha_creacion: req.body.fecha_creacion
            });

            return res.status(201).send(nuevoCarrito);
        } catch (error) {
            return res.status(400).send(error);
        }
    },

    async list(_, res) {
        try {
            const carritos = await carrito.findAll({
                include: [{
                    model: db.tbc_usuario,
                    as: 'usuario'
                }]
            });

            return res.status(200).send(carritos);
        } catch (error) {
            return res.status(400).send(error);
        }
    },

    async find(req, res) {
        try {
            const carritoEncontrado = await carrito.findByPk(req.params.id, {
                include: [{
                    model: db.tbc_usuario,
                    as: 'usuario'
                }]
            });

            if (!carritoEncontrado) {
                return res.status(404).send({ mensaje: 'Carrito no encontrado' });
            }

            return res.status(200).send(carritoEncontrado);
        } catch (error) {
            return res.status(400).send(error);
        }
    },

    async update(req, res) {
        try {
            const carritoEncontrado = await carrito.findByPk(req.params.id);

            if (!carritoEncontrado) {
                return res.status(404).send({ mensaje: 'Carrito no encontrado' });
            }

            await carritoEncontrado.update({
                id_usuario: req.body.id_usuario,
                total: req.body.total,
                estado: req.body.estado,
                fecha_creacion: req.body.fecha_creacion
            });

            return res.status(200).send(carritoEncontrado);
        } catch (error) {
            return res.status(400).send(error);
        }
    },

    async delete(req, res) {
        try {
            const carritoEncontrado = await carrito.findByPk(req.params.id);

            if (!carritoEncontrado) {
                return res.status(404).send({ mensaje: 'Carrito no encontrado' });
            }

            await carritoEncontrado.destroy();
            return res.status(200).send({ mensaje: 'Datos eliminados correctamente' });
        } catch (error) {
            return res.status(400).send(error);
        }
    }
};
