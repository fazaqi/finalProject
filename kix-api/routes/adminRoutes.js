const express = require("express");
const { adminController } = require("../controllers");
const router = express.Router();

router.get("/gettrans", adminController.getPayment);
router.put("/tolakpayment/:id", adminController.tolakPayment);
router.put("/terimapayment/:id", adminController.terimaPayment);

module.exports = router;
