import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
const InjectAdsController = (props) => {
    // TODO refactor to read ads from props later
    const ad1 = "John Jay has the best food!";
    const ad2 = "Dodge is the best gym!";
    const ad3 = "elon musk: #Firing";
    return(
    <>
    <Stack direction="horizontal" gap={3}>
     <Form.Select aria-label="Default select example" style={{width: '75%'}}
     onChange={e => props?.handleOnChange(e.target.value)}>
      <option>Select your ads to inject</option>
      <option value="1">{ad1}</option>
      <option value="2">{ad2}</option>
      <option value="3">{ad3}</option>
    </Form.Select>
    <Button variant="primary" onClick={props?.handleInject}>Inject</Button>
    </Stack>
    </>
)}
export default InjectAdsController

