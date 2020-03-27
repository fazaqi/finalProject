const express = require("express");
const { shopController } = require("../controllers");
const router = express.Router();

router.get("/getproduk", shopController.getProducts);
router.get("/getkategori", shopController.getKategori);
router.get("/getprodkat/:id", shopController.getProdukbyKategori);

module.exports = router;
