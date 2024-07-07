const model = require('../models/usersModel');
const bcrypt = require('bcrypt');

async function getAllUsers() {
    try {
        return model.getAllUsers()
    } catch (err) {
        throw err;
    }
}
async function getArrUsersById(arrOfUsersId) {
    try {
        return model.getArrUsersById(arrOfUsersId);
    } catch (err) {
        throw err;
    }
}
async function getArrUsersByRoleId(roleId) {
    try {
        return model.getArrUsersByRoleId(roleId);
    } catch (err) {
        throw err;
    }
}
async function getUserByUserName(userName) {
    try {
        return model.getUserByUserName(userName)
    } catch (err) {
        throw err;
    }
}

async function getUserById(id) {
    try {
        return model.getUserById(id)
    } catch (err) {
        throw err;
    }
}
async function getUserByNamePassword(userName, password) {
    try {
        const user = await model.getUserByUserName(userName);
        if (user) {
            if (bcrypt.compareSync(password, user.password))
                return user;
        }
        else {
           return;
        }
    } catch (err) {
        throw err;
    }
}


async function createUser(userName, password) {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        return model.createUser(userName, hashedPassword);
    } catch (err) {
        throw err;
    }
}

async function updateUser(firstName, lastName, email, phone,roleId,id){
    try {
        return model.updateUser(firstName, lastName, email, phone,roleId,id)
    } catch (err) {
        throw err;
    }
}

module.exports = { createUser,getArrUsersById,getUserById, getAllUsers, getUserByUserName, updateUser, getUserByNamePassword ,getArrUsersByRoleId}