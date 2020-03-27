const { db } = require("../connection");

module.exports = {
  getProducts: (req, res) => {
    try {
      let sql = `SELECT p.*, pi.image, up.namatoko
            FROM products p JOIN products_image pi
            ON p.id=pi.productsId JOIN users_penjual up
            ON up.usersId=p.usersId
            WHERE p.deleted=0 
            ORDER BY RAND()`;
      db.query(sql, (err, result) => {
        if (err) return res.status(500).send({ message: "Get Produk Error" });
        return res.status(200).send(result);
      });
    } catch (error) {
      return res.status(500).json({
        message: "Server Error",
        error: error.message
      });
    }
  },
  getKategori: (req, res) => {
    try {
      let sql = `SELECT * FROM products_category`;
      db.query(sql, (err, result) => {
        if (err) return res.status(500).send({ message: "Get Kategori Error" });
        return res.status(200).send(result);
      });
    } catch (error) {
      return res.status(500).json({
        message: "Server Error",
        error: error.message
      });
    }
  },
  getProdukbyKategori: (req, res) => {
    try {
      const { id } = req.params;
      let sql = `SELECT p.*, pi.image, up.namatoko
                 FROM products p JOIN products_image pi
                 ON p.id=pi.productsId JOIN users_penjual up
                 ON up.usersId=p.usersId
                 WHERE p.deleted=0 AND p.categoryId=${id} `;
      db.query(sql, (err, result) => {
        if (err) return res.status(500).send({ message: "Get Produk Error" });
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
