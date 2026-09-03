
// fs = filesystem
import fs from 'node:fs'

const stats = fs.statSync('./archivo.txt')
// fs.stat() en Node.js consulta y devuelve los metadatos de un archivo o directorio (como su tamaño, permisos, fechas de creación/modificación o si es un archivo o carpeta).

console.log(
    stats.isFile(), // si es un fichero
    stats.isDirectory(), // si es un directorio
    stats.isSymbolicLink(), // si es un enlace simbolico
    stats.size, // tamaño en bytes 
)