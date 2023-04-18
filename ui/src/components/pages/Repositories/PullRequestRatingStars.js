import React from "react";
// Importing Rating component from MUI library
import { Rating } from "@mui/material";
// Importing CSS styles for this component
import { useStyles } from "../../styles/Repositories/PullRequestRatingStarsStyle";
import { Typography } from "@material-ui/core";

const PullRequestRatingStars = ({ rating }) => {
    // Creating a classes object by invoking the useStyles hook
    const classes = useStyles();
    return (
        <div className={classes.root}>
            {/* The first element displays the total number of stars received for the pull request */}
            <Typography component="span" variant="body1" color="textSecondary">
                Total stars {rating?.overall ? rating.overall : 0}{" "}
            </Typography>
            <br />
            {/* The second element displays the average rating with a star rating component from MUI */}
            <span
                style={{
                    margin: "0px 0px",
                    display: "flex",
                    alignItems: "center",
                }}
            >
                {" "}
                <Typography
                    component="span"
                    variant="body1"
                    color="textSecondary"
                >
                    Average
                </Typography>
                {/* Displaying the star rating for the average rating value */}
                <Rating
                    name="pull-request-rating"
                    value={rating?.average ? rating.average : 0}
                    readOnly
                    sx={{
                        "& .MuiRating-iconEmpty": {
                            borderColor: "black",
                        },
                    }}
                />
            </span>
        </div>
    );
};

export default PullRequestRatingStars;
