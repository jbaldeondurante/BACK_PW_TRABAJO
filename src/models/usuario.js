import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

const Usuario = sequelize.define("usuario", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    apellido: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    correo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    contraseña: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    rol: {
        type: DataTypes.ENUM("cliente", "administrador"),
        defaultValue: "cliente",
        allowNull: false,
    },
    fecha_registro: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
});

export default Usuario;
