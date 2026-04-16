const db = require('../models');

const usuario = db.tbc_usuario;

module.exports = {
    async create(req, res) {
        try {
            const nuevoUsuario = await usuario.create({
                nombre: req.body.nombre,
                direccion: req.body.direccion,
                telefono: req.body.telefono,
                email: req.body.email,
                imagen: req.body.imagen,
                password: req.body.password,
                rol: req.body.rol,
                fecha_registro: req.body.fecha_registro
            });

            return res.status(201).send(nuevoUsuario);
        } catch (error) {
            return res.status(400).send(error);
        }
    },

    async list(_, res) {
        try {
            const usuarios = await usuario.findAll();
            return res.status(200).send(usuarios);
        } catch (error) {
            return res.status(400).send(error);
        }
    },

    async find(req, res) {
        try {
            const usuarioEncontrado = await usuario.findByPk(req.params.id);

            if (!usuarioEncontrado) {
                return res.status(404).send({ mensaje: 'Usuario no encontrado' });
            }

            return res.status(200).send(usuarioEncontrado);
        } catch (error) {
            return res.status(400).send(error);
        }
    },

    async update(req, res) {
        try {
            const usuarioEncontrado = await usuario.findByPk(req.params.id);

            if (!usuarioEncontrado) {
                return res.status(404).send({ mensaje: 'Usuario no encontrado' });
            }

            await usuarioEncontrado.update({
                nombre: req.body.nombre,
                direccion: req.body.direccion,
                telefono: req.body.telefono,
                email: req.body.email,
                imagen: req.body.imagen,
                password: req.body.password,
                rol: req.body.rol,
                fecha_registro: req.body.fecha_registro
            });

            return res.status(200).send(usuarioEncontrado);
        } catch (error) {
            return res.status(400).send(error);
        }
    },

    async delete(req, res) {
        try {
            const usuarioEncontrado = await usuario.findByPk(req.params.id);

            if (!usuarioEncontrado) {
                return res.status(404).send({ mensaje: 'Usuario no encontrado' });
            }

            await usuarioEncontrado.destroy();
            return res.status(200).send({ mensaje: 'Datos eliminados correctamente' });
        } catch (error) {
            return res.status(400).send(error);
        }
    }
};
