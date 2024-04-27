const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 3000;
const api = express();

const generatePDF = require("./generatePDF");


api.use(express.json());
api.use(cors());
api.use('/api/v1', require('./routes/app.routes.js'));
api.use('/api/v1', require('./routes/clientes.routes.js'));
api.use('/api/v1', require('./routes/servicios.routes.js'));
api.use('/api/v1', require('./routes/facturas.routes.js'));
api.use('/api/v1', require('./routes/stock.routes.js'));
api.use('/api/v1', require('./routes/presupuestos.routes.js'));
api.use('/api/v1', require('./routes/user.routes.js'));





api.use("/generatePDF" , async (req, res) => {
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





// go to: http://localhost:3000/api-docs/ for api documentation
require("./swagger/swagger.config.js")(api);




api.use(express.urlencoded({ extended: true }));
api.use(express.json());

api.post('/savePDF', (req, res) => {
    const pdfData = req.body.pdf;

    // Guardar el PDF en el sistema de archivos
    const fs = require('fs');
    fs.writeFileSync('factura.pdf', pdfData);

    res.send('PDF guardado correctamente');
});

api.listen(3000, () => {
    console.log('Servidor iniciado en el puerto 3000');
});
