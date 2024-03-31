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

// RUTAS: EDITAR CLIENTE
router.put("/editar_cliente/:id", (req, res) => {
  try {
    let id = req.params.id;
    let tipo_cliente = req.body.Tipo_cliente;
    let nombre = req.body.Nombre;
    let apellidos = req.body.Apellidos;
    let id_fiscal = req.body.Id_fiscal;
    let direccion = req.body.Direccion;
    let c_postal = req.body.C_postal;
    let localidad = req.body.Localidad;
    let pais = req.body.Pais;
    let telefono = req.body.Telefono;
    let movil = req.body.Movil;
    let email = req.body.Email;
    
    let sql = "UPDATE clientes SET tipo = ?, nombre = ?, apellidos = ?, id_fiscal = ?, direccion = ?, c_postal = ?, localidad = ?, pais = ?, telefono = ?, movil = ?, email = ? WHERE id = ?";
    
    conexionMySQL.query(sql, [tipo_cliente, nombre, apellidos, id_fiscal, direccion, c_postal, localidad, pais, telefono, movil, email, id], function(error, results) {
      if (error) {
        throw error;
      } else {              
        res.send(results);
      }
    });
  } catch (error) {
    console.error("Error en la edición del cliente:", error);
    res.status(500).send("Error en la edición del cliente");
  }
});

// RUTAS: BORRAR CLIENTE
/* router.delete("/borrar_cliente/:id", (req, res) => {
  let id = req.params.id;
  let sql = "DELETE FROM clientes WHERE id = ?";
  conexionMySQL.query(sql, [id], (error, result) => {
    if (error) {
      res.status(400).json({
        status: 400,
        mensaje: "Error al borrar datos del cliente",
        error: error
      });
    } else {
      res.status(200).json({
        status: 200,
        mensaje: "Datos borrados correctamente",
        nuevo_cliente: result
      });
    }
  });
}); */
router.delete("/borrar_cliente/:id", (req,res)=>{
  conexionMySQL.query('DELETE FROM clientes WHERE id_cliente = ?', [req.params.id], function(error, filas){
      if(error){
          throw error
      }else{              
          res.send(filas)
      }
  })
})

// RUTAS: CONSULTA DE CLIENTE
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



/* // RUTAS: CONSULTA DE ULTIMOS 10 CLIENTES AÑADIDOS POR NOMBRE Y APELLIDOS
router.get("/listado_clientes", (req, res) => {
  const sql = "SELECT id_cliente, Nombre, Apellidos from clientes order by id_cliente desc limit 10;";
  conexionMySQL.query(sql, (error, resultado) => {
    if (error) {
      // Manejo del error
      console.error("Error en la consulta SQL:", error);
      res.status(500).json({
        status: 500,
        mensaje: "Error en la consulta SQL",
        error: error
      });
    } else {
      res.status(200).json({
        status: 200,
        resultado: resultado 
      });
    }
  });
});  */
// RUTAS: CONSULTA DE TODOS LOS CLIENTES 


/* router.get("/listado_clientes_totales", (req, res) => {
  const sql = "SELECT * FROM  clientes order by id_cliente desc;";
  conexionMySQL.query(sql, (error, resultado) => {
    if (error) {
      // Manejo del error
      console.error("Error en la consulta SQL:", error);
      res.status(500).json({
        status: 500,
        mensaje: "Error en la consulta SQL",
        error: error
      });
    } else {
      res.status(200).json({
        status: 200,
        resultado: resultado 
      });
    }
  });
}); 
 
// RUTAS: BORRAR CLIENTE
router.delete("/borrar_cliente", (req, res) => {
  const id_cliente = req.body.id_cliente;
  const sql = "delete from clientes where id_cliente=?";
  conexionMySQL.query(sql, [id_cliente], error => {
    if (error) {
      res.json({
        "status": 500,
        "mensaje": "Error en el borrado del cliente. Error:" + error 
      });
    } else {
      res.json({
        "status": 200,
        "mensaje": "Cliente eliminado correctamente!"
      });
    }
  });
});



/* //* / RUTAS: EDITAR CLIENTE
router.put("/editar_cliente${idCliente}", async (req, res) => {
  try {
    const {
      id_cliente,
      tipo_cliente,
      nombre,
      apellidos,
      idFiscal,
      direccion,
      c_postal,
      localidad,
      pais,
      telefono,
      movil,
      email
    } = req.body;

    // Aquí debes realizar la validación de los datos recibidos antes de procesar la edición del cliente

    const sql = `
      UPDATE clientes 
      SET Tipo_cliente = ?, Nombre = ?, Apellidos = ?, IdFiscal = ?, Direccion = ?, 
          C_postal = ?, Localidad = ?, Pais = ?, Telefono = ?, Movil = ?, Email = ? 
      WHERE Id_cliente = ?`;

    conexionMySQL.query(sql, [tipo_cliente, nombre, apellidos, idFiscal, direccion, c_postal, localidad, pais, telefono, movil, email, id_cliente], (error, resultado) => {
      if (error) {
        console.error("Error en la edición del cliente:", error);
        res.status(500).json({ mensaje: "Error en la edición del cliente" });
      } else {
        res.status(200).json({ mensaje: "Cliente editado correctamente" });
      }
    });
  } catch (error) {
    console.error("Error en la edición del cliente:", error);
    res.status(500).json({ mensaje: "Error en la edición del cliente" });
  }
});  */


module.exports = router;