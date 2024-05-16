const express = require("express");
const cors = require("cors");
const path = require('path');
const generatePDF = require("./generatePDF");

const port = process.env.PORT || 3000;
const api = express();

// Función para actualizar las URLs en los middlewares
const updateMiddlewareURLs = (middleware) => {
  return (req, res, next) => {
    if (req.url.includes('localhost')) {
      req.url = req.url.replace('localhost', 'app.avansat.cat');
    }
    middleware(req, res, next);
  };
};

// Función para actualizar todos los middlewares
const updateAllMiddlewares = (app) => {
  app._router.stack.forEach((layer) => {
    if (layer.route) {
      layer.route.stack.forEach((routeLayer) => {
        routeLayer.handle = updateMiddlewareURLs(routeLayer.handle);
      });
    } else if (layer.name === 'bound dispatch') {
      layer.handle = updateMiddlewareURLs(layer.handle);
    }
  });
};

api.use(express.json());
api.use(cors());
api.use('/api/v1', require('./routes/app.routes.js'));
api.use('/api/v1', require('./routes/clientes.routes.js'));
api.use('/api/v1', require('./routes/servicios.routes.js'));
api.use('/api/v1', require('./routes/facturas.routes.js'));
api.use('/api/v1', require('./routes/stock.routes.js'));
api.use('/api/v1', require('./routes/presupuestos.routes.js'));
api.use('/api/v1', require('./routes/user.routes.js'));

// Middleware para servir archivos estáticos
api.use(express.static(path.join(__dirname, '../frontend')));

// Ruta para servir index.html
api.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/html', 'index.html'));
});

// Ruta para servir index2.html
api.get('/index2.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/html', 'index2.html'));
});

// Ruta para servir nav.html
api.get('/nav.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/html', 'nav.html'));
});

// Ruta para servir servicios.html
api.get('/servicios.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/html', 'servicios.html'));
});

// Ruta para servir stock.html
api.get('/stock.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/html', 'stock.html'));
});

// Ruta para servir aside.html
api.get('/aside.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/html', 'aside.html'));
});

// Ruta para servir clientes.html
api.get('/clientes.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/html', 'clientes.html'));
});

// Ruta para servir facturas.html
api.get('/facturas.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/html', 'facturas.html'));
});

// Ruta para servir presupuestos.html
api.get('/presupuestos.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/html', 'presupuestos.html'));
});

// Ruta para servir presupuestosPDF.html
api.get('/presupuestosPDF.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/html', 'presupuestosPDF.html'));
});

// Ruta para servir facturasPDF.html
api.get('/facturasPDF.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/html', 'facturasPDF.html'));
});

// Middleware para generar PDF
api.use("/generatePDF", async (req, res) => {
  const pdfBuffer = await generatePDF({
    url: req.body.url
  });
  res
    .status(200)
    .set({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
      "Content-Type": "application/pdf",
    })
    .end(pdfBuffer);
});

// Ruta para guardar PDF
api.post('/savePDF', (req, res) => {
    const pdfData = req.body.pdf;

    // Guardar el PDF en el sistema de archivos
    const fs = require('fs');
    fs.writeFileSync('factura.pdf', pdfData);

    res.send('PDF guardado correctamente');
});

// Ruta para la documentación de la API
require("./swagger/swagger.config.js")(api);

// Actualiza todos los middlewares
updateAllMiddlewares(api);

api.listen(port, () => {
    console.log(`Servidor iniciado en el puerto ${port}`);
});
