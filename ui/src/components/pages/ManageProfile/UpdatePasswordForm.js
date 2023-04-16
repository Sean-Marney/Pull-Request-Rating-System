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
} from "@material-ui/core";
import { useCookies } from "react-cookie";
import validateCreateUserForm from "../../../validations/updatePasswordForm";
import * as yup from "yup";
import { useStyles } from "../../styles/formStyle";

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
      process.env.REACT_APP_API_ENDPOINT +
        `/management/users/email/${cookies.user}`
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
        process.env.REACT_APP_API_ENDPOINT +
          `/management/users/updatePassword/email/${cookies.user.email}`,
        updateForm,{ withCredentials: true}
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
          <Typography variant="h4" className={classes.title}>
            <b>Change Password</b>
          </Typography>
          <CardContent>
            <form onSubmit={updateUser} className={classes.formControl}>
              {/* display name */}
              <div>
                <InputLabel>Name </InputLabel>
                <Input
                  value={updateForm.name}
                  name="name"
                  id="name"
                  className={classes.input}
                />
              </div>

              {/* password */}
              <div>
                <InputLabel htmlFor="password">New Password </InputLabel>
                <Input
                  onChange={updateEditFormField}
                  name="password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  className={classes.input}
                />
                {error.password && (
                  <div className={classes.error}>{error.password}</div>
                )}
              </div>

              {/* confirm password */}
              <div>
                <InputLabel htmlFor="password">Confirm Password </InputLabel>
                <Input
                  onChange={updateEditFormField}
                  name="confirmPassword"
                  type="password"
                  id="password"
                  className={classes.input}
                />
                {error.confirmPassword && (
                  <div className={classes.error}>{error.confirmPassword}</div>
                )}
              </div>

              <div className={classes.buttonContainer}>
                <Button
                  onClick={() => navigate("/profile")}
                  variant="contained"
                  style={{ marginRight: "20px" }}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="contained" color="primary">
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
