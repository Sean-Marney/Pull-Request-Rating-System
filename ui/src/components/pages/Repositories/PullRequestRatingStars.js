import React from "react";
import { Rating } from "@mui/material";
import { useStyles } from "../../styles/Repositories/PullRequestRatingStarsStyle";

const PullRequestRatingStars = ({ rating }) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <span style={{ margin: "0px 15px",  fontSize: "17px" }}>
                Average
            </span>
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
        </div>
    );
};

export default PullRequestRatingStars;
