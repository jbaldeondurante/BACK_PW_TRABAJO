import Producto from "../models/producto.js";
import RepositoryBase from "../repository/base.js";

// Instancia del repositorio base para el modelo Producto
const repository = new RepositoryBase(Producto);

// Obtener todos los productos
const findAll = async (req, res) => {
  try {
    const productos = await repository.findAll();
    return res.status(200).json(productos);
  } catch (error) {
    console.error("Error al obtener productos:", error);
    return res.status(500).json({ error: "Error al obtener productos" });
  }
};

// Crear un nuevo producto
const create = async (req, res) => {
  try {
    const producto = req.body;
    const productoCreado = await repository.create(producto);
    return res.status(201).json(productoCreado);
  } catch (error) {
    console.error("Error al crear producto:", error);
    return res.status(500).json({ error: "Error al crear producto" });
  }
};

// Obtener un producto por ID
const findOne = async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await repository.findOne(id);

    if (!producto) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    return res.status(200).json(producto);
  } catch (error) {
    console.error("Error al obtener producto:", error);
    return res.status(500).json({ error: "Error al obtener producto" });
  }
};

// Actualizar un producto
const update = async (req, res) => {
  try {
    const producto = req.body;

    const productoActualizado = await repository.update(producto);
    if (!productoActualizado) {
      return res.status(404).json({ error: "Producto no encontrado para actualizar" });
    }

    return res.status(200).json(productoActualizado);
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    return res.status(500).json({ error: "Error al actualizar producto" });
  }
};

// Eliminar un producto
const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const productoEliminado = await repository.remove(id);

    if (!productoEliminado) {
      return res.status(404).json({ error: "Producto no encontrado para eliminar" });
    }

    return res.status(200).json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    return res.status(500).json({ error: "Error al eliminar producto" });
  }
};

// Exporta el controlador
const controller = { findAll, create, findOne, update, remove };

export default controller;
