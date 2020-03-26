const express = require("express");
const { transactionController } = require("../controllers");
const router = express.Router();

router.get("/getcart/:id", transactionController.getCart);
router.get("/getdetailcart/:id", transactionController.getDetailCart);
router.post("/addtocart", transactionController.addToCart);
router.post("/deletecart", transactionController.deleteCart);
router.post("/checkout", transactionController.checkout);
router.get("/alltrans/:id", transactionController.getAllTrans);
router.get("/unpaidtrans/:id", transactionController.getUnpaidTrans);
router.post("/detailtrans", transactionController.getDetailUnpaid);
router.put("/cancelorder/:id", transactionController.cancelOrder);
router.post("/uploadpayment", transactionController.uploadPembayaran);
router.post("/terimabarang", transactionController.terimaBarang);

module.exports = router;
