import React, {useEffect, useState} from 'react'
import axios from "axios";
import {Col, Container} from 'react-bootstrap'
import Loading from './Loading'
import Activity from './ads/Activity'
import NoticeBanner from './NoticeBanner';
import { END_POINT } from '../utils';

const generateKey = (pre) => {
    return `${pre}_${new Date().getTime()}`;
}
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
        try {
            
            axios.get(`${END_POINT}feed`,{
                headers: {
                    'Authorization': props?.userData?.token 
                }
            }).then((rsp) => {
                console.log(rsp)
                if (rsp.data?.url) {
                    setNoticeMsg('Please authenticate first.')
                } else {
                    setFeedData(rsp.data);
                }

            }).catch(function (error) {
                console.log(error)
                setNoticeMsg("error when fetching feed.");      
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
            <>
                {activities}
            </>
        )
    }
    const header = (
        <>
            <h1>Your Feed</h1>
            <NoticeBanner children={noticeMsg}/>
        </>
    );

    return (
        <Container>
            {header}
            {feedData ? feedContent() : <Loading/>}
        </Container>
    )
}
export default Feed