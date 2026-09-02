// app para que me de un puerto disponible 
import net from 'node:net'

export function findAvilablePort (desirePort) {

    return new Promise((res, rej) => {

        const server = net.createServer()

        server.listen(desirePort, () => {
            const port = server.address().port

            server.close(() => {
                res(port)
            })
        })

        server.on('error', (err) => {
            if (err.code === 'EADDRINUSE') { // si el error es que esta ocupado el puerto
            findAvilablePort(0).then(port => res(port))
            }
            else {
                rej(err)
            }
        })
    })
}

