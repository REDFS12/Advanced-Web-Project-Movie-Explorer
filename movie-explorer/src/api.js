const API_BASE = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const IMG_BASE = "https://image.tmdb.org/t/p/w342"; // poster-URL

// Hulpfunctie voor querystring
function params(extra = {}) {
  const p = new URLSearchParams({
    api_key: API_KEY,
    language: "nl-NL",
    include_adult: "false",
    ...extra,
  });
  return p.toString();
}

// Algemene fetch
async function getJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`TMDb error ${res.status}`);
  return res.json();
}

// Trending films
export async function getTrending(page = 1) {
  const url = `${API_BASE}/trending/movie/week?${params({ page })}`;
  return getJson(url);
}

// Helper voor poster-URL
export function posterUrl(path) {
  return path ? `${IMG_BASE}${path}` : "https://placehold.co/342x513?text=No+Poster";
}

// Zoeken op titel
export async function searchMovies(query, page = 1) {
  const url = `${API_BASE}/search/movie?${params({ query, page })}`;
  return getJson(url);
}

// Genres ophalen (voor dropdown)
export async function getGenres(lang = "nl-NL") {
  const url = `${API_BASE}/genre/movie/list?${params({ language: lang })}`;
  return getJson(url); // -> { genres: [ { id, name }, ... ] }
}

// Discover endpoint met filters + sortering
export async function discoverMovies({
  page = 1,
  with_genres = "",
  primary_release_year = "",
  sort_by = "popularity.desc"
} = {}) {
  const url = `${API_BASE}/discover/movie?${params({
    page,
    with_genres,
    primary_release_year,
    sort_by
  })}`;
  return getJson(url);
}

// Details van een film
export async function getMovieDetails(id, lang = "nl-NL") {
  const url = `${API_BASE}/movie/${id}?${params({ language: lang })}`;
  return getJson(url);
}
