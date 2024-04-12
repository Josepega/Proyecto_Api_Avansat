const express = require("express");
const router = express.Router();
const conexionMySQL = require("../conexionMySQL");

/* -----------------------------------------------------------FACTURAS---------------------------------------------------------------------------------------------------------------- */

// RUTAS: ALTA FACTURA
router.post("/alta_factura", (req, res) => {
  try {
    const data = {
      Fecha_alta: req.body.Fecha_alta,    
      Cliente: req.body.Id_cliente,
      Fecha_vencimiento: req.body.Fecha_vencimiento,
      Estado: req.body.Estado,
      Base_imponible: req.body.Base_imponible,
      Total: req.body.Total
    };
     

    const sql = "INSERT INTO  facturas SET Id_factura = DEFAULT, ?";
    conexionMySQL.query(sql, data, (error, result) => {
      if (error) {
        res.status(400).json({
          status: 400,
          mensaje: "Error al insertar la nueva factura",
          error: error
        });
      } else {
        res.status(200).json({
          status: 200,
          mensaje: "Factura insertada correctamente"
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
router.get('/listado_facturas', (req,res)=>{
  conexionMySQL.query('SELECT * FROM facturas', (error,filas)=>{
      if(error){
          throw error
      }else{
          res.json(filas)
      }
  })
})

// RUTAS: BORRAR FACTURAS
router.delete("/borrar_factura/:id", (req,res)=>{
  conexionMySQL.query('DELETE FROM facturas WHERE Id_factura = ?', [req.params.id], function(error, filas){
      if(error){
          throw error
      }else{              
          res.json(filas)
      }
  })
})

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
/* 
 // RUTAS: LISTADO DE STOCK Y SERVICIOS
router.get('/listado_facturas', (req, res) => {
  try {
    // Consulta a la tabla de stock
    conexionMySQL.query('SELECT * FROM facturas', (errorStock, filasStock) => {
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
 */


module.exports = router;
