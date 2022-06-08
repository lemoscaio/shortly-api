import { Router } from "express"

import { validateNewUserData } from "../middlewares/authMiddlewares.js"
import { registerUser } from "../controllers/authController.js"

export const authRouter = Router()

authRouter.post("/signup", validateNewUserData, registerUser)
