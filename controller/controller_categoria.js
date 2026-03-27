const Sequelize = require('sequelize');
const db = require('../models');
const categoria = db.tbc_categoria;

module.exports = {//creanodo el controlador de categoria
    create(req, res) {//dos constantes, enlaprimera se almacenra KLOS ATRIBUTOS, ENEL CASODE CREAREL NOMBRE, DIRECCION ETC,RES, MUESTRA LA SALIDA DEL SERVIDOR, SILIMPIE O ACTUALICE CORRECTAMENTE
        return categoria.create({
            nombre: req.body.nombre
        })
        .then(categoria=>res.status(200).send(categoria))
        //.then(categoria => res.status(200).send({message: "Dato creado correctamente"}) )
        .catch(error => res.status(400).send(error))
    },
    list(_, res) {//listando las categorias esto para que se pueda mostrar en el frontend
        return categoria.findAll()
            .then(categoria => res.status(200).send(categoria))
            .catch(error => res.status(400).send(error))
    },
    find(req, res) {
        return categoria.findAll({
            where: {
                nombre: req.params.nombre
            }
        })
        .then(categoria => res.status(200).send(categoria))
        .catch(error => res.status(400).send(error))
    },
    delete(req, res){
        return categoria.destroy({
            where: {
                id:req.params.id
            }
        })
        .then(() => res.status(200).send({ message: "Dato eliminado correctamente" }))
        .catch(error => res.status(400).send(error))
    },
    update(req, res){
        return categoria.update(
            {
                nombre: req.body.nombre
            },
            {
                where: {
                    id: req.params.id
                }
            }
        )
        .then(() => res.status(200).send({ message: "Dato actualizado correctamente" }))
        .catch(error => res.status(400).send(error))
    }

};
