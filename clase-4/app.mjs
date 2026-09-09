import express, { json } from 'express'
import cors from 'cors'
import { moviesRouter } from './Routes/movies.mjs'

const app = express()

const PORT = process.env.PORT ?? 1234
// origenes aceptados para hacer requests a nuestra api: 
const ACCEPTED_ORIGINS = [
    'http://localhost:8080',
    'http://localhost:1234',
    'http://movies.com'
]

app.use(express.json())
app.disable('x-powered-by');
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || ACCEPTED_ORIGINS.includes(origin)) {
        return callback(null, true)
    }
    return callback(new Error('Not allowed by CORS'))
  }
}))

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