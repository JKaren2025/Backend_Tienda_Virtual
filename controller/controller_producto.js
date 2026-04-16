const db = require('../models');

const producto = db.tbb_producto;

module.exports = {
    async create(req, res) {
        try {
            const nuevoProducto = await producto.create({
                nombre: req.body.nombre,
                descripcion: req.body.descripcion,
                precio: req.body.precio,
                imagen: req.body.imagen,
                stock: req.body.stock,
                id_categoria: req.body.id_categoria
            });

            return res.status(201).send(nuevoProducto);
        } catch (error) {
            return res.status(400).send(error);
        }
    },

    async list(_, res) {
        try {
            const productos = await producto.findAll({
                include: [{
                    model: db.tbc_categoria,
                    as: 'categoria'
                }]
            });

            return res.status(200).send(productos);
        } catch (error) {
            return res.status(400).send(error);
        }
    },

    async find(req, res) {
        try {
            const productoEncontrado = await producto.findByPk(req.params.id, {
                include: [{
                    model: db.tbc_categoria,
                    as: 'categoria'
                }]
            });

            if (!productoEncontrado) {
                return res.status(404).send({ mensaje: 'Producto no encontrado' });
            }

            return res.status(200).send(productoEncontrado);
        } catch (error) {
            return res.status(400).send(error);
        }
    },

    async update(req, res) {
        try {
            const productoEncontrado = await producto.findByPk(req.params.id);

            if (!productoEncontrado) {
                return res.status(404).send({ mensaje: 'Producto no encontrado' });
            }

            await productoEncontrado.update({
                nombre: req.body.nombre,
                descripcion: req.body.descripcion,
                precio: req.body.precio,
                imagen: req.body.imagen,
                stock: req.body.stock,
                id_categoria: req.body.id_categoria
            });

            return res.status(200).send(productoEncontrado);
        } catch (error) {
            return res.status(400).send(error);
        }
    },

    async delete(req, res) {
        try {
            const productoEncontrado = await producto.findByPk(req.params.id);

            if (!productoEncontrado) {
                return res.status(404).send({ mensaje: 'Producto no encontrado' });
            }

            await productoEncontrado.destroy();
            return res.status(200).send({ mensaje: 'Datos eliminados correctamente' });
        } catch (error) {
            return res.status(400).send(error);
        }
    }
};
