import React from "react";
import { Container } from "react-bootstrap";
export default function Logout(props) {
    props?.setUserData(null);
    return (
        <Container>
            You've just logged out.
        </Container>
    );
}