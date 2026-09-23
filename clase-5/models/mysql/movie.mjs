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

        const [movie] = await connection.query(
            `SELECT * FROM movies
            WHERE movie_id = ?`, [id]
        )
        if (movie) return movie
    }

    static CreateMovie = async ({input}) => {
        const {
            genre: genreInput, // Extraemos genre para no enviarlo a la tabla movies
            title,
            year,
            director,
            duration,
            poster,
            rate,
        } = input;

        const movie_id = crypto.randomUUID()

        await connection.query(
            `INSERT INTO movies (movie_id, title, year, director, duration, poster, rate) VALUES 
            (UUID_TO_BIN(?), ?, ?, ?, ?, ?, ?)`, [
                movie_id,                 
                title,
                year,
                director,
                duration,
                poster,
                rate]
        ); 
        
        if (genreInput && genreInput.length > 0) {
            for (const genre of genreInput) {
                const genreLowerCase = genre.toLowerCase()
                await connection.query(
                    `INSERT INTO movie_genres VALUES
                        (UUID_TO_BIN(?), (SELECT genre_id FROM genres WHERE LOWER(name) = ?))
                    `, [movie_id, genreLowerCase]
                )
            }
        }

        return {
            movie_id, 
            ...input
        }

    }

    static DeleteMovie = async ({ id }) => {
        const [deleted_movie] = await connection.query(`SELECT BIN_TO_UUID(movie_id) AS movie_id, title FROM movies WHERE movie_id = UUID_TO_BIN(?)`, [id]); 
        if (deleted_movie.length === 0) return false

        await connection.query(`DELETE FROM movie_genres WHERE movie_id = UUID_TO_BIN(?)`, [id])
        await connection.query(`DELETE FROM movies WHERE movie_id = UUID_TO_BIN(?)`, [id])
        
        return deleted_movie

    }

    static UpdateMovie = async ({ id, input }) => {

        const { genre: genreInput, ...movieData } = input

        const movieFields = Object.keys(movieData)
        if (movieFields.length > 0) {
            const sqlClause = movieFields.map(key => `${key} = ?`).join(', ');
            const sqlParamaters = Object.values(movieData);
            const sqlQuery = `UPDATE movies SET ${sqlClause} WHERE movie_id = UUID_TO_BIN(?);`
            const [result] = await connection.query(sqlQuery, [...sqlParamaters, id])

            // Si la película no existe en la BD, salimos inmediatamente
            if (result.affectedRows === 0) return false
        }

        if (genreInput && genreInput.length > 0) {
            // eliminar los generos anteriores de la pelicula 
            await connection.query(`DELETE FROM movie_genres WHERE movie_id = UUID_TO_BIN(?);`, [id])

            for (const genre of genreInput) {
                const genreLowerCase = genre.toLowerCase()
                await connection.query(
                    `INSERT INTO movie_genres (movie_id, genre_id) VALUES
                        (UUID_TO_BIN(?), (SELECT genre_id FROM genres WHERE LOWER(name) = ?));
                    `, [id, genreLowerCase]
                )
            }
        }

        return true
    }
}