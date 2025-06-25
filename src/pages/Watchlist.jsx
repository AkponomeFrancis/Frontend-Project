import React, { useEffect, useState } from "react";
import API from '../services/api';
import { Link } from 'react-router-dom';
import toast from "react-hot-toast";

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    API.get('/watchlist')
      .then(({ data }) => setWatchlist(data || []))
      .catch(() => toast.error('Failed to fetch watchlist'));
  }, []);

  const handleDelete = async (id) => {
    try {
      await API.delete(`/watchlist/${id}`);
      setWatchlist((prev) => prev.filter((item) => item.id !== id));
      toast.success("Watchlist Deleted successfully")
    } catch {
      toast.error('Failed to delete from watchlist');
    }
  };

  return (
    <>
      <div className="max-w-6xl mx-auto p-4">
        <h2 className="text-2xl font-semibold mb-6">Your Watchlist</h2>
        {watchlist.length === 0 ? (
          <p className="text-gray-600">No movies in your watchlist yet.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {watchlist.map((item) => (
              <div
                key={item.id}
                className="w-44 bg-white rounded shadow hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between h-[400px]"
              >
                <Link to={`/movie/${item.id}`} className="flex-grow">
                  <img
                    src={`https://image.tmdb.org/t/p/w185/${item.poster_path}`}
                    alt={item.title}
                    className="w-full rounded-t h-64 object-cover"
                  />
                  <h4 className="text-sm font-medium p-2">{item.title}</h4>
                </Link>
                <button
                  onClick={() => handleDelete(item.id)}
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

export default Watchlist;
