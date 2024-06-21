import fs from "fs/promises";

class CartManager {
    constructor(path) {
        this.path = path;
        this.carts = [];
        this.loadCartsFromFile();
    }

    async loadCartsFromFile() {
        try {
            const data = await fs.readFile(this.path, "utf-8");
            this.carts = JSON.parse(data);
        } catch (error) {
            this.carts = [];
        }
    }

    async saveCartsToFile() {
        await fs.writeFile(this.path, JSON.stringify(this.carts, null, 2));
    }

    async createCart() {
        const id = this.carts.length ? Math.max(this.carts.map(c => c.id)) + 1 : 1;
        const newCart = { id, products: [] };
        this.carts.push(newCart);
        await this.saveCartsToFile();
        return newCart;
    }

    async getCartById(id) {
        return this.carts.find(c => c.id === parseInt(id));
    }

    async addProductToCart(cid, pid) {
        const cart = this.carts.find(c => c.id === parseInt(cid));
        if (!cart) return null;
        const productIndex = cart.products.findIndex(p => p.product === pid);
        if (productIndex > -1) {
            cart.products[productIndex].quantity += 1;
        } else {
            cart.products.push({ product: pid, quantity: 1 });
        }
        await this.saveCartsToFile();
        return cart;
    }
}

export default CartManager;
