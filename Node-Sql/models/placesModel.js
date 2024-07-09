const pool = require('../DB.js');

async function getPlacesByAirplaneId(ID) {
  try {
    const sql = 'SELECT * FROM places where airplane_id=?';
    const result = await pool.query(sql, [ID]);
    return result[0];
  } catch (err) {
    throw err;
  }
}

async function getPlacesById(arrPlacesStr) {
  try {
      // פצל את המחרוזת למערך של מספרים
      const arrPlaces = arrPlacesStr.split(',').map(Number);
      
      const places = [];
      for (const id of arrPlaces) {
          if (!isNaN(id)) { // בדוק אם המספר הוא לא NaN (לא מספר חוקי)
              const sql = 'SELECT * FROM Places WHERE id = ?';
              const result = await pool.query(sql, [id]);
              places.push(result[0][0]);
          } else {
              throw (`Invalid id: ${id}`);
          }
      }
      return places;
  } catch (err) {
      throw err;
  }
}


  async function updatePlaces(airplaneId, arrPlaces) {
    try {
        const updateUserSql = 'UPDATE Places SET airplane_id=?, rowP=?, columnP=?, isAvailable=? WHERE id=?';
        for (const place of arrPlaces) {
            const values = [airplaneId, place.rowP, place.columnP, !place.isAvailable, place.id];
            await pool.query(updateUserSql, values);
        }
    } catch (error) {
        throw error;
    }
}


  

module.exports = { getPlacesByAirplaneId,getPlacesById, updatePlaces}

