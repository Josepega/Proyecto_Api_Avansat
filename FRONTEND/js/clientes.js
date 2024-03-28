document.addEventListener("DOMContentLoaded", function() {
  // Cargar y mostrar los últimos 10 clientes añadidos
  fetch("http://localhost:3000/api/v1/listado_clientes")
      .then((res) => res.json())
      .then((data) => {
          const contenedorDatos = document.querySelector("#lista_clientes");
          const arrayDatosConsulta = data.resultado;

          if (arrayDatosConsulta.length === 0) {
              contenedorDatos.innerHTML = "<p>No hay ningún CLIENTE registrado.</p>";
          } else {
              contenedorDatos.innerHTML = "";

              arrayDatosConsulta.forEach((elemento) => {
                  const parrafo = document.createElement("p");
                  parrafo.textContent = elemento.Nombre + " " + elemento.Apellidos;

                  // Agrega un icono de editar
                  const iconoEditar = document.createElement("img");
                  iconoEditar.src = "../img/icons/editar.svg"; // Ruta a la imagen de editar
                  iconoEditar.classList.add("editar-icono");
                  iconoEditar.addEventListener("click", () => {
                      abrirFormularioEdicion(elemento);
                  });

                  // Agrega un icono de eliminar
                  const iconoEliminar = document.createElement("img");
                  iconoEliminar.src = "../img/icons/eliminar.svg"; // Ruta a la imagen de eliminar
                  iconoEliminar.classList.add("eliminar-icono");
                  iconoEliminar.addEventListener("click", () => {
                      // Lógica para eliminar el cliente
                      const idCliente = elemento.id_cliente;
                      swal({
                          title: "¿Estás seguro de quieres eliminar este cliente?",
                          text: "¡Esta acción no se puede deshacer!",
                          icon: "warning",
                          buttons: true,
                          dangerMode: true,
                      }).then((willDelete) => {
                          if (willDelete) {
                              fetch("http://localhost:3000/api/v1/borrar_cliente", {
                                  method: "DELETE",
                                  headers: { "Content-Type": "application/json" },
                                  body: JSON.stringify({
                                      id_cliente: idCliente,
                                  }),
                              })
                                  .then((response) => {
                                      if (response.ok) {
                                          swal({
                                              title: "¡Cliente eliminado!",
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
                                  .catch((error) => {
                                      swal("Error al eliminar el cliente", {
                                          icon: "error",
                                      });
                                      console.error("Error:", error);
                                  });
                          } else {
                              swal({
                                  title: "¡Cliente NO eliminado!",
                                  text: "Todo a salvo!.",
                                  icon: "success",
                              });
                          }
                      });
                  });

                  parrafo.appendChild(iconoEditar);
                  parrafo.appendChild(iconoEliminar);

                  contenedorDatos.appendChild(parrafo);
              });
          }
      })
      .catch((error) => {
          const contenedorDatos = document.querySelector("#lista_clientes");
          contenedorDatos.innerHTML = "Error al cargar los datos: ";
      });

  // Función para abrir el formulario de edición con los datos del cliente
  function abrirFormularioEdicion(cliente) {
      const formulario = document.querySelector("#alta_clientes");

      // Poblar el formulario con los datos del cliente
      formulario.querySelector("#clientes_nombre").value = cliente.Nombre;
      formulario.querySelector("#clientes_apellidos").value = cliente.Apellidos;

      // Puedes seguir poblando los demás campos del formulario según sea necesario

      formulario.style.display = "block"; // Mostrar el formulario
  }

  // Lógica para el evento de envío del formulario de edición
  const formulario = document.querySelector("alta_clientes.html");
  formulario.addEventListener("submit", function(event) {
      event.preventDefault();

      const nombre = formulario.querySelector("#clientes_nombre").value;
      const apellidos = formulario.querySelector("#clientes_apellidos").value;
      // Puedes seguir obteniendo otros valores del formulario según sea necesario

      // Aquí agregas la lógica para enviar la solicitud de edición del cliente
      // Utilizando fetch() u otro método apropiado
  });

  // Llamar a la función para asignar eventos de clic a los íconos de eliminar
  borrarCliente();
});

// Función para asignar eventos de clic a los íconos de eliminar
function borrarCliente() {
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
                          method: "DELETE",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({
                              id_cliente: idCliente,
                          }),
                      })
                          .then((response) => {
                              if (response.ok) {
                                  swal({
                                      title: "¡Cliente eliminado!",
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
                          .catch((error) => {
                              swal("Error al eliminar el cliente", {
                                  icon: "error",
                              });
                              console.error("Error:", error);
                          });
                  } else {
                      swal({
                          title: "¡Cliente NO eliminado!",
                          text: "Todo a salvo!.",
                          icon: "success",
                      });
                  }
              });
      });
  }
}

// Función para cargar y mostrar todos los clientes
document.addEventListener("DOMContentLoaded", function() {
  fetch("http://localhost:3000/api/v1/listado_clientes_totales")
      .then((res) => res.json())
      .then((data) => {
          const arrayDatosConsulta = data.resultado;

          const contenedorClientes = document.getElementById("listado_total_clientes");

          if (arrayDatosConsulta.length === 0) {
              contenedorClientes.textContent = "No hay ningún cliente registrado.";
          } else {
              arrayDatosConsulta.forEach((elemento) => {
                  const divCliente = document.createElement("div");
                  divCliente.classList.add("row2");

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
              borrarCliente();
          }
      })
      .catch((error) => {
          document.getElementById("clientes_nombre").textContent = error;
      });
});

// Lógica para dar de alta clientes
const mensajes = document.querySelector("#clientes_mensajes");
const botonAltaClientes = document.querySelector(".boton_clientes_guardar");

botonAltaClientes.addEventListener("click", () => {
  const clientesNombre = document.getElementById("clientes_nombre");
  const clientesApellidos = document.getElementById("clientes_apellidos");
  const clientesIdFiscal = document.getElementById("clientes_idFiscal");
  const clienteDireccion = document.getElementById("clientes_direccion");
  const clientesCPostal = document.getElementById("clientes_c_postal");
  const clientesLocalidad = document.getElementById("clientes_localidad");
  const clientesPais = document.getElementById("clientes_pais");
  const clientesTelefono = document.getElementById("clientes_telefono");
  const clientesMovil = document.getElementById("clientes_movil");
  const clientesEmail = document.getElementById("clientes_email");
  const clientesPoliticaPrivacidad = document.querySelector(".clientes_politica_privacidad");

  if (
      clientesNombre.value == "" ||
      clientesApellidos.value == "" ||
      clientesIdFiscal.value == "" ||
      clienteDireccion.value == "" ||
      clientesCPostal.value == "" ||
      clientesLocalidad.value == "" ||
      clientesPais.value == "" ||
      clientesTelefono.value == 0 ||
      clientesMovil.value == 0 ||
      clientesEmail.value == ""
  ) {
      swal({
          title: "Los campos marcados con * son obligatorios",
          text: "¡Completa los que te falten!",
          icon: "warning",
          buttons: true,
          dangerMode: true,
      });
      return;
  }
  if (clientesPoliticaPrivacidad.checked == false) {
      swal({
          title: "Debe aceptar la POLÍTICA DE PRIVACIDAD",
          text: "Marca la casilla",
          icon: "warning",
          buttons: true,
          dangerMode: true,
      });
      return;
  }

  const url = "http://localhost:3000/api/v1/alta_cliente";
  fetch(url, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({
          nombre: clientesNombre.value,
          apellidos: clientesApellidos.value,
          idFiscal: clientesIdFiscal.value,
          direccion: clienteDireccion.value,
          c_postal: clientesCPostal.value,
          localidad: clientesLocalidad.value,
          pais: clientesPais.value,
          telefono: clientesTelefono.value,
          movil: clientesMovil.value,
          email: clientesEmail.value,
      }),
  })
      .then((res) => res.json())
      .then((mensajes) => {
          swal({
              title: "¡Cliente añadido correctamente!",
              text: "Recuerda que los datos son solo para uso de facturación.",
              icon: "success",
          });
          setTimeout(() => {
              location.reload();
          }, 3000);
      })
      .catch((error) => (mensajes.innerHTML = error));
});

// Lógica para editar cliente
function editarCliente() {
  // Aquí colocar la lógica para editar el cliente
}
