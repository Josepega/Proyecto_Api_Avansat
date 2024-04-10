const express = require("express");
const router = express.Router();
const conexionMySQL = require("../conexionMySQL");

/* -----------------------------------------------------------FACTURAS---------------------------------------------------------------------------------------------------------------- */

// RUTAS: ALTA FACTURA
router.post("/alta_factura", (req, res) => {
  try {
    const data = {
      Codigo: req.body.Codigo,
      Nombre: req.body.Nombre,
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

router.get("/listado_autocomplete", async (req, res) => {
  try {
    const key = req.params.key;

    const sqlServicios = SELECT * FROM servicios WHERE id_servicios = ${key};;
    await conexionMySQL.query(sqlServicios);
    const sqlStock = SELECT * FROM stock WHERE id_stock = ${key};;
    await conexionMySQL.query(sqlStock);
    res.json({
      "status": 200,
      "mensaje": "consulta creada exitosamente"
    });
  } catch (error) {
    res.json({
      "status": 500,
      "mensaje": "Error al crear la consulta. Error:" + error
    });
  }
 
});




module.exports = router;
