

//  ELIMINAR CLIENTE - Llamar a la función para asignar eventos de clic a los íconos de eliminar
function borrar_cliente() {
    const borrar = document.querySelectorAll(".eliminar-icono");
    for (let i = 0; i < borrar.length; i++) {
      borrar[i].addEventListener("click", (papelerita) => {
        const idCliente = papelerita.target.dataset.id; // Obtener la id del cliente del atributo data-id

        swal({
          title: "¿Estás seguro de quieres eliminar este cliente?",
          text: "¡Esta acción no se puede deshacer!",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
        .then((willDelete) => {
          if (willDelete) {
            fetch("http://localhost:3000/api/v1/borrar_cliente", {
              method: "delete",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                id_cliente: idCliente, // Utilizar la id del cliente obtenida
              }),
            })
            .then(response => {
              if (response.ok) {
                swal({
                  title:"¡Cliente eliminado!",
                  text: "El cliente ha sido eliminado satisfactoriamente.",
                  icon: "success",
                });
                setTimeout(() => {
                  location.reload();
              }, 3000);
              } else {
                swal("Error al eliminar el cliente", {
                  icon: "error",
                });
              }
            })
            .catch(error => {
              swal("Error al eliminar el cliente", {
                icon: "error",
              });
              console.error('Error:', error);
            });
          } else {
            swal({
              title:"¡Cliente NO eliminado!",
              text: "Todo a salvo!.", 
              icon: "success",
            });
          }
        });
      });
    }
}



// CARGAR CLIENTES EN ULTIMOS 10 AÑADIDOS
document.addEventListener("DOMContentLoaded", function() {
  // Tu código JavaScript aquí
  fetch("http://localhost:3000/api/v1/listado_clientes")
      .then((res) => res.json())
      .then((data) => {
          const contenedorDatos = document.querySelector("#lista_clientes");
          const arrayDatosConsulta = data.resultado;

          if (arrayDatosConsulta.length === 0) {
              contenedorDatos.innerHTML = "<p>No hay ningún CLIENTE registrado.</p>";
          } else {
              contenedorDatos.innerHTML = "";

              const contenedorIconoEditar = document.querySelector("#container_clientes_icono_editar");
              const contenedorIconoEliminar = document.querySelector("#container_clientes_icono_borrar");

              arrayDatosConsulta.forEach((elemento) => {
                  const parrafo = document.createElement("p");
                  parrafo.textContent = elemento.Nombre + " " + elemento.Apellidos;

                  // Agrega un icono de editar
                  const iconoEditar = document.createElement("img");
                  iconoEditar.src = "../img/icons/editar.svg"; // Ruta a la imagen de editar
                  iconoEditar.classList.add("editar-icono");
                  iconoEditar.addEventListener("click", () => {
                      // Agrega aquí la lógica para editar el cliente
                      console.log("Editar cliente:", elemento.id_cliente);
                  });
                  contenedorIconoEditar.appendChild(iconoEditar);

                  // Agrega un icono de eliminar
                  const iconoEliminar = document.createElement("img");
                  iconoEliminar.src = "../img/icons/eliminar.svg"; // Ruta a la imagen de eliminar
                  iconoEliminar.classList.add("eliminar-icono");
                  iconoEliminar.addEventListener("click", () => {
                      const idCliente = elemento.id_cliente; // Obtener la id del cliente del elemento actual
                  
                      swal({
                          title: "¿Estás seguro de quieres eliminar este cliente?",
                          text: "¡Esta acción no se puede deshacer!",
                          icon: "warning",
                          buttons: true,
                          dangerMode: true,
                      })
                      .then((willDelete) => {
                          if (willDelete) {
                              fetch("http://localhost:3000/api/v1/borrar_cliente", {
                                  method: "DELETE",
                                  headers: { "Content-Type": "application/json" },
                                  body: JSON.stringify({
                                      id_cliente: idCliente, // Utilizar la id del cliente obtenida
                                  }),
                              })
                              .then(response => {
                                  if (response.ok) {
                                    swal({
                                      title:"¡Cliente eliminado!",
                                      text: "El cliente ha sido eliminado satisfactoriamente.",
                                      icon: "success",
                                    });
                                    setTimeout(() => {
                                      location.reload();
                                  }, 3000);
                                  } else {
                                      swal("Error al eliminar el cliente", {
                                          icon: "error",
                                      });
                                  }
                              })
                              .catch(error => {
                                  swal("Error al eliminar el cliente", {
                                      icon: "error",
                                  });
                                  console.error('Error:', error);
                              });
                          } else {
                            swal({
                              title:"¡Cliente NO eliminado!",
                              text: "Todo a salvo!.", 
                              icon: "success",
                            });
                          }
                      });
                  });

                  contenedorIconoEliminar.appendChild(iconoEliminar);

                  // Agrega el párrafo al contenedor de datos
                  contenedorDatos.appendChild(parrafo);
              });
          }
      })
      .catch((error) => {
          const contenedorDatos = document.querySelector("#lista_clientes");
          contenedorDatos.innerHTML = error;
      });
});


// CARGA Y MOSTRAR TODOS LOS CLIENTES   
document.addEventListener("DOMContentLoaded", function() {
    // Código para cargar y mostrar los clientes
    fetch("http://localhost:3000/api/v1/listado_clientes_totales")
      .then((res) => res.json())
      .then((data) => {
        const arrayDatosConsulta = data.resultado;
  
        const contenedorClientes = document.getElementById("listado_total_clientes");
  
        if (arrayDatosConsulta.length === 0) {
          // Si no hay datos, muestra un mensaje indicándolo
          contenedorClientes.textContent = "No hay ningún cliente registrado.";
        } else {
          // Si hay datos, crea los divs para cada cliente
          arrayDatosConsulta.forEach((elemento) => {
            const divCliente = document.createElement("div");
            divCliente.classList.add("row2");
  
            // Asigna los valores de los campos del cliente a divs individuales
            divCliente.innerHTML = `
              <div class="col col-5">${elemento.id_cliente}</div>
              <div class="col col-10">${elemento.Nombre}</div>
              <div class="col col-10">${elemento.Apellidos}</div>
              <div class="col col-10">${elemento.Id_fiscal}</div>
              <div class="col col-25">${elemento.Direccion}</div>
              <div class="col col-5">${elemento.C_postal}</div>
              <div class="col col-10">${elemento.Localidad}</div>
              <div class="col col-5">${elemento.Pais}</div>
              <div class="col col-10">${elemento.Telefono}</div>
              <div class="col col-10">${elemento.Movil}</div>
              <div class="col col-15">${elemento.Email}</div>
              <div class="col col-3"><img src="../img/icons/editar.svg" class="editar-icono" data-id="${elemento.id_cliente}"></div>
              <div class="col col-3"><img src="../img/icons/eliminar.svg" class="eliminar-icono" data-id="${elemento.id_cliente}"></div>`;
  
            contenedorClientes.appendChild(divCliente);
          });
  
          // Llamar a la función para asignar eventos de clic a los íconos de eliminar
          borrar_cliente();
        }
      })
      .catch((error) => {
        // Si hay un error en la solicitud, muestra el mensaje de error
        document.getElementById("clientes_nombre").textContent = error;
      });
});
// ALTA CLIENTES
const mensajes = document.querySelector("#clientes_mensajes");
const boton_alta_clientes = document.querySelector(".boton_clientes_guardar");

boton_alta_clientes.addEventListener("click", () => {

  const clientes_nombre = document.getElementById("clientes_nombre");
  const clientes_apellidos = document.getElementById("clientes_apellidos");
  const clientes_idFiscal = document.getElementById("clientes_idFiscal");
  const cliente_direccion = document.getElementById("clientes_direccion");
  const clientes_c_postal = document.getElementById("clientes_c_postal");
  const clientes_localidad = document.getElementById("clientes_localidad");
  const clientes_pais = document.getElementById("clientes_pais");
  const clientes_telefono = document.getElementById("clientes_telefono");
  const clientes_movil = document.getElementById("clientes_movil");
  const clientes_email = document.getElementById("clientes_email");
  const clientes_politica_privacidad = document.querySelector(".clientes_politica_privacidad");

  if (
      clientes_nombre.value == "" ||
      clientes_apellidos.value == "" ||
      clientes_idFiscal.value == "" ||
      cliente_direccion.value == "" ||
      clientes_c_postal.value == "" ||
      clientes_localidad.value == "" ||
      clientes_pais.value == "" ||
      clientes_telefono.value == 0 ||
      clientes_movil.value == 0 ||
      clientes_email.value == ""
  ) {
    swal({
      title: "Los campos marcados con * son obligatorios",
      text: "¡Completa los que te falten!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    return
  }
  if (clientes_politica_privacidad.checked == false) {
    swal({
      title: "Debe aceptar la POLITICA DE PRIVACIDAD",
      text: "Marca la casilla",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      return

  }
  const url = "http://localhost:3000/api/v1/alta_cliente";
  fetch(url, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              nombre: clientes_nombre.value,
              apellidos: clientes_apellidos.value,
              idFiscal: clientes_idFiscal.value,
              direccion: cliente_direccion.value,
              c_postal: clientes_c_postal.value,
              localidad: clientes_localidad.value,
              pais: clientes_pais.value,
              telefono: clientes_telefono.value,
              movil: clientes_movil.value,
              email: clientes_email.value
          })
      })
      .then((res) => res.json())
      .then((mensajes) => {
        swal({
          title: "¡Cliente añadido correctamente!",
          text: "Recuerda que los datos son solo de uso FACTURACIÓN",
          icon: "success",
        });
          setTimeout(() => {
              location.reload();
          }, 3000);
      })
      .catch((error) => (mensajes.innerHTML = error));




});

// EDITAR CLIENTE

