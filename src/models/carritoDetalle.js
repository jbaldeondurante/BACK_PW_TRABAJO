import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";
import Carrito from "./carrito.js";
import Producto from "./producto.js";

const CarritoDetalle = sequelize.define("carritoDetalle", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idCarrito: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Carrito,
            key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    },
    idProducto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Producto,
            key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    subtotal: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {
    tableName: "carritoDetalles", // Nombre explícito de la tabla
    timestamps: false // Opcional, si no necesitas createdAt y updatedAt
});

// Relación: Un CarritoDetalle pertenece a un Carrito
CarritoDetalle.belongsTo(Carrito, {
    foreignKey: "idCarrito",
    onDelete: "CASCADE"
});

// Relación: Un CarritoDetalle pertenece a un Producto
CarritoDetalle.belongsTo(Producto, {
    foreignKey: "idProducto",
    onDelete: "CASCADE"
});

export default CarritoDetalle;
