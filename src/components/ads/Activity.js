import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';

const Activity = (props) => {
    const act = props?.act;
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
    return (
            <>
            <Card>
            <Card.Title>
            {userType(act?.fromType)}
            To
            {userType(act?.toType)}
            {amount(act?.amount)}
            
                
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
)}
export default Activity