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

const RepositoryList = () => {
  const classes = useStyles();

  const [repositories, setRepositories] = useState([]);
  const [selectedRepository, setSelectedRepository] = useState();
  const [pullRequests, setPullRequests] = useState([]);

  // Gets pull requests for a given repository
  const getPullRequests = async (repositoryName) => {
    // Requires access token (generated on GitHub) as it's a private repository
    const token = "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";
    // Access token is inserted into the header
    const headers = {
      Authorization: `Token ${token}`,
    };

    // Calls GitHub API to get pull requests from a repository
    try {
      const response = await axios.get(
        // pulls?state=all ensures that all pull requests are retrieved, even ones that have been merged
        `https://api.github.com/repos/${repositoryName}/pulls?state=all`,
        { headers }
      );
      setPullRequests(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Gets all pull requests across all repositories
  const getAllPullRequests = async () => {
    try {
      const response = await axios.get(
        // Sends GET request to API to get all pull requests in all repositories
        "http://localhost:8000/management/repositories/allPulls"
      );
      setPullRequests(response.data);
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
      getAllPullRequests();
      // Else, show pull requests for the repository that they click
    } else {
      getPullRequests(value);
    }
  };

  useEffect(() => {
    async function getRepositories() {
      // Sends GET request to API to get all repositories
      try {
        const response = await axios.get(
          "http://localhost:8000/management/repositories"
        );
        // Sets to state
        setRepositories(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    getRepositories();
  }, []);

  // Event handler to navigate to GitHub page for a specific pull request when user clicks the pull request
  const handlePullRequestClick = (pullRequestUrl) => {
    window.open(pullRequestUrl, "_blank");
  };

  // Event handler to get all pull requests from all repositories when user selects "All Pull Requests"
  const handleAllPullRequestsClick = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/management/repositories/allPulls"
      );
      setPullRequests(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Helper function to determine the status of a pull request based on its "merged_at" property
  const getPullRequestStatus = (pullRequest) => {
    if (pullRequest.merged_at) {
      return "Merged"; // Pull request has been merged on GitHub
    } else {
      return "Pending"; // Pull request has been created on GitHub
    }
  };

  // When the page loads, it will call this function so that all pull requests are displayed by default
  useEffect(() => {
    handleAllPullRequestsClick();
  }, []);

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
        <MenuItem value="all" onClick={handleAllPullRequestsClick}>
          All Pull Requests
        </MenuItem>
        {/* Displays all pull requests in the selected repository */}
        {repositories.map((repository) => (
          <MenuItem key={repository.id} value={repository.full_name}>
            {repository.name}
          </MenuItem>
        ))}
      </Select>
      {pullRequests.length > 0 && (
        <List>
          {pullRequests.map((pullRequest) => (
            <ListItem
              key={pullRequest.id}
              button
              onClick={() => handlePullRequestClick(pullRequest.html_url)}
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
                      {`Pull Request #${pullRequest.number} from ${pullRequest.base.repo.name}`}
                    </Typography>
                    <br />
                    <Typography
                      component="span"
                      variant="body2"
                      color="textSecondary"
                    >
                      {`Created by ${pullRequest.user.login}`}
                    </Typography>
                    <br />
                    <Typography
                      component="span"
                      variant="body2"
                      color="textSecondary"
                    >
                      {`${pullRequest.created_at}`}
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
