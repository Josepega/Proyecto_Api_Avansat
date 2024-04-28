// TARJETA DE FACTURAS

// URL del endpoint para obtener el listado de facturas y el total facturado
const urlFacturas = "http://localhost:3000/api/v1/facturas_ultimas";
const listado_facturas = document.querySelector("#listado_facturas");

// Función para formatear la fecha
const formatearFecha = (fecha) => {
  const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
  return new Date(fecha).toLocaleDateString('es-ES', options);
};

// Obtener los datos de las facturas desde el servidor
fetch(urlFacturas)
  .then((response) => response.json())
  .then((resultado) => mostrar(resultado))
  .catch((error) => console.error("Error al obtener los datos:", error));

// Función para mostrar los resultados en el div correspondiente
const mostrar = (data) => {
  // Verificar si se obtuvieron datos válidos
  if (!data || typeof data !== "object") {
    console.error("Los datos recibidos no son válidos.");
    return;
  }

  // Verificar si se recibió el total facturado y el listado de facturas
  if (!data.total_facturado || !data.ultimas_facturas) {
    console.error("Los datos recibidos están incompletos.");
    return;
  }

  // Mostrar el listado de las últimas 5 facturas
  const ultimasFacturasHTML = data.ultimas_facturas.map((factura) => `
    <div class="row">
      <div class="col2 col-10">${factura.Id_factura}</div> 
      <div class="col2 col-40">${formatearFecha(factura.Fecha_alta)}</div>
      <div class="col2 col-40">${factura.Total + ' €'}</div>
    </div>
  `).join("");

  // Mostrar el total facturado al final del listado
  const totalFacturadoHTML = `<div class="row3" style="font-weight:400; margin-top: 6px;">Total facturado: ${data.total_facturado + ' €'}</div>`;

  // Insertar el listado de facturas y el total facturado en el div correspondiente
  listado_facturas.innerHTML = ultimasFacturasHTML + totalFacturadoHTML;
};

// TARJETA DE CLIENTES
// URL del endpoint para obtener el listado de clientes y el total clientedo
const urlClientes = "http://localhost:3000/api/v1/clientes_ultimos";
const listado_clientes = document.querySelector("#listado_clientes");

// Función para formatear la fecha

// Obtener los datos de las clientes desde el servidor
fetch(urlClientes)
  .then((response) => response.json())
  .then((resultado) => mostrarClientes(resultado))
  .catch((error) => console.error("Error al obtener los datos:", error));

// Función para mostrar los resultados en el div correspondiente
const mostrarClientes = (data) => {
  // Verificar si se obtuvieron datos válidos
  if (!data || typeof data !== "object") {
    console.error("Los datos recibidos no son válidos.");
    return;
  }

  // Verificar si se recibió el total clientedo y el listado de clientes
  if (!data.total_clientes || !data.ultimos_clientes) {
    console.error("Los datos recibidos están incompletos.");
    return;
  }

  // Mostrar el listado de las últimas 5 clientes
  const ultimosClientesHTML = data.ultimos_clientes.map((cliente) => `
    <div class="row">
      <div class="col2 col-10">${cliente.Id_cliente}</div> 
      <div class="col2 col-80">${cliente.Nombre +" " + cliente.Apellidos}</div>
    </div>
  `).join("");

  // Mostrar el total clientedo al final del listado
  const totalClientesHTML = `<div class="row3" style="font-weight:400; margin-top: 6px;">Total clientes: ${data.total_clientes }</div>`;

  // Insertar el listado de clientes y el total clientedo en el div correspondiente
  listado_clientes.innerHTML = ultimosClientesHTML + totalClientesHTML;
};


// TARJETA DE STOCKS

// URL del endpoint para obtener el listado de stock y el total stockdo
const urlStock = "http://localhost:3000/api/v1/stock_ultimos";
const listado_stock = document.querySelector("#listado_stock");

// Función para formatear la fecha

// Obtener los datos de las stock desde el servidor
fetch(urlStock)
  .then((response) => response.json())
  .then((resultado) => mostrarStock(resultado))
  .catch((error) => console.error("Error al obtener los datos:", error));

// Función para mostrar los resultados en el div correspondiente
const mostrarStock = (data) => {
  // Verificar si se obtuvieron datos válidos
  if (!data || typeof data !== "object") {
    console.error("Los datos recibidos no son válidos.");
    return;
  }

  // Verificar si se recibió el total stockdo y el listado de stock
  if (!data.total_stock || !data.ultimos_stock) {
    console.error("Los datos recibidos están incompletos.");
    return;
  }

  // Mostrar el listado de las últimas 5 stock
  const ultimosStockHTML = data.ultimos_stock.map((stock) => `
    <div class="row">
      <div class="col2 col-20">${stock.Codigo}</div> 
      <div class="col2 col-55">${stock.Nombre}</div>
      <div class="col2 col-25">${stock.Precio_coste + ' €'}</div>
    </div>
  `).join("");

  // Mostrar el total stockdo al final del listado
  const totalStockHTML = `<div class="row3" style="font-weight:400; margin-top: 6px;">Total stock: ${data.total_stock + ' €'}</div>`;

  // Insertar el listado de stock y el total stockdo en el div correspondiente
  listado_stock.innerHTML = ultimosStockHTML + totalStockHTML;
};

// TARJETA DE SERVICIOS

// URL del endpoint para obtener el listado de servicios y el total serviciosdo
const urlServicios = "http://localhost:3000/api/v1/servicios_ultimos";
const listado_servicios = document.querySelector("#listado_servicios");

// Función para formatear la fecha

// Obtener los datos de las servicios desde el servidor
fetch(urlServicios)
  .then((response) => response.json())
  .then((resultado) => mostrarServicios(resultado))
  .catch((error) => console.error("Error al obtener los datos:", error));

// Función para mostrar los resultados en el div correspondiente
const mostrarServicios = (data) => {
  // Verificar si se obtuvieron datos válidos
  if (!data || typeof data !== "object") {
    console.error("Los datos recibidos no son válidos.");
    return;
  }

  // Verificar si se recibió el total serviciosdo y el listado de servicios
  if (!data.total_servicios || !data.ultimos_servicios) {
    console.error("Los datos recibidos están incompletos.");
    return;
  }

  // Mostrar el listado de las últimas 5 servicios
  const ultimosserviciosHTML = data.ultimos_servicios.map((servicios) => `
    <div class="row">
      <div class="col2 col-20">${servicios.Codigo}</div> 
      <div class="col2 col-55">${servicios.Nombre}</div>
      <div class="col2 col-25">${servicios.Precio_coste + ' €'}</div>
    </div>
  `).join("");

  // Mostrar el total serviciosdo al final del listado
  const totalserviciosHTML = `<div class="row3" style="font-weight:400; margin-top: 6px;">Total servicios: ${data.total_servicios + ' €'}</div>`;

  // Insertar el listado de servicios y el total serviciosdo en el div correspondiente
  listado_servicios.innerHTML = ultimosserviciosHTML + totalserviciosHTML;
};

// TARJETA DE PRESUPUESTOS

// URL del endpoint para obtener el listado de presupuestos y el total presupuestosdo
const urlPresupuestos = "http://localhost:3000/api/v1/presupuestos_ultimas";
const listado_presupuestos = document.querySelector("#listado_presupuestos");

// Obtener los datos de las presupuestos desde el servidor
fetch(urlPresupuestos)
  .then((response) => response.json())
  .then((resultado) => mostrarPresupuestos(resultado))
  .catch((error) => console.error("Error al obtener los datos:", error));

// Función para mostrar los resultados en el div correspondiente
const mostrarPresupuestos = (data) => {
  // Verificar si se obtuvieron datos válidos
  if (!data || typeof data !== "object") {
    console.error("Los datos recibidos no son válidos.");
    return;
  }

  // Verificar si se recibió el total presupuestosdo y el listado de presupuestos
  if (!data.total_presupuestos || !data.ultimos_presupuestos) {
    console.error("Los datos recibidos están incompletos.");
    return;
  }

  // Mostrar el listado de las últimas 5 presupuestos
  const ultimosPresupuestosHTML = data.ultimos_presupuestos.map((presupuestos) => `
    <div class="row">
      <div class="col2 col-10">${presupuestos.Id_presupuesto}</div> 
      <div class="col2 col-40">${formatearFecha(presupuestos.Fecha_alta)}</div>
      <div class="col2 col-40">${presupuestos.Total + ' €'}</div>
    </div>
  `).join("");

  // Mostrar el total presupuestosdo al final del listado
  const totalPresupuestosHTML = `<div class="row3" style="font-weight:400; margin-top: 6px;">Total presupuetado: ${data.total_presupuestos + ' €'}</div>`;

  // Insertar el listado de presupuestos y el total presupuestosdo en el div correspondiente
  listado_presupuestos.innerHTML = ultimosPresupuestosHTML + totalPresupuestosHTML;
};
