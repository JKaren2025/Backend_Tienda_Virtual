const db = require('../models');
const usuario = db.tbc_usuario;

module.exports = {
    create(req, res) {
        return usuario.create({
            nombre: req.body.nombre,
            direccion: req.body.direccion,
            telefono: req.body.telefono,
            email: req.body.email,
            password: req.body.password,
            rol: req.body.rol || 'cliente',
            fecha_registro: req.body.fecha_registro || new Date()
        })
        .then(usuario => res.status(200).send(usuario))
        .catch(error => res.status(400).send(error))
    },

    list(_, res) {
        return usuario.findAll()
            .then(usuario => res.status(200).send(usuario))
            .catch(error => res.status(400).send(error))
    },

    find(req, res) {
        return usuario.findAll({
            where: {
                id: req.params.id
            }
        })
        .then(usuario => res.status(200).send(usuario))
        .catch(error => res.status(400).send(error))
    },

    delete(req, res) {
        return usuario.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(() => res.status(200).send({ message: 'Dato eliminado correctamente' }))
        .catch(error => res.status(400).send(error))
    },

    update(req, res) {
        return usuario.update(
            {
                nombre: req.body.nombre,
                direccion: req.body.direccion,
                telefono: req.body.telefono,
                email: req.body.email,
                password: req.body.password,
                rol: req.body.rol,
                fecha_registro: req.body.fecha_registro
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
