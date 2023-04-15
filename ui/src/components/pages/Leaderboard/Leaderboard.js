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
import Pagination from "../../reusable/Pagination";

export default function Leaderboard() {
  const classes = useStyles();

  const [leaderboardData, setLeaderboardData] = useState([]);
  const [visible, setVisible] = React.useState(10);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_ENDPOINT + "/management/leaderboard")
      .then((res) => setLeaderboardData(res.data))
      .catch((err) => console.log(err));
  }, []);

  // Handling "Load More" click
  const handlePageClick = () => {
    setVisible((preValue) => preValue + 10);
  };

  return (
    <div className={classes.tableContainer}>
      <Typography variant="h4" gutterBottom>
        <b>Leaderboard</b>
      </Typography>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="leaderboard table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Total Stars Earned</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Render items that have been loaded via pagination */}
            {leaderboardData.slice(0, visible).map((user, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {user.name}
                </TableCell>
                <TableCell>{user.totalStarsEarned}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div>
        {/* Render "Load More" button from the reusable component and use the handler on click */}
        <Pagination handlePageClick={handlePageClick} />
      </div>
    </div>
  );
}
