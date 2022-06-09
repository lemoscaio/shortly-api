import { Router } from "express"
import { authRouter } from "./authRouter.js"
import { shortenRouter } from "./shortenRouter.js"

export const router = Router()

router.use(authRouter)
router.use(shortenRouter)
