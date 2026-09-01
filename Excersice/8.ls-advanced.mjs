import fs from 'node:fs/promises'

const folder = process.argv[2] ?? '.'
// posicion 0: ruta absoluta al ejecutable de Node.js en el sistema
// posición 1: ruta absoluta al archivo JavaScript que se está ejecutando.
// posición 2: Cualquier argumento personalizado que tú le pases en la terminal.

console.log('carpeta a analizar:', folder)

fs.readdir(folder)
.then(files => {
    files.forEach(file => {
    console.log(file) 
    })
})
.catch(err => {
    if (err) {
    console.log('Error al leer el directorio', err)
    return
    }
});

// ahora en el terminal al yo ejecutar este script, puedo pasarle el nombre de la carpeta que quiero analizar despues del comando de ejecución de script y me va a devolver los ficheros de ese directorio

// node 8.ls-advanced.mjs ../Modulo-File-system // <-- analizara la carpeta Modulo-File-system

// si el directorio no existe, se maneja el error en el callback con el err 