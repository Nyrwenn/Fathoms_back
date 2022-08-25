const express = require("express");
const adminCtrl = require("../controllers/adminControllers");
const router = express.Router();
const auth = require("../middlewares/auth");

router.post("/signup", adminCtrl.signup);
router.post("/login", adminCtrl.login);
router.get("/me", auth, adminCtrl.me);

module.exports = router;
