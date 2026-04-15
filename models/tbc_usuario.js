'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class tbc_usuario extends Model {
    static associate(models) {
      tbc_usuario.hasMany(models.tbb_carrito, {
        as: 'carritos',
        foreignKey: 'id_usuario'
      });
    }
  }

  tbc_usuario.init({
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    direccion: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    telefono: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(120),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    rol: {
      type: DataTypes.ENUM('admin', 'cliente'),
      defaultValue: 'cliente',
      allowNull: false
    },
    fecha_registro: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'tbc_usuario',
    tableName: 'tbc_usuario'
  });

  return tbc_usuario;
};
