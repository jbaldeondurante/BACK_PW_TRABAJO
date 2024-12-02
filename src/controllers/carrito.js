import Carrito from "../models/carrito.js";
import Producto from "../models/producto.js";
import Usuario from "../models/usuario.js";

// Obtener todos los productos del carrito de un usuario
const findAllByUser = async (req, res) => {
    const { idUsuario } = req.params;

    try {
        const carrito = await Carrito.findAll({
            where: { idUsuario },
            include: [
                {
                    model: Producto,
                    attributes: ["id", "nombre", "precioTotal", "imagenUrl", "tipo"]
                }
            ]
        });

        return res.status(200).json(carrito);
    } catch (error) {
        console.error("Error al obtener el carrito:", error);
        return res.status(500).json({ error: "Error al obtener el carrito" });
    }
};

// Agregar un producto al carrito
const addToCart = async (req, res) => {
    const { idUsuario, idProducto, cantidad } = req.body;

    try {
        // Verificar que el producto existe
        const producto = await Producto.findByPk(idProducto);

        if (!producto) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }

        // Buscar si ya existe en el carrito
        const existingItem = await Carrito.findOne({
            where: { idUsuario, idProducto }
        });

        if (existingItem) {
            // Si ya existe, actualizamos la cantidad
            existingItem.cantidad += cantidad || 1;
            await existingItem.save();

            return res.status(200).json(existingItem);
        } else {
            // Si no existe, lo agregamos al carrito
            const newItem = await Carrito.create({
                idUsuario,
                idProducto,
                cantidad: cantidad || 1
            });

            return res.status(201).json(newItem);
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
        const item = await Carrito.findByPk(id);

        if (!item) {
            return res.status(404).json({ error: "Producto en carrito no encontrado" });
        }

        item.cantidad = cantidad;
        await item.save();

        return res.status(200).json(item);
    } catch (error) {
        console.error("Error al actualizar la cantidad en el carrito:", error);
        return res.status(500).json({ error: "Error al actualizar la cantidad en el carrito" });
    }
};

// Eliminar un producto del carrito
const removeFromCart = async (req, res) => {
    const { id } = req.params;

    try {
        const item = await Carrito.findByPk(id);

        if (!item) {
            return res.status(404).json({ error: "Producto en carrito no encontrado" });
        }

        await item.destroy();
        return res.status(200).json({ message: "Producto eliminado del carrito" });
    } catch (error) {
        console.error("Error al eliminar producto del carrito:", error);
        return res.status(500).json({ error: "Error al eliminar producto del carrito" });
    }
};

// Vaciar el carrito de un usuario
const clearCart = async (req, res) => {
    const { idUsuario } = req.params;

    try {
        await Carrito.destroy({
            where: { idUsuario }
        });

        return res.status(200).json({ message: "Carrito vaciado correctamente" });
    } catch (error) {
        console.error("Error al vaciar el carrito:", error);
        return res.status(500).json({ error: "Error al vaciar el carrito" });
    }
};

// Exportar las funciones del controlador
const controller = {
    findAllByUser,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart
};

export default controller;
