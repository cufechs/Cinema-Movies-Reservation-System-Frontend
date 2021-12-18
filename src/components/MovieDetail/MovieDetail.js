import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetMovieQuery } from '../../services/movies';
import './MovieDetail.css';
import Button from '@mui/material/Button';
import BookNow from '../BookNow/BookNow';

const src = "https://media.istockphoto.com/photos/pop-corn-and-on-red-armchair-cinema-picture-id1271522601?b=1&k=20&m=1271522601&s=170667a&w=0&h=azZRRchShbrwRgq58omc1HOYABnfDDOzXJatuaZrueQ=";

const MovieDetail = (props) => {
    const { movieID } = useParams();
    console.log(movieID)
    const { data, error, isLoading, isFetching, isSuccess } = useGetMovieQuery({id: movieID}, {skip: false});
    const [isBookingPressed, setIsBookingPressed] = useState(false);

    const handleBooking = () => {
        setIsBookingPressed(state => !state);
    }

    return (
        <div className="movie">
        <div className="movie__detail">
            {isLoading && <div>Loading...(a spinner to be added here:))</div>}
            <div className="left">
                <p className="title">{data?.title}</p>
                <div className="description">
                    {data?.description}
                    <div className="booking__btn">
                        <Button variant="contained" onClick={handleBooking}>Book Now</Button>
                    </div>
                </div>
            </div>
            <div className="right">
                <img src={data?.src} alt="poster image"/>
            </div>
            
        </div>
        {isBookingPressed && 
            <div className="booking">
                <BookNow />
            </div>
            }
        </div>
    )
}

export default MovieDetail;

