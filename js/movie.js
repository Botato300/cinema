/**
 * Representa una pelicula.
 */
class Movie{
	#id = 0;
    #title = "";
	#genres = [];
	#year = 0;
	#summary = "";
	#coverImage = "";

    constructor(id, title, genres, year, summary, coverImage){
        this.#id = id;
        this.#title = title;
		this.#genres = genres;
		this.#year = year;
		this.#summary = summary;
		this.#coverImage = coverImage;
    }

    get getTitle(){
        return this.#title;
    }

    get getGenres(){
        return this.#genres;
    }

    get getYear(){
        return this.#year;
    }

    get getId(){
        return this.#id;
    }

    get getSummary(){
        return this.#summary;
    }

    get getCoverImage(){
        return this.#coverImage;
    }
}

export {Movie};