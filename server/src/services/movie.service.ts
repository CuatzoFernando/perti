import { Movie } from "../interfaces"
import MovieModel from "../models/movie"

const insertMovie = async (item: Movie) => {
	const responseInser = await MovieModel.create(item)
	return responseInser
}

const getMovies = async () => {
	const response = await MovieModel.find({})
	return response
}

const getMovieSingle = async (id: string) => {
	const response = await MovieModel.findOne({ _id: id })
	return response
}

const updateMovie = async (id: string, data: Movie) => {
	const response = await MovieModel.findOneAndUpdate({ _id: id }, data, {
		new: true,
	})
	return response
}

const deleteMovie = async (id: string) => {
	const response = await MovieModel.remove({ _id: id })
	return response
}

export { insertMovie, getMovies, getMovieSingle, updateMovie, deleteMovie }
