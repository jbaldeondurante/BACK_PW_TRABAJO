import model from '../models/usuario.js';

let usuarios = [...model];
let counter = usuarios.length;

// Obtener todos los usuarios
const findAll = () => {
    return usuarios;
};

// Crear un nuevo usuario
const create = (usuario) => {
    usuario.id = ++counter;
    usuario.rol = usuario.rol || "cliente"; // Por defecto: cliente
    usuarios.push(usuario);
    return usuario;
};

// Obtener un usuario por ID
const findOne = (id) => {
    return usuarios.find(user => user.id == id);
};

// Actualizar un usuario existente
const update = (usuario) => {
    const index = usuarios.findIndex(item => item.id == usuario.id);
    if (index > -1) {
        usuarios[index] = usuario;
        return true;
    } else {
        return false;
    }
};

// Eliminar un usuario
const remove = (id) => {
    const index = usuarios.findIndex(item => item.id == id);
    if (index > -1) {
        usuarios.splice(index, 1);
        return true;
    } else {
        return false;
    }
};

const repository = { findAll, create, findOne, update, remove };
export default repository;
