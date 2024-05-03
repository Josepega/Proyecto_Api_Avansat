const express = require("express");
const router = express.Router();
const conexionMySQL = require("../conexionMySQL");

// RUTAS: ALTA PRESUPUESTO / ALTA DETALLE PRESUPUESTO
router.post("/alta_presupuesto", (req, res) => {
    const { Fecha_alta, Id_cliente, Albaran, Fecha_vencimiento, Estado, Forma_pago, Base_imponible, Total } = req.body;
  
    // Convertir la cadena JSON de detallePresupuesto en un array de objetos
const detallePresupuestos = JSON.parse(req.body.detallePresupuestos);
  
    // Insertar el nuevo presupuesto en la base de datos
    const sqlPresupuestos = `INSERT INTO presupuestos (Fecha_alta, Id_cliente, Albaran, Fecha_vencimiento, Estado, Forma_pago, Base_imponible, Total) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    conexionMySQL.query(sqlPresupuestos, [Fecha_alta, Id_cliente, Albaran, Fecha_vencimiento, Estado, Forma_pago, Base_imponible, Total], (error, resultadoPresupuestos) => {
      if (error) {
        return res.json({ "status": 500, "mensaje": "Error al crear la factura en el servidor. Error: " + error });
      }
  
      const idPresupuesto = resultadoPresupuestos.insertId;
  
      // Insertar el detalle del presupuesto en la base de datos
      const sqlDetallePresupuestos = `INSERT INTO detalle_presupuesto (presupuestos_Id_presupuesto, presupuestos_Id_cliente, Cantidad, stock_Id_stock, Codigo) VALUES ?`;
      const valoresDetallePresupuesto = detallePresupuestos.map(detalle => [idPresupuesto, detalle.presupuestos_Id_cliente, detalle.Cantidad, detalle.stock_Id_stock, detalle.Codigo]);
  
      conexionMySQL.query(sqlDetallePresupuestos, [valoresDetallePresupuesto], (error, resultadoDetalle) => {
        if (error) {
          return res.json({ "status": 500, "mensaje": "Error al asociar detalles del presupuesto en el servidor. Error: " + error });
        }
        return res.json({ "status": 200, "mensaje": "Presupuesto creado exitosamente." });
      });
    });
  });
  
  
  
  
  /* // RUTAS: LISTADO DE PRESUPUESTOS
  router.get('/listado_presupuestos/', (req,res)=>{
    conexionMySQL.query('SELECT * FROM presupuestos', (error,filas)=>{
        if(error){
            throw error
        }else{
            res.json(filas)
        }
    })
  }) */
  // RUTA PARA OBTENER LOS DETALLES BÁSICOS DEL PRESUPUESTO
  router.get("/listado_presupuestos_detalle/:idPresupuesto", (req, res) => {
    const idPresupuesto = req.params.idPresupuesto;
  
    // Consultar la base de datos para obtener los detalles básicos de la factura
    const sqlPresupuestos = `
      SELECT c.Nombre, c.Apellidos, c.Id_fiscal, c.Direccion, c.C_postal, c.Localidad, c.Pais, p.Base_imponible, p.Total, p.Id_presupuesto,p.Fecha_vencimiento, p.Fecha_alta
      FROM clientes c
      JOIN presupuestos p ON c.Id_cliente = p.Id_cliente
      WHERE p.Id_presupuesto = ?
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
      WHERE df.presupuestos_Id_presupuesto = ?
    `;
  
    conexionMySQL.query(sqlDetalles, idPresupuesto, (error, detalles) => {
      if (error) {
        return res.status(500).json({ error: "Error al obtener los detalles asociados al presupuesto." });
      }
  
      res.json(detalles);
    });
  });
  
  
  
  
  
  
  
  // RUTAS: BORRAR PRESUPUESTOS
  router.delete("/borrar_presupuesto/:id", (req,res)=>{
    conexionMySQL.query('DELETE FROM presupuestos WHERE Id_presupuesto = ?', [req.params.id], function(error, filas){
        if(error){
            throw error
        }else{              
            res.json(filas)
        }
    })
  })

// RUTA PARA NOMBRE CLIENTE EN PRESUPUESTO

router.get('/listado_presupuestos/', (req, res) => {
  // Consulta SQL para obtener el nombre y el apellido del cliente asociado a cada factura
  const query = `
    SELECT p.Id_presupuesto, p.Fecha_alta, p.Fecha_vencimiento, p.Forma_pago, CONCAT(c.Nombre, ' ', c.Apellidos) AS nombreCliente, p.Base_imponible, p.Total, p.Estado
    FROM presupuestos p 
    INNER JOIN clientes c ON p.Id_cliente = c.Id_cliente;
  `;

  // Ejecutar la consulta SQL
  conexionMySQL.query(query, (error, results) => {
    if (error) {
      console.error('Error al obtener los detalles del presupuesto:', error);
      res.status(500).json({ error: 'Error al obtener los detalles del presupuesto' });
    } else {
      // Devolver los resultados de la consulta como respuesta
      res.json(results);
    }
  });
});


// LISTADO 5 PRESUPUESTOS Y TOTAL PRESUPUESTADO

// Endpoint para obtener los últimos 5 PRE y el total facturado
router.get('/presupuestos_ultimas', (req, res) => {
  // Consulta para obtener las últimas 5 presupuestos
  const queryUltimosPresupuestos = `
    SELECT Id_presupuesto, Fecha_alta, Estado, Total
    FROM presupuestos
    ORDER BY Fecha_alta DESC
    LIMIT 3
  `;

  // Consulta para obtener el total facturado
  const queryTotalPresupuestos = `
    SELECT SUM(Total) AS total_presupuestos
    FROM presupuestos
  `;

  // Ejecutar ambas consultas en paralelo
  conexionMySQL.query(queryUltimosPresupuestos, (errUltimas, resultUltimas) => {
    if (errUltimas) {
      console.error('Error al obtener los últimos presupuestos:', errUltimas);
      res.status(500).send('Error al obtener los últimos presupuestos');
      return;
    }

    conexionMySQL.query(queryTotalPresupuestos, (errTotal, resultTotal) => {
      if (errTotal) {
        console.error('Error al obtener el total presupuestado:', errTotal);
        res.status(500).send('Error al obtener el total presupuestado');
        return;
      }

      // Enviar respuesta con los resultados
      res.json({
        ultimos_presupuestos: resultUltimas,
        total_presupuestos: resultTotal[0].total_presupuestos
      });
    });
  });
});










module.exports = router;