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
            swal({
                icon: "error",
                title: "Los campos marcados con * son obligatorios",
                text: "¡Completa los que te falten!",
                button: "OK",
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
                swal({
                    title: "¡Servicio añadido correctamente!",
                    icon: "success",
                });
                setTimeout(() => {
                    location.reload();
                }, 3000);
            })
            .catch((error) => {
                swal("Error al agregar el servicio", error.message, "error");
            });
    });
});


// LISTADO DE SERVICIOS
const urlListado = "http://localhost:3000/api/v1/listado_servicios";
const listado_servicios = document.querySelector("#listado_servicios");

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
  if (listado_servicios) {
    listado_servicios.innerHTML = resultado;
  } else {
    console.error("El elemento #listado_servicios no se encontró en el DOM.");
  }
  

  data.forEach((servicio) => {
    resultado += `
        <div class="row2">
            <div class="col col-10">${servicio.Id_servicio}</div>
            <div class="col col-10">${servicio.Codigo}</div>
            <div class="col col-30">${servicio.Nombre}</div>
            <div class="col col-10">${servicio.Precio_coste}</div>
            <div class="col col-10">${servicio.Precio_coste_iva}</div>
            <div class="col col-10">${servicio.Precio_venta}</div>
            <div class="col col-10">${servicio.Precio_venta_iva}</div>
           
            <div class="col col-5"><img src="../img/icons/editar.svg" class="editar-icono"></div>
            <div class="col col-5"><img src="../img/icons/eliminar.svg" class="eliminar-icono"></div>
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

  swal({
    title: "¿Estás seguro de quieres eliminar este servicio?",
    text: "¡Esta acción no se puede deshacer!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      const url = "http://localhost:3000/api/v1/borrar_servicio/";
      fetch(url + id, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          codigo: id,
        }),
      })
        .then((response) => {
          if (response.ok) {
            swal({
              title: "¡servicio eliminado!",
              text: "El artículo ha sido eliminado satisfactoriamente.",
              icon: "success",
            });
            setTimeout(() => {
              location.reload();
            }, 3000);
          } else {
            swal("Error al eliminar el articulo", {
              icon: "error",
            });
          }
        })
        .catch((error) => {
          swal("Error al eliminar el articulo", {
            icon: "error",
          });
          console.error("Error:", error);
        });
    } else {
      swal({
        title: "¡Articulo NO eliminado!",
        text: "Todo a salvo!.",
        icon: "success",
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
        swal("servicio actualizado correctamente", "", "success");

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
