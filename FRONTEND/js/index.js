var form = document.getElementById("loginForm");
var emailInput = document.getElementById("email");
var passwordInput = document.getElementById("password");

// Función para mostrar mensaje de error y recargar la página
function showErrorAndReload(message) {
    swal.fire({
        title: "Error",
        text: message,
        icon: "error",
        iconColor: "#e6381c",
        confirmButtonColor: "#0798c4",
    });
    setTimeout(() => {
        location.reload();
    }, 2000); // Recargar la página después de 3 segundos
}
function showSuccessAndReload(message) {
    swal.fire({
        title: "Autenticación exitosa",
        text: message,
        icon: "success",
        iconColor: "#0798c4",
        confirmButtonColor: "#0798c4",
    }).then(() => {
        setTimeout(() => {
            location.reload();
        }, 2000); // Recargar la página después de 2 segundos
    });
}

// Función para validar el formulario
function formValidate(form) {
    const emailValue = emailInput.value.trim();
    const passwordValue = passwordInput.value.trim();

    if (emailValue === "" || passwordValue === "") {
        showErrorAndReload("Por favor, completa todos los campos.");
        return false;
    }

    return true;
}

// Evento de envío del formulario
form.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevenir envío del formulario
  
    if (!formValidate(form)) return;

    if (passwordInput.value.trim().length < 3) {
        passwordInput.classList.add("error");
        showErrorAndReload("La contraseña debe tener al menos 3 caracteres.");
        return;
    }

    fetch("http://localhost:3000/api/v1/login", {
        method: "POST",
        body: JSON.stringify({
            Email: emailInput.value,
            Password: passwordInput.value
        }),
        headers: {
            "Content-Type": "application/json"
        }
    }).then((res) => {
        if (!res.ok) {
            throw new Error("Error en la solicitud.");
        }
        return res.json();
    }).then((data) => {
        console.log(data);
        if (data.authenticated) {
            // Guardar el nombre de usuario en el localStorage
        localStorage.setItem("usuario", data.userName);
        // Llamar a la función para obtener y mostrar el nombre de usuario en el nav
        
            showSuccessAndReload("Bienvenido  : " + data.userName);
            // Redireccionar a index2.html después de 2 segundos
            setTimeout(() => {
                window.location.href = "index2.html";
            }, 3000);
        } else {
            showErrorAndReload("Autenticación fallida");
        }
    }).catch((error) => {
        showErrorAndReload("Error en la autenticación: " + error.message);
    });
});
