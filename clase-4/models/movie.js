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
    }
}