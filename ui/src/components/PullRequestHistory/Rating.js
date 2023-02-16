import React from "react";
import {
  Card,
  Typography,
  Button,
  CardActions,
  Grid,
  Link,
  Divider
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
                <Grid  item xs={1}>
                <Typography variant="h5" component="div" sx={{color: 'success.main'}}>{this.props.score}</Typography>
                </Grid>  
                <Grid  item xs={1}>
                    <StarOutlineIcon  sx={{ fontSize: 35 }}/>
                </Grid>  
                <Grid  item xs={9}>
                <Typography variant="h5" component="div" align="left">{title}</Typography>
                </Grid> 
            </Grid>
        </div>
    );
  }
}
