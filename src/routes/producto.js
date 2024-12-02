import express from "express";
import controller from "../controllers/producto.js";

const router = express.Router();

// Ruta para obtener todos los productos
router.get("/", controller.findAll);

// Ruta para obtener un producto por ID
router.get("/:id", controller.findOne);

// Ruta para crear un nuevo producto
router.post("/", controller.create);

// Ruta para actualizar un producto por ID
router.put("/", controller.update);

// Ruta para eliminar un producto por ID
router.delete("/:id", controller.remove);

export default router;
