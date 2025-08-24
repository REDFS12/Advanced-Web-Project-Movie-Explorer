"use strict";

import { getTrending, searchMovies, posterUrl, getGenres, discoverMovies } from "./api.js";
import { loadFavorites, addFavorite, removeFavorite, isFav } from "./storage.js";

const resultsEl = document.getElementById("results");
const formEl = document.getElementById("searchForm");
const inputEl = document.getElementById("searchInput");
const favListEl = document.getElementById("favoritesList");
const themeBtn = document.getElementById("themeToggle");
const sentinelEl  = document.getElementById("scroll-sentinel");
const genreSel = document.getElementById("genreSelect");
const yearSel  = document.getElementById("yearSelect");
const sortSel  = document.getElementById("sortSelect");
// Infinite scroll state
let mode = "trending";   // 'trending' | 'search'
let query = "";          // actieve zoekterm
let page = 1;            // huidige pagina
let totalPages = 1;      // totaal aantal pagina's uit TMDb
let loading = false;     // voorkomt dubbele loads



let favorites = loadFavorites(); // in-memory kopie

function showLoading() {
  resultsEl.innerHTML = "<p>⏳ Laden...</p>";
}

function renderFavorites() {
  favListEl.innerHTML = "";
  if (!favorites.length) {
    favListEl.innerHTML = "<li><em>Nog geen favorieten.</em></li>";
    return;
  }

  favorites.forEach(f => {
    const li = document.createElement("li");
    li.innerHTML = `
      <img class="fav-thumb" src="${posterUrl(f.poster_path)}" alt="${f.title}">
      <span>${f.title}</span>
      <button class="fav-remove" aria-label="Verwijderen" data-id="${f.id}">❌</button>
    `;
    favListEl.appendChild(li);
  });
}

function appendList(movies = []) {
  if (!movies.length) return;

  movies.forEach(movie => {
    const card = document.createElement("div");
    card.className = "card";
    const pressed = isFav(favorites, movie.id) ? "true" : "false";
    const btnLabel = isFav(favorites, movie.id) ? "❤️ In favorieten" : "❤️ Favoriet";

    card.innerHTML = `
      <img class="poster" src="${posterUrl(movie.poster_path)}" alt="${movie.title}">
      <h3>${movie.title}</h3>
      <p>📅 ${movie.release_date ?? "Onbekend"}</p>
      <p>⭐ ${movie.vote_average ?? "-"}</p>
      <button
        class="btn btn--fav"
        data-id="${movie.id}"
        data-title="${movie.title.replaceAll('"','&quot;')}"
        data-poster-path="${movie.poster_path ?? ''}"
        aria-pressed="${pressed}"
      >${btnLabel}</button>
    `;
    resultsEl.appendChild(card);
  });

  // Events op nieuwe ❤️ knoppen
  resultsEl.querySelectorAll(".btn--fav").forEach(btn => {
    if (btn._wired) return; // niet dubbel binden
    btn._wired = true;
    btn.addEventListener("click", () => {
      const id = Number(btn.dataset.id);
      const title = btn.dataset.title;
      const poster_path = btn.dataset.posterPath || null;

      if (btn.getAttribute("aria-pressed") === "true") {
        favorites = removeFavorite(favorites, id);
        btn.setAttribute("aria-pressed", "false");
        btn.textContent = "❤️ Favoriet";
      } else {
        favorites = addFavorite(favorites, { id, title, poster_path });
        btn.setAttribute("aria-pressed", "true");
        btn.textContent = "❤️ In favorieten";
      }
      renderFavorites();
    });
  });
}

function showLoadingMore(on = true) {
  let el = document.querySelector(".loading-more");
  if (on) {
    if (!el) {
      el = document.createElement("div");
      el.className = "loading-more";
      el.textContent = "Meer laden…";
      resultsEl.after(el);
    }
  } else {
    el && el.remove();
  }
}
async function loadPage(reset = false) {
  if (loading) return;
  if (reset) {
    page = 1;
    totalPages = 1;
    resultsEl.innerHTML = "";
  }
  if (page > totalPages) return;

  loading = true;
  showLoadingMore(true);
  try {
    let data;
    if (mode === "trending") {
      data = await getTrending(page);
    } else {
      data = await searchMovies(query, page);
    }
        // Controle: als er geen resultaten zijn, zet totalPages op huidige pagina
    if (!data.results || data.results.length === 0) {
      totalPages = page;
      return;
    }
    totalPages = data.total_pages || 1;
    appendList(data.results || []);
    page += 1;
  } catch (err) {
    console.error(err);
    if (!resultsEl.innerHTML.trim()) {
      resultsEl.innerHTML = `<p>⚠️ Fout bij laden: ${err.message}</p>`;
    }
  } finally {
    loading = false;
    showLoadingMore(false);
  }
}

function renderList(movies = []) {
  resultsEl.innerHTML = "";
  if (!movies.length) {
    resultsEl.innerHTML = "<p>Geen resultaten gevonden.</p>";
    return;
  }

  movies.forEach(movie => {
    const card = document.createElement("div");
    card.className = "card";
    const pressed = isFav(favorites, movie.id) ? "true" : "false";
    const btnLabel = isFav(favorites, movie.id) ? "❤️ In favorieten" : "❤️ Favoriet";

    card.innerHTML = `
      <img class="poster" src="${posterUrl(movie.poster_path)}" alt="${movie.title}">
      <h3>${movie.title}</h3>
      <p>📅 ${movie.release_date ?? "Onbekend"}</p>
      <p>⭐ ${movie.vote_average ?? "-"}</p>
      <button
        class="btn btn--fav"
        data-id="${movie.id}"
        data-title="${movie.title.replaceAll('"','&quot;')}"
        data-poster-path="${movie.poster_path ?? ''}"
        aria-pressed="${pressed}"      
      >${btnLabel}
      </button>
    `;
    resultsEl.appendChild(card);
  });

  // Klik op ❤️ knoppen
  resultsEl.querySelectorAll(".btn--fav").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = Number(btn.dataset.id);
      const movieCard = btn.closest(".card");
      const title = btn.dataset.title;
      const img = movieCard.querySelector(".poster").getAttribute("src");
      const poster_path = btn.dataset.posterPath || null;
      // ^ kleine fallback: als er geen echte TMDb poster is, bewaren we null

      if (btn.getAttribute("aria-pressed") === "true") {
        // verwijderen
        favorites = removeFavorite(favorites, id);
        btn.setAttribute("aria-pressed", "false");
        btn.textContent = "❤️ Favoriet";
      } else {
        // toevoegen
        favorites = addFavorite(favorites, { id, title, poster_path });
        btn.setAttribute("aria-pressed", "true");
        btn.textContent = "❤️ In favorieten";
      }
      renderFavorites();
    });
  });
}

async function loadTrending() {
  mode = "trending";
  query = "";
  await loadPage(true); // reset en laad pagina 1
}

async function handleSearch(e) {
  e.preventDefault();
  const q = inputEl.value.trim();

  if (!q) {
    return loadTrending();
  }
  mode = "search";
  query = q;
  await loadPage(true); // reset en laad resultaten vanaf p1
}

function wireFavRemovalFromSidebar() {
  favListEl.addEventListener("click", (e) => {
    const btn = e.target.closest(".fav-remove");
    if (!btn) return;
    const id = Number(btn.dataset.id);
    favorites = removeFavorite(favorites, id);
    renderFavorites();
    // update knoppen in cards zodat state klopt
    resultsEl.querySelectorAll(".btn--fav").forEach(b => {
      if (Number(b.dataset.id) === id) {
        b.setAttribute("aria-pressed", "false");
        b.textContent = "❤️ Favoriet";
      }
    });
  });
}

const THEME_KEY = "theme_v1"; // 'light' | 'dark' | null

function getSystemTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
function applyTheme(theme) {
  const t = theme || getSystemTheme();
  document.documentElement.setAttribute("data-theme", t);
  themeBtn.textContent = t === "dark" ? "☀️" : "🌙";
}
function loadTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  applyTheme(saved);
}
function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme") || getSystemTheme();
  const next = current === "dark" ? "light" : "dark";
  localStorage.setItem(THEME_KEY, next);
  applyTheme(next);
}

const io = new IntersectionObserver(
  (entries) => {
    const entry = entries[0];
    if (!entry.isIntersecting) return; // niet in beeld
    if (page <= totalPages && !loading) {
      loadPage(false);                   // haal volgende pagina en append
    }
  },
  {
    root: null,            // viewport
    rootMargin: "200px 0px", // vroegtijdig laden (200px vóór het einde)
    threshold: 0
  }
);

// Start observeren
io.observe(sentinelEl);

async function populateGenres() {
  try {
    const data = await getGenres();
    genreSel.innerHTML = `<option value="">Alle genres</option>` +
      data.genres.map(g => `<option value="${g.id}">${g.name}</option>`).join("");
  } catch (e) {
    genreSel.innerHTML = `<option value="">(genres niet geladen)</option>`;
    console.error("Fout bij laden van genres:", e);
  }
}

function populateYears(from = 2025, to = 1950) {
  const items = ['<option value="">Alle jaren</option>'];
  for (let y = from; y >= to; y--) {
    items.push(`<option value="${y}">${y}</option>`);
  }
  yearSel.innerHTML = items.join("");
}



window.addEventListener("load", () => {
  loadTheme();
  renderFavorites();
  populateGenres();
  populateYears();
  loadTrending();
  wireFavRemovalFromSidebar();
});
formEl.addEventListener("submit", handleSearch);
themeBtn.addEventListener("click", toggleTheme); // wissel licht/donker