import db from "../config/db.js"
import SqlString from "sqlString"

async function insertNewUrl(params) {
  return db.query(
    `INSERT INTO urls (url, short_url, user_id ) VALUES ($1, $2, $3)`,
    params,
  )
}

async function getUrl(params) {
  return db.query(
    `SELECT urls.id, urls.short_url as "shortUrl", urls.url FROM urls WHERE urls.id = $1`,
    params,
  )
}

async function getUserUrlsWithVisitCount(id) {
  return db.query(
    `SELECT urls.id, urls.short_url as "shortUrl", urls.url, urls.visits as "visitCount"
    FROM users 
    JOIN urls ON users.id = urls.user_id
    WHERE users.id = ${SqlString.escape(id)}
    `,
  )
}

async function getUrlFromShortUrl(shortUrl) {
  return db.query(
    `SELECT urls.url, urls.visits FROM urls WHERE urls.short_url = ${SqlString.escape(
      shortUrl,
    )}`,
  )
}

async function incrementVisitOnUrl(shortUrl, visits) {
  return db.query(
    `UPDATE urls SET visits = ${
      visits + 1
    } WHERE urls.short_url = ${SqlString.escape(shortUrl)}`,
  )
}

async function deleteUrlFromId(id) {
  return db.query(`DELETE FROM urls WHERE urls.id = ${SqlString.escape(id)}`)
}

async function getAllUrlsRanking() {
  return db.query(
    `SELECT users.id
    , users.name
    , count(urls.id) AS "linksCount"
    , coalesce(sum(urls.visits),
          0) AS "visitCount"
    FROM users
    LEFT JOIN urls ON users.id = urls.user_id
    GROUP BY users.id
    ORDER BY "visitCount" DESC
    LIMIT 10`,
  )
}

export const urlsRepository = {
  insertNewUrl,
  getUrl,
  getUserUrlsWithVisitCount,
  getUrlFromShortUrl,
  incrementVisitOnUrl,
  deleteUrlFromId,
  getAllUrlsRanking,
}
