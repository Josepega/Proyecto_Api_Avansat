const express = require('express');
const router = express.Router();
const conexionMySQL = require('../conexionMySQL');


// MANEJO DE MENSAJES
const handleEror = (res, error, mensaje) => {
    console.log(error);
        res.status(500).json({ 
            status: 500,
            message: `${mensaje}. ${error}`,
        });
    };

// RUTAS: SALUDO DE PRUEBA 
router.get('/Saludo', async (req, res) => {
    try {
        res.status(200).json({ mensaje: 'Hola Avansat, bienvenido' });
    } catch (error) {
        handleEror(res, error, 'Error en el servidor');
    }
});

// RUTAS: ALTA DE CLIENTES 
router.post('/alta_cliente', (req, res) => {
try {
    const id_clientes = req.body.id_clientes;
    const nombre = req.body.nombre;
    const apellidos = req.body.apellidos;
    const idFiscal = req.body.idFiscal;
    const direccion = req.body.direccion;
    const postal = req.body.postal;
    const localidad = req.body.localidad;
    const pais = req.body.pais;
    const telefono = req.body.telefono;
    const movil = req.body.movil;
    const email = req.body.email;

    const sql = "INSERT INTO clientes VALUES(default, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    conexionMySQL.query(sql, [nombre, apellidos, idFiscal, direccion, postal, localidad, pais, telefono, movil, email], (err) => {
    
        res.json({
            status: 200,
            mensaje: "Datos insertados correctamente"
        });
});        

} catch (err) {
    res.json({
        status:400,
        mensaje: "Error al insertar datos del cliente " + err
    });
}
});








module.exports = router;