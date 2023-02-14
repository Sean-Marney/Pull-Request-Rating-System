import React from "react";
import {
  Card,
  Typography,
  Button,
  CardActions,
  Grid,
  Link,
  Box
} from "@material-ui/core";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
var moment = require('moment');  
moment().format();


export class PullRequestItem extends React.Component {
  render() {
    var day = moment(this.props.pullRequest.date).format('DD/MM/YYYY  HH:mm:ss');
    return (
        <div>
          <Card variant="outlined">
          <Grid container spacing={0} >
            <Grid item xs={0}>
              <AccessTimeIcon sx={{ fontSize: 20 }}/>
            </Grid>
            <Grid item xs={0}>
              <Typography  color="text.secondary" gutterBottom align="left">{day}</Typography>
            </Grid>
          </Grid>
            <Grid container spacing={0}>
              <Grid item xs={11}>
                <Typography variant="h4" component="div" align="left"><Link href={this.props.pullRequest._id} underline="always">{this.props.pullRequest.title}</Link></Typography>
              </Grid>
              <Grid item xs={0}>
                <Typography variant="h4" component="div" align="right">10</Typography>
              </Grid>
              <Grid item xs={0}>
                <StarOutlineIcon  align="left" sx={{ fontSize: 40 }}/>
              </Grid>
            </Grid>
            <CardActions><Button size="small" href={this.props.pullRequest.url}>#{this.props.pullRequest._id}</Button></CardActions>
          </Card>
        </div>
    );
  }
}
