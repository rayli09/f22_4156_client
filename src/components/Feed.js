import React, {useEffect, useState} from 'react'
import axios from "axios";
import {Col, Container} from 'react-bootstrap'
import Loading from './Loading'
import Activity from './ads/Activity'
import NoticeBanner from './NoticeBanner';
import { END_POINT } from '../utils';

const Feed = (props) => {
    const [feedData, setFeedData] = useState(null)
    const [noticeMsg, setNoticeMsg] = useState(null)
    useEffect(() => {
        handleFetchData();
    }, [])
    const handleFetchData = async () => {
        if (!props?.userData?.token){
            return;
        }
        axios.get(`${END_POINT}feed`,{
            headers: {
                'Authorization': props?.userData?.token 
            }
        }).then((rsp) => {
            console.log(rsp)
            setFeedData(rsp.data);
        }).catch(function (error) {
            console.log(error)
            setNoticeMsg("error when fetching feed.");      
        })
    }
    const feedContent = () => {
        const activities = feedData?.activities?.map((act, index) => (
            <Activity key={index} act={act}/>
        ))
        return (
            <>
                {activities}
            </>
        )
    }
    return (
        <Container>
            <h1>Your Feed</h1>
            <NoticeBanner children={noticeMsg}/>
            {feedData ? feedContent() : <Loading/>}
        </Container>
    )
}
export default Feed