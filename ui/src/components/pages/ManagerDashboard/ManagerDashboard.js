import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@material-ui/core";
import axios from "axios";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function ManagerDashboard() {
  const classes = useStyles();
  const [requests, setRequests] = useState([]);
  const [archivedRewards, setArchivedRewards] = useState([]);

  useEffect(() => {
    axios
      .get(process.env.EXPRESS_URL + "/requests")
      .then((response) => {
        setRequests(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(process.env.EXPRESS_URL + "/archived-rewards")
      .then((response) => {
        setArchivedRewards(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        <b>Pending Requests</b>
      </Typography>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="Requests Table">
          <TableHead>
            <TableRow>
              <TableCell>Pull Request Title</TableCell>
              <TableCell>Rating Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests.map((request) => (
              <TableRow key={request._id}>
                <TableCell component="th" scope="row">
                  {request.title}
                </TableCell>
                <TableCell>{request.rating_complete.toString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h5" gutterBottom>
        <b>Archived Rewards</b>
      </Typography>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="Archived Rewards Table">
          <TableHead>
            <TableRow>
              <TableCell>Reward Name</TableCell>
              <TableCell>User ID</TableCell>
              <TableCell>Archived</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {archivedRewards.map((reward) => (
              <TableRow key={reward._id}>
                <TableCell component="th" scope="row">
                  {reward.reward_name}
                </TableCell>
                <TableCell>{reward.user_id}</TableCell>
                <TableCell>{reward.archived.toString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ManagerDashboard;
