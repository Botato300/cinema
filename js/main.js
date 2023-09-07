"use strict";

import {MovieManager} from "./movieManager.js";

const manager = new MovieManager();

(async () =>{
	await manager.createMovie()
	const movies = manager.getMovies;
	console.table(movies);

	const mainContainer = document.getElementById("main");
	mainContainer.innerHTML = `
		<section class="primary-movie">
			<span class="primary-movie__title">${movies[1].getTitle}</span>
			<img src="${movies[1].getCoverImage}" alt="Imagen de portada de la pelicula ${movies[1].getTitle}" class="primary-movie__image" width="auto" height="auto">
		</section>
	`;
})()
