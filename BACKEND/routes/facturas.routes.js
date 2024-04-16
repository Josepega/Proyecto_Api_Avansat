const express = require("express");
const router = express.Router();
const conexionMySQL = require("../conexionMySQL");

/* -----------------------------------------------------------FACTURAS---------------------------------------------------------------------------------------------------------------- */


/* // RUTAS: ALTA FACTURA
router.post("/alta_factura", (req, res) => {
  try {
    const data = {
      Fecha_alta: req.body.Fecha_alta,    
      Id_cliente: req.body.Id_cliente,
      Albaran: req.body.Albaran,
      Fecha_vencimiento: req.body.Fecha_vencimiento,
      Estado: req.body.Estado,
      Forma_pago: req.body.Forma_pago,
      Base_imponible: req.body.Base_imponible,
      Total: req.body.Total
    };

    const sql = "INSERT INTO facturas SET ?";
    conexionMySQL.query(sql, data, (error, result) => {
      if (error) {
        res.status(400).json({
          status: 400,
          mensaje: "Error al insertar la nueva factura",
          error: error
        });
      } else {
        const Id_factura = result.insertId; // Obtén el Id_factura insertado
        res.status(200).json({
          status: 200,
          mensaje: "Factura insertada correctamente",
          Id_factura: Id_factura // Envía el Id_factura insertado en la respuesta
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
}); */

// RUTAS: ALTA DETALLE FACTURA
router.post("/alta_factura", (req, res) => {
  const { Fecha_alta, Id_cliente, Albaran, Fecha_vencimiento, Estado, Forma_pago, Base_imponible, Total } = req.body;

  // Convertir la cadena JSON de detalleFactura en un array de objetos
  const detalleFactura = JSON.parse(req.body.detalleFactura);

  // Insertar la nueva factura en la base de datos
  const sqlFactura = `INSERT INTO facturas (Fecha_alta, Id_cliente, Albaran, Fecha_vencimiento, Estado, Forma_pago, Base_imponible, Total) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  conexionMySQL.query(sqlFactura, [Fecha_alta, Id_cliente, Albaran, Fecha_vencimiento, Estado, Forma_pago, Base_imponible, Total], (error, resultadoFactura) => {
    if (error) {
      return res.json({ "status": 500, "mensaje": "Error al crear la factura en el servidor. Error: " + error });
    }

    const idFactura = resultadoFactura.insertId;

    // Insertar el detalle de la factura
    const sqlDetalleFactura = `INSERT INTO detalle_factura (facturas_Id_factura, facturas_Id_cliente, Cantidad, stock_Id_stock) VALUES ?`;
    const valoresDetalleFactura = detalleFactura.map(detalle => [idFactura, detalle.Id_cliente, detalle.Cantidad, detalle.stock_Id_stock]);

    conexionMySQL.query(sqlDetalleFactura, [valoresDetalleFactura], (error, resultadoDetalle) => {
      if (error) {
        return res.json({ "status": 500, "mensaje": "Error al asociar detalles a la factura en el servidor. Error: " + error });
      }
      return res.json({ "status": 200, "mensaje": "Factura creada exitosamente." });
    });
  });
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
