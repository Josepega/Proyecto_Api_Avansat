// MODAL
const modal = document.querySelectorAll("#modal_alta_stock");
const openModalButtons = document.querySelectorAll("#boton_stock_alta");
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
const modal_edit = document.querySelectorAll("#modal_alta_stock_edit");
const openModalButtons_edit = document.querySelectorAll("#boton_stock_alta_edit");
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

// ALTA DE STOCK
const BotonGuardarStock = document.querySelectorAll("#boton_stock_guardar");
BotonGuardarStock.forEach(function (element) {
    element.addEventListener("click", () => {
        const iva = 0.21; // Porcentaje del IVA
        const stockCantidad = document.getElementById("stock_cantidad").value;
        const stockCodigo = document.getElementById("stock_codigo").value;
        const stockNombre = document.getElementById("stock_nombre").value;
        const stockPrecioCoste = parseFloat(document.getElementById("stock_precio_coste").value);
        const stockPrecioVenta = parseFloat(document.getElementById("stock_precio_venta").value);
        const stockPrecioCosteIva = stockPrecioCoste * (1 + iva);
        const stockPrecioVentaIva = stockPrecioVenta * (1 + iva);

        // Validación de campos obligatorios
        if (
            stockCantidad == "" ||
            stockCodigo == "" ||
            stockNombre == "" ||
            isNaN(stockPrecioCoste) ||
            isNaN(stockPrecioVenta)
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
        const urlAltaStock = "http://localhost:3000/api/v1/alta_stock";
        fetch(urlAltaStock, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                Codigo: stockCodigo,
                Cantidad: stockCantidad,               
                Nombre: stockNombre,
                Precio_coste: stockPrecioCoste,
                Precio_coste_iva: stockPrecioCosteIva,
                Precio_venta: stockPrecioVenta,
                Precio_venta_iva: stockPrecioVentaIva,
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error al agregar el stock");
                }
                return response.json();
            })
            .then((data) => {
                swal.fire({
                  title: "¡Stock añadido correctamente!",
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
                  title: "Error al agregar el stock",
                  text: "Por favor, intenta de nuevo.",
                  icon: "error",
                  iconColor: "#fa5807",
                  confirmButtonColor: "#055778",
                });
            });
    });
});


// LISTADO DE STOCK
const urlListado = "http://localhost:3000/api/v1/listado_stock";
const listado_stock = document.querySelector("#listado_stock");

fetch(urlListado)
  .then((response) => response.json())
  .then((resultado) => mostrar(resultado))
  .catch((error) => console.error("Error al obtener los datos:", error));

const mostrar = (data) => {
  if (!Array.isArray(data) || data.length === 0) {
    swal.fire({
      icon: "info",
      iconColor: "#0b7593",
      title: "No hay stock registrado",
      text: "Puedes crear stock en el boton AÑADIR",
      confirmButtonColor: "#055778",
    });
    return;
  }

  let resultado = "";
  if (listado_stock) {
    listado_stock.innerHTML = resultado;
  } else {
    console.error("El elemento #listado_stock no se encontró en el DOM.");
  }
  

  data.forEach((stock) => {
    resultado += `
        <div class="row2">
            <div class="col2 col-5">${stock.Id_stock}</div>
            <div class="col2 col-10">${stock.Codigo}</div>
            <div class="col2 col-5">${stock.Cantidad}</div>
            <div class="col2 col-30">${stock.Nombre}</div>
            <div class="col2 col-10">${stock.Precio_coste}</div>
            <div class="col2 col-10">${stock.Precio_coste_iva}</div>
            <div class="col2 col-10">${stock.Precio_venta}</div>
            <div class="col2 col-10">${stock.Precio_venta_iva}</div>
           
            <div class="col2 col-5"><img src="../img/icons/editar.svg" class="editar-icono"></div>
            <div class="col2 col-5"><img src="../img/icons/eliminar.svg" class="eliminar-icono"></div>
        </div>`;
  });

  listado_stock.innerHTML = resultado;
};

// ELIMINAR STOCK
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
    title: "¿Estás seguro de quieres eliminar este stock?",
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
      const urlDeleteStock = "http://localhost:3000/api/v1/borrar_stock/";
      fetch(urlDeleteStock + id, {
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
              title: "¡Stock eliminado!",
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
          swal.fire({
            title: "Error al eliminar el articulo", 
            icon: "error",
            confirmButtonColor: "#055778",
          });
        });
    } else {
      swal.fire({
        title: "¡Factura NO eliminada!",
        text: "Todo a salvo!.",
        icon: "info",
        iconColor: "#0b7593",
        confirmButtonColor: "#055778",
      });
    }
  });
});

// EDITAR STOCK

let urlEditar = "http://localhost:3000/api/v1/editar_stock/";


// Cuando se hace clic en el botón de editar cliente
on(document, "click", ".editar-icono", (e) => {
  
  const fila = e.target.parentNode.parentNode;
  const stockId= fila.children[0].innerHTML;// Obtener el ID del cliente de la fila de la tabla
  const stockCodigo = fila.children[1].innerHTML; 
  const stockCantidad = fila.children[2].innerHTML; 
  const stockNombre = fila.children[3].innerHTML; 
  const stockCoste = fila.children[4].innerHTML; 
  const stockCosteIva = fila.children[5].innerHTML; 
  const stockVenta = fila.children[6].innerHTML; 
  const stockVentaIva = fila.children[7].innerHTML; 


  // Asignar valores a los campos de entrada del modal myModal_edit
  document.getElementById("stock_id_edit").value = stockId;
  document.getElementById("stock_codigo_edit").value = stockCodigo;
  document.getElementById("stock_cantidad_edit").value = stockCantidad;
  document.getElementById("stock_nombre_edit").value = stockNombre;
  document.getElementById("stock_precio_coste_edit").value = stockCoste;
  document.getElementById("stock_precio_coste_iva_edit").value = stockCosteIva;
  document.getElementById("stock_precio_venta_edit").value = stockVenta;
  document.getElementById("stock_precio_venta_iva_edit").value = stockVentaIva;

 
  // Mostrar el modal myModal_edit
  openModal_edit();
});


// Manejar el envío del formulario de edición
const formEdit = document.querySelectorAll("#modal_alta_stock_edit");

formEdit.forEach(form => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Obtener los valores del formulario de edición
    let idStock = form.querySelector("#stock_id_edit").value;
    let cantidad = form.querySelector("#stock_cantidad_edit").value;
    let codigoId = form.querySelector("#stock_codigo_edit").value;
    let nombre = form.querySelector("#stock_nombre_edit").value;
    let coste = form.querySelector("#stock_precio_coste_edit").value;
    let costeIva = form.querySelector("#stock_precio_coste_iva_edit").value;
    let venta = form.querySelector("#stock_precio_venta_edit").value;
    let ventaIva = form.querySelector("#stock_precio_venta_iva_edit").value;

    costeIva = (coste * 1.21).toFixed(2);
    ventaIva = (venta * 1.21).toFixed(2);
   
    // Enviar la solicitud de edición al servidor
    fetch(urlEditar + idStock, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        codigo: codigoId,
        cantidad: cantidad,
        nombre: nombre,
        precio_coste: coste,
        precio_coste_iva: costeIva,
        precio_venta: venta,
        precio_venta_iva: ventaIva
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Hubo un problema al editar el stock. Por favor, inténtalo de nuevo más tarde.');
        }
        return response.json();
      })
      .then(response => {
        // Mostrar mensaje de éxito con SweetAlert
        swal.fire({
          title: "¡Stock editado!",
          text: "El stock ha sido editado satisfactoriamente.",
          icon: "success",
          iconColor: "#0b7593",
          confirmButtonColor: "#055778",
        });
        

        // Recargar la página después de un tiempo para dar tiempo a leer el mensaje
        setTimeout(() => {
          location.reload();
        }, 2000);
      })
      .catch(error => {
        // Mostrar mensaje de error con SweetAlert
        swal.fire("Error", error.message, "error");
      });
  });
});
