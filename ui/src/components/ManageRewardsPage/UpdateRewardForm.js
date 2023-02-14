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
  makeStyles,
} from "@material-ui/core";
import * as yup from "yup";
import validateCreateRewardForm from "../../validations/createRewardForm";

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
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
}));

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
      `http://localhost:8000/management/rewards/${id}`
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
        `http://localhost:8000/management/rewards/update/${id}`,
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
          <Typography variant="h4">
            <b>Update Reward</b>
          </Typography>
          <CardContent>
            <form onSubmit={updateReward}>
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
                  <div style={{ color: "red" }}>{error.rewardName}</div>
                )}
              </div>
              <div style={{ marginTop: "20px" }}>
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
                  <div style={{ color: "red" }}>{error.starsRequired}</div>
                )}
              </div>
              <div style={{ marginTop: "20px" }}>
                <Button
                  onClick={() => navigate("/management/rewards")}
                  variant="contained"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  style={{ marginLeft: "30px" }}
                  variant="contained"
                  color="primary"
                >
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
