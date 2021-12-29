import React, { useState, useEffect } from 'react';
import './DateSelect.css';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const DateSelect = (props) => {
    const [date, setDate] = useState('');

    useEffect(() => {
        setDate(props.selectedDate);
    }, [props.selectedDate])

    const handleChange = (event) => {
        setDate(event.target.value);
        props.setSelectedDate(event.target.value);
      };

    return (
        <div className="date__select">
            <h4 style={{color: 'black', marginBottom: '15px'}}>Select Date</h4>
            <Box sx={{ minWidth: 120 }}>
            <FormControl style={{minWidth: 320}}>
                <InputLabel id="demo-simple-select-label">Choose Date</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={date}
                label="Choos date"
                onChange={handleChange}
                >
                {props.dates && props.dates.length > 0 && props.dates.map((date, index) => (
                    <MenuItem value={`${date}`} key={index}>{date}</MenuItem>
                ))}
                </Select>
            </FormControl>
            </Box>
        </div>
    )
}

export default DateSelect;
