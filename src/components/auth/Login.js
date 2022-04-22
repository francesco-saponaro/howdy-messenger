// Css imports
import './authStyles/Auth.css';
import './authStyles/AuthBackground.css';
import './authStyles/AuthPhone.css';
import './authStyles/AuthForm.css';
import './authStyles/AuthAnimations.css';

// React imports
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Import installed package to display custom titles
import { Helmet } from 'react-helmet'

// Use context custom hook import
import { useAuth } from '../../authContext/AuthContext';

// Component imports
import AuthPhone from './AuthPhone';
// Error regex function import
import ErrorRegex from '../../utils/ErrorRegex'

// MaterialUI imports
import { TextField, Snackbar, InputAdornment, IconButton } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Alert from '@material-ui/lab/Alert';

// Login component
const Login = () => {

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

    // Extract user state and login method from context
    const { login, user } = useAuth();

    // Login form states
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Boolean state to toggle Password visibility
    const [visibility, setVisibility] = useState(false)

    // Form client-side Error states
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    // Loading state to store boolean to determine if to disable form button
    const [loading, setLoading] = useState(false);
    // Variable containing all booleans determining if to disable form button.
    // In this case if... the form is in the process of being submitted, there are any client-side 
    // errors or the fields are empty (to disable button as soon as page loads)
    const disableBtn = loading || emailError || passwordError || 
                       !email.length || !password.length;

    // OnChange function that will set both the state of its target 
    // and, depending on its value, its error state
    const handleFormChange = (field, targetValue) => {
        

        if(field === 'password') {
            setPassword(targetValue);
            targetValue.length < 6 ? setPasswordError(true) : setPasswordError(false);
        }
    }

    // On page load and everytime theres a change in the user state, redirect user
    // to home page. 
    // This is both to redirect the user when it logs in and to prevent the user to access
    // this page if already logged in.
    useEffect(() => {
        if(user) {
            navigate('/');
        };
    }, [user, navigate])

    // Login handler - async as we are calling into the API
    const handleLogin = async (e) => {
        e.preventDefault()

        // Set loading to true to disable submit button, to prevent submitting twice
        setLoading(true);
        // Run imported login function with the values of targeted refs passed in,
        // if unsuccessful show error.
        try {
            await login(email, password);
        } catch(err) {
            // If error filter it through the regex, setError state to it and set
            // open state to true.
            ErrorRegex(err, setError);
            setOpen(true);
        }
        setLoading(false);
    }

    return (
        <>
        {/* Custom title */}
        <Helmet><title>Howdy - Login</title></Helmet>

        {/* Form error snackbar alert */}
        {open &&
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    {error}
                </Alert>
            </Snackbar>
        }

        {/* Background */}
        <div className='left-background'></div>
        <div className='right-background'></div>

        {/* Auth container */}
        <div className='auth-container'>
            {/* Phone */}
            <AuthPhone />

            {/* Form container */}
            <div className='auth-form__container'>
                {/* Form header */}
                <h2 className='auth-form__header'>LOGIN</h2>
                {/* Form */}
                <form className='auth-form' noValidate autoComplete='off' onSubmit={handleLogin}>
                    {/* Form fields */}
                    <div className='auth-form__textFields'>
                        {/* Email */}
                        <TextField 
                            label='Enter email...'
                            variant='outlined'
                            required
                            className='auth-form__textField'
                            value={email}
                            onChange={(e) => handleFormChange('email', e.target.value)}
                            error={emailError}
                            helperText={emailError && "Enter a valid email"}
                        />
                        {/* Password */}
                        <TextField 
                            label='Enter password...'
                            variant='outlined'
                            type={visibility ? 'text' : 'password'}
                            className='auth-form__textField'
                            required
                            value={password}
                            onChange={(e) => handleFormChange('password', e.target.value)}
                            error={passwordError}
                            helperText={passwordError && "Password must have more than 6 characters"}
                            InputProps={{
                                endAdornment:
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => visibility ? setVisibility(false) : setVisibility(true)}
                                        >
                                            {visibility ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                            }}
                        />
                    </div>

                    {/* Form button */}
                    <button type='submit'disabled={disableBtn} className='auth-form__submitBtn'>
                        Login
                    </button>

                    {/* Form cta */}
                    <div className='auth-form__cta'>Don't have an account? <Link to='/register'>Signup</Link></div>
                </form>
            </div>
        </div>
        </>
    )
}

export default Login