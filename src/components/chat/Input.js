// Css imports
import './chatStyles/Input.css';

// React imports
import React, { useState, useRef, useEffect } from 'react';

// Firebase methods imports
import { db }  from '../../firebase';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { storage } from '../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

// Use context custome hook import
import { useAuth } from '../../authContext/AuthContext';

// Error regex function import
import ErrorRegex from '../../utils/ErrorRegex';

// Installed Packages imports
import Picker from 'emoji-picker-react';
import { v4 } from 'uuid'

// MaterialUI imports
import { IconButton, Snackbar } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import CropOriginalIcon from '@material-ui/icons/CropOriginal';
import Alert from '@material-ui/lab/Alert';

// Chat form input component
const Input = () => {

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

    // Input state
    const [input, setInput] = useState('');

    // Ref to be assigned to form input
    const inputRef = useRef();

    // Image file state
    const [file, setFile] = useState(null);

    // SEND MESSAGE LOGIC
    // OnChange Function that both sets the input state and adjusts the textarea height based on 
    // scroll height.
    const setInputAndHeight = (e, defaultHeight) => {
        setInput(e.target.value);
        e.target.style.height = defaultHeight;
        e.target.style.height = `${e.target.scrollHeight}px`
    }

    // Send message function.
    // OnClick it adds the value of the input, along with the logged in user, its ID, timestamp and an empty array
    // to store userID's if they like a comment, into the messages database collection using the addDoc method.
    const sendMessage = async (e) => {
        e.preventDefault();

        if(input.trim() !== '') {
            try {
                const q = await collection(db, 'messages')
                const payload = {
                    username: user.displayName,
                    avatar: user.photoURL,
                    message: input,
                    uid: user.uid,
                    timestamp: serverTimestamp(),
                    userLikes: []
                }

                await addDoc(q, payload);
                setInput('');

                // Set the text area height back to its default value
                inputRef.current.style.height = '20px'
            } catch(err) {
                // If error filter it through the regex, setError state to it and set
                // open state to true.
                ErrorRegex(err, setError);
                setOpen(true);
            }
        }
    }

    // SEND IMAGE LOGIC
    // Choose image function, sets the file state to the image selected
    const chooseFile = (e) => {
        setFile(e.target.files[0]);
    }

    // Ref to be assigned to file input in order to reset its value once file its uploaded
    const fileRef = useRef();

    // Send image function.
    // OnClick it adds the chosen file, along with the logged in user, its ID, timestamp and an empty array
    // to store userID's if they like a comment, into the messages database collection using the addDoc method.
    const sendFile = async () => {
        try {
            // Assign storage location and name with the firebase storage ref method
            const fileRef = ref(storage, `chatImages/${file.name + v4()}`);
            // Upload file to the location and with the name assigned with the ref, using the 
            // firebase storage method uploadBytes
            await uploadBytes(fileRef, file);
            // Once file uploaded get the location with the firebase storage method getDownloadUrl,
            // in order to update the profile with it
            const chatPhotoURL = await getDownloadURL(fileRef);

            const q = await collection(db, 'messages')
            const payload = {
                username: user.displayName,
                avatar: user.photoURL,
                uid: user.uid,
                imageUrl: chatPhotoURL,
                timestamp: serverTimestamp(),
                userLikes: []
            }

            await addDoc(q, payload);
        } catch(err) {
            console.log('sdsds')
            // If error filter it through the regex, setError state to it and set
            // open state to true.
            ErrorRegex(err, setError);
            setOpen(true);
        }
    }

    // Everytime the file state changes run the sendFile function and reset the file input value
    useEffect(() => {
        if(file) {
            sendFile();
            fileRef.current.value = '';
        }
    }, [file])

    // EMOJI LOGIC
    // Ref to be assigned to Emoji picker div, in order to toggle its visibility
    const pickerRef = useRef();
    // Onclick function on emoji icon button to toggle Emoji picker visibility
    const showEmojiPicker = () => {
        pickerRef.current.style.display = pickerRef.current.style.display === 'none' ? 'block' : 'none'; 
    }

    // State to contain current cursor position
    const [cursorPosition, setCursorPosition] = useState()

    // Function running on clicking a picker Emoji
    const onEmojiClick = (e, emojiObject) => {
        // We grab the value both on the left and right side of cursor position 
        // (which is where we want to add the emoji )
        const start = input?.substring(0, inputRef.current.selectionEnd)
        const end = input?.substring(inputRef.current?.selectionEnd)
        // Set input equal to left value, emoji and right value
        setInput(start + emojiObject.emoji + end);
    };

    return(
        <>
        {/* Form error snackbar alert */}
        {open &&
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    {error}
                </Alert>
            </Snackbar>
        }

        {/* Chat form */}
        <div className='chat__form--container'>
            {/* Emoji picker */}
            <div className='chat__form--emoji-picker' style={{display:'none'}} ref={pickerRef}>
                <Picker onEmojiClick={onEmojiClick} />
            </div>

            <form className='chat__form'>
                {/* Textarea */}
                <textarea type='text' 
                          placeholder='Type a message...'
                          ref={inputRef}
                          value={input}
                          rows='1'
                          // Send message on pressing enter also, must specify since textarea
                          // would go to next line by default.
                          onKeyDown={(e) => e.keyCode === 13 && sendMessage(e)} 
                          onChange={(e) => setInputAndHeight(e, '18.667px')}
                />

                {/* Image uploader */}
                {/* Hidden file input */}
                <input type='file'
                       accept='.jpg, .png, .jpeg'
                       id="chat__form--file-uploader"
                       style={{display: 'none'}}
                       onChange={chooseFile}
                       ref={fileRef}
                />
                {/* File input label / upload button */}
                <label htmlFor="chat__form--file-uploader" className='chat__form--file-uploader-label'>
                    <CropOriginalIcon fontSize="large"
                                      className='chat__form--icon'
                    />
                </label>

                {/* Emoji picker icon */}
                <InsertEmoticonIcon fontSize="large"
                                    className='chat__form--icon' 
                                    onClick={showEmojiPicker} 
                />

                {/* Submit button */}
                <IconButton variant="contained" 
                            color="primary" 
                            type='submit' 
                            className='chat__form--btn'
                            onClick={sendMessage}
                            disabled={!input}>
                    <SendIcon fontSize="large" />
                </IconButton>
            </form>
        </div>
        </>
    )
}

export default Input;

