import React, { useEffect, useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import ReactTooltip from 'react-tooltip';
import CLIENT from '../../CLIENT';

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
    const timestamp = (act?.lastUpdateTime.replace(/T/, ' ').replace(/\..+/, ''));     // delete the dot and everything after);

    const [fromProfile, setFromProfile] = useState(null);
    const [toProfile, setToProfile] = useState(null);
    const [loadFrom, setLoadFrom] = useState(false);
    const [loadTo, setLoadTo] = useState(false);

    useEffect(() => {
        if (fromProfile === null) {
            const key = `uid-${act?.fromUid}`;
            const cached = localStorage.getItem(key);
            if (cached) {
                setFromProfile(JSON.parse(cached));
                return;
            }
            if (loadFrom) {
                CLIENT.get(`profile/${act?.fromUid}`).then((rsp) => {
                    // console.log(rsp)
                    setFromProfile(rsp.data);
                    localStorage.setItem(key, JSON.stringify(rsp.data));
                }).catch((error) => {
                    console.log(error) 
                })
            }
        }
    }, [fromProfile, act?.fromUid, loadFrom]);

    useEffect(() => {
        if (toProfile === null) {
            const key = `uid-${act?.toUid}`;
            const cached = localStorage.getItem(key);
            if (cached) {
                setToProfile(JSON.parse(cached));
                return;
            }
            if (loadTo) {
                CLIENT.get(`profile/${act?.toUid}`).then((rsp) => {
                    // console.log(rsp)
                    setToProfile(rsp.data);
                    localStorage.setItem(key, JSON.stringify(rsp.data));
                }).catch((error) => {
                    console.log(error) 
                })
            }
        }
    }, [toProfile, act?.toUid, loadTo]);

    const getToolTipText = (profile) => {
        return profile ? `Account Name: ${profile.accountName}<br/>Email: ${profile.email}<br/>Phone: ${profile.phone}` : "";
    }

    return (
        <>
            <Card>
                <Card.Header>{timestamp}</Card.Header>
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
                    <a onMouseEnter={() => setLoadFrom(true)} data-for="activityToolTip" data-tip={getToolTipText(fromProfile)}>
                        User {act?.fromUid}{' '}
                    </a>  
                    <Badge bg="success">Paid</Badge> 
                    <a onMouseEnter={() => setLoadTo(true)} data-for="activityToolTip" data-tip={getToolTipText(toProfile)}>
                        User {act?.toUid}
                    </a>
                </Card.Subtitle>
                <Card.Body>{act?.desc}</Card.Body>
            </Card>
            <ReactTooltip
                id="activityToolTip"
                place="bottom"
                type="dark"
                multiline={true}
            />
        </>
    )
}
export default Activity