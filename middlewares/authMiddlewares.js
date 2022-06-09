import jwt from "jsonwebtoken"
import chalk from "chalk"
import dotenv from "dotenv"
dotenv.config()

import db from "../config/db.js"

const { JWT_SECRET_KEY, VERBOSE } = process.env

export function validateData(schema) {
  return (validateData[schema] = async (req, res, next) => {
    const { password, confirmPassword } = req.body

    try {
      await schema.validateAsync(req.body, { abortEarly: false })
    } catch (error) {
      if (VERBOSE) console.log(chalk.red(error))
      return res.status(422).send(error.details.map(({ message }) => message))
    }

    next()
  })
}

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
    const data = await jwt.verify(token, JWT_SECRET_KEY)
    const user = await db.query(
      `SELECT users.id, users.name, users.email FROM users WHERE users.email = '${data.email}'`,
    )
    res.locals.user = user.rows[0]
  } catch (error) {
    if (VERBOSE) console.log(error)
    return res.sendStatus(401)
  }

  next()
}
