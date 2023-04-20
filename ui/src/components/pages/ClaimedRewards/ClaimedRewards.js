import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import {
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
import { useStyles } from "../../styles/tableStyle";
import Pagination from "../../reusable/Pagination";

export default function ClaimedRewards() {
  const classes = useStyles();

  const navigate = useNavigate();
  const [claimedRewards, setClaimedRewards] = useState(null);
  const [visible, setVisible] = React.useState(10);

  // Gets claimed rewards on page load
  useEffect(() => {
    getClaimedRewards();
  });

  const getClaimedRewards = async () => {
    // Get claimed rewards
    const res = await axios.get(
      process.env.REACT_APP_API_ENDPOINT + "/management/rewards/claimed/get",
      { withCredentials: true }
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
      process.env.REACT_APP_API_ENDPOINT +
        `/management/rewards/claimed/update/${claimedReward._id}`,
      { withCredentials: true },{ withCredentials: true }
    );

    console.log(res.data);

    getClaimedRewards();
  };

  // Handling "Load More" click
  const handlePageClick = () => {
    setVisible((preValue) => preValue + 10);
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
            style={{
              marginLeft: "20px",
              marginBottom: "20px",
            }}
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
                  {/* Render items that have been loaded via pagination */}
                  {claimedRewards.slice(0, visible).map((claimedReward) => (
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
      <div>
        {/* Render "Load More" button from the reusable component and use the handler on click */}
        <Pagination handlePageClick={handlePageClick} />
      </div>
    </div>
  );
}
