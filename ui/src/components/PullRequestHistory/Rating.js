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
    // Formats the title of the rating
    let title = this.props.category.replaceAll("_", " ");
    title = title.charAt(0).toUpperCase() + title.slice(1);

    // Creates the stars for the rating
    let stars = [];
    for (let i = 0; i < 5; i++) {
        if (i < this.props.score) {
            stars.push(<Grid  item><StarOutlineIcon style={{color: '#FFD700'}} sx={{ fontSize: 35 }}/></Grid>);
        }else{
          console.log("black");
            stars.push(<Grid  item><StarOutlineIcon sx={{ fontSize: 35 }}/></Grid>);
        }
    }
    
    return (
      // Displays title and stars for that rating
        <div>
            <Grid container >
                {stars}
                <Grid  item xs={7}>
                <Typography variant="h5" component="div" style ={{"padding-left":"50px"}}>{title}</Typography>
                </Grid> 
            </Grid>
        </div>
    );
  }
}
