import { NextFunction, Request, Response } from "express"
import { RequestExt } from "../interfaces/req-ext"
import UserModel from "../models/user"

const checkRole = (roles: Array<string>) => {
	return async (req: RequestExt, res: Response, next: NextFunction) => {
		const id = res.locals.jwtPayload.id
		const user = await UserModel.find({ email: id }).select("role")
		const rol = user[0].role
		if (roles.includes(rol)) {
			next()
		} else {
			res.status(400)
			res.send("INVALID_SESSION")
		}
	}
}

export { checkRole }
