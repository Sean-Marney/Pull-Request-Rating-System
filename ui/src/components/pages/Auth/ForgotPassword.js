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
    const { request } = useAxiosInstance();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    // Function to handle form submission and email validation
    const handleCheckEmail = async (event) => {
        event.preventDefault();

        // Check if the email input is empty
        if (email.trim() === "") {
            setError("Please enter an email address");
            return;
        }

        try {
            // Send a request to the server to send an OTP to the email
            const response = await request({
                  
                method: "get",
                url: `/sendOTP/${email}`,
            });
            // If the request is successful, navigate to the verify-otp page
            if (response.status === 200) {
                navigate("/verify-otp", {
                    state: {
                        modalEmail: email,
                    },
                });
            }
        } catch (error) {
            // Show an error message if the email address is not associated with an account
            if (error.response && error.response.data.message) {
                setError(
                    "We couldn't find an account associated with the email address you entered. Please try with an alternate email"
                );
            }
        }
    };

    // Render the ForgotPassword component
    return (
        <ThemeProvider theme={theme}>
            {/* App Bar */}
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
            {/* Main container */}
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                {/* Form container for forgot password*/}
                <Box
                    component="form"
                    onSubmit={handleCheckEmail}
                    noValidate
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
                    {/* Form title */}
                    <Typography component="h1" variant="h5">
                        Forgot Password
                    </Typography>
                    {/* Form description */}
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
                            {/* Display error message */}
                            {error && (
                                <div style={{ color: "red" }}>{error}</div>
                            )}
                        </Grid>
                    </Grid>
                    {/* Send Email button */}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Send Email
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            {/* Navigation buttons */}
                            <Button
                                type="button"
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
