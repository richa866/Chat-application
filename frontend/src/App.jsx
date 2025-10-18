import { useEffect, useState } from 'react'
import './App.css'
import { ToastContainer } from "react-toastify";
import {Navigate, Route, Routes} from "react-router-dom"
import ChatDashBoard from './pages/ChatDashBoard.jsx'
import Login from './pages/login.jsx';
import Notification from './components/notification.jsx';
import Signup from "./pages/signup.jsx"
import ProfilePage from './pages/profile.jsx';
import { useAuthStore } from './store/useAuthStore.js';
import { useThemeStore } from './store/useThemeStore.js';


function App() {
const {authUser,checkAuth,isCheckingAuth,onlineUsers}=useAuthStore();
const {theme}=useThemeStore();
 console.log({onlineUsers});
useEffect(()=>{
  checkAuth();
},[checkAuth]);
console.log({authUser});

if(isCheckingAuth && !authUser){
 return <div>
    <p>LOADING PAGE</p>
  </div>
}
  return (
<div data-theme={theme}>
<Notification />
<Routes>
   <Route path='/' element={authUser?<ChatDashBoard/>:<Navigate to="/login"/>}/> 
   {/* if the user is logged in then nly homepage */}
   <Route path='/login' element={<Login/>}/>
   <Route path='/signup' element={<Signup/>}/>
   <Route path='/profile' element={ authUser?<ProfilePage/>:<Navigate to="/login"/>}/>
  </Routes>
  <ToastContainer/>
    </div>
    
  );
  
}

export default App
