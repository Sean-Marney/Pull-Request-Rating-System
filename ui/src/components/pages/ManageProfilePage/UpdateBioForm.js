import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    Typography,
    InputLabel,
    Input,
    Button,
    Card,
    CardContent,
    makeStyles,
    TextField,
  } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    card: {
      maxWidth: 600,
      minHeight: 325,
      padding: "20px 5px",
      margin: "0 auto",
      marginTop: theme.spacing(10),
      boxShadow: theme.shadows[20],
      borderRadius: "20px",
    },
    input: {
      padding: "5px 5px",
      marginBottom: theme.spacing(1),
      marginTop: theme.spacing(1),
    },
  }));


export default function UpdateBio() {
    const classes = useStyles();
    const navigate = useNavigate();
    return (
        <div>
        <div>
          <Card className={classes.card}>
            <Typography variant="h4">
              <b>Update Bio</b>
            </Typography>
            <CardContent>
              <form onSubmit={() => navigate("/profile")}>
                <div>
                  <InputLabel>Bio</InputLabel>
                  <TextField
                    multiline
                    rows={5}
                    maxWidth
                    onChange={() => navigate("/profile")}
                    name="rewardName"
                    inputProps={{
                      style: { textAlign: "left" },
                    }}
                    className={classes.input}
                  />
                </div>
                <div style={{ marginTop: "20px" }}>
                  <Button
                    onClick={() => navigate("/profile")}
                    variant="contained"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    style={{ marginLeft: "30px" }}
                    variant="contained"
                    color="primary"
                  >
                    Update Bio
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
}

