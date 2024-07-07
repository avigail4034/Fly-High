
const roleAuthorization = (requiredRoles) => {
    const roleFunction = (req, res, next) => {


        if (!req.userId) {
                res.status(401).send("Unauthoreturnrized");
        }

        if (!requiredRoles.includes(req.roleId)) {
            return res.sendStatus(403);
        }
        // console.log(`User with role ID ${req.roleId} has access`);
        return next();
    };

    return roleFunction;
};

module.exports = roleAuthorization;
