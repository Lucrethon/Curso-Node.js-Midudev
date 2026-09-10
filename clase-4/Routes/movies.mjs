import { Router } from "express";
import { validateSchema, validatePartialMovie } from '../schemas/Movie-schema.mjs'
import { MovieModel } from "../models/movie.mjs";

export const moviesRouter = Router()

// TODOS los recursos que sean MOVIES se identifican con /movies
moviesRouter.get('/', async (req, res) => {
    // este metodo tiene que ser ASINCRONO porque este modelo tiene que tratar con datos asincronos
    const { genre } = req.query
    const movies = await MovieModel.GetAll({ genre })
    res.json(movies)
})

// GET movie by ID
moviesRouter.get('/:id', async (req, res) => { // path-to-regexp
    // se captura el parametro identificar que recurso cargar:
    const { id } = req.params
    const movie = await MovieModel.GetById({id})
    if (movie) return res.json(movie)
    res.status(404).json({ message: 'Movie not found' })
})

// create new movie (POST)
moviesRouter.post('/', async (req, res) => {

    // validaciones con zod:
    const result = validateSchema(req.body)
    // validar si hay errores: 
    if (result.error) {
        return res.status(400).json(JSON.parse(result.error.message))
    }

    const newMovie = await MovieModel.CreateMovie({input : result.data})
    // indicamos que se ha creado el recurso devolviendolo para actualizar la cache del cliente 
    res.status(201).json(newMovie)
})

// actualizar y/o corregir pelicula con PATCH
moviesRouter.patch('/:id', async (req, res) => {
    // validacion de datos de la request
    const result = validatePartialMovie(req.body)
    if (result.error || !result.success) {
        res.status(400).json(JSON.parse(result.error.message))
    }
    if (!result.success) return res.status(404).json({message: 'Error 404. Movie not found'})
    
    const { id } = req.params
    const updatedMovie = await MovieModel.UpdateMovie({ id : id, input: result.data})
    return res.status(200).json(updatedMovie)

})

// Delete movie (DELETE)
moviesRouter.delete('/:id', async (req, res) => {

    const { id } = req.params
    const deletedMovie = await MovieModel.DeleteMovie(id)

    if (!deletedMovie) return res.status(404).json({ message: 'Error 404. Movie not found'})
    return res.json({...deletedMovie, message : 'Movie deleted'})

})