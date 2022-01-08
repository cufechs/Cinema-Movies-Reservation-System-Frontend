import React, { useState, useEffect } from 'react';
import classes from './IMAXCinema.module.scss';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';

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
initialSeats = Array.from(Array(20)).map((e, i) => i);
// for (let i = 0; i < initialSeats.length; i++) initialSeats[i]=0;
// initialSeats[5] = 1;
// initialSeats[13] = 1;

const IMAXCinema = (props) => {
    const userType = useSelector(state => state.user.role);
    const [seats, setSeats] = useState(props.seats.seats);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [reservedSeats, setReservedSeats] = useState([]);
    const [alertOpen, setAlertOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        let seatsIndices = seats.map((e, i) => e === 1 ? i : '').filter(String);
        console.log(seatsIndices)
        setReservedSeats(seatsIndices);
        
    }, [props.seats.seats]);

    const handleAlertClose = () => setAlertOpen(false);
    const handleGotoLogin = () => navigate("/login");

    const handleChairClick = (seatIndex) => {

        if (userType == "guest") {
            setAlertOpen(true);
            return;
        }

        let newSeats = [...seats];
        let newSelectedSeats = [...selectedSeats];
        if (!(reservedSeats.includes(seatIndex))) {
            if (selectedSeats.includes(seatIndex)) {
                // already selected, then unselect this seat
                newSeats[seatIndex] = 0;
                // remove from selectedSeats
                newSelectedSeats.splice(newSelectedSeats.indexOf(seatIndex), 1); 
            } else {
                newSeats[seatIndex] = 1;
                newSelectedSeats.push(seatIndex);
            }

            
        }
        setSeats(newSeats);
        setSelectedSeats(newSelectedSeats);
        props.setSelectedSeats(newSelectedSeats.map(elem => elem+1));
        console.log("seats: ",seats);
        
    }

    useEffect(() => {
        console.log("selectedSeats: ", selectedSeats);
    }, [selectedSeats]);

    return (
        <>
        <div className={classes.container}>
        <div className={classes.cinema__room}>
            {props.capacity === 30 ? "IMAX Cinema" : "VIP Cinema"} 
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

        <Dialog
            open={alertOpen}
            onClose={handleAlertClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
            {"Looks like you are not signed in"}
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Would you like to login or signup?
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleAlertClose}>Stay Here</Button>
            <Button onClick={handleGotoLogin} autoFocus>
                Go to Login
            </Button>
            </DialogActions>
        </Dialog>

        </>
    )
}

export default IMAXCinema;
