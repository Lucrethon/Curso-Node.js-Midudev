import http from 'node:http'
import fs from 'node:fs'
// 1. importar modulo http

const desiredPort = process.env.PORT ?? 3001

const processRequest = (request, response) => {
    // ESTA funcion seria el "procesar" de la request 

    response.setHeader('Content-Type', 'text/html; charset=utf-8')

    // lo que envia la request de un cliente: 
    // URL, headers, method (GET, POST, etc), body (los datos)
    // con los headers del request podemos saber quien esta haciendo la petición con el header User-Agent
    // la petición lo puede hacer una terminal, una pagina, un telefono, etc
    // en base a quien hace la petición, nosotros podemos enviar una response u otra en función del User-Agent

    // lo que envia la response del servidor: 
    // statusCode (200 OK, 404 Not Found, etc), headers, body (los datos)
    // el body del response se settea con response.end(datos aqui)
    // en los headers podemos settear el tipo de contenido que se esta enviado, la codificación, etc

    // cada vez que recibe una request (petición), ejecuta este codigo:  
    if (request.url === '/') {
        response.statusCode === 200 // OK
        // la respuesta la terminamos enviando un texto plano:
        response.end('<h1>Bienvenido a mi página de inicio<h1>')
    }
    else if (request.url === '/contacto') {
        response.statusCode === 200 
        response.end('<h2>Numero de contacto: 0000-000-000<h2>')
    }
    else if (request.url === '/imagen-super-bonita.png') {
        
        fs.readFile('./Fondo.png', (err, data) => {
            if(err) {
                response.statusCode = 500; 
                response.end('<h1>Error 500 Internal Server Error<h1>')
            }
            else {
                response.statusCode = 200
                response.setHeader('Content-type', 'image/png')
                response.end(data)
            }
        })
    }
    else {
        response.statusCode == 404 // Not Found
        response.end('<h1>Error 404<h1>')
        // response.end es lo que envia como "body" la respuesta que le llega al cliente 

    }
}

// 2. creamos un servidor llamando al metod createServer, el cual recibe un callback
const server = http.createServer(processRequest)



// 3. escucharmos el servidor en un puerto 
server.listen(desiredPort , () => {
// el callback es que, una vez levantado el servidor, se ejecuta el callback 
console.log(`server listening on port http://localhost:${server.address().port}`)
})



    // generalmente la iniciar un servidor, se hacen dos request:
    // 1. Local Host (/)
    // 2. favicon (/favicon.ico)

    // una petición es lo que pide un usuario a la red. Por ejemplo, cuando abre una pagina

    // para aplicar cambios en el servidor, se tiene que cerrar con Ctrl + C y volverlo a abrir
    // si quieres verlos autimaticamente, se ejecuta este comando en la terminal:
    // node --watch ./1.http.mjs
