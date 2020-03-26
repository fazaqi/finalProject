const { db } = require("../connection");

module.exports = {
  getPayment: (req, res) => {
    try {
      let sql = `SELECT t.*,up.nama FROM users u JOIN users_pembeli up ON u.id=up.usersId JOIN transaction t ON t.usersId=u.id `;
      db.query(sql, (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).send({ message: "Get Trans Error", err });
        }
        res.status(200).send(result);
      });
    } catch (error) {
      return res.status(500).json({
        message: "Server Error",
        error: error.message
      });
    }
  },
  tolakPayment: (req, res) => {
    try {
      const { id } = req.params;
      let sql = `UPDATE transaction SET status='declined' WHERE id=${id}`;
      db.query(sql, (err, result) => {
        if (err) {
          console.log(err);
          return res
            .status(500)
            .send({ message: "Tolak Pembayaran Error", err });
        }

        return res.status(200).send({ message: "Pembayaran Ditolak" });
      });
    } catch (error) {
      return res.status(500).json({
        message: "Server Error",
        error: error.message
      });
    }
  },
  terimaPayment: (req, res) => {
    try {
      const { id } = req.params;
      let sql = `UPDATE transaction SET status='paid' WHERE id=${id}`;
      db.query(sql, (err, result) => {
        if (err) {
          console.log(err);
          return res
            .status(500)
            .send({ message: "Terima Pembayaran Error", err });
        }
        sql = `UPDATE transaction_detail SET status='onProcess' WHERE paymentId=${id}`;
        db.query(sql, (err, resUpdate) => {
          if (err) {
            console.log(err);
            return res
              .status(500)
              .send({ message: "Update Trans Detail Error", err });
          }

          return res.status(200).send({ message: "Pembayaran Diterima" });
        });
      });
    } catch (error) {
      return res.status(500).json({
        message: "Server Error",
        error: error.message
      });
    }
  }
};
