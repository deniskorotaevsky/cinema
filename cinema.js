const API_KEY = "5f91e6aa-690c-48dc-af0b-e7cac6b6c04a";
const API_URL_POPULAR = "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1"; // получаем топ 100

const API_URL_SEARCH = "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";

getMovies(API_URL_POPULAR);

async function getMovies(url) {
	const resp = await fetch(url, {
		headers: {
			"Content-Type": "application/json",
			'X-API-KEY': API_KEY,
		},
	});
	const respData = await resp.json();
	showMovies(respData)
}

function getClassByRate(vote) {
	if (vote >= 7) {
		return "green";
	} else if (vote >= 5) {
		return "orange";
	} else {
		return "red";
	}
}

function showMovies(data) {
	const moviesEl = document.querySelector(".movies");

	data.films.forEach((movie) => {
		const movieEl = document.createElement("div");
		movieEl.classList.add("movie");
		movieEl.innerHTML = `                           
		<div class="movie__cover__inner">
					<img src="${movie.posterUrlPreview}"
					class="movie__cover" alt="${movie.nameRu}"/>
						<div class="movie__cover__darkened"></div>
					</div>
					<div class="movie__info">
						<div class="movie__title">${movie.nameRu}</div>
						<div class="movie__category">${movie.genres.map((genre) => ` ${genre.genre}`)}</div>
						<div class="movie__average movie__average--${getClassByRate(movie.rating)}">${movie.rating}</div>
					</div>`;
		moviesEl.appendChild(movieEl);
	});
};