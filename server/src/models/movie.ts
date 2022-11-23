import { Schema, Types, model, Model } from "mongoose"
import { Movie } from "../interfaces"

const MovieSchema = new Schema<Movie>(
	{
		title: {
			required: true,
			type: String,
		},
		genre: {
			type: String,
			required: true,
		},
		year: {
			type: Date,
			required: true,
		},
		image: {
			type: String,
			required: true,
		},
	},
	{
		versionKey: false,
		timestamps: true,
	}
)

const MovieModel = model("movies", MovieSchema)
export default MovieModel
