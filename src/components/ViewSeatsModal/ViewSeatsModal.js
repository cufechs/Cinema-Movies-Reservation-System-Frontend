import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { useEditMovieReservationMutation } from '../../services/manager';
import FormSelection from '../FormSelection/FormSelection';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { useGetMovieReservationsQuery } from '../../services/manager';
import { useSnackbar } from 'notistack';
import ViewCinema from '../ViewCinema/ViewCinema';


const inputStyle = {
    width: '350px',
    margin: '10px'
};




const ViewSeatsModal = (props) => {
    const { enqueueSnackbar } = useSnackbar();
    const [seats, setSeats] = useState([]);

    const handleClickVariant = (variant, msg) => {
        // variant could be success, error, warning, info, or default
        enqueueSnackbar(msg, { variant });
    };
    //console.log("seatyyyys: ", JSON.parse(props.currentSelectedReservation.vacant_reserved_seats).seats)
    console.log("View Seats modal props.currentSelectedReservation: ",props.currentSelectedReservation)
    console.log("View Seats modal seats: ", props.currentSelectedReservation.vacant_reserved_seats)

    const closeModalOnEscapeKeyDown = (e) => {
        if ((e.charCode || e.keyCode) === 27) props.handleClose();
    }
    
    const handleCancel = () => {
        props.handleClose();

    }

    // const handleEditMovieReservation = (e) => {
        
    //     let reservation = {
    //         id: props.currentSelectedReservation.id,
    //         capacity: roomSelected,
    //         price: price,
    //         date: startTimeSelected.split("T")[0],
    //         start_time: startTimeSelected.replace(/\s/g, 'T'),
    //         end_time: endTimeSelected.replace(/\s/g, 'T')
    //     }
    //     //console.log("reservation: ", reservation);
    //     //console.log("********************* date only: ", startTimeSelected.split("T")[0])
    //     editMovieReservation(reservation).then(res => {
    //         console.log("res: ", res)
    //         if (res.data && res.data.status === true) {
    //             console.log(res?.data.status)
    //             // success
    //             props.refetch();
    //             handleCancel();
    //             //props.handleEditMovieSuccess();
    //             handleClickVariant('success', 'reservation edited successfully!');
    //         } else {
    //             handleCancel();
    //             //props.handleEditMovieError();
    //             handleClickVariant('error', 'error editing reservation!');
    //         }
    //         // if (res.error.data.status === false) {
    //         //     handleCancel();
    //         //     props.handleEditMovieError();
    //         //     handleClickVariant('error', 'error editing reservation!');
    //         // }
    //     })  
        
    // }

    useEffect(() => {
        if (props.currentSelectedReservation.vacant_reserved_seats) {
            setSeats(JSON.parse(props.currentSelectedReservation.vacant_reserved_seats).seats)
        }
    }, [props.seats])

    // close using escape key
    useEffect(() => {
        document.body.addEventListener("keydown", closeModalOnEscapeKeyDown);
        return function cleanup() {
          document.body.removeEventListener("keydown", closeModalOnEscapeKeyDown);
        };
      }, []);

    return ReactDOM.createPortal(
        <CSSTransition
            in={props.open}
            unmountOnExit
            timeout={{ enter: 0, exit: 300 }}
        >
            <div className="modal" onClick={props.handleClose}>
                <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2 className="modal-title">Vacant-Reserved Seats</h2>
                </div>
                {/* <div className="modal-body">{props.children}</div> */}
                <div className="modal-body">

                    <ViewCinema 
                        seats={ props.currentSelectedReservation.vacant_reserved_seats ? JSON.parse(props.currentSelectedReservation.vacant_reserved_seats) : []}
                    />
                    
                    
                </div>
                <div className="modal-footer">
                    <Button variant="outlined" className="create__btn" onClick={handleCancel} >
                            Ok
                    </Button>
                </div>
                </div>
            </div>
        </CSSTransition>,
        document.getElementById("root")
    )
}




export default ViewSeatsModal;
