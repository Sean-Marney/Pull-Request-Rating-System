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
import validateCreateRewardForm from "../../../validations/createRewardForm";
import { useStyles } from "../../styles/formStyle";

export default function CreateReward() {
  const classes = useStyles();
  const [createForm, setCreateForm] = useState({
    rewardName: "",
    starsRequired: "",
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

  const createReward = async (e) => {
    e.preventDefault(); // Prevents refresh after submit

    try {
      await validateCreateRewardForm.validate(createForm, {
        abortEarly: false,
      });
      // Create new reward
      await axios.post(
        "http://localhost:8000/management/rewards/create",
        createForm
      );

      navigate("/management/rewards"); // Redirects after reward is created
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
            <b>Create New Reward</b>
          </Typography>
          <CardContent>
            <form onSubmit={createReward} className={classes.formControl}>
              <div>
                <InputLabel htmlFor="rewardName">Reward Name</InputLabel>
                <Input
                  onChange={updateCreateFormField}
                  value={createForm.rewardName}
                  name="rewardName"
                  id="rewardName"
                  inputProps={{
                    style: { textAlign: "center" },
                  }}
                  className={classes.input}
                />
                {error.rewardName && (
                  <div className={classes.error}>{error.rewardName}</div>
                )}
              </div>
              <div>
                <InputLabel htmlFor="starsRequired">Stars Required</InputLabel>
                <Input
                  onChange={updateCreateFormField}
                  value={createForm.starsRequired}
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
              <div className={classes.buttonContainer}>
                <Button
                  onClick={() => navigate("/management/rewards")}
                  variant="contained"
                  style={{ marginRight: "20px" }}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="contained" color="primary">
                  Create Reward
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
