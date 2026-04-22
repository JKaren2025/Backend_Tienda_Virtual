const db = require('../models');
const { carritoIncludes, recalcularTotalCarrito } = require('../helpers/carrito');

const carrito = db.tbb_carrito;
const detalleCarrito = db.tbd_carrito_detalle;
const producto = db.tbb_producto;

const esAdmin = (req) => req.user?.rol === 'admin';

const obtenerCarritoConRelaciones = (id) => carrito.findByPk(id, {
    include: carritoIncludes(db)
});

module.exports = {
    async create(req, res) {
        try {
            const idUsuario = esAdmin(req)
                ? (req.body.id_usuario || req.user.id)
                : req.user.id;

            const nuevoCarrito = await carrito.create({
                id_usuario: idUsuario,
                total: esAdmin(req) ? (req.body.total || 0) : 0,
                estado: esAdmin(req) ? (req.body.estado || 'pendiente') : 'pendiente',
                fecha_creacion: esAdmin(req) ? (req.body.fecha_creacion || new Date()) : new Date()
            });

            const carritoCreado = await obtenerCarritoConRelaciones(nuevoCarrito.id);
            return res.status(201).send(carritoCreado);
        } catch (error) {
            return res.status(400).send(error);
        }
    },

    async list(req, res) {
        try {
            const where = esAdmin(req) ? {} : { id_usuario: req.user.id };
            const carritos = await carrito.findAll({
                where,
                include: carritoIncludes(db),
                order: [['id', 'DESC']]
            });

            return res.status(200).send(carritos);
        } catch (error) {
            return res.status(400).send(error);
        }
    },

    async find(req, res) {
        try {
            const carritoEncontrado = await obtenerCarritoConRelaciones(req.params.id);

            if (!carritoEncontrado) {
                return res.status(404).send({ mensaje: 'Carrito no encontrado' });
            }

            if (!esAdmin(req) && carritoEncontrado.id_usuario !== req.user.id) {
                return res.status(403).send({ mensaje: 'No tienes permisos para ver este carrito' });
            }

            return res.status(200).send(carritoEncontrado);
        } catch (error) {
            return res.status(400).send(error);
        }
    },

    async update(req, res) {
        try {
            const carritoEncontrado = await carrito.findByPk(req.params.id);

            if (!carritoEncontrado) {
                return res.status(404).send({ mensaje: 'Carrito no encontrado' });
            }

            if (!esAdmin(req) && carritoEncontrado.id_usuario !== req.user.id) {
                return res.status(403).send({ mensaje: 'No tienes permisos para actualizar este carrito' });
            }

            await carritoEncontrado.update({
                id_usuario: esAdmin(req)
                    ? (req.body.id_usuario || carritoEncontrado.id_usuario)
                    : carritoEncontrado.id_usuario,
                total: esAdmin(req)
                    ? (req.body.total ?? carritoEncontrado.total)
                    : carritoEncontrado.total,
                estado: req.body.estado || carritoEncontrado.estado,
                fecha_creacion: esAdmin(req)
                    ? (req.body.fecha_creacion || carritoEncontrado.fecha_creacion)
                    : carritoEncontrado.fecha_creacion
            });

            const carritoActualizado = await obtenerCarritoConRelaciones(carritoEncontrado.id);
            return res.status(200).send(carritoActualizado);
        } catch (error) {
            return res.status(400).send(error);
        }
    },

    async delete(req, res) {
        try {
            const carritoEncontrado = await carrito.findByPk(req.params.id);

            if (!carritoEncontrado) {
                return res.status(404).send({ mensaje: 'Carrito no encontrado' });
            }

            if (!esAdmin(req) && carritoEncontrado.id_usuario !== req.user.id) {
                return res.status(403).send({ mensaje: 'No tienes permisos para eliminar este carrito' });
            }

            await carritoEncontrado.destroy();
            return res.status(200).send({ mensaje: 'Datos eliminados correctamente' });
        } catch (error) {
            return res.status(400).send(error);
        }
    },

    async addProduct(req, res) {
        try {
            const idProducto = Number.parseInt(req.body.id_producto, 10);
            const cantidad = Math.max(1, Number.parseInt(req.body.cantidad, 10) || 1);
            const idUsuario = esAdmin(req)
                ? (req.body.id_usuario || req.user.id)
                : req.user.id;

            const productoEncontrado = await producto.findByPk(idProducto);

            if (!productoEncontrado) {
                return res.status(404).send({ mensaje: 'Producto no encontrado' });
            }

            let carritoPendiente = await carrito.findOne({
                where: {
                    id_usuario: idUsuario,
                    estado: 'pendiente'
                }
            });

            if (!carritoPendiente) {
                carritoPendiente = await carrito.create({
                    id_usuario: idUsuario,
                    total: 0,
                    estado: 'pendiente',
                    fecha_creacion: new Date()
                });
            }

            const detalleExistente = await detalleCarrito.findOne({
                where: {
                    id_carrito: carritoPendiente.id,
                    id_producto: productoEncontrado.id
                }
            });

            if (detalleExistente) {
                await detalleExistente.update({
                    cantidad: detalleExistente.cantidad + cantidad,
                    precio_unitario: productoEncontrado.precio
                });
            } else {
                await detalleCarrito.create({
                    id_carrito: carritoPendiente.id,
                    id_producto: productoEncontrado.id,
                    precio_unitario: productoEncontrado.precio,
                    cantidad
                });
            }

            const carritoActualizado = await recalcularTotalCarrito(db, carritoPendiente.id);
            return res.status(200).send(carritoActualizado);
        } catch (error) {
            return res.status(400).send(error);
        }
    }
};
