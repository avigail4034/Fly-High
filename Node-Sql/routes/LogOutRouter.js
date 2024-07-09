const express = require("express");
const router = express.Router();
const jwtAuthentication  = require('../middlewares/jwtAuthentication');
const { LogOutUser } = require("../controllers/LogOutController"); // שימוש בסוגריים עגולים כדי לייבא את הפונקציה כמופיע במודול

router.post("/", jwtAuthentication, LogOutUser);
module.exports = router;
