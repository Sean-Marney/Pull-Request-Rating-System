import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  makeStyles,
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
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  table: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(2),
    boxShadow: theme.shadows[20],
    paddingBottom: theme.spacing(0),
  },
  tableContainer: {
    paddingLeft: theme.spacing(20),
    paddingRight: theme.spacing(20),
  },
}));

export default function ManageRewards() {
  const classes = useStyles();
  const [rewards, setRewards] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    getRewards();
  }, []);

  const getRewards = async () => {
    // Get rewards
    const res = await axios.get("http://localhost:8000/management/rewards");

    // Set to state
    setRewards(res.data);
  };

  const deleteReward = async (_id) => {
    // Delete reward
    await axios.delete(
      `http://localhost:8000/management/rewards/delete/${_id}`
    );

    getRewards(); // Get updated list of rewards
  };

  return (
    <div className={classes.tableContainer}>
      <Box padding={3}>
        <Typography variant="h4">
          <b>Manage Rewards</b>
        </Typography>
      </Box>
      <Button
        variant="contained"
        color="primary"
        size="large"
        startIcon={<AddCircleIcon />}
        onClick={() => navigate("/management/rewards/create")}
      >
        Add New Reward
      </Button>
      <Box>
        {/* Get all rewards from database and display in a table */}
        {rewards && (
          <TableContainer className={classes.table}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <b>Name</b>
                  </TableCell>
                  <TableCell>
                    <b>Stars Required</b>
                  </TableCell>
                  <TableCell>
                    <b>Actions</b>
                  </TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {rewards.map((reward) => (
                  <TableRow key={reward._id}>
                    <TableCell>{reward.rewardName}</TableCell>
                    <TableCell>{reward.starsRequired}</TableCell>
                    <TableCell>
                      <IconButton
                        color="primary"
                        onClick={() =>
                          navigate(`/management/rewards/update/${reward._id}`)
                        }
                      >
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        color="secondary"
                        onClick={() => deleteReward(reward._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
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
