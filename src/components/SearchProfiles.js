import { useState } from 'react';
import AsyncSelect from 'react-select/async';
import CLIENT from '../CLIENT';

/* Simple example */
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
        <div>
            <h2>Search for a user</h2>
            <AsyncSelect
                cacheOptions
                defaultOptions
                value={selectedValue}
                getOptionLabel={e => e.email}
                getOptionValue={e => e.accountName}
                loadOptions={loadOptions}
                onInputChange={handleInputChange}
                onChange={handleChange}
            />
            <br/>
            {selectedValue && (
                <div>
                    <h3>Selected User:</h3>
                    <h5>Email: {selectedValue.email}</h5>
                    <h5>Name: {selectedValue.accountName}</h5>
                    <h5>Phone: {selectedValue.phone}</h5>
                    <h5>Account Type: {selectedValue.userType}</h5>
                </div>
            )}
        </div>
    );
};

export default SearchProfiles;