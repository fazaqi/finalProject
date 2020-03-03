const { db } = require("../connection");
const crypto = require("./../helper/encrypt");

module.exports = {
  regisUser: (req, res) => {
    const { username, password, email } = req.body;
    const hashpassword = crypto(password);
    var sql = `SELECT * FROM users WHERE username='${username}' OR email='${email}'`;
    db.query(sql, (err, result) => {
      if (err) res.status(500).send({ status: "error", err });
      if (result.length === 0) {
        sql = `INSERT INTO users SET ?`;
        var data = {
          username,
          password: hashpassword,
          email,
          roleId: 3
        };
        db.query(sql, data, (err, resInsert) => {
          if (err) res.status(500).send({ status: "Insert Error", err });
          sql = `INSERT INTO users_pembeli SET ?`;
          let dataUser = {
            email,
            usersId: resInsert.insertId
          };
          db.query(sql, dataUser, (err, resInsertUser) => {
            if (err)
              res.status(500).send({ status: "Insert ke User Pembeli error" });
          });
          return res
            .status(200)
            .send({ status: "Registrasi User Berhasil", resInsert });
        });
      } //KASIH ELSE DISINI JIKA SAAT REGISTER USERNAME ATAU EMAIL SUDAH TERPAKAI
    });
  },
  regisToko: (req, res) => {
    const { username, password, email } = req.body;
    const hashpassword = crypto(password);
    var sql = `SELECT * FROM users WHERE username='${username}' OR email='${email}'`;
    db.query(sql, (err, result) => {
      if (err) res.status(500).send({ status: "error", err });
      if (result.length === 0) {
        sql = `INSERT INTO users SET ?`;
        var data = {
          username,
          password: hashpassword,
          email,
          roleId: 2
        };
        db.query(sql, data, (err, resInsert) => {
          if (err) res.status(500).send({ status: "Insert Error", err });
          sql = `INSERT INTO users_penjual SET ?`;
          let dataUser = {
            email,
            usersId: resInsert.insertId
          };
          db.query(sql, dataUser, (err, resInsertUser) => {
            if (err)
              res.status(500).send({ status: "Insert ke User Penjual error" });
          });
          return res
            .status(200)
            .send({ status: "Registrasi Toko Berhasil", resInsert });
        });
      }
    });
  }
};
