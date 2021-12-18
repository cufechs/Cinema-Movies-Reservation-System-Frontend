import React from 'react';
import { NavLink } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const CustomerHeader = () => {
    return (
        <Stack spacing={2} direction="row">
            <NavLink to="/login">
                <Button variant="outlined" style={{color: 'white'}}>LOGOUT</Button>
            </NavLink>
        </Stack>
    )
}

export default CustomerHeader;
