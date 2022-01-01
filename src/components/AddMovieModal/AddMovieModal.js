import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import './AddMovieModal.css';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormSelection from '../FormSelection/FormSelection';
import { useCreateMovieMutation } from '../../services/manager';
//import { Snackbar } from '@mui/material';

const inputStyle = {
    width: '350px',
    margin: '10px'
};

const dates = [
    "2021-01-01",
    "2021-01-02",
    "2021-01-03",
    "2021-01-04",
    "2021-01-05",
    "2021-01-06"
];

const times = [
    "13:00",
    "14:30",
    "16:00",
    "18:00",
    "21:30",
    "00:00"
];

const screeing_rooms = [
    "VIP",
    "IMAX"
];


const AddMovieModal = (props) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageLink, setImageLink] = useState('');
    const [datesSelected, setDatesSelected] = useState([]);
    const [timeSlotsSelected, setTimeSlotsSelected] = useState([]);
    const [roomsSelected, setRoomsSelected] = useState([]);
    const [startTimeSelected, setStartTimeSelected] = useState('');
    const [snackBarOpen, setSnackBarOpen] = useState(false);

    const [createMovie] = useCreateMovieMutation();


    const handleTitleChange = (e) => setTitle(e.target.value);
    const handleDescChange = (e) => setDescription(e.target.value);
    const handleImageLinkChange = (e) => setImageLink(e.target.value);
    const handleDatesChange = (e) => {
        setDatesSelected(typeof e.target.value === 'string' ? e.target.value.split(",") : e.target.value);
    }
    const handleTimeSlotsChange = (e) => {
        setTimeSlotsSelected(typeof e.target.value === 'string' ? e.target.value.split(",") : e.target.value);
    }
    const handleRoomsChange = (e) => {
        setRoomsSelected(typeof e.target.value === 'string' ? e.target.value.split(",") : e.target.value)
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
        props.handleClose();

    }

    const handleCreateMovie = (e) => {

        
        if (title && description && imageLink) {
            createMovie({
                title: title,
                poster_image: imageLink,
                description: description
            }).then(res => {
                console.log("[CreateMovie]::response: ", res);
                console.log(res.error.originalStatus);
                if (res.error.originalStatus == 200) {
                    // success
                    props.refetchMovies();
                    handleCancel();
                }
            })    
        }
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
                    <h2 className="modal-title">Add New Movie</h2>
                </div>
                {/* <div className="modal-body">{props.children}</div> */}
                <div className="modal-body">

                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>

                    </Typography>
                    <div className="inputs">
                        <TextField 
                            required
                            style={inputStyle}
                            value={title}
                            onChange={(e) => handleTitleChange(e)}
                            label="Title"
                            color="primary" 
                            //focused 
                        />
                        <TextField 
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
                        />

                    </div>
                    

                        <FormSelection
                            label="Rooms"
                            valsSelected={roomsSelected}
                            handleSelectedChange={handleRoomsChange}
                            input_array={screeing_rooms}
                        />

                        <FormSelection
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
                        />
                               
                    
                </div>
                <div className="modal-footer">
                    <Button variant="outlined" className="create__btn" onClick={(e) => handleCreateMovie(e)}>
                            Create Movie
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




export default AddMovieModal;
