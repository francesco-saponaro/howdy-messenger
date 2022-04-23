// React imports
import React, { useState, useEffect } from 'react';

// Firebase methods imports
import { db } from '../../firebase';
import { query, collection, onSnapshot, where } from "firebase/firestore";

const OnlineUsers = () => {

    const [onlineUsers, setOnlineUsers] = useState([]);

    useEffect(() => {
        const colRef = collection(db, 'users');
        const q = query(colRef, where("isOnline", "==", true))
        onSnapshot(q, (snapshot) => {
            setOnlineUsers(snapshot.docs.map(doc => ({id:doc.id, data:doc.data()})));
        });
    }, [])

    console.log(onlineUsers)

    return (
        <>
        {onlineUsers &&
            <div className='online__users'>
                {onlineUsers.map(user => (
                    <div className='online__users--img-container'>
                        <img src={user.data.avatar} alt={user.data.username}></img>
                        <span className='online__users--online-icon'></span>
                    </div>
                ))}
            </div>
        }
        </>
    )
}

export default OnlineUsers