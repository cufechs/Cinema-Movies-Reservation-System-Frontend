import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import './AddMovieModal.css';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '0px solid #000',
  boxShadow: 50,
  p: 4,
};

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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

const AddMovieModal = (props) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageLink, setImageLink] = useState('');
    const [datesSelected, setDatesSelected] = useState([]);

    const handleTitleChange = (e) => setTitle(e.target.value);
    const handleDescChange = (e) => setDescription(e.target.value);
    const handleImageLinkChange = (e) => setImageLink(e.target.value);
    const handleDatesChange = (e) => {
        setDatesSelected(typeof e.target.value === 'string' ? e.target.value.split(",") : e.target.value);
    }

  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <h2 id="parent-modal-title">Add New Movie</h2>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>

          </Typography>
          <div className="inputs">
            <TextField 
                style={inputStyle}
                value={title}
                onChange={(e) => handleTitleChange(e)}
                label="Title"
                color="primary" 
                //focused 
            />
            <TextField 
                style={inputStyle}
                value={description}
                onChange={(e) => handleDescChange(e)}
                label="Description"
                color="primary" 
                 
            />
            <TextField 
                style={inputStyle}
                value={imageLink}
                onChange={(e) => handleImageLinkChange(e)}
                label="Poster Link"
                color="primary" 
                 
            />
          </div>
          
          <FormControl sx={{ m: 1, width: 350 }}>
            <InputLabel id="demo-multiple-checkbox-label">Dates</InputLabel>
            <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={datesSelected}
            onChange={handleDatesChange}
            input={<OutlinedInput label="Dates" />}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
            >
            {dates.map((date) => (
                <MenuItem key={date} value={date}>
                <Checkbox checked={datesSelected.indexOf(date) > -1} />
                <ListItemText primary={date} />
                </MenuItem>
            ))}
            </Select>
        </FormControl>
        </Box>
        
      </Modal>

    </div>
  );
}




export default AddMovieModal;