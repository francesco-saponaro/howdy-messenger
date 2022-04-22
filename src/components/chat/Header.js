import React from 'react'

// Material UI imports
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

// Header component
const Header = ({ handleLogout }) => {
  return (
    <header>
        {/* Header title */}
        <h1>HOWDY</h1>

        {/* Logout button */}
        <ExitToAppIcon fontSize='large' className='logout-button' onClick={handleLogout} />
    </header>
  )
}

export default Header