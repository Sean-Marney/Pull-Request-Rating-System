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
    maxWidth: 700,
    margin: "auto",
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
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
  const [selectedRepository, setSelectedRepository] = useState("");
  const [pullRequests, setPullRequests] = useState([]);

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

  // Event handler to show the correct data depending on which repository is selected
  const handleRepositoryChange = (event) => {
    setSelectedRepository(event.target.value);
    getPullRequests(event.target.value);
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

  // Helper function to determine the status of a pull request based on its "merged_at" property
  const getPullRequestStatus = (pullRequest) => {
    if (pullRequest.merged_at) {
      return "Merged"; // Pull request has been merged on GitHub
    } else {
      return "Pending"; // Pull request has been created on GitHub
    }
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
        displayEmpty={true}
      >
        <MenuItem value="" disabled>
          Select a repository
        </MenuItem>
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
                primary={pullRequest.title}
                secondary={`#${pullRequest.number} opened by ${pullRequest.user.login}`}
              />
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
