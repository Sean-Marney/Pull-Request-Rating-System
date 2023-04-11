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

export default function UpdateReward() {
  const classes = useStyles();
  const [updateForm, setUpdateForm] = useState({
    badgeName: "",
    starsRequired: "",
  });

  const [error, setError] = useState({});

  const { id } = useParams(); // Get reward ID from URL
  const navigate = useNavigate();

  useEffect(() => {
    getBadge();
  }, []);

  const getBadge = async () => {
    // Get reward by id
    const res = await axios.get(
      `http://localhost:8000/management/badge/${id}`
    );

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

  const updateBadge = async (e) => {
    e.preventDefault();

    try {
      await validateCreateBadgeForm.validate(updateForm, {
        abortEarly: false,
      });
      console.log(updateForm);
      // Update reward
      await axios.patch(
        `http://localhost:8000/management/badge/update/${id}`,
        updateForm
      );

      navigate("/management/badges");
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
              <div className={classes.buttonContainer}>
                <Button
                  onClick={() => navigate("/management/badges")}
                  variant="contained"
                  style={{ marginRight: "20px" }}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="contained" color="primary">
                  Update Reward
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
