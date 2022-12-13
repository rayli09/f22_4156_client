import { useState } from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import { Switch, Route, Routes, Link } from 'react-router-dom';
import MyNavbar from './components/MyNavbar'
import Home from './components/Home'
import Nopage from './components/Nopage'
import Feed from './components/Feed';
import RequestPage from './components/RequestPage';
import UserProfilePage from './components/UserProfilePage';
import Login from './components/Login'
import Signup from './components/Signup';
import Logout from './components/Logout';
import TransferPage from './components/TransferPage';
function App() {
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem("userData")) || null);
  const [profile, setProfile] = useState(JSON.parse(localStorage.getItem('profile')) || null);
  return (
    <BrowserRouter>
      <MyNavbar profile={profile} userData={userData}/> 
      <Routes>
        <Route path="/" element={<Home userData={userData}/>} />
        <Route path="/home" element={<Home userData={userData}/>} />
        <Route path="/feed" element={<Feed userData={userData}/>} />
        <Route path="/request" element={
          <RequestPage 
            userData={userData}
            profile={profile}
            setProfile={setProfile}
            />} />
        <Route path="/transfer" element={<TransferPage userData={userData} />} />
        <Route path="/profile" element={
          <UserProfilePage 
            userData={userData}
            profile={profile}
            setProfile={setProfile} />
        }/>
        <Route path="/login" element={<Login profile={profile} setProfile={setProfile} userData={userData} setUserData={setUserData}/>} />
        <Route path="/signup" element={<Signup userData={userData}/>} />
        <Route path="/logout" element={<Logout setProfile={setProfile} setUserData={setUserData}/>} />
        <Route path="*" element={<Nopage />} />
      </Routes>
    </BrowserRouter>
  
  );
}

export default App;
