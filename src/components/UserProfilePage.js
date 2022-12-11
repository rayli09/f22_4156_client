import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import { Card, Container, Form, ListGroup }  from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';
import CLIENT from '../CLIENT';
import NoticeBanner from "./NoticeBanner";

const UserProfilePage = (props) => {
    const [profile, setProfile] = useState(null);
    const [amount, setAmount] = useState(0.);
    const [adsPayload, setAdsPayload] = useState(null);
    const onAmount = (e) => setAmount(e.target.value);
    const [notice, setNotice] = useState("");
    
    useEffect(() => {
        if (profile === null) {
            CLIENT.get("profile", {
                headers: {
                    'Authorization': props?.userData?.token 
                }
            }).then((rsp) => {
                setProfile(rsp.data);
            }).catch((error) => {
                console.log(error) 
            })
        }
    })

    if (!props?.userData?.token) {
        return "Please log in first!"
    }

    const handleBalanceUpdateSubmission = async (e) => {
        e.preventDefault();
        const isDeposit = e.currentTarget.id === "depositBtn";
        const payload = {
            "amount": isDeposit ? amount : -amount,
        }
        try {
            CLIENT.put("balance", payload, {
                headers: {
                    'Authorization': props?.userData?.token
                }
            })
            .then(rsp => {
                setProfile(null);
                setAmount(0.);
                setNotice(isDeposit ? "Deposited successfully!" : "Withdrew successfully!");
            }).catch(err => {
                setNotice(err);
                console.log(err);
            })
        } catch (err) {
            setNotice(err);
            console.log(err);
        }
    }

    const onEditAds = (e) => {
        setAdsPayload({
            "promotionText": e.target.value
        });
    }

    const handleAdsSubmit = async (e) => {
        e.preventDefault();
        try {
            CLIENT.put("ads", adsPayload, {
                headers: {
                    'Authorization': props?.userData?.token
                }
            })
            .then(rsp => {
                setProfile(null);
                setAmount(0.);
                setNotice("Your advertisement was updated successfully!");
            }).catch(err => {
                setNotice(err);
                console.log(err);
            })
        } catch (err) {
            setNotice(err);
            console.log(err);
        }
    };

    const isTooSmall = amount < 0.01;

    return (
        <Container>
            <NoticeBanner children={notice}/>
            <Card className="shadow">
                <Card.Body>
                    <div className="mb-3 mt-md-4">
                        <h2 className="fw-bold mb-2 text-uppercase">My Profile</h2>
                        { profile === null ? "loading" : (
                            <>
                                <ListGroup>
                                    <ListGroup.Item>User ID: {profile.id}</ListGroup.Item>
                                    <ListGroup.Item>Email: {profile.email}</ListGroup.Item>
                                    {profile.phone && <ListGroup.Item>Phone: {profile.phone}</ListGroup.Item>}
                                    <ListGroup.Item>User Type: {profile.type.toLowerCase()}</ListGroup.Item>
                                    <ListGroup.Item>Account Name: {profile.accountName}</ListGroup.Item>
                                    <ListGroup.Item>Account Number: {profile.accountNumber}</ListGroup.Item>
                                    <ListGroup.Item>Routing Number: {profile.routingNumber}</ListGroup.Item>
                                    <ListGroup.Item>Balance: ${profile.balance.toFixed(2)}</ListGroup.Item>
                                </ListGroup>
                                <ButtonToolbar className="mb-3" aria-label="Toolbar with Button groups">
                                    <InputGroup>
                                        <InputGroup.Text id="btnGroupAddon">$</InputGroup.Text>
                                        <Form.Control
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            placeholder="Enter the amount here"
                                            aria-label="Amount form"
                                            aria-describedby="btnGroupAddon"
                                            onChange={onAmount}
                                        />
                                        {/* <ButtonGroup className="me-2" aria-label="Deposit btn group"> */}
                                            <Button 
                                                variant="outline-secondary"
                                                disabled={isTooSmall} 
                                                id="depositBtn"
                                                onClick={handleBalanceUpdateSubmission}
                                            >
                                                Deposit
                                            </Button>
                                        {/* </ButtonGroup> */}
                                        {/* <ButtonGroup className="me-2" aria-label="Withdraw btn group"> */}
                                            <Button 
                                                variant="outline-secondary"
                                                disabled={isTooSmall || amount > parseFloat(profile.balance.toFixed(2))}
                                                id="withdrawBtn"
                                                onClick={handleBalanceUpdateSubmission}
                                            >
                                                Withdraw
                                            </Button>
                                        {/* </ButtonGroup> */}
                                    </InputGroup>
                                    
                                </ButtonToolbar>

                                {profile.type === "BUSINESS" && (
                                    <InputGroup>
                                        <Form.Group
                                            className="mb-3"
                                            controlId="formAds"
                                        >
                                            <Form.Label>Edit Your Advertisement</Form.Label>
                                            <Form.Control onChange={onEditAds} type="text" defaultValue={profile.bizPromotionText} />
                                            <Button 
                                                variant="outline-secondary"
                                                disabled={!adsPayload}
                                                id="adsBtn"
                                                onClick={handleAdsSubmit}
                                            >
                                                Update
                                            </Button>
                                        </Form.Group>
                                    </InputGroup>
                                )}
                            </>
                        )}
                    </div>
                </Card.Body>
            </Card>
        </Container>
    )
}
export default UserProfilePage