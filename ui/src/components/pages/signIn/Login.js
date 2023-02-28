import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import { InputLabel } from "@material-ui/core";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import useAxiosInstance from "../../../useAxiosInstance";
import * as yup from "yup";
import validateLoginForm from "../../../validations/loginForm";
import { useState } from "react";

const theme = createTheme();

export default function SignIn() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const { request } = useAxiosInstance();
  const [error, setError] = useState({});
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

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
      await validateLoginForm.validate(user, { abortEarly: false });

      const response = await request({
        method: "post",
        url: "/login",
        data: { ...user },
      });
      if (response.data.token) {
        setCookie("token", response.data.token, { path: "/" });
        setCookie("role", response.data.hasRole, { path: "/" });
        setCookie("user", user, { path: "/" });
        navigate("/");
      }
    } catch (error) {
      const errors = {};
      if (error instanceof yup.ValidationError) {
        error.inner.forEach((e) => {
          errors[e.path] = e.message;
        });
        setError(errors);
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
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
            {error.email && <div style={{ color: "red" }}>{error.email}</div>}
            <InputLabel htmlFor="password">Password</InputLabel>
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              type="password"
              id="password"
              onChange={handleInputChange}
              autoComplete="current-password"
            />
            {error.password && (
              <div style={{ color: "red" }}>{error.password}</div>
            )}
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
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
                <Link href="/dashboard" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
