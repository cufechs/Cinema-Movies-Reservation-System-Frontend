import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import './EditMovieReservationModal.css';
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

const inputStyle = {
    width: '350px',
    margin: '10px'
};




const EditMovieReservationModal = (props) => {
    const { enqueueSnackbar } = useSnackbar();
    const [roomSelected, setRoomSelected] = useState('');
    const [startTimeSelected, setStartTimeSelected] = useState('');
    const [endTimeSelected, setEndTimeSelected] = useState('');
    const [price, setPrice] = useState('');
    const [editMovieReservation] = useEditMovieReservationMutation();
    
    const handleClickVariant = (variant, msg) => {
        // variant could be success, error, warning, info, or default
        enqueueSnackbar(msg, { variant });
    };
    
    //console.log("seatyyyys: ", JSON.parse(props.currentSelectedReservation.vacant_reserved_seats).seats)
    const handleRoomChange = (e) => {
        setRoomSelected(e.target.value)
    }
    const handlePriceChange = (e) => {
        setPrice(e.target.value);
    }
    const handleStartTimeChange = (e) => {
        setStartTimeSelected(e.target.value);
    }
    const handleEndTimeChange = (e) => {
        setEndTimeSelected(e.target.value);
    }

    const closeModalOnEscapeKeyDown = (e) => {
        if ((e.charCode || e.keyCode) === 27) props.handleClose();
    }
    
    const handleCancel = () => {
        setRoomSelected('');
        setStartTimeSelected('');
        setEndTimeSelected('');
        setPrice('');
        props.handleClose();

    }

    const handleEditMovieReservation = (e) => {
        
        let reservation = {
            id: props.currentSelectedReservation.id,
            capacity: roomSelected,
            price: price,
            date: startTimeSelected.split("T")[0],
            start_time: startTimeSelected.replace(/\s/g, 'T'),
            end_time: endTimeSelected.replace(/\s/g, 'T')
        }
        //console.log("reservation: ", reservation);
        //console.log("********************* date only: ", startTimeSelected.split("T")[0])
        editMovieReservation(reservation).then(res => {
            console.log("res: ", res)
            if (res.data && res.data.status === true) {
                console.log(res?.data.status)
                // success
                props.refetch();
                handleCancel();
                //props.handleEditMovieSuccess();
                handleClickVariant('success', 'reservation edited successfully!');
            } else {
                handleCancel();
                //props.handleEditMovieError();
                handleClickVariant('error', 'error editing reservation!');
            }
            // if (res.error.data.status === false) {
            //     handleCancel();
            //     props.handleEditMovieError();
            //     handleClickVariant('error', 'error editing reservation!');
            // }
        })  
        // if (title && description && imageLink) {
        //     console.log("editing: ", {
        //         title: title,
        //         poster_image: imageLink,
        //         description: description
        //     });
        //     let movie = {
        //         id: props.currentSelectedMovie.id,
        //         title: title,
        //         poster_image: imageLink,
        //         description: description
        //     }
        //     editMovie(movie).then(res => {
        //         if (res.error.originalStatus === 200) {
        //             // success
        //             props.refetchMovies();
        //             handleCancel();
        //             props.handleEditMovieSuccess();
        //         } else {
        //             handleCancel();
        //             props.handleEditMovieError();
        //         }
        //     })    
        // }
    }

    useEffect(() => {
        setRoomSelected(props.currentSelectedReservation.capacity);
        setStartTimeSelected(props.currentSelectedReservation.start_time);
        setEndTimeSelected(props.currentSelectedReservation.end_time);
        setPrice(props.currentSelectedReservation.price);
    }, [props])

    // close using escape key
    useEffect(() => {
        document.body.addEventListener("keydown", closeModalOnEscapeKeyDown);
        return function cleanup() {
          document.body.removeEventListener("keydown", closeModalOnEscapeKeyDown);
        };
      }, []);

      console.log("startTimeSelected: ", startTimeSelected)
    return ReactDOM.createPortal(
        <CSSTransition
            in={props.open}
            unmountOnExit
            timeout={{ enter: 0, exit: 300 }}
        >
            <div className="modal" onClick={props.handleClose}>
                <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2 className="modal-title">Edit Movie Reservation</h2>
                </div>
                {/* <div className="modal-body">{props.children}</div> */}
                <div className="modal-body">

                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>

                    </Typography>
                    <div className="inputs">
                        <TextField
                            id="datetime-local"
                            label="Start Time"
                            type="datetime-local"
                            defaultValue="2017-05-24 09:30"
                            sx={{ width: 250 }}
                            InputLabelProps={{
                            shrink: true
                            }}
                            style={inputStyle}
                            value={startTimeSelected.replace(/\s/g, 'T')}
                            onChange={handleStartTimeChange}
                            required
                        />
                        <TextField
                            id="datetime-local"
                            label="End Time"
                            type="datetime-local"
                            defaultValue="2017-05-24T09:30"
                            sx={{ width: 250 }}
                            InputLabelProps={{
                            shrink: true
                            }}
                            style={inputStyle}
                            value={endTimeSelected.replace(/\s/g, 'T')}
                            onChange={handleEndTimeChange}
                            required
                        />
                        <TextField 
                            required
                            style={inputStyle}
                            value={price}
                            onChange={(e) => handlePriceChange(e)}
                            label="Price"
                            color="primary" 
                            //focused 
                        />
                        {/* <TextField 
                            required
                            style={inputStyle}
                            value={description}
                            onChange={(e) => handleDescChange(e)}
                            label="Description"
                            color="primary" 
                        />
                        <TextField 
                            required
                            style={inputStyle}
                            value={imageLink}
                            onChange={(e) => handleImageLinkChange(e)}
                            label="Poster Link"
                            color="primary" 
                        /> */}

                    </div>
                    <FormControl sx={{ m: 1, width: 350 }}>
                        <InputLabel id="demo-multiple-checkbox-label">Room</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={roomSelected}
                        label="Room"
                        onChange={handleRoomChange}
                        >
                        <MenuItem value={20}>20</MenuItem>
                        <MenuItem value={30}>30</MenuItem>
                        </Select>
                    </FormControl>

                        {/* <FormSelection
                            label="Dates"
                            valsSelected={datesSelected}
                            handleSelectedChange={handleDatesChange}
                            input_array={dates}
                        />

                        <FormSelection
                            label="Time"
                            valsSelected={timeSlotsSelected}
                            handleSelectedChange={handleTimeSlotsChange}
                            input_array={times}
                        /> */}
                </div>
                <div className="modal-footer">
                    <Button variant="outlined" className="create__btn" onClick={(e) => handleEditMovieReservation(e)}>
                            Edit Reservation
                    </Button>
                    <Button variant="outlined" onClick={handleCancel}>
                            Cancel
                    </Button>
                </div>
                </div>
            </div>
        </CSSTransition>,
        document.getElementById("root")
    )
}




export default EditMovieReservationModal;
