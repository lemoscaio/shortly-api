import { Router } from "express"

import { validateData, validateToken } from "../middlewares/authMiddlewares.js"
import { shortenUrl, getUrl } from "../controllers/urlsController.js"
import { urlSchema } from "../schemas/urlSchema.js"

export const urlsRouter = Router()

urlsRouter.post(
  "/urls/shorten",
  validateToken,
  validateData(urlSchema),
  shortenUrl,
)
urlsRouter.get("/urls/:id", getUrl)
