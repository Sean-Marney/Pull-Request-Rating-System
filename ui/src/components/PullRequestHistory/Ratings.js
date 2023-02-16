import React from "react";
import {
  Card,
  Typography,
  Button,
  CardActions,
  Grid,
  Link,
} from "@material-ui/core";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { Rating } from "./Rating";
var moment = require('moment');  
moment().format();


export class Ratings extends React.Component {
  render() {

    //  checks whether the pull request has been rated or not and then displays necessary information
    function rated(ratings) {
        let list = [];
        for (rating in ratings) {
            let item = <Rating category={rating} score={ratings[rating]}/>
            list.push(item);
        }
        return list;
    }
    function notRated(){
        return <Typography variant="h5" component="div">Pending rating</Typography>
    }
    let rating;
    if (this.props.rated == true) {
      rating = rated(this.props.ratings);
    }else if (this.props.rated == false){
      rating = notRated();
    }

    return (

      // Each item in the list of pull requests
        <div>
            {rating}        
        </div>
    );
  }
}
