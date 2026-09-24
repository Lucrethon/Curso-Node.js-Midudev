import { createApp } from "./app.mjs";
import { MovieModel } from "./models/local-file-system/movie.mjs";

createApp({ movieModel: MovieModel })

