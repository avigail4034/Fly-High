const model = require('../models/airplaneModel');


async function getAirplaneById(ID) {
    try {
        return model.getAirplaneById(ID)
    } catch (err) {
        throw err;
    }

}async function getAirplaneByCompany(company)
{
    try {
        return model.getAirplaneByCompany(company)

    } catch (err) {
        throw err;
    }

}
module.exports = { getAirplaneById,getAirplaneByCompany}