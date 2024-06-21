# SurtidoCompleto

This project is a web application for managing products and shopping carts in real-time, using Node.js, Express, Socket.IO, and Handlebars.

## Features

- Product management: add, update, delete, and list products.
- Cart management: create carts, add products to carts, and view cart details.
- Real-time product list updates using Socket.IO.
- Simple and clear user interface with Handlebars and Bootstrap.

# Endpoints

## Products

- `GET /api/products`: Get the list of products.
- `GET /api/products/:pid`: Get a product by its ID.
- `POST /api/products`: Add a new product.
- `PUT /api/products/:pid`: Update an existing product.
- `DELETE /api/products/:pid`: Delete a product.

## Carts

- `POST /api/carts`: Create a new cart.
- `GET /api/carts/:cid`: Get a cart by its ID.
- `POST /api/carts/:cid/product/:pid`: Add a product to the cart.

# Project Structure

- `src/app.js`: Main application and server configuration.
- `src/managers/ProductManager.js`: Product management logic.
- `src/managers/CartManager.js`: Cart management logic.
- `src/routes/products.router.js`: Routes for product management.
- `src/routes/carts.router.js`: Routes for cart management.
- `src/routes/views.router.js`: Routes for application views.
- `src/public/js/main.js`: Client-side logic for real-time interaction.
- `src/public/style.css`: Custom application styles.
- `src/views/layouts/main.handlebars`: Main layout for views.
- `src/views/home.handlebars`: Main view for the product list.
- `src/views/realTimeProducts.handlebars`: View for real-time product management.

### Notes

Ensure that the `products.json` and `carts.json` files exist in the data directory before starting the server. This API uses file-based persistence. The data is stored in JSON files, which serve as the database.