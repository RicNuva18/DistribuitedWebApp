var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});


const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'dbdistribuidos',
  password: 'salaroja',
  port: 5432,
})


router.get('/users', function (req, res) {
  pool.query('SELECT * FROM personas ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
})

// Correr el servidor con el puerto 8989.


module.exports = router;
