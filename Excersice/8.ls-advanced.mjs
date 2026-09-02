import fs from 'node:fs/promises'
import path from 'node:path';
import picocolors from 'picocolors';
const pc = picocolors

const folder = process.argv[2] ?? '.'
// posicion 0: ruta absoluta al ejecutable de Node.js en el sistema
// posición 1: ruta absoluta al archivo JavaScript que se está ejecutando.
// posición 2: Cualquier argumento personalizado que tú le pases en la terminal.
// TODO lo devuelve en string 

async function getDirectory(folder) {
    console.log('carpeta a analizar:', folder)
    let files

    try {
        return files = await fs.readdir(folder)
    }
    catch (err) {
        if (err) {
        console.log(pc.red('❌ Error al leer el directorio'))
        process.exit(1)
    }}
}


async function getFiles(folder, files) {
    
    const filesPromises = files.map(async (file) => {
    const filePath = path.join(folder, file)
    let stats
    try {
        stats = await fs.stat(filePath) // información del archivo 
    }
    catch (err) {
        if (err) {
            console.log(pc.red('Error al leer el archivo'))
            process.exit(1)
        }
    }

    // const isFile = stats.isFile() // si es un fichero
    const isDirectory = stats.isDirectory() // si es un directorio
    const fileType = isDirectory ? 'd' : '-'
    const fileSize = stats.size // tamaño en bytes 
    const fileModified = stats.mtime.toLocaleString()

    const colorSize = (size) => {
        return size < 1000 ? pc.green(size) : pc.red(size)
    }

    return `${pc.magenta(fileType)} ${pc.blue(file.padEnd(40))} ${colorSize(fileSize).toString().padStart(20)} ${pc.yellow(fileModified)}`
    })

    return await Promise.all(filesPromises)
}


async function ls() {
    const files = await getDirectory(folder)
    const filesInfo = await getFiles(folder, files)

    filesInfo.forEach(fileInfo => console.log(fileInfo))

}


// se tienen que hacer dos try-catch porque son procesos diferentes: 
// 1. el try-catch para leer el directorio
// 2. el try-catch para leer en paralelo la información de los archivos 
// tambien se pueden separar los procesos en dos funciones diferentes


// ahora en el terminal al yo ejecutar este script, puedo pasarle el nombre de la carpeta que quiero analizar despues del comando de ejecución de script y me va a devolver los ficheros de ese directorio

// node 8.ls-advanced.mjs ../Modulo-File-system // <-- analizara la carpeta Modulo-File-system

// si el directorio no existe, se maneja el error en el callback con el err 

ls(folder)