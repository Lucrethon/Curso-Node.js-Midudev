import http from 'node:http'
import dittoData from './pokemon/ditto.json' with { type: 'json' };

console.log(dittoData[0].name); // "ditto"

const processRequest = (req, res) => {
    const { method, url } = req

    switch (method) {
        case 'GET': {

            switch(url) {
                case '/pokemon/ditto': {
                    res.statusCode = 200
                    res.setHeader('Content-Type', 'application/json; charset=utf-8')
                    return res.end(JSON.stringify(dittoData))
                    }

                default: {
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/html; charset=utf-8')
                    return res.end('<h1>Error 404</h1>')
                    }
                }
            }
        case 'POST': {
            
            switch(url) {
                case '/pokemon': {
                    let body = ''
                    // en la request se envia una información (body)
                    // como se recibe en el servidor?
                    // escuchando el evento data
                    // hay que pensar el envio de información como una tubería: va llegando información
                    // a medida que va llegando la información, se va a querer ir un trozo de lo que va llegando:
                    req.on('data', chunk => {
                        body += chunk.toString()
                        })
                        // a medida que va llegando información, se va guardando en el body 
                        // se convierte de binario a string 
                    // node.js se basa en eventos, entonces una vez que se haya terminado de enviar todos los datos, escuchamos el evento 'end'
                    req.on('end', () => {
                        const data = JSON.parse(body)
                        
                        // convertimos todo el string a JSON
                        // Aqui pudieramos hacer muchas cosas:
                        // llamar a una base de datos para guardar la info

                        // para comprobar que todo funcione correctamente, se envian los mismos datos: 
                        res.writeHead(201, {'Content-Type': 'application/json; charset=utf-8'})

                        // data.timestamp = Date.now()

                        res.end(JSON.stringify(data)) // esto es para comprobar que lo mismo que se envio es lo mismo que recibimos 

                        // The HTTP 201 Created success status response code indicates that the request has succeeded and has led to the creation of a resource.
                        })
                        break
                }

                default: {
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/plain; charset=utf-8')
                    return res.end('Not Found 404')
                    }
            }
        }
    }
}

const server = http.createServer(processRequest)
server.listen(3002, () => {
    console.log(`Primer router en http://localhost:${server.address().port}`)
})