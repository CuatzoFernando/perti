import { Schema, Types, model, Model } from "mongoose"
import { User } from "../interfaces"

const UserSchema = new Schema<User>(
	{
		name: {
			required: true,
			type: String,
		},
		password: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		role: {
			type: String,
			enum: ["Default", "Administrator"],
			default: "Default",
		},
	},
	{
		versionKey: false,
		timestamps: true,
	}
)

const UserModel = model("users", UserSchema)
export default UserModel
