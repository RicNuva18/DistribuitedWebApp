var express = require('express');
var router = express.Router();


const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'dbdistribuidos',
  password: 'salaroja',
  port: 5432,
})



/* GET users listing. */
router.get('/', function(req, res, next) {
    pool.query('SELECT * FROM personas ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })

//res.send('respond with a resource');
});


/*Metodo POST*/
/*
router.post('/create-user' ,function(req, res){
  const { id, nombre } = req.body
  pool.query('INSERT INTO personas (id, nombre) VALUES ($1, $2)', [id, nombre], (error, results) => {
    if (error) {
      throw error
    }
    res.status(201).send(`User added with ID: ${result.insertId}`)
  })
})
*/


module.exports = router;
