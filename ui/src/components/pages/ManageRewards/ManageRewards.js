import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import ClaimIcon from "@material-ui/icons/Redeem";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Typography,
  Box,
  IconButton,
  Paper,
} from "@material-ui/core";
import { useStyles } from "../../styles/tableStyle";
import Pagination from "../../reusable/Pagination";

export default function ManageRewards() {
  const classes = useStyles();

  const navigate = useNavigate();
  const [rewards, setRewards] = useState(null);
  const [visible, setVisible] = React.useState(10);

  useEffect(() => {
    getRewards();
  }, []);

  const getRewards = async () => {
    // Get rewards
    const res = await axios.get(
      process.env.REACT_APP_API_ENDPOINT + "/management/rewards"
    );

    // Set to state
    setRewards(res.data);
  };

  const deleteReward = async (_id) => {
    // Delete reward
    await axios.delete(
      process.env.REACT_APP_API_ENDPOINT + `/management/rewards/delete/${_id}`
    );

    getRewards(); // Get updated list of rewards
  };

  // Handling "Load More" click
  const handlePageClick = () => {
    setVisible((preValue) => preValue + 10);
  };

  return (
    <div className={classes.tableContainer}>
      <Paper className={classes.paper}>
        <Typography variant="h4" className={classes.title}>
          <b>Manage Rewards</b>
        </Typography>
        <Button
          style={{
            marginLeft: "20px",
            marginTop: "20px",
            marginBottom: "20px",
          }}
          variant="contained"
          color="primary"
          size="large"
          startIcon={<AddCircleIcon />}
          onClick={() => navigate("/management/rewards/create")}
        >
          Add New Reward
        </Button>
        <Button
          style={{
            marginLeft: "20px",
            marginTop: "20px",
            marginBottom: "20px",
          }}
          variant="contained"
          color="primary"
          size="large"
          startIcon={<ClaimIcon />}
          onClick={() => navigate("/management/rewards/claimed")}
        >
          View Claimed Rewards
        </Button>
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
                    <TableCell></TableCell>
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* Render items that have been loaded via pagination */}
                  {rewards.slice(0, visible).map((reward) => (
                    <TableRow key={reward._id}>
                      <TableCell className={classes.tableContent}>
                        {reward.rewardName}
                      </TableCell>
                      <TableCell className={classes.tableContent}>
                        {reward.starsRequired}
                      </TableCell>
                      <TableCell>
                        <IconButton
                          title="Edit Reward"
                          onClick={() =>
                            navigate(`/management/rewards/update/${reward._id}`)
                          }
                        >
                          <EditIcon className={classes.editButton} />
                        </IconButton>
                      </TableCell>
                      <TableCell>
                        <IconButton
                          title="Delete Reward"
                          onClick={() => deleteReward(reward._id)}
                        >
                          <DeleteIcon className={classes.deleteButton} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          <div>
            {/* Render "Load More" button from the reusable component and use the handler on click */}
            <Pagination handlePageClick={handlePageClick} />
          </div>
        </Box>
      </Paper>
    </div>
  );
}
