
const bcrypt = require('bcrypt');

const LogOutUser = (req, res, next) => {

    try {
      res.clearCookie('accessToken');
      res.status(200).json({ message: 'התנתקת בהצלחה' });
    } catch (err) {
      res.status(500).json({ error: 'שגיאה בתהליך ההתנתקות' });
    }
}

module.exports = { LogOutUser}