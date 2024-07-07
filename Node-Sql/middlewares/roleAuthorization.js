const roleAuthorization = (requiredRoles) => {
    console.log("oooo");

    const roleFunction = (req, res, next) => {
        const userId = req.body.userDetails.id;
        const userRoleId = req.body.userDetails.roleId;

        if (!userId) {
            return res.status(401).send("Unauthorized");
        }

        if (!requiredRoles.includes(userRoleId)) {
            return res.sendStatus(403);
        }

        console.log("pppp");
        console.log(`User with role ID ${userRoleId} has access`);
        return next();
    };

    return roleFunction;
};

module.exports = roleAuthorization;
