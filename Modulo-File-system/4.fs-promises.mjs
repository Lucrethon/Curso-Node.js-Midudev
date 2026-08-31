import fs from 'node:fs/promises'

const RUTAS = {
    texto1 : './archivo.txt',
    texto2 : './archivo-2.txt'
}

// asincronia con promesas en vez de callbacks

fs.readFile(RUTAS.texto1, 'utf-8')
.then(text => {
    console.log('primer text',text)
})

console.log('Hacer algo mientras lee el archivo...')

fs.readFile(RUTAS.texto2, 'utf-8')
.then(text => {
    console.log('segundo text',text)
})
