import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import ClaimIcon from "@material-ui/icons/Redeem";
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
  Paper,
} from "@material-ui/core";

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
  button: {
    marginLeft: theme.spacing(1),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
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
      <Paper className={classes.paper}>
        <Box padding={3}>
          <Typography variant="h4">
            <b>Manage Rewards</b>
          </Typography>
        </Box>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          size="large"
          startIcon={<AddCircleIcon />}
          onClick={() => navigate("/management/rewards/create")}
        >
          Add New Reward
        </Button>
        <Button
          className={classes.button}
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
                    <TableCell className={classes.tableHeaders}>
                      <b>Actions</b>
                    </TableCell>
                    <TableCell />
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
                        <IconButton
                          color="primary"
                          title="Edit Reward"
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
                          title="Delete Reward"
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
      </Paper>
    </div>
  );
}
