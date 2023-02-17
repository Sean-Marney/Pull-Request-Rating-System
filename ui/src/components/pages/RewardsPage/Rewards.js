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
} from "@material-ui/core";

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

  useEffect(() => {
    getRewards();
  }, []);

  const getRewards = async () => {
    // Get rewards
    const res = await axios.get("http://localhost:8000/management/rewards");

    // Set to state
    setRewards(res.data);
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
