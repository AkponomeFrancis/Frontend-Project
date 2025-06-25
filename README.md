# 🎬 Movie App Frontend

This is the frontend for the full-stack Movie App built with React. It allows users to browse, search, and manage movies using TMDb data, along with user-specific features like favorites, watchlists, reviews, and personalized recommendations.

---

## 🌟 Features

- 🔐 User Registration and Login (JWT Auth)
- 🎥 Browse Popular Movies
- 🔎 Search Movies by Title and Year
- 📄 View Movie Details and Trailers
- ⭐ Add/Remove Favorites
- 👁 Add/Remove from Watchlist
- 📝 Add/Delete Reviews
- 🎯 Get Personalized Movie Recommendations
- 🙍‍♂️ View & Update User Profile

---

## 🛠 Tech Stack

- React
- Axios
- React Router DOM
- Tailwind CSS
- React Hot Toast
- TMDb API (via backend)
- JWT-based authentication

---

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Topsyfash/3mtt-project-FE.git
cd movie-app-frontend
```

### 2. Install Dependencies

```bash
npm install
```

---

### Run the App

```bash
npm run dev
```

## App will run at: http://localhost:5173

## Folder Structure

```pgsql
movie-app-frontend/
│
├── src/
│   ├── components/       # Reusable UI components
│   ├── pages/            # Page components like Home, Login, Register
│   ├── services/         # API wrapper (Axios instance)
│   ├── App.jsx           # Main app logic
│   ├── main.jsx          # App entry point
│   └── index.css         # Tailwind CSS styles
│
├
├── package.json
└── README.md
```

---

## Available Pages

- /register – Register a new account

- /login – Login and receive JWT

- / – Home page (popular + recommended movies)

- /movie/:id – View movie details

- /profile – View and manage profile

- /favorites – View and manage favorites

- /watchlist – View and manage watchlist

- /reviews – View and manage reviews

---

## Authentication

## JWT is stored in localStorage. Protected routes automatically attach the token in request headers.

## Customization

- To update styling, edit Tailwind classes in components.
- To update backend URL, edit api.js in services

---

## Testing the App

Use the provided backend or run your own. Make sure to:

    1.Register or login to get a JWT.

2.  Use features like adding to favorites, watchlist, etc.

    3.Visit the homepage to see personalized recommendations once favorites are added.

    ***


    ## Author

    Frontend built by Ayomide Fasogba – Contributions are welcome!
