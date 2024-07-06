
const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken')
require('dotenv').config()
const jwtAuthentication  = require('../middlewares/jwtAuthentication');

  router.post("/",jwtAuthentication, (req, res) => {
    try {
      res.clearCookie('accessToken');
      res.status(200).json({ message: 'התנתקת בהצלחה' });
    } catch (err) {
      res.status(500).json({ error: 'שגיאה בתהליך ההתנתקות' });
    }
  });
  

  module.exports = router;

  