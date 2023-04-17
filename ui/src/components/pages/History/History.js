import React, { useEffect, useState } from "react";
import axios from "axios";
import { Ratings } from "./Ratings";
import { PullRequestHistory } from "../History/PullRequestHistory";
import { useCookies } from "react-cookie";
import {
  Typography,
  Box,
  Grid,
  Card,
  makeStyles,
  Paper,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  clickable: {
    cursor: "pointer",
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[1],
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
  },
  selected: {
    backgroundColor: theme.palette.action.focus,
  },
  ratingsContainer: {
    height: "calc(100vh - 120px)",
    overflowY: "auto",
  },
}));

export default function History() {
  const classes = useStyles();
  const [pullRequests, setPullRequests] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [rated, setRated] = useState();
  const [selected, setSelected] = useState();
  const [cookies] = useCookies();

  useEffect(() => {
    getPullRequests();
    setRated("blank");
  }, []);


    // Gets the Pull Requests through calling api backend
    // TODO: Integrate with ID of user who is logged in
    const getPullRequests = async () => {
        let email = cookies.user;
        const res = await axios.get(process.env.REACT_APP_API_ENDPOINT + "/pullrequests/history/" + email.toLowerCase(),{ withCredentials: true});
        setPullRequests(res.data);
    };
    
    // Handles the selection of a pull request
    // Changes the background color of the selected pull request
    // Displays the ratings
    function handleSelection(rated,ratings,id) {
        try{
            let newRequest = document.getElementById(id);
            if (newRequest){
                newRequest.style.background = "#C9C5C5"
            }
            let oldRequest = document.getElementById(selected);
            if (oldRequest){
                oldRequest.style.background = "#ffffff"
            }
        }catch(err){
            console.log(err);
        }
        setSelected(id);
        setRated(rated);
        setRatings(ratings);
    }
  };

  return (
    <div className="App">
      <Box marginBottom={4}>
        <Typography variant="h4" style={{ margin: "15px" }}>
          <b>History</b>
        </Typography>
      </Box>

      <Grid container spacing={2} className={classes.container}>
        {/* Section to display the pull requests */}
        <Grid item xs={12} md={6}>
          <Paper>
            <Box padding={2}>
              {pullRequests.length === 0 ? (
                <div>
                  <Typography
                    variant="body1"
                    style={{
                      textAlign: "center",
                      padding: "20px",
                      fontSize: "1.5rem",
                    }}
                  >
                    You have submitted no pull requests
                  </Typography>
                </div>
              ) : (
                pullRequests.map((pullRequest) => (
                  <Card
                    key={pullRequest._id}
                    id={pullRequest._id}
                    className={`${classes.clickable} ${
                      selected === pullRequest._id ? classes.selected : ""
                    }`}
                    onClick={() =>
                      handleSelection(
                        pullRequest.rating_complete,
                        pullRequest.ratings,
                        pullRequest._id
                      )
                    }
                  >
                    <PullRequestHistory pullRequest={pullRequest} />
                  </Card>
                ))
              )}
            </Box>
          </Paper>
        </Grid>

        {/* Section to display the ratings */}
        <Grid item xs={12} md={6}>
          <Paper className={classes.ratingsContainer}>
            <Box padding={2}>
              <Ratings ratings={ratings} rated={rated} />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Ratings } from "./Ratings";
// import { PullRequestHistory } from "../History/PullRequestHistory";
// import { useCookies } from "react-cookie";
// import {
//   Typography,
//   Box,
//   Grid,
//   Card,
//   makeStyles,
//   Paper,
// } from "@material-ui/core";

// const useStyles = makeStyles((theme) => ({
//   container: {
//     marginTop: theme.spacing(4),
//     marginBottom: theme.spacing(4),
//   },
//   clickable: {
//     cursor: "pointer",
//     marginBottom: theme.spacing(2),
//     padding: theme.spacing(2),
//     borderRadius: theme.shape.borderRadius,
//     boxShadow: theme.shadows[1],
//     "&:hover": {
//       backgroundColor: theme.palette.action.hover,
//     },
//   },
//   selected: {
//     backgroundColor: theme.palette.action.focus,
//   },
//   ratingsContainer: {
//     height: "calc(100vh - 120px)",
//     overflowY: "auto",
//   },
// }));

// export default function History() {
//   const classes = useStyles();
//   const [pullRequests, setPullRequests] = useState([]);
//   const [ratings, setRatings] = useState([]);
//   const [rated, setRated] = useState();
//   const [selected, setSelected] = useState();
//   const [cookies] = useCookies();

//   useEffect(() => {
//     getPullRequests();
//     setRated("blank");
//   }, []);

//   const getPullRequests = async () => {
//     let email = cookies.user;
//     const res = await axios.get(
//       process.env.REACT_APP_API_ENDPOINT +
//         "/pullrequests/history/" +
//         email.toLowerCase()
//     );
//     setPullRequests(res.data);
//   };

//   const handleSelection = (rated, ratings, id) => {
//     try {
//       setSelected(id);
//       setRated(rated);
//       setRatings(ratings);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <div className="App">
//       <Box marginBottom={4}>
//         <Typography variant="h4" style={{ margin: "15px" }}>
//           <b>History</b>
//         </Typography>
//       </Box>

//       <Grid container spacing={2} className={classes.container}>
//         {/* Section to display the pull requests */}
//         <Grid item xs={12} md={6}>
//           <Paper>
//             <Box padding={2}>
//               {pullRequests.map((pullRequest) => (
//                 <Card
//                   key={pullRequest._id}
//                   id={pullRequest._id}
//                   className={`${classes.clickable} ${
//                     selected === pullRequest._id ? classes.selected : ""
//                   }`}
//                   onClick={() =>
//                     handleSelection(
//                       pullRequest.rating_complete,
//                       pullRequest.ratings,
//                       pullRequest._id
//                     )
//                   }
//                 >
//                   <PullRequestHistory pullRequest={pullRequest} />
//                 </Card>
//               ))}
//             </Box>
//           </Paper>
//         </Grid>

//         {/* Section to display the ratings */}
//         <Grid item xs={12} md={6}>
//           <Paper className={classes.ratingsContainer}>
//             <Box padding={2}>
//               <Ratings ratings={ratings} rated={rated} />
//             </Box>
//           </Paper>
//         </Grid>
//       </Grid>
//     </div>
//   );
// }
