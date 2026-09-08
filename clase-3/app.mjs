import express from 'express'
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

// Default error 404
app.use((req, res) => {
    res.status(404).send('<h1>Error 404</h1>')
})

// Listen port
app.listen(PORT, () => {
    console.log(`Sever listening in port http://localhost:${PORT}`)
})