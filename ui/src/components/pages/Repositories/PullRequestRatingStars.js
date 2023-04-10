import React from "react";
import { Rating } from "@mui/material";
import { useStyles } from "../../styles/Repositories/PullRequestRatingStarsStyle";
import { Typography } from "@material-ui/core";

const PullRequestRatingStars = ({ rating }) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Typography
                component="span"
                variant="body1"
                color="textSecondary"
                // fontSize: "17px",
            >
                Total stars {rating?.overall ? rating.overall : 0}{" "}
            </Typography>
            <br />
            <span
                style={{
                    margin: "0px 0px",
                    // fontSize: "17px",
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
