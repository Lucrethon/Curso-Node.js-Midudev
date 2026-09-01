import fs from 'node:fs'

const RUTAS = {
    texto1 : './archivo.txt',
    texto2 : './archivo-2.txt'
}

// sincrono 

console.log('Leyendo el primer archivo...')
const text = fs.readFileSync(RUTAS.texto1, 'utf-8')
console.log(text)

console.log('Hacer algo mientras lee el archivo...')

console.log('Leyendo el segundo archivo...')
const secondText = fs.readFileSync(RUTAS.texto2, 'utf-8')
console.log(secondText)

