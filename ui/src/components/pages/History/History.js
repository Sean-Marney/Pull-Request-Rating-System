import React, { useEffect, useState } from "react";
import axios from "axios";
import { Ratings } from "./Ratings";
import { PullRequestHistory } from "../History/PullRequestHistory";
import { useCookies } from "react-cookie";
import { Typography, Box, Grid, Card, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  clickable: {
    cursor: "pointer",
    "margin-bottom": "20px",
  },
  padding: {
    "background-color": "#f5f5f5",
    padding: theme.spacing(2),
  },
  height: {
    height: "40vh",
  },
}));

function App() {
  const classes = useStyles();

  const [pullRequests, setPullRequests] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [rated, setRated] = useState();
  const [selected, setSelected] = useState();
  const [cookies] = useCookies();

  useEffect(() => {
    getPullRequests();
    setRated("blank");
  }, []);

  // Gets the Pull Requests through calling api backend
  // TODO: Integrate with ID of user who is logged in
  const getPullRequests = async () => {
    let email = cookies.user;
    const res = await axios.get(
      process.env.REACT_APP_API_ENDPOINT +
        "/pullrequests/history/" +
        email.toLowerCase()
    );
    setPullRequests(res.data);
  };

  // Handles the selection of a pull request
  // Changes the background color of the selected pull request
  // Displays the ratings
  function handleSelection(rated, ratings, id) {
    try {
      let newRequest = document.getElementById(id);
      if (newRequest) {
        newRequest.style.background = "#C9C5C5";
      }
      let oldRequest = document.getElementById(selected);
      if (oldRequest) {
        oldRequest.style.background = "#ffffff";
      }
    } catch (err) {
      console.log(err);
    }
    setSelected(id);
    setRated(rated);
    setRatings(ratings);
  }

  return (
    <div className="App">
      <Box padding={3}>
        <Typography variant="h4" style={{ margin: "30px" }}>
          <b>History</b>
        </Typography>
      </Box>
      <Grid container spacing={0} className={classes.container}>
        {/* Section to display the pull requests */}
        <Grid
          item
          xs={6}
          className={classes.padding}
          variant="outlined"
          style={{ maxHeight: "80vh", overflow: "auto" }}
        >
          {pullRequests.map((pullRequest) => {
            return (
              <Card
                id={pullRequest._id}
                className={classes.clickable}
                onClick={() =>
                  handleSelection(
                    pullRequest.rating_complete,
                    pullRequest.ratings,
                    pullRequest._id
                  )
                }
              >
                <PullRequestHistory
                  key={pullRequest._id}
                  pullRequest={pullRequest}
                />
              </Card>
            );
          })}
        </Grid>
        {/* Section to display the ratings */}
        <Grid item xs={6} className={classes.padding}>
          <Card className={classes.height}>
            <Ratings ratings={ratings} rated={rated} />
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
