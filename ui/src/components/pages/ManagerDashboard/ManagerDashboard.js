import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Typography, Tooltip, Box } from "@material-ui/core";
import InfoOutlinedIcon from "@material-ui/icons/Info";
import NotificationIcon from "@material-ui/icons/Notifications";
import RedeemIcon from "@material-ui/icons/Redeem";

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
    color: "#ff6666",
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
}));

export default function ManagerDashboard() {
  const classes = useStyles();
  const [hoveredBox, setHoveredBox] = useState(null); // Keeps track of if the user is hovering over a box

  const [numberOfPendingPullRequests, setNumberOfPendingPullRequests] =
    useState(null); // Number of pull requests that have not been reviewed
  const [numberOfClaimedRewards, setNumberOfClaimedRewards] = useState(null); // Number of claimed rewards that are not archived
  const [claimedRewards, setClaimedRewards] = useState(null); // List of claimed rewards that are not archived

  useEffect(() => {
    getNumberOfPendingPullRequests();
    getNumberOfClaimedRewards();
    getClaimedRewards();
  });

  // Calls controller method to get the number of pending pull requests
  const getNumberOfPendingPullRequests = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/management/dashboard/get-number-of-pending-pull-requests"
      );

      // Set to state
      setNumberOfPendingPullRequests(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Calls controller method to get the number of claimed rewards that are not archived
  const getNumberOfClaimedRewards = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/management/dashboard/get-number-of-claimed-rewards"
      );

      // Set to state
      setNumberOfClaimedRewards(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Calls controller method to get list of claimed rewards that are not archived
  const getClaimedRewards = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/management/dashboard/get-claimed-rewards"
      );

      // Set to state
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
              onMouseEnter={() => setHoveredBox("pendingPullRequests")}
              onMouseLeave={() => setHoveredBox(null)}
            >
              <NotificationIcon className={classes.icon1} />
              <Typography variant="h6" className={classes.boxTitle}>
                Pending Pull Requests
              </Typography>
              <Typography variant="h4" className={classes.boxValue}>
                {numberOfPendingPullRequests}
                <Tooltip
                  // Description box appears when user hovers over info icon
                  title={
                    <div className={classes.infoBox}>
                      <Typography variant="body2">
                        This is the number of pending pull requests currently on
                        the system
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
              {hoveredBox === "pendingPullRequests" && (
                <Typography variant="body1" className={classes.boxDescription2}>
                  {/* If there are pending pull requests on the system: */}
                  {numberOfPendingPullRequests > 0 ? (
                    <>
                      <p>
                        There are pending pull requests that need to be reviewed
                      </p>
                      <br />
                      <a href="http://localhost:3000/management/repositories">
                        Click here to view them
                      </a>
                    </>
                  ) : (
                    // If there are no pending pull requests on the system:
                    <p>
                      There are currently no pull requests that need to be
                      reviewed.
                    </p>
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
              onMouseEnter={() => setHoveredBox("claimedRewards")}
              onMouseLeave={() => setHoveredBox(null)}
            >
              <RedeemIcon className={classes.icon2} />
              <Typography variant="h6" className={classes.boxTitle}>
                Claimed Rewards
              </Typography>
              <Typography variant="h4" className={classes.boxValue}>
                {numberOfClaimedRewards}
                <Tooltip
                  // Description box appears when user hovers over info icon
                  title={
                    <div className={classes.infoBox}>
                      <Typography variant="body2">
                        These are the claimed rewards that need to be given to
                        to the developers.
                        <br /> <br />
                        Once the reward has been given out, make sure to archive
                        it.
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
              {hoveredBox === "claimedRewards" && (
                <Typography variant="body1" className={classes.boxDescription2}>
                  Claimed Rewards To Give Out:
                  <Typography className={classes.scrollbox}>
                    {claimedRewards &&
                      claimedRewards.map((reward, index) => (
                        <div key={index}>
                          <Typography variant="h6">
                            {reward.reward_name} - {reward.user_email}
                          </Typography>
                        </div>
                      ))}
                  </Typography>
                  <br />
                  <a href="http://localhost:3000/management/rewards/claimed">
                    Click here to view the claimed rewards
                  </a>
                </Typography>
              )}
            </Paper>
          </div>

          <div>
            <Paper
              elevation={3}
              className={classes.box}
              // More information is displayed when user hovers over box
              onMouseEnter={() => setHoveredBox("changeMe")}
              onMouseLeave={() => setHoveredBox(null)}
            >
              {/* <StarIcon className={classes.icon1} /> */}
              <Typography variant="h6" className={classes.boxTitle}>
                Title
              </Typography>
              <Typography variant="h4" className={classes.boxValue}>
                X
                <Tooltip
                  // Description box appears when user hovers over info icon
                  title={
                    <div className={classes.infoBox}>
                      <Typography variant="body2">
                        This is a description
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
                  Description
                </Typography>
              )}
            </Paper>
          </div>
        </div>
      </Box>
    </div>
  );
}
