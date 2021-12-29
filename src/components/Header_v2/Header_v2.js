import React, { useState, useEffect, useRef } from 'react';
import classes from './Header_v2.module.scss';
import { useSelector } from 'react-redux';
import GuestHeader from '../Header/GuestHeader/GuestHeader';
import CustomerHeader from '../Header/CustomerHeader/CustomerHeader';
import ManagementHeader from '../Header/ManagementHeader/ManagementHeader';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userActions } from '../../store/userSlice';

//const LOGO_SRC = "https://uploads.codesandbox.io/uploads/user/5055a4cd-acb4-4f66-ad01-27a20d31150f/Vp3p-icons8-play-100.png";
//const LOGO_SRC = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3R-iSmkKMOxoXyH8kuEFVkkJQjvp0D__k7g&usqp=CAU"
//const LOGO_SRC = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjYiIGhlaWdodD0iMzYiIHZpZXdCb3g9IjAgMCAxMjYgMzYiPgogICAgPGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8cGF0aCBmaWxsPSIjRkZGIiBkPSJNNzcgMHYyNGg0OHYxMmgtOHYtNEg2OVYwaDh6TTUyIDNjNy4xMDggMCAxMi44ODMgNS43MDQgMTIuOTk4IDEyLjc4NUw2NSAxNnYxNkgwdi04aDE0Ljd2LTIuOWMwLTQuMy0yLjYtNi40LTYuMi02LjQtMS42IDAtMy41LjQtNS4zIDEuMmwtLjgtNi4zYzIuMy0xIDUtMS42IDcuMi0xLjYgOS4yIDAgMTMuMSA1LjUgMTMuMSAxMnY0aDUuMjM1YTEyLjQ3IDEyLjQ3IDAgMCAxLS44MzUtNC41QzI3LjEgMTIuNTk2IDMyLjY5NiA3IDM5LjYgN2MuOTQgMCAxLjg1OC4xMDQgMi43NC4zMDFBMTIuOTcgMTIuOTcgMCAwIDEgNTIgM3ptLjA4MyA4SDUyYTQuOTcgNC45NyAwIDAgMC0yLjYwNy43MzEgMTIuNDQzIDEyLjQ0MyAwIDAgMSAyLjcwNyA3LjY4MVYyNEg1N3YtOGE1IDUgMCAwIDAtNC45MTctNXptLTEyLjQwOSA0SDM5LjZhNC41IDQuNSAwIDAgMC0uMDc0IDlINDQuMXYtNC41YTQuNSA0LjUgMCAwIDAtNC4zNTItNC40OThsLS4wNzQtLjAwMXoiLz4KICAgICAgICA8Y2lyY2xlIGN4PSIxMjEiIGN5PSIxMiIgcj0iNSIgZmlsbD0iIzA5RiIvPgogICAgICAgIDxjaXJjbGUgY3g9IjEwNSIgY3k9IjEyIiByPSI1IiBmaWxsPSIjMEM5Ii8+CiAgICAgICAgPGNpcmNsZSBjeD0iODkiIGN5PSIxMiIgcj0iNSIgZmlsbD0iIzAwRDM1OCIvPgogICAgPC9nPgo8L3N2Zz4K"
//const LOGO_SRC = "https://www.paramountplus.com/assets/images/intl-landing-page/pplus_marketing_site_logo_white.png"
//const LOGO_SRC = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/2560px-YouTube_full-color_icon_%282017%29.svg.png"
//const LOGO_SRC = "https://tv.apple.com/assets/brands/Apple_TV_plus_logo_white-2721485772b7d06c4e33379ce990870e.svg"
const LOGO_SRC = "https://egy.voxcinemas.com/assets/images/logo-dark-288x92.png";

const Header_v2 = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const headerRef = useRef(null);
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
        <li className={classes.active} onClick={() => navigate("/login")}>
            Login
        </li>
        );
      const Signup = (
        <li className={classes.active} onClick={() => navigate("/signup")}>
            Signup
        </li>
      );
      const MyReservations = (
        <li className={classes.active} onClick={() => navigate("/my-reservations")}>
            My Reservations
        </li>
      );
      const Logout = (
        <li className={classes.active} onClick={handleLogout}>
            Logout
        </li>
      );
    


    return (
        <div className={classes.header} ref={headerRef}>
            <div className={`${classes.header__wrap} ${classes.container}`}>
                <div className={classes.logo} >
                    <img src={LOGO_SRC} onClick={() => navigate("/")}/>
                </div>
                <ul className={classes.header__nav}>
                    <li className={classes.active} onClick={() => navigate("/")}>
                        Home
                    </li>
                    {userType == "customer" ? Login : MyReservations}
                    {userType == "guest" ? Signup : Logout}
                </ul>
            </div>
        </div>
    )
}

export default Header_v2;
