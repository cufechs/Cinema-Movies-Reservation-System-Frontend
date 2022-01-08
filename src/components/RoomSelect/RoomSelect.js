import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const RoomSelect = (props) => {
    const [hall, setHall] = useState('');

    useEffect(() => {
        setHall(props.selectedHall);
    }, [props.selectedHall])

    const handleChange = (event) => {
        setHall(event.target.value);
        props.setSelectedHall(event.target.value);
      };

    return (
        <div>
            <h4 style={{color: "black"}}>Select Room</h4>
            <Box sx={{ minWidth: 120 }}>
            <FormControl style={{minWidth: 320}}>
                <InputLabel id="demo-simple-select-label">Cinema Hall</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={hall}
                label="Cinema Hall"
                onChange={handleChange}
                
                >
                {props.rooms && props.rooms.map(room => (
                    <MenuItem value={room} key={room}>{room===30 ? "IMAX" : "VIP"}</MenuItem>
                ))}
                
                </Select>
            </FormControl>
            </Box>
        </div>
    )
}

export default RoomSelect;
