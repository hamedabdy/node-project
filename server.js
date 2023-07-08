const express = require('express');
const app = express();
const mariadb = require('mariadb');
const API = require('./Epiloguer'); // Import the api.js script

const morgan = require('morgan'); // Require the morgan library
const winston = require('winston'); // Require the winston library

// const db = require('./Database');// Import the Database class
const config = require('./config'); // Import the configuration object

// Set up MariaDB connection using the configuration object
const pool = mariadb.createPool(config.db);
// Create a new instance of the Database class
// const db = new Database(pool);

// Create a new instance of the API class
const api = new API(app, pool);

// Set up winston logger
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
      new winston.transports.File({ filename: 'log/error.log', level: 'error' }),
      new winston.transports.File({ filename: 'log/combined.log' })
    ]
});

// Use morgan as middleware to log HTTP requests and output logs to winston
app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));


// // Set up routes
// app.get('/', async (req, res) => {
//     // Use the Database class to retrieve data from MariaDB and send it to the client
//     try {
//       const rows = await db.select(req.table);
//       res.send(rows);
//     } catch (err) {
//       // Handle error
//       res.status(500).send(err.message);
//     }
//   });

// // Set up routes
// app.get('/', (req, res) => {
//   // Retrieve data from MariaDB and send it to the client
//   pool.getConnection()
//     .then(conn => {
//       conn.query('SELECT * FROM ' + req.table)
//         .then(rows => {
//           res.send(rows);
//           conn.end();
//         })
//         .catch(err => {
//           // Handle error
//           conn.end();
//         });
//     })
//     .catch(err => {
//       // Handle error
//     });
// });

// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
