

// MODALpresupuestos EDIT
const modalpresupuestos_edit = document.querySelectorAll("#modal_alta_presupuestos_edit");
const openModalpresupuestosButtons_edit = document.querySelectorAll("#boton_presupuestos_alta_edit");
const closeModalpresupuestosButtons_edit = document.querySelectorAll("#close_edit");


function openModalpresupuestos_edit() {
  modalpresupuestos_edit.forEach(function(modalpresupuestos_edit) {
    modalpresupuestos_edit.style.display = "block";
    console.log("Posición del primer elemento dentro del modal:", modalpresupuestos_edit.children[0]);
    console.log("Posición del segundo elemento dentro del modal:", modalpresupuestos_edit.children[1]);
  });
}

function closeModalpresupuestos_edit() {
  modalpresupuestos_edit.forEach(function(modalpresupuestos_edit) {
    modalpresupuestos_edit.style.display = "none";
    console.log("Posición del primer elemento dentro del modal:", modalpresupuestos_edit.children[0]);
    console.log("Posición del segundo elemento dentro del modal:", modalpresupuestos_edit.children[1]);
  });
}

openModalpresupuestosButtons_edit.forEach(function(element) {
  element.addEventListener("click", openModalpresupuestos_edit);
});

closeModalpresupuestosButtons_edit.forEach(function(element) {
  element.addEventListener("click", closeModalpresupuestos_edit);
});


openModalpresupuestosButtons_edit.forEach(function (element) {
  element.addEventListener("click", openModalpresupuestos_edit);
});

  
// LISTADO DE presupuestos

const urlListadopresupuestos = "http://localhost:3000/api/v1/listado_presupuestos/";
const listado_presupuestos = document.querySelector("#listado_presupuestos");

fetch(urlListadopresupuestos)
  .then((response) => response.json())
  .then((resultado) => mostrar(resultado))
  .catch((error) => console.error("Error al obtener los datos:", error));

const mostrar = (data) => {
  if (!Array.isArray(data) || data.length === 0) {
    swal.fire({
      icon: "info",
      iconColor: "#0798c4",
      title: "No hay presupuestos registradas",
      text: "Puedes crear una en el boton AÑADIR",
      confirmButtonColor: "#0798c4",
    });
    return;
  }

  let resultado = "";
  if (listado_presupuestos) {
    listado_presupuestos.innerHTML = resultado;
  } else {
    console.error("El elemento #listado_presupuestos no se encontró en el DOM.");
  }

  data.forEach((presupuestos) => {
    // Convertir la fecha de alta a objeto Date si es un string
    const fechaAlta = typeof presupuestos.Fecha_alta === 'string' ? new Date(presupuestos.Fecha_alta) : presupuestos.Fecha_alta;
    
    // Formatear la fecha de alta como "DD/MM/YYYY"
    const fechaAltaFormateada = fechaAlta.toLocaleDateString();
        
    // Agregar la fila al resultado
    resultado += `
        <div class="row2">
            <div class="col2 col-10">${presupuestos.Id_presupuesto}</div>
            <div class="col2 col-10">${fechaAltaFormateada}</div>
            <div class="col2 col-10">${presupuestos.Fecha_vencimiento}</div>
            <div class="col2 col-30">${presupuestos.nombreCliente}</div>
            <div class="col2 col-10">${presupuestos.Base_imponible + ' €'}</div>
            <div class="col2 col-10">${presupuestos.Total + ' €'}</div>
            <div class="col2 col-10 ${presupuestos.Estado === 'Pendiente' ? 'estado-Pendiente' : (presupuestos.Estado === 'Aceptado' ? 'estado-Aceptado' : 'estado-Anulado')}">${presupuestos.Estado}</div>
            <div class="col2 col-5"><img src="../img/icons/editar.svg" class="editar-icono"></div>
            <div class="col2 col-5"><img src="../img/icons/eliminar.svg" class="eliminar-icono"></div>
            <div class="col2 col-5"><img src="../img/icons/ver.svg" class="ver-icono"></div>
        </div>`;
});


  listado_presupuestos.innerHTML = resultado;
}; 



// ELIMINAR presupuestos
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
    title: "¿Estás seguro de quieres eliminar esta Presupuesto?",
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
      const urlBorrarPresupuesto = "http://localhost:3000/api/v1/borrar_Presupuesto/";
      fetch(urlBorrarPresupuesto + id, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Id_Presupuesto: id,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Hubo un problema al eliminar la Presupuesto.");
          }
          return response.json();
        })
        .then((result) => {
          swal.fire({
            title: "¡Presupuesto eliminada!",
            text: "La Presupuesto ha sido eliminado satisfactoriamente.",
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
        title: "¡Presupuesto NO eliminada!",
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

// EDITAR presupuestos

const urlEditarPresupuesto = "http://localhost:3000/api/v1/editar_presupuestos/";

on(document, "click", ".editar-icono", (e) => {
  const fila = e.target.parentNode.parentNode;

  // Obtener los valores de las columnas de la fila
  const idPresupuesto = fila.firstElementChild.innerHTML
  const fechaVencimiento = fila.children[2].innerHTML;
  const cliente = fila.children[1].innerHTML;
  const tipo = fila.children[4].innerHTML;
  const nombreCliente = fila.children[4].innerHTML;
  const apellidosCliente = fila.children[5].innerHTML;
  const idFiscal = fila.children[6].innerHTML;
  const direccion = fila.children[7].innerHTML;
  const cPostal = fila.children[8].innerHTML;
  const localidad = fila.children[9].innerHTML;
  const stockCosteIva = fila.children[4].innerHTML;

  // Mostrar los valores en la consola antes de asignarlos al modal
  console.log("ID Presupuesto:", idPresupuesto);
  console.log("Fecha de Vencimiento:", fechaVencimiento);
  console.log("Cliente:", cliente);
  console.log("Tipo:", tipo);
  console.log("Nombre del Cliente:", nombreCliente);
  console.log("Apellidos del Cliente:", apellidosCliente);
  console.log("ID Fiscal:", idFiscal);
  console.log("Dirección:", direccion);
  console.log("Código Postal:", cPostal);
  console.log("Localidad:", localidad);
  console.log("Coste con IVA:", stockCosteIva);

  // Asignar valores a los campos de entrada del modal de edición
  document.getElementById("presupuestos_id_edit").value = idPresupuesto;
  document.getElementById("presupuestos_vencimiento_edit").value = fechaVencimiento;
  document.getElementById("presupuestos_id_cliente_edit").value = cliente;
  document.getElementById("tipo_edit").value = tipo;
  document.getElementById("presupuestos_nombre_cliente_edit").value = nombreCliente;
  document.getElementById("presupuestos_apellidos_edit").value = apellidosCliente;
  document.getElementById("presupuestos_fiscal_edit").value = idFiscal;
  document.getElementById("presupuestos_direccion_edit").value = direccion;
  document.getElementById("presupuestos_c_postal_edit").value = cPostal;
  document.getElementById("presupuestos_localidad_edit").value = localidad;
  document.getElementById("presupuestos_imponible_edit").value = stockCosteIva;

  // Mostrar el modal de edición
  openModalpresupuestos_edit();
});


// Manejar el envío del formulario de edición
document.querySelectorAll("#modal_alta_presupuestos_edit").forEach(form => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Obtener los valores del formulario de edición
    const idPresupuesto = form.document.getElementById("presupuestos_id_edit").value;
    const fecha = form.document.getElementById("presupuestos_vencimiento_edit").value;
    const idCliente = form.document.getElementById("presupuestos_id_cliente_edit").value;
    const tipo = form.document.getElementById("tipo_edit").value;
    const nombre = form.document.getElementById("presupuestos_nombre_cliente_edit").value;
    const apellidos = form.document.getElementById("presupuestos_apellidos_edit").value;
    const idFiscal = form.document.getElementById("presupuestos_fiscal_edit").value;
    const direccion = form.document.getElementById("presupuestos_direccion_edit").value;
    const cPostal = form.document.getElementById("presupuestos_c_postal_edit").value;
    const localidad = form.document.getElementById("presupuestos_localidad_edit").value;
    const vencimiento = form.document.getElementById("presupuestos_vencimiento_edit").value;
    const estado = form.document.getElementById("presupuestos_estado_edit").value;
    const imponible = form.document.getElementById("presupuestos_imponible_edit").value;
    const total = form.document.getElementById("presupuestos_total_edit").value;

    // Enviar la solicitud de edición al servidor
    fetch(urlEditarPresupuesto + idPresupuesto, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Fecha_alta: fecha,
        Cliente: idCliente,
        Tipo: tipo,
        Nombre: nombre,
        Apellidos: apellidos,
        Id_fiscal: idFiscal,
        Direccion: direccion,
        C_postal: cPostal,
        Localidad: localidad,
        Fecha_vencimiento: vencimiento,
        Estado: estado,
        Base_imponible: imponible,
        Total: total
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Hubo un problema al editar la Presupuesto. Por favor, inténtalo de nuevo más tarde.');
        }
        return response.json();
      })
      .then(response => {
        // Mostrar mensaje de éxito con SweetAlert
        swal.fire({
          title: "¡Presupuesto editada!",
          text: "La Presupuesto ha sido editada satisfactoriamente.",
          icon: "success",
          iconColor: "#0798c4",
          confirmButtonColor: "#0798c4",
        });

        // Recargar la página después de un tiempo para dar tiempo a leer el mensaje
        setTimeout(() => {
          location.reload();
        }, 2000);
      })
      .catch(error => {
        // Mostrar mensaje de error con SweetAlert
        swal.fire({
          title: "Error al editar la Presupuesto",
          text: error.message,
          icon: "error",
          iconColor: "#e6381c",
          confirmButtonColor: "#0798c4",
        });
      });
  });
});


//VER presupuestos

// Cuando se hace clic en el icono-ver
document.addEventListener('click', (event) => {
  if (event.target.classList.contains('ver-icono')) {
      const idPresupuesto = obtenerIdPresupuesto(event.target);
      mostrarDetallesPresupuestoEnpresupuestosPDF(idPresupuesto);
  }
});

// Función para obtener el ID de la Presupuesto desde el icono-ver
function obtenerIdPresupuesto(iconoVer) {
  const fila = iconoVer.parentNode.parentNode;
  return fila.firstElementChild.innerHTML;
}

// Función para mostrar los detalles de la Presupuesto en presupuestosPDF.html
async function mostrarDetallesPresupuestoEnpresupuestosPDF(idPresupuesto) {
  const url = `presupuestosPDF.html?id=${idPresupuesto}`;
  const response = await fetch(url);
  if (response.ok) {
      // La solicitud fue exitosa, abre la página presupuestosPDF.html en una nueva pestaña o ventana
      window.open(url);
  } else {
      // La solicitud falló, muestra un mensaje de error al usuario
      console.error('Error al obtener los datos de la Presupuesto');
      alert('Hubo un error al obtener los datos de la Presupuesto. Por favor, inténtelo de nuevo más tarde.');
  }
}
 
















 /* const onVer = (element, event, selector, handler) => {
  element.addEventListener(event, (e) => {
    if (e.target.closest(selector)) {
      handler(e);
    }
  });
};

on(document, "click", ".editar-icono", (e) => {
  const fila = e.target.parentNode.parentNode;
  const idPresupuesto = fila.firstElementChild.innerHTML; //Obtener el ID de la Presupuesto desde el atributo data
  // Aquí puedes utilizar el ID de la Presupuesto para mostrar los detalles, realizar una solicitud Fetch, etc.
   console.log('Mostrar detalles de la Presupuesto con ID:', idPresupuesto);
  // O llamar a una función para mostrar los detalles de la Presupuesto
  mostrarDetallesPresupuesto(idPresupuesto);
  mostrarDetallesProductos(idPresupuesto);
});


function mostrarDetallesPresupuesto(idPresupuesto) {
  // Mostrar la plantilla de Presupuesto antes de obtener los detalles
  

  // Realizar la solicitud Fetch para obtener los detalles de la Presupuesto
  fetch(`http://localhost:3000/api/v1/listado_presupuestos_detalle/${idPresupuesto}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al obtener los detalles de la Presupuesto');
      }
      return response.json();
    })
    .then(data => {
      if (data.length === 0) {
        throw new Error('No se encontraron detalles para la Presupuesto especificada');
      }
       //Rellenar los campos de la plantilla de Presupuesto con los datos obtenidos
      document.getElementById('plantilla_nombre').value = data.Nombre + ' ' + data.Apellidos;
      document.getElementById('plantilla_id_fiscal').value = "NIF: "+ data.Id_fiscal;
      document.getElementById('plantilla_direccion').value = data.Direccion;
      document.getElementById('plantilla_c_postal').value = data.C_postal + ' ' + data.Localidad;
      //document.getElementById('plantilla_localidad').value = data.Localidad;
      document.getElementById('plantilla_pais').value = data.Pais;

      document.getElementById('plantilla_base_imponible').value = (data.Base_imponible)  + ' €';
      document.getElementById('plantilla_iva').value = (data.Total - data.Base_imponible).toFixed(2)+ ' €' ;  
      document.getElementById('plantilla_total').value = data.Total + ' €';
      document.getElementById('plantilla_id_Presupuesto').value = data.Id_Presupuesto;
      //document.getElementById('plantilla_descripcion').value = data.Descripcion;

      
    })
    .catch(error => {
      console.error('Error:', error);
      // Manejar cualquier error que pueda ocurrir durante la solicitud Fetch

      swal.fire({
        icon: 'error',
        iconColor: '#e6381c',
        title: 'Error al obtener detalles',
        text: 'Hubo un error al obtener los detalles de la Presupuesto. Por favor, inténtelo de nuevo más tarde.',
        confirmButtonColor: '#0798c4',

      });
    });
} 
// Función para mostrar los detalles de los productos asociados a la Presupuesto
function mostrarDetallesProductos(idPresupuesto) {
  // Realizar la solicitud Fetch para obtener los detalles de los productos asociados a la Presupuesto
  fetch(`http://localhost:3000/api/v1/listado_detalles_Presupuesto/${idPresupuesto}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al obtener los detalles de los productos asociados a la Presupuesto');
      }
      return response.json();
    })
    .then(data => {
      // Limpiar el div antes de agregar nuevos elementos
      const detallesDiv = document.getElementById('plantilla_add');
      detallesDiv.innerHTML = '';

      // Iterar sobre los datos recibidos y crear un elemento para cada producto
      data.forEach(producto => {
        const productoDiv = document.createElement('div');
        productoDiv.classList.add('producto');
        productoDiv.innerHTML = `
          <div class="row2">
            <div class="col2 col-15">${producto.Codigo}</div>           
            <div class="col2 col-30">${producto.Nombre_Producto}</div>
            <div class="col2 col-10">${producto.Cantidad}</div>
            <div class="col2 col-15">${producto.Precio_venta+" €"}</div>
            <div class="col2 col-10">21%</div>
            <div class="col2 col-10">${producto.Cantidad * producto.Precio_venta+" €"}</div>           
          </div>`;
          
        detallesDiv.appendChild(productoDiv);
      });
    })
    .catch(error => {
      console.error('Error:', error);
      // Manejar cualquier error que pueda ocurrir durante la solicitud Fetch
      // Por ejemplo, mostrar un mensaje de error al usuario
      swal.fire({
        icon: 'error',
        title: 'Error',
        iconColor: '#e6381c',
        text: 'Hubo un error al obtener los detalles de los productos asociados a la Presupuesto. Por favor, inténtelo de nuevo más tarde.',
        confirmButtonColor: '#0798c4',
      });
    });
}




 */