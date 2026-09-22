import mysql from 'mysql2/promise'

// confifuracion de conexion a nuestra base de datos (port 3306 DBngin)
const config = {
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: '',
    database: 'moviesdb'
};

// conectar a la base de datos: 
const connection = await mysql.createConnection(config)

export class MovieModel {

    static GetAll = async ({ genre }) => {
        const [movies] = await connection.query(
            'SELECT BIN_TO_UUID(movie_id) movie_id, title, year, director, duration, poster, rate FROM movies'
        )
        // el resultado del select es un array de dos posiciones: 
        // [0] -> La información de las tablas 
        // [1] -> El tipo de dato que contienen los registros de esa tabla

        // Filter movies by genre
        if (genre) {
            // not genre found 
            const loweCaseGenre = genre.toLowerCase()
            const [movies] = await connection.query(
                `SELECT 
                BIN_TO_UUID(m.movie_id) AS movie_id,
                m.title, 
                m.year,
                m.director,
                m.duration,
                m.POSTER,
                m.rate,
                g.name
                FROM movies AS m
                JOIN movie_genres AS mg
                    ON m.movie_id = mg.movie_id
                JOIN genres as g
                    ON mg.genre_id = g.genre_id
                WHERE LOWER(g.name) = ?;`, [loweCaseGenre]
            )
            if (movies.length === 0) return []
            return movies
            
        }
        return movies
    }

    static GetById = async ({ id }) => {

        const [movie] = connection.query(
            `SELECT * FROM movies
            WHERE movie_id =${id}`
        )
        if (movie) return movie
    }

    static CreateMovie = async ({input}) => {
        
    }

    static DeleteMovie = async ({ id }) => {

    }

    static UpdateMovie = async ({ id, input }) => {
    // verificación de que la pelicula existe

    // actualizacion de datos de la pelicula 

    // el id NO se puede cambiar porque no esta en la validacion del schema  

    }
}