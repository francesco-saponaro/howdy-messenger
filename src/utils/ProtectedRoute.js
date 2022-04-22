// React imports
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

// Use context custom hook import
import { useAuth } from '../authContext/AuthContext';

// Extract user state from context, and if theres a user logged in, return
// whatever outlet (child) component is being called.
// Otherwise return the to login page 
const ProtectedRoute = () => {

    const { user } = useAuth();

    return (
        user ? <Outlet /> : <Navigate to='login' />
    )
}

export default ProtectedRoute