import { useState } from 'react';
import AsyncSelect from 'react-select/async';
import CLIENT from '../CLIENT';
import { Card, ListGroup, Form } from "react-bootstrap";

const optionLabel = ({ accountName, email, phone }) => (
    <div style={{ display: "flex" }}>
      <div>{accountName}</div>
      <div style={{ marginLeft: "10px", color: "#aaa" }}>
        {email} {phone}
      </div>
    </div>
);

const SearchProfiles = ({handleSelectValue, handleToUid, currEmail}) => {
    const [inputValue, setValue] = useState('');
    const [selectedValue, setSelectedValue] = useState(null);
 
    // handle input change event
    const handleInputChange = value => {
        setValue(value);
    };
 
    // handle selection
    const handleChange = value => {
        setSelectedValue(value);
        if (handleToUid !== undefined){
            handleToUid(value.uid);
        }
        if (handleSelectValue !== undefined){
            handleSelectValue(value);
        }
    };

    const getData = async (inputValue) => {
        let res = await CLIENT.get(`search/${inputValue}`);
        return res.data;
    };
 
    // load options using API call
    const loadOptions = (inputValue) => {
        return getData(inputValue).then(res => {
            return res.filter((r) => r.email !== currEmail);
        });
    };
    
    return (
        <Form.Group className="mb-3">
            <Form.Label className="text-center">Search for a user</Form.Label>
            <AsyncSelect
                cacheOptions
                defaultOptions
                value={selectedValue}
                getOptionValue={e => e.uid}
                loadOptions={loadOptions}
                onInputChange={handleInputChange}
                onChange={handleChange}
                formatOptionLabel={optionLabel}
            />
            {selectedValue && (
                <Card className="shadow">
                    <Card.Body>
                        <ListGroup>
                            <ListGroup.Item>User ID: {selectedValue.uid}</ListGroup.Item>
                            <ListGroup.Item>Name: {selectedValue.accountName}</ListGroup.Item>
                            <ListGroup.Item>User Type: {selectedValue.userType.toLowerCase()}</ListGroup.Item>
                            <ListGroup.Item>Email: {selectedValue.email}</ListGroup.Item>
                            {selectedValue.phone && <ListGroup.Item>Phone: {selectedValue.phone}</ListGroup.Item>}
                        </ListGroup>
                    </Card.Body>
                </Card>
            )}
        </Form.Group>
    );
};

export default SearchProfiles;