import express from 'express'
import dittoData from './pokemon/ditto.json' with { type: 'json' };

const app = express()

// cuando se hace una petición con express, se crea una nueva cabecera que HAY QUE QUITAR por temas de seguridad: 
// X-Powered-By: Express
// para desactivarla: 
app.disable('x-powered-by')

const PORT = process.env.PORT ?? 1234


// Middleware: se ejecuta entre la petición (req) y la respuesta (res) para hacer cosas antes de procesar la respuesta (validar cookies, si el usuario esta loggeado, etc)
// Una vez hecho las validaciones y procesos, se ejecuta la funcion next para seguir con el procesamiento de la response 

// aqui le estamos diciendo que el middleware se va a ejecutar en todas las url que tengan /pokemon
// tambien puede ser para todo ('/')
// tambien le estamos diciendo que es para todos los metodos con el use
// pero podemos configurarlo para que sea con solo un tipo de metodo 
app.use('/pokemon/', (req, res, next) => {
    console.log('mi primer middleware')
    // trackear la request a la base de datos
    // revisar las cookies del usuario 
    next()
    // es importante la funcion next para ejecutar la respuesta 
})


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