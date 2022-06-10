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

if (process.env.MODE === "PROD") {
  prodConfig.ssl = {
    rejectUnauthorized: false,
  }
}

const db = new Pool(process.env.MODE === "PROD" ? prodConfig : devConfig)

export default db
