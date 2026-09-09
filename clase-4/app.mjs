import express, { json } from 'express'
import { moviesRouter } from './Routes/movies.mjs'
import { corsMiddleware } from './middlewares/cors.mjs'

const app = express()

const PORT = process.env.PORT ?? 1234


app.use(express.json())
app.disable('x-powered-by');
app.use(corsMiddleware)

app.get('/', (req, res) => {
    res.send('<h1>Mi Pagina</h1>')
})

// TODOS los recursos que sean MOVIES se identifican con /movies
app.use('/movies', moviesRouter)

// Default error 404
app.use((req, res) => {
    res.status(404).send('<h1>Error 404</h1>')
})

// Listen port
app.listen(PORT, () => {
    console.log(`Sever listening in port http://localhost:${PORT}`)
})