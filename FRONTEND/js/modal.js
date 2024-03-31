
var modal = document.querySelector(".myModal");

// Get all the buttons that open the modal
var openModalButtons = document.querySelectorAll("#boton_clientes_alta");

// Get the <span> element that closes the modal
var closeModalButton = document.querySelector("#close");

// Function to open the modal
function openModal() {
    modal.style.display = "block";
}

// Function to close the modal
function closeModal() {
    modal.style.display = "none";
}

// Iterate over each button and add event listener to open the modal
openModalButtons.forEach(function(button) {
    button.addEventListener("click", openModal);
});

// Add event listener to close the modal when the close button is clicked
closeModalButton.addEventListener("click", closeModal);
