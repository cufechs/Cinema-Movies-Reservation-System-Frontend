import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';

const CustomerHeader = () => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        setAnchorEl(null);
        navigate("/login");
    }

    const handleReservations = () => {
        setAnchorEl(null);
        navigate("/my-reservations");
    }

    return (
        <Stack spacing={2} direction="row">
            {/* <NavLink to="/login">
                <Button variant="outlined" style={{color: 'white'}}>LOGOUT</Button>
            </NavLink> */}
            <Avatar 
                alt="Account" 
                aria-controls="basic-menu"
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            />
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleReservations}>My Reservations</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </Stack>
    )
}

export default CustomerHeader;
