import http from 'node:http'
import { findAvilablePort } from './10.free-port.mjs'

const desiredPort = process.env.PORT ?? 3001

const server = http.createServer((request, response) => {
    console.log('request received')
    response.end('Hola mundo')
})

findAvilablePort(desiredPort).then(port => {
    server.listen(port , () => {
    console.log(`server listening on port http://localhost:${server.address().port}`)
})

})


// si el puerto esta en uso, se le puede pasar el puerto 0 
// el puerto 0 lo que hace es que busca automaticamente el primer puerto que este disponible 
// y se recupera con server.address().port

// si se quiere hacer que el puerto sea una variable de entorno
// antes de ejecutar el script, se tiene que declarar la variable (PORT=1234 node 9.http.mjs)