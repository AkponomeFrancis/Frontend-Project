import React, { useEffect, useState } from "react";
import API from '../services/api';
import { Link } from 'react-router-dom';
import toast from "react-hot-toast";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    API.get('/reviews')
      .then(({ data }) => setReviews(data.reviews || []))
      .catch(() => toast.error('Failed to fetch reviews'));
  }, []);
    
  const handleDelete = async (movieId) => {
    try {
      await API.delete(`/reviews/${movieId}`);
      setReviews((prev) => prev.filter((r) => r.movieId !== movieId));
      toast.success("Review Deleted successfully")
    } catch {
      toast.error('Failed to delete review');
    }
  };

  return (
    <>
      <div className="max-w-4xl mx-auto p-4">
        <h2 className="text-2xl font-semibold mb-6">Your Reviews</h2>

        {reviews.length === 0 ? (
          <p className="text-gray-600">No reviews yet.</p>
        ) : (
          <div className="space-y-6">
            {reviews.map((r) => (
              <div 
                key={r.id} 
                className="p-4 border rounded shadow-sm hover:shadow-md transition-shadow duration-300 bg-white"
              >
                <Link to={`/movie/${r.movieId}`}>
                  <h4 className="text-xl font-semibold text-blue-600 hover:underline mb-2">
                    {r.title || 'Movie'}
                  </h4>
                </Link>
                <p className="mb-2 text-gray-800">{r.comment}</p>
                {r.rating !== undefined && (
                  <p className="mb-4 font-semibold">Rating: {r.rating}</p>
                )}
                <button
                  onClick={() => handleDelete(r.movieId)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded focus:outline-none"
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

export default Reviews;
