import React, { useEffect, useState } from "react";
import {
    List,
    ListItem,
    ListItemText,
    Select,
    Typography,
    MenuItem,
    makeStyles,
} from "@material-ui/core";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PullRequestRating from "./PullRequestRating";
import PullRequestRatingStars from "./PullRequestRatingStars";

const useStyles = makeStyles((theme) => ({
    root: {
        height: "900px",
        maxWidth: "100%",
        backgroundColor: theme.palette.background.paper,
        overflow: "auto",
    },
    selectContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        marginBottom: theme.spacing(2),
    },
    select: {
        width: "100%",
    },
    listItem: {
        cursor: "pointer",
        "&:hover": {
            backgroundColor: "#f5f5f5",
        },
        border: "1px solid black",
        width: "550px",
        margin: "8px",
    },
    ul: {
        margin: 0,
        padding: 5,
    },
    chip: {
        marginLeft: "auto",
    },
    container: {
        width: "100%",
        marginTop: theme.spacing(3),
    },
}));

var moment = require("moment");
moment().format();

const RepositoryList = () => {
    const navigate = useNavigate();
    const classes = useStyles();
    // Stores all the repositories
    const [repositories, setRepositories] = useState([]);
    // Stores selected repository
    const [selectedRepository, setSelectedRepository] = useState();
    // Stores all the Pull Requests
    const [allPullRequests, setAllPullRequests] = useState([]);
    // Stores selected repository's pull requests
    const [selectedPullRequests, setSelectedPullRequests] = useState([]);

    const [selectedPR, setSelectedPR] = useState(null);

    const [filter, setFilter] = useState("pending");

    // Gets all pull requests across all repositories
    const getAllPullRequests = async () => {
        try {
            const response = await axios.get(
                // Sends GET request to API to get all pull requests in all repositories
                "http://localhost:8000/management/repositories/allPulls"
            );
            // Sets the state of the pull requests and repositories
            setSelectedPullRequests(
                filterList(response.data.databasePullRequests)
            );
            setAllPullRequests(response.data.databasePullRequests);
            setRepositories(response.data.repos);
        } catch (error) {
            console.error(error);
        }
    };

    // Event handler to show the correct data depending on which repository is selected
    const handleRepositoryChange = (event) => {
        if (event.target.value === "all") {
            // If user clicks "All Pull Requests" (has "all" value), display all pull requests across all repositories
            setSelectedPullRequests(allPullRequests);
            // Else, show pull requests for the repository that they click
        } else {
            let filteredPullRequests = allPullRequests.filter(
                (pullRequest) => pullRequest.repo === event.target.value
            );
            setSelectedPullRequests(filteredPullRequests);
        }
    };

    const filterList = (incomingList) => {
        if (filter === "pending") {
            let list = incomingList.filter(
                (item) => !item.ratings || item.ratings == {}
            );
            return list;
        } else if (filter === "reviewed") {
            let list = incomingList.filter((item) => item.ratings);
            return list;
        }
    };

    useEffect(() => {
        getAllPullRequests();
    }, [selectedPR, filter]);

    // // Event handler to navigate to GitHub page for a specific pull request when user clicks the pull request
    // const handlePullRequestClick = (pullRequest) => {
    //     // window.open(pullRequestUrl, "_blank");
    //     navigate("/management/repositories/rating", {
    //         state: {
    //             pullRequest: pullRequest,
    //         },
    //     });
    // };
    // console.log(allPullRequests);

    return (
        <div className={classes.root}>
            <Typography variant="h4">
                <b>Pull Requests Rating</b>
            </Typography>

            <div class="select-container">
                <div
                    class="select-wrapper"
                    style={{
                        display: "inline-block",
                        width: "550px",
                        marginRight: "10px",
                        marginLeft: "10px",
                    }}
                >
                    <Select
                        className={classes.select}
                        value={selectedRepository}
                        onChange={handleRepositoryChange}
                        defaultValue="all"
                    >
                        <MenuItem value="all">All Pull Requests</MenuItem>
                        {/* Displays all pull requests in the selected repository */}
                        {repositories?.map((repository) => (
                            <MenuItem
                                key={repository.id}
                                value={repository.name}
                            >
                                {repository.name}
                            </MenuItem>
                        ))}
                    </Select>
                </div>
                <div
                    class="select-wrapper"
                    style={{
                        display: "inline-block",
                        width: "300px",
                        marginLeft: "90px",
                    }}
                >
                    <Select
                        className={classes.select}
                        value={filter}
                        onChange={(event) => {
                            setFilter(event.target.value);
                        }}
                        defaultValue="pending"
                    >
                        <MenuItem value="pending">Pending</MenuItem>
                        <MenuItem value="reviewed">Reviewed</MenuItem>
                        {/* Displays all pull requests that are pending or rated */}
                    </Select>
                </div>
            </div>

            {selectedPullRequests?.length > 0 && (
                <div className={classes.container}>
                    <List>
                        {selectedPullRequests?.map((pullRequest) => (
                            <ListItem
                                key={pullRequest._id}
                                button
                                onClick={
                                    () => {
                                        if (filter === "pending")
                                            setSelectedPR(pullRequest);
                                        else return;
                                    }
                                    // handlePullRequestClick(pullRequest)
                                }
                                className={classes.listItem}
                            >
                                <ListItemText
                                    primary={
                                        <Typography variant="h6">
                                            {pullRequest.title}
                                        </Typography>
                                    }
                                    secondary={
                                        <>
                                            <Typography
                                                component="span"
                                                variant="body1"
                                                color="textSecondary"
                                            >
                                                {`Pull Request #${pullRequest.git_id} from ${pullRequest.repo}`}
                                            </Typography>
                                            <br />
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                color="textSecondary"
                                            >
                                                {`Created by ${pullRequest.user_id}`}
                                            </Typography>
                                            <br />
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                color="textSecondary"
                                            >
                                                {moment(
                                                    pullRequest.date
                                                ).format(
                                                    "DD/MM/YYYY  HH:mm:ss"
                                                )}
                                            </Typography>
                                            <br />
                                            <PullRequestRatingStars
                                                rating={pullRequest.ratings}
                                            />
                                        </>
                                    }
                                />
                            </ListItem>
                        ))}
                    </List>
                    {selectedPR && (
                        <PullRequestRating
                            pullRequest={selectedPR}
                            setSelectedPR={setSelectedPR}
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default RepositoryList;
