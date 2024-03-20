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
    const datosCliente = req.body.datosCliente;
    const sql = "INSERT INTO clientes VALUES( ?, ?, ?, ?, ?, ?, ?, ?)";
    conexionMySQL.query(sql, [Nombre, Apellidos, Nif, Cif, Direccion, Telefono, Movil, Email], (err) => (
        res.json({
            satatus: 500,
            mensaje: "Error al insertar datos del cliente " + err
        })
    ));
} catch (error) {
    res.json({
        status:200,
        mensaje: "Datos insertados correcatamente"
    });
}
});








module.exports = router;