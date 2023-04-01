import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Typography, TextField, makeStyles } from "@material-ui/core";
import updatePasswordForm from "../../../validations/updatePasswordForm";
import * as yup from "yup";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import useAxiosInstance from "../../../useAxiosInstance";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

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

    button: {
        display: "flex",
        flexDirection: "row",
        // justifyContent: "space-around",
        fontFamily: "roboto",
        justifyContent: "flex-end",
    },
}));

export default function ResetPassword() {
    const classes = useStyles();
    const { request } = useAxiosInstance();
    const { state } = useLocation();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const updateUser = async (e) => {
        e.preventDefault();
        console.log("hello");

        try {
            if (!state.email) {
                throw new Error("Email is undefined");
            }

            await updatePasswordForm.validate({password:password, confirmPassword:confirmPassword}, {
                abortEarly: false,
            });

            const response = await request({
                method: "patch",
                url: `/management/users/updatePassword/email/${state.email}`,
                data: { password: password, confirmPassword: confirmPassword },
            });

            navigate("/login");
        } catch (error) {
            const validationErrors = {};
            if (error instanceof yup.ValidationError) {
                error.inner.forEach((error) => {
                    validationErrors[error.path] = error.message;
                });
                setError(validationErrors);
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
                        border: "2px solid #b1b1b1",
                        borderRadius: "5px",
                        padding: "20px 10px",
                    }}
                >
                    <Typography variant="h6" gutterBottom>
                        Change Password
                    </Typography>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        value={password}
                        id="password"
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                        label="Password"
                        autoComplete="password"
                        autoFocus
                    />
                    {error && <div style={{ color: "red" }}>{error}</div>}
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        value={confirmPassword}
                        id="confirmpassword"
                        name="confirmpassword"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        label="Confirm Password"
                        autoComplete="confirmpassword"
                        autoFocus
                    />
                    {error && <div style={{ color: "red" }}>{error}</div>}
                    <div className={classes.button}>
                        <Button
                            onClick={() => navigate("/login")}
                            variant="contained"
                            // sx={{ m1: 1 }}
                        >
                            Go back
                        </Button>
                        <Button
                            onClick={(e) => updateUser(e)}
                            variant="contained"
                            // sx={{ m1: 1 }}
                        >
                            Update Password
                        </Button>
                    </div>
                </Box>
            </Container>
        </div>
    );
}
