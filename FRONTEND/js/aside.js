 function botonToggle() {
    // Event listener para el botón toggle
    const botonToggle = document.querySelector('.toggle_boton');
    botonToggle.addEventListener('click', () => {
        document.getElementById('izq').classList.toggle('active');

    });
}


