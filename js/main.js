"use strict";

import {MovieManager} from "./movieManager.js";

const manager = new MovieManager();



(async () =>{
	await manager.createMovie()
	const movies = manager.getMovies;
	console.table(movies);
	
	// mainContainer.innerHTML = `
	// 	<section class="primary-movie">
	// 		<span class="primary-movie__title">${movies[3].getTitle}</span>
	// 		<img src="${movies[3].getCoverImage}" alt="Imagen de portada de la película ${movies[3].getTitle}" class="primary-movie__image" width="auto" height="auto">
	// 	</section>
	// `
	;
})()
