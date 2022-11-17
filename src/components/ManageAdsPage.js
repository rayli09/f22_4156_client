import React, { useEffect, useState } from 'react'
import axios from "axios";
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';

const generateKey = (pre) => {
    return `${ pre }_${ new Date().getTime() }`;
}
const ManageAdsPage = () => {
    const [feedData, setFeedData] = useState(null)
    const [userInput, setUserInput] = useState(null)
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
    const handleFetchData = () => {
        try {
            const uid = userInput;
            if (!uid) {
                return;
            }
            const promise = axios.get(`http://127.0.0.1:5000/feed/${uid}`);
            promise.then((rsp) => {
                setFeedData(rsp.data)
                console.log(rsp)
            })
            }
            catch(err) {
              console.log(err)  
            }
    }
    const feedContent = () => {
        console.log("here!")
        console.log(feedData?.activities)
        const userType = (type) => (
            type == 'PERSONAL' ? <Badge bg="secondary">{type}</Badge> :
            type == 'BUSINESS' ? <Badge bg="primary">{type}</Badge> :
            <Badge bg="info">{type}</Badge>
        );
        const amount = (amt) => (
            amt ? <Badge bg="light" text="dark">
            ${amt}
            </Badge> : null
        )
        const activity = (act) => (
            <>
            <Card>
            <Card.Title>
            {/* <Badge bg="secondary">{act?.fromType}</Badge> */}
            {userType(act?.fromType)}
            To
            {userType(act?.toType)}
            {amount(act?.amount)}
            {/* <Badge bg="secondary">{act?.toType}</Badge>  */}
            
                
            </Card.Title>
            <Card.Title>
            <Badge pill bg="warning" text="dark">
                {act?.promoText}
            </Badge>
            </Card.Title>
            <Card.Subtitle>
            User {act?.fromUid}{' '}  <Badge bg="success">Paid</Badge> User {act?.toUid}  
            
            </Card.Subtitle>
            <Card.Body>{act?.desc}</Card.Body>
            </Card>
            </>
        );
        const cards = feedData?.activities?.map((act, index) => (
            <>
            {activity(act)}
            
            </>
        ))
        console.log(cards)
        return (
            <>
            <Col>
                {cards ?? <h1>FEED with user id NOT FOUND</h1>}
            </Col>
            </>
                
        )
    }
    
    return (
    <>
    <h1>Manage Ads page</h1>
    <h3>Showing user feed for uid {userInput}</h3>
    <Stack direction="horizontal" gap={3}>
      <Form.Control className="me-auto" placeholder="Input Id to fetch feed"
      onChange={e=> setUserInput( e.target.value )} />
      <Button variant="secondary" onClick={handleFetchData}>Submit</Button>
      <div className="vr" />
      <Button variant="outline-danger">Reset</Button>
    </Stack>

    {feedContent()}
    </>
    )
}
export default ManageAdsPage