// Css imports
import './chatStyles/Message.css';

// React imports
import React, { forwardRef, useState, useRef } from 'react';

// Firebase methods imports
import { db }  from '../../firebase';
import { updateDoc, doc } from "firebase/firestore";

// Use context custom hook import
import { useAuth } from '../../authContext/AuthContext';

// Error regex function import
//import ErrorRegex from '../../utils/ErrorRegex';

// Component imports
import Date from '../layouts/Date'
import Loader from '../layouts/Loader'

// MaterialUI imports
import { Card, CardContent, Typography, Avatar, Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

// Message component
// We need to wrap it in the forwardRef higher order function in order to pass a ref from FlipMove 
// to its wrapped child component, and therefore to know it needs to act on this component
const Message = forwardRef(({ messageObj, chatMessages, index, messageId }, ref) => {

    // Boolean state to determine when to show loader when loading
    const [loading, setLoading] = useState(false);

    // Boolean state to determine when to open Snackbar alert
    const [open, setOpen] = useState(false);

    // State to contain server-side error going in the Snackbar alert
    const [error, setError] = useState('');

    // OnClick function to close Snackbar alert
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
    };

    // Extract user state from context
    const { user } = useAuth();

    // Check if the message belongs to the logged in user, for styling purposes below
    const isLoggedInUser = messageObj.uid === user.uid

    // From the messages array, get the message previous to this one and check if the timestamp
    // between the current and previous message is higher than 60 seconds.
    // If it is we will show the Date component below
    const prevMessage = chatMessages[index - 1];
    const dateCondition = !prevMessage || (messageObj.timestamp?.seconds - prevMessage?.data.timestamp?.seconds) > 60;

    // Boolean evaluating if the logged in user ID is in the message document 
    // userLikes array (if he liked the message).
    // Needed in the handleLike function below.
    const liked = messageObj.userLikes.includes(user.uid);

    // Ref to be aasigned to message in order to rescroll to it when liking a message.
    const likeRef = useRef();

    // Depending on if the user liked or unliked the message, update its document
    // with the updated userLikes array. Then rescroll page to targeted message.
    const handleLike = async (id) => {
        if(!liked) {
            try{
                setLoading(true);

                // If liking append the user ID to existing IDs in array
                const updatedArray = [...messageObj.userLikes, user.uid];
                const payload = {
                    userLikes: updatedArray
                }
                const docRef = doc(db, 'messages', id);
                await updateDoc(docRef, payload);

                likeRef.current?.scrollIntoView({ block: 'center', inline: 'center' });

                setLoading(false);
            } catch(err) {
                // If error filter it through the regex, setError state to it and set
                // open state to true.
                //ErrorRegex(err, setError);
                setOpen(true);
            }
        } else {
            try{
                setLoading(true)

                // If unliking filter out user ID from array and reassign it with the filtered value
                const updatedArray = messageObj.userLikes.filter(userLike => userLike !== user.uid);
                const payload = {
                    userLikes: updatedArray
                }
                const docRef = doc(db, 'messages', id);
                await updateDoc(docRef, payload);

                likeRef.current?.scrollIntoView({ block: 'center' });

                setLoading(false);
            } catch(err) {
                // If error filter it through the regex, setError state to it and set
                // open state to true.
                //ErrorRegex(err, setError);
                setOpen(true);
            }
        }
    }

    return (
        <>
        {loading &&
            <Loader />
        }

        {/* Form error snackbar alert */}
        {open &&
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    {error}
                </Alert>
            </Snackbar>
        }

        {/* If date condition is true show the date component */}
        {dateCondition && <Date date={messageObj.timestamp?.toDate()} />}

        {/* Message card component */}
        {/* Check if the message belongs to logged in user for different styling */}
        <div ref={ref} className={`message ${isLoggedInUser && 'message__user'}`}>
            {/* Message user name */}
            <div className='message__card--username'>
                {messageObj.username}
            </div>

            {/* Message card */}
            {/* If image display it */}
            {messageObj.imageUrl && 
                <div className={isLoggedInUser ? 'message__image--user' : 'message__image'}>
                    <a href={messageObj.imageUrl} target="_blank">
                        <img src={messageObj.imageUrl} alt='message pic' target="_blank" />
                    </a>
                </div>
            }

            {/* If message display it */}
            {messageObj.message && 
                <Card className={isLoggedInUser ? 'message__card--user' : 'message__card'}>
                    <CardContent>
                        <Typography variant='h5' component='h2' className='message__card--message'>                     
                            {messageObj.message}
                        </Typography>
                    </CardContent>
                </Card>
            }

            {/* Message user avatar */}
            <a href={messageObj.avatar} target="_blank">
                <Avatar className='message__card--avatar' alt="user-avatar" src={messageObj.avatar} target="_blank" />
            </a>

            {/* Message likes icon and count */}
            {/* Display either icons depending on if the message has at least 1 like */}
            <div ref={likeRef}></div>
            <div className='message__card--like'>
                <div className='message__card--like-container'>
                {/* Likes icon */}
                <img src={`/images/like${messageObj?.userLikes.length > 0 ? '-filled' : ''}.png`} 
                        alt='like icon' 
                        className='message__card--like-icon'
                        onClick={() => handleLike(messageId)} 
                />

                {/* Likes count */}
                {messageObj.userLikes.length > 0 &&
                    <span className='message__card--like-count'>
                        {messageObj.userLikes.length}
                    </span>
                }
                </div>
            </div>
        </div>
        </>
    )
})

export default Message