import { useState } from 'react';
import AsyncSelect from 'react-select/async';
import { END_POINT } from '../utils';

/* Simple example */
const SearchProfiles = ({handleToUid}) => {
    const [inputValue, setValue] = useState('');
    const [selectedValue, setSelectedValue] = useState(null);
 
    // handle input change event
    const handleInputChange = value => {
        setValue(value);
    };
 
    // handle selection
    const handleChange = value => {
        setSelectedValue(value);
        handleToUid(value.uid);
    };
 
    // load options using API call
    const loadOptions = (inputValue) => {
        return fetch(`${END_POINT}search/${inputValue}`).then(res => res.json());
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