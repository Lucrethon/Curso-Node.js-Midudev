// .js -> por defecto utiliza CommonJS
// .mjs -> para utilizar ES Modules
// .cjs -> Para forzar utilizar CommonJS

// con el mjs podemos utilizar el import comun 

import os from 'node:os'

// con cjs: 
// const os = require('node:os')

console.log('Informacion del sistema operartivo', os.platform())
console.log('Nombre del sistema operativo', os.release())
console.log('Arquitectura', os.arch())
console.log('CPUs', os.cpus()) // <-- Con esto se escalan procesor en Node.js
console.log('Memoria libre', os.freemem() / 1024 / 1024)
console.log('Memoria total', os.totalmem() / 1024 / 1024)
console.log('uptime', os.uptime() /60 /60 / 24) // <- dias que lleva la PC encendida (dias)