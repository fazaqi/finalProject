const { db } = require("../connection");
const crypto = require("./../helper/encrypt");

module.exports = {
  getUser: (req, res) => {
    // console.log(req.params.id);
    const { id } = req.params;
    // var sql = `SELECT * FROM users WHERE id=${id}`;
    var sql = `SELECT u.*, ub.nama FROM users u JOIN users_pembeli ub  ON u.id = ub.usersId WHERE u.id=${id}`;
    db.query(sql, (err, result) => {
      if (err) res.status(500).send(err);
      return res.status(200).send(result);
    });
  },
  login: (req, res) => {
    // console.log(req.query);
    const { username, password } = req.query;
    // console.log(username, password);
    if (username && password) {
      const hashpassword = crypto(password);
      // var sql = `SELECT * FROM users WHERE (username='${username}' AND password='${hashpassword}') OR (email='${username}' AND password='${hashpassword}')`;
      var sql = `SELECT u.*, ub.nama FROM users u JOIN users_pembeli ub  ON u.id = ub.usersId  WHERE (u.username='${username}' AND u.password='${hashpassword}') OR (u.email='${username}' AND u.password='${hashpassword}')`;

      db.query(sql, (err, result) => {
        if (err) res.status(500).send(err);
        return res.status(200).send(result);
      });
    } else {
      return res.status(500).send({ message: "Login Error" });
    }
  }
};
