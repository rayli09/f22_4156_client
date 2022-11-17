import React, {useEffect, useState} from 'react'
import axios from "axios";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Loading from './Loading'
import Activity from './ads/Activity'
import UserInput from './ads/UserInput';
import InjectAdsController from './ads/InjectAdsController';

const generateKey = (pre) => {
    return `${pre}_${new Date().getTime()}`;
}
const ManageAdsPage = () => {
    const [feedData, setFeedData] = useState(null)
    const [userInput, setUserInput] = useState(null)
    const [selectedAd, setSelectedAd] = useState(null)
    useEffect(() => {
        handleFetchData().then(r => console.log(r));
    }, [])
    const handleInjectAd = async () => {
        // TODO
        return selectedAd;
    }
    const handleFetchData = async () => {
        try {
            const uid = userInput;
            if (!uid) {
                return;
            }
            const promise = axios.get(`http://127.0.0.1:5000/feed/${uid}`);
            promise.then((rsp) => {
                setFeedData(rsp.data);
                setUserInput(uid);
            })
        } catch (err) {
            console.log(err)
        }
    }
    const feedContent = () => {
        const activities = feedData?.activities?.map((act, index) => (
            <Activity key={index} act={act}/>
        ))
        return (
            <Col>
                {activities ?? <h1>FEED with user id NOT FOUND</h1>}
            </Col>
        )
    }
    const header = (userInput) => (
        <>
            <h1>Manage Ads page</h1>
            <h3>Showing user feed for uid {userInput}</h3>
        </>
    );

    return (
        <>
            {header(userInput)}
            <UserInput handleOnChange={setUserInput} handleOnSubmit={handleFetchData}/>
            <InjectAdsController handleOnChange={setSelectedAd} handleOnInject={handleInjectAd}/>
            {feedData ? feedContent() : <Loading/>}
        </>
    )
}
export default ManageAdsPage