import React, {useEffect, useState} from 'react'
import axios from "axios";
import {Col, Container} from 'react-bootstrap'
import Loading from './Loading'
import Activity from './ads/Activity'
import NoticeBanner from './NoticeBanner';
import { END_POINT } from '../utils';
import CLIENT from '../CLIENT';
import { APIs } from '../api';
const Feed = (props) => {
    const [feedData, setFeedData] = useState(null);
    const [noticeMsg, setNoticeMsg] = useState(null);
    const [profile, setProfile] = [props.profile, props.setProfile]
    useEffect(() => {
        handleFetchData();
    }, [profile])
    const handleFetchData = async () => {
        if (!props?.userData?.token){
            return;
        }
        let data;
        if (profile?.type == 'PERSONAL') {
            data = await APIs.getFeed();
        } else {
            data = await APIs.getTransfers();
        }
        setFeedData(data);  
    }
    const feedContent = () => {
        const feed = profile?.type == 'PERSONAL' ? feedData?.activities : feedData?.transfers
        const activities = profile && feed?.map((act, index) => (
            <Activity isViewerPersonal={profile.type == 'PERSONAL'}curUid={profile?.id}key={index} act={act}/>
        ))
        return (
            <>
                {activities?.length == 0 ? 'Your feed is empty. Start making a transfer or request!' : activities}
            </>
        )
    }
    if (!props?.userData?.token) {
        return "Please log in first!"
    }
    return (
        <Container>
            <Col md={6}>
            <h1>Your Feed</h1>
            <NoticeBanner children={noticeMsg}/>
            {feedData ? feedContent() : <Loading/>}
            </Col>
        </Container>
    )
}
export default Feed