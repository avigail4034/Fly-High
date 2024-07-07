
const roleAuthorization = (requiredRoles) => {
    console.log("oooo");

    const roleFunction = (req, res, next) => {
        console.log("req.userId", req.userId);
        console.log("req.roleId", req.roleId);

        if (!req.userId) {
                res.status(401).send("Unauthoreturnrized");
        }

        if (!requiredRoles.includes(req.roleId)) {
            return res.sendStatus(403);
        }

        console.log("pppp");
        console.log(`User with role ID ${req.roleId} has access`);
        return next();
    };

    return roleFunction;
};

module.exports = roleAuthorization;
