import db from "../config/db.js"
import SqlString from "sqlString"

async function insertNewUser(params) {
  return db.query(
    `INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`,
    params,
  )
}

async function getUserById(params) {
  return db.query(`SELECT * FROM users WHERE users.email = $1`, params)
}

async function getUserByEmail(email) {
  return db.query(
    `SELECT users.id, users.name, users.email FROM users WHERE users.email = '${email}'`,
  )
}

async function getUserWithVisitCount(id) {
  return db.query(
    `SELECT users.id, users.name, sum(urls.visits) as "visitCount"
        FROM users 
        LEFT JOIN urls ON users.id = urls.user_id
        WHERE users.id = ${SqlString.escape(id)}
        GROUP BY users.id
        `,
  )
}

export const userRepository = {
  insertNewUser,
  getUserById,
  getUserByEmail,
  getUserWithVisitCount,
}
