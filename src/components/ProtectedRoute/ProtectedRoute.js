import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ component: Component, allowedUser, ...rest }) => {
    const userType = useSelector(state => state.user.role);

    return (
        userType === allowedUser ? <Outlet /> : <Navigate to="/unauthorized" />
    );
}

export default ProtectedRoute;