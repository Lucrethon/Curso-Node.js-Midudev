import express, { json } from 'express'
import movies from './movies.json' with { type: 'json' }

const app = express()

const PORT = process.env.PORT ?? 1234

app.disable('x-powered-by');

app.get('/', (req, res) => {
    res.send('<h1>Mi Pagina</h1>')
})

// Recuperar (GET) las movies (GET the movies)
// TODOS los recursos que sean MOVIES se identifican con /movies
app.get('/movies', (req, res) => {
    res.json(movies)
})

// GET movie by ID
app.get('/movies/:id', (req, res) => { // path-to-regexp
    // :id <-- Parametro dinamico de la url 
    // ? <-- si se coloca al lado, puede esta como puede no estar
    // + <-- puede haber mas de uno igual
    // ()? <-- entre parentesis significa que es opcional 

    // se captura de la siguiente forma para acceder a el después e identificar que recurso cargar:
    const { id } = req.params
    const movie = movies.find(movie => movie.id === id)
    if (movie) return res.json(movie)
    
    res.status(404).json({ message: 'Movie not found' })
})

// Default error 404
app.use((req, res) => {
    res.status(404).send('<h1>Error 404</h1>')
})

// Listen port
app.listen(PORT, () => {
    console.log(`Sever listening in port http://localhost:${PORT}`)
})