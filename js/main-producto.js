function renderProducto() {
    let id = localStorage.getItem("detalle_producto");
    let producto = buscarProducto(id);
    let detalle_producto = document.getElementById("detalle_producto");
    let detalle_producto_seleccionado = document.createElement("div");
    detalle_producto_seleccionado.innerHTML=
    `<h1>${producto.nombre.toUpperCase()}:</h1>
    <div class="d-flex justify-content-between">
        <div>
            <img class="img-fluid" src="${producto.imagen}" alt="${producto.descripcion}">
        </div>

        <div class="card-body">
            <h5 class="card-title">${producto.nombre.toUpperCase()}</h5>
            <p class="lead">$ ${producto.precio}</p>
            <p class="card-text">${producto.peso} gr</p>
            <a href="#" class="btn btn-success" onclick="agregarAlCarrito(${producto.id});">Comprar</a>
        </div>
    </div>`;
    detalle_producto.appendChild(detalle_producto_seleccionado);
}



renderProducto();