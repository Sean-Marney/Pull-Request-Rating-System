import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {Paper} from "@material-ui/core";

  const useStyles = makeStyles((theme) => ({
      paper: {
        padding: theme.spacing(6),
        textAlign: "center",
        background: "#ffffff",
        boxShadow: "0px 2px 10px 2px rgba(0,0,0,0.1)",
        borderRadius: "10px",
        width: "90%",
        height: "90%",
      },
}))

export default function UnauthorizedPage() {
    const classes = useStyles();



    return(
        <div>
        <Paper className={classes.paper}>
            <img src="/images/Error.jpg" alt="401" className="image"/>
            </Paper>
        </div>
    );
}