const express = require("express");
const router = express.Router();
const conexionMySQL = require("../conexionMySQL");


// MANEJO DE MENSAJES
/* const handleEror = (res, error, mensaje) => {
  console.log(error);
  res.status(500).json({
    status: 500,
    message: `${mensaje}. ${error}`,
  });
}; */

// RUTAS: SALUDO DE PRUEBA
router.get("/Saludo", async (req, res) => {
  try {
    res.status(200).json({ mensaje: "Hola Avansat, bienvenido" });
  } catch (error) {
    handleEror(res, error, "Error en el servidor");
  }
});

/* -----------------------------------------------------------CLIENTES---------------------------------------------------------------------------------------------------------------- */

// RUTAS: ALTA CLIENTE
router.post("/alta_cliente", (req, res) => {
  try {
    const data = {
      tipo_cliente: req.body.tipo_cliente,
      nombre: req.body.nombre,
      apellidos: req.body.apellidos,
      id_fiscal: req.body.id_fiscal,
      direccion: req.body.direccion,
      c_postal: req.body.c_postal,
      localidad: req.body.localidad,
      pais: req.body.pais,
      telefono: req.body.telefono,
      movil: req.body.movil,
      email: req.body.email
    };

    const sql = "INSERT INTO clientes SET ?";
    conexionMySQL.query(sql, data, (error, result) => {
      if (error) {
        res.status(400).json({
          status: 400,
          mensaje: "Error al insertar datos del cliente",
          error: error
        });
      } else {
        res.status(200).json({
          status: 200,
          mensaje: "Datos insertados correctamente",
          nuevo_cliente: { id: result.insertId, ...data }
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
// RUTAS: LISTADO DE CLIENTE
router.get('/listado_clientes', (req,res)=>{
  conexionMySQL.query('SELECT * FROM clientes', (error,filas)=>{
      if(error){
          throw error
      }else{
          res.json(filas)
      }
  })
})
// RUTAS: BORRAR CLIENTE
router.delete("/borrar_cliente/:id", (req,res)=>{
  conexionMySQL.query('DELETE FROM clientes WHERE id_cliente = ?', [req.params.id], function(error, filas){
      if(error){
          throw error
      }else{              
          res.json(filas)
      }
  })
})
// RUTAS: EDITAR CLIENTE
router.put("/editar_cliente/:clienteId", (req, res) => {
  try {
    let id_cliente = req.params.clienteId;
    let tipo_cliente = req.body.tipo_cliente;
    let nombre = req.body.nombre;
    let apellidos = req.body.apellidos;
    let id_fiscal = req.body.id_fiscal;
    let direccion = req.body.direccion;
    let c_postal = req.body.c_postal;
    let localidad = req.body.localidad;
    let pais = req.body.pais;
    let telefono = req.body.telefono;
    let movil = req.body.movil;
    let email = req.body.email;

    let sql = "UPDATE clientes SET tipo_cliente = ?, nombre = ?, apellidos = ?, id_fiscal = ?, direccion = ?, c_postal = ?, localidad = ?, pais = ?, telefono = ?, movil = ?, email = ? WHERE id_cliente = ?";

    conexionMySQL.query(sql, [tipo_cliente, nombre, apellidos, id_fiscal, direccion, c_postal, localidad, pais, telefono, movil, email, id_cliente], function(error, filas){
      if (error) {
        throw error;
      } else {              
        res.json("Cliente actualizado correctamente");
      }
    });
  } catch (error) {
    console.error("Error en la edición del cliente:", error);
    res.status(500).send("Error en la edición del cliente");
  }
});



/* -----------------------------------------------------------STOCK---------------------------------------------------------------------------------------------------------------- */
// RUTAS: ALTA STOCK
router.post("/alta_stock", (req, res) => {
  try {
    const data = {
      Codigo: req.body.codigo,
      Cantidad: req.body.cantidad,
      Nombre: req.body.nombre,
      Precio_coste: req.body.precio_coste,
      Precio_coste_iva: req.body.precio_coste_iva,
      Precio_venta: req.body.precio_venta,
      Precio_venta_iva: req.body.precio_venta_iva,
    };

    const sql = "INSERT INTO stock SET ?";
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
  conexionMySQL.query('DELETE FROM stock WHERE codigo = ?', [req.params.id], function(error, filas){
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







module.exports = router;
