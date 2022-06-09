import { Router } from "express"

import { validateData, validateToken } from "../middlewares/authMiddlewares.js"
import { shortenURL } from "../controllers/shortenController.js"
import { urlSchema } from "../schemas/urlSchema.js"

export const shortenRouter = Router()

shortenRouter.post(
  "/urls/shorten",
  validateToken,
  validateData(urlSchema),
  shortenURL,
)
