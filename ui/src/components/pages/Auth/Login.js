import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import useAxiosInstance from "../../../useAxiosInstance";
import * as yup from "yup";
import { useState } from "react";
import validateLoginForm from "../../../validations/loginForm";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { useStyles } from "../../styles/Auth/loginFormStyle";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

const theme = createTheme();

export default function SignIn() {
  const classes = useStyles();
  const navigate = useNavigate();
  const { request } = useAxiosInstance();
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = useState({});
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

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
      const valRes = await validateLoginForm.validate(user, {
        abortEarly: false,
      });
      console.log(valRes, " validation response ");

      const response = await request({
        method: "post",
        url: "/login",
        data: { ...user },
      });
      if (response.data.token) {
        setCookie("token", response.data.token, { path: "/" });
        setCookie("role", response.data.hasRole, { path: "/" });
        setCookie("user", user.email, { path: "/" });
        navigate("/");
      }
    } catch (error) {
      const errors = {};
      if (error.response && error.response.data.message) {
        const errorMessage = error.response.data.message.toLowerCase();
        if (errorMessage.includes("email")) {
          errors.email =
            "The email address you entered isn't connected to an account";
        } else {
          errors.password = "The password that you've entered is incorrect";
        }
      } else if (error instanceof yup.ValidationError) {
        error.inner.forEach((e) => {
          errors[e.path] = e.message;
        });
      }
      setError(errors);
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
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <InputLabel htmlFor="email">Email</InputLabel>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  name="email"
                  onChange={handleInputChange}
                  autoComplete="email"
                  autoFocus
                />
                {error.email && (
                  <div style={{ color: "red" }}>{error.email}</div>
                )}
              </Grid>
              <Grid item xs={12}>
                <InputLabel htmlFor="password">Password</InputLabel>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  id="password"
                  onChange={handleInputChange}
                  autoComplete="current-password"
                  type={showPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                {error.password && (
                  <div style={{ color: "red" }}>{error.password}</div>
                )}
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Button
                  type="submit"
                  onClick={() => navigate("/forgotPassword")}
                  sx={{ textTransform: "none" }}
                >
                  Forgot password
                </Button>
              </Grid>
              <Grid item>
                <Button
                  type="submit"
                  onClick={() => navigate("/register")}
                  sx={{ textTransform: "none" }}
                >
                  Don't have an account? Sign Up
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
