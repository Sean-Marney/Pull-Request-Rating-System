import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Typography, makeStyles } from "@material-ui/core";
import axios from "axios";
import { Rating } from "@mui/material";
import Button from "@mui/material/Button";
var moment = require("moment");
moment().format();

const useStyles = makeStyles((theme) => ({
    buttonContainer: {
        display: "flex",
        justifyContent: "space-between",
        marginTop: theme.spacing(2),
    },
    button: {
        flexBasis: "45%",
    },
    ratingContainer: {
        marginBottom: theme.spacing(2),
        width: "400px",
        border: "1px solid black", 
        margin: "15px",
        padding: "20px",
    },
    ratingTitle: {
        width: "30%",
        paddingRight: theme.spacing(1),
        textAlign: "right",
    },
    ratingValue: {
        width: "70%",
        paddingLeft: theme.spacing(1),
    },
    Rating: {
        display: "flex",
        flexWrap: "wrap",
    },
    listItemAvatar: {
        marginRight: theme.spacing(2),
    },
}));

export default function PullRequestRating(props) {
    const [pullRequestRating, setPullRequestRating] = React.useState({});
    const [tracker, setTracker] = React.useState([]);

    // Gets all trackers
    const getAllTrackers = async () => {
        try {
            const response = await axios.get(
                // Sends GET request to API to get all trackers
                "http://localhost:8000/trackers"
            );
            setTracker([...response.data]);
        } catch (error) {
            console.error(error);
        }
    };

    const handleClearClick = () => {
        setPullRequestRating({});
    };

    useEffect(() => {
        getAllTrackers();
    }, []);

    const handleSubmitClick = async () => {
        props.setSelectedPR(null);

        try {
            const response = await axios.put(
                `http://localhost:8000/ratings/update/${props.pullRequest._id}`,
                {
                    ...props.pullRequest,
                    rating: { ...pullRequestRating },
                    rating_complete: true,
                }
            );
        } catch (error) {
            console.log(error);
        }
    };

    const handleRating = (key, value) => {
        const newRating = { ...pullRequestRating, [key]: value };
        setPullRequestRating({ ...newRating });
    };

    const classes = useStyles();

    return (
        <div>
            <div className={classes.ratingContainer}>
                <h2>Set your review</h2>
                <br></br>

                {tracker.map((item) => (
                    <>
                        <Typography component="legend">{item.name}</Typography>
                        <Rating
                            name="simple-controlled"
                            value={
                                props.pullRequest.rating
                                    ? props.pullRequest?.rating[item.name]
                                    : pullRequestRating[item.name]
                                    ? pullRequestRating[item.name]
                                    : 0
                            }
                            onChange={(event, newValue) => {
                                handleRating(item.name, newValue);
                            }}
                            required
                        />{" "}
                    </>
                ))}
                <div className={classes.buttonContainer}>
                    <Button
                        onClick={handleSubmitClick}
                        className={classes.button}
                        variant="contained"
                        size="small"
                    >
                        Submit
                    </Button>
                    <Button
                        onClick={handleClearClick}
                        className={classes.button}
                        variant="contained"
                        size="small"
                    >
                        Clear Ratings
                    </Button>
                </div>
            </div>
        </div>
    );
}
