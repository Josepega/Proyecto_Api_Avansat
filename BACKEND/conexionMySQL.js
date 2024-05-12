const mysql = require('mysql2');
const util = require('util'); 

const conexionMySQL = mysql.createConnection({
    host: '109.176.199.4',
    user: 'josepega',
    password: 'Josemanu72',
    database: 'avansatDB'
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