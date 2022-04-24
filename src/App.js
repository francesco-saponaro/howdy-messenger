// Css imports
import './Base.css';

// React imports
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Component imports
import Home from './components/chat/Home';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import NotFound from './components/errors/NotFound';

// Protected Route import
import ProtectedRoute from './utils/ProtectedRoute';

// Context provider import
import { AuthContextProvider } from './authContext/AuthContext';

// App component
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/* Context provider */}
        <AuthContextProvider>
          <Routes>
            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route path='/' element={<Home />} />
            </Route>
            {/* Auth routes */}
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            {/* 404 route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthContextProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
