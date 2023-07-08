const express = require('express');
const app = express();
const mariadb = require('mariadb');

// Set up MariaDB connection
const pool = mariadb.createPool({
  host: 'localhost',
  user: 'admin',
  password: 'hamed',
  database: 'node-project'
});

// Set up routes
app.get('/', (req, res) => {
  // Retrieve data from MariaDB and send it to the client
  pool.getConnection()
    .then(conn => {
      conn.query('SELECT * FROM ' + req.table)
        .then(rows => {
          res.send(rows);
          conn.end();
        })
        .catch(err => {
          // Handle error
          conn.end();
        });
    })
    .catch(err => {
      // Handle error
    });
});

// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
