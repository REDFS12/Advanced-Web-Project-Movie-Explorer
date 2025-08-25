"use strict";

const KEY = "favorites_v1";

export function loadFavorites() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveFavorites(list) {
  localStorage.setItem(KEY, JSON.stringify(list));
}

export function isFav(favs, movieId) {
  return favs.some(f => f.id === movieId);
}

export function addFavorite(favs, movie) {
  if (isFav(favs, movie.id)) return favs;
  const next = [...favs, { id: movie.id, title: movie.title, poster_path: movie.poster_path }];
  saveFavorites(next);
  return next;
}

export function removeFavorite(favs, movieId) {
  const next = favs.filter(f => f.id !== movieId);
  saveFavorites(next);
  return next;
}
