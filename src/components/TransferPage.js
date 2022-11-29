import React, {useState} from 'react';
import SearchProfiles from "./SearchProfiles";
import { END_POINT } from '../utils';

const TransferPage = (props) => {
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("FOOD");
    const [message, setMessage] = useState("");
    const [toUid, setToUid] = useState("");

    const handleToUid = (toUid) => {
        setToUid(toUid)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res = await fetch(`${END_POINT}transfer/create`, {
                method: "POST",
                headers: {
                    'Authorization': props?.userData?.token
                },
                body: JSON.stringify({
                    'toUid': toUid,
                    'amount': amount,
                    'description': description,
                    'category': category,
                }),
            });
            if (res.status === 200) {
                setAmount("");
                setDescription("");
                setCategory("FOOD");
                setMessage("Transfer completed successfully");
            } else {
                setMessage("Transfer failed due to some invalid operations");
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <h1>Create a Transfer</h1>
            <SearchProfiles handleToUid={handleToUid} currEmail={props.userData.email}/>
            <br/>
            <div className="transfer">
                <form onSubmit={handleSubmit}>
                    <label>
                        Amount:
                        <input
                            type="text"
                            value={amount}
                            placeholder="Enter Transfer Amount"
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </label>
                    <label>
                        Description:
                        <input
                            type="text"
                            value={description}
                            placeholder="Enter Description"
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </label>
                    <label>
                        Category:
                        <select value={category} onChange={(e) => setCategory(e.target.value)}>
                            <option value="FOOD">Food</option>
                            <option value="TRAVEL">Travel</option>
                            <option value="PARTY">Party</option>
                            <option value="PHONE">Phone</option>
                            <option value="INTERNET">Internet</option>
                            <option value="RENT">Rent</option>
                            <option value="SHOPPING">Shopping</option>
                            <option value="SPORT">Sport</option>
                            <option value="VIDEO_GAME">Video Game</option>
                            <option value="TAXI">Taxi</option>
                        </select>
                    </label>
                    <button type="submit">Make Transfer</button>
                </form>
                <div className="message">{message ? <p>{message}</p> : null}</div>
            </div>
        </div>
    );
};

export default TransferPage