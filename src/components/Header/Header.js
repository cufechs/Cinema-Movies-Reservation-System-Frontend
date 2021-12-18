import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import './Header.css';

const Header = () => {
    // TODO: check if user is logged in, conditional rendering on login signup div

    return (
        <div className="header">
            <NavLink to="/">
                <div className="site__logo">
                    Cinema Movies Reservation
                </div>
            </NavLink>
            <Stack spacing={2} direction="row">
                <NavLink to="/login">
                    <Button variant="outlined" style={{color: 'white'}}>LOGIN</Button>
                </NavLink>
                <NavLink to="/signup">
                    <Button variant="outlined" style={{color: 'white'}}>SIGN UP</Button>
                </NavLink>
            </Stack>
        </div>
    )
}

export default Header;
