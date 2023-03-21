import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  Button,
  Paper,
} from "@material-ui/core";
import ClaimIcon from "@material-ui/icons/Redeem";
import { useCookies } from "react-cookie";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useStyles } from "../../styles/tableStyle";

export default function Rewards() {
  const classes = useStyles();

  const [cookies] = useCookies();
  const [rewards, setRewards] = useState(null);
  const [stars, setStars] = useState(null);
  const [remainingStarsForReward, setRemainingStarsForReward] = useState({});

  // Gets rewards and stars on page load
  useEffect(() => {
    getRewards();
    getStars();
  });

  const getRewards = async () => {
    // Get rewards
    const res = await axios.get("http://13.49.102.10:8000/management/rewards");

    // Calculates remaining stars needed for reward
    const remainingStarsData = {};
    res.data.forEach((reward) => {
      const remainingStars = Math.max(reward.starsRequired - stars, 0);
      remainingStarsData[reward._id] = remainingStars;
      if (remainingStars === 0) {
        remainingStarsData[reward._id] = "Reward can now be claimed";
      }
    });

    // Set to state
    setRewards(res.data);
    setRemainingStarsForReward(remainingStarsData);
  };

  // Gets user's star count
  const getStars = async () => {
    // Get user object via getUserByEmail method
    const res = await axios.get(
      `http://13.49.102.10:8000/management/users/email/${cookies.user}`
    );

    // Set the star count
    setStars(res.data.stars);
  };

  // Logic for claiming a reward when user clicks "Claim Reward" button
  const claimReward = async (reward) => {
    // Gets user object via getUserByEmail method (uses email stored in cookies)
    const res = await axios.get(
      `http://13.49.102.10:8000/management/users/email/${cookies.user}`
    );
    // Sets response data to user
    const user = res.data;

    // Checks if the user has enough stars to claim the reward
    if (reward.starsRequired <= stars) {
      // Subtracts the cost of the reward from the users star count
      const newStars = stars - reward.starsRequired;

      // Updates user object with their new star count
      await axios.patch(
        `http://13.49.102.10:8000/management/users/update/${user._id}`,
        {
          name: user.name,
          email: user.email,
          password: user.password,
          stars: newStars, // Updated
          totalStarsEarned: user.totalStarsEarned,
        }
      );

      toast.success("Congratulations, you have claimed a reward!");

      // Update star count on page
      getStars();

      // Save reward and user to claimedRewards table with the current date
      const currentDate = moment().format("DD/MM/YYYY, HH:mm:ss");
      await axios.post(
        "http://13.49.102.10:8000/management/rewards/claimed/save",
        {
          rewardId: reward._id,
          rewardName: reward.rewardName,
          userId: user._id,
          userEmail: user.email,
          dateClaimed: currentDate,
        }
      );
    } else {
      console.log("User does not have enough stars to claim the reward");
    }
  };

  return (
    <div className={classes.tableContainer}>
      <ToastContainer />
      <Paper className={classes.paper}>
        <Typography variant="h4">
          <b>Rewards</b>
        </Typography>
        <Box>
          <Typography className={classes.starCountBox}>
            <b>You have {stars} stars</b>
          </Typography>
        </Box>
        <Box>
          {/* Get all rewards from database and display in a table */}
          {rewards && (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.tableHeaders}>
                      <b>Name</b>
                    </TableCell>
                    <TableCell className={classes.tableHeaders}>
                      <b>Stars Required</b>
                    </TableCell>
                    <TableCell className={classes.tableHeaders}>
                      <b>Stars Remaining</b>
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rewards.map((reward) => (
                    <TableRow key={reward._id}>
                      <TableCell className={classes.tableContent}>
                        {reward.rewardName}
                      </TableCell>
                      <TableCell className={classes.tableContent}>
                        {reward.starsRequired} <br />
                      </TableCell>
                      <TableCell className={classes.tableContent}>
                        {remainingStarsForReward[reward._id]}
                      </TableCell>
                      <TableCell>
                        <Button
                          onClick={() => claimReward(reward)}
                          // Disable button if user doesn't have enough stars to claim reward
                          disabled={reward.starsRequired > stars}
                          variant="contained"
                          color="primary"
                          startIcon={<ClaimIcon />}
                        >
                          Claim Reward
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </Paper>
    </div>
  );
}
