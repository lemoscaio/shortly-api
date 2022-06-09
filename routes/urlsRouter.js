import { Router } from "express"

import { validateData, validateToken } from "../middlewares/authMiddlewares.js"
import {
  shortenUrl,
  getUrl,
  openUrl,
  deleteUrl,
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
urlsRouter.get("/urls/open/:shortUrl", openUrl)
urlsRouter.delete("/urls/:id", validateToken, deleteUrl)
