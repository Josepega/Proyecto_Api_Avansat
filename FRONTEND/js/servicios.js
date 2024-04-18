// MODAL
const modal = document.querySelectorAll("#modal_alta_servicios");
const openModalButtons = document.querySelectorAll("#boton_servicios_alta");
const closeModalButtons = document.querySelectorAll("#close");

function openModal() {
  modal.forEach(function(modal) {
    modal.style.display = "block";
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

// ALTA DE SERVICIO
const BotonGuardarServicio = document.querySelectorAll("#boton_servicios_guardar");
BotonGuardarServicio.forEach(function (element) {
    element.addEventListener("click", () => {
        const iva = 0.21; // Porcentaje del IVA
        const serviciosCodigo = document.getElementById("servicios_codigo").value;
        const serviciosNombre = document.getElementById("servicios_nombre").value;
        const serviciosPrecioCoste = parseFloat(document.getElementById("servicios_precio_coste").value);
        const serviciosPrecioVenta = parseFloat(document.getElementById("servicios_precio_venta").value);
        const serviciosPrecioCosteIva = serviciosPrecioCoste * (1 + iva);
        const serviciosPrecioVentaIva = serviciosPrecioVenta * (1 + iva);

        // Validación de campos obligatorios
        if (
            serviciosCodigo == "" ||
            serviciosNombre == "" ||
            isNaN(serviciosPrecioCoste) ||
            isNaN(serviciosPrecioVenta)
        ) {
            swal.fire({
              icon: "error",
              iconColor: "#fa5807",
              title: "Los campos marcados con * son obligatorios",
              text: "¡Completa los que te falten!",
              confirmButtonColor: "#055778",
            });
            return;
        }

        // Realizar la solicitud HTTP POST al servidor
        const urlAlta = "http://localhost:3000/api/v1/alta_servicio";
        fetch(urlAlta, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                Codigo: serviciosCodigo,
                Nombre: serviciosNombre,
                Precio_coste: serviciosPrecioCoste,
                Precio_coste_iva: serviciosPrecioCosteIva,
                Precio_venta: serviciosPrecioVenta,
                Precio_venta_iva: serviciosPrecioVentaIva,
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error al agregar el servicio");
                }
                return response.json();
            })
            .then((data) => {
              swal.fire({
                title: "¡Servicio añadido correctamente!",
                icon: "success",
                iconColor: "#0b7593",
                confirmButtonColor: "#055778",
              });
                setTimeout(() => {
                    location.reload();
                }, 3000);
            })
            .catch((error) => {
              swal.fire({
                title: "Error al agregar el servicio",
                text: "Por favor, intenta de nuevo.",
                icon: "error",
                iconColor: "#fa5807",
                confirmButtonColor: "#055778",
              });
            });
    });
});


// LISTADO DE SERVICIOS
const urlListadoServicios = "http://localhost:3000/api/v1/listado_servicios";
const listado_servicios = document.querySelector("#listado_servicios");

fetch(urlListadoServicios)
  .then((response) => response.json())
  .then((resultado) => mostrar(resultado))
  .catch((error) => console.error("Error al obtener los datos:", error));

const mostrar = (data) => {
  if (!Array.isArray(data) || data.length === 0) {
    swal.fire({
      icon: "info",
      iconColor: "#0b7593",
      title: "No hay Servicios registrados",
      text: "Puedes crear servicios en el boton AÑADIR",
      confirmButtonColor: "#055778",
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
    confirmButtonColor: "#055778",
    cancelButtonColor: "#a0360f",
    iconColor: "#db3208",
    confirmButtonText: "Aceptar",
    cancelButtonText: "Cancelar",

  }).then((result) => {
    if (result.isConfirmed) {
      const url = "http://localhost:3000/api/v1/borrar_servicio/";
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
              iconColor: "#0b7593",
              confirmButtonColor: "#055778",
            });
            setTimeout(() => {
              location.reload();
            }, 3000);
         
        })
        .catch((error) => {
          swal.fire("Error al eliminar el servicio", {
            icon: "error",
            confirmButtonColor: "#055778",
          });
        });
    } else {
      swal.fire({
        title: "¡Articulo NO eliminado!",
        text: "Todo a salvo!.",
        icon: "info",
        iconColor: "#0b7593",
        confirmButtonColor: "#055778",
      });
    }
  });
});

// EDITAR servicio

let urlEditar = "http://localhost:3000/api/v1/editar_servicio/";


// Cuando se hace clic en el botón de editar cliente
on(document, "click", ".editar-icono", (e) => {
  
  const fila = e.target.parentNode.parentNode;
  const servicioId= fila.children[0].innerHTML;// Obtener el ID del cliente de la fila de la tabla
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
    const costeIva = form.querySelector("#servicios_precio_coste_iva_edit").value;
    const venta = form.querySelector("#servicios_precio_venta_edit").value;
    const ventaIva = form.querySelector("#servicios_precio_venta_iva_edit").value;
   
    // Enviar la solicitud de edición al servidor
    fetch(urlEditar + idservicio, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        codigo: codigoId,
        nombre: nombre,
        precio_coste: coste,
        precio_coste_iva: costeIva,
        precio_venta: venta,
        precio_venta_iva: ventaIva
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
          iconColor: "#0b7593",
          confirmButtonColor: "#055778",
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
