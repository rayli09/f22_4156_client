import React, { useState } from 'react';
import SearchProfiles from "./SearchProfiles";
import NoticeBanner from './NoticeBanner';
import axios from 'axios';
import { Col, Container, Row } from 'react-bootstrap';
import RequestForm from './Request/RequestForm';
import RequestHistory from './Request/RequestHistory';

const RequestPage = (props) => {

    return(
        <Container>
            <h1>Create a Request</h1>
            <NoticeBanner />
            <Row>
                <Col>
                <RequestForm userData={props?.userData}/>
                </Col>
                <Col>
                <RequestHistory userData={props?.userData}/>
                </Col>
            </Row>
        </Container>
    )
}
export default RequestPage