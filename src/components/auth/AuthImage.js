// Css imports
import './authStyles/AuthPhone.css';

// React imports
import React, { useState, useEffect, useRef } from 'react';

// MaterialUI imports
import { IconButton } from '@material-ui/core';
import  PhotoCamera from '@material-ui/icons/PhotoCamera';

// Image component 
const AuthImage = ({ file, setFile }) => {

    // Image preview state
    const [preview, setPreview] = useState();

    // Choose image function, sets the file state imported from props to the image selected
    const chooseFile = (e) => {
        setFile(e.target.files[0]);
    }

    // Fire the useEffect everytime the file state changes
    useEffect(() => {
        if(!file) return;

        // When loading the file, set the preview state to it
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPreview(fileReader.result)
        };
        fileReader.readAsDataURL(file);
    }, [file])

    // Ref to be assigned to file input in order to reset its value 
    const fileRef = useRef();

    // Function to reset onClick the file input value and preview state
    // (To delete an image)
    const handleDelete = () => {
        fileRef.current.value = '';
        setPreview('');
    }

    return (
        // Auth image container
        <div className='auth-form__imgContainer'>
            {/* Hidden file input */}
            <input type='file'
                   accept='.jpg, .png, .jpeg'
                   id="icon-button-file"
                   style={{display: 'none'}}
                   onChange={chooseFile}
                   ref={fileRef}
            />
            {/* File input label / upload button */}
            <label htmlFor="icon-button-file" className='auth-form__cameraLabel'>
                <IconButton aria-label="upload picture" component="span">
                    <PhotoCamera className='auth-form__cameraIcon' />
                </IconButton>
                <span>{preview ? 'Change avatar' : 'Upload avatar'}</span>
            </label>
    
            {/* Uploaded image preview */}
            {preview && 
                <div className='auth-form__imgPreview'>
                    <img src={preview} alt='preview' />
                    <span className='auth-form__imgDelete' onClick={handleDelete}>
                        <img src='images/delete-icon.svg' alt='delete icon' />
                    </span>
                </div>
            }
        </div>
    )
}

export default AuthImage