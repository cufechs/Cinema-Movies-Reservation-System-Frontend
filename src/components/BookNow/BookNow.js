import React from 'react';
import Reservation from '../Reservation/Reservation';
import { useGetMovieReservationQuery } from '../../services/movies';

const BookNow = (props) => {
    const { data, error, isLoading, isFetching, isSuccess } = useGetMovieReservationQuery({id: props.movieID}, {skip: false});
    console.log("data: ", data)
    return (
        <div>
            Book your ticket now!
            <Reservation movieID={props.movieID} reservationData={data}/>
        </div>
    )
}

export default BookNow
