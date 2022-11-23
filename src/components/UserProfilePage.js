import axios from "axios";
import React, { useEffect, useState } from 'react';
import { END_POINT } from '../utils';

const UserProfilePage = (props) => {
    const [profile, setProfile] = useState(null);
    
    useEffect(() => {
        if (profile === null) {
            axios.get(`${END_POINT}profile`,{
                headers: {
                    'Authorization': props?.userData?.token 
                }
            }).then((rsp) => {
                setProfile(rsp.data);
            }).catch((error) => {
                console.log(error) 
            })
        }
    })

    return (
        <div>
            <h1>My Profile</h1>
            { profile === null ? "loading" : (
                <div>
                    <h3>Email: {profile.email}</h3>
                    <h3>Phone: {profile.phone ? profile.phone : ""}</h3>
                    <h3>Address: {profile.address ? profile.address : ""}</h3>
                    <h3>Account Name: {profile.accountName}</h3>
                    <h3>Account Number: {profile.accountNumber}</h3>
                    <h3>Routing Number: {profile.routingNumber}</h3>
                    <h3>Balance: {profile.balance}</h3>
                </div>
            )}
        </div>
    )
}
export default UserProfilePage