

// MODAL EDIT
const modal_edit = document.querySelectorAll("#modal_alta_servicios_edit");
const openModalButtons_edit = document.querySelectorAll("#boton_servicios_alta_edit");
const closeModalButtons_edit = document.querySelectorAll("#close_edit");

function openModal_edit() {
  modal_edit.forEach(function(modal_edit) {
    modal_edit.style.display = "block";
  });
}

function closeModal_edit() {
  modal_edit.forEach(function(modal_edit) {
    modal_edit.style.display = "none";
  });
}

openModalButtons_edit.forEach(function(element) {
  element.addEventListener("click", openModal_edit);
});

closeModalButtons_edit.forEach(function(element) {
  element.addEventListener("click", closeModal_edit);
});


openModalButtons_edit.forEach(function (element) {
  element.addEventListener("click", openModal_edit);
});


// LISTADO DE SERVICIOS
const urlListadoServicios = "https://app.avansat.cat/api/v1/listado_servicios";
const listado_servicios = document.querySelector("#listado_servicios");

fetch(urlListadoServicios)
  .then((response) => response.json())
  .then((resultado) => mostrar(resultado))
  .catch((error) => console.error("Error al obtener los datos:", error));

const mostrar = (data) => {
  if (!Array.isArray(data) || data.length === 0) {
    swal.fire({
      icon: "info",
      iconColor: "#0798c4",
      title: "No hay Servicios registrados",
      text: "Puedes crear servicios en el boton AÑADIR",
      confirmButtonColor: "#0798c4",
    });
    return;
  }

  let resultado = "";
  if (listado_servicios) {
    listado_servicios.innerHTML = resultado;
  } else {
    console.error("El elemento #listado_servicios no se encontró en el DOM.");
  }
  

  data.forEach((servicio) => {
    resultado += `
        <div class="row2">
            <div class="col2 col-10">${servicio.Id_servicio}</div>
            <div class="col2 col-10">${servicio.Codigo}</div>
            <div class="col2 col-30">${servicio.Nombre}</div>
            <div class="col2 col-10">${servicio.Precio_coste}</div>
            <div class="col2 col-10">${servicio.Precio_coste_iva}</div>
            <div class="col2 col-10">${servicio.Precio_venta}</div>
            <div class="col2 col-10">${servicio.Precio_venta_iva}</div>
           
            <div class="col2 col-5"><img src="../img/icons/editar.svg" class="editar-icono"></div>
            <div class="col2 col-5"><img src="../img/icons/eliminar.svg" class="eliminar-icono"></div>
        </div>`;
  });

  listado_servicios.innerHTML = resultado;
};

// ELIMINAR SERVICIO
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
    title: "¿Estás seguro de quieres eliminar este servicio?",
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
      const url = "https://app.avansat.cat/api/v1/borrar_servicio/";
      fetch(url + id, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          codigo: id,
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
              title: "¡servicio eliminado!",
              text: "El artículo ha sido eliminado satisfactoriamente.",
              icon: "success",
              iconColor: "#0798c4",
              confirmButtonColor: "#0798c4",
            });
            setTimeout(() => {
              location.reload();
            }, 3000);
         
        })
        .catch((error) => {
          swal.fire("Error al eliminar el servicio", {
            icon: "error",
            iconColor: "#e6381c",
            confirmButtonColor: "#0798c4",
          });
        });
    } else {
      swal.fire({
        title: "¡Articulo NO eliminado!",
        text: "Todo a salvo!.",
        icon: "info",
        iconColor: "#0798c4",
        confirmButtonColor: "#0798c4",
      });
    }
  });
});
// EDITAR SERVICIO
// Manejar el envío del formulario de edición
const urlEditar = "https://app.avansat.cat/api/v1/editar_servicio/";

// Cuando se hace clic en el botón de editar cliente
document.addEventListener("click", function(event) {
  if (event.target.classList.contains("editar-icono")) {
    const fila = event.target.parentNode.parentNode;
    const servicioId = fila.children[0].innerHTML;
    const serviciosCodigo = fila.children[1].innerHTML;
    const serviciosNombre = fila.children[2].innerHTML;
    const servicioCoste = fila.children[3].innerHTML;
    const servicioCosteIva = fila.children[4].innerHTML;
    const servicioVenta = fila.children[5].innerHTML;
    const servicioVentaIva = fila.children[6].innerHTML;

    // Asignar valores a los campos de entrada del modal myModal_edit
    document.getElementById("servicios_id_edit").value = servicioId;
    document.getElementById("servicios_codigo_edit").value = serviciosCodigo;
    document.getElementById("servicios_nombre_edit").value = serviciosNombre;
    document.getElementById("servicios_precio_coste_edit").value = servicioCoste;
    document.getElementById("servicios_precio_coste_iva_edit").value = servicioCosteIva;
    document.getElementById("servicios_precio_venta_edit").value = servicioVenta;
    document.getElementById("servicios_precio_venta_iva_edit").value = servicioVentaIva;

    // Mostrar el modal myModal_edit
    openModal_edit();
  }
});

// Manejar el envío del formulario de edición
const formEdit = document.querySelectorAll("#modal_alta_servicios_edit");

formEdit.forEach(form => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Obtener los valores del formulario de edición
    const idservicio = form.querySelector("#servicios_id_edit").value;
    const codigoId = form.querySelector("#servicios_codigo_edit").value;
    const nombre = form.querySelector("#servicios_nombre_edit").value;
    const coste = form.querySelector("#servicios_precio_coste_edit").value;
    const venta = form.querySelector("#servicios_precio_venta_edit").value;
   
    // Calcular el IVA para el precio de coste y el precio de venta (suponiendo un IVA del 21%)
    const costeIva = parseFloat(coste) * 1.21;
    const ventaIva = parseFloat(venta) * 1.21;

    // Enviar la solicitud de edición al servidor
    fetch(urlEditar + idservicio, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        codigo: codigoId,
        nombre: nombre,
        precio_coste: coste,
        precio_coste_iva: costeIva.toFixed(2),
        precio_venta: venta,
        precio_venta_iva: ventaIva.toFixed(2)
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Hubo un problema al editar el servicio. Por favor, inténtalo de nuevo más tarde.');
        }
        return response.json();
      })
      .then(response => {
        // Mostrar mensaje de éxito con SweetAlert
        swal.fire({
          title: "¡Servicio editado!",
          text: "El servicio ha sido editado satisfactoriamente.",
          icon: "success",
          iconColor: "#0798c4",
          confirmButtonColor: "#0798c4",
        });

        // Recargar la página después de un tiempo para dar tiempo a leer el mensaje
        setTimeout(() => {
          location.reload();
        }, 1500);
      })
      .catch(error => {
        // Mostrar mensaje de error con SweetAlert
        swal.fire("Error", error.message, "error");
      });
  });
});

