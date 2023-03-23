import React, { useEffect, useState, useRef } from "react";
import { Paper, Typography, Tooltip, Link, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import StarIcon from "@material-ui/icons/Stars";
import TrophyIcon from "@material-ui/icons/EmojiEvents";
import CalanderIcon from "@material-ui/icons/CalendarToday";
import InfoOutlinedIcon from "@material-ui/icons/Info";
import { useCookies } from "react-cookie";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

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
    wordWrap: "break-word",
    marginLeft: theme.spacing(4),
  },
  boxDescription: {
    paddingTop: theme.spacing(3),
    textAlign: "center",
  },
  boxDescription2: {
    paddingTop: theme.spacing(3),
    color: "#b30000",
    fontWeight: "bold",
    textAlign: "center",
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
    paddingTop: theme.spacing(3),
    overflowY: "scroll",
    maxHeight: "100px",
    color: "black",
  },
  chartContainer: {
    margin: `${theme.spacing(3)}px auto 0`,
    width: `calc(100% - ${theme.spacing(4)}px)`,
    height: "600px",
    borderRadius: 25,
    boxShadow: "0px 0px 12px rgba(0, 0, 0, 0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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

  // Renders all data on page load
  useEffect(() => {
    getUserByEmail();
    getUsersCurrentStarCount();
    getUsersTotalStarsAchieved();
    getUsersLatestPullRequestStatus();
    checkIfUserCanClaimReward();
    getUsersClaimedRewards();
  }, [user]);

  const renderGraph = () => {
    // Rendering chart that shows user how far away they are from being able to claim each reward
    const rewardNames = Object.keys(remainingStarsForEachReward); // Name of reward
    const starsRemaining = Object.values(remainingStarsForEachReward); // Number of stars left before they can claim it

    const chartData = {
      labels: rewardNames,
      datasets: [
        {
          label: "Stars remaining for reward",
          data: starsRemaining,
          backgroundColor: ["#5b9bd5 ", "#FF8A80 "],
          borderColor: "#fff",
          borderWidth: 1,
        },
      ],
    };

    const chartOptions = {
      indexAxis: "y",
      scales: {
        x: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Stars Remaining",
            font: {
              size: 25,
              weight: "bold",
            },
          },
        },
        y: {
          title: {
            display: true,
            text: "Rewards",
            font: {
              size: 25,
              weight: "bold",
            },
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
      },
    };

    return { chartData, chartOptions };
  };

  // Populating with chart data
  const { chartData, chartOptions } = renderGraph();

  // Use email provided by cookie to get the whole user object for the user that is currently logged in
  const getUserByEmail = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/management/users/email/${cookies.user}`
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
        `http://localhost:8000/dashboard/recent-pull-request/${user._id}`
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
      const res = await axios.get("http://localhost:8000/management/rewards");

      // Calculates remaining stars needed for each reward
      const remainingStarsData = {};
      res.data.forEach((reward) => {
        const remainingStars = Math.max(reward.starsRequired - user.stars, 0);
        // remainingStarsData[reward._id] = remainingStars;
        remainingStarsData[reward.rewardName] = remainingStars;
        // If a user has enough stars to claim any reward, they will be informed in the description box of "Current Star Count"
        if (remainingStars === 0) {
          setCanClaimReward(true);
        }
        setRemainingStarsForEachReward(remainingStarsData);
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Gets list of user's claimed rewards
  const getUsersClaimedRewards = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/dashboard/claimed-rewards/${user._id}`
      );
      setClaimedRewards(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes.root}>
      <Box className={classes.content}>
        <Box className={classes.container}>
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
                          This is the number of stars you have available to
                          spend on rewards
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
                  <Typography
                    variant="body1"
                    className={classes.boxDescription2}
                  >
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
                  <Typography
                    variant="body1"
                    className={classes.boxDescription2}
                  >
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
                          This is the status of your most recently submitted
                          pull request on GitHub
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
                  <Typography
                    variant="body1"
                    className={classes.boxDescription}
                  >
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
      </Box>
      <div className={classes.chartContainer}>
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}
