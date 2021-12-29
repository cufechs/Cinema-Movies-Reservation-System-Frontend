import React, { useState, useEffect } from 'react';
import MovieCard from '../MovieCard/MovieCard';
import './MoviesList.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useGetAllMoviesQuery } from '../../services/movies';

// const movies = [{"name": "movie1", "id": 1}, {"name": "movie2", "id": 1},{"name": "movie1", "id": 1}, {"name": "movie2", "id": 1},
// {"name": "movie1", "id": 1}, {"name": "movie2", "id": 1}, {"name": "movie1", "id": 1}, {"name": "movie2", "id": 1},
// {"name": "movie1", "id": 1}, {"name": "movie2", "id": 1}, {"name": "movie1", "id": 1}, {"name": "movie2", "id": 1}];

function MoviesList() {
    const [movies, setMovies] = useState([]);
    const [skip, setSkip] = useState(false);
    const { data, error, isLoading, isFetching, isSuccess } = useGetAllMoviesQuery();
    console.log("movielist: ", data)
    // useEffect(() => {
    //     axios.get("http://localhost:3000/movies")
    //         .then(res => {
    //             console.log(res.data);
    //             setMovies(res.data);
    //         }).catch(err => {
    //             console.log(err);
    //         })
    // }, [])

    return (
        <div>
            <div className="movies__list">
                {/* {movies.map((movie, index) => (
                    <Link to={`/movies/${movie.id}`}>
                        <MovieCard title={movie.title} />
                    </Link>
                ))} */}
                {isSuccess && data?.movies.map(movie => (
                    <Link to={`/movies/${movie.id}`}>
                        <MovieCard 
                            key={movie.id} 
                            id={movie.id} 
                            title={movie.title} 
                            description={movie.description}
                            src={movie.poster_image}
                        />
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default MoviesList
