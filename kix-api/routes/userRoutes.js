const express = require("express");
const { userController } = require("../controllers");
const router = express.Router();

router.post("/getuser", userController.getDetailUser);
router.get("/getdetailtoko/:id", userController.getDetailToko);
router.put("/updateuser/:id", userController.updateUser);
router.put("/updatetoko/:id", userController.updateToko);
router.post("/resetpass", userController.changePass);

module.exports = router;
