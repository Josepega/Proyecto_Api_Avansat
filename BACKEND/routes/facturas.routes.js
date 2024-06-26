const express = require("express");
const router = express.Router();
const conexionMySQL = require("../conexionMySQL");



router.post("/alta_factura", (req, res) => {
  const { Fecha_alta, Id_cliente, Albaran, Fecha_vencimiento, Estado, Forma_pago, Base_imponible, Total } = req.body;
  const detalleFactura = JSON.parse(req.body.detalleFactura);

  // Verificar si hay stock suficiente para cada producto
  const sinStock = detalleFactura.some(detalle => detalle.Cantidad <= 0 || detalle.stock_Id_stock <= 0);

  if (sinStock) {
    // Mostrar alerta de SweetAlert si hay productos sin stock
    return res.json({ "status": 400, "mensaje": "Algunos productos no tienen stock disponible." });
  }

  conexionMySQL.beginTransaction(function(err) {
    if (err) { throw err; }
    
    const sqlFactura = `INSERT INTO facturas (Fecha_alta, Id_cliente, Albaran, Fecha_vencimiento, Estado, Forma_pago, Base_imponible, Total) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    conexionMySQL.query(sqlFactura, [Fecha_alta, Id_cliente, Albaran, Fecha_vencimiento, Estado, Forma_pago, Base_imponible, Total], (error, resultadoFactura) => {
      if (error) {
        return conexionMySQL.rollback(function() {
          return res.json({ "status": 500, "mensaje": "Error al crear la factura en el servidor. Error: " + error });
        });
      }

      const idFactura = resultadoFactura.insertId;

      const sqlDetalleFactura = `INSERT INTO detalle_factura (facturas_Id_factura, facturas_Id_cliente, Cantidad, stock_Id_stock, Codigo) VALUES ?`;
      const valoresDetalleFactura = detalleFactura.map(detalle => [idFactura, detalle.Id_cliente, detalle.Cantidad, detalle.stock_Id_stock, detalle.Codigo]);

      conexionMySQL.query(sqlDetalleFactura, [valoresDetalleFactura], (error, resultadoDetalle) => {
        if (error) {
          return conexionMySQL.rollback(function() {
            return res.json({ "status": 500, "mensaje": "Error al asociar detalles a la factura en el servidor. Error: " + error });
          });
        }

        // Actualizar el stock
        const sqlActualizarStock = `UPDATE stock SET Cantidad = Cantidad - ? WHERE Id_stock = ?`;
        detalleFactura.forEach(detalle => {
          conexionMySQL.query(sqlActualizarStock, [detalle.Cantidad, detalle.stock_Id_stock], (error, resultadoStock) => {
            if (error) {
              return conexionMySQL.rollback(function() {
                return res.json({ "status": 500, "mensaje": "Error al actualizar el stock en el servidor. Error: " + error });
              });
            }
          });
        });

        conexionMySQL.commit(function(err) {
          if (err) {
            return conexionMySQL.rollback(function() {
              return res.json({ "status": 500, "mensaje": "Error al realizar el commit en el servidor. Error: " + err });
            });
          }
          return res.json({ "status": 200, "mensaje": "Factura creada exitosamente." });
        });
      });
    });
  });
});


/* // RUTAS: LISTADO DE FACTURAS
router.get('/listado_facturas/', (req,res)=>{
  conexionMySQL.query('SELECT * FROM facturas', (error,filas)=>{
      if(error){
          throw error
      }else{
          res.json(filas)
      }
  })
}) */
// RUTA PARA OBTENER LOS DETALLES BÁSICOS DE LA FACTURA
router.get("/listado_facturas_detalle/:idFactura", (req, res) => {
  const idFactura = req.params.idFactura;

  // Consultar la base de datos para obtener los detalles básicos de la factura
  const sqlFactura = `
    SELECT c.Nombre, c.Apellidos, c.Id_fiscal, c.Direccion, c.C_postal, c.Localidad, c.Pais, f.Base_imponible, f.Total,f.Forma_pago, f.Id_factura,f.Fecha_vencimiento, f.Fecha_alta, f.Albaran
    FROM clientes c
    JOIN facturas f ON c.Id_cliente = f.Id_cliente
    WHERE f.Id_factura = ?
  `;

  conexionMySQL.query(sqlFactura, idFactura, (error, factura) => {
    if (error) {
      return res.status(500).json({ error: "Error al obtener los detalles de la factura." });
    }

    if (factura.length === 0) {
      return res.status(404).json({ error: "No se encontraron detalles para la factura especificada." });
    }

    res.json(factura[0]);
  });
});


// RUTA PARA OBTENER LOS DETALLES DE LOS PRODUCTOS DE LA FACTURA

router.get("/listado_detalles_factura/:idFactura", (req, res) => {
  const idFactura = req.params.idFactura;
  console.log("ID de la factura recibida:", idFactura); // Agregar esta línea para imprimir la ID de la factura

  // Consultar la base de datos para obtener los detalles de los productos asociados a la factura
  const sqlDetalles = `
    SELECT df.Cantidad, s.Nombre AS Nombre_Producto, s.Precio_venta, s.Codigo
    FROM detalle_factura df
    INNER JOIN stock s ON df.stock_Id_stock = s.Id_stock
    WHERE df.facturas_Id_factura = ?
  `;

  conexionMySQL.query(sqlDetalles, idFactura, (error, detalles) => {
    if (error) {
      return res.status(500).json({ error: "Error al obtener los detalles asociados a la factura." });
    }

    res.json(detalles);
  });
});





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

// Ruta para obtener los datos de una factura con sus detalles
router.get('/datos_leer_factura/:idFactura', (req, res) => {
  const idFactura = req.params.idFactura;

  // Consulta SQL para obtener los datos de la factura con sus detalles
  const query = `
      SELECT 
          f.Id_factura,
          f.Fecha_alta,
          f.Id_cliente,
          c.Nombre AS Nombre_cliente,
          c.Apellidos AS Apellidos_cliente,
          c.Id_fiscal AS Id_fiscal_cliente,
          c.Direccion AS Direccion_cliente,
          c.C_postal AS C_postal_cliente,
          c.Localidad AS Localidad_cliente,
          c.Pais AS Pais_cliente,
          c.Telefono AS Telefono_cliente,
          c.Movil AS Movil_cliente,
          c.Email AS Email_cliente,
          f.Albaran,
          f.Fecha_vencimiento,
          f.Estado,
          f.Forma_pago,
          f.Base_imponible,
          f.Total,
          df.Cantidad AS Cantidad_detalle,
          s.Codigo AS Codigo_stock,
          s.Nombre AS Nombre_stock,
          s.Precio_venta AS Precio_venta_stock,
          s.Precio_venta_iva AS Precio_venta_iva_stock
      FROM
          facturas f
              INNER JOIN
          clientes c ON f.Id_cliente = c.Id_cliente
              INNER JOIN
          detalle_factura df ON f.Id_factura = df.facturas_Id_factura
              AND f.Id_cliente = df.facturas_Id_cliente
              INNER JOIN
          stock s ON df.stock_Id_stock = s.Id_stock
      WHERE
          f.Id_factura = ?`;

  // Ejecutar la consulta SQL con el ID de la factura proporcionado
  conexionMySQL.query(query, [idFactura], (error, results) => {
      if (error) {
          console.error('Error al obtener los datos de la factura:', error);
          res.status(500).json({ error: 'Error al obtener los datos de la factura' });
      } else {
          // Devolver los resultados como JSON
          res.json(results);
      }
  });
});


// Ruta para actualizar los datos de una factura
router.put('/editar_datos_factura/:idFactura', (req, res) => {
  const idFactura = req.params.idFactura;
  const nuevosDatos = req.body; // Suponiendo que los nuevos datos se envían en el cuerpo de la solicitud
console.log('Datos recibidos para actualizar factura:', nuevosDatos);
  // Campos que pueden ser actualizados
  const { Fecha_alta, Albaran, Fecha_vencimiento, Estado, Forma_pago, Base_imponible, Total } = nuevosDatos;

  // Consulta SQL para actualizar los datos de la factura, excluyendo el campo Id_cliente
const query = `
UPDATE facturas
SET Fecha_alta = ?, Albaran = ?, Fecha_vencimiento = ?, Estado = ?, Forma_pago = ?, Base_imponible = ?, Total = ?
WHERE Id_factura = ?`;

// Ejecutar la consulta SQL con los nuevos datos y el ID de la factura proporcionado
conexionMySQL.query(query, [Fecha_alta, Albaran, Fecha_vencimiento, Estado, Forma_pago, Base_imponible, Total, idFactura], (error, results) => {
if (error) {
    console.error('Error al actualizar los datos de la factura:', error);
    res.status(500).json({ error: 'Error al actualizar los datos de la factura' });
} else {
    res.json({ message: 'Datos de la factura actualizados correctamente' });
}
});

  });


  // RUTAS: EDITAR FACTURAS
  
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

// RUTA PARA NOMBRE CLIENTE EN FACTURAS

router.get('/listado_facturas/', (req, res) => {
  // Consulta SQL para obtener el nombre y el apellido del cliente asociado a cada factura
  const query = `
    SELECT f.Id_factura, f.Fecha_alta, f.Fecha_vencimiento, f.Forma_pago, CONCAT(c.Nombre, ' ', c.Apellidos) AS nombreCliente, f.Base_imponible, f.Total, f.Estado
    FROM facturas f
    INNER JOIN clientes c ON f.Id_cliente = c.Id_cliente;
  `;

  // Ejecutar la consulta SQL
  conexionMySQL.query(query, (error, results) => {
    if (error) {
      console.error('Error al obtener los detalles de la factura:', error);
      res.status(500).json({ error: 'Error al obtener los detalles de la factura' });
    } else {
      // Devolver los resultados de la consulta como respuesta
      res.json(results);
    }
  });
});

// LISTADO 5 FACTURAS Y TOTAL FACTURADO

// Endpoint para obtener las últimas 5 facturas y el total facturado
router.get('/facturas_ultimas', (req, res) => {
  // Consulta para obtener las últimas 5 facturas
  const queryUltimasFacturas = `
    SELECT Id_factura, Fecha_alta, Estado, Total
    FROM facturas
    ORDER BY Fecha_alta DESC
    LIMIT 3
  `;

  // Consulta para obtener el total facturado
  const queryTotalFacturado = `
    SELECT SUM(Total) AS total_facturado
    FROM facturas
  `;

  // Ejecutar ambas consultas en paralelo
  conexionMySQL.query(queryUltimasFacturas, (errUltimas, resultUltimas) => {
    if (errUltimas) {
      console.error('Error al obtener las últimas facturas:', errUltimas);
      res.status(500).send('Error al obtener las últimas facturas');
      return;
    }

    conexionMySQL.query(queryTotalFacturado, (errTotal, resultTotal) => {
      if (errTotal) {
        console.error('Error al obtener el total facturado:', errTotal);
        res.status(500).send('Error al obtener el total facturado');
        return;
      }

      // Enviar respuesta con los resultados
      res.json({
        ultimas_facturas: resultUltimas,
        total_facturado: resultTotal[0].total_facturado
      });
    });
  });
});



module.exports = router;
