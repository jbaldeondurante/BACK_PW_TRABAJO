import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";
import Producto from "./producto.js";
import Usuario from "./usuario.js";

const Carrito = sequelize.define("carrito", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    }
});

// Relación: Un carrito pertenece a un usuario
Carrito.belongsTo(Usuario, {
    foreignKey: "idUsuario",
    allowNull: false
});

// Relación: Un carrito contiene productos
Carrito.belongsTo(Producto, {
    foreignKey: "idProducto",
    allowNull: false
});

export default Carrito;
