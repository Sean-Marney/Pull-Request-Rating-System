import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Select,
  Typography,
  MenuItem,
  Chip,
  makeStyles,
} from "@material-ui/core";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "900px",
    maxWidth: "100%",
    backgroundColor: theme.palette.background.paper,
    overflow: "auto",
  },
  select: {
    minWidth: "300px",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    fontSize: "20px",
    textAlign: "center",
  },
  listItem: {
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#f5f5f5",
    },
  },
  chip: {
    marginLeft: "auto",
  },
}));

var moment = require('moment');  
moment().format();

const RepositoryList = () => {
  const classes = useStyles();
  // Stores all the repositories
  const [repositories, setRepositories] = useState([]);
  // Stores selected repository
  const [selectedRepository, setSelectedRepository] = useState();
  // Stores all the Pull Requests
  const [allPullRequests, setAllPullRequests] = useState([]);
  // Stores selected repository's pull requests
  const [selectedPullRequests, setSelectedPullRequests] = useState([]);

  // Gets all pull requests across all repositories
  const getAllPullRequests = async () => {
    try {
      const response = await axios.get(
        // Sends GET request to API to get all pull requests in all repositories
        "http://localhost:8000/management/repositories/allPulls"
      );
      // Sets the state of the pull requests and repositories
      setSelectedPullRequests(response.data.pullRequests);
      setAllPullRequests(response.data.pullRequests);
      setRepositories(response.data.repos);
    } catch (error) {
      console.error(error);
    }
  };

  // Event handler to show the correct data depending on which repository is selected
  const handleRepositoryChange = (event) => {
    const value = event.target.value;
    setSelectedRepository(value);
    if (value === "all") {
      // If user clicks "All Pull Requests" (has "all" value), display all pull requests across all repositories
      setSelectedPullRequests(allPullRequests);
      // Else, show pull requests for the repository that they click
    } else {
      let filteredPullRequests = allPullRequests.filter((pullRequest) => pullRequest.repo === value);
      setSelectedPullRequests(filteredPullRequests);
    }
  };

  useEffect(() => {
    getAllPullRequests();
  }, []);

  // Event handler to navigate to GitHub page for a specific pull request when user clicks the pull request
  const handlePullRequestClick = (pullRequestUrl) => {
    window.open(pullRequestUrl, "_blank");
  };


  // Helper function to determine the status of a pull request based on its "merged_at" property
  const getPullRequestStatus = (pullRequest) => {
    return "Merged";
    // if (pullRequest.merged_at) {
    //   return "Merged"; // Pull request has been merged on GitHub
    // } else {
    //   return "Pending"; // Pull request has been created on GitHub
    // }
  };

  return (
    <div className={classes.root}>
      <Typography variant="h4">
        <b>Pull Requests</b>
      </Typography>
      <Select
        className={classes.select}
        value={selectedRepository}
        onChange={handleRepositoryChange}
        defaultValue="all"
      >
        <MenuItem value="all">
          All Pull Requests
        </MenuItem>
        {/* Displays all pull requests in the selected repository */}
        {repositories.map((repository) => (
          <MenuItem key={repository.id} value={repository.name}>
            {repository.name}
          </MenuItem>
        ))}
      </Select>
      {selectedPullRequests.length > 0 && (
        <List>
          {selectedPullRequests.map((pullRequest) => (
            <ListItem
              key={pullRequest._id}
              button
              onClick={() => handlePullRequestClick(pullRequest.url)}
              className={classes.listItem}
            >
              <ListItemText
                primary={
                  <Typography variant="h6">{pullRequest.title}</Typography>
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
                      {moment(pullRequest.date).format('DD/MM/YYYY  HH:mm:ss')}
                    </Typography>
                  </>
                }
              />
              {/* Tag tells user if pull request is "Merged" or "Pending" */}
              <Chip
                className={classes.chip}
                label={getPullRequestStatus(pullRequest)}
                color={
                  getPullRequestStatus(pullRequest) === "Pending"
                    ? "secondary"
                    : "primary"
                }
              />
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

export default RepositoryList;
