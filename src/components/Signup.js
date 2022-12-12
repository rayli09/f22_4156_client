import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import axios from "axios";
import { useState } from "react";
import NoticeBanner from "./NoticeBanner";

export default function Signup(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [accountName, setAccountName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [routingNumber, setRoutingNumber] = useState('');
    const [phone, setPhone] = useState('');
    const [isBizType, setIsBizType] = useState(false);
    const [ads, setAds] = useState('');
    const [notice, setNotice] = useState();
    const [success, setSuccess] = useState();
    const [submitted, setSubmitted] = useState(false);
    const onEmail = (e) => { setEmail(e.target.value); setSubmitted(false); };
    const onPassword = (e) => { setPassword(e.target.value); setSubmitted(false); };
    const onAccountName = (e) => { setAccountName(e.target.value); setSubmitted(false); };
    const onAccountNumber = (e) => { setAccountNumber(e.target.value); setSubmitted(false); };
    const onRoutingNumber = (e) => { setRoutingNumber(e.target.value); setSubmitted(false); };
    const onPhone = (e) => { setPhone(e.target.value); setSubmitted(false); };
    const onBizType = (e) => { setIsBizType(e.target.checked); setSubmitted(false); };
    const onAds = (e) => { setAds(e.target.value); setSubmitted(false); };
    
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
            "userType" : isBizType ? "business" : "personal",
            "bizPromotionText": ads
        }
        try {
            axios.post(`http://127.0.0.1:5000/auth/register`, payload)
            .then(rsp => {
                setSuccess(`${isBizType ? "Business" : "Personal"} User with ID ${rsp.data?.id} is created! Please login in to use the app!`);
                setSubmitted(true);
            })
            .catch(err => {
              setSuccess(null);
              if (err.response) {
                setNotice(err.response.data);
                // console.log(err.response.data);
              } else {
                setNotice({
                  "message": "Network Error!"
                });
              }
            });
        }
        catch (err){
            setSuccess(null);
            setNotice(err);
            console.log(err);
        }
    }
    const noticeBanner = ( notice && 
        <>
        <h2>
          Error fields: <span>{notice?.errorFields?.join()} </span>
          - {notice?.message} 
        </h2>
        </>
    );

  const emailInvalid = !(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    .test(email));
  const passwordInvalid = !password.length;
  const accountNameInvalid = !accountName.length;
  const accountNumberInvalid = !(/^\d{8,17}$/.test(accountNumber));
  const routingNumberInvalid = !(/^\d{9}$/.test(routingNumber));
  const phoneInvalid = !(/^\d{10}$/.test(phone));
  
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
                  <h2 className="fw-bold mb-2 text-uppercase ">Zenmo Money service</h2>
                  <p className=" mb-5">Please enter your email and password!</p>
                  <div className="mb-3">
                    <Form>
                      <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label className="text-center">
                          Email address
                        </Form.Label>
                        <Form.Control onChange={onEmail} type="email" placeholder="Email" isInvalid={emailInvalid} />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formPassword"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control onChange={onPassword} type="password" placeholder="Password" isInvalid={passwordInvalid} />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formAccountName"
                      >
                        <Form.Label>Account Name</Form.Label>
                        <Form.Control  onChange={onAccountName} type="text" placeholder="Account Name" isInvalid={accountNameInvalid} />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formAccountNumber"
                      >
                        <Form.Label>Account Number (8-17 digits)</Form.Label>
                        <Form.Control  onChange={onAccountNumber} type="text" placeholder="Account Number" isInvalid={accountNumberInvalid} />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formRoutingNumber"
                      >
                        <Form.Label>Routing Number (9 digits)</Form.Label>
                        <Form.Control  onChange={onRoutingNumber} type="text" placeholder="Routing Number" isInvalid={routingNumberInvalid} />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formPhone"
                      >
                        <Form.Label>Phone (10 digits)</Form.Label>
                        <Form.Control  onChange={onPhone} type="text" placeholder="Phone" isInvalid={phoneInvalid} />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formUserType"
                      >
                        <div key={`biz-usr-checkbox`} className="mb-3">
                          <Form.Check 
                            type='checkbox'
                            id={`biz-usr-checkbox`}
                            label="Business User"
                            onChange={onBizType}
                          />
                        </div>
                      </Form.Group>
                      {isBizType && (
                        <Form.Group
                          className="mb-3"
                          controlId="formAds"
                        >
                          <Form.Label>Your Advertisement</Form.Label>
                          <Form.Control onChange={onAds} type="text" placeholder="Advertisement" />
                        </Form.Group>
                      )}

                      <div className="d-grid">
                        <Button 
                          onClick={handleSignup} variant="primary" type="submit" 
                          disabled={submitted || emailInvalid || phoneInvalid || accountNameInvalid || accountNumberInvalid || routingNumberInvalid || phoneInvalid}
                        >
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