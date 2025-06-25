import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import Home from "./pages/Home";
import { AuthProvider } from "./context/AuthContext";
import MovieDetails from "./pages/MovieDetails";
import Favorites from "./pages/Favorites";
import Watchlist from "./pages/Watchlist";
import Reviews from "./pages/Reviews";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";
import Logout from "./pages/Logout";
import Navbar from "./components/Navbar/Navbar";
import { Toaster } from "react-hot-toast";
import useTokenCheck from "./hooks/useTokenCheck";

function App() {

  useTokenCheck()
  return (
    <AuthProvider>
      <Toaster position="top-right" toastOptions={{ duration: 2000 }}/>
      <Router>
        <Navbar/>
        <Routes>

          <Route path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            } />

          <Route path="/register"
            element={
              <Register />
            } />

          <Route path="/login"
            element={
              <Login />
            } />

          <Route path="/movie/:id"
            element={
              <MovieDetails />
            } />

          <Route path="/favorites"
            element={
              <PrivateRoute>
                <Favorites />
              </PrivateRoute>
            } />

          <Route path="/watchlist"
            element={
              <PrivateRoute>
                <Watchlist />
              </PrivateRoute>
            } />

          <Route path="/reviews"
            element={
              <PrivateRoute>
                <Reviews />
              </PrivateRoute>}

          />

          <Route path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            } />
          
          <Route path="/logout"
            element={
              <Logout />
            } />

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
