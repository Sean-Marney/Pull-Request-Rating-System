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
  Paper,
} from "@material-ui/core";
import ArchiveIcon from "@material-ui/icons/Archive";
import FolderIcon from "@material-ui/icons/Folder";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    height: "calc(100vh - 100px)",
    maxWidth: "90%",
    margin: "0 auto",
    overflow: "auto",
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  paper: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(2),
    boxShadow: theme.shadows[20],
    borderRadius: theme.shape.borderRadius,
  },
  tableHeaders: {
    fontSize: "1.25rem",
    textAlign: "center",
    fontWeight: "bold",
  },
  tableContent: {
    fontSize: "1rem",
    textAlign: "center",
  },
  starCountBox: {
    textAlign: "center",
    fontSize: "1rem",
    color: "#b31010",
    border: "1px solid",
    width: 250,
    borderColor: theme.palette.grey[400],
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.grey[100],
    padding: theme.spacing(2),
    margin: theme.spacing(2),
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  button: {
    marginBottom: theme.spacing(2),
  },
}));

export default function ClaimedRewards() {
  const classes = useStyles();
  const [claimedRewards, setClaimedRewards] = useState(null);

  const navigate = useNavigate();

  // Gets claimed rewards on page load
  useEffect(() => {
    getClaimedRewards();
  });

  const getClaimedRewards = async () => {
    // Get claimed rewards
    const res = await axios.get(
      "http://localhost:8000/management/rewards/claimed/get"
    );

    // Filter results so that it doesn't display rewards that have been archived
    const unarchivedRewards = res.data.filter((reward) => !reward.archived);

    // Set to state
    setClaimedRewards(unarchivedRewards);
  };

  const archiveReward = async (claimedReward) => {
    toast.success("Successfully archived reward");
    // Update reward's "archived" value to true
    const res = await axios.patch(
      `http://localhost:8000/management/rewards/claimed/update/${claimedReward._id}`
    );
    console.log(res.data);

    getClaimedRewards();
  };

  return (
    <div className={classes.tableContainer}>
      <ToastContainer />
      <Paper className={classes.paper}>
        <Box padding={3}>
          <Typography variant="h4" className={classes.title}>
            <b>Claimed Rewards</b>
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<FolderIcon />}
            onClick={() => navigate("/management/rewards/claimed/archived")}
            className={classes.button}
          >
            View Archived Rewards
          </Button>
        </Box>
        <Box>
          {/* Get all claimed rewards from database and display in a table */}
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
                    <TableCell className={classes.tableHeaders}>
                      <b>Actions</b>
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
                        <Button
                          variant="contained"
                          color="primary"
                          startIcon={<ArchiveIcon />}
                          onClick={() => archiveReward(claimedReward)}
                        >
                          Archive
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
