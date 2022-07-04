function calcularCostoEnvio (provincia) {
    if ((provincia === "San Luis") || (provincia === "San Juan") || (provincia === "La Rioja") || (provincia === "Mendoza")) {
        return 375;
    } else if ((provincia === "Entre Ríos") || (provincia === "Santa Fe") || (provincia === "Corrientes") || (provincia === "Misiones")) {
        return 220;
    } else if ((provincia === "La Pampa") || (provincia === "Córdoba") || (provincia === "Catamarca") || (provincia === "Santiago del Estero")) {
        return 270;
    } else if ((provincia === "Salta") || (provincia === "Tucumán") || (provincia === "Chaco") || (provincia === "Formosa") || (provincia === "Jujuy")) {
        return 580;
    } else if ((provincia === "Buenos Aires") || (provincia === "Ciudad Autónoma de Buenos Aires")) {
        return 122;
    } else {
        return 865;
    }
}

actualizarBotonCarrito();


const carrito = JSON.parse(localStorage.getItem("carrito"));
const datos_formulario = JSON.parse(localStorage.getItem("datos_formulario"));
const resumen_compra = document.getElementById("resumen_compra");
let total_pagar = 0;
let costo_envio = calcularCostoEnvio(datos_formulario.usuario_provincia);


let contenido = `<div class='col-md-1 p-3'></div>
<div class='col-md-4 bg-light p-3'>
<h3 class="text-success">Productos</h3>
<ul class="list-group list-group-flush bg-light">`;

for (let producto of carrito) {
    contenido += `<li class="list-group-item bg-light">${producto.nombre.toUpperCase()} - <b>$${producto.precio}</b></li>`;
    total_pagar += producto.precio;
}
let costo_total = costo_envio + total_pagar;
contenido += `</ul>
<p class='list-group-item list-group-item-secondary border border-secondary rounded-pill'>Subtotal: <b>$${total_pagar}</b></p>
<p class='list-group-item list-group-item-secondary border border-secondary rounded-pill'>Costo de Envio: <b>$${costo_envio}</b></p>
<p class='list-group-item list-group-item-success border border-success rounded-pill'>Total a Pagar: <b>$${costo_total}</b></p>
</div>
<div class='col-md-2 p-3'></div>`;

contenido += `<div class='col-md-4 bg-light p-3'>
<h3 class="text-success">Datos del Comprador</h3>
<ul class="list-group list-group-flush">
<li class="list-group-item bg-light">Nombre: <b>${datos_formulario.usuario_nombre}</b></li>
<li class="list-group-item bg-light">Email: <b>${datos_formulario.usuario_email}</b></li>
<li class="list-group-item bg-light">Teléfono: <b>${datos_formulario.usuario_telefono}</b></li>
<li class="list-group-item bg-light">Dirección: <b>${datos_formulario.usuario_direccion}</b></li>
<li class="list-group-item bg-light">Localidad: <b>${datos_formulario.usuario_localidad}</b></li>
<li class="list-group-item bg-light">Provincia: <b>${datos_formulario.usuario_provincia}</b></li>
</ul>
</div>
<div class='col-md-12 text-center p-5'>
<button id="botonConfirmacion" class='btn btn-success'>Finalizar Compra</button>
</div>`;
resumen_compra.innerHTML = contenido;


function confirmarCompra (){
    Swal.fire({
        title: 'Desea confirmar la compra?',
        text: "No podras revertir la operación!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#198754',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, confirmar!'
        }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
            'Compra realizada con éxito!',
            'En menos de 5 dias recibira los productos en su domicilio.',
            'success',         
            )
            eliminarCarrito();
        }
        })
}

document.getElementById("botonConfirmacion").addEventListener("click", confirmarCompra);



