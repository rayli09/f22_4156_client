import React from 'react'
import {Navbar, Nav, Button} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import Container from 'react-bootstrap/Container';
import { Switch, Route, Link } from 'react-router-dom';
const MyNavbar = (props) => {
    const username = (
      props?.userData && <Button variant="light" >{props.userData.email}</Button>
      
    );
    const isViewerPersonal = props?.userData.type == 'PERSONAL' || false;
    return (
      <>

      <Navbar bg="light" variant="light">
      <Container>
        <Navbar.Brand as={Link} to="/home">Zenmo</Navbar.Brand>
        <Nav className="me-auto">
          {username && (
            <>
              <Nav.Link as={Link} to="/feed">Feed</Nav.Link>
              {isViewerPersonal && 
              <Nav.Link as={Link} to="/request">Request</Nav.Link>
              }
              <Nav.Link as={Link} to="/transfer">Transfer</Nav.Link>
              <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
            </>
          )}
         
          {/* {username ||  <Nav.Link as={Link} to="/login">Login</Nav.Link>} */}
          {username ||  <Button as={Link} to="/login">Login</Button>}
          {username &&  <Nav.Link as={Link} to="/logout">Logout</Nav.Link>}
        </Nav>
      </Container>
    </Navbar>
  </>
    )
}

export default MyNavbar