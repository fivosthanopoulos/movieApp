import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getMovieDetails } from "../services/api";
import { useMovieContext } from "../contexts/MovieContext";
import "../css/MovieDetails.css"; // Create this file for styling


function MovieDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();

    useEffect(() => {
        const loadDetails = async () => {
            try {
                const data = await getMovieDetails(id);
                setMovie(data);
            } catch (err) {
                setError("Failed to load movie details.");
            } finally {
                setLoading(false);
            }
        };
        loadDetails();
    }, [id]);

    if (loading) return <div className="loading">Loading movie details...</div>;
    if (error) return <div className="error-message">{error}</div>;

    const favorite = isFavorite(movie.id);

    return (
        <div className="movie-details-container">
           
            <div className="movie-details-content">
                <img 
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                    alt={movie.title} 
                    className="details-poster"
                />
                <div className="details-info">
                    <h1>{movie.title}</h1>
                    <p className="meta">
                        <span>📅 {movie.release_date?.split("-")[0]}</span>
                        <span>⭐ {movie.vote_average?.toFixed(1)} / 10</span>
                    </p>
                    <div className="genres">
                        {movie.genres?.map(g => <span key={g.id} className="genre-tag">{g.name}</span>)}
                    </div>
                    <h3>Overview</h3>
                    <p className="overview">{movie.overview}</p>
                    <button 
                        className={`fav-toggle-btn ${favorite ? "active" : ""}`}
                        onClick={() => favorite ? removeFromFavorites(movie.id) : addToFavorites(movie)}
                    >
                        {favorite ? "❤️ Remove from Favorites" : "🤍 Add to Favorites"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MovieDetails;