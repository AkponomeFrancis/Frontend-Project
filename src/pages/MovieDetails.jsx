import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../services/api';
import toast from 'react-hot-toast';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState('')
  const [trailer, setTrailer] = useState(null);


  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const { data } = await API.get(`/movies/${id}`);
        setMovie(data.movie || data);
      } catch {
        toast.error('Failed to load movie details');
      }
    };


    const fetchTrailer = async () => {
      try {
        const { data } = await API.get(`/movies/${id}/videos`);
        setTrailer(data [0]);
      } catch {
        console.log('Trailer not available');
      }
    };

    fetchMovie();
    fetchTrailer()
  }, [id]);

  const handleAdd = async (type) => {
    try {
      const body = { movieId: movie.id };
      if (type === 'reviews') {
        body.comment = reviewText;
        body.rating = rating;
      }

      await API.post(`/${type}`, body);

      toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} added successfully!`);

      if (type === 'reviews') {
        setReviewText('');
        setRating('');
      }
    } catch (error) {
      const message = error.response?.data?.message || `Failed to add to ${type}`;
      toast.error(message);
    }
  };

  if (!movie) return <p className="text-center mt-10 text-lg text-gray-600">Loading...</p>;

  return (
    <>
      <div className="max-w-4xl mx-auto px-4 py-8">
        
        <div className="flex flex-col md:flex-row gap-6">
          {movie.poster_path && (
            <img
              src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
              alt={movie.title}
              className="rounded shadow-md max-w-fit"
            />
          )}
          <div>
            <h2 className="text-3xl font-bold mb-2">{movie.title}</h2>
            {movie.release_date && (
              <p className="text-gray-500 mb-1">
                <strong>Release Date:</strong> {movie.release_date}
              </p>
            )}
            {movie.genre && (
              <p className="text-gray-500 mb-3">
                <strong>Genre:</strong> {movie.genre}
              </p>
            )}
            <p className="mb-4">{movie.overview || 'No description available.'}</p>

            <div className="flex gap-4 mb-4">
              <button
                onClick={() => handleAdd('favorites')}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
              >
                Add to Favorites
              </button>
              <button
                onClick={() => handleAdd('watchlist')}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
              >
                Add to Watchlist
              </button>
            </div>

            <div>
              <textarea
                rows="4"
                placeholder="Write a review..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                className="w-full p-3 border rounded mb-2 resize-none"
              />
              <input
                type="number"
                className='border rounded p-1 m-2'
                placeholder="Add Rating (1-5)"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              />
              <button
                onClick={() => handleAdd('reviews')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                Submit Review
              </button>
            </div>

           

          </div>
        </div>

         {trailer && trailer.site === 'YouTube' && (
              <div className="mt-10">
                <h3 className="text-xl font-semibold mb-2">Watch Trailer</h3>
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    title="Movie Trailer"
                    src={`https://www.youtube.com/embed/${trailer.key}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-[300px] md:h-[400px] rounded-lg shadow-md"
                  ></iframe>
                </div>
              </div>
            )}
      </div>
    </>
  );
};

export default MovieDetails;
