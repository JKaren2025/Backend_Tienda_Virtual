'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class tbb_producto extends Model {
    static associate(models) {
      tbb_producto.belongsTo(models.tbc_categoria, {
        as: 'categoria',
        foreignKey: 'id_categoria'
      });

      tbb_producto.hasMany(models.tbd_carrito_detalle, {
        as: 'detalles_carrito',
        foreignKey: 'id_producto'
      });
    }
  }

  tbb_producto.init({
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    descripcion: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    precio: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    stock: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    id_categoria: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
    ,
    imagen: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'tbb_producto',
    tableName: 'tbb_producto'
  });

  return tbb_producto;
};
