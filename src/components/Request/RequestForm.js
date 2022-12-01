import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import axios from "axios";
import { useState } from "react";
import NoticeBanner from "../NoticeBanner";
import SearchProfiles from "../SearchProfiles";
import { END_POINT } from "../../utils";

export default function RequestForm(props) {
    const [id, setId] = useState();
    const [amount, setAmount] = useState(0.);
    const [description, setDescription] = useState();
    const [category, setCategory] = useState("FOOD");

    const [phone, setPhone] = useState();
    const [notice, setNotice] = useState();
    const [success, setSuccess] = useState();
    const onId = (e) => setId(e.target.value);
    const onAmount = (e) => setAmount(e.target.value);
    const onDescription = (e) => setDescription(e.target.value);
    const onCategory = (e) => setCategory(e.target.value);

    const handleSendRequest = async (e) => {
        e.preventDefault();
        const payload = {
            "toUid" : id?.uid,
            "amount" : amount,
            "description" : description,
            "category" : category
        }
        try {
            axios.post(`${END_POINT}request`, payload, {headers: {
                'Authorization': props?.userData?.token 
            }})
            .then((rsp) => {
                // console.log(rsp)
                console.log("request id:", rsp.data?.id)
                window.location.reload();
            }).catch((error) => {
                console.log(error) 
            })
        }
        catch (err){
            console.log(err);
        }
    }

    const noticeBanner = ( notice && 
        <>
        <h2>Error fields: <span>{notice?.errorFields
?.join()} </span>
        - {notice?.message} 
        </h2>
        </>
    );
  return (
    <div>
    <NoticeBanner children={success || noticeBanner}/>
        <Row >
          <Col >
            <div className="border border-3 border-primary"></div>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 text-uppercase ">Send Request</h2>
                  <p className=" mb-5">Please enter your request!</p>
                  <div className="mb-3">
                    <Form>
                      <SearchProfiles handleSelectValue={setId} currEmail={props.userData.email}/>
                      <Form.Group className="mb-3" controlId="formAmount">
                        <Form.Label className="text-center">
                          Amount 
                        </Form.Label>
                        <Form.Control onChange={onAmount} type="number" min="0" step="0.01" placeholder="Amount" />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formDescription"
                      >
                        <Form.Label>Description</Form.Label>
                        <Form.Control onChange={onDescription} type="description" placeholder="Description" />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formCategory"
                      >
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
                        <Button onClick={handleSendRequest} variant="primary" type="submit" disabled={!id || amount < 0.01 || !category}>
                          Send Request
                        </Button>
                      </div>
                    </Form>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
    </div>
  );
}