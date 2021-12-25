import React from 'react';
import CinemaRoom from '../CinemaRoom/CinemaRoom';
import Reservation from '../Reservation/Reservation';

const BookNow = (props) => {
    return (
        <div>
            Book seats
            <Reservation movieID={props.movieID}/>
        </div>
    )
}

export default BookNow
