import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import useAxiosInstance from "../../../useAxiosInstance";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { makeStyles } from "@material-ui/core";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";


const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        padding: "130px 0",
    },

    appBar: {
        backgroundColor: "black",
    },

    buttonContainer: {
        display: "flex",
        flexDirection: "row",
        // justifyContent: "space-around",
        fontFamily: "roboto",
        justifyContent: "flex-end",
    },
    button: {
        // display: "flex",
        // flexDirection: "row",
        // // justifyContent: "space-around",
        // fontFamily: "roboto",
        // justifyContent: "flex-end",
        margin: "0px 10px",
    },
}));

export default function ForgotPassword() {
    const classes = useStyles();

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const { request } = useAxiosInstance();
    const [error, setError] = useState("");

    const handleCheckEmail = async (event) => {
        event.preventDefault();
        try {
            const response = await request({
                method: "get",
                url: `/sendOTP/${email}`,
            });
            if (response.status === 200) {
                navigate("/verify-otp", {
                    state: {
                        modalEmail: email,
                    },
                });
            }
        } catch (error) {
            if (error.response && error.response.data.message) {
                setError(
                    "The email address you entered isn't connected to an account"
                );
            }
        }
    };

    return (
        <div>
            <AppBar position="static" sx={{ backgroundColor: "black" }}>
                <Toolbar>
                    <Typography
                        variant="h6"
                        sx={{
                            flexGrow: 1,
                            fontSize: "25px",
                            fontFamily: "Bahnschrift",
                        }}
                    >
                        PullMaster.io
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container maxWidth="sm" className={classes.root}>
                <Box
                    sx={{
                        bgcolor: "white",
                        // border: "1px solid #b1b1b1",
                        borderRadius: "5px",
                        padding: "20px 10px",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                    }}
                >
                    <Typography variant="h5" gutterBottom>
                        Forgot password
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Please enter your email address below to recieve the
                        code
                    </Typography>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        label="Email"
                        autoComplete="email"
                        autoFocus
                    />
                    {error && <div style={{ color: "red" }}>{error}</div>}
                    <div className={classes.buttonContainer}>
                        <Button
                            className={classes.button}
                            onClick={() => navigate("/login")}
                        >
                            Cancel
                        </Button>
                        <Button
                            className={classes.button}
                            style={{ marginLeft: "10px" }}
                            onClick={handleCheckEmail}
                            variant="contained"
                        >
                            Send email 
                        </Button>
                    </div>
                </Box>
            </Container>
        </div>
    );
}
