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
    const [remainingTime, setRemainingTime] = useState(300); // 5 minutes in seconds
    const [timeExpired, setTimeExpired] = useState(false);

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

    useEffect(() => {
        const intervalId = setInterval(() => {
            setRemainingTime((prevTime) => prevTime - 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        if (remainingTime === 0) {
            setTimeExpired(true);
        }
    }, [remainingTime]);

    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    const remainingTimeString = `${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

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
                        Security Code Verification
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Please enter the verification code to your email:{" "}
                        {state.modalEmail}
                    </Typography>
                    {/* <div>Time remaining: {remainingTimeString}</div> */}
                    {remainingTime > 0 ? (
                        <div>Time remaining: {remainingTimeString}</div>
                    ) : (
                        <div>Time is over</div>
                    )}
                    <MuiOtpInput
                        value={otp}
                        onChange={handleChange}
                        length={6}
                    />
                    {error && <div style={{ color: "red" }}>{error}</div>}

                    <div className={classes.button}>
                        <Button
                            type="submit"
                            variant="contained"
                            style={{ marginLeft: "10px" }}
                            onClick={handleVerify}
                        >
                            Verify
                        </Button>
                        <Button
                            type="submit"
                            onClick={handleBack}
                            variant="contained"
                        >
                            Cancel
                        </Button>
                    </div>
                </Box>
            </Container>
        </div>
    );
};

export default OTPVerification;
