import model from "../models/usuario.js"; // Importa el modelo de Usuario
import RepositoryBase from "../repository/base.js"; // Importa la base del repositorio

// Crea una instancia del repositorio para la tabla Usuario
const repository = new RepositoryBase(model);

// Controlador para obtener todos los usuarios
const findAll = async (req, res) => {
    try {
        const usuarios = await repository.findAll();
        return res.status(200).json(usuarios);
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        return res.status(500).json({ message: "Error al obtener usuarios." });
    }
};

// Controlador para crear un nuevo usuario
const create = async (req, res) => {
    try {
        const usuario = req.body; // Obtiene los datos del cuerpo de la solicitud
        const usuarioCreated = await repository.create(usuario); // Crea el usuario
        return res.status(201).json(usuarioCreated);
    } catch (error) {
        console.error("Error al crear usuario:", error);
        return res.status(500).json({ message: "Error al crear usuario." });
    }
};

// Controlador para obtener un usuario por ID
const findOne = async (req, res) => {
    try {
        const id = req.params.id; // Obtiene el ID de los parámetros de la URL
        const usuario = await repository.findOne(id); // Busca el usuario

        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado." });
        }

        return res.status(200).json(usuario);
    } catch (error) {
        console.error(`Error al obtener el usuario con ID ${id}:`, error);
        return res.status(500).json({ message: "Error al obtener el usuario." });
    }
};

// Controlador para actualizar un usuario existente
const update = async (req, res) => {
    try {
        const usuario = req.body; // Obtiene los datos actualizados del cuerpo de la solicitud
        const updatedUsuario = await repository.update(usuario); // Actualiza el usuario

        if (!updatedUsuario) {
            return res.status(404).json({ message: "Usuario no encontrado para actualizar." });
        }

        return res.status(200).json(updatedUsuario);
    } catch (error) {
        console.error("Error al actualizar usuario:", error);
        return res.status(500).json({ message: "Error al actualizar usuario." });
    }
};

// Controlador para eliminar un usuario por ID
const remove = async (req, res) => {
    try {
        const id = req.params.id; // Obtiene el ID de los parámetros de la URL
        const result = await repository.remove(id); // Elimina el usuario

        if (!result) {
            return res.status(404).json({ message: "Usuario no encontrado para eliminar." });
        }

        return res.status(200).json(result);
    } catch (error) {
        console.error(`Error al eliminar el usuario con ID ${id}:`, error);
        return res.status(500).json({ message: "Error al eliminar usuario." });
    }
};

// Exporta los controladores
const controller = { findAll, create, findOne, update, remove };

export default controller;
