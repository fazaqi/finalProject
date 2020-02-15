const express = require("express");
const { userController } = require("../controllers");
const router = express.Router();

router.get("/login", userController.login);
router.get("/login/:id", userController.getUser);
router.get("/test", userController.tesCrypto);
router.post("/register/user", userController.register);
router.post("/register/toko", userController.registertoko);

module.exports = router;
