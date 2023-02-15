import React, { useEffect, useState } from "react";
import axios from 'axios';
import { PullRequestItem } from "./PullRequestItem";
import { Ratings } from "./Ratings";
import {
    Typography,
    Box,
    Grid,
    Card
  } from "@material-ui/core";
function App() {
    const [pullRequests, setPullRequests] = useState([]);
    const [ratings, setRatings] = useState([]);
    const [rated, setRated] = useState([]);
    useEffect(() => {
        getPullRequests();
    }, []);


    // Gets the Pull Requests through calling api backend
    // TODO: Integrate with ID of user who is logged in
    const getPullRequests = async () => {
        const res = await axios.get("http://localhost:8000/pullrequests/history/1");
        setPullRequests(res.data);
    };
    
    function handleSelection(rated,ratings) {
        setRated(rated);
        setRatings(ratings);
    }

    return (
        <div className="App">
            <Box padding={3}>
                <Typography variant="h4">
                <b>History</b>
                </Typography>
            </Box>
            <Grid container spacing={0} >
                <Grid item xs={6}>
                    {pullRequests.map((pullRequest) => {
                    return (
                        <Card onClick={() => handleSelection(pullRequest.rating_complete, pullRequest.ratings)}>
                            <PullRequestItem key={pullRequest._id} pullRequest={pullRequest}/>
                        </Card>
                        
                    )})}
                </Grid>
                <Grid item xs={6}>
                    <Ratings ratings={ratings} rated={rated}/>
                </Grid>                        
            </Grid>    
        </div>
    );
}

export default App;
