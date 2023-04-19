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
import validateCreateBadgeForm from "../../../validations/createBadgeForm";
import { useStyles } from "../../styles/formStyle";
const FormData = require('form-data');

export default function CreateBadge() {
  const classes = useStyles();
  const [createForm, setCreateForm] = useState({
    badgeName: "",
    starsRequired: "",
  });
  const [photo, setPhoto] = useState(null);
  const [validFile, setValid] = useState(true);


  const [error, setError] = useState({});

  const navigate = useNavigate();

  const updateCreateFormField = (e) => {
    const { name, value } = e.target;

    setCreateForm({
      ...createForm, // Duplicates object
      [name]: value,
    });
  };

// Handle photo upload
  const handlePhoto = (e) => {
    setPhoto(e.target.files[0]);
    let valid = validateFile(e.target.files[0]);
    setValid(valid);
  }

  function validateFile(file) {
    if (file === null || file === undefined) {
      return false;
    }
    else if ((file.type === "image/png" || file.type === "image/jpeg") && file.size < 1000000) {
      return true;
    }else{
      return false;
    }
  }

// Handles form submission
  const createBadge = async (e) => {
    let validPhoto = validateFile(photo);
    setValid(validPhoto);
    e.preventDefault();
    // Only submit form if file is valid
    if (validPhoto) {
    try {
      await validateCreateBadgeForm.validate(createForm, {
        abortEarly: false,
      });
    // Create form data to send to backend
    const formData = new FormData();
    formData.append('photo', photo);
    formData.append('name', createForm.badgeName);
    formData.append('value', createForm.starsRequired);
    // Sends form data via api
    
       
    axios.post(process.env.REACT_APP_API_ENDPOINT +'/management/badge/upload', formData)
         .then(res => {
            navigate("/management/badges"); // Redirects after badge is created
         })
         .catch(err => {
            navigate("/management/badges"); // Redirects after badge is created
         });

      } catch (error) {
          const validationErrors = {};
      if (error instanceof yup.ValidationError) {
        error.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        setError(validationErrors);
      }
    }
  }

  }
  return (
    <div>
      <div>
        <Card className={classes.card}>
          <Typography variant="h4" className={classes.title}>
            <b>Create New Badge</b>
          </Typography>
          <CardContent>
            <form encType="multipart/form-data" onSubmit={createBadge} className={classes.formControl}>
              <div>
                <InputLabel htmlFor="badgeName">Badge Name</InputLabel>
                <Input
                  onChange={updateCreateFormField}
                  value={createForm.name}
                  name="badgeName"
                  id="badgeName"
                  inputProps={{
                    style: { textAlign: "center" },
                  }}
                  className={classes.input}
                />
                {error.badgeName && (
                  <div className={classes.error}>{error.badgeName}</div>
                )}
              </div>
              <div>
                <InputLabel htmlFor="starsRequired">Stars Required</InputLabel>
                <Input
                  onChange={updateCreateFormField}
                  value={createForm.value}
                  name="starsRequired"
                  id="starsRequired"
                  inputProps={{
                    style: { textAlign: "center" },
                  }}
                  className={classes.input}
                />
                {error.starsRequired && (
                  <div className={classes.error}>{error.starsRequired}</div>
                )}
              </div>
              <div>
                <InputLabel htmlFor="photo">Image</InputLabel>
                <input 
                    type="file" 
                    accept=".png, .jpg, .jpeg"
                    name="photo"
                    id="photo"
                    onChange={handlePhoto}
                    inputProps={{
                      style: { textAlign: "center" },
                    }}
                    className={classes.input}
                />
                  {!validFile && (
                  <div className={classes.error}>Invalid File Type or Too Large. Only PNG, JPEG are allowed</div>
                )}
              </div>
              <div className={classes.buttonContainer}>
                <Button
                  onClick={() => navigate("/management/badges")}
                  variant="contained"
                  style={{ marginRight: "20px" }}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="contained" color="primary">Create Badge</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
