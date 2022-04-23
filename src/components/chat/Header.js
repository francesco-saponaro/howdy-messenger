// Css imports
import './chatStyles/Header.css';

import React from 'react'

// Component imports
import OnlineUsers from './OnlineUsers';

// Material UI imports
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

// Header component
const Header = ({ handleLogout }) => {
  return (
    <header className='header-container'>
        {/* Header title */}
        <h1 className='header'>HOWDY</h1>

        {/* Logout button */}
        <ExitToAppIcon fontSize='large' className='logout-button' onClick={handleLogout} />

        <OnlineUsers />
    </header>
  )
}

export default Header