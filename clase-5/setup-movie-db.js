import mysql from 'mysql2/promise'
import fs from 'node:fs'
// modulo file system para leer archivos 

// configuracion para conectar a la base de datos en la nube de TiDB
const config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    ssl: { rejectUnauthorized: true },
    multipleStatements: true
};
// agregamos multipleStatements: true para permitir varias sentencias SQL juntas

const connection = await mysql.createConnection(config)

// Leemos el archivo SQL que contiene los CREATE TABLE e INSERT iniciales
const sqlScript = fs.readFileSync('./Movies.sql', 'utf-8')
console.log('Creando tablas en TiDB...')
await connection.query(sqlScript)
console.log('¡Tablas creadas y pobladas con éxito!')

await connection.end()

// para iniciar la conección utilizando Node.js y las variables de entorno del archivo .env se ejecuta el comando: 
// node --watch --env-file=.env ./setup-movie-db.js