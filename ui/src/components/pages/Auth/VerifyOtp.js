import React, { useState } from "react";
import { MuiOtpInput } from "mui-one-time-password-input";
import { Button } from "@mui/material";
import useAxiosInstance from "../../../useAxiosInstance";
import { useNavigate, useLocation } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import { useStyles } from "../../styles/Auth/loginFormStyle";
import { ToastContainer, toast } from "react-toastify";

const theme = createTheme();

const OTPVerification = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const { request } = useAxiosInstance();
    const { state } = useLocation();
    const [otp, setOtp] = useState("");
    const [error, setError] = useState(null);


    const handleChange = (newValue) => {
        setOtp(newValue);
    };

    const handleVerify = async (event) => {
        event.preventDefault();
        setError(null);

        // Check if the OTP input is empty
        if (otp.trim() === "") {
            setError("Please enter the OTP send to your email");
            return;
        }

        try {
            if (!state.modalEmail) {
                throw new Error("Email is undefined");
            }
            const response = await request({
                method: "post",
                url: `/forgotpassword/verify-otp/${state.modalEmail}/${otp}`,
                data: { email: state.modalEmail, otp: otp },
            });
            if (!response.status == 200) {
                throw new Error("Verification failed");
            }
            console.log("OTP verification successful");
            navigate("/resetpassword", {
                state: {
                    email: state.modalEmail,
                },
            });
        } catch (error) {
            console.error(error);
            setError(error.response.data.message);
        }
    };

    const handleBack = () => {
        navigate("/");
    };

    const handleResendOTP = async (e ) => {
        e.preventDefault(); // Prevent the form from submitting and the page from reloading
        const response = await request({
            method: "get",
            url: `/sendOTP/${state.modalEmail}`,
        });

        if (response.status === 200) {
               toast.success("We've sent you another code");
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <ToastContainer />
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
                        Security Code Verification
                    </Typography>
                    <Typography variant="body2" display="block" gutterBottom>
                        Please enter the 6-digit verification code send to{" "}
                        {state.modalEmail}
                    </Typography>
                    <Box component="form" sx={{ mt: 1 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <MuiOtpInput
                                    value={otp}
                                    onChange={handleChange}
                                    length={6}
                                />
                                {error && (
                                    <div style={{ color: "red" }}>{error}</div>
                                )}
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            onClick={(e) => handleResendOTP(e)}
                            sx={{ textTransform: "none" }}
                        >
                            Resend Code
                        </Button>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleVerify}
                        >
                            Verify
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Button
                                    type="submit"
                                    onClick={handleBack}
                                    sx={{ textTransform: "none" }}
                                >
                                    Cancel
                                </Button>
                            </Grid>
                            <Grid item></Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default OTPVerification;
