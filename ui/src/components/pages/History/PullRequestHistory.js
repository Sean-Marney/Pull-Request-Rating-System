import React from "react";
import { Typography, Button, CardActions, Grid } from "@material-ui/core";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
var moment = require("moment");
moment().format();

export class PullRequestHistory extends React.Component {
  render() {
    //  checks whether the pull request has been rated or not and then displays necessary information
    function rated(rating) {
      return (
        <Grid container alignItems="center" spacing={1}>
          <Grid item>
            <StarOutlineIcon sx={{ fontSize: "2rem" }} />
          </Grid>
          <Grid item>
            <Typography
              variant="h6"
              component="div"
              style={{ fontSize: "1.2rem" }}
            >
              {rating}
            </Typography>
          </Grid>
        </Grid>
      );
    }
    function notRated() {
      return (
        <Typography
          variant="subtitle1"
          component="div"
          style={{ color: "gray", fontSize: "1rem" }}
        >
          Pending rating
        </Typography>
      );
    }

    let rating;
    if (this.props.pullRequest.rating_complete == true && this.props.pullRequest.hasOwnProperty('ratings')) {
      rating = rated(this.props.pullRequest.ratings.overall);
    } else {
      rating = notRated();
    }

    // converts the date to a readable format
    var day = moment(this.props.pullRequest.date).format(
      "DD/MM/YYYY  HH:mm:ss"
    );
    var link = "/pullrequest/" + this.props.pullRequest._id;
    return (
      <div style={{ padding: "10px", borderBottom: "1px solid lightgray" }}>
        <Grid container alignItems="center" spacing={1}>
          <Grid item>
            <AccessTimeIcon sx={{ fontSize: 16 }} />
          </Grid>
          <Grid item>
            <Typography variant="subtitle2" component="div">
              {day}
            </Typography>
          </Grid>
        </Grid>
        <Grid container alignItems="center" spacing={1}>
          <Grid item xs={10}>
            <Typography
              variant="h6"
              component="div"
              style={{ fontSize: "1.5rem" }}
            >
              {this.props.pullRequest.title}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            {rating}
          </Grid>
        </Grid>
        <CardActions>
          <Button
            size="small"
            href={this.props.pullRequest.url}
            variant="outlined"
          >
            View in GitHub
          </Button>
        </CardActions>
      </div>
    );
  }
}
