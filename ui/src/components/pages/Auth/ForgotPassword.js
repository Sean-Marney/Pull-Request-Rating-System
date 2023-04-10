import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import useAxiosInstance from "../../../useAxiosInstance";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import { useStyles } from "../../styles/Auth/loginFormStyle";

const theme = createTheme();

export default function ForgotPassword() {
    const classes = useStyles();

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const { request } = useAxiosInstance();
    const [error, setError] = useState("");

    const handleCheckEmail = async (event) => {
        event.preventDefault();

        // Check if the email input is empty
        if (email.trim() === "") {
            setError("Please enter an email address");
            return;
        }

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
                    "We couldn't find an account associated with the email address you entered. Please try with an alternate email"
                );
            }
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <AppBar
                position="static"
                className={classes.appBar}
                sx={{ backgroundColor: "black" }}
            >
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
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        bgcolor: "white",
                        borderRadius: "5px",
                        padding: "20px 10px",
                        margin: "50px 0px",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Forgot Password
                    </Typography>
                    <Typography variant="body2" display="block" gutterBottom>
                        Please enter your email to recieve the code 
                    </Typography>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={12}>
                            <InputLabel htmlFor="email">Email</InputLabel>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoComplete="email"
                                autoFocus
                                variant="outlined"
                            />
                            {error && (
                                <div style={{ color: "red" }}>{error}</div>
                            )}
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        onClick={handleCheckEmail}
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Send Email
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Button
                                type="submit"
                                onClick={() => navigate("/login")}
                                sx={{ textTransform: "none" }}
                            >
                                Back
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
