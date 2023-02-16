import React from "react";
import {
  Typography,
  Divider
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
        let title = <Typography variant="h4" component="div" align="center">Ratings</Typography>;
        let list = [];
        list.push(title);
        list.push(<Divider />);
        for (rating in ratings) {
            let item = <Rating key={rating} category={rating} score={ratings[rating]}/>
            list.push(item);
        }
        return list;
    }
    function notRated(){
        return <div>
          <Typography variant="h4" component="div" align="center">Pending Rating</Typography>
        </div>
        
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
