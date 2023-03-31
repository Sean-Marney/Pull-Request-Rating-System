import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Typography, Tooltip, Link, Box } from "@material-ui/core";
import StarIcon from "@material-ui/icons/Stars";
import TrophyIcon from "@material-ui/icons/EmojiEvents";
import CalanderIcon from "@material-ui/icons/CalendarToday";
import InfoOutlinedIcon from "@material-ui/icons/Info";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  title: {
    marginBottom: theme.spacing(3),
    fontWeight: 600,
  },
  boxContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  box: {
    backgroundColor: "#e6e6e6",
    height: "auto",
    flexShrink: 0,
    width: `calc((65vw - ${theme.spacing(6)}px) / 3)`,
    margin: theme.spacing(1),
    padding: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    boxShadow: "0px 0px 12px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease-in-out",
    "&:hover": {
      transform: "scale(1.05)",
      boxShadow: "0px 0px 12px rgba(0, 0, 0, 0.5)",
    },
  },
  boxTitle: {
    marginBottom: theme.spacing(1),
    fontWeight: 600,
    textAlign: "center",
  },
  boxValue: {
    fontSize: "2rem",
    fontWeight: 700,
    textAlign: "center",
    marginLeft: theme.spacing(4),
    wordBreak: "break-word",
  },
  boxDescription: {
    paddingTop: theme.spacing(3),
    textAlign: "center",
    wordBreak: "break-word",
  },
  boxDescription2: {
    paddingTop: theme.spacing(3),
    color: "#b30000",
    fontWeight: "bold",
    textAlign: "center",
    wordBreak: "break-word",
  },
  icon1: {
    paddingBottom: theme.spacing(1.5),
    fontSize: "2.5rem",
    color: "#E6C200",
  },
  icon2: {
    paddingBottom: theme.spacing(1.5),
    fontSize: "2.5rem",
    color: "#A97142",
  },
  icon3: {
    paddingBottom: theme.spacing(1.5),
    fontSize: "2.5rem",
    color: "#809fff",
  },
  infoIcon: {
    marginLeft: theme.spacing(2),
    cursor: "default",
    color: "#2196f3",
    transition: "opacity 0.3s ease-in-out",
    "&:hover": {
      opacity: 0.8,
    },
  },
  infoBox: {
    padding: theme.spacing(2),
  },
  scrollbox: {
    overflowY: "scroll",
    maxHeight: "100px",
    color: "black",
  },
  rewardName: {
    marginBottom: theme.spacing(1),
    fontWeight: "bold",
  },
  progressContainer: {
    width: "100%",
    height: "10px",
    borderRadius: "5px",
    backgroundColor: theme.palette.grey[300],
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: theme.palette.primary.main,
  },
  progressText: {
    marginTop: theme.spacing(1),
  },
}));

export default function DeveloperDashboard() {
  const classes = useStyles();
  const [hoveredBox, setHoveredBox] = useState(null); // Keeps track of if the user is hovering over a box

  const [cookies] = useCookies(); // Stores the email of the currently logged in user
  const [user, setUser] = useState(null); // User object, obtained from useCookies
  const [currentStarCount, setCurrentStarCount] = useState(null); // Value in user's "stars" field
  const [totalStarsAchieved, setTotalStarsAchieved] = useState(null); // Value in user's "totalStarsEarned" field
  const [latestPullRequest, setLatestPullRequest] = useState(null); // User's most recent pull request object
  const [latestPullRequestStatus, setLatestPullRequestStatus] = useState(null); // Whether pull request is "Pending" or "Reviewed"
  const [canClaimReward, setCanClaimReward] = useState(false); // Tracks whether user has enough stars to claim any rewards
  const [claimedRewards, setClaimedRewards] = useState(null); // List of user's claimed rewards
  const [remainingStarsForEachReward, setRemainingStarsForEachReward] =
    useState([]);
  const [starsRequiredForEachReward, setStarsRequiredForEachReward] = useState(
    []
  );

  const rewardNames = Object.keys(remainingStarsForEachReward); // Name of reward
  const starsRemaining = Object.values(remainingStarsForEachReward); // Number of stars left before they can claim it

  // Renders all data on page load
  useEffect(() => {
    getUserByEmail();
    getUsersCurrentStarCount();
    getUsersTotalStarsAchieved();
    getUsersLatestPullRequestStatus();
    checkIfUserCanClaimReward();
    getUsersClaimedRewards();
  }, [user]);

  // Use email provided by cookie to get the whole user object for the user that is currently logged in
  const getUserByEmail = async () => {
    try {
      const res = await axios.get(
        process.env.REACT_APP_API_ENDPOINT + `/management/users/email/${cookies.user}`
      );
      // Set user object to state
      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Gets user's current star count
  const getUsersCurrentStarCount = async () => {
    try {
      setCurrentStarCount(user.stars);
    } catch (error) {
      console.log(error);
    }
  };

  // Gets user's total star count
  const getUsersTotalStarsAchieved = async () => {
    try {
      setTotalStarsAchieved(user.totalStarsEarned);
    } catch (error) {
      console.log(error);
    }
  };

  // Gets status of user's most recent pull request
  const getUsersLatestPullRequestStatus = async () => {
    try {
      // Passes userId of currently logged in user to my API which gets their most recent pull request
      const res = await axios.get(
        process.env.REACT_APP_API_ENDPOINT +`/dashboard/recent-pull-request/${user._id}`
      );

      // Condition for if the user has not got a pull request stored in our database
      if (!res.data) {
        // If the user has no pull requests linked to their account, set the title and repo to "N/A" and the status to "No Pull Requets"
        setLatestPullRequest({
          title: "N/A",
          repo: "N/A",
          url: "",
        });
        setLatestPullRequestStatus("N/A");
        return;
      }

      // Storing pull request to state so more information can be displayed in the description
      setLatestPullRequest(res.data);

      if (latestPullRequest.rating_complete === true) {
        // If the "rating_complete" value is true, this means the pull request has been reviewed
        setLatestPullRequestStatus("Reviewed");
      } else if (latestPullRequest.rating_complete === false) {
        // If the "rating_complete" value is false, this means the pull request is pending a review
        setLatestPullRequestStatus("Pending");
      } else {
        // Else, user has no pull requests in our system
        setLatestPullRequestStatus("You Have No Pull Requests");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Checks if user has enough stars to claim any rewards
  const checkIfUserCanClaimReward = async () => {
    try {
      // Get rewards
      const res = await axios.get(process.env.REACT_APP_API_ENDPOINT +"/management/rewards");

      // Calculates remaining stars needed for each reward
      const remainingStarsData = {};
      const starsRequiredData = [];
      res.data.forEach((reward) => {
        const remainingStars = Math.max(reward.starsRequired - user.stars, 0);
        remainingStarsData[reward.rewardName] = remainingStars;
        // If a user has enough stars to claim any reward, they will be informed in the description box of "Current Star Count"
        if (remainingStars === 0) {
          setCanClaimReward(true);
        }
        starsRequiredData.push(reward.starsRequired);
      });
      // Data to be used to render the progress bars
      setRemainingStarsForEachReward(remainingStarsData);
      setStarsRequiredForEachReward(starsRequiredData);
    } catch (error) {
      console.log(error);
    }
  };

  // Gets list of user's claimed rewards
  const getUsersClaimedRewards = async () => {
    try {
      const res = await axios.get(
        process.env.REACT_APP_API_ENDPOINT +`/dashboard/claimed-rewards/${user._id}`
      );
      setClaimedRewards(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes.root}>
      <Box>
        <Typography variant="h4" className={classes.title}>
          Dashboard
        </Typography>
        <div className={classes.boxContainer}>
          <div>
            <Paper
              elevation={3}
              className={classes.box}
              // More information is displayed when user hovers over box
              onMouseEnter={() => setHoveredBox("currentStarCount")}
              onMouseLeave={() => setHoveredBox(null)}
            >
              <StarIcon className={classes.icon1} />
              <Typography variant="h6" className={classes.boxTitle}>
                Current Star Count
              </Typography>
              <Typography variant="h4" className={classes.boxValue}>
                {currentStarCount}
                <Tooltip
                  // Description box appears when user hovers over info icon
                  title={
                    <div className={classes.infoBox}>
                      <Typography variant="body2">
                        This is the number of stars you have available to spend
                        on rewards
                        <br /> <br />
                        Visit the rewards page to claim a reward
                      </Typography>
                    </div>
                  }
                  placement="right"
                >
                  <span className={classes.infoIcon}>
                    <InfoOutlinedIcon />
                  </span>
                </Tooltip>
              </Typography>
              {/* Content displayed when hovering */}
              {hoveredBox === "currentStarCount" && (
                <Typography variant="body1" className={classes.boxDescription2}>
                  {/* If user has enough stars to claim any rewards: */}
                  {canClaimReward ? (
                    <>
                      <p>You have available rewards to claim</p> <br />
                      <a href="http://localhost:3000/rewards">
                        Click here to claim
                      </a>
                    </>
                  ) : (
                    // If user doesn't have enough stars to claim any rewards:
                    <p>You do not have enough stars to claim a reward.</p>
                  )}
                </Typography>
              )}
            </Paper>
          </div>

          <div>
            <Paper
              elevation={3}
              className={classes.box}
              // More information is displayed when user hovers over box
              onMouseEnter={() => setHoveredBox("totalStarsAchieved")}
              onMouseLeave={() => setHoveredBox(null)}
            >
              <TrophyIcon className={classes.icon2} />
              <Typography variant="h6" className={classes.boxTitle}>
                Total Stars Achieved
              </Typography>
              <Typography variant="h4" className={classes.boxValue}>
                {totalStarsAchieved}
                <Tooltip
                  // Description box appears when user hovers over info icon
                  title={
                    <div className={classes.infoBox}>
                      <Typography variant="body2">
                        This is the number of stars you have achieved in total
                        <br /> <br />
                        Your manager can view your total stars on their
                        leaderboard page
                      </Typography>
                    </div>
                  }
                  placement="right"
                >
                  <span className={classes.infoIcon}>
                    <InfoOutlinedIcon />
                  </span>
                </Tooltip>
              </Typography>
              {/* Content displayed when hovering */}
              {hoveredBox === "totalStarsAchieved" && (
                <Typography variant="body1" className={classes.boxDescription2}>
                  Claimed Rewards:
                  <Typography className={classes.scrollbox}>
                    {claimedRewards &&
                      claimedRewards.map((reward, index) => (
                        <div key={index}>
                          <Typography variant="h6">
                            {reward.reward_name}
                          </Typography>
                        </div>
                      ))}
                  </Typography>
                </Typography>
              )}
            </Paper>
          </div>

          <div>
            <Paper
              elevation={3}
              className={classes.box}
              // More information is displayed when user hovers over box
              onMouseEnter={() => setHoveredBox("latestPullRequestStatus")}
              onMouseLeave={() => setHoveredBox(null)}
            >
              <CalanderIcon className={classes.icon3} />
              <Typography variant="h6" className={classes.boxTitle}>
                Latest Pull Request
              </Typography>
              <Typography variant="h4" className={classes.boxValue}>
                {latestPullRequestStatus}
                <Tooltip
                  // Description box appears when user hovers over info icon
                  title={
                    <div className={classes.infoBox}>
                      <Typography variant="body2">
                        This is the status of your most recently submitted pull
                        request on GitHub
                        <br /> <br />
                        It will display a status of 'Reviewed' if your pull
                        request has been rated, or 'Pending' if it hasn't been
                        rated yet
                      </Typography>
                    </div>
                  }
                  placement="right"
                >
                  <span className={classes.infoIcon}>
                    <InfoOutlinedIcon />
                  </span>
                </Tooltip>
              </Typography>
              {/* Content displayed when hovering */}
              {hoveredBox === "latestPullRequestStatus" && (
                <Typography variant="body1" className={classes.boxDescription}>
                  {latestPullRequest ? (
                    <Link
                      href={latestPullRequest.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View pull request on GitHub
                    </Link>
                  ) : (
                    <Typography>"No pull requests"</Typography>
                  )}
                  <Typography
                    variant="body1"
                    className={classes.boxDescription}
                  >
                    <b>Pull Request:</b> {latestPullRequest.title}
                  </Typography>
                  <Typography>
                    <b>From Repository:</b> {latestPullRequest.repo}
                  </Typography>
                  <i>
                    <Typography className={classes.boxDescription2}>
                      {latestPullRequest.rating_complete
                        ? "You earned " +
                          latestPullRequest.ratings.overall +
                          " stars from this pull request"
                        : "Pull request has not been reviewed yet"}
                    </Typography>
                  </i>
                </Typography>
              )}
            </Paper>
          </div>
        </div>
      </Box>

      {/* Render progress bars */}
      <div role="progressbar" className={classes.root}>
        {/* Loop through each reward */}
        {rewardNames.map((rewardName, index) => {
          // Set proress towards rewards based on stars required and how many stars the user has remaining
          const starsRequired = starsRequiredForEachReward[index];
          const progress = (
            ((starsRequired - starsRemaining[index]) / starsRequired) *
            100
          ).toFixed(2);

          return (
            <div key={rewardName}>
              <Typography variant="h6" className={classes.rewardName}>
                {rewardName}
              </Typography>
              <div className={classes.progressContainer}>
                <div
                  className={classes.progressBar}
                  style={{ width: `${progress}%` }}
                />
              </div>
              <Typography variant="body2" className={classes.progressText}>
                {progress}% complete ({starsRemaining[index]} out of{" "}
                {starsRequired} stars remaining)
              </Typography>
            </div>
          );
        })}
      </div>
    </div>
  );
}
