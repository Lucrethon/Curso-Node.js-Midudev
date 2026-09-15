import crypto from 'node:crypto'
import movies from '../movies.json' with { type: 'json' }

export class MovieModel {

    static GetAll = async ({ genre }) => {
        // Filter movies by genre
        // como se filtran los datos y como se recuperan
        // este metodo tiene que ser ASINCRONO porque este modelo tiene que tratar con datos asincronos
        if (genre) {
            const moviesByGenre = movies.filter((movie) => {
                return movie.genre.some(g => g.toLocaleLowerCase() === genre.toLocaleLowerCase())
            })
            return moviesByGenre
        }
        return movies
    }

    static GetById = async ({ id }) => {
        const movie = movies.find(movie => movie.id === id)
        if (movie) return movie
    }

    static CreateMovie = async ({input}) => {
        const newMovie = {
            id: crypto.randomUUID(),
            ...input
        }
        // esto no es REST porque estamos guardando el estado de la aplicacion en memoria 
        movies.push(newMovie)
        return newMovie
    }

    static DeleteMovie = async ({ id }) => {
    
    const movieIndex = movies.findIndex(movie => movie.id === id)
        if (movieIndex === -1) return false
        
        movies.splice(movieIndex, 1)
        const deletedMovie = movies[movieIndex]
        return deletedMovie

    }

    static UpdateMovie = async ({ id, input }) => {
    // verificación de que la pelicula existe
    const movieIndex = movies.findIndex(movie => movie.id === id)
    if (movieIndex === -1) return false
    
    // actualizacion de datos de la pelicula 
    const updatedMovie = {
        ...movies[movieIndex],
        ...input
    }
    // el id NO se puede cambiar porque no esta en la validacion del schema  

    movies[movieIndex] = updatedMovie
    return updatedMovie
    }
}