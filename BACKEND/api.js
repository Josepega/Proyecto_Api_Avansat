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

// PUERTO EN ESCUCHA
api.listen(port, () => {
  console.log(`Servidor arrancado y escuchando por el puerto: ${port}`); 
});