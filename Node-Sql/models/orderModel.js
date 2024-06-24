const pool = require('../DB.js');

async function createOrder(user_id, flight_id, places_arr) {
  if (places_arr.length === 0) {
    throw new Error('places_arr cannot be empty');
  }

  try {
    const sql = `INSERT INTO Orders (user_id, flight_id, place_id) VALUES ?`;
    const values = places_arr.map(place => [user_id, flight_id, place.id]);
    const [result] = await pool.query(sql, [values]);
    const newOrderID = result.insertId;
    return {
      "id": newOrderID,
      "user": user_id,
      "flight": flight_id,
      "places": places_arr
    };
  } catch (err) {
    throw err;
  }
}

async function getFlightsOfUser(ID) {
  try {
    const sql = 'SELECT flight_id, GROUP_CONCAT(place_id) AS place_ids FROM Orders WHERE user_id = ? GROUP BY flight_id;'
    const result = await pool.query(sql, [ID]);
    return result[0];
  } catch (err) {
    throw err;
  }
}
async function getUsersOfFlight(flightId) {
  try {
    const sql = 'SELECT user_id FROM Orders WHERE  flight_id = ?;'
    const result = await pool.query(sql, [flightId]);
    return result[0];
  } catch (err) {
    throw err;
  }
}

async function deleteOrder(flight_id, arrPlaces) {
  try {
    // Construct the SQL query to delete orders
    const sql = `DELETE FROM orders WHERE flight_id = ? AND place_id IN (?)`;

    // Execute the query with flight_id and arrPlaces
    const result = await pool.query(sql, [flight_id, arrPlaces]);

    // Return the affected rows count or whatever makes sense for your application
    return result[0].affectedRows;
  } catch (err) {
    console.error('Error deleting Orders:', err);
    throw err;
  }
} async function deleteOrderToCancel(flight_id_arr, user_id) {
  try {
    const arrCancel = flight_id_arr.split(',').map(Number);
    for (const id of arrCancel) {
      if (!isNaN(id)) { // בדוק אם המספר הוא לא NaN (לא מספר חוקי)
        const sql = `DELETE FROM orders WHERE flight_id = ? AND user_id = ?`;
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


module.exports = { createOrder, deleteOrderToCancel, getUsersOfFlight, deleteOrder, getFlightsOfUser }  
