# 🎬 Movie Explorer – Advanced Web Project

## 📌 Project Description

Movie Explorer is an interactive single-page web application built with HTML, CSS and JavaScript.
The application uses the TMDb API and allows users to discover, search, filter, sort, and save movies to their personal favorites list.

Objective: A user-friendly, visually appealing application that demonstrates modern JavaScript techniques and meets the requirements of the Advanced Web Re-exam course.

---

## ⚡ Features

* 🔎 **Search** for movies by title
* 🎯 **Filter** by genre, release year, popularity
* ↕️ **Sort** (e.g., by title, release date, rating)
* ❤️ **Save favorites** to LocalStorage (retained between sessions)
* 🎨 **Theme switcher** (light/dark)
* 📱 **Responsive design** with CSS Grid/Flexbox
* 🖼️ Movies displayed in **cards** with poster, title, release date, rating, and more details

---

## 🛠️ Technical requirements (applied in this project)

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
* JavaScript (MDN) Documentation
* Advanced Web Course Materials
* AI Help (including this chat log)

---
