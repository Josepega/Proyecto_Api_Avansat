const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 3000; 
const api = express();

api.use(express.json());
api.use(cors());
api.use('/api/v1', require('./routes/app.routes.js'));
// go to: http://localhost:3000/api-docs/ for api documentation
require("./swagger/swagger.config.js")(api);

// PUERTO EN ESCUCHA
api.listen(port, () => {
  console.log(`Servidor arrancado y escuchando por el puerto: ${port}`); 
});