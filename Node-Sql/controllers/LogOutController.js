const model = require('../models/LogOutModel');
const bcrypt = require('bcrypt');

async function LogOutUser() {
    try {
        return model.LogOutUser()
    } catch (err) {
        throw err;
    }
}



module.exports = { LogOutUser}