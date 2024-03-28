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

// RUTAS: ALTA DE CLIENTES
router.post("/alta_cliente", (req, res) => {
  try {
    const id_cliente = req.body.id_cliente;
    const nombre = req.body.nombre;
    const apellidos = req.body.apellidos;
    const idFiscal = req.body.idFiscal;
    const direccion = req.body.direccion;
    const c_postal = req.body.c_postal;
    const localidad = req.body.localidad;
    const pais = req.body.pais;
    const telefono = req.body.telefono;
    const movil = req.body.movil;
    const email = req.body.email;

    const sql =
      "INSERT INTO clientes VALUES(default, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    conexionMySQL.query(
      sql,
      [
        nombre,
        apellidos,
        idFiscal,
        direccion,
        c_postal,
        localidad,
        pais,
        telefono,
        movil,
        email,
      ],
      (err) => {
        res.json({
          status: 200,
          mensaje: "Datos insertados correctamente",
        });
      }
    );
  } catch (err) {
    res.json({
      status: 400,
      mensaje: "Error al insertar datos del cliente " + err,
    });
  }
});


// RUTAS: CONSULTA DE ULTIMOS 10 CLIENTES AÑADIDOS POR NOMBRE Y APELLIDOS
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
}); 
// RUTAS: CONSULTA DE TODOS LOS CLIENTES 
router.get("/listado_clientes_totales", (req, res) => {
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

module.exports = router;

// RUTAS: EDITAR CLIENTE

router.put("/editar_cliente", (req, res) => {
  const id_cliente = req.body.id_cliente;
  const nombre = req.body.nombre;
  const apellidos = req.body.apellidos;
  const idFiscal = req.body.idFiscal;
  const direccion = req.body.direccion;
  const c_postal = req.body.c_postal;
  const localidad = req.body.localidad;
  const pais = req.body.pais;
  const telefono = req.body.telefono;
  const movil = req.body.movil;
  const email = req.body.email;
  
  const sql = "update clientes set descripcion =Id_cliente ?,Nombre = ?, Apellidos = ?, Id_fiscal = ?, Direccion = ?, C_postal = ?, Localidad = ?, Pais = ?, Telefono = ?, Movil = ?, Email = ? where id = ?";
  conexionMySQL.query(sql, [id_cliente,nombre, apellidos, direccion, idFiscal, c_postal, localidad, pais, telefono, movil, email], error => {
    if (error) {
      res.json({
        "status": 500,
        "mensaje": "Error en la edición del cliente. Error:" + error
      });
    } else {
      res.json({
        "status": 200,
        "mensaje": "Cliente editado correctamente!"
      });
    }
  });
});