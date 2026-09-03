import fs from 'node:fs/promises'

const RUTAS = {
    texto1 : './archivo.txt',
    texto2 : './archivo-2.txt'
};


// con await (secuencial): 

// esto solo funciona con ES Modules
// con common modules no funciona 

console.log('Leyendo primer archivo...')
const textAwait = await fs.readFile(RUTAS.texto1, 'utf-8');
console.log('con await (solo mjs)', textAwait);

console.log('Haciendo cosas mientras lee el archivo...')

console.log('Leyendo segundo archivo...')
const textAwait2 = await fs.readFile(RUTAS.texto2, 'utf-8');
console.log('con await (solo mjs)', textAwait2);



// con async - await (secuencial) : 

// 1ra forma: funcion auto-invocada 
// IIFE - Inmediatly Invoked Function Expression 
(
    async ()=>{
        const textAwait = await fs.readFile(RUTAS.texto1, 'utf-8')
        console.log('con async-await', textAwait)
    }
)() // estamos invocando una funcion al mismo tiempo que la estamos ejecutando 


// es secuencial porque hasta que no se termine de leer un archivo, no lee el otro y no ejecuta la lectura
// en paralelo, los textos se leen paralelamente 