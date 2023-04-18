import React, { useState } from "react";
import { MuiOtpInput } from "mui-one-time-password-input";
import { Button } from "@mui/material";
import useAxiosInstance from "../../../useAxiosInstance";
import { useNavigate, useLocation } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import { useStyles } from "../../styles/Auth/loginFormStyle";
import { ToastContainer, toast } from "react-toastify";
import CustomAppBar from "../../reusable/AppBar";

const theme = createTheme();

// OTPVerification is a functional React component responsible for OTP (One-Time Password) verification
const OTPVerification = () => {
    // Apply custom styles from useStyles
    const classes = useStyles();
    // Hooks for navigating programmatically with react-router
    const navigate = useNavigate();
    // Custom axios instance for making API requests
    const { request } = useAxiosInstance();
    // Accessing the state passed from the previous route
    const { state } = useLocation();
    // State to store the user's input OTP
    const [otp, setOtp] = useState("");
    // State to store any errors that may occur during OTP verification
    const [error, setError] = useState(null);
    // Add success state
    const [success, setSuccess] = useState(false);

    // Function to handle OTP input change
    const handleChange = (newValue) => {
        setOtp(newValue);
    };

    // Function to handle OTP verification
    const handleVerify = async (event) => {
        event.preventDefault();
        setError(null);

        // Check if the OTP input is empty
        if (otp.trim() === "") {
            setError("Please enter the OTP send to your email");
            return;
        }

        try {
            // Check if the email is provided in the component's state
            if (!state.modalEmail) {
                throw new Error("Email is undefined");
            }

            // Make an API request to verify the OTP
            const response = await request({
                method: "post",
                url: `/forgotpassword/verify-otp/${state.modalEmail}/${otp}`,
                data: { email: state.modalEmail, otp: otp },
            });

            // Check if the verification was successful
            if (!response.status == 200) {
                throw new Error("Verification failed");
            }

            // Log the successful verification and navigate to the reset password page
            // console.log("OTP verification successful");
            if (response.status === 200) {
                setSuccess("OTP has been successfully verified");
                setTimeout(() => {
                    navigate("/resetpassword", {
                        state: {
                            email: state.modalEmail,
                        },
                    });
                }, 3000);
            }
        } catch (error) {
            // Log the error and set the error message in the component's state
            console.error(error);
            setError(error.response.data.message);
        }
    };

    // Function to handle navigating back to the previous page
    const handleBack = () => {
        navigate("/");
    };

    // Function to handle resending the OTP
    const handleResendOTP = async (e) => {
        e.preventDefault();
        const response = await request({
            method: "get",
            url: `/sendOTP/${state.modalEmail}`,
        });

        if (response.status === 200) {
            toast.success("We've sent you another code");
        }
    };

    // Render the VerifyOtp component
    return (
        <ThemeProvider theme={theme}>
            <ToastContainer />
            <CustomAppBar />
            {/* Main container for the OTP verification form */}
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
                    {/* Form container for OTP */}
                    <Box component="form" sx={{ mt: 1 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <MuiOtpInput
                                    value={otp}
                                    onChange={handleChange}
                                    length={6}
                                />
                                {/* Display errors if any */}
                                {error && (
                                    <div style={{ color: "red" }}>{error}</div>
                                )}
                                {/* Display success message */}
                                {success && (
                                    <div style={{ color: "green" }}>
                                        {success}
                                    </div>
                                )}
                            </Grid>
                        </Grid>
                        {/* Resend OTP button */}
                        <Button
                            type="submit"
                            onClick={(e) => handleResendOTP(e)}
                            sx={{ textTransform: "none" }}
                        >
                            Resend Code
                        </Button>
                        {/* Verify button */}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleVerify}
                        >
                            Verify
                        </Button>
                        {/* Grid container for the Cancel button */}
                        <Grid container>
                            <Grid item xs>
                                {/* Cancel button */}
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
