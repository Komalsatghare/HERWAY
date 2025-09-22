const mysql = require('mysql2');

// Create a connection pool (better for multiple requests)
const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',             // your MySQL username
  password: 'your_password', // your MySQL password
  database: 'herwayDB',      // your database name
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

connection.getConnection((err, conn) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL!');
    conn.release(); // release the connection back to pool
  }
});

module.exports = connection;
