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

function Leaderboard() {
  const classes = useStyles();
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [levelList, setLevelList] = useState([{name: "No Badge", value: 0 }]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/management/leaderboard")
      .then((res) => setLeaderboardData(res.data))
      .catch((err) => console.log(err));
    getLevels();
  }, []);

  const getLevels = async () => {
    const levels = await axios.get(process.env.REACT_APP_API_ENDPOINT + `/badge/all`);
    levels.data.unshift({name: "No Badge", value: 0 });
    console.log(levels.data.filter(item => item.value <= 11).sort((a, b) => b.value - a.value)[0].name);
    setLevelList(levels.data);
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
              <TableCell>Current Level</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leaderboardData.map((user, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {user.name}
                </TableCell>
                <TableCell>{user.totalStarsEarned}</TableCell>
                
                <TableCell>{levelList.filter(item => item.value <= user.totalStarsEarned).sort((a, b) => b.value - a.value)[0].name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Leaderboard;
