const Sequelize = require('sequelize');
const categoria = require('../models/tbc_categoria');

module.exports = {//creanodo el controlador de categoria
    create(req, res) {
        return categoria
            .create({
                nombre: req.params.nombre
            })
            .then(categoria => res.status(200).send(categoria))
            .catch(error => res.status(400).send(error))
    },
    list(_, res) {//listando las categorias esto para que se pueda mostrar en el frontend
        return categoria.findAll()
            .then(categoria => res.status(200).send(categoria))
            .catch(error => res.status(400).send(error))
    },
    find(req, res){
        return categoria.findAll({
            where: {
                nombre: req.params.nombre
            }
        })
        .then(categoria => res.status(200).send(categoria))
        .catch(error => res.status(400).send(error))    
    }
};