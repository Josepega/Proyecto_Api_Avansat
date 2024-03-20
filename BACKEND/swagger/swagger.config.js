const swaggerDocument = require('./swagger.docs.js');

module.exports = (api) => {
  // Swagger setup
  const swaggerUi = require('swagger-ui-express');
  api.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  // Documentation in JSON format
  api.get('/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerDocument);
  });   
};