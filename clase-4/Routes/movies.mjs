import { Router } from "express";
import movies from '../movies.json' with { type: 'json' }
// para crear id's:
import crypto from 'node:crypto'
import { validateSchema, validatePartialMovie } from '../schemas/Movie-schema.mjs'
import { MovieModel } from "../models/movie";

export const moviesRouter = Router()

// TODOS los recursos que sean MOVIES se identifican con /movies
moviesRouter.get('/', async (req, res) => {
    // este metodo tiene que ser ASINCRONO porque este modelo tiene que tratar con datos asincronos
    const { genre } = req.query
    const movies = await MovieModel.GetAll({ genre })
    res.json(movies)
})

// GET movie by ID
moviesRouter.get('/:id', (req, res) => { // path-to-regexp
    // se captura el parametro identificar que recurso cargar:
    const { id } = req.params
    const movie = movies.find(movie => movie.id === id)
    if (movie) return res.json(movie)

    res.status(404).json({ message: 'Movie not found' })
})

// create new movie (POST)
moviesRouter.post('/', (req, res) => {

    // validaciones con zod:
    const result = validateSchema(req.body)

    // validar si hay errores: 
    if (result.error) {
        return res.status(400).json(JSON.parse(result.error.message))
    }

    const newMovie = {
        id: crypto.randomUUID(),
        ...result.data
    }

    // esto no es REST porque estamos guardando el estado de la aplicacion en memoria 
    movies.push(newMovie)
    // indicamos que se ha creado el recurso devolviendolo para actualizar la cache del cliente 
    res.status(201).json(newMovie)
})

// actualizar y/o corregir pelicula con PATCH
moviesRouter.patch('/:id', (req, res) => {
    // validacion de datos de la request
    const result = validatePartialMovie(req.body)
    if (result.error || !result.success) {
        res.status(400).json(JSON.parse(result.error.message))
    }

    // verificación de que la pelicula existe
    const { id } = req.params
    const movieIndex = movies.findIndex(movie => movie.id === id)
    if (movieIndex === -1) return res.status(404).json({message: 'Error 404. Movie not found'})
    
    // actualizacion de datos de la pelicula 
    const updatedMovie = {
        ...movies[movieIndex],
        ...result.data
    }
    // el id NO se puede cambiar porque no esta en la validacion del schema  

    movies[movieIndex] = updatedMovie
    return res.status(200).json(updatedMovie)

})

// Delete movie (DELETE)
moviesRouter.delete('/:id', (req, res) => {

    const { id } = req.params
    const movieIndex = movies.findIndex(movie => movie.id === id)
    if (movieIndex === -1) return res.status(404).json({ message: 'Error 404. Movie not found'})
    
    const movie = movies[movieIndex]
    movies.splice(movieIndex, 1)
    return res.json({...movie, message : 'Movie deleted'})

})