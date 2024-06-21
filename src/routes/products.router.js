import { Router } from "express";
import ProductManager from "../managers/ProductManager.js";

const router = Router();
const productManager = new ProductManager('./src/data/products.json');

router.get("/", async (req, res) => {
    const limit = parseInt(req.query.limit);
    let products = await productManager.getProducts();
    if (limit) {
        products = products.slice(0, limit);
    }
    res.json(products);
});

router.get("/:pid", async (req, res) => {
    const product = await productManager.getProductById(req.params.pid);
    if (!product) {
        return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.json(product);
});

router.post("/", async (req, res) => {
    const { title, description, code, price, status = true, stock, category, thumbnails = [] } = req.body;
    if (!title || !description || !code || !price || !stock || !category) {
        return res.status(400).json({ error: "Todos los campos son obligatorios, excepto thumbnails" });
    }
    const newProduct = await productManager.addProduct(title, description, price, code, status, stock, category, thumbnails);
    res.status(201).json(newProduct);
});

router.put("/:pid", async (req, res) => {
    const updatedFields = req.body;
    const updatedProduct = await productManager.updateProduct(req.params.pid, updatedFields);
    if (!updatedProduct) {
        return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.json(updatedProduct);
});

router.delete("/:pid", async (req, res) => {
    const deletedProduct = await productManager.deleteProduct(req.params.pid);
    if (!deletedProduct) {
        return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.json(deletedProduct);
});

export default router;
