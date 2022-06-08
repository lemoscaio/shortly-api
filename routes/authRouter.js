import { Router } from "express"

import {
  validateNewUserData,
  validateLoginData,
} from "../middlewares/authMiddlewares.js"
import { registerUser, loginUser } from "../controllers/authController.js"

export const authRouter = Router()

authRouter.post("/signup", validateNewUserData, registerUser)
authRouter.post("/signin", validateLoginData, loginUser)
