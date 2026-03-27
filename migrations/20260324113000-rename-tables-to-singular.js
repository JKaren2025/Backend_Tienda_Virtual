'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const sequelize = queryInterface.sequelize;
    const [tables] = await sequelize.query('SHOW TABLES');
    const tableNames = tables.map(row => Object.values(row)[0]);

    const hasTable = (name) => tableNames.includes(name);

    const dropForeignKeyIfExists = async (tableName, columnName) => {
      if (!hasTable(tableName)) {
        return;
      }

      const [constraints] = await sequelize.query(`
        SELECT CONSTRAINT_NAME
        FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
        WHERE TABLE_SCHEMA = DATABASE()
          AND TABLE_NAME = '${tableName}'
          AND COLUMN_NAME = '${columnName}'
          AND REFERENCED_TABLE_NAME IS NOT NULL
      `);

      for (const constraint of constraints) {
        await queryInterface.removeConstraint(tableName, constraint.CONSTRAINT_NAME);
      }
    };

    const addConstraintIfMissing = async (tableName, constraintName, options) => {
      if (!hasTable(tableName)) {
        return;
      }

      const [constraints] = await sequelize.query(`
        SELECT CONSTRAINT_NAME
        FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS
        WHERE TABLE_SCHEMA = DATABASE()
          AND TABLE_NAME = '${tableName}'
          AND CONSTRAINT_NAME = '${constraintName}'
      `);

      if (constraints.length === 0) {
        await queryInterface.addConstraint(tableName, options);
      }
    };

    await dropForeignKeyIfExists('tbd_carrito_detalle', 'id_carrito');
    await dropForeignKeyIfExists('tbd_carrito_detalle', 'id_producto');
    await dropForeignKeyIfExists('tbb_carritos', 'id_usuario');
    await dropForeignKeyIfExists('tbb_productos', 'id_categoria');

    if (hasTable('tbc_usuarios') && !hasTable('tbc_usuario')) {
      await queryInterface.renameTable('tbc_usuarios', 'tbc_usuario');
    }

    if (hasTable('tbc_categorias') && !hasTable('tbc_categoria')) {
      await queryInterface.renameTable('tbc_categorias', 'tbc_categoria');
    }

    if (hasTable('tbb_productos') && !hasTable('tbb_producto')) {
      await queryInterface.renameTable('tbb_productos', 'tbb_producto');
    }

    if (hasTable('tbb_carritos') && !hasTable('tbb_carrito')) {
      await queryInterface.renameTable('tbb_carritos', 'tbb_carrito');
    }

    await addConstraintIfMissing('tbb_producto', 'fk_tbb_producto_id_categoria', {
      fields: ['id_categoria'],
      type: 'foreign key',
      name: 'fk_tbb_producto_id_categoria',
      references: {
        table: 'tbc_categoria',
        field: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT'
    });

    await addConstraintIfMissing('tbb_carrito', 'fk_tbb_carrito_id_usuario', {
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

    await addConstraintIfMissing('tbd_carrito_detalle', 'fk_tbd_carrito_detalle_id_carrito', {
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

    await addConstraintIfMissing('tbd_carrito_detalle', 'fk_tbd_carrito_detalle_id_producto', {
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
    const sequelize = queryInterface.sequelize;
    const [tables] = await sequelize.query('SHOW TABLES');
    const tableNames = tables.map(row => Object.values(row)[0]);

    const hasTable = (name) => tableNames.includes(name);

    const removeIfExists = async (tableName, constraintName) => {
      if (!hasTable(tableName)) {
        return;
      }

      const [constraints] = await sequelize.query(`
        SELECT CONSTRAINT_NAME
        FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS
        WHERE TABLE_SCHEMA = DATABASE()
          AND TABLE_NAME = '${tableName}'
          AND CONSTRAINT_NAME = '${constraintName}'
      `);

      if (constraints.length > 0) {
        await queryInterface.removeConstraint(tableName, constraintName);
      }
    };

    await removeIfExists('tbd_carrito_detalle', 'fk_tbd_carrito_detalle_id_producto');
    await removeIfExists('tbd_carrito_detalle', 'fk_tbd_carrito_detalle_id_carrito');
    await removeIfExists('tbb_carrito', 'fk_tbb_carrito_id_usuario');
    await removeIfExists('tbb_producto', 'fk_tbb_producto_id_categoria');

    if (hasTable('tbb_carrito') && !hasTable('tbb_carritos')) {
      await queryInterface.renameTable('tbb_carrito', 'tbb_carritos');
    }

    if (hasTable('tbb_producto') && !hasTable('tbb_productos')) {
      await queryInterface.renameTable('tbb_producto', 'tbb_productos');
    }

    if (hasTable('tbc_categoria') && !hasTable('tbc_categorias')) {
      await queryInterface.renameTable('tbc_categoria', 'tbc_categorias');
    }

    if (hasTable('tbc_usuario') && !hasTable('tbc_usuarios')) {
      await queryInterface.renameTable('tbc_usuario', 'tbc_usuarios');
    }
  }
};
