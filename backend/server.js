const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'pressurestore',
  port: 3307,
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

//<--------------------------------------Test đổ dữ liệu từ dtb vào----------------------->

// app.get('/getUsername', (req, res) => {
//     const sql = 'SELECT * FROM User;';
//     db.query(sql, (err, result) => {
//       if (err) return res.json(err);
//       return res.json(data);
//     });
//   });

//<--------------------------------------Test đổ dữ liệu từ dtb vào----------------------->
  

const PORT = process.env.PORT || 3308;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
