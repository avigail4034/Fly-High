const express = require("express");
const router = express.Router();
const controller = require("../controllers/usersController");
const jwt = require('jsonwebtoken')
require('dotenv').config()

router.post("/", async (req, res) => {
    try {
      const { userName, password } = req.body;
      const user = await controller.getUserByNamePassword(userName, password);
      if (!user) {
        return res.status(404).send({ error: "שם או סיסמא שגויים" });
      }
      else{
      //   const accessToken = jwt.sign(
      //     {
      //         userId: user.id,
      //         roleId: user.roleId,
      //     },
      //     process.env.ACCESS_TOKEN_SECRET,
      //     { expiresIn: "5m" }
      // );
      // res.cookie("accessToken", accessToken, {
      //     httpOnly: true,
      //     sameSite: "None",
      //     secure: true,
      // });
      res.status(200).send(user);
      }
    } catch (error) {
      res.status(500).send({ error: "שגיאה" });
    }
  });

module.exports = router;
