const express = require("express");
const { userController } = require("../controllers");
const router = express.Router();

router.get("/getuser/:id", userController.getDetailUser);
router.put("/updateuser/:id", userController.updateUser);

module.exports = router;
