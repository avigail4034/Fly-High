const pool = require('../DB.js');


async function getAllflights() {
  try {
    const sql = 'SELECT * FROM flights where active=1';
    const [rows, fields] = await pool.query(sql);
    return rows;
  } catch (err) {
   throw err;
  }
}
//id, company, exitP, flightCode, target, date
async function getFlightById(ID) {
  try {
    const sql = 'SELECT * FROM flights where id=? AND active=1';
    const result = await pool.query(sql, [ID]);
    return result[0][0];
  } catch (err) {
    throw err;
  }
}
//אולי זה בעייתי שיש תקריאה הזאתי? יכולנו לקחת את כל המטוסים ולסנן רק את הID המתאימים
async function getArrFlightsById(arrOfFlightsId) {
  try {
      const flights = [];
      console.log(arrOfFlightsId,"arrOfFlightsId");
      for (const id of arrOfFlightsId) {
          const sql = 'SELECT * FROM flights WHERE active = 1 AND id = ?';
          const [rows] = await pool.query(sql, [id]);
          if (rows.length > 0) {
              flights.push(rows[0]);
          }
      }
      console.log(flights,"flights");
      return flights;
  } catch (err) {
      throw err;
  }
}
async function getArrFlightsByIdToCancel(arrOfFlightsId) {
  try {
      const flights = [];
      for (const id of arrOfFlightsId) {
          const sql = 'SELECT * FROM flights WHERE active = 0 AND id = ?';
          const [rows] = await pool.query(sql, [id]);
          if (rows.length > 0) {
              flights.push(rows[0]);
          }
      }
      return flights;
  } catch (err) {
      throw err;
  }
}



async function checkDatesModel(departureDate, arrivalDate, airplane_id) {//בדיקה שהמטוס לא תפוס בימים מסוימים
  try {
    const [rows] = await pool.query(
      'SELECT airplain_id FROM flights WHERE airplain_id = ? AND ((departureDate BETWEEN ? AND ?) OR (arrivalDate BETWEEN ? AND ?) OR (departureDate <= ? AND arrivalDate >= ?))',
      [airplane_id, departureDate, arrivalDate, departureDate, arrivalDate, departureDate, arrivalDate]
    );

    const unavailableAirplanes = rows.map(row => row.airplain_id);
    return { success: true, unavailableAirplanes };
  } catch (error) {
    console.error(error);
    throw new Error('Error checking flight dates');
  }
}



async function getFlightByExitTarget(exitP,target) {
  try {
    const sql = 'SELECT * FROM flights where exitP=? OR target=? AND active=1';
    const result = await pool.query(sql, [exitP,target]);
    return result[0];
  } catch (err) {
    throw err;
  }
}

async function getFlightByParams(exitP,target,date) {
  try {
    const sql = 'SELECT * FROM flights where exitP=? AND target=? AND departureDate=? AND active=1';

    const result = await pool.query(sql, [exitP,target,date]);
    console.log(result[0],"Paris");
    return result[0];
  } catch (err) {
    throw err;
  }
}

// async function getFlightByUser(userID) {
//   try {
//     const sql = 'SELECT * FROM flights where id=?';
//     const [rows, fields] = await pool.query(sql, [userID]);
//     return rows;

//   } catch (err) {
//     throw err;
//   }
// }
async function createFlight(company, airplane_id, exitP, flightCode, price, target, departureDate, arrivalDate, departureTime, arrivalTime,image ) {
  try {
    const sql = `INSERT INTO flights (company, airplain_id, exitP, flightCode, price, target, departureDate, arrivalDate, departureTime, arrivalTime ,active,image) VALUES (?,?,?, ?, ?,?,?,?,?,?,?,?)`;
    const [result] = await pool.query(sql, [company, airplane_id, exitP, flightCode, price, target, departureDate, arrivalDate, departureTime, arrivalTime ,1,image]);
    const newFlightID = result.insertId;
    return  {"id":newFlightID, "company": company,"airplain_id":airplane_id, "exitP": exitP ,"flightCode":flightCode,"price":price, "target":target,  "departureDate":departureDate, "arrivalDate":arrivalDate, "departureTime":departureTime, "arrivalTime":arrivalTime ,"active":1,"image":image};
  } catch (err) {
    throw err;
  }
}

async function deleteFlight(FlightID) {
  try {
      const sql = `DELETE FROM flights WHERE id = ?`;
      const result = await pool.query(sql, [FlightID]);
      return result[0][0];
    
  } catch (err) {
    console.error('Error deleting Flight:', err);
    throw err;
  }
}
// async function updateFlight(id, company, airplain_id, exitP, flightCode, price, target, departureDate, arrivalDate, departureTime, arrivalTime, active) {
//   try {
//     const sql = `UPDATE flights SET  company=?, airplain_id=?, exitP=?, flightCode=?, price=?, target=?, departureDate=?, arrivalDate=?, departureTime=?, arrivalTime=?, active=? WHERE id = ?`;
//     const result = await pool.query(sql, [ company, airplain_id, exitP, flightCode, price, target, departureDate, arrivalDate, departureTime, arrivalTime, 0, id]);
//     return result[0][0];
//   } catch (err) {
//     console.error('Error updating Flight:', err);
//     throw err;
//   }
// }
async function updateFlight(id) {
  try {
    const sql = `UPDATE flights SET   active=? WHERE id = ?`;
    const result = await pool.query(sql, [  0, id]);
    return result[0];
  } catch (err) {
    console.error('Error updating Flight:', err);
    throw err;
  }
}
module.exports = {getArrFlightsById,getArrFlightsByIdToCancel, getAllflights, getFlightById, createFlight,getFlightByExitTarget, deleteFlight, updateFlight ,getFlightByParams,checkDatesModel}  