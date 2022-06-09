import db from "../config/db.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const { JWT_SECRET_KEY, VERBOSE } = process.env

export async function registerUser(req, res) {
  const { name, email, password } = req.body

  const encryptedPassword = bcrypt.hashSync(password, 10)

  const params = [name, email, encryptedPassword]

  try {
    const result = await db.query(
      `INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`,
      params,
    )

    if (result.rowCount > 0) return res.sendStatus(201)
    res.sendStatus(500)
  } catch (error) {
    if (error.constraint === "users_email_key")
      return res.status(409).send({ error: "Email already exists" })
    return res.status(500)
  }
}

export async function loginUser(req, res) {
  const { email, password } = req.body

  try {
    const user = await db.query(`SELECT * FROM users WHERE users.email = $1`, [
      email,
    ])

    const foundUser = user.rows[0]

    if (foundUser && bcrypt.compareSync(password, foundUser.password)) {
      const token = jwt.sign({ email }, JWT_SECRET_KEY)
      return res.status(200).send({ token })
    }
    res.sendStatus(401)
  } catch (error) {
    if (VERBOSE) console.log(error)
    res.sendStatus(500)
  }
}
