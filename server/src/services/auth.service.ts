import { User, Auth } from "../interfaces"
import UserModel from "../models/user"
import { encrypt, verified } from "../utils/bcrypt.handle"
import { generateToken } from "../utils/jwt.handle"

const registerNewUser = async ({ email, password, name }: User) => {
	const checkIs = await UserModel.findOne({ email })
	if (checkIs) return "ALREADY_USER"
	const passHash = await encrypt(password)
	const registerNewUser = await UserModel.create({
		email,
		password: passHash,
		name,
	})
	return registerNewUser
}

const loginUser = async ({ email, password }: Auth) => {
	const checkIs = await UserModel.findOne({ email })
	if (!checkIs) return "NOT_FOUND_USER"

	const passwordHash = checkIs.password
	const isCorrect = await verified(password, passwordHash)

	if (!isCorrect) return "PASSWORD_INCORRECT"

	const token = generateToken(checkIs.email)
	const data = {
		token,
		user: checkIs,
	}
	return data
}

const profileUser = async (id: String) => {
	const user = await UserModel.findById(id, { password: 0 })
	if (user) {
		return user
	}
	return "NOT_FOUND_USER"
}

export { registerNewUser, loginUser, profileUser }
