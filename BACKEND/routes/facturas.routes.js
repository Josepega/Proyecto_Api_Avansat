const express = require("express");
const router = express.Router();
const conexionMySQL = require("../conexionMySQL");

/* -----------------------------------------------------------FACTURAS---------------------------------------------------------------------------------------------------------------- */

router.post("/alta_factura", (req, res) => {
  try {
    const facturaData = {
      Fecha_alta: req.body.factura.Fecha_alta,
      Id_cliente: req.body.factura.Id_cliente,
      Albaran: req.body.factura.Albaran,
      Fecha_vencimiento: req.body.factura.Fecha_vencimiento,
      Estado: req.body.factura.Estado,
      Forma_pago: req.body.factura.Forma_pago,
      Base_imponible: req.body.factura.Base_imponible,
      Total: req.body.factura.Total
    };

    const detalles = req.body.detalles;

    conexionMySQL.beginTransaction(function(err) {
      if (err) {
        throw err;
      }

      conexionMySQL.query("INSERT INTO facturas SET ?", facturaData, function(error, result) {
        if (error) {
          return conexionMySQL.rollback(function() {
            res.status(400).json({
              status: 400,
              mensaje: "Error al insertar la nueva factura",
              error: error
            });
          });
        }

        const facturaId = result.insertId;

        const detalleValues = detalles.map(detalle => {
          return [facturaId, detalle.Id_stock];
        });

        conexionMySQL.query("INSERT INTO detalle_factura (Id_factura, Id_stock) VALUES ?", [detalleValues], function(error, result) {
          if (error) {
            return conexionMySQL.rollback(function() {
              res.status(400).json({
                status: 400,
                mensaje: "Error al insertar los detalles de la factura",
                error: error
              });
            });
          }

          conexionMySQL.commit(function(err) {
            if (err) {
              return conexionMySQL.rollback(function() {
                res.status(500).json({
                  status: 500,
                  mensaje: "Error en el servidor",
                  error: err
                });
              });
            }

            res.status(200).json({
              status: 200,
              mensaje: "Factura y detalles insertados correctamente"
            });
          });
        });
      });
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

  // RUTAS: EDITAR STOCK
  
  router.put("/editar_facturas/:idFactura", async (req, res) => {
    try {
        let Id_stock  = req.params.idStock;
        let codigo =req.body.codigo;
        let cantidad = req.body.cantidad;
        let nombre = req.body.nombre;
        let precio_coste = req.body.precio_coste;
        let precio_coste_iva = req.body.precio_coste_iva;
        let precio_venta = req.body.precio_venta;
        let precio_venta_iva = req.body.precio_venta_iva;
      
      
  
    
      // Realizar la actualización en la base de datos
      let sql = "UPDATE stock SET codigo = ?, cantidad = ?, nombre = ?, precio_coste = ?, precio_coste_iva = ?, precio_venta = ?, precio_venta_iva = ? WHERE Id_stock = ?";
      conexionMySQL.query(sql, [codigo, cantidad, nombre, precio_coste, precio_coste_iva, precio_venta, precio_venta_iva, Id_stock]);
  
      res.json("Stock actualizado correctamente");
    } catch (error) {
      console.error("Error en la edición del stock:", error);
      res.status(500).send("Error en la edición del stock");
    }
  });
module.exports = router;
