const pool = require('../DB.js');

async function getAirplaneById(ID) {
  try {
    const sql = 'SELECT * FROM airplanes where id=?';
    const result = await pool.query(sql, [ID]);
    return result[0][0];
  } catch (err) {
    throw err;
  }
}

async function getAirplaneByCompany(company) {
  try {
    const sql = 'SELECT * FROM airplanes where company=?';
    const result = await pool.query(sql, [company]);
    return result[0];
  } catch (err) {
    throw err;
  }
}



module.exports = {getAirplaneByCompany, getAirplaneById}

