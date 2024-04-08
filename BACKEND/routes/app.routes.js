const express = require("express");
const router = express.Router();
const conexionMySQL = require("../conexionMySQL");


// MANEJO DE MENSAJES
/* const handleEror = (res, error, mensaje) => {
  console.log(error);
  res.status(500).json({
    status: 500,
    message: `${mensaje}. ${error}`,
  });
}; */

// RUTAS: SALUDO DE PRUEBA
router.get("/Saludo", async (req, res) => {
  try {
    res.status(200).json({ mensaje: "Hola Avansat, bienvenido" });
  } catch (error) {
    handleEror(res, error, "Error en el servidor");
  }
});








module.exports = router;
