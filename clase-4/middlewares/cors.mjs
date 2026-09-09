import cors from 'cors'

// origenes aceptados para hacer requests a nuestra api: 
const ACCEPTED_ORIGINS = [
    'http://localhost:8080',
    'http://movies.com'
]

export const corsMiddleware = cors({
    origin: (origin, callback) => {
        if (!origin || ACCEPTED_ORIGINS.includes(origin)) {
        return callback(null, true)
    }
    return callback(new Error('Not allowed by CORS'))
  }
})