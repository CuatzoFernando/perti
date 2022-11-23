import { Request, Response, Router } from "express"
import { checkJwt, checkRole } from "../middleware"

import {
	Movies,
	MovieSingle,
	MovieInsert,
	MovieUpdate,
	MovieDelete,
} from "../controllers/movies.controller"

const router = Router()

router.get("/", [checkJwt, checkRole(["Default", "Administrator"])], Movies)

router.get(
	"/:id",
	[checkJwt, checkRole(["Default", "Administrator"])],
	MovieSingle
)

router.post("/", [checkJwt, checkRole(["Administrator"])], MovieInsert)

router.put("/:id", [checkJwt, checkRole(["Administrator"])], MovieUpdate)

router.delete("/:id", [checkJwt, checkRole(["Administrator"])], MovieDelete)

export { router }
