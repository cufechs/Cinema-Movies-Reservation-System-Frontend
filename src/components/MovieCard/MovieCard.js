import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MovieCard.css'

const img1 = "https://media.istockphoto.com/vectors/movie-time-vector-illustration-cinema-poster-concept-on-red-round-vector-id911590226?k=20&m=911590226&s=612x612&w=0&h=HlJtSKF-fLsKFy1QJ-EVnxXkktBKNS-3jUQPXsSasYs=";

const MovieCard = (props) => {
    const [movie, setMovie] = useState();
    
    

    return (
        <div className="card">
            <div className="card__image">
                <img src={img1} />
            </div>
            <div className="card_description">
                <p>{props.title}</p>
            </div>
        </div>
    )
}

export default MovieCard;
