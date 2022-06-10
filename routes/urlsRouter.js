import { Router } from "express"

import { validateToken } from "../middlewares/authMiddlewares.js"
import { validateData } from "../middlewares/dataMiddlewares.js"

import {
  shortenUrl,
  getUrl,
  getUserUrls,
  openUrl,
  deleteUrl,
  getUrlsRanking,
} from "../controllers/urlsController.js"
import { urlSchema } from "../schemas/urlSchema.js"

export const urlsRouter = Router()

urlsRouter.post(
  "/urls/shorten",
  validateToken,
  validateData(urlSchema),
  shortenUrl,
)
urlsRouter.get("/urls/:id", getUrl)
urlsRouter.get("/users/:id", validateToken, getUserUrls)
urlsRouter.get("/urls/open/:shortUrl", openUrl)
urlsRouter.delete("/urls/:id", validateToken, deleteUrl)
urlsRouter.get("/ranking", getUrlsRanking)
