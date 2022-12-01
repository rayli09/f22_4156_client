import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import axios from "axios";
import { useState } from "react";
import NoticeBanner from "./NoticeBanner";

export default function Signup(props) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [accountName, setAccountName] = useState();
    const [accountNumber, setAccountNumber] = useState();
    const [routingNumber, setRoutingNumber] = useState();
    const [phone, setPhone] = useState();
    const [notice, setNotice] = useState();
    const [success, setSuccess] = useState();
    const onEmail = (e) => setEmail(e.target.value);
    const onPassword = (e) => setPassword(e.target.value);
    const onAccountName = (e) => setAccountName(e.target.value);
    const onAccountNumber = (e) => setAccountNumber(e.target.value);
    const onRoutingNumber = (e) => setRoutingNumber(e.target.value);
    const onPhone = (e) => setPhone(e.target.value);
    // signup
    const handleSignup = async (e) => {
        e.preventDefault();
        const payload = {
            "email" : email,
            "password" : password,
            "accountName" : accountName,
            "accountNumber" : accountNumber,
            "routingNumber" : routingNumber,
            "phone" : phone,
            "userType" : "personal"
        }
        try {
            axios.post(`http://127.0.0.1:5000/auth/register`, payload)
            .then((rsp) => {
                console.log(rsp);
                if (rsp.data?.message){
                    setNotice(rsp.data);
                } else {
                    // success register
                    setSuccess(`Personal User ${rsp.data?.id} is created!`);
                }

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
    <Container>
    <NoticeBanner children={success || noticeBanner}/>
    {props?.userData == null ? 
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <div className="border border-3 border-primary"></div>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 text-uppercase ">Venmo Platform</h2>
                  <p className=" mb-5">Please enter your email and password!</p>
                  <div className="mb-3">
                    <Form>
                      <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label className="text-center">
                          Email address
                        </Form.Label>
                        <Form.Control onChange={onEmail} type="email" placeholder="Enter email" />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formPassword"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control onChange={onPassword} type="password" placeholder="Password" />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formAccountName"
                      >
                        <Form.Label>Account Name</Form.Label>
                        <Form.Control  onChange={onAccountName} type="accountName" placeholder="Account Name" />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formAccountNumber"
                      >
                        <Form.Label>Account Number</Form.Label>
                        <Form.Control  onChange={onAccountNumber} type="accountNumber" placeholder="Account Number" />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formRoutingNumber"
                      >
                        <Form.Label>Routing Number</Form.Label>
                        <Form.Control  onChange={onRoutingNumber} type="routingNumber" placeholder="Routing Number" />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formPhone"
                      >
                        <Form.Label>Phone</Form.Label>
                        <Form.Control  onChange={onPhone} type="phone" placeholder="Phone" />
                      </Form.Group>

                      <div className="d-grid">
                        <Button onClick={handleSignup}variant="primary" type="submit">
                          Signup
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Already have an account?{" "}
                        <a href="/login" className="text-primary fw-bold">
                          Log In
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
    : <>You are already logged in.</>}
    </Container>
    </div>
  );
}