import React, { useEffect, useState } from "react";
import {
    List,
    ListItem,
    ListItemText,
    Select,
    Typography,
    MenuItem,
    Paper,
} from "@material-ui/core";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import PullRequestRating from "./PullRequestRating";
import PullRequestRatingStars from "./PullRequestRatingStars";
import useAxiosInstance from "../../../useAxiosInstance";
import { useStyles } from "../../styles/Repositories/RepositoryStyle";
import noData from "../../../assets/images/NoData.png";
import LoadingComponent from "../../reusable/LoadingComponent";
import Pagination from "../../reusable/Pagination";
import { ToastContainer, toast } from "react-toastify";

var moment = require("moment");
moment().format();

const RepositoryList = () => {
    const classes = useStyles();

    const { request } = useAxiosInstance();
    const [visible, setVisible] = React.useState(10);

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
        url: "/management/repositories/allPulls", withCredentials: true,
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

    // function that takes in an incomingList parameter and filters the list based on the filter state variable
    const filterList = (incomingList) => {
        // Declare a variable to store the filtered list
        let list;

        // Check the value of the filter state variable
        if (filter === "pending") {
            // If the filter is set to "pending", filter out pull requests that have no ratings or an empty ratings object
            list = incomingList.filter(
                (item) => !item.ratings || item.ratings == {}
            );
        } else if (filter === "reviewed") {
            // If the filter is set to "reviewed", filter out pull requests that have no ratings
            list = incomingList.filter((item) => item.ratings);
        }
        // Return the filtered list
        return list;
    };

  const handleSubmitClick = async (
    pullRequest,
    pullRequestRating,
    setError
  ) => {
    try {
      if (Object.keys(pullRequestRating).length < 1) {
        setError(true);
        return;
      }
      await request({
        method: "put",
        url: `/ratings/update/${pullRequest._id}`, withCredentials: true,
        data: {
          ...pullRequest,
          rating: { ...pullRequestRating },
          rating_complete: true,
        },
      });

            // Resets the state of the selected pull request and retrieves all pull requests again
            setSelectedPR(null);
            getAllPullRequests();
        } catch (error) {
            // set loading state to false
            setLoading(false);
            console.log(error);
        }
    };

    // Use the useEffect hook to call getAllPullRequests when the filter state variable changes
    useEffect(() => {
        getAllPullRequests();
    }, [filter]);

    // Handling "Load More" click
    const handlePageClick = () => {
        setVisible((preValue) => preValue + 10);
    };

    return (
        <div className={classes.root}>
            {/* Modal for displaying the pull request rating form */}
            <ToastContainer />
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
                    setLoading={setLoading}
                    loading={loading}
                    pullRequest={selectedPR}
                    setSelectedPR={setSelectedPR}
                    reloadList={getAllPullRequests}
                    handleSubmit={handleSubmitClick}
                />
            </Modal>
            {/* Title */}
            <Paper className={classes.paper}>
                <Typography variant="h4">
                    <b>Pull Requests Rating</b>
                </Typography>

                {/* Filter by repository and status */}
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
                {/* List of pull requests */}
                <div className={classes.container}>
                    {/* If loading is true, display a loading indicator */}
                    {!loading ? (
                        <List>
                            {/* If there are pull requests, render them */}
                            {selectedPullRequests.length > 0 ? (
                                selectedPullRequests?.map((pullRequest) => (
                                    <ListItem
                                        key={pullRequest._id}
                                        className={classes.listItem}
                                    >
                                        {/* Display pull request information */}
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
                                                    <div>
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
                                                    </div>
                                                    <br />
                                                    {/* Display pull request rating */}
                                                    <PullRequestRatingStars
                                                        rating={
                                                            pullRequest.ratings
                                                        }
                                                    />
                                                    <br />
                                                    {/* Buttons for viewing the pull request on GitHub and for add rating */}
                                                    <div
                                                        className={
                                                            classes.buttonContainer
                                                        }
                                                    >
                                                        {/* Button to view the pull request on GitHub */}
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
                                                        {/* Button to add rating */}
                                                        {filter ===
                                                            "pending" && (
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
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        minWidth: "1000px",
                                    }}
                                >
                                    {/* If there are no pull requests to show, display a message and icon */}
                                    <img
                                        alt="No pending pull requests"
                                        src={noData}
                                        style={{
                                            height: "220px",
                                            width: "250px",
                                        }}
                                    />
                                    <Typography variant="h6">
                                        No{" "}
                                        {filter === "pending"
                                            ? "pending"
                                            : "reviewed"}{" "}
                                        pull requests available
                                    </Typography>
                                </div>
                            )}
                        </List>
                    ) : (
                        <div>
                            {/* Loader component */}
                            <LoadingComponent />
                        </div>
                    )}
                </div>
            </Paper>
            <div>
                {/* Render "Load More" button from the reusable component and use the handler on click */}
                <Pagination handlePageClick={handlePageClick} />
            </div>
        </div>
    );
};

export default RepositoryList;
