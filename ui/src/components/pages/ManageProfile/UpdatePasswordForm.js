import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
    Typography,
    InputLabel,
    Input,
    Button,
    Card,
    CardContent,
    makeStyles,
    TextField,
  } from "@material-ui/core";
  import { useCookies } from "react-cookie";
import validateCreateUserForm from "../../../validations/updatePasswordForm";
import * as yup from "yup";

  const useStyles = makeStyles((theme) => ({
    card: {
      maxWidth: 600,
      minHeight: 325,
      padding: "20px 5px",
      margin: "0 auto",
      marginTop: theme.spacing(10),
      boxShadow: theme.shadows[20],
      borderRadius: "20px",
    },
    input: {
      padding: "5px 5px",
      marginBottom: theme.spacing(1),
      marginTop: theme.spacing(1),
    },
  }));

export default function UpdatePassword() {
    const classes = useStyles();
    const [cookies] = useCookies();
    const [updateForm, setUpdateForm] = useState({
      name: "",
      password: "",
      confirmPassword: "",
    });
    const [error, setError] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
      getUser();
    }, []);

    const getUser = async () => {
      // Get user by email
      const res = await axios.get(
        `http://localhost:8000/management/users/email/${cookies.user.email}`
      );
      console.log(res.data);
      // Set to state (fills in textboxes)
      setUpdateForm({
        name: res.data.name,
      });
    };

    const updateEditFormField = (e) => {
      const { name, value } = e.target;
      // setUpdateForm((prevUser) => ({
      //   ...prevUser,
      //   [name]: value,
      // }));

      setUpdateForm({
        ...updateForm,
        [name]: value,
      });
    };

    const updateUser = async (e) => {
      e.preventDefault();
  
      try {
        await validateCreateUserForm.validate(updateForm, {
          abortEarly: false,
        });
        await axios.patch(
          // `http://localhost:8000/management/users/update/${id}`,
          `http://localhost:8000/management/users/update/email/${cookies.user.email}`,
          updateForm
        );
        navigate("/profile");
        
      } catch (error) {
        const validationErrors = {};
        if (error instanceof yup.ValidationError) {
          error.inner.forEach((error) => {
            validationErrors[error.path] = error.message;
          });
          setError(validationErrors);
        }
      }
    };

    return (
        <div>
        <div>
          <Card className={classes.card}>
            <Typography variant="h4">
              <b>Change Password</b>
            </Typography>
            <CardContent>
              <form onSubmit={updateUser}>
                {/* display name */}
                <div style={{ marginTop: "20px" }}>
                <InputLabel>Name </InputLabel>
                <Input
                  value={updateForm.name}
                  name="name"
                  id="name"
                  inputProps={{
                    style: { textAlign: "left" },
                  }}
                  className={classes.input}
                />
              </div>


                {/* password */}
              <div style={{ marginTop: "20px" }}>
                <InputLabel htmlFor="password">New Password </InputLabel>
                <Input
                onChange={updateEditFormField}
                name="password"
                type="password"
                id="password"
                autoComplete="new-password"
                  inputProps={{
                    style: { textAlign: "left" },
                  }}
                  className={classes.input}
                />
                {error.password && <div style={{ color: "red" }}>{error.password}</div>}
              </div>

                {/* confirm password */}
                <div>
                <InputLabel htmlFor="password">Confirm Password </InputLabel>
                <Input
                  onChange={updateEditFormField}
                  name="confirmPassword"
                  type="password"
                  id="password"
                  inputProps={{
                    style: { textAlign: "left" },
                  }}
                  className={classes.input}
                />
                 {error.confirmPassword && <div style={{ color: "red" }}>{error.confirmPassword}</div>}
                </div>


                <div style={{ marginTop: "20px" }}>
                  <Button
                    onClick={() => navigate("/profile")}
                    variant="contained"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    style={{ marginLeft: "30px" }}
                    variant="contained"
                    color="primary"
                  >
                    Update Password
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
}