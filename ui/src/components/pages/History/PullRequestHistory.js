import React from "react";
import {
  Typography,
  Button,
  CardActions,
  Grid
} from "@material-ui/core";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
var moment = require('moment');  
moment().format();

export class PullRequestHistory extends React.Component {
  render() {
    //  checks whether the pull request has been rated or not and then displays necessary information
    function rated(rating) {
       return <Grid container >
            <Grid item>
              <Typography variant="h4" component="div">{rating}</Typography>
            </Grid>  
            <Grid item>
            <StarOutlineIcon  sx={{ fontSize: 40 }}/>
            </Grid>  
          </Grid>
    }
    function notRated(){
      return <Typography variant="h5" component="div" >Pending rating</Typography>
    }

    let rating;
    if (this.props.pullRequest.rating_complete == true) {
      rating = rated(this.props.pullRequest.ratings.overall);
    }else{
      rating = notRated();
    }
    
    // converts the date to a readable format
    var day = moment(this.props.pullRequest.date).format('DD/MM/YYYY  HH:mm:ss');
    var link = "/pullrequest/" + this.props.pullRequest._id;
    return (

      // Each item in the list of pull requests
        <div>
          <Grid container spacing={0} >
            <Grid item xs={0}>
              <AccessTimeIcon sx={{ fontSize: 20 }}/>
            </Grid>
            <Grid item xs={0}>
              <Typography  color="text.secondary" gutterBottom align="left">{day}</Typography>
            </Grid>
          </Grid>
            <Grid container spacing={0}>
              <Grid item xs={10}>
                <Typography variant="h4" component="div" align="left">{this.props.pullRequest.title}</Typography>
              </Grid>
              <Grid item xs={2}>
                {rating}
              </Grid>
            </Grid>
            <CardActions><Button size="small" href={this.props.pullRequest.url} variant="outlined">View in GitHub</Button></CardActions>
        </div>
    );
  }
}
