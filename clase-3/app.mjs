import express, { json } from 'express'
import movies from './movies.json' with { type: 'json' }
// para crear id's:
import crypto from 'node:crypto'
import { validateSchema } from './schemas/Movie-schema.mjs'


const app = express()

const PORT = process.env.PORT ?? 1234

app.use(express.json())
app.disable('x-powered-by');

app.get('/', (req, res) => {
    res.send('<h1>Mi Pagina</h1>')
})

// Recuperar (GET) las movies (GET the movies)
// TODOS los recursos que sean MOVIES se identifican con /movies
app.get('/movies', (req, res) => {
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


// create new movie
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

// Default error 404
app.use((req, res) => {
    res.status(404).send('<h1>Error 404</h1>')
})

// Listen port
app.listen(PORT, () => {
    console.log(`Sever listening in port http://localhost:${PORT}`)
})