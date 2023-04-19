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
import validateCreateBadgeForm from "../../../validations/createBadgeForm";
import { useStyles } from "../../styles/formStyle";
import Grid from '@mui/material/Grid';

export default function UpdateBadge() {
  const classes = useStyles();
  const [updateForm, setUpdateForm] = useState({
    badgeName: "",
    starsRequired: "",
  });
  const [photo, setPhoto] = useState(null);
  const [newPhoto, setNewPhoto] = useState(null);

  const [error, setError] = useState({});
  const [validFile, setValid] = useState(true);

  const { id } = useParams(); // Get badge ID from URL
  const navigate = useNavigate();

  useEffect(() => {
    getBadge();
  }, []);

  const getBadge = async () => {
    // Get badge by id
    const res = await axios.get(
      process.env.REACT_APP_API_ENDPOINT + `/management/badge/get/${id}` ,{ withCredentials: true }
    );
    // Convert image to displayable format
    const blob = new Blob([Int8Array.from(res.data.img.data.data)], {type: res.data.img.data.contentType });
    const image = window.URL.createObjectURL(blob);
    setPhoto(image);
    // Set to state (fills in textboxes)
    setUpdateForm({
      badgeName: res.data.name,
      starsRequired: res.data.value,
    });
  };

  const updateEditFormField = (e) => {
    const { name, value } = e.target;

    setUpdateForm({
      ...updateForm,
      [name]: value,
    });
  };

  // Handle photo upload
  const handlePhoto = (e) => {
    // Set photo to state and validates file
    if (e.target.files[0] != undefined) {
      setNewPhoto(e.target.files[0]);
      if (!((e.target.files[0].type === "image/png" || e.target.files[0].type === "image/jpeg") && e.target.files[0].size < 1000000)) {
        setValid(false);
      }
    }else{
      setValid(true);
    }
  }

  // Handles form submission
  const updateBadge = async (e) => {
    e.preventDefault();
    try {
      await validateCreateBadgeForm.validate(updateForm, {
        abortEarly: false,
      });
      // If no new image is uploaded, update badge without image
      if (newPhoto === null) {
        // Update Badge
        await axios.patch(
          process.env.REACT_APP_API_ENDPOINT + `/management/badge/update/${id}`,
          updateForm ,{ withCredentials: true }
        );
        navigate("/management/badges");
      // If new image is uploaded, update badge with new image
      }else{
        if (validFile) {
          const formData = new FormData();
          formData.append('photo', newPhoto);
          formData.append('name', updateForm.badgeName);
          formData.append('value', updateForm.starsRequired);
          // Update badge with new image
          await axios.patch(
            process.env.REACT_APP_API_ENDPOINT + `/management/badge/updateimage/${id}`,
            formData ,{ withCredentials: true }
          );
          navigate("/management/badges");
        }
      }
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
            <b>Update Badge</b>
          </Typography>
          <CardContent>
            <form onSubmit={updateBadge} className={classes.formControl}>
              <div>
                <InputLabel>Badge Name</InputLabel>
                <Input
                  onChange={updateEditFormField}
                  value={updateForm.badgeName}
                  name="badgeName"
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
                <InputLabel>Stars Required</InputLabel>
                <Input
                  onChange={updateEditFormField}
                  value={updateForm.starsRequired}
                  name="starsRequired"
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
                <Grid container columns={2} spacing={3}>
                  <Grid item>
                    <InputLabel>Image</InputLabel>
                    <img src={photo} alt="badge" width="75" height="75" style ={{ "display": "block","marginLeft": "auto","marginRight": "auto"}}/>
                  </Grid>
                  <Grid item>
                  <InputLabel>Choose new Image</InputLabel>
                    <input 
                      type="file" 
                      accept=".png, .jpg, .jpeg"
                      name="photo"
                      onChange={handlePhoto}
                      inputProps={{
                        style: { textAlign: "center" },
                      }}
                      className={classes.input}
                    />
                    {!validFile && (
                      <div className={classes.error}>Invalid File Type or Too Large</div>
                    )}
                  </Grid>
                </Grid>

              </div>
              <div className={classes.buttonContainer}>
                <Button
                  onClick={() => navigate("/management/badges")}
                  variant="contained"
                  style={{ marginRight: "20px" }}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="contained" color="primary">
                  Update Badge
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
