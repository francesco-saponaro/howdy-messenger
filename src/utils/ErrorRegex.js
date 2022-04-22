// Function to format Firebase error message, since it is meant 
//for developers and not user friendly.
const ErrorRegex = ( err, setError ) => {
    const firstLetter = err.message.match(/(?<=\/)(.*?)(?=\))/)[0].split('-').join(' ').charAt(0).toUpperCase();
    const rest = err.message.match(/(?<=\/)(.*?)(?=\))/)[0].split('-').join(' ').slice(1);
    const errorMessage = firstLetter + rest;
    setError(errorMessage);
}

export default ErrorRegex