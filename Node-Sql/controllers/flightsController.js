const model = require('../models/flightsModel');

async function createFlight(company, airplane_id, exitP, flightCode, price, target, departureDate, arrivalDate, departureTime, arrivalTime, image) {
    try {
        return model.createFlight(company, airplane_id, exitP, flightCode, price, target, departureDate, arrivalDate, departureTime, arrivalTime, image);
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
} async function getArrFlightsByIdToCancel(arrOfFlightsId) {
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


// function compareDates(date1, date2) {
//     const newDate = new Date(client.weddingDate).toISOString().split('T')[0];

//     console.log(date1, date2, "date1, date2");
//     const dateOnly1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
//     const dateOnly2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
//     console.log(dateOnly1, dateOnly2, "");
//     return dateOnly1.getTime() === dateOnly2.getTime();
// }








// async function getFlightByParamsNotDirect(exitP, target, date) {
//     try {
//         const flights = await model.getFlightByExitTarget(exitP, target);
//         const connectingFlights = [];

//         flights.forEach(flight1 => {
//             flights.forEach(flight2 => {
//                 // Convert flight1 and flight2 dates to Date objects
//                 // const arrivalDate1 = new Date(`${flight1.arrivalDate} ${flight1.arrivalTime}`);
//                 // const departureDate2 = new Date(`${flight2.departureDate} ${flight2.departureTime}`);

//                 // Compare the departure date of flight1 with the provided date
//                 if (compareDates(flight1.departureDate, date)) {
//                     if (
//                         flight1.target === flight2.exitP &&
//                         flight1.exitP !== flight2.target &&
//                         flight1.exitP === exitP &&
//                         flight2.target === target
//                     ) {
//                         const diffInDays = Math.abs((arrivalDate1 - departureDate2) / (1000 * 60 * 60 * 24));

//                         if (diffInDays < 1) {

//                             if (departureDate2 >= arrivalDate1) {
//                                 connectingFlights.push({
//                                     Company1: flight1.company,
//                                     Exit1: flight1.exitP,
//                                     Target1: flight1.target,
//                                     Date1: flight1.departureDate,
//                                     ArrivalTime1: flight1.arrivalTime,
//                                     DepartureTime1: flight1.departureTime,
//                                     Company2: flight2.company,
//                                     Exit2: flight2.exitP,
//                                     Target2: flight2.target,
//                                     Date2: flight2.departureDate,
//                                     ArrivalTime2: flight2.arrivalTime,
//                                     DepartureTime2: flight2.departureTime,
//                                     flight1,
//                                     flight2
//                                 });
//                             }
//                         }
//                     }
//                 }
//             });
//         });
//         return connectingFlights;
//     } catch (err) {
//         throw err;
//     }
// }



function compareDates(date1, date2) {
    const newDate1 = new Date(date1);
    newDate1.setDate(newDate1.getDate() + 1); // הוספת יום אחד לתאריך היציאה המבוקש
    const dateOnly1 = newDate1.toISOString().split('T')[0];
    return dateOnly1 === date2;
}



function daysDifference(arrivalDate, arrivalTime, departureDate, departureTime) {
    // יצירת אובייקטי Date מתאריך ושעה הכנסות
    const arrivalDateTime = new Date(arrivalDate + 'T' + arrivalTime);
    const departureDateTime = new Date(departureDate + 'T' + departureTime);

    // בדיקה אם המטוס הראשון מגיע לפני שהמטוס השני יוצא
    if (arrivalDateTime >= departureDateTime) {
        return false; // המטוס הראשון לא מגיע לפני שהמטוס השני יוצא
    }

    // חישוב ההפרש בין המטוסים בימים
    const diffTime = Math.abs(departureDateTime.getTime() - arrivalDateTime.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // בדיקה שההפרש בין המטוסים הוא לא יותר מיום אחד
    if (diffDays > 1) {
        return false; // ההפרש בין המטוסים גדול מיום אחד
    }

    return true; // התנאים מתקיימים - המטוס הראשון מגיע לפני שהמטוס השני יוצא וההפרש ביניהם הוא לא יותר מיום אחד
}

// דוגמה לשימוש בפונקציה
const result = daysDifference('2024-06-10', '10:50:00', '2024-06-11', '08:00:00');
console.log(result); // יציבית - המטוס הראשון מגיע לפני שהמטוס השני יוצא וההפרש ביניהם הוא לא יותר מיום אחד

const result2 = daysDifference('2024-06-11', '12:00:00', '2024-06-11', '08:00:00');
console.log(result2); // שלילית - המטוס הראשון לא מגיע לפני שהמטוס השני יוצא או ההפרש ביניהם גדול מיום אחד




async function getFlightByParamsNotDirect(exitP, target, date) {
    try {
        const flights = await model.getFlightByExitTarget(exitP, target);
        const connectingFlights = [];
        
        flights.forEach(flight1 => {
            flights.forEach(flight2 => {
                if (compareDates(flight1.departureDate, date)) {
                    const flight1ArrivalDate = new Date(flight1.arrivalDate);
                    const arrivalDate = flight1ArrivalDate.toISOString().split('T')[0];
                    const flight2DepartureDate = new Date(flight2.departureDate);
                    const departureDate = flight2DepartureDate.toISOString().split('T')[0];
                    if (
                        flight1.target === flight2.exitP &&
                        flight1.exitP !== flight2.target &&
                        flight1.exitP === exitP &&
                        flight2.target === target &&
                        daysDifference(arrivalDate,flight1.arrivalTime,departureDate,flight2.departureTime) // בדיקת ההפרש בין הטיסות
                    ) {
                        connectingFlights.push([  flight1,
                            flight2]
                          
                        );
                    }
                }
            });
        });
console.log();
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

async function updateFlight(id) {
    try {
        return model.updateFlight(id);
    } catch (err) {
        throw err;
    }
}

module.exports = {
    createFlight,
    getAllflights, getArrFlightsByIdToCancel,
    getFlightById,
    checkDatesController,
    deleteFlight,
    updateFlight,
    getFlightByParams,
    getFlightByParamsNotDirect,
    getFlightByUser,
    getArrFlightsById
};
