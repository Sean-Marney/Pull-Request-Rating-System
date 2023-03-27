import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Typography, Tooltip, Box } from "@material-ui/core";
import InfoOutlinedIcon from "@material-ui/icons/Info";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  title: {
    marginBottom: theme.spacing(3),
    fontWeight: 600,
  },
  boxContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  box: {
    backgroundColor: "#e6e6e6",
    height: "auto",
    flexShrink: 0,
    width: `calc((65vw - ${theme.spacing(6)}px) / 3)`,
    margin: theme.spacing(1),
    padding: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    boxShadow: "0px 0px 12px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease-in-out",
    "&:hover": {
      transform: "scale(1.05)",
      boxShadow: "0px 0px 12px rgba(0, 0, 0, 0.5)",
    },
  },
  boxTitle: {
    marginBottom: theme.spacing(1),
    fontWeight: 600,
    textAlign: "center",
  },
  boxValue: {
    fontSize: "2rem",
    fontWeight: 700,
    textAlign: "center",
    wordWrap: "break-word",
    marginLeft: theme.spacing(4),
  },
  boxDescription: {
    paddingTop: theme.spacing(3),
    textAlign: "center",
  },
  boxDescription2: {
    paddingTop: theme.spacing(3),
    color: "#b30000",
    fontWeight: "bold",
    textAlign: "center",
  },
  icon1: {
    paddingBottom: theme.spacing(1.5),
    fontSize: "2.5rem",
    color: "#E6C200",
  },
  icon2: {
    paddingBottom: theme.spacing(1.5),
    fontSize: "2.5rem",
    color: "#A97142",
  },
  icon3: {
    paddingBottom: theme.spacing(1.5),
    fontSize: "2.5rem",
    color: "#809fff",
  },
  infoIcon: {
    marginLeft: theme.spacing(2),
    cursor: "default",
    color: "#2196f3",
    transition: "opacity 0.3s ease-in-out",
    "&:hover": {
      opacity: 0.8,
    },
  },
  infoBox: {
    padding: theme.spacing(2),
  },
}));

export default function ManagerDashboard() {
  const classes = useStyles();
  const [hoveredBox, setHoveredBox] = useState(null); // Keeps track of if the user is hovering over a box

  return (
    <div className={classes.root}>
      <Box>
        <Typography variant="h4" className={classes.title}>
          Dashboard
        </Typography>

        <div className={classes.boxContainer}>
          <div>
            <Paper
              elevation={3}
              className={classes.box}
              // More information is displayed when user hovers over box
              onMouseEnter={() => setHoveredBox("pendingPullRequests")}
              onMouseLeave={() => setHoveredBox(null)}
            >
              <Typography variant="h6" className={classes.boxTitle}>
                Pending Pull Requests
              </Typography>
              <Typography variant="h4" className={classes.boxValue}>
                <Tooltip
                  // Description box appears when user hovers over info icon
                  title={
                    <div className={classes.infoBox}>
                      <Typography variant="body2">
                        This is an info box
                        <br /> <br />
                        This is an info box
                      </Typography>
                    </div>
                  }
                  placement="right"
                >
                  <span className={classes.infoIcon}>
                    <InfoOutlinedIcon />
                  </span>
                </Tooltip>
              </Typography>
              {/* Content displayed when hovering */}
              {hoveredBox === "pendingPullRequests" && (
                <Typography variant="body1" className={classes.boxDescription2}>
                  Description
                </Typography>
              )}
            </Paper>
          </div>
        </div>
      </Box>
    </div>
  );
}
