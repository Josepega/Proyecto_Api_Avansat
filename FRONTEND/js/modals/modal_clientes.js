

// MODAL
const modal = document.querySelector("#modal_alta_clientes");
const openModalButtons = document.querySelectorAll("#boton_clientes_alta");
const closeModalButton = document.getElementById("close");

function openModal() {
  modal.style.display = "block";
  const tipoCliente = document.getElementById("tipo");
  const clienteEmpresa = document.getElementById("cliente_empresa");
  const clientePersona = document.getElementById("cliente_persona");

  if (tipoCliente.value === "Empresa") {
    clienteEmpresa.style.display = "block";
    clientePersona.style.display = "none";
  } else {
    clienteEmpresa.style.display = "none";
    clientePersona.style.display = "block";
  }

  tipoCliente.addEventListener("change", () => {
    if (tipoCliente.value === "Empresa") {
      clienteEmpresa.style.display = "block";
      clientePersona.style.display = "none";
    } else {
      clienteEmpresa.style.display = "none";
      clientePersona.style.display = "block";
    }
  });
}

function  closeModal() {
  modal.style.display = "none";
}

openModalButtons.forEach(function (element) {
  element.addEventListener("click", openModal);
});

closeModalButton.addEventListener("click", closeModal);



// MODAL EDIT
const modal_edit = document.querySelector("#modal_editar_clientes");
const openModalButtons_edit = document.querySelectorAll(".editar-icono");
const closeModalButton_edit = document.querySelector("#close_edit");
const tipoCliente_edit = document.getElementById("tipo_edit");
const clienteEmpresa_edit = document.getElementById("cliente_empresa_edit");
const clientePersona_edit = document.getElementById("cliente_persona_edit");

function openModal_edit() {
  modal_edit.style.display = "block";


  if (tipoCliente_edit.value === "Empresa") {
    clienteEmpresa_edit.style.display = "block";
    clientePersona_edit.style.display = "none";
  } else {
    clienteEmpresa_edit.style.display = "none";
    clientePersona_edit.style.display = "block";
  }

  tipoCliente_edit.addEventListener("change", () => {
    if (tipoCliente_edit.value === "Empresa") {
      clienteEmpresa_edit.style.display = "block";
      clientePersona_edit.style.display = "none";
    } else {
      clienteEmpresa_edit.style.display = "none";
      clientePersona_edit.style.display = "block";
    }
  });
}

function closeModal_edit() {
  modal_edit.style.display = "none";
}
closeModalButton_edit.addEventListener("click", closeModal_edit);


openModalButtons_edit.forEach(function (element) {
  element.addEventListener("click", openModal_edit);
});