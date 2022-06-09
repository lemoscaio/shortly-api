import db from "../config/db.js"
import { nanoid } from "nanoid"

const { VERBOSE } = process.env

export async function shortenURL(req, res) {
  const { url } = req.body
  const { user } = res.locals

  const shortUrl = nanoid(10)

  try {
    const result = await db.query(
      `INSERT INTO urls (url, short_url, user_id ) VALUES ($1, $2, ${user.id})`,
      [url, shortUrl],
    )
    if (VERBOSE) console.log(result)
  } catch (error) {
    if (VERBOSE) console.log(error)
    if (error.code === "23505") return shortenURL(req, res)
    return res.sendStatus(400)
  }

  res.send({ shortUrl: shortUrl })
}
