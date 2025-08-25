"use strict";

import { getTrending, searchMovies, posterUrl, getGenres, discoverMovies, getMovieDetails } from "./api.js";
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
const modalEl      = document.getElementById("modal");
const modalBodyEl  = document.getElementById("modalBody");
const modalCloseEl = document.getElementById("modalClose");
/* Infinite scroll state */
let mode = "trending";   /* 'trending' | 'search' */
let query = "";          /* actieve zoekterm */
let page = 1;            /* huidige pagina */
let totalPages = 1;      /* totaal aantal pagina's uit TMDb */
let loading = false;     /* voorkomt dubbele loads */

let filtGenre = "";
let filtYear  = "";
let filtSort  = "popularity.desc";

let favorites = loadFavorites(); /* in-memory kopie */

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

  /* Events op nieuwe ❤️ knoppen */
  resultsEl.querySelectorAll(".btn--fav").forEach(btn => {
    if (btn._wired) return; /* niet dubbel binden */
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
    } else if (mode === "search") {
      data = await searchMovies(query, page);
    } else if (mode === "discover") {
      data = await discoverMovies({
        page,
        with_genres: filtGenre,
        primary_release_year: filtYear,
        sort_by: filtSort
      });
    } else {
      throw new Error("Onbekende mode: " + mode);
    }
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

  /* Klik op ❤️ knoppen */
  resultsEl.querySelectorAll(".btn--fav").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = Number(btn.dataset.id);
      const movieCard = btn.closest(".card");
      const title = btn.dataset.title;
      const img = movieCard.querySelector(".poster").getAttribute("src");
      const poster_path = btn.dataset.posterPath || null;
      /* ^ kleine fallback: als er geen echte TMDb poster is, null bewaren */

      if (btn.getAttribute("aria-pressed") === "true") {
        /* verwijderen */
        favorites = removeFavorite(favorites, id);
        btn.setAttribute("aria-pressed", "false");
        btn.textContent = "❤️ Favoriet";
      } else {
        /* toevoegen */
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
  await loadPage(true); /* reset en laad pagina 1 */
}

async function handleSearch(e) {
  e.preventDefault();
  const q = inputEl.value.trim();

  /* Als leeg → terug naar trending */
  if (!q) {
    mode = "trending";
    query = "";
    await loadPage(true);
    return;
  }

  /* Bij echte zoekopdracht: naar search-mode */
  mode = "search";
  query = q;

  genreSel.value = "";
  yearSel.value  = "";
  sortSel.value  = "popularity.desc";
  filtGenre = "";
  filtYear  = "";
  filtSort  = "popularity.desc";

  await loadPage(true); /* reset lijst en laad pagina 1 met zoekresultaten */
}


function wireFavRemovalFromSidebar() {
  favListEl.addEventListener("click", (e) => {
    const btn = e.target.closest(".fav-remove");
    if (!btn) return;
    const id = Number(btn.dataset.id);
    favorites = removeFavorite(favorites, id);
    renderFavorites();
    /* update knoppen in cards zodat state klopt */
    resultsEl.querySelectorAll(".btn--fav").forEach(b => {
      if (Number(b.dataset.id) === id) {
        b.setAttribute("aria-pressed", "false");
        b.textContent = "❤️ Favoriet";
      }
    });
  });
}

const THEME_KEY = "theme_v1"; /* 'light' | 'dark' | null */

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
    if (!entry.isIntersecting) return; /* niet in beeld */
    if (page <= totalPages && !loading) {
      loadPage(false);                   /* volgende pagina en append */
    }
  },
  {
    root: null,            /* viewport */
    rootMargin: "200px 0px", /* vroegtijdig laden (200px vóór het einde) */
    threshold: 0
  }
);

/* Start observeren */
io.observe(sentinelEl);

function populateGenres() {
  if (!genreSel) return;
  getGenres()
    .then(data => {
      genreSel.innerHTML =
        `<option value="">Alle genres</option>` +
        (data.genres || []).map(g => `<option value="${g.id}">${g.name}</option>`).join("");
    })
    .catch(e => {
      genreSel.innerHTML = `<option value="">(genres niet geladen)</option>`;
      console.error("Fout bij laden van genres:", e);
    });
}


function populateYears(from = 2025, to = 1950) {
  const items = ['<option value="">Alle jaren</option>'];
  for (let y = from; y >= to; y--) {
    items.push(`<option value="${y}">${y}</option>`);
  }
  yearSel.innerHTML = items.join("");
}

function openModal() {
  modalEl.classList.remove("hidden");
  modalEl.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden"; /* scroll lock */
}
function closeModal() {
  modalEl.classList.add("hidden");
  modalEl.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  modalBodyEl.innerHTML = ""; /* opruimen */
}

function renderDetails(movie) {
  const {
    title,
    poster_path,
    release_date,
    runtime,
    vote_average,
    genres = [],
    overview
  } = movie;

  modalBodyEl.innerHTML = `
    <img class="poster" src="${posterUrl(poster_path)}" alt="${title}">
    <div class="modal-meta">
      <h2 id="modalTitle">${title}</h2>
      <div class="badges">
        ${release_date ? `<span class="badge">📅 ${release_date}</span>` : ""}
        ${Number.isFinite(runtime) ? `<span class="badge">⏱️ ${runtime} min</span>` : ""}
        ${vote_average ? `<span class="badge">⭐ ${vote_average.toFixed(1)}</span>` : ""}
      </div>
      ${genres.length ? `<div class="badges">${genres.map(g=>`<span class="badge">${g.name}</span>`).join("")}</div>` : ""}
      ${overview ? `<p class="modal-overview">${overview}</p>` : `<p class="modal-overview"><em>Geen beschrijving beschikbaar.</em></p>`}
    </div>
  `;
}

/* Open detail bij klik op card (maar niet op de fav-knop) */
resultsEl.addEventListener("click", async (e) => {
  const favBtn = e.target.closest(".btn--fav");
  if (favBtn) return; /* klik was op hartje: negeren */

  const card = e.target.closest(".card");
  if (!card) return;

  /* Haal het movie-id uit de aanwezige fav-knop (die zit in elke card) */
  const btn = card.querySelector(".btn--fav");
  if (!btn) return;
  const id = Number(btn.dataset.id);
  if (!id) return;

  try {
    modalBodyEl.innerHTML = "<p class='modal-overview'>⏳ Details laden…</p>";
    openModal();
    const details = await getMovieDetails(id);
    renderDetails(details);
  } catch (err) {
    modalBodyEl.innerHTML = `<p class='modal-overview'>⚠️ Kon details niet laden: ${err.message}</p>`;
    console.error(err);
  }
});

modalCloseEl.addEventListener("click", closeModal);
modalEl.addEventListener("click", (e) => {
  if (e.target === modalEl) closeModal(); /* klik op de donkere overlay */
});
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modalEl.classList.contains("hidden")) {
    closeModal();
  }
});


window.addEventListener("load", () => {
  loadTheme?.();
  renderFavorites();
  populateGenres();
  populateYears();
  loadTrending();
  wireFavRemovalFromSidebar?.();
});
formEl.addEventListener("submit", handleSearch);
themeBtn.addEventListener("click", toggleTheme); /* wissel licht/donker */

function handleFiltersChange() {
  filtGenre = genreSel.value;
  filtYear  = yearSel.value;
  filtSort  = sortSel.value || "popularity.desc";
  mode = "discover";
  query = "";
  loadPage(true);
}

genreSel?.addEventListener("change", handleFiltersChange);
yearSel?.addEventListener("change", handleFiltersChange);
sortSel?.addEventListener("change", handleFiltersChange);