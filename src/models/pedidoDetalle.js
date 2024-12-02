import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";
import Pedido from "./pedido.js";
import Producto from "./producto.js";

const PedidoDetalle = sequelize.define("pedidoDetalle", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    idPedido: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Pedido,
            key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    },
    idProducto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Producto,
            key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
    subtotal: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
});

// Relación: Un PedidoDetalle pertenece a un Pedido
PedidoDetalle.belongsTo(Pedido, {
    foreignKey: "idPedido",
    onDelete: "CASCADE",
});

// Relación: Un PedidoDetalle pertenece a un Producto
PedidoDetalle.belongsTo(Producto, {
    foreignKey: "idProducto",
    onDelete: "CASCADE",
});

export default PedidoDetalle;
