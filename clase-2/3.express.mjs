import express from 'express'
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
app.get('/json', (req, res) => {
    res.json({"message" : "Hola Mundo"})
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

// cuando se hace una petición con express, se crea una nueva cabecera que HAY QUE QUITAR por temas de seguridad: 
// X-Powered-By: Express

app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`)
})