import React, {useRef, useState} from 'react';
import SearchProfiles from "./SearchProfiles";
import { END_POINT } from '../utils';
import {Button, Card, Form} from "react-bootstrap";
import NoticeBanner from "./NoticeBanner";

const TransferPage = (props) => {
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("FOOD");
    const onAmount = (e) => setAmount(e.target.value);
    const onDescription = (e) => setDescription(e.target.value);
    const onCategory = (e) => setCategory(e.target.value);
    const [notice, setNotice] = useState("");
    const [success, setSuccess] = useState("");
    const [toUid, setToUid] = useState("");
    const formRef = useRef(null);

    const handleToUid = (toUid) => {
        setToUid(toUid)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res = await fetch(`${END_POINT}transfer/create`, {
                method: "POST",
                headers: {
                    'Authorization': props?.userData?.token
                },
                body: JSON.stringify({
                    'toUid': toUid,
                    'amount': amount,
                    'description': description,
                    'category': category,
                }),
            });
            if (res.status === 200) {
                setSuccess("Transfer completed successfully");
            } else {
                setNotice("Transfer failed due to some invalid operations");
            }
            formRef.current.reset();
        } catch (err) {
            console.log(err);
        }
    };

    const noticeBanner = (notice);

    return (
        <div>
            <h1>Create a Transfer</h1>
            <br/>
            <NoticeBanner children={success || noticeBanner}/>
            <Card className="shadow">
                <Card.Body>
                    <SearchProfiles handleToUid={handleToUid} currEmail={props.userData.email}/>
                    <div className="mb-3 mt-md-4">
                        <h2 className="fw-bold mb-2 text-uppercase ">Make Transfer</h2>
                        <p className=" mb-5">Please enter your transfer details!</p>
                        <div className="mb-3">
                            <Form ref={formRef}>
                                <Form.Group className="mb-3" controlId="formAmount">
                                    <Form.Label>Amount</Form.Label>
                                    <Form.Control onChange={onAmount}
                                                  type="amount"
                                                  placeholder="Enter amount" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formDescription">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control onChange={onDescription}
                                                  type="description"
                                                  placeholder="Enter description" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formCategory">
                                    <Form.Label>Category</Form.Label>
                                    <Form.Select value={category} onChange={onCategory}>
                                        <option value="FOOD">Food</option>
                                        <option value="TRAVEL">Travel</option>
                                        <option value="PARTY">Party</option>
                                        <option value="PHONE">Phone</option>
                                        <option value="INTERNET">Internet</option>
                                        <option value="RENT">Rent</option>
                                        <option value="SHOPPING">Shopping</option>
                                        <option value="SPORT">Sport</option>
                                        <option value="VIDEO_GAME">Video Game</option>
                                        <option value="TAXI">Taxi</option>
                                    </Form.Select>
                                </Form.Group>
                                <div className="d-grid">
                                    <Button onClick={handleSubmit} variant="primary" type="submit">
                                        Make Transfer
                                    </Button>
                                </div>
                            </Form>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};

export default TransferPage