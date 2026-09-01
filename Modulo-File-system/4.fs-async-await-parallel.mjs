import fs from 'node:fs/promises'

const RUTAS = {
    texto1 : './archivo.txt',
    texto2 : './archivo-2.txt'
};


// asinctronia en paralelo

Promise.all([
    fs.readFile(RUTAS.texto1, 'utf-8'),
    fs.readFile(RUTAS.texto2, 'utf-8')
]).then(([text1, text2]) => {
    console.log('texto 1: ', text1);
    console.log('texto 2: ', text2)
})

// puntos a favor de hacerlo en paralelo: 
// 1. es mas rapido porque cuando termine de leer los dos archivos, continua el codigo
// 2. si se ejecuta el codigo en el orden que queremos 