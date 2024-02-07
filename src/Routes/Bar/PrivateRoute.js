import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
    const token = localStorage.getItem('token');
    
    return (
        token ? <Outlet/> : (
            <>
                {alert("Authentication failed. Please login again.")}
                <Navigate to="/"/>
            </>
        )
    );
}

export default PrivateRoute;