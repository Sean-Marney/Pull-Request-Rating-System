// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Typography,
//   Paper,
// } from "@material-ui/core";
// import { useStyles } from "../../styles/tableStyle";
// import { Level } from "./Level";
// import Pagination from "../../reusable/Pagination";

// export default function Leaderboard() {
//   const classes = useStyles();

//   const [leaderboardData, setLeaderboardData] = useState([]);
//   const [levelList, setLevelList] = useState([{name: "No Badge", value: 0 }]);
//   const [visible, setVisible] = React.useState(10);

//   useEffect(() => {
//     axios
//       .get(process.env.REACT_APP_API_ENDPOINT + "/management/leaderboard")
//       .then((res) => setLeaderboardData(res.data))
//       .catch((err) => console.log(err));
//     getLevels();
//     console.log(leaderboardData);
//     console.log(levelList);
//   }, []);

//   const getLevels = async () => {
//     const levels = await axios.get(process.env.REACT_APP_API_ENDPOINT + `/badge/all`);
//     levels.data.unshift({name: "No Badge", value: 0 });
//     // console.log(levels.data.filter(item => item.value <= 11).sort((a, b) => b.value - a.value)[0].name);
//     setLevelList(levels.data);
//   // Handling "Load More" click
//   const handlePageClick = () => {
//     setVisible((preValue) => preValue + 10);
//   };

//   return (
//     <div className={classes.tableContainer}>
//       <Typography variant="h4" gutterBottom>
//         <b>Leaderboard</b>
//       </Typography>
//       <TableContainer component={Paper}>
//         <Table className={classes.table} aria-label="leaderboard table">
//           <TableHead>
//             <TableRow>
//               <TableCell>Name</TableCell>
//               <TableCell>Total Stars Earned</TableCell>
//               <TableCell>Current Level</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {/* Render items that have been loaded via pagination */}
//             {leaderboardData.slice(0, visible).map((user, index) => (
//               <TableRow key={index}>
//                 <TableCell component="th" scope="row">
//                   {user.name}
//                 </TableCell>
//                 <TableCell>{user.totalStarsEarned}</TableCell>
                
//                 <TableCell><Level levelList={levelList} current={user.totalStarsEarned} /></TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <div>
//         {/* Render "Load More" button from the reusable component and use the handler on click */}
//         <Pagination handlePageClick={handlePageClick} />
//       </div>
//     </div>
//   );
// }
// }
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
import { Level } from "./Level";

export default function Leaderboard() {
  const classes = useStyles();
  const [levelList, setLevelList] = useState([{name: "No Badge", value: 0 }]);
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [visible, setVisible] = React.useState(10);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_ENDPOINT + "/management/leaderboard")
      .then((res) => setLeaderboardData(res.data))
      .catch((err) => console.log(err));
    getLevels();
  }, []);
  const getLevels = async () => {
    const levels = await axios.get(process.env.REACT_APP_API_ENDPOINT + `/badge/all`);
    levels.data.unshift({name: "No Badge", value: 0 });
    setLevelList(levels.data);
  };

  const handlePageClick = () => {
    setVisible((preValue) => preValue + 10);
  };

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
                <TableCell className={classes.tableHeaders}>
                  <b>Level</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leaderboardData.slice(0, visible).map((user, index) => (
                <TableRow key={index}>
                  <TableCell className={classes.tableContent}>
                    {user.name}
                  </TableCell>
                  <TableCell className={classes.tableContent}>
                    {user.totalStarsEarned}
                  </TableCell>
                  <TableCell className={classes.tableContent}>
                  <Level levelList={levelList} current={user.totalStarsEarned} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <div>
        {/* Render "Load More" button from the reusable component and use the handler on click */}
        <Pagination handlePageClick={handlePageClick} />
      </div>
    </div>
  );
}
