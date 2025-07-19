# 🎬 Movie Watchlist

A **React** app that lets you browse, search, and save your favorite movies from [The Movie Database (TMDB)](https://www.themoviedb.org/). Features include:

- 🔥 **Infinite scroll** through popular movies
- 🔍 **Debounced search** across the TMDB popular movies catalog
- ⭐️ **Add / Remove** movies to your personal watchlist
- 📦 Built with **Create React App** and **TypeScript**
- ⚙️ Configurable via environment variables

---

## 🚀 Live Demo

> https://movies-watch-list-lime.vercel.app/

---

## 📂 Project Structure
```bash
moviesWatchlist/
├── public/
│ └── index.html
├── src/
│ ├── components/
│ │ ├── Card.tsx
│ │ ├── Header.tsx
│ │ └── SearchBar.tsx
│ ├── hooks/
│ │ └── useDebounced.ts
│ ├── App.tsx
│ ├── index.tsx
│ └── react-app-env.d.ts
├── .env.local
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🔧 Features

- **Fetch Popular Movies**  
  Uses TMDB’s `/3/movie/popular` endpoint, with API key in a Bearer header.
- **Search Movies**  
  Debounced client‐side search calling TMDB’s `/3/search/movie` endpoint.
- **Infinite Scroll**  
  Automatically loads more pages as you scroll near the bottom.
- **Watchlist**  
  Click the “+” button on any movie card to add it to your watchlist; click again to remove.  
  ✔️ Cards show a checkmark when in your watchlist.
- **TypeScript**  
  Fully typed components and hooks for maximum safety and DX.
- **Environment Variables**  
  Keeps your TMDB API key out of source control.

---

## 📦 Installation

1. **Clone this repo**  
   ```bash
   git clone https://github.com/your-username/moviesWatchlist.git
   cd moviesWatchlist
2. **Install dependencies**
   ```bash
   npm install
3. **Create your TMDB .env.local**
   Create a file at the project root called .env.local with:
   ```bash
   REACT_APP_TMDB_API_KEY=<your TMDB v4 Read Access Token>
5. **Run in development**
   ```bash
   npm start
7. **Build for production**
   ```bash
   npm run build

---

## 🛠️ Usage
- Browse Popular
The home screen loads page 1 of popular movies. Scroll down to load more.

- Search
Type in the search bar; results will show after a 500 ms debounce.

- Toggle Watchlist
Click the “+” button on any card to add it to your watchlist. It turns into a “✔” when added.
