const { db } = require("../connection");
const hashpassword = require("./../helper/encrypt");

module.exports = {
  getUser: (req, res) => {
    // console.log(req.params.id);
    const { id } = req.params;
    var sql = `SELECT * FROM users WHERE id=${id}`;
    db.query(sql, (err, result) => {
      if (err) res.status(500).send(err);
      return res.status(200).send(result);
    });
  },
  login: (req, res) => {
    // console.log(req.query);
    const { username, password } = req.query;
    if (username && password) {
      var sql = `SELECT * FROM users WHERE username='${username}' AND password='${password}'`;
      db.query(sql, (err, result) => {
        if (err) res.status(500).send(err);
        return res.status(200).send(result);
      });
    } else {
      return res.status(500).send({ message: "error cuy" });
    }
  },
  register: (req, res) => {
    const {
      username,
      password,
      email,
      nama,
      alamat,
      jeniskelamin,
      nomorhp
    } = req.body;
    var sql = `SELECT * FROM users WHERE username='${username}' OR email='${email}'`;
    db.query(sql, (err, result) => {
      if (err) res.status(500).send({ status: "error", err });
      if (result.length === 0) {
        sql = `INSERT INTO users SET ?`;
        var data = {
          username,
          password,
          email,
          roleId: 3
        };
        db.query(sql, data, (err, resInsert) => {
          if (err) res.status(500).send({ status: "Insert Error", err });
          // sql = `SELECT * FROM users WHERE id=${resInsert.insertId}`;
          // db.query(sql, (err, resSelect) => {
          //   if (err) res.status(500).send({ status: "Select ID Error" });
          sql = `INSERT INTO users_pembeli SET ?`;
          var dataPembeli = {
            nama,
            alamat,
            email,
            jeniskelamin,
            nomorhp,
            usersId: resInsert.insertId
          };
          db.query(sql, dataPembeli, (err, resInsertPembeli) => {
            if (err)
              res
                .status(500)
                .send({ status: "Insert ke users_pembeli Error", err });

            // res.status(200).send({
            //   status: "Insert ke users_pembeli Berhasil",
            //   resInsertPembeli
            // });
          });
          // });

          return res.status(200).send({ status: "Insert Berhasil", resInsert });
        });
      }
    });
  },
  registertoko: (req, res) => {
    const {
      username,
      password,
      email,
      namatoko,
      alamattoko,
      nomorhp,
      deskripsitoko
    } = req.body;
    var sql = `SELECT * FROM users WHERE username='${username}' OR email='${email}'`;
    db.query(sql, (err, result) => {
      if (err) res.status(500).send({ status: "error", err });
      if (result.length === 0) {
        sql = `INSERT INTO users SET ?`;
        var data = {
          username,
          password,
          email,
          roleId: 2
        };
        db.query(sql, data, (err, resInsert) => {
          if (err) res.status(500).send({ status: "Insert Error", err });
          sql = `INSERT INTO users_penjual SET ?`;
          var dataPenjual = {
            namatoko,
            alamattoko,
            email,
            nomorhp,
            deskripsitoko,
            usersId: resInsert.insertId
          };
          db.query(sql, dataPenjual, (err, resInsertPenjual) => {
            if (err)
              res
                .status(500)
                .send({ status: "Insert into users_penjual error" });
          });
          return res.status(200).send({ status: "Insert Berhasil", resInsert });
        });
      }
    });
  }
};
