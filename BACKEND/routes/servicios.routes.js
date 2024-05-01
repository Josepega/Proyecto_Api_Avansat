const express = require("express");
const router = express.Router();
const conexionMySQL = require("../conexionMySQL");


/* -----------------------------------------------------------SERVICIOS---------------------------------------------------------------------------------------------------------------- */

// RUTAS: ALTA SERVICIO

router.post("/alta_servicio", (req, res) => {
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
  
  // RUTAS: LISTADO DE SERVICIOS
  router.get('/listado_servicios', (req,res)=>{
    conexionMySQL.query('SELECT * FROM servicios', (error,filas)=>{
        if(error){
            throw error
        }else{
            res.json(filas)
        }
    })
  })
  
  // RUTAS: BORRAR SERVICIOS
  router.delete("/borrar_servicio/:id", (req,res)=>{
    conexionMySQL.query('DELETE FROM servicios WHERE Id_servicio = ?', [req.params.id], function(error, filas){
        if(error){
            throw error
        }else{              
            res.json(filas)
        }
    })
  })
  
  // RUTAS: EDITAR SERVICIOS
  
  router.put("/editar_servicio/:idservicio", async (req, res) => {
    try {
        let id_servicio  = req.params.idservicio;
        let codigo =req.body.codigo;
        let nombre = req.body.nombre;
        let precio_coste = req.body.precio_coste;
        let precio_coste_iva = req.body.precio_coste_iva;
        let precio_venta = req.body.precio_venta;
        let precio_venta_iva = req.body.precio_venta_iva;
      
  
    
      // Realizar la actualización en la base de datos
      let sql = "UPDATE servicios SET codigo = ?, nombre = ?, precio_coste = ?, precio_coste_iva = ?, precio_venta = ?, precio_venta_iva = ? WHERE Id_servicio = ?";
      conexionMySQL.query(sql, [codigo, nombre, precio_coste, precio_coste_iva, precio_venta, precio_venta_iva, id_servicio]);
  
      res.json("Servicio actualizado correctamente");
    } catch (error) {
      console.error("Error en la edición del Servicio:", error);
      res.status(500).send("Error en la edición del Servicio");
    }
  });
  
  // LISTADO 5 ULTIMOS SERVICIOS

// Endpoint para obtener las últimas 5 facturas y el total facturado
router.get('/servicios_ultimos', (req, res) => {
  // Consulta para obtener las últimas 5 facturas
  const queryUltimosServicios = `
    SELECT Codigo, Nombre, Precio_coste
    FROM servicios
    ORDER BY Id_servicio DESC
    LIMIT 3
  `;

  // Consulta para obtener el total facturado
  const queryTotalServicios = `
  SELECT SUM(Precio_venta_iva) AS total_servicios
  FROM servicios
  `;

  // Ejecutar ambas consultas en paralelo
  conexionMySQL.query(queryUltimosServicios, (errUltimos, resultUltimos) => {
    if (errUltimos) {
      console.error('Error al obtener los últimos servicios:', errUltimos);
      res.status(500).send('Error al obtener los servicios');
      return;
    }

    conexionMySQL.query(queryTotalServicios, (errTotal, resultTotal) => {
      if (errTotal) {
        console.error('Error al obtener el total de servicios:', errTotal);
        res.status(500).send('Error al obtener el total de servicios');
        return;
      }

      // Enviar respuesta con los resultados
      res.json({
        ultimos_servicios: resultUltimos,
        total_servicios: resultTotal[0].total_servicios
      });
    });
  });
});




module.exports = router