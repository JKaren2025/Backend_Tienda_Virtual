'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.addConstraint('tbb_carrito', {
      fields: ['id_usuario'],
      type: 'foreign key',
      name: 'fk_tbb_carrito_id_usuario',
      references: {
        table: 'tbc_usuario',
        field: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT'
    });

    await queryInterface.addConstraint('tbd_carrito_detalle', {
      fields: ['id_carrito'],
      type: 'foreign key',
      name: 'fk_tbd_carrito_detalle_id_carrito',
      references: {
        table: 'tbb_carrito',
        field: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    await queryInterface.addConstraint('tbd_carrito_detalle', {
      fields: ['id_producto'],
      type: 'foreign key',
      name: 'fk_tbd_carrito_detalle_id_producto',
      references: {
        table: 'tbb_producto',
        field: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT'
    });
  },

  async down(queryInterface) {
    await queryInterface.removeConstraint('tbd_carrito_detalle', 'fk_tbd_carrito_detalle_id_producto');
    await queryInterface.removeConstraint('tbd_carrito_detalle', 'fk_tbd_carrito_detalle_id_carrito');
    await queryInterface.removeConstraint('tbb_carrito', 'fk_tbb_carrito_id_usuario');
  }
};
