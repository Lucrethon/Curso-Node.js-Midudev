import express from 'express'
import dittoData from './pokemon/ditto.json' with { type: 'json' };

const app = express()

// cuando se hace una petición con express, se crea una nueva cabecera que HAY QUE QUITAR por temas de seguridad: 
// X-Powered-By: Express
// para desactivarla: 
app.disable('x-powered-by')

const PORT = process.env.PORT ?? 1234

//aqui estamos diciendo: cuando se haga una peticion (req) "GET" en la url "/", envia este body 
// Express en la mayoria de los casos va a determinar autimaticamente el content type 
app.get('/', (req, res) => {
    res.send('<h1>Mi pagina</h1>')
})

// para enviar un json: 
app.get('/pokemon/ditto', (req, res) => {
    res.json(dittoData)
})

app.post('/pokemon', (req, res) => {
    let body = ''

    req.on('data', chunk => {
        body += chunk.toString()
        })

    req.on('end', () => {
        const data = JSON.parse(body)
        res.status(201).json(data)
        })
})

// tratar el error 404
// esto SIEMPRE tiene que ir de ultimo porque Express lee las peticiones en orden
// se coloca .use porque eso engloba TODO TIPO de peticiones (GET, POST, PUT, etc)
app.use((req, res) => {
    res.status(404).send('<h1>Error 404</h1>')
})

app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`)
})