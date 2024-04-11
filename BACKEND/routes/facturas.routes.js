const express = require("express");
const router = express.Router();
const conexionMySQL = require("../conexionMySQL");

/* -----------------------------------------------------------FACTURAS---------------------------------------------------------------------------------------------------------------- */

// RUTAS: ALTA FACTURA
router.post("/alta_factura", (req, res) => {
  try {
    const data = {
      Codigo: req.body.Codigo,
      key: req.body.key,
      Precio_coste: req.body.Precio_coste,
      Precio_coste_iva: req.body.Precio_coste_iva,
      Precio_venta: req.body.Precio_venta,
      Precio_venta_iva: req.body.Precio_venta_iva,
    };

    const sql = "INSERT INTO servicios SET ?";
    conexionMySQL.query(sql, data, (error, result) => {
      if (error) {
        res.status(400).json({
          status: 400,
          mensaje: "Error al insertar Servicio",
          error: error
        });
      } else {
        res.status(200).json({
          status: 200,
          mensaje: "Servicio insertado correctamente"
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      mensaje: "Error en el servidor",
      error: error
    });
  }
});

// RUTAS: LISTADO DE FACTURAS

// RUTAS: BORRAR FACTURAS

// RUTAS: EDITAR FACTURAS
/* 
router.get("/listado_autocomplete:key=key?", async (req, res) => {
  try {
    const key = req.query.key; // Usa req.query.keyid para obtener el parámetro de consulta
    
    // Consultas SQL corregidas con comillas invertidas y cláusula WHERE
    const sqlServicios = `SELECT * FROM servicios`;
    const sqlStock = `SELECT * FROM stock `;

    // Ejecuta las consultas SQL
   const serviciosResult = await conexionMySQL.query(sqlServicios);
    const stockResult = await conexionMySQL.query(sqlStock);

    res.json({
      "status": 200,
      "mensaje": "consulta creada exitosamente",
      "servicios": serviciosResult,
      "stock": stockResult
    });
  } catch (error) {
    res.status(500).json({
      "status": 500,
      "mensaje": "Error al crear la consulta. Error: " + error.message
    });
  }
}); */

 // RUTAS: LISTADO DE STOCK Y SERVICIOS
router.get('/listado_stock_servicios', (req, res) => {
  try {
    // Consulta a la tabla de stock
    conexionMySQL.query('SELECT * FROM stock', (errorStock, filasStock) => {
      if (errorStock) {
        throw errorStock;
      } else {
        // Consulta a la tabla de servicios
        conexionMySQL.query('SELECT * FROM servicios', (errorServicios, filasServicios) => {
          if (errorServicios) {
            throw errorServicios;
          } else {
            // Devolver ambos conjuntos de resultados en un objeto JSON
            res.json({
              "status": 200,
              "mensaje": "Datos obtenidos exitosamente",
              "stock": filasStock,
              "servicios": filasServicios
            });
          }
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      "status": 500,
      "mensaje": "Error al obtener datos. Error: " + error.message
    });
  }
}); 



module.exports = router;
