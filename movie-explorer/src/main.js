"use strict";

import { getTrending, searchMovies, posterUrl } from "./api.js";

const resultsEl = document.getElementById("results");
const formEl = document.getElementById("searchForm");
const inputEl = document.getElementById("searchInput");

function showLoading() {
  resultsEl.innerHTML = "<p>⏳ Laden...</p>";
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
    card.innerHTML = `
      <img class="poster" src="${posterUrl(movie.poster_path)}" alt="${movie.title}">
      <h3>${movie.title}</h3>
      <p>📅 ${movie.release_date ?? "Onbekend"}</p>
      <p>⭐ ${movie.vote_average ?? "-"}</p>
    `;
    resultsEl.appendChild(card);
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
    // simpele validatie: leeg → toon trending opnieuw
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

window.addEventListener("load", loadTrending);
formEl.addEventListener("submit", handleSearch);