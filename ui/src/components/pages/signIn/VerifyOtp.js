import React, { useEffect, useState } from "react";
import { MuiOtpInput } from "mui-one-time-password-input";
import { Button } from "@mui/material";
import useAxiosInstance from "../../../useAxiosInstance";
import { useNavigate, useLocation } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { makeStyles } from "@material-ui/core";
import { Margin } from "@mui/icons-material";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        padding: "130px 0",
    },

    button: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        fontFamily: "roboto",
        marginTop: "10px",
    },
}));

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

    const handleResendOTP = async (event) => {
        const response = await request({
            method: "get",
            url: `/sendOTP/${state.modalEmail}`,
        });
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
                        Security Code Verification
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Please enter the 6-digit verification code to your
                        email: {state.modalEmail}
                    </Typography>
                    <MuiOtpInput
                        value={otp}
                        onChange={handleChange}
                        length={6}
                    />
                    {error && <div style={{ color: "red" }}>{error}</div>}
                    <Button type="submit" onClick={handleResendOTP}>
                        Resend Code
                    </Button>

                    <div className={classes.button}>
                        <Button type="submit" onClick={handleBack}>
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            style={{ marginLeft: "10px" }}
                            onClick={handleVerify}
                        >
                            Verify
                        </Button>
                    </div>
                </Box>
            </Container>
        </div>
    );
};

export default OTPVerification;
