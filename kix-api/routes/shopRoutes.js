const express = require("express");
const { shopController } = require("../controllers");
const router = express.Router();

router.get("/getproduk", shopController.getProducts);

module.exports = router;
