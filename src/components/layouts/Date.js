// React imports
import React from 'react'

// Message date component
const Date = ({ date }) => {
  if(date) {
    return (
      <div className='message__date'>
        {date.toLocaleString()}
      </div>
    )
  }
}

export default Date