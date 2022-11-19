import React from 'react'
import {Navbar, Nav, Button, Alert} from 'react-bootstrap'

export default function NoticeBanner(props) {
    return(props.children ?
        <Alert variant="info" style={{ width: "42rem" }}>
        <Alert.Heading>
          {props.children}
        </Alert.Heading>
      </Alert> : <></>
    );
}