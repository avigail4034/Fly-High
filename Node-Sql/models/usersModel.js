const pool = require('../DB.js');

async function getAllUsers() {
  try {
    const sql = 'SELECT * FROM Users';
    const [rows, fields] = await pool.query(sql);
    return rows;
  } catch (err) {
    throw err;
  }
}

async function getUserByUserName(userName) {
  try {
    const sql = 'SELECT * FROM Users  INNER JOIN Passwords ON Users.id = Passwords.id WHERE Users.userName = ?';
    const [rows, fields] = await pool.query(sql, [userName]);
     return rows[0];
    
  } catch (err) {
    throw err;
  }
}
async function getUserById(id) {
  try {
    const sql = 'SELECT * FROM Users  WHERE Users.id = ?';
    const [rows, fields] = await pool.query(sql, [id]);
     return rows[0];
    
  } catch (err) {
    throw err;
  }
}
async function getArrUsersByRoleId(roleId) {
  try {
    const sql = 'SELECT * FROM Users WHERE roleId = ? ';
    const [rows, fields] = await pool.query(sql,[roleId]);
     return rows;
    
  } catch (err) {
    throw err;
  }
}

async function createUser(userName, password) {
  try {
  const sql = `INSERT INTO users (userName)VALUES (?)`;
  const [userResult] = await pool.query(sql, [userName]);
  //לקבלת USER שנוצר
  const userId = userResult.insertId;
  const insertPasswordSql = 'INSERT INTO passwords (id,password) VALUES (?,?)';
  const insertPasswordResult = await pool.query(insertPasswordSql, [userId,password]);//הכנסת סיסמא לטבלה
  return  { "id": userId, "userName": userName };
}
 catch (err) {
  throw err;
}
}

async function getArrUsersById(arrOfUsersId) {
  try {
      const users = [];
     const arrPlaces = arrOfUsersId.split(',').map(Number);
      for (const id of arrPlaces) {
        if (!isNaN(id)) {
          const sql = 'SELECT * FROM users WHERE id = ?';
          const result = await pool.query(sql, [id]);
          users.push(result[0][0]);}}
      
      return users;
  } catch (err) {
      throw err;
  }
}

async function updateUser(firstName, lastName, email, phone,roleId,id) {
  try {
    // עדכון המשתמש
    const updateUserSql = 'UPDATE users SET firstName=?, lastName=?, email=?, phone=?,roleId=?  WHERE id = ?';
    await pool.query(updateUserSql, [firstName, lastName, email, phone,roleId,id]);
 const updateUser={"firstName":firstName, "lastName":lastName, "email":email, "phone":phone,"roleId":roleId,"id":id};
 return updateUser;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
}
  
module.exports = {getArrUsersById, getAllUsers, getUserByUserName, createUser, updateUser ,getArrUsersByRoleId,getUserById}  