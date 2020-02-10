// require: Trae la librería express del npm.
var express = require('express');
// Se invoca la función (de la variable express) y se almacena en la variable app.
var app = express();


const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'dbdistribuidos',
  password: 'salaroja',
  port: 5432,
})





app.get('/', function (req, res) {
  res.send('Sistemas Distribuidos!');
});




app.get('/users', function (req, res) {
  pool.query('SELECT * FROM personas ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
})


/*
app.post('/create-user' ,function(req, res){
  const { id, nombre } = req.body
  pool.query('INSERT INTO personas (id, nombre) VALUES ($1, $2)', [id, nombre], (error, results) => {
    if (error) {
      throw error
    }
    res.status(201).send(`User added with ID: ${result.insertId}`)
  })
})
*/



// Correr el servidor con el puerto 8989.
app.listen(8989);
