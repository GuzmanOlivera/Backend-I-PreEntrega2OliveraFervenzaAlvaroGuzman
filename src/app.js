import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { engine } from "express-handlebars";

import ProductManager from "./managers/ProductManager.js";

import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";

const app = express();
const PORT = 8080;
const httpServer = createServer(app);

const io = new Server(httpServer);
const productManager = new ProductManager('./src/data/products.json');

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./src/public")); 
    
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);

app.set("socketio", io);

httpServer.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

io.on("connection", async (socket) => {
    console.log("Cliente conectado");

    socket.emit("products", await productManager.getProducts());

    socket.on("addProduct", async (productData) => {
        const { title, description, price, code, status, stock, category, thumbnails } = productData;
        await productManager.addProduct(title, description, price, code, status, stock, category, thumbnails);
        io.emit("products", await productManager.getProducts());
    });

    socket.on("deleteProduct", async (productId) => {
        await productManager.deleteProduct(productId);
        io.emit("products", await productManager.getProducts());
    });

    socket.on("disconnect", () => {
        console.log("Cliente desconectado");
    });
});


