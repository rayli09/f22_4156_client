import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import axios from "axios";
import { useState, useEffect } from "react";
import NoticeBanner from "../NoticeBanner";
import SearchProfiles from "../SearchProfiles";
import RequestEntry from "./RequestEntry";
import { END_POINT } from "../../utils"; 

export default function RequestHistory(props) {
    const [id, setId] = useState();
    const [amount, setAmount] = useState();
    const [description, setDescription] = useState();
    const [category, setCategory] = useState();

    const [entries, setEntries] = useState();
    const [notice, setNotice] = useState();
    const [success, setSuccess] = useState();
    const onId = (e) => setId(e.target.value);
    const onAmount = (e) => setAmount(e.target.value);
    const onDescription = (e) => setDescription(e.target.value);
    const onCategory = (e) => setCategory(e.target.value);

    useEffect(() => {
        handleFetchData();
    }, [])

    const handleFetchData = async () => {
        if (!props?.userData?.token){
            return;
        }
        try {
            
            axios.get(`${END_POINT}request`,{
                headers: {
                    'Authorization': props?.userData?.token 
                }
            }).then((rsp) => {
                console.log(rsp)
                if (rsp.data?.url) {
                    // setNoticeMsg('No Entry')
                } else {
                    setEntries(rsp.data.requests);
                }

            }).catch(function (error) {
                console.log(error)
                // setNoticeMsg("error when fetching feed.");      
            })
        } catch (err) {
            console.log(err)
        }
    }

    const entriesContent = () => {
        console.log(entries)
        const entryList = entries?.map((request, index) => (
            // console.log(request) && 
            (request.status == "TRANS_PENDING") ? <RequestEntry userData={props?.userData} key={index} request={request} /> : ""
        ))
        return (
            <>
                {entryList}
            </>
        )
    }

    const noticeBanner = ( notice && 
        <>
        <h2>Error fields: <span>{notice?.errorFields
?.join()} </span>
        - {notice?.message} 
        </h2>
        </>
    );
  return (
    <div>
    <NoticeBanner children={success || noticeBanner}/>
      <Container>
        <h2>Your Request History</h2>
        {entriesContent()}
      </Container>
    </div>
  );
}