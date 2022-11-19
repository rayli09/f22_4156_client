import { useState } from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import { Switch, Route, Routes, Link } from 'react-router-dom';
import MyNavbar from './components/MyNavbar'
import Home from './components/Home'
import Nopage from './components/Nopage'
import ManageAdsPage from './components/ManageAdsPage';
import ManageAssetsPage from './components/ManageAssetsPage';
import UserProfilePage from './components/UserProfilePage';
import Login from './components/Login'
import Signup from './components/Signup';

function App() {
  const [userData, setUserData] = useState(null);
  
  return (
    <BrowserRouter>
      <MyNavbar userData={userData}/> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/manageads" element={<ManageAdsPage userData={userData}/>} />
        <Route path="/manageassets" element={<ManageAssetsPage />} />
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="/login" element={<Login userData = {userData}setUserData={setUserData}/>} />
        <Route path="/signup" element={<Signup userData={userData}/>} />
        <Route path="*" element={<Nopage />} />
      </Routes>
      </BrowserRouter>
  
  );
}

export default App;
