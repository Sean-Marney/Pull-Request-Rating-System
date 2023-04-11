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

export default function CreateReward() {
  const classes = useStyles();
  const [createForm, setCreateForm] = useState({
    badgeName: "",
    starsRequired: "",
    // image: [],
  });
  const [photo, setPhoto] = useState(null);


  const [error, setError] = useState({});

  const navigate = useNavigate();

  const updateCreateFormField = (e) => {
    const { name, value } = e.target;

    setCreateForm({
      ...createForm, // Duplicates object
      [name]: value,
    });
  };


  const handlePhoto = (e) => {
    setPhoto(e.target.files[0]);
  }


  const createBadge = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('photo', photo);
    formData.append('name', createForm.badgeName);
    formData.append('value', createForm.starsRequired);

    axios.post('http://localhost:8000/upload/all', formData)
         .then(res => {
            navigate("/management/badges"); // Redirects after reward is created
         })
         .catch(err => {
            navigate("/management/badges"); // Redirects after reward is created
         });

  }


  // const createBadge = async (e) => {
  //   e.preventDefault(); // Prevents refresh after submit
  //   try {
  //     await validateCreateBadgeForm.validate(createForm, {
  //       abortEarly: false,
  //     });
  //     const formData = new FormData();
  //     formData['image']=(selectedImage);
  //     formData['name']=(createForm.badgeName);
  //     formData['value']=(createForm.starsRequired);
  //     // formData.append('name', createForm.badgeName);
  //     // formData.append('value', createForm.starsRequired);
  //     // createForm["image"] = selectedImage;
  //     console.log(formData);
  //     // Create new reward
  //     await axios.post(
  //       "http://localhost:8000/management/badge/create",
  //       formData
  //     ) .then(res => {
  //          console.log(res);
  //       })
  //       .catch(err => {
  //          console.log(err);
  //       });
      // axios.post('http://localhost:8000/management/badge/create/', formData)
      // .then(res => {
      //    console.log(res);
      // })
      // .catch(err => {
      //    console.log(err);
      // });
      // console.log(formData)
      // fetch("http://localhost:8000/management/badge/create/", {
      //   method: "POST",
      //   formData
      // })
      //   .then((response) => response.json())
      //   .then((data) => console.log(data))
      //   .catch((error) => console.error(error));


    //   navigate("/management/badges"); // Redirects after reward is created
    // } catch (error) {
    //   const validationErrors = {};
    //   if (error instanceof yup.ValidationError) {
    //     error.inner.forEach((error) => {
    //       validationErrors[error.path] = error.message;
    //     });
    //     setError(validationErrors);
    //   }
    // }
  // };

  

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
                <InputLabel htmlFor="starsRequired">Stars Required</InputLabel>
                {/* <input
                  type="file"
                  name="myImage"
                  accept=".png, .jpg, .jpeg"
                  onChange={handlePhotoUpload}
                /> */}
                <input 
                    type="file" 
                    accept=".png, .jpg, .jpeg"
                    name="photo"
                    onChange={handlePhoto}
                />
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
                  Create Badge
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
