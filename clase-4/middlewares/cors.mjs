import cors from 'cors'

// origenes aceptados para hacer requests a nuestra api: 
const ACCEPTED_ORIGINS = [
    'http://localhost:8080',
    'http://movies.com'
]

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => {
    return cors({
        origin: (origin, callback) => {
            if (!origin || acceptedOrigins.includes(origin)) {
            return callback(null, true)
        }
        return callback(new Error('Not allowed by CORS'))
    }
    })
}
    
