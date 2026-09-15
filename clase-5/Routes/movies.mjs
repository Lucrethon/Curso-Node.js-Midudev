import { Router } from "express";
import { MovieController } from "../controllers/movies.mjs";

export const moviesRouter = Router()

// TODOS los recursos que sean MOVIES se identifican con /movies
moviesRouter.get('/', MovieController.GetAll)

// GET movie by ID
moviesRouter.get('/:id', MovieController.GetById)

// create new movie (POST)
moviesRouter.post('/', MovieController.CreateMovie)

// actualizar y/o corregir pelicula con PATCH
moviesRouter.patch('/:id', MovieController.UpdateMovie)

// Delete movie (DELETE)
moviesRouter.delete('/:id', MovieController.DeleteMovie)