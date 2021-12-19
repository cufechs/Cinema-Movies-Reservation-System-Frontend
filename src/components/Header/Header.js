import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import './Header.css';
import { useSelector } from 'react-redux';
import GuestHeader from './GuestHeader/GuestHeader';
import CustomerHeader from './CustomerHeader/CustomerHeader';
import ManagementHeader from './ManagementHeader/ManagementHeader';

const Header = () => {
    const userType = useSelector(state => state.user.type);
    console.log("userType: ",userType);
    let header = null;

    if (userType == "SiteAdmin" || userType == "Manager") {
        header = <ManagementHeader />
    } else if (userType == "Customer") {
        header = <CustomerHeader />
    } else { // Guest
        header = <GuestHeader />
    }

    return (
        <div className="header">
            <NavLink to="/" style={{textDecoration: 'none'}}>
                <div className="site__logo">
                    <img  src="https://egy.voxcinemas.com/assets/images/logo-dark-288x92.png" />
                    Cinema Movies Reservation
                </div>
            </NavLink>
            {header}
        </div>
    )
}

export default Header;
