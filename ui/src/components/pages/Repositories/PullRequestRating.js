import React, { useEffect } from "react";
import { Typography, makeStyles } from "@material-ui/core";
import { Rating } from "@mui/material";
import Button from "@mui/material/Button";
import useAxiosInstance from "../../../useAxiosInstance";
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
        margin: "10px",
        padding: "10px",
        backgroundColor: "white",
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
    const { request } = useAxiosInstance();
    const [pullRequestRating, setPullRequestRating] = React.useState({});
    const [tracker, setTracker] = React.useState([]);

    // Gets all trackers
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
            <Button
                style={{ align: "left", justifyContent: "left" }}
                onClick={handleRatingFormClose}
            >
                X
            </Button>

            <h3 style={{ display: "flex", justifyContent: "center" }}>
                Add your review
            </h3>
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

            {tracker.map((item) => (
                <div key={item._id}>
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
                </div>
            ))}
            <div className={classes.buttonContainer}>
                <Button
                // added handler here
                    onClick={() =>
                        props.handleSubmit(props.pullRequest, pullRequestRating)
                    }
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
    );
}
