import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import axios from "axios";
import { useState } from "react";
import NoticeBanner from "../NoticeBanner";
import SearchProfiles from "../SearchProfiles";
import { END_POINT } from "../../utils";

export default function RequestForm(props) {
    const [id, setId] = useState();
    const [amount, setAmount] = useState();
    const [description, setDescription] = useState();
    const [category, setCategory] = useState();

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
                console.log(rsp)
                console.log("request id:", rsp.data?.id)
                //clear form
                //fire a notification
                // setProfile(rsp.data);
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
            <SearchProfiles handleSelectValue = {setId}/>
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 text-uppercase ">Send Request</h2>
                  <p className=" mb-5">Please enter your request!</p>
                  <div className="mb-3">
                    <Form>
                      <Form.Group className="mb-3" controlId="formAmount">
                        <Form.Label className="text-center">
                          Amount 
                        </Form.Label>
                        <Form.Control onChange={onAmount} type="amount" placeholder="Amount" />
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
                        <Form.Control  onChange={onCategory} type="category" placeholder="Category" />
                      </Form.Group>

                      <div className="d-grid">
                        <Button onClick={handleSendRequest}variant="primary" type="submit">
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