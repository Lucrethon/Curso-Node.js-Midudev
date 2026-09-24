import { Router } from "express";
import { MovieController } from "../controllers/movies.mjs";


export const createMoviesRouter = ({movieModel}) => {

    const moviesRouter = Router()
    const movieController = new MovieController({ movieModel })

    // TODOS los recursos que sean MOVIES se identifican con /movies
    moviesRouter.get('/', movieController.GetAll)

    // GET movie by ID
    moviesRouter.get('/:id', movieController.GetById)

    // create new movie (POST)
    moviesRouter.post('/', movieController.CreateMovie)

    // actualizar y/o corregir pelicula con PATCH
    moviesRouter.patch('/:id', movieController.UpdateMovie)

    // Delete movie (DELETE)
    moviesRouter.delete('/:id', movieController.DeleteMovie)

    return moviesRouter
}
