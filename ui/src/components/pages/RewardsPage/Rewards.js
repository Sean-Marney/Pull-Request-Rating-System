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
} from "@material-ui/core";
import { useCookies } from "react-cookie";

const useStyles = makeStyles((theme) => ({
  table: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(2),
    boxShadow: theme.shadows[20],
    paddingBottom: theme.spacing(0),
    borderRadius: "20px",
  },
  tableContainer: {
    paddingLeft: theme.spacing(50),
    paddingRight: theme.spacing(50),
  },
  tableHeaders: {
    fontSize: "25px",
    textAlign: "center",
  },
  tableContent: {
    fontSize: "20px",
    textAlign: "center",
  },
}));

export default function ManageRewards() {
  const classes = useStyles();
  const [rewards, setRewards] = useState(null);
  const [cookies] = useCookies();

  useEffect(() => {
    getRewards();
  }, []);

  const getRewards = async () => {
    // Get rewards
    const res = await axios.get("http://localhost:8000/management/rewards");

    // Set to state
    setRewards(res.data);
  };

  // Logic for claiming a reward when user clicks "Claim Reward" button
  const claimReward = async (reward) => {
    // Gets email of currently logged in user
    const email = cookies.user.email;

    // Gets user object via getUserByEmail method
    const res = await axios.get(
      `http://localhost:8000/management/users/email/${email}`
    );
    // Sets response data to user
    const user = res.data;

    // Checks if the user has enough stars to claim the reward
    if (user.stars >= reward.starsRequired) {
      // Subtracts the cost of the reward from the users star count
      const newStars = user.stars - reward.starsRequired;

      // Updates user object with their new star count
      await axios.patch(
        `http://localhost:8000/management/users/update/${user._id}`,
        {
          name: user.name,
          email: user.email,
          password: user.password,
          stars: newStars, // Updated
        }
      );

      getRewards();

      console.log(user);
    } else {
      console.log("Sorry, you don't have enough stars to claim this reward.");
    }
  };
  return (
    <div className={classes.tableContainer}>
      <Box padding={3}>
        <Typography variant="h4">
          <b>Rewards</b>
        </Typography>
      </Box>
      <Box>
        {/* Get all rewards from database and display in a table */}
        {rewards && (
          <TableContainer className={classes.table}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tableHeaders}>
                    <b>Name</b>
                  </TableCell>
                  <TableCell className={classes.tableHeaders}>
                    <b>Stars Required</b>
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
                      {reward.starsRequired}
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => claimReward(reward)}
                        variant="contained"
                        color="primary"
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
    </div>
  );
}
