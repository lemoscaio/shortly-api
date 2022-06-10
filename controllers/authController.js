import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { userRepository } from "../repositories/userRepository.js"
import verboseConsoleLog from "../utils/verboseConsoleLog.js"

const { JWT_SECRET_KEY } = process.env

export async function registerUser(req, res) {
  const { name, email, password } = req.body
  const encryptedPassword = bcrypt.hashSync(password, 10)
  const params = [name, email, encryptedPassword]

  try {
    const result = await userRepository.insertNewUser(params)

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
  const params = [email]

  try {
    const user = await userRepository.getUserById(params)

    const foundUser = user.rows[0]

    if (foundUser && bcrypt.compareSync(password, foundUser.password)) {
      const token = jwt.sign({ email }, JWT_SECRET_KEY)
      return res.status(200).send({ token })
    }
    res.sendStatus(401)
  } catch (error) {
    verboseConsoleLog("Error:", error)
    res.sendStatus(500)
  }
}
