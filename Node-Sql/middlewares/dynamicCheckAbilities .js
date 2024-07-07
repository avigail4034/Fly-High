
const roleAuthorization = require('./roleAuthorization');
const jwtAuthentication = require('./jwtAuthentication');
require('dotenv').config();


const dynamicCheckAbilities = (req, res, next) => {
  const userId = req.userId;
        const roleId = req.roleId;

  console.log("fhjfymm", userId,userId);
  //  const user = req.body.userDetails;
  //  console.log(user,"user");
    // const id = req.params.id;
  console.log("dynamicCheckAbilities");
  // console.log(user.roleId,"user.roleId");
    // אם המשתמש אינו מוגדר או שה-roleId שלו אינו קיים
    if (!userId || !roleId) {
      return res.status(403).send({ message: "User not authenticated" });
    }
    
    // אם ה-roleId שווה ל-1 או 2, יש לבצע בדיקת הרשאות
    if (roleId == "1" || roleId== "2") {
      console.log("auuauu");
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
  
