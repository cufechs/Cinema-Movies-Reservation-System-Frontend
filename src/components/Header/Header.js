import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import './Header.css';
import { useSelector } from 'react-redux';
import GuestHeader from './GuestHeader/GuestHeader';
import CustomerHeader from './CustomerHeader/CustomerHeader';
import ManagementHeader from './ManagementHeader/ManagementHeader';

const LOGO_SRC = "https://egy.voxcinemas.com/assets/images/logo-dark-288x92.png";
//const LOGO_SRC = "https://png.pngtree.com/png-clipart/20210404/original/pngtree-blue-movie-film-cartoon-pop-movie-sticker-png-image_6187694.jpg";

const Header = () => {
    const userType = useSelector(state => state.user.type);
    console.log("userType: ",userType);
    let header = null;

    if (userType == "siteadmin" || userType == "manager") {
        header = <ManagementHeader />
    } else if (userType == "customer") {
        header = <CustomerHeader />
    } else { // Guest
        header = <GuestHeader />
    }

    return (
        <div className="header">
            <NavLink to="/" style={{textDecoration: 'none'}}>
                <div className="site__logo">
                    <img  src={LOGO_SRC} />
                    Cinema Movies Reservation
                </div>
            </NavLink>
            {header}
        </div>
    )
}

export default Header;
