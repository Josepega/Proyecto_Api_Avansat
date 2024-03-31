document.addEventListener("DOMContentLoaded", () => {

    // MODAL
    const modal = document.querySelector(".myModal");
    const openModalButtons = document.querySelectorAll("#boton_clientes_alta");
    const closeModalButton = document.querySelector("#close");
    
    function openModal() {
      modal.style.display = "block";
      const tipoCliente = document.querySelector("#tipo");
      const clienteEmpresa = document.getElementById("cliente_empresa");
      const clientePersona = document.getElementById("cliente_persona");
      
      if (tipoCliente && clienteEmpresa && clientePersona) {
        if (tipoCliente.value === "empresa") {
          clienteEmpresa.style.display = "block";
          clientePersona.style.display = "none";
        } else {
          clienteEmpresa.style.display = "none";
          clientePersona.style.display = "block";
        }
    
        tipoCliente.addEventListener("change", () => {
          if (tipoCliente.value === "empresa") {
            clienteEmpresa.style.display = "block";
            clientePersona.style.display = "none";
          } else {
            clienteEmpresa.style.display = "none";
            clientePersona.style.display = "block";
          }
        });
      }
    }
    
    function closeModal() {
      if (modal) {
        modal.style.display = "none";
      }
    }
  
    openModalButtons.forEach(function (element) {
      element.addEventListener("click", openModal);
    });
  
    if (closeModalButton) {
      closeModalButton.addEventListener("click", closeModal);
    }
  
    // MODAL EDIT
    const tipoClienteEdit = document.querySelector("#tipo_edit");
    const modalEdit = document.querySelector(".myModal_edit");
    const openModalButtonsEdit = document.querySelectorAll(".editar-icono");
    const closeModalButtonEdit = document.querySelector("#close_edit");
    
    function openModalEdit() {
      if (modalEdit) {
        modalEdit.style.display = "block";
        const clienteEmpresaEdit = document.getElementById("cliente_empresa_edit");
        const clientePersonaEdit = document.getElementById("cliente_persona_edit");
        
        if (tipoClienteEdit && clienteEmpresaEdit && clientePersonaEdit) {
          if (tipoClienteEdit.value === "empresa_edit") {
            clienteEmpresaEdit.style.display = "block";
            clientePersonaEdit.style.display = "none";
          } else {
            clienteEmpresaEdit.style.display = "none";
            clientePersonaEdit.style.display = "block";
          }
      
          tipoClienteEdit.addEventListener("change", () => {
            if (tipoClienteEdit.value === "empresa_edit") {
              clienteEmpresaEdit.style.display = "block";
              clientePersonaEdit.style.display = "none";
            } else {
              clienteEmpresaEdit.style.display = "none";
              clientePersonaEdit.style.display = "block";
            }
          });
        }
      }
    }
    
    function closeModalEdit() {
      if (modalEdit) {
        modalEdit.style.display = "none";
      }
    }
  
    openModalButtonsEdit.forEach(function (element) {
      element.addEventListener("click", openModalEdit);
    });
    
    if (closeModalButtonEdit) {
      closeModalButtonEdit.addEventListener("click", closeModalEdit);
    }

    // Lógica para mostrar u ocultar formularios dependiendo del tipo de cliente
    const botonAltaClientes = document.querySelector("#boton_clientes_guardar");
    if (botonAltaClientes) {
      botonAltaClientes.addEventListener("click", () => {
        const clientesTipo = document.getElementById("tipo");
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
    
        if (clientesTipo && clientesNombre && clientesApellidos && clientesIdFiscal && clienteDireccion && clientesCPostal && clientesLocalidad && clientesPais && clientesEmail) {
          if (
            clientesTipo.value === "" ||
            clientesNombre.value === "" ||
            clientesApellidos.value === "" ||
            clientesIdFiscal.value === "" ||
            clienteDireccion.value === "" ||
            clientesCPostal.value === "" ||
            clientesLocalidad.value === "" ||
            clientesPais.value === "" ||
            clientesEmail.value === ""
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
      
          if (!clientesPoliticaPrivacidad.checked) {
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
              tipo_cliente: clientesTipo.value,
              nombre: clientesNombre.value,
              apellidos: clientesApellidos.value,
              id_fiscal: clientesIdFiscal.value,
              direccion: clienteDireccion.value,
              c_postal: clientesCPostal.value,
              localidad: clientesLocalidad.value,
              pais: clientesPais.value,
              telefono: clientesTelefono.value,
              movil: clientesMovil.value,
              email: clientesEmail.value,
            }),
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error("Error al agregar el cliente");
              }
              return response.json();
            })
            .then((data) => {
              swal({
                title: "¡Cliente añadido correctamente!",
                text: "Recuerda que los datos son solo para uso de facturación.",
                icon: "success",
              });
              setTimeout(() => {
                location.reload();
              }, 3000);
            })
            .catch((error) => {
              swal("Error al agregar el cliente", error.message, "error");
            });
        }
      });
    }
  });
  
  // Lógica para mostrar el listado de clientes
  const url = "http://localhost:3000/api/v1/listado_clientes";
  const listado_clientes = document.querySelector("#listado_clientes");
  
  if(listado_clientes) {
    fetch(url)
      .then((response) => response.json())
      .then((resultado) => mostrar(resultado))
      .catch((error) => console.error("Error al obtener los datos:", error));
  }
  
  const mostrar = (data) => {
    if (!Array.isArray(data) || data.length === 0) {
      console.error("Los datos recibidos no son válidos.");
      return;
    }
  
    let resultado = "";
  
    data.forEach((cliente) => {
      resultado += `
          <div class="row2">
              <div class="col col-5">${cliente.id_cliente}</div>
              <div class="col col-5">${cliente.Tipo_cliente}</div>
              <div class="col col-10">${cliente.Nombre}</div>
              <div class="col col-10">${cliente.Apellidos || ""}</div>
              <div class="col col-10">${cliente.Id_fiscal}</div>
              <div class="col col-20">${cliente.Direccion}</div>
              <div class="col col-5">${cliente.C_postal}</div>
              <div class="col col-10">${cliente.Localidad}</div>
              <div class="col col-5">${cliente.Pais}</div>
              <div class="col col-10">${cliente.Telefono}</div>
              <div class="col col-10">${cliente.Movil || ""}</div>
              <div class="col col-15">${cliente.Email || ""}</div>
              <div class="col col-3"><img src="../img/icons/editar.svg" class="editar-icono"></div>
              <div class="col col-3"><img src="../img/icons/eliminar.svg" class="eliminar-icono"></div>
          </div>`;
    });
  
    if(listado_clientes) {
      listado_clientes.innerHTML = resultado;
    }
  };
  
  // Event listener para eliminar clientes
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
      title: "¿Estás seguro de quieres eliminar este cliente?",
      text: "¡Esta acción no se puede deshacer!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const url = "http://localhost:3000/api/v1/borrar_cliente/";
        fetch(url + id, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            Id_cliente: id,
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
  
  // Event listener para editar clientes
  let idForm = 0;
  on(document, "click", ".editar-icono", (e) => {
    const modalEdit = document.querySelector(".myModal_edit");
  
    const fila = e.target.parentNode.parentNode;
    const id = fila.firstElementChild.innerHTML;
    idForm = fila.children[0].innerHTML;
  
    const tipo_Cliente = fila.children[1].innerHTML;
    const nombre = fila.children[2].innerHTML;
    const apellidos = fila.children[3].innerHTML;
    const id_fiscal = fila.children[4].innerHTML;
    const direccion = fila.children[5].innerHTML;
    const c_postal = fila.children[6].innerHTML;
    const localidad = fila.children[7].innerHTML;
    const pais = fila.children[8].innerHTML;
    const telefono = fila.children[9].innerHTML;
    const movil = fila.children[10].innerHTML;
    const email = fila.children[11].innerHTML;
  
    const tipoSelect = document.querySelector("#tipo_edit");
    const clientes_nombre = document.querySelector("#clientes_nombre_edit");
    const clientes_apellidos = document.querySelector("#clientes_apellidos_edit");
    const clientes_idFiscal = document.querySelector("#clientes_idFiscal_edit");
    const clientes_direccion = document.querySelector("#clientes_direccion_edit");
    const clientes_c_postal = document.querySelector("#clientes_c_postal_edit");
    const clientes_localidad = document.querySelector("#clientes_localidad_edit");
    const clientes_pais = document.querySelector("#clientes_pais_edit");
    const clientes_telefono = document.querySelector("#clientes_telefono_edit");
    const clientes_movil = document.querySelector("#clientes_movil_edit");
    const clientes_email = document.querySelector("#clientes_email_edit");
  
    if (tipoSelect && clientes_nombre && clientes_apellidos && clientes_idFiscal && clientes_direccion && clientes_c_postal && clientes_localidad && clientes_pais && clientes_telefono && clientes_email) {
      tipoSelect.value = tipo_Cliente;
      clientes_nombre.value = nombre;
      clientes_apellidos.value = apellidos;
      clientes_idFiscal.value = id_fiscal;
      clientes_direccion.value = direccion;
      clientes_c_postal.value = c_postal;
      clientes_localidad.value = localidad;
      clientes_pais.value = pais;
      clientes_telefono.value = telefono;
      clientes_movil.value = movil;
      clientes_email.value = email;
  
      if (modalEdit) {
        modalEdit.style.display = "block";
  
        const botonCerrarEdit = document.querySelector("#close_edit");
        if (botonCerrarEdit) {
          botonCerrarEdit.addEventListener("click", function () {
            modalEdit.style.display = "none";
          });
        }
  
        // Event listener para el botón de guardar edición
        const botonGuardarEdit = document.querySelector("#boton_guardar_edicion_edit");
        if (botonGuardarEdit) {
          botonGuardarEdit.addEventListener("click", () => {
            const url = `http://localhost:3000/api/v1/editar_cliente/${id}`;
            fetch(url, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                Tipo_cliente: tipoSelect.value,
                Nombre: clientes_nombre.value,
                Apellidos: clientes_apellidos.value,
                Id_fiscal: clientes_idFiscal.value,
                Direccion: clientes_direccion.value,
                C_postal: clientes_c_postal.value,
                Localidad: clientes_localidad.value,
                Pais: clientes_pais.value,
                Telefono: clientes_telefono.value,
                Movil: clientes_movil.value,
                Email: clientes_email.value,
              }),
            })
              .then((response) => {
                if (!response.ok) {
                  throw new Error("Error al editar el cliente");
                }
                return response.json();
              })
              .then((data) => {
                swal({
                  title: "¡Cliente editado correctamente!",
                  text: "Los cambios se han guardado exitosamente.",
                  icon: "success",
                });
                setTimeout(() => {
                  location.reload();
                }, 3000);
              })
              .catch((error) => {
                swal("Error al editar el cliente", error.message, "error");
              });
          });
        }
      }
    }
  });
