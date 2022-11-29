import React from 'react';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { END_POINT } from '../../utils';

const RequestEntry = (props) => {
    const request = props?.request

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
            }).catch((error) => {
                console.log(error) 
            })
        }
        catch (err){
            console.log(err);
        }
    }

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
            }).catch((error) => {
                console.log(error) 
            })
        }
        catch (err){
            console.log(err);
        }
    }
    return (
            <>
            <Card>
                <Card.Title>
                <Badge pill bg="warning" text="dark">
                User {request?.toUid}
                </Badge>
                 Requested
                 <Badge pill bg="info" text="dark">
                 {request?.amount} 
                </Badge>
                <Badge pill bg="warning" text="dark">
                User {request?.fromUid}
                </Badge>
                </Card.Title>
            <Card.Body>
            
            {request?.description}
            Category:
            {request?.category}
            <Button onClick={handleAccept}>Accept</Button>
            <Button onClick={handleDecline}>Decline</Button>              
            </Card.Body>
            </Card>
            </>
)}
export default RequestEntry