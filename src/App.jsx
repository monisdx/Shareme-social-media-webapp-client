import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import Navbar from './components/Navbar/Navbar';
import Auth from './components/Auth/Auth';
import { GoogleOAuthProvider } from '@react-oauth/google';

// clientid = 403425135190-orvvu36t06nvhq8thskame32r4fjcm7o.apps.googleusercontent.com
function App() {
  return (
    <>
    <GoogleOAuthProvider clientId='403425135190-orvvu36t06nvhq8thskame32r4fjcm7o.apps.googleusercontent.com'>
    <BrowserRouter>
    <Navbar/>
    <Routes>
    
      <Route path="/" element={<HomePage/>}/>
      <Route path="/auth" element={<Auth/>}/>
    
    </Routes>
    </BrowserRouter>
    </GoogleOAuthProvider>
    </>
  )
}

export default App
