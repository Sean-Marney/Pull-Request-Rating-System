import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Typography,
  InputLabel,
  Input,
  Button,
  Card,
  CardContent,
} from "@material-ui/core";
import * as yup from "yup";
import validateUpdateUserForm from "../../../validations/updateUserForm";
import { useStyles } from "../../styles/formStyle";

export default function UpdateUser() {
  const classes = useStyles();
  const [updateForm, setUpdateForm] = useState({
    name: "",
    email: "",
    git_username: "",
  });
  const [error, setError] = useState({});
  const { id } = useParams(); // Get user ID from URL
  const navigate = useNavigate();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    console.log(getUser);
    // Get user by id
    const res = await axios.get(`http://localhost:8000/management/users/${id}`);
    console.log(res);
    // Set to state (fills in textboxes)
    setUpdateForm({
      name: res.data.name,
      email: res.data.email,
      git_username: res.data.git_username,
    });
  };

  const updateEditFormField = (e) => {
    const { name, value } = e.target;

    setUpdateForm({
      ...updateForm,
      [name]: value,
    });
  };

  const updateUser = async (e) => {
    e.preventDefault();
    console.log(updateUser);
    try {
      await validateUpdateUserForm.validate(updateForm, {
        abortEarly: false,
      });
      await axios.patch(
        `http://localhost:8000/management/users/update/${id}`,
        updateForm
      );
      console.log("User updated successfully");
      navigate("/management/users");
    } catch (error) {
      console.error(error);
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
            <b>Update Users</b>
          </Typography>
          <CardContent>
            <form onSubmit={updateUser} className={classes.formControl}>
              <div>
                <InputLabel htmlFor="name">User Name</InputLabel>
                <Input
                  onChange={updateEditFormField}
                  value={updateForm.name}
                  name="name"
                  id="name"
                  inputProps={{
                    style: { textAlign: "center" },
                  }}
                  className={classes.input}
                />
                {error.name && (
                  <div className={classes.error}>{error.name}</div>
                )}
              </div>
              <div>
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input
                  onChange={updateEditFormField}
                  value={updateForm.email}
                  name="email"
                  id="email"
                  inputProps={{
                    style: { textAlign: "center" },
                  }}
                  className={classes.input}
                />
                {error.email && (
                  <div className={classes.error}>{error.email}</div>
                )}
              </div>
              <div>
                <InputLabel htmlFor="git_username">GitHub Username</InputLabel>
                <Input
                  onChange={updateEditFormField}
                  value={updateForm.git_username}
                  name="git_username"
                  id="git_username"
                  inputProps={{
                    style: { textAlign: "center" },
                  }}
                  className={classes.input}
                />
                {error.git_username && (
                  <div className={classes.error}>{error.git_username}</div>
                )}
              </div>
              <div className={classes.buttonContainer}>
                <Button
                  onClick={() => navigate("/management/users")}
                  variant="contained"
                  style={{ marginRight: "20px" }}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="contained" color="primary">
                  Update User
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
