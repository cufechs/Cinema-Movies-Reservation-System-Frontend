import React from 'react';
import './ReservationSummary.css';

const ReservationSummary = (props) => {
    return (
        <div className="reservation__summary">
            <h2>Your Reservation:</h2>
            <p>Cinema Hall: {props.cinemaHall}</p>
            <p>Screen Start Time: {props.screenTime}</p>
            <p>Seat(s): {props.seats}</p>
            <p className="total__amount">Total: {props.price} L.E</p>
        </div>
    )
}

export default ReservationSummary;
