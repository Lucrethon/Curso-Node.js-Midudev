import { createApp } from "./app.mjs";
import { MovieModel } from './models/mysql/movie.mjs'

createApp({ movieModel: MovieModel })

