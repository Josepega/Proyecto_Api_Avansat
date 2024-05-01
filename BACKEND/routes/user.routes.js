const conexionMySQL = require("../conexionMySQL");const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

// Configurar middleware para analizar el cuerpo de las solicitudes
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// Requiere el módulo MySQL

// Definir la ruta para la autenticación de usuarios
router.post("/login", (req, res) => {
    const email = req.body.Email;
    const password = req.body.Password;
  
    // Consulta SQL para verificar las credenciales en la base de datos
    const sqlQuery = "SELECT Id_usuario, Nombre FROM usuarios WHERE Email = ? AND Password = ?";
    conexionMySQL.query(sqlQuery, [email, password], (err, results) => {
      if (err) {
        // Error al ejecutar la consulta
        console.error("Error en la consulta:", err);
        res.status(500).json({ error: "Error en el servidor" });
        return;
      }
  
      if (results.length > 0) {
        // Credenciales válidas, enviar respuesta de autenticación exitosa
        const userId = results[0].Id_usuario;
        const userName = results[0].Nombre;
        res.json({ authenticated: true, userId: userId, userName: userName });
      } else {
        // Credenciales inválidas, enviar respuesta de autenticación fallida
        res.json({ authenticated: false });
      }
    });
  });
  
module.exports = router;
