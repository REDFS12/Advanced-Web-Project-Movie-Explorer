# 🎬 Movie Explorer – Web Advanced Project (Dutch interface - can be altered)

## 📌 Project Description

Movie Explorer is an interactive single-page web application built with HTML, CSS and JavaScript.
The application uses the TMDb API and allows users to discover, search, filter, sort, and save movies to their personal favorites list.
This product uses the TMDb API but is not endorsed or certified by TMDb.

Objective: A user-friendly, visually appealing application that demonstrates modern JavaScript techniques and meets the requirements of the Web Advanced exam. This web application was built on a Mac device, my apologies if there is something not showing as intended on another type of device (I had no access to another device).

---

## ⚡ Features

* 🔎 **Search** for movies by title

(the Search, Filter and Sort functions are not connected to each other, to maintain clarity between functions)
* 🎯 **Filter** by genre, release year, popularity

(the Search, Filter and Sort functions are not connected to each other, to maintain clarity between functions)
* ↕️ **Sort** (e.g., by title, release date, rating)

(the Search, Filter and Sort functions are not connected to each other, to maintain clarity between functions)
* ❤️ **Save favorites** to LocalStorage (retained between sessions)
* 🎨 **Theme switcher** (light/dark)
* 📱 **Responsive design** with CSS Grid/Flexbox
* 🖼️ Movies displayed in **cards** with poster, title, release date, rating, and more details
* 📖 Detail modal: Click on a movie card to see additional information (overview, genres, runtime) in an overlay.

---

Each movie card shows the following information when clicked:
🎬 Title
📅 Release year or date
⭐ Rating
🎭 Genre(s)
🖼️ Poster
⏱️ Runtime
📜 Description of the movie

In fullscreen and depending on the width of the display, the list can show 6 movies and more next to each other and displays your favourites at the right.
On a mobile-device or on a small-width display, the application will show at least 1 movie and always show your favourites list next to it.
The search bar and filter options are always available at the top.

---

## 🛠️ Technical requirements (applied in this project, more in detail with references to the code below)

* **DOM manipulation (select, update, events)**
* **Modern JavaScript**
* **Data & API**
* **Storage & Validation**
* **Styling & Layout**
* **Tooling & Structure**
* Project set up with **Vite**

---

## 📂 Folder Structure

```
project-root(movie-explorer)/
│
├── node_modules
│ └── ...
│
├── src/
│ └── styles/
│  └── style.css
│ ├── api.js
│ ├── counter.js
│ ├── main.js
│ ├── storage.js
│ 
├── .env.local
├── .gitignore
├── index.html
├── package-lock.json
├── package.json
│
└── README.md
```

---

## 🚀 Installation & Usage
A Mac device, Node.js (v22.18.0 (LTS)) and Vite were used to develop and test this web-application.

1. Clone this repository
```
git clone https://github.com/REDFS12/Advanced-Web-Project-Movie-Explorer.git
```
2. Go to folder
```
cd movie-explorer
```
3. Install dependencies
```
npm install
```
4. Create a new file in the project root
```
.env.local
```
5. Get & Add API key (description below)
## 🔑 API Key

This application uses the [TMDb API](https://developer.themoviedb.org/).
To make the app work, you need a free **API key**:

5.1 Create an account on [TMDb](https://www.themoviedb.org/).
5.2 Request an API key through your account.
5.3 Add this key to `.env.local`. (This was hidden by a .gitignore request. to upload to Github): 
```
VITE_TMDB_API_KEY=add_your_key_here
```

6. Start the development server

```
npm run dev
```
7. Open the app in your browser using the link Vite displays.

---

## 📸 Screenshots

Main Dashboard in Dark Mode
<img width="3564" height="2574" alt="Screenshot 2025-08-24 at 23 39 38" src="https://github.com/user-attachments/assets/1649a590-c3b5-4735-a856-2cdd2e750b07" />

Main Dashboard in Light Mode
<img width="3564" height="2574" alt="Screenshot 2025-08-24 at 23 39 43" src="https://github.com/user-attachments/assets/bcfb1148-d9cc-45e6-8c6a-0ce3a0bc1bcf" />

Favorites
<img width="3564" height="2574" alt="Screenshot 2025-08-24 at 23 39 54" src="https://github.com/user-attachments/assets/9373ecf5-8f14-4618-9d38-334aff5a22ca" />

Search
<img width="3564" height="2574" alt="Screenshot 2025-08-24 at 23 40 21" src="https://github.com/user-attachments/assets/034b754e-6a78-4a9e-b008-52bf802a7062" />

Movie card with details and 6 movies next to each other in the background
<img width="1920" height="1200" alt="Screenshot 2025-08-25 at 18 29 13" src="https://github.com/user-attachments/assets/2198aa06-8a67-45e7-98ba-71294f130660" />

Small width
<img width="686" height="1149" alt="Screenshot 2025-08-25 at 18 40 29" src="https://github.com/user-attachments/assets/a9d48b13-5c67-4128-84cc-de388cf26f37" />


Selection Options


<img width="154" height="456" alt="Screenshot 2025-08-24 at 23 40 37" src="https://github.com/user-attachments/assets/1ecc7313-f3c5-4fc8-901c-6fccb2897903" />
<img width="256" height="2068" alt="Screenshot 2025-08-25 at 11 11 59" src="https://github.com/user-attachments/assets/ee0d77de-84a8-4192-ae15-4c96eea5385b" />
<img width="142" height="216" alt="Screenshot 2025-08-25 at 11 12 04" src="https://github.com/user-attachments/assets/8b11c9af-a4d6-4bb1-a7cd-a99968d43517" />


Search with Selection Criteria
<img width="3564" height="2574" alt="Screenshot 2025-08-24 at 23 41 09" src="https://github.com/user-attachments/assets/2f818ce5-8962-42b8-9e38-16b475562d69" />

---

## 📖 Resources

* [TMDb API](https://developer.themoviedb.org/)
* Web Advanced Course Materials
* 2 very kind brothers-in-law, who have a PhD and a diploma in AI Computer Sciences.

---

⚙️ Technical Requirements:

This project applies the requirements of the Web Advanced course. Below is an overview with references to the code:

🔹 DOM Manipulation
* Selecting elements: retrieving from search form and results container (src/main.js, rule 6: const resultsEl = document.getElementById("results");).
* Manipulating elements: dynamically adding movie cards. (src/main.js, rule 54-73: function appendList(movies = []) {
  if (!movies.length) return;)
* Event linking: submit event on search form. (src/main.js, rule 409: formEl.addEventListener("submit", handleSearch);)
* Event delegation: a single listener on #results captures clicks on cards and opens the modal. (src/main.js, +- rule 366: resultsEl.addEventListener("click", async (e) => {)

🔹 Modern JavaScript
* Const & Let: used for variables and constants. (src/api.js, rule 6-29)
* Template literals: for HTML card structure. (src/main.js, rule 44: li.innerHTML = `)
* Array methods: map, filter, sort, forEach for filtering/sorting. (src/main.js, rule 56: movies.forEach(movie => {)
* Arrow functions: compact callbacks and event handlers. (src/main.js, rule 42: favorites.forEach(f => {)
* Ternary operator: show fallback poster. (src/api.js, rule 59: const pressed = isFav(favorites, movie.id) ? "true" : "false";)

🔹 Functions
* Callback functions: used in forEach for rendering. (src/main.js, rule 42: favorites.forEach(f => {)
* * Default parameters: in API functions (e.g., default language nl-NL). (src/api.js, rule 6: function params(extra = {}) {)
* Truthy/Falsy & Nullish coalescing: fallback values ​​for missing data. (src/main.js, rule 65-66: <p>📅${movie.release_date ?? "Onbekend"}</p>)
)

🔹 Async JavaScript
* Promises / Async & Await: retrieving data with fetch. (src/main.js, rule 114, rule 128-132 & src/api.js, rule 16)
* Error handling: try/catch during API calls. (src/main.js, in loadPage, +- rule 60)
* Loading indicator: visible during await. (src/main.js, +- rule 31: function showLoading() {resultsEl.innerHTML = "<p>⏳ Laden...</p>";)

🔹 Data & API
* Fetch: retrieving TMDb data. (src/api.js, rule 17: async function getJson(url) {const res = await fetch(url);)
* JSON manipulation: processing & displaying API responses. (src/api.js, rule 53: function appendList(movies = []) {if (!movies.length) return;)
* Fallback UI: missing posters → placeholder image. (src/api.js, rule 30: export function posterUrl(path) {
  return path ? `${IMG_BASE}${path}` : ...)

🔹 Browser Features
* LocalStorage: Save favorites and theme. (src/main.js, rule 276 & 282: const saved = localStorage.getItem(THEME_KEY);)
* Form validation: Search field. (src/main.js, rule 221: async function handleSearch(e) {e.preventDefault();) ...
* Observer API: Infinite scroll (lazy loading) via IntersectionObserver. (src/main.js, rule 286: const io = new IntersectionObserver((entries) => {)
* Responsive design: Grid for cards, Flexbox for search bar. (src/styles/style.css rule 66, 88, 155)

main {
  display: grid;
  grid-template-columns: 2fr 1fr; /* content + sidebar */
    grid-template-areas: 
    "results aside";
  gap: 1rem;
  padding: 1rem;
}
/* ========== Resultaten grid ========== */
#results {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1rem;
}
/* ========== Responsive ========== */
@media (max-width: 960px) {
  main { grid-template-columns: 1fr; }
  aside { position: static; }
}

🔹 Styling & UX
* CSS Grid: Layout of film cards. (src/styles/style.css)
* Flexbox: Navigation bar and filters. (src/styles/style.css, .search-bar, .filters)
* Dark/Light theme: Toggle button. (src/main.js rule 265-281 + src/styles/style.css rule 161-171)
* Icons & buttons: Favorites buttons, Delete buttons. (src/main.js, rule 67 & in index.html <button class="btn--fav">❤️</button>)
* UX-feedback: Hover effects and cursor pointer on cards for clear interaction. (src/styles/style.css rule 36, 49, 255)
* Accessibility: Aria labels on buttons, modal with Aria-Modal, and close action via Escape key. (index.html rule 48, 57-59) & (src/main.js, rule 47, 72, 87, 89, 93, 182, 199, ...)

🔹 Tooling & Structure
* Project set up with Vite. (folder structure)
* Neat folder structure: src/ with separate JS and CSS files. (folder structure)

## ⏭️ Next Steps
🔹 Components folder (for larger projects): If you want to add more JS files, you can consider creating a components/ folder in src/ for reusable UI components.

🔹 Assets folder: If you use more images, fonts, or other assets, you can create an assets/ folder in src/ or public/ .
