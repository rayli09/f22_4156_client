import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
const UserInput = (props) => (
    <Stack direction="horizontal" gap={3}>
      <Form.Control className="me-auto" placeholder="Input Id to fetch feed"
      onChange={e=> props.handleOnChange( e.target.value )} 
      />
      <Button variant="secondary" onClick={props.handleOnSubmit}>Submit</Button>
      <div className="vr" />
      <Button variant="outline-danger" onClick={props.handleOnReset}>Reset</Button>
    </Stack>
)
export default UserInput

