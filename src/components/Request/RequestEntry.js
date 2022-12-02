import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import CLIENT from "../../CLIENT";
import { END_POINT } from '../../utils';
import { Toast } from 'react-bootstrap';
import { Container, Row, Col } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';

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
          <strong className="me-auto">Venmo Faker</strong>
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
                if (rsp.status === 200) {
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

    const [fromProfile, setFromProfile] = useState(null);
    const [toProfile, setToProfile] = useState(null);
    const [loadFrom, setLoadFrom] = useState(false);
    const [loadTo, setLoadTo] = useState(false);

    useEffect(() => {
        if (fromProfile === null && loadFrom) {
            const key = `uid-${request?.fromUid}`;
            const cached = localStorage.getItem(key);
            if (cached) {
                setFromProfile(JSON.parse(cached));
                return;
            }
            CLIENT.get(`profile/${request?.fromUid}`).then((rsp) => {
                // console.log(rsp)
                setFromProfile(rsp.data);
                localStorage.setItem(key, JSON.stringify(rsp.data));
            }).catch((error) => {
                console.log(error) 
            })
        }
    }, [fromProfile, request?.fromUid, loadFrom]);

    useEffect(() => {
        if (toProfile === null && loadTo) {
            const key = `uid-${request?.toUid}`;
            const cached = localStorage.getItem(key);
            if (cached) {
                setToProfile(JSON.parse(cached));
                return;
            }
            CLIENT.get(`profile/${request?.toUid}`).then((rsp) => {
                // console.log(rsp)
                setToProfile(rsp.data);
                localStorage.setItem(key, JSON.stringify(rsp.data));
            }).catch((error) => {
                console.log(error) 
            })
        }
    }, [toProfile, request?.toUid, loadTo]);

    const getToolTipText = (profile) => {
        return profile ? `Account Name: ${profile.accountName}<br/>Email: ${profile.email}<br/>Phone: ${profile.phone}` : "";
    }

    return (
        <>
        <Container>
            {toastMsg}
            <Card className={visible}>
                <Card.Title>
                    <Row>
                        <Col md={2}>
                            <Badge pill bg="warning" text="dark" 
                                onMouseEnter={() => setLoadTo(true)}
                                data-for="requestToolTip" 
                                data-tip={getToolTipText(toProfile)}
                            >
                                User {request?.toUid}
                            </Badge>
                        </Col>
                        <Col md={6}>
                            Requested
                            <Badge pill bg="light" text="dark">
                                ${request?.amount}
                            </Badge>
                            {" from "} 
                        </Col>
                        <Col md={2}>
                            <Badge pill bg="warning" text="dark" 
                                onMouseEnter={() => setLoadFrom(true)}
                                data-for="requestToolTip" 
                                data-tip={getToolTipText(fromProfile)}
                            >
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
                    {profile?.id && request?.toUid && profile.id !== request.toUid && 
                    <Col>
                    <Button variant="outline-primary" onClick={handleAccept}>Accept</Button>
                    <Button variant="outline-danger" onClick={handleDecline}>Decline</Button>              
                    </Col>
                    }
                    </Row>
                </Card.Body>
            </Card>
        </Container>
        <ReactTooltip
            id="requestToolTip"
            place="bottom"
            type="dark"
            multiline={true}
        />
        </>
    )
}
export default RequestEntry