const model = require('../models/orderModel');


async function getFlightsOfUser(ID) {
    try {
        return model.getFlightsOfUser(ID)
    } catch (err) {
        throw err;
    }

}async function getUsersOfFlight(flightId) {
    try {
        return model.getUsersOfFlight(flightId)
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
async function deleteOrderToCancel(flight_id_arr, user_id) {
    try {
        const result = await model.deleteOrderToCancel(flight_id_arr, user_id);
        return result;
    } catch (err) {
        throw err;
    }
}

async function createOrder(user_id,flight_id ,places_arr) {
    try {
        return model.createOrder(user_id,flight_id ,places_arr);
    } catch (err) {
        throw err;
    }
}


module.exports = {getUsersOfFlight,deleteOrderToCancel, createOrder ,getFlightsOfUser,deleteOrder}
