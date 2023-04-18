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
import { Skeleton } from "@mui/material";
import Modal from "@mui/material/Modal";
import PullRequestRating from "./PullRequestRating";
import PullRequestRatingStars from "./PullRequestRatingStars";
import useAxiosInstance from "../../../useAxiosInstance";
import { useStyles } from "../../styles/Repositories/RepositoryStyle";
import noData from "../../../assets/images/NoData.png";
import Pagination from "../../reusable/Pagination";

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

  const filterList = (incomingList) => {
    let list;
    if (filter === "pending") {
      list = incomingList.filter((item) => !item.ratings || item.ratings == {});
    } else if (filter === "reviewed") {
      list = incomingList.filter((item) => item.ratings);
    }
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

      setSelectedPR(null);
      getAllPullRequests();
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getAllPullRequests();
  }, [filter]);

  // Handling "Load More" click
  const handlePageClick = () => {
    setVisible((preValue) => preValue + 10);
  };

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
          setLoading={setLoading}
          loading={loading}
          pullRequest={selectedPR}
          setSelectedPR={setSelectedPR}
          reloadList={getAllPullRequests}
          handleSubmit={handleSubmitClick}
        />
      </Modal>
      <Paper className={classes.paper}>
        <Typography variant="h4" className={classes.title}>
          <b>Pull Requests Rating</b>
        </Typography>

        <div className={classes.selectContainer}>
          <div className={classes.selectWrapper}>
            <label style={{ fontWeight: "bold" }}> Filter by Repository</label>
            <Select
              className={classes.select}
              value={selectedRepository}
              onChange={handleRepositoryChange}
              defaultValue="all"
            >
              <MenuItem value="all">All Pull Requests</MenuItem>
              {repositories?.map((repository) => (
                <MenuItem key={repository.id} value={repository.name}>
                  {repository.name}
                </MenuItem>
              ))}
            </Select>
          </div>
          <div className={classes.selectWrapper}>
            <label style={{ fontWeight: "bold" }}> Filter by Status</label>
            <Select
              className={classes.select}
              value={filter}
              onChange={(event) => {
                setFilter(event.target.value);
                if (event.target.value === "reviewed") setSelectedPR(null);
              }}
              defaultValue="pending"
            >
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="reviewed">Reviewed</MenuItem>
            </Select>
          </div>
        </div>
        <div className={classes.container}>
          {!loading ? (
            <List>
              {selectedPullRequests.length > 0 ? (
                selectedPullRequests?.slice(0, visible).map((pullRequest) => (
                  <ListItem key={pullRequest._id} className={classes.listItem}>
                    <ListItemText
                      primary={
                        <Typography variant="h6">
                          {pullRequest.title}
                        </Typography>
                      }
                      secondary={
                        <div className={classes.positionElements}>
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
                              {moment(pullRequest.date).format(
                                "DD/MM/YYYY  HH:mm:ss"
                              )}
                            </Typography>
                            <br />
                          </div>
                          <br />

                          <PullRequestRatingStars
                            rating={pullRequest.ratings}
                          />
                          <br />
                          <div className={classes.buttonContainer}>
                            <Button
                              onClick={() =>
                                handleGitHubLinkClick(pullRequest.url)
                              }
                              variant="contained"
                              size="medium"
                            >
                              GitHub Link
                            </Button>
                            {filter === "pending" && (
                              <Button
                                onClick={() => {
                                  if (filter === "pending")
                                    setSelectedPR(pullRequest);
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
                    padding: "auto",
                    margin: "auto",
                  }}
                >
                  <img
                    alt="No pending pull requests"
                    src={noData}
                    style={{ height: "220px", width: "250px" }}
                  />
                  <Typography variant="h6">
                    No pending pull requests available
                  </Typography>
                </div>
              )}
            </List>
          ) : (
            <div>
              <Skeleton
                variant="rectangular"
                width={1000}
                height={145}
                style={{ margin: "8px 0px" }}
              />
              <Skeleton
                variant="rectangular"
                width={1000}
                height={145}
                style={{ margin: "8px 0px" }}
              />
              <Skeleton
                variant="rectangular"
                width={1000}
                height={145}
                style={{ margin: "8px 0px" }}
              />
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
