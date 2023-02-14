import React, { useEffect, useState } from "react";
import axios from 'axios';
import { PullRequestItem } from "./PullRequestItem";
import {
    Card,
    Typography,
    Button,
    CardActions,
    Grid,
    Link,
    Box
  } from "@material-ui/core";
function App() {
    const [pullRequests, setPullRequests] = useState([]);

    useEffect(() => {
        getPullRequests();
    }, []);

    const getPullRequests = async () => {
        const res = await axios.get("http://localhost:8000/pullrequests/history/2");
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
                        // <h1>Hi</h1>
                    )})}
        </div>
    );
}

export default App;
