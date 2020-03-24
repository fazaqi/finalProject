const { db } = require("../connection");
const { uploader } = require("../helper/uploader");
const fs = require("fs");

module.exports = {
  addToCart: (req, res) => {
    try {
      const { idproduk, iduser, idseller, qty } = req.body;
      let data = {
        productsId: idproduk,
        usersId: iduser,
        sellerId: idseller,
        qty
      };
      //   console.log(data);
      let sql = `SELECT * FROM cart 
                 WHERE productsId=${idproduk} 
                 AND usersId=${iduser}
                 AND sellerId=${idseller}`;
      db.query(sql, (err, resultCek) => {
        if (err) {
          return res.status(500).send({ message: "Cek Cart Error", err });
        }
        if (resultCek.length) {
          //Update Qty
          sql = `UPDATE cart SET qty= qty + ${qty} 
                 WHERE productsId=${idproduk} 
                 AND usersId=${iduser}
                 AND sellerId=${idseller} `;
          db.query(sql, (err, resUpdate) => {
            if (err) {
              return res
                .status(500)
                .send({ message: "Update Cart Error", err });
            }
            return res
              .status(200)
              .send({ message: "Cart Diupdate", resUpdate });
          });
        } else {
          sql = `INSERT INTO cart SET ?`;
          db.query(sql, data, (err, resInsert) => {
            if (err) {
              return res
                .status(500)
                .send({ message: "Insert Cart Error", err });
            }
            return res
              .status(200)
              .send({ message: "Cart Ditambahkan", resInsert });
          });
        }
      });
    } catch (error) {
      return res.status(500).json({
        message: "Server Error",
        error: error.message
      });
    }
  },
  getCart: (req, res) => {
    //Get Cart Untuk Angka Di Notif Cart
    try {
      const { id } = req.params;
      let sql = `SELECT count(id) AS cart FROM cart WHERE usersId=${id} AND deleted=0 `;
      db.query(sql, (err, result) => {
        if (err) {
          return res.status(500).send({ message: "Get Cart Error", err });
        }
        // console.log(result[0].data);
        return res.status(200).send({ result });
      });
    } catch (error) {
      return res.status(500).json({
        message: "Server Error",
        error: error.message
      });
    }
  },
  getDetailCart: (req, res) => {
    try {
      const { id } = req.params;
      //   console.log(id);
      let sql = `SELECT c.id, pi.image, up.namatoko, p.namaProduk, p.harga, c.qty, c.productsId, c.sellerId
                 FROM cart c JOIN products p ON c.productsId = p.id
                 JOIN users_penjual up ON c.sellerId=up.usersId
                 JOIN products_image pi ON p.id=pi.productsId
                 WHERE c.usersId=${id} AND c.deleted=0;`;

      db.query(sql, (err, result) => {
        if (err) {
          return res
            .status(500)
            .send({ message: "Get Detail Cart Error", err });
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
  deleteCart: (req, res) => {
    try {
      const { id, usersId } = req.body;
      let sql = `UPDATE cart SET deleted=1 WHERE id=${id} AND usersId=${usersId}`;
      db.query(sql, (err, result) => {
        if (err) {
          return res.status(500).send({ message: "Delete Cart Error", err });
        }
        return res.status(200).send({ message: "delete berhasil", result });
      });
    } catch (error) {
      return res.status(500).json({
        message: "Server Error",
        error: error.message
      });
    }
  }
};
