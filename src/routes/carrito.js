import express from "express";
import controller from "../controllers/carrito.js";

const router = express.Router();

// Obtener todos los productos en el carrito de un usuario
router.get("/:idUsuario", controller.findAllByUser);

// Agregar un producto al carrito
router.post("/", controller.addToCart);

// Actualizar la cantidad de un producto en el carrito
router.put("/:id", controller.updateQuantity);

// Eliminar un producto del carrito
router.delete("/:id", controller.removeFromCart);

// Vaciar el carrito de un usuario
router.delete("/vaciar/:idUsuario", controller.clearCart);

export default router;
