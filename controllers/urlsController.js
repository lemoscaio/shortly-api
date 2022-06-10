import { nanoid } from "nanoid"

import { formatData } from "./../utils/formatGetUserUrlsData.js"
import { userRepository } from "../repositories/userRepository.js"
import { urlsRepository } from "../repositories/urlsRepository.js"
import verboseConsoleLog from "../utils/verboseConsoleLog.js"

export async function shortenUrl(req, res) {
  const { url } = req.body
  const { user } = res.locals

  const shortUrl = nanoid(10)

  const params = [url, shortUrl, user.id]

  try {
    const result = await urlsRepository.insertNewUrl(params)
    verboseConsoleLog("Result:", result)
  } catch (error) {
    verboseConsoleLog("Error:", error)
    if (error.code === "23505") return shortenUrl(req, res)
    return res.sendStatus(400)
  }

  res.send({ shortUrl: shortUrl })
}

export async function getUrl(req, res) {
  const { id } = req.params
  const params = [id]

  try {
    const result = await urlsRepository.getUrl(params)
    verboseConsoleLog("Result:", result)

    if (result.rowCount === 0) return res.sendStatus(404)
    return res.send(result.rows[0])
  } catch (error) {
    verboseConsoleLog("Error:", error)
    return res.sendStatus(500)
  }
}

export async function getUserUrls(req, res) {
  const { id } = req.params

  try {
    const userResult = await userRepository.getUserWithVisitCount(id)

    const urlsResult = await urlsRepository.getUserUrlsWithVisitCount(id)

    if (userResult.rowCount === 0) return res.sendStatus(404)

    const userData = formatData.getUserUrlsData(
      userResult.rows[0],
      urlsResult.rows,
    )

    return res.send(userData)
  } catch (error) {
    verboseConsoleLog("Error:", error)
    return res.sendStatus(500)
  }
}

export async function openUrl(req, res) {
  const { shortUrl } = req.params

  try {
    const result = await urlsRepository.getUrlFromShortUrl(shortUrl)

    verboseConsoleLog("Result:", result)

    if (result.rowCount === 0) return res.sendStatus(404)

    const { url, visits } = result.rows[0]

    const updated = await urlsRepository.incrementVisitOnUrl(shortUrl, visits)

    verboseConsoleLog("Updated:", updated)

    return res.redirect(url)
  } catch (error) {
    verboseConsoleLog("Error:", error)
    return res.sendStatus(500)
  }
}

export async function deleteUrl(req, res) {
  const { id } = req.params

  try {
    const result = await urlsRepository.deleteUrlFromId(id)
    verboseConsoleLog("Result:", result)

    if (result.rowCount === 0) return res.sendStatus(404)
    return res.sendStatus(204)
  } catch (error) {
    verboseConsoleLog("Error:", error)
    return res.sendStatus(500)
  }
}

export async function getUrlsRanking(req, res) {
  try {
    const result = await urlsRepository.getAllUrlsRanking()

    verboseConsoleLog("Result:", result)

    return res.send(result.rows)
  } catch (error) {
    verboseConsoleLog("Error:", error)
    return res.sendStatus(500)
  }
}
