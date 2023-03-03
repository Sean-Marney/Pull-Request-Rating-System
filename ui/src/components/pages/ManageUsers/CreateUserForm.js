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
  makeStyles,
} from "@material-ui/core";
import * as yup from "yup";
import validateCreateUserForm from "../../../validations/createUserForm";

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
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
    width: "100%",
  },
  formControl: {
    marginTop: theme.spacing(2),
    width: "100%",
  },
  error: {
    color: "red",
    marginBottom: theme.spacing(2),
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: theme.spacing(4),
  },
  cancelButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    marginLeft: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
}));

export default function CreateUser() {
  const classes = useStyles();
  const [createForm, setCreateForm] = useState({
    name: "",
    email: "",
    password: "",
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
                  className={classes.cancelButton}
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
