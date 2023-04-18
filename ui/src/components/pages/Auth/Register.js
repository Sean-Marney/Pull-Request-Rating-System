import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import Box from "@mui/material/Box";
import * as yup from "yup";
import { InputLabel } from "@material-ui/core";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useAxiosInstance from "../../../useAxiosInstance";
import { useNavigate } from "react-router-dom";
import validateRegisterForm from "../../../validations/registerForm";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

const theme = createTheme();

export default function SignUp() {
    const navigate = useNavigate();
    const { request } = useAxiosInstance();
    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
    const [error, setError] = useState({});
    const [user, setUser] = React.useState({
        email: "",
        name: "",
        password: "",
        confirmPassword: "",
    });

    

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowConfirmPassword = () =>
        setShowConfirmPassword((show) => !show);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await validateRegisterForm.validate(user, { abortEarly: false });

            const response = await request({
                method: "post",
                url: "/register",
                data: { ...user },
            });

            if (response.data.isRegistered) {
                navigate("/login");
            }
        } catch (error) {
            const errors = {};
            if (error.response?.status === 409) {
                errors.email =
                    "This email is already registered in the system. Please login instead";
            } else if (error instanceof yup.ValidationError) {
                error.inner.forEach((e) => {
                    errors[e.path] = e.message;
                });
            } else {
                errors.general = "An error occurred. Please try again later.";
            }

            setError(errors);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <AppBar position="static" sx={{ backgroundColor: "#1b2437" }}>
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
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box
                        component="form"
                        noValidate
                        onSubmit={handleSubmit}
                        sx={{ mt: theme.spacing(3) }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <InputLabel htmlFor="name">Name</InputLabel>
                                <TextField
                                    required
                                    fullWidth
                                    id="name"
                                    name="name"
                                    autoComplete="name"
                                    onChange={handleInputChange}
                                />
                                {error.name && (
                                    <div style={{ color: "red" }}>
                                        {error.name}
                                    </div>
                                )}
                            </Grid>
                            <Grid item xs={12}>
                                <InputLabel htmlFor="email">Email</InputLabel>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    name="email"
                                    autoComplete="email"
                                    onChange={handleInputChange}
                                />
                                {error.email && (
                                    <div style={{ color: "red" }}>
                                        {error.email}
                                    </div>
                                )}
                            </Grid>
                            <Grid item xs={12}>
                                <InputLabel htmlFor="password">
                                    Password
                                </InputLabel>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    id="password"
                                    autoComplete="new-password"
                                    onChange={handleInputChange}
                                    type={showPassword ? "text" : "password"}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={
                                                        handleClickShowPassword
                                                    }
                                                    edge="end"
                                                >
                                                    {showPassword ? (
                                                        <VisibilityOff />
                                                    ) : (
                                                        <Visibility />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                {error.password && (
                                    <div style={{ color: "red" }}>
                                        {error.password}
                                    </div>
                                )}
                            </Grid>
                            <Grid item xs={12}>
                                <InputLabel htmlFor="confirmPassword">
                                    Confirm Password
                                </InputLabel>
                                <TextField
                                    required
                                    fullWidth
                                    name="confirmPassword"
                                    id="confirmPassword"
                                    onChange={handleInputChange}
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={
                                                        handleClickShowConfirmPassword
                                                    }
                                                    edge="end"
                                                >
                                                    {showConfirmPassword ? (
                                                        <VisibilityOff />
                                                    ) : (
                                                        <Visibility />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                {error.confirmPassword && (
                                    <div style={{ color: "red" }}>
                                        {error.confirmPassword}
                                    </div>
                                )}
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: theme.spacing(3), mb: theme.spacing(2) }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Button
                                    type="submit"
                                    onClick={() => navigate("/login")}
                                    sx={{ textTransform: "none" }}
                                >
                                    Already have an account? Sign in
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
