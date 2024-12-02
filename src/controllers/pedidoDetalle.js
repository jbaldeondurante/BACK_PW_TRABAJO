import PedidoDetalle from "../models/pedidoDetalle.js";

const findAll = async (req, res) => {
    try {
        const detalles = await PedidoDetalle.findAll();
        return res.status(200).json(detalles);
    } catch (error) {
        console.error("Error al obtener los detalles del pedido:", error);
        return res.status(500).json({ message: "Error al obtener los detalles del pedido." });
    }
};

const findOne = async (req, res) => {
    try {
        const { id } = req.params;
        const detalle = await PedidoDetalle.findOne({ where: { id } });

        if (!detalle) {
            return res.status(404).json({ message: "Detalle del pedido no encontrado." });
        }

        return res.status(200).json(detalle);
    } catch (error) {
        console.error("Error al obtener el detalle del pedido:", error);
        return res.status(500).json({ message: "Error al obtener el detalle del pedido." });
    }
};

const create = async (req, res) => {
    try {
        const { idPedido, idProducto, cantidad, subtotal } = req.body;

        const nuevoDetalle = await PedidoDetalle.create({
            idPedido,
            idProducto,
            cantidad,
            subtotal,
        });

        return res.status(201).json(nuevoDetalle);
    } catch (error) {
        console.error("Error al crear el detalle del pedido:", error);
        return res.status(500).json({ message: "Error al crear el detalle del pedido." });
    }
};

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const { idPedido, idProducto, cantidad, subtotal } = req.body;

        const detalle = await PedidoDetalle.findOne({ where: { id } });

        if (!detalle) {
            return res.status(404).json({ message: "Detalle del pedido no encontrado." });
        }

        await detalle.update({ idPedido, idProducto, cantidad, subtotal });

        return res.status(200).json(detalle);
    } catch (error) {
        console.error("Error al actualizar el detalle del pedido:", error);
        return res.status(500).json({ message: "Error al actualizar el detalle del pedido." });
    }
};

const remove = async (req, res) => {
    try {
        const { id } = req.params;

        const detalle = await PedidoDetalle.findOne({ where: { id } });

        if (!detalle) {
            return res.status(404).json({ message: "Detalle del pedido no encontrado." });
        }

        await detalle.destroy();

        return res.status(200).json({ message: "Detalle del pedido eliminado correctamente." });
    } catch (error) {
        console.error("Error al eliminar el detalle del pedido:", error);
        return res.status(500).json({ message: "Error al eliminar el detalle del pedido." });
    }
};

const controller = {
    findAll,
    findOne,
    create,
    update,
    remove,
};

export default controller;
