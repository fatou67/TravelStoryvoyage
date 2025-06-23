import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import React from 'react';
import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';
import Home from './pages/Home/Home';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Navigate to="/login" replace />} />
        <Route path='/' element={<Root/>}/>
         <Route path='/dashboard' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signUp' element={<SignUp/>}/>
      </Routes>
    </Router>
  )
}

//Define the Root component to handle the initial redirect
const Root = () => {
  // Chekh if token exists in localStorage
  const isAuthenticated = !!localStorage.getItem("token");


  //Redirect to dashboard if authenticated, otherwise to login

  return isAuthenticated ? ( 
    <Navigate to="/dashboard"/>

     ) : (
      <Navigate to="/login" />
     )
    
  };





export default App;