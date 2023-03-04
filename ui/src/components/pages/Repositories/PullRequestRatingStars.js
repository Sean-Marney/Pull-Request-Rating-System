import React from "react";
import { Rating } from "@mui/material";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        position: "absolute",
        top: 5,
        right: 5,
    },
});

const PullRequestRatingStars = ({ rating }) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Rating
                name="pull-request-rating"
                value={rating?.average ? rating.average: 0}
                readOnly
                sx={{
                    "& .MuiRating-iconEmpty": {
                        borderColor: "black",
                    },
                }}
            />
            <h3 style={{ margin: "30px 0px", alignItems: "left" }}>
                Total {rating?.overall ? rating.overall: 0}{" "}
            </h3>
        </div>
    );
};

export default PullRequestRatingStars;
