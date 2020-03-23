const express = require("express");
const { produkController } = require("../controllers");
const router = express.Router();

router.get("/getproduk/:id", produkController.getProduk);
router.get("/getallprod", produkController.getAllProduct);
router.get("/getdetailprod/:id", produkController.getDetailProduk);
router.post("/addproduk", produkController.addProduk);
router.post("/deleteproduk", produkController.deleteProduk);
router.get("/getkategori", produkController.getAllCategory);
router.get("/getprodcat/:id", produkController.getProdCategory);
router.post("/updateproduk", produkController.updateProduk);

module.exports = router;
