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
  Paper,
} from "@material-ui/core";
import { useStyles } from "../../styles/tableStyle";

export default function Leaderboard() {
  const classes = useStyles();
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_ENDPOINT + "/management/leaderboard")
      .then((res) => setLeaderboardData(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={classes.tableContainer}>
      <Paper className={classes.paper}>
        <Typography variant="h4" className={classes.title}>
          <b>Leaderboard</b>
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className={classes.tableHeaders}>
                  <b>Name</b>
                </TableCell>
                <TableCell className={classes.tableHeaders}>
                  <b>Total Stars Earned</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leaderboardData.map((user, index) => (
                <TableRow key={index}>
                  <TableCell className={classes.tableContent}>
                    {user.name}
                  </TableCell>
                  <TableCell className={classes.tableContent}>
                    {user.totalStarsEarned}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}
