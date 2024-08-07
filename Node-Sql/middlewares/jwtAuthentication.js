//ףאם האימות עובר בהצלחה, היא מעבירה את נתוני המשתמש הלאה.אימות טוקן 
const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtAuthentication = (req, res, next) => {
    const cookieToken = req.cookies.accessToken;
    if (!cookieToken) return res.status(401).json({ message: "Access token not found" });
//פיענוח
    jwt.verify(
        cookieToken,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.status(403).json({ message: "Invalid token" });
            req.userId = decoded.userId; 
            req.roleId = decoded.roleId; 
            console.log(" req.userId", req.userId);
            return next();
        }
    );
};

module.exports = jwtAuthentication;
