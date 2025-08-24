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
