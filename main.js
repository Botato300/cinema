const movies_container = document.getElementById("movies-container");
const searchForm = document.getElementById("search");
const searchQuery = document.getElementById("search-input");
const panel = document.querySelector(".panel-container");
const closeBtn = document.getElementById("close-button");
const movieInfo = document.querySelector(".movie-info");

$(document).ready(function()
{
	getMovies();

	$(".genders-container").hover(function(){
		$(".genders-list").show();
	}, function(){
		$(".genders-list").hide();
	});

	$(".genders-list li").click(function(){
		var genderID = $(this).attr("value")
		getMoviesByGenre(genderID);
	})
});

window.addEventListener("online", (event) => {
	getMovies();
});

window.addEventListener("offline", () => {
	movies_container.innerHTML = "No tienes conexión a Internet.<br>Conéctate a Internet para poder seguir viendo la página.";
});

searchForm.addEventListener("submit", (event) => {
	event.preventDefault();

	const search_result = document.getElementById("search-result");
	const input = searchQuery.value;

	if(input !== "")
	{
		searchMovie(input);
		search_result.innerHTML = `<h1 title="${input}">Resultados de: <span>${input}</span></h1>`;
	}
});

movies_container.addEventListener("click", (e) => {
	if(e.target.className == "selectable")
	{
		const movieID = e.target.parentElement.parentElement.children[1].value;
		document.body.setAttribute("style", "overflow: hidden");
		getMovieById(movieID);
		panel.style.display = "block";
	}
});

closeBtn.addEventListener("click", () => {
	panel.style.display = "none";
	document.body.setAttribute("style", "overflow: auto");
});

const searchMovie = (movie) => {
	fetch(`https://yts.mx/api/v2/list_movies.json?query_term=${movie}&limit=50`)
		.then(response => {
			return response.json();
		})
		.then(movieData => {
			const movieObj = movieData.data;
			let result = "";

			if (movieObj.movie_count !== 0)
			{
				movieObj.movies.forEach(movieInfo => {
					result += `
						<div class="movie-item">
							<figure>
								<img class="selectable" src="${movieInfo.medium_cover_image}" alt="Portada de la película ${movieInfo.title}">
								<figcaption title="${movieInfo.title}">${movieInfo.title}</figcaption>
							</figure>
							<input type="hidden" value="${movieInfo.id}">
						</div>
					`;
				});
				document.getElementById("error").innerHTML = "";
			}
			else
			{
				document.getElementById("search-result").innerHTML = "";		
				document.getElementById("error").innerHTML = `
					<h1 title="${movie}">No se encontró la película: ${movie}</h1>
					<p>¡Vaya! Parece que esa película no existe o no se encuentra aquí.
				`;
			}
			movies_container.innerHTML = result;
		})
		.catch(error => {
			console.log(`Ha ocurrido un error... ${error}`);
		});
}

const getMovies = () => {
	fetch(`https://yts.mx/api/v2/list_movies.json?limit=50`)
		.then(response => {
			return response.json();
		})
		.then(movieData => {
			const movieObj = movieData.data;
			let result = '';
			document.getElementById("error").innerHTML = "";
			movieObj.movies.forEach(movieInfo => {
				result += `
					<div class="movie-item">
						<figure>
							<img class="selectable" src="${movieInfo.medium_cover_image}" alt="Portada de la película ${movieInfo.title}">
							<figcaption title="${movieInfo.title}">${movieInfo.title}</figcaption>
						</figure>
						<input type="hidden" value="${movieInfo.id}">
					</div>
				`;
			});
			movies_container.innerHTML = result;
		})
		.catch(error => {
			console.log(`Ha ocurrido un error...: ${error}`);
		});
}

const getMoviesByGenre = (gender) => {
	fetch(`https://yts.mx/api/v2/list_movies.json?genre=${gender}&limit=50`)
	.then(response => {
		return response.json();
	})
	.then(movieData => {
		const movieObj = movieData.data;
		let result = '';
		document.getElementById("error").innerHTML = "";
		movieObj.movies.forEach(movieInfo => {
			result += `
				<div class="movie-item">
					<figure>
						<img class="selectable" src="${movieInfo.medium_cover_image}" alt="Portada de la película ${movieInfo.title}">
						<figcaption title="${movieInfo.title}">${movieInfo.title}</figcaption>
					</figure>
					<input type="hidden" value="${movieInfo.id}">
				</div>
			`;
		});
		movies_container.innerHTML = result;
	})
	.catch(error => {
		console.log(`Ha ocurrido un error...: ${error}`);
	});
}

const getMovieById = (id) => {
	fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
		.then(response => {
			return response.json();
		})
		.then(movieData => {
			const movieObj = movieData.data.movie;
			let result = '';

			result = `
					<div>
						<img src="${movieObj.medium_cover_image}" alt="${movieObj.title}">
					</div>

					<div class="movie-details">
						<h1 title="${movieObj.title}">${movieObj.title_english}</h1> 
						<p>${movieObj.description_full}</p>
						<p>Rating: ${movieObj.rating}/10</p>
					</div>
				`;
			movieInfo.innerHTML = result;
		})
		.catch(error => {
			console.log(`Ha ocurrido un error... ${error}`);
		});
}