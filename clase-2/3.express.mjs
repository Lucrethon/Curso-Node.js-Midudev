import express from 'express'
const app = express()

const PORT = process.env.PORT ?? 1234

//aqui estamos diciendo: cuando se haga una peticion (req) "GET" en la url "/", envia este body 
app.get('/', (req, res) => {
    res.status(200).send('<h1>Mi pagina</h1>')
})

app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`)
})