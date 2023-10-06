import { Movie } from "./movie.js";

const API_URL = "https://yts.mx/api/v2/";

/**
 * Representa un gestor de peliculas, permite gestionar las peliculas.
 */
class MovieManager {
    #idMovie = [];

    constructor() {
        console.log(`${this.constructor.name} instanciado.`);
    }

    get getMovies() {
        return this.#idMovie;
    }

    async createMovie() {
        try {
            const response = await fetch(`${API_URL}list_movies.json?query_term=harry potter`);
            const content = await response.json();

            if (content.data.movie_count <= 0) return false;

            const arrMovies = content.data.movies;
            for (const movie of arrMovies) {
                this.#idMovie.push(new Movie(movie.id, movie.title, movie.genres, movie.year, movie.summary, movie.large_cover_image));
            }

        }
        catch (error) {
            console.error(error);
        }
    }

}


export { MovieManager };