import { useState } from 'react'
import axios from "axios";
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

function App() {

   // new line start
  const [profileData, setProfileData] = useState(null)

  function getData() {
    axios({
      method: "GET",
      url:"/profile",
    })
    .then((response) => {
      const res =response.data
      setProfileData(({
        profile_name: res.name,
        about_me: res.about}))
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })}

    
  return (
    <BrowserRouter>
      <MyNavbar /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/manageads" element={<ManageAdsPage />} />
        <Route path="/manageassets" element={<ManageAssetsPage />} />
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="*" element={<Nopage />} />
      </Routes>
      </BrowserRouter>
  
  );
}

export default App;
