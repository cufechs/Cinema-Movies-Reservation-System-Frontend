import React from 'react';
import { NavLink } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const GuestHeader = () => {
    return (
        <Stack spacing={2} direction="row">
            <NavLink to="/login">
                <Button variant="outlined" style={{color: 'white'}}>LOGIN</Button>
            </NavLink>
            <NavLink to="/signup">
                <Button variant="outlined" style={{color: 'white'}}>SIGN UP</Button>
            </NavLink>
        </Stack>
    )
}

export default GuestHeader;
