import React, { useState } from 'react';
import './CinemaRoom.css';

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

const CinemaRoom = () => {
    const [seats, setSeats] = useState(initialSeats);

    const handleChairClick = (seat) => {
        let newSeat = {
            ...seat,
            selected: !seat.selected
        }

        let newSeats = [...seats];
        newSeats[seat.location[0]][seat.location[1]] = newSeat;
        setSeats(newSeats);
    }

    return (
        <div className="cinema__room">
            Cinema room
            <span className="screen screen__image"></span> 
            {/* <span className="label">Screen</span> */}
            <div className="seats">
                {seats.map((row, i) => (
                    <div className="row">
                        <div className="rowName">
                            {rows[i]}
                        </div>
                        {row.map((col, j) => (
                            <div className={`${'cell'} ${col.selected ? 'selected' : ''}`} onClick={() => handleChairClick(col)} >
                                {col.seatNumber}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CinemaRoom;
