import React from "react";
import { Typography, Divider } from "@material-ui/core";
import { Rating } from "./Rating";
var moment = require("moment");
moment().format();

export class Ratings extends React.Component {
  render() {
    // Displays the ratings of the pull request
    function rated(ratings) {
      let title = (
        <Typography
          variant="h4"
          component="div"
          style={{ margin: "20px", textAlign: "center" }}
        >
          <b>Ratings</b>
        </Typography>
      );
      let list = [];
      list.push(title);
      list.push(<Divider />);
      let displaylist = ratings;
      // Iterates through all the ratings and then creates a rating component for each one
      // Doesn't display overall rating as it is already displayed in the pull request item
      for (rating in displaylist) {
        if (rating != "overall" && rating != "average") {
          let item = (
            <Rating key={rating} category={rating} score={ratings[rating]} />
          );
          list.push(item);
        }
      }
      return list;
    }
    // Displays message saying that the pull request has not been rated yet
    function notRated() {
      return (
        <div style={{ marginTop: "20px" }}>
          <Typography variant="h4" component="div" align="center">
            <b>Pending Rating</b>
          </Typography>
          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <Typography variant="h6" component="div">
              Your manager will review this soon.
            </Typography>
          </div>
        </div>
      );
    }
    //  checks whether the pull request has been rated or not and then displays necessary information
    let rating;
    if (this.props.rated == true) {
      rating = rated(this.props.ratings);
    } else if (this.props.rated == false) {
      rating = notRated();
    }

    return (
      // Each item in the list of pull requests
      <div>{rating}</div>
    );
  }
}
