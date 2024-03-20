const express = require('express');
const router = express.Router();

router.get('/Saludo', async (req, res) => {
    try {
        res.status(200).json({ mensaje: 'Hola' });
    } catch (error) {
        handleEror(res, error, 'Error en el servidor');
    }
});

const handleEror = (res, error, mensaje) => {
console.log(error);
    res.status(500).json({ 
        status: 500,
        message: `${mensaje}. ${error}`,
    });
};

module.exports = router;