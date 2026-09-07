import express from 'express'

const app = express()

const PORT = process.env.PORT ?? 1234

app.disable('x-powered-by');

app.get('/', (req, res) => {
    res.send('<h1>Mi Pagina</h1>')
})

app.listen(PORT, () => {
    console.log(`Sever listening in port http://localhost:${PORT}`)
})