const API_KEY = "da7fb03d8f8bed396ff80e3d04a55095";
const BASE_URL = " \\\\\\\ YOUR API KEY /////// ";

export const getPopularMovies = async (page = 1) => {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`);
    const data = await response.json();
    return data.results;
};

export const searchMovies = async (query, page = 1) => {
    const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`);
    const data = await response.json();
    return data.results;
};

export const discoverMovies = async (genreId, year, minRating, page = 1) => {
    let url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&page=${page}`;
    
    if (genreId) url += `&with_genres=${genreId}`;
    if (year) url += `&primary_release_year=${year}`;
    if (minRating) url += `&vote_average.gte=${minRating}`;

    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to discover movies");
    const data = await response.json();
    return data.results;
};

export const getMovieDetails = async (id) => {
    const response = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
    if (!response.ok) throw new Error("Failed to fetch details");
    return await response.json();
};