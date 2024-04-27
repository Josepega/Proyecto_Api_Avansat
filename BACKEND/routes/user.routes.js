const express = require("express");
const router = express.Router();
const conexionMySQL = require("../conexionMySQL");
const { loginUser } = require('../../frontend/js/user.controller');

// Ruta para el login
router.post('/login', loginUser);

module.exports = router;
