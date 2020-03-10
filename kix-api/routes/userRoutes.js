const express = require("express");
const { userController } = require("../controllers");
const router = express.Router();

router.post("/getuser", userController.getDetailUser);
router.put("/updateuser/:id", userController.updateUser);

module.exports = router;
