import React from "react";
import { Grid, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import StarIcon from "@material-ui/icons/Stars";
import TrophyIcon from "@material-ui/icons/EmojiEvents";
import CalanderIcon from "@material-ui/icons/CalendarToday";

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
    height: "auto",
    flexShrink: 0,
    width: `calc((70vw - ${theme.spacing(6)}px) / 3)`,
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
  },
  icon: {
    paddingBottom: theme.spacing(4),
    fontSize: "5rem",
  },
}));

export default function DeveloperDashboard() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h4" className={classes.title}>
        Dashboard
      </Typography>
      <div className={classes.boxContainer}>
        <Paper elevation={3} className={classes.box}>
          <StarIcon className={classes.icon} />
          <Typography variant="h6" className={classes.boxTitle}>
            Current Star Count
          </Typography>
          <Typography variant="h4" className={classes.boxValue}>
            100
          </Typography>
        </Paper>
        <Paper elevation={3} className={classes.box}>
          <TrophyIcon className={classes.icon} />
          <Typography variant="h6" className={classes.boxTitle}>
            Total Stars Achieved
          </Typography>
          <Typography variant="h4" className={classes.boxValue}>
            250
          </Typography>
        </Paper>
        <Paper elevation={3} className={classes.box}>
          <CalanderIcon className={classes.icon} />
          <Typography variant="h6" className={classes.boxTitle}>
            Status of Latest Pull Request
          </Typography>
          <Typography variant="h4" className={classes.boxValue}>
            Reviewed
          </Typography>
        </Paper>
      </div>
    </div>
  );
}
