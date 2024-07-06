
const express = require("express");
const router = express.Router();
const controller = require("../controllers/usersController");
const jwt = require('jsonwebtoken')
require('dotenv').config()
const roleAuthorization = require('../middlewares/roleAuthorization');
const dynamicCheckAbilities  = require('../middlewares/dynamicCheckAbilities ');
const { lock } = require("./flightsRoutes");


// GET all users
// router.get("/",dynamicCheckAbilities, async (req, res) => {
  router.get("/", async (req, res) => {
  try {
    const userName = req.query.userName;
    const id = req.query.id;
    const password = req.query.password;
    const roleId = req.query.roleId;
    const arrOfUsersId = req.query.arrOfUsersId;
    console.log(id,"id");
//איך אני עושה הבדיקה פה לפי הרשאה??????איפה אני שמה את זה???
    if (userName) {
      let user;
      if (password) {
        user = await controller.getUserByNamePassword(userName, password);
      } else {
        user = await controller.getUserByUserName(userName);
      }
      if (!user) {
        return res.status(404).send({ error: "User not found" });
      }
      res.status(200).send(user);
    } else {
      if (arrOfUsersId) {
        const users = await controller.getArrUsersById(arrOfUsersId);
        if (!users.length) {
          return res.status(404).send({ error: "Users not found" });
        }
        res.status(200).send(users);
      } else if (roleId) {
        const employees = await controller.getArrUsersByRoleId(roleId);
        if (!employees.length) {
          return res.status(404).send({ error: "Employees not found" });
        }
        res.status(200).send(employees);
      }
        else if (id) {
          const user = await controller.getUserById(id);
          if (!user.id) {
            return res.status(404).send({ error: "user not found" });
          }
          res.status(200).send(user);

      } else {
        const users = await controller.getAllUsers();
        res.status(200).send(users);
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to process request" });
  }
});



router.post("/", async (req, res) => {
  try {
    const { userName, password } = req.body; // Assuming you meant to include completed
    const user = await controller.createUser(userName, password);
    if (user) {
      //יצרת TOKEN
      const accessToken = jwt.sign(
        {
          userId: user.id,
          roleId: user.roleId,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "5m" }
      );
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });
      res.status(200).send(user);
    }
    else {
      res.sendStatus(501)
    }
  } catch (error) {
    res.status(500).send({ error: "Failed to create user" });
  }
});



//עדכון משתמש כשמנהל רוצה לשנות סטטוס וגם כשמתמש נכנס בפעם הראושנה-מילוי פרטים
// router.put("/:id" ,dynamicCheckAbilities, async (req, res) => {
  router.put("/:id" , async (req, res) => {
  try {
    const { firstName, lastName, userName, email, phone, roleId } = req.body;
    const user = await controller.updateUser(firstName, lastName, userName, email, phone, roleId, req.params.id);
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    res.status(200).send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to update user" });
  }
});
module.exports = router;