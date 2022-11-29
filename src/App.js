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

  return (
    <BrowserRouter>
      <MyNavbar userData={userData}/> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/feed" element={<Feed userData={userData}/>} />
        <Route path="/request" element={<RequestPage userData={userData}/>} />
        <Route path="/transfer" element={<TransferPage userData={userData} />} />
        <Route path="/profile" element={<UserProfilePage userData={userData} />} />
        <Route path="/login" element={<Login userData={userData} setUserData={setUserData}/>} />
        <Route path="/signup" element={<Signup userData={userData}/>} />
        <Route path="/logout" element={<Logout setUserData={setUserData}/>} />
        <Route path="*" element={<Nopage />} />
      </Routes>
    </BrowserRouter>
  
  );
}

export default App;
