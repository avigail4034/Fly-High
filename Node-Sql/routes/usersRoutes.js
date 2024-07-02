
const express = require("express");
const router = express.Router();
const controller = require("../controllers/usersController");
const jwt = require('jsonwebtoken')
require('dotenv').config()


// GET all users
router.get("/", async (req, res) => {
  const userName = req.query.userName;
  const password = req.query.password;
  const roleId = req.query.roleId;
  const arrOfUsersId = req.query.arrOfUsersId;

  if (userName) {
    if (password) {
      try {

        user = await controller.getUserByNamePassword(userName, password);

        if (!user) {
          return res.status(404).send({ error: "User not found" });
        }
        res.status(200).send(user);
      } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Failed to fetch user" });
      }
    }
    else {
      try {
        user = await controller.getUserByUserName(userName);
        if (!user) {
          return res.status(404).send({ error: "User not found" });
        }
        res.status(200).send(user);
      } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Failed to fetch user" });
      }
    }
  }
  else {

    try {
      if (arrOfUsersId) {
        const users = await controller.getArrUsersById(arrOfUsersId);
        res.status(200).send(users);

      } 
      else if(roleId){
        console.log(roleId,"roleId");
        const employees = await controller.getArrUsersByRoleId(roleId);
        res.status(200).send(employees);
      }
      else {
        const users = await controller.getAllUsers();
        res.status(200).send(users);
      }

    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Failed to fetch users" });
    }
  }
});


//פונקציה שמשמשת כאשר לקוח נרשפ פעם ראשונה למערכת (לאחר בדיקה שבאמת הוא לא קיים)
router.post("/", async (req, res) => {
  try {
    const { userName, password } = req.body; // Assuming you meant to include completed
    const user = await controller.createUser(userName, password);
    if(user){
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



// PUT (update) an existing user by userName
router.put("/:id", async (req, res) => {
  try {
    const { firstName, lastName, userName, email, phone, roleId } = req.body; // Assuming you meant to include completed
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