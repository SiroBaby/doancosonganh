const express = require('express');
const mysql = require('mysql');

const app = express();
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'your_database',
});

db.connect((err) => {
  if (err) {
    console.error('MySQL connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL database');
});

// app.post('/checkout', (req, res) => {
//   const { ten_sanpham, gia_ban, soluong, thanhtien } = req.body;
//   const sql = 'INSERT INTO sanpham (ten_sanpham, gia_ban, soluong, thanhtien) VALUES (?, ?, ?, ?)';
//   db.query(sql, [ten_sanpham, gia_ban, soluong, thanhtien], (err, result) => {
//     if (err) {
//       console.error('Error executing query: ' + err.stack);
//       res.status(500).send('Internal Server Error');
//       return;
//     }
//     res.status(200).send('Payment successful');
//   });
// });

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
