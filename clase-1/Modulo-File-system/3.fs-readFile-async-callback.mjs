import fs from 'node:fs'

const RUTAS = {
    texto1 : './archivo.txt',
    texto2 : './archivo-2.txt'
}

// asincrono con callbacks


fs.readFile(RUTAS.texto1, 'utf-8', (err, text) => {
// mientras se ejecuta lo que esta en el callback
    if (err) console.log(err.text())
    else console.log(text)
})
// se va ejecutando esto y no espera a que el callback termine 
// esto se ejecuta antes de que se lea el texto porque es asincrono
console.log('Hacer algo mientras lee el archivo...')

fs.readFile(RUTAS.texto2, 'utf-8', (err, text) => {
// mientras se ejecuta lo que esta en el callback
    if (err) console.log(err.text())
    else console.log(text)
})