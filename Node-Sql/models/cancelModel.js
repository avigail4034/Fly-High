const pool = require('../DB.js');

async function createCancel(flightId ,arrUsersCancel) {
  if (arrUsersCancel.length === 0) {
      throw new Error('places_arr cannot be empty');
  }
  try {
      const sql = `INSERT INTO Canceled_flights (user_id, flight_id) VALUES ?`;
      const values = arrUsersCancel.map(userCancel => [userCancel, flightId]);
      const [result] = await pool.query(sql, [values]);
      const newCancelID = result.insertId;
      return {
          "id": newCancelID,
          "user": arrUsersCancel,
          "flight": flightId
      };
  } catch (err) {
      throw err;
  }
}

async function getCancelOfUser(ID) {
  try {
    const sql = 'SELECT * FROM canceled_flights WHERE user_id = ?'
    const result = await pool.query(sql, [ID]);
    return result[0];
  } catch (err) {
    throw err;
  }
}async function getCancelOfFlight(ID) {
  try {
    const sql = 'SELECT * FROM canceled_flights WHERE flight_id = ?'
    const result = await pool.query(sql, [ID]);
    return result[0];
  } catch (err) {
    throw err;
  }
}


async function deleteCancel(flight_id_arr, user_id) {
  try {
    const arrCancel = flight_id_arr.split(',').map(Number);
    for (const id of arrCancel) {
      if (!isNaN(id)) { // בדוק אם המספר הוא לא NaN (לא מספר חוקי)
        const sql = `DELETE FROM canceled_flights WHERE flight_id = ? AND user_id = ?`;
        const result = await pool.query(sql, [id, user_id]);
        return result[0];
      } else {
        throw new Error(`Invalid id: ${id}`);
      }
    }

  } catch (err) {
    console.error('Error deleting Orders:', err);
    throw err;
  }
}


  module.exports = {getCancelOfFlight,createCancel,deleteCancel,getCancelOfUser}  
