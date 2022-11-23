import { Request, Response, Router } from "express"
import {
	registerCtrl,
	loginCtrl,
	profileCtrl,
} from "../controllers/auth.controller"

import { checkJwt, checkRole } from "../middleware"

const router = Router()
router.post("/register", registerCtrl)
router.post("/login", loginCtrl)
router.post(
	"/profile",
	[checkJwt, checkRole(["Default", "Administrator"])],
	profileCtrl
)

export { router }
