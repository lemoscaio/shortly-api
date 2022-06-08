import { Router } from "express"
import { authRouter } from "./authRouter.js"

export const router = Router()

router.use(authRouter)
