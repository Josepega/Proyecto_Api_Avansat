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

 // AUTOCOMPLET SERVICIOS
// Declarar la variable clientes en un ámbito global
let servicios = [];


// Función para buscar clientes por nombre
const searchServicios = (key) => {
  fetch(`http://localhost:3000/api/v1/listado_autocomplete?nombre=${key}`)
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
}); 

// AUTOCOMPLET STOCK


/* // Función para buscar clientes por nombre
let stock = [];

const searchStock = (key) => {
  fetch(`http://localhost:3000/api/v1/listado_stock?Nombre=${key}`)
    .then((res) => res.json())
    .then((data) => {
      if (Array.isArray(data)) {
        stock = data; // Asignar los datos de los clientes a la variable clientes
        buildListStock();
      }
    })
    .catch(error => {
      console.error("Error al buscar clientes:", error);
    });
};

// Función para construir la lista de resultados
const buildListStock = () => {
  const inputStock = document.getElementById("facturas_descripcion");
  const autocompleteResultsStock = document.getElementById("autocomplete-results_servicios");

  
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
    autocompleteResultsStock.innerHTML += `<li>${stock.Nombre} </li>`;
  });
};

// Agregar evento al input para buscar clientes
const inputStock = document.getElementById("facturas_descripcion");
const autocompleteResultsStock = document.getElementById("autocomplete-results_servicios");

inputStock.addEventListener("keyup", (event) => {
  autocompleteResultsStock.style.display = "block";
  const key = event.target.value;

  console.log(key);

  if (key.length > 0) {
    searchStock(key);
  } else {
    buildListStock();
  }
});

// Agregar evento a los elementos de la lista de resultados para seleccionar un cliente
autocompleteResultsStock.addEventListener("click", (e) => {
  if (e.target && e.target.nodeName == "LI") {
    const selectedNameStock = e.target.innerHTML;
    const selectedStock = stock.find(stock => `${stock.Nombre} ` === selectedNameStock);
    
    // Rellenar los otros inputs con los datos del cliente seleccionado
    input.value = selectedStock.Nombre;
    document.getElementById('facturas_descripcion').value = selectedStock.Nombre;
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
  var facturasAdd = document.getElementById("facturas_add");
  var imagenAgregar = document.getElementById("icono-agregar");
  var guardarFacturas = document.getElementById("boton_facturas_guardar");

  let facturasPrecioIva = facturasPrecio * (1 + facturasImpuesto / 100);
  let facturasPrecioSubTotal = facturasPrecio * facturasCantidad;
  let facturasTotaldeTotales = facturasPrecioIva * facturasCantidad;
 

  facturasTotal.innerHTML = facturasTotaldeTotales.toFixed(2);

  
  
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
    let facturasCantidad = parseInt(document.getElementById("facturas_cantidad").value);
    let facturasPrecio = parseFloat(document.getElementById("facturas_precio").value);
    let facturasImpuesto = parseFloat(document.getElementById("facturas_impuestos").value);
    let facturasPrecioIva = facturasPrecio * (1 + facturasImpuesto / 100);
    let facturasPrecioSubTotal = facturasPrecio * facturasCantidad;
    let facurasBaseImponible = facturasPrecioIva * facturasCantidad;
    let facturasTotaldeTotales = facurasBaseImponible + facturasPrecioSubTotal;

    // Actualizar el campo de entrada "facturas_total"
    document.getElementById("facturas_total").value = facturasTotaldeTotales.toFixed(2);
    document.getElementById("facturas_imponible").value = facurasBaseImponible.toFixed(2);

    // Agregar el detalle a la factura
    const objetoDetalle = {
        cantidad: facturasCantidad,
        codigo: document.getElementById("facturas_codigo").value,
        descripcion: document.getElementById("facturas_descripcion").value,
        precio: facturasPrecio,
        impuestos: facturasImpuesto,
        precioIva: facturasPrecioIva,
    };
    arregloDetalle.push(objetoDetalle);
    redibujarTabla();
});
 */
  /* 
  imagenAgregar.addEventListener("click", () => {
    let facturasCantidad = parseInt(document.getElementById("facturas_cantidad").value);
    let facturasCodigo = document.getElementById("facturas_codigo").value;
    let facturasDescripcion = document.getElementById("facturas_descripcion").value;
    let facturasPrecio = parseFloat(document.getElementById("facturas_precio").value);
    let facturasImpuesto = parseFloat(document.getElementById("facturas_impuestos").value);
    let facturasPrecioIva = facturasPrecio * (1 + facturasImpuesto / 100);
    let facturasPrecioSubTotal = facturasPrecio * facturasCantidad;
    let facurasBaseImponible = facturasPrecioIva * facturasCantidad;
    let facturasTotaldeTotales = facurasBaseImponible + facturasPrecioIva;

     
      const objetoDetalle = {
          cantidad: facturasCantidad,
          codigo: facturasCodigo,
          descripcion: facturasDescripcion,
          precio: facturasPrecio,
          impuestos: facturasImpuesto,
          precioIva: facturasPrecioIva,
        };
      arregloDetalle.push(objetoDetalle);
      redibujarTabla();
  }); */
  
