import React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';


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

const FormSelection = (props) => {

    return (
        <FormControl sx={{ m: 1, width: 350 }}>
            <InputLabel id="demo-multiple-checkbox-label">{props.label}</InputLabel>
            <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={props.valsSelected}
            onChange={props.handleSelectedChange}
            input={<OutlinedInput label={props.label} />}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
            >
            {props.input_array.map((elem) => (
                <MenuItem key={elem} value={elem}>
                <Checkbox checked={props.valsSelected.indexOf(elem) > -1} />
                <ListItemText primary={elem} />
                </MenuItem>
            ))}
            </Select>
        </FormControl>
    );
}

export default FormSelection;