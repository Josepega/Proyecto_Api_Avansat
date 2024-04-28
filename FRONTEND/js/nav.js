function cerrarSesion() {
    document.getElementById("logoutButton").addEventListener("click", () => {
        // Mostrar alerta de confirmación con SweetAlert
        swal.fire({
            title: "¿Cerrar sesión?",
            text: "¿Estás seguro de que deseas cerrar sesión?",
            icon: "warning",
            iconColor: "#e6381c",
            showCancelButton: true,
            confirmButtonColor: "#0798c4", 
            cancelButtonColor: "#e6381c",
            confirmButtonText: "Aceptar",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            // Si el usuario confirma, realizar acciones de cierre de sesión
            if (result.isConfirmed) {
                // Limpiar cualquier información de sesión almacenada
                localStorage.removeItem("token");
                localStorage.removeItem("usuario");
                // Redirigir al usuario a la página de inicio de sesión
                window.location.href = "index.html"; // Cambia "index.html" por la URL de tu página de inicio de sesión
            }
        });
    });

}


function obtenerNombreUser() {
    const nombreUsuario = localStorage.getItem("usuario");

// Verificar si el nombre de usuario existe y no es nulo
if (nombreUsuario) {
    // Si existe, mostrar el nombre de usuario en el nav
    document.getElementById("container_login").textContent = nombreUsuario;
} else {
    // Si no existe, mostrar un mensaje de error o realizar alguna acción predeterminada
    console.error("Nombre de usuario no encontrado en el localStorage.");
}
}