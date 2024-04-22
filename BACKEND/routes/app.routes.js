const express = require("express");
const router = express.Router();
const conexionMySQL = require("../conexionMySQL");
const puppeteer = require('puppeteer');
const generatePDF = require('../generatePDF'); // Asegúrate de importar correctamente la función generatePDF


// MANEJO DE MENSAJES
 const handleError = (res, error, mensaje) => {
  console.log(error);
  res.status(500).json({
    status: 500,
    message: `${mensaje}. ${error}`,
  });
};

// RUTAS: SALUDO DE PRUEBA
router.get("/Saludo", async (req, res) => {
  try {
    res.status(200).json({ mensaje: "Hola Avansat, bienvenido" });
  } catch (error) {
    handleError(res, error, "Error en el servidor");
  }
});





// Ruta para generar el PDF
router.post('/generatePDF', async (req, res) => {
  try {
    const { id } = req.body; // Asegúrate de obtener el ID de la solicitud POST
    const pdfBuffer = await generatePDF({ url: `facturasPDF.html?id=${idFactura}` }); // Utiliza el ID en la URL
    res.status(200)
       .set({
         "Access-Control-Allow-Origin": "*",
         "Access-Control-Allow-Credentials": true,
         "Content-Type": "application/pdf",
       })
       .end(pdfBuffer);
  } catch (error) {
    console.error('Error al generar el PDF:', error);
    res.status(500).send('Error al generar el PDF');
  }
});











module.exports = router;
