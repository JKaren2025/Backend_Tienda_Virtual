const carritoIncludes = (db) => [
  {
    model: db.tbc_usuario,
    as: 'usuario',
    attributes: ['id', 'nombre', 'email', 'telefono', 'rol'],
  },
  {
    model: db.tbd_carrito_detalle,
    as: 'detalles',
    include: [
      {
        model: db.tbb_producto,
        as: 'producto',
        include: [
          {
            model: db.tbc_categoria,
            as: 'categoria',
          },
        ],
      },
    ],
  },
];

const recalcularTotalCarrito = async (db, carritoId) => {
  const carrito = await db.tbb_carrito.findByPk(carritoId);

  if (!carrito) {
    return null;
  }

  const detalles = await db.tbd_carrito_detalle.findAll({
    where: { id_carrito: carritoId },
  });

  const total = detalles.reduce((acumulado, detalle) => {
    return acumulado + Number(detalle.precio_unitario) * Number(detalle.cantidad);
  }, 0);

  await carrito.update({
    total: total.toFixed(2),
  });

  return db.tbb_carrito.findByPk(carritoId, {
    include: carritoIncludes(db),
  });
};

module.exports = {
  carritoIncludes,
  recalcularTotalCarrito,
};
