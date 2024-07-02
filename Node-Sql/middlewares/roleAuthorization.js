
//אימות תפקידים לפי המשתמש המחובר, ולוודא שיש לו את ההרשאות הנדרשות על מנת לגשת למסלול או למשאב
const roleAuthorization = (requiredRoles) => {
    return (req, res, next) => {
        if (!req.userId) {
            return res.status(401)
        }

        if (!requiredRoles.includes(req.roleId)) {
            return res.sendStatus(403)
        }

        console.log(`User with role ID ${req.roleId} has access`);
        return next();
    };
}

module.exports = roleAuthorization;
