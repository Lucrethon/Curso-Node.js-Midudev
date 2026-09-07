import http from 'node:http'
import dittoData from './pokemon/ditto.json' with { type: 'json' };

console.log(dittoData[0].name); // "ditto"

const processRequest = (req, res) => {
    const { method, url } = req

    switch (method) {
        case 'GET': {

            switch(url) {
                case '/pokemon/ditto': {
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
                case '/pokemon':{
                    let body = ''
                }
            }
        }
    }
}

const server = http.createServer(processRequest)
server.listen(3002, () => {
    console.log(`Primer router en http://localhost:${server.address().port}`)
})