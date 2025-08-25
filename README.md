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

## 🛠️ Technical requirements (applied in this project, more in detail below)

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
A Mac device, Node.js (v22.18.0 (LTS)) and Vite were used to develop this web-application.

1. Clone this repository
```
git clone https://github.com/<your-username>/movie-explorer.git
cd movie-explorer
```
2. Install dependencies

npm install
```
3. Start the development server

```
npm run dev
```
4. Open the app in your browser using the link Vite displays.
```
---

## 🔑 API Key

This application uses the [TMDb API](https://developer.themoviedb.org/).
To make the app work, you need a free **API key**:

1. Create an account on [TMDb](https://www.themoviedb.org/).
2. Request an API key through your account.
3. Add this key to `api.js` in your fetch requests.

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
* Selecting elements: retrieving from search form and results container.
* Manipulating elements: dynamically adding movie cards in #results.
* Event linking: submit event on search form (main.js).
* Event delegation: a single listener on #results captures clicks on cards and opens the modal.

🔹 Modern JavaScript
* Const & Let: used for variables and constants.
* Template literals: for HTML card structure.
* Array methods: map, filter, sort, forEach for filtering/sorting.
* Arrow functions: compact callbacks and event handlers.
* Ternary operator: show fallback poster.

🔹 Functions
* Callback functions: used in forEach for rendering.
* * Default parameters: in API functions (e.g., default language nl-NL).
* Truthful/False & Nullish coalescing: fallback values ​​for missing data.

🔹 Async JavaScript
* Promises / Async & Await: retrieving data with fetch.
* Error handling: try/catch during API calls.
* Loading indicator: visible during await.

🔹 Data & API
* Fetch: retrieving TMDb data.
* JSON manipulation: processing & displaying API responses. 
* Fallback UI: missing posters → placeholder image.

🔹 Browser Features
* LocalStorage: Save favorites and theme.
* Form validation: Search field.
* Observer API: Infinite scroll (lazy loading) via IntersectionObserver.
* Responsive design: Grid for cards, Flexbox for search bar.

🔹 Styling & UX
* CSS Grid: Layout of film cards.
* Flexbox: Navigation bar and filters.
* Dark/Light theme: Toggle button.
* Icons & buttons: Favorites buttons, Delete buttons.
* UX-feedback: Hover effects and cursor pointer on cards for clear interaction.
* Accessibility: Aria labels on buttons, modal with Aria-Modal, and close action via Escape key.

🔹 Tooling & Structure
* Project set up with Vite.
* Neat folder structure: src/ with separate JS and CSS files.
