let clientes = []; // Declarar la variable clientes en un ámbito global

// Función para buscar clientes por nombre
const searchClientes = (key) => {
  fetch(`http://localhost:3000/api/v1/listado_clientes?Nombre=${key}`)
    .then((res) => res.json())
    .then((data) => {
      if (Array.isArray(data)) {
        clientes = data; // Asignar los datos de los clientes a la variable clientes
        buildList();
      }
    })
    .catch(error => {
      console.error("Error al buscar clientes:", error);
    });
};

// Función para construir la lista de resultados
const buildList = () => {
  const input = document.getElementById("facturas_nombre");
  const autocompleteResults = document.getElementById("autocomplete-results");

  console.log("Clientes:", clientes);

  if (!clientes || clientes.length === 0) {
    autocompleteResults.innerHTML = "";
    return;
  }

  const key = input.value.toLowerCase();

  const filteredClientes = clientes.filter(cliente => {
    return cliente.Nombre.toLowerCase().startsWith(key);
  }).sort((a, b) => {
    // Ordenar alfabéticamente por el nombre
    if (a.Nombre < b.Nombre) return -1;
    if (a.Nombre > b.Nombre) return 1;
    return 0;
  });

  autocompleteResults.innerHTML = "";

  filteredClientes.slice(0, 10).forEach((cliente) => {
    autocompleteResults.innerHTML += `<li>${cliente.Nombre} ${cliente.Apellidos}</li>`;
  });
};

// Agregar evento al input para buscar clientes
const input = document.getElementById("facturas_nombre");
const autocompleteResults = document.getElementById("autocomplete-results");

input.addEventListener("keyup", (event) => {
  autocompleteResults.style.display = "block";
  const key = event.target.value;

  console.log(key);

  if (key.length > 0) {
    searchClientes(key);
  } else {
    buildList();
  }
});

// Agregar evento a los elementos de la lista de resultados para seleccionar un cliente
autocompleteResults.addEventListener("click", (e) => {
  if (e.target && e.target.nodeName == "LI") {
    const selectedName = e.target.innerHTML;
    const selectedCliente = clientes.find(cliente => `${cliente.Nombre} ${cliente.Apellidos}` === selectedName);
    
    // Rellenar los otros inputs con los datos del cliente seleccionado
    input.value = selectedCliente.Nombre;
    document.getElementById('id_cliente').value = selectedCliente.id_cliente;
    document.getElementById('facturas_nombre').value = selectedCliente.Nombre;
    document.getElementById('facturas_apellidos').value = selectedCliente.Apellidos;
    document.getElementById('facturas_direccion').value = selectedCliente.Direccion;
    document.getElementById('facturas_fiscal').value = selectedCliente.Id_fiscal;
    document.getElementById('facturas_direccion').value = selectedCliente.Direccion;
    document.getElementById('facturas_c_postal').value = selectedCliente.C_postal;
    document.getElementById('facturas_localidad').value = selectedCliente.Localidad;
    document.getElementById('facturas_pais').value = selectedCliente.Pais;

    // Ocultar la lista de resultados
    autocompleteResults.style.display = "none";
  }
});


function resetearCamposModal() {
  // Obtener referencias a los elementos del formulario dentro del modal
  const nombreInput = document.getElementById('facturas_nombre');
  const apellidosInput = document.getElementById('facturas_apellidos');
  const direccionInput = document.getElementById('facturas_direccion');
  const idFiscalInput = document.getElementById('facturas_fiscal');
  const cPostalInput = document.getElementById('facturas_c_postal');
  const localidadInput = document.getElementById('facturas_localidad');
  const paisInput = document.getElementById('facturas_pais');


  // Resetear el valor de cada campo del formulario a una cadena vacía
  nombreInput.value = '';
  apellidosInput.value = '';
  direccionInput.value = '';
  idFiscalInput.value = '';
  cPostalInput.value = '';
  localidadInput.value = '';
  paisInput.value = '';
}


// MODAL
const modal = document.querySelectorAll("#modal_alta_facturas");
const openModalButtons = document.querySelectorAll("#boton_facturas_alta");
const closeModalButtons = document.querySelectorAll("#close");

function openModal() {
  modal.forEach(function(modal) {
    modal.style.display = "block";
    resetearCamposModal();
  });
  const tipoCliente = document.getElementById("tipo");
  const clienteApellido = document.getElementById("facturas_apellidos_ocultar");


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
  resetearCamposModal();
});

closeModalButtons.forEach(function(element) {
  element.addEventListener("click", closeModal);
});



// MODAL EDIT
const modal_edit = document.querySelectorAll("#modal_alta_facturas_edit");
const openModalButtons_edit = document.querySelectorAll("#boton_facturas_alta_edit");
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





/* // ALTA DE FACTURAS
const BotonGuardarFactura = document.querySelectorAll("#boton_facturas_guardar");
BotonGuardarFactura.forEach(function (element) {
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
        const urlAlta = "http://localhost:3000/api/v1/alta_factura";
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
 */