// MODALFacturas
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



// MODALFacturas EDIT
const modalFacturas_edit = document.querySelectorAll("#modal_alta_facturas_edit");
const openModalFacturasButtons_edit = document.querySelectorAll("#boton_facturas_alta_edit");
const closeModalFacturasButtons_edit = document.querySelectorAll("#close_edit");

function openModalFacturas_edit() {
  modalFacturas_edit.forEach(function(modalFacturas_edit) {
    modalFacturas_edit.style.display = "block";
  });
}

function closeModalFacturas_edit() {
  modalFacturas_edit.forEach(function(modalFacturas_edit) {
    modalFacturas_edit.style.display = "none";
  });
}

openModalFacturasButtons_edit.forEach(function(element) {
  element.addEventListener("click", openModalFacturas_edit);
});

closeModalFacturasButtons_edit.forEach(function(element) {
  element.addEventListener("click", closeModalFacturas_edit);
});


openModalFacturasButtons_edit.forEach(function (element) {
  element.addEventListener("click", openModalFacturas_edit);
});


/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------ */
// Declarar la variable clientes en un ámbito global
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
    document.getElementById('facturas_precio').value = selectedStock.Precio_coste;

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
  var facturasPrecio = document.getElementById("facturas_precio");
  var facturasImpuesto = document.getElementById("facturas_impuesto");
  var facturasTotal = document.getElementById("facturas_total");
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
                      <div class="col3 col-15">${detalle.precioIva}</div>                                         
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
  const baseImponibleSum = arregloDetalle.reduce((acc, curr) => acc + (curr.precioIva * curr.cantidad * (curr.impuestos / 100)), 0);

  // Actualizar el campo de base imponible en el HTML
  document.getElementById("facturas_imponible").value = baseImponibleSum.toFixed(2);

  // Calcular el total
  const totalSum = arregloDetalle.reduce((acc, curr) => acc + curr.precioIva * curr.cantidad, 0);

  // Actualizar el campo de total en el HTML
  document.getElementById("facturas_total").value = totalSum.toFixed(2);
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
      iconColor: "#0798c4",
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
      icon: "error",
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
      let facturasPrecio = parseFloat(document.getElementById("facturas_precio").value.replace(',', '.'));
      let facturasImpuesto = parseFloat(document.getElementById("facturas_impuestos").value.replace(',', '.'));
      let facturasPrecioIva = facturasPrecio * (1 + facturasImpuesto / 100);
      let facturasPrecioSubTotal = facturasPrecio * facturasCantidad;
      let facturasBaseImponible = facturasPrecioSubTotal / (1 + facturasImpuesto / 100);

      let facturasTotaldeTotales = facturasPrecioIva * facturasCantidad;

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
      swal.fire("El valor de 'facturas_cantidad' no es un número válido.");
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
        const facturasImponible = parseFloat(document.getElementById("facturas_imponible").value);
        const facturasTotal = parseFloat(document.getElementById("facturas_total").value);
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
                icon: "error",
                title: "Los campos marcados con * son obligatorios",
                text: "¡Completa los que te falten!",
                button: "OK",
            });
            return;
        }

        // Formar el detalle de la factura en formato JSON
        const detalleFactura = [{
          Id_factura: null, // Aquí se asignará el ID de la factura después de ser creada en el servidor
          Id_cliente: facturasCliente,
          Cantidad: facturasCantidad,
          stock_Id_stock: facturasIdStock
      }];

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
                });
                setTimeout(() => {
                    location.reload();
                }, 3000);
            })
            .catch((error) => {
                swal.fire("Error al agregar la factura", error.message, "error");
            });
    });
});


  
// LISTADO DE FACTURAS

const urlListadoFacturas = "http://localhost:3000/api/v1/listado_facturas";
const listado_facturas = document.querySelector("#listado_facturas");

fetch(urlListadoFacturas)
  .then((response) => response.json())
  .then((resultado) => mostrar(resultado))
  .catch((error) => console.error("Error al obtener los datos:", error));

const mostrar = (data) => {
  if (!Array.isArray(data) || data.length === 0) {
    swal.fire({
      icon: "info",
      iconColor: "#0798c4",
      title: "No hay facturas registradas",
      text: "Puedes crear una en el boton AÑADIR",
      confirmButtonColor: "#0798c4",
    });
    return;
  }

  let resultado = "";
  if (listado_facturas) {
    listado_facturas.innerHTML = resultado;
  } else {
    console.error("El elemento #listado_facturas no se encontró en el DOM.");
  }

  data.forEach((facturas) => {
    // Convertir la fecha de alta a objeto Date si es un string
    const fechaAlta = typeof facturas.Fecha_alta === 'string' ? new Date(facturas.Fecha_alta) : facturas.Fecha_alta;
    
    // Formatear la fecha de alta como "DD/MM/YYYY"
    const fechaAltaFormateada = fechaAlta.toLocaleDateString();
        
    // Agregar la fila al resultado
    resultado += `
        <div class="row2">
            <div class="col2 col-10">${facturas.Id_factura}</div>
            <div class="col2 col-10">${fechaAltaFormateada}</div>
            <div class="col2 col-10">${facturas.Fecha_vencimiento}</div>
            <div class="col2 col-30">${facturas.Id_cliente}</div>
            <div class="col2 col-10">${facturas.Base_imponible}</div>
            <div class="col2 col-10">${facturas.Total}</div>
            <div class="col2 col-10">${facturas.Estado}</div>
            <div class="col2 col-5"><img src="../img/icons/editar.svg" class="editar-icono"></div>
            <div class="col2 col-5"><img src="../img/icons/eliminar.svg" class="eliminar-icono"></div>
            <div class="col2 col-5"><img src="../img/icons/ver.svg" class="ver-icono"></div>
        </div>`;
});


  listado_facturas.innerHTML = resultado;
}; 



// ELIMINAR FACTURAS
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
    title: "¿Estás seguro de quieres eliminar esta factura?",
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
      const urlBorrarFactura = "http://localhost:3000/api/v1/borrar_factura/";
      fetch(urlBorrarFactura + id, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Id_factura: id,
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
            title: "¡Factura eliminada!",
            text: "La factura ha sido eliminada satisfactoriamente.",
            icon: "success",
            iconColor: "#0798c4",
            confirmButtonColor: "#0798c4",
          });
          setTimeout(() => {
            location.reload();
          }, 2000);
        })
        .catch((error) => {
          swal.fire("Error al eliminar el articulo", {
            icon: "error",
            iconColor: "#e6381c",
            confirmButtonColor: "#0798c4",
          });
        });
    } else {
      swal.fire({
        title: "¡Factura NO eliminada!",
        text: "Todo a salvo!.",
        icon: "info",
        iconColor: "#0798c4",
        confirmButtonColor: "#0798c4",
      });
      setTimeout(() => {
        location.reload();
      }, 2000);
    }
  });
});

// EDITAR FACTURAS

let urlEditarFactura = "http://localhost:3000/api/v1/editar_facturas/";


// Cuando se hace clic en el botón de editar cliente
on(document, "click", ".editar-icono", (e) => {
  
  const fila = e.target.parentNode.parentNode;
  const Id_factura = fila.children[0].innerHTML;
  const Fecha_vencimiento = fila.children[1].innerHTML;
  const Cliente = fila.children[2].innerHTML;
  const Tipo = fila.children[3].innerHTML;
  const NombreCliente = fila.children[4].innerHTML;
  const ApellidosCliente = fila.children[5].innerHTML;
  const idFiscal = fila.children[6].innerHTML;
  const Direccion = fila.children[7].innerHTML;
  const CPostal = fila.children[8].innerHTML;
  const localidad = fila.children[9].innerHTML;
  //const Pais = fila.children[11].innerHTML;  
  //const stockCantidad = fila.children[13].innerHTML; 
  //const stockCodigo = fila.children[14].innerHTML; 
  ////const stockNombre = fila.children[15].innerHTML; 
  //const stockCoste = fila.children[16].innerHTML; 
  //const stockCosteIva = fila.children[17].innerHTML; 
  //const stockVenta = fila.children[18].innerHTML; 
  //const stockVentaIva = fila.children[19].innerHTML;


  // Asignar valores a los campos de entrada del modal myModal_edit
  document.getElementById("facturas_id_edit").value = Id_factura;
  document.getElementById("facturas_vencimiento_edit").value = Fecha_vencimiento;
  document.getElementById("facturas_id_cliente_edit").value = Cliente;
  document.getElementById("tipo_edit").value = Tipo;
  document.getElementById("facturas_nombre_cliente_edit").value = NombreCliente;
  document.getElementById("facturas_apellidos_edit").value = ApellidosCliente;
  document.getElementById("facturas_fiscal_edit").value = idFiscal;
  document.getElementById("facturas_direccion_edit").value = Direccion;
  document.getElementById("facturas_c_postal_edit").value = CPostal;
  document.getElementById("facturas_localidad_edit").value = localidad;
 // document.getElementById("facturas_pais_edit").value = Pais;
  
 

 
  // Mostrar el modal myModal_edit
  openModalFacturas_edit();
});


// Manejar el envío del formulario de edición
const formEditFacturas = document.querySelectorAll("#modal_alta_facturas_edit");

formEditFacturas.forEach(form => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Obtener los valores del formulario de edición
    let idFactura = document.getElementById("facturas_id_edit").value;
    let fecha = document.getElementById("facturas_vencimiento_edit").value;
    let estado = document.getElementById("facturas_estado_edit").value;
    let vencimiento = document.getElementById("facturas_vencimiento_edit").value;
    let idCliente = document.getElementById("facturas_id_cliente_edit").value;
    let tipo = document.getElementById("facturas_tipo_edit").value;
    let nombre = document.getElementById("facturas_nombre_edit").value;
    let apellidos = document.getElementById("facturas_apellidos_edit").value;
    let idFiscal = document.getElementById("facturas_id_fiscal_edit").value;
    let direccion = document.getElementById("facturas_direccion_edit").value;
    let cPostal = document.getElementById("facturas_c_postal_edit").value;
    let localidad = document.getElementById("facturas_localidad_edit").value;
    let pais = document.getElementById("facturas_pais_edit").value;
    let total = document.getElementById("facturas_total_edit").value; 
    let imponible = document.getElementById("facturas_imponible_edit").value;

    //costeIva = (coste * 1.21).toFixed(2);
    //ventaIva = (venta * 1.21).toFixed(2);
   
    // Enviar la solicitud de edición al servidor
    fetch(urlEditarFactura + idFactura, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Fecha_alta: fecha,
        Cliente: idCliente,
        Fecha_vencimiento: vencimiento,
        Estado:estado,
        Base_imponible:imponible,
        Total: total,
        
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Hubo un problema al editar la factura. Por favor, inténtalo de nuevo más tarde.');
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
