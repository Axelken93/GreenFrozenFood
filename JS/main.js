function cargarProductos() {
    let productos = cargarProductosLS();
    let contenido = "";

    for (const producto of productos) {
        contenido += `<div class="col-md-3 mt-md-3 mt-sm-1">
        <div class="card bg-light">
        <a href="#" onclick="verProducto(${producto.id});"><img src="${producto.imagen}" class="card-img-top" alt="${producto.descripcion}" max-height="130"></a>
        <div class="card-body">
        <h5 class="card-title">${producto.nombre.toUpperCase()}</h5>
        <p class="lead">$ ${producto.precio}</p>
        <p class="card-text">${producto.peso} gr</p>
        <a href="#" class="btn btn-success" onclick="agregarAlCarrito(${producto.id});">Comprar</a>
        </div>
        </div>
        </div>`;
    }

    document.getElementById("contenido_producto").innerHTML = contenido;
}



cargarProductos();
actualizarBotonCarrito();
