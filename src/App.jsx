import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import Navbar from './components/Navbar/Navbar';
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {

  const user = JSON.parse(localStorage.getItem('profile'));
 console.log(user);
  return (
    <>
    <GoogleOAuthProvider clientId = {import.meta.env.VITE_GOOGLEID} >
    <BrowserRouter>
    <Navbar/>
    <Routes>
    
      <Route path="/" element={<Navigate to = "/posts"/>}/>
      <Route path="/posts" element={<HomePage/>}/>
  
      <Route path="/posts/search" element={<HomePage/>}/>
      <Route path="/auth" element={!user ? <Auth/> : <Navigate to = "/"/>}/>
      <Route path="/posts/:id" element={<PostDetails/>}></Route>
    
    </Routes>
    </BrowserRouter>
    </GoogleOAuthProvider>
    </>
  )
}

export default App
