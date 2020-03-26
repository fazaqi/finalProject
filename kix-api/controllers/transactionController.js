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
      let sql = `SELECT c.id, pi.image, up.namatoko, p.namaProduk, p.harga, c.qty, c.productsId, c.sellerId, (c.qty*p.harga) AS totharga
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
  },
  checkout: (req, res) => {
    try {
      const { usersId, totalBelanja, dataTrans } = req.body;
      let dataTransaksi = {
        usersId,
        totalharga: totalBelanja,
        status: "waitPayment"
      };
      //UPDATE CART JADI DELETED
      updateCartSql = "";
      dataTrans.map(val => {
        updateCartSql += `UPDATE cart SET deleted=1 WHERE id=${val.id};`;
      });
      db.query(updateCartSql, (err, resultUpdate) => {
        if (err) {
          console.log(err);
          return res
            .status(500)
            .send({ message: "Update Cart deleted Error", err });
        }
        //UPDATE STOK PRODUK
        updateStok = "";
        dataTrans.map(val => {
          updateStok += `UPDATE products SET stok=stok-${val.qty} WHERE id=${val.productsId};`;
        });

        db.query(updateStok, (err, resUpdate) => {
          if (err) {
            console.log(err);
            return res
              .status(500)
              .send({ message: "Insert to transaction Error", err });
          }
          //INSERT KE TABLE TRANSACTION
          let sql = `INSERT INTO transaction SET ?`;
          db.query(sql, dataTransaksi, (err, resInsert) => {
            if (err) {
              console.log(err);
              return res
                .status(500)
                .send({ message: "Insert to transaction Error", err });
            }
            console.log(resInsert);
            //INSERT KE TABLE TRANSACTION_DETAIL
            listInsertTrans = [];
            dataTrans.map(val => {
              listInsertTrans.push([
                usersId,
                val.productsId,
                val.sellerId,
                val.qty,
                val.totharga,
                resInsert.insertId,
                "waitPayment"
              ]);
            });
            console.log(listInsertTrans);

            sql = `INSERT INTO transaction_detail (usersId,productsId,sellerId,qty,harga,paymentId,status) VALUES ?`;
            db.query(sql, [listInsertTrans], (err, resInsertTrans) => {
              if (err) {
                console.log(err);
                return res
                  .status(500)
                  .send({ message: "Insert to transaction_detail Error", err });
              }
              return res.status(200).send({ message: "Transaksi Berhasil" });
            });
          });
        });
      });
    } catch (error) {
      return res.status(500).json({
        message: "Server Error",
        error: error.message
      });
    }
  },
  getAllTrans: (req, res) => {
    try {
      const { id } = req.params;
      let sql = `SELECT td.id,td.paymentId AS orderId, p.namaProduk, pi.image, td.qty, p.harga , td.harga AS totHarga, up.namatoko, td.status, td.productsId, td.sellerId
                 FROM transaction_detail td JOIN products p ON td.productsId=p.id
                 JOIN products_image pi ON td.productsId=pi.productsId
                 JOIN users_penjual up ON td.sellerId=up.usersId
                 WHERE td.usersId=${id}`;
      db.query(sql, (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).send({ message: "Get Error", err });
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
  getUnpaidTrans: (req, res) => {
    try {
      const { id } = req.params;
      let sql = `SELECT * FROM transaction WHERE usersId=${id} AND status='waitPayment'`;
      db.query(sql, (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).send({ message: "Get Error", err });
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
  getDetailUnpaid: (req, res) => {
    try {
      const { id, paymentId } = req.body;
      let sql = `SELECT td.id,td.paymentId AS orderId, p.namaProduk, pi.image, td.qty, p.harga , td.harga AS totHarga, up.namatoko, td.status, td.productsId, td.sellerId
                 FROM transaction_detail td JOIN products p ON td.productsId=p.id
                 JOIN products_image pi ON td.productsId=pi.productsId
                 JOIN users_penjual up ON td.sellerId=up.usersId
                 JOIN transaction t ON td.paymentId=t.id
                 WHERE td.usersId=${id} AND td.paymentId=${paymentId};`;
      db.query(sql, (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).send({ message: "Get Error", err });
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
  cancelOrder: (req, res) => {
    try {
      const { id } = req.params;
      let sql = `UPDATE transaction SET status='cancelled' WHERE id=${id}`;
      db.query(sql, (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).send({ message: "Get Error", err });
        }

        sql = `UPDATE transaction_detail SET status='cancelled' WHERE paymentId=${id}`;
        db.query(sql, (err, resUpdate) => {
          if (err) {
            console.log(err);
            return res.status(500).send({ message: "Get Error", err });
          }
          sql = `SELECT * FROM transaction_detail WHERE paymentId=${id}`;
          db.query(sql, (err, resSelect) => {
            if (err) {
              console.log(err);
              return res.status(500).send({ message: "Get Error", err });
            }
            console.log(resSelect);
            var updateStok = "";
            resSelect.map(val => {
              updateStok += `UPDATE products SET stok=stok+${val.qty} WHERE id=${val.productsId};`;
            });
            db.query(updateStok, (err, resStok) => {
              if (err) {
                console.log(err);
                return res.status(500).send({ message: "Get Error", err });
              }
              return res.status(200).send(resStok);
            });
          });
        });
      });
    } catch (error) {
      return res.status(500).json({
        message: "Server Error",
        error: error.message
      });
    }
  },
  uploadPembayaran: (req, res) => {
    try {
      const path = "/payment/images";
      const upload = uploader(path, "PAYMENT").fields([{ name: "image" }]);

      upload(req, res, err => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Upload Foto Gagal", error: err.message });
        }

        console.log("masuk upload");
        const { image } = req.files;
        console.log(image);
        const imagePath = image ? path + "/" + image[0].filename : null;
        console.log(imagePath);
        const data = JSON.parse(req.body.data);

        console.log(data.id);

        let sql = `UPDATE transaction SET buktibayar='${imagePath}', status='onPaymentConfirmation' WHERE id=${data.id}`;
        console.log(sql);
        db.query(sql, (err, result) => {
          if (err) {
            console.log(err.message);
            fs.unlinkSync("./public" + imagePath);
            return res.status(500).json({
              message: "Server Error",
              error: err.message
            });
          }
          sql = `UPDATE transaction_detail SET status='onPaymentConfirmation' WHERE paymentId=${data.id}`;
          db.query(sql, (err, result) => {
            if (err) {
              console.log(err);
              return res
                .status(500)
                .send({ message: "Update Status Gagal", err });
            }

            return res.status(200).send({ message: "Pembayaran Diterima" });
          });
        });
      });
    } catch (error) {
      return res.status(500).json({
        message: "Server Error",
        error: error.message
      });
    }
  },
  terimaBarang: (req, res) => {
    try {
      const { id, usersId } = req.body;
      let sql = `UPDATE transaction_detail SET status='finished' WHERE id=${id} AND usersId=${usersId}`;
      db.query(sql, (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).send({ message: "Update Status Gagal", err });
        }
        return res.status(200).send({ message: "Transaksi Selesai" });
      });
    } catch (error) {
      return res.status(500).json({
        message: "Server Error",
        error: error.message
      });
    }
  }
};
