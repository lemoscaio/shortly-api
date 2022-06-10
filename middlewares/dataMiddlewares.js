import verboseConsoleLog from "../utils/verboseConsoleLog.js"

export function validateData(schema) {
  return (validateData[schema] = async (req, res, next) => {
    try {
      await schema.validateAsync(req.body, { abortEarly: false })
    } catch (error) {
      verboseConsoleLog("Error:", error)
      return res.status(422).send(error.details.map(({ message }) => message))
    }

    next()
  })
}
