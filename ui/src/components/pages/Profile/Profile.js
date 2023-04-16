import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Modal, Paper, Typography } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import LockIcon from "@material-ui/icons/Lock";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingTop: "calc(100vh / 12)",
    background: "linear-gradient(to bottom, #ffffff, #f5f5f5)",
  },
  paper: {
    padding: theme.spacing(12),
    textAlign: "center",
    background: "#ffffff",
    boxShadow: "0px 2px 10px 2px rgba(0,0,0,0.1)",
    borderRadius: "10px",
    width: "90%",
    maxWidth: "600px",
  },
  title: {
    fontWeight: "bold",
    marginBottom: theme.spacing(6),
  },
  label: {
    fontWeight: "bold",
    fontSize: "1.2rem",
    color: "#808080",
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(3),
  },
  text: {
    fontSize: "1.2rem",
    color: "black",
  },
  details: {
    display: "flex",
    alignItems: "flex-start",
    marginBottom: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  buttonContainer: {
    marginTop: theme.spacing(6),
    display: "flex",
    justifyContent: "center",
    [theme.breakpoints.up("sm")]: {
      justifyContent: "center",
    },
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalPaper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    minWidth: 300,
    maxWidth: 500,
    borderRadius: 4,
    textAlign: "center",
  },
  modalTitle: {
    fontWeight: "bold",
    marginBottom: theme.spacing(2),
    color: "red",
  },
  modalMessage: {
    marginBottom: theme.spacing(4),
  },
  modalButtonContainer: {
    display: "flex",
    justifyContent: "center",
  },
  modalButton: {
    margin: theme.spacing(1),
  },
}));

export default function ProfilePage() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //Get user on page load
  useEffect(() => {
    getUserByEmail();
  }, []);

  const getUserByEmail = async () => {
    //Get user by email
    const res = await axios.get(
      process.env.REACT_APP_API_ENDPOINT +
        `/management/users/email/${cookies.user}`
    );
    //Set to state
    setUser(res.data);
  };





  const deleteUserByEmail = async () => {
    // email.preventDefault();
    try {
      // Delete user
      await axios.delete(
        process.env.REACT_APP_API_ENDPOINT +
          `/management/users/deleteUser/email/${cookies.user}`
      );
      removeCookie("role");
      removeCookie("user");
      removeCookie("token");
      navigate("/login");
    } catch (error) {
      console.log(error);
      navigate("/profile");
    }
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Typography variant="h4" className={classes.title}>
          {user && user.name}'s Profile
        </Typography>
        <div className={classes.details}>
          <Typography variant="subtitle1" className={classes.label}>
            Role:
          </Typography>
          <Typography variant="subtitle1" className={classes.text}>
            {user && user.hasRole}
          </Typography>
        </div>
        <div className={classes.details}>
          <Typography variant="subtitle1" className={classes.label}>
            Email:
          </Typography>
          <Typography variant="subtitle1" className={classes.text}>
            {user && user.email}
          </Typography>
        </div>
        <div className={classes.details}>
          <Typography variant="subtitle1" className={classes.label}>
            Total Stars Earned:
          </Typography>
          <Typography variant="subtitle1" className={classes.text}>
            {user && user.totalStarsEarned}
          </Typography>
        </div>
        <div className={classes.details}>
          <Typography variant="body1" className={classes.label}>
            Bio:
          </Typography>
          <Typography variant="body1" className={classes.text}>
            {user && user.bio}
          </Typography>
        </div>
        <div className={classes.buttonContainer}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            startIcon={<EditIcon />}
            onClick={() => navigate("/profile/update")}
          >
            Edit Profile
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            startIcon={<LockIcon />}
            onClick={() => navigate("/profile/password")}
          >
            Change Password
          </Button>
        </div>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          startIcon={<DeleteIcon />}
          onClick={handleOpen}
        >
          Delete Account
        </Button>

        <Modal
          open={open}
          onClose={handleClose}
          className={classes.modal}
          aria-labelledby="popup-box"
          aria-describedby="popup-box-description"
        >
          <div className={classes.paper}>
            <Typography variant="h5" className={classes.modalTitle}>
              WARNING
            </Typography>
            <Typography variant="body1" className={classes.modalMessage}>
              This action is irreversible
            </Typography>
            <div className={classes.modalButtonContainer}>
              <Button
                variant="contained"
                color="secondary"
                className={classes.modalButton}
                onClick={() => deleteUserByEmail(user.email)}
              >
                Delete Account
              </Button>
              <Button
                variant="contained"
                color="primary"
                className={classes.modalButton}
                onClick={handleClose}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Modal>
      </Paper>
    </div>
  );
}
