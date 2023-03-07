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
import PullRequestRating from "./PullRequestRating";
import PullRequestRatingStars from "./PullRequestRatingStars";

// styles here
const useStyles = makeStyles((theme) => ({
  root: {
    height: "900px",
    maxWidth: "100%",
    backgroundColor: theme.palette.background.paper,
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
    width: "160px",
    margin: "0px 20px",
    backgroundColor: "grey",
    padding: "0px 6px",
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
    display: "flex",
    flexDirection: "row",
    marginTop: theme.spacing(3),
  },
  selectWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
}));

var moment = require("moment");
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
  // Stores selected Pull request
  const [selectedPR, setSelectedPR] = useState(null);
  // Stores the filtered list
  const [filter, setFilter] = useState("pending");

  // Helper functions

  // Gets all pull requests across all repositories
  const getAllPullRequests = async () => {
    try {
      const response = await axios.get(
        // Sends GET request to API to get all pull requests in all repositories
        "http://localhost:8000/management/repositories/allPulls"
      );
      // Sets the state of the pull requests and repositories
      setSelectedPullRequests(filterList(response.data.pullRequests));
      setAllPullRequests(response.data.pullRequests);
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
    let list;
    if (filter === "pending") {
      list = incomingList.filter((item) => !item.ratings || item.ratings == {});
    } else if (filter === "reviewed") {
      list = incomingList.filter((item) => item.ratings);
    }
    return list;
  };

  useEffect(() => {
    getAllPullRequests();
  }, [selectedPR, filter]);

  return (
    <div className={classes.root}>
      <Typography variant="h4">
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
            {selectedPullRequests?.map((pullRequest) => (
              <ListItem
                key={pullRequest._id}
                button
                onClick={() => {
                  if (filter === "pending") setSelectedPR(pullRequest);
                  else return;
                }}
                className={classes.listItem}
              >
                <ListItemText
                  primary={
                    <Typography variant="h6">{pullRequest.title}</Typography>
                  }
                  secondary={
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
                      <PullRequestRatingStars rating={pullRequest.ratings} />
                    </div>
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
