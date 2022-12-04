import React from 'react'
import {Container} from "react-bootstrap";
const Home = (props) => {

    return (
        <Container>
            <br/>
            <h1>Welcome to Zenmo!</h1>
            <br/>
            <h4>This is a money management and payment tool with which you can:</h4>
            <ul>
                <li>deposit and withdraw money</li>
                <li>make immediate money transfer</li>
                <li>handle money requests</li>
                <li>view transaction feed</li>
            </ul>
            <h4>You'll love it  : )</h4>
            <br/>
            {props?.userData?.token ?
                <h4><em>Click on the Nav bar items to begin.</em></h4> : <h4><em>Please log in first!</em></h4>
            }
        </Container>
    )
};
export default Home