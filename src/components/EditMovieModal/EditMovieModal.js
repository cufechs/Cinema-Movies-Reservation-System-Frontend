import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import './EditMovieModal.css';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { useEditMovieMutation } from '../../services/manager';

const inputStyle = {
    width: '350px',
    margin: '10px'
};




const EditMovieModal = (props) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageLink, setImageLink] = useState('');
    

    const [editMovie] = useEditMovieMutation();

    const handleTitleChange = (e) => setTitle(e.target.value);
    const handleDescChange = (e) => setDescription(e.target.value);
    const handleImageLinkChange = (e) => setImageLink(e.target.value);

    const closeModalOnEscapeKeyDown = (e) => {
        if ((e.charCode || e.keyCode) === 27) props.handleClose();
    }
    
    const handleCancel = () => {
        setTitle('');
        setDescription('');
        setImageLink('');
        props.handleClose();

    }

    const handleEditMovie = (e) => {
        if (title && description && imageLink) {
            console.log("editing: ", {
                title: title,
                poster_image: imageLink,
                description: description
            });
            let movie = {
                id: props.currentSelectedMovie.id,
                title: title,
                poster_image: imageLink,
                description: description
            }
            editMovie(movie).then(res => {
                if (res.error.originalStatus === 200) {
                    // success
                    props.refetchMovies();
                    handleCancel();
                    props.handleEditMovieSuccess();
                } else {
                    handleCancel();
                    props.handleEditMovieError();
                }
            })    
        }
    }

    useEffect(() => {
        setTitle(props.currentSelectedMovie.title);
        setDescription(props.currentSelectedMovie.description);
        setImageLink(props.currentSelectedMovie.poster_image);
    }, [props])

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
                    <h2 className="modal-title">Edit Movie</h2>
                </div>
                {/* <div className="modal-body">{props.children}</div> */}
                <div className="modal-body">

                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>

                    </Typography>
                    <div className="inputs">
                        <TextField 
                            required
                            style={inputStyle}
                            value={title ? title : props.currentSelectedMovie.title}
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
                    
                </div>
                <div className="modal-footer">
                    <Button variant="outlined" className="create__btn" onClick={(e) => handleEditMovie(e)}>
                            Edit Movie
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




export default EditMovieModal;
