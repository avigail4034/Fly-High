const model = require('../models/cancelModel');


async function getCancelOfUser(ID) {
    try {
        return model.getCancelOfUser(ID)
    } catch (err) {
        throw err;
    }

}async function getCancelOfFlight(flightId) {
    try {
        return model.getCancelOfFlight(flightId)
    } catch (err) {
        throw err;
    }

}

async function deleteOrder(flight_id,arrPlaces) {
    try {
        const result = await model.deleteOrder(flight_id,arrPlaces);
        return result;
    } catch (err) {
        throw err;
    }
}

async function createCancel(flightId ,arrUsersCancel) {
    try {
        return model.createCancel(flightId ,arrUsersCancel);
    } catch (err) {
        throw err;
    }
}
async function deleteCancel(flight_id_arr, user_id) {
    try {
        const result = await model.deleteCancel(flight_id_arr, user_id);
        return result;
    } catch (err) {
        throw err;
    }
}


module.exports = {getCancelOfFlight,createCancel,deleteCancel,getCancelOfUser,deleteOrder}
