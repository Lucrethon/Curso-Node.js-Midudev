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
