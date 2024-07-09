
const roleAuthorization = (requiredRoles) => {
    const roleFunction = (req, res, next) => {


        if (!req.userId) {
                res.status(401).send("Unauthoreturnrized");
        }

        if (!requiredRoles.includes(req.roleId)) {
            return res.sendStatus(403);
        }
        return next();
    };

    return roleFunction;
};

module.exports = roleAuthorization;
