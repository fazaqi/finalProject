const express = require("express");
const { produkController } = require("../controllers");
const router = express.Router();

router.get("/getproduk/:id", produkController.getProduk);
router.post("/addproduk", produkController.addProduk);
router.post("/deleteproduk", produkController.deleteProduk);

module.exports = router;
