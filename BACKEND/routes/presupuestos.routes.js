const express = require("express");
const router = express.Router();
const conexionMySQL = require("../conexionMySQL");

// RUTAS: ALTA PRESUPUESTO / ALTA DETALLE PRESUPUESTO
router.post("/alta_presupuesto", (req, res) => {
    const { Fecha_alta, Id_cliente, Albaran, Fecha_vencimiento, Estado, Forma_pago, Base_imponible, Total } = req.body;
  
    // Convertir la cadena JSON de detallePresupuesto en un array de objetos
    const detallePresupuesto = JSON.parse(req.body.detallePresupuesto);
  
    // Insertar el nuevo presupuesto en la base de datos
    const sqlFactura = `INSERT INTO presupuestos (Fecha_alta, Id_cliente, Albaran, Fecha_vencimiento, Estado, Forma_pago, Base_imponible, Total) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    conexionMySQL.query(sqlPresupuestos, [Fecha_alta, Id_cliente, Albaran, Fecha_vencimiento, Estado, Forma_pago, Base_imponible, Total], (error, resultadoFactura) => {
      if (error) {
        return res.json({ "status": 500, "mensaje": "Error al crear la factura en el servidor. Error: " + error });
      }
  
      const idPresupuesto = resultadoPresupuestos.insertId;
  
      // Insertar el detalle del presupuesto en la base de datos
      const sqlDetallePresupuesto = `INSERT INTO detalle_factura (facturas_Id_factura, facturas_Id_cliente, Cantidad, stock_Id_stock, Codigo) VALUES ?`;
      const valoresDetallePresupuesto = detallePresupuesto.map(detalle => [idPresupuesto, detalle.Id_cliente, detalle.Cantidad, detalle.stock_Id_stock, detalle.Codigo]);
  
      conexionMySQL.query(sqlDetallePresupuesto, [valoresDetallePresupuesto], (error, resultadoDetalle) => {
        if (error) {
          return res.json({ "status": 500, "mensaje": "Error al asociar detalles del presupuesto en el servidor. Error: " + error });
        }
        return res.json({ "status": 200, "mensaje": "Presupuesto creado exitosamente." });
      });
    });
  });
  
  
  
  
  // RUTAS: LISTADO DE PRESUPUESTOS
  router.get('/listado_presupuestos/', (req,res)=>{
    conexionMySQL.query('SELECT * FROM presupuestos', (error,filas)=>{
        if(error){
            throw error
        }else{
            res.json(filas)
        }
    })
  })
  // RUTA PARA OBTENER LOS DETALLES BÁSICOS DE LA FACTURA
  router.get("/listado_presupuestos_detalle/:idPresupuesto", (req, res) => {
    const idPresupuesto = req.params.idPresupuesto;
  
    // Consultar la base de datos para obtener los detalles básicos de la factura
    const sqlPresupuestos = `
      SELECT c.Nombre, c.Apellidos, c.Id_fiscal, c.Direccion, c.C_postal, c.Localidad, c.Pais, f.Base_imponible, f.Total, f.Id_presupuesto,
      FROM clientes c
      JOIN presupuestos f ON c.Id_cliente = f.Id_cliente
      WHERE f.Id_presupuesto = ?
    `;
  
    conexionMySQL.query(sqlPresupuestos, idPresupuesto, (error, presupuesto) => {
      if (error) {
        return res.status(500).json({ error: "Error al obtener los detalles del presupuesto." });
      }
  
      if (presupuesto.length === 0) {
        return res.status(404).json({ error: "No se encontraron detalles para el presupuesto especificado." });
      }
  
      res.json(presupuesto[0]);
    });
  });
  // RUTA PARA OBTENER LOS DETALLES DE LOS PRODUCTOS DEL PRESUPUESTO
  
  router.get("/listado_detalles_presupuestos/:idPresupuesto", (req, res) => {
    const idPresupuesto = req.params.idPresupuesto;
    console.log("ID del presupuesto recibido:", idPresupuesto); // Agregar esta línea para imprimir la ID del presupuesto   
  
    // Consultar la base de datos para obtener los detalles de los productos asociados a la factura
    const sqlDetalles = `
      SELECT df.Cantidad, s.Nombre AS Nombre_Producto, s.Precio_venta, s.Codigo
      FROM detalle_presupuesto df
      INNER JOIN stock s ON df.stock_Id_stock = s.Id_stock
      WHERE df.presupuesto_Id_presupuesto = ?
    `;
  
    conexionMySQL.query(sqlDetalles, idPresupuesto, (error, detalles) => {
      if (error) {
        return res.status(500).json({ error: "Error al obtener los detalles asociados al presupuesto." });
      }
  
      res.json(detalles);
    });
  });
  
  
  
  
  
  
  
  // RUTAS: BORRAR FACTURAS
  router.delete("/borrar_presupuesto/:id", (req,res)=>{
    conexionMySQL.query('DELETE FROM presupuestos WHERE Id_presupuesto = ?', [req.params.id], function(error, filas){
        if(error){
            throw error
        }else{              
            res.json(filas)
        }
    })
  })





/* -----------------------------------------------------------PRESUPUESTOS---------------------------------------------------------------------------------------------------------------- */

// RUTAS: ALTA PRESUPUESTO 


// RUTAS: LISTADO DE PRESUPUESTOS


// RUTAS: BORRAR PRESUPUESTOS


// RUTAS: EDITAR PRESUPUESTOS




module.exports = router;