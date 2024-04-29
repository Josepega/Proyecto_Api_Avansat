



// MODALClientes EDIT
const modalClientes_edit = document.querySelector("#modal_editar_clientes");
const openModalClientesButtons_edit = document.querySelectorAll(".editar-icono");
const closeModalClientesButton_edit = document.querySelectorAll("#close_edit");

function openModalClientes_edit() {
  modalClientes_edit.style.display = "block";


  const tipoCliente_edit = document.getElementById("tipo_edit");
  const clienteApellido_edit = document.getElementById("clientes_apellidos_ocultar_edit");
  const clienteNombre_edit = document.getElementById("clientes_nombre_ocultar_edit");
  const clienteNombreEmpresa_edit = document.getElementById("clientes_nombreEmpresa_ocultar_edit");



  if (tipoCliente_edit.value === "Empresa") {
    clienteNombreEmpresa_edit.style.display = "block";
    clienteNombre_edit.style.display = "none";
    clienteApellido_edit.style.display = "none";
  } else {
    clienteApellido_edit.style.display = "block";
    clienteNombre_edit.style.display = "block";
    clienteNombreEmpresa_edit.style.display = "none";
  }

  tipoCliente_edit.addEventListener("change", () => {
    if (tipoCliente_edit.value === "Empresa") {
      clienteNombreEmpresa_edit.style.display = "block";
      clienteNombre_edit.style.display = "none";
      clienteApellido_edit.style.display = "none";
    } else {
      clienteApellido_edit.style.display = "block";
      clienteNombre_edit.style.display = "block";
      clienteNombreEmpresa_edit.style.display = "none";
    }
  });
}

function closeModalClientes_edit() {
  modalClientes_edit.style.display = "none";
}
closeModalClientesButton_edit.forEach(function (element) {
  element.addEventListener("click", closeModalClientes_edit);
});

openModalClientesButtons_edit.forEach(function (element) {
  element.addEventListener("click", openModalClientes_edit);
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
    swal.fire({
      icon: "info",
      iconColor: "#0798c4",
      title: "No hay Clientes registrados",
      text: "Puedes crear clientes en el boton AÑADIR",
      confirmButtonColor: "#0798c4",
    });
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
            <div class="col2 col-10">${cliente.Id_cliente}</div>
            <div class="col2 col-10">${cliente.Tipo_cliente}</div>
            <div class="col2 col-10">${cliente.Nombre}</div>
            <div class="col2 col-10">${cliente.Apellidos || ""}</div>
            <div class="col2 col-10">${cliente.Id_fiscal}</div>
            <div class="col2 col-20">${cliente.Direccion}</div>
            <div class="col2 col-5">${cliente.C_postal}</div>
            <div class="col2 col-10">${cliente.Localidad}</div>
            <div class="col2 col-5">${cliente.Pais}</div>
            <div class="col2 col-10">${cliente.Telefono}</div>
            <div class="col2 col-10">${cliente.Movil || ""}</div>
            <div class="col2 col-15">${cliente.Email || ""}</div>
            <div class="col2 col-5"><img src="../img/icons/editar.svg" class="editar-icono"></div>
            <div class="col2 col-5"><img src="../img/icons/eliminar.svg" class="eliminar-icono"></div>
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

  swal.fire({
    title: "¿Estás seguro de quieres eliminar este cliente?",
    text: "¡Esta acción no se puede deshacer!",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#0798c4",
    cancelButtonColor: "#e6381c",
    iconColor: "#e6381c",
    confirmButtonText: "Aceptar",
    cancelButtonText: "Cancelar",
   
  }).then((result) => {
    if (result.isConfirmed) {
      const url = "http://localhost:3000/api/v1/borrar_cliente/";
      fetch(url + id, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Id_cliente: id,
        }),
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Hubo un problema al eliminar la factura.");
        }
        return response.json();
      })
        .then((result) => {
            swal.fire({
              title: "¡Cliente eliminado!",
              text: "El cliente ha sido eliminado satisfactoriamente.",
              icon: "success",
              iconColor: "#0798c4",
              confirmButtonColor: "#0798c4",
            });
            setTimeout(() => {
              location.reload();
            }, 3000);
            
          
        })
        .catch((error) => {
          swal.fire(
            {
            title:"Error al eliminar el cliente", 
            icon: "error",
            iconColor: "#e6381c",
            confirmButtonColor: "#0798c4",
          });
        });
    } else {
      swal.fire({
        icon: "info",
        title: "¡Cliente NO eliminado!",
        text: "Todo a salvo!.",
        iconColor: "#0798c4",
        confirmButtonColor: "#0798c4",

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

  // Asignar valores a los campos de entrada del modalClientes myModalClientes_edit
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

  // Mostrar el modalClientes myModalClientes_edit
  openModalClientes_edit();
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
        swal.fire({
          title: "¡Cliente editado!",
          text: "Cliente actualizado correctamente",
          icon: "success",
          iconColor: "#0798c4",
          confirmButtonColor: "#0798c4",
        });

        // Recargar la página después de un tiempo para dar tiempo a leer el mensaje
        setTimeout(() => {
          location.reload();
        }, 2000);
      })
      .catch(error => {
        // Mostrar mensaje de error con SweetAlert
        swal.fire({
           title: "Error al editar el cliente",
           text :error.message,
           icon: "error",
           iconColor: "#e6381c",
           confirmButtonColor: "#0798c4",
          });
      });
  });
});




