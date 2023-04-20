import React, { useEffect, useState } from "react";
import { Rating } from "@mui/material";
import Button from "@mui/material/Button";
// Custom hook to handle API requests
import useAxiosInstance from "../../../useAxiosInstance";
import { useStyles } from "../../styles/Repositories/PullRequestRatingStyle";
import { Typography, Link } from "@material-ui/core";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

var moment = require("moment");
moment().format();

export default function PullRequestRating(props) {
    // Custom hook to handle API requests
    const { request } = useAxiosInstance();
    // State variable to store user's ratings for each tracker
    const [pullRequestRating, setPullRequestRating] = React.useState({});
    // State variable to store list of available trackers
    const [tracker, setTracker] = React.useState([]);
    // State variable to indicate whether an error occurred
    const [error, setError] = useState(false);

    // This function retrieves a list of available trackers for rating pull requests
    const getAllTrackers = async () => {
        try {
            // Send API request to retrieve list of available trackers
            const response = await request({
                method: "get",
                url: "/management/trackers",withCredentials: true
            });
            // Update state variable to store list of available trackers
            setTracker([...response.data]);
        } catch (error) {
            console.error(error);
        }
    };

    // This function clears the user's ratings for all trackers by resetting the "pullRequestRating" state variable to an empty object
    const handleClearClick = () => {
        setPullRequestRating({});
    };

    // This useEffect hook retrieves the list of available trackers when the component mounts
    useEffect(() => {
        getAllTrackers();
    }, []);

    // This function is called when the user clicks the "Close" button to exit the rating form
    const handleRatingFormClose = async () => {
        props.setSelectedPR(null);
    };

    // This function is called when the user changes their rating for a specific tracker. It updates the "pullRequestRating" state variable to store the new rating for the specified tracker
    const handleRating = (key, value) => {
        // Update user's rating for a specific tracker
        const newRating = { ...pullRequestRating, [key]: value };
        setPullRequestRating({ ...newRating });
    };

    const classes = useStyles();

    return (
        <div className={classes.ratingContainer}>
            <IconButton
                style={{ position: "absolute", right: "5px", top: "5px" }}
                onClick={handleRatingFormClose}
            >
                <CloseIcon />
            </IconButton>
            <Typography
                style={{ display: "flex", justifyContent: "center" }}
                variant="h5"
            >
                Rate the pull request
            </Typography>
            <Typography variant="body2" display="block" gutterBottom>
                Select the stars for the following trackers to submit a rating
            </Typography>
            <hr></hr>
            <div style={{ padding: "10px 0px" }}>
                <Typography
                    style={{ display: "flex", justifyContent: "center" }}
                    variant="body1"
                >
                    {/* Display the title and repository name of the pull request being rated */}
                    {`Pull Request ${props.pullRequest.title} for ${props.pullRequest.repo}`}
                </Typography>
            </div>
            <hr></hr>
            {tracker.length === 0 ? (
                <div>
                    {/* Display a message if no trackers are available */}
                    <Typography variant="body1">
                        No trackers found. Please{" "}
                        <Link
                            href="/management/trackers"
                            style={{ textDecoration: "none" }}
                        >
                            add trackers
                        </Link>{" "}
                        to rate pull requests.
                    </Typography>
                </div>
            ) : (
                <>
                    {/* For each tracker, display its name and a star rating component */}
                    {tracker.map((item) => (
                        <div key={item._id}>
                            <Typography component="legend">
                                {item.name}
                            </Typography>
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
                            />
                        </div>
                    ))}

                    <div>
                        {/* Display the total number of stars selected */}
                        <Typography
                            component="legend"
                            style={{ marginTop: "1rem" }}
                        >
                            Total Stars{" "}
                            {Object.values(pullRequestRating).reduce(
                                (total, value) => total + value,
                                0
                            )}
                        </Typography>
                    </div>
                </>
            )}
            <div className={classes.buttonContainer}>
                {/* When the "Submit" button is clicked, call the handleSubmit function with the current pull request, user's ratings, and setError function */}
                <Button
                    onClick={() =>
                        props.handleSubmit(
                            props.pullRequest,
                            pullRequestRating,
                            setError
                        )
                    }
                    className={classes.button}
                    variant="contained"
                    fullWidth
                    size="small"
                >
                    Submit
                </Button>
            </div>
            {error && (
                <span
                    style={{
                        color: "red",
                        display: "flex",
                        alignContent: "center",
                        justifyContent: "center",
                    }}
                >
                    {/* Display an error message if the user did not provide ratings for all required trackers */}
                    Please give the required stars to submit a rating
                </span>
            )}{" "}
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "1rem",
                }}
            >
                {/* When the "Clear Ratings" button is clicked, reset the user's ratings for all trackers */}
                <Button
                    onClick={handleClearClick}
                    className={classes.button}
                    sx={{ textTransform: "none" }}
                    size="small"
                >
                    Clear Ratings
                </Button>
            </div>
        </div>
    );
}
