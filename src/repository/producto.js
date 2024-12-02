import model from '../models/producto.js';

let productos = [...model];
let counter = productos.length;

const findAll = () => {
    return productos;
};

const create = (productoData) => {
    productoData.id = ++counter;
    productoData.pendientePorPagar = productoData.precioTotal - productoData.precioReserva;
    productoData.botonAccion = productoData.tipo === "stock" ? "Comprar vía WhatsApp" : "Reservar Ahora";
    productos.push(productoData);
    return productoData;
};

const findOne = (id) => {
    return productos.find(producto => producto.id == id);
};

const update = (productoData) => {
    const index = productos.findIndex(item => item.id == productoData.id);
    if (index > -1) {
        productoData.pendientePorPagar = productoData.precioTotal - productoData.precioReserva;
        productoData.botonAccion = productoData.tipo === "stock" ? "Comprar vía WhatsApp" : "Reservar Ahora";
        productos[index] = productoData;
        return productos[index];
    }
    return null;
};

const remove = (id) => {
    const index = productos.findIndex(item => item.id == id);
    if (index > -1) {
        return productos.splice(index, 1)[0];
    }
    return null;
};

const repository = { findAll, create, findOne, update, remove };
export default repository;
