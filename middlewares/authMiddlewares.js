import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

import verboseConsoleLog from "../utils/verboseConsoleLog.js"
import { userRepository } from "../repositories/userRepository.js"

const { JWT_SECRET_KEY } = process.env

export async function validateToken(req, res, next) {
  const { authorization } = req.headers

  const regexResult = authorization?.match(/^(Bearer )/g)
  if (!regexResult)
    return res
      .status(401)
      .send("You must pass an authorization token in the request header")

  const token = authorization?.replace("Bearer ", "").trim()
  if (!token) return res.sendStatus(401)

  try {
    const data = jwt.verify(token, JWT_SECRET_KEY)
    const user = await userRepository.getUserByEmail(data.email)
    res.locals.user = user.rows[0]
  } catch (error) {
    verboseConsoleLog("Error:", error)
    return res.sendStatus(401)
  }

  next()
}
