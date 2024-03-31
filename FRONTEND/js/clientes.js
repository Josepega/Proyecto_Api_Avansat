document.addEventListener("DOMContentLoaded", () => {
    const modal = document.querySelector(".myModal");
    const tipoCliente = document.querySelector("#tipo");
    const botonAltaClientes = document.querySelector("#boton_clientes_guardar");

    // Lógica para mostrar u ocultar formularios dependiendo del tipo de cliente
    if (tipoCliente.value === "empresa") {
        document.getElementById("cliente_empresa").style.display = "block";
        document.getElementById("cliente_persona").style.display = "none";
    } else {
        document.getElementById("cliente_empresa").style.display = "none";
        document.getElementById("cliente_persona").style.display = "block";
    }

    tipoCliente.addEventListener("change", () => {
        if (tipoCliente.value === "persona") {
            document.getElementById("cliente_empresa").style.display = "none";
            document.getElementById("cliente_persona").style.display = "block";
        } else if (tipoCliente.value === "empresa") {
            document.getElementById("cliente_empresa").style.display = "block";
            document.getElementById("cliente_persona").style.display = "none";
        }
    });

    // Event listener para el botón de alta de clientes
    botonAltaClientes.addEventListener("click", () => {
        const clientesTipo = document.getElementById("tipo");
        const clientesNombre = document.getElementById("clientes_nombre");
        const clientesApellidos = document.getElementById("clientes_apellidos");
        const clientesIdFiscal = document.getElementById("clientes_idFiscal");
        const clienteDireccion = document.getElementById("clientes_direccion");
        const clientesCPostal = document.getElementById("clientes_c_postal");
        const clientesLocalidad = document.getElementById("clientes_localidad");
        const clientesPais = document.getElementById("clientes_pais");
        const clientesTelefono = document.getElementById("clientes_telefono");
        const clientesMovil = document.getElementById("clientes_movil");
        const clientesEmail = document.getElementById("clientes_email");
        const clientesPoliticaPrivacidad = document.querySelector(".clientes_politica_privacidad");

        // Validación de campos obligatorios y política de privacidad
        if (
            clientesNombre.value.trim() === "" ||
            clientesApellidos.value.trim() === "" ||
            clientesIdFiscal.value.trim() === "" ||
            clienteDireccion.value.trim() === "" ||
            clientesCPostal.value.trim() === "" ||
            clientesLocalidad.value.trim() === "" ||
            clientesPais.value.trim() === "" ||
            clientesEmail.value.trim() === ""
        ) {
            swal({
                title: "Los campos marcados con * son obligatorios",
                text: "¡Completa los que te falten!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            });
            return;
        }

        if (!clientesPoliticaPrivacidad.checked) {
            swal({
                title: "Debe aceptar la POLÍTICA DE PRIVACIDAD",
                text: "Marca la casilla",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            });
            return;
        }

        // Realizar la solicitud HTTP POST al servidor
        const url = "http://localhost:3000/api/v1/alta_cliente";
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                tipo_cliente: clientesTipo.value,
                nombre: clientesNombre.value,
                apellidos: clientesApellidos.value,
                id_fiscal: clientesIdFiscal.value,
                direccion: clienteDireccion.value,
                c_postal: clientesCPostal.value,
                localidad: clientesLocalidad.value,
                pais: clientesPais.value,
                telefono: clientesTelefono.value,
                movil: clientesMovil.value,
                email: clientesEmail.value,
            }),
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Error al agregar el cliente");
            }
            return response.json();
        })
        .then((data) => {
            swal({
                title: "¡Cliente añadido correctamente!",
                text: "Recuerda que los datos son solo para uso de facturación.",
                icon: "success",
            });
            setTimeout(() => {
                location.reload();
            }, 3000);
        })
        .catch((error) => {
            swal("Error al agregar el cliente", error.message, "error");
        });
    });
});

// Lógica para mostrar el listado de clientes
const url = "http://localhost:3000/api/v1/listado_clientes";
const listado_clientes = document.querySelector('#listado_clientes');

fetch(url)
    .then(response => response.json())
    .then(resultado => mostrar(resultado))
    .catch(error => console.error('Error al obtener los datos:', error));

const mostrar = (data) => {
    if (!Array.isArray(data) || data.length === 0) {
        console.error('Los datos recibidos no son válidos.');
        return;
    }

    let resultado = '';

    data.forEach(cliente => {
        resultado += `
        <div class="row2">
            <div class="col col-5">${cliente.id_cliente}</div>
            <div class="col col-5">${cliente.Tipo_cliente}</div>
            <div class="col col-10">${cliente.Nombre}</div>
            <div class="col col-10">${cliente.Apellidos || ''}</div>
            <div class="col col-10">${cliente.Id_fiscal}</div>
            <div class="col col-20">${cliente.Direccion}</div>
            <div class="col col-5">${cliente.C_postal}</div>
            <div class="col col-10">${cliente.Localidad}</div>
            <div class="col col-5">${cliente.Pais}</div>
            <div class="col col-10">${cliente.Telefono}</div>
            <div class="col col-10">${cliente.Movil || ''}</div>
            <div class="col col-15">${cliente.Email || ''}</div>
            <div class="col col-3"><img src="../img/icons/editar.svg" class="editar-icono"></div>
            <div class="col col-3"><img src="../img/icons/eliminar.svg" class="eliminar-icono"></div>
        </div>`;
    });

    listado_clientes.innerHTML = resultado;
}

// Event listener para eliminar clientes
const on = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
        if (e.target.closest(selector)) {
            handler(e);
        }
    });
};

on(document, 'click', '.eliminar-icono', e => {
    const fila = e.target.parentNode.parentNode;
    const id = fila.firstElementChild.innerHTML;

    swal({
        title: "¿Estás seguro de quieres eliminar este cliente?",
        text: "¡Esta acción no se puede deshacer!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
    .then((willDelete) => {
        if (willDelete) {
            const url = "http://localhost:3000/api/v1/borrar_cliente/";
            fetch(url + id, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    Id_cliente: id,
                }),
            })
            .then((response) => {
                if (response.ok) {
                    swal({
                        title: "¡Cliente eliminado!",
                        text: "El cliente ha sido eliminado satisfactoriamente.",
                        icon: "success",
                    });
                    setTimeout(() => {
                        location.reload();
                    }, 3000);
                } else {
                    swal("Error al eliminar el cliente", {
                        icon: "error",
                    });
                }
            })
            .catch((error) => {
                swal("Error al eliminar el cliente", {
                    icon: "error",
                });
                console.error("Error:", error);
            });
        } else {
            swal({
                title: "¡Cliente NO eliminado!",
                text: "Todo a salvo!.",
                icon: "success",
            });
        }
    });
});

// Event listener para editar clientes
let idForm = 0;
on(document, 'click', '.editar-icono', e => {
    const fila = e.target.parentNode.parentNode;
    const id = fila.firstElementChild.innerHTML;
    idForm = fila.children[0].innerHTML;

    const tipoCliente = fila.children[1].innerHTML;
    const nombre = fila.children[2].innerHTML;
    const apellidos = fila.children[3].innerHTML;
    const id_fiscal = fila.children[4].innerHTML;
    const direccion = fila.children[5].innerHTML;
    const c_postal = fila.children[6].innerHTML;
    const localidad = fila.children[7].innerHTML;
    const pais = fila.children[8].innerHTML;
    const telefono = fila.children[9].innerHTML;
    const movil = fila.children[10].innerHTML;
    const email = fila.children[11].innerHTML;

    const tipoSelect = document.querySelector("#tipo");
    const clientes_nombre = document.querySelector("#clientes_nombre");
    const clientes_apellidos = document.querySelector("#clientes_apellidos");
    const clientes_idFiscal = document.querySelector("#clientes_idFiscal");
    const clientes_direccion = document.querySelector("#clientes_direccion");
    const clientes_c_postal = document.querySelector("#clientes_c_postal");
    const clientes_localidad = document.querySelector("#clientes_localidad");
    const clientes_pais = document.querySelector("#clientes_pais");
    const clientes_telefono = document.querySelector("#clientes_telefono");
    const clientes_movil = document.querySelector("#clientes_movil");
    const clientes_email = document.querySelector("#clientes_email");

    tipoSelect.value = tipoCliente;
    clientes_nombre.value = nombre;
    clientes_apellidos.value = apellidos;
    clientes_idFiscal.value = id_fiscal;
    clientes_direccion.value = direccion;
    clientes_c_postal.value = c_postal;
    clientes_localidad.value = localidad;
    clientes_pais.value = pais;
    clientes_telefono.value = telefono;
    clientes_movil.value = movil;
    clientes_email.value = email;

    modal.style.display = "block";

    const boton_cerrar = document.querySelector("#close");
    boton_cerrar.addEventListener("click", function () {
        modal.style.display = "none";
    });
});
