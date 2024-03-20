const mysql = require('mysql2');
const util = require('util');

const conexionMySQL = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Avansat_DB'
});

// PROMISE

conexionMySQL.query = util.promisify(conexionMySQL.query).bind(conexionMySQL);

conexionMySQL.connect(err => {
  if (err) {
    console.log('Error en la conexión MySQL:', err);
  }
  console.log('Base de datos MySQL de Avansat conectada!');
});

module.exports = conexionMySQL;