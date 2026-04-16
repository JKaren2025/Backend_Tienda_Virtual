"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Añadir columna imagen a tbb_producto
    await queryInterface.addColumn('tbb_producto', 'imagen', {
      type: Sequelize.STRING(255),
      allowNull: true
    });

    // Remover columna imagen de tbc_usuario si existe
    const tableInfo = await queryInterface.describeTable('tbc_usuario');
    if (tableInfo.imagen) {
      await queryInterface.removeColumn('tbc_usuario', 'imagen');
    }
  },

  async down(queryInterface, Sequelize) {
    // En down, restaurar imagen en usuarios y remover en productos
    const prodInfo = await queryInterface.describeTable('tbb_producto');
    if (prodInfo.imagen) {
      await queryInterface.removeColumn('tbb_producto', 'imagen');
    }

    await queryInterface.addColumn('tbc_usuario', 'imagen', {
      type: Sequelize.STRING(255),
      allowNull: true
    });
  }
};
