import React, { useState, useEffect } from 'react';
import classes from './IMAXCinema.module.scss';

// get the first 20 letters from the alphabet (capitalized)
const rows = Array.from(Array(6)).map((e, i) => i + 65)
                .map((x) => String.fromCharCode(x))
                .slice(0, 20);
// columns from 1 to 30
const cols = Array.from(Array(5)).map((e, i) => i + 1)
// 2D array of seat positions objects
let initialSeats = [];
rows.map((row, i) => {
    let obj = [];
    cols.map((col, j) => {
        obj.push({
            seatNumber: row + col,
            selected: false,
            location: [i, j]
        })
    })
    initialSeats.push(obj);
})

//console.log(initialSeats);
// 30 seats
initialSeats = Array.from(Array(30)).map((e, i) => i);
for (let i = 0; i < initialSeats.length; i++) initialSeats[i]=false;
initialSeats[5] = true;
initialSeats[13] = true;

const IMAXCinema = () => {
    const [seats, setSeats] = useState(initialSeats);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [reservedSeats, setReservedSeats] = useState([]);

    useEffect(() => {
        let seatsIndices = initialSeats.map((e, i) => e === true ? i : '').filter(String);
        setReservedSeats(seatsIndices);
        
    }, []);

    const handleChairClick = (seatIndex) => {

        let newSeats = [...seats];
        let newSelectedSeats = [...selectedSeats];
        if (!(reservedSeats.includes(seatIndex))) {
            if (selectedSeats.includes(seatIndex)) {
                // already selected, then unselect this seat
                newSeats[seatIndex] = false;
                // remove from selectedSeats
                newSelectedSeats.splice(newSelectedSeats.indexOf(seatIndex), 1); 
            } else {
                newSeats[seatIndex] = true;
                newSelectedSeats.push(seatIndex);
            }

            
        }
        setSeats(newSeats);
        setSelectedSeats(newSelectedSeats);
    }

    return (
        <div className={classes.container}>
        <div className={classes.cinema__room}>
            IMAX Cinema 
            <div className={`${classes.screen} ${classes.screen__image}`}></div> 
            <div className={classes.seats}>
                {seats.map((seat, index) => {
                    let seatReserved = reservedSeats.includes(index);
                    return (
                        <div 
                            key={index}
                            className={`${seatReserved ? classes.occupied : seat ? classes.selected : classes.seat}`}
                            onClick={() => handleChairClick(index)}
                        ></div>
                        
                    )
                })}
            </div>
        </div>
        </div>
    )
}

export default IMAXCinema;
