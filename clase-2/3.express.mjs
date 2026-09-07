import express from 'express'
const app = express()

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

app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`)
})