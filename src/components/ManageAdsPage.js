import React, { useEffect, useState } from 'react'
import axios from "axios";
import ListGroup from 'react-bootstrap/ListGroup';

const feedContent = (feedData) => {
    console.log("here!")
    console.log(feedData?.activities)
    const cards = feedData?.activities?.map((act, index) => {
        <ListGroup>
        <ListGroup.Item>{act?.fromUid ?? 'err on fromUid'}</ListGroup.Item>
        <ListGroup.Item>{act?.toUid ?? 'err on toUid'}</ListGroup.Item>
        <ListGroup.Item>Morbi leo risus</ListGroup.Item>
        <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
        <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
        </ListGroup>
    })
    console.log(cards)
    return (
        <>
            {cards}
            </>
    )
}
const ManageAdsPage = () => {
    const [feedData, setFeedData] = useState(null)
    useEffect(() => {
        async function fetchData() {
            try {
            const promise = axios.get('http://127.0.0.1:5000/feed/1');
            promise.then((rsp) => {
                setFeedData(rsp.data)
                console.log(rsp)
            })
            }
            catch(err) {
              console.log(err)  
            }
        }
        fetchData();
    }, [])
    
    return (
    <>
    <h1>Manage Ads page</h1>
    {feedContent(feedData)}
    </>
    )
}
export default ManageAdsPage