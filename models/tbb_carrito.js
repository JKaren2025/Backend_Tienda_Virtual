'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class tbb_carrito extends Model {
    static associate(models) {
      tbb_carrito.belongsTo(models.tbc_usuario, {
        foreignKey: 'id_usuario',
        as: 'usuario'
      });

      tbb_carrito.hasMany(models.tbd_carrito_detalle, {
        foreignKey: 'id_carrito',
        as: 'detalles'
      });
    }
  }

  tbb_carrito.init({
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    estado: {
      type: DataTypes.ENUM('pendiente', 'pagado', 'cancelado'),
      defaultValue: 'pendiente',
      allowNull: false
    },
    fecha_creacion: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'tbb_carrito',
    tableName: 'tbb_carrito'
  });

  return tbb_carrito;
};
