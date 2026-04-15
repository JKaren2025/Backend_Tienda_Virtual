const db = require('../models');

const categoria = db.tbc_categoria;

module.exports = {
    async create(req, res) {
        try {
            const nuevaCategoria = await categoria.create({
                nombre: req.body.nombre
            });

            return res.status(201).send(nuevaCategoria);
        } catch (error) {
            return res.status(400).send(error);
        }
    },

    async list(_, res) {
        try {
            const categorias = await categoria.findAll({
                order: [['id', 'ASC']],
                include: [{
                    model: db.tbb_producto,
                    as: 'productos'
                }]
            });

            return res.status(200).send(categorias);
        } catch (error) {
            return res.status(400).send(error);
        }
    },

    async findById(req, res) {
        try {
            const categoriaEncontrada = await categoria.findByPk(req.params.id, {
                include: [{
                    model: db.tbb_producto,
                    as: 'productos'
                }]
            });

            if (!categoriaEncontrada) {
                return res.status(404).send({ mensaje: 'Categoria no encontrada' });
            }

            return res.status(200).send(categoriaEncontrada);
        } catch (error) {
            return res.status(400).send(error);
        }
    },

    async findByName(req, res) {
        try {
            const categorias = await categoria.findAll({
                where: {
                    nombre: req.params.nombre
                },
                include: [{
                    model: db.tbb_producto,
                    as: 'productos'
                }]
            });

            return res.status(200).send(categorias);
        } catch (error) {
            return res.status(400).send(error);
        }
    },

    async update(req, res) {
        try {
            const categoriaEncontrada = await categoria.findByPk(req.params.id);

            if (!categoriaEncontrada) {
                return res.status(404).send({ mensaje: 'Categoria no encontrada' });
            }

            await categoriaEncontrada.update({
                nombre: req.body.nombre
            });

            return res.status(200).send(categoriaEncontrada);
        } catch (error) {
            return res.status(400).send(error);
        }
    },

    async delete(req, res) {
        try {
            const categoriaEncontrada = await categoria.findByPk(req.params.id);

            if (!categoriaEncontrada) {
                return res.status(404).send({ mensaje: 'Categoria no encontrada' });
            }

            await categoriaEncontrada.destroy();
            return res.status(200).send({ mensaje: 'Datos eliminados correctamente' });
        } catch (error) {
            return res.status(400).send(error);
        }
    }
};
