require('dotenv').config();
const db = require('../models');

const tablasValidas = {
  usuarios: 'tbc_usuario',
  categorias: 'tbc_categoria',
  productos: 'tbb_producto',
  carritos: 'tbb_carrito',
  detalles: 'tbd_carrito_detalle',
};

async function main() {
  const opcion = (process.argv[2] || 'resumen').toLowerCase();

  try {
    await db.sequelize.authenticate();

    if (opcion === 'resumen') {
      const [usuarios, categorias, productos, carritos, detalles] = await Promise.all([
        db.tbc_usuario.count(),
        db.tbc_categoria.count(),
        db.tbb_producto.count(),
        db.tbb_carrito.count(),
        db.tbd_carrito_detalle.count(),
      ]);

      console.log('Conexion a MySQL correcta');
      console.log(`Base de datos: ${process.env.DB_NAME}`);
      console.log('');
      console.table([
        { tabla: 'tbc_usuario', registros: usuarios },
        { tabla: 'tbc_categoria', registros: categorias },
        { tabla: 'tbb_producto', registros: productos },
        { tabla: 'tbb_carrito', registros: carritos },
        { tabla: 'tbd_carrito_detalle', registros: detalles },
      ]);
      return;
    }

    const tabla = tablasValidas[opcion];
    if (!tabla) {
      console.error('Opcion no valida.');
      console.error('Usa una de estas: resumen, usuarios, categorias, productos, carritos, detalles');
      process.exit(1);
    }

    const [rows] = await db.sequelize.query(`SELECT * FROM ${tabla}`);
    console.log(`Mostrando registros de ${tabla}:`);
    console.table(rows);
  } catch (error) {
    console.error('No se pudo consultar la base de datos.');
    console.error(error.message);
    process.exit(1);
  } finally {
    await db.sequelize.close();
  }
}

main();
