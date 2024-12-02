import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";
import Usuario from "./usuario.js";

const Pedido = sequelize.define("pedido", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idUsuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Usuario, // Relación con la tabla usuarios
            key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    },
    total: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    direccionEnvio: {
        type: DataTypes.STRING,
        allowNull: false
    },
    metodoPago: {
        type: DataTypes.ENUM("tarjeta", "yape"),
        allowNull: false
    },
    estado: {
        type: DataTypes.ENUM("pendiente", "pagado", "enviado", "entregado"),
        allowNull: false,
        defaultValue: "pendiente"
    },
    fecha: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
});

// Relación: Un pedido pertenece a un usuario
Pedido.belongsTo(Usuario, {
    foreignKey: "idUsuario",
    allowNull: false
});

export default Pedido;
