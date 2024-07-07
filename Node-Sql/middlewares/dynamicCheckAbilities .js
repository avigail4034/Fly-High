
const roleAuthorization = require('./roleAuthorization');
const jwtAuthentication = require('./jwtAuthentication');
require('dotenv').config();


const dynamicCheckAbilities = (req, res, next) => {
   const user = req.body.userDetails;
   console.log(user,"user");
    // const id = req.params.id;
  console.log("dynamicCheckAbilities");
  console.log(user.roleId,"user.roleId");
    // אם המשתמש אינו מוגדר או שה-roleId שלו אינו קיים
    if (!user || !user.roleId) {
      return res.status(403).send({ message: "User not authenticated" });
    }
    
    // אם ה-roleId שווה ל-1 או 2, יש לבצע בדיקת הרשאות
    if (user.roleId == "1" || user.roleId == "2") {
      console.log("auuauu");
      // בדיקת הרשאה באמצעות middleware roleAuthorization
      roleAuthorization([1, 2])(req, res, next);
   
    }else if(user.roleId == "3"){
        jwtAuthentication(req, res, next);
    } else {
      // אם ה-roleId אינו 1 או 2, נמשיך לפונקציה הראשית בלי לבצע בדיקת הרשאות
      next();
    }
  };
  module.exports = dynamicCheckAbilities ;
  
