import React, { useEffect, useState } from "react";
import axios from 'axios';
import { PullRequestItem } from "../PullRequestHistory/PullRequestItem";
import {
    Typography,
    Box
  } from "@material-ui/core";
function App() {
    const [pullRequests, setPullRequests] = useState([]);

    useEffect(() => {
        getPullRequests();
    }, []);


    // Gets the Pull Requests through calling api backend
    // TODO: Integrate with ID of user who is logged in
    const getPullRequests = async () => {
        const res = await axios.get("http://localhost:8000/pullrequests/history/1");
        console.log(res.data);
        setPullRequests(res.data);
    };
    

    

    return (
        <div className="App">
            <Box padding={3}>
                <Typography variant="h4">
                <b>History</b>
                </Typography>
            </Box>
                {pullRequests.map((pullRequest) => {
                    return (
                        <PullRequestItem key={pullRequest._id} pullRequest={pullRequest}/>
                    )})}
        </div>
    );
}

export default App;
