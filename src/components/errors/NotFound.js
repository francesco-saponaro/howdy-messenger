// Css imports
import './NotFound.css';

// React imports
import React from 'react'
import { Link } from 'react-router-dom';

// Import installed package to display custom titles
import { Helmet } from 'react-helmet';

// Not Found component
const NotFound = () => {
    return (
        <>
        {/* Custom title */}
        <Helmet><title>Howdy - Page Not Found</title></Helmet>

        {/* Background */}
        <div className='left-background'></div>
        <div className='right-background'></div>

        {/* Container */}
        <div className='notfound-container'>
            {/* Message */}
            <h2 className='notfound-header'>PAGE NOT FOUND</h2>

            {/* Home page link */}
            <p className='auth-form__submitBtn notfound-btn'>
                <Link to='/' >
                    Back to Homepage
                </Link>
            </p>
        </div>
        </>
    )
}

export default NotFound;