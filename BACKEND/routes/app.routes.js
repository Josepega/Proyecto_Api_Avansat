const express = require("express");
const router = express.Router();
const conexionMySQL = require("../conexionMySQL");


// MANEJO DE MENSAJES
const handleEror = (res, error, mensaje) => {
  console.log(error);
  res.status(500).json({
    status: 500,
    message: `${mensaje}. ${error}`,
  });
};

// RUTAS: SALUDO DE PRUEBA
router.get("/Saludo", async (req, res) => {
  try {
    res.status(200).json({ mensaje: "Hola Avansat, bienvenido" });
  } catch (error) {
    handleEror(res, error, "Error en el servidor");
  }
});

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



// RUTAS: BORRAR CLIENTE
router.delete("/borrar_cliente/:id", (req,res)=>{
  conexionMySQL.query('DELETE FROM clientes WHERE id_cliente = ?', [req.params.id], function(error, filas){
      if(error){
          throw error
      }else{              
          res.send(filas)
      }
  })
})

// RUTAS: LISTADO DE CLIENTE
router.get('/listado_clientes', (req,res)=>{
  conexionMySQL.query('SELECT * FROM clientes', (error,filas)=>{
      if(error){
          throw error
      }else{
          res.send(filas)
      }
  })
})

module.exports = router;



