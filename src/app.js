import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

// Importar rutas
import usuarioRouter from './routes/usuario.js';
import productoRouter from "./routes/producto.js";
import carritoRouter from "./routes/carrito.js";
import pedidoRouter from "./routes/pedido.js";
import carritoDetalleRouter from "./routes/carritoDetalle.js";
import pedidoDetalleRouter from "./routes/pedidoDetalle.js";

const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(cors());

// Ruta principal de prueba
app.get("/", (req, res) => {
    res.send("API de INAT Store está corriendo correctamente.");
});

// Rutas del sistema
app.use("/usuarios", usuarioRouter);
app.use("/productos", productoRouter);
app.use("/carrito", carritoRouter);
app.use("/pedido", pedidoRouter);
app.use("/carritoDetalle", carritoDetalleRouter);
app.use("/pedidoDetalle", pedidoDetalleRouter);

export default app;

