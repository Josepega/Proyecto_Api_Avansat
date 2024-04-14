const express = require("express");
const router = express.Router();
const conexionMySQL = require("../conexionMySQL");


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

/* router.post("/generatePDF" , async (req, res) => {
  const pdfBuffer = await generatePDF({
    url: req.body.url
  })
  res
    .status(200)
    .set({
      "Acces-Control-Allow-Origin": "*",
      "Acces-Control-Allow-Credentials": true,
      "Content-Type": "application/pdf",
    })
    .end(pdfBuffer);
});

 */






module.exports = router;
