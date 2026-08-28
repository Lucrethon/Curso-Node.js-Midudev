console.log('Hola mundo')
console.log('La terminal de node NO LEE EL OBJETO GLOBAL WINDOW, hay OTRO objeto global')
console.log(typeof window) // -> undefined 
// El objeto GLOBAL para todos los entornos (tanto para Node.js, navegador es globalThis)
// se puede acceder a ella desde donde sea 
// en el navegador, globalThis apunta al objeto window
// en node.js, globalThis apunta a global
// la forma CORRECTA para referirse a la variable de AMBOS ENTORNOS es usar SIEMPRE globalThis
console.log(globalThis)
// la funcion console.log viene de la variable globalThis
globalThis.console.log('Esto funciona')
global.console.log('Esto tambien funciona')
// el objeto Math tambien viene de esa variable global 
const variableLoca = globalThis.Math.random(100)

// forma antigua de importar modulos en node.js (CommonJS Module Import)
const {sumar} = require('./sum')
sumar(2, 2)
