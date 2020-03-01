const { db } = require("../connection");
const crypto = require("./../helper/encrypt");

module.exports = {
  getDetailUser: (req, res) => {
    const { id } = req.params;
    var sql = `SELECT * FROM users_pembeli WHERE usersId=${id}`;
    db.query(sql, (err, result) => {
      if (err) res.status(500).send({ status: "error", err });
      return res.status(200).send(result);
    });
  },
  updateUser: (req, res) => {
    const { id } = req.params;
    const { username, nama, alamat, jeniskelamin, nomorhp } = req.body;
    var sql = `SELECT * FROM users WHERE username='${username}'`;
    db.query(sql, (err, result) => {
      if (err) res.status(500).send({ status: "error", err });
      if (result) {
        let data = { nama, alamat, jeniskelamin, nomorhp };
        sql = `UPDATE users_pembeli SET ? WHERE usersId = ${id}`;
        db.query(sql, data, (err, resUpdate) => {
          if (err) res.status(500).send({ status: "Insert Error", err });
          return res
            .status(200)
            .send({ status: "Update Data Berhasil", resUpdate });
        });
      }
    });
  }
};
