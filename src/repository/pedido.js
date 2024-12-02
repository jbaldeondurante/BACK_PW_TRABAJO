import model from '../models/pedido.js';

let pedidos = [...model];
let counter = pedidos.length;

const findAll = () => {
    return pedidos;
};

const create = (pedidoData) => {
    pedidoData.id = ++counter;
    pedidoData.fecha = new Date().toISOString().split('T')[0]; // Fecha actual
    pedidoData.estado = "Pendiente";
    pedidos.push(pedidoData);
    return pedidoData;
};

const findOne = (id) => {
    return pedidos.find(pedido => pedido.id == id);
};

const update = (pedidoData) => {
    const index = pedidos.findIndex(item => item.id == pedidoData.id);
    if (index > -1) {
        pedidos[index] = { ...pedidos[index], ...pedidoData };
        return pedidos[index];
    }
    return null;
};

const remove = (id) => {
    const index = pedidos.findIndex(item => item.id == id);
    if (index > -1) {
        return pedidos.splice(index, 1)[0];
    }
    return null;
};

const repository = { findAll, create, findOne, update, remove };
export default repository;
