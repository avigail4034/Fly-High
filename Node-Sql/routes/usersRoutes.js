
const express = require("express");
const router = express.Router();
const controller = require("../controllers/usersController");
const jwt = require('jsonwebtoken')
require('dotenv').config()
const jwtAuthentication = require('../middlewares/jwtAuthentication');
const dynamicCheckAbilities  = require('../middlewares/dynamicCheckAbilities ');



//יצירת משתשמש חדש- כולם יכולים...
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
        { expiresIn: "1h" }
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
router.put("/:id",jwtAuthentication, dynamicCheckAbilities, async (req, res) => {
  try {
    let firstName, lastName, email, phone, roleId;
    if (req.body.updatedUser) {//מקרה שזה עדכון ממנהל 
      ({ firstName, lastName, email, phone, roleId } = req.body.updatedUser);
      id=req.body.updatedUser.id;
    } else if (req.body.userDetails) {//עדכון של משתמש כשנרשם
      ({ firstName, lastName, email, phone, roleId } = req.body.userDetails);
      id=req.params.id;
    } else {
      return res.status(400).send({ error: "Invalid request body" });
    }
    const user = await controller.updateUser(firstName, lastName, email, phone, roleId, id);
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    res.status(200).send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to update user" });
  }
});


router.get("/", async (req, res) => {
  try {
    const userName = req.query.userName;
    const id = req.query.id;
    const password = req.query.password;
    const roleId = req.query.roleId;
    const arrOfUsersId = req.query.arrOfUsersId;
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
        console.log(employees.length,"employees");
        if (employees.length) {
          res.status(200).send(employees);
        }
        else {res.status(404).send({ error: "Employees not found" });}
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


module.exports = router;
