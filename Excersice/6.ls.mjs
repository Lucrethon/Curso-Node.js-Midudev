import fs from 'node:fs'

// leer el directorio
// con callback:
fs.readdir('.', (err, files) => {
    if (err) {
        console.log('Error al leer el directorio', err)
        return
    }

    files.forEach(file => {
        console.log(file) // <- devuelve un listado de los ficheros del directorio actual 
    });
});

// con promesas: 
// import fs from 'node:fs/promises'

fs.readdir('.')
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