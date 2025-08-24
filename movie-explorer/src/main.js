import { getTrending, posterUrl } from "./api.js";

const resultsEl = document.getElementById("results");

async function loadTrending() {
  try {
    resultsEl.innerHTML = "<p>⏳ Laden...</p>";
    const data = await getTrending();
    resultsEl.innerHTML = ""; // leegmaken

    data.results.forEach(movie => {
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
  } catch (err) {
    resultsEl.innerHTML = `<p>⚠️ Fout bij laden: ${err.message}</p>`;
  }
}

// Start bij laden van de pagina
window.addEventListener("load", loadTrending);
