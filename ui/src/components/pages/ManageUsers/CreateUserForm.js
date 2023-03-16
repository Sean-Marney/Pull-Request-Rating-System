import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  InputLabel,
  Input,
  Button,
  Card,
  CardContent,
} from "@material-ui/core";
import * as yup from "yup";
import validateCreateUserForm from "../../../validations/createUserForm";
import { useStyles } from "../../styles/formStyle";

export default function CreateUser() {
  const classes = useStyles();
  const [createForm, setCreateForm] = useState({
    name: "",
    email: "",
    password: "",
    git_username: "",
  });

  const [error, setError] = useState({});

  const navigate = useNavigate();

  const updateCreateFormField = (e) => {
    const { name, value } = e.target;

    setCreateForm({
      ...createForm, // Duplicates object
      [name]: value,
    });
  };

  const createUser = async (e) => {
    e.preventDefault(); // Prevents refresh after submit

    try {
      await validateCreateUserForm.validate(createForm, {
        abortEarly: false,
      });

      // Create new user
      await axios.post(
        "http://localhost:8000/management/users/create",
        createForm
      );

      navigate("/management/users"); // Redirects after user is created
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
            <b>Create New User</b>
          </Typography>
          <CardContent>
            <form onSubmit={createUser} className={classes.formControl}>
              <div>
                <InputLabel htmlFor="name">Name</InputLabel>
                <Input
                  onChange={updateCreateFormField}
                  value={createForm.name}
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
                  onChange={updateCreateFormField}
                  value={createForm.email}
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
                  onChange={updateCreateFormField}
                  value={createForm.git_username}
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

              <div>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  onChange={updateCreateFormField}
                  value={createForm.password}
                  name="password"
                  id="password"
                  type="password"
                  inputProps={{
                    style: { textAlign: "center" },
                  }}
                  className={classes.input}
                />
                {error.password && (
                  <div className={classes.error}>{error.password}</div>
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
                  Create User
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
