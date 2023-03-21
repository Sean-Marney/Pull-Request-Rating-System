import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  Paper,
} from "@material-ui/core";
import { useStyles } from "../../styles/tableStyle";

export default function ArchivedRewards() {
  const classes = useStyles();

  const [claimedRewards, setClaimedRewards] = useState(null);

  // Gets claimed rewards on page load
  useEffect(() => {
    getClaimedRewards();
  });

  const getClaimedRewards = async () => {
    // Get claimed rewards
    const res = await axios.get(
      "http://13.49.102.10:8000/management/rewards/claimed/get"
    );

    // Filter results so that it only displays rewards that have been archived
    const archivedRewards = res.data.filter((reward) => reward.archived);

    // Set to state
    setClaimedRewards(archivedRewards);
  };

  return (
    <div className={classes.tableContainer}>
      <Paper className={classes.paper}>
        <Box padding={3}>
          <Typography variant="h4" className={classes.title}>
            <b>Archived Rewards</b>
          </Typography>
        </Box>
        <Box>
          {/* Get all claimed rewards from database and display the ones that have been archived */}
          {claimedRewards && (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.tableHeaders}>
                      <b>Reward</b>
                    </TableCell>
                    <TableCell className={classes.tableHeaders}>
                      <b>User</b>
                    </TableCell>
                    <TableCell className={classes.tableHeaders}>
                      <b>Claimed At</b>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {claimedRewards.map((claimedReward) => (
                    <TableRow key={claimedReward._id}>
                      <TableCell className={classes.tableContent}>
                        {claimedReward.reward_name}
                      </TableCell>
                      <TableCell className={classes.tableContent}>
                        {claimedReward.user_email} <br />
                      </TableCell>
                      <TableCell className={classes.tableContent}>
                        {claimedReward.date_claimed} <br />
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
