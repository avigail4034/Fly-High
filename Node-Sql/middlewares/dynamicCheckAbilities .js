
const roleAuthorization = require('./roleAuthorization');
const jwtAuthentication = require('./jwtAuthentication');
require('dotenv').config();


const dynamicCheckAbilities = (req, res, next) => {
  const userId = req.userId;
        const roleId = req.roleId;



    //אם המשתמש אינו מוגדרה-
    if (!userId ) {
      return res.status(403).send({ message: "User not authenticated" });
    }
    
    // אם ה-roleId שווה ל-1 או 2, יש לבצע בדיקת הרשאות
    if (roleId == "1" || roleId== "2") {
      // בדיקת הרשאה באמצעות middleware roleAuthorization
      roleAuthorization([1, 2])(req, res, next);
   
    }else if(roleId == "3"){
        jwtAuthentication(req, res, next);
    } else {
      // אם ה-roleId אינו 1 או 2, נמשיך לפונקציה הראשית בלי לבצע בדיקת הרשאות
      next();
    }
  };
  module.exports = dynamicCheckAbilities ;
  
