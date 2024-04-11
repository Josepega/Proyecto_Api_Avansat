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
const modalFacturas_edit = document.querySelectorAll("#modalFacturas_alta_stock_edit");
const openModalFacturasButtons_edit = document.querySelectorAll("#boton_stock_alta_edit");
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
    document.getElementById('facturas_id_cliente').value = selectedCliente.id_cliente;
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


 // AUTOCOMPLET SERVICIOS
// Declarar la variable clientes en un ámbito global
//let servicios = [];


// Función para buscar clientes por nombre
/* const searchServicios = (key) => {
  fetch(`http://localhost:3000/api/v1/listado_autocomplete?Nombre=${key}`)
    .then((res) => res.json())
    .then((data) => {
      if (Array.isArray(data)) {
        servicios = data; // Asignar los datos de los clientes a la variable clientes
        buildListServicios();
      }
    })
    .catch(error => {
      console.error("Error al buscar servicios:", error);
    });
};

// Función para construir la lista de resultados
const buildListServicios = () => {
  const inputServicios = document.getElementById("facturas_descripcion");
  const autocompleteResultsServicios = document.getElementById("autocomplete-results_servicios");

  console.log("servicios:", servicios);

  if (!servicios || servicios.length === 0) {
    autocompleteResultsServicios.innerHTML = "";
    return;
  }

  const key = inputServicios.value.toLowerCase();

  const filteredServicios = servicios.filter(servicios => {
    return servicios.Nombre.toLowerCase().startsWith(key);
  }).sort((a, b) => {
    // Ordenar alfabéticamente por el nombre
    if (a.Nombre < b.Nombre) return -1;
    if (a.Nombre > b.Nombre) return 1;
    return 0;
  });

  autocompleteResultsServicios.innerHTML = "";

  filteredServicios.slice(0, 10).forEach((servicios) => {
    autocompleteResultsServicios.innerHTML += `<li>${servicios.Nombre} </li>`;
  });
};

// Agregar evento al input para buscar clientes
const inputServicios = document.getElementById("facturas_descripcion");
const autocompleteResultsServicios = document.getElementById("autocomplete-results_servicios");

inputServicios.addEventListener("keyup", (event) => {
  autocompleteResultsServicios.style.display = "block";
  const key = event.target.value;

  console.log(key);

  if (key.length > 0) {
    searchServicios(key);
  } else {
    buildListServicios();
  }
});

// Agregar evento a los elementos de la lista de resultados para seleccionar un cliente
autocompleteResultsServicios.addEventListener("click", (e) => {
  if (e.target && e.target.nodeName == "LI") {
    const selectedNameServicios = e.target.innerHTML;
    const selectedServicios = servicios.find(servicios => `${servicios.Nombre} ` === selectedNameServicios);
    
    // Rellenar los otros inputs con los datos del cliente seleccionado
    inputServicios.value = selectedServicios.Nombre;
   
    document.getElementById('facturas_descripcion').value = selectedServicios.Nombre;
    document.getElementById('facturas_codigo').value = selectedServicios.Codigo;
    document.getElementById('facturas_precio').value = selectedServicios.Precio_coste;
    

    // Ocultar la lista de resultados
    autocompleteResultsServicios.style.display = "none";
  }
});  */

// AUTOCOMPLET STOCK



// Declarar la variable stock en un ámbito global
let stock = [];

// Función para buscar stock por nombre
const searchStock = (key) => {
  fetch(`http://localhost:3000/api/v1/listado_facturas?Nombre=${key}`)
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

  

  //facturasTotal.innerHTML = facturasTotaldeTotales.toFixed(2);

  
  
  const arregloDetalle = [];
  
  const redibujarTabla = () => {
      facturasAdd.innerHTML = "";
      arregloDetalle.forEach((detalle) => {
          let fila = document.createElement("div");
          fila.classList.add("row");
          fila.innerHTML = `<div class="col3 col-10">${detalle.cantidad}</div>
                            <div class="col3 col-15">${detalle.codigo}</div>
                            <div class="col3 col-40">${detalle.descripcion}</div>
                            <div class="col3 col-15">${detalle.precio}</div>
                            <div class="col3 col-15">${detalle.impuestos}</div>
                            <div class="col3 col-15">${detalle.precioIva}</div>                                         
                            <div class="col3 col-10"><img src="../img/icons/eliminar.svg" class="eliminar-icono"></div>`;
          facturasAdd.appendChild(fila);
      });
  };

  imagenAgregar.addEventListener("click", () => {
    let facturasCantidadInput = document.getElementById("facturas_cantidad").value;
    if (!isNaN(facturasCantidadInput)) { // Verificar si el valor es un número
        let facturasCantidad = (facturasCantidadInput);
        let facturasCodigo = document.getElementById("facturas_codigo").value;
        let facturasDescripcion = document.getElementById("facturas_descripcion_stock").value;
        let facturasPrecio = parseFloat(document.getElementById("facturas_precio").value.replace(',', '.'));
        let facturasImpuesto = parseFloat(document.getElementById("facturas_impuestos").value.replace(',', '.'));
        let facturasPrecioIva = facturasPrecio * (1 + facturasImpuesto / 100);
        let facturasPrecioSubTotal = facturasPrecio * facturasCantidad;
        let facturasBaseImponible = facturasPrecioIva - facturasPrecioSubTotal;
        let facturasTotaldeTotales = facturasPrecioIva * facturasCantidad;

        //Actualizar el campo de entrada "facturas_total"
        document.getElementById("facturas_total").value = facturasTotaldeTotales.toFixed(2);
        document.getElementById("facturas_imponible").value = facturasBaseImponible.toFixed(2); 

        // Agregar el detalle a la factura
        const objetoDetalle = {
            cantidad: facturasCantidad,
            codigo: document.getElementById("facturas_codigo").value,
            descripcion: document.getElementById("facturas_descripcion_stock").value,
            precio: facturasPrecio,
            impuestos: facturasImpuesto,
            precioIva: facturasPrecioIva,
        };
        arregloDetalle.push(objetoDetalle);
        redibujarTabla();
    } else {
        console.error("El valor de 'facturas_cantidad' no es un número válido.");
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



// ALTA FACTURAS 

const BotonGuardarFactura = document.querySelectorAll("#boton_facturas_guardar");
BotonGuardarFactura.forEach(function (element) {
    element.addEventListener("click", () => {
        

        const facturasAlta = document.getElementById("facturas_alta").value;
        const fechaActual = new Date().toISOString().split('T')[0];
        facturasAlta.value = fechaActual;
        const facturasCliente= document.getElementById("facturas_id_cliente").value;
        const facturasVencimiento = document.getElementById("facturas_vencimiento").value;
        const facturasEstado = (document.getElementById("facturas_estado").value);
        const facturasImponible = parseFloat(document.getElementById("facturas_imponible").value);
        const facturasTotal = parseFloat(document.getElementById("facturas_total").value);

        // Validación de campos obligatorios
        if (
            facturasAlta == "" ||
            facturasCliente == "" ||
            facturasVencimiento == "" ||
            facturasEstado == "" ||
            isNaN(facturasTotal) ||
            isNaN(facturasImponible) 
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
              Fecha_alta: facturasAlta ,    
              Id_cliente: facturasCliente,
              Fecha_vencimiento: facturasVencimiento ,
              Estado: facturasEstado,
              Base_imponible: facturasImponible,
              Total: facturasTotal
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error al agregar la factura");
                }
                return response.json();
            })
            .then((data) => {
                swal({
                    title: "¡Factura añadida correctamente!",
                    icon: "success",
                });
                setTimeout(() => {
                    location.reload();
                }, 3000);
            })
            .catch((error) => {
                swal("Error al agregar la factura", error.message, "error");
            });
    });
});


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

  swal({
    title: "¿Estás seguro de quieres eliminar este stock?",
    text: "¡Esta acción no se puede deshacer!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      const url = "http://localhost:3000/api/v1/borrar_stock/";
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
              title: "¡Stock eliminado!",
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

/* // LISTADO FACTURAS

const urlListadoFacturas = "http://localhost:3000/api/v1/listado_facturas";
const listado_facturas = document.querySelector("#listado_facturas");

fetch(urlListadoFacturas)
  .then((response) => response.json())
  .then((resultado) => mostrar(resultado))
  .catch((error) => console.error("Error al obtener los datos:", error));

const mostrar = (data) => {
  if (!Array.isArray(data) || data.length === 0) {
    console.error("Los datos recibidos no son válidos.");
    return;
  }

  let resultado = "";
  if (listado_facturas) {
    listado_facturas.innerHTML = resultado;
  } else {
    console.error("El elemento #listado_facturas no se encontró en el DOM.");
  }
  

  data.forEach((facturas) => {
  
    resultado += `
        <div class="row2">
            <div class="col2 col-10">${facturas.Id_factura}</div>
            <div class="col2 col-10">${facturas.Fecha_alta}</div>
            <div class="col2 col-10">${facturas.Fecha_vencimiento}</div>
            <div class="col2 col-30">${facturas.Cliente}</div>
            <div class="col2 col-10">${facturas.Base_imponible}</div>
            <div class="col2 col-10">${facturas.Total}</div>
           
           
            <div class="col2 col-5"><img src="../img/icons/editar.svg" class="editar-icono"></div>
            <div class="col2 col-5"><img src="../img/icons/eliminar.svg" class="eliminar-icono"></div>
            <div class="col2 col-5"><img src="../img/icons/ver.svg" class="ver-icono"></div>
        </div>`;
  });

  listado_facturas.innerHTML = resultado;
}; */