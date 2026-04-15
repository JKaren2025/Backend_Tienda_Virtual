'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class tbd_carrito_detalle extends Model {
    static associate(models) {
      tbd_carrito_detalle.belongsTo(models.tbb_carrito, {
        as: 'carrito',
        foreignKey: 'id_carrito'
      });

      tbd_carrito_detalle.belongsTo(models.tbb_producto, {
        as: 'producto',
        foreignKey: 'id_producto'
      });
    }
  }

  tbd_carrito_detalle.init({
    id_carrito: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_producto: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    precio_unitario: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'tbd_carrito_detalle',
    tableName: 'tbd_carrito_detalle'
  });

  return tbd_carrito_detalle;
};
