import React, { useState } from "react";
import { MuiOtpInput } from "mui-one-time-password-input";
import { Button } from "@mui/material";
import useAxiosInstance from "../../../useAxiosInstance";
import { useNavigate, useLocation } from "react-router-dom";

const OTPVerification = () => {
    const navigate = useNavigate();
    const { request } = useAxiosInstance();
    const { state } = useLocation();
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (newValue) => {
        setOtp(newValue);
    };

    const handleVerify = async (event) => {
        event.preventDefault();
        setLoading(true);
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
            navigate("/forgotpassword/resetpassword", {
                state: {
                    email: state.modalEmail,
                },
            });
        } catch (error) {
            console.error(error);
            setError(error.message || "Verification failed");
        } finally {
            setLoading(false);
        }
    };

    const handleBack = () => {
        navigate("/");
    };

    return (
        <div
            style={{
                alignItems: "center",
                justifyContent: "space-between",
                display: "flex",
                height: "400px",
                flexDirection: "column",
            }}
        >
            <h1>Security Code Verification</h1>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",

                    backgroundColor: "#23C552",
                    color: "black",
                    padding: "20px",
                    marginBottom: "20px",
                }}
            >
                <h2>
                    Please enter the verification code to your email:{" "}
                    {state.modalEmail}
                </h2>
            </div>
            {/* <h2>
                We've send a verification code to your email: {state.modalEmail}
            </h2> */}
            <MuiOtpInput value={otp} onChange={handleChange} length={6} />
            <Button
                type="submit"
                variant="contained"
                disabled={loading}
                onClick={handleVerify}
            >
                {loading ? "Verifying..." : "Verify"}
            </Button>
            <Button type="submit" onClick={handleBack} variant="contained">
                Cancel
            </Button>
        </div>
    );
};

export default OTPVerification;
