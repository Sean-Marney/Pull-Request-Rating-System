import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import validateCreateUserForm from "../../../validations/updateProfileForm";
import * as yup from "yup";
import { useStyles } from "../../styles/formStyle";



export default function UpdateProfile() {
  const classes = useStyles();
  const [cookies,setCookie] = useCookies();
  const [updateForm, setUpdateForm] = useState({
    name: "",
    email: "",
    bio: "",
  });
  const [error, setError] = useState({});

  const { email } = useParams(); // Get user ID from URL
  const navigate = useNavigate();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    // Get user by email
    const res = await axios.get(
      `http://localhost:8000/management/users/email/${cookies.user}`
    );
    console.log(res.data);
    // Set to state (fills in textboxes)
    setUpdateForm({
      name: res.data.name,
      email: res.data.email,
      bio: res.data.bio,
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

    try {
      await validateCreateUserForm.validate(updateForm, {
        abortEarly: false,
      });
      await axios.patch(
        `http://localhost:8000/management/users/update/email/${cookies.user.email}`,
        updateForm
      );
      console.log(updateForm);
    
      setCookie("user", updateForm.email, { path: "/" });      
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
            <b>Update Profile</b>
          </Typography>
          <CardContent>
            <form onSubmit={updateUser}>
              {/* name */}
              <div style={{ marginTop: "20px" }}>
                <InputLabel>Name </InputLabel>
                <Input
                  onChange={updateEditFormField}
                  value={updateForm.name}
                  name="name"
                  id="name"
                  inputProps={{
                    style: { textAlign: "left" },
                  }}
                  className={classes.input}
                />
                {error.name && <div style={{ color: "red" }}>{error.name}</div>}
              </div>

              {/* email */}
              <div>
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input
                  onChange={updateEditFormField}
                  value={updateForm.email}
                  name="email"
                  id="email"
                  inputProps={{
                    style: { textAlign: "left" },
                  }}
                  className={classes.input}
                />
                {error.email && (
                  <div style={{ color: "red" }}>{error.email}</div>
                )}
              </div>

              {/* bio */}
              <div>
                <InputLabel>Bio</InputLabel>
                <TextField
                  onChange={updateEditFormField}
                  value={updateForm.bio}
                  multiline
                  rows={5}
                  maxWidth
                  name="bio"
                  id="bio"
                  inputProps={{
                    style: { textAlign: "left" },
                  }}
                  className={classes.input}
                />
                {error.bio && <div style={{ color: "red" }}>{error.bio}</div>}
              </div>
              {/* cancel Button */}
              <div style={{ marginTop: "20px" }}>
                <Button
                  onClick={() => navigate("/profile")}
                  variant="contained"
                >
                  Cancel
                </Button>

                {/* update button  */}
                <Button
                  type="submit"
                  style={{ marginLeft: "30px" }}
                  variant="contained"
                  color="primary"
                >
                  Update Profile
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
