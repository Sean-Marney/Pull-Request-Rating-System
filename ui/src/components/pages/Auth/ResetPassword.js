import * as React from "react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { InputLabel } from "@material-ui/core";
import Typography from "@mui/material/Typography";
import updatePasswordForm from "../../../validations/updatePasswordForm";
import * as yup from "yup";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import useAxiosInstance from "../../../useAxiosInstance";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useStyles } from "../../styles/Auth/loginFormStyle";

const theme = createTheme();

export default function ResetPassword() {
    const classes = useStyles();
    const { request } = useAxiosInstance();
    const { state } = useLocation();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState({});
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
    const [openDialog, setOpenDialog] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowConfirmPassword = () =>
        setShowConfirmPassword((show) => !show);

    const handleClickOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const updateUser = async (e) => {
        e.preventDefault();

        try {
            if (!state.email) {
                throw new Error("Email is undefined");
            }
            
            await updatePasswordForm.validate(
                { password: password, confirmPassword: confirmPassword },
                {
                    abortEarly: false,
                }
            )

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
            } else {
                setError({ general: error.message });
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
                        Choose a new password
                    </Typography>
                    <Typography variant="body2" display="block" gutterBottom>
                        Create a new password that is at least 8 characters long
                    </Typography>
                    <Grid container>
                        <Grid item xs>
                            <Link
                                href="#"
                                variant="body2"
                                sx={{ textDecoration: "none" }}
                                onClick={handleClickOpenDialog}
                            >
                                What makes a strong password?
                            </Link>
                        </Grid>
                        <Grid item></Grid>
                    </Grid>
                    <Box component="form" sx={{ mt: 1 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <InputLabel htmlFor="password">
                                    Password
                                </InputLabel>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
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
                                    value={password}
                                    id="password"
                                    aria-labelledby="password"
                                    autoComplete="new-password"
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    autoFocus
                                />
                                {error.password && (
                                    <div style={{ color: "red" }}>
                                        {error.password}
                                    </div>
                                )}
                            </Grid>
                            <Grid item xs={12}>
                                <InputLabel htmlFor="confirmpassword">
                                    Confirm Password
                                </InputLabel>
                                <TextField
                                    required
                                    fullWidth
                                    name="confirmPassword"
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
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                    autoComplete="confirmPassword"
                                    autoFocus
                                    id="confirmPassword"
                                />
                                {error.confirmPassword && (
                                    <div style={{ color: "red" }}>
                                        {error.confirmPassword}
                                    </div>
                                )}
                            </Grid>
                        </Grid>
                        <Button
                            fullWidth
                            variant="contained"
                            onClick={(e) => updateUser(e)}
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Update Password
                        </Button>

                        <Grid container>
                            <Grid item xs>
                                <Button
                                    onClick={() => navigate("/login")}
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
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle
                    id="alert-dialog-title"
                    sx={{ fontWeight: "bold", paddingRight: "40px" }}
                >
                    What makes a strong password?
                    <IconButton
                        edge="end"
                        color="inherit"
                        onClick={handleCloseDialog}
                        aria-label="close"
                        sx={{
                            position: "absolute",
                            right: 15,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <ul>
                            <li>Min least 8 characters long</li>
                            <li>Upper case characters (A-Z)</li>
                            <li>Lower case characters (a-z)</li>
                            <li>Numbers (0-9)</li>
                            <li>Special characters (e.g., !@#$%^&*)</li>
                        </ul>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </ThemeProvider>
    );
}
