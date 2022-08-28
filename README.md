# CinemaWeb
## Documentación
### Descripción General
Es una página donde podrás ver información sobre diferentes películas. Podrás buscar películas por su nombre utilizando el buscador
y por su género utilizando el menú de géneros.
Se utilizó HTML, CSS, y JavaScript para la creación de la página web. 

### Detalles
En esta documentación se centrará unicamente en JavaScript.

Se hace uso de varios eventos para saber si el usuario hizo click en un elemento, si el usuario no tiene acceso a internet, etc. También implementé varias funciones creadas por mi, como **getMovies**, **getMoviesById**, **getMoviesByGenre**, y **searchMovie**. Inclusive, se hace uso de una API para obtener varios datos de las películas que se muestran como sus nombres, fotos de portada, sipnosis, géneros, etc.
### Código
Aquí se muestra un ejemplo de un evento que utilicé, se llama **click**, cuando el usuario hace click dentro del contenedor "movies_container", verificará si el elemento contiene el nombre de clase "selectable", de ser así, se ejecuta una serie de instrucciones para mostrar en pantalla la información de la película.
````javascript
movies_container.addEventListener("click", (e) => {
	if(e.target.className == "selectable")
	{
		const movieID = e.target.parentElement.parentElement.children[1].value;
		document.body.setAttribute("style", "overflow: hidden");
		panel.style.display = "block";
		
		getMovieById(movieID);
	}
});
````

La función **getMovies**  realiza una petición asíncrona hacía la API, esto devuelve un JSON. Desde aquí obtengo varios datos como el nombre, imagen de portada, descripción, y su ID. Básicamente obtiene un listado de películas, 50 como máximo (se específica en la url, ya que es una petición de método GET). Posteriormente, se recorre todo el objeto con forEach e inserta el código HTML para poder visualizarlo.
````javascript
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
````
Las funciones **getMoviesById**, **getMoviesByGenre**, y **searchMovies** funcionan de manera parecida ya que una obtiene las películas filtrándolas por su ID o género, o por su nombre en el caso de **searchMovies**.


### Vista Previa
![preview](https://user-images.githubusercontent.com/51982229/177448618-da454019-47ce-43ea-8c26-c6d61c75825e.gif)

