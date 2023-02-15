import React from "react";
import {
  Card,
  Typography,
  Button,
  CardActions,
  Grid,
  Link,
} from "@material-ui/core";
import StarOutlineIcon from '@mui/icons-material/StarOutline';
var moment = require('moment');  
moment().format();


export class Rating extends React.Component {
  render() {
    let title = this.props.category.replaceAll("_", " ");
    title = title.charAt(0).toUpperCase() + title.slice(1);

    return (

      // Each item in the list of pull requests
        <div>
            <Grid container >
                <Grid item>
                <Typography variant="h4" component="div" align="right">{this.props.score}</Typography>
                </Grid>  
                <Grid item>
                    <StarOutlineIcon  sx={{ fontSize: 40 }}/>
                </Grid>  
                <Grid item>
                <Typography variant="h4" component="div" align="right">{title}</Typography>
                </Grid> 
            </Grid>
        </div>
    );
  }
}
