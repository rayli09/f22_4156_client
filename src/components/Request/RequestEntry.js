import React, {useState} from 'react';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { END_POINT } from '../../utils';
import { Toast } from 'react-bootstrap';
import { Container, Row, Col } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';

const RequestEntry = (props) => {
    const request = props?.request
    const profile = props?.profile
    const [msg, setMsg] = useState();
    const [visible, setVisible] = useState("visible");

    const handleAccept = async (e) => {
        e.preventDefault();
        const payload = {
            "fromUid" : request?.fromUid,
            "toUid" : request?.toUid,
            "requestid" : request?.transactionId
        }
        try {
            axios.put(`${END_POINT}request/accept`, payload, {headers: {
                'Authorization': props?.userData?.token 
            }})
            .then((rsp) => {
                console.log(rsp)
                if (rsp.status == 200) {
                    setMsg('Successfully accepted request.');
                    setVisible("invisible");
                }
            }).catch((error) => {
                console.log(error) 
            })
        }
        catch (err){
            console.log(err);
        }
    }
    const toastMsg = (msg && <Toast>
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">Venmo Faker</strong>
          {/* <small>11 mins ago</small> */}
        </Toast.Header>
        <Toast.Body>{msg}</Toast.Body>
      </Toast>)

    const handleDecline = async (e) => {
        e.preventDefault();
        const payload = {
            "fromUid" : request?.fromUid,
            "toUid" : request?.toUid,
            "requestid" : request?.transactionId
        }
        try {
            axios.put(`${END_POINT}request/decline`, payload, {headers: {
                'Authorization': props?.userData?.token 
            }})
            .then((rsp) => {
                console.log(rsp)
                if (rsp.status == 200) {
                    setMsg('Successfully declined request.');
                    setVisible("invisible");
                }
            }).catch((error) => {
                console.log(error) 
            })
        }
        catch (err){
            console.log(err);
        }
    }
    return (
            <Container>
                {toastMsg}
            <Card className={visible}>
                <Card.Title>
                    <Row>
                    <Col md={2}>
                    <Badge pill bg="warning" text="dark">
                    User {request?.toUid}
                    </Badge>
                    </Col>
                    <Col md={6}>
                    Requested
                    <Badge pill bg="light" text="dark">
                    {request?.amount}
                    </Badge>
                    {" from "} 
                    </Col>
                    <Col md={2}>
                    <Badge pill bg="warning" text="dark">
                    User {request?.fromUid}
                    </Badge>
                    </Col>
                    </Row>
                </Card.Title>
            <Card.Body>
            <Row>
            
            <>
            <Col>
            Description: {request?.desc || 'None'}
            </Col>
            <Col>
            Category: {request?.category || 'None'}
            </Col>
            </>
            
            </Row>
            <Row>
            {profile?.id && request?.toUid && profile.id != request.toUid && 
            <Col>
            <Button variant="outline-primary" onClick={handleAccept}>Accept</Button>
            <Button variant="outline-danger" onClick={handleDecline}>Decline</Button>              
            </Col>
            }
            </Row>
            </Card.Body>
            </Card>
            </Container>
)}
export default RequestEntry