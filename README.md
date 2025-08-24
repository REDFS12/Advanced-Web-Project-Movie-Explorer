# 🎬 Movie Explorer – Advanced Web Project

## 📌 Project Description

Movie Explorer is an interactive single-page web application built with HTML, CSS and JavaScript.
The application uses the TMDb API and allows users to discover, search, filter, sort, and save movies to their personal favorites list.

Objective: A user-friendly, visually appealing application that demonstrates modern JavaScript techniques and meets the requirements of the Advanced Web Re-exam course. This web application was built on a Mac-device, my apologies if there is something not showing as intended on another type of device.

---

## ⚡ Features

* 🔎 **Search** for movies by title
* 🎯 **Filter** by genre, release year, popularity
* ↕️ **Sort** (e.g., by title, release date, rating)
* ❤️ **Save favorites** to LocalStorage (retained between sessions)
* 🎨 **Theme switcher** (light/dark)
* 📱 **Responsive design** with CSS Grid/Flexbox
* 🖼️ Movies displayed in **cards** with poster, title, release date, rating, and more details
* 📖 Detail modal: Click on a movie card to see additional information (overview, genres, runtime) in an overlay.

---

## 🛠️ Technical requirements (applied in this project, more in detail below)

* **DOM manipulation** (select, update, events)
* **Modern JavaScript**:

* `const` & `let`
* Template literals
* Array Iteration (`map`, `filter`, `forEach`)
* Arrow functions
* Ternary operator
* Callback functions
* Promises & Async/Await
* Observer API (e.g., infinite scroll or lazy loading)
* **Data & API**:

* `fetch()` for TMDb data
* Processing and displaying JSON
* **Storage & Validation**:

* LocalStorage for favorites and theme
* Form validation for search field
* **Styling & Layout**:

* CSS Grid / Flexbox
* Theme toggle (light/dark)
* Intuitive UI (search field, buttons, icons)
* **Tooling & Structure**:

* Project set up with **Vite**
* Separate HTML, CSS, and JS files
* Neatly structured folder structure

---

## 📂 Folder Structure

```
project-root/
│
├── index.html
├── vite.config.js
├── package.json
│
├── src/
│ ├── main.js
│ ├── api.js
│ ├── ui.js
│ ├── storage.js
│ └── styles/
│ └── style.css
│
└── dist/
```

---

## 🚀 Installation & Usage

1. Clone this repository

```bash
git clone https://github.com/<your-username>/movie-explorer.git
cd movie-explorer
```
2. Install dependencies

```bash
npm install
```
3. Start the development server

```bash
npm run dev
```
4. Open the app in your browser using the link Vite displays (usually `http://localhost:5173`).

---

## 🔑 API Key

This application uses the [TMDb API](https://developer.themoviedb.org/).
To make the app work, you need a free **API key**:

1. Create an account on [TMDb](https://www.themoviedb.org/).
2. Request an API key through your account.
3. Add this key to `api.js` in your fetch requests.

---

## 📸 Screenshots

*(Add screenshots of the application here)*

---

## 📖 Resources

* [TMDb API](https://developer.themoviedb.org/)
* Advanced Web Course Materials
* 2 brothers-in-law, who have a PhD and a diploma in AI Computer Sciences

---

⚙️ Technical Requirements
This project applies the requirements of the Advanced Web course. Below is an overview with references to the code:
🔹 DOM Manipulation
* Selecting elements: retrieving from search form and results container.
* Manipulating elements: dynamically adding movie cards in #results.
* Event linking: submit event on search form (main.js).
* Event delegation: a single listener on #results captures clicks on cards and opens the modal.
🔹 Modern JavaScript
* Const & Let: used for variables and constants (api.js, main.js).
* Template literals: for HTML card structure (ui.js).
* Array methods: map, filter, sort, forEach for filtering/sorting.
* Arrow functions: compact callbacks and event handlers (ui.js).
* Ternary operator: show fallback poster (ui.js).
🔹 Functions
* Callback functions: used in forEach for rendering. * Default parameters: in API functions (e.g., default language nl-NL).
* Truthful/False & Nullish coalescing: fallback values ​​for missing data.
🔹 Async JavaScript
* Promises / Async & Await: retrieving data with fetch (api.js).
* Error handling: try/catch during API calls (api.js).
* Loading indicator: visible during await (ui.js).
🔹 Data & API
* Fetch: retrieving TMDb data (api.js).
* JSON manipulation: processing API responses (api.js). 
* Fallback UI: missing posters → placeholder image.
🔹 Browser Features
* LocalStorage: Save favorites and theme (storage.js).
* Form validation: Search field required (main.js).
* Observer API: Infinite scroll via IntersectionObserver (main.js).
* Responsive design: Grid for cards, Flexbox for search bar (style.css).
🔹 Styling & UX
* CSS Grid: Layout of film cards (style.css).
* Flexbox: Navigation bar and filters (style.css).
* Dark/Light theme: Toggle button (main.js, style.css).
* Icons & buttons: Favorites buttons, Delete buttons (ui.js).
* UX-feedback: Hover effects and cursor pointer on cards for clear interaction.
* Accessibility: Aria labels on buttons, modal with Aria-Modal, and close action via Escape key.
🔹 Tooling & Structure
* Vite: Project created with Vite (see package.json).
* Module splitting: api.js, ui.js, storage.js, main.js. * Neat folder structure: src/ with separate JS and CSS files.