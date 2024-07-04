const cookieParser = require('cookie-parser');
const pool = require('../DB.js');

async function LogOutUser(req, res) {
  try {
    res.clearCookie('accessToken');
    res.status(200).json({ message: 'Logout successful' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to logout' });
  }
}

module.exports = LogOutUser;
