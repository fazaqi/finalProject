const { db } = require("../connection");
const crypto = require("./../helper/encrypt");

module.exports = {
  getDetailUser: (req, res) => {
    const { id, role } = req.body;
    console.log(id, role);
    var sql = "";
    if (role === 2) {
      sql = `SELECT * FROM users_penjual WHERE usersId=${id}`;
    } else if (role === 3) {
      sql = `SELECT * FROM users_pembeli WHERE usersId=${id}`;
    }
    db.query(sql, (err, result) => {
      if (err) res.status(500).send({ status: "error", err });
      // console.log(result);
      return res.status(200).send(result);
    });
  },
  updateUser: (req, res) => {
    const { id } = req.params;
    const { nama, alamat, jeniskelamin, nomorhp } = req.body;
    let data = { nama, alamat, jeniskelamin, nomorhp };
    let sql = `UPDATE users_pembeli SET ? WHERE usersId = ${id}`;
    db.query(sql, data, (err, result) => {
      if (err) res.status(500).send({ status: "Insert Error", err });
      // console.log(result);
      if (result) {
        return res.status(200).send({ status: "Update Data Berhasil", result });
      }
    });
  },
  updateToko: (req, res) => {
    const { id } = req.params;
    const { namatoko, nomorhp, alamattoko, deskripsitoko } = req.body;
    let data = { namatoko, nomorhp, alamattoko, deskripsitoko };
    let sql = `UPDATE users_penjual SET ? WHERE usersId = ${id}`;
    db.query(sql, data, (err, result) => {
      if (err) res.status(500).send({ status: "Insert Error", err });
      // console.log(result);
      if (result) {
        return res.status(200).send({ status: "Update Data Berhasil", result });
      }
    });
  },
  getDetailToko: (req, res) => {
    const { id } = req.params;
    console.log(id);
    let sql = `SELECT * FROM users_penjual WHERE usersId=${id}`;
    db.query(sql, (err, result) => {
      if (err) {
        return res.status(500).send({ message: "Get Detail Penjual Error" });
      }
      return res.status(200).send(result);
    });
  },
  changePass: (req, res) => {
    const { id, passlama, passbaru } = req.body;
    const hashpasslama = crypto(passlama);
    const hashpassbaru = crypto(passbaru);

    // console.log(hashpasslama);

    let sql = `SELECT * FROM users WHERE id=${id} AND password='${hashpasslama}'`;
    db.query(sql, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send({ message: "Get Error" });
      }
      if (result.length === 0) {
        return res.status(200).send({ message: "Pass Lama Salah" });
      }
      if (result.length) {
        sql = `UPDATE users SET password='${hashpassbaru}' WHERE id=${id}`;
        db.query(sql, (err, resUpdate) => {
          if (err) {
            console.log(err);
            return res.status(500).send({ message: "Get Error" });
          }
          return res.status(200).send({ message: "Update Pass Berhasil" });
        });
      }
    });
  }
};
