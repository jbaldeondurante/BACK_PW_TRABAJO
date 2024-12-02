import express from "express";
import pedidoDetalleController from "../controllers/pedidoDetalle.js";

const router = express.Router();

router.get("/", pedidoDetalleController.findAll);
router.get("/:id", pedidoDetalleController.findOne);
router.post("/", pedidoDetalleController.create);
router.put("/:id", pedidoDetalleController.update); 
router.delete("/:id", pedidoDetalleController.remove);

export default router;
