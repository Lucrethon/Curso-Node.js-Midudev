// objeto process:
// objeto global
// proporciona informacion y control sobre el proceso actual de ejecución 
// tiene objetos y metodos que te permiten interactuar con el entorno de ejecución de node.js

// argumentos de entrada 
// recuperar los argumentos de entrada al ejecutar un comando de node 
console.log(process.argv) 
// salida -> 
// [
//   '/home/lucrethon/.local/share/fnm/node-versions/v24.20.0/installation/bin/node',
//   '/home/lucrethon/Developer/Curso-Midudev-Node-JS/Excersice/7.process.mjs'
// ]


// controlar eventos del proceso: 
process.on('exit', () => {
    // limpiar consola
    // limpiar los recursos 
})
// se pueden leer eventos del proceso o errores 

// metodo cwd: current working directory 
// nos dice desde que carpeta estamos ejecutando el proceso 
console.log(process.cwd())

// controlar el proceso y su salida: 
// process.exit(1)
// 0: el proceso se ejecuto correctamente y tiene que terminar ahi 
// 1: ha habido un error y se necesita salir del proceso 

//platform
// para saber las variables de entorno: 
console.log(process.env.NODE_ENV) // variable de entorno para producción o desarrollo
console.log(process.env.PEPITO) // PEPITO=hola (definido en consola) Salida -> hola