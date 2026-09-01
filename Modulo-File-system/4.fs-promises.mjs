import fs from 'node:fs/promises'

const RUTAS = {
    texto1 : './archivo.txt',
    texto2 : './archivo-2.txt'
};

// asincronia con promesas en vez de callbacks

fs.readFile(RUTAS.texto1, 'utf-8')
.then(text => {
    console.log('primer text',text)
});

console.log('Hacer algo mientras lee el archivo...');

fs.readFile(RUTAS.texto2, 'utf-8')
.then(text => {
    console.log('segundo text',text)
});
//


//si el modulo no tiene promesa: 

// import { promisify } from 'node:util'
// const readFilePomise = promisify(fs.readFile)
// // y se utiliza esta funcion de promesa: 

// readFilePomise(RUTAS.texto2, 'utf-8')
// .then(text => {
//     console.log('segundo text',text)
// }) 

// con await: 

// esto solo funciona con ES Modules
// con common modules no funciona 
const textAwait = await fs.readFile(RUTAS.texto2, 'utf-8');
console.log('con await (solo mjs)', textAwait);

// con async - await secuencial : 

// 1ra forma: funcion auto-invocada 
// IIFE - Inmediatly Invoked Function Expression 
(
    async ()=>{
        const textAwait = await fs.readFile(RUTAS.texto1, 'utf-8')
        console.log('con async-await', textAwait)
    }
)() // estamos invocando una funcion al mismo tiempo que la estamos ejecutando 
