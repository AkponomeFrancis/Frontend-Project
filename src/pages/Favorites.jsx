import React, { useEffect, useState } from "react";
import API from '../services/api';
import { Link } from 'react-router-dom';
import toast from "react-hot-toast";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  const fetchFavorites = async () => {
    try {
      const { data } = await API.get('/favorites');
      setFavorites(data || []);
    } catch {
      toast.error('Failed to fetch favorites');
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const handleDelete = async (id) => {
    try {
      await API.delete(`/favorites/${id}`);
      setFavorites((prev) => prev.filter((item) => item.id !== id));
      toast.success("Favorite Deleted successfully")
    } catch {
      toast.error('Failed to delete favorite');
    }
  };

  return (
    <>
      <div className="max-w-6xl mx-auto p-4 sm:px-6 lg:px-8 py-4">
        <h2 className="text-2xl font-semibold mb-6">Your Favorite Movies</h2>
        {favorites.length === 0 ? (
          <p className="text-gray-600">No favorite movies found.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {favorites.map((fav) => (
              <div
                key={fav.id}
                className="w-44 bg-white rounded shadow hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between h-[400px]"
              >
                <Link to={`/movie/${fav.id}`} className="flex-grow">
                  <img
                    src={`https://image.tmdb.org/t/p/w185/${fav.poster_path}`}
                    alt={fav.title}
                    className="w-full rounded-t h-64 object-cover"
                  />
                  <h4 className="text-sm font-medium p-2">{fav.title}</h4>
                </Link>
                <button
                  onClick={() => handleDelete(fav.id)}
                  className="bg-red-600 hover:bg-red-700 text-white py-2 rounded-b"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Favorites;
