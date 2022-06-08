import pg from "pg"
import dotenv from "dotenv"
dotenv.config()

const { Pool } = pg

const devConfig = {
  host: "localhost",
  port: 5432,
  user: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
}

const prodConfig = { connectionString: process.env.DATABASE_URL }

const db = new Pool(process.env.NODE_ENV === "PROD" ? prodConfig : devConfig)

if (process.env.MODE === "PROD") {
  db.ssl = {
    rejectUnauthorized: false,
  }
}

export default db
