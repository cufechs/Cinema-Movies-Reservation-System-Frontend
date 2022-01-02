import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import './AddReservationModal.css';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormSelection from '../FormSelection/FormSelection';
import { useAddMovieReservationMutation } from '../../services/manager';
import { Snackbar } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const inputStyle = {
    width: '350px',
    margin: '10px'
};




const AddReservationModal = (props) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageLink, setImageLink] = useState('');
    const [datesSelected, setDatesSelected] = useState([]);
    const [timeSlotsSelected, setTimeSlotsSelected] = useState([]);
    const [roomsSelected, setRoomsSelected] = useState([]);
    const [startTimeSelected, setStartTimeSelected] = useState((new Date()).toISOString());
    const [endTimeSelected, setEndTimeSelected] = useState((new Date()).toISOString());
    const [capacity, setCapacity] = useState('');
    const [price, setPrice] = useState('');

    const [addMovieReservation] = useAddMovieReservationMutation();


    const handleTitleChange = (e) => setTitle(e.target.value);
    const handleDescChange = (e) => setDescription(e.target.value);
    const handleImageLinkChange = (e) => setImageLink(e.target.value);

    const handleStartTimeChange = (e) => {
        setStartTimeSelected(e.target.value);
    }
    const handleEndTimeChange = (e) => {
        setEndTimeSelected(e.target.value);
    }
    const handleCapacityChange = (e) => {
        setCapacity(e.target.value);
    }
    const handlePriceChange = (e) => {
        setPrice(e.target.value);
    }

    const closeModalOnEscapeKeyDown = (e) => {
        if ((e.charCode || e.keyCode) === 27) props.handleClose();
    }
    
    const handleCancel = () => {
        setTitle('');
        setDescription('');
        setImageLink('');
        setDatesSelected([]);
        setTimeSlotsSelected([]);
        setRoomsSelected([]);
        setStartTimeSelected('');
        setEndTimeSelected('');
        setCapacity('');
        setPrice('');
        props.handleClose();

    }

    const handleCreateReservation = (e) => {

        let reservation = {
            date: startTimeSelected,
            movie_id: props.movieID,
            start_time: startTimeSelected,
            end_time: endTimeSelected,
            capacity: capacity,
            price: parseInt(price)
        }
        addMovieReservation(reservation)
            .then(res => {
                if (res.data && res.data.status === true) {
                    props.refetch();
                    handleCancel();
                    props.handleCreateMovieSuccess();
                } else {
                    handleCancel();
                    props.handleCreateMovieError();
                }
            })
        
        
    }

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
                    <h2 className="modal-title">Add New Reservation</h2>
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
                            defaultValue="2017-05-24T09:30"
                            sx={{ width: 250 }}
                            InputLabelProps={{
                            shrink: true
                            }}
                            style={inputStyle}
                            value={startTimeSelected}
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
                            value={endTimeSelected}
                            onChange={handleEndTimeChange}
                            required
                        />
                        <FormControl sx={{ m: 1, width: 350 }}>
                            <InputLabel id="demo-multiple-checkbox-label">Capacity</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={capacity}
                            label="capacity"
                            onChange={handleCapacityChange}
                            >
                            <MenuItem value={20}>20</MenuItem>
                            <MenuItem value={30}>30</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField 
                            required
                            style={inputStyle}
                            value={price}
                            onChange={(e) => handlePriceChange(e)}
                            label="Price"
                            color="primary" 
                        />

                    </div>
                    
                </div>
                <div className="modal-footer">
                    <Button variant="outlined" className="create__btn" onClick={(e) => handleCreateReservation(e)}>
                            Create Reservation
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




export default AddReservationModal;
