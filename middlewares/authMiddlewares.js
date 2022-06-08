import { newUserSchema } from "./../schemas/newUserSchema.js"
import chalk from "chalk"

export async function validateNewUserData(req, res, next) {
  const { password, confirmPassword } = req.body

  if (password !== confirmPassword) {
    return res.status(400).send({
      error: "Passwords do not match",
    })
  }

  try {
    await newUserSchema.validateAsync(req.body)
  } catch (error) {
    console.log(chalk.red(error))
    return res.status(422).send({ error: error.details[0].message })
  }

  next()
}
