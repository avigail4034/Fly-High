const model = require('../models/placesModel');


async function getPlacesByAirplaneId(ID) {
    try {
        return model.getPlacesByAirplaneId(ID)
    } catch (err) {
        throw err;
    }

}
async function getPlacesById(arrPlaces) {
    try {
        return model.getPlacesById(arrPlaces)
    } catch (err) {
        throw err;
    }

}
async function updatePlaces(airplaneId,arrPlaces) {
    try {
        return model.updatePlaces(airplaneId,arrPlaces)
    } catch (err) {
        throw err;
    }
}
module.exports = {getPlacesById, getPlacesByAirplaneId,updatePlaces}