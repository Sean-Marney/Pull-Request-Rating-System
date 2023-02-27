import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
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
import ArchiveIcon from "@material-ui/icons/Archive";
import FolderIcon from "@material-ui/icons/Folder";

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
  starCountBox: {
    textAlign: "center",
    fontSize: "20px",
    color: "#b31010",
    border: "1px solid",
    width: 250,
    borderColor: theme.palette.grey[400],
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.grey[100],
    padding: theme.spacing(2),
    margin: theme.spacing(2),
  },
  starIcon: {
    marginRight: theme.spacing(3),
    fontSize: "50px",
  },
}));

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
      "http://localhost:8000/management/rewards/claimed/get"
    );

    // Filter results so that it only displays rewards that have been archived
    const archivedRewards = res.data.filter((reward) => reward.archived);

    // Set to state
    setClaimedRewards(archivedRewards);
  };

  return (
    <div className={classes.tableContainer}>
      <Box padding={3}>
        <Typography variant="h4">
          <b>Archived Rewards</b>
        </Typography>
      </Box>
      <Box>
        {/* Get all claimed rewards from database and display the ones that have been archived */}
        {claimedRewards && (
          <TableContainer className={classes.table}>
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
                  <TableCell className={classes.tableHeaders}>
                    <b>Archived At</b>
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
                    <TableCell className={classes.tableContent}>
                      {claimedReward.date_archived} <br />
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