import MovieCard from "../components/moviecard"
import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { searchMovies, getPopularMovies, discoverMovies } from "../services/api"
import "../css/Home.css"

const genres = [
    { id: "", name: "All Genres" },
    { id: 28, name: "Action" },
    { id: 12, name: "Adventure" },
    { id: 16, name: "Animation" },
    { id: 35, name: "Comedy" },
    { id: 80, name: "Crime" },
    { id: 99, name: "Documentary" },
    { id: 18, name: "Drama" },
    { id: 14, name: "Fantasy" },
    { id: 27, name: "Horror" },
    { id: 878,name: "Sci-Fi" },
    { id: 53, name: "Thriller" }, 
    { id: 9648, name: "Mystery" },
    { id: 37,  name: "Western"}
];

function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);

    const [selectedGenre, setSelectedGenre] = useState("");
    const [selectedYear, setSelectedYear] = useState("");
    const [minRating, setMinRating] = useState("");
    const [page, setPage] = useState(1);

    const location = useLocation();

    useEffect(() => {
        setSearchQuery("");
        setSelectedGenre("");
        setSelectedYear("");
        setMinRating("");
        setPage(1);
    }, [location.pathname, location.search, location.key]);

    useEffect(() => {
        setPage(1);
    }, [selectedGenre, selectedYear, minRating]);

    useEffect(() => {
        const fetchMoviesData = async () => {
            if (page === 1) setLoading(true);
            else setLoadingMore(true);
            
            setError(null);
            try {
                let data = [];
                if (selectedGenre || selectedYear || minRating) {
                    data = await discoverMovies(selectedGenre, selectedYear, minRating, page);
                } else if (searchQuery.trim()) {
                    data = await searchMovies(searchQuery, page);
                } else {
                    data = await getPopularMovies(page);
                }

                setMovies(prev => page === 1 ? data : [...prev, ...data]);
            } catch (err) {
                console.error(err);
                setError("Failed to fetch movies records...");
            } finally {
                setLoading(false);
                setLoadingMore(false);
            }
        };

        fetchMoviesData();
   
    }, [selectedGenre, selectedYear, minRating, page, searchQuery]); 

    const handleSearch = (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;
        
        setSelectedGenre("");
        setSelectedYear("");
        setMinRating("");
        setPage(1); 
    };

    const handleLoadMore = () => {
        setPage(prevPage => prevPage + 1);
    };

    return (
        <div className="home">
            <form onSubmit={handleSearch} className="search-form">
                <input type="text" placeholder="Search for movies by name..."
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="search-button">Search</button>
            </form>

            <div className="filters-container">
                <select className="filter-select" value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)}>
                    {genres.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
                </select>

                <select className="filter-select" value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
                    <option value="">All Years</option>
                    {(() => {
                        const currentYear = new Date().getFullYear();
                        const earliestYear = 1920;
                        const totalYears = currentYear - earliestYear + 1;
                        
                        return Array.from({ length: totalYears }, (_, i) => currentYear - i).map(year => (
                            <option key={year} value={year.toString()}>{year}</option>
                        ));
                    })()}
                </select>

                <select className="filter-select" value={minRating} onChange={(e) => setMinRating(e.target.value)}>
                    <option value="">All Ratings</option>
                    <option value="8">⭐ 8+ Excellent</option>
                    <option value="7">⭐ 7+ Good</option>
                    <option value="5">⭐ 5+ Average</option>
                </select>
            </div>

            {error && <div className="error-message">{error}</div>}

            {loading ? (
                <div className="loading">Loading movies...</div>
            ) : (
                <>
                    <div className="movies-grid">
                        {movies && movies.length > 0 ? (
                            movies.map((movie, index) => (
                                <MovieCard movie={movie} key={`${movie.id}-${index}`} />
                            ))
                        ) : (
                            <div className="no-results-container" style={{ textAlign: 'center', gridColumn: '1/-1', padding: '2rem' }}>
                                <p className="no-results">No movies found matching these criteria.</p>
                            </div>
                        )}
                    </div>

                    {movies && movies.length > 0 && (
                        <div className="load-more-container" style={{ display: 'flex', justifyContent: 'center', margin: '2rem 0' }}>
                            <button 
                                className="search-button" 
                                onClick={handleLoadMore} 
                                disabled={loadingMore}
                                style={{ padding: '0.75rem 2.5rem' }}
                            >
                                {loadingMore ? "Loading More..." : "Load More"}
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default Home;