

// MODAL
const modal = document.querySelectorAll("#modal_alta_clientes");
const openModalButtons = document.querySelectorAll("#boton_clientes_alta");
const closeModalButtons = document.querySelectorAll("#close");

function openModal() {
  modal.forEach(function(modal) {
    modal.style.display = "block";
  });

  const tipoCliente = document.getElementById("tipo");
  const clienteApellido = document.getElementById("clientes_apellidos_ocultar");


  if (tipoCliente.value === "Empresa") {
    clienteApellido.style.display = "none";
  } else {
    clienteApellido.style.display = "block";
  }

  tipoCliente.addEventListener("change", () => {
    if (tipoCliente.value === "Empresa") {
      clienteApellido.style.display = "none";
    } else {
      clienteApellido.style.display = "block";
    }
  });
}

function closeModal() {
  modal.forEach(function(modal) {
    modal.style.display = "none";
  });
}

openModalButtons.forEach(function(element) {
  element.addEventListener("click", openModal);
});

closeModalButtons.forEach(function(element) {
  element.addEventListener("click", closeModal);
});



// MODAL EDIT
const modal_edit = document.querySelector("#modal_editar_clientes");
const openModalButtons_edit = document.querySelectorAll(".editar-icono");
const closeModalButton_edit = document.querySelectorAll("#close_edit");

function openModal_edit() {
  modal_edit.style.display = "block";


  const tipoCliente_edit = document.getElementById("tipo_edit");
  const clienteApellido_edit = document.getElementById("clientes_apellidos_ocultar_edit");


  if (tipoCliente_edit.value === "Empresa") {
    clienteApellido_edit.style.display = "none";
  } else {
    clienteApellido_edit.style.display = "block";
  }

  tipoCliente_edit.addEventListener("change", () => {
    if (tipoCliente_edit.value === "Empresa") {
      clienteApellido_edit.style.display = "none";
    } else {
      clienteApellido_edit.style.display = "block";
    }
  });
}

function closeModal_edit() {
  modal_edit.style.display = "none";
}
closeModalButton_edit.forEach(function (element) {
  element.addEventListener("click", closeModal_edit);
});

openModalButtons_edit.forEach(function (element) {
  element.addEventListener("click", openModal_edit);
});


// ALTA DE CLIENTES
const botonGuardarCliente = document.querySelectorAll("#boton_clientes_guardar");
botonGuardarCliente.forEach(function (element){
  element.addEventListener("click", () => {
  

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
  const clientesPoliticaPrivacidad = document.querySelectorAll(".clientes_politica_privacidad");

  // Validación de campos obligatorios y política de privacidad
  if (
    clientesTipo.value == "" ||
    clientesNombre.value == "" ||
    clientesIdFiscal.value == "" ||
    clienteDireccion.value == "" ||
    clientesCPostal.value == "" ||
    clientesLocalidad.value == "" ||
    clientesPais.value == "" ||
    clientesEmail.value == ""
  ) {
    swal({
        icon: "error",
        title: "Los campos marcados con * son obligatorios",
        text: "¡Completa los que te falten!",
        button: "OK",
      });
    return
  }

  let politicaPrivacidadMarcada = false;
  clientesPoliticaPrivacidad.forEach(politicaPrivacidad => {
    if (politicaPrivacidad.checked) {
      politicaPrivacidadMarcada = true;
    }
  });

  if (!politicaPrivacidadMarcada) {
    swal({
      icon: "error",
      title: "Debe aceptar la POLÍTICA DE PRIVACIDAD",
      text: "¡Hay que cumplir las normas!",
      button: "OK",
    });
    return;
  }

  // Realizar la solicitud HTTP POST al servidor
  const urlAlta = "http://localhost:3000/api/v1/alta_cliente";
  fetch(urlAlta, {
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


// LISTADO DE CLIENTES
const urlListado = "http://localhost:3000/api/v1/listado_clientes";
const listado_clientes = document.querySelector("#listado_clientes");

fetch(urlListado)
  .then((response) => response.json())
  .then((resultado) => mostrar(resultado))
  .catch((error) => console.error("Error al obtener los datos:", error));

const mostrar = (data) => {
  if (!Array.isArray(data) || data.length === 0) {
    console.error("Los datos recibidos no son válidos.");
    return;
  }

  let resultado = "";
  if (listado_clientes) {
    listado_clientes.innerHTML = resultado;
  } else {
    console.error("El elemento #listado_clientes no se encontró en el DOM.");
  }
  

  data.forEach((cliente) => {
    resultado += `
        <div class="row2">
            <div class="col col-5">${cliente.id_cliente}</div>
            <div class="col col-5">${cliente.Tipo_cliente}</div>
            <div class="col col-10">${cliente.Nombre}</div>
            <div class="col col-10">${cliente.Apellidos || ""}</div>
            <div class="col col-10">${cliente.Id_fiscal}</div>
            <div class="col col-20">${cliente.Direccion}</div>
            <div class="col col-5">${cliente.C_postal}</div>
            <div class="col col-10">${cliente.Localidad}</div>
            <div class="col col-5">${cliente.Pais}</div>
            <div class="col col-10">${cliente.Telefono}</div>
            <div class="col col-10">${cliente.Movil || ""}</div>
            <div class="col col-15">${cliente.Email || ""}</div>
            <div class="col col-5"><img src="../img/icons/editar.svg" class="editar-icono"></div>
            <div class="col col-5"><img src="../img/icons/eliminar.svg" class="eliminar-icono"></div>
        </div>`;
  });

  listado_clientes.innerHTML = resultado;
};

// ELIMINAR CLIENTE
const on = (element, event, selector, handler) => {
  element.addEventListener(event, (e) => {
    if (e.target.closest(selector)) {
      handler(e);
    }
  });
};

on(document, "click", ".eliminar-icono", (e) => {
  const fila = e.target.parentNode.parentNode;
  const id = fila.firstElementChild.innerHTML;

  swal({
    title: "¿Estás seguro de quieres eliminar este cliente?",
    text: "¡Esta acción no se puede deshacer!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
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


// EDITAR CLIENTE

let urlEditar = "http://localhost:3000/api/v1/editar_cliente/";


// Cuando se hace clic en el botón de editar cliente
on(document, "click", ".editar-icono", (e) => {
  
  const fila = e.target.parentNode.parentNode;
  const clienteId = fila.children[0].innerHTML; // Obtener el ID del cliente de la fila de la tabla
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

  // Asignar valores a los campos de entrada del modal myModal_edit
  document.getElementById("id_edit").value = clienteId;
  document.getElementById("tipo_edit").value = tipoCliente;
  document.getElementById("clientes_nombre_edit").value = nombre;
  document.getElementById("clientes_apellidos_edit").value = apellidos;
  document.getElementById("clientes_idFiscal_edit").value = id_fiscal;
  document.getElementById("clientes_direccion_edit").value = direccion;
  document.getElementById("clientes_c_postal_edit").value = c_postal;
  document.getElementById("clientes_localidad_edit").value = localidad;
  document.getElementById("clientes_pais_edit").value = pais;
  document.getElementById("clientes_telefono_edit").value = telefono;
  document.getElementById("clientes_movil_edit").value = movil;
  document.getElementById("clientes_email_edit").value = email;

  // Mostrar el modal myModal_edit
  openModal_edit();
});


// Manejar el envío del formulario de edición
const formEdit = document.querySelectorAll("#alta_clientes_edit");

formEdit.forEach(form => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Obtener el ID del cliente del campo oculto
    const clienteId = form.querySelector("#id_edit").value;

    // Obtener los valores del formulario de edición
    const tipoCliente = form.querySelector("#tipo_edit").value;
    const nombre = form.querySelector("#clientes_nombre_edit").value;
    const apellidos = form.querySelector("#clientes_apellidos_edit").value;
    const id_fiscal = form.querySelector("#clientes_idFiscal_edit").value;
    const direccion = form.querySelector("#clientes_direccion_edit").value;
    const c_postal = form.querySelector("#clientes_c_postal_edit").value;
    const localidad = form.querySelector("#clientes_localidad_edit").value;
    const pais = form.querySelector("#clientes_pais_edit").value;
    const telefono = form.querySelector("#clientes_telefono_edit").value;
    const movil = form.querySelector("#clientes_movil_edit").value;
    const email = form.querySelector("#clientes_email_edit").value;

    // Enviar la solicitud de edición al servidor
    fetch(urlEditar + clienteId, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tipo_cliente: tipoCliente,
        nombre: nombre,
        apellidos: apellidos,
        id_fiscal: id_fiscal,
        direccion: direccion,
        c_postal: c_postal,
        localidad: localidad,
        pais: pais,
        telefono: telefono,
        movil: movil,
        email: email
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Hubo un problema al editar el cliente. Por favor, inténtalo de nuevo más tarde.');
        }
        return response.json();
      })
      .then(response => {
        // Mostrar mensaje de éxito con SweetAlert
        swal("Cliente actualizado correctamente", "", "success");

        // Recargar la página después de un tiempo para dar tiempo a leer el mensaje
        setTimeout(() => {
          location.reload();
        }, 1500);
      })
      .catch(error => {
        // Mostrar mensaje de error con SweetAlert
        swal("Error", error.message, "error");
      });
  });
});




