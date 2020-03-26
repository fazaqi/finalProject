const { db } = require("../connection");

module.exports = {
  getOnProcess: (req, res) => {
    try {
      const { id } = req.params;
      console.log(id);
      let sql = `SELECT td.id,td.paymentId AS orderId, p.namaProduk, pi.image, td.qty, p.harga , td.harga AS totHarga, up.namatoko, td.status, td.productsId, td.sellerId
                 FROM transaction_detail td JOIN products p ON td.productsId=p.id
                 JOIN products_image pi ON td.productsId=pi.productsId
                 JOIN users_penjual up ON td.sellerId=up.usersId
                 WHERE td.sellerId=${id} AND td.status='onProcess'`;
      db.query(sql, (err, result) => {
        if (err) {
          return res.status(500).send({ message: "Get Trans Error", err });
        }
        return res.status(200).send(result);
      });
    } catch (error) {
      return res.status(500).json({
        message: "Server Error",
        error: error.message
      });
    }
  },
  getOnShipment: (req, res) => {
    try {
      const { id } = req.params;
      console.log(id);
      let sql = `SELECT td.id,td.paymentId AS orderId, p.namaProduk, pi.image, td.qty, p.harga , td.harga AS totHarga, up.namatoko, td.status, td.productsId, td.sellerId
                 FROM transaction_detail td JOIN products p ON td.productsId=p.id
                 JOIN products_image pi ON td.productsId=pi.productsId
                 JOIN users_penjual up ON td.sellerId=up.usersId
                 WHERE td.sellerId=${id} AND td.status='onShipment'`;
      db.query(sql, (err, result) => {
        if (err) {
          return res.status(500).send({ message: "Get Trans Error", err });
        }
        return res.status(200).send(result);
      });
    } catch (error) {
      return res.status(500).json({
        message: "Server Error",
        error: error.message
      });
    }
  },
  getFinishedTrans: (req, res) => {
    try {
      const { id } = req.params;
      console.log(id);
      let sql = `SELECT td.id,td.paymentId AS orderId, p.namaProduk, pi.image, td.qty, p.harga , td.harga AS totHarga, up.namatoko, td.status, td.productsId, td.sellerId
                 FROM transaction_detail td JOIN products p ON td.productsId=p.id
                 JOIN products_image pi ON td.productsId=pi.productsId
                 JOIN users_penjual up ON td.sellerId=up.usersId
                 WHERE td.sellerId=${id} AND td.status='finished'`;
      db.query(sql, (err, result) => {
        if (err) {
          return res.status(500).send({ message: "Get Trans Error", err });
        }
        return res.status(200).send(result);
      });
    } catch (error) {
      return res.status(500).json({
        message: "Server Error",
        error: error.message
      });
    }
  },
  sendProduct: (req, res) => {
    try {
      const { id, sellerId } = req.body;
      let sql = `UPDATE transaction_detail SET status='onShipment' WHERE id=${id} AND sellerId=${sellerId}`;
      db.query(sql, (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).send({ message: "Update Trans Error", err });
        }
        return res.status(200).send({ message: "Berhasil Dikirim" });
      });
    } catch (error) {
      return res.status(500).json({
        message: "Server Error",
        error: error.message
      });
    }
  }
};
