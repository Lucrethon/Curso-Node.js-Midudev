import path from "node:path";

// este modulo funciona para: 
// construir nuevas rutas de archivos
// saber si un archivo tiene una extension 
// recuperar una extension 
// unir rutas


console.log(path.sep) // <- Esto nos dice la separación de rutas en nuestro sistema operativo 

// unir rutas con path join: 
const filePath = path.join('content', 'sub-folder', 'test-text')
console.log(filePath)

// saber el nombre del fichero: 
const base = path.basename('/tmp/lulu-secret-files/password.txt') //<- de la ruta completa, solo te da el nombre del fichero
console.log(base)

const fileName = path.basename('/tmp/lulu-secret-files/password.txt', '.txt') // quita la extension txt y te da solo el nombre 
console.log(fileName)

// para obtener solo la extension: 
const extension = path.extname('image.jpg')
console.log(extension) // <- .jpg

const extension2 = path.extname('super.lulu.jpg')
console.log(extension2) // te da la extensión correcta 