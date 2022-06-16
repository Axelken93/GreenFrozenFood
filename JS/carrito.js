//Funcion para buscar un producto por su ID
function buscarProducto(id) {
    let productos = cargarProductosLS();

    return productos.find(x => x.id == id);
}

//Si existe el LS del carrito traemelo, sino creamelo
function cargarProductosCarrito() {
    if (localStorage.getItem("carrito")) {
        return JSON.parse(localStorage.getItem("carrito"));
    }

    return [];
}

//Me cargo el carrito en variable y busco que posicion del array esta:
function agregarAlCarrito(id) {
    let productos_carrito = cargarProductosCarrito();
    const posicion_carrito = productos_carrito.findIndex(elemento => elemento.id == id);
    //Si no esta en el array, lo pusheo. Caso contrario le sumo una unidad
    if (posicion_carrito === -1) {
        const producto = buscarProducto(id);
        producto.cantidad = 1;
        productos_carrito.push(producto);
    } else {
        productos_carrito[posicion_carrito].cantidad += 1;
    }    
    //Guardo en la LS la nueva composicion de mi carrito
    localStorage.setItem("carrito", JSON.stringify(productos_carrito));
    actualizarBotonCarrito();
}

//Elimino la LS carrito
function eliminarCarrito() {
    localStorage.removeItem("carrito");
    actualizarBotonCarrito();
    cargarProductosSeleccionados();
}

//Le cargo el carrito en variable y actualizo con la cantidad de productos la imagen del carrito
function actualizarBotonCarrito() {
    let productos_carrito = cargarProductosCarrito();
    let contenido = `<button type="button" class="bg-success position-relative border-0"><img src="img/icon/shopping_car.png" alt="Carrito" width="24" class="m-3"><span class="position-absolute top-50 start-55 translate-middle badge rounded-pill bg-danger">${productos_carrito.length}</span></button>`;
    document.getElementById("boton_carrito").innerHTML = contenido;
}

//Cargo el carrito en variable, busco el elemento y le agrego una unidad
function agregarProducto(id) {
    let productos_carrito = cargarProductosCarrito();
    const posicion_carrito = productos_carrito.findIndex(elemento => elemento.id == id);
    productos_carrito[posicion_carrito].cantidad += 1;
    localStorage.setItem("carrito", JSON.stringify(productos_carrito));
    actualizarBotonCarrito();
    cargarProductosSeleccionados();
}

//Cargo el carrito en variable, busco el elemento, y le quito 1. Si el producto pasa a tener 0 unidades lo elimino del carrito.
function eliminarProducto(id) {
    let productos_carrito = cargarProductosCarrito();
    const posicion_carrito = productos_carrito.findIndex(elemento => elemento.id == id);
    productos_carrito[posicion_carrito].cantidad -= 1;

    if (productos_carrito[posicion_carrito].cantidad == 0) {
        productos_carrito = productos_carrito.filter(x => x.id != id);
    }
    
    localStorage.setItem("carrito", JSON.stringify(productos_carrito));
    actualizarBotonCarrito();
    cargarProductosSeleccionados();
}

//Si existen productos seleccionados, me cargo el carrito en variable y...
function cargarProductosSeleccionados() {
    if (document.getElementById("productos_seleccionados")) {
        let productos = cargarProductosCarrito();
        let productos_seleccionados = document.getElementById("productos_seleccionados");
        let contenido = "";
        //Si no tiene ningun productos me sale msj de error. Caso contrario muestro el producto en pantalla por cada item
        if (productos.length == 0) {
            contenido = 
            `<div class = "bg-light m-2 p-3 text-center">
                <p class='p-1'>Aun no ha seleccionado ningun producto!</p>
                <a href="index.html" title="Volver al home"><button type="button" class="btn btn-success">Comenzar a comprar</button></a>
            </div>`
            productos_seleccionados.innerHTML = contenido;
        } else {
            let total_pagar = 0;
            let total_gramos = 0;
            contenido = `<table class="table table-hover">
            <tr class="table-success">
            <th>&nbsp;</th>
            <th class='text-start'>Nombre</th>
            <th class='text-center'>Cantidad</th>
            <th class='text-center'>Peso</th>
            <th class='text-center'>Precio</th>
            <th>&nbsp;</th>
            </tr>`;

            let boton_finalizar_compra = document.getElementById("boton_finalizar_compra");
            boton_finalizar_compra.innerHTML = `<a href="formulario.html" title="Continuar a datos de Envío"><button type="button" class="btn btn-success">Continuar a datos de Envío</button></a></div>`

            for (const producto of productos) {
                contenido += `<tr>
                <td><img src='${producto.imagen}' width='48' alt='${producto.nombre}' title='${producto.nombre}'></td>
                <td class='text-start'>${producto.cantidad} x ${producto.nombre.toUpperCase()}</td>
                <td class='text-center'><button class='btn btn-success' onclick='eliminarProducto(${producto.id});' title='Eliminar Producto'>-</button> <b>${producto.cantidad}</b> <button class='btn btn-success' onclick='agregarProducto(${producto.id});' title='Agregar Producto'>+</button></td>
                <td class='text-center'>${producto.peso * producto.cantidad} gr</td>
                <td class='text-center'><b>$${producto.precio * producto.cantidad}</b></td>
                <td class='text-end'><button class='btn btn-secondary' onclick='eliminarProducto(${producto.id});'><img src='img/icon/delete_white_24dp.png' alt='Eliminar' width='24'></button></td>
                </tr>`;
                total_gramos += producto.peso * producto.cantidad;
                total_pagar += producto.precio * producto.cantidad;
            }

            contenido += `<tr class="bg-success">
            <td>&nbsp;</td>
            <td colspan='2' class="text-white" >Total</td>
            <td class='text-center text-white'>${total_gramos} gr</td>
            <td class='text-center text-white'><b>$${total_pagar}</b></td>
            <td>&nbsp;</td>
            </tr>
            </table>`;
            productos_seleccionados.innerHTML = contenido;
        }
    }
}
