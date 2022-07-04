//Detalle de todos los productos
const productos = [
    {id:1, nombre:"arvejas", descripcion:"Arvejas 500g", peso:500, imagen:"img/arvejas.jpg", precio:479},
    {id:2, nombre:"brocoli", descripcion:"Brocoli 1kg", peso:1000, imagen:"img/brocoli.jpg", precio:909},
    {id:3, nombre:"cebolla", descripcion:"Cebolla picada 500g", peso:500, imagen:"img/cebolla.jpg", precio:409},
    {id:4, nombre:"espinaca", descripcion:"Espinaca 1kg", peso:1000, imagen:"img/espinaca.jpg", precio:679},
    {id:5, nombre:"papas crunch", descripcion:"Papas Crunch 700g", peso:700, imagen:"img/papas_crunch.jpeg", precio:309},
    {id:6, nombre:"papas noisettes", descripcion:"Papas Noisettes 500g", peso:500, imagen:"img/papas_noissettes.png", precio:289},
    {id:7, nombre:"papas rusticas", descripcion:"Papas Rusticas 700g", peso:700, imagen:"img/papas_rusticas.jpeg", precio:309},
    {id:8, nombre:"zanahorias", descripcion:"Zanahoria baby 500g", peso:500, imagen:"img/zanahorias.jpg", precio:399},
    {id:9, nombre:"zapallo", descripcion:"Zapallo en cubos 500g", peso:500, imagen:"img/zapallo.jpg", precio:329},
    {id:10, nombre:"frambuesa", descripcion:"Frambuesas bolsa 1k", peso:1000, imagen:"img/frambuesa.jpg", precio:2969}
]

//Funciones para operar los porductos
function guardarProductosLS(productos) {
    localStorage.setItem("productos", JSON.stringify(productos));
}

function cargarProductosLS() {
    return JSON.parse(localStorage.getItem("productos"));
}

function verProducto(id) {
    localStorage.setItem("detalle_producto", id);
    document.location = "detalle-producto.html";
}

guardarProductosLS(productos);

//Esta OK y funciona