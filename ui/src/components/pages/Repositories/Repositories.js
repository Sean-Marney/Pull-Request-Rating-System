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
import Button from "@mui/material/Button";
import { Skeleton } from "@mui/material";
import Modal from "@mui/material/Modal";
import PullRequestRating from "./PullRequestRating";
import PullRequestRatingStars from "./PullRequestRatingStars";
import useAxiosInstance from "../../../useAxiosInstance";

// styles here
const useStyles = makeStyles((theme) => ({
    root: {
        height: "700px",
        maxWidth: "100%",
        backgroundColor: theme.palette.background.paper,
        display: "flex",
        flexDirection: "column",
        overflow: "auto",
    },
    selectContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        marginBottom: theme.spacing(2),
    },
    select: {
        width: "170px",
        margin: "0px 20px",
        padding: "0px 6px",
        border: "0.5px solid black",
    },
    listItem: {
        cursor: "pointer",
        "&:hover": {
            backgroundColor: "#f5f5f5",
        },
        border: "1px solid black",
        width: "1000px",
        margin: 10,
        padding: "5px 5px",
    },
    ul: {
        margin: 0,
        padding: 0,
    },
    container: {
        display: "flex",
        flexDirection: "row",
    },
    selectWrapper: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    buttonContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "130px",
        fontFamily: "roboto",
    },
    button: {
        flexBasis: "45%",
    },
    positionElements: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        height: "80px",
        marginBottom: "10px",
    },
}));

var moment = require("moment");
moment().format();

const RepositoryList = () => {
    const { request } = useAxiosInstance();
    const classes = useStyles();

    // Stores all the repositories
    const [repositories, setRepositories] = useState([]);
    // Stores selected repository
    const [selectedRepository, setSelectedRepository] = useState();
    // Stores all the Pull Requests
    const [allPullRequests, setAllPullRequests] = useState([]);
    // Stores selected repository's pull requests
    const [selectedPullRequests, setSelectedPullRequests] = useState([]);
    // Stores selected Pull request
    const [selectedPR, setSelectedPR] = useState(null);
    // Stores the filtered list
    const [filter, setFilter] = useState("pending");
    // Stores the loading and non-loading state for loaders
    const [loading, setLoading] = useState(false);

    // Gets all pull requests across all repositories
    const getAllPullRequests = async () => {
        try {
            setLoading(true);
            // Sends GET request to API to get all pull requests in all repositories
            const response = await request({
                method: "get",
                url: "/management/repositories/allPulls",
            });
            // Sets the state of the pull requests and repositories
            setSelectedPullRequests(filterList(response.data.pullRequests));
            setAllPullRequests(response.data.pullRequests);
            console.log(response);
            setRepositories(response.data.repos);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    // Event handler to navigate to GitHub page for a specific pull request when user clicks the pull request
    const handleGitHubLinkClick = (pullRequestUrl) => {
        window.open(pullRequestUrl, "_blank");
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
        let list;
        if (filter === "pending") {
            list = incomingList.filter(
                (item) => !item.ratings || item.ratings == {}
            );
        } else if (filter === "reviewed") {
            list = incomingList.filter((item) => item.ratings);
        }
        return list;
    };

    useEffect(() => {
        getAllPullRequests();
    }, [filter]);

    return (
        <div className={classes.root}>
            <Modal
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
                open={selectedPR ? true : false}
                onClose={() => {
                    setSelectedPR(null);
                }}
            >
                <PullRequestRating
                    pullRequest={selectedPR}
                    setSelectedPR={setSelectedPR}
                    reloadList={getAllPullRequests}
                />
            </Modal>
            <Typography variant="h4">
                <b>Pull Requests Rating</b>
            </Typography>

            <div className={classes.selectContainer}>
                <div className={classes.selectWrapper}>
                    <label style={{ fontWeight: "bold" }}>
                        {" "}
                        Filter by Repository
                    </label>
                    <Select
                        className={classes.select}
                        value={selectedRepository}
                        onChange={handleRepositoryChange}
                        defaultValue="all"
                    >
                        <MenuItem value="all">All Pull Requests</MenuItem>
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
                <div className={classes.selectWrapper}>
                    <label style={{ fontWeight: "bold" }}>
                        {" "}
                        Filter by Status
                    </label>
                    <Select
                        className={classes.select}
                        value={filter}
                        onChange={(event) => {
                            setFilter(event.target.value);
                            if (event.target.value === "reviewed")
                                setSelectedPR(null);
                        }}
                        defaultValue="pending"
                    >
                        <MenuItem value="pending">Pending</MenuItem>
                        <MenuItem value="reviewed">Reviewed</MenuItem>
                    </Select>
                </div>
            </div>

            {selectedPullRequests?.length > 0 && (
                <div className={classes.container}>
                    <List>
                        {!loading ? (
                            selectedPullRequests?.map((pullRequest) => (
                                <ListItem
                                    key={pullRequest._id}
                                    className={classes.listItem}
                                >
                                    <ListItemText
                                        primary={
                                            <Typography variant="h6">
                                                {pullRequest.title}
                                            </Typography>
                                        }
                                        secondary={
                                            <div
                                                className={
                                                    classes.positionElements
                                                }
                                            >
                                                <div
                                                    style={{
                                                        minHeight: "250px",
                                                    }}
                                                >
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
                                                        {`Created by ${pullRequest.users_name}`}
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
                                                    <Typography
                                                        component="span"
                                                        variant="body1"
                                                        color="textSecondary"
                                                    >
                                                        Total stars{" "}
                                                        {pullRequest.ratings
                                                            ?.overall
                                                            ? pullRequest
                                                                  .ratings
                                                                  .overall
                                                            : 0}{" "}
                                                    </Typography>
                                                </div>
                                                <br />

                                                <PullRequestRatingStars
                                                    rating={pullRequest.ratings}
                                                />
                                                <br />
                                                <div
                                                    className={
                                                        classes.buttonContainer
                                                    }
                                                >
                                                    <Button
                                                        onClick={() =>
                                                            handleGitHubLinkClick(
                                                                pullRequest.url
                                                            )
                                                        }
                                                        variant="contained"
                                                        size="medium"
                                                    >
                                                        GitHub Link
                                                    </Button>
                                                    {filter === "pending" && (
                                                        <Button
                                                            onClick={() => {
                                                                if (
                                                                    filter ===
                                                                    "pending"
                                                                )
                                                                    setSelectedPR(
                                                                        pullRequest
                                                                    );
                                                                else return;
                                                            }}
                                                            variant="contained"
                                                            size="small"
                                                        >
                                                            Add rating
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>
                                        }
                                    />
                                </ListItem>
                            ))
                        ) : (
                            <>
                                <Skeleton
                                    variant="rectangular"
                                    width={1000}
                                    height={125}
                                    style={{ margin: "8px 0px" }}
                                />
                                <Skeleton
                                    variant="rectangular"
                                    width={1000}
                                    height={125}
                                    style={{ margin: "8px 0px" }}
                                />
                                <Skeleton
                                    variant="rectangular"
                                    width={1000}
                                    height={125}
                                    style={{ margin: "8px 0px" }}
                                />
                            </>
                        )}
                    </List>
                </div>
            )}
        </div>
    );
};

export default RepositoryList;