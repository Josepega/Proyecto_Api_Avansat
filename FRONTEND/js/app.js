
// ALTA CLIENTES
const mensajes = document.querySelector("#clientes_mensajes");
const boton_alta_clientes = document.querySelector(".boton_clientes_guardar");

boton_alta_clientes.addEventListener("click", () => {

    const clientes_nombre = document.getElementById("clientes_nombre");
    const clientes_apellidos = document.getElementById("clientes_apellidos");
    const clientes_idFiscal = document.getElementById("clientes_idFiscal");
    const cliente_direccion = document.getElementById("clientes_direccion");
    const clientes_postal = document.getElementById("clientes_postal");
    const clientes_localidad = document.getElementById("clientes_localidad");
    const clientes_pais = document.getElementById("clientes_pais");
    const clientes_telefono = document.getElementById("clientes_telefono");
    const clientes_movil = document.getElementById("clientes_movil");
    const clientes_email = document.getElementById("clientes_email");
    const clientes_politica_privacidad = document.querySelector(".clientes_politica_privacidad");

    if (
        clientes_nombre.value == "" ||
        clientes_apellidos.value == "" ||
        clientes_idFiscal.value == "" ||
        cliente_direccion.value == "" ||
        clientes_postal.value == "" ||
        clientes_localidad.value == "" ||
        clientes_pais.value == "" ||
        clientes_telefono.value == 0 ||
        clientes_movil.value == 0 ||
        clientes_email.value == ""
    ) {
        alert("Campos vacios no permitidos");
        return
    }
    if (clientes_politica_privacidad.checked == false) {
        alert("Debes aceptar la politica de privacidad");
        return
        
    }
    const url = "http://localhost:3000/api/v1/alta_cliente";
    fetch(url, {    
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nombre: clientes_nombre.value,
            apellidos: clientes_apellidos.value,
            idFiscal: clientes_idFiscal.value,  
            direccion: cliente_direccion.value,
            postal: clientes_postal.value,
            localidad: clientes_localidad.value,
            pais: clientes_pais.value,
            telefono: clientes_telefono.value,
            movil: clientes_movil.value,
            email: clientes_email.value
        })
    })
    .then((res) => res.json())
    .then((mensajes) => {
alert ("Cliente añadido correctamente ");
      setTimeout(() => {
        // refresca página<i class="fc"></i>
        location.reload();
      }, 3000);
    })
    .catch((error) => (mensasjes.innerHTML = error));
    
});