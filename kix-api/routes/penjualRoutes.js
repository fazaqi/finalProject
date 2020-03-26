const express = require("express");
const { penjualController } = require("../controllers");
const router = express.Router();

router.get("/gettrans/:id", penjualController.getOnProcess);
router.get("/getship/:id", penjualController.getOnShipment);
router.get("/getfinish/:id", penjualController.getFinishedTrans);
router.put("/sendproduk", penjualController.sendProduct);

module.exports = router;
