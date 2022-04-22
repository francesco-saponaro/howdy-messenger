// Css imports
import './chatStyles/Chat.css'

// React imports
import React from 'react';

// FlipMove package import
import FlipMove from 'react-flip-move';

// Component imports
import Message from './Message'

// Messages component
const Messages = ({ chatMessages, bottomRef }) => {
    return(
        <div className='app-container__messages'>
            {/* The flipmove outer component add a nice transitioning effect to the wrapped components */}
            <FlipMove>
                {/* Map through all messages and for each display the message component*/}
                {
                    chatMessages && chatMessages.map((message, index) => (
                        <Message key={message.id} 
                                 messageObj={message.data}
                                 messageId={message.id} 
                                 chatMessages={chatMessages} 
                                 index={index} 
                        />
                        )
                    )
                }
            </FlipMove>

            {/* On page load and everytime a new message is added we scroll to this element */}
            <div className='bottom-scroll' ref={bottomRef}></div>
        </div>
    )
}

export default Messages;