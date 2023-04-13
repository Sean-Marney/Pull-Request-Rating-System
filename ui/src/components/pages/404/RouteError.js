import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {Paper, Button,} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

  const useStyles = makeStyles((theme) => ({
      paper: {
        padding: theme.spacing(8),
        textAlign: "center",
        background: "#ffffff",
        boxShadow: "0px 2px 10px 2px rgba(0,0,0,0.1)",
        borderRadius: "10px",
        width: "90%",
        height: "150%",
      },
      button: {
        marginLeft: "20px",
        marginTop: "20px",
        marginBottom: "20px",
        display: "flex", 
        justifyContent:"center",
        margin: 40,
        backgroundColor: "#37474f",
        color: "white"
      },
}))

export default function RouteError() {
    const classes = useStyles();
    const navigate = useNavigate();

    return(
        <div>
        <Paper className={classes.paper}>
        <Button className={classes.button}
          variant="contained" 
          size="large"
          onClick={() => navigate("/dashboard")}
        >
        < KeyboardReturnIcon /> dashboard
        </Button>
        <h2>Page Not Found</h2>
            <img src="/images/404.jpg" alt="404" className="errorimage"/>
            </Paper>
        </div>
    );
}