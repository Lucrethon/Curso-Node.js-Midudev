import http from 'node:http'

const server = http.createServer((request, response) => {
    console.log('request received')
    response.end('Hola mundo')
})

server.listen(0 , () => {
    console.log(`server listening on port http://localhost:${server.address().port}`)
})

// si el puerto esta en uso, se le puede pasar el puerto 0 
// el puerto 0 lo que hace es que busca automaticamente el primer puerto que este disponible 
// y se recupera con server.address().port