import CarritoDetalle from "../models/carritoDetalle.js";
import Producto from "../models/producto.js";
import Carrito from "../models/carrito.js";

// Obtener todos los detalles de un carrito específico
const findAllByCarrito = async (req, res) => {
    const { idCarrito } = req.params;

    try {
        const detalles = await CarritoDetalle.findAll({
            where: { idCarrito },
            include: [
                {
                    model: Producto,
                    attributes: ["id", "nombre", "precioTotal", "imagenUrl"]
                }
            ]
        });

        return res.status(200).json(detalles);
    } catch (error) {
        console.error("Error al obtener los detalles del carrito:", error);
        return res.status(500).json({ error: "Error al obtener los detalles del carrito" });
    }
};

// Agregar un producto al carrito
const addProduct = async (req, res) => {
    const { idCarrito, idProducto, cantidad } = req.body;

    try {
        // Verificar si el producto existe
        const producto = await Producto.findByPk(idProducto);

        if (!producto) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }

        // Verificar si el producto ya está en el carrito
        const detalleExistente = await CarritoDetalle.findOne({
            where: { idCarrito, idProducto }
        });

        if (detalleExistente) {
            // Si ya existe, actualizar la cantidad y el subtotal
            detalleExistente.cantidad += cantidad || 1;
            detalleExistente.subtotal = detalleExistente.cantidad * producto.precioTotal;
            await detalleExistente.save();

            return res.status(200).json(detalleExistente);
        } else {
            // Crear un nuevo detalle
            const subtotal = cantidad * producto.precioTotal;
            const nuevoDetalle = await CarritoDetalle.create({
                idCarrito,
                idProducto,
                cantidad,
                subtotal
            });

            return res.status(201).json(nuevoDetalle);
        }
    } catch (error) {
        console.error("Error al agregar producto al carrito:", error);
        return res.status(500).json({ error: "Error al agregar producto al carrito" });
    }
};

// Actualizar la cantidad de un producto en el carrito
const updateQuantity = async (req, res) => {
    const { id } = req.params;
    const { cantidad } = req.body;

    try {
        const detalle = await CarritoDetalle.findByPk(id);

        if (!detalle) {
            return res.status(404).json({ error: "Detalle no encontrado" });
        }

        // Actualizar la cantidad y el subtotal
        detalle.cantidad = cantidad;
        const producto = await Producto.findByPk(detalle.idProducto);
        detalle.subtotal = cantidad * producto.precioTotal;

        await detalle.save();

        return res.status(200).json(detalle);
    } catch (error) {
        console.error("Error al actualizar el detalle del carrito:", error);
        return res.status(500).json({ error: "Error al actualizar el detalle del carrito" });
    }
};

// Eliminar un producto del carrito
const removeProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const detalle = await CarritoDetalle.findByPk(id);

        if (!detalle) {
            return res.status(404).json({ error: "Detalle no encontrado" });
        }

        await detalle.destroy();
        return res.status(200).json({ message: "Producto eliminado del carrito" });
    } catch (error) {
        console.error("Error al eliminar el detalle del carrito:", error);
        return res.status(500).json({ error: "Error al eliminar el detalle del carrito" });
    }
};

// Vaciar el carrito
const clearCarrito = async (req, res) => {
    const { idCarrito } = req.params;

    try {
        await CarritoDetalle.destroy({
            where: { idCarrito }
        });

        return res.status(200).json({ message: "Carrito vaciado correctamente" });
    } catch (error) {
        console.error("Error al vaciar el carrito:", error);
        return res.status(500).json({ error: "Error al vaciar el carrito" });
    }
};

// Exportar el controlador
const controller = {
    findAllByCarrito,
    addProduct,
    updateQuantity,
    removeProduct,
    clearCarrito
};

export default controller;
