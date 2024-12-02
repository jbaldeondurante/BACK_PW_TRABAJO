import Pedido from "../models/pedido.js";
import Usuario from "../models/usuario.js";

// Obtener todos los pedidos
const findAll = async (req, res) => {
    try {
        const pedidos = await Pedido.findAll({
            include: {
                model: Usuario,
                attributes: ["id", "nombre", "apellido", "correo"]
            }
        });
        return res.status(200).json(pedidos);
    } catch (error) {
        console.error("Error al obtener los pedidos:", error);
        return res.status(500).json({ error: "Error al obtener los pedidos" });
    }
};

// Obtener un pedido por ID
const findOne = async (req, res) => {
    const { id } = req.params;

    try {
        const pedido = await Pedido.findOne({
            where: { id },
            include: {
                model: Usuario,
                attributes: ["id", "nombre", "apellido", "correo"]
            }
        });

        if (!pedido) {
            return res.status(404).json({ error: "Pedido no encontrado" });
        }

        return res.status(200).json(pedido);
    } catch (error) {
        console.error("Error al obtener el pedido:", error);
        return res.status(500).json({ error: "Error al obtener el pedido" });
    }
};

// Crear un nuevo pedido
const create = async (req, res) => {
    const { idUsuario, total, direccionEnvio, metodoPago } = req.body;

    try {
        const pedido = await Pedido.create({
            idUsuario,
            total,
            direccionEnvio,
            metodoPago
        });

        return res.status(201).json(pedido);
    } catch (error) {
        console.error("Error al crear el pedido:", error);
        return res.status(500).json({ error: "Error al crear el pedido" });
    }
};

// Actualizar un pedido existente
const update = async (req, res) => {
    const { id } = req.params;
    const { total, direccionEnvio, metodoPago, estado } = req.body;

    try {
        const pedido = await Pedido.findByPk(id);

        if (!pedido) {
            return res.status(404).json({ error: "Pedido no encontrado" });
        }

        pedido.total = total ?? pedido.total;
        pedido.direccionEnvio = direccionEnvio ?? pedido.direccionEnvio;
        pedido.metodoPago = metodoPago ?? pedido.metodoPago;
        pedido.estado = estado ?? pedido.estado;

        await pedido.save();

        return res.status(200).json(pedido);
    } catch (error) {
        console.error("Error al actualizar el pedido:", error);
        return res.status(500).json({ error: "Error al actualizar el pedido" });
    }
};

// Eliminar un pedido
const remove = async (req, res) => {
    const { id } = req.params;

    try {
        const pedido = await Pedido.findByPk(id);

        if (!pedido) {
            return res.status(404).json({ error: "Pedido no encontrado" });
        }

        await pedido.destroy();
        return res.status(200).json({ message: "Pedido eliminado correctamente" });
    } catch (error) {
        console.error("Error al eliminar el pedido:", error);
        return res.status(500).json({ error: "Error al eliminar el pedido" });
    }
};

// Exportar el controlador
const controller = { findAll, findOne, create, update, remove };

export default controller;
