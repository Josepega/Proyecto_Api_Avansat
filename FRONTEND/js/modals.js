// -------------------------------------CLIENTES------------------------------------------

function manejarModalClientes() {
  // MODALClientes
  const modalClientes = document.querySelectorAll("#modal_alta_clientes");
  const openModalClientesButtons = document.querySelectorAll("#boton_clientes_alta");
  const closeModalClientesButtons = document.querySelectorAll("#close");

  function openModalClientes() {
    modalClientes.forEach(function(modalClientes) {
      modalClientes.style.display = "block";
    });

    const tipoCliente = document.getElementById("tipo");
    const clienteNombre = document.getElementById("clientes_nombre_ocultar");
    const clienteApellido = document.getElementById("clientes_apellidos_ocultar");
    const clienteNombreEmpresa = document.getElementById("clientes_nombreEmpresa_ocultar");

    if (tipoCliente.value === "Empresa") {
      clienteNombreEmpresa.style.display = "block";
      clienteNombre.style.display = "none";
      clienteApellido.style.display = "none";
    } else {
      clienteApellido.style.display = "block";
      clienteNombre.style.display = "block";
      clienteNombreEmpresa.style.display = "none";
    }

    tipoCliente.addEventListener("change", () => {
      if (tipoCliente.value === "Empresa") {
        clienteNombreEmpresa.style.display = "block";
        clienteNombre.style.display = "none";
        clienteApellido.style.display = "none";
      } else {
        clienteApellido.style.display = "block";
        clienteNombre.style.display = "block";
        clienteNombreEmpresa.style.display = "none";
      }
    });
  }

  function closeModalClientes() {
    modalClientes.forEach(function(modalClientes) {
      modalClientes.style.display = "none";
    });
  }

  openModalClientesButtons.forEach(function(element) {
    element.addEventListener("click", openModalClientes);
  });

  closeModalClientesButtons.forEach(function(element) {
    element.addEventListener("click", closeModalClientes);
  });

  // ALTA DE CLIENTES
  const botonGuardarCliente = document.querySelectorAll("#boton_clientes_guardar");
  botonGuardarCliente.forEach(function(element) {
    element.addEventListener("click", () => {
      const clientesTipo = document.getElementById("tipo");
      const clientesNombre = document.querySelector("#clientes_nombre");
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
    /*   if (
        clientesTipo.value == "" ||
        clientesNombre.value == "" ||
        clientesIdFiscal.value == "" ||
        clienteDireccion.value == "" ||
        clientesCPostal.value == "" ||
        clientesLocalidad.value == "" ||
        clientesPais.value == "" ||
        clientesEmail.value == ""
      ) {
        swal.fire({
          icon: "info",
          iconColor: "#e6381c",
          title: "Los campos marcados con * son obligatorios",
          text: "¡Completa los que te falten!",
          confirmButtonColor: "#0798c4",
        });
        return;
      }

      let politicaPrivacidadMarcada = false;
      clientesPoliticaPrivacidad.forEach(politicaPrivacidad => {
        if (politicaPrivacidad.checked) {
          politicaPrivacidadMarcada = true;
        }
      });

      if (!politicaPrivacidadMarcada) {
        swal.fire({
          icon: "info",
          iconColor: "#e6381c",
          title: "Debe aceptar la POLÍTICA DE PRIVACIDAD",
          text: "¡Hay que cumplir las normas!",
          confirmButtonColor: "#0798c4",
        });
        return;
      } */

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
          swal.fire({
            title: "¡Cliente añadido correctamente!",
            text: "Recuerda que los datos son solo para uso de facturación.",
            icon: "success",
            iconColor: "#0798c4",
            confirmButtonColor: "#0798c4",
          });
          setTimeout(() => {
            location.reload();
          }, 3000);
        })
        .catch((error) => {
          swal.fire({
            title: "Error al agregar el cliente",
            text: "Por favor, intenta de nuevo.",
            icon: "error",
            iconColor: "#e6381c",
            confirmButtonColor: "#0798c4",
          });
        });
    });
  });
}

// Esperar a que se cargue completamente el DOM
document.addEventListener("DOMContentLoaded", function() {
  manejarModalClientes();
});

 //-----------------------------------------STOCK-----------------------------------------
  function manejarModalStock() {
    const modalStock = document.querySelectorAll("#modal_alta_stock");
    const openModalStockButtons = document.querySelectorAll("#boton_stock_alta");
    const closeModalStockButtons = document.querySelectorAll("#close");
  
    function openModalStock() {
      modalStock.forEach(function(modalStock) {
        modalStock.style.display = "block";
      });
    }
  
    function closeModalStock() {
      modalStock.forEach(function(modalStock) {
        modalStock.style.display = "none";
      });
    }
  
    openModalStockButtons.forEach(function(element) {
      element.addEventListener("click", openModalStock);
    });
  
    closeModalStockButtons.forEach(function(element) {
      element.addEventListener("click", closeModalStock);
    });
  
    // ALTA DE STOCK
    const BotonGuardarStock = document.querySelectorAll("#boton_stock_guardar");
    BotonGuardarStock.forEach(function(element) {
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
            icon: "info",
            iconColor: "#e6381c",
            title: "Los campos marcados con * son obligatorios",
            text: "¡Completa los que te falten!",
            confirmButtonColor: "#0798c4",
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
              iconColor: "#0798c4",
              confirmButtonColor: "#0798c4",
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
              iconColor: "#e6381c",
              confirmButtonColor: "#0798c4",
            });
          });
      });
    });
  }
  
  //--------------------------------------------SERVICIOS--------------------------------------------
function manejarModalServicios() {
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
}



//-----------------------------------------FACTURAS-----------------------------------------  

// MODALFacturas
function manejarModalFacturas() {
const modalFacturas = document.querySelectorAll("#modal_alta_facturas");
const openModalFacturasButtons = document.querySelectorAll("#boton_facturas_alta");
const closeModalFacturasButtons = document.querySelectorAll("#close");

function openModalFacturas() {
  modalFacturas.forEach(function(modalFacturas) {
    modalFacturas.style.display = "block";
  });
}

function closeModalFacturas() {
  modalFacturas.forEach(function(modalFacturas) {
    modalFacturas.style.display = "none";
  });
}

openModalFacturasButtons.forEach(function(element) {
  element.addEventListener("click", openModalFacturas);
});

closeModalFacturasButtons.forEach(function(element) {
  element.addEventListener("click", closeModalFacturas);
});


let clientes = [];

// AUTO COMPLET CLIENTES
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
  const input = document.getElementById("facturas_nombre_cliente");
  const autocompleteResults = document.getElementById("autocomplete-results_clientes");

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
const inputClientes = document.getElementById("facturas_nombre_cliente");
const autocompleteResults = document.getElementById("autocomplete-results_clientes");

inputClientes.addEventListener("keyup", (event) => {
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
    inputClientes.value = selectedCliente.Nombre;
    document.getElementById('facturas_id_cliente').value = selectedCliente.Id_cliente;
    document.getElementById('facturas_nombre_cliente').value = selectedCliente.Nombre;
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

// Cerrar la lista de resultados al pulsar fuera de ella
window.addEventListener("click", (event) => {
  if (!autocompleteResults.contains(event.target)) {
    autocompleteResults.style.display = "none";
  }
});

// AUTOCOMPLET STOCK
// Declarar la variable stock en un ámbito global
let stock = [];

// Función para buscar stock por nombre
const searchStock = (key) => {
  fetch(`http://localhost:3000/api/v1/listado_stock?Nombre=${key}`)
    .then((res) => res.json())
    .then((data) => {
      if (Array.isArray(data)) {
        stock = data; // Asignar los datos de stock a la variable stock
        buildListStock();
      }
    })
    .catch(error => {
      console.error("Error al buscar stock:", error);
    });
};

// Función para construir la lista de resultados del autocompletado de stock
const buildListStock = () => {
  const inputStock = document.getElementById("facturas_descripcion_stock");
  const autocompleteResultsStock = document.getElementById("autocomplete-results_stock");

  if (!stock || stock.length === 0) {
    autocompleteResultsStock.innerHTML = "";
    return;
  }

  const key = inputStock.value.toLowerCase();

  const filteredStock = stock.filter(stock => {
    return stock.Nombre.toLowerCase().startsWith(key);
  }).sort((a, b) => {
    // Ordenar alfabéticamente por el nombre
    if (a.Nombre < b.Nombre) return -1;
    if (a.Nombre > b.Nombre) return 1;
    return 0;
  });

  autocompleteResultsStock.innerHTML = "";

  filteredStock.slice(0, 10).forEach((stock) => {
    autocompleteResultsStock.innerHTML += `<li>${stock.Nombre}</li>`;
  });
};

// Agregar evento al input para buscar stock
const inputStock = document.getElementById("facturas_descripcion_stock");
const autocompleteResultsStock = document.getElementById("autocomplete-results_stock");

inputStock.addEventListener("keyup", (event) => {
  autocompleteResultsStock.style.display = "block";
  const key = event.target.value;

  if (key.length > 0) {
    searchStock(key);
  } else {
    buildListStock();
  }
});

// Agregar evento a los elementos de la lista de resultados para seleccionar un stock
autocompleteResultsStock.addEventListener("click", (e) => {
  if (e.target && e.target.nodeName == "LI") {
    const selectedNameStock = e.target.innerHTML;
    const selectedStock = stock.find(stock => stock.Nombre === selectedNameStock);
    
    // Rellenar los inputs relacionados con el stock seleccionado
    document.getElementById('facturas_descripcion_stock').value = selectedStock.Nombre;
    document.getElementById('facturas_id_detalle_stock').value = selectedStock.Id_stock;
    document.getElementById('facturas_codigo').value = selectedStock.Codigo;
    document.getElementById('facturas_precio').value = parseFloat(selectedStock.Precio_coste).toFixed(2);

    // Ocultar la lista de resultados
    autocompleteResultsStock.style.display = "none";
  }
});


// Datos imputs clientes

const facturasTipo = document.getElementById("tipo");
const facturasId = document.getElementById("id_cliente");
const facturasNombre = document.getElementById("facturas_nombre");
const facturasApellido = document.getElementById("facturas_apellidos");
const facturasFiscal = document.getElementById("facturas_fiscal");
const facturasDireccion = document.getElementById("facturas_direccion");
const facturasCP = document.getElementById("facturas_c_postal");
const facturasLocalidad = document.getElementById("facturas_localidad");
const facturasPais = document.getElementById("facturas_pais");


  const tipoCliente = document.getElementById("tipo");
  const clienteApellidoOcultar = document.getElementById("facturas_apellidos_ocultar");
  const clienteNombreOcultar = document.getElementById("facturas_nombre_ocultar");
  const clienteNombreEmpresaOcular = document.getElementById("facturas_nombreEmpresa_ocultar");

  if (tipoCliente.value === "Empresa") {
    clienteNombreEmpresaOcular.style.display = "block";
    clienteApellidoOcultar.style.display = "none";
    clienteNombreOcultar.style.display = "none";
  } else {
    clienteApellidoOcultar.style.display = "block";
    clienteNombreOcultar.style.display = "block";
    clienteNombreEmpresaOcular.style.display = "none";
  }

  tipoCliente.addEventListener("change", () => {
    if (tipoCliente.value === "Empresa") {
      clienteNombreEmpresaOcular.style.display = "block";
      clienteApellidoOcultar.style.display = "none";
      clienteNombreOcultar.style.display = "none";
    } else {
      clienteNombreEmpresaOcular.style.display = "none";
      clienteApellidoOcultar.style.display = "block";
      clienteNombreOcultar.style.display = "block";
    }
  });

  // AÑADIR A LA FACTURA ITEMS

  var formFacturas = document.getElementById("alta_facturas");
  var facturasCantidad = document.getElementById("facturas_cantidad");
  var facturasCodigo = document.getElementById("facturas_codigo");
  var facturasStockCodigo = document.getElementById("facturas_id_detalle_stock");
  var facturasDescripcion = document.getElementById("facturas_descripcion");
  var facturasPrecio = parseFloat(document.getElementById("facturas_precio")).toFixed(2);
  var facturasImpuesto = document.getElementById("facturas_impuesto");
  var facturasTotal = parseFloat(document.getElementById("facturas_total")).toFixed(2);
  var facturasFecha = document.getElementById("facturas_alta");
  const fechaActual = new Date().toISOString().split('T')[0];
  facturasFecha.value = fechaActual;
  var facturasAdd = document.getElementById("facturas_add");
  var imagenAgregar = document.getElementById("icono-agregar");
  var guardarFacturas = document.getElementById("boton_facturas_guardar");
  
  // Inicializar las sumas totales
  let totalSum = 0;
  let baseImponibleSum = 0;
  
  const arregloDetalle = [];
  

  // Función para redibujar la tabla y recalcular los totales
  const redibujarTabla = () => {
    facturasAdd.innerHTML = "";
    let camposVacios = false; // Variable para rastrear si hay campos vacíos
  
    arregloDetalle.forEach((detalle, index) => {
      // Verificar si algún campo en el detalle está vacío
      if (
        detalle.cantidad === "" ||
        detalle.codigo === "" ||
        detalle.descripcion === "" ||
        detalle.precio === "" ||
        detalle.impuestos === ""
      ) {
        camposVacios = true; // Marcar que hay campos vacíos
        return; // Detener la ejecución si hay algún campo vacío
      }
  
      // Si todos los campos del detalle están llenos, procede con la creación de la fila
      let fila = document.createElement("div");
      fila.classList.add("row");
      fila.innerHTML = `<div class="col3 col-10">${detalle.cantidad}</div>
                        <div class="col3 col-15">${detalle.codigo}</div>
                        <div class="col3 col-40">${detalle.descripcion}</div>
                        <div class="col3 col-15">${detalle.precio}</div>
                        <div class="col3 col-15">${detalle.impuestos}</div>
                        <div class="col3 col-15">${detalle.precioIva.toFixed(2)}</div>                                         
                        <div class="col3 col-10"><img src="../img/icons/eliminar.svg" class="eliminar-icono_fila" data-index="${index}"></div>`;
      facturasAdd.appendChild(fila);
    });
  
    // Agregar el evento de clic al botón de eliminar para cada fila
    const eliminarBotones = document.querySelectorAll(".eliminar-icono_fila");
    eliminarBotones.forEach((eliminarBoton) => {
      eliminarBoton.addEventListener("click", (event) => {
        const index = event.target.dataset.index;
        eliminarFilaDetalle(index);
      });
    });
  
    // Si no hay campos vacíos, calcular los totales
    if (!camposVacios) {
      calcularTotales();
    }
  };
  
  // Función para calcular los totales
  const calcularTotales = () => {
    // Calcular la base imponible
    const baseImponibleSum = arregloDetalle.reduce((acc, curr) => acc + parseFloat(curr.precio), 0).toFixed(2);
  
    // Actualizar el campo de base imponible en el HTML
    document.getElementById("facturas_imponible").value = baseImponibleSum;
  
    // Calcular el total
// Calcular el total como la suma de los precios con impuesto de cada detalle de la factura
    const totalSum = arregloDetalle.reduce((acc, curr) => acc + parseFloat(curr.precioIva), 0).toFixed(2);
  
    // Actualizar el campo de total en el HTML
    document.getElementById("facturas_total").value = totalSum;
  };
  

// Función para eliminar la fila del detalle seleccionada
const eliminarFilaDetalle = (index) => {
  // Verificar si el índice está dentro del rango de arregloDetalle
  if (index >= 0 && index < arregloDetalle.length) {
    // Eliminar la fila del detalle en la posición index
    arregloDetalle.splice(index, 1);
    redibujarTabla(); // Llamar a redibujarTabla para recalcular los totales
    calcularTotales(); // Actualizar los totales después de eliminar la fila
  } else {
    swal.fire({
      icon: "error",
      iconColor: "#e6381c",
      title: "No se pudo eliminar la fila del detalle",
      text: "La fila del detalle especificada no existe",
      confirmButtonColor: "#0798c4",
    });
  }
};


// Función para verificar si algún campo está vacío
const camposVacios = () => {
  const cantidad = document.getElementById("facturas_cantidad").value.trim();
  const codigo = document.getElementById("facturas_codigo").value.trim();
  const descripcion = document.getElementById("facturas_descripcion_stock").value.trim();
  const precio = document.getElementById("facturas_precio").value.trim();
  const impuesto = document.getElementById("facturas_impuestos").value.trim();

  return cantidad === "" || codigo === "" || descripcion === "" || precio === "" || impuesto === "";
};

// Modificar la función para añadir una fila al detalle
imagenAgregar.addEventListener("click", () => {
  if (camposVacios()) {
    // Mostrar un mensaje de error o deshabilitar el botón "Añadir"
    swal.fire({
      icon: "info",
      iconColor: "#e6381c",
      title: "Campos vacíos",
      text: "Todos los campos son obligatorios",
      confirmButtonColor: "#0798c4",
    });
    return; // Detener la ejecución si hay campos vacíos
  }

  // Si no hay campos vacíos, proceder con la lógica actual de agregar la fila al detalle
  let facturasCantidadInput = document.getElementById("facturas_cantidad").value;
  if (!isNaN(facturasCantidadInput)) { // Verificar si el valor es un número
      let facturasCantidad = (facturasCantidadInput);
      let facturasCodigo = document.getElementById("facturas_codigo").value;
      let facturasCodigoStock = document.getElementById("facturas_id_detalle_stock").value;
      let facturasDescripcion = document.getElementById("facturas_descripcion_stock").value;
      let facturasPrecio = parseFloat(document.getElementById("facturas_precio").value.replace(',', '.')).toFixed(2);
      let facturasImpuesto = parseFloat(document.getElementById("facturas_impuestos").value.replace(',', '.')).toFixed(2);
      let facturasPrecioIva = facturasPrecio * (1 + facturasImpuesto / 100).toFixed(2);
      let facturasPrecioSubTotal = (facturasPrecio * facturasCantidad).toFixed(2);
      let facturasBaseImponible = facturasPrecioSubTotal / (1 + facturasImpuesto / 100).toFixed(2);

      let facturasTotaldeTotales = (facturasPrecioIva * facturasCantidad).toFixed(2);

      // Agregar el detalle a la factura
      const objetoDetalle = {
          cantidad: facturasCantidad,
          codigo: document.getElementById("facturas_codigo").value,
          id_stock: document.getElementById("facturas_id_detalle_stock").value,
          descripcion: document.getElementById("facturas_descripcion_stock").value,
          precio: facturasPrecio,
          impuestos: facturasImpuesto,
          precioIva: facturasPrecioIva,
      };
      arregloDetalle.push(objetoDetalle);
      redibujarTabla();

      // Actualizar los totales después de agregar el detalle
      calcularTotales();
  } else {
      swal.fire({
        title:"El valor de 'facturas_cantidad' no es un número válido.",
        icon: "info",
        iconColor: "#e6381c",
        confirmButtonColor: "#0798c4",

      });
  }
  autocomplete_servicios_reset();
});


  
  function autocomplete_servicios_reset() {
      const input = document.getElementById("facturas_descripcion_stock");
      const cantidad = document.getElementById("facturas_cantidad");
      const precio = document.getElementById("facturas_precio");
      const codigo = document.getElementById("facturas_codigo");
      const results = document.getElementById("autocomplete-results_stock");
  
      input.value = "";
      cantidad.value = "";
      precio.value = "";
      codigo.value = "";
      results.innerHTML = "";
  };
  //ALTA FACTURA
  const BotonGuardarFactura = document.querySelectorAll("#boton_facturas_guardar");
  BotonGuardarFactura.forEach(function (element) {
    element.addEventListener("click", () => {
        const facturasAlta = new Date().toISOString().split('T')[0];
        const facturasCliente = document.getElementById("facturas_id_cliente").value;
        const facturasAlbaran = document.getElementById("facturas_albaran").value;
        const facturasVencimiento = document.getElementById("facturas_vencimiento").value;
        const facturasEstado = document.getElementById("facturas_estado").value;
        const facturasPago = document.getElementById("facturas_tipo_pago").value;
        const facturasImponible = parseFloat(document.getElementById("facturas_imponible").value).toFixed(2);
        const facturasTotal = parseFloat(document.getElementById("facturas_total").value).toFixed(2);
        const facturasIdStock = document.getElementById("facturas_id_detalle_stock").value;
        const facturasCantidad = document.getElementById("facturas_cantidad").value;

        // Validación de campos obligatorios
        if (
            facturasCliente === "" ||
            facturasVencimiento === "" ||
            facturasEstado === "" ||
            isNaN(facturasTotal) ||
            isNaN(facturasImponible)
        ) {
            swal.fire({
                icon: "info",
                iconColor: "#e6381c",
                title: "Los campos marcados con * son obligatorios",
                text: "¡Completa los que te falten!",
                confirmButtonColor: "#0798c4",
            });
            return;
        }

        // Formar el detalle de la factura en formato JSON
        const detalleFactura = arregloDetalle.map(detalle => ({
          Id_factura: null, // Aquí se asignará el ID de la factura después de ser creada en el servidor
          Id_cliente: facturasCliente,
          Cantidad: detalle.cantidad,
          stock_Id_stock: detalle.id_stock,
          Codigo: detalle.codigo
      }));
      

        // Realizar la solicitud HTTP POST al servidor para agregar la factura
        const urlAltaFactura = "http://localhost:3000/api/v1/alta_factura"; // Cambiar la URL según la ruta en tu servidor
        fetch(urlAltaFactura, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                Fecha_alta: facturasAlta,
                Id_cliente: facturasCliente,
                Albaran: facturasAlbaran,
                Fecha_vencimiento: facturasVencimiento,
                Estado: facturasEstado,
                Forma_pago: facturasPago,
                Base_imponible: facturasImponible,
                Total: facturasTotal,
                detalleFactura: JSON.stringify(detalleFactura) // Convertir a cadena JSON
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error al agregar la factura");
                }
                return response.json();
            })
            .then((data) => {
                swal.fire({
                    title: "¡Factura añadida correctamente!",
                    icon: "success",
                    iconColor: "#0798c4",
                    confirmButtonColor: "#0798c4",
                });
                setTimeout(() => {
                    location.reload();
                }, 3000);
            })
            .catch((error) => {
                swal.fire({
                  icon: "error",
                  title: "Error al agregar la factura",
                  text: error.message,
                  iconColor: "#e6381c",
                  confirmButtonColor: "#0798c4",
              });
            });
    });
});
};
