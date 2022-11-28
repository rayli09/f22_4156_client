import axios from "axios";
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import CLIENT from '../CLIENT';

const UserProfilePage = (props) => {
    const [profile, setProfile] = useState(null);
    const [amount, setAmount] = useState(0.);
    const onAmount = (e) => setAmount(e.target.value);
    
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
                window.location.reload();
            }).catch(err => {
                console.log(err)
            })
        } catch (err) {
            console.log(err);
        }
    }

    const isTooSmall = amount < 0.01;

    return (
        <div>
            <h1>My Profile</h1>
            { profile === null ? "loading" : (
                <div>
                    <h3>Email: {profile.email}</h3>
                    <h3>Phone: {profile.phone}</h3>
                    <h3>Address: {profile.address}</h3>
                    <h3>User Type: {profile.type.toLowerCase()}</h3>
                    <h3>Account Name: {profile.accountName}</h3>
                    <h3>Account Number: {profile.accountNumber}</h3>
                    <h3>Routing Number: {profile.routingNumber}</h3>
                    <h3>Balance: ${profile.balance.toFixed(2)}</h3>
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
                        </InputGroup>
                        <ButtonGroup className="me-2" aria-label="Deposit btn group">
                            <Button 
                                variant="secondary" 
                                disabled={isTooSmall} 
                                id="depositBtn"
                                onClick={handleBalanceUpdateSubmission}
                            >
                                Deposit
                            </Button>
                        </ButtonGroup>
                        <ButtonGroup className="me-2" aria-label="Withdraw btn group">
                            <Button 
                                variant="secondary" 
                                disabled={isTooSmall || amount > parseFloat(profile.balance.toFixed(2))}
                                id="withdrawBtn"
                                onClick={handleBalanceUpdateSubmission}
                            >
                                Withdraw
                            </Button>
                        </ButtonGroup>
                    </ButtonToolbar>
                </div>
            )}
        </div>
    )
}
export default UserProfilePage