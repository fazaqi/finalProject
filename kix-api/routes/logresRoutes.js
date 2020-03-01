const express = require("express");
const { loginController, registerController } = require("../controllers");
const router = express.Router();

router.get("/login/:id", loginController.getUser);
router.get("/login", loginController.login);
router.post("/registuser", registerController.regisUser);
router.post("/registtoko", registerController.regisToko);

module.exports = router;
