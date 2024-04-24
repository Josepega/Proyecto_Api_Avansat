

function mostrarDetallesFacturas(idFactura) {
    // Mostrar la plantilla de factura antes de obtener los detalles
    document.querySelector('#plantilla_facturas').style.display = 'block';
  
    // Realizar la solicitud Fetch para obtener los detalles de la factura
    fetch(`http://localhost:3000/api/v1/listado_facturas_detalle/${idFactura}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al obtener los detalles de la Factura');
        }
        return response.json();
      })
      .then(data => {
        if (data.length === 0) {
          throw new Error('No se encontraron detalles para la Factura especificado');
        }
         //Rellenar los campos de la plantilla de Factura con los datos obtenidos
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
          text: 'Hubo un error al obtener los detalles de la Factura. Por favor, inténtelo de nuevo más tarde.',
          confirmButtonColor: '#0798c4',
  
        });
      });
  } 
  // Función para mostrar los detalles de los productos asociados al Factura
  function mostrarDetallesProductos(idFactura) {
    // Realizar la solicitud Fetch para obtener los detalles de los productos asociados a la factura
    fetch(`http://localhost:3000/api/v1/listado_detalles_facturas/${idFactura}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al obtener los detalles de los productos asociados a la Factura');
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
              <div class="col2 col-15">${producto.Precio_venta+" €D"}</div>
              <div class="col2 col-10">21%</div>
              <div class="col2 col-10">${(producto.Cantidad * producto.Precio_venta).toFixed(2)+" €D"}</div>           
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
          text: 'Hubo un error al obtener los detalles de los productos asociados a la Factura. Por favor, inténtelo de nuevo más tarde.',
          confirmButtonColor: '#0798c4',
        });
      });
  }
  
  
  
  
  /* function cerrarPlantilla() {
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
  } */