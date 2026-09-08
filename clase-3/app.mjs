import express from 'express'

const app = express()

const PORT = process.env.PORT ?? 1234

app.disable('x-powered-by');

app.get('/', (req, res) => {
    res.send('<h1>Mi Pagina</h1>')
})

// Default error 404
app.use((req, res) => {
    res.status(404).send('<h1>Error 404</h1>')
})

// Listen port
app.listen(PORT, () => {
    console.log(`Sever listening in port http://localhost:${PORT}`)
})