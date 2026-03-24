'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class tbc_categoria extends Model {
    static associate(models) {
      tbc_categoria.hasMany(models.tbb_producto, {
        foreignKey: 'id_categoria',
        as: 'productos'
      });
    }
  }

  tbc_categoria.init({
    nombre: {
      type: DataTypes.STRING(150),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'tbc_categoria',
    tableName: 'tbc_categoria'
  });

  return tbc_categoria;
};
