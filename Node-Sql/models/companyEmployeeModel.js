const pool = require('../DB.js');



async function getCompanyByemployeeId(employeeId) {
  try {
    const sql = 'SELECT company FROM company_employees where employee_id=?';
    const result = await pool.query(sql, [employeeId]);
    return result[0][0];
  } catch (err) {
    throw err;
  }
}



module.exports = {getCompanyByemployeeId}

