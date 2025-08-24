"use strict";

import { getTrending, searchMovies, posterUrl } from "./api.js";
import { loadFavorites, addFavorite, removeFavorite, isFav } from "./storage.js";

const resultsEl = document.getElementById("results");
const formEl = document.getElementById("searchForm");
const inputEl = document.getElementById("searchInput");
const favListEl = document.getElementById("favoritesList");
const themeBtn = document.getElementById("themeToggle");

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
  try {
    showLoading();
    const data = await getTrending();
    renderList(data.results);
  } catch (err) {
    resultsEl.innerHTML = `<p>⚠️ Fout bij laden: ${err.message}</p>`;
    console.error(err);
  }
}

async function handleSearch(e) {
  e.preventDefault();
  const q = inputEl.value.trim();
  if (!q) {
    loadTrending();
    return;
  }
  try {
    showLoading();
    const data = await searchMovies(q);
    renderList(data.results);
  } catch (err) {
    resultsEl.innerHTML = `<p>⚠️ Fout bij zoeken: ${err.message}</p>`;
    console.error(err);
  }
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

window.addEventListener("load", () => {
  loadTheme();
  renderFavorites();
  loadTrending();
  wireFavRemovalFromSidebar();
});
formEl.addEventListener("submit", handleSearch);
themeBtn.addEventListener("click", toggleTheme); // wissel licht/donker