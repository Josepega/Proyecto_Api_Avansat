
function mostrarDetallesPresupuesto(idPresupuesto) {
    // Mostrar la plantilla de factura antes de obtener los detalles
    document.querySelector('#plantilla_presupuestos').style.display = 'block';
  
    // Realizar la solicitud Fetch para obtener los detalles de la factura
    fetch(`http://localhost:3000/api/v1/listado_presupuestos_detalle/${idPresupuesto}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al obtener los detalles del presupuesto');
        }
        return response.json();
      })
      .then(data => {
        if (data.length === 0) {
          throw new Error('No se encontraron detalles para el presupuesto especificado');
        }
         //Rellenar los campos de la plantilla de presupuesto con los datos obtenidos
        document.getElementById('plantilla_nombre').value = data.Nombre + ' ' + data.Apellidos;
        document.getElementById('plantilla_id_fiscal').value = "NIF: "+ data.Id_fiscal;
        document.getElementById('plantilla_direccion').value = data.Direccion;
        document.getElementById('plantilla_c_postal').value = data.C_postal + ' ' + data.Localidad;
        //document.getElementById('plantilla_localidad').value = data.Localidad;
        document.getElementById('plantilla_pais').value = data.Pais;
  
        document.getElementById('plantilla_base_imponible').value = (data.Base_imponible)  + ' €';
        document.getElementById('plantilla_iva').value = (data.Total - data.Base_imponible).toFixed(2)+ ' €' ;  
        document.getElementById('plantilla_total').value = data.Total + ' €';
        document.getElementById('plantilla_id_presupuesto').value = data.Id_presupuesto;
        //document.getElementById('plantilla_descripcion').value = data.Descripcion;
  
        
      })
      .catch(error => {
        console.error('Error:', error);
        // Manejar cualquier error que pueda ocurrir durante la solicitud Fetch
  
        swal.fire({
          icon: 'error',
          iconColor: '#e6381c',
          title: 'Error al obtener detalles',
          text: 'Hubo un error al obtener los detalles del presupuesto. Por favor, inténtelo de nuevo más tarde.',
          confirmButtonColor: '#0798c4',
  
        });
      });
  } 
  // Función para mostrar los detalles de los productos asociados al presupuesto
  function mostrarDetallesProductos(idPresupuesto) {
    // Realizar la solicitud Fetch para obtener los detalles de los productos asociados a la factura
    fetch(`https://app.avansat.cat/api/v1/listado_detalles_presupuestos/${idPresupuesto}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al obtener los detalles de los productos asociados al presupuesto');
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
          text: 'Hubo un error al obtener los detalles de los productos asociados al presupuesto. Por favor, inténtelo de nuevo más tarde.',
          confirmButtonColor: '#0798c4',
        });
      });
  }