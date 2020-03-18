const { db } = require("../connection");
const crypto = require("./../helper/encrypt");

module.exports = {
  getUser: (req, res) => {
    const { id } = req.params;
    var sql = `SELECT * FROM users WHERE id=${id}`;
    db.query(sql, (err, resSelect) => {
      if (err) res.status(500).send(err);
      // console.log(resSelect[0].roleId);
      if (resSelect[0].roleId === 3) {
        sql = `SELECT u.id, u.username, u.email, u.roleId, ub.nama 
               FROM users u JOIN users_pembeli ub  ON u.id = ub.usersId 
               WHERE u.id=${id}`;
      } else if (resSelect[0].roleId === 2) {
        sql = `SELECT u.id, u.username, u.email, u.roleId, up.namatoko 
               FROM users u JOIN users_penjual up  ON u.id = up.usersId 
               WHERE u.id=${id}`;
      }
      db.query(sql, (err, result) => {
        if (err) res.status(500).send(err);
        // console.log(result);
        return res.status(200).send(result);
      });
    });

    // var sql = `SELECT u.*, ub.nama FROM users u JOIN users_pembeli ub  ON u.id = ub.usersId WHERE u.id=${id}`;
  },
  login: (req, res) => {
    // console.log(req.query);
    const { username, password } = req.query;
    // console.log(username, password);
    if (username && password) {
      const hashpassword = crypto(password);
      var sql = `SELECT * FROM users WHERE (username='${username}' AND password='${hashpassword}') OR (email='${username}' AND password='${hashpassword}')`;
      db.query(sql, (err, resSelect) => {
        if (err) res.status(500).send(err);
        // console.log(resSelect);
        if (resSelect.length) {
          if (resSelect[0].roleId === 3) {
            sql = `SELECT u.id, u.username, u.email, u.roleId, ub.nama 
                   FROM users u JOIN users_pembeli ub  ON u.id = ub.usersId 
                   WHERE (u.username='${username}' AND u.password='${hashpassword}') 
                   OR (u.email='${username}' AND u.password='${hashpassword}')`;
          } else if (resSelect[0].roleId === 2) {
            sql = `SELECT u.id, u.username, u.email, u.roleId, up.namatoko 
                   FROM users u JOIN users_penjual up  ON u.id = up.usersId  
                   WHERE (u.username='${username}' AND u.password='${hashpassword}') 
                   OR (u.email='${username}' AND u.password='${hashpassword}')`;
          }
          db.query(sql, (err, result) => {
            if (err) res.status(500).send(err);
            return res.status(200).send(result);
          });
        } else {
          return res.status(500).send({ message: "Login Error" });
        }
      });
    } else {
      return res.status(500).send({ message: "Login Error" });
    }
  }
};
