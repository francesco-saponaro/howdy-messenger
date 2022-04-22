import React from 'react'

import './Loader.css'

const Loader = () => {
    return (
        <div className='loader__container'>
            <div className='loader'></div>
            <span className='loader__text'>LOADING...</span>
        </div>
    )
}

export default Loader