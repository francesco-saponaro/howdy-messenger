// Css imports
import './chatStyles/Chat.css';

// React imports
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'

// Firebase methods imports
import { db } from '../../firebase';
import { query, collection, orderBy, onSnapshot } from "firebase/firestore";

// Use context custom hook import
import { useAuth } from '../../authContext/AuthContext';

// Error regex function import
//import ErrorRegex from '../../utils/ErrorRegex';

// Component imports
import Header from './Header';
import Input from './Input';
import Messages from './Messages';

// MaterialUI imports
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

// Home component
const Home = () => {

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

    // React hook to redirect to other pages
    const navigate = useNavigate();

    // Extract user state and logout method from context
    const { logout } = useAuth();

    // Messages state
    const [messages, setMessages] = useState([]);

    // Ref to target div at the bottom of the messages div, in order to scroll to bottom
    // of div on page load
    const bottomScroll = useRef(null);

    // On page load query all documents from the messages collection, in ascending order based on timestamps,
    // and run the 'onSnapshot' method with it. 
    // With the method set the messages state to an array of objects containing the documents ID and data.
    // onSnapshot also runs everytime there's a change in the targeted database collection, so everytime we 
    // add a new message in the database the messages state will be automatically updated.
    useEffect(() => {
        const q = query(collection(db , "messages"), orderBy('timestamp', 'asc'))
        onSnapshot(q, (snapshot) => {
            setMessages(snapshot.docs.map(doc => ({id:doc.id, data:doc.data()})));
        });
      }, [])

    // On page load scroll to targeted ref.
    // Also pass the messages state to the listener array so everytime theres a change in
    // the state we scroll to the targeted div.
    useEffect(() => { 
        bottomScroll.current?.scrollIntoView();
    }, [messages])

    // Logout function
    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login')
        } catch(err) {
            // If error filter it through the regex, setError state to it and set
            // open state to true.
            //ErrorRegex(err, setError);
            setOpen(true);
        }
    }

    return(
        <>        
        <div className='app-container'>
            {/* Error snackbar alert */}
            {open &&
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error">
                        {error}
                    </Alert>
                </Snackbar>
            }

            {/* Header component */}
            <Header handleLogout={handleLogout} />

            {/* Chat messages component */}
            <Messages bottomRef={bottomScroll} chatMessages={messages} />
            
            {/* Chat input component */}
            <Input />
        </div>
        </>
    )
}

export default Home;