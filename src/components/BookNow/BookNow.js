import React from 'react';
import CinemaRoom from '../CinemaRoom/CinemaRoom';
import Reservation from '../Reservation/Reservation';
import { useGetMovieReservationQuery } from '../../services/movies';

const BookNow = (props) => {
    const { data, error, isLoading, isFetching, isSuccess } = useGetMovieReservationQuery({id: props.movieID}, {skip: false});
    console.log("data: ", data)
    return (
        <div>
            Book seats
            <Reservation movieID={props.movieID} reservationData={data}/>
        </div>
    )
}

export default BookNow
