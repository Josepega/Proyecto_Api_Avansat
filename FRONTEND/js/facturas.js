

// MODALFacturas EDIT
const modalFacturas_edit = document.querySelectorAll("#modal_alta_facturas_edit");
const openModalFacturasButtons_edit = document.querySelectorAll("#boton_facturas_alta_edit");
const closeModalFacturasButtons_edit = document.querySelectorAll("#close_edit");


function openModalFacturas_edit() {
  modalFacturas_edit.forEach(function(modalFacturas_edit) {
    modalFacturas_edit.style.display = "block";
    console.log("Posición del primer elemento dentro del modal:", modalFacturas_edit.children[0]);
    console.log("Posición del segundo elemento dentro del modal:", modalFacturas_edit.children[1]);
  });
}

function closeModalFacturas_edit() {
  modalFacturas_edit.forEach(function(modalFacturas_edit) {
    modalFacturas_edit.style.display = "none";
    console.log("Posición del primer elemento dentro del modal:", modalFacturas_edit.children[0]);
    console.log("Posición del segundo elemento dentro del modal:", modalFacturas_edit.children[1]);
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

  
// LISTADO DE FACTURAS

const urlListadoFacturas = "http://localhost:3000/api/v1/listado_facturas/";
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
  
  //const fila = e.target.parentNode.parentNode;
  const fila = e.target.parentNode.parentNode;

 console.log("Valor de la primera columna:", fila.children[0].innerHTML);
console.log("Valor de la segunda columna:", fila.children[1].innerHTML);
console.log("Valor de la tercera columna:", fila.children[2].innerHTML);
console.log("Valor de la cuarta columna:", fila.children[3].innerHTML);
console.log("Valor de la quinta columna:", fila.children[4].innerHTML);
console.log("Valor de la sexta columna:", fila.children[5].innerHTML);
console.log("Valor de la septima columna:", fila.children[6].innerHTML);
console.log("Valor de la octava columna:", fila.children[7].innerHTML);
console.log("Valor de la novena columna:", fila.children[8].innerHTML);
console.log("Valor de la decima columna:", fila.children[9].innerHTML); 
/*  */
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
  const stockCosteIva = fila.children[4].innerHTML; 
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
  document.getElementById("facturas_imponible_edit").value = stockCosteIva;
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
          title: "Error al editar la factura",
          text:error.message,
          icon: "error",
          iconColor: "#e6381c",
          confirmButtonColor: "#0798c4",
        });
      });
  });
});

//VER FACTURAS
const onVer = (element, event, selector, handler) => {
  element.addEventListener(event, (e) => {
    if (e.target.closest(selector)) {
      handler(e);
    }
  });
};

on(document, "click", ".ver-icono", (e) => {
  const fila = e.target.parentNode.parentNode;
  const idFactura = fila.firstElementChild.innerHTML; //Obtener el ID de la factura desde el atributo data

  // Aquí puedes utilizar el ID de la factura para mostrar los detalles, realizar una solicitud Fetch, etc.
  console.log('Mostrar detalles de la factura con ID:', idFactura);
  // O llamar a una función para mostrar los detalles de la factura
  mostrarDetallesFactura(idFactura);
  mostrarDetallesProductos(idFactura);
});


function mostrarDetallesFactura(idFactura) {
  // Mostrar la plantilla de factura antes de obtener los detalles
  document.querySelector('#plantilla_facturas').style.display = 'block';

  // Realizar la solicitud Fetch para obtener los detalles de la factura
  fetch(`http://localhost:3000/api/v1/listado_facturas_detalle/${idFactura}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al obtener los detalles de la factura');
      }
      return response.json();
    })
    .then(data => {
      if (data.length === 0) {
        throw new Error('No se encontraron detalles para la factura especificada');
      }
       //Rellenar los campos de la plantilla de factura con los datos obtenidos
      document.getElementById('plantilla_nombre').value = data.Nombre + ' ' + data.Apellidos;
      document.getElementById('plantilla_id_fiscal').value = "NIF: "+ data.Id_fiscal;
      document.getElementById('plantilla_direccion').value = data.Direccion;
      document.getElementById('plantilla_c_postal').value = data.C_postal + ' ' + data.Localidad;
      //document.getElementById('plantilla_localidad').value = data.Localidad;
      document.getElementById('plantilla_pais').value = data.Pais;

      document.getElementById('plantilla_base_imponible').value = (data.Base_imponible)  + ' €';
      document.getElementById('plantilla_iva').value = (data.Total - data.Base_imponible).toFixed(2)+ ' €' ;  
      document.getElementById('plantilla_total').value = data.Total + ' €';
      document.getElementById('plantilla_id_factura').value = data.Id_factura;
      //document.getElementById('plantilla_descripcion').value = data.Descripcion;

      
    })
    .catch(error => {
      console.error('Error:', error);
      // Manejar cualquier error que pueda ocurrir durante la solicitud Fetch

      swal.fire({
        icon: 'error',
        iconColor: '#e6381c',
        title: 'Error al obtener detalles',
        text: 'Hubo un error al obtener los detalles de la factura. Por favor, inténtelo de nuevo más tarde.',
        confirmButtonColor: '#0798c4',

      });
    });
} 
// Función para mostrar los detalles de los productos asociados a la factura
function mostrarDetallesProductos(idFactura) {
  // Realizar la solicitud Fetch para obtener los detalles de los productos asociados a la factura
  fetch(`http://localhost:3000/api/v1/listado_detalles_factura/${idFactura}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al obtener los detalles de los productos asociados a la factura');
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
        text: 'Hubo un error al obtener los detalles de los productos asociados a la factura. Por favor, inténtelo de nuevo más tarde.',
        confirmButtonColor: '#0798c4',
      });
    });
}




function cerrarPlantilla() {
  document.querySelector('#plantilla_facturas').style.display = 'none';
}
const botonCerrarPlantilla = document.querySelector('#cerrar_plantilla');
botonCerrarPlantilla.addEventListener('click', cerrarPlantilla);

// IMPRIMIR FACTURA

async function imprimirFactura() {
  try {
    // Mostrar el contenido de la factura
    document.querySelector('#plantilla_facturas').style.display = 'block';

    // Aplicar la clase de impresión para mostrar solo el área de la factura
    document.body.classList.add('impresion');

    // Hacer la impresión (puedes ajustar esto según sea necesario)
    await window.print();

    // Ocultar nuevamente el contenido de la factura después de imprimir
    document.querySelector('#plantilla_facturas').style.display = 'none';

    // Quitar la clase de impresión después de imprimir
    document.body.classList.remove('impresion');
  } catch (error) {
    console.error('Error al imprimir la factura:', error);
    // Manejar el error aquí
  }
}





// Asociar eventos de clic a los botones de imprimir y descargar
document.getElementById('icono_imprimir').addEventListener('click', imprimirFactura);

