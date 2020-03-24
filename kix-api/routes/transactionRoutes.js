const express = require("express");
const { transactionController } = require("../controllers");
const router = express.Router();

router.get("/getcart/:id", transactionController.getCart);
router.get("/getdetailcart/:id", transactionController.getDetailCart);
router.post("/addtocart", transactionController.addToCart);
router.post("/deletecart", transactionController.deleteCart);

module.exports = router;
