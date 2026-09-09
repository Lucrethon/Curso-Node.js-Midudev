import express, { json } from 'express'
import movies from './movies.json' with { type: 'json' }
// para crear id's:
import crypto from 'node:crypto'
import { validateSchema, validatePartialMovie } from './schemas/Movie-schema.mjs'


// metodos normales: GET, HEAD, POST
// metodos complejos: PUT, PATCH, DELETE

// el error CORS en los metodos complejos existe algo llamado CORS PRE-Flight
// con los metodos complejos se hace una peticion previa adicional llamada OPTIONS


const app = express()

const PORT = process.env.PORT ?? 1234

app.use(express.json())
app.disable('x-powered-by');

app.get('/', (req, res) => {
    res.send('<h1>Mi Pagina</h1>')
})

// origenes aceptados para hacer requests a nuestra api: 
const ACCEPTED_ORIGINS = [
    'http://localhost:8080',
    'http://localhost:1234',
    'http://movies.com'
]

// Recuperar (GET) las movies (GET the movies)
// TODOS los recursos que sean MOVIES se identifican con /movies
app.get('/movies', (req, res) => {

    // CORS error: Missing Allow Origin Header 
    // cuando alguien intenta hacer un fetch de datos a nuestra API y NO tenemos una cabezera que lo permita
    // los navegadores van a lanzar el error cors. esto solo pasa en los navegadores 

    // solicitamos el origen de la request y validamos si es de un origen aceptado 
    const origin = req.header('origin'); 
    if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
        // el navegador no envia el header origin cuando la request se esta haciendo desde el mismo ORIGIN
        // es decir: request desde http://localhost:1234/ a http://localhost:1234/
        res.header('Access-Control-Allow-Origin', origin)
        // * <- si se coloca solo asterisco, todos los origenes estan permitidos 
    }



    // Filter movies by genre
    const { genre } = req.query

    if (genre) {
        const moviesByGenre = movies.filter((movie) => {
            return movie.genre.some(g => g.toLocaleLowerCase() === genre.toLocaleLowerCase())
            // array.some deuvleve true o false si al menos uno de los elementos dentro del array cumple con la condicion del callback. No modifica el array original 
        })
        return res.json(moviesByGenre)
    }

    res.json(movies)
})

// GET movie by ID
app.get('/movies/:id', (req, res) => { // path-to-regexp
    // :id <-- Parametro dinamico de la url 
    // ? <-- si se coloca al lado, puede estar como puede no estar
    // + <-- puede haber mas de uno igual
    // ()? <-- entre parentesis significa que es opcional 

    // se captura de la siguiente forma para acceder a el después e identificar que recurso cargar:
    const { id } = req.params
    const movie = movies.find(movie => movie.id === id)
    if (movie) return res.json(movie)
    
    res.status(404).json({ message: 'Movie not found' })
})


// create new movie (POST)
app.post('/movies', (req, res) => {

    // validaciones con zod:
    const result = validateSchema(req.body)

    // validar si hay errores: 
    if (result.error) {
        return res.status(400).json(JSON.parse(result.error.message))
    }

    const newMovie = {
        id: crypto.randomUUID(), // crea un uuid verion 4
        ...result.data
    }

    // esto no seria REST porque estamos guardando
    // el estado de la aplicacion en memoria 
    movies.push(newMovie)

    // aqui indicamos que se ha creado el recurso
    // también devolvemos el recurso que hemos creado para actualizar la cache del cliente 
    res.status(201).json(newMovie)

    // const { title,  ...} = req.body
    // const newMovie = {... req.body }
    // ESTO NO SE DEBE HACER. Por seguridad, siempre hay que extraer y validar los datos
    // Las validaciones NO LAS ARREGLA TYPESCRIPT

})

// actualizar y/o corregir pelicula con PATCH
app.patch('/movies/:id', (req, res) => {
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
app.delete('/movies/:id', (req, res) => {

    const origin = req.header('origin'); 
    if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
        res.header('Access-Control-Allow-Origin', origin)
    }


    const { id } = req.params
    const movieIndex = movies.findIndex(movie => movie.id === id)
    if (movieIndex === -1) return res.status(404).json({ message: 'Error 404. Movie not found'})
    
    const movie = movies[movieIndex]
    movies.splice(movieIndex, 1)
    return res.json({...movie, message : 'Movie deleted'})

})

app.options('/movies/:id', (req, res) => {
    // hay que pasarle al metodo options la cabezera de que metodos estan habilitados para hacer peticiones
    const origin = req.header('origin'); 
    if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
        res.header('Access-Control-Allow-Origin', origin)
        // y ademas una cabecera adicional que indica que metodos pueden usar
        res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
    }
    res.send(200)
})

// Default error 404
app.use((req, res) => {
    res.status(404).send('<h1>Error 404</h1>')
})

// Listen port
app.listen(PORT, () => {
    console.log(`Sever listening in port http://localhost:${PORT}`)
})