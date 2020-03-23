const { db } = require("../connection");
const { uploader } = require("../helper/uploader");
const fs = require("fs");

module.exports = {
  getProduk: (req, res) => {
    try {
      const { id } = req.params;
      let sql = `SELECT p.*, pi.image FROM products p JOIN products_image pi ON p.id = pi.productsId WHERE usersId=${id} AND deleted=0;`;
      db.query(sql, (err, result) => {
        if (err) res.status(500).send({ message: "server error", err });
        return res.status(200).send(result);
      });
    } catch (error) {}
  },
  addProduk: (req, res) => {
    try {
      const path = "/seller/images";
      const upload = uploader(path, "SELLER").fields([{ name: "image" }]);

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
        let dataproduk = {
          namaProduk: data.nama,
          harga: data.harga,
          deskripsi: data.deskripsi,
          categoryId: data.kategori,
          usersId: data.usersId
        };
        console.log(data);

        var sql = `INSERT INTO products SET ?`;
        db.query(sql, dataproduk, (err, result) => {
          if (err) {
            console.log(err.message);
            fs.unlinkSync("./public" + imagePath);
            return res.status(500).json({
              message: "Server Error",
              error: err.message
            });
          }
          console.log(result);
          const dataimage = { image: imagePath, productsId: result.insertId };
          console.log(dataimage);
          sql = `INSERT INTO products_image SET image='${imagePath}', productsId=${result.insertId}`;
          console.log(sql);
          //db.query(sql);
          db.query(sql, (err, result1) => {
            if (err) {
              return res
                .status(500)
                .json({ message: "Upload Foto Gagal", error: err.message });
            }
            console.log(result1);
          });
          return res.status(200).send({ message: "Insert Produk Berhasil" });
        });
      });
    } catch (error) {
      return res.status(500).json({
        message: "Server Error",
        error: error.message
      });
    }
  },
  deleteProduk: (req, res) => {
    let { produkid, userid } = req.body;
    try {
      var sql = `SELECT * FROM products WHERE id=${produkid} AND usersId=${userid}`;
      db.query(sql, (err, result) => {
        if (err) return res.status(500).send({ message: err });
        if (result.length) {
          sql = `UPDATE products SET deleted=1 WHERE id=${produkid} AND usersId=${userid}`;
          db.query(sql, (err, resUpdate) => {
            if (err) return res.status(500).send({ message: err });
            return res.status(200).send(resUpdate);
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
  getAllCategory: (req, res) => {
    try {
      let sql = `SELECT * FROM products_category`;
      db.query(sql, (err, result) => {
        if (err) res.status(500).send({ message: "Get Category Error" });
        return res.status(200).send(result);
      });
    } catch (error) {
      return res.status(500).json({
        message: "Server Error",
        error: error.message
      });
    }
  },
  getProdCategory: (req, res) => {
    try {
      const { id } = req.params;
      let sql = `SELECT categoryId from products WHERE id=${id}`;

      db.query(sql, (err, result) => {
        if (err) {
          res.status(500).send({ message: "Get Product Category Error" });
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
  updateProduk: (req, res) => {
    try {
      const {
        nama,
        harga,
        deskripsi,
        idproduk,
        usersId,
        kategori,
        stok
      } = req.body;
      const dataproduk = {
        namaProduk: nama,
        harga,
        deskripsi,
        categoryId: kategori,
        stok
      };
      let sql = `UPDATE products SET ? WHERE id=${idproduk} AND usersId=${usersId}`;

      db.query(sql, dataproduk, (err, result) => {
        if (err) {
          return res.status(500).send({ message: "Update Product Error", err });
        }
        console.log("berhasil");
        return res.status(200).send({ message: "Update Berhasil", result });
      });
    } catch (error) {
      return res.status(500).json({
        message: "Server Error",
        error: error.message
      });
    }
  },
  getAllProduct: (req, res) => {
    try {
      let sql = `SELECT p.*, pi.image, up.namatoko
                 FROM products p JOIN products_image pi
                 ON p.id=pi.productsId JOIN users_penjual up
                 ON up.usersId=p.usersId
                 WHERE p.deleted=0 
                 ORDER BY RAND()`;

      db.query(sql, (err, result) => {
        if (err) res.status(500).send({ message: "Get Produk Error", err });
        return res.status(200).send(result);
      });
    } catch (error) {
      return res.status(500).json({
        message: "Server Error",
        error: error.message
      });
    }
  },
  getDetailProduk: (req, res) => {
    try {
      const { id } = req.params;
      let sql = `SELECT p.*, pi.image, up.namatoko
                 FROM products p JOIN products_image pi
                 ON p.id=pi.productsId JOIN users_penjual up
                 ON up.usersId=p.usersId
                 WHERE p.id=${id} AND p.deleted=0;`;

      db.query(sql, (err, result) => {
        if (err)
          res.status(500).send({ message: "Get Detail Produk Error", err });
        return res.status(200).send(result);
      });
    } catch (error) {
      return res.status(500).json({
        message: "Server Error",
        error: error.message
      });
    }
  }
};
