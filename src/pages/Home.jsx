import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';


const Home = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    // const [error, setError] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [query, setQuery] = useState('');
    const [year, setYear] = useState('');
    const [searching, setSearching] = useState(false);

    useEffect(() => {
        const fetchPopular = async () => {
            try {
                const { data } = await API.get('/movies/popular');  
                setMovies(data || []);
            } catch (error) {
                toast.error(error.response?.data?.message || 'Failed to load popular movies');

            } finally {
                setLoading(false);
            }
        };

        fetchPopular();
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query.trim()) return;

        setSearching(true);

        const searchPromise = API.get('/movies/search', { params: { title: query, year } });

        toast.promise(searchPromise, {
            loading: 'Searching movies...',
            success: 'Movies loaded successfully!',
            error: 'Search failed',
        });

        try {
            const { data } = await searchPromise;
            setSearchResults(data || []);
        } catch {
            toast.error('Search failed');
        } finally {
            setSearching(false);
        }
    };

    const renderMovies = (movieList) => (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {movieList.map((movie) => (
                <div key={movie.id} className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-all">
                    <Link to={`/movie/${movie.id}`}>
                        <img
                            src={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`}
                            alt={movie.title}
                            className="w-full h-auto"
                        />
                        <div className="p-2">
                            <h4 className="font-semibold text-lg truncate">{movie.title}</h4>
                            {movie.release_date && <p className="text-sm text-gray-500">{movie.release_date}</p>}
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );

    return (
        <>
            <div className="max-w-6xl mx-auto px-4 py-4">
                <div className="max-w-6xl mx-auto px-4 py-4">
                    <div className="flex flex-wrap items-center gap-2 mb-[20px]">
                        <input
                            type="text"
                            placeholder="Search by Title"
                            className="flex-1 min-w-[100px] border border-gray-300 rounded px-3 py-2"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder="Year (optional)"
                            className="flex-1 min-w-[80px] border border-gray-300 rounded px-3 py-2"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                        />
                        <button
                            onClick={handleSearch}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                        >
                            Search
                        </button>
                    </div>

                    {searching && <p className="text-blue-500">Searching...</p>}


                    {searchResults.length > 0 ? (
                        <>
                            <h3 className="text-xl font-semibold mb-4">Search Results</h3>
                            {renderMovies(searchResults)}
                        </>
                    ) : (
                        <>
                            <h3 className="text-xl font-semibold mb-4">Popular Movies</h3>
                            {loading ? <p>Loading...</p> : renderMovies(movies)}
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default Home;




