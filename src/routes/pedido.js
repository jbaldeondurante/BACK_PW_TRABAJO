import express from "express";
import controller from "../controllers/pedido.js";

const router = express.Router();

// Obtener todos los pedidos
router.get("/", controller.findAll);

// Obtener un pedido por ID
router.get("/:id", controller.findOne);

// Crear un nuevo pedido
router.post("/", controller.create);

// Actualizar un pedido existente
router.put("/:id", controller.update);

// Eliminar un pedido por ID
router.delete("/:id", controller.remove);

export default router;
