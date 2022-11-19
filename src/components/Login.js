import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
export default function Login() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const onEmail = (e) => setEmail(e.target.value);
    const onPassword = (e) => setPassword(e.target.value);
    const [notice, setNotice] = useState();
    const [success, setSuccess] = useState();

    const handleLogin = async (e) => {
        e.preventDefault();
        const payload = {
            "email" : email,
            "password" : password,
        }
        try {
            axios.post(`http://127.0.0.1:5000/auth/login`, payload)
            .then((rsp) => {
                console.log(rsp);
                if (rsp.data?.message){
                    setNotice(rsp.data);
                } else {
                    // success login
                    setSuccess("successfully logged in, token: " + rsp.data?.token);
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
    const successBanner = (
        <p>{success}</p>
    )
  return (
    <div>
        
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
          {successBanner ?? noticeBanner}
            <div className="border border-3 border-primary"></div>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 text-uppercase ">Ads Platform</h2>
                  <p className=" mb-5">Please enter your login and password!</p>
                  <div className="mb-3">
                    <Form>
                      <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label className="text-center">
                          Email address
                        </Form.Label>
                        <Form.Control onChange={onEmail}type="email" placeholder="Enter email" />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formPassword"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control onChange={onPassword}type="password" placeholder="Password" />
                      </Form.Group>
                      <div className="d-grid">
                        <Button onClick={handleLogin} variant="primary" type="submit">
                          Login
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Don't have an account?{" "}
                        <a href="/signup" className="text-primary fw-bold">
                          Sign Up
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}