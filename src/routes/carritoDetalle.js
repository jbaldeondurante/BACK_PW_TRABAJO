import express from "express";
import controller from "../controllers/carritoDetalle.js";

const router = express.Router();

// Obtener todos los detalles de un carrito específico
router.get("/:idCarrito", controller.findAllByCarrito);

// Agregar un producto al carrito
router.post("/", controller.addProduct);

// Actualizar la cantidad de un producto en el carrito
router.put("/:id", controller.updateQuantity);

// Eliminar un producto del carrito
router.delete("/:id", controller.removeProduct);

// Vaciar el carrito
router.delete("/vaciar/:idCarrito", controller.clearCarrito);

export default router;
