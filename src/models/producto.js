import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

const Producto = sequelize.define("producto", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    precioReserva: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    precioTotal: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    llegadaAprox: {
        type: DataTypes.DATE,
        allowNull: false
    },
    envioGratis: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    tipo: {
        type: DataTypes.ENUM("preventa", "stock"),
        allowNull: false
    },
    serie: {
        type: DataTypes.STRING,
        allowNull: true
    },
    categoria: {
        type: DataTypes.STRING,
        allowNull: false
    },
    especificaciones: {
        type: DataTypes.JSON,
        allowNull: true
    },
    etiquetas: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true
    },
    imagenUrl: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

export default Producto;
