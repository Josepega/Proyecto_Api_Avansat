// user.controller.js

const { Pool } = require('pg');

// Configuración de la conexión a la base de datos
const pool = new Pool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Avansat_DB',
  port: 3000,
});

// Controlador para el login de usuario
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM usuarios WHERE email = $1 AND password = $2', [email, password]);
    if (result.rows.length > 0) {
      // Usuario autenticado, redirigir a una página de éxito o devolver algún tipo de token de autenticación
      res.status(200).send('Usuario autenticado');
    } else {
      // Credenciales incorrectas, devolver un mensaje de error
      res.status(401).send('Credenciales incorrectas');
    }
  } catch (error) {
    console.error('Error al autenticar al usuario:', error);
    res.status(500).send('Error interno del servidor');
  }
};

module.exports = { loginUser };
