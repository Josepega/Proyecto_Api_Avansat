const express = require("express");
const router = express.Router();
const conexionMySQL = require("../conexionMySQL");

/* -----------------------------------------------------------STOCK---------------------------------------------------------------------------------------------------------------- */
// RUTAS: ALTA STOCK
router.post("/alta_stock", (req, res) => {
    try {
      const data = {
        Codigo: req.body.Codigo,
        Cantidad: req.body.Cantidad,
        Nombre: req.body.Nombre,
        Precio_coste: req.body.Precio_coste,
        Precio_coste_iva: req.body.Precio_coste_iva,
        Precio_venta: req.body.Precio_venta,
        Precio_venta_iva: req.body.Precio_venta_iva,
      };
  
      const sql = "INSERT INTO stock SET  ?";
      conexionMySQL.query(sql, data, (error, result) => {
        if (error) {
          res.status(400).json({
            status: 400,
            mensaje: "Error al insertar Artículo",
            error: error
          });
        } else {
          res.status(200).json({
            status: 200,
            mensaje: "Artículo insertado correctamente"
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
  
  // RUTAS: LISTADO DE STOCK
  router.get('/listado_stock', (req,res)=>{
    conexionMySQL.query('SELECT * FROM stock', (error,filas)=>{
        if(error){
            throw error
        }else{
            res.json(filas)
        }
    })
  })
  
  // RUTAS: BORRAR STOCK
  router.delete("/borrar_stock/:id", (req,res)=>{
    conexionMySQL.query('DELETE FROM stock WHERE Id_stock = ?', [req.params.id], function(error, filas){
        if(error){
            throw error
        }else{              
            res.json(filas)
        }
    })
  })
  
  
  // RUTAS: EDITAR STOCK
  
  router.put("/editar_stock/:idStock", async (req, res) => {
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

  
module.exports = router