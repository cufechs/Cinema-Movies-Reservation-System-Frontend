import React, { useState, useEffect, useRef } from 'react';
import classes from './Header_v2.module.scss';
import { useSelector } from 'react-redux';
import GuestHeader from '../Header/GuestHeader/GuestHeader';
import CustomerHeader from '../Header/CustomerHeader/CustomerHeader';
import ManagementHeader from '../Header/ManagementHeader/ManagementHeader';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userActions } from '../../store/userSlice';

const LOGO_SRC = "https://egy.voxcinemas.com/assets/images/logo-dark-288x92.png";

const Header_v2 = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const headerRef = useRef(null);
    const userType = useSelector(state => state.user.type);
    const isLoggedIn = useSelector(state => state.user.isLoggedIn);
    
    console.log("userType: ",userType);
    let header = null;

    if (userType == "siteadmin" || userType == "manager") {
        header = <ManagementHeader />
    } else if (userType == "customer") {
        header = <CustomerHeader />
    } else { // Guest
        header = <GuestHeader />
    }


    useEffect(() => {
        const shrinkHeader = () => {
          if (
            document.body.scrollTop > 100 ||
            document.documentElement.scrollTop > 100
          ) {
            headerRef.current.classList.add(classes.shrink);
          } else {
            headerRef.current.classList.remove(classes.shrink);
          }
        };
        window.addEventListener("scroll", shrinkHeader);
        return () => {
          window.removeEventListener("scroll", shrinkHeader);
        };
      }, []);

      const handleLogout = () => {
          // TODO: dispatch logout, i.e empty the state and remove localstorage
          // TODO: navigate to login
          window.localStorage.removeItem('persistantState');
          localStorage.clear();
          dispatch(userActions.logout());
          navigate("/login");
      }

      const Login = (
        <li className={classes.active} onClick={() => {navigate("/login"); window.location.reload();}}>
            Login
        </li>
        );
      const Signup = (
        <li className={classes.active} onClick={() => {navigate("/signup"); window.location.reload();}}>
            Signup
        </li>
      );
      const MyReservations = (
        <li className={classes.active} onClick={() => {navigate("/my-reservations"); window.location.reload();} }>
            My Reservations
        </li>
      );
      const Logout = (
        <li className={classes.active} onClick={handleLogout}>
            Logout
        </li>
      );
      const Admin = (
        <li className={classes.active} onClick={() => {navigate("/site-administration"); window.location.reload();}}>
            Admin
        </li>
      );
      const Manager = (
        <li className={classes.active} onClick={() => {navigate("/management"); window.location.reload();}}>
            Management
        </li>
      );


    return (
        <div className={classes.header} ref={headerRef}>
            <div className={`${classes.header__wrap} ${classes.container}`}>
                <div className={classes.logo} >
                    <img src={LOGO_SRC} onClick={() => {navigate("/"); window.location.reload();}}/>
                </div>
                <ul className={classes.header__nav}>
                    <li className={classes.active} onClick={() => {navigate("/"); window.location.reload();} }>
                        Home
                    </li>
                    {(userType == "guest" && isLoggedIn == false) ? Login : 
                      (userType == "admin") ? Admin : (userType == "manager") ? Manager : MyReservations}
                    {userType == "guest" ? Signup : Logout}
                </ul>
            </div>
        </div>
    )
}

export default Header_v2;
