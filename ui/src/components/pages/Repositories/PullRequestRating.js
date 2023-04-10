import React, { useEffect, useState } from "react";
import { Rating } from "@mui/material";
import Button from "@mui/material/Button";
import useAxiosInstance from "../../../useAxiosInstance";
import { useStyles } from "../../styles/Repositories/PullRequestRatingStyle";
import { Typography, Link} from "@material-ui/core";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

var moment = require("moment");
moment().format();

export default function PullRequestRating(props) {
    const { request } = useAxiosInstance();
    const [pullRequestRating, setPullRequestRating] = React.useState({});
    const [tracker, setTracker] = React.useState([]);
    const [error, setError] = useState(false);

    const getAllTrackers = async () => {
        try {
            const response = await request({
                method: "get",
                url: "/management/trackers",
            });
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

    const handleRatingFormClose = async () => {
        props.setSelectedPR(null);
    };

    const handleRating = (key, value) => {
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
                <Typography variant="h6">{props.pullRequest.title}</Typography>
                <Typography
                    component="span"
                    variant="body1"
                    color="textSecondary"
                >
                    {`Pull Request #${props.pullRequest.git_id} from ${props.pullRequest.repo}`}
                </Typography>
            </div>
            <hr></hr>
            {tracker.length === 0 ? (
                <div>
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
                            {error && (
                                <span
                                    style={{ color: "red", marginLeft: "10px" }}
                                >
                                    Please give a rating.
                                </span>
                            )}{" "}
                        </div>
                    ))}
                    <div>
                        <Typography
                            component="legend"
                            style={{ marginTop: "1rem" }}
                        >
                            Total Stars:{" "}
                            {Object.values(pullRequestRating).reduce(
                                (total, value) => total + value,
                                0
                            )}
                        </Typography>
                        <Typography component="legend">
                            Average Stars:{" "}
                            {Object.values(pullRequestRating).reduce(
                                (total, value) => total + value,
                                0
                            ) / tracker.length}
                        </Typography>
                    </div>
                </>
            )}
            <div className={classes.buttonContainer}>
                <Button
                    onClick={() =>
                        props.handleSubmit(props.pullRequest, pullRequestRating)
                    }
                    className={classes.button}
                    variant="contained"
                    fullWidth
                    size="small"
                >
                    Submit
                </Button>
            </div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "1rem",
                }}
            >
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
