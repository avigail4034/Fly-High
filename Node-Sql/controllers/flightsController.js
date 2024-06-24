const model = require('../models/flightsModel');

async function createFlight(company, airplane_id, exitP, flightCode, price, target, departureDate, arrivalDate, departureTime, arrivalTime,image) {
    try {
        return model.createFlight(company, airplane_id, exitP, flightCode, price, target, departureDate, arrivalDate, departureTime, arrivalTime,image);
    } catch (err) {
        throw err;
    }
}

async function getAllflights() {
    try {
        return model.getAllflights();
    } catch (err) {
        throw err;
    }
}
async function getArrFlightsById(arrOfFlightsId) {
    try {
        return model.getArrFlightsById(arrOfFlightsId);
    } catch (err) {
        throw err;
    }
}async function getArrFlightsByIdToCancel(arrOfFlightsId) {
    try {
        return model.getArrFlightsByIdToCancel(arrOfFlightsId);
    } catch (err) {
        throw err;
    }
}
async function getFlightById(ID) {
    try {
        return model.getFlightById(ID);
    } catch (err) {
        throw err;
    }
}

async function checkDatesController(departureDate, arrivalDate, airplane_id) {
    try {
        return await model.checkDatesModel(departureDate, arrivalDate, airplane_id);
    } catch (err) {
        throw err;
    }
}

async function getFlightByParams(exitP, target, date) {
    try {
        return model.getFlightByParams(exitP, target, date);
    } catch (err) {
        throw err;
    }
}


function compareDates(date1, date2) {
    console.log(date1, date2,"date1, date2");
    const dateOnly1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
    const dateOnly2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
    console.log(dateOnly1,dateOnly2,"");
    return dateOnly1.getTime() === dateOnly2.getTime();
}

async function getFlightByParamsNotDirect(exitP, target, date) {
    try {
        const flights = await model.getFlightByExitTarget(exitP, target);
        const connectingFlights = [];
        flights.forEach(flight1 => {
            flights.forEach(flight2 => {
                    if (
                        flight1.target === flight2.exitP &&
                        flight1.exitP !== flight2.target &&
                        flight1.exitP === exitP &&
                        flight2.target === target
                    ) {
                        
                                connectingFlights.push({
                                    Company1: flight1.company,
                                    Exit1: flight1.exitP,
                                    Target1: flight1.target,
                                    Date1: flight1.departureDate,
                                    ArrivalTime1: flight1.arrivalTime,
                                    DepartureTime1: flight1.departureTime,
                                    Company2: flight2.company,
                                    Exit2: flight2.exitP,
                                    Target2: flight2.target,
                                    Date2: flight2.departureDate,
                                    ArrivalTime2: flight2.arrivalTime,
                                    DepartureTime2: flight2.departureTime,

                                    flight1,
                                    flight2
                                });
                            
                        
                    
                }
            });
        });
        return connectingFlights;
    } catch (err) {
        throw err;
    }
}

// function compareDates(flightDate, givenDate) {
//     // Ensure both dates are in Date object format
//     const flightDateObj = new Date(flightDate);
//     const givenDateObj = new Date(givenDate);

//     // Compare year, month, and date
//     return (
//         flightDateObj.getFullYear() === givenDateObj.getFullYear() &&
//         flightDateObj.getMonth() === givenDateObj.getMonth() &&
//         flightDateObj.getDate() === givenDateObj.getDate()
//     );
// }


async function getFlightByUser(ID) {
    try {
        return model.getFlightByUser(ID);
    } catch (err) {
        throw err;
    }
}

async function deleteFlight(ID) {
    try {
        const result = await model.deleteFlight(ID);
        if (result === false) {
            return false;
        }
        return result;
    } catch (err) {
        throw err;
    }
}

async function updateFlight(id,  company, airplain_id, exitP, flightCode, price, target, departureDate, arrivalDate, departureTime, arrivalTime, active,image) {
    try {
        return model.updateFlight(id,  company, airplain_id, exitP, flightCode, price, target, departureDate, arrivalDate, departureTime, arrivalTime, active,image);
    } catch (err) {
        throw err;
    }
}

module.exports = {
    createFlight,
    getAllflights,getArrFlightsByIdToCancel,
    getFlightById,
    checkDatesController,
    deleteFlight,
    updateFlight,
    getFlightByParams,
    getFlightByParamsNotDirect,
    getFlightByUser,
    getArrFlightsById
};
