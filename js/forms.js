function validarFormulario() {
    let nombre = document.getElementById("nombre").value;
    let email = document.getElementById("email").value;
    let telefono = document.getElementById("telefono").value;
    let direccion = document.getElementById("direccion").value;
    let localidad = document.getElementById("localidad").value;
    let provincia = document.getElementById("provincia").value;
    let resultado_form = document.getElementById("resultado_form");

    if (nombre.length == 0) {
        resultado_form.innerHTML = "<div class='p-3 mb-2 bg-danger text-white'>Ingrese un valor para el campo Nombre!</div>";
        return false;
    } else {
        resultado_form.innerHTML = "";
    }
    if (email.length == 0) {
        resultado_form.innerHTML = "<div class='p-3 mb-2 bg-danger text-white'>Ingrese un valor para el campo Email!</div>";
        return false;
    } else if (email.indexOf("@") == -1) {
        resultado_form.innerHTML = "<div class='p-3 mb-2 bg-danger text-white'>Ingrese correctamente el Email para el campo Email!</div>";
        return false;
    } else {
        resultado_form.innerHTML = "";
    }
    if ((telefono.length < 4)) {
        resultado_form.innerHTML = "<div class='p-3 mb-2 bg-danger text-white'>Ingrese correctamenteun valor para el campo Telefono! Debe tener 13 caracteres.</div>";
        return false;
    } else {
        resultado_form.innerHTML = "";
    }
    if (direccion.length == 0) {
        resultado_form.innerHTML = "<div class='p-3 mb-2 bg-danger text-white'>Ingrese un valor para el campo Dirección!</div>";
        return false;
    } else {
        resultado_form.innerHTML = "";
    }
    

    let datos_formulario = {usuario_nombre:nombre, usuario_email:email, usuario_telefono:telefono, usuario_direccion:direccion, usuario_localidad:localidad, usuario_provincia:provincia};
    localStorage.setItem("datos_formulario", JSON.stringify(datos_formulario));
    document.location = "confirmacion.html";
}

function buscarProvincia () {
    const apiProvincias = "https://apis.datos.gob.ar/georef/api/provincias";
    let nombreProvincias = [{id:-1, nombre: "SELECCIONAR PROVINCIA"}];
    const resumenProvincias = document.getElementById("resumenProvincias");
    let listaProvincias = `<datalist id="datalistOptions">`;

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch(apiProvincias, requestOptions)
    .then(response => response.json())
    .then((data) => {
    nombreProvincias.push(...data.provincias);

    for (let e of nombreProvincias) {
        listaProvincias += `<option id="${e.id}" value="${e.nombre}">`;
    }
    listaProvincias += `</datalist>`;
    resumenProvincias.innerHTML = listaProvincias
    })
    .catch(error => console.log('error', error));
}


buscarProvincia();

//Boton enviar
document.getElementById("boton_enviar").addEventListener("click", validarFormulario);


