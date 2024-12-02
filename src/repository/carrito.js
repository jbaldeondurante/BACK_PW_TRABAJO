import model from '../models/carrito.js';
import productoModel from '../models/producto.js';

let carritos = [...model];
let counter = carritos.length;

const findAll = () => {
    return carritos;
};

const findByUsuario = (usuarioId) => {
    return carritos.find(carrito => carrito.usuarioId == usuarioId);
};

const addProducto = (usuarioId, productoId, cantidad) => {
    const producto = productoModel.find(p => p.id === productoId);
    if (!producto) {
        throw new Error("Producto no encontrado.");
    }

    let carrito = findByUsuario(usuarioId);
    if (!carrito) {
        carrito = { id: ++counter, usuarioId, productos: [] };
        carritos.push(carrito);
    }

    const productoExistente = carrito.productos.find(p => p.productoId === productoId);
    if (productoExistente) {
        productoExistente.cantidad += cantidad;
    } else {
        carrito.productos.push({ productoId, cantidad });
    }

    return carrito;
};

const updateCantidad = (usuarioId, productoId, cantidad) => {
    const carrito = findByUsuario(usuarioId);
    if (!carrito) {
        throw new Error("Carrito no encontrado.");
    }

    const producto = carrito.productos.find(p => p.productoId === productoId);
    if (!producto) {
        throw new Error("Producto no encontrado en el carrito.");
    }

    if (cantidad === 0) {
        carrito.productos = carrito.productos.filter(p => p.productoId !== productoId);
    } else {
        producto.cantidad = cantidad;
    }

    return carrito;
};

const removeProducto = (usuarioId, productoId) => {
    const carrito = findByUsuario(usuarioId);
    if (!carrito) {
        throw new Error("Carrito no encontrado.");
    }

    carrito.productos = carrito.productos.filter(p => p.productoId !== productoId);
    return carrito;
};

const clearCarrito = (usuarioId) => {
    const carrito = findByUsuario(usuarioId);
    if (!carrito) {
        throw new Error("Carrito no encontrado.");
    }

    carrito.productos = [];
    return carrito;
};

const repository = { findAll, findByUsuario, addProducto, updateCantidad, removeProducto, clearCarrito };
export default repository;
