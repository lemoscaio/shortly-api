import { Router } from "express"

import { validateData, validateToken } from "../middlewares/authMiddlewares.js"
import {
  shortenUrl,
  getUrl,
  getUserUrls,
  openUrl,
  deleteUrl,
  getUrlsRank,
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
urlsRouter.get("/ranking", getUrlsRank)
