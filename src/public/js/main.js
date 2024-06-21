const socket = io();

socket.on("products", (data) => {
    renderProducts(data);
});

const renderProducts = (data) => {
    const productsContainer = document.getElementById("productsContainer");
    productsContainer.innerHTML = "";

    data.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("card", "border", "rounded", "shadow-sm", "mb-3");

        card.innerHTML = `
            <div class="card-body d-flex flex-column">
                <h5 class="card-title mb-1">Título: ${item.title}</h5>
                <p class="card-text mb-0">Descripción: ${item.description.slice(0, 75)}...</p>
                <ul class="list-group list-group-flush mb-2">
                    <li class="list-group-item">
                        <i class="fas fa-dollar-sign text-muted me-2"></i> Precio: ${item.price}
                    </li>
                    <li class="list-group-item">
                        <i class="fas fa-barcode text-muted me-2"></i> Código: ${item.code}
                    </li>
                    <li class="list-group-item">
                        <i class="fas fa-circle text-muted me-2"></i> Estado: ${item.status ? 'Activo' : 'Inactivo'}
                    </li>
                    <li class="list-group-item">
                        <i class="fas fa-cubes text-muted me-2"></i> Stock: ${item.stock}
                    </li>
                    <li class="list-group-item">
                        <i class="fas fa-tag text-muted me-2"></i> Categoría: ${item.category}
                    </li>
                </ul>
                <div class="text-center mt-auto">
                    <button class="btn btn-danger btn-lg" onclick="deleteProduct('${item.id}')">Eliminar</button>
                </div>
            </div>
        `;

        productsContainer.appendChild(card);
    });
};
  

const deleteProduct = (id) => {
    socket.emit("deleteProduct", id);
};

document.getElementById("add-product-form").addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const product = {
        title: formData.get("title"),
        description: formData.get("description"),
        price: formData.get("price"),
        code: formData.get("code"),
        stock: formData.get("stock"),
        category: formData.get("category"),
        thumbnails: formData.get("thumbnails"),
        status: formData.get("status") === "true" ? true : false, 
    };

    socket.emit("addProduct", product);
    event.target.reset(); 
});
