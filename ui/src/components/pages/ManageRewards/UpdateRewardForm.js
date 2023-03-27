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
import validateCreateRewardForm from "../../../validations/createRewardForm";
import { useStyles } from "../../styles/formStyle";

export default function UpdateReward() {
  const classes = useStyles();
  const [updateForm, setUpdateForm] = useState({
    rewardName: "",
    starsRequired: "",
  });

  const [error, setError] = useState({});

  const { id } = useParams(); // Get reward ID from URL
  const navigate = useNavigate();

  useEffect(() => {
    getReward();
  }, []);

  const getReward = async () => {
    // Get reward by id
    const res = await axios.get(
      process.env.REACT_APP_API_ENDPOINT + `/management/rewards/${id}`
    );

    // Set to state (fills in textboxes)
    setUpdateForm({
      rewardName: res.data.rewardName,
      starsRequired: res.data.starsRequired,
    });
  };

  const updateEditFormField = (e) => {
    const { name, value } = e.target;

    setUpdateForm({
      ...updateForm,
      [name]: value,
    });
  };

  const updateReward = async (e) => {
    e.preventDefault();

    try {
      await validateCreateRewardForm.validate(updateForm, {
        abortEarly: false,
      });
      // Update reward
      await axios.patch(
        process.env.REACT_APP_API_ENDPOINT + +/management/rewards/update/${id}`,
        updateForm
      );

      navigate("/management/rewards");
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
            <b>Update Reward</b>
          </Typography>
          <CardContent>
            <form onSubmit={updateReward} className={classes.formControl}>
              <div>
                <InputLabel>Reward Name</InputLabel>
                <Input
                  onChange={updateEditFormField}
                  value={updateForm.rewardName}
                  name="rewardName"
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
                  onClick={() => navigate("/management/rewards")}
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
