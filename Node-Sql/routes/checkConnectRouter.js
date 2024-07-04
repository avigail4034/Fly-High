


const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const jwtAuthentication  = require('../middlewares/jwtAuthentication');

router.post('/', jwtAuthentication, (req, res) => {
  try {
    // אם הגענו לפה המשתמש אומת בהצלחה
    console.log("jhgfd");
    console.log(req,"req");
    console.log(req.userId,"req.user.userId");
    const userSession = {
      id: req.userId, // הזהות של המשתמש שמסומן ב-token
    };
    console.log(userSession,"userSession");
    res.status(200).json(userSession); // שלח חזרה את פרטי המשתמש
  } catch (error) {
    res.status(403).json({ message: 'Unauthorized' }); // אם יש בעיה באימות ה-token
  }
});

module.exports = router;