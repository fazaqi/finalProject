const express = require("express");
const { userController } = require("../controllers");
const router = express.Router();

router.get("/login/:id", userController.getUser);
router.get("/login", userController.login);
// router.get("/test", userController.tesCrypto);
router.post("/registuser", userController.regisUser);
router.post("/register/user", userController.register);
router.post("/register/toko", userController.registertoko);

module.exports = router;
