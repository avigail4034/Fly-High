const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken')
const controller = require("../controllers/usersController");
require('dotenv').config()

router.post("/", async (req, res) => {
    try {
      const { userName, password } = req.body;
      const user = await controller.getUserByNamePassword(userName, password);
      if (!user) {
        return res.status(404).send({ error: 'אין משתמש'});
      }
      else{
        //יצירת TOKEN
        const accessToken = jwt.sign(
          {
              userId: user.id,
              roleId: user.roleId,
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "1h" }
      );
      res.cookie("accessToken", accessToken, {
          httpOnly: true,
          sameSite: "None",
          secure: true,
      });
      res.status(200).send(user);
      }
    } catch (error) {
      res.status(500).send({ error: "שגיאה" });
    }
  });

module.exports = router;
