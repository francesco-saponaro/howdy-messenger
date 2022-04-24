// React imports
import React, { useState, useEffect } from 'react';

// Firebase methods imports
import { db } from '../../firebase';
import { query, collection, onSnapshot, where } from "firebase/firestore";

// MaterialUI imports
import { Avatar } from '@material-ui/core';

// Online users component
const OnlineUsers = () => {

    // Online users state
    const [onlineUsers, setOnlineUsers] = useState([]);

    // On page load query all documents from the users collection with the isOnline key to true,
    // and run the 'onSnapshot' method with it. 
    // With the method set the onlineUsers state to an array of objects containing the documents ID and data.
    // onSnapshot also runs everytime there's a change in the targeted database collection, so everytime we 
    // add a user logs in the onlineUsers state will be automatically updated.
    useEffect(() => {
        const colRef = collection(db, 'users');
        const q = query(colRef, where("isOnline", "==", true))
        onSnapshot(q, (snapshot) => {
            setOnlineUsers(snapshot.docs.map(doc => ({id:doc.id, data:doc.data()})));
        });
    }, [])

    return (
        <>
        {/* Online users div */}
        {onlineUsers.length > 0 &&
            <div className='online__users'>
                {/* Online user avatar div */}
                {onlineUsers.map(user => (
                    <div key={user.id} className='online__users--img-container'>
                        {/* Avatar */}
                        <a href={user.data.avatar} target="_blank">
                            <Avatar className='online__users--img' alt={user.data.username} src={user.data.avatar} target="_blank" />
                        </a>
                       {/* Online dot */}
                        <span className='online__users--online-icon'></span>
                    </div>
                ))}
            </div>
        }
        </>
    )
}

export default OnlineUsers